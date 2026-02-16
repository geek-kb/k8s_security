---
sidebar_position: 17
title: "rback"
description: "rback generates visual diagrams of Kubernetes RBAC configurations, making it easier to understand and audit complex permission structures."
keywords: [kubernetes security tool, rback, RBAC visualization, rbac diagram, kubernetes authorization, access control visualization, security audit, graphviz, CKS]
tags: [tool, rbac, authorization, CKS]
related:
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/rbac-and-identity/insecure-rbac-permissions-mitigation/
  - /kubernetes-security/fundamentals/authorization/rbac/
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/rbac-and-identity/rakkess/
---

# rback

**rback** is a tool that generates visual diagrams of Kubernetes RBAC configurations. It produces graphs showing the relationships between Roles, ClusterRoles, RoleBindings, ClusterRoleBindings, ServiceAccounts, Users, and Groups. These visualizations make it easier to understand complex RBAC structures and identify potential security issues.

The tool outputs DOT format files that can be rendered using Graphviz or similar tools.

---

## Use Cases

- Visualize complex RBAC configurations for security reviews.
- Document RBAC structures for compliance and audit purposes.
- Identify unexpected permission relationships.
- Onboard new team members by providing visual RBAC documentation.
- Debug RBAC issues by seeing the full permission chain.

---

## Installation

Install rback from GitHub releases:

```bash
curl -LO https://github.com/team-soteria/rback/releases/download/v0.4.0/rback-linux-amd64.tar.gz
tar xzf rback-linux-amd64.tar.gz
chmod +x rback
sudo mv rback /usr/local/bin/
```

For macOS:

```bash
curl -LO https://github.com/team-soteria/rback/releases/download/v0.4.0/rback-darwin-amd64.tar.gz
tar xzf rback-darwin-amd64.tar.gz
chmod +x rback
sudo mv rback /usr/local/bin/
```

Graphviz is required to render the output:

```bash
# Ubuntu/Debian
sudo apt-get install graphviz

# macOS
brew install graphviz

# RHEL/CentOS
sudo yum install graphviz
```

---

## Usage Examples

### Generate RBAC Diagram for Current Cluster

```bash
kubectl get sa,roles,rolebindings,clusterroles,clusterrolebindings -A -o yaml | rback > rbac.dot
dot -Tpng rbac.dot -o rbac.png
```

### Generate Diagram for a Specific Namespace

```bash
kubectl get sa,roles,rolebindings -n production -o yaml | rback > production-rbac.dot
dot -Tpng production-rbac.dot -o production-rbac.png
```

### Generate SVG Output (Better for Large Diagrams)

```bash
kubectl get sa,roles,rolebindings,clusterroles,clusterrolebindings -A -o yaml | rback > rbac.dot
dot -Tsvg rbac.dot -o rbac.svg
```

### Filter by Specific Resources

```bash
# Only show specific service accounts
kubectl get sa my-sa -n production -o yaml | rback > sa-rbac.dot
```

### Generate PDF Output

```bash
kubectl get sa,roles,rolebindings,clusterroles,clusterrolebindings -A -o yaml | rback > rbac.dot
dot -Tpdf rbac.dot -o rbac.pdf
```

---

## Understanding the Diagram

rback generates graphs with the following elements:

### Node Types

| Shape | Color | Represents |
|-------|-------|------------|
| Ellipse | Green | ServiceAccount |
| Ellipse | Yellow | User |
| Ellipse | Orange | Group |
| Rectangle | Blue | Role/ClusterRole |
| Diamond | Purple | RoleBinding/ClusterRoleBinding |

### Edge Types

| Edge | Meaning |
|------|---------|
| Subject -> Binding | Subject is bound to this binding |
| Binding -> Role | Binding references this role |

### Example Diagram Elements

```
ServiceAccount (green) --> RoleBinding (diamond) --> Role (blue)
                                                      |
                                                      v
                                              [permissions list]
```

---

## Advanced Usage

### Filter to Show Only ClusterRoleBindings

```bash
kubectl get clusterroles,clusterrolebindings -o yaml | rback > cluster-rbac.dot
```

### Combine with jq for Filtering

```bash
# Show only bindings for a specific subject
kubectl get rolebindings,clusterrolebindings -A -o json | \
  jq '.items[] | select(.subjects[]?.name == "my-service-account")' | \
  kubectl get -f - -o yaml | rback > filtered-rbac.dot
```

### Generate Diagrams for Multiple Namespaces

```bash
for ns in production staging development; do
  kubectl get sa,roles,rolebindings -n $ns -o yaml | rback > $ns-rbac.dot
  dot -Tpng $ns-rbac.dot -o $ns-rbac.png
done
```

---

## Best Practices

- **Regular visualization:** Generate RBAC diagrams regularly and compare against previous versions to detect changes.
- **Namespace separation:** Create separate diagrams for each namespace to reduce complexity.
- **Use SVG for large clusters:** SVG format allows zooming and searching in large diagrams.
- **Document in wikis:** Include generated diagrams in security documentation and runbooks.
- **Combine with auditing:** Use alongside kubectl-who-can and rakkess for comprehensive RBAC analysis.

---

## Limitations

- Large clusters may produce very complex diagrams that are difficult to read.
- Does not evaluate effective permissions; shows only configuration.
- Requires Graphviz to be installed for rendering.
- Does not show aggregated ClusterRoles in detail.

---

## References

This article is based on information from the following official sources:

1. [rback GitHub Repository](https://github.com/team-soteria/rback) - GitHub
2. [Using RBAC Authorization](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) - Kubernetes Documentation
3. [Graphviz Documentation](https://graphviz.org/documentation/) - Graphviz
