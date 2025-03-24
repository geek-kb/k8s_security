---
title: "Kong"
description: "Kong is an open-source API gateway and service mesh that helps manage, secure, and monitor traffic between services in Kubernetes environments."
sidebar_position: 13
---

# Kong

**Kong** is a **cloud-native API gateway** and **service mesh** that enables **secure, reliable, and observable** communication across microservices. It provides functionality such as **traffic routing, authentication, rate limiting, logging, mutual TLS, and plugin extensibility**.

In Kubernetes environments, Kong can be deployed as an **Ingress Controller**, handling external traffic into the cluster and enforcing security policies at the API layer.

---

## Usage

### 1. Install Kong Ingress Controller on Kubernetes

You can install Kong via Helm:

```bash
helm repo add kong https://charts.konghq.com
helm repo update

helm install kong kong/kong --namespace kong --create-namespace \
  --set ingressController.installCRDs=false
```

To enable DB-less mode:

```bash
helm install kong kong/kong \
  --set ingressController.installCRDs=true \
  --set env.database=off
```

---

### 2. Define an Ingress Resource

After deploying Kong, you can expose services using Kubernetes `Ingress` resources:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: example
  annotations:
    konghq.com/strip-path: "true"
spec:
  ingressClassName: kong
  rules:
    - http:
        paths:
          - path: /api
            pathType: Prefix
            backend:
              service:
                name: my-service
                port:
                  number: 80
```

---

### 3. Add Plugins to Secure Traffic

Kong supports native and custom plugins. For example, enabling **rate limiting**:

```yaml
apiVersion: configuration.konghq.com/v1
kind: KongPlugin
metadata:
  name: rate-limiting
plugin: rate-limiting
config:
  minute: 5
  policy: local
```

Then attach it to a service or Ingress:

```yaml
metadata:
  annotations:
    konghq.com/plugins: rate-limiting
```

---

### 4. Monitor and Audit API Traffic

Kong supports:

- Prometheus metrics
- Logging via TCP, HTTP, or file
- Integration with tracing tools like Jaeger and Zipkin

---

## Best Practices

- Use **mutual TLS** between services for strong service identity.
- Enable **rate limiting, authentication, and CORS** controls to protect APIs.
- Deploy **DB-less mode** in production to simplify scaling and resilience.
- Enable **audit logging** and monitoring for visibility into traffic patterns.
- Combine with **OPA/Gatekeeper** or **Kyverno** for policy enforcement at the API level.

---

## Resources

- **GitHub:** [https://github.com/Kong/kong](https://github.com/Kong/kong)
- **Official Docs:** [https://docs.konghq.com/](https://docs.konghq.com/)
- **Kong Ingress Controller:** [https://docs.konghq.com/kubernetes-ingress-controller/](https://docs.konghq.com/kubernetes-ingress-controller/)
