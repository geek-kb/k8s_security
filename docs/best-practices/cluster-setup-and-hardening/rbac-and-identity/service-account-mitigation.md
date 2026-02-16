---
sidebar_position: 2
title: "Securing Kubernetes Service Accounts"
description: "Best practices for securing Kubernetes Service Accounts to prevent unauthorized access, privilege escalation, and persistent attacks."
keywords: [kubernetes security best practices, service account security, service account tokens, RBAC, token projection, automountServiceAccountToken, identity management, privilege escalation prevention, CKS]
---

# Securing Kubernetes Service Accounts

**Service Accounts (SAs)** in Kubernetes allow pods to interact with the API server. If **overprivileged**, they can be exploited by attackers to **escalate privileges, access cluster-wide resources, or maintain persistence**. Enforcing strict access controls is essential to prevent these security risks.

---

## 1. Disable Automatic Service Account Token Mounting

**Required knowledge for the CKS certification.**

**Issue:** By default, Kubernetes mounts Service Account tokens inside all pods, even if they do not require API access.<br/>
**Fix:** Disable automatic token mounting for pods that do not interact with the Kubernetes API.

### Secure Pod Configuration

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure-pod
spec:
  serviceAccountName: default
  automountServiceAccountToken: false
  containers:
    - name: app-container
      image: secure-image
```

### Why It Matters

- **Prevents** attackers from stealing API credentials from compromised pods.<br/>
- **Ensures** only necessary workloads have access to Service Account tokens.

---

## 2. Enforce Least Privilege with RBAC

**Required knowledge for the CKS certification.**

**Issue:** If a Service Account is assigned excessive permissions, an attacker can escalate privileges.<br/>
**Fix:** Restrict Service Accounts using **Role-Based Access Control (RBAC)**.

### Secure Service Account and Role Binding

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: limited-access
  namespace: default
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: limited-role
  namespace: default
rules:
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["get", "list"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: limit-access
  namespace: default
subjects:
  - kind: ServiceAccount
    name: limited-access
    namespace: default
roleRef:
  kind: Role
  name: limited-role
  apiGroup: rbac.authorization.k8s.io
```

### Why It Matters

- **Restricts** Service Accounts to specific namespaces and actions.<br/>
- **Reduces** the risk of privilege escalation via compromised pods.

---

## 3. Block Service Accounts from Assigning Privileged Roles

**Issue:** If a Service Account can modify ClusterRoleBindings, an attacker can escalate privileges.<br/>
**Fix:** Restrict permissions to prevent SA privilege escalation.

### Secure Cluster Role Definition

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: restricted-role
rules:
  - apiGroups: ["rbac.authorization.k8s.io"]
    resources: ["rolebindings", "clusterrolebindings"]
    verbs: []
```

### Why It Matters

- **Prevents** unauthorized privilege escalation.<br/>
- **Ensures** that only trusted admins can modify roles.

---

## 4. Restrict Service Account Usage Per Namespace

**Required knowledge for the CKS certification.**

**Issue:** If a Service Account is not restricted to a specific namespace, attackers can use it across multiple namespaces.<br/>
**Fix:** Limit Service Account scope using **RBAC policies**.

### Secure Role Binding to a Specific Namespace

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: restrict-service-account
  namespace: secure-namespace
subjects:
  - kind: ServiceAccount
    name: limited-access
    namespace: secure-namespace
roleRef:
  kind: Role
  name: limited-role
  apiGroup: rbac.authorization.k8s.io
```

### Why It Matters

- **Prevents** unauthorized Service Account use outside of its intended scope.<br/>
- **Limits** potential attack surface within the cluster.

---

## 5. Rotate and Expire Service Account Tokens

**Issue:** Long-lived Service Account tokens increase the risk of credential theft.<br/>
**Fix:** Use **short-lived tokens** and enforce expiration policies.

### Enable Token Request API

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: secure-sa
  namespace: default
automountServiceAccountToken: false
```

Manually generate short-lived tokens:

```bash
kubectl create token secure-sa --duration=10m
```

### Why It Matters

- **Minimizes** the risk of long-lived token exposure.<br/>
- **Reduces** the impact of token theft by enforcing expiration.

---

## 6. Monitor and Audit Service Account Usage

**Required knowledge for the CKS certification.**

**Issue:** Without auditing, Service Account abuse may go unnoticed.<br/>
**Fix:** Enable **Kubernetes audit logs** to detect unauthorized access.

### Enable Service Account Audit Logging

```yaml
apiVersion: audit.k8s.io/v1
kind: Policy
rules:
  - level: Metadata
    verbs: ["create", "delete", "use"]
    resources:
      - group: ""
        resources: ["serviceaccounts", "secrets"]
```

Monitor logs for suspicious Service Account usage:

```bash
kubectl logs -n kube-system | grep "serviceaccount"
```

### Why It Matters

- **Detects** unauthorized or unexpected Service Account activity.<br/>
- **Provides** visibility into potential privilege escalation attempts.

---

## Conclusion

To protect Kubernetes from **Service Account abuse**, administrators should **disable automatic token mounting, enforce least privilege, restrict role bindings, limit Service Account scope, rotate tokens, and monitor SA usage**. These best practices **prevent privilege escalation and unauthorized access**.

---

## References

This article is based on information from the following official sources:

1. [Service Accounts](https://kubernetes.io/docs/concepts/security/service-accounts/) - Kubernetes Documentation
2. [Configure Service Accounts for Pods](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/) - Kubernetes Documentation
3. [Using RBAC Authorization](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) - Kubernetes Documentation
4. [Auditing](https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/) - Kubernetes Documentation
