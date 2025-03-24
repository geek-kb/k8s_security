---
title: "Mozilla SOPS"
description: "SOPS is a file encryption tool that helps secure secrets in GitOps and Kubernetes workflows by encrypting entire files or specific values."
sidebar_position: 3
---

# Mozilla SOPS

**Mozilla SOPS (Secrets OPerationS)** is a **command-line tool** for encrypting and decrypting structured data files, including YAML, JSON, ENV, and INI formats. It is designed to secure **Kubernetes secrets, Terraform variables, or any configuration files**, allowing them to be stored safely in version control systems.

SOPS integrates with **KMS providers** like AWS KMS, GCP KMS, Azure Key Vault, and PGP, making it suitable for teams working in GitOps, infrastructure-as-code, and CI/CD environments.

---

## Usage

### 1. Install SOPS

```bash
brew install sops
# or
wget https://github.com/mozilla/sops/releases/download/v3.8.1/sops-v3.8.1.linux.amd64
chmod +x sops-v3.8.1.linux.amd64
sudo mv sops-v3.8.1.linux.amd64 /usr/local/bin/sops
```

### 2. Encrypt a YAML File

```yaml
# secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: my-secret
type: Opaque
data:
  password: c3VwZXJzZWNyZXQ= # base64 encoded value
```

Encrypt it with:

```bash
sops -e -i secret.yaml
```

SOPS will encrypt the `data` section using your chosen KMS provider.

### 3. Decrypt the File

```bash
sops -d secret.yaml
```

Or use it as input in automation:

```bash
sops -d secret.yaml | kubectl apply -f -
```

### 4. Use with Kustomize or Helm

SOPS can be integrated into GitOps workflows by combining with tools like **Kustomize** or **Helm Secrets** plugins.

---

## Best Practices

- Use **key scopes** to control access to individual files or directories.
- Back up and version your encryption keys securely.
- Use **AWS KMS / GCP KMS / PGP** consistently across your team.
- Store **encrypted files in Git**, not decrypted ones.
- Prefer **encrypted Secrets over plain Secrets** in Kubernetes CI/CD.
- Integrate SOPS into GitHub Actions or ArgoCD for seamless automation.

---

## Resources

- **Official Documentation:** [https://github.com/mozilla/sops#readme](https://github.com/mozilla/sops#readme)
- **GitHub Repository:** [https://github.com/mozilla/sops](https://github.com/mozilla/sops)
