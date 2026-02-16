---
title: "Kubescape"
description: "Kubescape is a Kubernetes security scanner that assesses clusters, manifests, and Helm charts against security frameworks and misconfigurations."
sidebar_position: 2
keywords: [kubernetes security tool, kubescape, security scanning, compliance, NSA kubernetes hardening, CIS kubernetes, misconfiguration detection, ARMO, security assessment, CKS]
---

# Kubescape

**Kubescape** is an open-source tool for performing security assessments of Kubernetes clusters, manifests, and Helm charts. It helps identify misconfigurations, compliance violations, and risks based on industry standards like the NSA-CISA Kubernetes Hardening Guide, MITRE ATT&CK, and CIS Benchmarks.

Kubescape is suitable for both continuous integration environments and runtime environments, providing shift-left and runtime visibility. It is maintained by ARMO and widely adopted in the cloud-native ecosystem.

---

## Use Cases

- Validate Kubernetes clusters against established security benchmarks.
- Scan Kubernetes YAML manifests and Helm charts during CI pipelines.
- Continuously monitor for compliance drift and configuration risks.
- Integrate with GitOps workflows to enforce secure configurations pre-deployment.

---

## Usage Examples

### Scan a Live Cluster

```bash
kubescape scan --submit --enable-host-scan
```

### Scan Kubernetes YAML Manifests

```bash
kubescape scan framework nsa --file path/to/deployment.yaml
```

### Scan Using a Specific Framework

```bash
kubescape scan framework cis
```

### Output as JSON or JUnit (for CI integration)

```bash
kubescape scan --format json --output results.json
```

---

## Best Practices

- **Integrate into CI/CD pipelines:** Scan manifests before they are applied to the cluster to catch misconfigurations early.
- **Choose relevant frameworks:** Use the appropriate framework (CIS, NSA, MITRE) based on your compliance or security goals.
- **Enable host scanning:** If permitted, include host-level scanning for deeper visibility into cluster risks.
- **Automate periodic scans:** Schedule scans against running clusters to detect configuration drift.
- **Use GitHub Actions or similar plugins:** Embed Kubescape in automated workflows for continuous security assurance.

---

---

## References

This article is based on information from the following official sources:

1. [Kubescape Documentation](https://kubescape.io/docs/) - ARMO
2. [Kubescape GitHub Repository](https://github.com/kubescape/kubescape) - CNCF
3. [NSA/CISA Kubernetes Hardening Guide](https://www.nsa.gov/Press-Room/News-Highlights/Article/Article/2716980/nsa-cisa-release-kubernetes-hardening-guidance/) - NSA/CISA
