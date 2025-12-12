---
sidebar_position: 1
title: "Kubelet Security"
description: "Learn best practices for securing the Kubernetes Kubelet to maintain cluster integrity and prevent security risks."
keywords: [kubernetes security best practices, kubelet security, node security, kubelet configuration, authentication, authorization, CIS kubernetes, kubernetes hardening, CKS]
---

# Kubelet Security

**Required knowledge for the CKS certification.**

The **Kubelet** is a critical component of a **Kubernetes node**, responsible for managing containers and ensuring that workloads are running as expected. Since it has direct control over the **node's container runtime and API interactions**, securing the **Kubelet** is essential to prevent unauthorized access and mitigate security risks.

## Key Risks of an Insecure Kubelet

- **Node Compromise:** If an attacker gains control over a Kubelet, they can access **running pods**, **host resources**, and **secrets** stored on the node.
- **Cluster-wide Exposure:** Improperly secured Kubelets can be used to escalate privileges across the **Kubernetes cluster**.
- **API Exploits:** The Kubelet exposes an API that, if not properly configured, could allow **unauthorized access**.

## Kubelet Security Best Practices

**Required knowledge for the CKS certification.**

### 1. Restrict Kubelet API Access

**Issue:** The Kubelet API should not be accessible from untrusted networks.<br/>
**Fix:** Bind the **Kubelet API** to localhost or a restricted network.

```bash
--address=127.0.0.1
--read-only-port=0
```

- Setting `--read-only-port=0` disables the unauthenticated read-only Kubelet API.
- Configuring `--address=127.0.0.1` ensures that only local processes can access the Kubelet API.

For more information, refer to [Kubernetes API Security](/docs/fundamentals/authentication/authentication_methods).

### 2. Enforce TLS Encryption

**Issue:** Unencrypted communication with the Kubelet can expose sensitive data.<br/>
**Fix:** Require TLS for all Kubelet API interactions.

```yaml
# Example Kubelet TLS Configuration
--tls-cert-file=/var/lib/kubelet/pki/kubelet.crt
--tls-private-key-file=/var/lib/kubelet/pki/kubelet.key
--client-ca-file=/var/lib/kubernetes/pki/ca.crt
```

For more information on TLS and securing communication in Kubernetes, refer to [Certificates in Kubernetes](/docs/fundamentals/authentication/certificates).

### 3. Enable Authentication and Authorization

**Issue:** Open access to the Kubelet API can lead to unauthorized actions.<br/>
**Fix:** Require client authentication and enforce RBAC authorization.

```yaml
# Enforce Webhook Authorization and Authentication
--authorization-mode=Webhook
--authentication-token-webhook=true
--client-ca-file=/var/lib/kubernetes/pki/ca.crt
```

- `--authorization-mode=Webhook` enforces **Kubernetes RBAC policies**.
- `--authentication-token-webhook=true` requires **API authentication tokens**.

For more details, refer to [Role-Based Access Control (RBAC)](/docs/fundamentals/authorization/rbac).

### 4. Disable Anonymous Access

**Issue:** By default, the Kubelet allows anonymous access, which can lead to **unauthorized API calls**.<br/>
**Fix:** Explicitly disable anonymous authentication.

```bash
--anonymous-auth=false
```

### 5. Implement Pod Security Standards

**Issue:** Pods with excessive privileges can exploit the Kubelet API.<br/>
**Fix:** Use **Pod Security Admission (PSA)** to enforce security constraints.

```yaml
# Example PSA Configuration
apiVersion: v1
kind: Namespace
metadata:
  name: restricted
  labels:
    pod-security.kubernetes.io/enforce: "restricted"
    pod-security.kubernetes.io/audit: "restricted"
    pod-security.kubernetes.io/warn: "restricted"
```

For a detailed guide on **pod security measures**, see [Pod Security Standards](/docs/best_practices/cluster_setup_and_hardening/pod_security/pod_security_standards).

### 6. Restrict Kubelet Permissions with RBAC

**Issue:** If the Kubelet has excessive permissions, it could be used to manipulate the cluster.<br/>
**Fix:** Use **RBAC policies** to control Kubelet access.

```yaml
# Example RBAC for Kubelet
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: kubelet-restricted
rules:
  - apiGroups: [""]
    resources: ["pods", "nodes"]
    verbs: ["get", "list"]
```

For more details on **RBAC security**, refer to [Role-Based Access Control](/docs/fundamentals/authorization/rbac).

### 7. Enable Audit Logging for Kubelet Actions

**Issue:** Lack of monitoring makes it difficult to detect **malicious activity**.<br/>
**Fix:** Enable **audit logs** to track API requests and access patterns.

```bash
--audit-log-path=/var/log/kubelet-audit.log
--audit-policy-file=/etc/kubernetes/audit-policy.yaml
```

For a comprehensive approach to **monitoring and logging**, refer to [Monitoring, Logging, and Runtime Security](/docs/best_practices/monitoring_logging_and_runtime_security/intro).

### 8. Regularly Update and Patch the Kubelet

**Issue:** Older versions of the Kubelet may have **known vulnerabilities**.<br/>
**Fix:** Always use **the latest stable version** and apply security patches.

```bash
# Check the current Kubelet version
kubelet --version
```

For more details on **patching and updates**, refer to [Kubernetes Hardening Guide](/docs/best_practices/cluster_setup_and_hardening/cis/understanding_cis_benchmarks).

### 9. Limit Resource Consumption

**Issue:** Unrestricted Kubelet resource usage can lead to **resource exhaustion attacks**.<br/>
**Fix:** Set resource limits.

```bash
--kube-reserved=cpu=200m,memory=512Mi,ephemeral-storage=1Gi
--system-reserved=cpu=100m,memory=256Mi,ephemeral-storage=1Gi
```

For more on securing workloads and limiting resource consumption, see [Cluster Setup and Hardening](/docs/best_practices/cluster_setup_and_hardening/intro).

## Key Takeaways

- The **Kubelet API** should always be **secured with authentication, authorization, and encryption**.
- **RBAC policies** should be used to limit the Kubelet’s access to cluster resources.
- **Pod Security Admission (PSA)** helps enforce security standards at the **pod level**.
- **Regular updates** and **audit logging** are essential for detecting and mitigating security risks.

By following these best practices, you can significantly **reduce the attack surface** of your Kubernetes **nodes** and **ensure a secure cluster environment**.
