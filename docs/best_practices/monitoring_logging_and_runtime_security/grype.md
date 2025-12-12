---
sidebar_position: 3
title: "Grype"
description: "Scan container images and filesystems for known vulnerabilities to secure Kubernetes workloads."
keywords: [kubernetes security tool, grype, vulnerability scanning, container scanning, image scanning, CVE detection, anchore, security scanning, SBOM, CKS]
---

# Grype

**Required knowledge for the CKS certification.**

**Grype** is a powerful CLI tool and Go library developed by Anchore to **scan container images and filesystems for known vulnerabilities**. It analyzes the contents of images using Software Bill of Materials (SBOMs) and reports vulnerabilities based on public and private databases, including NVD, GitHub Security Advisories, and distro-specific sources.

Grype plays a crucial role in Kubernetes supply chain and runtime security by helping developers and operators **detect and fix vulnerabilities before deployment**.

---

## Key Features

- Scans container images (local or remote), directories, and SBOMs
- Supports vulnerability matching using multiple databases (NVD, GitHub, OS-specific)
- Integrates with **Syft** for SBOM-based scanning
- Multiple output formats (table, JSON, CycloneDX, etc.)
- Useful in CI/CD pipelines for continuous scanning

---

## Installation

Install via script:

```bash
curl -sSfL https://raw.githubusercontent.com/anchore/grype/main/install.sh | sh -s -- -b /usr/local/bin
```

Or via Docker:

```bash
docker pull anchore/grype
```

---

## Usage Examples

### Scan a Container Image from Docker Hub

```bash
grype nginx:latest
```

### Scan a Local Filesystem Directory

```bash
grype dir:/path/to/codebase
```

### Use a Syft-Generated SBOM as Input

```bash
syft nginx:latest -o cyclonedx > sbom.xml
grype sbom:sbom.xml
```

### Output Results in JSON

```bash
grype nginx:latest -o json > results.json
```

---

## Best Practices

- **Scan every image before deployment** to Kubernetes to reduce risk of known vulnerabilities.
- **Integrate Grype into CI/CD pipelines** to automate and enforce vulnerability checks.
- **Combine Grype with Syft** for SBOM-driven scanning and detailed dependency tracking.
- **Continuously update Grype and its vulnerability database** to ensure accurate results.
- **Act on high and critical findings promptly**, and document mitigations in code or deployment pipelines.

---

## Resources

- **Official Documentation**: [https://docs.anchore.com/current/docs/overview/what-is-grype/](https://docs.anchore.com/current/docs/overview/what-is-grype/)
- **GitHub Repository**: [https://github.com/anchore/grype](https://github.com/anchore/grype)
