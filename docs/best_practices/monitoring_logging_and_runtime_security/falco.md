---
title: "Falco"
description: "Falco is a runtime security tool for Kubernetes that detects abnormal behavior and threats based on system call monitoring and security rules."
sidebar_position: 4
---

# Falco

**Falco** is an open-source runtime security engine developed by the CNCF. It detects unexpected or malicious behavior in Kubernetes clusters by monitoring **kernel-level system calls** and applying customizable security rules. Falco helps identify real-time threats such as container escapes, privilege escalations, cryptomining, and filesystem tampering.

By combining behavioral detection with Kubernetes context, Falco provides deep visibility into what’s happening inside containers and nodes at runtime.

---

## Use Cases

- Detect container breakouts and privilege escalations.
- Monitor runtime behavior for policy violations.
- Audit workload actions like shell access or sensitive file modification.
- Integrate with alerting and incident response systems.

---

## Usage Examples

### Run Falco as a DaemonSet in Kubernetes

```bash
helm repo add falcosecurity https://falcosecurity.github.io/charts
helm install falco falcosecurity/falco --namespace falco --create-namespace
```

### Example Rule: Alert on Shell Spawned in a Container

```yaml
- rule: Terminal shell in container
  desc: A shell was spawned inside a container
  condition: container.id != host and proc.name in (bash, sh, zsh)
  output: "Shell spawned in container (user=%user.name command=%proc.cmdline)"
  priority: WARNING
```

### View Real-Time Events

```bash
kubectl logs -n falco -l app=falco
```

### Export Events to Alerting Tools

Use Falco plugins or sidecars to forward alerts to:

- Slack
- Prometheus
- Elasticsearch
- Syslog
- Webhooks

---

## Best Practices

- **Deploy as a DaemonSet:** Monitor all nodes and workloads.
- **Use tailored rulesets:** Tune rules based on your environment to reduce false positives.
- **Integrate alerts into SIEM or incident response:** Forward alerts for real-time visibility and action.
- **Audit for shell access and sensitive operations:** Detect unexpected access to the host or critical paths.
- **Combine with Admission Controllers:** Prevent known-bad workloads at deploy-time and detect runtime issues with Falco.

---

## References

- **Official Documentation:** [https://falco.org/docs](https://falco.org/docs)
- **GitHub Repository:** [https://github.com/falcosecurity/falco](https://github.com/falcosecurity/falco)
