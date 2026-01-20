---
title: "CKS Curriculum and Tooling Updates"
description: "Stay up to date with the latest changes to the Certified Kubernetes Security Specialist (CKS) exam curriculum and associated tools."
slug: cks-update-history
date: 2025-12-12
authors: [itai]
tags: [CKS, CNCF, Kubernetes, Certification]
keywords:
  - CKS exam updates
  - CKS curriculum changes
  - certified kubernetes security specialist
  - CKS 2025
  - kubernetes certification
image: /img/k8s-security-social-card.png
---

The Certified Kubernetes Security Specialist (CKS) exam is frequently updated to stay aligned with the Kubernetes ecosystem and its evolving security landscape. <!-- truncate -->
This post tracks **official updates** to the CKS curriculum and tooling environment provided by the CNCF.

The goal is to help CKS candidates stay on top of the exam’s scope and prepare accordingly.

---

## Update Log

### 2025-10-15 — **CKS Updated to Kubernetes v1.34**

- **New Kubernetes version**: v1.34
- Major exam environment update: Environment now running Kubernetes v1.34 (as of December 2025)
- **Pod Level Resources** feature graduated to Beta and enabled by default
- Updated tooling versions aligned with Kubernetes v1.34:
  - `kubectl` updated to v1.34
  - `kube-bench` updated for v1.34 compliance
  - `trivy` updated with enhanced SBOM scanning capabilities
- **Gateway API v1.4** reached GA with new networking features
- Enhanced focus on modern networking with **Gateway API** replacing some traditional Ingress patterns
- Emphasis on **Changed Block Tracking API** (alpha) for efficient volume snapshot management
- **Ingress NGINX** retirement announced (maintenance until March 2026)
- Continued emphasis on runtime security with eBPF-based tools

### 2025-06-15 — **CKS Updated to Kubernetes v1.32 and v1.33**

- **New Kubernetes versions**: v1.32 and v1.33 released
- Exam environment updated to align with v1.32/v1.33 within 4-8 weeks of release
- Tooling updates for compatibility with newer Kubernetes versions
- Continued refinement of supply chain security topics
- Enhanced emphasis on **workload identity and Pod-to-Pod encryption** (Cilium, Istio)
- Updated `kube-score` and `kubescape` versions for better configuration validation
- Falco remains a required tool with updated detection rules for v1.32+ features

### 2025-04-01 — **CKS Updated to Kubernetes v1.29 and Tooling Enhancements**

- **New Kubernetes version**: v1.29
- Exam tools updated to include:
  - `kube-score` (configuration validation)
  - `kubescape` (compliance scanning)
- **Falco** added under "Runtime Security" domain as a required tool
- Pod Security Admission (PSA) modes now included in detail under "Pod Security"
- Emphasis on detecting **privilege escalation paths**
- Updated `trivy` version includes SBOM and VEX support
- Clarified importance of runtime eBPF tools for detection and alerting
- New subtopic: **Workload identity hardening** (ServiceAccount tokens, projected volumes)

### 2024-07-01 — **CKS Updated to Kubernetes v1.28**

- **New Kubernetes version**: v1.28
- Tools like `kubectl`, `kube-bench`, and `trivy` updated to reflect this version.
- Removal of deprecated APIs.
- Minor updates to audit logging objectives.

### 2023-06-30 — **Curriculum Realignment**

- Topics under “Supply Chain Security” restructured for clarity.
- Emphasis added on detecting insecure base images and signed artifacts.
- Link time attacks and tampering highlighted as new subtopics.

### 2022-09-01 — **CKS Upgraded to Kubernetes v1.25**

- Updated exam clusters to Kubernetes v1.25
- Introduced `seccomp` profiles under the “Pod Security” domain
- Deprecated `PodSecurityPolicies` officially removed from exam scope

### 2021-10-15 — **CKS Environment Tooling Updated**

- Switched to using `crictl` as the primary container runtime interface tool
- Default editor changed from `vi` to `nano` (optionally configurable)
- Introduction of `kube-bench`, `trivy`, and `kyverno` as allowed tools

### 2021-06-01 — **Initial CKS Curriculum Launch**

- Focused on 6 domains:
  - Cluster Setup
  - System Hardening
  - Minimize Microservice Vulnerabilities
  - Supply Chain Security
  - Monitoring, Logging, and Runtime Security
  - Incident Response

---

## Stay Updated

To ensure you're always prepared:

- Review the [official CNCF CKS curriculum](https://training.linuxfoundation.org/certification/certified-kubernetes-security-specialist-cks/)
- Monitor tool versions on the [CKS candidate handbook](https://docs.linuxfoundation.org/tc-docs/certification/important-instructions-cks)
- Follow CNCF and Kubernetes GitHub releases

---

This post will be regularly updated with future changes to the CKS curriculum. Bookmark this page or subscribe to our updates.
