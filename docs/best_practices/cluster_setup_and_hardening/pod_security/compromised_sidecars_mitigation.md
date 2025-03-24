---
sidebar_position: 2
title: "Securing Kubernetes Sidecars"
description: "Best practices for securing sidecar containers to prevent data interception, privilege escalation, and persistence attacks."
---

# Securing Kubernetes Sidecars

**Sidecar containers** extend the functionality of application workloads by handling logging, monitoring, and security enforcement. If **misconfigured or compromised**, attackers can abuse sidecars to **intercept sensitive data, escalate privileges, or maintain persistence** within a Kubernetes cluster.

To mitigate these risks, Kubernetes administrators should enforce **strict security controls, restrict privileges, and monitor sidecar activity**.

---

## 1. Restrict Sidecar Permissions and Privileges

**Required knowledge for the CKS certification.**

**Issue:** If a sidecar container runs with **privileged access**, attackers can escalate privileges and gain control over the host.<br/>
**Fix:** Use strict **securityContext** settings to prevent privilege escalation.

### Secure Sidecar Configuration

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure-sidecar
spec:
  containers:
    - name: main-app
      image: secure-app
    - name: sidecar
      image: secure-sidecar
      securityContext:
        privileged: false
        allowPrivilegeEscalation: false
        readOnlyRootFilesystem: true
        capabilities:
          drop: ["ALL"]
```

### Why It Matters

- **Prevents** unauthorized access to the host system.<br/>
- **Ensures** sidecars cannot modify sensitive system files.

---

## 2. Enforce Network Policies to Limit Sidecar Communication

**Issue:** If a sidecar has unrestricted network access, it can intercept or manipulate application traffic.<br/>
**Fix:** Use **Network Policies** to **restrict** sidecar communication.

### Secure Network Policy for Sidecars

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: restrict-sidecar-traffic
  namespace: default
spec:
  podSelector:
    matchLabels:
      app: secure-app
  policyTypes:
    - Ingress
    - Egress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: monitoring-service
  egress:
    - to:
        - podSelector:
            matchLabels:
              app: logging-service
```

### Why It Matters

- **Prevents** attackers from using sidecars to intercept traffic.<br/>
- **Restricts** data flow to authorized services only.

---

## 3. Use Pod Security Admission to Enforce Sidecar Security Policies

**Required knowledge for the CKS certification.**

**Issue:** If no security policies are enforced, a compromised sidecar can run with excessive privileges.<br/>
**Fix:** Implement **Pod Security Admission (PSA)** to restrict dangerous configurations.

### Secure Pod Security Admission Policy

```yaml
apiVersion: policy/v1beta1
kind: PodSecurityPolicy
metadata:
  name: restricted-psp
spec:
  privileged: false
  runAsUser:
    rule: MustRunAsNonRoot
  seLinux:
    rule: RunAsAny
  fsGroup:
    rule: RunAsAny
```

### Why It Matters

- **Blocks** privileged or hostPath-mounted sidecars.<br/>
- **Ensures** sidecars run as non-root processes.

---

## 4. Restrict Sidecar Volume Mounts

**Issue:** If a sidecar can mount shared or hostPath volumes, it can access sensitive application data.<br/>
**Fix:** Restrict volume mounts and use read-only settings where possible.

### Secure Volume Mount Policy

**Required knowledge for the CKS certification.**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure-sidecar
spec:
  containers:
    - name: main-app
      image: secure-app
    - name: sidecar
      image: secure-sidecar
      volumeMounts:
        - name: shared-data
          mountPath: /data
          readOnly: true
  volumes:
    - name: shared-data
      emptyDir: {}
```

### Why It Matters

- **Prevents** sidecars from modifying application data.<br/>
- **Reduces** the risk of sensitive data exfiltration.

---

## 5. Monitor and Audit Sidecar Activity

**Issue:** A compromised sidecar may run **undetected**, allowing long-term persistence.<br/>
**Fix:** Enable **Kubernetes audit logging** and monitor sidecar behavior.

### Enable Sidecar Logging and Monitoring

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: monitored-sidecar
spec:
  containers:
    - name: main-app
      image: secure-app
    - name: sidecar
      image: secure-sidecar
      volumeMounts:
        - name: logs
          mountPath: /var/log/app
  volumes:
    - name: logs
      emptyDir: {}
```

Monitor sidecar logs for suspicious activity:

```bash
kubectl logs -l app=secure-app -c sidecar
```

### Why It Matters

- **Detects** unauthorized sidecar activity.<br/>
- **Prevents** attackers from using sidecars for persistent access.

---

## 6. Use Service Mesh Policies to Secure Sidecar Proxies

**Issue:** If a service mesh sidecar (e.g., Envoy) is compromised, attackers can intercept or modify traffic.<br/>
**Fix:** Implement **strict mTLS policies** and enforce security constraints.

### Secure Service Mesh Configuration

```yaml
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: enforce-mtls
  namespace: istio-system
spec:
  mtls:
    mode: STRICT
```

### Why It Matters

- **Encrypts** sidecar communication with mutual TLS.<br/>
- **Prevents** attackers from injecting rogue sidecar proxies.

---

## Conclusion

To secure Kubernetes sidecars, administrators should **enforce strict security policies, restrict privileges, control network access, monitor sidecar activity, and secure service mesh interactions**. These best practices help prevent **data interception, privilege escalation, and persistent attacks**.
