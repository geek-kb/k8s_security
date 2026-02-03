---
sidebar_position: 5
title: "Exposed Kubernetes Dashboard Mitigation"
description: "Techniques and configuration examples to prevent unauthorized access to the Kubernetes Dashboard."
keywords: [kubernetes security best practices, kubernetes dashboard, dashboard security, authentication, authorization, RBAC, ingress security, TLS encryption, kubectl proxy, CKS]
---

# Exposed Kubernetes Dashboard Mitigation

**Required knowledge for the CKS certification.**

The Kubernetes Dashboard can become a serious security liability when exposed to the public internet without proper access control, authentication, and least-privilege configuration.

This guide outlines practical steps and examples to harden the Dashboard and reduce the attack surface in Kubernetes clusters.

---

## 1. Restrict Network Access

The Dashboard should only be accessible from trusted sources such as internal networks or specific bastion hosts.

### Recommendation

Avoid exposing the Dashboard with public-facing services like `NodePort`, `LoadBalancer`, or an unauthenticated Ingress.

### Example: Restrict Access with a NetworkPolicy

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: restrict-dashboard-access
  namespace: kubernetes-dashboard
spec:
  podSelector:
    matchLabels:
      k8s-app: kubernetes-dashboard
  ingress:
    - from:
        - ipBlock:
            cidr: 10.0.0.0/16 # Your internal CIDR
  policyTypes:
    - Ingress
```

This ensures that only pods from the specified CIDR can access the Dashboard.

If using a cloud provider, restrict access at the **security group or firewall level** as well.

---

## 2. Enforce Authentication and Avoid Static Tokens

The Dashboard should not be exposed with unrestricted access or static `cluster-admin` tokens.

### Recommendation

Use a secure authentication method like OIDC or a short-lived ServiceAccount token via kubeconfig.

### Example: Kubeconfig With ServiceAccount Token

Generate a kubeconfig for Dashboard login:

```bash
TOKEN=$(kubectl -n kubernetes-dashboard create token dashboard-sa)

kubectl config set-credentials dashboard-user --token=$TOKEN
kubectl config set-context dashboard-context --cluster=<cluster-name> --user=dashboard-user
kubectl config use-context dashboard-context
```

Avoid reusing or sharing this token across environments. Use RBAC to scope permissions.

---

## 3. Limit Permissions with Least Privilege

Avoid binding the Dashboard’s service account to the `cluster-admin` role.

### Recommendation

Create a dedicated service account with namespace-scoped read-only access.

### Example: RoleBinding for Read-Only Access

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: dashboard-reader
  namespace: kubernetes-dashboard
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: kubernetes-dashboard
  name: dashboard-view
rules:
  - apiGroups: [""]
    resources: ["pods", "services", "configmaps"]
    verbs: ["get", "list"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: dashboard-binding
  namespace: kubernetes-dashboard
subjects:
  - kind: ServiceAccount
    name: dashboard-reader
    namespace: kubernetes-dashboard
roleRef:
  kind: Role
  name: dashboard-view
  apiGroup: rbac.authorization.k8s.io
```

This ensures the Dashboard has limited visibility and cannot mutate resources or access cluster-wide secrets.

---

## 4. Disable the Dashboard in Production (If Unused)

The Dashboard is not required in most production environments and can be removed entirely.

### Recommendation

Disable it via your cluster provisioning tool (e.g., kubeadm, Helm, EKS addons, etc.).

### Example: Uninstall Dashboard

If deployed via `kubectl apply`:

```bash
kubectl delete namespace kubernetes-dashboard
```

If installed with Helm:

```bash
helm uninstall kubernetes-dashboard -n kubernetes-dashboard
```

Only re-enable it in isolated, tightly-controlled environments (e.g., air-gapped clusters or secured test environments).

---

## 5. Audit Dashboard Access and Usage

Audit logs should be enabled to detect access to the Dashboard, especially if it is exposed via a proxy or Ingress.

### Recommendation

Enable API server auditing and monitor the `userAgent` and `impersonatedUser` fields.

### Example: Audit Policy to Capture Dashboard Access

```yaml
apiVersion: audit.k8s.io/v1
kind: Policy
rules:
  - level: Metadata
    users: ["system:serviceaccount:kubernetes-dashboard:dashboard-reader"]
    verbs: ["get", "list", "create"]
    resources:
      - group: "" # core API group
        resources: ["pods", "services", "configmaps"]
```

Configure this in the `--audit-policy-file` flag of the API server.

---

## Summary

To prevent Kubernetes Dashboard exploitation:

- Do not expose the Dashboard publicly or via insecure services.
- Require authentication and avoid using long-lived or admin-level tokens.
- Use RBAC to apply least-privilege permissions.
- Disable the Dashboard entirely in production if not needed.
- Enable auditing to track its usage and detect abuse.

These defensive layers collectively reduce the likelihood and impact of an exposed Dashboard in any environment.

---

## References

This article is based on information from the following official sources:

1. [Kubernetes Dashboard](https://github.com/kubernetes/dashboard) - Kubernetes Dashboard Project
2. [Accessing Kubernetes Dashboard](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/) - Kubernetes Documentation
3. [Using RBAC Authorization](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) - Kubernetes Documentation
4. [Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/) - Kubernetes Documentation
