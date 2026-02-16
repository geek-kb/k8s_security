---
sidebar_position: 11
title: "Securing Persistent Volumes"
description: "How to protect Kubernetes PersistentVolumes from unauthorized access, data exposure, and cross-namespace attacks through proper configuration and RBAC."
keywords: [kubernetes security best practices, persistent volume security, PV security, storage security, data protection, PVC RBAC, reclaim policy, storage class, volume encryption, CKS]
tags: [best-practice, mitigation, storage, pod-security, CKS]
related:
  - /kubernetes-security/attack-vectors/persistent-volume-data-exposure/
  - /kubernetes-security/attack-vectors/unrestricted-hostpath-mounts/
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/secrets-management/insecure-secrets-management-mitigation/
---

# Securing Persistent Volumes

**Required knowledge for the CKS certification.**

PersistentVolumes (PVs) can expose sensitive data if improperly configured. Common risks include orphaned volumes retaining data, cross-namespace access through shared volumes, and lack of encryption. Attackers who gain the ability to create pods or PersistentVolumeClaims may access data belonging to other workloads.

This guide covers best practices for securing PersistentVolumes in Kubernetes.

---

## 1. Use Delete Reclaim Policy

**Issue:** The `Retain` reclaim policy keeps volume data after PVC deletion, allowing future claims to access old data.<br/>
**Fix:** Use `Delete` reclaim policy to ensure data is removed when PVCs are deleted.

### Configure Storage Class with Delete Policy

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: secure-storage
provisioner: kubernetes.io/aws-ebs
reclaimPolicy: Delete
volumeBindingMode: WaitForFirstConsumer
parameters:
  type: gp3
  encrypted: "true"
```

### Update Existing PVs

For existing PVs with `Retain` policy that need to be cleaned up:

```bash
# List PVs with Retain policy
kubectl get pv -o json | jq -r '.items[] | 
  select(.spec.persistentVolumeReclaimPolicy == "Retain") | 
  .metadata.name'

# Update to Delete policy (be careful - verify data is backed up)
kubectl patch pv <pv-name> -p '{"spec":{"persistentVolumeReclaimPolicy":"Delete"}}'
```

### Scrub Released Volumes

If you must use `Retain`, implement a volume scrubbing process:

```bash
# Identify released volumes
kubectl get pv | grep Released

# For each released volume, create a temporary pod to wipe data
kubectl run scrubber --rm -it --image=busybox \
  --overrides='{"spec":{"volumes":[{"name":"data","persistentVolumeClaim":{"claimName":"orphaned-pvc"}}],"containers":[{"name":"scrubber","image":"busybox","command":["sh","-c","rm -rf /data/*"],"volumeMounts":[{"name":"data","mountPath":"/data"}]}]}}'
```

---

## 2. Restrict PVC Creation with RBAC

**Issue:** Users who can create PVCs may bind to PVs containing data from other namespaces.<br/>
**Fix:** Restrict PVC creation to authorized users and namespaces.

### Create Restrictive PVC Role

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: pvc-user
  namespace: production
rules:
  - apiGroups: [""]
    resources: ["persistentvolumeclaims"]
    verbs: ["get", "list", "watch"]
    # Note: create/delete omitted - only admins can manage PVCs
```

### Namespace-Level PVC Quotas

Limit PVC creation in namespaces:

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: storage-quota
  namespace: development
spec:
  hard:
    persistentvolumeclaims: "5"
    requests.storage: "50Gi"
```

---

## 3. Use Namespace-Scoped Storage Classes

**Issue:** Cluster-wide StorageClasses allow any namespace to provision volumes.<br/>
**Fix:** Use admission control to restrict which namespaces can use specific StorageClasses.

### Kyverno Policy to Restrict Storage Classes

```yaml
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: restrict-storage-classes
spec:
  validationFailureAction: Enforce
  rules:
    - name: restrict-premium-storage
      match:
        any:
          - resources:
              kinds:
                - PersistentVolumeClaim
      validate:
        message: "Premium storage class is only allowed in production namespace"
        deny:
          conditions:
            all:
              - key: "{{ request.object.spec.storageClassName }}"
                operator: Equals
                value: "premium-ssd"
              - key: "{{ request.namespace }}"
                operator: NotIn
                value: ["production", "database"]
```

---

## 4. Enforce Volume Encryption

**Issue:** Unencrypted volumes expose data if the underlying storage is compromised.<br/>
**Fix:** Require encryption for all PersistentVolumes.

### AWS EBS Encryption

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: encrypted-gp3
provisioner: ebs.csi.aws.com
parameters:
  type: gp3
  encrypted: "true"
  kmsKeyId: "arn:aws:kms:us-west-2:111122223333:key/1234abcd-12ab-34cd-56ef-1234567890ab"
```

### GCP PD Encryption

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: encrypted-pd
provisioner: pd.csi.storage.gke.io
parameters:
  type: pd-ssd
  disk-encryption-kms-key: "projects/my-project/locations/us-central1/keyRings/my-ring/cryptoKeys/my-key"
```

### Admission Policy to Require Encryption

```yaml
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: require-encrypted-storage
spec:
  validationFailureAction: Enforce
  rules:
    - name: require-encrypted-storage-class
      match:
        any:
          - resources:
              kinds:
                - PersistentVolumeClaim
      validate:
        message: "Only encrypted storage classes are allowed"
        pattern:
          spec:
            storageClassName: "*encrypted*"
```

---

## 5. Restrict Access Modes

**Issue:** `ReadWriteMany` (RWX) volumes allow multiple pods to access the same data, potentially across namespaces.<br/>
**Fix:** Limit use of RWX volumes and audit their usage.

### Admission Policy to Block RWX in Production

```yaml
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: restrict-rwx-volumes
spec:
  validationFailureAction: Enforce
  rules:
    - name: block-rwx-production
      match:
        any:
          - resources:
              kinds:
                - PersistentVolumeClaim
              namespaces:
                - production
      validate:
        message: "ReadWriteMany access mode is not allowed in production"
        pattern:
          spec:
            accessModes:
              - "!ReadWriteMany"
```

### Audit Existing RWX Volumes

```bash
kubectl get pv -o json | jq -r '.items[] | 
  select(.spec.accessModes[] | contains("ReadWriteMany")) | 
  "\(.metadata.name) - \(.spec.claimRef.namespace)/\(.spec.claimRef.name)"'
```

---

## 6. Implement Volume Snapshots Securely

**Issue:** Volume snapshots may contain sensitive data and be accessible to unauthorized users.<br/>
**Fix:** Restrict snapshot creation and access through RBAC.

### Restrict Snapshot Permissions

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: snapshot-reader
  namespace: production
rules:
  - apiGroups: ["snapshot.storage.k8s.io"]
    resources: ["volumesnapshots"]
    verbs: ["get", "list"]
    # create/delete restricted to admins
```

### Secure Snapshot Class

```yaml
apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshotClass
metadata:
  name: secure-snapshots
driver: ebs.csi.aws.com
deletionPolicy: Delete
parameters:
  encrypted: "true"
```

---

## 7. Monitor and Audit Volume Access

**Issue:** Unauthorized volume access may go undetected.<br/>
**Fix:** Enable audit logging for PV/PVC operations.

### API Server Audit Policy

```yaml
apiVersion: audit.k8s.io/v1
kind: Policy
rules:
  - level: RequestResponse
    resources:
      - group: ""
        resources: ["persistentvolumes", "persistentvolumeclaims"]
    verbs: ["create", "delete", "patch", "update"]
```

### Falco Rules for Volume Access

```yaml
- rule: Sensitive Volume Mount
  desc: Detect mounts of volumes containing sensitive data
  condition: >
    container.volume_mounts contains "/secrets" or
    container.volume_mounts contains "/credentials"
  output: >
    Sensitive volume mounted (pod=%k8s.pod.name 
    ns=%k8s.ns.name mount=%container.volume_mounts)
  priority: WARNING
```

---

## Security Checklist

- [ ] Storage classes use `Delete` reclaim policy
- [ ] Volume encryption enabled for all storage classes
- [ ] PVC creation restricted through RBAC
- [ ] Resource quotas limit storage per namespace
- [ ] RWX access mode restricted in production
- [ ] Volume snapshot permissions controlled
- [ ] Audit logging enabled for PV/PVC operations
- [ ] Regular review of released/available PVs
- [ ] Process to scrub retained volumes before reuse

---

## References

This article is based on information from the following official sources:

1. [Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) - Kubernetes Documentation
2. [Storage Classes](https://kubernetes.io/docs/concepts/storage/storage-classes/) - Kubernetes Documentation
3. [Volume Snapshots](https://kubernetes.io/docs/concepts/storage/volume-snapshots/) - Kubernetes Documentation
4. [Resource Quotas](https://kubernetes.io/docs/concepts/policy/resource-quotas/) - Kubernetes Documentation
