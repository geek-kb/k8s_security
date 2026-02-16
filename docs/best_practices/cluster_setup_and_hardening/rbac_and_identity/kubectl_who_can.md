---
sidebar_position: 15
title: "kubectl-who-can"
description: "kubectl-who-can shows which subjects have RBAC permissions to perform specific actions on Kubernetes resources, helping identify privilege distribution."
keywords: [kubernetes security tool, kubectl-who-can, RBAC analysis, permission audit, kubernetes authorization, access control, security audit, privilege review, CKS]
tags: [tool, rbac, authorization, CKS]
related:
  - /docs/best_practices/cluster_setup_and_hardening/rbac_and_identity/insecure_rbac_permissions_mitigation/
  - /docs/fundamentals/authorization/rbac/
  - /docs/attack_vectors/insecure_rbac_permissions/
---

# kubectl-who-can

**kubectl-who-can** is a kubectl plugin that shows which users, groups, and service accounts have RBAC permissions to perform a given action on a Kubernetes resource. It helps security teams audit privilege distribution and identify subjects with potentially dangerous permissions.

This tool answers questions like "Who can delete pods in the production namespace?" or "Which service accounts can create secrets cluster-wide?"

---

## Use Cases

- Audit RBAC configurations to identify over-privileged subjects.
- Investigate security incidents by determining who had access to specific resources.
- Validate that least-privilege principles are being followed.
- Review permissions before granting new roles or bindings.
- Document access controls for compliance requirements.

---

## Installation

Install kubectl-who-can using krew (the kubectl plugin manager):

```bash
kubectl krew install who-can
```

Or download directly from GitHub releases:

```bash
curl -LO https://github.com/aquasecurity/kubectl-who-can/releases/download/v0.4.0/kubectl-who-can_linux_amd64.tar.gz
tar xzf kubectl-who-can_linux_amd64.tar.gz
chmod +x kubectl-who-can
sudo mv kubectl-who-can /usr/local/bin/
```

---

## Usage Examples

### Check Who Can Delete Pods

```bash
kubectl who-can delete pods
```

Example output:

```
ROLEBINDING                             NAMESPACE   SUBJECT             TYPE            SA-NAMESPACE
admin-binding                           default     admin-user          User
developer-binding                       default     developer-group     Group
CLUSTERROLEBINDING                      SUBJECT                         TYPE            SA-NAMESPACE
cluster-admin                           system:masters                  Group
```

### Check Who Can Create Secrets in a Namespace

```bash
kubectl who-can create secrets -n production
```

### Check Who Can Exec into Pods

```bash
kubectl who-can create pods/exec
```

### Check Who Can Access a Specific Resource

```bash
kubectl who-can get secrets/my-secret -n my-namespace
```

### Check Cluster-Wide Permissions

```bash
kubectl who-can delete nodes --all-namespaces
```

### Output as JSON

```bash
kubectl who-can delete pods -o json
```

---

## Understanding the Output

The output is organized into two sections:

**RoleBindings:** Shows namespace-scoped bindings that grant the permission.

| Column | Description |
|--------|-------------|
| ROLEBINDING | Name of the RoleBinding |
| NAMESPACE | Namespace where the binding applies |
| SUBJECT | User, Group, or ServiceAccount name |
| TYPE | Subject type (User, Group, ServiceAccount) |
| SA-NAMESPACE | Namespace of ServiceAccount (if applicable) |

**ClusterRoleBindings:** Shows cluster-wide bindings that grant the permission.

| Column | Description |
|--------|-------------|
| CLUSTERROLEBINDING | Name of the ClusterRoleBinding |
| SUBJECT | User, Group, or ServiceAccount name |
| TYPE | Subject type |
| SA-NAMESPACE | Namespace of ServiceAccount (if applicable) |

---

## Common Audit Queries

### Identify Cluster Admins

```bash
kubectl who-can '*' '*'
```

### Find Who Can Modify RBAC

```bash
kubectl who-can create clusterrolebindings
kubectl who-can create rolebindings
```

### Check Dangerous Pod Permissions

```bash
# Who can run privileged pods
kubectl who-can create pods

# Who can exec into pods
kubectl who-can create pods/exec

# Who can attach to pods
kubectl who-can create pods/attach
```

### Find Who Can Access Secrets

```bash
kubectl who-can get secrets --all-namespaces
kubectl who-can list secrets --all-namespaces
```

---

## Best Practices

- **Run periodic audits:** Schedule regular who-can queries to detect permission drift.
- **Focus on dangerous verbs:** Prioritize auditing `create`, `delete`, `update`, and `patch` permissions over `get`, `list`, and `watch`.
- **Check sensitive resources:** Regularly audit access to secrets, configmaps, RBAC resources, and pod execution capabilities.
- **Document findings:** Export results as JSON for compliance documentation and historical comparison.
- **Combine with other tools:** Use alongside audit2rbac and rakkess for comprehensive RBAC analysis.

---

## References

This article is based on information from the following official sources:

1. [kubectl-who-can GitHub Repository](https://github.com/aquasecurity/kubectl-who-can) - Aqua Security
2. [Using RBAC Authorization](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) - Kubernetes Documentation
3. [Extend kubectl with plugins](https://kubernetes.io/docs/tasks/extend-kubectl/kubectl-plugins/) - Kubernetes Documentation
