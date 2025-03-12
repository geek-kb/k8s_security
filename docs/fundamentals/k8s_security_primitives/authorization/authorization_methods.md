---
title: Authorization Methods
sidebar_position: 1
---

# Authorization in Kubernetes

## What is Authorization?

**Authorization** in Kubernetes determines whether a **user**, **service account**, or **component** is allowed to perform a specific **action** on a given **resource**. Once authentication verifies **who you are**, authorization ensures you have the necessary **permissions** to proceed.

---

## Types of Authorization Mechanisms in Kubernetes

Kubernetes supports multiple authorization mechanisms to **control access** and **enforce policies** effectively.

### 1. Role-Based Access Control (RBAC)

**Required knowledge for the CKS certification.**

- Grants permissions based on **Roles** and **RoleBindings**.<br/>
- Defines **who can do what** within a **namespace** or **cluster-wide**.

```yaml
# Example: Creating an RBAC Role and RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: pod-reader
  namespace: default
rules:
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["get", "list", "watch"]

---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: pod-reader-binding
  namespace: default
subjects:
  - kind: User
    name: example-user
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
```

[Read more about RBAC](/docs/fundamentals/k8s_security_primitives/authorization/rbac)

---

### 2. Attribute-Based Access Control (ABAC)

- Uses **policy files** to define access rules.<br/>
- Provides **fine-grained access control** but lacks **scalability** compared to RBAC.

```json
{
  "apiVersion": "abac.authorization.kubernetes.io/v1beta1",
  "kind": "Policy",
  "spec": {
    "user": "example-user",
    "namespace": "default",
    "resource": "pods",
    "readonly": true
  }
}
```

- Configure the **API server** to use ABAC:

```bash
kube-apiserver --authorization-policy-file=policy.json --authorization-mode=ABAC
```

[Read more about ABAC](/docs/fundamentals/k8s_security_primitives/authorization/abac)

---

### 3. Node Authorization

**Required knowledge for the CKS certification.**

- Allows **Kubelets** to access **specific resources** on behalf of **nodes**.<br/>
- Ensures nodes cannot modify objects **outside their scope**.

```yaml
# Example: Node authorization rule for reading secrets
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: node-reader
  namespace: kube-system
rules:
  - apiGroups: [""]
    resources: ["secrets"]
    verbs: ["get", "list"]
```

- API server configuration for **Node Authorization**:

```bash
kube-apiserver --authorization-mode=Node,RBAC
```

[Read more about Node Authorization](/docs/fundamentals/k8s_security_primitives/authorization/node_authorization)

---

### 4. Webhook Authorization

**Required knowledge for the CKS certification.**

- Delegates **authorization decisions** to an **external API**.<br/>
- Useful for **custom access control** scenarios.

```yaml
# Example webhook authorization configuration
apiVersion: v1
kind: Config
clusters:
  - name: webhook
    cluster:
      server: https://auth.example.com/authorize
users:
  - name: webhook
contexts:
  - name: webhook
    context:
      cluster: webhook
      user: webhook
current-context: webhook
```

- API server configuration for Webhook Authorization:

```bash
kube-apiserver --authorization-mode=Webhook --authorization-webhook-config-file=/etc/kubernetes/authz-webhook-config.yaml
```

[Read more about Webhook Authorization](/docs/fundamentals/k8s_security_primitives/authorization/webhook_authorization)

---

## Best Practices for Authorization

1. **Use RBAC Instead of ABAC:**<br/>
   RBAC is **scalable**, **manageable**, and **better integrated** with Kubernetes security.

2. **Grant Least Privilege:**<br/>

   - Assign **minimal permissions** to **users** and **service accounts**.<br/>
   - Regularly review and update **RoleBindings**.

3. **Restrict Node Access:**<br/>

   - Ensure **nodes** only access **their assigned workloads**.<br/>
   - Limit **Kubelet permissions** to avoid **privilege escalation**.

4. **Secure API Server Authorization Modes:**<br/>

   - Always **enable RBAC** (`--authorization-mode=RBAC`).<br/>
   - Use **Webhook Authorization** for **external access control**.

```bash
# Example: Enforcing RBAC and Webhook Authorization
kube-apiserver --authorization-mode=RBAC,Webhook
```

---

## Conclusion: Authorization as the Key to Secure Access Control

Authorization ensures that only **trusted users** and **components** can perform specific **actions** in a Kubernetes cluster. Properly configuring **RBAC**, **Node Authorization**, and **Webhook Authorization** helps prevent **unauthorized access**, **privilege escalation**, and **security breaches**.
