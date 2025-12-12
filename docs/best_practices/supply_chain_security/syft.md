---
sidebar_position: 3
title: "Syft"
description: "Generate Software Bill of Materials (SBOMs) to enhance Kubernetes supply chain security."
keywords: [kubernetes security tool, syft, SBOM, software bill of materials, supply chain security, vulnerability scanning, container scanning, dependency tracking, anchore, security tool]
---

# Syft

**Required knowledge for the CKS certification.**

**Syft** is a CLI tool and Go library developed by Anchore for generating **Software Bill of Materials (SBOMs)** for container images and filesystems. SBOMs provide detailed metadata about the components, libraries, and packages included in container images, which is essential for **vulnerability management, auditing, and supply chain security**.

Syft supports various output formats (e.g., JSON, SPDX, CycloneDX) and integrates with other tools to scan and track open source software usage across your Kubernetes workloads.

---

## Key Features

- Generates SBOMs from container images, directories, and tarballs
- Supports multiple output formats: JSON, SPDX, CycloneDX, and more
- Detects packages from many ecosystems (Debian, Alpine, Go, npm, Python, etc.)
- Works well with **Grype**, a vulnerability scanner
- Can be used in CI/CD pipelines for compliance and auditing

---

## Installation

You can install Syft using a simple script or package manager:

```bash
curl -sSfL https://raw.githubusercontent.com/anchore/syft/main/install.sh | sh -s -- -b /usr/local/bin
```

Alternatively, via Docker:

```bash
docker pull anchore/syft
```

---

## Usage Examples

### Generate an SBOM for a Docker Image

```bash
syft nginx:latest
```

### Output SBOM in JSON Format

```bash
syft nginx:latest -o json > sbom.json
```

### Output in CycloneDX Format

```bash
syft nginx:latest -o cyclonedx > sbom.xml
```

### Generate SBOM for a Local Directory

```bash
syft dir:/usr/local/my-app
```

---

## Best Practices

- **Generate SBOMs for every container image** as part of the build pipeline to track dependencies and licenses.
- **Store and version SBOMs** alongside the container images for future auditing.
- **Integrate Syft with vulnerability scanners** like Grype to continuously assess component risks.
- **Use standard formats** like SPDX or CycloneDX for interoperability with other tools and systems.
- **Automate SBOM generation in CI/CD pipelines** to enforce secure software delivery practices.

---

## Resources

- **Official Documentation**: [https://anchore.com/docs/syft](https://anchore.com/docs/syft)
- **GitHub Repository**: [https://github.com/anchore/syft](https://github.com/anchore/syft)
