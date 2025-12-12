---
sidebar_position: 1
title: "Securing the Kubernetes API Server"
description: "Best practices for protecting the Kubernetes API server against unauthorized access and exploitation."
keywords: [kubernetes security best practices, API server security, kubernetes API, authentication, authorization, RBAC, TLS encryption, API server hardening, CIS kubernetes, CKS]
---

# Securing the Kubernetes API Server

**Required knowledge for the CKS certification.**

A compromised Kubernetes API server can lead to unauthorized access, data breaches, and full cluster compromise. Attackers may exploit misconfigurations or exposed endpoints to manipulate workloads, disrupt services, or exfiltrate sensitive data.

To secure the API server, implement the following best practices.

---

## Restrict API Access

**Issue:** Publicly exposed API servers allow unauthorized access.<br/>
**Fix:** Use firewalls, private networking or CiliumNetworkPolicy to limit access.

#### Firewall Rule Example

```bash
# Allow access to the API server only from a specific IP range
iptables -A INPUT -p tcp -s <trusted-ip-range> --dport 6443 -j ACCEPT
iptables -A INPUT -p tcp --dport 6443 -j DROP
```

#### CiliumNetworkPolicy Configuration Example

```yaml
apiVersion: "cilium.io/v2"
kind: CiliumNetworkPolicy
metadata:
  name: allow-dev-to-apiserver
  namespace: kube-system # API server runs in kube-system
spec:
  endpointSelector: {} # Applies to all endpoints in the cluster
  egress:
    - toEntities:
        - kube-apiserver # Cilium entity representing the Kubernetes API server
      fromEndpoints:
        - matchLabels:
            env: dev
      toPorts:
        - ports:
            - port: "6443"
              protocol: TCP
```

### Additional Best Practices

- Ensure API requests are only allowed from internal or explicitly authorized networks.
- Use a private cluster with a VPN or bastion host for access.

---

## Enforce Authentication and Authorization

**Issue:** Lack of authentication enables any user to access the API server.<br/>
**Fix:** Enable Role-Based Access Control (RBAC) and use secure authentication methods.

#### RBAC Configuration Example

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: default
  name: pod-reader
rules:
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["get", "list"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
  namespace: default
subjects:
  - kind: User
    name: "api-user"
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
```

### Additional Best Practices

- Use strong authentication (OIDC, service account tokens, or certificates).
- Ensure API requests require proper identity verification before access.

---

## Secure API Server Communication

**Issue:** Unencrypted traffic to the API server allows interception of sensitive data.<br/>
**Fixes:**

- Enforce TLS encryption for all API server communications.
- Use certificates to authenticate API requests.

#### Enable TLS in API Server Configuration

Modify `kube-apiserver` startup parameters:

```bash
--tls-cert-file=/etc/kubernetes/pki/apiserver.crt
--tls-private-key-file=/etc/kubernetes/pki/apiserver.key
```

### Additional Best Practices

- Use a trusted CA to sign API server certificates.
- Rotate certificates periodically.

---

## Use Network Policies to Restrict API Server Access

**Issue:** Unrestricted network access allows unauthorized users to reach the API server.<br/>
**Fix:** Block external access using Kubernetes Network Policies.

#### Example Network Policy to Restrict API Server Access

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: restrict-api-access
  namespace: default
spec:
  podSelector:
    matchLabels:
      component: kube-apiserver
  policyTypes:
    - Ingress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              role: internal
```

### Additional Best Practices

- Limit API access to trusted pods, services, and nodes.
- Use service meshes (e.g., Istio, Linkerd) for additional API request filtering.

---

## Enable Audit Logging for API Server Requests

**Issue:** Lack of logging prevents detection of unauthorized access.<br/>
**Fix:** Enable audit logging to monitor API server activity.

#### Enable Logging in `kube-apiserver`

```bash
--audit-log-path=/var/log/kubernetes/audit.log
--audit-policy-file=/etc/kubernetes/audit-policy.yaml
```

#### Example Audit Policy

```yaml
apiVersion: audit.k8s.io/v1
kind: Policy
rules:
  - level: Metadata
    resources:
      - group: ""
        resources: ["pods"]
```

### Additional Best Practices

- Send audit logs to a centralized logging system (e.g., Elasticsearch, Loki).
- Set up alerting for unusual API requests.

---

## Conclusion

Securing the Kubernetes API server is critical to preventing unauthorized access and protecting the cluster from external threats.

- Restrict API access with firewalls and network policies.
- Use RBAC and strong authentication to enforce security.
- Encrypt API communications with TLS.
- Monitor API requests through audit logging.

By implementing these best practices, Kubernetes administrators can reduce the risk of API server compromise and unauthorized cluster access.
