---
sidebar_position: 16
title: "rakkess"
description: "rakkess displays an access matrix showing which Kubernetes resources a user, group, or service account can access, providing a comprehensive RBAC overview."
keywords: [kubernetes security tool, rakkess, RBAC matrix, access review, kubernetes authorization, permission overview, security audit, access control, CKS]
tags: [tool, rbac, authorization, CKS]
related:
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/rbac-and-identity/insecure-rbac-permissions-mitigation/
  - /kubernetes-security/fundamentals/authorization/rbac/
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/rbac-and-identity/kubectl-who-can/
---

# rakkess

**rakkess** (Review Access - kubectl plugin) displays an access matrix for Kubernetes resources, showing at a glance which resources a given subject can access. It provides a comprehensive overview of effective permissions, making it easier to audit RBAC configurations and identify potential security issues.

Unlike `kubectl auth can-i` which checks individual permissions, rakkess shows all permissions across all resource types in a single matrix view.

---

## Use Cases

- Quickly audit effective permissions for users, groups, or service accounts.
- Identify resources that a subject should not have access to.
- Compare permissions across different subjects or namespaces.
- Validate RBAC configurations during security reviews.
- Document access controls for compliance requirements.

---

## Installation

Install rakkess using krew (the kubectl plugin manager):

```bash
kubectl krew install access-matrix
```

Or download directly from GitHub releases:

```bash
curl -LO https://github.com/corneliusweig/rakkess/releases/download/v0.5.0/rakkess-amd64-linux.tar.gz
tar xzf rakkess-amd64-linux.tar.gz
chmod +x rakkess-amd64-linux
sudo mv rakkess-amd64-linux /usr/local/bin/kubectl-access_matrix
```

---

## Usage Examples

### Show Access Matrix for Current User

```bash
kubectl access-matrix
```

Example output:

```
NAME                                  LIST  CREATE  UPDATE  DELETE
bindings                                          ✔
configmaps                            ✔     ✔       ✔       ✔
endpoints                             ✔     ✔       ✔       ✔
events                                ✔
limitranges                           ✔
namespaces                            ✔
nodes                                 ✔
persistentvolumeclaims                ✔     ✔       ✔       ✔
persistentvolumes                     ✔
pods                                  ✔     ✔       ✔       ✔
pods/exec                                   ✔
pods/log                              ✔
secrets                               ✔     ✔       ✔       ✔
serviceaccounts                       ✔     ✔       ✔       ✔
services                              ✔     ✔       ✔       ✔
```

### Check Access for a Specific Service Account

```bash
kubectl access-matrix --as system:serviceaccount:my-namespace:my-sa
```

### Check Access in a Specific Namespace

```bash
kubectl access-matrix -n production
```

### Check Access for a User

```bash
kubectl access-matrix --as jane@example.com
```

### Check Access for a Group

```bash
kubectl access-matrix --as-group developers
```

### Include All Verbs

```bash
kubectl access-matrix --verbs=get,list,watch,create,update,patch,delete,deletecollection
```

### Filter by Resource

```bash
kubectl access-matrix --resource secrets
```

### Output Formats

```bash
# JSON output
kubectl access-matrix -o json

# Wide output (shows all verbs)
kubectl access-matrix -o wide
```

---

## Understanding the Access Matrix

The matrix displays:

- **Rows:** Kubernetes resource types (pods, secrets, configmaps, etc.)
- **Columns:** Verbs (list, create, update, delete, etc.)
- **Cells:** Checkmarks indicate allowed actions

### Verb Meanings

| Verb | Description |
|------|-------------|
| get | Read a specific resource by name |
| list | List all resources of a type |
| watch | Watch for changes to resources |
| create | Create new resources |
| update | Replace existing resources |
| patch | Partially modify resources |
| delete | Delete specific resources |
| deletecollection | Delete multiple resources at once |

---

## Common Audit Scenarios

### Audit Service Account Permissions

```bash
# Check default service account in each namespace
for ns in $(kubectl get ns -o jsonpath='{.items[*].metadata.name}'); do
  echo "=== Namespace: $ns ==="
  kubectl access-matrix --as system:serviceaccount:$ns:default -n $ns
done
```

### Compare User Permissions

```bash
# Developer access
kubectl access-matrix --as developer@example.com -n development

# Admin access
kubectl access-matrix --as admin@example.com -n development
```

### Check Cluster-Wide Access

```bash
kubectl access-matrix --all-namespaces
```

---

## Best Practices

- **Regular audits:** Run access-matrix checks regularly to detect permission drift.
- **Focus on sensitive resources:** Pay special attention to secrets, RBAC resources, and pod execution permissions.
- **Compare against baseline:** Document expected permissions and compare against actual access.
- **Check service accounts:** Audit service accounts in all namespaces, especially the default service account.
- **Combine with other tools:** Use alongside kubectl-who-can for bidirectional RBAC analysis.

---

## References

This article is based on information from the following official sources:

1. [rakkess GitHub Repository](https://github.com/corneliusweig/rakkess) - GitHub
2. [Using RBAC Authorization](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) - Kubernetes Documentation
3. [Checking API Access](https://kubernetes.io/docs/reference/access-authn-authz/authorization/#checking-api-access) - Kubernetes Documentation
