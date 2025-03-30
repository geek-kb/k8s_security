---
sidebar_position: 1
title: "Section Introduction"
description: "A curated list of tools used to secure, audit, and monitor Kubernetes environments across various stages of the container lifecycle."
sidebar_class_name: hidden
---

# Security Tooling for Kubernetes

Securing Kubernetes requires more than just applying best practices—it also involves using specialized tools to **detect misconfigurations, prevent supply chain risks, monitor runtime behavior, and audit compliance**. This section provides an overview of popular open-source tools used by Kubernetes security professionals, with a focus on **practical usage and integration** into real-world environments.

This list includes tools for vulnerability scanning, access control, runtime security, configuration auditing, and more. These tools are referenced throughout this site and can be integrated into CI/CD pipelines or deployed in production clusters to enhance visibility and reduce risk.

> If you're preparing for the **Certified Kubernetes Security Specialist (CKS)** exam, many of these tools are either required or highly recommended. CKS-required tools are clearly marked.

---

**Click on any tool name below to access a detailed article explaining its purpose, usage, configuration tips, and integration examples.**

---

## Static Analysis and Image Scanning

Analyze container images and configuration files to detect vulnerabilities and insecure defaults.

### [Trivy](/docs/best_practices/monitoring_logging_and_runtime_security/trivy)

**CKS-required.** A fast and comprehensive vulnerability scanner for container images, Kubernetes manifests, IaC, and source code.

### [Grype](/docs/best_practices/monitoring_logging_and_runtime_security/grype)

**CKS-required.** A reliable container vulnerability scanner that consumes SBOMs and integrates with CI pipelines.

### [Syft](/docs/best_practices/supply_chain_security/syft)

**CKS-required.** Generates Software Bill of Materials (SBOMs) from container images and directories, enabling transparency and traceability.

### [Kube-Score](/docs/best_practices/cluster_setup_and_hardening/configuration_validation/kube_score)

Performs static analysis of Kubernetes manifests and highlights common security anti-patterns.

### [Kube-Linter](/docs/best_practices/cluster_setup_and_hardening/configuration_validation/kube_linter)

**CKS-required.** Scans Kubernetes YAML files to detect misconfigurations like missing resource limits and insecure security contexts.

### [Kubescape](/docs/best_practices/cluster_setup_and_hardening/configuration_validation/kubescape)

An end-to-end security scanning tool that validates clusters against industry benchmarks such as NSA-CISA and MITRE.

### [Polaris](/docs/best_practices/cluster_setup_and_hardening/configuration_validation/polaris)

Validates Kubernetes resources and live clusters against best practices for stability and security.

### [Checkov](/docs/best_practices/cluster_setup_and_hardening/configuration_validation/checkov)

A static code analyzer for IaC tools like Terraform and Kubernetes, highlighting misconfigurations before deployment.

### [Conftest](/docs/best_practices/cluster_setup_and_hardening/configuration_validation/conftest)

Leverages OPA to validate configuration files such as Kubernetes manifests in CI workflows.

### [Terrascan](/docs/best_practices/cluster_setup_and_hardening/configuration_validation/terrascan)

A static analysis tool that scans IaC for security violations and enforces policy compliance.

---

## Runtime Security and Threat Detection

Monitor live cluster activity to detect and respond to suspicious behavior.

### [Falco](/docs/best_practices/monitoring_logging_and_runtime_security/falco)

**CKS-required.** A powerful runtime security tool that detects abnormal system call activity inside containers.

### [Tetragon](/docs/best_practices/monitoring_logging_and_runtime_security/tetragon)

An eBPF-based runtime observability and enforcement tool for detecting malicious behavior in real time.

### [Tracee](/docs/best_practices/monitoring_logging_and_runtime_security/tracee)

**CKS-required.** Uses eBPF to trace Linux system calls and detect runtime threats, offering deep forensics and custom event tracking.

---

## Configuration Auditing and Compliance

Audit live clusters and YAML specs to detect insecure configurations.

### [Kube-Hunter](/docs/best_practices/cluster_setup_and_hardening/network_security/kube_hunter)

Actively probes clusters to find security issues from an attacker’s perspective.

### [KubeAudit](/docs/best_practices/cluster_setup_and_hardening/pod_security/kubeaudit)

A command-line tool that audits your cluster for misconfigured pods, RBAC issues, and privilege escalations.

---

## Secrets Management

Tools to encrypt, store, and control access to secrets in a GitOps-friendly and secure manner.

### [Sealed Secrets](/docs/best_practices/cluster_setup_and_hardening/secrets_management/sealed_secrets)

Encrypts Kubernetes Secrets so they can be safely stored in version control. Uses a controller to decrypt inside the cluster.

### [Mozilla SOPS](/docs/best_practices/cluster_setup_and_hardening/secrets_management/mozilla_sops)

An encryption tool for managing secrets in structured formats using KMS, PGP, or cloud-native keys.

---

## Supply Chain Security and SBOM

Protect your build pipeline and ensure integrity of deployed artifacts.

### [Cosign](/docs/best_practices/supply_chain_security/cosign)

**CKS-required.** Signs and verifies container images using keyless or key-based cryptographic signatures.

### [Notation](/docs/best_practices/supply_chain_security/notation)

An OCI-compliant tool for image signing and verification, supporting Notary v2 standards.

---

## Policy Enforcement and Admission Control

Enforce security policies and prevent risky resources from being deployed.

### [OPA (Gatekeeper)](/docs/best_practices/cluster_setup_and_hardening/api_server_security/opa_gatekeeper)

**CKS-required.** Policy-as-code engine used for enforcing constraints during resource admission.

### [Kyverno](/docs/best_practices/cluster_setup_and_hardening/api_server_security/kyverno)

Kubernetes-native policy engine that validates, mutates, and generates resources using declarative YAML policies.

---

## Network Security and Traffic Control

Protect inter-pod traffic, ingress/egress flows, and enable deep observability.

### [Cilium](/docs/best_practices/cluster_setup_and_hardening/network_security/cilium)

**CKS-required.** eBPF-based CNI plugin that enables L3-L7 security, visibility, and observability in Kubernetes.

### [Calico](/docs/best_practices/cluster_setup_and_hardening/network_security/calico)

**CKS-required.** A widely used CNI that enforces network policy and segmentation for Kubernetes workloads.

### [Kong](/docs/best_practices/cluster_setup_and_hardening/network_security/kong)

An API gateway for Kubernetes that provides advanced traffic routing, authentication, and rate limiting.

---

## Observability and Forensics

Tools for deep inspection of node and container behavior during live debugging or post-incident investigation.

### [kubectl-snoop](/docs/best_practices/monitoring_logging_and_runtime_security/kubectl_snoop)

Collects low-level syscall traces and performance data for on-node container introspection.

### [kubectl-trace](/docs/best_practices/monitoring_logging_and_runtime_security/kubectl_trace)

Run BPFTrace programs inside your Kubernetes cluster to trace detailed system behavior.

---

## CI/CD and GitOps Security

Enforce policies and scan configurations early in the development lifecycle.

### [Conftest](/docs/best_practices/cluster_setup_and_hardening/configuration_validation/conftest)

Validates Helm charts, Terraform, or Kubernetes YAML using OPA before deployment.

### [Terrascan](/docs/best_practices/cluster_setup_and_hardening/configuration_validation/terrascan)

Scans IaC to prevent misconfigurations from reaching production environments.

---

## Conclusion

Using the right tools is crucial for securing Kubernetes across its entire lifecycle—from development and CI/CD to deployment and runtime. In this section, you’ll find detailed breakdowns of how these tools work, how to configure them securely, and how they support security best practices discussed throughout the site.

> For CKS candidates, it is essential to become familiar with the tools that are marked as (**CKS-required**). These tools appear frequently in exam scenarios and real-world production environments alike.
