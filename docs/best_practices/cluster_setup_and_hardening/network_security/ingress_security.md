---
title: "Ingress Security"
description: "Learn how to secure Kubernetes ingress traffic with TLS encryption, authentication, and Web Application Firewalls (WAF)."
sidebar_position: 3
---

# Ingress Security

Ingress Controllers handle **external traffic** entering the Kubernetes cluster. **Securing ingress traffic** is essential to prevent **unauthorized access, data leaks, and API abuse**.

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
