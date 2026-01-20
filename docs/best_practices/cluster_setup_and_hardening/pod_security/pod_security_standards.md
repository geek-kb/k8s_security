---
title: "Pod Security Standards (PSS)"
sidebar_position: 6
description: "Learn how Kubernetes Pod Security Standards (PSS) enforce security controls for workloads and replace the deprecated Pod Security Policies (PSP)."
keywords: [kubernetes security best practices, pod security standards, PSS, pod security policy, PSP replacement, restricted profile, baseline profile, privileged profile, pod security admission, CKS]
tags: [best-practice, pod-security, admission-control, CKS]
related:
  - /docs/attack_vectors/privileged_container_escape/
  - /docs/best_practices/cluster_setup_and_hardening/pod_security/seccomp_in_pods/
  - /docs/best_practices/cluster_setup_and_hardening/pod_security/app_armor_profiles/
  - /docs/best_practices/cluster_setup_and_hardening/api_server_security/opa_gatekeeper/
---

# Pod Security Standards (PSS) in Kubernetes

**Required knowledge for the CKS certification.**

Pod Security Standards (PSS) define security guidelines for Kubernetes pods based on their security context. PSS replaced the deprecated Pod Security Policies (PSP) starting in Kubernetes v1.25 and became the standard enforcement mechanism. As of Kubernetes v1.34, PSS is the recommended approach for enforcing pod-level security. PSS categorizes security into three levels: Privileged, Baseline, and Restricted.

PSS enforcement is built directly into the Kubernetes API server and applies at the namespace level using admission control.

For an overview of security best practices, refer to [Cluster Setup and Hardening](/docs/best_practices/cluster_setup_and_hardening/intro).

---

## Pod Security Standards Levels

### 1. Privileged

The Privileged policy provides unrestricted access and allows all possible capabilities. It is the least secure option and should be used only for trusted system-level workloads.

Characteristics:

- No restrictions on pod configuration<br/>
- Full access to host resources including network, PID, and IPC namespaces<br/>
- Allows privileged containers with elevated capabilities<br/>
- Permits use of hostPath volumes and hostNetwork

Use case: System daemons, CNI plugins, and cluster infrastructure components that require deep host integration.

### 2. Baseline

The Baseline policy implements fundamental security practices that prevent known privilege escalations while remaining broadly compatible with common application requirements.

Characteristics:

- Prevents privilege escalation via `allowPrivilegeEscalation: false`<br/>
- Blocks use of host namespaces (hostNetwork, hostPID, hostIPC)<br/>
- Restricts hostPath volumes to read-only<br/>
- Disallows privileged containers<br/>
- Limits certain Linux capabilities

Use case: General applications in development environments and workloads that do not require elevated permissions.

### 3. Restricted

The Restricted policy enforces current pod hardening best practices and follows defense-in-depth principles. It is the most secure option and recommended for production environments.

Characteristics:

- Requires running as non-root user<br/>
- Enforces read-only root filesystem<br/>
- Drops all capabilities except NET_BIND_SERVICE<br/>
- Disallows privilege escalation completely<br/>
- Blocks all hostPath, hostNetwork, hostPID, and hostIPC usage<br/>
- Restricts volume types to configMap, emptyDir, projected, secret, downwardAPI, persistentVolumeClaim

Use case: Production workloads, multi-tenant environments, and security-sensitive applications.

For more details on restricting workloads, see [Container Escape Mitigation](/docs/best_practices/cluster_setup_and_hardening/pod_security/container_escape_mitigation).

---

## Enforcing Pod Security Standards

Pod Security Standards are enforced using the Pod Security admission controller, which is built into the Kubernetes API server starting in Kubernetes v1.22. The admission controller evaluates pods against the specified policy level during creation or update operations.

### Enforcement Modes

PSS supports three enforcement modes that can be applied independently to each namespace:

- **enforce**: Violating pods are rejected and cannot be created<br/>
- **audit**: Violations are logged to the audit log but pods are still created<br/>
- **warn**: Violations trigger a warning message to the user but pods are still created

Multiple modes can be applied simultaneously to the same namespace for layered enforcement and visibility.

### Example: Apply Restricted Policy to a Namespace

Apply the restricted profile with enforcement and warnings:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production-apps
  labels:
    pod-security.kubernetes.io/enforce: "restricted"
    pod-security.kubernetes.io/enforce-version: "v1.34"
    pod-security.kubernetes.io/audit: "restricted"
    pod-security.kubernetes.io/audit-version: "v1.34"
    pod-security.kubernetes.io/warn: "restricted"
    pod-security.kubernetes.io/warn-version: "v1.34"
```

Apply the baseline profile for development workloads:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: dev-apps
  labels:
    pod-security.kubernetes.io/enforce: "baseline"
    pod-security.kubernetes.io/enforce-version: "v1.34"
    pod-security.kubernetes.io/warn: "restricted"
    pod-security.kubernetes.io/warn-version: "v1.34"
```

### Cluster-Wide Default Policy

Configure cluster-wide Pod Security Standards by setting admission configuration in the API server:

```yaml
apiVersion: apiserver.config.k8s.io/v1
kind: AdmissionConfiguration
plugins:
  - name: PodSecurity
    configuration:
      apiVersion: pod-security.admission.config.k8s.io/v1
      kind: PodSecurityConfiguration
      defaults:
        enforce: "baseline"
        enforce-version: "v1.34"
        audit: "restricted"
        audit-version: "v1.34"
        warn: "restricted"
        warn-version: "v1.34"
      exemptions:
        usernames: []
        runtimeClasses: []
        namespaces: ["kube-system"]
```

For more details on enforcing security at the namespace level, see [Kubernetes Namespace Security](/docs/fundamentals/authorization/rbac).

---

## Best Practices for Pod Security Standards

- **Use "restricted" policies** in **production namespaces** to enforce strong security.
- **Apply "baseline" policies** for **development and testing** environments.
- **Avoid the "privileged" level** unless absolutely necessary.
- **Combine PSS with Role-Based Access Control (RBAC)** for **granular access control**.

For securing authentication and authorization in Kubernetes, refer to [Role-Based Access Control (RBAC)](/docs/fundamentals/authorization/rbac).

---

## Key Takeaways

- **Pod Security Standards (PSS)** enforce security at the **namespace level**.
- The **restricted** level offers **maximum protection** against **privilege escalation**.
- Kubernetes **deprecated Pod Security Policies (PSP)** in favor of **PSS enforcement**.
- **Applying the right PSS level** helps prevent **security misconfigurations** and **workload vulnerabilities**.

For more on securing workloads in Kubernetes, refer to [Pod Security Standards](/docs/best_practices/cluster_setup_and_hardening/pod_security/pod_security_standards).
