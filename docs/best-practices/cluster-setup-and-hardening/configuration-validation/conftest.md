---
title: "Conftest"
description: "Conftest helps you write tests against structured configuration data using Open Policy Agent (OPA) policies."
sidebar_position: 4
keywords: [kubernetes security tool, conftest, OPA, open policy agent, policy testing, configuration validation, rego, infrastructure testing, policy as code, CKS]
---

# Conftest

**Conftest** is a command-line tool that allows you to **test configuration files** (YAML, JSON, HCL, TOML, INI, etc.) using policies written in **Rego**, the policy language used by **Open Policy Agent (OPA)**. It enables teams to enforce security, compliance, and operational rules early in the development pipeline by testing configuration files before deployment.

Conftest is particularly valuable in Kubernetes environments where you want to validate Kubernetes manifests, Helm charts, Terraform plans, or CI/CD configuration files against custom or community-defined security policies.

---

## Usage

### 1. Install Conftest

```bash
brew install conftest
```

Or via curl:

```bash
curl -L https://github.com/open-policy-agent/conftest/releases/latest/download/conftest_$(uname -s)_$(uname -m).tar.gz | tar xz
sudo mv conftest /usr/local/bin
```

---

### 2. Write a Rego Policy

For example, to **disallow containers running as root**, create a policy file `policy/deny-root.rego`:

```rego
package main

deny[msg] {
  input.kind == "Pod"
  container := input.spec.containers[_]
  not container.securityContext.runAsNonRoot
  msg = sprintf("Container %s must not run as root", [container.name])
}
```

---

### 3. Test a Kubernetes Manifest

```bash
conftest test deployment.yaml --policy policy/
```

If the manifest violates the policy, you'll get output like:

```
FAIL - deployment.yaml - Container nginx must not run as root
```

---

### 4. Test Terraform, Dockerfiles, etc.

Conftest supports testing other config formats:

```bash
conftest test terraform.tfplan
conftest test Dockerfile --input docker --parser docker
```

---

## Best Practices

- Store policies in version control alongside your configuration files.
- Integrate Conftest in CI/CD pipelines to prevent misconfigured infrastructure from being deployed.
- Use community-contributed policies as a starting point (e.g., OPA Gatekeeper library).
- Write tests for both **security** (e.g., `runAsNonRoot`, no `hostPath`) and **operations** (e.g., mandatory labels, resource requests/limits).
- Keep policies modular and well-documented for maintainability.

---

---

## References

This article is based on information from the following official sources:

1. [Conftest Documentation](https://www.conftest.dev/) - Open Policy Agent
2. [Conftest GitHub Repository](https://github.com/open-policy-agent/conftest) - CNCF
3. [Rego Policy Language](https://www.openpolicyagent.org/docs/latest/policy-language/) - Open Policy Agent
