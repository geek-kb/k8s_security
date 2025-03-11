---
sidebar_position: 1
title: "Role-Based Access Control (RBAC)"
description: "Learn how Role-Based Access Control (RBAC) in Kubernetes manages authorization and improves security."
---

# Role-Based Access Control (RBAC)

**Role-Based Access Control (RBAC)** is a **Kubernetes security primitive** that manages **authorization** by defining **roles** and **permissions** for **users**, **groups**, and **service accounts**. It allows administrators to control **who can perform actions** on **specific resources** within the **cluster**.

---

## How RBAC Works

RBAC is based on four key components:

1. **Role:** Defines a set of **permissions** for **resources**.<br/>
2. **ClusterRole:** Similar to **Role**, but can be **applied across all namespaces**.<br/>
3. **RoleBinding:** Assigns a **Role** to **users**, **groups**, or **service accounts** within a **specific namespace**.<br/>
4. **ClusterRoleBinding:** Binds a **ClusterRole** to **users**, **groups**, or **service accounts** **cluster-wide**.<br/

---

## Example: Create an RBAC Role and Binding

### 1. Define a Role

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: default
  name: pod-reader
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "list", "watch"]
```

### 2. Create a RoleBinding

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
  namespace: default
subjects:
- kind: User
  name: "api-user"
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
```

---

## Key Takeaway

RBAC helps enforce the **principle of least privilege** by ensuring that **users** and **applications** have **only the permissions they need**.

---

## Conclusion: Enforcing Security with RBAC in Kubernetes

**Role-Based Access Control (RBAC)** is an essential **security primitive** in Kubernetes, providing **fine-grained authorization** and enforcing the **principle of least privilege**. By correctly defining **roles**, **role bindings**, and **permissions**, you can significantly **reduce the attack surface** of your cluster and maintain **tight access controls**.
>
