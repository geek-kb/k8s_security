---
sidebar_position: 9
title: "Securing Kubernetes Network Traffic"
description: "Best practices for securing Kubernetes network traffic against hijacking, interception, and unauthorized manipulation."
---

# Securing Kubernetes Network Traffic

**Traffic hijacking** in Kubernetes occurs when attackers manipulate network traffic to **intercept, redirect, or disrupt** communication between workloads. To prevent these attacks, **strict network policies, DNS security, and encryption mechanisms** should be enforced.

---

## 1. Restrict Traffic Flow with Network Policies

**Required knowledge for the CKS certification.**

To control pod-to-pod communication and prevent unauthorized traffic flows, use Kubernetes **Network Policies**.

➡ **For a detailed guide on implementing Network Policies, see [Network Policies in Kubernetes](/docs/best_practices/cluster_setup_and_hardening/network_security/network_policies)**.

---

## 2. Secure CoreDNS to Prevent DNS Hijacking

**Issue:** If CoreDNS is misconfigured, attackers can manipulate DNS resolution and redirect traffic.<br/>
**Fix:** Restrict access to the CoreDNS configuration and enable DNS query logging.

### Secure CoreDNS Configuration

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: coredns
  namespace: kube-system
data:
  Corefile: |
    .:53 {
        errors
        log
        health
        ready
        kubernetes cluster.local in-addr.arpa ip6.arpa {
            pods verified
            fallthrough in-addr.arpa ip6.arpa
        }
        forward . /etc/resolv.conf
        cache 30
        loop
        reload
    }
```

### Why It Matters

- **Prevents** unauthorized modifications to DNS resolution.<br/>
- **Logs** DNS queries to detect suspicious activity.

---

## 3. Encrypt Intra-Cluster Traffic with mTLS

**Issue:** Kubernetes does not encrypt pod-to-pod communication by default, exposing traffic to MITM attacks.<br/>
**Fix:** Use **mutual TLS (mTLS)** for secure service-to-service communication.

### Secure Communication with Istio mTLS

```yaml
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
  namespace: istio-system
spec:
  mtls:
    mode: STRICT
```

### Why It Matters

- **Ensures** that only authenticated services can communicate.<br/>
- **Encrypts** data in transit, preventing traffic interception.

---

## 4. Restrict External Service Exposure

**Issue:** Publicly exposed services can be accessed by attackers, leading to data leakage.<br/>
**Fix:** Restrict external service exposure and use **Ingress with authentication**.

### Secure Ingress Configuration

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: secure-ingress
  annotations:
    nginx.ingress.kubernetes.io/auth-type: "basic"
spec:
  rules:
    - host: myapp.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: myapp-service
                port:
                  number: 443
```

### Why It Matters

- **Blocks** unauthorized external access to services.<br/>
- **Requires** authentication before exposing application endpoints.

---

## 5. Detect and Block Traffic Anomalies

**Issue:** Kubernetes lacks built-in detection for **traffic anomalies or spoofing attempts**.<br/>
**Fix:** Use **network monitoring tools** to detect and respond to suspicious activity.

### Enable Network Flow Monitoring with Cilium

```bash
cilium monitor --type drop
```

### Why It Matters

- **Detects** unauthorized traffic flows in real time.<br/>
- **Prevents** data exfiltration and unauthorized access.

---

## Conclusion

To protect Kubernetes from **traffic hijacking**, administrators should **enforce network policies, secure DNS, encrypt intra-cluster traffic, restrict service exposure, and implement traffic monitoring**. These best practices help mitigate **man-in-the-middle attacks, unauthorized service access, and network-based exploitation**.

➡ For more security recommendations, see **[Kubernetes Network Security](/docs/best_practices/cluster_setup_and_hardening/network_security/intro)**.
