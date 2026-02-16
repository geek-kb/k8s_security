---
sidebar_position: 9
title: "kube-scan"
description: "kube-scan is a Kubernetes risk assessment tool that calculates risk scores for workloads based on their security configurations and potential attack impact."
keywords: [kubernetes security tool, kube-scan, risk assessment, security score, kubernetes security, workload risk, vulnerability assessment, OCTARINE, CKS]
tags: [tool, configuration-validation, risk-assessment, CKS]
related:
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/configuration-validation/kubescape/
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/pod-security/pod-security-standards/
  - /kubernetes-security/attack-vectors/privileged-container-escape/
---

# kube-scan

**kube-scan** is a Kubernetes risk assessment tool developed by Octarine (now part of VMware). It calculates risk scores for workloads based on their security configurations, considering factors like container privileges, network exposure, and potential attack impact. The tool helps prioritize security remediation by quantifying risk.

kube-scan provides a web-based dashboard for visualizing cluster-wide risk and drilling down into individual workload issues.

---

## How It Works

kube-scan evaluates Kubernetes workloads against multiple risk factors:

- **Container security context** (privileged, capabilities, seccomp, AppArmor)
- **Network exposure** (services, ingress, host networking)
- **Volume mounts** (hostPath, sensitive paths)
- **Resource permissions** (RBAC, service accounts)
- **Image security** (known vulnerabilities, image sources)

Each factor contributes to an overall risk score on a 0-10 scale.

---

## Installation

### Deploy with kubectl

```bash
kubectl apply -f https://raw.githubusercontent.com/octarinesec/kube-scan/master/kube-scan.yaml
```

### Deploy with Helm

```bash
helm repo add kube-scan https://octarinesec.github.io/kube-scan
helm install kube-scan kube-scan/kube-scan --namespace kube-scan --create-namespace
```

---

## Access the Dashboard

### Port Forward

```bash
kubectl port-forward -n kube-scan svc/kube-scan-ui 8080:80
```

Access the dashboard at `http://localhost:8080`

### Expose via Ingress

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: kube-scan-ui
  namespace: kube-scan
spec:
  rules:
    - host: kube-scan.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: kube-scan-ui
                port:
                  number: 80
```

---

## Risk Score Components

### Security Context Factors

| Factor | Low Risk | High Risk |
|--------|----------|-----------|
| Privileged mode | false | true |
| Host network | false | true |
| Host PID | false | true |
| Root user | Non-root | Root (UID 0) |
| Read-only filesystem | true | false |
| Capabilities | Dropped | Added dangerous caps |

### Network Exposure Factors

| Factor | Low Risk | High Risk |
|--------|----------|-----------|
| Service type | ClusterIP | LoadBalancer/NodePort |
| Ingress | None | Exposed externally |
| Network policies | Enforced | None |

### Volume Factors

| Factor | Low Risk | High Risk |
|--------|----------|-----------|
| HostPath | None | / or sensitive paths |
| Secrets | Mounted securely | Exposed in env vars |
| Config | ConfigMaps | Sensitive data in config |

---

## CLI Usage

### Get Risk Report

```bash
kubectl exec -n kube-scan deploy/kube-scan -- kube-scan report
```

### Export as JSON

```bash
kubectl exec -n kube-scan deploy/kube-scan -- kube-scan report --output json > risk-report.json
```

### Scan Specific Namespace

```bash
kubectl exec -n kube-scan deploy/kube-scan -- kube-scan scan --namespace production
```

---

## Example Output

```
NAMESPACE     NAME                      RISK    ISSUES
production    frontend-deployment       7.2     privileged=true, hostNetwork=true
production    backend-deployment        4.5     root user, no resource limits
production    database-statefulset      3.1     hostPath mount
staging       test-pod                  8.9     privileged=true, hostPID=true, hostPath=/
kube-system   kube-proxy                2.1     expected for system components
```

---

## Interpreting Risk Scores

| Score | Risk Level | Action Required |
|-------|------------|-----------------|
| 0-2 | Low | Acceptable for most workloads |
| 2-4 | Medium-Low | Review for production workloads |
| 4-6 | Medium | Investigate and plan remediation |
| 6-8 | High | Prioritize remediation |
| 8-10 | Critical | Immediate action required |

---

## Remediation Guidance

kube-scan provides specific remediation steps for each finding:

### Example: Privileged Container

**Finding:** Container runs in privileged mode (risk +3.0)

**Remediation:**
```yaml
spec:
  containers:
    - name: my-container
      securityContext:
        privileged: false  # Remove privileged mode
        capabilities:
          drop:
            - ALL
          add:
            - NET_BIND_SERVICE  # Add only required capabilities
```

### Example: Host Network Access

**Finding:** Pod uses host network namespace (risk +2.5)

**Remediation:**
```yaml
spec:
  hostNetwork: false  # Use pod network instead
```

---

## Best Practices

- **Baseline your cluster:** Run kube-scan initially to understand current risk posture.
- **Set risk thresholds:** Define acceptable risk scores for different environments.
- **Integrate into CI/CD:** Scan manifests before deployment and block high-risk workloads.
- **Regular monitoring:** Deploy kube-scan permanently to detect risk increases over time.
- **Prioritize remediation:** Focus on critical and high-risk findings first.

---

## Limitations

- Risk scores are estimates based on configuration analysis.
- Does not perform runtime behavior analysis.
- Vulnerability scanning requires additional integration.
- Some risk factors may be acceptable for certain workloads (e.g., system components).

---

## References

This article is based on information from the following official sources:

1. [kube-scan GitHub Repository](https://github.com/octarinesec/kube-scan) - GitHub
2. [Pod Security Standards](https://kubernetes.io/docs/concepts/security/pod-security-standards/) - Kubernetes Documentation
3. [Security Context](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/) - Kubernetes Documentation
