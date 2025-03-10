---
sidebar_position: 5
title: "Network Policies"
description: "Explore how Network Policies in Kubernetes control traffic flow and enhance security."
---

# Network Policies

**Network Policies** in **Kubernetes** are a **security primitive** used to **control traffic flow** between **pods** and **external services**. They provide **network segmentation** and **restrict communications** within the **cluster**.

---

## 🚩 How Network Policies Work

Network Policies are based on **selectors** and **rules**:

1. **Pod Selector:** Defines which **pods** the policy **applies to**.
2. **Ingress Rules:** Control **incoming traffic** to **selected pods**.
3. **Egress Rules:** Control **outgoing traffic** from **selected pods**.

---

## 🛠️ Example: Default Deny All Policy

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

---

## ✅ Key Takeaway

Use **Network Policies** to **restrict pod-to-pod communication** and **enforce segmentation** within the **Kubernetes cluster**.
