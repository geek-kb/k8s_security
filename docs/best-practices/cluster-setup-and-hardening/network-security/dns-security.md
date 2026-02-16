---
title: "DNS Security in Kubernetes"
description: "Protect CoreDNS from spoofing, cache poisoning, DNS tunneling, and unauthorized modifications to enhance Kubernetes cluster security."
sidebar_position: 3
keywords: [kubernetes security best practices, DNS security, CoreDNS, DNS spoofing, cache poisoning, DNS tunneling, DNS security hardening, kubernetes networking, service discovery, DNSSEC, DNS over TLS, CKS]
tags: [best-practice, network, dns, CoreDNS, CKS]
related:
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/network-security/network-policies/
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/network-security/egress-control/
  - /kubernetes-security/attack-vectors/traffic-hijacking/
---

# DNS Security in Kubernetes

DNS is a critical component of Kubernetes networking. **CoreDNS** serves as the default DNS provider, enabling service discovery by resolving service names to cluster IPs. Because every pod relies on DNS for communication, **compromising DNS can have cluster-wide impact**.

Securing DNS prevents attacks like **spoofing**, **cache poisoning**, **DNS tunneling**, and **data exfiltration through DNS queries**.

---

## 1. Restrict DNS Access with Network Policies

**Required knowledge for the CKS certification.**

**Issue:** By default, pods can query any DNS server, including external ones. This allows attackers to bypass CoreDNS and use external DNS for tunneling or exfiltration.<br/>
**Fix:** Use NetworkPolicies to restrict pods to only use cluster DNS (CoreDNS) and block external DNS access.

### Allow Only Internal DNS

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: restrict-dns-to-coredns
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: sensitive-app
  policyTypes:
    - Egress
  egress:
    - to:
        - namespaceSelector:
            matchLabels:
              kubernetes.io/metadata.name: kube-system
          podSelector:
            matchLabels:
              k8s-app: kube-dns
      ports:
        - protocol: UDP
          port: 53
        - protocol: TCP
          port: 53
    - to:
        - ipBlock:
            cidr: 10.0.0.0/8
```

### Block External DNS for All Pods

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-external-dns
  namespace: default
spec:
  podSelector: {}
  policyTypes:
    - Egress
  egress:
    - to:
        - namespaceSelector: {}
      ports:
        - protocol: UDP
          port: 53
        - protocol: TCP
          port: 53
```

---

## 2. Secure CoreDNS Configuration

**Issue:** Default CoreDNS configuration may lack logging, rate limiting, and other security controls needed to detect and prevent attacks.<br/>
**Fix:** Configure CoreDNS with query logging, cache limits, and zone transfer restrictions.

### Enable DNS Query Logging

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
        health {
           lameduck 5s
        }
        ready
        kubernetes cluster.local in-addr.arpa ip6.arpa {
           pods insecure
           fallthrough in-addr.arpa ip6.arpa
           ttl 30
        }
        prometheus :9153
        forward . /etc/resolv.conf {
           max_concurrent 1000
        }
        cache 30
        loop
        reload
        loadbalance
        log
    }
```

### Limit DNS Cache Size

Prevent cache exhaustion attacks:

```yaml
cache 30 {
    success 9984 30
    denial 9984 5
}
```

---

## 3. Enable DNS-over-TLS (DoT)

**Issue:** DNS queries to upstream servers are sent in plaintext, allowing interception and tampering by attackers with network access.<br/>
**Fix:** Configure CoreDNS to use DNS-over-TLS for encrypted upstream queries.

### CoreDNS with DNS-over-TLS

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
        health
        ready
        kubernetes cluster.local in-addr.arpa ip6.arpa {
           pods insecure
           fallthrough in-addr.arpa ip6.arpa
        }
        prometheus :9153
        forward . tls://1.1.1.1 tls://1.0.0.1 {
           tls_servername cloudflare-dns.com
           health_check 5s
        }
        cache 30
        loop
        reload
        loadbalance
    }
```

**DoT Providers:**
- Cloudflare: `tls://1.1.1.1` (tls_servername: cloudflare-dns.com)
- Google: `tls://8.8.8.8` (tls_servername: dns.google)
- Quad9: `tls://9.9.9.9` (tls_servername: dns.quad9.net)

---

## 4. Implement DNS Rate Limiting

**Issue:** Without rate limiting, CoreDNS is vulnerable to DNS amplification attacks and resource exhaustion.<br/>
**Fix:** Enable response rate limiting (RRL) in CoreDNS to limit the rate of responses to any single client.

### CoreDNS Rate Limiting

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
        health
        ready
        kubernetes cluster.local in-addr.arpa ip6.arpa {
           pods insecure
           fallthrough in-addr.arpa ip6.arpa
        }
        rrl {
           responses-per-second 10
           slip 2
        }
        cache 30
        forward . /etc/resolv.conf
        loop
        reload
        loadbalance
    }
```

---

## 5. Monitor DNS for Security Anomalies

**Issue:** DNS-based attacks like tunneling can go undetected without proper monitoring and alerting.<br/>
**Fix:** Monitor CoreDNS metrics and alert on anomalies like high NXDOMAIN rates or unusual query volumes.

### Key Metrics to Monitor

- `coredns_dns_requests_total`: Total DNS queries (watch for spikes)
- `coredns_dns_responses_total{rcode="NXDOMAIN"}`: Non-existent domain queries (potential tunneling)
- `coredns_dns_responses_total{rcode="SERVFAIL"}`: Server failures
- `coredns_forward_requests_total`: Forwarded queries (external lookups)

### Alerting Rules

```yaml
groups:
  - name: dns-security
    rules:
      - alert: HighDNSNXDOMAINRate
        expr: |
          sum(rate(coredns_dns_responses_total{rcode="NXDOMAIN"}[5m])) 
          / sum(rate(coredns_dns_responses_total[5m])) > 0.3
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "High NXDOMAIN rate detected - possible DNS tunneling"
      
      - alert: UnusualDNSQueryVolume
        expr: |
          sum(rate(coredns_dns_requests_total[5m])) > 10000
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Unusual DNS query volume detected"
```

### Signs of DNS Tunneling

- Long subdomain names (encoded data)
- High NXDOMAIN rate
- Consistent queries to suspicious domains
- High volume of TXT record queries

---

## 6. Protect CoreDNS Resources

**Issue:** CoreDNS pods without resource limits can be overwhelmed by excessive queries, causing cluster-wide DNS failures.<br/>
**Fix:** Set appropriate resource limits and consider running CoreDNS on dedicated nodes.

### Resource Limits

```yaml
resources:
  limits:
    memory: 170Mi
    cpu: 100m
  requests:
    memory: 70Mi
    cpu: 50m
```

### Dedicated Node Pool

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: coredns
  namespace: kube-system
spec:
  template:
    spec:
      nodeSelector:
        node-role.kubernetes.io/dns: "true"
      tolerations:
        - key: "node-role.kubernetes.io/dns"
          operator: "Exists"
          effect: "NoSchedule"
```

---

## Conclusion

DNS security is critical for Kubernetes cluster protection. Implement **network policies** to restrict DNS access, enable **query logging** for visibility, use **DNS-over-TLS** for encryption, and **monitor for anomalies** to detect tunneling and other attacks.

Key takeaways:
- Restrict pods to use only cluster DNS (CoreDNS)
- Enable DNS query logging for security analysis
- Use DNS-over-TLS for encrypted upstream queries
- Monitor for DNS tunneling patterns
- Implement rate limiting to prevent amplification attacks

---

## References

This article is based on information from the following official sources:

1. [Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/) - Kubernetes Documentation
2. [CoreDNS Forward Plugin](https://coredns.io/plugins/forward/) - CoreDNS Documentation
3. [CoreDNS Log Plugin](https://coredns.io/plugins/log/) - CoreDNS Documentation
4. [DNS for Services and Pods](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/) - Kubernetes Documentation
