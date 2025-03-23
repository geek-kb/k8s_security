---
sidebar_position: 3
title: "Preventing Container Escape"
description: "Best practices for securing Kubernetes containers to prevent escape attacks and host system compromise."
---

# Preventing Container Escape

**Container escape** occurs when an attacker exploits security flaws to break out of a container and gain access to the host system. This can lead to **privilege escalation, data theft, lateral movement, and full cluster compromise**.

To mitigate container escape risks, Kubernetes administrators should enforce **strict security controls** at the container and pod level.

---

## 1. Disable Privileged Containers

Running a container with `privileged: true` grants it full access to the host system, increasing the risk of escape. Attackers can leverage this setting to mount the host’s filesystem, manipulate system processes, or escalate privileges.

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

- Prevents access to kernel modules and sensitive host files.<br/>
- Restricts direct interaction with the host’s networking and devices.

---

## 2. Disable Host Namespace Sharing

**Host namespaces** expose the container to the host’s processes, network, and mount points, allowing attackers to manipulate system resources.

### Secure Configuration

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure-pod
spec:
  hostPID: false
  hostIPC: false
  hostNetwork: false
  containers:
    - name: app-container
      image: secure-image
```

### Why It Matters

- Prevents the container from accessing host processes and system files.<br/>
- Reduces the risk of privilege escalation through shared namespaces.

---

## 3. Use Seccomp to Restrict Syscalls

**Seccomp (Secure Computing Mode)** filters system calls available to containers, reducing the attack surface.

### Secure Configuration with Seccomp

In Kubernetes **1.19 and later**, seccomp profiles can be configured via the `seccompProfile` field in `securityContext`.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: seccomp-pod
spec:
  securityContext:
    seccompProfile:
      type: RuntimeDefault
  containers:
    - name: app-container
      image: secure-image
```

### Why It Matters

- Blocks dangerous syscalls used for privilege escalation.<br/>
- Prevents exploitation of kernel vulnerabilities.

---

## 4. Drop Unnecessary Linux Capabilities

By default, containers have a set of capabilities that allow interactions with system resources. Reducing these capabilities minimizes the potential attack surface.

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
        capabilities:
          drop:
            - ALL
```

### Why It Matters

- Removes privileges that could be exploited for escape.<br/>
- Ensures the container operates with the minimum necessary privileges.

---

## 5. Enforce Pod Security Standards

Use **Pod Security Admission (PSA)** or **PodSecurityPolicies (PSP) (deprecated in Kubernetes 1.21+)** to enforce security restrictions that block high-risk configurations.

### Example: Enforcing a Restricted Security Policy

```yaml
apiVersion: policy/v1beta1
kind: PodSecurityPolicy
metadata:
  name: restricted-psp
spec:
  privileged: false
  runAsUser:
    rule: MustRunAsNonRoot
  allowPrivilegeEscalation: false
  seLinux:
    rule: RunAsAny
  fsGroup:
    rule: MustRunAs
  readOnlyRootFilesystem: true
```

For newer Kubernetes versions using **Pod Security Admission**, apply a restricted policy:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: secure-namespace
  labels:
    pod-security.kubernetes.io/enforce: restricted
```

### Why It Matters

- Ensures that pods run with the least privilege.<br/>
- Blocks dangerous configurations like root access and writable root filesystems.

---

## 6. Restrict Host Filesystem Access

Containers should not have access to the host’s filesystem, especially directories like `/proc`, `/sys`, and `/var/run/docker.sock`.

### **Key Directories That Must Be Protected**

| **Path**               | **Risk**                                                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `/proc`                | Grants access to host processes, kernel settings, and system info. `/proc/1/root` exposes the **host’s root filesystem**. |
| `/sys`                 | Allows modification of kernel parameters and hardware configurations.                                                     |
| `/var/run/docker.sock` | Provides full control over Docker and allows spawning new privileged containers.                                          |
| `/dev`                 | Exposes host devices and can be abused to gain raw disk access.                                                           |
| `/etc`                 | Contains system-wide configuration files, including sensitive credentials.                                                |
| `/root`                | Contains the root user’s home directory, which may include SSH keys and configuration files.                              |

### **Stronger Secure Pod Configuration**

To truly **restrict host filesystem access**, use a combination of:

- **Read-only root filesystem**
- **Explicitly disabling hostPath volumes**
- **Using AppArmor, Seccomp, and SELinux policies**
- **Denying all unnecessary mounts**

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
        readOnlyRootFilesystem: true
        allowPrivilegeEscalation: false
        capabilities:
          drop:
            - ALL
        seccompProfile:
          type: RuntimeDefault
        appArmorProfile: runtime/default
        volumeMounts:
          - name: tmp
            mountPath: /tmp
  volumes:
    - name: tmp
      emptyDir: {}
```

### Why It Matters

- **Prevents modifying critical system files** → `readOnlyRootFilesystem: true`
- **Blocks privilege escalation techniques** → `allowPrivilegeEscalation: false`
- **Reduces attack surface by dropping all capabilities** → `capabilities.drop: ALL`
- **Restricts syscalls with Seccomp** → `seccompProfile: RuntimeDefault`
- **Applies additional restrictions with AppArmor** → `appArmorProfile: runtime/default`
- **Prevents unnecessary filesystem mounts** → No hostPath or sensitive volume mounts

---

## 7. Implement Container Sandboxing

Using **sandboxed runtimes** like Kata Containers, gVisor, or Firecracker adds additional isolation layers between the container and the host.

### Example: Running a Pod with gVisor

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

- Prevents attackers from escaping the container to the host.<br/>
- Creates additional isolation layers for security.

---

## Conclusion

Preventing container escape is essential for Kubernetes security. By **disabling privileged containers, enforcing security profiles, restricting filesystem access, and using sandboxed runtimes**, administrators can significantly reduce the risk of container breakout attacks.
