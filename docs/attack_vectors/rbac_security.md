---
sidebar_position: 3
title: "Insecure RBAC Permissions"
description: "Understanding how overly permissive RBAC configurations can lead to unauthorized access and privilege escalation in Kubernetes."
---

# Insecure RBAC Permissions

**Role-Based Access Control (RBAC)** is a fundamental security mechanism in Kubernetes, used to define **who** can perform **what actions** on **which resources**. When RBAC is **misconfigured or overly permissive**, attackers can escalate privileges, access sensitive resources, and compromise the entire cluster.

---

## Exploitation Steps: Gaining Unauthorized Access via Misconfigured RBAC

An attacker exploits weak RBAC settings to gain **elevated permissions** within the cluster.

### Step 1: Identify Open Permissions

The attacker lists RBAC roles and bindings using an existing low-privilege account:

```bash
kubectl get roles,rolebindings,clusterroles,clusterrolebindings -A
```

If a **RoleBinding** or **ClusterRoleBinding** grants excessive permissions, the attacker identifies a potential escalation path.

### Step 2: Impersonate a More Privileged User

If `impersonate` privileges are granted, the attacker can act as a more privileged user:

```bash
kubectl auth can-i '*' '*' --as=admin
```

### Step 3: Gain Cluster-Wide Access

If the attacker finds a misconfigured `ClusterRoleBinding` granting `cluster-admin` access, they escalate privileges:

```bash
kubectl create clusterrolebinding attacker-admin --clusterrole=cluster-admin --user=attacker
```

### Step 4: Execute Arbitrary Commands

Once the attacker has `cluster-admin` privileges, they can execute commands across the cluster:

```bash
kubectl exec -it <pod-name> -- /bin/sh
kubectl delete namespace production
```

### Result

The attacker now has **full administrative access**, enabling them to modify workloads, exfiltrate data, or delete entire namespaces.

---

## Mitigation Steps

To secure RBAC configurations and prevent privilege escalation, follow the security best practices outlined in:

➡ **[Securing RBAC Permissions](/docs/best_practices/cluster_setup_and_hardening/rbac_security)**

This guide covers techniques such as **principle of least privilege, role scoping, avoiding wildcard permissions, and enforcing least privilege bindings** to mitigate RBAC security risks.
