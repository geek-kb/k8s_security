---
sidebar_position: 3
title: "kdigger"
description: "kdigger is a Kubernetes-focused container assessment and context discovery tool for penetration testing and security assessments."
keywords: [kubernetes security tool, kdigger, container assessment, penetration testing, kubernetes security, context discovery, security assessment, red team, CKS]
tags: [tool, penetration-testing, container-security]
related:
  - /docs/tools/cdk/
  - /docs/tools/red_kube/
  - /docs/attack_vectors/privileged_container_escape/
---

# kdigger

**kdigger** (Kubernetes Digger) is a context discovery tool for Kubernetes penetration testing. It helps security professionals understand the environment they are operating in by automatically gathering information about the container, pod, node, and cluster context.

Unlike exploitation tools, kdigger focuses on reconnaissance and information gathering, providing a detailed picture of what an attacker could potentially access or exploit.

---

## Use Cases

- Initial reconnaissance during Kubernetes penetration tests.
- Understand the security context of a compromised container.
- Identify potential attack vectors based on environment.
- Document container and cluster configuration for security reviews.
- Educational demonstrations of container security concepts.

---

## Installation

### Download Binary

```bash
# Download latest release
curl -LO https://github.com/quarkslab/kdigger/releases/download/v1.5.0/kdigger-linux-amd64

# Make executable
chmod +x kdigger-linux-amd64

# Optionally rename
mv kdigger-linux-amd64 kdigger
```

### Build from Source

```bash
git clone https://github.com/quarkslab/kdigger.git
cd kdigger
go build -o kdigger .
```

### Deploy to Target Container

```bash
kubectl cp kdigger target-pod:/tmp/kdigger -n target-namespace
```

---

## Running kdigger

### Run All Checks

```bash
./kdigger dig all
```

### Run Specific Buckets

```bash
./kdigger dig capabilities,environment,token
```

### Get Available Buckets

```bash
./kdigger list
```

---

## Information Buckets

### Container Context

| Bucket | Description |
|--------|-------------|
| capabilities | Linux capabilities of the current process |
| cgroups | Cgroup membership and limits |
| environment | Environment variables |
| mounts | Mounted filesystems |
| namespaces | Linux namespace membership |
| processes | Running processes |
| syscalls | Available syscalls (seccomp) |

### Kubernetes Context

| Bucket | Description |
|--------|-------------|
| token | Service account token discovery |
| api | Kubernetes API accessibility |
| admission | Admission controller detection |
| devices | Device access |
| runtime | Container runtime detection |
| usernamespace | User namespace status |

### Network Context

| Bucket | Description |
|--------|-------------|
| network | Network interfaces and routing |
| services | Kubernetes service discovery |
| coredns | CoreDNS configuration |

---

## Example Output

```bash
./kdigger dig all
```

```
╔════════════════════════════════════════════════════════════════════╗
║                         kdigger v1.5.0                              ║
╚════════════════════════════════════════════════════════════════════╝

[capabilities]
  Effective Capabilities:
    cap_chown, cap_dac_override, cap_fowner, cap_fsetid, cap_kill,
    cap_setgid, cap_setuid, cap_setpcap, cap_net_bind_service,
    cap_net_raw, cap_sys_chroot, cap_mknod, cap_audit_write, cap_setfcap
    
  Bounding Set:
    cap_sys_admin [!] # Potentially dangerous
    
[token]
  Service Account: production:app-sa
  Token Location: /var/run/secrets/kubernetes.io/serviceaccount/token
  Token Valid: Yes
  Token Expiry: 2024-01-16T10:30:00Z
  
[api]
  Kubernetes API: https://10.96.0.1:443
  API Accessible: Yes
  
  RBAC Permissions:
    pods: [get, list, watch]
    secrets: [get] [!] # Can read secrets
    configmaps: [get, list]
    
[mounts]
  Notable Mounts:
    /var/run/docker.sock [!] # Docker socket mounted
    /host/etc -> /etc (hostPath)
    
[namespaces]
  PID Namespace: container (isolated)
  Network Namespace: container (isolated)
  IPC Namespace: container (isolated)
  UTS Namespace: container (isolated)
  User Namespace: host [!] # Not isolated
  
[runtime]
  Detected Runtime: containerd
  Socket: /run/containerd/containerd.sock
  
[network]
  Interfaces:
    eth0: 10.0.0.5/24
    
  Metadata Service: 169.254.169.254 [!] # Accessible
```

---

## Understanding the Output

### Risk Indicators

kdigger marks potentially risky findings with `[!]`:

| Indicator | Meaning |
|-----------|---------|
| `cap_sys_admin [!]` | Dangerous capability present |
| `Docker socket [!]` | Container escape possible |
| `secrets: [get] [!]` | Can access secrets |
| `User namespace: host [!]` | Running as root on host |
| `Metadata Service [!]` | Cloud credentials accessible |

### Capability Analysis

```
Effective: What the process can do now
Permitted: What the process could gain
Bounding: Maximum capabilities available
```

### RBAC Analysis

Shows what the service account can do:

```
pods: [get, list, watch]      # Read pods
pods/exec: [create]           # Can exec into pods [!]
secrets: [get, list]          # Can read secrets [!]
```

---

## Specific Bucket Deep Dives

### Capabilities Bucket

```bash
./kdigger dig capabilities
```

Identifies dangerous capabilities:

| Capability | Risk |
|------------|------|
| CAP_SYS_ADMIN | Container escape |
| CAP_NET_ADMIN | Network manipulation |
| CAP_SYS_PTRACE | Process injection |
| CAP_DAC_OVERRIDE | File permission bypass |

### Token Bucket

```bash
./kdigger dig token
```

Analyzes service account token:

- Token location and validity
- Associated service account
- Token expiration
- Audiences

### API Bucket

```bash
./kdigger dig api
```

Tests Kubernetes API access:

- API server connectivity
- Authentication status
- RBAC permissions
- Accessible resources

---

## Automation and Scripting

### JSON Output

```bash
./kdigger dig all -o json > findings.json
```

### Quiet Mode

```bash
./kdigger dig all -q  # Only show issues
```

### Parse Results

```bash
./kdigger dig all -o json | jq '.capabilities.effective[]'
```

---

## Security Assessment Workflow

### 1. Initial Context Gathering

```bash
./kdigger dig all
```

### 2. Focus on High-Risk Areas

```bash
# If dangerous capabilities found
./kdigger dig capabilities -v

# If token found
./kdigger dig token,api
```

### 3. Document Findings

```bash
./kdigger dig all -o json > assessment-$(date +%Y%m%d).json
```

### 4. Proceed with Exploitation

Based on findings, use appropriate tools (CDK, manual techniques) for exploitation.

---

## Best Practices

- **Run early:** Use kdigger at the start of an assessment to understand the environment.
- **Focus on indicators:** Pay attention to `[!]` markers for quick wins.
- **Compare environments:** Run in different namespaces to compare security postures.
- **Document everything:** Save JSON output for reporting.
- **Use with other tools:** Combine with CDK for exploitation, Falco for detection testing.

---

## Defensive Use

Security teams can use kdigger to:

- Verify that Pod Security Standards are enforced
- Test that dangerous capabilities are blocked
- Validate service account restrictions
- Ensure namespace isolation is working
- Confirm network policies are effective

---

## References

This article is based on information from the following official sources:

1. [kdigger GitHub Repository](https://github.com/quarkslab/kdigger) - Quarkslab
2. [Linux Capabilities](https://man7.org/linux/man-pages/man7/capabilities.7.html) - Linux man pages
3. [Container Security](https://kubernetes.io/docs/concepts/security/) - Kubernetes Documentation
