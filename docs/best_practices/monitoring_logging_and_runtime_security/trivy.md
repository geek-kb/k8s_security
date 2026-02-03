---
sidebar_position: 2
title: "Trivy"
description: "Overview, usage, and best practices for using Trivy to scan container images, file systems, and Kubernetes resources for vulnerabilities."
keywords: [kubernetes security tool, trivy, vulnerability scanning, container scanning, image scanning, SBOM, security scanning, aqua security, CVE detection, CKS]
tags: [tool, scanning, supply-chain, vulnerabilities, CKS]
related:
  - /docs/best_practices/monitoring_logging_and_runtime_security/grype/
  - /docs/best_practices/supply_chain_security/sbom/
  - /docs/attack_vectors/supply_chain_attacks/
  - /docs/best_practices/supply_chain_security/cosign/
---

# Trivy

**Required knowledge for the CKS certification.**

**Trivy** is a comprehensive and easy-to-use **vulnerability scanner** for containers, Kubernetes, IaC (Infrastructure as Code), file systems, and Git repositories. It helps identify security risks across different stages of the development lifecycle and is widely adopted in Kubernetes environments.

It is an **open-source tool** maintained by **Aqua Security**, with a strong community and extensive documentation.

> **CKS v1.34 Update:** Trivy has been updated with **enhanced SBOM scanning capabilities** including native support for VEX (Vulnerability Exploitability eXchange) documents, improved CycloneDX and SPDX generation, and integration with Kubernetes v1.34 Pod-Level Resources metadata.

Trivy supports scanning for:

- OS packages and software dependencies
- Misconfigurations in Dockerfiles, Kubernetes manifests, Terraform, and more
- Sensitive information like secrets embedded in files
- **SBOM (Software Bill of Materials) generation with VEX support**
- **VEX document validation and consumption**
- Kubernetes cluster scanning (runtime) with enhanced resource awareness
- **Supply chain artifact verification with Sigstore integration**

---

## Why Use Trivy

- Lightweight and fast
- Minimal configuration required
- Integrates easily with CI/CD pipelines
- Supports a wide range of scanning targets (images, filesystems, repos, K8s, etc.)
- Actively maintained and community-supported

---

## Basic Usage

### 1. Scan a Docker Image

```bash
trivy image nginx:latest
```

This command scans the image for vulnerabilities in installed packages and application dependencies.

---

### 2. Scan Kubernetes Cluster (Runtime)

```bash
trivy k8s cluster
```

This scans running resources and their configurations in the cluster.

---

### 3. Scan a Kubernetes YAML Manifest

```bash
trivy config ./manifests/
```

This helps detect misconfigurations in YAML files before deployment.

---

### 4. Scan a Local Filesystem

```bash
trivy fs /path/to/code
```

This scans source code and files for secrets or vulnerabilities.

---

### 5. Generate SBOM (Software Bill of Materials)

```bash
trivy image --format cyclonedx --output sbom.json my-app:1.0.0
```

Generate an SBOM in CycloneDX format for compliance or auditing.

---

### 6. Generate SBOM with SPDX Format

```bash
trivy image --format spdx-json --output sbom.spdx.json my-app:1.0.0
```

SPDX format is widely used for supply chain security and compliance.

---

### 7. Scan with VEX Document (Enhanced in v1.34)

**VEX (Vulnerability Exploitability eXchange)** documents provide information about whether vulnerabilities are actually exploitable in your specific context.

```bash
# Generate VEX document
trivy image --format openvex --output vex.json my-app:1.0.0

# Scan image using VEX to filter false positives
trivy image --vex vex.json my-app:1.0.0
```

This filters out vulnerabilities that are documented as non-exploitable in your environment, reducing false positive noise.

---

### 8. Enhanced Kubernetes Scanning with Pod-Level Resources

Scan Kubernetes clusters with awareness of Pod-Level Resources (v1.34 feature):

```bash
# Scan cluster including Pod-level resource configurations
trivy k8s cluster --report all --include-resources

# Scan specific namespace
trivy k8s --namespace production --report summary

# Export findings as JSON for integration
trivy k8s cluster --format json --output k8s-scan-results.json
```

---

### 9. Verify Signed Artifacts with Sigstore

```bash
# Scan and verify image signature using Cosign
trivy image --format table --scanners vuln,config \
  --image-config-scanners config \
  ghcr.io/aquasecurity/trivy:latest
```

---

### 10. Generate Comprehensive SBOM for Kubernetes Workloads

```bash
# Generate SBOM for all images in a namespace
kubectl get pods -n production -o json | \
  jq -r '.items[].spec.containers[].image' | \
  sort -u | \
  while read image; do
    echo "Generating SBOM for $image"
    trivy image --format spdx-json \
      --output "sbom-$(echo $image | tr ':/' '_').json" \
      "$image"
  done
```

---

## Integrating Trivy into CI/CD

Trivy can be embedded into CI pipelines to fail builds on vulnerability thresholds.

Example with GitHub Actions:

```yaml
- name: Scan Docker image with Trivy
  uses: aquasecurity/trivy-action@master
  with:
    image-ref: "nginx:latest"
    format: "table"
    exit-code: "1"
    severity: "CRITICAL,HIGH"
```

---

## Best Practices

- Run Trivy scans at each stage of your CI/CD pipeline (code → image → deployment)
- Use severity filters (`--severity`) to control what triggers failures
- Enable and regularly run **Kubernetes runtime scans** in production clusters
- **Generate and maintain SBOMs** for all production images using CycloneDX or SPDX formats
- **Use VEX documents** to document non-exploitable vulnerabilities and reduce false positives
- **Verify artifact signatures** using Sigstore/Cosign integration before deployment
- Use `--ignore-unfixed` to reduce noise from known but unfixed issues
- Pair Trivy with tools like Kyverno or Gatekeeper to enforce policies based on scan results
- **Scan for supply chain risks** including unsigned dependencies and unverified artifacts
- **Monitor Pod-Level Resource configurations** in Kubernetes v1.34+ for security misconfigurations
- Periodically update the vulnerability database with:

```bash
trivy image --download-db-only
```

### Enhanced SBOM and VEX Workflow

1. **Generate SBOM during build**:

   ```bash
   trivy image --format spdx-json --output sbom.spdx.json myapp:v1.0.0
   ```

2. **Create VEX document** for known non-exploitable vulnerabilities:

   ```bash
   trivy image --format openvex --output vex.json myapp:v1.0.0
   ```

3. **Scan with VEX filtering** to reduce false positives:

   ```bash
   trivy image --vex vex.json --severity CRITICAL,HIGH myapp:v1.0.0
   ```

4. **Store SBOMs in artifact repository** for compliance and audit trails

5. **Continuously rescan** stored SBOMs for newly discovered vulnerabilities:

   ```bash
   trivy sbom sbom.spdx.json
   ```

---

## References

This article is based on information from the following official sources:

1. [Trivy Documentation](https://aquasecurity.github.io/trivy/) - Aqua Security
2. [Trivy GitHub Repository](https://github.com/aquasecurity/trivy) - Aqua Security
3. [CycloneDX Specification](https://cyclonedx.org/specification/overview/) - OWASP CycloneDX
4. [SPDX Specification](https://spdx.dev/specifications/) - Linux Foundation
5. [VEX (Vulnerability Exploitability eXchange)](https://www.cisa.gov/sites/default/files/2023-04/minimum-requirements-for-vex-508c.pdf) - CISA
