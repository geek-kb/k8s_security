---
sidebar_position: 1
title: "kube-score"
description: "Analyze Kubernetes manifests for security, reliability, and performance issues using kube-score."
---

# kube-score

**kube-score** is a static analysis tool designed to evaluate Kubernetes YAML manifests. It identifies potential issues in configurations before deployment, helping teams improve the **security, reliability, and performance** of their workloads.

Unlike runtime scanning tools, kube-score operates entirely offline and focuses on catching configuration mistakes and deviations from best practices. This makes it suitable for integrating into early stages of the development lifecycle.

---

## Usage

kube-score analyzes individual files or entire directories of Kubernetes manifests and reports findings with explanations and severity levels.

### Score a Single Manifest File

```bash
kube-score score deployment.yaml
```

### Score All Manifests in a Directory

```bash
kube-score score ./manifests/
```

### CI/CD Integration with Non-Zero Exit Code on Errors

```bash
kube-score score --output-format ci deployment.yaml
```

This allows you to break builds or fail pull requests when issues are detected.

---

## Output Example

```
[CRITICAL] Container Resources
· containers should have CPU and memory resource limits
```

Each issue is categorized by severity (`CRITICAL`, `WARNING`, `OK`) and includes contextual information to help developers resolve it.

---

## Best Practices

- Run kube-score in CI pipelines to enforce configuration quality before deployment.
- Treat `CRITICAL` findings as blockers for production.
- Use YAML annotations to disable specific checks when necessary, but document the justification.
- Pair kube-score with other tools like vulnerability scanners for comprehensive coverage.
- Regularly review checks in kube-score to align with evolving cluster policies and practices.

---

## Official Documentation and Source

- Documentation: [https://kube-score.com](https://kube-score.com)
- GitHub: [https://github.com/zegl/kube-score](https://github.com/zegl/kube-score)
