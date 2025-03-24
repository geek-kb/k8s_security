---
title: "Notation"
description: "Notation is a CLI tool for signing and verifying container images using the OCI standard for artifact signatures."
sidebar_position: 5
---

# Notation

**Notation** is a **command-line interface (CLI)** tool developed as part of the **Notary Project**, which defines a standard for **signing and verifying artifacts** in OCI-compliant registries. It enables **cryptographic signing of container images** and ensures only trusted content is deployed within a Kubernetes environment.

By using Notation, organizations can **enforce artifact integrity**, trace the source of images, and integrate signature verification into CI/CD pipelines and policy engines.

---

## Usage

### 1. Install Notation

```bash
# On macOS
brew install notaryproject/tap/notation

# Or download from GitHub
curl -Lo notation.tar.gz https://github.com/notaryproject/notation/releases/latest/download/notation-linux-amd64.tar.gz
tar -xvzf notation.tar.gz
chmod +x notation
sudo mv notation /usr/local/bin/
```

---

### 2. Generate a Signing Key and Certificate

```bash
notation cert generate-test --default my-cert
```

This command generates a test certificate and sets it as the default signer.

---

### 3. Sign an Image

```bash
notation sign ghcr.io/myorg/myimage:1.0
```

This creates and stores a signature in the OCI registry.

---

### 4. Verify a Signed Image

```bash
notation verify ghcr.io/myorg/myimage:1.0
```

The verification process ensures the signature matches the configured trusted certificate.

---

### 5. Use with Kubernetes

Notation can integrate with Kubernetes admission controllers or supply chain security frameworks to ensure that **only signed and verified images** are allowed into your cluster.

---

## Best Practices

- **Rotate keys** regularly and use short-lived certificates for signing.
- Use **trusted certificate authorities** or your internal PKI to sign images.
- **Restrict deployment** of unsigned images via admission policies (e.g., OPA Gatekeeper or Kyverno).
- Incorporate **image signature verification** into CI/CD pipelines.
- **Audit signature verification logs** for security monitoring and compliance.

---

## Resources

- **Official Documentation:** [https://notaryproject.dev](https://notaryproject.dev)
- **GitHub Repository:** [https://github.com/notaryproject/notation](https://github.com/notaryproject/notation)
