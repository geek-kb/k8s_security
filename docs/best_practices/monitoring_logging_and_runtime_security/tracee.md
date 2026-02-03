---
title: "Tracee"
description: "Tracee is a runtime security and forensics tool that uses eBPF to detect suspicious activity in Linux systems, including Kubernetes environments."
sidebar_position: 8
keywords: [kubernetes security tool, tracee, runtime security, eBPF, threat detection, forensics, linux security, container security, aqua security, CKS]
---

# Tracee

**Required knowledge for the CKS certification.**

**Tracee** is an open-source **runtime security** and **digital forensics** tool developed by **Aqua Security**. It leverages **eBPF (extended Berkeley Packet Filter)** to observe kernel-level events and detect suspicious behavior in **containerized** and **Kubernetes** environments.

Tracee helps identify **anomalous activity**, such as privilege escalations, process injections, and unexpected syscalls, by applying predefined or custom **security detection rules**.

---

## Usage

### 1. Install Tracee with Docker

```bash
docker run --rm --privileged -v /etc/os-release:/etc/os-release:ro \
  -v /usr/src:/usr/src:ro -v /lib/modules:/lib/modules:ro \
  -v /tmp/tracee:/tmp/tracee aquasec/tracee:latest
```

> This runs Tracee in a privileged container with required access to the host's kernel interfaces.

---

### 2. Run Tracee with Detection Rules

```bash
tracee --detect
```

This activates Tracee's **signature-based detection engine**, which triggers alerts on behaviors like:

- Loading kernel modules
- Creating raw sockets
- Executing code in memory (shellcode)
- Using `ptrace` to inspect or control processes

---

### 3. Output Events to JSON

```bash
tracee --output json
```

You can consume this output via logging systems or SIEM tools for real-time analysis.

---

### 4. Filter Specific Events

Tracee allows filtering by process name, UID, syscall, or container ID:

```bash
tracee --trace comm=sh,uid=1000
```

Only tracks shell processes by a specific user.

---

### 5. Use with Tracee-Ebpf and Tracee-Rules

You can run Tracee as two components:

- `tracee-ebpf`: Captures system events
- `tracee-rules`: Applies detection logic

Example:

```bash
tracee-ebpf | tracee-rules
```

---

## Best Practices

- Run Tracee on **production nodes** in **monitoring mode** to observe runtime behavior and detect anomalies.
- Use **detection rules** aligned with known Kubernetes attack vectors (e.g., privilege escalation, container escape).
- Integrate with tools like **Falco** or **Tetragon** for broader runtime visibility.
- Ship logs to centralized systems (e.g., Elasticsearch, Loki) for analysis.
- Continuously tune rules to reduce false positives and focus on high-impact detections.

---

## References

This article is based on information from the following official sources:

1. [Tracee Documentation](https://aquasecurity.github.io/tracee/) - Aqua Security
2. [Tracee GitHub Repository](https://github.com/aquasecurity/tracee) - Aqua Security
3. [What is eBPF?](https://ebpf.io/what-is-ebpf/) - eBPF Foundation
