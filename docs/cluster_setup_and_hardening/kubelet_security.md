---
title: "Kubelet Security"
sidebar_position: 5
---

# Kubelet Security

## 📌 **Introduction**

The **Kubelet** is a critical component of a **Kubernetes node**, responsible for managing containers and ensuring that the desired **containers** are running. Due to its powerful control over **containers**, securing the **Kubelet** is paramount to maintaining the overall security of the **Kubernetes cluster**.

---

## 🔐 **Why Kubelet Security Matters?**

- **Node Compromise Risk:** The Kubelet has direct access to **container runtimes**, posing a potential risk if not properly secured.
- **Cluster-wide Impact:** A compromised Kubelet can lead to unauthorized access to **pods**, **secrets**, and other cluster resources.
- **API Access Control:** Kubelets have access to the **Kubernetes API**, and improper configurations could lead to an **elevated attack surface**.

---

## ✅ **Kubelet Security Best Practices (CKS)**

### 1. **Secure Kubelet Communication**

Ensure all communications to and from the **Kubelet** are **encrypted** using **TLS certificates**.

```yaml
# Example Kubelet TLS Configuration
--tls-cert-file=/var/lib/kubelet/pki/kubelet.crt
--tls-private-key-file=/var/lib/kubelet/pki/kubelet.key
--client-ca-file=/var/lib/kubernetes/pki/ca.crt
```

### 2. **Enable Authentication and Authorization**

- **Authentication:** Require **client certificates** to authenticate to the Kubelet API.
- **Authorization:** Use **Node Authorization** and **Webhook Authorization**.

```yaml
# Kubelet Authentication and Authorization
--authorization-mode=Webhook
--authentication-token-webhook=true
--client-ca-file=/var/lib/kubernetes/pki/ca.crt
```

### 3. **Disable Anonymous Access**

Prevent unauthorized users from accessing the **Kubelet API**.

```yaml
--anonymous-auth=false
```

### 4. **Restrict Kubelet API Access**

- Limit the **Kubelet API** exposure to **localhost** or the **internal network** only.
- Use **firewalls** or **network policies** to restrict **external access**.

```yaml
--address=127.0.0.1
--read-only-port=0
```

### 5. **Enforce Pod Security Standards**

- Use **Pod Security Policies (PSP)** or **Pod Security Admission** to prevent **privileged containers** or **hostPath mounts**.

```yaml
# Example Pod Security Policy
apiVersion: policy/v1beta1
kind: PodSecurityPolicy
metadata:
  name: restricted-psp
spec:
  privileged: false
  volumes:
  - 'configMap'
  - 'emptyDir'
  runAsUser:
    rule: 'MustRunAsNonRoot'
```

### 6. **Limit Kubelet Permissions**

- The **Kubelet** should not run as **root**.
- Set up **Role-Based Access Control (RBAC)** rules to minimize **API permissions**.

```yaml
# Example RBAC for Kubelet
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: kubelet-read-only
rules:
- apiGroups: [""]
  resources: ["pods", "nodes"]
  verbs: ["get", "list"]
```

### 7. **Regularly Update and Patch the Kubelet**

- Apply **security patches** and keep the **Kubelet** updated to mitigate **known vulnerabilities**.
- Use tools like **kured** (Kubernetes Reboot Daemon) for **automated node reboots** when needed.

---

## 🛠️ **Additional Security Features**

### 1. **Pod Security Admission (PSA)**

Use **Pod Security Admission** to replace the deprecated **Pod Security Policies (PSP)**.

```yaml
# Example PSA Configuration
apiVersion: v1
kind: Namespace
metadata:
  name: restricted
  labels:
    pod-security.kubernetes.io/enforce: "restricted"
    pod-security.kubernetes.io/audit: "restricted"
    pod-security.kubernetes.io/warn: "restricted"
```

### 2. **Audit Logs**

Enable **Kubelet auditing** to monitor **API requests** and detect **suspicious activities**.

```yaml
--audit-log-path=/var/log/kubelet-audit.log
--audit-policy-file=/etc/kubernetes/audit-policy.yaml
```

### 3. **Limit Resource Consumption**

Set **resource limits** on the **Kubelet** to prevent **resource exhaustion attacks**.

```yaml
--kube-reserved=cpu=200m,memory=512Mi,ephemeral-storage=1Gi
--system-reserved=cpu=100m,memory=256Mi,ephemeral-storage=1Gi
```

---

## 🧠 **Key Takeaways**

- Securing the **Kubelet** is crucial for maintaining the **integrity** and **security** of the **Kubernetes cluster**.
- Follow **CKS best practices** by enabling **authentication**, **authorization**, and **audit logs**.
- Regularly **update** and **monitor** the **Kubelet** to prevent **exploitation** of known vulnerabilities.

---

## 🔗 **Related Resources**

- [Kubernetes Documentation: Kubelet Configuration](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/)
- [How to Issue a Certificate for a Kubernetes User](https://geek-kb.github.io/k8s_security/guides/certificates/issue_certificate_for_k8s_user/)
- [Pod Security Admission](https://kubernetes.io/docs/concepts/security/pod-security-admission/)

You said:
provide an article about kubelet security that resembles this article structure: <https://geek-kb.github.io/k8s_security/docs/cluster_setup_and_hardening/cis_benchmark_kube_bench/>
ChatGPT said:
markdown
Copy
Edit
---

title: "Kubelet Security Best Practices"
description: "Learn about securing the Kubelet in Kubernetes according to CKS (Certified Kubernetes Security Specialist) best practices."
sidebar_position: 2
---

# Kubelet Security Best Practices

## 📖 Overview

The **Kubelet** is a critical component of each **Kubernetes node**. It is responsible for managing **containers** and ensuring that the desired state specified in **PodSpecs** is maintained. However, if not properly secured, the Kubelet can be an attack vector, leading to potential **node compromises** and even **cluster-wide breaches**.

---

## 🔍 Why Secure the Kubelet?

- **Node Access:** The Kubelet has **elevated access** to the node's **container runtime**.
- **API Server Communication:** The Kubelet communicates with the **Kubernetes API Server**, and compromising it may lead to **API abuse**.
- **Pod Management:** The Kubelet can create, delete, and modify **pods** running on the node.

---

## 🛡️ Kubelet Security Best Practices

### 1. **Enable Authentication and Authorization**

Ensure all **API requests** to the Kubelet are **authenticated** and **authorized**.

```yaml
# Kubelet authentication and authorization configuration
--authentication-token-webhook=true
--authorization-mode=Webhook
--client-ca-file=/var/lib/kubernetes/pki/ca.crt
```

### 2. **Disable Anonymous Access**

Prevent **unauthenticated access** to the Kubelet API.

```yaml
--anonymous-auth=false
```

### 3. **Restrict Kubelet API Access**

- Bind the Kubelet API to **localhost** or the **internal network** only.
- Use **network policies** and **firewalls** to prevent **external access**.

```yaml
--address=127.0.0.1
--read-only-port=0
```

### 4. **Enforce TLS and Certificates**

All communications with the Kubelet should be **encrypted** using **TLS certificates**.

```yaml
# Example TLS configuration
--tls-cert-file=/var/lib/kubelet/pki/kubelet.crt
--tls-private-key-file=/var/lib/kubelet/pki/kubelet.key
--client-ca-file=/var/lib/kubernetes/pki/ca.crt
```

### 5. **Set Resource Limits for Kubelet**

Prevent **resource exhaustion attacks** by limiting the **resources** allocated to the Kubelet.

```yaml
--kube-reserved=cpu=200m,memory=512Mi,ephemeral-storage=1Gi
--system-reserved=cpu=100m,memory=256Mi,ephemeral-storage=1Gi
```

---

## 🚧 Common Misconfigurations

- **Allowing Anonymous Access:** Setting `--anonymous-auth=true` can lead to **unauthorized API access**.
- **Open Kubelet Port:** Binding the Kubelet API to a **public IP** can expose it to the **internet**.
- **No Authentication:** Not using `--client-ca-file` allows **unverified clients** to connect to the Kubelet.

---

## ✅ Key Takeaways

1. **Always use TLS** to encrypt Kubelet communications.
2. **Disable anonymous access** and enforce **authorization policies**.
3. **Restrict network access** to the Kubelet API.
4. Regularly **monitor** and **audit** Kubelet logs for **suspicious activities**.
