---
title: "AppArmor Profiles"
sidebar_position: 1
description: "Learn how to use AppArmor profiles to enforce mandatory access control (MAC) on Kubernetes pods."
---

# AppArmor Profiles in Kubernetes

**Required knowledge for the CKS certification.**

## What is AppArmor?

**AppArmor (Application Armor)** is a **Linux security module (LSM)** that provides **mandatory access control (MAC)** to restrict what processes can do on a system. It allows defining **security profiles** that control access to **files, capabilities, and network resources**, helping mitigate security risks in Kubernetes environments.

By using **AppArmor profiles**, you can limit **container privileges**, prevent **unauthorized file access**, and enforce **application security constraints**.

---

## AppArmor Profiles in Kubernetes

Kubernetes supports **AppArmor profiles** for workloads running on nodes with **AppArmor-enabled kernels**. The available modes are:

1. **Unconfined (Default)**

   - No restrictions; the container has unrestricted access.
   - **Not recommended** for security-sensitive workloads.

2. **Runtime Default**

   - Uses the **default AppArmor profile** provided by the container runtime.
   - Offers **basic protection** without custom rules.

3. **Custom AppArmor Profiles**
   - A user-defined profile that specifies **allowed and restricted actions**.
   - **Recommended for strict workload security**.

---

## Enabling AppArmor for a Pod

AppArmor profiles are applied via **annotations** in the pod specification.

### 1. Use the Runtime Default AppArmor Profile

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: apparmor-default-pod
  annotations:
    container.apparmor.security.beta.kubernetes.io/app-container: runtime/default
spec:
  containers:
    - name: app-container
      image: nginx
```

This applies the **default AppArmor profile** to the container.

---

### 2. Use a Custom AppArmor Profile

Custom AppArmor profiles are stored under `/etc/apparmor.d/` on the node.

#### Example: `custom-apparmor-profile`

```plaintext
profile custom-apparmor-profile flags=(attach_disconnected,mediate_deleted) {
  capability,
  network,
  file,
  deny /bin/sh rm,
  deny /usr/bin/wget,
}
```

This profile:

- **Allows** necessary **capabilities, file, and network access**.
- **Denies execution** of `/bin/sh rm` and `/usr/bin/wget` to prevent **command injection** attacks.

#### Apply the Profile to a Pod

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: custom-apparmor-pod
  annotations:
    container.apparmor.security.beta.kubernetes.io/app-container: localhost/custom-apparmor-profile
spec:
  containers:
    - name: app-container
      image: nginx
```

This ensures that the container follows the **custom AppArmor profile restrictions**.

---

## Best Practices for Using AppArmor in Kubernetes

- **Use the RuntimeDefault profile** for general security.
- **Create custom profiles** for workloads that require **strict access control**.
- **Test AppArmor profiles** before applying them to production workloads.
- **Deny execution** of unwanted binaries (`wget`, `curl`, `rm`, etc.) to **reduce attack surfaces**.
- **Combine AppArmor with seccomp** for **stronger workload isolation**.

---

## Related Security Features

- **[Seccomp Profiles](/docs/best_practices/cluster_setup_and_hardening/pod_security/seccomp_in_pods)** limit system calls at the kernel level.
- **[Pod Security Standards](/docs/best_practices/cluster_setup_and_hardening/pod_security/pod_security_standards)** enforce security policies for workloads.
- **[RBAC and Least Privilege](/docs/fundamentals/authorization/rbac)** ensure that workloads only have necessary permissions.

---

## Conclusion

**AppArmor profiles** provide a **powerful way** to **restrict container behavior** and **enforce security policies** in Kubernetes. By using **default or custom profiles**, you can **reduce the attack surface**, **prevent privilege escalation**, and **improve container security**.

For maximum protection, **combine AppArmor with seccomp and Pod Security Standards** to create **a defense-in-depth security strategy** for Kubernetes workloads.
