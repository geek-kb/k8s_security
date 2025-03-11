---
title: Pod Security Standards (PSS)
sidebar_position: 6
---

# Pod Security Standards (PSS) in Kubernetes

## 🔍 **What are Pod Security Standards (PSS)?**

**Pod Security Standards (PSS)** are **Kubernetes guidelines** for securing **pods** based on their **security context**. PSS replaces the **deprecated Pod Security Policies (PSP)**, offering **three security levels**: **Privileged**, **Baseline**, and **Restricted**.

---

## 📂 **PSS Levels:**

1. **Privileged:**
   Allows **full administrative access**.
   Suitable only for **trusted workloads**.

2. **Baseline:**
   Enforces **basic security best practices**.
   **Default level** for most workloads.

3. **Restricted:**
   Implements **strict security controls**, preventing **privileged actions**.
   Ideal for **high-security environments**.

---

## 🛠️ **Enforcing PSS in a Namespace:**

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: restricted-namespace
  labels:
    pod-security.kubernetes.io/enforce: "restricted"
    pod-security.kubernetes.io/enforce-version: "v1.25"
```

### ✅ **Best Practices:**

- Apply **"restricted" policies** in **production namespaces**.
- Use **"baseline" policies** for **development and testing**.
- Avoid the **"privileged" level** unless **absolutely necessary**.

---

## 🔐 **Conclusion: PSS for Secure Workloads**

**Pod Security Standards** provide a **simple yet powerful way** to enforce **pod security best practices** at the **namespace level**. By choosing the **appropriate policy level**, you can **protect your cluster** from **misconfigurations** and **vulnerabilities**.
