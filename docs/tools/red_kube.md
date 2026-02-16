---
sidebar_position: 4
title: "red-kube"
description: "red-kube is a Kubernetes adversary emulation framework based on kubectl, providing attack simulations aligned with MITRE ATT&CK tactics."
keywords: [kubernetes security tool, red-kube, adversary emulation, MITRE ATT&CK, kubernetes attacks, red team, security testing, attack simulation, CKS]
tags: [tool, penetration-testing, adversary-emulation]
related:
  - /docs/tools/cdk/
  - /docs/tools/kdigger/
  - /docs/attack_vectors/privileged_container_escape/
---

# red-kube

**red-kube** is a Kubernetes adversary emulation tool that simulates attack techniques based on the MITRE ATT&CK framework. Built on kubectl, it provides a collection of attack scripts that help security teams test their Kubernetes defenses by emulating real-world attacker behavior.

The tool is designed for red team exercises, security assessments, and validating detection capabilities.

---

## Use Cases

- Test Kubernetes security controls against known attack techniques.
- Validate detection and alerting capabilities (Falco, audit logs).
- Conduct red team exercises in Kubernetes environments.
- Train security teams on Kubernetes attack patterns.
- Measure mean time to detect (MTTD) for various attacks.

---

## Attack Categories

red-kube organizes attacks by MITRE ATT&CK tactics:

| Tactic | Description |
|--------|-------------|
| Initial Access | Techniques to gain entry |
| Execution | Running malicious code |
| Persistence | Maintaining access |
| Privilege Escalation | Gaining higher privileges |
| Defense Evasion | Avoiding detection |
| Credential Access | Stealing credentials |
| Discovery | Mapping the environment |
| Lateral Movement | Moving between resources |
| Collection | Gathering target data |
| Exfiltration | Stealing data |
| Impact | Disruption and damage |

---

## Installation

### Clone Repository

```bash
git clone https://github.com/lightspin-tech/red-kube.git
cd red-kube
```

### Prerequisites

- kubectl configured with cluster access
- Appropriate permissions for attack simulation
- Test namespace (avoid production)

---

## Attack Techniques

### Initial Access

#### Exposed Kubernetes Dashboard

```bash
./attacks/initial-access/exposed-dashboard.sh
```

Checks for exposed dashboard and attempts access.

#### Compromised Image

```bash
./attacks/initial-access/deploy-malicious-image.sh
```

Deploys a pod with a potentially malicious image.

---

### Execution

#### Container Command Execution

```bash
./attacks/execution/exec-into-pod.sh <pod-name> <namespace>
```

Executes commands inside a running pod.

#### Malicious Workload Deployment

```bash
./attacks/execution/deploy-crypto-miner.sh
```

Deploys a simulated crypto miner workload.

---

### Persistence

#### Create Backdoor Service Account

```bash
./attacks/persistence/create-backdoor-sa.sh
```

Creates a service account with elevated privileges.

#### Deploy Backdoor DaemonSet

```bash
./attacks/persistence/backdoor-daemonset.sh
```

Deploys a DaemonSet for persistent access across nodes.

#### Create CronJob Backdoor

```bash
./attacks/persistence/cronjob-backdoor.sh
```

Creates a CronJob for periodic command execution.

---

### Privilege Escalation

#### Privileged Pod Creation

```bash
./attacks/privilege-escalation/create-privileged-pod.sh
```

Creates a pod with privileged security context.

#### RBAC Escalation

```bash
./attacks/privilege-escalation/rbac-escalation.sh
```

Attempts to create cluster-admin binding.

#### Service Account Token Theft

```bash
./attacks/privilege-escalation/steal-sa-token.sh <pod-name>
```

Extracts service account tokens from pods.

---

### Defense Evasion

#### Delete Kubernetes Events

```bash
./attacks/defense-evasion/delete-events.sh <namespace>
```

Attempts to delete events to hide activity.

#### Deploy in kube-system

```bash
./attacks/defense-evasion/deploy-to-kube-system.sh
```

Deploys workloads in kube-system to blend in.

#### Disable Audit Logging

```bash
./attacks/defense-evasion/disable-audit.sh
```

Attempts to modify audit logging configuration.

---

### Credential Access

#### Extract Secrets

```bash
./attacks/credential-access/extract-secrets.sh <namespace>
```

Lists and extracts secrets from a namespace.

#### Access Cloud Credentials

```bash
./attacks/credential-access/cloud-metadata-access.sh
```

Attempts to access cloud provider metadata service.

#### Dump ConfigMaps

```bash
./attacks/credential-access/dump-configmaps.sh
```

Extracts potentially sensitive ConfigMap data.

---

### Discovery

#### Enumerate Cluster

```bash
./attacks/discovery/enumerate-cluster.sh
```

Performs comprehensive cluster enumeration.

#### Find Privileged Pods

```bash
./attacks/discovery/find-privileged-pods.sh
```

Identifies pods running with elevated privileges.

#### Map Network Services

```bash
./attacks/discovery/map-services.sh
```

Discovers services and endpoints in the cluster.

---

### Lateral Movement

#### Pod Hopping

```bash
./attacks/lateral-movement/pod-hop.sh <source-pod> <target-pod>
```

Demonstrates movement between pods.

#### Access Other Namespaces

```bash
./attacks/lateral-movement/cross-namespace.sh
```

Attempts to access resources in other namespaces.

---

### Impact

#### Resource Exhaustion

```bash
./attacks/impact/resource-exhaustion.sh
```

Creates pods that consume excessive resources.

#### Delete Critical Workloads

```bash
./attacks/impact/delete-workloads.sh <namespace>
```

Demonstrates impact of deletion attacks.

#### Data Encryption (Ransomware Simulation)

```bash
./attacks/impact/encrypt-pv-data.sh
```

Simulates data encryption on persistent volumes.

---

## Running a Full Exercise

### 1. Setup Test Environment

```bash
# Create test namespace
kubectl create namespace red-kube-test

# Deploy target workloads
kubectl apply -f test-workloads/ -n red-kube-test
```

### 2. Run Attack Chain

```bash
# Discovery
./attacks/discovery/enumerate-cluster.sh

# Initial access (if applicable)
./attacks/initial-access/deploy-malicious-image.sh

# Privilege escalation
./attacks/privilege-escalation/create-privileged-pod.sh

# Persistence
./attacks/persistence/create-backdoor-sa.sh

# Credential access
./attacks/credential-access/extract-secrets.sh red-kube-test
```

### 3. Verify Detection

Check if security tools detected the attacks:

```bash
# Check Falco alerts
kubectl logs -n falco -l app=falco

# Review audit logs
kubectl logs -n kube-system -l component=kube-apiserver | grep audit
```

### 4. Cleanup

```bash
./cleanup/full-cleanup.sh
kubectl delete namespace red-kube-test
```

---

## Creating Custom Attacks

Extend red-kube with custom attack scripts:

```bash
#!/bin/bash
# attacks/custom/my-attack.sh

NAMESPACE=${1:-default}

echo "[*] Running custom attack..."

# Custom attack logic using kubectl
kubectl get secrets -n $NAMESPACE -o yaml

echo "[+] Attack complete"
```

---

## Best Practices

- **Use dedicated test environments:** Never run attacks in production.
- **Get proper authorization:** Document approval for red team exercises.
- **Monitor detections:** Use attacks to validate security monitoring.
- **Clean up thoroughly:** Remove all attack artifacts after exercises.
- **Document findings:** Create reports with recommendations.
- **Iterate on defenses:** Use results to improve security controls.

---

## Integration with Detection

### Test Falco Rules

Run attacks and verify Falco detects them:

```bash
# Run attack
./attacks/credential-access/extract-secrets.sh default

# Check Falco
kubectl logs -n falco -l app=falco | grep -i secret
```

### Test Audit Policies

Verify audit logging captures attack activity:

```bash
# Run attack
./attacks/persistence/create-backdoor-sa.sh

# Check audit logs
kubectl logs -n kube-system -l component=kube-apiserver | grep -i serviceaccount
```

---

## References

This article is based on information from the following official sources:

1. [red-kube GitHub Repository](https://github.com/lightspin-tech/red-kube) - Lightspin
2. [MITRE ATT&CK for Containers](https://attack.mitre.org/matrices/enterprise/containers/) - MITRE
3. [Kubernetes Security](https://kubernetes.io/docs/concepts/security/) - Kubernetes Documentation
