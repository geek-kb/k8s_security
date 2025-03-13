---
title: "Section Intro"
sidebar_position: 1
description: "An overview of common Kubernetes attack vectors and how attackers exploit misconfigurations."
---

# Common Kubernetes Attack Vectors

Kubernetes security threats arise from **misconfigurations, weak access controls, and unprotected workloads**. Attackers exploit these vulnerabilities to **escalate privileges, move laterally, and compromise clusters**.

This section explores **common Kubernetes attack vectors**, including:

- **[Compromised API Server](/docs/attack_vectors/compromised_api_server)**: Exploiting exposed API endpoints.
- **[Exposed Dashboard](/docs/attack_vectors/exposed_dashboard)**: Unauthorized access to Kubernetes dashboards.
- **[Insecure Secrets Management](/docs/attack_vectors/insecure_secrets_management)**: Leaking secrets due to weak storage and access controls.
- **[Lack of Network Policies](/docs/attack_vectors/lack_of_network_policies)**: Allowing lateral movement within the cluster.
- **[Privileged Containers](/docs/attack_vectors/privileged_containers)**: Using overprivileged containers to break out of the sandbox.

Each article provides **examples, real-world risks, and mitigation strategies** to help secure Kubernetes clusters against these threats.
