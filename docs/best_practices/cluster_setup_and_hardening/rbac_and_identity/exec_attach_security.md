---
title: "Securing Exec and Attach Access"
sidebar_position: 12
description: "Best practices for restricting kubectl exec and attach permissions to prevent credential theft and unauthorized container access."
keywords: [kubernetes security best practices, kubectl exec security, RBAC restrictions, admission control, audit logging, ephemeral containers, distroless images, debug containers, pod security, container access control]
---

# Securing Exec and Attach Access

**Required knowledge for the CKS certification.**

The `pods/exec` and `pods/attach` subresources provide powerful debugging capabilities but also represent significant security risks. Unrestricted access allows attackers to execute arbitrary commands inside containers, steal credentials, and pivot to connected systems.

**Issue:** By default, many RBAC roles grant broad exec and attach permissions, allowing users to access any container in authorized namespaces and extract sensitive data.<br/>
**Fix:** Apply strict RBAC controls, implement admission policies, enable audit logging, and use alternative debugging methods that don't require exec access.

---

## 1. Restrict RBAC Permissions for Exec and Attach

**Issue:** Overly permissive roles grant exec and attach access to all pods, enabling credential theft from any container.<br/>
**Fix:** Grant exec/attach permissions only when necessary and restrict to specific pods or namespaces.

### Deny Exec and Attach by Default

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: developer-readonly
  namespace: production
rules:
  - apiGroups: [""]
    resources: ["pods", "pods/log"]
    verbs: ["get", "list", "watch"]
  - apiGroups: ["apps"]
    resources: ["deployments", "replicasets"]
    verbs: ["get", "list"]
  # Explicitly exclude pods/exec and pods/attach
```

### Grant Exec Access to Specific Pods Only

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: debug-specific-app
  namespace: production
rules:
  - apiGroups: [""]
    resources: ["pods/exec"]
    verbs: ["create"]
    resourceNames:
      - "debug-pod-12345"
      - "troubleshooting-pod-67890"
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: debug-binding
  namespace: production
subjects:
  - kind: User
    name: operator@company.com
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: debug-specific-app
  apiGroup: rbac.authorization.k8s.io
```

### Audit Who Has Exec/Attach Access

```bash
# Find all roles granting exec access
kubectl get roles,clusterroles -A -o json | \
  jq '.items[] | select(.rules[]? | select(.resources[]? | contains("exec")))'

# Find all role bindings with exec permissions
kubectl get rolebindings,clusterrolebindings -A -o json | \
  jq '.items[] | select(.roleRef.name as $role |
    [kubectl get role/$role -o json | select(.rules[]? |
    select(.resources[]? | contains("exec")))] | length > 0)'

# Check specific user's exec permissions
kubectl auth can-i create pods/exec -n production --as user@company.com
```

---

## 2. Implement Admission Control for Exec Operations

**Issue:** Even with RBAC restrictions, there's no real-time visibility or blocking of suspicious exec commands.<br/>
**Fix:** Use admission webhooks to log, audit, and optionally block exec/attach operations.

### Create Validating Webhook for Exec

```yaml
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingWebhookConfiguration
metadata:
  name: validate-exec
webhooks:
  - name: exec-validator.company.com
    admissionReviewVersions: ["v1"]
    clientConfig:
      service:
        name: exec-validator
        namespace: security
        path: "/validate"
      caBundle: LS0tLS1CRUdJTi...
    rules:
      - operations: ["CONNECT"]
        apiGroups: [""]
        apiVersions: ["v1"]
        resources: ["pods/exec", "pods/attach"]
    failurePolicy: Fail
    sideEffects: None
    timeoutSeconds: 5
```

### Example Webhook Logic

```go
// Deny exec to pods with sensitive labels
func validateExec(ar *admissionv1.AdmissionReview) *admissionv1.AdmissionResponse {
    pod := getPod(ar.Request.Namespace, ar.Request.Name)

    if pod.Labels["env"] == "production" &&
       pod.Labels["sensitive"] == "true" {
        return &admissionv1.AdmissionResponse{
            Allowed: false,
            Result: &metav1.Status{
                Message: "Exec not allowed on sensitive production pods",
            },
        }
    }

    return &admissionv1.AdmissionResponse{Allowed: true}
}
```

---

## 3. Enable Comprehensive Audit Logging

**Issue:** Exec and attach operations leave no trace without audit logging, making forensics impossible.<br/>
**Fix:** Enable detailed audit logging for all exec/attach operations.

### Configure Audit Policy for Exec/Attach

```yaml
apiVersion: audit.k8s.io/v1
kind: Policy
rules:
  # Log all exec and attach operations with full request/response
  - level: RequestResponse
    verbs: ["create"]
    resources:
      - group: ""
        resources: ["pods/exec", "pods/attach"]
    omitStages:
      - RequestReceived

  # Log portforward as well
  - level: RequestResponse
    verbs: ["create"]
    resources:
      - group: ""
        resources: ["pods/portforward"]
```

### Query Audit Logs for Exec Activity

```bash
# Search for all exec operations
kubectl logs -n kube-system kube-apiserver-master | \
  grep -E "pods/exec.*CONNECT" | \
  jq '.user.username, .objectRef.namespace, .objectRef.name, .requestURI'

# Find exec operations by specific user
kubectl logs -n kube-system kube-apiserver-master | \
  jq 'select(.objectRef.resource == "pods" and
              .objectRef.subresource == "exec" and
              .user.username == "suspicious@company.com")'

# Check what commands were executed (if container logging enabled)
kubectl logs -n kube-system kube-apiserver-master | \
  jq 'select(.objectRef.subresource == "exec") | .requestURI'
```

---

## 4. Use Ephemeral Debug Containers Instead

**Issue:** Traditional exec requires containers to have shells and debugging tools, increasing attack surface.<br/>
**Fix:** Use Kubernetes ephemeral debug containers that don't require modifying existing pods.

### Create Ephemeral Debug Container

```bash
# Debug a pod without exec
kubectl debug -it webapp-pod-abc123 \
  --image=busybox:1.28 \
  --target=webapp \
  --namespace=production

# Debug with specific tools
kubectl debug webapp-pod-abc123 \
  --image=nicolaka/netshoot:latest \
  --target=webapp \
  -n production
```

### Grant Debug Permissions Instead of Exec

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: debug-only
  namespace: production
rules:
  - apiGroups: [""]
    resources: ["pods/ephemeralcontainers"]
    verbs: ["update", "patch"]
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["get"]
  # No exec or attach permissions
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: debug-binding
  namespace: production
subjects:
  - kind: User
    name: developer@company.com
roleRef:
  kind: Role
  name: debug-only
  apiGroup: rbac.authorization.k8s.io
```

---

## 5. Remove Shells and Debugging Tools from Production Images

**Issue:** Production containers with shells and debugging tools enable attackers to use exec for reconnaissance.<br/>
**Fix:** Build minimal distroless or scratch-based images without shells.

### Use Distroless Base Images

```dockerfile
# Before: Full image with shell
FROM ubuntu:22.04
RUN apt-get update && apt-get install -y curl wget
COPY app /app
CMD ["/app"]

# After: Distroless image
FROM gcr.io/distroless/static-debian11:nonroot
COPY app /app
CMD ["/app"]
```

### Verify No Shell in Container

```bash
# This should fail if no shell
kubectl exec -n production webapp-pod-abc123 -- /bin/sh
# Error: OCI runtime exec failed: exec failed: unable to start container process: exec: "/bin/sh": stat /bin/sh: no such file or directory
```

### Build Multi-Stage Images

```dockerfile
# Build stage with tools
FROM golang:1.21 AS builder
WORKDIR /src
COPY . .
RUN go build -o /app main.go

# Production stage without tools
FROM gcr.io/distroless/base-debian11:nonroot
COPY --from=builder /app /app
CMD ["/app"]
```

---

## 6. Implement Network Segmentation

**Issue:** Containers with exec access can reach internal services and databases, enabling lateral movement.<br/>
**Fix:** Use network policies to restrict container connectivity.

### Deny Egress to Internal Services

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: restrict-database-access
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: webapp
  policyTypes:
    - Egress
  egress:
    # Allow DNS
    - to:
        - namespaceSelector:
            matchLabels:
              name: kube-system
      ports:
        - protocol: UDP
          port: 53
    # Allow only specific services
    - to:
        - podSelector:
            matchLabels:
              app: api-backend
      ports:
        - protocol: TCP
          port: 8080
    # Deny database access (not listed = denied)
```

---

## 7. Monitor and Alert on Exec Usage

**Issue:** Without real-time monitoring, malicious exec activity goes unnoticed until damage is done.<br/>
**Fix:** Implement monitoring and alerting for suspicious exec patterns.

### Create Falco Rules for Exec Detection

```yaml
- rule: Suspicious Exec Command
  desc: Detect potentially malicious exec commands
  condition: >
    kevt and ka.verb = create and
    ka.target.subresource = exec and
    (ka.uri contains "env" or
     ka.uri contains "cat /var/run/secrets" or
     ka.uri contains ".ssh" or
     ka.uri contains "credentials")
  output: >
    Suspicious exec command detected (user=%ka.user.name
    pod=%ka.target.name ns=%ka.target.namespace
    command=%ka.uri)
  priority: WARNING
  tags: [k8s, exec, credential_access]

- rule: Exec to Production Pod
  desc: Alert on any exec to production pods
  condition: >
    kevt and ka.verb = create and
    ka.target.subresource = exec and
    ka.target.namespace = production
  output: >
    Exec to production pod (user=%ka.user.name
    pod=%ka.target.name ns=%ka.target.namespace)
  priority: WARNING
  tags: [k8s, exec, production]
```

### Create Prometheus Alerts

```yaml
- alert: ExecToProductionPod
  expr: |
    increase(apiserver_audit_event_total{
      verb="create",
      subresource="exec",
      namespace="production"
    }[5m]) > 0
  labels:
    severity: warning
  annotations:
    summary: "kubectl exec used in production namespace"
    description: "User attempted exec in production (check audit logs)"
```

### Query Metrics

```bash
# Count exec operations per namespace
kubectl top nodes
kubectl get events -A --field-selector reason=ExecStarted

# Check Prometheus metrics
curl -s 'http://prometheus:9090/api/v1/query?query=apiserver_audit_event_total{subresource="exec"}'
```

---

## 8. Use Pod Security Standards

**Issue:** Privileged pods allow easier credential extraction and system compromise via exec.<br/>
**Fix:** Enforce restricted Pod Security Standards to limit container capabilities.

### Apply Restricted Profile

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/audit: restricted
    pod-security.kubernetes.io/warn: restricted
```

### Deny Privileged Containers

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: webapp
  namespace: production
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    seccompProfile:
      type: RuntimeDefault
  containers:
    - name: app
      image: myapp:1.0
      securityContext:
        allowPrivilegeEscalation: false
        readOnlyRootFilesystem: true
        capabilities:
          drop:
            - ALL
```

---

## 9. Implement Break-Glass Procedures

**Issue:** Completely blocking exec access prevents legitimate emergency debugging.<br/>
**Fix:** Implement time-bound break-glass access with approval workflows.

### Create Just-in-Time Access Request

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: emergency-debug
  namespace: production
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: emergency-exec
  namespace: production
rules:
  - apiGroups: [""]
    resources: ["pods/exec"]
    verbs: ["create"]
---
# Initially no binding - created on-demand
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: emergency-access-user123
  namespace: production
  annotations:
    expires: "2024-12-31T23:59:59Z"
    approver: "manager@company.com"
    ticket: "INC-12345"
subjects:
  - kind: User
    name: user@company.com
roleRef:
  kind: Role
  name: emergency-exec
  apiGroup: rbac.authorization.k8s.io
```

### Automated Expiration Script

```bash
#!/bin/bash
# Remove expired emergency access

kubectl get rolebindings -A -o json | \
  jq -r '.items[] |
    select(.metadata.annotations.expires != null) |
    select(.metadata.annotations.expires < now | strftime("%Y-%m-%dT%H:%M:%SZ")) |
    "\(.metadata.namespace) \(.metadata.name)"' | \
while read ns name; do
  echo "Removing expired access: $ns/$name"
  kubectl delete rolebinding -n "$ns" "$name"
done
```

---

## Security Checklist

- [ ] Deny exec and attach permissions by default in all RBAC roles
- [ ] Grant exec/attach access only to specific pods when absolutely necessary
- [ ] Implement admission webhooks to validate and audit exec operations
- [ ] Enable comprehensive audit logging for pods/exec and pods/attach
- [ ] Use ephemeral debug containers instead of exec for troubleshooting
- [ ] Build distroless images without shells for production workloads
- [ ] Implement network policies to restrict container connectivity
- [ ] Deploy Falco rules to detect suspicious exec activity
- [ ] Set up alerts for exec operations in production namespaces
- [ ] Apply restricted Pod Security Standards to all production namespaces
- [ ] Implement just-in-time access with automatic expiration
- [ ] Regularly audit who has exec permissions and why
- [ ] Document legitimate use cases for exec access

---

## Links

- [Kubernetes RBAC Documentation](https://kubernetes.io/docs/reference/access-authn-authz/rbac/)
- [Ephemeral Debug Containers](https://kubernetes.io/docs/tasks/debug/debug-application/debug-running-pod/)
- [Distroless Container Images](https://github.com/GoogleContainerTools/distroless)
- [Pod Security Standards](/docs/best_practices/cluster_setup_and_hardening/pod_security/pod_security_standards)
- [Network Policies](/docs/best_practices/cluster_setup_and_hardening/network_security/intro)
