---
title: Node Authorization in Kubernetes
sidebar_position: 3
---

# Node Authorization in Kubernetes

## 🔍 What is Node Authorization?

**Node Authorization** is a **specialized authorization mode** in Kubernetes designed to control what **Kubelets** (Kubernetes nodes) can **access**. It ensures that **nodes** only perform operations that affect their own **pods** and **resources**, enhancing **cluster security**.

---

## 🚦 **How Does Node Authorization Work?**

1. **Node Identity:** Each node in the cluster is assigned a **node identity** using a **service account** or **certificate**.
2. **Authorization Mode:** The **API server** is configured with the **Node authorization mode**.
3. **Allowed Actions:** Nodes can only:
   - **Read** secrets and config maps related to **pods scheduled** on them.
   - **Manage pods** and **endpoints** associated with **their node**.
   - Access **node-specific resources** such as **metrics**.

---

## 🛠️ **Enabling Node Authorization:**

To enable **Node Authorization**, configure the **API server** with the appropriate **flags**:

```bash
kube-apiserver \
  --authorization-mode=Node,RBAC \
  --kubelet-client-certificate=/var/lib/kubelet/pki/kubelet-client.crt \
  --kubelet-client-key=/var/lib/kubelet/pki/kubelet-client.key
```

- Combining **Node Authorization** with **RBAC** is a **best practice**.
- The **kubelet client certificate** is used to **authenticate the node**.

---

## ✅ **Node Authorization Example:**

When a **Kubelet** requests **secrets**, it must include its **node identity**:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: example-secret
  namespace: default
data:
  username: YWRtaW4=
  password: MWYyZDFlMmU2N2Rm
```

### 🧠 **What the Node Can Do:**

- The node can **read the secret** only if the **pod** needing it is **scheduled** on that **specific node**.

---

## 🚫 **What Node Authorization Prevents:**

- Prevents **unauthorized access** to secrets not relevant to the node.
- Ensures that a **compromised node** cannot **affect workloads** on **other nodes**.
- Restricts **pod and endpoint operations** to only **its own resources**.

---

## 💡 **Best Practices:**

1. **Use in Combination with RBAC:**
   - Node authorization works best when combined with **RBAC** to enforce **fine-grained permissions**.

2. **Secure Kubelet Communication:**
   - Enable **TLS** and **certificate-based authentication** for all **Kubelet-to-API server** communications.

3. **Regularly Rotate Node Certificates:**
   - Use **cert-manager** or **kubeadm** for **automated certificate renewal**.

4. **Monitor Node Activity:**
   - Enable **audit logs** to monitor **node requests** to the **API server**.

---

## 🔐 **Conclusion: Why Use Node Authorization?**

**Node Authorization** provides an **additional layer of security** by ensuring that **nodes** have **access only to their own resources**. This minimizes the **impact of a node compromise** and strengthens your **cluster's security posture**.

Would you like more examples on configuring **Node Authorization** with **RBAC**, or need help with **securing Kubelet communication**? Let me know!
