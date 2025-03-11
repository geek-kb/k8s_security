---
title: "Service Accounts"
sidebar_position: 4
description: "Learn how Kubernetes Service Accounts provide authentication for pods and how to securely configure them using RBAC."
---

# Service Accounts in Kubernetes

**Required knowledge for the CKS certification.**

Kubernetes **Service Accounts** allow **pods** to authenticate with the **API server**. Unlike **user accounts**, which are meant for **human users**, service accounts are designed for **workloads running inside Kubernetes**.

For more details on Kubernetes authentication mechanisms, refer to [Authentication in Kubernetes](/docs/fundamentals/k8s_security_primitives/authentication/authentication_methods).

---

## What is a Service Account?

- A **Service Account** is a **Kubernetes resource** that allows a **pod** to authenticate with the **Kubernetes API server**.
- By default, every pod is **automatically assigned a service account**.
- Service accounts can be used with **Role-Based Access Control (RBAC)** to define what actions they can perform.

For an overview of Kubernetes security principles, see [Kubernetes Security Fundamentals](/docs/fundamentals/k8s_security_fundamentals).

---

## Types of Service Accounts

### 1. Default Service Account

- Every **namespace** has a **default service account**.
- If no service account is specified, pods automatically use the **default** service account.
- **Security risk:** Using the default service account can expose workloads to **unintended API permissions**.

### 2. Custom Service Accounts

- Recommended for **production workloads**.
- Allows assigning **specific RBAC permissions** to different applications.

#### Creating a Custom Service Account

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: custom-sa
  namespace: default
```

Apply the manifest:

```bash
kubectl apply -f custom-sa.yaml
```

---

## Using a Service Account in a Pod

To use a specific **service account**, reference it in the pod definition:

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

For securing pod authentication, see [Certificates in Kubernetes](/docs/fundamentals/k8s_security_primitives/authentication/certificates).

---

## Securing Service Accounts with RBAC

By default, a service account has **minimal permissions**, but **improper RBAC configuration** can expose it to security risks.

### 1. Restrict Service Account Permissions

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: pod-reader
rules:
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["get", "list", "watch"]
```

### 2. Bind the Service Account to the Role

```yaml
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

For more details on implementing fine-grained access controls, see [Role-Based Access Control (RBAC)](/docs/fundamentals/k8s_security_primitives/authorization/rbac).

---

## Best Practices for Service Account Security

- **Create dedicated service accounts** for different applications.
- **Restrict permissions** using **RBAC roles and role bindings**.
- **Avoid using the default service account** in production workloads.
- **Rotate service account tokens** to prevent unauthorized access.
- **Use Kubernetes secrets or external secret managers** for authentication credentials.

For securing API access and authentication mechanisms, see [Kubernetes API Security](/docs/fundamentals/k8s_security_primitives/authentication/authentication_methods).

---

## Key Takeaways

- **Service Accounts** allow **pods** to interact with **Kubernetes API resources** securely.
- **Custom service accounts** provide **better access control** than the default service account.
- **RBAC should always be used** to limit **service account permissions** to the least privilege.
- **Rotating tokens and auditing permissions** helps strengthen **service account security**.

For a deeper understanding of securing workloads in Kubernetes, refer to [Pod Security Standards](/docs/best_practices/cluster_setup_and_hardening/pod_security/pod_security_standards).
