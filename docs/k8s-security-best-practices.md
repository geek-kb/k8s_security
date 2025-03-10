---
sidebar_position: 1
title: Kubernetes Security Best Practices
description: Learn how to secure your Kubernetes clusters following CKS guidelines.
---

# Kubernetes Security Best Practices

Ensuring the security of your Kubernetes cluster is crucial for protecting your applications and data. In this article, we will explore best practices recommended in the **Certified Kubernetes Security Specialist (CKS)** course.

---

## 1. Secure API Server Access

Restrict access to the Kubernetes API server using **network policies** and **firewalls**.

```yaml
# Example of an API server network policy
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: restrict-api-access
spec:
  podSelector:
    matchLabels:
      component: kube-apiserver
  ingress:
    - from:
        - ipBlock:
            cidr: 10.0.0.0/16
      ports:
        - protocol: TCP
          port: 6443
```

## 2. Implement Role-Based Access Control (RBAC)

Use **RBAC** to define granular permissions for users and service accounts.

```yaml
# Example of an RBAC role
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: default
  name: pod-reader
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "watch", "list"]

# Example of an RBAC role binding
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
  namespace: default
subjects:
- kind: User
  name: itai
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
```

## 3. Use Pod Security Policies (PSP)

Enforce security policies for pods using **Pod Security Policies**.

```yaml
# Example of a Pod Security Policy
apiVersion: policy/v1beta1
kind: PodSecurityPolicy
metadata:
  name: restricted-psp
spec:
  privileged: false
  allowPrivilegeEscalation: false
  requiredDropCapabilities:
    - ALL
  volumes:
    - 'configMap'
    - 'emptyDir'
    - 'projected'
    - 'secret'
  hostNetwork: false
  hostIPC: false
  hostPID: false

# Example of a Pod with PSP
apiVersion: v1
kind: Pod
metadata:
  name: restricted-pod
spec:
  securityContext:
    seLinuxOptions:
      level: s0:c123,c456
  containers:
  - name: restricted-container
    image: nginx
    securityContext:
      runAsUser: 1000
      allowPrivilegeEscalation: false
```

## 4. Enable Network Policies

Use **Network Policies** to control traffic between pods.

```yaml
# Example of a Network Policy
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-from-nginx
spec:
  podSelector:
    matchLabels:
      app: nginx
  ingress:
    - from:
        - podSelector:
            matchLabels:
              role: db
      ports:
        - protocol: TCP
          port: 80
```

## 5. Secure Container Images

Scan container images for vulnerabilities using tools like **Trivy** or **Clair**.

```bash
# Example of scanning a container image with Trivy
trivy image nginx:latest
```

## 6. Monitor Kubernetes Audit Logs

Enable **audit logging** to track user activities and API requests.

```yaml
# Example of enabling audit logging
apiVersion: audit.k8s.io/v1
kind: Policy
rules:
- level: Metadata
```

## 7. Secure Kubernetes Secrets

Use **Kubernetes Secrets** to store sensitive information securely.

```yaml
# Example of a Kubernetes Secret
apiVersion: v1
kind: Secret
metadata:
  name: my-secret
type: Opaque
data:
  username
  password
```

## 8. Regularly Update Kubernetes Components

Keep your Kubernetes components up-to-date to patch security vulnerabilities.

```bash
# Example of updating Kubernetes components
kubectl get nodes
kubectl get pods --all-namespaces
```

---

By following these best practices, you can enhance the security of your Kubernetes clusters and protect your applications from potential threats. For more information, refer to the official [CKS curriculum](
