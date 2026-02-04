---
sidebar_position: 1
sidebar_class_name: hidden
title: "Introduction to Kubernetes Security"
description: "Comprehensive Kubernetes security guide covering CKS certification topics, attack vectors, cluster hardening, RBAC, network policies, and container security best practices."
keywords:
  - kubernetes security
  - k8s security
  - CKS certification
  - kubernetes hardening
  - container security
  - kubernetes best practices
image: /img/k8s-security-social-card.png
---

import LastContentUpdate from '@site/src/components/LastContentUpdate';

# Introduction to Kubernetes Security

<LastContentUpdate />

Welcome to **K8s Security Guide**, a comprehensive resource created by **Itai Ganot** to provide in-depth guides and best practices for securing Kubernetes environments.

This site is dedicated to helping developers, DevOps engineers, and Kubernetes administrators implement robust security measures aligned with the principles of the **Certified Kubernetes Security Specialist (CKS)** certification and beyond.

Topics relevant for the CKS certification exam are marked accordingly throughout the documentation.

:::info Work in Progress
The site is actively being developed. More CKS-related topics are being added regularly.
Content is kept up to date with the latest Kubernetes versions and security tools based on the CKS curriculum.
:::

---

## Documentation Structure

The **K8s Security Guide** is organized into four main categories:

### [Security Fundamentals](/docs/fundamentals/intro)
Core security principles including authentication, authorization, RBAC, and the Kubernetes security model. Essential foundation for understanding how Kubernetes security works.

### [Attack Vectors](/docs/attack_vectors/intro)
Common security risks, real-world Kubernetes exploits, container escapes, and privilege escalation techniques. Understanding threats is the first step to defending against them.

### [Best Practices](/docs/best_practices/intro)
Production-grade security configurations for hardening Kubernetes clusters, workloads, and network configurations. Covers all four CKS exam domains:
- Cluster Setup & Hardening
- System Hardening
- Minimize Microservice Vulnerabilities
- Supply Chain Security

### [Security Tools](/docs/tools/intro)
Open-source tools for vulnerability scanning, runtime security, policy enforcement, and compliance auditing. Includes tools like Trivy, Falco, kube-bench, and more.

---

## Who Should Use This Guide?

| Audience | Use Case |
|----------|----------|
| **DevOps Engineers** | Implementing Kubernetes security in production cloud-native environments |
| **Security Engineers** | Hardening clusters and implementing security policies |
| **Developers** | Building secure containerized applications |
| **CKS Candidates** | Preparing for the Certified Kubernetes Security Specialist exam |

---

## How to Navigate

1. Start with **[Fundamentals](/docs/fundamentals/intro)** to build a strong security foundation
2. Explore **[Attack Vectors](/docs/attack_vectors/intro)** to understand common Kubernetes threats
3. Follow **[Best Practices](/docs/best_practices/intro)** to implement security hardening techniques
4. Use **[Security Tools](/docs/tools/intro)** to enhance your security posture
5. Browse **[Recommended Books](/books/)** for deeper learning resources
6. Use the **Search** feature (top right) to find specific security topics

---

## Contributing

Have questions or want to contribute? Visit the GitHub repository:

**[github.com/geek-kb/k8s_security](https://github.com/geek-kb/k8s_security)**

Contributions, corrections, and suggestions are welcome.
