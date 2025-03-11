---
title: Attribute-Based Access Control (ABAC)
sidebar_position: 2
---

# Attribute-Based Access Control (ABAC) in Kubernetes

## What is ABAC?

**Attribute-Based Access Control (ABAC)** is an **authorization strategy** in Kubernetes that evaluates **attributes** of the **requester**, the **requested resource**, and the **current environment** to determine whether access should be granted. Unlike **RBAC (Role-Based Access Control)**, ABAC uses **policies** defined in **JSON files** to provide **fine-grained control** over **API access**.

---

## How Does ABAC Work?

1. **Request Evaluation:** When a user or service makes a request, the **API server** evaluates it against a set of **policies**.
2. **Policy Matching:** Policies are stored in a **JSON file** that defines **allowed actions** based on specific **attributes**.
3. **Decision Making:** If the **request attributes** match a **policy**, access is **granted**; otherwise, access is **denied**.

---

## Example of an ABAC Policy

An ABAC policy file (`policy.jsonl`) is a **JSON Lines file** where each line is a **JSON object** representing a **policy rule**:

```json
{
  "apiVersion": "abac.authorization.kubernetes.io/v1beta1",
  "kind": "Policy",
  "spec": {
    "user": "john.doe",
    "namespace": "production",
    "resource": "pods",
    "readonly": true
  }
}
```

### What This Policy Does

- Allows the user **john.doe** to **read-only access** (`GET`, `LIST`, `WATCH`) **pods** in the **production** namespace.<br/>
- Prevents **write operations** (`CREATE`, `UPDATE`, `DELETE`).

---

## Enabling ABAC in Kubernetes

To enable ABAC, set the **authorization mode** to **ABAC** and provide the **policy file** to the **API server**:

```bash
kube-apiserver \
  --authorization-mode=ABAC \
  --authorization-policy-file=/path/to/policy.jsonl
```

### Tip: You can combine **ABAC** with other authorization modes

```bash
--authorization-mode=Node,RBAC,ABAC
```

- **Node:** For **Kubelet authorization**.<br/>
- **RBAC:** For **role-based access control**.<br/>
- **ABAC:** For **attribute-based policies**.

---

## Best Practices for Using ABAC

1. **Limit ABAC Use:**<br/>Prefer **RBAC** for most scenarios as it offers **dynamic policy management**.

2. **Avoid Broad Permissions:**<br/>Be **specific** in **ABAC policies** to avoid **over-permissioning**.

3. **Test Policies Thoroughly:**<br/>Use tools like **kubectl auth can-i** to validate **permissions**:

```bash
kubectl auth can-i list pods --as=john.doe --namespace=production
```

4. **Combine with Other Modes:**<br/>Use **ABAC** only where **RBAC** or **Webhook Authorization** cannot meet specific **attribute-based needs**.

---

## When to Use ABAC vs. RBAC

| Feature                      | **ABAC**                             | **RBAC**                              |
|------------------------------|--------------------------------------|--------------------------------------|
| **Policy Format**            | **JSON** files                        | **Kubernetes API resources**          |
| **Management**               | Requires **file updates** and **restarts** | Dynamic updates via **kubectl**       |
| **Use Case**                 | Complex, **attribute-based rules**   | **Standard role-based** access control|
| **Flexibility**              | High, but **harder to manage**       | Easier to **audit and manage**        |
| **Preferred For**            | Legacy systems, **custom conditions** | Most **modern Kubernetes deployments**|

---

## Limitations of ABAC

- **Static Nature:** Changes to policies require **restarting** the **API server**.<br/>
- **No API Integration:** Policies are not stored in the Kubernetes **API server**; they are **external files**.<br/>
- **Difficult to Audit:** There are no **native tools** to **list ABAC policies** or **monitor changes**.

---

## Migrating from ABAC to RBAC

If you are using **ABAC** and want to migrate to **RBAC**, follow these steps:

1. **Convert ABAC policies** to **RBAC roles and role bindings**.<br/>
2. **Test** with the **RBAC authorizer** enabled alongside **ABAC**.<br/>
3. **Remove ABAC policies** and set the **authorization mode** to **RBAC**.

```bash
kube-apiserver \
  --authorization-mode=RBAC,Node \
  --authorization-policy-file=""
```

---

## Conclusion: Is ABAC Right for You?

**ABAC** offers **flexibility** and **fine-grained control** for specific scenarios, but its **static nature** and **management complexity** make it less suited for **dynamic environments**. Whenever possible, prefer **RBAC** for **modern Kubernetes clusters** due to its **ease of use**, **auditability**, and **integration with the Kubernetes API**.
