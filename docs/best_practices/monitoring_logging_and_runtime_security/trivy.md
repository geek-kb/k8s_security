---
sidebar_position: 2
title: "Trivy"
description: "Overview, usage, and best practices for using Trivy to scan container images, file systems, and Kubernetes resources for vulnerabilities."
---

# Trivy

**Required knowledge for the CKS certification.**

**Trivy** is a comprehensive and easy-to-use **vulnerability scanner** for containers, Kubernetes, IaC (Infrastructure as Code), file systems, and Git repositories. It helps identify security risks across different stages of the development lifecycle and is widely adopted in Kubernetes environments.

It is an **open-source tool** maintained by **Aqua Security**, with a strong community and extensive documentation.

Trivy supports scanning for:

- OS packages and software dependencies
- Misconfigurations in Dockerfiles, Kubernetes manifests, Terraform, and more
- Sensitive information like secrets embedded in files
- SBOM (Software Bill of Materials) generation
- Kubernetes cluster scanning (runtime)

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
trivy sbom --format cyclonedx --output sbom.json my-app:1.0.0
```

Use this to generate an SBOM in CycloneDX format for compliance or auditing.

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

- Run Trivy scans at each stage of your CI/CD pipeline (code → image → deployment).
- Use severity filters (`--severity`) to control what triggers failures.
- Enable and regularly run **Kubernetes runtime scans** in production clusters.
- Use `--ignore-unfixed` to reduce noise from known but unfixed issues.
- Pair Trivy with tools like Kyverno or Gatekeeper to enforce policies based on scan results.
- Periodically update the vulnerability database with:

```bash
trivy --download-db-only
```

---

## Resources

- **Official Documentation**: [https://aquasecurity.github.io/trivy](https://aquasecurity.github.io/trivy)
- **GitHub Repository**: [https://github.com/aquasecurity/trivy](https://github.com/aquasecurity/trivy)

---

Trivy helps enforce runtime security posture and supports vulnerability management and visibility across Kubernetes environments.
