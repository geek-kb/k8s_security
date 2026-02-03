---
title: "Service Mesh Security"
description: "Improve Kubernetes security by implementing mutual TLS (mTLS), zero-trust networking, and policy-based access control using service meshes like Istio, Linkerd, and Cilium."
sidebar_position: 8
keywords: [kubernetes security best practices, service mesh, mTLS, mutual TLS, zero trust networking, istio, linkerd, cilium service mesh, service mesh security, policy-based access control, sidecar proxy, envoy proxy, service-to-service encryption, CKS]
tags: [best-practice, network, service-mesh, mTLS, CKS]
related:
  - /docs/best_practices/cluster_setup_and_hardening/network_security/network_policies/
  - /docs/best_practices/cluster_setup_and_hardening/network_security/cilium/
  - /docs/attack_vectors/traffic_hijacking/
---

# Service Mesh Security

A **service mesh** provides a dedicated infrastructure layer for handling **secure service-to-service communication** within a Kubernetes cluster. By abstracting networking logic away from application code, service meshes enable consistent security policies, observability, and traffic management across all microservices.

Popular service mesh implementations include **Istio**, **Linkerd**, **Cilium Service Mesh**, and **Consul Connect**. Each provides capabilities for **mutual TLS (mTLS)**, **traffic encryption**, **authorization policies**, and **observability**.

---

## 1. Mutual TLS (mTLS)

**Required knowledge for the CKS certification.**

**Issue:** By default, pods communicate over the cluster network using unencrypted traffic. Attackers with network access can eavesdrop on service-to-service communication and perform man-in-the-middle attacks.<br/>
**Fix:** Enable mutual TLS (mTLS) to encrypt all traffic and authenticate both client and server using X.509 certificates.

mTLS ensures that **both the client and server authenticate each other** using certificates, and all traffic between them is encrypted. Service meshes automate certificate issuance and rotation.

### Istio mTLS Configuration

Enable strict mTLS cluster-wide:

```yaml
apiVersion: security.istio.io/v1
kind: PeerAuthentication
metadata:
  name: default
  namespace: istio-system
spec:
  mtls:
    mode: STRICT
```

Enable mTLS for a specific namespace:

```yaml
apiVersion: security.istio.io/v1
kind: PeerAuthentication
metadata:
  name: default
  namespace: production
spec:
  mtls:
    mode: STRICT
```

**mTLS Modes:**
- `STRICT`: Only accept mTLS traffic (recommended for production)
- `PERMISSIVE`: Accept both plaintext and mTLS traffic (useful during migration)
- `DISABLE`: Disable mTLS (not recommended)

### Linkerd mTLS

Linkerd enables mTLS by default for all meshed workloads. Verify mTLS status:

```bash
linkerd viz edges deployment -n production
```

---

## 2. Zero-Trust Authorization Policies

**Issue:** Without authorization policies, any service can communicate with any other service in the cluster, enabling lateral movement after compromise.<br/>
**Fix:** Implement deny-by-default authorization policies and explicitly allow only required service-to-service communication.

### Istio Authorization Policies

Deny all traffic by default:

```yaml
apiVersion: security.istio.io/v1
kind: AuthorizationPolicy
metadata:
  name: deny-all
  namespace: production
spec:
  {}
```

Allow specific service communication:

```yaml
apiVersion: security.istio.io/v1
kind: AuthorizationPolicy
metadata:
  name: allow-frontend-to-api
  namespace: production
spec:
  selector:
    matchLabels:
      app: api-server
  action: ALLOW
  rules:
    - from:
        - source:
            principals: ["cluster.local/ns/production/sa/frontend"]
      to:
        - operation:
            methods: ["GET", "POST"]
            paths: ["/api/*"]
```

### JWT-Based Authorization

Allow traffic only from services with a valid JWT:

```yaml
apiVersion: security.istio.io/v1
kind: AuthorizationPolicy
metadata:
  name: require-jwt
  namespace: production
spec:
  selector:
    matchLabels:
      app: secure-api
  action: ALLOW
  rules:
    - from:
        - source:
            requestPrincipals: ["https://auth.example.com/*"]
```

---

## 3. Traffic Policies and Rate Limiting

**Issue:** Services without traffic controls are vulnerable to cascading failures and denial-of-service attacks.<br/>
**Fix:** Implement circuit breaking and rate limiting to protect services from overload and abuse.

### Circuit Breaking

Prevent cascading failures by limiting connections to unhealthy services:

```yaml
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: api-circuit-breaker
spec:
  host: api-server
  trafficPolicy:
    connectionPool:
      tcp:
        maxConnections: 100
      http:
        http1MaxPendingRequests: 100
        http2MaxRequests: 1000
    outlierDetection:
      consecutive5xxErrors: 5
      interval: 30s
      baseEjectionTime: 60s
      maxEjectionPercent: 50
```

### Rate Limiting

Protect services from request floods:

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: EnvoyFilter
metadata:
  name: rate-limit
  namespace: production
spec:
  workloadSelector:
    labels:
      app: api-server
  configPatches:
    - applyTo: HTTP_FILTER
      match:
        context: SIDECAR_INBOUND
      patch:
        operation: INSERT_BEFORE
        value:
          name: envoy.filters.http.local_ratelimit
          typed_config:
            "@type": type.googleapis.com/udpa.type.v1.TypedStruct
            type_url: type.googleapis.com/envoy.extensions.filters.http.local_ratelimit.v3.LocalRateLimit
            value:
              stat_prefix: http_local_rate_limiter
              token_bucket:
                max_tokens: 100
                tokens_per_fill: 100
                fill_interval: 60s
```

---

## 4. Observability and Auditing

**Issue:** Without visibility into service-to-service traffic, security incidents and policy violations go undetected.<br/>
**Fix:** Enable access logging, distributed tracing, and metrics collection for security monitoring.

### Enable Access Logging in Istio

```yaml
apiVersion: telemetry.istio.io/v1alpha1
kind: Telemetry
metadata:
  name: access-logging
  namespace: istio-system
spec:
  accessLogging:
    - providers:
        - name: envoy
      filter:
        expression: response.code >= 400
```

### Security-Relevant Metrics

Monitor these metrics for security anomalies:
- `istio_requests_total` with `response_code=403` (authorization failures)
- `istio_tcp_connections_closed_total` with `connection_security_policy=unknown` (non-mTLS connections)
- Unusual traffic patterns between services

---

## 5. Service Mesh Selection

**Issue:** Different service meshes have different security features, performance overhead, and complexity.<br/>
**Fix:** Select a service mesh based on your security requirements and operational capacity.

| Feature | Istio | Linkerd | Cilium |
|---------|-------|---------|--------|
| mTLS | Configurable | Default | WireGuard/IPsec |
| Authorization Policies | Powerful | Basic | eBPF-based |
| Sidecar Model | Envoy proxy | Lightweight proxy | eBPF (sidecar-free) |
| Performance Overhead | Higher | Lower | Lowest |
| Complexity | High | Low | Medium |

---

## Conclusion

Service meshes provide a powerful security layer for Kubernetes by enforcing **encryption**, **identity-based authentication**, **fine-grained authorization**, and **comprehensive observability**.

Key takeaways:
- Enable **strict mTLS** for all production workloads
- Implement **deny-by-default** authorization policies
- Use **service identities** (ServiceAccounts) for authorization
- Enable **access logging** for security auditing
- Monitor **mTLS coverage** and **authorization failures**

---

## References

This article is based on information from the following official sources:

1. [PeerAuthentication](https://istio.io/latest/docs/reference/config/security/peer_authentication/) - Istio Documentation
2. [Authorization Policy](https://istio.io/latest/docs/reference/config/security/authorization-policy/) - Istio Documentation
3. [Automatic mTLS](https://linkerd.io/2/features/automatic-mtls/) - Linkerd Documentation
4. [Cilium Service Mesh](https://docs.cilium.io/en/stable/network/servicemesh/) - Cilium Documentation
