---
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

- Container base images with known vulnerabilities
- Insecure build pipelines or misconfigured CI/CD tools
- Open-source packages with hidden backdoors
- Signing and verification steps that are skipped or misapplied

A successful supply chain attack may lead to:

- Compromised workloads
- Credential exfiltration
- Unauthorized code execution inside your cluster
- Complete cluster takeover

---

## What You'll Learn in This Section

This section covers best practices to secure your Kubernetes supply chain, including:

- Detecting and preventing use of **vulnerable container images**
- Using **image signing and verification** (e.g., with Cosign)
- Enforcing **trusted builds** with reproducible pipelines
- Securing **CI/CD pipelines** to prevent credential leaks and unauthorized image pushes
- Auditing dependencies and scanning for **vulnerabilities in third-party libraries**

---

## Who Should Read This

This content is designed for:

- **Platform engineers** and **DevSecOps** teams building or maintaining CI/CD infrastructure
- **Developers** packaging and deploying workloads in containers
- **Security professionals** validating the integrity of containerized applications in Kubernetes

By following these supply chain security practices, you reduce the attack surface and build trust in every step of your application lifecycle.

---

➡ Learn more by reviewing the [CNCF Supply Chain Security Whitepaper](https://www.cncf.io/blog/2021/08/05/cloud-native-security-whitepaper-supply-chain-security/).
