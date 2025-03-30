---
sidebar_position: 1
title: "Introduction"
description: "Understand the importance of securing the Kubernetes software supply chain and protecting your workloads from build-time and delivery-time threats."
sidebar_class_name: hidden
---

# Introduction to Supply Chain Security

Modern Kubernetes environments depend on a complex chain of tools, images, dependencies, and external services to build and run applications. This **software supply chain** can be a powerful enabler—but also a dangerous attack vector if not properly secured.

Supply chain attacks can compromise images, inject malicious code during CI/CD processes, or tamper with dependencies long before a workload reaches production. Protecting this chain is a critical part of Kubernetes security hardening.

---

## Why Supply Chain Security Matters

Attackers increasingly target:

- Container base images with known vulnerabilities<br/>
- Insecure build pipelines or misconfigured CI/CD tools<br/>
- Open-source packages with hidden backdoors<br/>
- Signing and verification steps that are skipped or misapplied

A successful supply chain attack may lead to:

- Compromised workloads<br/>
- Credential exfiltration<br/>
- Unauthorized code execution inside your cluster<br/>
- Complete cluster takeover

---

## What You'll Learn in This Section

This section covers best practices to secure your Kubernetes supply chain, including:

- Detecting and preventing use of **vulnerable container images**
- Using **image signing and verification** (e.g., with Cosign or Notation)
- Enforcing **trusted builds** with reproducible pipelines
- Securing **CI/CD pipelines** to prevent credential leaks and unauthorized image pushes
- Auditing dependencies and scanning for **vulnerabilities in third-party libraries**
- Understanding and generating **SBOMs** (Software Bill of Materials) to gain visibility into what's inside your workloads

---

## Key Articles

- [Supply Chain Security Best Practices](/docs/best_practices/supply_chain_security/supply_chain_best_practices)<br/>
- [Syft – SBOM Generator](/docs/best_practices/supply_chain_security/syft)<br/>
- [Grype – Vulnerability Scanner](/docs/best_practices/monitoring_logging_and_runtime_security/grype)<br/>
- [Cosign – Image Signing](/docs/best_practices/supply_chain_security/cosign)<br/>
- [Notation – OCI Image Signing](/docs/best_practices/supply_chain_security/notation)<br/>
- [Snyk – Dependency Scanning](/docs/best_practices/supply_chain_security/snyk)<br/>
- [Understanding SBOM](/docs/best_practices/supply_chain_security/sbom)

---

## Who Should Read This

This content is designed for:

- **Platform engineers** and **DevSecOps** teams building or maintaining CI/CD infrastructure<br/>
- **Developers** packaging and deploying workloads in containers<br/>
- **Security professionals** validating the integrity of containerized applications in Kubernetes

By following these supply chain security practices, you reduce the attack surface and build trust in every step of your application lifecycle.

---

Learn more by reviewing the [CNCF Supply Chain Security Whitepaper](https://www.cncf.io/blog/2021/08/05/cloud-native-security-whitepaper-supply-chain-security/).
