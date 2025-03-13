---
sidebar_position: 4
title: "Preventing Container Escape"
description: "Best practices for securing Kubernetes containers to prevent escape attacks and host system compromise."
---

# Preventing Container Escape

**Container escape** occurs when an attacker exploits security flaws to break out of a container and gain access to the host system. This can lead to **privilege escalation, data theft, lateral movement, and full cluster compromise**.

To mitigate container escape risks, Kubernetes administrators should enforce **strict security controls** at the container and pod level.

---

## 1. Disable Privileged Containers

Running a container with `privileged: true` gives it full access to the host system, increasing the risk of escape.

### Secure Configuration

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure-pod
spec:
  containers:
    - name: app-container
      image: secure-image
      securityContext:
        privileged: false
```

### Why It Matters

- **Prevents** access to kernel modules and sensitive host files.
- **Restricts** direct interaction with the host’s networking and devices.

---

## 2. Restrict Host Filesystem Access

Containers should not have unrestricted access to the host filesystem. **Avoid `hostPath` mounts** unless absolutely necessary.

### Secure Volume Mounting

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: restricted-pod
spec:
  containers:
    - name: app-container
      image: secure-image
      volumeMounts:
        - name: host-root
          mountPath: /host
          readOnly: true
  volumes:
    - name: host-root
      hostPath:
        path: /
        type: Directory
```

### Why It Matters

- **Prevents** modification of critical system files.<br/>
- **Reduces** the risk of attackers accessing host credentials or executing system-level commands.

---

## 3. Use Seccomp to Restrict Syscalls

**Seccomp (Secure Computing Mode)** filters system calls available to containers, reducing the attack surface.

### Secure Configuration with Seccomp

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: seccomp-pod
  annotations:
    container.seccomp.security.alpha.kubernetes.io/app-container: "docker/default"
spec:
  containers:
    - name: app-container
      image: secure-image
```

### Why It Matters

- **Blocks** dangerous syscalls used for privilege escalation.<br/>
- **Prevents** exploitation of kernel vulnerabilities.

---

## 4. Enforce Pod Security Standards

Use **Pod Security Admission (PSA)** to enforce security policies that restrict dangerous configurations.

### Example: Enforcing Restricted Policy

```yaml
apiVersion: policy/v1beta1
kind: PodSecurityPolicy
metadata:
  name: restricted-psp
spec:
  privileged: false
  runAsUser:
    rule: MustRunAsNonRoot
  seLinux:
    rule: RunAsAny
  fsGroup:
    rule: RunAsAny
```

### Why It Matters

- **Ensures** that pods run with the least privilege.<br/>
- **Blocks** dangerous configurations like root access.

---

## 5. Implement Container Sandboxing

Use **Kata Containers, gVisor, or Firecracker** to provide additional security layers between the container and the host.

### Example: Running with gVisor

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: sandboxed-pod
spec:
  runtimeClassName: gvisor
  containers:
    - name: app-container
      image: secure-image
```

### Why It Matters

- **Prevents** attackers from escaping the container to the host.<br/>
- **Creates** additional isolation layers for security.

---

## Conclusion

**Preventing container escape** is essential for Kubernetes security. By **disabling privileged containers, restricting filesystem access, enforcing security profiles, and using sandboxed runtimes**, you can significantly reduce the risk of container breakout attacks.

➡ For more security recommendations, visit **[Pod Security Standards](/docs/best_practices/cluster_setup_and_hardening/pod_security)**.
