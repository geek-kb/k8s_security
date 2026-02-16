---
sidebar_position: 4
title: "Kubernetes External Secrets"
description: "Kubernetes External Secrets Operator synchronizes secrets from external providers like AWS Secrets Manager, HashiCorp Vault, and Azure Key Vault into Kubernetes."
keywords: [kubernetes security tool, external secrets, secrets management, AWS secrets manager, hashicorp vault, azure key vault, secret synchronization, kubernetes secrets, CKS]
tags: [tool, secrets-management, CKS]
related:
  - /docs/best_practices/cluster_setup_and_hardening/secrets_management/vault_secrets_operator/
  - /docs/best_practices/cluster_setup_and_hardening/secrets_management/sealed_secrets/
  - /docs/best_practices/cluster_setup_and_hardening/secrets_management/insecure_secrets_management_mitigation/
---

# Kubernetes External Secrets

**External Secrets Operator** (ESO) is a Kubernetes operator that synchronizes secrets from external secret management systems into Kubernetes Secrets. It supports multiple backends including AWS Secrets Manager, HashiCorp Vault, Azure Key Vault, GCP Secret Manager, and many others.

This approach centralizes secret management in enterprise-grade secret stores while making secrets available to Kubernetes workloads through the native Secret API.

---

## Supported Providers

| Provider | Description |
|----------|-------------|
| AWS Secrets Manager | AWS managed secrets service |
| AWS Parameter Store | AWS Systems Manager Parameter Store |
| HashiCorp Vault | Self-hosted or HCP Vault |
| Azure Key Vault | Azure managed secrets service |
| GCP Secret Manager | Google Cloud secrets service |
| Akeyless | Akeyless Vaultless Platform |
| 1Password | 1Password secrets automation |
| Doppler | Doppler SecretOps platform |
| GitLab | GitLab CI/CD variables |

---

## Installation

### Using Helm

```bash
helm repo add external-secrets https://charts.external-secrets.io
helm install external-secrets external-secrets/external-secrets \
  --namespace external-secrets \
  --create-namespace
```

### Using kubectl

```bash
kubectl apply -f https://raw.githubusercontent.com/external-secrets/external-secrets/main/deploy/crds/bundle.yaml
kubectl apply -f https://raw.githubusercontent.com/external-secrets/external-secrets/main/deploy/install.yaml
```

---

## Core Concepts

### SecretStore

Defines how to connect to a secret provider (namespace-scoped):

```yaml
apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: aws-secrets-manager
  namespace: production
spec:
  provider:
    aws:
      service: SecretsManager
      region: us-west-2
      auth:
        secretRef:
          accessKeyIDSecretRef:
            name: aws-credentials
            key: access-key
          secretAccessKeySecretRef:
            name: aws-credentials
            key: secret-key
```

### ClusterSecretStore

Cluster-wide secret store available to all namespaces:

```yaml
apiVersion: external-secrets.io/v1beta1
kind: ClusterSecretStore
metadata:
  name: vault-backend
spec:
  provider:
    vault:
      server: "https://vault.example.com"
      path: "secret"
      version: "v2"
      auth:
        kubernetes:
          mountPath: "kubernetes"
          role: "external-secrets"
```

### ExternalSecret

Defines which secrets to sync:

```yaml
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: database-credentials
  namespace: production
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: aws-secrets-manager
    kind: SecretStore
  target:
    name: database-secret
    creationPolicy: Owner
  data:
    - secretKey: username
      remoteRef:
        key: production/database
        property: username
    - secretKey: password
      remoteRef:
        key: production/database
        property: password
```

---

## Provider Configuration Examples

### AWS Secrets Manager

```yaml
apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: aws-secretsmanager
spec:
  provider:
    aws:
      service: SecretsManager
      region: us-west-2
      auth:
        jwt:
          serviceAccountRef:
            name: external-secrets-sa
---
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: api-keys
spec:
  secretStoreRef:
    name: aws-secretsmanager
    kind: SecretStore
  target:
    name: api-keys
  data:
    - secretKey: api-key
      remoteRef:
        key: production/api-keys
        property: api-key
```

### HashiCorp Vault

```yaml
apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: vault-backend
spec:
  provider:
    vault:
      server: "https://vault.example.com"
      path: "secret"
      version: "v2"
      auth:
        kubernetes:
          mountPath: "kubernetes"
          role: "external-secrets"
          serviceAccountRef:
            name: external-secrets
---
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: vault-secret
spec:
  secretStoreRef:
    name: vault-backend
    kind: SecretStore
  target:
    name: my-secret
  data:
    - secretKey: password
      remoteRef:
        key: secret/data/myapp
        property: password
```

### Azure Key Vault

```yaml
apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: azure-keyvault
spec:
  provider:
    azurekv:
      vaultUrl: "https://my-keyvault.vault.azure.net"
      authType: ManagedIdentity
      identityId: "client-id-of-managed-identity"
---
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: azure-secret
spec:
  secretStoreRef:
    name: azure-keyvault
    kind: SecretStore
  target:
    name: my-azure-secret
  data:
    - secretKey: connection-string
      remoteRef:
        key: database-connection-string
```

### GCP Secret Manager

```yaml
apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: gcp-secretmanager
spec:
  provider:
    gcpsm:
      projectID: my-gcp-project
      auth:
        workloadIdentity:
          clusterLocation: us-central1
          clusterName: my-cluster
          serviceAccountRef:
            name: external-secrets-sa
---
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: gcp-secret
spec:
  secretStoreRef:
    name: gcp-secretmanager
    kind: SecretStore
  target:
    name: my-gcp-secret
  data:
    - secretKey: api-key
      remoteRef:
        key: api-key
        version: latest
```

---

## Advanced Features

### Secret Templates

Transform secrets during synchronization:

```yaml
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: templated-secret
spec:
  secretStoreRef:
    name: vault-backend
    kind: SecretStore
  target:
    name: database-url
    template:
      type: Opaque
      data:
        DATABASE_URL: "postgresql://{{ .username }}:{{ .password }}@db.example.com:5432/mydb"
  data:
    - secretKey: username
      remoteRef:
        key: secret/data/database
        property: username
    - secretKey: password
      remoteRef:
        key: secret/data/database
        property: password
```

### Refresh Intervals

```yaml
spec:
  refreshInterval: 15m  # Sync every 15 minutes
```

### Data From Multiple Keys

```yaml
spec:
  dataFrom:
    - extract:
        key: production/all-secrets
```

---

## Security Best Practices

- **Use workload identity:** Prefer Kubernetes service account authentication over static credentials.
- **Scope SecretStores:** Use namespace-scoped SecretStore instead of ClusterSecretStore when possible.
- **Enable audit logging:** Track secret access in both Kubernetes and the external provider.
- **Set appropriate refresh intervals:** Balance security (frequent rotation) with provider API limits.
- **Use RBAC:** Restrict which namespaces can reference ClusterSecretStores.

---

## Troubleshooting

### Check ExternalSecret Status

```bash
kubectl get externalsecret database-credentials -n production
kubectl describe externalsecret database-credentials -n production
```

### View Operator Logs

```bash
kubectl logs -n external-secrets -l app.kubernetes.io/name=external-secrets
```

### Verify Synced Secret

```bash
kubectl get secret database-secret -n production -o yaml
```

---

## References

This article is based on information from the following official sources:

1. [External Secrets Operator Documentation](https://external-secrets.io/) - External Secrets
2. [External Secrets GitHub Repository](https://github.com/external-secrets/external-secrets) - GitHub
3. [AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/) - AWS Documentation
