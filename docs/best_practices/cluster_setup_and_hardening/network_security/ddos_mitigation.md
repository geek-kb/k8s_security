---
sidebar_position: 2
title: "DDoS Mitigation in Kubernetes"
description: "Learn strategies to mitigate Distributed Denial-of-Service (DDoS) attacks in Kubernetes clusters."
keywords: [kubernetes security best practices, DDoS mitigation, distributed denial of service, rate limiting, network policies, ingress protection, service mesh, kubernetes networking, CKS]
---

# DDoS Mitigation in Kubernetes

Distributed Denial-of-Service (**DDoS**) attacks are a common security threat where attackers attempt to overwhelm a system with excessive traffic, causing service disruptions. Kubernetes clusters, especially those exposed to the internet, are potential targets. Implementing DDoS mitigation strategies is crucial for maintaining cluster availability and resilience.

---

## Understanding DDoS Attacks in Kubernetes

DDoS attacks on Kubernetes clusters can target multiple layers:

- **Network Layer (L3/L4):** Large-scale traffic floods targeting Kubernetes **Ingress controllers**, **Load Balancers**, or **Node IPs**.
- **Application Layer (L7):** Attacks aimed at overwhelming API endpoints, causing high CPU/memory consumption.
- **Resource Exhaustion Attacks:** Targeting **Kubernetes API Server**, **etcd**, or **specific workloads** by consuming cluster resources.

---

## Best Practices for DDoS Mitigation

### 1. Use Cloud Provider DDoS Protection

Most major cloud providers offer **DDoS protection services**, such as:

- **AWS Shield** (AWS)
- **Azure DDoS Protection** (Azure)
- **Google Cloud Armor** (GCP)

These services provide **automatic traffic filtering** and **rate-limiting** to mitigate large-scale attacks.

---

### 2. Implement Rate Limiting on Ingress Controllers

**Issue:** Kubernetes Ingress controllers may be vulnerable to **HTTP flood** attacks.<br/>
**Fix:** Use **rate limiting** in NGINX, Traefik, or other ingress controllers.

#### Example: NGINX Rate Limiting

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: example-ingress
  annotations:
    nginx.ingress.kubernetes.io/limit-rps: "10"
    nginx.ingress.kubernetes.io/limit-burst: "20"
spec:
  rules:
    - host: example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: example-service
                port:
                  number: 80
```

This configuration **limits requests** to `10` per second per client with a **burst allowance** of `20`.

---

### 3. Enable Web Application Firewall (WAF)

A **Web Application Firewall (WAF)** filters and blocks malicious traffic at **Layer 7 (Application Layer)**.

#### Options

- **AWS WAF** (for ALB-based Ingress)
- **Google Cloud Armor**
- **ModSecurity WAF** (for NGINX Ingress)

Example: Deploying **ModSecurity WAF** with NGINX Ingress:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: modsecurity-config
data:
  modsecurity.conf: |
    SecRuleEngine On
    SecRequestBodyAccess On
    SecResponseBodyAccess Off
    SecRule ARGS:cmd "(ls|cat|pwd|whoami)" "id:1,phase:2,deny,status:403"
```

This blocks **command injection attacks** in HTTP requests.

---

### 4. Use Kubernetes Network Policies

**Issue:** Open network policies allow attackers to flood services with traffic.<br/>
**Fix:** Define **Kubernetes Network Policies** to restrict ingress/egress traffic.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all-external
  namespace: default
spec:
  podSelector: {}
  policyTypes:
    - Ingress
  ingress:
    - from:
        - podSelector: {}
```

This **restricts external ingress traffic**, only allowing internal pod-to-pod communication.

---

### 5. Configure API Server Rate Limits

**Issue:** Attackers may send excessive requests to the **Kubernetes API Server**, causing performance degradation.<br/>
**Fix:** Limit API request rates using **API Server flags**.

Example API Server configuration:

```bash
kube-apiserver \
  --max-requests-inflight=300 \
  --max-mutating-requests-inflight=100
```

- **`--max-requests-inflight=300`**: Limits non-mutating requests.
- **`--max-mutating-requests-inflight=100`**: Limits mutating API requests.

---

### 6. Deploy an Anti-DDoS DaemonSet

Using **eBPF-based** monitoring tools like **Cilium** or **Falco**, you can detect and mitigate **DDoS patterns**.

Example: Deploying **Cilium Hubble** to monitor **network traffic anomalies**:

```bash
helm install cilium cilium/cilium --namespace kube-system \
  --set hubble.enabled=true \
  --set hubble.metrics.enabled="{dns, drop, flow, http, icmp}"
```

This **monitors traffic patterns** to detect potential **DDoS activity**.

---

## Key Takeaways

- **Use cloud provider DDoS protection** for automated mitigation.
- **Implement rate limiting** on ingress controllers.
- **Use a WAF** to filter Layer 7 attacks.
- **Restrict network traffic** with Kubernetes **Network Policies**.
- **Limit API Server requests** to prevent exhaustion attacks.
- **Monitor network traffic** using **eBPF-based tools** like Cilium.

By **combining multiple security layers**, you can effectively **mitigate DDoS attacks** and **maintain cluster availability**.
