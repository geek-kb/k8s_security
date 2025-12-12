---
title: "Pod-Level Resource Management"
description: "Secure and optimize resource allocation with Kubernetes v1.34 Pod-Level Resources feature for enhanced workload isolation and multi-tenancy."
sidebar_position: 8
---

# Pod-Level Resource Management

As of **Kubernetes v1.34**, the **Pod-Level Resources** feature has graduated to **Beta** and is **enabled by default**. This feature introduces a new layer of flexibility for resource management, allowing resources to be defined at the Pod level rather than only at the container level.

**Issue:** Traditional container-level resource requests and limits lack flexibility for complex multi-container Pods, making it difficult to manage shared resources and enforce security boundaries.<br/>
**Fix:** Pod-Level Resources enable defining resource constraints at the Pod boundary, improving resource isolation, multi-tenancy security, and efficient resource allocation.

---

## 1. Understanding Pod-Level Resources

Pod-Level Resources allow administrators and developers to specify resource requirements and limits that apply to the entire Pod, rather than aggregating individual container specifications.

### Key Security and Operational Benefits

- **Enhanced Multi-Tenancy** - Better resource isolation between tenants sharing the same cluster
- **Simplified Resource Management** - Define resource budgets at the Pod level for complex deployments
- **Improved Scheduling** - More accurate resource requirements lead to better placement decisions
- **Cost Optimization** - Reduce over-provisioning by setting realistic Pod-level constraints
- **Security Boundaries** - Enforce resource limits to prevent noisy neighbor attacks and resource exhaustion

---

## 2. Pod-Level Resource Syntax

### Example: Basic Pod-Level Resource Definition

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: multi-container-app
  namespace: production
spec:
  resources:
    requests:
      cpu: "2"
      memory: "4Gi"
    limits:
      cpu: "4"
      memory: "8Gi"
  containers:
    - name: app-server
      image: app:v1.0
      resources:
        requests:
          cpu: "1"
          memory: "2Gi"
        limits:
          cpu: "2"
          memory: "4Gi"
    - name: sidecar-proxy
      image: envoy:v1.28
      resources:
        requests:
          cpu: "500m"
          memory: "1Gi"
        limits:
          cpu: "1"
          memory: "2Gi"
    - name: log-collector
      image: fluentd:v1.16
      resources:
        requests:
          cpu: "500m"
          memory: "1Gi"
        limits:
          cpu: "1"
          memory: "2Gi"
```

### Resource Allocation Behavior

- **Pod-level requests** define the minimum resources guaranteed to the entire Pod
- **Pod-level limits** define the maximum resources the Pod can consume
- **Container-level resources** must fit within Pod-level boundaries
- The scheduler uses **Pod-level requests** for placement decisions

**Important:** If both Pod-level and container-level resources are specified, Pod-level resources take precedence for scheduling, but container-level limits are still enforced by the container runtime.

---

## 3. Security Implications

**Issue:** Without Pod-level resource constraints, a compromised container could consume excessive resources, affecting other containers in the same Pod and cluster-wide stability.<br/>
**Fix:** Pod-Level Resources provide an additional security boundary preventing resource-based attacks.

### Resource Exhaustion Attack Prevention

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: security-hardened-pod
  namespace: production
spec:
  resources:
    requests:
      cpu: "1"
      memory: "2Gi"
      ephemeral-storage: "10Gi"
    limits:
      cpu: "2"
      memory: "4Gi"
      ephemeral-storage: "20Gi"
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    fsGroup: 2000
    seccompProfile:
      type: RuntimeDefault
  containers:
    - name: web-app
      image: webapp:secure-v1
      securityContext:
        allowPrivilegeEscalation: false
        capabilities:
          drop:
            - ALL
        readOnlyRootFilesystem: true
      resources:
        requests:
          cpu: "500m"
          memory: "1Gi"
        limits:
          cpu: "1"
          memory: "2Gi"
    - name: auth-proxy
      image: oauth-proxy:v7.5
      securityContext:
        allowPrivilegeEscalation: false
        capabilities:
          drop:
            - ALL
        readOnlyRootFilesystem: true
      resources:
        requests:
          cpu: "500m"
          memory: "1Gi"
        limits:
          cpu: "1"
          memory: "2Gi"
```

### Security Best Practices

1. **Always Set Pod-Level Limits** - Prevent unbounded resource consumption
2. **Enforce Ephemeral Storage Limits** - Prevent disk exhaustion attacks
3. **Combine with ResourceQuotas** - Enforce limits at namespace level
4. **Monitor Resource Usage** - Alert on Pods approaching limits
5. **Use LimitRanges** - Set default Pod-level resources for namespaces

---

## 4. Multi-Tenancy and Resource Isolation

**Issue:** In multi-tenant clusters, tenants may compete for resources, leading to performance degradation and security concerns.<br/>
**Fix:** Pod-Level Resources combined with ResourceQuotas provide strong isolation between tenants.

### Example: Tenant Namespace with Pod-Level Quotas

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: tenant-quota
  namespace: tenant-a
spec:
  hard:
    pods: "50"
    requests.cpu: "100"
    requests.memory: "200Gi"
    limits.cpu: "200"
    limits.memory: "400Gi"
    persistentvolumeclaims: "20"
  scopeSelector:
    matchExpressions:
      - operator: In
        scopeName: PriorityClass
        values: ["tenant-standard", "tenant-high"]
```

### LimitRange for Default Pod-Level Resources

```yaml
apiVersion: v1
kind: LimitRange
metadata:
  name: pod-level-defaults
  namespace: tenant-a
spec:
  limits:
    - type: Pod
      max:
        cpu: "8"
        memory: "16Gi"
      min:
        cpu: "100m"
        memory: "128Mi"
      default:
        cpu: "1"
        memory: "2Gi"
      defaultRequest:
        cpu: "500m"
        memory: "1Gi"
    - type: Container
      max:
        cpu: "4"
        memory: "8Gi"
      min:
        cpu: "50m"
        memory: "64Mi"
```

---

## 5. Integration with Pod Security Standards

Pod-Level Resources work seamlessly with Pod Security Standards to provide comprehensive security:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: secure-workloads
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/audit: restricted
    pod-security.kubernetes.io/warn: restricted
---
apiVersion: v1
kind: Pod
metadata:
  name: restricted-pod-with-resources
  namespace: secure-workloads
spec:
  resources:
    requests:
      cpu: "500m"
      memory: "1Gi"
    limits:
      cpu: "2"
      memory: "4Gi"
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    fsGroup: 2000
    seccompProfile:
      type: RuntimeDefault
  containers:
    - name: app
      image: secure-app:v1
      securityContext:
        allowPrivilegeEscalation: false
        capabilities:
          drop:
            - ALL
        readOnlyRootFilesystem: true
      resources:
        requests:
          cpu: "500m"
          memory: "1Gi"
        limits:
          cpu: "2"
          memory: "4Gi"
```

---

## 6. Monitoring Pod-Level Resource Usage

**Issue:** Without visibility into Pod-level resource consumption, detecting anomalies and optimizing allocations is difficult.<br/>
**Fix:** Use Kubernetes metrics and monitoring tools to track Pod-level resource usage.

### Prometheus Queries for Pod-Level Resources

```promql
# Pod CPU usage as percentage of Pod-level requests
100 * sum(rate(container_cpu_usage_seconds_total[5m])) by (pod, namespace) /
on(pod, namespace) group_left()
sum(kube_pod_container_resource_requests{resource="cpu"}) by (pod, namespace)

# Pod memory usage as percentage of Pod-level limits
100 * sum(container_memory_working_set_bytes) by (pod, namespace) /
on(pod, namespace) group_left()
sum(kube_pod_container_resource_limits{resource="memory"}) by (pod, namespace)

# Pods exceeding 90% of resource limits
sum(container_memory_working_set_bytes) by (pod, namespace) /
on(pod, namespace) group_left()
sum(kube_pod_container_resource_limits{resource="memory"}) by (pod, namespace) > 0.9
```

### Recommended Alerts

```yaml
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: pod-resource-alerts
  namespace: monitoring
spec:
  groups:
    - name: pod-resources
      interval: 30s
      rules:
        - alert: PodCPUThrottling
          expr: |
            rate(container_cpu_cfs_throttled_seconds_total[5m]) > 0.5
          for: 10m
          labels:
            severity: warning
          annotations:
            summary: "Pod {{ $labels.pod }} in namespace {{ $labels.namespace }} is being CPU throttled"
            description: "Pod is experiencing significant CPU throttling, consider increasing resource limits"

        - alert: PodMemoryNearLimit
          expr: |
            (sum(container_memory_working_set_bytes) by (pod, namespace) /
            sum(kube_pod_container_resource_limits{resource="memory"}) by (pod, namespace)) > 0.9
          for: 5m
          labels:
            severity: warning
          annotations:
            summary: "Pod {{ $labels.pod }} is using over 90% of memory limit"
            description: "Pod may be at risk of OOMKill, consider increasing memory limits"
```

---

## 7. Migration from Container-Only Resources

For existing workloads, migrating to Pod-Level Resources should be done gradually:

### Migration Strategy

1. **Analyze Current Usage** - Use metrics to understand actual resource consumption
2. **Calculate Pod-Level Requirements** - Sum container requests/limits plus overhead
3. **Test in Non-Production** - Validate behavior with Pod-level resources
4. **Implement Gradually** - Migrate one workload at a time
5. **Monitor and Adjust** - Fine-tune based on observed behavior

### Example Migration

**Before (Container-Only):**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: legacy-app
spec:
  containers:
    - name: app
      image: app:v1
      resources:
        requests:
          cpu: "1"
          memory: "2Gi"
        limits:
          cpu: "2"
          memory: "4Gi"
    - name: sidecar
      image: sidecar:v1
      resources:
        requests:
          cpu: "500m"
          memory: "1Gi"
        limits:
          cpu: "1"
          memory: "2Gi"
```

**After (Pod-Level + Container):**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: modernized-app
spec:
  resources:
    requests:
      cpu: "1.5"      # Slightly more than sum for flexibility
      memory: "3Gi"
    limits:
      cpu: "3"        # Allows burst capacity
      memory: "6Gi"
  containers:
    - name: app
      image: app:v1
      resources:
        requests:
          cpu: "1"
          memory: "2Gi"
        limits:
          cpu: "2"
          memory: "4Gi"
    - name: sidecar
      image: sidecar:v1
      resources:
        requests:
          cpu: "500m"
          memory: "1Gi"
        limits:
          cpu: "1"
          memory: "2Gi"
```

---

## 8. Best Practices for Pod-Level Resources

- ✅ **Always define Pod-level limits** to prevent resource exhaustion
- ✅ **Set realistic requests** based on actual usage patterns
- ✅ **Include ephemeral storage limits** to prevent disk-based attacks
- ✅ **Combine with ResourceQuotas** for namespace-level enforcement
- ✅ **Use LimitRanges** to set sensible defaults
- ✅ **Monitor resource usage** continuously with Prometheus and Grafana
- ✅ **Implement alerting** for Pods approaching limits
- ✅ **Test in non-production** before applying to critical workloads
- ✅ **Document resource rationale** for future optimization
- ✅ **Review and adjust** quarterly based on usage trends

---

## 9. Security Checklist

- ✅ Pod-level resource requests and limits defined for all Pods
- ✅ Ephemeral storage limits configured to prevent disk exhaustion
- ✅ ResourceQuotas enforced at namespace level
- ✅ LimitRanges configured for default Pod-level resources
- ✅ Monitoring and alerting configured for resource usage
- ✅ Pod Security Standards (Restricted) enforced in sensitive namespaces
- ✅ Container-level resources align with Pod-level boundaries
- ✅ Regular audits of resource allocation vs. actual usage
- ✅ Documentation of resource requirements for each workload
- ✅ Incident response plan for resource exhaustion scenarios

---

## Additional Resources

- [Kubernetes Pod-Level Resources Documentation](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/)
- [Kubernetes Resource Management Best Practices](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/)
- [Pod Security Standards](https://kubernetes.io/docs/concepts/security/pod-security-standards/)
- [Resource Quotas](https://kubernetes.io/docs/concepts/policy/resource-quotas/)
- [Limit Ranges](https://kubernetes.io/docs/concepts/policy/limit-range/)
