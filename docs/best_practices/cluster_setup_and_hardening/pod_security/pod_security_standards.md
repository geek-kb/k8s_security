---
title: "Pod Security Standards (PSS)"
sidebar_position: 1
description: "Learn how Kubernetes Pod Security Standards (PSS) enforce security controls for workloads and replace the deprecated Pod Security Policies (PSP)."
---

# Pod Security Standards (PSS) in Kubernetes

**Required knowledge for the CKS certification.**

**Pod Security Standards (PSS)** define **security guidelines** for **Kubernetes pods** based on their **security context**. PSS replaces the **deprecated Pod Security Policies (PSP)** and categorizes security into three levels: **Privileged, Baseline, and Restricted**.

For an overview of security best practices, refer to [Cluster Setup and Hardening](/docs/best_practices/cluster_setup_and_hardening/intro).

---

## Pod Security Standards Levels

### 1. Privileged

- **Full administrative access** to the host.
- **No security restrictions** on pod execution.
- **Use case:** Only for **trusted workloads** requiring deep **host access**.

### 2. Baseline

- Implements **basic security best practices**.
- Prevents **escalation of privileges** but allows **some host access**.
- **Use case:** Suitable for **development environments** and general workloads.

### 3. Restricted

- Enforces **strict security controls** and **prevents privileged actions**.
- **Disallows host namespaces, privileged containers, and hostPath volumes**.
- **Use case:** Recommended for **production** and **high-security environments**.

For more details on restricting workloads, see [Pod Security Standards Enforcement](/docs/best_practices/cluster_setup_and_hardening/pod_security/pod_security_standards).

---

## Enforcing Pod Security Standards

Pod Security Standards are enforced at the **namespace level** using Kubernetes labels.

### Example: Apply a Restricted Policy to a Namespace

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: restricted-namespace
  labels:
    pod-security.kubernetes.io/enforce: "restricted"
    pod-security.kubernetes.io/enforce-version: "v1.25"
```

For more details on enforcing security at the namespace level, see [Kubernetes Namespace Security](/docs/fundamentals/k8s_security_primitives/authorization/rbac).

---

## Best Practices for Pod Security Standards

- **Use "restricted" policies** in **production namespaces** to enforce strong security.
- **Apply "baseline" policies** for **development and testing** environments.
- **Avoid the "privileged" level** unless absolutely necessary.
- **Combine PSS with Role-Based Access Control (RBAC)** for **granular access control**.

For securing authentication and authorization in Kubernetes, refer to [Role-Based Access Control (RBAC)](/docs/fundamentals/k8s_security_primitives/authorization/rbac).

---

## Key Takeaways

- **Pod Security Standards (PSS)** enforce security at the **namespace level**.
- The **restricted** level offers **maximum protection** against **privilege escalation**.
- Kubernetes **deprecated Pod Security Policies (PSP)** in favor of **PSS enforcement**.
- **Applying the right PSS level** helps prevent **security misconfigurations** and **workload vulnerabilities**.

For more on securing workloads in Kubernetes, refer to [Pod Security Standards](/docs/best_practices/cluster_setup_and_hardening/pod_security/pod_security_standards).
