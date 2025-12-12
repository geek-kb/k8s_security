---
sidebar_position: 7
title: "Network Policies"
description: "Explore how Network Policies in Kubernetes control traffic flow and enhance security."
keywords: [kubernetes security best practices, network policies, network segmentation, pod networking, ingress rules, egress rules, network isolation, calico, cilium, kubernetes networking, CKS]
---

# Network Policies

**Required knowledge for the CKS certification.**

**Network Policies** in **Kubernetes** are a fundamental security mechanism used to **control traffic flow** between **pods** and **external services**. They provide **network segmentation** and help enforce security policies within the **cluster**.

## How Network Policies Work

Network Policies use **selectors** and **rules** to define allowed traffic:

1. **Pod Selector:** Specifies the **pods** the policy applies to.
2. **Ingress Rules:** Define allowed **incoming traffic** to selected pods.
3. **Egress Rules:** Define allowed **outgoing traffic** from selected pods.

By default, Kubernetes allows **all traffic** between pods unless a **Network Policy** is defined to restrict it.

---

## 1. Enforce Default Deny-All Policies

To prevent unrestricted communication between pods, enforce a **deny-all** policy by default.

### Secure Default Deny Policy

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny
  namespace: default
spec:
  podSelector: {}
  policyTypes:
    - Ingress
    - Egress
```

### Why It Matters

- **Blocks** all traffic by default, enforcing a least-privilege model.<br/>
- **Requires** explicit allow rules for necessary communication.

---

## 2. Restrict Ingress Traffic to Specific Pods

Allow ingress traffic only from trusted sources.

### Secure Ingress Policy Example

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-frontend-to-backend
  namespace: default
spec:
  podSelector:
    matchLabels:
      app: backend
  policyTypes:
    - Ingress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: frontend
      ports:
        - protocol: TCP
          port: 80
```

### Why It Matters

- **Prevents** unauthorized pods from accessing sensitive services.<br/>
- **Allows** only traffic from the specified frontend application.

---

## 3. Restrict Egress Traffic to External Endpoints

Limit pod communication with external networks to reduce attack exposure.

### Secure Egress Policy Example

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: restrict-egress
  namespace: default
spec:
  podSelector:
    matchLabels:
      app: backend
  policyTypes:
    - Egress
  egress:
    - to:
        - ipBlock:
            cidr: 192.168.1.0/24
      ports:
        - protocol: TCP
          port: 443
```

### Why It Matters

- **Prevents** unauthorized outbound connections to untrusted networks.<br/>
- **Reduces** the risk of data exfiltration.

---

## 4. Protect the Kubernetes API Server

Restrict access to the Kubernetes API server to prevent unauthorized requests.

### Secure API Server Access Policy

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: restrict-api-access
  namespace: kube-system
spec:
  podSelector:
    matchLabels:
      component: kube-apiserver
  policyTypes:
    - Ingress
  ingress:
    - from:
        - ipBlock:
            cidr: 10.0.0.0/16
```

### Why It Matters

- **Limits** API access to trusted networks.<br/>
- **Prevents** external reconnaissance and brute-force attacks.

---

## 5. Enforce Namespace Isolation

Prevent pods in one namespace from communicating with pods in another namespace.

### Secure Namespace Isolation Policy

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: namespace-isolation
  namespace: default
spec:
  podSelector: {}
  policyTypes:
    - Ingress
  ingress: []
```

### Why It Matters

- **Prevents** cross-namespace attacks and lateral movement.<br/>
- **Ensures** workload segregation for multi-tenant clusters.

---

## Conclusion

**Network Policies** provide critical security controls for **traffic segmentation, access control, and workload isolation** in Kubernetes. By **defaulting to deny-all, restricting ingress and egress, securing the API server, and enforcing namespace isolation**, administrators can prevent unauthorized access and **minimize the attack surface**.
