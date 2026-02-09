---
sidebar_position: 1
title: "Kubelet Security Overview"
description: "Overview of Kubernetes Kubelet security covering authentication, authorization, TLS, resource limits, and hardening best practices."
keywords: [kubernetes security best practices, kubelet security, node security, kubelet configuration, kubelet hardening, CIS kubernetes, kubernetes node hardening, CKS]
tags: [best-practice, node-security, kubelet, CKS]
related:
  - /docs/best_practices/cluster_setup_and_hardening/node_security/kubelet_authentication/
  - /docs/attack_vectors/kubelet_anonymous_auth/
  - /docs/attack_vectors/exposed_kubelet_api/
---

# Kubelet Security Overview

**Required knowledge for the CKS certification.**

The **Kubelet** is a critical component of a Kubernetes node, responsible for managing containers and ensuring that workloads run as expected. Since it has direct control over the node's container runtime and API interactions, securing the Kubelet is essential to prevent unauthorized access and mitigate security risks.

This article provides an overview of kubelet security areas. For detailed authentication and authorization configuration, see [Securing Kubelet Authentication and Authorization](/docs/best_practices/cluster_setup_and_hardening/node_security/kubelet_authentication/).

---

## Key Risks of an Insecure Kubelet

- **Node Compromise:** If an attacker gains control over a Kubelet, they can access running pods, host resources, and secrets stored on the node.
- **Cluster-wide Exposure:** Improperly secured Kubelets can be used to escalate privileges across the Kubernetes cluster.
- **API Exploits:** The Kubelet exposes an API that, if not properly configured, allows unauthorized command execution and data access.

---

## 1. Authentication and Authorization

**Issue:** The kubelet API may allow anonymous access or grant excessive permissions to authenticated users.<br/>
**Fix:** Disable anonymous authentication and enable webhook authorization.

```yaml
apiVersion: kubelet.config.k8s.io/v1beta1
kind: KubeletConfiguration
authentication:
  anonymous:
    enabled: false
  webhook:
    enabled: true
authorization:
  mode: Webhook
```

For detailed configuration including certificate setup and RBAC rules, see:
➡ [Securing Kubelet Authentication and Authorization](/docs/best_practices/cluster_setup_and_hardening/node_security/kubelet_authentication/)

---

## 2. Enforce TLS Encryption

**Issue:** Unencrypted communication with the Kubelet can expose sensitive data.<br/>
**Fix:** Require TLS for all Kubelet API interactions.

```yaml
apiVersion: kubelet.config.k8s.io/v1beta1
kind: KubeletConfiguration
serverTLSBootstrap: true
tlsCertFile: /var/lib/kubelet/pki/kubelet.crt
tlsPrivateKeyFile: /var/lib/kubelet/pki/kubelet.key
```

Or via command line:

```bash
kubelet \
  --tls-cert-file=/var/lib/kubelet/pki/kubelet.crt \
  --tls-private-key-file=/var/lib/kubelet/pki/kubelet.key \
  --client-ca-file=/etc/kubernetes/pki/ca.crt
```

---

## 3. Disable Read-Only Port

**Issue:** The kubelet read-only port (10255) exposes information without authentication.<br/>
**Fix:** Disable the read-only port entirely.

```yaml
apiVersion: kubelet.config.k8s.io/v1beta1
kind: KubeletConfiguration
readOnlyPort: 0
```

---

## 4. Limit Resource Consumption

**Issue:** Unrestricted Kubelet resource usage can lead to resource exhaustion attacks.<br/>
**Fix:** Reserve resources for system components.

```yaml
apiVersion: kubelet.config.k8s.io/v1beta1
kind: KubeletConfiguration
kubeReserved:
  cpu: "200m"
  memory: "512Mi"
  ephemeral-storage: "1Gi"
systemReserved:
  cpu: "100m"
  memory: "256Mi"
  ephemeral-storage: "1Gi"
evictionHard:
  memory.available: "100Mi"
  nodefs.available: "10%"
```

---

## 5. Enable Protect Kernel Defaults

**Issue:** The kubelet may modify kernel parameters that weaken node security.<br/>
**Fix:** Enable protection of kernel defaults.

```yaml
apiVersion: kubelet.config.k8s.io/v1beta1
kind: KubeletConfiguration
protectKernelDefaults: true
```

This ensures the kubelet fails to start if required kernel parameters are not set correctly.

---

## 6. Rotate Certificates Automatically

**Issue:** Long-lived certificates increase risk if compromised.<br/>
**Fix:** Enable automatic certificate rotation.

```yaml
apiVersion: kubelet.config.k8s.io/v1beta1
kind: KubeletConfiguration
rotateCertificates: true
serverTLSBootstrap: true
```

---

## 7. Regularly Update and Patch

**Issue:** Older versions of the Kubelet may have known vulnerabilities.<br/>
**Fix:** Always use the latest stable version and apply security patches.

```bash
# Check the current Kubelet version
kubelet --version

# On managed Kubernetes, check node versions
kubectl get nodes -o wide
```

---

## Security Checklist

- [ ] Anonymous authentication disabled
- [ ] Webhook authorization enabled
- [ ] TLS encryption configured
- [ ] Read-only port disabled (port 10255)
- [ ] Resource reservations configured
- [ ] Certificate rotation enabled
- [ ] Kernel defaults protected
- [ ] Kubelet version up to date

---

## References

This article is based on information from the following official sources:

1. [Kubelet Authentication/Authorization](https://kubernetes.io/docs/reference/access-authn-authz/kubelet-authn-authz/) - Kubernetes Documentation
2. [Kubelet Configuration](https://kubernetes.io/docs/reference/config-api/kubelet-config.v1beta1/) - Kubernetes Documentation
3. [CIS Kubernetes Benchmark](https://www.cisecurity.org/benchmark/kubernetes) - Center for Internet Security
