---
title: "kubectl-snoop"
description: "kubectl-snoop is a diagnostic tool for inspecting Kubernetes API server calls made by other clients in real time."
sidebar_position: 6
keywords: [kubernetes security tool, kubectl-snoop, API inspection, debugging, API server monitoring, diagnostics, kubernetes troubleshooting, observability, CKS]
---

# kubectl-snoop

**kubectl-snoop** is a diagnostic tool for Kubernetes that **monitors and inspects API server traffic** in real time. It shows which users or processes are calling the Kubernetes API and what operations they’re performing.

This tool is especially helpful for **troubleshooting, auditing access patterns**, and **debugging RBAC permissions or controller behaviors**.

It works by creating a privileged pod on a target node and attaching to the kube-apiserver’s audit logs (or eBPF syscall tracing, depending on version). It is mostly used in **development, test, or controlled environments** due to the elevated permissions it requires.

---

## Usage

### 1. Install

Clone the GitHub repository or download the binary:

```bash
git clone https://github.com/eldadru/ksniff
cd kubectl-snoop
go build -o kubectl-snoop main.go
```

Or use a containerized version:

```bash
kubectl run --rm -i --tty snoop --image=eldadru/kubectl-snoop -- /snoop
```

> You can also use `kubectl krew`:

```bash
kubectl krew install snoop
```

---

### 2. Example: Trace API Server Calls on a Node

```bash
kubectl snoop <node-name>
```

This will launch a pod on the specified node and output real-time information such as:

```
USER                 METHOD   RESOURCE    VERB      NAMESPACE    NAME
system:kubelet       PATCH    nodes       status    -            ip-10-0-0-1
developer@example    GET      pods        get       dev          app-pod-123
```

---

### 3. Debug Access Patterns or RBAC Issues

You can observe which identities are making specific API calls, making it easier to detect:

- Misconfigured controllers
- Unexpected access attempts
- Failing workloads due to permission issues

---

## Best Practices

- **Use only in secure, isolated environments** (snoop creates privileged pods).
- **Don’t run in production clusters without tight RBAC controls**.
- Combine with **audit logging** for persistent record-keeping.
- Use it to **validate RBAC bindings** and investigate unusual access behavior.
- Rotate and clean up temporary privileged pods created by the tool.

---

## References

This article is based on information from the following official sources:

1. [kubectl-snoop GitHub Repository](https://github.com/eldadru/kubectl-snoop) - Eldad Rudich
2. [Krew Plugin Manager](https://krew.sigs.k8s.io/) - Kubernetes SIG CLI
3. [Auditing](https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/) - Kubernetes Documentation
