---
sidebar_position: 1
title: "Introduction to Kubernetes Security"
description: "A structured approach to Kubernetes security, covering fundamentals, attack vectors, and best practices."
---

# Introduction to Kubernetes Security

Welcome to **K8s Security**, a structured knowledge base created by **Itai Ganot** to provide comprehensive guidance on securing Kubernetes environments. This resource is designed for **DevOps engineers, security professionals, and Kubernetes administrators** who want to implement **best practices** and **mitigate security risks**.

The content aligns with **Certified Kubernetes Security Specialist (CKS) best practices** and is **continuously updated** to reflect the latest **Kubernetes security standards**.

---

## How This Site Is Structured

This site is divided into three main sections:

### 1. Fundamentals

Provides a foundational understanding of Kubernetes security concepts:

- [Kubernetes Security Fundamentals](/docs/fundamentals/k8s_security_fundamentals/)
- [The 4C Model of Kubernetes Security](/docs/fundamentals/the_4_c_cloud_native_security/)
- [Understanding the Kubernetes Attack Surface](/docs/fundamentals/understanding_k8s_attack_surface/)
- Security primitives like:
  - [Authentication](/docs/fundamentals/k8s_security_primitives/authentication/authentication/)
  - [Authorization (RBAC, ABAC, Webhooks)](/docs/fundamentals/k8s_security_primitives/authorization/)
  - [Certificates & Service Accounts](/docs/fundamentals/k8s_security_primitives/authentication/certificates/)

---

### 2. Attack Vectors

Explores real-world attack scenarios and security risks in Kubernetes environments:

- [Compromised API Server](/docs/attack_vectors/compromised_api_server/)
- [Exposed Dashboard](/docs/attack_vectors/exposed_dashboard/)
- [Insecure Secrets Management](/docs/attack_vectors/insecure_secrets_management/)
- [Lack of Network Policies](/docs/attack_vectors/lack_of_network_policies/)
- [Privileged Containers](/docs/attack_vectors/privileged_containers/)

---

### 3. Best Practices

Covers hardening strategies to secure Kubernetes environments:

- Cluster Setup and Hardening:
  - [CIS Benchmark for Kubernetes](/docs/best_practices/cluster_setup_and_hardening/cis_benchmark_for_k8s/)
  - [Kube Bench - CIS Compliance](/docs/best_practices/cluster_setup_and_hardening/cis_benchmark_kube_bench/)
  - [Kubelet Security](/docs/best_practices/cluster_setup_and_hardening/kubelet_security/)
  - [Pod Security Standards](/docs/best_practices/cluster_setup_and_hardening/pod_security/pod_security_standards/)
  - [Secrets Management](/docs/best_practices/cluster_setup_and_hardening/secrets_management/)
  - [Network Policies](/docs/best_practices/cluster_setup_and_hardening/network_security/network_policies/)

- Microservice Security and Hardening:
  - [Minimizing Microservice Vulnerabilities](/docs/best_practices/minimize_microservice_vulnerabilities/)
  - [Monitoring, Logging and Runtime Security](/docs/best_practices/monitoring_logging_and_runtime_security/)
  - [Supply Chain Security](/docs/best_practices/supply_chain_security/)

- System Hardening:
  - [Best Practices for System Hardening](/docs/best_practices/system_hardening/)

---

## Who Should Use This Site?

This site is for anyone working with Kubernetes security, including:

- DevOps Engineers – Implementing Kubernetes security best practices.
- Developers – Securing containerized applications and workloads.
- CKS Candidates – Preparing for the **Certified Kubernetes Security Specialist (CKS)** exam.
- Security Teams – Hardening Kubernetes against attack vectors.

---

## How to Navigate This Site

- Explore the Documentation: Navigate through the categories and subsections.
- Use Search: Quickly find best practices and real-world scenarios.
- Read the Blog: Insights, case studies, and security updates.
- Bookmark Important Sections: Each section is independent but interconnected.

---

## Get Involved

K8s Security is an open-source project. Contributions and discussions are welcome.

GitHub Repository: [github.com/geek-kb/k8s_security](https://github.com/geek-kb/k8s_security)
Join the Discussion: Share insights, report issues, and contribute.

---

## Stay Updated

Kubernetes security is constantly evolving. Follow this site for new techniques, emerging threats, and updated best practices.
