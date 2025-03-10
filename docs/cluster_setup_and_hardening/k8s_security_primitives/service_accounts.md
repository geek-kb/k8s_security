---
title: Service Accounts in Kubernetes
sidebar_position: 4
---

# Service Accounts

## 🔍 **What is a Service Account?**

A **Service Account** is a **Kubernetes resource** used by **Pods** to **authenticate** with the **API server**. Unlike **user accounts**, which represent **humans**, service accounts are intended for **processes running inside pods**.

---

## 📂 **Types of Service Accounts:**

1. **Default Service Account:**
   Automatically created in every **namespace**.
   Avoid using it for **production workloads**.

2. **Custom Service Accounts:**
   Provide **granular access control** using **RBAC policies**.

```yaml
# Example: Creating a Custom Service Account
apiVersion: v1
kind: ServiceAccount
metadata:
  name: custom-sa
  namespace: default
```

---

## 🛠️ **Using a Service Account in a Pod:**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: app-pod
spec:
  serviceAccountName: custom-sa
  containers:
  - name: app-container
    image: nginx
```

### ✅ **Best Practices:**

- Always create a **dedicated service account** for each **application**.
- Avoid using the **default service account** for **sensitive operations**.
- Use **RBAC roles** to limit the **service account's permissions**.

```yaml
# Example: Binding a Service Account to a Role
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: pod-reader
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "list", "watch"]

---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
subjects:
- kind: ServiceAccount
  name: custom-sa
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
```

---

## 🔐 **Conclusion: Service Accounts for Secure Pod Authentication**

Service Accounts play a crucial role in **authenticating pods** and providing them with **secure access** to **Kubernetes resources**. By combining **service accounts** with **RBAC policies**, you can ensure **least privilege access** and enhance **cluster security**.
