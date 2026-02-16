---
sidebar_position: 17
title: "netchecks"
description: "netchecks validates network connectivity assumptions in Kubernetes clusters by running declarative network tests to verify policies and connectivity."
keywords: [kubernetes security tool, netchecks, network testing, network policies, connectivity validation, network security, kubernetes networking, CKS]
tags: [tool, network, network-policies, CKS]
related:
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/network-security/network-policies/
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/network-security/cilium/
  - /kubernetes-security/attack-vectors/lack-of-network-policies/
---

# netchecks

**netchecks** is a Kubernetes-native tool for validating network connectivity and verifying that network policies work as expected. It runs declarative network tests from within the cluster, checking that expected connections succeed and blocked connections fail.

This tool is essential for verifying network policy implementations and ensuring network segmentation is working correctly.

---

## Use Cases

- Validate that network policies block expected traffic.
- Verify connectivity between services after policy changes.
- Continuous network security testing in CI/CD pipelines.
- Troubleshoot network connectivity issues.
- Document and enforce network segmentation requirements.

---

## Installation

### Using Helm

```bash
helm repo add netchecks https://hardbyte.github.io/netchecks
helm install netchecks netchecks/netchecks --namespace netchecks --create-namespace
```

### Using kubectl

```bash
kubectl apply -f https://raw.githubusercontent.com/hardbyte/netchecks/main/deploy/install.yaml
```

---

## Core Concepts

### NetworkAssertion

A custom resource that defines expected network connectivity:

```yaml
apiVersion: netchecks.io/v1
kind: NetworkAssertion
metadata:
  name: check-database-connectivity
  namespace: production
spec:
  schedule: "*/5 * * * *"  # Every 5 minutes
  rules:
    - name: backend-can-reach-database
      type: http
      url: http://database-service:5432
      expected: pass
      
    - name: frontend-cannot-reach-database
      type: http
      url: http://database-service:5432
      sourceNamespace: frontend
      expected: fail
```

### Rule Types

| Type | Description |
|------|-------------|
| http | HTTP/HTTPS connectivity check |
| tcp | TCP port connectivity |
| dns | DNS resolution check |
| icmp | ICMP ping check |

---

## Basic Examples

### Verify Service Connectivity

```yaml
apiVersion: netchecks.io/v1
kind: NetworkAssertion
metadata:
  name: service-connectivity
  namespace: production
spec:
  rules:
    - name: api-to-database
      type: tcp
      host: postgres-service
      port: 5432
      expected: pass
      
    - name: api-to-cache
      type: tcp
      host: redis-service
      port: 6379
      expected: pass
```

### Verify Network Policy Blocks Traffic

```yaml
apiVersion: netchecks.io/v1
kind: NetworkAssertion
metadata:
  name: policy-enforcement
  namespace: production
spec:
  rules:
    # This should be blocked by network policy
    - name: external-cannot-reach-internal
      type: tcp
      host: internal-service.internal-namespace
      port: 80
      expected: fail
      
    # This should be allowed
    - name: internal-can-reach-internal
      type: tcp
      host: internal-service
      port: 80
      expected: pass
```

### DNS Resolution Check

```yaml
apiVersion: netchecks.io/v1
kind: NetworkAssertion
metadata:
  name: dns-checks
  namespace: production
spec:
  rules:
    - name: internal-dns-works
      type: dns
      host: kubernetes.default.svc.cluster.local
      expected: pass
      
    - name: external-dns-works
      type: dns
      host: google.com
      expected: pass
```

### Egress Policy Verification

```yaml
apiVersion: netchecks.io/v1
kind: NetworkAssertion
metadata:
  name: egress-policy-check
  namespace: restricted
spec:
  rules:
    # Should be allowed to specific external service
    - name: can-reach-allowed-api
      type: http
      url: https://api.allowed-service.com/health
      expected: pass
      
    # Should be blocked from reaching arbitrary internet
    - name: cannot-reach-internet
      type: http
      url: https://google.com
      expected: fail
```

---

## Scheduled Checks

Run checks on a schedule for continuous validation:

```yaml
apiVersion: netchecks.io/v1
kind: NetworkAssertion
metadata:
  name: continuous-network-validation
spec:
  schedule: "*/15 * * * *"  # Every 15 minutes
  rules:
    - name: critical-service-connectivity
      type: tcp
      host: critical-service
      port: 443
      expected: pass
```

---

## Viewing Results

### Check NetworkAssertion Status

```bash
kubectl get networkassertions -A
```

Example output:

```
NAMESPACE    NAME                    STATUS   LAST RUN              PASSED   FAILED
production   service-connectivity    Passed   2024-01-15T10:30:00Z  3        0
production   policy-enforcement      Failed   2024-01-15T10:30:00Z  1        1
```

### Get Detailed Results

```bash
kubectl describe networkassertion service-connectivity -n production
```

### View Test Logs

```bash
kubectl logs -n netchecks -l app=netchecks-runner
```

---

## Integration with CI/CD

### GitHub Actions Example

```yaml
name: Network Policy Validation
on:
  push:
    paths:
      - 'kubernetes/network-policies/**'

jobs:
  validate-policies:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup cluster
        uses: helm/kind-action@v1
        
      - name: Apply network policies
        run: kubectl apply -f kubernetes/network-policies/
        
      - name: Install netchecks
        run: |
          helm repo add netchecks https://hardbyte.github.io/netchecks
          helm install netchecks netchecks/netchecks -n netchecks --create-namespace
          
      - name: Run network assertions
        run: |
          kubectl apply -f kubernetes/network-assertions/
          sleep 60
          kubectl get networkassertions -A -o json | jq '.items[] | select(.status.phase != "Passed")'
          
      - name: Fail if assertions failed
        run: |
          FAILED=$(kubectl get networkassertions -A -o json | jq '[.items[] | select(.status.phase == "Failed")] | length')
          if [ "$FAILED" -gt 0 ]; then
            echo "Network assertions failed!"
            exit 1
          fi
```

---

## Testing Network Policies

### Example: Test Default Deny Policy

1. Apply a default deny policy:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-ingress
  namespace: secure
spec:
  podSelector: {}
  policyTypes:
    - Ingress
```

2. Create a NetworkAssertion to verify:

```yaml
apiVersion: netchecks.io/v1
kind: NetworkAssertion
metadata:
  name: verify-default-deny
  namespace: secure
spec:
  rules:
    # Should fail because default deny is in place
    - name: external-blocked
      type: tcp
      host: secure-service
      port: 80
      sourceNamespace: other-namespace
      expected: fail
```

### Example: Test Allow List Policy

1. Apply a policy allowing specific traffic:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-from-frontend
  namespace: backend
spec:
  podSelector:
    matchLabels:
      app: api
  policyTypes:
    - Ingress
  ingress:
    - from:
        - namespaceSelector:
            matchLabels:
              name: frontend
      ports:
        - port: 8080
```

2. Verify with NetworkAssertion:

```yaml
apiVersion: netchecks.io/v1
kind: NetworkAssertion
metadata:
  name: verify-allowlist
  namespace: backend
spec:
  rules:
    - name: frontend-can-reach-api
      type: tcp
      host: api-service
      port: 8080
      sourceNamespace: frontend
      expected: pass
      
    - name: other-cannot-reach-api
      type: tcp
      host: api-service
      port: 8080
      sourceNamespace: other
      expected: fail
```

---

## Best Practices

- **Test both allow and deny:** Verify that expected traffic works AND unexpected traffic is blocked.
- **Use scheduling:** Run checks continuously to detect policy drift.
- **Version control assertions:** Keep NetworkAssertion manifests alongside network policies.
- **Integrate with CI/CD:** Validate policies before deploying to production.
- **Document requirements:** Use NetworkAssertions as living documentation of network requirements.

---

## References

This article is based on information from the following official sources:

1. [netchecks GitHub Repository](https://github.com/hardbyte/netchecks) - GitHub
2. [Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/) - Kubernetes Documentation
3. [Network Policy Testing](https://kubernetes.io/docs/tasks/administer-cluster/declare-network-policy/) - Kubernetes Documentation
