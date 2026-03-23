---
sidebar_position: 5
title: "Restricting Anonymous API Server Access"
description: "How to restrict anonymous access to the Kubernetes API server to specific endpoints using AuthenticationConfiguration, stable since Kubernetes 1.34."
keywords: [kubernetes anonymous access, api server security, AuthenticationConfiguration, anonymous auth, kubernetes hardening, CKS, cluster security]
tags: [best-practice, mitigation, api-server, authentication, CKS]
related:
  - /kubernetes-security/attack-vectors/compromised-api-server/
  - /kubernetes-security/attack-vectors/kubelet-anonymous-auth/
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/api-server-security/compromised-api-server-mitigation/
---

# Restricting Anonymous API Server Access

**Required knowledge for the CKS certification.**

By default, Kubernetes assigns a username of `system:anonymous` and a group of `system:unauthenticated` to any request that is not rejected by other configured authentication methods. This behavior is enabled whenever an authorization mode other than `AlwaysAllow` is in use. While anonymous access to health check endpoints such as `/healthz`, `/readyz`, and `/livez` is operationally necessary in many environments, leaving anonymous access unrestricted amplifies the blast radius of RBAC misconfigurations. Any ClusterRoleBinding or RoleBinding that grants permissions to the `system:unauthenticated` group becomes exploitable by unauthenticated users.

The `AuthenticationConfiguration` API, stable since Kubernetes 1.34, allows operators to restrict anonymous requests to an explicit allowlist of paths rather than permitting or denying anonymous access cluster-wide.

---

## 1. Default Behavior and Risk

When anonymous authentication is enabled (the default), unauthenticated requests receive the identity `system:anonymous` in the group `system:unauthenticated`. Any authorization policy that grants permissions to `system:unauthenticated` is accessible without credentials.

**Issue:** Cluster-wide anonymous access creates opportunities for unauthenticated information disclosure and privilege escalation if RBAC policies are overly permissive.<br/>
**Fix:** Restrict anonymous access to only the specific health check paths that require it, using `AuthenticationConfiguration`.

---

## 2. Configuring Anonymous Endpoint Restrictions

The `AuthenticationConfiguration` resource (apiVersion: `apiserver.config.k8s.io/v1`) provides an `anonymous` field that controls both whether anonymous access is enabled and which paths it applies to.

Pass the configuration file to the kube-apiserver using the `--authentication-config` flag.

### 2.1 Restricting Anonymous Access to Health Endpoints

```yaml
apiVersion: apiserver.config.k8s.io/v1
kind: AuthenticationConfiguration
anonymous:
  enabled: true
  conditions:
  - path: /livez
  - path: /readyz
  - path: /healthz
```

With this configuration, only `/livez`, `/readyz`, and `/healthz` are reachable by anonymous requests. Any other endpoint will reject unauthenticated requests, even if the authorization configuration would otherwise permit them.

### 2.2 Disabling Anonymous Access Entirely

If health check endpoints do not require unauthenticated access (for example, when load balancers use authenticated probes), anonymous access can be disabled entirely:

```yaml
apiVersion: apiserver.config.k8s.io/v1
kind: AuthenticationConfiguration
anonymous:
  enabled: false
```

Alternatively, set `--anonymous-auth=false` on the kube-apiserver. Note that when the `anonymous` field is present in `AuthenticationConfiguration`, the `--anonymous-auth` flag must not be used simultaneously.

### 2.3 API Server Configuration Reference

Apply the authentication configuration by referencing the file path on the kube-apiserver:

```yaml
# /etc/kubernetes/manifests/kube-apiserver.yaml (static pod manifest)
spec:
  containers:
  - command:
    - kube-apiserver
    - --authentication-config=/etc/kubernetes/auth-config.yaml
    # Remove --anonymous-auth if present when using AuthenticationConfiguration
```

---

## 3. Verifying the Configuration

Confirm that endpoints outside the allowlist reject anonymous requests:

```bash
# Should return 401 Unauthorized — not a health endpoint
curl -sk https://<api-server>:6443/api/v1/namespaces

# Should return 200 — health endpoint in the allowlist
curl -sk https://<api-server>:6443/healthz
```

Inspect audit logs for requests with `system:anonymous` as the user to detect any unauthenticated access attempts reaching endpoints that should require authentication:

```bash
kubectl get events -A | grep "system:anonymous"
```

---

## 4. RBAC Hardening for system:unauthenticated

Restricting which endpoints accept anonymous requests reduces the attack surface but does not remove any existing RBAC bindings that grant permissions to `system:unauthenticated`. Audit and remove any such bindings:

```bash
kubectl get clusterrolebindings -o json | \
  jq '.items[] | select(.subjects[]?.name == "system:unauthenticated") | .metadata.name'

kubectl get rolebindings -A -o json | \
  jq '.items[] | select(.subjects[]?.name == "system:unauthenticated") | .metadata.name'
```

**Issue:** Legacy RBAC policies may grant `system:unauthenticated` access to sensitive endpoints.<br/>
**Fix:** Remove or scope down any bindings granting permissions to `system:anonymous` or `system:unauthenticated` unless explicitly required for health checks.

---

## References

This article is based on information from the following official sources:

1. [Authentication — Anonymous Requests](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#anonymous-requests) - Kubernetes Documentation
2. [AuthenticationConfiguration API](https://kubernetes.io/docs/reference/config-api/apiserver-authentication.v1/) - Kubernetes API Reference
