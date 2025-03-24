---
sidebar_position: 8
title: "Restricting HostPath Mounts in Kubernetes"
description: "Best practices for securing Kubernetes hostPath mounts to prevent unauthorized access to the host filesystem."
---

# Restricting HostPath Mounts in Kubernetes

**hostPath** volumes in Kubernetes allow pods to access files and directories on the host system. If not properly restricted, **hostPath mounts can be exploited** to gain access to **sensitive host files, modify system configurations, and escalate privileges**.

---

## 1. Disable hostPath Unless Absolutely Necessary

**Issue:** Unrestricted `hostPath` mounts allow pods to access the host filesystem.<br/>
**Fix:** Completely disable `hostPath` usage or limit it to necessary workloads.

### Enforce Policy to Block hostPath

Use **Pod Security Admission (PSA)** to restrict `hostPath`:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: secure-namespace
  labels:
    pod-security.kubernetes.io/enforce: "restricted"
    pod-security.kubernetes.io/audit: "restricted"
    pod-security.kubernetes.io/warn: "restricted"
```

### Why It Matters

- **Prevents** attackers from mounting sensitive host directories.<br/>
- **Reduces** the risk of unauthorized file modification.

---

## 2. Use readOnly hostPath Mounts

**Required knowledge for the CKS certification.**

**Issue:** Read-write `hostPath` mounts allow pods to modify critical system files.<br/>
**Fix:** Set `readOnly: true` for any required `hostPath` mount.

### Secure hostPath Volume Configuration

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure-pod
spec:
  containers:
    - name: app-container
      image: secure-image
      volumeMounts:
        - mountPath: /data
          name: secure-volume
          readOnly: true
  volumes:
    - name: secure-volume
      hostPath:
        path: /data
        type: Directory
```

### Why It Matters

- **Prevents** modification of sensitive files.<br/>
- **Restricts** container access to read-only operations.

---

## 3. Use AppArmor to Restrict File Access

**Required knowledge for the CKS certification.**

**Issue:** Even with `readOnly: true`, an attacker may exploit the mounted files.<br/>
**Fix:** Use **AppArmor** to limit file system access.

### Apply AppArmor Profile

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: apparmor-pod
  annotations:
    container.apparmor.security.beta.kubernetes.io/app-container: "localhost/k8s-default"
spec:
  containers:
    - name: app-container
      image: secure-image
```

### Why It Matters

- **Blocks** unauthorized access to host files.<br/>
- **Prevents** common container escape techniques.

---

## 4. Enforce SecurityContext Constraints

**Required knowledge for the CKS certification.**

**Issue:** Containers running as **privileged** can access the entire host.<br/>
**Fix:** Restrict privileged access in **SecurityContext**.

### Secure Pod Configuration

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: restricted-pod
spec:
  containers:
    - name: app-container
      image: secure-image
      securityContext:
        privileged: false
        allowPrivilegeEscalation: false
        capabilities:
          drop: ["ALL"]
```

### Why It Matters

- **Prevents** attackers from gaining elevated privileges.<br/>
- **Reduces** attack surface by limiting kernel capabilities.

---

## 5. Use Admission Controllers to Block Untrusted hostPath Mounts

**Issue:** Developers might unintentionally deploy pods with insecure `hostPath` configurations.<br/>
**Fix:** Use **OPA Gatekeeper** to enforce policies.

### Example Gatekeeper Policy

```yaml
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sDenyHostPath
metadata:
  name: restrict-hostpath
spec:
  match:
    kinds:
      - apiGroups: [""]
        kinds: ["Pod"]
  parameters:
    paths:
      - "/"
      - "/etc"
      - "/var/lib/kubelet"
```

### Why It Matters

- **Prevents** unauthorized `hostPath` mounts.<br/>
- **Ensures** compliance with security policies.

---

## Conclusion

To prevent **hostPath mount abuse**, Kubernetes administrators should **disable unnecessary hostPath volumes, enforce read-only mounts, use AppArmor, restrict container privileges, and implement admission controls**. These best practices ensure that **containers cannot compromise the host system**.
