---
sidebar_position: 4
title: "How to Issue a Certificate for a Kubernetes User"
description: "Step-by-step guide on generating and issuing a certificate for a Kubernetes user, including creating roles and configuring kubeconfig."
keywords: [kubernetes user certificate, certificate signing request, CSR, kubeconfig, kubectl credentials, x509 authentication, kubernetes authentication, RBAC, role binding, CKS]
tags: [fundamental, authentication, certificates, rbac, CKS]
related:
  - /docs/fundamentals/authentication/certificates/
  - /docs/fundamentals/authentication/authentication_methods/
  - /docs/fundamentals/authorization/rbac/
---

# How to Issue a Certificate for a Kubernetes User

**Required knowledge for the CKS certification.**

A few steps are required in order to get a normal user to be able to authenticate and invoke an API. First, this user must have a certificate issued by the Kubernetes cluster, and then present that certificate to the Kubernetes API.

---

## 1. Create a Private Key

The following commands generate a PKI private key and a Certificate Signing Request (CSR). It is important to set the **CN** (Common Name) and **O** (Organization) attributes of the CSR. **CN** is the name of the user, and **O** is the group that this user will belong to.

```bash
openssl genrsa -out myuser.key 2048
openssl req -new -key myuser.key -out myuser.csr -subj "/CN=myuser"
```

---

## 2. Create a CertificateSigningRequest (CSR)

Create a **CertificateSigningRequest** resource in Kubernetes and submit it using `kubectl`.

```bash
cat <<EOF | kubectl apply -f -
apiVersion: certificates.k8s.io/v1
kind: CertificateSigningRequest
metadata:
  name: myuser
spec:
  request: $(cat myuser.csr | base64 | tr -d "\n")
  signerName: kubernetes.io/kube-apiserver-client
  expirationSeconds: 86400  # one day
  usages:
  - client auth
EOF
```

### Important Points

- **`usages`** must be set to `client auth`.
- **`expirationSeconds`** can be set to 3600 (1 hour) or 864000 (10 days).
- The **`request`** field is the base64-encoded value of the CSR file content.

---

## 3. Approve the CertificateSigningRequest

```bash
# List all CSRs
kubectl get csr

# Approve the CSR
kubectl certificate approve myuser
```

---

## 4. Retrieve and Export the Certificate

```bash
# Get the certificate in YAML format
kubectl get csr/myuser -o yaml

# Export the issued certificate to a file
kubectl get csr myuser -o jsonpath='{.status.certificate}' | base64 -d > myuser.crt
```

---

## 5. Create Role and RoleBinding

With the certificate created, define the **Role** and **RoleBinding** to allow the user access to Kubernetes cluster resources.

```bash
# Create a Role with permissions to manage Pods
kubectl create role developer --verb=create --verb=get --verb=list --verb=update --verb=delete --resource=pods

# Create a RoleBinding to bind the role to the user
kubectl create rolebinding developer-binding-myuser --role=developer --user=myuser
```

---

## 6. Add User to Kubeconfig

```bash
# Add new credentials to kubeconfig
kubectl config set-credentials myuser --client-key=myuser.key --client-certificate=myuser.crt --embed-certs=true

# Create a new context for the user
kubectl config set-context myuser --cluster=kubernetes --user=myuser

# Switch to the new context
kubectl config use-context myuser
```

---

## Key Takeaway

By following these steps, you can securely create a certificate for a Kubernetes user, assign appropriate roles, and configure kubeconfig to authenticate the user with the Kubernetes API server.

---

## References

This article is based on information from the following official sources:

1. [Certificate Signing Requests](https://kubernetes.io/docs/reference/access-authn-authz/certificate-signing-requests/) - Kubernetes Documentation
2. [Certificates and Certificate Signing Requests](https://kubernetes.io/docs/reference/access-authn-authz/certificate-signing-requests/#normal-user) - Kubernetes Documentation
3. [Configure Access to Multiple Clusters](https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/) - Kubernetes Documentation
