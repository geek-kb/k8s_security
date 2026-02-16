---
title: "Seccomp Kubernetes: Restricting System Calls in Pods"
sidebar_position: 7
description: "How to configure seccomp in Kubernetes to restrict system calls, prevent container escapes, and enhance pod security with profiles."
keywords: [seccomp kubernetes, kubernetes seccomp profile, seccomp pods, system call filtering kubernetes, container security seccomp, seccomp RuntimeDefault, custom seccomp profile, kubernetes pod security, CKS]
---

# Seccomp Kubernetes: Restricting System Calls in Pods

**Required knowledge for the CKS certification.**

## What is Seccomp?

**Seccomp (Secure Computing Mode)** is a **Linux kernel feature** that allows restricting the system calls a process can make. It is used in **Kubernetes** to limit a container's ability to execute potentially dangerous system calls, reducing the attack surface of the node.

By enforcing **seccomp profiles**, you can **prevent privilege escalation**, **mitigate container escape vulnerabilities**, and **enhance pod security**.

---

## Seccomp Modes in Kubernetes

Kubernetes supports **three seccomp modes**:

1. **Unconfined (Default)**

   - No restrictions; the container can call any system calls allowed by the container runtime.
   - **Not recommended** for security-sensitive workloads.

2. **Runtime Default**

   - Uses the **default seccomp profile** provided by the container runtime (e.g., CRI-O or containerd).
   - Blocks known dangerous system calls.
   - **Recommended for most workloads**.

3. **Custom Seccomp Profiles**
   - A user-defined seccomp profile specifying **allowed and denied system calls**.
   - **Ideal for high-security environments**.

---

## Enabling Seccomp for a Pod

Seccomp can be applied using **pod security profiles** (PSS), **annotations** (deprecated), or the **securityContext** field.

### 1. Use Runtime Default Seccomp Profile

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure-pod
spec:
  securityContext:
    seccompProfile:
      type: RuntimeDefault
  containers:
    - name: app-container
      image: nginx
```

This enables the **container runtime’s default seccomp profile**, blocking risky system calls.

---

### 2. Use a Custom Seccomp Profile

You can define a **custom seccomp profile** in `/var/lib/kubelet/seccomp/profiles`.

#### Example: `restricted-seccomp.json`

```json
{
  "defaultAction": "SCMP_ACT_ERRNO",
  "architectures": ["SCMP_ARCH_X86_64"],
  "syscalls": [
    {
      "names": ["read", "write", "exit", "fstat"],
      "action": "SCMP_ACT_ALLOW"
    }
  ]
}
```

This profile:

- **Blocks all system calls by default** (`SCMP_ACT_ERRNO`).
- **Allows only safe calls** (`read`, `write`, `exit`, `fstat`).

#### Apply the Profile to a Pod

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: custom-seccomp-pod
spec:
  securityContext:
    seccompProfile:
      type: Localhost
      localhostProfile: restricted-seccomp.json
  containers:
    - name: app-container
      image: nginx
```

This ensures that only **explicitly allowed system calls** are executed.

---

## Best Practices for Seccomp in Kubernetes

- **Use `RuntimeDefault`** seccomp profiles for all workloads unless custom restrictions are needed.
- **Apply seccomp profiles** at the **pod level** (instead of container level) for uniform enforcement.
- **Test seccomp profiles** before applying them in production to avoid breaking applications.
- **Avoid `Unconfined` mode**, as it leaves containers unprotected.

---

## Related Security Features

- **[Pod Security Standards (PSS)](/kubernetes-security/best-practices/cluster-setup-and-hardening/pod-security/pod-security-standards)** ensure that seccomp is enabled by default.
- **[AppArmor Profiles](/kubernetes-security/best-practices/cluster-setup-and-hardening/pod-security/app-armor-profiles)** provide additional security layers for containers.
- **[Kernel Hardening](/kubernetes-security/best-practices/system-hardening/intro)** helps restrict system-level attack surfaces.

---

## Conclusion

Using **seccomp** in Kubernetes enhances **container security** by restricting **unnecessary system calls**. By enforcing **the RuntimeDefault profile** or **custom security policies**, you can **minimize risks**, **prevent privilege escalation**, and **ensure secure workloads**.

For high-security environments, **combine seccomp with AppArmor and Pod Security Standards** to achieve **comprehensive container security**.

---

## References

This article is based on information from the following official sources:

1. [Restrict a Container's Syscalls with seccomp](https://kubernetes.io/docs/tutorials/security/seccomp/) - Kubernetes Documentation
2. [Configure a Security Context for a Pod or Container](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/) - Kubernetes Documentation
3. [Seccomp Security Profiles for Docker](https://docs.docker.com/engine/security/seccomp/) - Docker Documentation
