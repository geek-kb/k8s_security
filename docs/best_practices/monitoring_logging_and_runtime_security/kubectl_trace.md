---
title: "kubectl-trace"
description: "kubectl-trace allows you to run eBPF tracing programs across your Kubernetes cluster for performance debugging and security analysis."
sidebar_position: 7
---

# kubectl-trace

**kubectl-trace** is a powerful observability tool that enables Kubernetes users to **run BPF (Berkeley Packet Filter) tracing programs** like `bpftrace` across their cluster nodes. It’s designed for advanced users who want to **debug performance issues, monitor syscalls, and gain deep insights into system behavior** without leaving the Kubernetes environment.

It works by launching a privileged pod on a selected node and running BPF tracing scripts within it, giving real-time kernel-level visibility into what workloads are doing.

---

## Usage

### 1. Install kubectl-trace

You can install `kubectl-trace` using Go:

```bash
go install github.com/iovisor/kubectl-trace@latest
```

Or download a binary release from GitHub:

[https://github.com/iovisor/kubectl-trace/releases](https://github.com/iovisor/kubectl-trace/releases)

---

### 2. Run a bpftrace Script on a Node

```bash
kubectl trace run <node-name> -e 'tracepoint:syscalls:sys_enter_openat { printf("%s opened %s\n", comm, str(args->filename)); }'
```

This will:

- Deploy a privileged pod on the node
- Execute the `bpftrace` script
- Stream output from syscalls that match the tracepoint

---

### 3. Collect Trace Results

You can watch the trace output directly:

```bash
kubectl logs -f <trace-pod-name>
```

Or delete the trace job when complete:

```bash
kubectl trace delete <trace-id>
```

---

## Best Practices

- **Use in staging or development clusters**, not production, due to the elevated privileges required.
- Ensure nodes support **eBPF and kernel headers** for `bpftrace`.
- Validate that all trace scripts are safe and reviewed before execution.
- Combine with **runtime anomaly detection** tools for deeper incident response workflows.
- Clean up trace pods and jobs after completion to avoid resource waste.

---

## Resources

- **GitHub Repository:** [https://github.com/iovisor/kubectl-trace](https://github.com/iovisor/kubectl-trace)
- **Official Docs & Examples:** [https://github.com/iovisor/kubectl-trace/blob/master/docs](https://github.com/iovisor/kubectl-trace/blob/master/docs)
- **bpftrace Reference:** [https://github.com/iovisor/bpftrace](https://github.com/iovisor/bpftrace)
