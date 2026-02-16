---
sidebar_position: 2
title: "CDK (Container Penetration Toolkit)"
description: "CDK is a zero-dependency container penetration toolkit for assessing container security, discovering escape vectors, and testing Kubernetes defenses."
keywords: [kubernetes security tool, CDK, container penetration testing, container escape, security assessment, red team, kubernetes security testing, container toolkit, CKS]
tags: [tool, penetration-testing, container-security]
related:
  - /docs/tools/kdigger/
  - /docs/tools/red_kube/
  - /docs/attack_vectors/privileged_container_escape/
---

# CDK (Container Penetration Toolkit)

**CDK** is an open-source, zero-dependency container penetration testing toolkit. It helps security professionals assess container and Kubernetes security by providing automated discovery of vulnerabilities, escape vectors, and misconfigurations from within a compromised container.

CDK is designed for red team exercises and security assessments where you need to evaluate the actual security posture from an attacker's perspective inside a container.

---

## Use Cases

- Assess container breakout possibilities during penetration tests.
- Evaluate the effectiveness of container security controls.
- Identify misconfigurations that could lead to privilege escalation.
- Test Kubernetes RBAC and network policy enforcement.
- Discover sensitive information exposed to containers.

---

## Installation

CDK is designed to be deployed into target containers during assessments.

### Download Binary

```bash
# Download latest release
curl -LO https://github.com/cdk-team/CDK/releases/download/v1.5.2/cdk_linux_amd64

# Make executable
chmod +x cdk_linux_amd64

# Move to container (via volume, kubectl cp, etc.)
kubectl cp cdk_linux_amd64 target-pod:/tmp/cdk -n target-namespace
```

### Build from Source

```bash
git clone https://github.com/cdk-team/CDK.git
cd CDK
make build
```

---

## Evaluation Commands

### Run Full Evaluation

```bash
./cdk evaluate
```

This performs comprehensive assessment including:

- Container runtime detection
- Privilege checks
- Sensitive file discovery
- Network reconnaissance
- Kubernetes API access
- Escape vector identification

### Example Output

```
[*] CDK Evaluate v1.5.2

[+] Current User: root (uid=0)
[+] Container Runtime: docker
[+] Privileged Mode: YES
[+] Capabilities: cap_sys_admin,cap_net_admin,cap_sys_ptrace

[!] CRITICAL: Container is running in privileged mode
[!] CRITICAL: cap_sys_admin capability allows container escape

[+] Mounted Filesystems:
    /dev/sda1 on /host type ext4 (rw)
    
[+] Kubernetes Service Account Found:
    Token: /var/run/secrets/kubernetes.io/serviceaccount/token
    Namespace: production
    
[+] Kubernetes API Accessible: YES
    Can list pods: YES
    Can create pods: YES
    Can exec into pods: YES
```

---

## Exploitation Commands

### Container Escape via Privileged Mode

```bash
./cdk run shim-pwn
```

### Escape via Docker Socket

```bash
./cdk run docker-sock-check
./cdk run docker-sock-pwn
```

### Escape via Mounted Docker Socket

```bash
./cdk run mount-docker-sock /var/run/docker.sock
```

### Kubernetes Exploitation

```bash
# Check RBAC permissions
./cdk kcurl get "https://kubernetes.default/api/v1/namespaces"

# Create a privileged pod
./cdk run k8s-backdoor-daemonset
```

---

## Information Gathering

### Discover Sensitive Files

```bash
./cdk run sensitive-file-scan
```

Searches for:

- Cloud provider credentials (AWS, GCP, Azure)
- Kubernetes tokens and certificates
- SSH keys
- Application secrets and configs

### Network Discovery

```bash
./cdk run network-scan
```

Discovers:

- Internal network ranges
- Kubernetes services
- Metadata service endpoints
- Other containers

### Kubernetes Information

```bash
./cdk run k8s-info
```

Collects:

- Cluster version
- Available API resources
- RBAC permissions
- Service account details

---

## Tool Categories

### Evaluate Tools

| Tool | Description |
|------|-------------|
| evaluate | Full security assessment |
| auto-escape | Automated escape attempt |

### Exploit Tools

| Tool | Description |
|------|-------------|
| shim-pwn | Escape via runc vulnerability |
| docker-sock-pwn | Escape via Docker socket |
| mount-cgroup | Escape via cgroup mount |
| cap-abuse | Exploit dangerous capabilities |
| service-probe | Probe internal services |

### Kubernetes Tools

| Tool | Description |
|------|-------------|
| k8s-info | Gather cluster information |
| k8s-backdoor-daemonset | Deploy backdoor DaemonSet |
| k8s-shadow-apiserver | Create shadow API server |
| kcurl | Make authenticated K8s API requests |

### Discovery Tools

| Tool | Description |
|------|-------------|
| sensitive-file-scan | Find sensitive files |
| network-scan | Network reconnaissance |
| service-probe | Service discovery |
| ifconfig | Network interface info |

---

## Escape Techniques Covered

### Privileged Container Escapes

- Release agent cgroup escape
- Host filesystem mount
- Device access exploitation

### Capability-Based Escapes

- CAP_SYS_ADMIN abuse
- CAP_NET_ADMIN exploitation
- CAP_SYS_PTRACE process injection

### Socket-Based Escapes

- Docker socket exploitation
- containerd socket access
- CRI-O socket manipulation

### Kubernetes-Based Escapes

- Service account token theft
- RBAC permission exploitation
- Secrets extraction

---

## Defensive Usage

CDK can also help defenders by:

### Testing Security Controls

```bash
# Test if privileged containers are blocked
./cdk evaluate | grep "Privileged Mode"

# Verify capabilities are restricted
./cdk evaluate | grep "Capabilities"

# Check service account permissions
./cdk run k8s-info
```

### Validating Policies

Use CDK findings to verify that:

- Pod Security Standards are enforced
- Network policies block expected traffic
- RBAC permissions are properly restricted
- Secrets are not exposed unnecessarily

---

## Best Practices for Assessments

- **Get proper authorization:** Only use CDK during authorized security assessments.
- **Document findings:** Record all discovered vulnerabilities and escape vectors.
- **Clean up:** Remove CDK and any created resources after assessment.
- **Report responsibly:** Provide detailed remediation guidance with findings.
- **Test in isolation:** Use dedicated test environments when possible.

---

## Remediation Guidance

Based on CDK findings, common remediations include:

| Finding | Remediation |
|---------|-------------|
| Privileged mode | Use specific capabilities instead |
| Docker socket mounted | Remove socket mount, use alternatives |
| Excessive RBAC | Apply least-privilege RBAC |
| CAP_SYS_ADMIN | Drop capability, use seccomp profiles |
| Host filesystem access | Remove hostPath mounts |

---

## References

This article is based on information from the following official sources:

1. [CDK GitHub Repository](https://github.com/cdk-team/CDK) - GitHub
2. [Container Security](https://kubernetes.io/docs/concepts/security/) - Kubernetes Documentation
3. [Pod Security Standards](https://kubernetes.io/docs/concepts/security/pod-security-standards/) - Kubernetes Documentation
