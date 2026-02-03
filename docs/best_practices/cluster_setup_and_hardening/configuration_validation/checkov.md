---
title: "Checkov"
description: "Checkov is a static analysis security tool for Terraform, Kubernetes, Docker, and Helm infrastructure-as-code files."
sidebar_position: 7
keywords: [kubernetes security tool, checkov, static analysis, infrastructure as code security, IaC scanning, policy as code, terraform security, helm security, CKS]
---

# Checkov

**Checkov** is an open-source static analysis tool that scans **Infrastructure-as-Code (IaC)** files such as **Kubernetes manifests, Terraform, Helm charts, and Dockerfiles** for **security misconfigurations and compliance violations**. It helps identify potential security risks before deployment.

Checkov is widely used to enforce **policy-as-code** and supports integration into development workflows and CI/CD pipelines.

---

## Usage

### 1. Install Checkov

```bash
pip install checkov
```

Or use Docker:

```bash
docker run -t bridgecrew/checkov
```

---

### 2. Scan Kubernetes Manifests

```bash
checkov -f deployment.yaml
```

This scans a single Kubernetes manifest file for common misconfigurations.

You can also scan directories:

```bash
checkov -d ./k8s-manifests/
```

---

### 3. Scan Helm Charts

```bash
checkov -d ./my-helm-chart/
```

Checkov renders the templates and scans the resulting Kubernetes manifests.

---

### 4. Scan Terraform, Dockerfiles, and More

```bash
checkov -d ./terraform
checkov -f Dockerfile
```

This enables consistent security policies across multiple layers of infrastructure.

---

### 5. Use Checkov with CI/CD

Example GitHub Action:

```yaml
- name: Run Checkov
  uses: bridgecrewio/checkov-action@master
  with:
    directory: ./k8s
    framework: kubernetes
```

Checkov also integrates with Jenkins, GitLab, CircleCI, and more.

---

## Best Practices

- Integrate Checkov scans into **CI/CD pipelines** to block insecure configurations during pull requests.
- Scan **Helm charts before deployment**, not just raw manifests.
- Use Checkov’s **baseline suppression file** to ignore known, accepted issues.
- Combine Checkov with tools like `kubescape` or `conftest` for layered validation.
- Regularly update the tool to benefit from new policies and community-maintained rules.

---

---

## References

This article is based on information from the following official sources:

1. [Checkov Documentation](https://www.checkov.io/1.Welcome/What%20is%20Checkov.html) - Bridgecrew by Prisma Cloud
2. [Checkov GitHub Repository](https://github.com/bridgecrewio/checkov) - Bridgecrew
