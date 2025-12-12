---
title: "Terrascan"
description: "Terrascan is a static code analyzer that detects compliance and security violations across Infrastructure as Code (IaC) configurations like Terraform, Kubernetes, and more."
sidebar_position: 5
keywords: [kubernetes security tool, terrascan, static analysis, infrastructure as code security, IaC scanning, compliance checking, terraform security, policy as code, CKS]
---

# Terrascan

**Terrascan** is an open-source tool that performs **static analysis** of Infrastructure as Code (IaC) to detect **security and compliance violations**. It supports popular IaC frameworks including **Terraform**, **Kubernetes YAML**, **Helm**, **CloudFormation**, and **Dockerfiles**. Terrascan is useful for preventing insecure infrastructure configurations **before deployment**, ensuring cloud-native applications adhere to best practices and organizational policies.

It comes with over **500 built-in policies** covering various compliance standards like **CIS**, **PCI DSS**, **SOC 2**, and **HIPAA**.

---

## Usage

### 1. Install Terrascan

```bash
brew install terrascan
```

Or via curl:

```bash
curl -L https://github.com/tenable/terrascan/releases/latest/download/terrascan_$(uname -s)_$(uname -m).tar.gz | tar -xz
sudo mv terrascan /usr/local/bin/
```

---

### 2. Scan Terraform Code

```bash
terrascan scan -t terraform -d ./terraform/
```

This will analyze the Terraform configuration in the directory and report violations like overly permissive security groups, unencrypted storage, and missing tags.

---

### 3. Scan Kubernetes Manifests

```bash
terrascan scan -t k8s -f ./deployment.yaml
```

Terrascan will check for misconfigurations such as containers running as root, missing resource limits, and hostPath volumes.

---

### 4. Integrate with CI/CD Pipelines

Terrascan can be embedded into CI/CD systems like GitHub Actions, GitLab CI, Jenkins, or CircleCI.

**GitHub Actions example:**

```yaml
- name: Terrascan Scan
  uses: tenable/terrascan-action@v1
```

---

## Best Practices

- Use Terrascan in local development and CI to shift security left.
- Update policies regularly to align with evolving compliance requirements.
- Combine with other tools like **Trivy** or **OPA** for layered security.
- Customize or create custom policies in Rego if needed for your organization.
- Fail builds when critical violations are detected to prevent misconfigurations from reaching production.

---

## Resources

- **GitHub Repository:** [https://github.com/tenable/terrascan](https://github.com/tenable/terrascan)
- **Official Docs:** [https://docs.tenable.com/terrascan](https://docs.tenable.com/terrascan)
- **Policy Documentation:** [https://docs.tenable.com/terrascan/policies](https://docs.tenable.com/terrascan/policies)
