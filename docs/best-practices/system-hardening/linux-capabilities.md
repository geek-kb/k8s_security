---
sidebar_position: 1
title: "Dropping Linux Capabilities in Containers"
description: "How to configure Linux capabilities in Kubernetes pod security contexts to prevent privilege escalation and reduce the container attack surface."
keywords: [linux capabilities kubernetes, drop capabilities, CAP_SYS_ADMIN, container security, privilege escalation, kubernetes security, CKS, pod security context, securityContext]
tags: [best-practice, pod-security, privilege-escalation, CKS]
related:
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/pod-security/pod-security-standards/
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/pod-security/seccomp-in-pods/
  - /kubernetes-security/attack-vectors/privileged-container-escape/
---

# Dropping Linux Capabilities in Containers

**Required knowledge for the CKS certification.**

Linux capabilities divide the privileges of the root user into distinct units. A container process that retains unnecessary capabilities can perform privileged operations — such as network administration, raw socket access, or broad system administration — that go beyond what the application requires. Restricting capabilities at the container security context level reduces the attack surface available to a compromised workload.

The `securityContext.capabilities` field in a container specification controls which Linux capabilities the container process is granted. Use `drop` to remove capabilities and `add` to grant only those explicitly required.

---

## 1. Drop All Capabilities and Add Back Only What Is Required

**Issue:** Containers that retain unnecessary capabilities allow a compromised process to perform privileged operations beyond the scope of the application.<br/>
**Fix:** Drop all capabilities using `drop: ["ALL"]` and then selectively restore only those the application requires.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: web-server
spec:
  containers:
  - name: web-server
    image: nginx:1.27
    securityContext:
      capabilities:
        drop: ["ALL"]
        add: ["NET_BIND_SERVICE"]
```

The `add` and `drop` fields apply to all containers, init containers, and ephemeral containers via the following paths:

- `spec.containers[*].securityContext.capabilities`
- `spec.initContainers[*].securityContext.capabilities`
- `spec.ephemeralContainers[*].securityContext.capabilities`

---

## 2. Avoid CAP_SYS_ADMIN

**Issue:** `CAP_SYS_ADMIN` is the most powerful individual capability and grants a wide range of privileged kernel operations. The Kubernetes security context enforces that `allowPrivilegeEscalation` is always `true` when the container is run as privileged or has `CAP_SYS_ADMIN`, meaning `allowPrivilegeEscalation: false` has no effect when `CAP_SYS_ADMIN` is present.<br/>
**Fix:** Do not add `CAP_SYS_ADMIN` to containers. If a workload claims to require it, audit whether the specific operation can be satisfied by a more narrowly scoped capability or by a change in application design.

---

## 3. Align with Pod Security Standards

The Pod Security Standards define which capabilities are acceptable depending on the enforcement level applied to a namespace.

### Baseline Profile

The Baseline profile permits adding only the following capabilities. Any capability not on this list causes a policy violation:

- `AUDIT_WRITE`
- `CHOWN`
- `DAC_OVERRIDE`
- `FOWNER`
- `FSETID`
- `KILL`
- `MKNOD`
- `NET_BIND_SERVICE`
- `SETFCAP`
- `SETGID`
- `SETPCAP`
- `SETUID`
- `SYS_CHROOT`

### Restricted Profile

The Restricted profile requires that all capabilities be dropped. The only capability that may be added back is `NET_BIND_SERVICE`:

```yaml
securityContext:
  capabilities:
    drop: ["ALL"]
    add: ["NET_BIND_SERVICE"]
```

Workloads that require capabilities beyond `NET_BIND_SERVICE` must be deployed in namespaces with a less restrictive policy and subject to additional compensating controls.

---

## 4. Apply Capabilities Policy Consistently Across All Container Types

**Issue:** Security context settings on the primary container do not automatically apply to init containers or ephemeral containers.<br/>
**Fix:** Explicitly set `capabilities.drop` on all container types in the pod spec.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: app
spec:
  initContainers:
  - name: init
    image: busybox:1.37
    securityContext:
      capabilities:
        drop: ["ALL"]
  containers:
  - name: app
    image: myapp:1.0
    securityContext:
      capabilities:
        drop: ["ALL"]
```

---

## References

This article is based on information from the following official sources:

1. [Configure a Security Context for a Pod or Container](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/) - Kubernetes Documentation
2. [Pod Security Standards](https://kubernetes.io/docs/concepts/security/pod-security-standards/) - Kubernetes Documentation
