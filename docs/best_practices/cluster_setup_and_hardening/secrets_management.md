---
sidebar_position: 7
title: "Secrets Management"
description: "Securely manage sensitive data in Kubernetes using Secrets and best practices for data encryption."
---

# Secrets Management

**Required knowledge for the CKS certification.**

Kubernetes **Secrets** provide a secure way to store **sensitive information**, such as **passwords, API keys, TLS certificates, and tokens**. Using Secrets helps prevent **hardcoding credentials** in application configurations, reducing security risks.

For an in-depth guide on securing Kubernetes workloads, refer to [Pod Security Standards](/docs/best_practices/cluster_setup_and_hardening/pod_security/pod_security_standards).

---

## How Kubernetes Secrets Work

- **Secrets are Kubernetes objects** designed to hold sensitive data.
- Data is **Base64-encoded**, not encrypted by default.
- Can be **mounted as files**, **injected as environment variables**, or accessed through the **Kubernetes API**.
- By default, **Secrets are stored in etcd**, requiring additional encryption for protection.

For securing API access and authentication, see [Kubernetes API Security](/docs/fundamentals/k8s_security_primitives/authentication/authentication).

---

## Creating and Using Kubernetes Secrets

### 1. Creating a Secret

A Secret can be created manually using **kubectl**:

```bash
kubectl create secret generic db-secret --from-literal=username=admin --from-literal=password=supersecret
```

Alternatively, create a Secret using a YAML manifest:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-secret
type: Opaque
data:
  username: YWRtaW4= # Base64-encoded "admin"
  password: c3VwZXJzZWNyZXQ= # Base64-encoded "supersecret"
```

Apply the manifest:

```bash
kubectl apply -f db-secret.yaml
```

### 2. Using a Secret in a Pod

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secret-pod
spec:
  containers:
    - name: app-container
      image: nginx
      env:
        - name: DB_USERNAME
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: username
```

This pod retrieves the **username** stored in the `db-secret` and assigns it to the **DB_USERNAME** environment variable.

For more details on managing authentication credentials securely, see [Service Accounts](/docs/fundamentals/k8s_security_primitives/authentication/service_accounts).

---

## Best Practices for Securing Secrets

### 1. Enable Encryption at Rest

**Issue:** Secrets stored in **etcd** are only **Base64-encoded**, making them readable by anyone with access to etcd.<br/>
**Fix:** Encrypt **etcd Secrets** using Kubernetes encryption providers.

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
              secret: c29tZXJhbmRvbXNlY3JldGtleQ==
      - identity: {}
```

Apply the encryption policy and restart the **Kubernetes API server**.

### 2. Restrict Access Using RBAC

**Issue:** Unrestricted access to Secrets can lead to credential leaks.<br/>
**Fix:** Limit access to Secrets using **Role-Based Access Control (RBAC)**.

```yaml
kind: Role
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: secret-reader
rules:
  - apiGroups: [""]
    resources: ["secrets"]
    verbs: ["get", "list"]
```

For more details on securing access, refer to [RBAC](/docs/fundamentals/k8s_security_primitives/authorization/rbac).

### 3. Use External Secret Management Tools

**Issue:** Kubernetes native Secrets lack **advanced security controls**.<br/>
**Fix:** Use **external secret managers** like **HashiCorp Vault**, **AWS Secrets Manager**, or **Google Secret Manager**.

Example of integrating Kubernetes with Vault:

```bash
vault kv put secret/db username="admin" password="supersecret"
```

For more on securing the cluster against external threats, see [Cluster Setup and Hardening](/docs/best_practices/cluster_setup_and_hardening/intro).

---

## Key Takeaways

- **Kubernetes Secrets should never be stored as plain YAML files** in version control.
- **Enable encryption at rest** to protect Secrets stored in etcd.
- **Restrict access using RBAC policies** to limit exposure.
- **Consider external secret management tools** for enhanced security.

For further details on Kubernetes security, see [Understanding the Kubernetes Attack Surface](/docs/fundamentals/understanding_k8s_attack_surface).
