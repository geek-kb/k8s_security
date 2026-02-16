---
sidebar_position: 18
title: "kubectl-bindrole"
description: "kubectl-bindrole finds all Kubernetes roles and cluster roles bound to a specified ServiceAccount, User, or Group, helping audit RBAC configurations."
keywords: [kubernetes security tool, kubectl-bindrole, RBAC audit, role binding, kubernetes authorization, access control, service account permissions, security audit, CKS]
tags: [tool, rbac, authorization, CKS]
related:
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/rbac-and-identity/insecure-rbac-permissions-mitigation/
  - /kubernetes-security/fundamentals/authorization/rbac/
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/rbac-and-identity/kubectl-who-can/
---

# kubectl-bindrole

**kubectl-bindrole** is a kubectl plugin that finds all Roles and ClusterRoles bound to a specified ServiceAccount, User, or Group. It provides a quick way to answer "What roles does this subject have?" without manually searching through all RoleBindings and ClusterRoleBindings.

This tool complements kubectl-who-can by providing the inverse lookup: instead of "who can do X?", it answers "what can subject Y do?"

---

## Use Cases

- Audit all roles assigned to a specific service account.
- Investigate permissions granted to a user or group.
- Review role bindings during security assessments.
- Debug authorization issues by listing all effective roles.
- Document permissions for compliance requirements.

---

## Installation

Install kubectl-bindrole using krew (the kubectl plugin manager):

```bash
kubectl krew install bindrole
```

Or download directly from GitHub:

```bash
curl -LO https://github.com/Ladicle/kubectl-bindrole/releases/download/v1.0.0/kubectl-bindrole_linux_amd64.tar.gz
tar xzf kubectl-bindrole_linux_amd64.tar.gz
chmod +x kubectl-bindrole
sudo mv kubectl-bindrole /usr/local/bin/
```

---

## Usage Examples

### Find Roles for a ServiceAccount

```bash
kubectl bindrole serviceaccount my-namespace:my-service-account
```

Example output:

```
ROLE                    BINDING                  SCOPE
read-pods               pod-reader-binding       Namespace: my-namespace
configmap-admin         cm-admin-binding         Namespace: my-namespace
cluster-viewer          cluster-view-binding     Cluster
```

### Find Roles for a User

```bash
kubectl bindrole user jane@example.com
```

### Find Roles for a Group

```bash
kubectl bindrole group developers
```

### Show Role Details

Add `-o wide` to see the rules in each role:

```bash
kubectl bindrole serviceaccount my-namespace:my-sa -o wide
```

Example output:

```
ROLE             BINDING              SCOPE                 RULES
read-pods        pod-reader-binding   Namespace: default    pods: [get list watch]
secret-reader    secret-binding       Namespace: default    secrets: [get list]
cluster-viewer   view-binding         Cluster               *: [get list watch]
```

### Output as JSON

```bash
kubectl bindrole serviceaccount my-namespace:my-sa -o json
```

### Output as YAML

```bash
kubectl bindrole serviceaccount my-namespace:my-sa -o yaml
```

---

## Understanding the Output

The output displays:

| Column | Description |
|--------|-------------|
| ROLE | Name of the Role or ClusterRole |
| BINDING | Name of the RoleBinding or ClusterRoleBinding |
| SCOPE | Namespace scope or "Cluster" for cluster-wide roles |
| RULES | (Wide mode) API groups, resources, and verbs granted |

---

## Common Audit Scenarios

### Audit Default Service Accounts

Check what roles are bound to default service accounts:

```bash
for ns in $(kubectl get ns -o jsonpath='{.items[*].metadata.name}'); do
  echo "=== Namespace: $ns ==="
  kubectl bindrole serviceaccount $ns:default 2>/dev/null || echo "No bindings found"
done
```

### Check for Cluster-Admin Bindings

Identify service accounts with cluster-admin privileges:

```bash
kubectl get clusterrolebindings -o json | \
  jq -r '.items[] | select(.roleRef.name == "cluster-admin") | .subjects[]? | "\(.kind): \(.namespace)/\(.name)"'
```

### Compare Permissions Across Environments

```bash
# Development SA
kubectl bindrole serviceaccount development:app-sa -o wide

# Production SA
kubectl bindrole serviceaccount production:app-sa -o wide
```

---

## Best Practices

- **Regular audits:** Run bindrole checks for all service accounts in production namespaces.
- **Document expected roles:** Maintain documentation of which roles should be bound to which subjects.
- **Alert on changes:** Compare bindrole output over time to detect unexpected role assignments.
- **Check default SAs:** Ensure default service accounts in namespaces have minimal or no role bindings.
- **Combine with other tools:** Use with rakkess and kubectl-who-can for comprehensive RBAC analysis.

---

## References

This article is based on information from the following official sources:

1. [kubectl-bindrole GitHub Repository](https://github.com/Ladicle/kubectl-bindrole) - GitHub
2. [Using RBAC Authorization](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) - Kubernetes Documentation
3. [Extend kubectl with plugins](https://kubernetes.io/docs/tasks/extend-kubectl/kubectl-plugins/) - Kubernetes Documentation
