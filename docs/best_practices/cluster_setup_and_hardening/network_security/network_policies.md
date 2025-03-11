---
sidebar_position: 2
title: "Network Policies"
description: "Explore how Network Policies in Kubernetes control traffic flow and enhance security."
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

## Example: Default Deny All Policy

The following **Network Policy** enforces a **default deny-all** rule, blocking **all ingress and egress traffic** for pods in the `default` namespace:

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

## Example: Allow Ingress from Specific Pods

The example below allows ingress traffic **only from pods with the label `app=frontend`** to pods with the label `app=backend`:

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

## Key Takeaways

- **By default, all pod-to-pod communication is allowed.**
- **Network Policies** restrict communication based on **selectors** and **rules**.
- Use **default deny-all policies** and explicitly allow traffic where needed.
- Combine Network Policies with **RBAC** and **Pod Security Standards** for a layered security approach.

For more best practices on **Kubernetes security**, see [Cluster Setup and Hardening](/docs/best_practices/cluster_setup_and_hardening/intro).
