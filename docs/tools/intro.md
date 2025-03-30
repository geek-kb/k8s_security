---
sidebar_position: 1
title: "Section Introduction"
description: "A curated list of tools used to secure, audit, and monitor Kubernetes environments across various stages of the container lifecycle."
sidebar_class_name: hidden
---

# Security Tooling for Kubernetes

Securing Kubernetes requires more than just applying best practices—it also involves using specialized tools to **detect misconfigurations, prevent supply chain risks, monitor runtime behavior, and audit compliance**. This section provides an overview of popular open-source tools used by Kubernetes security professionals, with a focus on **practical usage and integration** into real-world environments.

This list includes tools for vulnerability scanning, access control, runtime security, configuration auditing, and more. These tools are referenced throughout this site and can be integrated into CI/CD pipelines or deployed in production clusters to enhance visibility and reduce risk.

> If you're preparing for the **Certified Kubernetes Security Specialist (CKS)** exam, many of these tools are either required or highly recommended. CKS-required tools will be marked accordingly in follow-up materials.

---

**Click on any tool name below to access a detailed article explaining its purpose, usage, configuration tips, and integration examples.**

---

## Static Analysis and Image Scanning

### [Trivy](/docs/best_practices/monitoring_logging_and_runtime_security/trivy)

### [Syft](/docs/best_practices/supply_chain_security/syft)

### [Grype](/docs/best_practices/monitoring_logging_and_runtime_security/grype)

### [kube-score](/docs/best_practices/cluster_setup_and_hardening/configuration_validation/kube_score)

### [kubescape](/docs/best_practices/cluster_setup_and_hardening/configuration_validation/kubescape)

### [Polaris](/docs/best_practices/cluster_setup_and_hardening/configuration_validation/polaris)

### [Checkov](/docs/best_practices/cluster_setup_and_hardening/configuration_validation/checkov)

### [Kube-Linter](/docs/best_practices/cluster_setup_and_hardening/configuration_validation/kube_linter)

---

## Runtime Security and Threat Detection

### [Falco](/docs/best_practices/monitoring_logging_and_runtime_security/falco)

### [Tetragon](/docs/best_practices/monitoring_logging_and_runtime_security/tetragon)

### [Tracee](/docs/best_practices/monitoring_logging_and_runtime_security/tracee)

---

## Configuration Auditing and Compliance

### [kube-hunter](/docs/best_practices/cluster_setup_and_hardening/network_security/kube_hunter)

### [KubeAudit](/docs/best_practices/cluster_setup_and_hardening/pod_security/kubeaudit)

---

## Secrets Management

### [Sealed Secrets](/docs/best_practices/cluster_setup_and_hardening/secrets_management/sealed_secrets)

### [Mozilla SOPS](/docs/best_practices/cluster_setup_and_hardening/secrets_management/mozilla_sops)

---

## Supply Chain Security and SBOM

### [Cosign](/docs/best_practices/supply_chain_security/cosign)

### [Notation](/docs/best_practices/supply_chain_security/notation)

---

## Policy Enforcement and Admission Control

### [OPA (Open Policy Agent) / Gatekeeper](/docs/best_practices/cluster_setup_and_hardening/api_server_security/opa_gatekeeper)

### [Kyverno](/docs/best_practices/cluster_setup_and_hardening/api_server_security/kyverno)

---

## Network Security and Traffic Control

### [Cilium](/docs/best_practices/cluster_setup_and_hardening/network_security/cilium)

### [Calico](/docs/best_practices/cluster_setup_and_hardening/network_security/calico)

### [Kong](/docs/best_practices/cluster_setup_and_hardening/network_security/kong)

---

## Observability and Forensics

### [kubectl-snoop](/docs/best_practices/monitoring_logging_and_runtime_security/kubectl_snoop)

### [kubectl-trace](/docs/best_practices/monitoring_logging_and_runtime_security/kubectl_trace)

---

## CI/CD and GitOps Security

### [Conftest](/docs/best_practices/cluster_setup_and_hardening/configuration_validation/conftest)

### [Terrascan](/docs/best_practices/cluster_setup_and_hardening/configuration_validation/terrascan)

---

## Conclusion

Using the right tools is crucial for securing Kubernetes across its entire lifecycle—from development and CI/CD to deployment and runtime. In this section, you’ll find detailed breakdowns of how these tools work, how to configure them securely, and how they support security best practices discussed throughout the site.

> For CKS candidates, it is essential to become familiar with tools like **Trivy, Falco, kube-bench, OPA/Gatekeeper, Kyverno, Sealed Secrets**, and **SOPS**. These tools appear frequently in exam scenarios and real-world production environments alike.
