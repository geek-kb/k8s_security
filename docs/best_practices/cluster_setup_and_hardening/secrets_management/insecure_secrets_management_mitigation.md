---
sidebar_position: 1
title: "Insecure Secrets Management Mitigation"
description: "Best practices to prevent the exposure of sensitive data in Kubernetes through secure secrets management techniques and external secret stores."
keywords: [kubernetes security best practices, secrets management, kubernetes secrets, etcd encryption, sealed secrets, external secrets operator, vault, secrets security, encryption at rest, CIS kubernetes]
tags: [best-practice, mitigation, secrets, encryption, CKS]
related:
  - /docs/attack_vectors/insecure_secrets_management/
  - /docs/best_practices/cluster_setup_and_hardening/secrets_management/sealed_secrets/
  - /docs/best_practices/cluster_setup_and_hardening/secrets_management/mozilla_sops/
  - /docs/attack_vectors/unrestricted_etcd_access/
---

# Insecure Secrets Management Mitigation

This guide outlines best practices to securely manage secrets in Kubernetes and prevent unauthorized access to sensitive data. Kubernetes Secrets, by default, are Base64-encoded and stored in etcd, making them vulnerable if not properly protected. To minimize risk, Kubernetes administrators should adopt encryption, access control, and external secret stores.

---

## 1. Encrypt Secrets at Rest in etcd

**Issue:** By default, secrets stored in etcd are not encrypted at rest.<br/>
**Fix:** Enable encryption using a Kubernetes `EncryptionConfiguration`.

### Example: etcd Encryption Configuration

```yaml
apiVersion: apiserver.config.k8s.io/v1
kind: EncryptionConfiguration
resources:
  - resources:
      - secrets
    providers:
      - aescbc:
          keys:
            - name: key1
              secret: c2VjcmV0LWtleS1mb3ItZW5jcnlwdGlvbg==
      - identity: {}
```

Apply this configuration by setting the `--encryption-provider-config` flag on the kube-apiserver.

---

## 2. Use External Secret Management Systems

**Issue:** Kubernetes Secrets lack fine-grained access control, audit logging, and secure dynamic secret delivery.<br/>
**Fix:** Integrate Kubernetes with a secure external secret store.

### Recommended External Secret Managers

#### AWS Systems Manager (SSM) Parameter Store

SSM Parameter Store supports secure storage of secrets with IAM-based access control.

Example integration using the Secrets Store CSI Driver:

```yaml
apiVersion: secrets-store.csi.x-k8s.io/v1
kind: SecretProviderClass
metadata:
  name: aws-ssm-secrets
spec:
  provider: aws
  parameters:
    objects: |
      - objectName: "/app/db/password"
        objectType: "ssmparameter"
```

Ensure your pods are using an IAM role (via IRSA on EKS) with permission to read the secret.

#### HashiCorp Vault

Vault provides dynamic secrets, detailed audit logs, and strong access policies.

Example integration using the CSI driver:

```yaml
apiVersion: secrets-store.csi.x-k8s.io/v1
kind: SecretProviderClass
metadata:
  name: vault-secrets
spec:
  provider: vault
  parameters:
    vaultAddress: "https://vault.example.com"
    roleName: "k8s-role"
    objects: |
      array:
        - objectName: "db-password"
          secretPath: "secret/data/db"
          secretKey: "password"
```

Ensure Kubernetes authentication is configured in Vault to allow pods to authenticate using a ServiceAccount JWT.

#### Akeyless Vault

Akeyless is a SaaS-based secrets management solution that integrates with Kubernetes using native identity-based access and encryption.

Example usage via Akeyless Secrets Operator:

```yaml
apiVersion: akeyless.io/v1
kind: ExternalSecret
metadata:
  name: db-password
spec:
  secretStoreRef:
    name: akeyless-store
    kind: SecretStore
  target:
    name: db-password
  data:
    - secretKey: password
      remoteRef:
        key: /prod/db/password
```

---

## 3. Use the External Secrets Operator (ESO)

The [External Secrets Operator (ESO)](https://external-secrets.io/) is a Kubernetes controller that synchronizes secrets from external providers into native Kubernetes secrets.

It supports multiple backends including AWS SSM, AWS Secrets Manager, HashiCorp Vault, Akeyless, GCP Secret Manager, and Azure Key Vault.

### Example: ExternalSecret Using AWS Secrets Manager

```yaml
apiVersion: external-secrets.io/v1
kind: ExternalSecret
metadata:
  name: db-credentials
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: aws-secrets
    kind: SecretStore
  target:
    name: db-credentials
  data:
    - secretKey: password
      remoteRef:
        key: /prod/db/password
```

### Example: SecretStore Definition for AWS

```yaml
apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: aws-secrets
spec:
  provider:
    aws:
      service: SecretsManager
      region: eu-west-1
      auth:
        jwt:
          serviceAccountRef:
            name: external-secrets-sa
```

ESO handles the retrieval, synchronization, and refreshing of secrets while maintaining them as native Kubernetes secrets, allowing seamless integration with existing workloads.

---

## 4. Restrict Access to Secrets Using RBAC

**Issue:** Without proper access control, any user or service account may read Kubernetes secrets.<br/>
**Fix:** Implement fine-grained Role-Based Access Control (RBAC).

### Example: Read-Only Access Policy

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: default
  name: secret-reader
rules:
  - apiGroups: [""]
    resources: ["secrets"]
    verbs: ["get"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-secrets
  namespace: default
subjects:
  - kind: ServiceAccount
    name: secret-reader-sa
roleRef:
  kind: Role
  name: secret-reader
  apiGroup: rbac.authorization.k8s.io
```

---

## Conclusion

To securely manage secrets in Kubernetes:

- Enable etcd encryption at rest to protect in-cluster stored secrets.
- Integrate with external secret management platforms such as AWS SSM, HashiCorp Vault, Akeyless, or use the External Secrets Operator for dynamic and declarative secret management.
- Apply strict RBAC to ensure only authorized components and users have access to secrets.

A layered approach that combines Kubernetes-native capabilities with purpose-built secret management tools is the most effective strategy to mitigate the risks associated with insecure secret handling.
