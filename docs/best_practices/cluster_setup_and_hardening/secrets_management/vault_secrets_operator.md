---
sidebar_position: 5
title: "Vault Secrets Operator"
description: "Vault Secrets Operator is HashiCorp's official Kubernetes operator for synchronizing secrets from Vault into Kubernetes Secrets."
keywords: [kubernetes security tool, vault secrets operator, hashicorp vault, secrets management, secret synchronization, kubernetes secrets, vault integration, CKS]
tags: [tool, secrets-management, CKS]
related:
  - /docs/best_practices/cluster_setup_and_hardening/secrets_management/kubernetes_external_secrets/
  - /docs/best_practices/cluster_setup_and_hardening/secrets_management/sealed_secrets/
  - /docs/best_practices/cluster_setup_and_hardening/secrets_management/insecure_secrets_management_mitigation/
---

# Vault Secrets Operator

**Vault Secrets Operator** (VSO) is HashiCorp's official Kubernetes operator for synchronizing secrets from HashiCorp Vault into Kubernetes Secrets. It provides deep integration with Vault's features including dynamic secrets, automatic secret rotation, and Vault's audit capabilities.

VSO is designed as the successor to the Vault Agent Sidecar Injector, offering a more Kubernetes-native approach to secret management.

---

## Key Features

- **Native Kubernetes integration** using Custom Resources.
- **Automatic secret synchronization** from Vault to Kubernetes Secrets.
- **Dynamic secret support** with automatic rotation.
- **PKI certificate management** with automatic renewal.
- **Vault Enterprise features** support (namespaces, KMIP).
- **Kubernetes authentication** using service accounts.

---

## Installation

### Using Helm

```bash
helm repo add hashicorp https://helm.releases.hashicorp.com
helm install vault-secrets-operator hashicorp/vault-secrets-operator \
  --namespace vault-secrets-operator-system \
  --create-namespace
```

### Configuration Values

```yaml
# values.yaml
defaultVaultConnection:
  enabled: true
  address: "https://vault.example.com"
  skipTLSVerify: false

controller:
  replicas: 2
  
defaultAuthMethod:
  enabled: true
  method: kubernetes
  mount: kubernetes
  kubernetes:
    role: vault-secrets-operator
    serviceAccount: default
```

---

## Core Concepts

### VaultConnection

Defines how to connect to a Vault server:

```yaml
apiVersion: secrets.hashicorp.com/v1beta1
kind: VaultConnection
metadata:
  name: vault-connection
  namespace: vault-secrets-operator-system
spec:
  address: https://vault.example.com
  skipTLSVerify: false
  caCertSecretRef: vault-ca-cert
```

### VaultAuth

Defines authentication method to Vault:

```yaml
apiVersion: secrets.hashicorp.com/v1beta1
kind: VaultAuth
metadata:
  name: vault-auth
  namespace: production
spec:
  method: kubernetes
  mount: kubernetes
  kubernetes:
    role: app-role
    serviceAccount: app-sa
    audiences:
      - vault
  vaultConnectionRef: vault-connection
```

### VaultStaticSecret

Synchronizes static KV secrets:

```yaml
apiVersion: secrets.hashicorp.com/v1beta1
kind: VaultStaticSecret
metadata:
  name: database-creds
  namespace: production
spec:
  vaultAuthRef: vault-auth
  mount: secret
  type: kv-v2
  path: production/database
  destination:
    name: database-secret
    create: true
  refreshAfter: 30s
```

### VaultDynamicSecret

Synchronizes dynamic secrets with automatic rotation:

```yaml
apiVersion: secrets.hashicorp.com/v1beta1
kind: VaultDynamicSecret
metadata:
  name: aws-creds
  namespace: production
spec:
  vaultAuthRef: vault-auth
  mount: aws
  path: creds/my-role
  destination:
    name: aws-credentials
    create: true
  renewalPercent: 67
```

### VaultPKISecret

Manages PKI certificates:

```yaml
apiVersion: secrets.hashicorp.com/v1beta1
kind: VaultPKISecret
metadata:
  name: app-tls
  namespace: production
spec:
  vaultAuthRef: vault-auth
  mount: pki
  role: app-role
  commonName: app.example.com
  altNames:
    - app.production.svc.cluster.local
  ttl: 24h
  destination:
    name: app-tls-secret
    create: true
  expiryOffset: 1h
```

---

## Vault Configuration

### Enable Kubernetes Auth

```bash
# Enable Kubernetes auth method
vault auth enable kubernetes

# Configure Kubernetes auth
vault write auth/kubernetes/config \
  kubernetes_host="https://$KUBERNETES_HOST:443" \
  kubernetes_ca_cert=@/var/run/secrets/kubernetes.io/serviceaccount/ca.crt
```

### Create Vault Role

```bash
vault write auth/kubernetes/role/app-role \
  bound_service_account_names=app-sa \
  bound_service_account_namespaces=production \
  policies=app-policy \
  ttl=1h
```

### Create Vault Policy

```hcl
# app-policy.hcl
path "secret/data/production/*" {
  capabilities = ["read"]
}

path "aws/creds/my-role" {
  capabilities = ["read"]
}

path "pki/issue/app-role" {
  capabilities = ["create", "update"]
}
```

```bash
vault policy write app-policy app-policy.hcl
```

---

## Usage Examples

### Static Secret Synchronization

```yaml
# Store a secret in Vault
# vault kv put secret/production/database username=admin password=secret123

apiVersion: secrets.hashicorp.com/v1beta1
kind: VaultStaticSecret
metadata:
  name: database-secret
  namespace: production
spec:
  vaultAuthRef: vault-auth
  mount: secret
  type: kv-v2
  path: production/database
  destination:
    name: db-credentials
    create: true
    labels:
      app: myapp
    annotations:
      managed-by: vault-secrets-operator
  refreshAfter: 60s
```

### Dynamic AWS Credentials

```yaml
apiVersion: secrets.hashicorp.com/v1beta1
kind: VaultDynamicSecret
metadata:
  name: aws-creds
  namespace: production
spec:
  vaultAuthRef: vault-auth
  mount: aws
  path: creds/s3-readonly
  destination:
    name: aws-credentials
    create: true
    transformation:
      excludeRaw: true
      templates:
        AWS_ACCESS_KEY_ID:
          text: "{{ .Secrets.access_key }}"
        AWS_SECRET_ACCESS_KEY:
          text: "{{ .Secrets.secret_key }}"
  renewalPercent: 67
```

### Automatic TLS Certificate

```yaml
apiVersion: secrets.hashicorp.com/v1beta1
kind: VaultPKISecret
metadata:
  name: nginx-tls
  namespace: production
spec:
  vaultAuthRef: vault-auth
  mount: pki
  role: web-server
  commonName: nginx.production.svc.cluster.local
  altNames:
    - nginx.example.com
  ipSans:
    - 10.0.0.100
  ttl: 720h
  destination:
    name: nginx-tls-secret
    create: true
    type: kubernetes.io/tls
  expiryOffset: 24h
```

---

## Secret Transformation

Transform secrets during synchronization:

```yaml
spec:
  destination:
    name: transformed-secret
    transformation:
      excludeRaw: true
      excludes:
        - internal_key
      templates:
        FORMATTED_URL:
          text: "postgresql://{{ .Secrets.username }}:{{ .Secrets.password }}@db:5432/mydb"
```

---

## Monitoring

### Check VaultStaticSecret Status

```bash
kubectl get vaultstaticsecret -n production
kubectl describe vaultstaticsecret database-secret -n production
```

### View Operator Logs

```bash
kubectl logs -n vault-secrets-operator-system -l app.kubernetes.io/name=vault-secrets-operator
```

### Prometheus Metrics

VSO exposes metrics at `/metrics`:

```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: vault-secrets-operator
spec:
  selector:
    matchLabels:
      app.kubernetes.io/name: vault-secrets-operator
  endpoints:
    - port: metrics
```

---

## Best Practices

- **Use Kubernetes authentication:** Avoid static tokens; use service account authentication.
- **Scope roles narrowly:** Grant minimum necessary permissions in Vault policies.
- **Enable audit logging:** Configure Vault audit logging for compliance and troubleshooting.
- **Set appropriate refresh intervals:** Balance security needs with Vault API load.
- **Use dynamic secrets:** Prefer dynamic secrets over static when supported by the target system.
- **Implement rotation:** Configure `renewalPercent` for automatic credential rotation before expiry.

---

## Comparison: VSO vs Vault Agent Sidecar

| Feature | Vault Secrets Operator | Vault Agent Sidecar |
|---------|----------------------|---------------------|
| Architecture | Centralized operator | Per-pod sidecar |
| Resource usage | Lower (shared operator) | Higher (sidecar per pod) |
| Secret delivery | Kubernetes Secrets | Files in shared volume |
| Dynamic secrets | Native support | Template rendering |
| Certificate management | VaultPKISecret CRD | Agent templates |
| Kubernetes native | Yes (CRDs) | No |

---

## References

This article is based on information from the following official sources:

1. [Vault Secrets Operator Documentation](https://developer.hashicorp.com/vault/docs/platform/k8s/vso) - HashiCorp
2. [Vault Secrets Operator GitHub Repository](https://github.com/hashicorp/vault-secrets-operator) - HashiCorp
3. [Vault Kubernetes Auth Method](https://developer.hashicorp.com/vault/docs/auth/kubernetes) - HashiCorp
