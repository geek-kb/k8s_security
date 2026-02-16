---
sidebar_position: 19
title: "kubernetes-rbac-audit"
description: "kubernetes-rbac-audit is an auditing tool that analyzes RBAC configurations to identify risky permissions and potential security misconfigurations."
keywords: [kubernetes security tool, kubernetes-rbac-audit, RBAC security, permission audit, privilege escalation detection, kubernetes authorization, security audit, risky permissions, CKS]
tags: [tool, rbac, authorization, CKS]
related:
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/rbac-and-identity/insecure-rbac-permissions-mitigation/
  - /kubernetes-security/fundamentals/authorization/rbac/
  - /kubernetes-security/attack-vectors/insecure-rbac-permissions/
---

# kubernetes-rbac-audit

**kubernetes-rbac-audit** is a security auditing tool that analyzes Kubernetes RBAC configurations to identify risky permissions, potential privilege escalation paths, and security misconfigurations. It examines Roles, ClusterRoles, RoleBindings, and ClusterRoleBindings to detect permissions that could be exploited by attackers.

The tool focuses on identifying dangerous permission combinations that are commonly targeted in Kubernetes attacks.

---

## Use Cases

- Identify overly permissive RBAC configurations.
- Detect potential privilege escalation paths.
- Audit RBAC before and after changes.
- Generate security reports for compliance.
- Integrate into CI/CD pipelines to prevent risky RBAC deployments.

---

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/cyberark/kubernetes-rbac-audit.git
cd kubernetes-rbac-audit
pip install -r requirements.txt
```

Or run using Docker:

```bash
docker pull cyberark/kubernetes-rbac-audit
```

---

## Usage Examples

### Audit Current Cluster

```bash
# Export RBAC configuration
kubectl get roles,rolebindings,clusterroles,clusterrolebindings -A -o yaml > rbac.yaml

# Run the audit
python rbac-audit.py -f rbac.yaml
```

### Using Docker

```bash
kubectl get roles,rolebindings,clusterroles,clusterrolebindings -A -o yaml | \
  docker run -i cyberark/kubernetes-rbac-audit
```

### Audit Specific Namespace

```bash
kubectl get roles,rolebindings -n production -o yaml > production-rbac.yaml
python rbac-audit.py -f production-rbac.yaml
```

### Output to JSON

```bash
python rbac-audit.py -f rbac.yaml --json > audit-results.json
```

---

## Risk Categories Detected

kubernetes-rbac-audit identifies several categories of risky permissions:

### Critical Risks

| Permission | Risk |
|------------|------|
| `secrets: get/list` | Access to all secrets including tokens and credentials |
| `pods/exec: create` | Execute commands in any pod |
| `pods: create` | Create pods with mounted secrets or host paths |
| `rolebindings: create` | Bind any role to self for privilege escalation |
| `clusterrolebindings: create` | Cluster-wide privilege escalation |
| `*: *` (wildcard) | Full administrative access |

### High Risks

| Permission | Risk |
|------------|------|
| `secrets: watch` | Monitor secret changes in real-time |
| `pods/attach: create` | Attach to running containers |
| `serviceaccounts/token: create` | Generate tokens for any service account |
| `nodes/proxy: create` | Access kubelet API through API server |
| `persistentvolumes: create` | Mount arbitrary host paths |

### Medium Risks

| Permission | Risk |
|------------|------|
| `pods: delete` | Denial of service by deleting workloads |
| `configmaps: update` | Modify application configurations |
| `services: create` | Create services for traffic interception |
| `endpoints: update` | Redirect service traffic |

---

## Example Output

```
=== CRITICAL RISKS ===

Subject: system:serviceaccount:default:admin-sa
Roles: admin-role
Risky Permissions:
  - secrets: [get, list, watch] - Can access all secrets in namespace
  - pods/exec: [create] - Can execute commands in pods
  - rolebindings: [create] - Can escalate privileges

Subject: developer-group (Group)
Roles: developer-role
Risky Permissions:
  - pods: [create] - Can create pods with security risks

=== HIGH RISKS ===

Subject: system:serviceaccount:monitoring:prometheus
Roles: prometheus-role
Risky Permissions:
  - nodes/metrics: [get] - Can access node metrics

=== SUMMARY ===
Critical: 2
High: 1
Medium: 5
Total subjects audited: 45
```

---

## CI/CD Integration

Integrate kubernetes-rbac-audit into CI/CD pipelines to prevent risky RBAC changes:

### GitHub Actions Example

```yaml
name: RBAC Audit
on:
  pull_request:
    paths:
      - 'kubernetes/rbac/**'

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run RBAC Audit
        run: |
          pip install pyyaml
          git clone https://github.com/cyberark/kubernetes-rbac-audit.git
          python kubernetes-rbac-audit/rbac-audit.py -f kubernetes/rbac/*.yaml --exit-code
```

### GitLab CI Example

```yaml
rbac-audit:
  stage: security
  image: python:3.9
  script:
    - pip install pyyaml
    - git clone https://github.com/cyberark/kubernetes-rbac-audit.git
    - python kubernetes-rbac-audit/rbac-audit.py -f manifests/rbac/*.yaml --exit-code
  only:
    changes:
      - manifests/rbac/**
```

---

## Best Practices

- **Run before applying RBAC changes:** Audit new RBAC configurations before deploying to production.
- **Integrate into CI/CD:** Automatically block PRs that introduce risky permissions.
- **Schedule regular audits:** Run periodic audits to detect configuration drift.
- **Review critical findings immediately:** Critical and high-risk findings should be addressed promptly.
- **Combine with runtime monitoring:** Use Falco or similar tools to detect RBAC exploitation attempts.

---

## References

This article is based on information from the following official sources:

1. [kubernetes-rbac-audit GitHub Repository](https://github.com/cyberark/kubernetes-rbac-audit) - CyberArk
2. [Using RBAC Authorization](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) - Kubernetes Documentation
3. [Securing Kubernetes Clusters](https://kubernetes.io/docs/concepts/security/) - Kubernetes Documentation
