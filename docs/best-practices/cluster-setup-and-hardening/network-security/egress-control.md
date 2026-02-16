---
title: "Egress Control in Kubernetes"
description: "Restrict and monitor outbound traffic from Kubernetes workloads to prevent data exfiltration, command-and-control communication, and unauthorized external access."
sidebar_position: 4
keywords: [kubernetes security best practices, egress control, outbound traffic, network policies, data exfiltration prevention, egress gateway, kubernetes networking, traffic monitoring, zero trust egress, CKS]
tags: [best-practice, network, egress, network-policies, CKS]
related:
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/network-security/network-policies/
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/network-security/dns-security/
  - /kubernetes-security/attack-vectors/cloud-metadata-service-abuse/
---

# Egress Control in Kubernetes

**Egress control** restricts **outbound traffic** from Kubernetes pods to external destinations. Without egress controls, compromised pods can freely communicate with attacker infrastructure, exfiltrate data, or abuse cloud metadata services.

Implementing egress controls is a fundamental part of **defense in depth** and **zero-trust networking**.

---

## 1. Default Deny Egress Policies

**Required knowledge for the CKS certification.**

**Issue:** By default, Kubernetes pods can initiate connections to any external IP address, allowing compromised workloads to exfiltrate data or contact command-and-control servers.<br/>
**Fix:** Implement default-deny egress policies and explicitly allow only required outbound traffic.

### Deny All Egress

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-egress
  namespace: production
spec:
  podSelector: {}
  policyTypes:
    - Egress
```

### Allow Specific Destinations

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-specific-egress
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: backend
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
    - to:
        - ipBlock:
            cidr: 203.0.113.0/24
      ports:
        - protocol: TCP
          port: 443
```

---

## 2. Block Cloud Metadata Service

**Issue:** Pods can access cloud metadata endpoints (169.254.169.254) to steal IAM credentials, access secrets, and pivot to other cloud resources.<br/>
**Fix:** Explicitly block access to cloud metadata service IP addresses in egress policies.

### Block Metadata Access

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: block-metadata-service
  namespace: production
spec:
  podSelector: {}
  policyTypes:
    - Egress
  egress:
    - to:
        - ipBlock:
            cidr: 0.0.0.0/0
            except:
              - 169.254.169.254/32
              - 169.254.170.2/32
```

**Metadata endpoints to block:**
- AWS EC2/EKS: `169.254.169.254`
- AWS ECS: `169.254.170.2`
- GCP: `169.254.169.254`
- Azure: `169.254.169.254`

---

## 3. Egress Gateways

**Issue:** Distributed egress makes it difficult to monitor, log, and control all outbound traffic from the cluster.<br/>
**Fix:** Route egress traffic through centralized gateways for consistent logging, policy enforcement, and IP allowlisting.

### Istio Egress Gateway

```yaml
apiVersion: networking.istio.io/v1beta1
kind: Gateway
metadata:
  name: egress-gateway
  namespace: istio-system
spec:
  selector:
    istio: egressgateway
  servers:
    - port:
        number: 443
        name: https
        protocol: HTTPS
      hosts:
        - api.external-service.com
      tls:
        mode: PASSTHROUGH
---
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: external-api
  namespace: production
spec:
  hosts:
    - api.external-service.com
  gateways:
    - mesh
    - istio-system/egress-gateway
  tls:
    - match:
        - gateways:
            - mesh
          port: 443
          sniHosts:
            - api.external-service.com
      route:
        - destination:
            host: istio-egressgateway.istio-system.svc.cluster.local
            port:
              number: 443
```

---

## 4. FQDN-Based Egress Policies

**Issue:** IP-based egress policies are difficult to maintain when external services use dynamic IPs or CDNs.<br/>
**Fix:** Use FQDN-based policies (Cilium) to allow egress based on domain names instead of IP addresses.

### Cilium FQDN Policy

```yaml
apiVersion: cilium.io/v2
kind: CiliumNetworkPolicy
metadata:
  name: allow-github-egress
  namespace: ci-cd
spec:
  endpointSelector:
    matchLabels:
      app: build-agent
  egress:
    - toEndpoints:
        - matchLabels:
            k8s:io.kubernetes.pod.namespace: kube-system
            k8s-app: kube-dns
      toPorts:
        - ports:
            - port: "53"
              protocol: UDP
          rules:
            dns:
              - matchPattern: "*.github.com"
              - matchPattern: "*.githubusercontent.com"
    - toFQDNs:
        - matchPattern: "*.github.com"
        - matchPattern: "*.githubusercontent.com"
      toPorts:
        - ports:
            - port: "443"
```

---

## 5. Proxy-Based Egress Control

**Issue:** Network policies cannot inspect HTTP traffic content or enforce URL-level restrictions.<br/>
**Fix:** Route HTTP/HTTPS traffic through a forward proxy to enable domain allowlisting and request logging.

### Squid Proxy Configuration

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: squid-config
  namespace: network-services
data:
  squid.conf: |
    acl allowed_domains dstdomain .github.com
    acl allowed_domains dstdomain .googleapis.com
    acl allowed_domains dstdomain .gcr.io
    
    http_access allow allowed_domains
    http_access deny all
    
    access_log /var/log/squid/access.log
    
    http_port 3128
```

### Configure Pods to Use Proxy

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: app
spec:
  containers:
    - name: app
      image: myapp:latest
      env:
        - name: HTTP_PROXY
          value: "http://egress-proxy.network-services:3128"
        - name: HTTPS_PROXY
          value: "http://egress-proxy.network-services:3128"
        - name: NO_PROXY
          value: ".cluster.local,.svc,10.0.0.0/8"
```

---

## 6. Monitor Egress Traffic

**Issue:** Without monitoring, unauthorized egress and data exfiltration go undetected.<br/>
**Fix:** Enable flow logging, monitor egress patterns, and alert on anomalies.

### Cilium Hubble Observability

```bash
cilium hubble enable

hubble observe --type drop --protocol tcp --to-ip 0.0.0.0/0
```

### Alerting on Suspicious Egress

```yaml
groups:
  - name: egress-security
    rules:
      - alert: UnauthorizedEgressAttempt
        expr: |
          sum(rate(cilium_drop_count_total{reason="Policy denied"}[5m])) by (namespace) > 10
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High rate of denied egress in namespace {{ $labels.namespace }}"
      
      - alert: EgressToUnknownDestination
        expr: |
          sum(rate(network_bytes_total{direction="egress",destination!~"10\\..*"}[5m])) > 1000000
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "Significant egress traffic to external destinations"
```

---

## 7. Cloud Firewall Integration

**Issue:** Kubernetes NetworkPolicies alone may not prevent all egress if CNI enforcement is bypassed or misconfigured.<br/>
**Fix:** Layer cloud-level firewall rules with Kubernetes policies for defense in depth.

### AWS Security Group

```hcl
resource "aws_security_group" "eks_worker_egress" {
  name_prefix = "eks-worker-egress-"
  vpc_id      = var.vpc_id

  egress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["203.0.113.0/24"]
    description = "Payment gateway"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = [var.vpc_cidr]
    description = "Internal VPC"
  }
}
```

---

## Conclusion

Egress control is critical for preventing compromised workloads from communicating with attackers, exfiltrating data, or abusing cloud services.

Key takeaways:
- Implement **default-deny egress** policies
- **Block cloud metadata** endpoints explicitly
- Use **egress gateways** for centralized control
- Consider **FQDN-based policies** for dynamic destinations
- **Monitor egress** patterns and alert on anomalies
- **Layer controls** with cloud firewalls for defense in depth

---

## References

This article is based on information from the following official sources:

1. [Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/) - Kubernetes Documentation
2. [Layer 3 Examples - DNS Based](https://docs.cilium.io/en/stable/security/policy/language/#dns-based) - Cilium Documentation
3. [Istio Egress Gateway](https://istio.io/latest/docs/tasks/traffic-management/egress/egress-gateway/) - Istio Documentation
4. [Instance Metadata and User Data](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html) - AWS Documentation
