---
title: "DNS Security in Kubernetes"
description: "Protect CoreDNS from spoofing, cache poisoning, and unauthorized modifications to enhance cluster security."
sidebar_position: 5
---

# DNS Security in Kubernetes

CoreDNS is Kubernetes’ default DNS provider. Securing it **prevents DNS-based attacks like spoofing and cache poisoning**.

## Best Practices for DNS Security

### 1. Restrict External DNS Access

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: block-dns-egress
spec:
  podSelector:
    matchLabels:
      app: sensitive-app
  policyTypes:
    - Egress
  egress:
    - to:
        - namespaceSelector: {}
          podSelector:
            matchLabels:
              k8s-app: kube-dns
```

### 2. Enable DNS-over-TLS (DoT)

- Encrypt DNS queries to prevent interception.
- Use **Knot Resolver** or **CoreDNS plugins** for **DoT support**.

### 3. Monitor CoreDNS Logs

- **Enable logging** to detect **suspicious DNS queries**.

DNS security is critical to **preventing DNS-based threats** and **securing Kubernetes service discovery**.
