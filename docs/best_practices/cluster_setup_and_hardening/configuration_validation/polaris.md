---
title: "Polaris"
description: "Polaris is a Kubernetes configuration validation tool that checks workloads against best practices and highlights potential security and stability issues."
sidebar_position: 3
---

# Polaris

**Polaris** is an open-source tool developed by Fairwinds that validates Kubernetes deployments and configurations against a wide set of best practices. It highlights potential issues such as missing resource limits, unsafe security contexts, and invalid configurations—helping teams maintain secure and reliable workloads.

Polaris can run as a dashboard, CLI, or automated scanner within CI/CD pipelines. It provides actionable feedback to ensure Kubernetes resources are properly configured before they impact production.

---

## Use Cases

- Analyze Helm charts, manifests, or running clusters for misconfigurations.
- Prevent insecure workloads from being deployed.
- Enforce configuration policies during development and deployment stages.
- Gain visual insights using the Polaris dashboard.

---

## Usage Examples

### Run Polaris in CLI Mode Against a Cluster

```bash
polaris audit --audit-path . --format pretty
```

### Scan Kubernetes Manifests

```bash
polaris audit --audit-path ./manifests
```

### Use JSON Output for CI Integration

```bash
polaris audit --audit-path ./manifests --format json
```

### Launch the Polaris Dashboard

```bash
helm repo add fairwinds-stable https://charts.fairwinds.com/stable
helm install polaris fairwinds-stable/polaris --namespace polaris --create-namespace
```

---

## Best Practices

- **Integrate Polaris into CI/CD:** Prevent risky configurations from being deployed by scanning YAML files before applying them.
- **Use the dashboard in dev environments:** Gain visual feedback on workload issues and trends.
- **Customize checks:** Configure Polaris with a policy YAML to align with internal security and operational requirements.
- **Automate periodic scans:** Continuously validate running clusters against evolving best practices.
- **Remediate early:** Address issues like missing liveness/readiness probes, `hostPath` usage, and lack of resource limits during development—not in production.

---

## References

- **Official Documentation:** [https://polaris.docs.fairwinds.com](https://polaris.docs.fairwinds.com)
- **GitHub Repository:** [https://github.com/FairwindsOps/polaris](https://github.com/FairwindsOps/polaris)
