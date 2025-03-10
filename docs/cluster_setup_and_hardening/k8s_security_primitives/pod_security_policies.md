---
sidebar_position: 3
title: "Pod Security Standards (PSS)"
description: "Learn how Pod Security Standards (PSS) enhance Kubernetes security by enforcing safe pod configurations."
---

# Pod Security Standards (PSS)

**Pod Security Standards (PSS)** enforce **security contexts** for **pods** to manage **privilege levels**, **capabilities**, and **resource access**. They help ensure that **pods** run with the **least privilege necessary**.

---

## 🚩 Types of Pod Security Standards

1. **Privileged:** Provides **maximum freedom** but **least security**.
2. **Baseline:** Allows **safe defaults** but **restricts high-risk behaviors**.
3. **Restricted:** Enforces **strict security controls** and **prohibits privileged containers**.

---

## 🛠️ Example: Pod Security Context

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure-pod
spec:
  containers:
  - name: nginx
    image: nginx
    securityContext:
      runAsUser: 1000
      runAsGroup: 3000
      allowPrivilegeEscalation: false
      capabilities:
        drop:
        - ALL
```

---

## ✅ Key Takeaway

Implement **Pod Security Standards** to **mitigate risks** and ensure **pods run securely** within the **Kubernetes cluster**.
