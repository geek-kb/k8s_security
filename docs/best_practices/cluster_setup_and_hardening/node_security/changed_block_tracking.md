---
title: "Changed Block Tracking for Volume Snapshots"
description: "Optimize backup and disaster recovery with Kubernetes v1.34 Changed Block Tracking API for efficient incremental volume snapshots."
sidebar_position: 7
keywords: [kubernetes security, changed block tracking, volume snapshots, backup and recovery, incremental backups, CSI driver, disaster recovery, storage security, CKS]
---

# Changed Block Tracking for Volume Snapshots

As of **Kubernetes v1.34**, the **Changed Block Tracking (CBT) API** is available in **alpha** status. This feature enhances the storage ecosystem by providing an efficient mechanism for CSI storage drivers to identify changed blocks in PersistentVolume snapshots, enabling faster incremental backups and disaster recovery operations.

**Issue:** Traditional full-volume snapshots are inefficient for large volumes, consuming excessive storage space and time, making frequent backups impractical.<br/>
**Fix:** Changed Block Tracking API enables CSI drivers to identify only the blocks that have changed since the last snapshot, dramatically reducing backup time and storage requirements.

---

## 1. Understanding Changed Block Tracking

Changed Block Tracking is a storage optimization technique that records which blocks of a volume have been modified since a previous snapshot. This information enables:

- **Incremental Backups** - Copy only changed data instead of entire volumes
- **Faster Disaster Recovery** - Restore only modified blocks
- **Reduced Storage Costs** - Store smaller differential snapshots
- **Improved RPO/RTO** - More frequent backups with less impact

### Security Benefits

- **Ransomware Detection** - Unusual block change patterns can indicate encryption attacks
- **Compliance** - Efficient backup windows enable more frequent snapshots for audit trails
- **Data Integrity** - Faster verification of backup consistency
- **Reduced Attack Surface** - Shorter backup windows mean less exposure time

---

## 2. How Changed Block Tracking Works

The CBT API introduces new resources and operations:

1. **VolumeSnapshotDelta** - Represents the differences between two snapshots
2. **Changed Block Query** - CSI driver API to retrieve changed block ranges
3. **Block Range Metadata** - Information about which blocks have changed

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Kubernetes API Server                    │
└────────────────────────────┬────────────────────────────────┘
                             │
                             │ CBT API Requests
                             │
┌────────────────────────────▼────────────────────────────────┐
│                    CSI Driver (with CBT)                    │
│  • Tracks block changes                                     │
│  • Maintains change bitmaps                                 │
│  • Provides delta information                               │
└────────────────────────────┬────────────────────────────────┘
                             │
                             │ Storage Backend Communication
                             │
┌────────────────────────────▼────────────────────────────────┐
│              Storage Backend (e.g., Ceph, NFS)              │
│  • Stores actual volume data                                │
│  • Maintains snapshots                                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Enabling Changed Block Tracking

### Prerequisites

- Kubernetes v1.34 or later
- CSI driver with CBT support (driver-specific)
- Feature gate enabled: `VolumeSnapshotDelta=true`

### Example: Enable CBT Feature Gate

For clusters using kubeadm, add to the API server configuration:

```yaml
apiVersion: kubeadm.k8s.io/v1beta4
kind: ClusterConfiguration
apiServer:
  extraArgs:
    feature-gates: "VolumeSnapshotDelta=true"
controllerManager:
  extraArgs:
    feature-gates: "VolumeSnapshotDelta=true"
```

For managed Kubernetes (EKS, GKE, AKS), consult provider documentation for alpha feature enablement.

---

## 4. Creating Snapshots with CBT

### Example: PersistentVolumeClaim with CBT-Compatible Storage

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: database-pvc
  namespace: production
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 100Gi
  storageClassName: cbt-enabled-storage
```

### Example: VolumeSnapshotClass with CBT Enabled

```yaml
apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshotClass
metadata:
  name: cbt-snapshot-class
driver: csi.example.com
deletionPolicy: Retain
parameters:
  enableChangedBlockTracking: "true"
  snapshotType: "incremental"
```

### Example: Create Initial Snapshot

```yaml
apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshot
metadata:
  name: database-snapshot-baseline
  namespace: production
spec:
  volumeSnapshotClassName: cbt-snapshot-class
  source:
    persistentVolumeClaimName: database-pvc
```

### Example: Create Incremental Snapshot

```yaml
apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshot
metadata:
  name: database-snapshot-incremental-1
  namespace: production
spec:
  volumeSnapshotClassName: cbt-snapshot-class
  source:
    persistentVolumeClaimName: database-pvc
  # Reference to previous snapshot for delta tracking
  sourceSnapshotName: database-snapshot-baseline
```

---

## 5. Querying Changed Blocks

**Issue:** Backup tools need efficient access to changed block information without reading entire volumes.<br/>
**Fix:** Use the VolumeSnapshotDelta API to query only changed blocks.

### Example: Query Changed Blocks Between Snapshots

```yaml
apiVersion: snapshot.storage.k8s.io/v1alpha1
kind: VolumeSnapshotDelta
metadata:
  name: database-delta-query
  namespace: production
spec:
  sourceSnapshot: database-snapshot-baseline
  targetSnapshot: database-snapshot-incremental-1
```

### Check Delta Query Status

```bash
kubectl get volumesnapshotdelta database-delta-query -n production -o yaml
```

**Example Output:**

```yaml
apiVersion: snapshot.storage.k8s.io/v1alpha1
kind: VolumeSnapshotDelta
metadata:
  name: database-delta-query
  namespace: production
status:
  changedBlocks:
    - startOffset: 1048576 # 1 MB
      length: 524288 # 512 KB
    - startOffset: 104857600 # 100 MB
      length: 1048576 # 1 MB
  totalChangedBytes: 1572864
  snapshotSizeBytes: 107374182400 # 100 GB
  percentageChanged: 0.00146
```

---

## 6. Security Considerations

**Issue:** Changed block information could reveal sensitive patterns about data modifications and application behavior.<br/>
**Fix:** Implement RBAC controls and encryption for CBT metadata and operations.

### Example: RBAC for CBT Operations

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: snapshot-operator
  namespace: production
rules:
  - apiGroups: ["snapshot.storage.k8s.io"]
    resources: ["volumesnapshots", "volumesnapshotdelta"]
    verbs: ["get", "list", "create", "delete"]
  - apiGroups: ["snapshot.storage.k8s.io"]
    resources: ["volumesnapshotclasses"]
    verbs: ["get", "list"]
  - apiGroups: [""]
    resources: ["persistentvolumeclaims"]
    verbs: ["get", "list"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: backup-operator-binding
  namespace: production
subjects:
  - kind: ServiceAccount
    name: backup-operator
    namespace: production
roleRef:
  kind: Role
  name: snapshot-operator
  apiGroup: rbac.authorization.k8s.io
```

### Restrict CBT Access to Backup Tools Only

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: cbt-admin
rules:
  - apiGroups: ["snapshot.storage.k8s.io"]
    resources: ["volumesnapshotdelta"]
    verbs: ["*"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: velero-cbt-access
subjects:
  - kind: ServiceAccount
    name: velero
    namespace: velero
roleRef:
  kind: ClusterRole
  name: cbt-admin
  apiGroup: rbac.authorization.k8s.io
```

---

## 7. Integration with Backup Tools

### Velero Integration Example

**Issue:** Traditional Velero backups copy entire volumes even when minimal data has changed.<br/>
**Fix:** Use CBT-aware Velero plugins for incremental volume backups.

```yaml
apiVersion: velero.io/v1
kind: Backup
metadata:
  name: production-incremental
  namespace: velero
spec:
  includedNamespaces:
    - production
  snapshotVolumes: true
  volumeSnapshotLocations:
    - cbt-enabled-location
  csiSnapshotTimeout: 10m
  # Enable CBT for incremental snapshots
  hooks:
    resources:
      - name: use-changed-block-tracking
        includedNamespaces:
          - production
        labelSelector:
          matchLabels:
            backup-method: incremental
```

### Custom Backup Script with CBT

```bash
#!/bin/bash
# Incremental backup script using CBT API

NAMESPACE="production"
PVC_NAME="database-pvc"
BASELINE_SNAPSHOT="database-snapshot-baseline"
NEW_SNAPSHOT="database-snapshot-$(date +%Y%m%d-%H%M%S)"

# Create new snapshot
kubectl create -f - <<EOF
apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshot
metadata:
  name: ${NEW_SNAPSHOT}
  namespace: ${NAMESPACE}
spec:
  volumeSnapshotClassName: cbt-snapshot-class
  source:
    persistentVolumeClaimName: ${PVC_NAME}
  sourceSnapshotName: ${BASELINE_SNAPSHOT}
EOF

# Wait for snapshot to be ready
kubectl wait --for=condition=ReadyToUse \
  volumesnapshot/${NEW_SNAPSHOT} \
  -n ${NAMESPACE} \
  --timeout=300s

# Query changed blocks
kubectl create -f - <<EOF
apiVersion: snapshot.storage.k8s.io/v1alpha1
kind: VolumeSnapshotDelta
metadata:
  name: ${NEW_SNAPSHOT}-delta
  namespace: ${NAMESPACE}
spec:
  sourceSnapshot: ${BASELINE_SNAPSHOT}
  targetSnapshot: ${NEW_SNAPSHOT}
EOF

# Extract and backup only changed blocks
kubectl get volumesnapshotdelta ${NEW_SNAPSHOT}-delta \
  -n ${NAMESPACE} \
  -o jsonpath='{.status.changedBlocks}' | \
  jq -r '.[] | "\(.startOffset) \(.length)"' | \
  while read offset length; do
    echo "Backing up changed block: offset=$offset length=$length"
    # Custom logic to extract and backup changed blocks
  done
```

---

## 8. Monitoring and Alerting

**Issue:** CBT operations can fail silently, leading to incomplete backups and data loss risks.<br/>
**Fix:** Implement monitoring and alerting for CBT operations and snapshot health.

### Prometheus Metrics to Monitor

```promql
# Failed snapshot operations
rate(volume_snapshot_failures_total[5m]) > 0

# CBT query duration
histogram_quantile(0.99, rate(cbt_query_duration_seconds_bucket[5m])) > 30

# Changed block percentage (detect ransomware)
cbt_changed_blocks_percentage > 50

# Snapshot age (detect stale backups)
time() - volume_snapshot_creation_timestamp_seconds > 86400
```

### Example PrometheusRule for CBT Alerts

```yaml
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: cbt-alerts
  namespace: monitoring
spec:
  groups:
    - name: changed-block-tracking
      interval: 30s
      rules:
        - alert: CBTQueryFailed
          expr: cbt_query_failures_total > 0
          for: 5m
          labels:
            severity: warning
          annotations:
            summary: "Changed Block Tracking query failed"
            description: "CBT query for {{ $labels.namespace }}/{{ $labels.snapshot }} has failed"

        - alert: UnusualBlockChangeRate
          expr: cbt_changed_blocks_percentage > 70
          for: 10m
          labels:
            severity: critical
          annotations:
            summary: "Unusual percentage of blocks changed (possible ransomware)"
            description: "Volume {{ $labels.pvc }} shows {{ $value }}% blocks changed, investigate immediately"

        - alert: SnapshotStale
          expr: (time() - volume_snapshot_creation_timestamp_seconds) / 3600 > 24
          for: 1h
          labels:
            severity: warning
          annotations:
            summary: "Volume snapshot is over 24 hours old"
            description: "Snapshot {{ $labels.snapshot }} in {{ $labels.namespace }} has not been updated"
```

---

## 9. Best Practices for CBT

- ✅ **Enable only on supported CSI drivers** - Verify driver CBT capabilities before enabling
- ✅ **Use incremental snapshots for large volumes** - CBT is most beneficial for volumes >100GB
- ✅ **Implement RBAC restrictions** - Limit CBT query access to backup tools only
- ✅ **Monitor change patterns** - Alert on unusual block change rates (ransomware detection)
- ✅ **Test restore procedures** - Regularly validate incremental backup restores
- ✅ **Retain baseline snapshots** - Keep full snapshots for recovery validation
- ✅ **Implement snapshot retention policies** - Automate cleanup of old snapshots
- ✅ **Encrypt snapshot data** - Use storage backend encryption for snapshot security
- ✅ **Document snapshot dependencies** - Track which incremental snapshots depend on baselines
- ✅ **Monitor CBT performance** - Track query latency and optimize as needed

---

## 10. Security Checklist

- ✅ CBT feature gate enabled only in controlled environments (alpha feature)
- ✅ RBAC policies restrict VolumeSnapshotDelta access to backup operators
- ✅ Snapshot encryption enabled at storage backend level
- ✅ Monitoring and alerting configured for CBT operations
- ✅ Unusual block change rate alerts configured for ransomware detection
- ✅ Baseline snapshots protected from accidental deletion
- ✅ Backup and restore procedures tested regularly
- ✅ Snapshot retention policies automated and audited
- ✅ Access logs enabled for snapshot and CBT operations
- ✅ Documentation maintained for CBT-enabled volumes and dependencies

---

## 11. Limitations and Considerations

As an alpha feature in Kubernetes v1.34, Changed Block Tracking has important limitations:

- **CSI Driver Support** - Limited to CSI drivers that implement CBT (check driver documentation)
- **Performance Overhead** - Block tracking adds small overhead to I/O operations
- **Storage Backend Requirements** - Underlying storage must support efficient delta tracking
- **API Stability** - Alpha API may change in future Kubernetes versions
- **Limited Tooling** - Backup tools are still adding CBT support
- **Documentation** - Vendor-specific implementation details may vary

**Recommendation:** Test thoroughly in non-production environments before enabling in production clusters.

---

## References

This article is based on information from the following official sources:

1. [Volume Snapshots](https://kubernetes.io/docs/concepts/storage/volume-snapshots/) - Kubernetes Documentation
2. [CSI Driver Documentation](https://kubernetes-csi.github.io/docs/) - Kubernetes CSI Developer Documentation
3. [Kubernetes Enhancement Proposals - sig-storage](https://github.com/kubernetes/enhancements/tree/master/keps/sig-storage) - Kubernetes GitHub
4. [Velero Documentation](https://velero.io/docs/) - Velero Project
