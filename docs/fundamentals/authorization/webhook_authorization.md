---
title: Webhook Authorization
sidebar_position: 4
---

# Webhook Authorization in Kubernetes

**Required knowledge for the CKS certification.**

## What is Webhook Authorization?

**Webhook Authorization** allows Kubernetes to **delegate authorization decisions** to an **external service** via a **webhook**. It is ideal for **custom authorization scenarios** that go beyond the capabilities of **RBAC** and **Node Authorization**.

---

## How Does Webhook Authorization Work?

1. **Request Handling:** When a **request** is made to the **API server**, it is sent to the **Webhook service**.
2. **Decision Making:** The **Webhook service** evaluates the request against **custom policies**.
3. **Response:** The service returns an **ALLOW** or **DENY** decision to the **API server**.

---

## Enabling Webhook Authorization

To enable **Webhook Authorization**, configure the **API server** with the appropriate **flags**:

```bash
kube-apiserver \
  --authorization-mode=Webhook,RBAC \
  --authorization-webhook-config-file=/etc/kubernetes/webhook-config.yaml
```

### Example Webhook Configuration

```yaml
apiVersion: v1
kind: Config
clusters:
  - name: webhook-authz
    cluster:
      server: https://authz.example.com/authorize
      certificate-authority: /path/to/ca.crt
users:
  - name: webhook-authz
contexts:
  - name: webhook-authz
    context:
      cluster: webhook-authz
      user: webhook-authz
current-context: webhook-authz
```

---

## Webhook Authorization Request and Response

### Request Example

The **API server** sends a **JSON request** to the **webhook** service:

```json
{
  "apiVersion": "authorization.k8s.io/v1",
  "kind": "SubjectAccessReview",
  "spec": {
    "user": "jane.doe",
    "groups": ["dev-team"],
    "resourceAttributes": {
      "namespace": "default",
      "verb": "get",
      "resource": "pods"
    }
  }
}
```

### Response Example

The **webhook service** returns **ALLOW** or **DENY**:

```json
{
  "apiVersion": "authorization.k8s.io/v1",
  "kind": "SubjectAccessReview",
  "status": {
    "allowed": true,
    "reason": "User is authorized to get pods in the default namespace"
  }
}
```

---

## Best Practices for Webhook Authorization

1. **Secure Webhook Communication:**
   Use **HTTPS** with **mutual TLS** to secure communications between the **API server** and the **Webhook service**.<br/>
2. **Implement High Availability:**
   Ensure the **Webhook service** is **highly available** to avoid **authorization disruptions**.<br/>
3. **Timeouts and Failures:**
   Configure **timeouts** and **failure policies** to handle **webhook unavailability** gracefully.<br/>

```yaml
failurePolicy: Ignore
timeoutSeconds: 5
```

4. **Logging and Auditing:**
   Enable **logging** on the **Webhook service** to **audit authorization decisions**.<br/>

---

## When to Use Webhook Authorization

- When **RBAC** and **ABAC** do not meet specific **authorization requirements**.<br/>
- To **integrate external systems** with **custom business logic**.<br/>
- When using **dynamic policies** that need to be **centrally managed**.<br/>

---

## Conclusion: Flexibility and Control with Webhook Authorization

**Webhook Authorization** offers **flexibility** by allowing **custom authorization logic** via **external services**. It is particularly useful in **enterprise environments** with **complex authorization requirements** that need to integrate with **external identity or policy services**.
