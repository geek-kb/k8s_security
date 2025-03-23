---
sidebar_position: 1
title: "Securing RBAC Permissions"
description: "Best practices for securing Kubernetes RBAC configurations to prevent privilege escalation and unauthorized access."
---

# Securing RBAC Permissions

**Role-Based Access Control (RBAC)** defines how users and workloads interact with Kubernetes resources. If **misconfigured**, attackers can **escalate privileges, access sensitive data, and take control of the cluster**. Proper RBAC security enforces the **principle of least privilege** and minimizes attack vectors.

---

## 1. Enforce the Principle of Least Privilege

RBAC should grant **only the necessary permissions** required for a user or workload.

### Secure Role Example

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: production
  name: read-only-role
rules:
  - apiGroups: [""]
    resources: ["pods", "services"]
    verbs: ["get", "list"]
```

### Why It Matters

- **Prevents** users from modifying critical resources.<br/>
- **Reduces** potential damage from compromised credentials.

---

## 2. Avoid Wildcard Permissions

Using `'*'` for API groups, resources, or verbs grants **unrestricted access**, leading to security risks.

### Insecure Role (AVOID)

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: default
  name: insecure-role
rules:
  - apiGroups: ["*"]
    resources: ["*"]
    verbs: ["*"]
```

### Secure Alternative (Restrictive Scope)

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: default
  name: limited-role
rules:
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["get", "list"]
```

### Why It Matters

- **Prevents** users from gaining excessive privileges.<br/>
- **Limits** scope of permissions to only required actions.

---

## 3. Restrict Cluster-Wide Privileges

Cluster-wide roles (`ClusterRole`) should be **limited** to essential users and services.

### Secure `ClusterRoleBinding`

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: read-only-binding
subjects:
  - kind: User
    name: readonly-user
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: read-only-role
  apiGroup: rbac.authorization.k8s.io
```

### Why It Matters

- **Prevents** unnecessary global access.<br/>
- **Ensures** users operate within appropriate namespaces.

---

## 4. Use RBAC Audit Logs to Detect Misuse

Enable **audit logs** to monitor RBAC activity and detect unauthorized access.

### Enable API Server Auditing

Edit the Kubernetes API server configuration:

```yaml
apiVersion: audit.k8s.io/v1
kind: Policy
rules:
  - level: Metadata
    users: ["system:anonymous"]
    verbs: ["get", "list"]
    resources: ["pods"]
```

### Why It Matters

- **Detects** unauthorized access attempts.<br/>
- **Provides** visibility into RBAC changes.

---

## 5. Use Service Accounts for Automated Workloads

Workloads should use **dedicated service accounts** with restricted permissions.

### Secure Service Account Usage

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: limited-sa
  namespace: default
```

### Why It Matters

- **Prevents** workloads from running as `default` service account.<br/>
- **Minimizes** risk if a compromised pod attempts privilege escalation.

---

## Conclusion

RBAC misconfigurations **open doors for attackers** to escalate privileges and compromise Kubernetes clusters. Following best practices—**principle of least privilege, avoiding wildcards, restricting cluster-wide privileges, auditing access, and using service accounts**—ensures a secure RBAC model.
