---
title: "Cilium"
description: "Cilium is an eBPF-powered Kubernetes networking, security, and observability solution that enables high-performance and fine-grained control over cluster communications."
sidebar_position: 11
---

# Cilium

**Required knowledge for the CKS certification.**

**Cilium** is an advanced **networking, security, and observability** platform for Kubernetes that leverages **eBPF** (Extended Berkeley Packet Filter) to provide **high-performance networking**, **transparent encryption**, **network policies**, and **deep visibility** into traffic flows.

It replaces traditional kube-proxy, CNI plugins, and service meshes with a modern, programmable data plane that integrates tightly with Kubernetes.

---

## Usage

### 1. Install Cilium

Use the Cilium CLI to install it into your cluster:

```bash
cilium install
```

Check Cilium status:

```bash
cilium status
```

---

### 2. Define Network Policies with Cilium

Example: Allow only frontend pods to access the backend.

```yaml
apiVersion: cilium.io/v2
kind: CiliumNetworkPolicy
metadata:
  name: allow-frontend
spec:
  endpointSelector:
    matchLabels:
      app: backend
  ingress:
    - fromEndpoints:
        - matchLabels:
            app: frontend
```

Apply the policy:

```bash
kubectl apply -f allow-frontend.yaml
```

---

### 3. Enable Transparent Encryption

Enable encryption between nodes using WireGuard or IPsec:

```bash
cilium config set enable-ipsec true
```

Or using Helm:

```bash
helm upgrade cilium cilium/cilium --set encryption.enabled=true
```

---

### 4. Observe Network Flows

Use Hubble, Cilium's observability engine:

```bash
cilium hubble enable
cilium hubble ui
```

You can visualize:

- Service-to-service communication
- DNS queries
- Allowed/denied flows
- Identity and label-based flows

---

## Best Practices

- Replace **kube-proxy** with Cilium to simplify architecture and reduce latency.
- Use **identity-aware network policies** for more granular control than standard Kubernetes `NetworkPolicy`.
- Enable **Hubble** to monitor and audit all traffic and security events.
- Use **transparent encryption** to secure node-to-node traffic with zero changes to workloads.
- Regularly test your policies using Cilium’s connectivity test suite.

---

## Resources

- **Official Documentation:** [https://docs.cilium.io](https://docs.cilium.io)
- **Cilium GitHub Repository:** [https://github.com/cilium/cilium](https://github.com/cilium/cilium)
- **Policy Examples:** [https://docs.cilium.io/en/stable/policy/language/](https://docs.cilium.io/en/stable/policy/language/)
