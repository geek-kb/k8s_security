---
sidebar_position: 14
title: "audit2rbac"
description: "audit2rbac automatically generates RBAC policies from Kubernetes audit logs, enabling precise least-privilege configurations based on actual API usage."
keywords: [kubernetes security tool, audit2rbac, RBAC generation, audit logs, least privilege, kubernetes RBAC, access control, policy generation, CKS]
tags: [tool, rbac, authorization, CKS]
related:
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/rbac-and-identity/insecure-rbac-permissions-mitigation/
  - /kubernetes-security/fundamentals/authorization/rbac/
  - /kubernetes-security/attack-vectors/insecure-rbac-permissions/
---

# audit2rbac

**audit2rbac** is an open-source tool that automatically generates Kubernetes RBAC policies based on actual API server audit logs. Instead of manually crafting Role and ClusterRole resources, audit2rbac analyzes recorded API requests to produce minimal, least-privilege RBAC configurations that match real-world usage patterns.

This approach eliminates guesswork when defining permissions and ensures that generated policies grant only the access that was actually needed during the observed period.

---

## Use Cases

- Generate RBAC policies for service accounts based on their actual API usage.
- Migrate from overly permissive RBAC configurations to least-privilege policies.
- Audit existing workloads to understand their true permission requirements.
- Create baseline RBAC policies during development and testing phases.
- Validate that workloads are not requesting more permissions than they use.

---

## Installation

Install audit2rbac from the official GitHub releases:

```bash
# Download the latest release (Linux/amd64)
curl -L https://github.com/liggitt/audit2rbac/releases/download/v0.9.0/audit2rbac-linux-amd64.tar.gz | tar xz
chmod +x audit2rbac
sudo mv audit2rbac /usr/local/bin/
```

For macOS:

```bash
curl -L https://github.com/liggitt/audit2rbac/releases/download/v0.9.0/audit2rbac-darwin-amd64.tar.gz | tar xz
chmod +x audit2rbac
sudo mv audit2rbac /usr/local/bin/
```

---

## Prerequisites

audit2rbac requires Kubernetes API server audit logging to be enabled. Configure the API server with an audit policy:

### Audit Policy Example

```yaml
apiVersion: audit.k8s.io/v1
kind: Policy
rules:
  - level: RequestResponse
    users: ["system:serviceaccount:*:*"]
    verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
    resources:
      - group: ""
        resources: ["*"]
      - group: "apps"
        resources: ["*"]
```

Enable audit logging on the API server:

```bash
--audit-policy-file=/etc/kubernetes/audit-policy.yaml
--audit-log-path=/var/log/kubernetes/audit.log
--audit-log-maxage=30
--audit-log-maxbackup=10
--audit-log-maxsize=100
```

---

## Usage Examples

### Generate RBAC for a Service Account

Analyze audit logs and generate RBAC for a specific service account:

```bash
audit2rbac --filename=/var/log/kubernetes/audit.log \
  --serviceaccount=my-namespace:my-service-account
```

### Generate ClusterRole for a User

```bash
audit2rbac --filename=/var/log/kubernetes/audit.log \
  --user=jane@example.com
```

### Output to File

```bash
audit2rbac --filename=/var/log/kubernetes/audit.log \
  --serviceaccount=production:app-sa \
  > generated-rbac.yaml
```

### Generate Namespace-Scoped Role

By default, audit2rbac generates ClusterRoles. To generate namespace-scoped Roles:

```bash
audit2rbac --filename=/var/log/kubernetes/audit.log \
  --serviceaccount=my-namespace:my-sa \
  --generate-kind=Role \
  --generate-name=my-sa-role
```

---

## Example Output

Running audit2rbac produces RBAC manifests ready for deployment:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: my-sa-role
  namespace: my-namespace
rules:
  - apiGroups: [""]
    resources: ["configmaps"]
    verbs: ["get", "list"]
  - apiGroups: [""]
    resources: ["secrets"]
    resourceNames: ["my-secret"]
    verbs: ["get"]
  - apiGroups: ["apps"]
    resources: ["deployments"]
    verbs: ["get", "list", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: my-sa-role-binding
  namespace: my-namespace
subjects:
  - kind: ServiceAccount
    name: my-sa
    namespace: my-namespace
roleRef:
  kind: Role
  name: my-sa-role
  apiGroup: rbac.authorization.k8s.io
```

---

## Best Practices

- **Collect sufficient audit data:** Run audit2rbac against logs that cover all expected workload operations, including startup, steady-state, and edge cases.
- **Review generated policies:** Always review generated RBAC before applying to production to ensure no unexpected permissions are included.
- **Use resource names when possible:** audit2rbac can generate rules with specific `resourceNames` for finer-grained access control.
- **Iterate over time:** Regenerate policies periodically as workload requirements evolve.
- **Combine with policy enforcement:** Use generated policies alongside tools like OPA Gatekeeper or Kyverno to enforce RBAC best practices.

---

## Limitations

- Requires audit logging to be enabled on the Kubernetes API server.
- Only captures API requests that occurred during the audit period.
- Does not account for future permission requirements or code changes.
- Generated policies reflect observed behavior, which may include unnecessary access patterns.

---

## References

This article is based on information from the following official sources:

1. [audit2rbac GitHub Repository](https://github.com/liggitt/audit2rbac) - GitHub
2. [Auditing](https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/) - Kubernetes Documentation
3. [Using RBAC Authorization](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) - Kubernetes Documentation
