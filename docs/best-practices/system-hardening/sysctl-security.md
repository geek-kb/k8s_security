---
sidebar_position: 2
title: "Sysctl Security in Kubernetes"
description: "How to safely configure kernel parameters via sysctls in Kubernetes pods, distinguish safe from unsafe sysctls, and enforce restrictions using Pod Security Standards."
keywords: [kubernetes sysctl security, sysctl pod security, kernel parameters kubernetes, safe sysctls, unsafe sysctls, system hardening, kubernetes security, CKS, pod security standards]
tags: [best-practice, pod-security, CKS]
related:
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/pod-security/pod-security-standards/
  - /kubernetes-security/best-practices/system-hardening/linux-capabilities/
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/node-security/kubelet-security/
---

# Sysctl Security in Kubernetes

**Required knowledge for the CKS certification.**

Kubernetes allows pods to configure kernel parameters on the host via the `sysctls` field in the pod security context. Only **namespaced** sysctls — those isolated to a pod's network or IPC namespace — can be configured at the pod level.

Kubernetes classifies sysctls into two categories: **safe** and **unsafe**. This distinction is critical for security: unsafe sysctls require explicit administrator opt-in per node and can affect neighboring pods or destabilize the node if misused.

---

## 1. Safe and Unsafe Sysctls

### Safe Sysctls

Safe sysctls are properly namespaced to the pod's network or IPC namespace and do not affect other pods on the node. They are enabled by default with no additional configuration.

The following sysctls are considered safe as of Kubernetes 1.32:

| Sysctl | Available Since |
|---|---|
| `kernel.shm_rmid_forced` | — |
| `net.ipv4.ip_local_port_range` | — |
| `net.ipv4.tcp_syncookies` | — |
| `net.ipv4.ping_group_range` | 1.18 |
| `net.ipv4.ip_unprivileged_port_start` | 1.22 |
| `net.ipv4.ip_local_reserved_ports` | 1.27 (kernel 3.16+) |
| `net.ipv4.tcp_keepalive_time` | 1.29 (kernel 4.5+) |
| `net.ipv4.tcp_fin_timeout` | 1.29 (kernel 4.6+) |
| `net.ipv4.tcp_keepalive_intvl` | 1.29 (kernel 4.5+) |
| `net.ipv4.tcp_keepalive_probes` | 1.29 (kernel 4.5+) |
| `net.ipv4.tcp_rmem` | 1.32 (kernel 4.15+) |
| `net.ipv4.tcp_wmem` | 1.32 (kernel 4.15+) |

### Unsafe Sysctls

Unsafe sysctls are namespaced but not guaranteed to be properly isolated from the host or other pods. They include parameters in the `kernel.shm*`, `kernel.msg*`, `kernel.sem`, `fs.mqueue.*`, and `net.*` namespaces (with some exceptions). Using them can lead to unexpected behavior, resource contention, or node instability.

---

## 2. Configuring Safe Sysctls in Pods

Set safe sysctls using `spec.securityContext.sysctls`. Both `name` and `value` are strings:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: app
spec:
  securityContext:
    sysctls:
    - name: kernel.shm_rmid_forced
      value: "1"
    - name: net.ipv4.ip_local_port_range
      value: "1024 65535"
  containers:
  - name: app
    image: myapp:1.0
```

---

## 3. Enabling Unsafe Sysctls on Nodes

Unsafe sysctls are disabled by default. To permit specific unsafe sysctls, enable them per node using the kubelet `--allowed-unsafe-sysctls` flag. This flag accepts a comma-separated list of sysctl names and wildcard patterns:

```bash
kubelet --allowed-unsafe-sysctls 'kernel.msg*,net.core.somaxconn' ...
```

**Issue:** Pods that reference an unsafe sysctl not explicitly allowed on the node via `--allowed-unsafe-sysctls` will fail to launch. Their use can lead to severe problems including wrong container behavior, resource shortage, or complete node breakage.<br/>
**Fix:** Enable only the minimum set of unsafe sysctls required by your workloads, and do so selectively on the nodes that run those workloads rather than cluster-wide.

---

## 4. Pod Security Standards Enforcement

Both the **Baseline** and **Restricted** Pod Security Standards restrict sysctls. The field evaluated is:

```
spec.securityContext.sysctls[*].name
```

Under both profiles, only a defined set of safe sysctls are permitted. Any other sysctl name — including all unsafe sysctls — is forbidden and will prevent the pod from being admitted to a namespace enforcing Baseline or Restricted. Note that newly added safe sysctls (such as `net.ipv4.tcp_rmem` and `net.ipv4.tcp_wmem`, added in Kubernetes 1.32) may not yet appear in the Pod Security Standards allowlist. Verify the current allowlist in the [Pod Security Standards documentation](https://kubernetes.io/docs/concepts/security/pod-security-standards/) before relying on recently added safe sysctls in namespaces with Baseline or Restricted enforcement.

This means that pods using unsafe sysctls must be deployed in namespaces with a Privileged enforcement level, which should be limited to dedicated system workloads with elevated requirements.

---

## References

This article is based on information from the following official sources:

1. [Using sysctls in a Kubernetes Cluster](https://kubernetes.io/docs/tasks/administer-cluster/sysctl-cluster/) - Kubernetes Documentation
2. [Pod Security Standards](https://kubernetes.io/docs/concepts/security/pod-security-standards/) - Kubernetes Documentation
