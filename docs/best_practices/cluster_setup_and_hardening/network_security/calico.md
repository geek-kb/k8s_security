---
title: "Calico"
description: "Calico is a networking and network security solution for Kubernetes that provides highly scalable, policy-driven networking and workload isolation."
sidebar_position: 12
keywords: [kubernetes security tool, calico, CNI plugin, network policies, kubernetes networking, workload isolation, BGP routing, network security, policy enforcement, CKS]
---

# Calico

**Required knowledge for the CKS certification.**

**Calico** is an open-source **networking and security** solution for containers, virtual machines, and native host-based workloads. In Kubernetes environments, Calico provides **high-performance, scalable networking** along with **fine-grained network security policies** for workloads running across nodes.

Calico supports both **Kubernetes NetworkPolicy** and its own **Calico-specific extensions** that provide more advanced capabilities like GlobalNetworkPolicy, DNS policy, and FQDN-based rules.

---

## Usage

### 1. Install Calico in Kubernetes

Install using the official manifests:

```bash
kubectl apply -f https://raw.githubusercontent.com/projectcalico/calico/v3.27.0/manifests/calico.yaml
```

Or using Helm:

```bash
helm repo add projectcalico https://projectcalico.docs.tigera.io/charts
helm install calico projectcalico/tigera-operator --namespace tigera-operator --create-namespace
```

---

### 2. Define Kubernetes Network Policies

Example: Deny all ingress traffic to pods in the `production` namespace:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all-ingress
  namespace: production
spec:
  podSelector: {}
  policyTypes:
    - Ingress
```

Apply it:

```bash
kubectl apply -f deny-all-ingress.yaml
```

---

### 3. Use Calico Global Network Policies

Calico allows defining policies that apply **across namespaces**:

```yaml
apiVersion: projectcalico.org/v3
kind: GlobalNetworkPolicy
metadata:
  name: allow-dns
spec:
  selector: all()
  ingress:
    - action: Allow
      protocol: UDP
      destination:
        ports:
          - 53
  egress:
    - action: Allow
      protocol: UDP
      destination:
        ports:
          - 53
  types:
    - Ingress
    - Egress
```

---

### 4. Monitor and Debug Policies

Use `calicoctl` to view and manage Calico-specific resources:

```bash
calicoctl get globalnetworkpolicies
calicoctl get networkpolicies -n default
```

Calico also supports **flow logs**, **IP sets**, and **policy enforcement metrics**.

---

## Best Practices

- **Use GlobalNetworkPolicy** for consistent policy enforcement across namespaces.
- **Deny by default**, and only allow required traffic.
- **Integrate with eBPF mode** for better performance on large clusters.
- **Enable Calico’s DNS policy support** to control access to external services.
- Regularly audit and test policies using `calicoctl` or compatible CI tools.

---

## Resources

- **Official Documentation:** [https://projectcalico.docs.tigera.io](https://projectcalico.docs.tigera.io)
- **GitHub Repository:** [https://github.com/projectcalico/calico](https://github.com/projectcalico/calico)
- **Network Policy Tutorial:** [https://projectcalico.docs.tigera.io/security/kubernetes-network-policy](https://projectcalico.docs.tigera.io/security/kubernetes-network-policy)
