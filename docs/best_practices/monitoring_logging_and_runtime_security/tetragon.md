---
title: "Tetragon"
description: "Tetragon is a Kubernetes-aware security observability and runtime enforcement tool built on eBPF, enabling detection of malicious behavior and policy enforcement in real time."
sidebar_position: 5
---

# Tetragon

**Tetragon** is an open-source, Kubernetes-native **eBPF-based security observability and runtime enforcement tool** developed by the Cilium project. It allows security teams to monitor system and network activity in real time, detect malicious behavior, and enforce policies dynamically—without modifying application code.

Tetragon integrates tightly with Kubernetes, delivering deep visibility into process-level activity, container lifecycle events, file access, and network communication.

---

## Use Cases

- Detect unexpected process executions in containers.
- Enforce runtime policies like blocking unauthorized binaries.
- Trace container and host activity at the syscall level.
- Observe DNS, TCP, and HTTP traffic per workload.
- Correlate events with Kubernetes metadata (pods, namespaces, labels).

---

## Usage Examples

### Install Tetragon with Helm

```bash
helm repo add cilium https://helm.cilium.io
helm install tetragon cilium/tetragon --namespace kube-system
```

### Example: Log All Executed Binaries

Tetragon emits events for executed processes using eBPF hooks:

```bash
kubectl logs -n kube-system -l k8s-app=tetragon -f
```

Example output:

```
Process exec detected: /usr/bin/curl in pod nginx-1234 with UID 1000
```

### Example: Enforce Runtime Policy

Block execution of `nc` (netcat) across all containers:

```yaml
apiVersion: cilium.io/v1alpha1
kind: TracingPolicy
metadata:
  name: block-netcat
spec:
  selectors:
    matchBinary: ["/usr/bin/nc"]
  action: Block
```

Apply the policy:

```bash
kubectl apply -f block-netcat.yaml
```

---

## Best Practices

- **Deploy cluster-wide:** Use the DaemonSet to monitor all nodes and containers.
- **Use granular policies:** Apply Kubernetes-native enforcement using labels, namespaces, and container metadata.
- **Integrate with observability pipelines:** Send logs to SIEM or alerting systems for incident response.
- **Use in combination with audit logs:** Correlate Tetragon events with Kubernetes audit logs for full visibility.
- **Keep eBPF programs updated:** Monitor upstream releases for security and kernel compatibility updates.

---

## References

- **Official Documentation:** [https://docs.cilium.io/en/stable/observability/tetragon/](https://docs.cilium.io/en/stable/observability/tetragon/)
- **GitHub Repository:** [https://github.com/cilium/tetragon](https://github.com/cilium/tetragon)
