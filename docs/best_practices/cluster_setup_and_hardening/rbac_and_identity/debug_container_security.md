---
sidebar_position: 13
title: "Securing Debug Container Access"
description: "How to control ephemeral container and kubectl debug access through RBAC, Pod Security Standards, and admission control in Kubernetes."
keywords: [kubernetes security best practices, ephemeral containers, kubectl debug, debug container RBAC, pod security, process namespace, debugging security, admission control, CKS]
tags: [best-practice, mitigation, rbac, pod-security, CKS]
related:
  - /docs/attack_vectors/ephemeral_container_abuse/
  - /docs/best_practices/cluster_setup_and_hardening/rbac_and_identity/insecure_rbac_permissions_mitigation/
  - /docs/best_practices/cluster_setup_and_hardening/pod_security/pod_security_standards/
---

# Securing Debug Container Access

**Required knowledge for the CKS certification.**

Ephemeral containers and `kubectl debug` provide powerful debugging capabilities that can be abused if not properly controlled. Attackers with permissions to create ephemeral containers can inject debugging tools into running pods, access shared process namespaces, and extract sensitive data.

This guide covers how to restrict debug container access through RBAC, admission control, and monitoring.

---

## 1. Restrict Ephemeral Container RBAC Permissions

**Issue:** Users with broad pod permissions may implicitly have access to create ephemeral containers.<br/>
**Fix:** Explicitly deny `pods/ephemeralcontainers` access in RBAC roles.

### Identify Current Permissions

Check who can create ephemeral containers:

```bash
kubectl auth can-i create pods/ephemeralcontainers --all-namespaces --list
```

### Create Restrictive Role Without Debug Access

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: developer-no-debug
  namespace: production
rules:
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["get", "list", "watch"]
  - apiGroups: [""]
    resources: ["pods/log"]
    verbs: ["get"]
  # Explicitly omit pods/ephemeralcontainers
  # Explicitly omit pods/exec
```

### Deny Debug for Service Accounts

Ensure service accounts cannot create debug containers:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: no-debug-access
rules:
  - apiGroups: [""]
    resources: ["pods/ephemeralcontainers"]
    verbs: []
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: deny-debug-all-serviceaccounts
subjects:
  - kind: Group
    name: system:serviceaccounts
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: no-debug-access
  apiGroup: rbac.authorization.k8s.io
```

---

## 2. Restrict Node Debugging

**Issue:** `kubectl debug node/` provides host-level access to nodes.<br/>
**Fix:** Restrict `nodes/proxy` permissions.

### Deny Node Debug Access

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: developer-restricted
rules:
  - apiGroups: [""]
    resources: ["nodes"]
    verbs: ["get", "list"]
  # Do NOT include nodes/proxy - this enables node debugging
```

### Audit Node Proxy Access

Identify who has node proxy access:

```bash
kubectl get clusterrolebindings -o json | \
  jq -r '.items[] | select(.roleRef.name == "cluster-admin" or 
    (.roleRef.name | test("node"))) | .metadata.name'
```

---

## 3. Use Admission Control to Block Debug Containers

**Issue:** RBAC alone may not prevent all debug container scenarios.<br/>
**Fix:** Use admission controllers to enforce additional restrictions.

### Kyverno Policy to Block Ephemeral Containers

```yaml
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: block-ephemeral-containers
spec:
  validationFailureAction: Enforce
  background: false
  rules:
    - name: block-ephemeral-containers-production
      match:
        any:
          - resources:
              kinds:
                - Pod
              namespaces:
                - production
                - finance
      validate:
        message: "Ephemeral containers are not allowed in this namespace"
        deny:
          conditions:
            any:
              - key: "{{ request.operation }}"
                operator: Equals
                value: "UPDATE"
              - key: "{{ length(request.object.spec.ephemeralContainers || `[]`) }}"
                operator: GreaterThan
                value: 0
```

### OPA Gatekeeper Constraint

```yaml
apiVersion: templates.gatekeeper.sh/v1
kind: ConstraintTemplate
metadata:
  name: blockephemeralcontainers
spec:
  crd:
    spec:
      names:
        kind: BlockEphemeralContainers
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |
        package blockephemeralcontainers
        
        violation[{"msg": msg}] {
          input.review.operation == "UPDATE"
          container := input.review.object.spec.ephemeralContainers[_]
          msg := sprintf("Ephemeral container %v not allowed", [container.name])
        }
---
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: BlockEphemeralContainers
metadata:
  name: block-ephemeral-production
spec:
  match:
    namespaces: ["production"]
```

---

## 4. Restrict Debug Container Capabilities

**Issue:** Debug containers may run with elevated privileges.<br/>
**Fix:** Apply Pod Security Standards to ephemeral containers.

### Enforce Restricted Profile

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/enforce-version: latest
```

The restricted profile blocks:

- Privileged containers
- Host namespace access
- Privilege escalation
- Root user execution

### Kyverno Policy for Debug Container Security Context

```yaml
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: restrict-ephemeral-container-privileges
spec:
  validationFailureAction: Enforce
  rules:
    - name: restrict-ephemeral-security-context
      match:
        any:
          - resources:
              kinds:
                - Pod
      validate:
        message: "Ephemeral containers must not run as privileged"
        pattern:
          spec:
            ephemeralContainers:
              - securityContext:
                  privileged: false
                  allowPrivilegeEscalation: false
```

---

## 5. Audit and Monitor Debug Container Usage

**Issue:** Debug container usage may indicate reconnaissance or unauthorized access.<br/>
**Fix:** Enable audit logging and alerting for ephemeral container creation.

### API Server Audit Policy

```yaml
apiVersion: audit.k8s.io/v1
kind: Policy
rules:
  - level: RequestResponse
    verbs: ["patch", "update"]
    resources:
      - group: ""
        resources: ["pods/ephemeralcontainers"]
    omitStages:
      - RequestReceived
  - level: RequestResponse
    verbs: ["create"]
    resources:
      - group: ""
        resources: ["nodes/proxy"]
    omitStages:
      - RequestReceived
```

### Falco Rules

```yaml
- rule: Ephemeral Container Created
  desc: Detect creation of ephemeral debug containers
  condition: >
    kevt and 
    ka.verb in (patch, update) and
    ka.target.resource = pods and
    ka.target.subresource = ephemeralcontainers
  output: >
    Ephemeral container created (user=%ka.user.name 
    pod=%ka.target.name ns=%ka.target.namespace)
  priority: WARNING
  tags: [k8s, debug, security]

- rule: Node Debug Session Started
  desc: Detect kubectl debug node commands
  condition: >
    kevt and 
    ka.verb = create and
    ka.target.resource = nodes and
    ka.target.subresource = proxy
  output: >
    Node debug session started (user=%ka.user.name node=%ka.target.name)
  priority: CRITICAL
  tags: [k8s, node, debug]
```

### Prometheus Alert

```yaml
- alert: EphemeralContainerCreated
  expr: |
    increase(apiserver_audit_event_total{
      verb=~"patch|update",
      objectRef_resource="pods",
      objectRef_subresource="ephemeralcontainers"
    }[5m]) > 0
  labels:
    severity: warning
  annotations:
    summary: "Ephemeral container created in cluster"
```

---

## Security Checklist

- [ ] `pods/ephemeralcontainers` permissions explicitly denied for non-admin users
- [ ] `nodes/proxy` permissions restricted to cluster administrators
- [ ] Admission policies block ephemeral containers in sensitive namespaces
- [ ] Pod Security Standards enforced (restricted profile)
- [ ] Audit logging enabled for ephemeral container operations
- [ ] Alerting configured for debug container creation
- [ ] Regular review of RBAC bindings for debug permissions

---

## References

This article is based on information from the following official sources:

1. [Ephemeral Containers](https://kubernetes.io/docs/concepts/workloads/pods/ephemeral-containers/) - Kubernetes Documentation
2. [Debugging Running Pods](https://kubernetes.io/docs/tasks/debug/debug-application/debug-running-pod/) - Kubernetes Documentation
3. [Using RBAC Authorization](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) - Kubernetes Documentation
4. [Pod Security Standards](https://kubernetes.io/docs/concepts/security/pod-security-standards/) - Kubernetes Documentation
