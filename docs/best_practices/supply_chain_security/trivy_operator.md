---
sidebar_position: 10
title: "Trivy Operator"
description: "Trivy Operator provides Kubernetes-native security scanning by automatically scanning workloads for vulnerabilities, misconfigurations, secrets, and RBAC issues."
keywords: [kubernetes security tool, trivy operator, vulnerability scanning, kubernetes native, aqua security, container security, misconfiguration, compliance, CKS]
tags: [tool, supply-chain, vulnerability-scanning, runtime-security, CKS]
related:
  - /docs/best_practices/monitoring_logging_and_runtime_security/trivy/
  - /docs/best_practices/supply_chain_security/supply_chain_best_practices/
  - /docs/best_practices/supply_chain_security/kubei/
---

# Trivy Operator

**Trivy Operator** is a Kubernetes-native security tool that continuously runs security scans by leveraging Trivy. It automatically discovers workloads and stores scan results as Kubernetes Custom Resources, making security findings accessible through the Kubernetes API and kubectl.

Unlike standalone Trivy, the operator integrates directly into the Kubernetes lifecycle, scanning new deployments automatically and providing a unified view of cluster security posture.

---

## Key Features

- **Automatic scanning** of deployed workloads.
- **Vulnerability detection** in container images.
- **Misconfiguration scanning** of Kubernetes resources.
- **Secret detection** in container images and configs.
- **RBAC assessment** for role security risks.
- **Compliance reporting** against CIS benchmarks.
- **Kubernetes-native** results stored as CRDs.

---

## Installation

### Using Helm

```bash
helm repo add aqua https://aquasecurity.github.io/helm-charts/
helm repo update
helm install trivy-operator aqua/trivy-operator \
  --namespace trivy-system \
  --create-namespace
```

### Using kubectl

```bash
kubectl apply -f https://raw.githubusercontent.com/aquasecurity/trivy-operator/main/deploy/static/trivy-operator.yaml
```

---

## Custom Resource Definitions

Trivy Operator creates several CRDs to store scan results:

### VulnerabilityReport

Stores container image vulnerability findings:

```yaml
apiVersion: aquasecurity.github.io/v1alpha1
kind: VulnerabilityReport
metadata:
  name: deployment-nginx-nginx
  namespace: production
spec:
  scanner:
    name: Trivy
    version: 0.45.0
  registry:
    server: docker.io
  artifact:
    repository: library/nginx
    tag: 1.25.3
  summary:
    criticalCount: 0
    highCount: 2
    mediumCount: 15
    lowCount: 8
  vulnerabilities:
    - vulnerabilityID: CVE-2023-44487
      severity: HIGH
      resource: nghttp2
      installedVersion: "1.51.0"
      fixedVersion: "1.57.0"
```

### ConfigAuditReport

Stores Kubernetes misconfiguration findings:

```yaml
apiVersion: aquasecurity.github.io/v1alpha1
kind: ConfigAuditReport
metadata:
  name: deployment-nginx
  namespace: production
spec:
  scanner:
    name: Trivy
    version: 0.45.0
  summary:
    criticalCount: 1
    highCount: 3
    mediumCount: 5
    lowCount: 2
  checks:
    - checkID: KSV001
      title: Container runs as root
      severity: MEDIUM
      category: Kubernetes Security Check
      success: false
```

### ExposedSecretReport

Stores detected secrets in images:

```yaml
apiVersion: aquasecurity.github.io/v1alpha1
kind: ExposedSecretReport
metadata:
  name: deployment-nginx-nginx
  namespace: production
spec:
  secrets:
    - target: /app/.env
      ruleID: aws-access-key-id
      title: AWS Access Key ID
      severity: CRITICAL
```

### RbacAssessmentReport

Stores RBAC security assessment:

```yaml
apiVersion: aquasecurity.github.io/v1alpha1
kind: RbacAssessmentReport
metadata:
  name: role-admin-role
  namespace: production
spec:
  checks:
    - checkID: KSV041
      title: Role permits wildcard verb
      severity: HIGH
      success: false
```

---

## Querying Results

### List All Vulnerability Reports

```bash
kubectl get vulnerabilityreports -A
```

### Get Detailed Report

```bash
kubectl describe vulnerabilityreport deployment-nginx-nginx -n production
```

### Find Critical Vulnerabilities

```bash
kubectl get vulnerabilityreports -A -o json | \
  jq '.items[] | select(.report.summary.criticalCount > 0) | .metadata.name'
```

### List ConfigAudit Failures

```bash
kubectl get configauditreports -A -o json | \
  jq '.items[] | select(.report.summary.criticalCount > 0) | {name: .metadata.name, namespace: .metadata.namespace}'
```

### Export All Reports

```bash
kubectl get vulnerabilityreports -A -o yaml > vulnerability-reports.yaml
kubectl get configauditreports -A -o yaml > config-audit-reports.yaml
```

---

## Configuration

### Helm Values

```yaml
# values.yaml
trivy:
  severity: CRITICAL,HIGH,MEDIUM
  ignoreUnfixed: true
  timeout: 10m0s
  
operator:
  scanJobTimeout: 5m
  scanJobsConcurrentLimit: 10
  vulnerabilityScannerEnabled: true
  configAuditScannerEnabled: true
  rbacAssessmentScannerEnabled: true
  exposedSecretScannerEnabled: true

compliance:
  cron: "0 */6 * * *"  # Every 6 hours
```

### ConfigMap Configuration

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: trivy-operator
  namespace: trivy-system
data:
  trivy.severity: CRITICAL,HIGH,MEDIUM
  trivy.ignoreUnfixed: "true"
  scanJob.podTemplateLabels: "app=trivy-scan"
  vulnerabilityReports.scanner: Trivy
```

---

## Integration

### Prometheus Metrics

Trivy Operator exposes Prometheus metrics:

```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: trivy-operator
  namespace: trivy-system
spec:
  selector:
    matchLabels:
      app.kubernetes.io/name: trivy-operator
  endpoints:
    - port: metrics
```

### Alert on Critical Vulnerabilities

```yaml
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: trivy-operator-alerts
  namespace: trivy-system
spec:
  groups:
    - name: trivy-operator
      rules:
        - alert: CriticalVulnerabilityDetected
          expr: trivy_vulnerability_info{severity="Critical"} > 0
          for: 5m
          labels:
            severity: critical
          annotations:
            summary: "Critical vulnerability detected in {{ $labels.image_name }}"
```

### kubectl Plugin

Install the Trivy kubectl plugin for easier querying:

```bash
kubectl krew install trivy-operator

# View vulnerabilities
kubectl trivy-operator vulnerabilities

# View config audit
kubectl trivy-operator configaudits
```

---

## Compliance Scanning

### Enable CIS Benchmark Scans

```yaml
# In Helm values
compliance:
  cron: "0 */6 * * *"
  reportType: "summary"
  specs:
    - k8s-cis
```

### View Compliance Reports

```bash
kubectl get clustercompliancereports
kubectl describe clustercompliancereport k8s-cis
```

---

## Best Practices

- **Enable all scanners:** Use vulnerability, config audit, RBAC, and secret scanning together.
- **Set severity thresholds:** Focus alerts on critical and high severity findings.
- **Monitor metrics:** Integrate with Prometheus for visibility and alerting.
- **Regular rescans:** Configure periodic rescanning to catch newly disclosed CVEs.
- **Automate remediation:** Use results to drive automated patching workflows.

---

## Comparison with Standalone Trivy

| Feature | Trivy CLI | Trivy Operator |
|---------|-----------|----------------|
| CI/CD integration | Primary use case | Supplementary |
| Runtime scanning | Manual | Automatic |
| Results storage | Files/stdout | Kubernetes CRDs |
| kubectl integration | No | Yes |
| Continuous monitoring | Requires scripting | Built-in |
| Cluster-wide view | Manual aggregation | Automatic |

---

## References

This article is based on information from the following official sources:

1. [Trivy Operator Documentation](https://aquasecurity.github.io/trivy-operator/) - Aqua Security
2. [Trivy Operator GitHub Repository](https://github.com/aquasecurity/trivy-operator) - Aqua Security
3. [CIS Kubernetes Benchmark](https://www.cisecurity.org/benchmark/kubernetes) - CIS
