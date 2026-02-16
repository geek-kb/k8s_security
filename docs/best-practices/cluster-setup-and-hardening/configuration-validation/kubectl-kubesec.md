---
sidebar_position: 10
title: "kubectl-kubesec"
description: "kubectl-kubesec is a kubectl plugin that scans Kubernetes resources using kubesec.io to identify security risks and provide hardening recommendations."
keywords: [kubernetes security tool, kubectl-kubesec, kubesec, security scanning, kubernetes hardening, pod security, configuration validation, security score, CKS]
tags: [tool, configuration-validation, security-scanning, CKS]
related:
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/configuration-validation/kube-score/
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/pod-security/pod-security-standards/
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/configuration-validation/kube-linter/
---

# kubectl-kubesec

**kubectl-kubesec** is a kubectl plugin that integrates kubesec.io security scanning directly into your Kubernetes workflow. It analyzes Kubernetes resources (Pods, Deployments, StatefulSets, DaemonSets) for security risks and provides actionable recommendations for hardening.

kubesec assigns a security score based on detected issues, making it easy to track security improvements over time.

---

## How It Works

kubectl-kubesec sends Kubernetes resource definitions to the kubesec.io API (or a local kubesec instance) for analysis. The scanner evaluates:

- Security context configurations
- Container capabilities
- Volume mount security
- Resource limits and requests
- Network configuration
- Service account settings

Each finding affects the overall security score, with critical issues resulting in score deductions.

---

## Installation

### Using krew

```bash
kubectl krew install kubesec-scan
```

### Manual Installation

```bash
# Download the plugin
curl -LO https://github.com/controlplaneio/kubectl-kubesec/releases/download/v2.0.0/kubectl-kubesec_linux_amd64.tar.gz

# Extract and install
tar xzf kubectl-kubesec_linux_amd64.tar.gz
chmod +x kubectl-kubesec
sudo mv kubectl-kubesec /usr/local/bin/
```

---

## Usage Examples

### Scan a Running Pod

```bash
kubectl kubesec-scan pod my-pod -n production
```

### Scan a Deployment

```bash
kubectl kubesec-scan deployment my-deployment
```

### Scan a DaemonSet

```bash
kubectl kubesec-scan daemonset my-daemonset -n kube-system
```

### Scan a StatefulSet

```bash
kubectl kubesec-scan statefulset my-statefulset
```

### Scan from YAML File

```bash
kubectl kubesec-scan -f deployment.yaml
```

### Scan Multiple Resources

```bash
kubectl kubesec-scan -f ./manifests/
```

---

## Example Output

```
[
  {
    "object": "Pod/my-app.production",
    "valid": true,
    "fileName": "STDIN",
    "message": "",
    "score": 3,
    "scoring": {
      "critical": [
        {
          "id": "Privileged",
          "selector": "containers[] .securityContext .privileged == true",
          "reason": "Privileged containers share namespaces with the host system",
          "points": -30
        }
      ],
      "passed": [
        {
          "id": "ReadOnlyRootFilesystem",
          "selector": "containers[] .securityContext .readOnlyRootFilesystem == true",
          "reason": "Immutable container filesystems prevent runtime modifications",
          "points": 1
        },
        {
          "id": "RunAsNonRoot",
          "selector": "containers[] .securityContext .runAsNonRoot == true",
          "reason": "Force the container to run as a non-root user",
          "points": 1
        }
      ],
      "advise": [
        {
          "id": "ApparmorAny",
          "selector": ".metadata .annotations .\"container.apparmor.security.beta.kubernetes.io/nginx\"",
          "reason": "AppArmor prevents execution of arbitrary code",
          "points": 3
        }
      ]
    }
  }
]
```

---

## Understanding Scores

### Score Components

| Category | Description | Points |
|----------|-------------|--------|
| Critical | Severe security issues | -30 to -10 |
| Passed | Security best practices followed | +1 to +5 |
| Advise | Recommended improvements | +1 to +3 (if implemented) |

### Score Interpretation

| Score | Assessment |
|-------|------------|
| < 0 | Critical issues present, requires immediate attention |
| 0-3 | Poor security posture, significant hardening needed |
| 4-6 | Moderate security, some improvements recommended |
| 7+ | Good security posture |

---

## Common Findings and Remediations

### Critical: Privileged Container

**Issue:** Container runs in privileged mode

**Remediation:**
```yaml
spec:
  containers:
    - name: my-container
      securityContext:
        privileged: false
```

### Critical: No Security Context

**Issue:** Container lacks security context

**Remediation:**
```yaml
spec:
  containers:
    - name: my-container
      securityContext:
        runAsNonRoot: true
        runAsUser: 1000
        readOnlyRootFilesystem: true
        allowPrivilegeEscalation: false
        capabilities:
          drop:
            - ALL
```

### Advise: AppArmor Profile

**Issue:** No AppArmor profile specified

**Remediation:**
```yaml
metadata:
  annotations:
    container.apparmor.security.beta.kubernetes.io/my-container: runtime/default
```

### Advise: Resource Limits

**Issue:** No resource limits specified

**Remediation:**
```yaml
spec:
  containers:
    - name: my-container
      resources:
        limits:
          cpu: "1"
          memory: "512Mi"
        requests:
          cpu: "100m"
          memory: "128Mi"
```

---

## CI/CD Integration

### GitHub Actions

```yaml
name: Security Scan
on: [push, pull_request]

jobs:
  kubesec:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Run kubesec scanner
        uses: controlplaneio/kubesec-action@v2
        with:
          input: deployment.yaml
          
      - name: Check score
        run: |
          score=$(cat kubesec-results.json | jq '.[0].score')
          if [ "$score" -lt 0 ]; then
            echo "Security score too low: $score"
            exit 1
          fi
```

### Shell Script for CI

```bash
#!/bin/bash
set -e

# Scan all YAML files
for file in $(find ./kubernetes -name "*.yaml"); do
  echo "Scanning $file..."
  result=$(kubectl kubesec-scan -f "$file" 2>/dev/null || true)
  score=$(echo "$result" | jq '.[0].score // 0')
  
  if [ "$score" -lt 0 ]; then
    echo "FAILED: $file has critical security issues (score: $score)"
    echo "$result" | jq '.[0].scoring.critical'
    exit 1
  fi
done

echo "All resources passed security scan"
```

---

## Local kubesec Server

For air-gapped environments or to avoid sending manifests externally:

```bash
# Run kubesec locally
docker run -d -p 8080:8080 kubesec/kubesec http 8080

# Use local server
kubectl kubesec-scan pod my-pod --server http://localhost:8080
```

---

## Best Practices

- **Set minimum scores:** Require a minimum security score for production deployments.
- **Integrate into CI/CD:** Block merges or deployments that fail security scans.
- **Address critical issues first:** Focus on negative-scoring findings before optimizing.
- **Use local scanning:** Run a local kubesec server for sensitive environments.
- **Combine with other tools:** Use alongside kube-linter and kube-score for comprehensive validation.

---

## References

This article is based on information from the following official sources:

1. [kubectl-kubesec GitHub Repository](https://github.com/controlplaneio/kubectl-kubesec) - Control Plane
2. [kubesec.io](https://kubesec.io/) - kubesec.io
3. [Pod Security Standards](https://kubernetes.io/docs/concepts/security/pod-security-standards/) - Kubernetes Documentation
