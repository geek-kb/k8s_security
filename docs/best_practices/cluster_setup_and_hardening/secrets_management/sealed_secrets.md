---
title: "Sealed Secrets"
description: "Sealed Secrets is a Kubernetes controller and CLI tool that encrypts secrets for safe storage in version control systems."
sidebar_position: 2
---

# Sealed Secrets

**Sealed Secrets** is an open-source project developed by Bitnami that enables **secure storage of Kubernetes secrets in Git repositories**. It allows teams to encrypt secrets into a format that can be safely committed to version control, and then decrypted and managed securely inside a Kubernetes cluster using a controller.

Unlike plain Kubernetes Secrets, Sealed Secrets prevent **accidental exposure**, enable **GitOps workflows**, and integrate well with CI/CD pipelines.

---

## Usage

Sealed Secrets consists of two main components:

1. **`kubeseal` CLI tool** – Used to encrypt secrets locally.
2. **Sealed Secrets Controller** – Deployed in the cluster to decrypt and manage the secrets.

### 1. Install the CLI

```bash
brew install kubeseal
# or
curl -LO https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.24.4/kubeseal-0.24.4-darwin-amd64.tar.gz
```

### 2. Install the Sealed Secrets Controller

You can install it via Helm:

```bash
helm repo add sealed-secrets https://bitnami-labs.github.io/sealed-secrets
helm install sealed-secrets-controller sealed-secrets/sealed-secrets
```

Or apply the Bitnami-provided manifests:

```bash
kubectl apply -f https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.24.4/controller.yaml
```

### 3. Encrypt a Secret

Create a standard Kubernetes Secret:

```bash
kubectl create secret generic my-secret --dry-run=client --from-literal=password=supersecret -o yaml > my-secret.yaml
```

Seal it:

```bash
kubeseal --controller-name=sealed-secrets-controller --controller-namespace=default --format=yaml < my-secret.yaml > my-sealed-secret.yaml
```

Now `my-sealed-secret.yaml` is safe to store in Git.

### 4. Apply the Sealed Secret to the Cluster

```bash
kubectl apply -f my-sealed-secret.yaml
```

The controller will decrypt it into a standard Kubernetes Secret.

---

## Best Practices

- Use **namespaced controllers** if managing secrets across multiple tenants or teams.
- Always commit **Sealed Secrets**, not raw Secrets, to Git repositories.
- Rotate sealing keys regularly and back them up securely.
- Use `--scope` options to limit decryption to specific namespaces or names.
- Integrate `kubeseal` into your CI/CD pipelines for automated encryption.

---

## Resources

- **Official Documentation:** [https://github.com/bitnami-labs/sealed-secrets#readme](https://github.com/bitnami-labs/sealed-secrets#readme)
- **GitHub Repository:** [https://github.com/bitnami-labs/sealed-secrets](https://github.com/bitnami-labs/sealed-secrets)
