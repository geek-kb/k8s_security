---
sidebar_position: 4
title: "Secrets Management"
description: "Securely manage sensitive data in Kubernetes using Secrets and best practices for data encryption."
---

# Secrets Management

**Kubernetes Secrets** enable **secure storage** of **sensitive information**, such as **passwords**, **API keys**, and **certificates**. They help **avoid hardcoding** sensitive data in **application code** or **configurations**.

---

## 🚩 How Kubernetes Secrets Work

- **Secrets are stored as Kubernetes objects**.
- Data is **Base64-encoded**, not **encrypted by default**.
- Can be **mounted as files** or **injected as environment variables**.

---

## 🛠️ Example: Create and Use a Secret

### 1. Create a Secret

```bash
kubectl create secret generic db-secret --from-literal=username=admin --from-literal=password=supersecret
```

### 2. Use the Secret in a Pod

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

---

## ✅ Key Takeaway

**Secure Secrets** by enabling **encryption at rest**, using **RBAC to control access**, and **integrating external secret management tools**.
