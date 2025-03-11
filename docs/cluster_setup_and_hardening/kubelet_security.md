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
    - "configMap"
    - "emptyDir"
  runAsUser:
    rule: "MustRunAsNonRoot"
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
