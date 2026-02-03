---
title: "Falco"
description: "Falco is a runtime security tool for Kubernetes that detects abnormal behavior and threats based on system call monitoring and security rules."
sidebar_position: 4
keywords: [kubernetes security tool, falco, runtime security, threat detection, system call monitoring, intrusion detection, CNCF, container security, security rules, CKS]
tags: [tool, runtime-security, detection, CKS]
related:
  - /docs/best_practices/monitoring_logging_and_runtime_security/tetragon/
  - /docs/best_practices/monitoring_logging_and_runtime_security/tracee/
  - /docs/attack_vectors/privileged_container_escape/
  - /docs/best_practices/cluster_setup_and_hardening/pod_security/seccomp_in_pods/
---

# Falco

**Required knowledge for the CKS certification.**

**Falco** is an open-source runtime security engine developed by the CNCF and a **required tool** for the CKS exam as of the **Kubernetes v1.29 curriculum update**. It detects unexpected or malicious behavior in Kubernetes clusters by monitoring **kernel-level system calls** and applying customizable security rules. Falco helps identify real-time threats such as container escapes, privilege escalations, cryptomining, and filesystem tampering.

By combining behavioral detection with Kubernetes context, Falco provides deep visibility into what's happening inside containers and nodes at runtime.

> **CKS v1.34 Update:** Falco now includes enhanced detection rules for Kubernetes v1.34 features, including Pod-Level Resources monitoring, Gateway API traffic analysis, and improved eBPF-based detection capabilities.

---

## Use Cases

- Detect container breakouts and privilege escalations
- Monitor runtime behavior for policy violations
- Audit workload actions like shell access or sensitive file modification
- Track resource exhaustion attacks and anomalous resource consumption
- Monitor Gateway API and Ingress traffic for suspicious patterns
- Detect unauthorized API server access and privilege escalation attempts
- Integrate with alerting and incident response systems

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
  output: "Shell spawned in container (user=%user.name command=%proc.cmdline container=%container.name namespace=%k8s.ns.name)"
  priority: WARNING
```

### Kubernetes v1.34 Detection Rules

#### Rule: Detect Pod Resource Limit Bypass Attempts

```yaml
- rule: Pod Resource Limit Manipulation
  desc: Detect attempts to bypass Pod-level resource limits
  condition: >
    k8s_audit and
    ka.verb in (create, update, patch) and
    ka.target.resource = "pods" and
    ka.req.pod.resources.limits != null and
    (ka.req.pod.resources.limits.cpu > ka.namespace.quota.limits.cpu or
     ka.req.pod.resources.limits.memory > ka.namespace.quota.limits.memory)
  output: >
    Attempt to create Pod exceeding namespace resource quota
    (user=%ka.user.name pod=%ka.target.name namespace=%ka.target.namespace
     requested_cpu=%ka.req.pod.resources.limits.cpu requested_memory=%ka.req.pod.resources.limits.memory)
  priority: WARNING
  source: k8s_audit
```

#### Rule: Monitor Gateway API Configuration Changes

```yaml
- rule: Gateway API Security Configuration Change
  desc: Detect changes to Gateway API resources that may affect security
  condition: >
    k8s_audit and
    ka.verb in (create, update, patch, delete) and
    ka.target.resource in (gateways, httproutes, tlsroutes, referencegrants) and
    ka.target.namespace != "kube-system"
  output: >
    Gateway API resource modified
    (user=%ka.user.name resource=%ka.target.resource name=%ka.target.name
     namespace=%ka.target.namespace verb=%ka.verb)
  priority: INFO
  source: k8s_audit
```

#### Rule: Detect Suspicious Volume Snapshot Operations

```yaml
- rule: Unauthorized Volume Snapshot Access
  desc: Detect unauthorized access to volume snapshots using Changed Block Tracking API
  condition: >
    k8s_audit and
    ka.verb in (get, list, create, delete) and
    ka.target.resource = "volumesnapshots" and
    not ka.user.name in (backup-operator, velero, trusted-backup-users)
  output: >
    Suspicious volume snapshot operation
    (user=%ka.user.name resource=%ka.target.resource name=%ka.target.name
     namespace=%ka.target.namespace verb=%ka.verb)
  priority: WARNING
  source: k8s_audit
```

#### Rule: Detect eBPF Program Loading

```yaml
- rule: eBPF Program Loaded
  desc: Detect when an eBPF program is loaded into the kernel
  condition: >
    evt.type = bpf and
    evt.dir = < and
    not container.image.repository in (falco, cilium, tetragon, tracee)
  output: >
    eBPF program loaded by unexpected process
    (user=%user.name command=%proc.cmdline container=%container.name image=%container.image.repository)
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

- **Deploy as a DaemonSet:** Monitor all nodes and workloads
- **Use tailored rulesets:** Tune rules based on your environment to reduce false positives
- **Enable Kubernetes Audit Log integration:** Monitor API server activity for suspicious actions
- **Configure Pod-Level Resource monitoring:** Track resource consumption anomalies with v1.34 features
- **Monitor Gateway API resources:** Detect unauthorized changes to traffic routing configurations
- **Integrate alerts into SIEM or incident response:** Forward alerts for real-time visibility and action
- **Audit for shell access and sensitive operations:** Detect unexpected access to the host or critical paths
- **Combine with Admission Controllers:** Prevent known-bad workloads at deploy-time and detect runtime issues with Falco
- **Use eBPF driver when available:** Better performance and compatibility than kernel module
- **Regularly update rulesets:** Keep detection rules current with new Kubernetes versions and attack patterns
- **Implement rule exceptions carefully:** Whitelist only trusted processes and containers
- **Monitor Falco itself:** Ensure the security tool is running and healthy on all nodes

---

## References

This article is based on information from the following official sources:

1. [Falco Documentation](https://falco.org/docs/) - Falco Official Documentation
2. [Falco GitHub Repository](https://github.com/falcosecurity/falco) - Falco Security
3. [Auditing](https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/) - Kubernetes Documentation
4. [Falco Rules](https://falco.org/docs/reference/rules/) - Falco Official Documentation
