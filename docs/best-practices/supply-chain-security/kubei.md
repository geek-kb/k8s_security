---
sidebar_position: 9
title: "Kubei"
description: "Kubei is a Kubernetes runtime vulnerability scanner that identifies vulnerabilities in container images across your cluster in real-time."
keywords: [kubernetes security tool, kubei, vulnerability scanner, container security, image scanning, runtime scanning, CVE detection, kubernetes security, CKS]
tags: [tool, supply-chain, vulnerability-scanning, CKS]
related:
  - /kubernetes-security/best-practices/monitoring-logging-and-runtime-security/trivy/
  - /kubernetes-security/best-practices/supply-chain-security/supply-chain-best-practices/
  - /kubernetes-security/best-practices/supply-chain-security/trivy-operator/
---

# Kubei

**Kubei** is a Kubernetes runtime vulnerability scanner developed by Portshift (now part of Cisco). It scans container images deployed in your cluster to identify known vulnerabilities (CVEs) in real-time. Unlike CI/CD-time scanning, Kubei provides continuous visibility into what is actually running in production.

Kubei deploys a scanner pod that analyzes images from your cluster's container registry and reports findings through a web dashboard.

---

## Key Features

- **Runtime image scanning** of deployed containers.
- **Automatic discovery** of all images in the cluster.
- **CVE database** integration for vulnerability detection.
- **Web dashboard** for visualization and reporting.
- **CI/CD integration** via API.

---

## Installation

### Using kubectl

```bash
kubectl apply -f https://raw.githubusercontent.com/Portshift/kubei/master/deploy/kubei.yaml
```

### Using Helm

```bash
helm repo add kubei https://portshift.github.io/kubei
helm install kubei kubei/kubei --namespace kubei --create-namespace
```

### Customized Deployment

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: kubei
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kubei
  namespace: kubei
spec:
  replicas: 1
  selector:
    matchLabels:
      app: kubei
  template:
    metadata:
      labels:
        app: kubei
    spec:
      serviceAccountName: kubei
      containers:
        - name: kubei
          image: portshift/kubei:latest
          ports:
            - containerPort: 8080
          env:
            - name: SCANNER_IMAGE
              value: "portshift/kubei-scanner:latest"
            - name: SCAN_INTERVAL
              value: "24h"
            - name: SEVERITY_THRESHOLD
              value: "HIGH"
          volumeMounts:
            - name: docker-config
              mountPath: /root/.docker
              readOnly: true
      volumes:
        - name: docker-config
          secret:
            secretName: registry-credentials
            optional: true
```

---

## Access the Dashboard

### Port Forward

```bash
kubectl port-forward -n kubei svc/kubei 8080:8080
```

Access the dashboard at `http://localhost:8080`

### Expose via Ingress

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: kubei
  namespace: kubei
spec:
  rules:
    - host: kubei.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: kubei
                port:
                  number: 8080
```

---

## Scanning Process

### 1. Image Discovery

Kubei automatically discovers all container images running in the cluster:

```
Images discovered:
- nginx:1.25.3 (10 pods)
- redis:7.2.3 (3 pods)
- my-app:v1.2.3 (5 pods)
```

### 2. Vulnerability Analysis

Each image is scanned against vulnerability databases:

```
Image: nginx:1.25.3
Total Vulnerabilities: 15
- Critical: 0
- High: 2
- Medium: 8
- Low: 5
```

### 3. Results Aggregation

Findings are aggregated at namespace and cluster levels.

---

## Configuration Options

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| SCAN_INTERVAL | Time between full cluster scans | 24h |
| SEVERITY_THRESHOLD | Minimum severity to report | MEDIUM |
| SCANNER_IMAGE | Scanner sidecar image | portshift/kubei-scanner:latest |
| CONCURRENT_SCANS | Number of parallel scans | 3 |
| IGNORE_NAMESPACES | Namespaces to skip | kube-system |

### Registry Authentication

For private registries, create a secret:

```bash
kubectl create secret docker-registry registry-credentials \
  --namespace kubei \
  --docker-server=my-registry.example.com \
  --docker-username=user \
  --docker-password=password
```

---

## API Usage

### Get Scan Status

```bash
curl http://localhost:8080/api/v1/scan/status
```

### Trigger a Scan

```bash
curl -X POST http://localhost:8080/api/v1/scan/start
```

### Get Vulnerabilities

```bash
curl http://localhost:8080/api/v1/vulnerabilities
```

### Get Vulnerabilities by Severity

```bash
curl "http://localhost:8080/api/v1/vulnerabilities?severity=critical,high"
```

### Get Image Report

```bash
curl "http://localhost:8080/api/v1/images/nginx:1.25.3/vulnerabilities"
```

---

## Example Vulnerability Report

```json
{
  "image": "nginx:1.25.3",
  "scannedAt": "2024-01-15T10:30:00Z",
  "vulnerabilities": [
    {
      "id": "CVE-2023-44487",
      "severity": "HIGH",
      "package": "nghttp2",
      "installedVersion": "1.51.0",
      "fixedVersion": "1.57.0",
      "description": "HTTP/2 Rapid Reset Attack",
      "links": [
        "https://nvd.nist.gov/vuln/detail/CVE-2023-44487"
      ]
    }
  ],
  "summary": {
    "critical": 0,
    "high": 2,
    "medium": 8,
    "low": 5
  }
}
```

---

## Filtering and Policies

### Ignore Specific Vulnerabilities

Create an ignore list for accepted risks:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: kubei-config
  namespace: kubei
data:
  ignore-vulnerabilities: |
    - CVE-2023-1234
    - CVE-2023-5678
```

### Namespace Filtering

Scan only specific namespaces:

```yaml
env:
  - name: TARGET_NAMESPACES
    value: "production,staging"
```

---

## CI/CD Integration

### GitHub Actions

```yaml
name: Image Security Gate
on:
  deployment:

jobs:
  check-vulnerabilities:
    runs-on: ubuntu-latest
    steps:
      - name: Check image vulnerabilities
        run: |
          VULNS=$(curl -s "http://kubei.example.com/api/v1/images/${{ env.IMAGE }}/vulnerabilities")
          CRITICAL=$(echo $VULNS | jq '.summary.critical')
          if [ "$CRITICAL" -gt 0 ]; then
            echo "Critical vulnerabilities found!"
            exit 1
          fi
```

---

## Best Practices

- **Scan continuously:** Enable automatic periodic scanning to catch new CVEs.
- **Set severity thresholds:** Alert on critical and high severity findings.
- **Integrate with CI/CD:** Block deployments of images with critical vulnerabilities.
- **Update regularly:** Keep Kubei and its vulnerability database current.
- **Review ignored CVEs:** Periodically review the ignore list for accepted risks.

---

## Limitations

- Scans container images, not application code.
- Requires registry access for private images.
- Does not provide runtime behavior analysis.
- Vulnerability database coverage depends on upstream sources.

---

## References

This article is based on information from the following official sources:

1. [Kubei GitHub Repository](https://github.com/Portshift/kubei) - Portshift/Cisco
2. [CVE Database](https://cve.mitre.org/) - MITRE
3. [Container Security Best Practices](https://kubernetes.io/docs/concepts/security/) - Kubernetes Documentation
