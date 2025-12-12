---
title: "KubeAudit"
description: "KubeAudit is a command-line tool that scans Kubernetes clusters for common security misconfigurations and generates actionable reports."
sidebar_position: 9
keywords: [kubernetes security tool, kubeaudit, security scanning, misconfiguration detection, security audit, compliance checking, pod security, CKS]
---

# KubeAudit

**KubeAudit** is a powerful open-source command-line tool developed by Shopify to **automatically audit Kubernetes clusters** for **security misconfigurations**. It checks workload definitions against a list of known issues—such as missing security contexts, privilege escalation risks, and exposed containers—based on industry best practices.

KubeAudit helps Kubernetes administrators and security engineers enforce **least privilege**, **runtime security**, and **container hardening** by scanning manifests or live clusters.

---

## Usage

You can audit either a live cluster or local manifests.

### Install KubeAudit

```bash
brew install shopify/kubeaudit/kubeaudit
# or
go install github.com/Shopify/kubeaudit@latest
```

### Scan a Running Cluster

```bash
kubeaudit all
```

This will check the live cluster for all built-in security audits.

### Scan Kubernetes YAML Files

```bash
kubeaudit all -f ./deployment.yaml
```

### Run Specific Audits

Example: Check only for containers running as root.

```bash
kubeaudit runasroot
```

---

## Example Findings

Typical issues KubeAudit detects:

- Containers running as root.
- Missing `readOnlyRootFilesystem`.
- Privileged containers.
- Missing CPU or memory limits.
- Insecure capabilities (e.g., `NET_ADMIN`).

---

## Best Practices

- Integrate KubeAudit into your CI/CD pipelines to enforce baseline security.
- Run periodic audits against production clusters to detect drift.
- Use targeted audits (e.g., `runasroot`, `capabilities`) for focused policy enforcement.
- Treat KubeAudit output as actionable—most findings correspond to real security weaknesses.

---

## Resources

- **Official Documentation:** [https://kubeaudit.dev](https://kubeaudit.dev)
- **GitHub Repository:** [https://github.com/Shopify/kubeaudit](https://github.com/Shopify/kubeaudit)
