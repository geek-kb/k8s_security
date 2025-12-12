---
title: "Cosign"
description: "Cosign is a container signing and verification tool used to secure container images and enforce supply chain integrity."
sidebar_position: 4
keywords: [kubernetes security tool, cosign, container signing, image verification, supply chain security, sigstore, container security, image signing, artifact signing, kubernetes supply chain]
---

# Cosign

**Cosign** is a **container image signing and verification tool** developed under the **Sigstore project**. It is used to **sign, verify, and store cryptographic signatures** of container images, improving supply chain security and enabling secure deployment workflows.

Cosign allows you to sign container images using **keyless or key-based methods**, store signatures in **OCI registries**, and integrate signature verification into CI/CD pipelines and admission controllers.

---

## Usage

### 1. Install Cosign

```bash
brew install cosign
# or download from GitHub
curl -Lo cosign https://github.com/sigstore/cosign/releases/latest/download/cosign-linux-amd64
chmod +x cosign
sudo mv cosign /usr/local/bin
```

### 2. Generate Key Pair (Optional)

```bash
cosign generate-key-pair
```

This creates `cosign.key` and `cosign.pub` for image signing and verification.

---

### 3. Sign a Container Image

```bash
cosign sign --key cosign.key docker.io/myorg/myimage:latest
```

Cosign stores the signature as an **OCI artifact** in the same registry.

---

### 4. Verify a Signed Image

```bash
cosign verify --key cosign.pub docker.io/myorg/myimage:latest
```

For **keyless signing**, Cosign uses **OIDC identity providers** like GitHub or Google to sign images and verify identity.

---

### 5. Use with Kubernetes Admission Controller

Cosign signatures can be used with **Sigstore’s policy-controller** to enforce that only **verified, signed images** are admitted into the cluster.

---

## Best Practices

- Use **keyless signing** via OIDC for easier key management and identity traceability.
- Enable **Cosign signature verification** in CI pipelines and Kubernetes admission policies.
- Store public keys securely and version them with your infrastructure.
- Validate image signatures during deployment and enforce policies via **Gatekeeper** or **Kyverno**.
- Integrate Cosign with tools like **GitHub Actions**, **Tekton**, or **Flux** for automated signing.

---

## Resources

- **Official Documentation:** [https://docs.sigstore.dev/cosign](https://docs.sigstore.dev/cosign)
- **GitHub Repository:** [https://github.com/sigstore/cosign](https://github.com/sigstore/cosign)
