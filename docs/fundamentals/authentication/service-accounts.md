---
title: "Service Accounts"
sidebar_position: 4
description: "Learn how Kubernetes Service Accounts provide authentication for pods and how to securely configure them using RBAC."
keywords: [kubernetes service accounts, service account authentication, pod identity, service account tokens, RBAC, kubernetes authentication, workload identity, automountServiceAccountToken, kubernetes security, CKS]
tags: [fundamental, authentication, service-accounts, CKS]
related:
  - /kubernetes-security/attack-vectors/privileged-service-accounts/
  - /kubernetes-security/attack-vectors/service-account-token-abuse/
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/rbac-and-identity/service-account-mitigation/
  - /kubernetes-security/fundamentals/authorization/rbac/
---

# Service Accounts in Kubernetes

**Required knowledge for the CKS certification.**

Kubernetes **Service Accounts** allow **pods** to authenticate with the **API server**. Unlike **user accounts**, which are meant for **human users**, service accounts are designed for **workloads running inside Kubernetes**.

For more details on Kubernetes authentication mechanisms, refer to [Authentication in Kubernetes](/kubernetes-security/fundamentals/authentication/authentication-methods).

---

## What is a Service Account?

- A **Service Account** is a **Kubernetes resource** that allows a **pod** to authenticate with the **Kubernetes API server**.
- By default, every pod is **automatically assigned a service account**.
- Service accounts can be used with **Role-Based Access Control (RBAC)** to define what actions they can perform.

For an overview of Kubernetes security principles, see [Kubernetes Security Fundamentals](/kubernetes-security/fundamentals/intro).

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

For securing pod authentication, see [Certificates in Kubernetes](/kubernetes-security/fundamentals/authentication/certificates).

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

For more details on implementing fine-grained access controls, see [Role-Based Access Control (RBAC)](/kubernetes-security/fundamentals/authorization/rbac).

---

## Best Practices for Service Account Security

- **Create dedicated service accounts** for different applications.
- **Restrict permissions** using **RBAC roles and role bindings**.
- **Avoid using the default service account** in production workloads.
- **Rotate service account tokens** to prevent unauthorized access.
- **Use Kubernetes secrets or external secret managers** for authentication credentials.

For securing API access and authentication mechanisms, see [Kubernetes API Security](/kubernetes-security/fundamentals/authentication/authentication-methods).

---

## Key Takeaways

- **Service Accounts** allow **pods** to interact with **Kubernetes API resources** securely.
- **Custom service accounts** provide **better access control** than the default service account.
- **RBAC should always be used** to limit **service account permissions** to the least privilege.
- **Rotating tokens and auditing permissions** helps strengthen **service account security**.

For a deeper understanding of securing workloads in Kubernetes, refer to [Pod Security Standards](/kubernetes-security/best-practices/cluster-setup-and-hardening/pod-security/pod-security-standards).

---

## References

This article is based on information from the following official sources:

1. [Service Accounts](https://kubernetes.io/docs/concepts/security/service-accounts/) - Kubernetes Documentation
2. [Configure Service Accounts for Pods](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/) - Kubernetes Documentation
3. [Managing Service Accounts](https://kubernetes.io/docs/reference/access-authn-authz/service-accounts-admin/) - Kubernetes Documentation
4. [Using RBAC Authorization](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) - Kubernetes Documentation
