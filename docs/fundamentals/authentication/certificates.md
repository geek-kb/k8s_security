---
title: Certificates
description: "Understand the role of certificates in Kubernetes, including client certificates, server certificates, and automating certificate management with Cert-Manager."
keywords: [kubernetes certificates, x509 certificates, TLS certificates, client certificates, server certificates, cert-manager, certificate management, PKI, kubernetes security, certificate rotation]
---

## Introduction

Certificates play a critical role in Kubernetes security by enabling secure communication between various components of a Kubernetes cluster. They are primarily used for authenticating system components and services, ensuring data confidentiality, integrity, and authentication within the cluster.

---

## What Are Certificates in Kubernetes?

**Certificates** in Kubernetes are **digital certificates** used to secure **communications** between **components**, enable **TLS encryption**, and facilitate **authentication**. Certificates ensure the **confidentiality**, **integrity**, and **authentication** of data **in transit** within the Kubernetes cluster.

---

## Common Use Cases for Certificates in Kubernetes

1. **Securing Kubernetes API Server Communication:**
   - **mTLS (Mutual TLS)** between **API server** and **Kubelets**.
2. **Intra-Cluster Communication:**
   - Enable **mTLS** between **pods** and **services**.
3. **Ingress TLS/SSL Certificates:**
   - Secure **external access** through **Ingress Controllers**.
4. **Authentication:**
   - Generate **X.509 certificates** for **user authentication**.

---

## Types of Certificates in Kubernetes

### 1. Client Certificates

**Required knowledge for the CKS certification.**

Client certificates are essential for secure communication between Kubernetes components. They provide mutual authentication, enabling the API server and internal services to verify each other's identities.

#### Use Cases for Client Certificates

- **System Component Authentication:** Establish secure connections between API servers, kubelets, and other internal services.
- **Service-to-Service Communication:** Secure communication within the cluster for services that require API access.

#### Generating a Client Certificate

```bash
openssl req -new -newkey rsa:2048 -nodes -keyout user.key -out user.csr -subj "/CN=example-user"

openssl x509 -req -in user.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out user.crt -days 365
```

#### Key Differences Between Client and User Certificates

| Certificate Type   | Purpose                               | Example Use Case                    |
| ------------------ | ------------------------------------- | ----------------------------------- |
| Client Certificate | Component-to-component authentication | API Server to Kubelet communication |
| User Certificate   | API access for external users         | Developer access via `kubectl`      |

#### Cross-Reference

For a detailed step-by-step guide on issuing a certificate for a Kubernetes user, see [How to Issue a Certificate for a Kubernetes User](/kubernetes-security/fundamentals/authentication/issue-user-certificate/).

---

### 2. Server Certificates

**Required knowledge for the CKS certification.**

- Secures **server endpoints** with **TLS encryption**.
- Commonly used for the **API server**, **Kubelets**, and **webhooks**.

```bash
# Create a server certificate for the API server
openssl req -new -key apiserver.key -out apiserver.csr -subj "/CN=kube-apiserver"

# Sign with the Kubernetes Certificate Authority (CA)
openssl x509 -req -in apiserver.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out apiserver.crt -days 365
```

---

### 3. TLS Certificates for Ingress Controllers

- Used to secure **Ingress traffic** using **HTTPS**.
- Automate with **Cert-Manager** and **Let's Encrypt**.

```yaml
# Example: Issuing a TLS Certificate with Cert-Manager
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: example-cert
  namespace: default
spec:
  secretName: example-cert-tls
  issuerRef:
    name: letsencrypt-issuer
    kind: ClusterIssuer
  dnsNames:
    - example.com
    - www.example.com
```

---

### 4. Service Account Tokens vs. Certificates

| **Feature**  | **Service Account Token** | **Certificate**                               |
| ------------ | ------------------------- | --------------------------------------------- |
| **Use Case** | **Pod authentication**    | **User and server authentication**            |
| **Renewal**  | Automatic                 | Requires **manual** or **automated rotation** |
| **Security** | Token-based **JWT**       | Encrypted **X.509 certificates**              |

---

## Automating Certificate Management with Cert-Manager

**Cert-Manager** is a **Kubernetes add-on** that automates the **creation**, **renewal**, and **management** of certificates.

### Installation

```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.9.1/cert-manager.yaml
```

### Create a Self-Signed Issuer

```yaml
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: selfsigned-issuer
  namespace: default
spec:
  selfSigned: {}
```

### Requesting a Certificate

```yaml
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: selfsigned-cert
spec:
  secretName: selfsigned-cert-tls
  duration: 90d
  renewBefore: 30d
  commonName: example.com
  dnsNames:
    - example.com
  issuerRef:
    name: selfsigned-issuer
    kind: Issuer
```

---

## Best Practices for Managing Certificates

1. **Automate Renewal:**

   - Use **Cert-Manager** to avoid **expired certificates**.

2. **Enforce TLS Everywhere:**

   - Enable **TLS** for all **internal** and **external communications**.

3. **Rotate Certificates Regularly:**

   - Automate with **cert-manager** or **kubeadm cert renew**.

4. **Monitor Certificate Expiry:**
   - Set up **alerts** for **expiring certificates** using **Prometheus** or **Grafana**.

---

## Conclusion

Certificates are a **core primitive** in Kubernetes security, providing **encryption** and **authentication** for **API server communications**, **Ingress traffic**, and **internal service interactions**. Implementing certificates with tools like **Cert-Manager** ensures your **cluster remains secure** and **compliant** with **best practices**.

For more advanced scenarios, including **mTLS setup** between services or using **Cert-Manager** for dynamic certificate management, see the related documentation in this section.

---

## References

This article is based on information from the following official sources:

1. [PKI Certificates and Requirements](https://kubernetes.io/docs/setup/best-practices/certificates/) - Kubernetes Documentation
2. [Certificate Signing Requests](https://kubernetes.io/docs/reference/access-authn-authz/certificate-signing-requests/) - Kubernetes Documentation
3. [Manage TLS Certificates in a Cluster](https://kubernetes.io/docs/tasks/tls/managing-tls-in-a-cluster/) - Kubernetes Documentation
4. [cert-manager Documentation](https://cert-manager.io/docs/) - CNCF cert-manager Project
