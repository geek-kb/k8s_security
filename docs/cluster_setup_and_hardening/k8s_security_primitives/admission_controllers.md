---
sidebar_position: 8
title: "Admission Controllers"
description: "Learn how Admission Controllers in Kubernetes enforce policies and enhance cluster security."
---

# Admission Controllers

**Admission Controllers** in **Kubernetes** are **plugins** that **intercept API requests** before they are **persisted** in **etcd**. They can **validate requests**, **mutate objects**, and **enforce security policies**.

---

## 🚩 How Admission Controllers Work

Admission Controllers are categorized into:

1. **Validating Admission Controllers:** **Deny requests** that **violate policies**.
2. **Mutating Admission Controllers:** **Modify requests** to **enforce defaults** or **standards**.

---

## 🛠️ Example: Enforcing Policies with OPA Gatekeeper

```yaml
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sPrivilegedContainer
metadata:
  name: deny-privileged-containers
spec:
  match:
    kinds:
      - apiGroups: [""]
        kinds: ["Pod"]
  parameters:
    privileged: false
```

---

## ✅ Key Takeaway

Use **Admission Controllers** to **enforce policies**, **ensure compliance**, and **prevent insecure configurations** in the **Kubernetes cluster**.
