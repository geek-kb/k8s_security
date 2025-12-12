---
title: "Ingress Security"
description: "Learn how to secure Kubernetes ingress traffic with TLS encryption, authentication, and Web Application Firewalls (WAF)."
sidebar_position: 6
keywords: [kubernetes security best practices, ingress security, TLS encryption, web application firewall, WAF, ingress controller, SSL certificates, authentication, kubernetes networking, CKS]
---

# Ingress Security

> **⚠️ Important Notice:** Ingress NGINX is approaching **end-of-life** in **March 2026**. The Kubernetes SIG Network and Security Response Committee recommend migrating to **Gateway API** for long-term support and enhanced security features. See the [Gateway API Security](/docs/best_practices/cluster_setup_and_hardening/network_security/gateway_api) guide for migration guidance.

Ingress Controllers handle **external traffic** entering the Kubernetes cluster. **Securing ingress traffic** is essential to prevent **unauthorized access, data leaks, and API abuse**.

While Ingress resources remain functional, organizations should plan migration to **Gateway API** before March 2026 to benefit from improved security features, role-based resource management, and active community support.

## Best Practices for Ingress Security

### 1. Enforce TLS Encryption

- Use **Let's Encrypt** with **Cert-Manager** to automatically issue **TLS certificates**.
- Enforce **TLS termination** at the ingress controller level.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: secure-ingress
  annotations:
    cert-manager.io/issuer: "letsencrypt-prod"
spec:
  tls:
    - hosts:
        - example.com
      secretName: tls-secret
  rules:
    - host: example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: my-service
                port:
                  number: 443
```

### 2. Use Web Application Firewalls (WAF)

- Deploy **Cloudflare WAF, AWS WAF, or ModSecurity** to **detect and block malicious traffic**.
- Implement **rate limiting** to prevent **DDoS attacks**.

### 3. Restrict Allowed Hosts

- Define **`host` rules** to allow traffic **only from specific domains**.

By following these best practices, you can **protect Kubernetes ingress traffic** and prevent **external threats** from reaching internal services.

---

## Migration to Gateway API

Given the **March 2026 end-of-life** for Ingress NGINX, organizations should begin planning migration to **Gateway API**:

### Why Migrate?

- **Active Development** - Gateway API is under active development with new features and security enhancements
- **Better Security Model** - Role-based resource ownership with separate concerns for infrastructure and application teams
- **Enhanced Features** - Native support for advanced routing, header manipulation, and traffic policies
- **Vendor Neutral** - Multiple implementations (Envoy Gateway, Istio, Cilium, Kong) with consistent APIs
- **Future-Proof** - Kubernetes community focus on Gateway API as the long-term solution

### Migration Timeline Recommendation

1. **Q1 2025** - Assess current Ingress resources and select Gateway implementation
2. **Q2 2025** - Test Gateway API in non-production environments
3. **Q3 2025** - Begin production migration for non-critical workloads
4. **Q4 2025** - Complete migration for all workloads
5. **Q1 2026** - Decommission Ingress NGINX before EOL

For detailed migration guidance, see the [Gateway API Security](/docs/best_practices/cluster_setup_and_hardening/network_security/gateway_api) article.
