---
title: "CKS Curriculum and Tooling Updates"
description: "Stay up to date with the latest changes to the Certified Kubernetes Security Specialist (CKS) exam curriculum and associated tools."
slug: cks-update-history
date: 2025-03-24
authors: [itai]
tags: [CKS, CNCF, Kubernetes, Certification]
---

The Certified Kubernetes Security Specialist (CKS) exam is frequently updated to stay aligned with the Kubernetes ecosystem and its evolving security landscape. <!-- truncate -->
This post tracks **official updates** to the CKS curriculum and tooling environment provided by the CNCF.

The goal is to help CKS candidates stay on top of the exam’s scope and prepare accordingly.

---

## ✅ Update Log

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

## 🔁 Stay Updated

To ensure you're always prepared:

- Review the [official CNCF CKS curriculum](https://training.linuxfoundation.org/certification/certified-kubernetes-security-specialist-cks/)
- Monitor tool versions on the [CKS candidate handbook](https://docs.linuxfoundation.org/tc-docs/certification/tips-cks)
- Follow CNCF and Kubernetes GitHub releases

---

This post will be regularly updated with future changes to the CKS curriculum. Bookmark this page or subscribe to our updates.
