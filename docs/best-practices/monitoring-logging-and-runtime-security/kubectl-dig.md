---
sidebar_position: 10
title: "kubectl-dig"
description: "kubectl-dig provides deep visibility into Kubernetes cluster activity using eBPF-based tracing, enabling real-time analysis of system calls and network traffic."
keywords: [kubernetes security tool, kubectl-dig, eBPF, kubernetes tracing, system call monitoring, network visibility, container debugging, security analysis, CKS]
tags: [tool, runtime-security, debugging, CKS]
related:
  - /kubernetes-security/best-practices/monitoring-logging-and-runtime-security/tetragon/
  - /kubernetes-security/best-practices/monitoring-logging-and-runtime-security/kubectl-trace/
  - /kubernetes-security/best-practices/monitoring-logging-and-runtime-security/falco/
---

# kubectl-dig

**kubectl-dig** is a kubectl plugin that provides deep visibility into Kubernetes cluster activity using eBPF (extended Berkeley Packet Filter). It enables real-time tracing of system calls, network connections, and process execution within containers, making it valuable for security analysis, debugging, and incident investigation.

The tool deploys temporary pods with eBPF tracing capabilities to collect detailed information about workload behavior.

---

## Use Cases

- Investigate suspicious container behavior during security incidents.
- Debug application issues by tracing system calls.
- Analyze network connections from pods.
- Identify unexpected process execution in containers.
- Monitor file system access patterns.

---

## Prerequisites

- Kubernetes cluster with eBPF support (kernel 4.14+).
- kubectl configured with cluster access.
- Node access permissions to deploy privileged pods.

---

## Installation

### Using krew

```bash
kubectl krew install dig
```

### Manual Installation

```bash
curl -LO https://github.com/sysdiglabs/kubectl-dig/releases/download/v1.0.0/kubectl-dig_linux_amd64.tar.gz
tar xzf kubectl-dig_linux_amd64.tar.gz
chmod +x kubectl-dig
sudo mv kubectl-dig /usr/local/bin/
```

---

## Usage Examples

### Trace a Pod

Start tracing all activity in a specific pod:

```bash
kubectl dig pod my-app -n production
```

### Trace System Calls

Trace specific system calls:

```bash
kubectl dig pod my-app -n production --syscalls=execve,open,connect
```

### Trace Network Connections

Monitor network connections from a pod:

```bash
kubectl dig pod my-app -n production --network
```

### Trace File Access

Monitor file system operations:

```bash
kubectl dig pod my-app -n production --files
```

### Trace All Pods in a Namespace

```bash
kubectl dig namespace production
```

### Trace with Duration

Run tracing for a specific duration:

```bash
kubectl dig pod my-app -n production --duration 60s
```

---

## Tracing Capabilities

### System Call Tracing

| Syscall | Security Relevance |
|---------|-------------------|
| execve | Process execution (command injection detection) |
| open/openat | File access (data exfiltration, config access) |
| connect | Outbound network connections (C2 communication) |
| socket | Network socket creation |
| bind | Port binding (backdoor detection) |
| ptrace | Process debugging (potential escape attempt) |
| mount | Filesystem mounting (container escape) |

### Network Tracing

```
TIMESTAMP           SOURCE              DEST                PROTOCOL
12:34:56.789        10.0.0.5:45678      10.0.0.10:5432      TCP
12:34:57.012        10.0.0.5:45680      169.254.169.254:80  HTTP
12:34:58.345        10.0.0.5:45682      192.168.1.1:443     HTTPS
```

### Process Tracing

```
TIMESTAMP           PID     PPID    CMD                     USER
12:34:56.789        1234    1       nginx                   root
12:34:57.012        1235    1234    /bin/sh -c curl ...     nginx
12:34:58.345        1236    1235    curl http://evil.com    nginx
```

---

## Security Analysis Scenarios

### Detect Command Injection

Monitor for unexpected shell execution:

```bash
kubectl dig pod my-app -n production --syscalls=execve | grep -E "(sh|bash|curl|wget|nc)"
```

### Identify Suspicious Network Activity

Watch for connections to metadata services or unusual destinations:

```bash
kubectl dig pod my-app -n production --network | grep -E "(169.254.169.254|:22|:4444)"
```

### Monitor Secret Access

Track file access to secret mount paths:

```bash
kubectl dig pod my-app -n production --files | grep "/var/run/secrets"
```

### Detect Container Escape Attempts

Monitor for escape-related syscalls:

```bash
kubectl dig pod my-app -n production --syscalls=mount,ptrace,setns
```

---

## Output Formats

### JSON Output

```bash
kubectl dig pod my-app -n production -o json > trace.json
```

### Filter Output

```bash
kubectl dig pod my-app -n production --filter='cmd contains "curl"'
```

### Export to File

```bash
kubectl dig pod my-app -n production --output-file=/tmp/trace.log
```

---

## Integration with Other Tools

### Send to Falco

Configure kubectl-dig output to complement Falco alerts:

```bash
kubectl dig pod my-app -n production --output-format=falco
```

### Export to Elasticsearch

```bash
kubectl dig pod my-app -n production -o json | \
  jq -c '.' | \
  while read line; do
    curl -X POST "http://elasticsearch:9200/kubectl-dig/_doc" \
      -H "Content-Type: application/json" \
      -d "$line"
  done
```

---

## Best Practices

- **Use targeted tracing:** Focus on specific pods or syscalls to reduce noise and overhead.
- **Set time limits:** Always use `--duration` to prevent indefinite tracing.
- **Correlate with alerts:** Use dig to investigate Falco or other security alerts.
- **Trace in staging first:** Test tracing patterns in non-production environments.
- **Export important traces:** Save trace data for incident documentation and forensics.

---

## Limitations

- Requires privileged pods for eBPF access.
- High-volume applications may generate significant trace data.
- Kernel version requirements may not be met on all clusters.
- Tracing adds overhead to monitored workloads.

---

## References

This article is based on information from the following official sources:

1. [kubectl-dig GitHub Repository](https://github.com/sysdiglabs/kubectl-dig) - Sysdig
2. [eBPF Documentation](https://ebpf.io/what-is-ebpf/) - eBPF.io
3. [Kubernetes Debugging](https://kubernetes.io/docs/tasks/debug/) - Kubernetes Documentation
