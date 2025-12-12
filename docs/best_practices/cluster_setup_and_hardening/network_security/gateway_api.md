---
title: "Gateway API Security"
description: "Secure Kubernetes traffic routing with Gateway API v1.4, the modern successor to Ingress with enhanced security features and role-based access control."
sidebar_position: 7
keywords: [kubernetes security best practices, gateway API, traffic routing, ingress alternative, RBAC, TLS termination, kubernetes networking, API gateway, CKS]
---

# Gateway API Security

The **Gateway API** is Kubernetes' next-generation approach to traffic routing and ingress management. As of **October 2025**, Gateway API **v1.4** reached **General Availability (GA)**, providing a more expressive, flexible, and security-focused alternative to traditional Ingress resources.

**Issue:** Traditional Ingress resources have limited expressiveness and lack fine-grained RBAC, making it difficult to implement advanced routing policies and multi-tenancy securely.<br/>
**Fix:** Gateway API provides role-oriented design with separate resources for infrastructure admins and application developers, enabling secure multi-tenant configurations.

---

## 1. Gateway API Overview

Gateway API introduces three core resources that separate concerns between cluster operators and application developers:

- **GatewayClass** - Defines infrastructure-level configuration (managed by cluster admins)
- **Gateway** - Represents a load balancer or proxy (managed by infrastructure teams)
- **HTTPRoute/TLSRoute/TCPRoute** - Defines routing rules (managed by application teams)

### Security Benefits Over Ingress

**Issue:** Ingress controllers often require cluster-wide permissions and lack standardized security features.<br/>
**Fix:** Gateway API provides:

- Role-based resource ownership and RBAC separation
- Native support for multiple attachment points and cross-namespace routing with explicit ReferenceGrants
- Built-in TLS configuration at the Gateway level
- Enhanced request/response header manipulation for security headers
- Support for multiple gateway implementations with consistent security patterns

---

## 2. Secure Gateway Configuration

### Example: TLS-Enabled Gateway

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: secure-gateway
  namespace: infra
spec:
  gatewayClassName: external-gateway
  listeners:
    - name: https
      protocol: HTTPS
      port: 443
      hostname: "*.example.com"
      tls:
        mode: Terminate
        certificateRefs:
          - name: example-com-cert
            kind: Secret
      allowedRoutes:
        namespaces:
          from: Selector
          selector:
            matchLabels:
              gateway-access: "true"
```

### Security Highlights

- **TLS termination** at the Gateway level
- **Namespace selector** restricts which namespaces can attach routes
- **Certificate references** use standard Kubernetes Secrets
- **Hostname wildcards** with proper validation

---

## 3. HTTPRoute with Security Headers

**Issue:** Applications may not properly set security headers, exposing them to XSS, clickjacking, and other attacks.<br/>
**Fix:** Use HTTPRoute to enforce security headers at the gateway level.

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: secure-app-route
  namespace: app-namespace
spec:
  parentRefs:
    - name: secure-gateway
      namespace: infra
  hostnames:
    - "app.example.com"
  rules:
    - matches:
        - path:
            type: PathPrefix
            value: /api
      filters:
        - type: ResponseHeaderModifier
          responseHeaderModifier:
            add:
              - name: Strict-Transport-Security
                value: "max-age=31536000; includeSubDomains"
              - name: X-Frame-Options
                value: "DENY"
              - name: X-Content-Type-Options
                value: "nosniff"
              - name: Content-Security-Policy
                value: "default-src 'self'"
      backendRefs:
        - name: backend-service
          port: 8080
```

---

## 4. Cross-Namespace Routing with ReferenceGrants

**Issue:** Allowing unrestricted cross-namespace references can lead to privilege escalation and unauthorized access.<br/>
**Fix:** Use **ReferenceGrants** to explicitly allow cross-namespace references.

```yaml
apiVersion: gateway.networking.k8s.io/v1beta1
kind: ReferenceGrant
metadata:
  name: allow-infra-gateway
  namespace: infra
spec:
  from:
    - group: gateway.networking.k8s.io
      kind: HTTPRoute
      namespace: app-namespace
  to:
    - group: ""
      kind: Service
      name: backend-service
```

### ReferenceGrant Security Best Practices

1. **Principle of Least Privilege** - Only grant access to specific services, not all services in a namespace
2. **Explicit Allow Lists** - Never use wildcards or broad namespace selectors
3. **Regular Audits** - Review ReferenceGrants periodically to remove unused permissions
4. **Namespace Isolation** - Use separate Gateways for different trust zones

---

## 5. Rate Limiting and Request Filtering

Gateway API v1.4 supports advanced traffic management features through implementation-specific policies:

### Example: Rate Limiting Policy (Implementation-Specific)

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: rate-limited-route
  namespace: app-namespace
spec:
  parentRefs:
    - name: secure-gateway
      namespace: infra
  hostnames:
    - "api.example.com"
  rules:
    - matches:
        - path:
            type: PathPrefix
            value: /public
      filters:
        - type: ExtensionRef
          extensionRef:
            group: gateway.envoyproxy.io
            kind: RateLimitFilter
            name: global-rate-limit
      backendRefs:
        - name: api-service
          port: 8080
```

**Note:** Rate limiting implementations vary by Gateway provider (Envoy Gateway, Istio, Cilium, etc.). Consult your Gateway implementation's documentation.

---

## 6. TLS Policy Enforcement

**Issue:** Backends may communicate over unencrypted connections, exposing sensitive data.<br/>
**Fix:** Configure **TLS passthrough** or **backend TLS** verification.

### Example: TLS Passthrough

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: tls-passthrough-gateway
  namespace: infra
spec:
  gatewayClassName: internal-gateway
  listeners:
    - name: tls-passthrough
      protocol: TLS
      port: 443
      hostname: "secure-backend.example.com"
      tls:
        mode: Passthrough
      allowedRoutes:
        kinds:
          - kind: TLSRoute
```

### Backend TLS Verification

```yaml
apiVersion: gateway.networking.k8s.io/v1alpha2
kind: BackendTLSPolicy
metadata:
  name: verify-backend-tls
  namespace: app-namespace
spec:
  targetRef:
    group: ""
    kind: Service
    name: backend-service
  tls:
    caCertRefs:
      - name: backend-ca-cert
        kind: ConfigMap
    hostname: backend.internal.svc.cluster.local
```

---

## 7. Monitoring and Observability

**Issue:** Without visibility into Gateway traffic, detecting attacks and anomalies is difficult.<br/>
**Fix:** Enable metrics, logging, and tracing at the Gateway level.

### Recommended Metrics to Monitor

- **Request rate per route** - Detect unusual traffic patterns
- **Error rates (4xx, 5xx)** - Identify application or security issues
- **TLS handshake failures** - Detect certificate problems or attacks
- **Request latency** - Identify performance degradation or DDoS
- **Connection count** - Monitor for connection exhaustion attacks

### Integration with Prometheus

Most Gateway implementations expose Prometheus metrics:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: gateway-metrics
  namespace: infra
  labels:
    app: gateway
spec:
  selector:
    app: gateway-controller
  ports:
    - name: metrics
      port: 9090
      targetPort: 9090
```

**ServiceMonitor Example:**

```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: gateway-monitor
  namespace: infra
spec:
  selector:
    matchLabels:
      app: gateway
  endpoints:
    - port: metrics
      interval: 30s
```

---

## 8. RBAC for Gateway API Resources

**Issue:** Allowing all users to create Gateways or modify routes can lead to misconfigurations and security bypasses.<br/>
**Fix:** Implement strict RBAC policies separating infrastructure and application concerns.

### Example: Infrastructure Admin Role

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: gateway-admin
rules:
  - apiGroups: ["gateway.networking.k8s.io"]
    resources: ["gatewayclasses", "gateways"]
    verbs: ["create", "update", "patch", "delete", "get", "list", "watch"]
  - apiGroups: ["gateway.networking.k8s.io"]
    resources: ["referencegrants"]
    verbs: ["create", "update", "patch", "delete", "get", "list", "watch"]
```

### Example: Application Developer Role

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: httproute-manager
  namespace: app-namespace
rules:
  - apiGroups: ["gateway.networking.k8s.io"]
    resources: ["httproutes", "grpcroutes"]
    verbs: ["create", "update", "patch", "delete", "get", "list", "watch"]
  - apiGroups: [""]
    resources: ["services"]
    verbs: ["get", "list"]
```

---

## 9. Migrating from Ingress to Gateway API

**Issue:** Ingress NGINX is reaching end-of-life (March 2026), requiring migration to modern alternatives.<br/>
**Fix:** Plan and execute a gradual migration to Gateway API.

### Migration Strategy

1. **Assess Current Ingress Resources** - Inventory all Ingress objects and their configurations
2. **Choose a Gateway Implementation** - Select based on your needs:
   - **Envoy Gateway** - CNCF project, feature-rich
   - **Istio Gateway** - If already using Istio service mesh
   - **Cilium Gateway** - Integrated with Cilium CNI
   - **Kong Gateway** - Enterprise features and plugins
3. **Create Equivalent HTTPRoutes** - Convert Ingress rules to HTTPRoute resources
4. **Test in Parallel** - Run both Ingress and Gateway configurations simultaneously
5. **Gradual Cutover** - Migrate traffic incrementally using DNS or load balancer updates
6. **Decommission Ingress** - Remove old Ingress resources once migration is complete

### Example Ingress to HTTPRoute Conversion

**Old Ingress:**

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  tls:
    - hosts:
        - app.example.com
      secretName: app-tls
  rules:
    - host: app.example.com
      http:
        paths:
          - path: /api
            pathType: Prefix
            backend:
              service:
                name: api-service
                port:
                  number: 8080
```

**New HTTPRoute:**

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: app-route
spec:
  parentRefs:
    - name: production-gateway
  hostnames:
    - "app.example.com"
  rules:
    - matches:
        - path:
            type: PathPrefix
            value: /api
      filters:
        - type: URLRewrite
          urlRewrite:
            path:
              type: ReplacePrefixMatch
              replacePrefixMatch: /
      backendRefs:
        - name: api-service
          port: 8080
```

---

## 10. Security Checklist for Gateway API

- ✅ Use **TLS termination** for all public-facing Gateways
- ✅ Implement **namespace selectors** to restrict route attachment
- ✅ Configure **ReferenceGrants** for all cross-namespace references
- ✅ Enforce **security headers** using ResponseHeaderModifier filters
- ✅ Enable **rate limiting** to prevent abuse and DDoS
- ✅ Configure **backend TLS verification** for internal services
- ✅ Implement **RBAC separation** between infrastructure and application teams
- ✅ Monitor **Gateway metrics** for anomalies and attacks
- ✅ Use **GatewayClass** parameters to enforce organizational policies
- ✅ Regularly **audit ReferenceGrants** and route configurations
- ✅ Plan **migration from Ingress** before EOL (March 2026)

---

## Additional Resources

- [Gateway API Official Documentation](https://gateway-api.sigs.k8s.io/)
- [Gateway API Security Model](https://gateway-api.sigs.k8s.io/concepts/security-model/)
- [Kubernetes SIG Network](https://github.com/kubernetes-sigs/gateway-api)
- [Gateway API Implementations](https://gateway-api.sigs.k8s.io/implementations/)
