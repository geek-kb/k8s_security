---
sidebar_position: 8
title: "Securing Kubelet Authentication and Authorization"
description: "How to disable kubelet anonymous authentication, configure certificate-based authentication, and implement proper authorization to protect Kubernetes nodes."
keywords: [kubernetes security best practices, kubelet authentication, kubelet authorization, anonymous authentication, kubelet security, node security, CIS benchmark kubelet, webhook authorization, CKS]
tags: [best-practice, mitigation, node-security, kubelet, CKS]
related:
  - /docs/attack_vectors/kubelet_anonymous_auth/
  - /docs/attack_vectors/exposed_kubelet_api/
  - /docs/best_practices/cluster_setup_and_hardening/cis/cis_benchmark_for_k8s/
---

# Securing Kubelet Authentication and Authorization

**Required knowledge for the CKS certification.**

The kubelet exposes an API on port 10250 that allows executing commands in containers, reading logs, and accessing pod information. By default, the kubelet may allow anonymous authentication, creating a significant security risk if the kubelet API is accessible from the network.

This guide covers how to properly configure kubelet authentication and authorization to prevent unauthorized access to nodes.

---

## 1. Disable Anonymous Authentication

**Issue:** When anonymous authentication is enabled, any request to the kubelet API is accepted without credentials.<br/>
**Fix:** Explicitly disable anonymous authentication in the kubelet configuration.

### Kubelet Configuration File

Create or modify `/var/lib/kubelet/config.yaml`:

```yaml
apiVersion: kubelet.config.k8s.io/v1beta1
kind: KubeletConfiguration
authentication:
  anonymous:
    enabled: false
  webhook:
    enabled: true
    cacheTTL: 2m0s
  x509:
    clientCAFile: /etc/kubernetes/pki/ca.crt
authorization:
  mode: Webhook
  webhook:
    cacheAuthorizedTTL: 5m0s
    cacheUnauthorizedTTL: 30s
```

### Command Line Flags (Alternative)

If using command-line configuration:

```bash
kubelet \
  --anonymous-auth=false \
  --client-ca-file=/etc/kubernetes/pki/ca.crt \
  --authorization-mode=Webhook
```

### Verify Configuration

Check the kubelet's current authentication settings:

```bash
curl -sk https://localhost:10250/configz | jq '.authentication'
```

Expected output should show `anonymous.enabled: false`.

---

## 2. Configure Certificate-Based Authentication

**Issue:** Without proper client certificate authentication, any client with network access can attempt to authenticate.<br/>
**Fix:** Configure x509 client certificate authentication.

### Generate Client Certificates

Use the Kubernetes CA to sign client certificates:

```bash
openssl genrsa -out kubelet-client.key 2048

openssl req -new -key kubelet-client.key \
  -subj "/O=system:nodes/CN=system:node:worker-1" \
  -out kubelet-client.csr

openssl x509 -req -in kubelet-client.csr \
  -CA /etc/kubernetes/pki/ca.crt \
  -CAkey /etc/kubernetes/pki/ca.key \
  -CAcreateserial \
  -out kubelet-client.crt \
  -days 365
```

### Configure Kubelet to Require Client Certificates

```yaml
apiVersion: kubelet.config.k8s.io/v1beta1
kind: KubeletConfiguration
authentication:
  x509:
    clientCAFile: /etc/kubernetes/pki/ca.crt
  anonymous:
    enabled: false
```

---

## 3. Enable Webhook Authorization

**Issue:** Even with authentication, the kubelet may allow all authenticated users full access.<br/>
**Fix:** Configure Webhook authorization to delegate authorization decisions to the API server.

### Configure Authorization Mode

```yaml
apiVersion: kubelet.config.k8s.io/v1beta1
kind: KubeletConfiguration
authorization:
  mode: Webhook
  webhook:
    cacheAuthorizedTTL: 5m0s
    cacheUnauthorizedTTL: 30s
```

### Create RBAC Rules for Kubelet Access

Limit who can access the kubelet API:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: kubelet-api-access
rules:
  - apiGroups: [""]
    resources: ["nodes/proxy"]
    verbs: ["get"]
  - apiGroups: [""]
    resources: ["nodes/log", "nodes/metrics"]
    verbs: ["get"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: kubelet-api-admin
subjects:
  - kind: User
    name: admin
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: kubelet-api-access
  apiGroup: rbac.authorization.k8s.io
```

---

## 4. Restrict Network Access to Kubelet Port

**Issue:** The kubelet API port (10250) may be accessible from pods or external networks.<br/>
**Fix:** Use network policies and firewall rules to restrict access.

### Host Firewall Rules (iptables)

```bash
# Allow only control plane nodes to access kubelet
iptables -A INPUT -p tcp --dport 10250 -s 10.0.0.10 -j ACCEPT
iptables -A INPUT -p tcp --dport 10250 -s 10.0.0.11 -j ACCEPT
iptables -A INPUT -p tcp --dport 10250 -j DROP
```

### Cloud Security Groups

For cloud environments, configure security groups to allow port 10250 only from:

- Control plane nodes
- Monitoring systems (if required)

Block access from:

- Pod networks
- External networks
- Other worker nodes (unless required)

---

## 5. Disable Read-Only Port

**Issue:** The kubelet read-only port (10255) exposes information without authentication.<br/>
**Fix:** Disable the read-only port entirely.

### Kubelet Configuration

```yaml
apiVersion: kubelet.config.k8s.io/v1beta1
kind: KubeletConfiguration
readOnlyPort: 0
```

### Command Line

```bash
kubelet --read-only-port=0
```

### Verify Disabled

```bash
curl http://localhost:10255/healthz
# Should fail with connection refused
```

---

## 6. Audit Kubelet Access

**Issue:** Unauthorized kubelet access attempts may go undetected.<br/>
**Fix:** Enable audit logging and monitor kubelet access.

### Enable Kubelet Audit Logging

Add to API server audit policy:

```yaml
apiVersion: audit.k8s.io/v1
kind: Policy
rules:
  - level: RequestResponse
    resources:
      - group: ""
        resources: ["nodes/proxy", "nodes/log", "nodes/exec"]
    verbs: ["create", "get"]
```

### Monitor with Falco

```yaml
- rule: Unauthorized Kubelet API Access
  desc: Detect attempts to access kubelet API
  condition: >
    evt.type = connect and 
    fd.sport = 10250 and
    not proc.name in (kubelet, kube-apiserver)
  output: >
    Suspicious kubelet API access (process=%proc.name 
    connection=%fd.name user=%user.name)
  priority: WARNING
```

---

## Security Checklist

- [ ] Anonymous authentication disabled (`anonymous.enabled: false`)
- [ ] Webhook authentication enabled
- [ ] x509 client CA file configured
- [ ] Webhook authorization mode enabled
- [ ] Read-only port disabled (`readOnlyPort: 0`)
- [ ] Firewall rules restrict access to port 10250
- [ ] Audit logging enabled for kubelet access
- [ ] Regular review of kubelet configuration

---

## References

This article is based on information from the following official sources:

1. [Kubelet Authentication/Authorization](https://kubernetes.io/docs/reference/access-authn-authz/kubelet-authn-authz/) - Kubernetes Documentation
2. [CIS Kubernetes Benchmark](https://www.cisecurity.org/benchmark/kubernetes) - Center for Internet Security
3. [Kubelet Configuration](https://kubernetes.io/docs/reference/config-api/kubelet-config.v1beta1/) - Kubernetes Documentation
