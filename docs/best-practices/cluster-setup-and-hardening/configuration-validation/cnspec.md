---
sidebar_position: 8
title: "cnspec"
description: "cnspec is a cloud-native security scanner from Mondoo that assesses Kubernetes clusters, containers, and infrastructure against security policies and compliance frameworks."
keywords: [kubernetes security tool, cnspec, mondoo, security scanning, compliance, vulnerability assessment, policy as code, cloud security, container security, CKS]
tags: [tool, configuration-validation, compliance, CKS]
related:
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/configuration-validation/kubescape/
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/cis/cis-benchmark-kube-bench/
  - /kubernetes-security/best-practices/supply-chain-security/supply-chain-best-practices/
---

# cnspec

**cnspec** is an open-source cloud-native security scanner developed by Mondoo. It assesses Kubernetes clusters, container images, infrastructure configurations, and cloud resources against security policies and compliance frameworks. cnspec uses a policy-as-code approach with MQL (Mondoo Query Language) to define security checks.

The tool supports multiple targets including Kubernetes manifests, running clusters, container images, cloud platforms (AWS, GCP, Azure), and operating systems.

---

## Use Cases

- Scan Kubernetes clusters for security misconfigurations.
- Assess container images for vulnerabilities and hardening issues.
- Evaluate compliance against CIS Benchmarks, SOC 2, PCI-DSS, and other frameworks.
- Integrate security scanning into CI/CD pipelines.
- Audit cloud infrastructure (AWS, GCP, Azure) alongside Kubernetes.

---

## Installation

### Using Package Manager

```bash
# macOS
brew install mondoolabs/mondoo/cnspec

# Linux (via script)
bash -c "$(curl -sSL https://install.mondoo.com/sh)"
```

### Using Docker

```bash
docker run --rm mondoo/cnspec scan local
```

---

## Scanning Kubernetes

### Scan a Running Cluster

```bash
cnspec scan k8s
```

### Scan with Specific Kubeconfig

```bash
cnspec scan k8s --kubeconfig ~/.kube/config
```

### Scan Specific Namespace

```bash
cnspec scan k8s --namespace production
```

### Scan Kubernetes Manifest Files

```bash
cnspec scan k8s --path ./manifests/
```

### Scan with Custom Policy

```bash
cnspec scan k8s --policy-bundle my-policies.mql.yaml
```

---

## Scanning Container Images

### Scan a Container Image

```bash
cnspec scan container image nginx:latest
```

### Scan Multiple Images

```bash
cnspec scan container image alpine:3.18 ubuntu:22.04 python:3.11
```

### Scan Image from Registry

```bash
cnspec scan container image gcr.io/my-project/my-app:v1.2.3
```

---

## Built-in Policies

cnspec includes policies for various compliance frameworks:

### List Available Policies

```bash
cnspec policy list
```

### Scan Against CIS Kubernetes Benchmark

```bash
cnspec scan k8s --policy mondoo-kubernetes-security
```

### Scan Against NSA Kubernetes Hardening Guide

```bash
cnspec scan k8s --policy nsa-cisa-kubernetes-hardening
```

---

## Custom Policies with MQL

Create custom security policies using Mondoo Query Language:

### Example Policy File (my-policy.mql.yaml)

```yaml
policies:
  - uid: my-k8s-security-policy
    name: My Kubernetes Security Policy
    version: 1.0.0
    groups:
      - title: Pod Security
        checks:
          - uid: no-privileged-containers
            title: Containers should not run as privileged
            mql: |
              k8s.pods.all(
                containers.all(
                  securityContext.privileged != true
                )
              )
          - uid: no-host-network
            title: Pods should not use host network
            mql: |
              k8s.pods.all(
                spec.hostNetwork != true
              )
          - uid: resource-limits-set
            title: Containers must have resource limits
            mql: |
              k8s.pods.all(
                containers.all(
                  resources.limits != empty
                )
              )
```

### Apply Custom Policy

```bash
cnspec scan k8s --policy-bundle my-policy.mql.yaml
```

---

## Output Formats

### JSON Output

```bash
cnspec scan k8s -o json > results.json
```

### YAML Output

```bash
cnspec scan k8s -o yaml > results.yaml
```

### JUnit Output (for CI/CD)

```bash
cnspec scan k8s -o junit > results.xml
```

### SARIF Output (for GitHub Security)

```bash
cnspec scan k8s -o sarif > results.sarif
```

---

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Security Scan
on: [push, pull_request]

jobs:
  cnspec-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Install cnspec
        run: bash -c "$(curl -sSL https://install.mondoo.com/sh)"
      
      - name: Scan Kubernetes manifests
        run: cnspec scan k8s --path ./kubernetes/ -o sarif > results.sarif
      
      - name: Upload results to GitHub Security
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: results.sarif
```

### GitLab CI Example

```yaml
cnspec-scan:
  stage: security
  image: mondoo/cnspec:latest
  script:
    - cnspec scan k8s --path ./manifests/ --score-threshold 80
  artifacts:
    reports:
      junit: results.xml
```

---

## Best Practices

- **Integrate early:** Scan manifests during development, not just at deployment.
- **Use score thresholds:** Fail builds when security score drops below acceptable levels.
- **Create custom policies:** Extend built-in policies with organization-specific requirements.
- **Scan regularly:** Run periodic scans against production clusters to detect drift.
- **Combine with vulnerability scanning:** Use cnspec alongside image vulnerability scanners.

---

## References

This article is based on information from the following official sources:

1. [cnspec Documentation](https://mondoo.com/docs/cnspec/) - Mondoo
2. [cnspec GitHub Repository](https://github.com/mondoohq/cnspec) - GitHub
3. [Mondoo Query Language Reference](https://mondoo.com/docs/mql/) - Mondoo
