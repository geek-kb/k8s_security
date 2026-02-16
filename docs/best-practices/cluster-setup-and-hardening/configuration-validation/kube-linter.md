---
title: "kube-linter"
description: "KubeLinter is a static analysis tool that checks Kubernetes YAML manifests and Helm charts for security issues and best practices."
sidebar_position: 6
keywords: [kubernetes security tool, kube-linter, static analysis, manifest validation, YAML linting, security best practices, helm chart validation, kubernetes linting, CKS]
---

# kube-linter

**Required knowledge for the CKS certification.**

**KubeLinter** is an open-source **static analysis tool** for **Kubernetes YAML manifests** and **Helm charts**, designed to identify **misconfigurations**, **security issues**, and **deployment anti-patterns** before they are applied to the cluster.

It is used in **CI/CD pipelines** and development workflows to enforce security and operational best practices early in the Kubernetes lifecycle.

---

## Usage

### 1. Install kube-linter

Using Homebrew:

```bash
brew install kube-linter
```

Or download a binary from GitHub releases:

```bash
curl -Lo kube-linter https://github.com/stackrox/kube-linter/releases/latest/download/kube-linter-$(uname | tr '[:upper:]' '[:lower:]')-amd64
chmod +x kube-linter
sudo mv kube-linter /usr/local/bin/
```

---

### 2. Lint a Kubernetes Manifest Directory

```bash
kube-linter lint ./manifests/
```

This command checks all YAML files in the directory for common security issues like:

- Missing resource requests/limits
- Containers running as root
- HostPath volume usage
- Privileged containers

---

### 3. Lint a Helm Chart

```bash
kube-linter lint ./charts/my-app/
```

KubeLinter will render the chart and run checks against the resulting manifests.

---

### 4. View All Built-in Checks

```bash
kube-linter checks list
```

This lists all available checks including ones related to **security**, **availability**, and **Kubernetes best practices**.

---

### 5. Use in CI/CD Pipelines

Example GitHub Action step:

```yaml
- name: Run kube-linter
  uses: docker://quay.io/stackrox/kube-linter:v0.6.6
  with:
    args: ["lint", "manifests/"]
```

---

## Best Practices

- Use `kube-linter` locally and in CI to **catch misconfigurations before deployment**.
- Run it regularly to detect **regressions in security posture**.
- Customize checks via `config.yaml` to match your organizational policies.
- Combine with **runtime tools** like Falco for complete security coverage.
- Fail pipeline builds when critical lint errors are found.

---

---

## References

This article is based on information from the following official sources:

1. [KubeLinter Documentation](https://docs.kubelinter.io/) - StackRox
2. [KubeLinter GitHub Repository](https://github.com/stackrox/kube-linter) - StackRox
