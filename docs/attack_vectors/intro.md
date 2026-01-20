---
sidebar_position: 1
title: "Kubernetes Attack Vectors"
description: "Comprehensive guide to Kubernetes attack vectors including container escapes, privilege escalation, RBAC exploitation, and cluster compromise techniques."
keywords:
  - kubernetes attack vectors
  - kubernetes vulnerabilities
  - container escape
  - kubernetes privilege escalation
  - kubernetes security threats
  - k8s exploits
  - kubernetes hacking
  - kubernetes penetration testing
sidebar_class_name: hidden
image: /img/k8s-security-social-card.png
tags: [attack-vector, overview, CKS]
related:
  - /docs/best_practices/intro/
  - /docs/fundamentals/understanding_k8s_attack_surface/
  - /docs/tools/intro/
  - /docs/fundamentals/intro/
---

# Kubernetes Attack Vectors

Kubernetes security threats arise from **misconfigurations, weak access controls, and unprotected workloads**. Attackers exploit these vulnerabilities to **escalate privileges, move laterally, and compromise clusters**.

This section explores common Kubernetes attack vectors and exploitation techniques used by attackers to compromise clusters.

## Attack Vector Categories

### API and Control Plane Attacks
- **[Compromised API Server](/docs/attack_vectors/compromised_api_server)**: Exploiting exposed API endpoints
- **[Exposed Dashboard](/docs/attack_vectors/exposed_dashboard)**: Unauthorized access to Kubernetes dashboards
- **[Unrestricted etcd Access](/docs/attack_vectors/unrestricted_etcd_access)**: Accessing etcd storage to retrieve secrets and cluster configurations

### Container and Runtime Attacks
- **[Privileged Container Escape](/docs/attack_vectors/privileged_container_escape)**: Breaking out of containers to gain host access
- **[Unrestricted HostPath Mounts](/docs/attack_vectors/unrestricted_hostpath_mounts)**: Mounting host filesystem for full node compromise
- **[Compromised Sidecars](/docs/attack_vectors/compromised_sidecars)**: Injecting or abusing sidecars to intercept data

### Identity and Access Attacks
- **[Insecure RBAC Permissions](/docs/attack_vectors/insecure_rbac_permissions)**: Exploiting misconfigured Role-Based Access Control
- **[Privileged Service Accounts](/docs/attack_vectors/privileged_service_accounts)**: Overprivileged service accounts enabling escalation
- **[Service Account Token Abuse](/docs/attack_vectors/service_account_token_abuse)**: Exploiting service account tokens for privilege escalation
- **[Exec/Attach Credential Theft](/docs/attack_vectors/exec_attach_credential_theft)**: Using kubectl exec to extract credentials

### Network Attacks
- **[Lack of Network Policies](/docs/attack_vectors/lack_of_network_policies)**: Lateral movement within the cluster
- **[Ingress/Egress Traffic Hijacking](/docs/attack_vectors/traffic_hijacking)**: Manipulating network traffic flow
- **[Exposed Kubelet API](/docs/attack_vectors/exposed_kubelet_api)**: Unauthorized access to Kubelet APIs

### Secrets and Data Attacks
- **[Insecure Secrets Management](/docs/attack_vectors/insecure_secrets_management)**: Leaking secrets due to weak storage
- **[ImagePullSecrets Theft](/docs/attack_vectors/imagepullsecrets_theft)**: Extracting container registry credentials

### Supply Chain Attacks
- **[Supply Chain Attacks](/docs/attack_vectors/supply_chain_attacks)**: Injecting malicious code into images or CI/CD pipelines
- **[Compromised Helm Charts](/docs/attack_vectors/supply_chain_attacks)**: Installing malicious Helm charts with backdoors
- **[Exploiting Insecure CSI Drivers](/docs/attack_vectors/insecure_csi_drivers)**: Abusing storage drivers to access volumes

### Policy and Configuration Attacks
- **[Misconfigured Admission Controllers](/docs/attack_vectors/misconfigured_admission_controllers)**: Bypassing security policies via webhook exploitation
- **[Denial of Service (DoS) Attacks](/docs/attack_vectors/ddos_attacks)**: Exhausting cluster resources

Each article provides **step-by-step exploitation techniques, real-world risks, and a link to the corresponding mitigation guide** to help you harden your Kubernetes environments.

---

## Security Warning

:::danger Educational Content Only
The information and scripts in this section are intended for **educational and security research purposes only**. They demonstrate how attackers exploit misconfigurations and vulnerabilities in Kubernetes clusters.

**Do not run these techniques on production systems or unauthorized environments.**

Use this content only in controlled, isolated testing environments where you have explicit permission. Misuse may violate company policies or legal regulations.

**You are responsible for how you use this information.**
:::
