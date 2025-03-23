---
sidebar_position: 1
title: "Section Introduction"
description: "An overview of common Kubernetes attack vectors and how attackers exploit misconfigurations."
---

# Common Kubernetes Attack Vectors

Kubernetes security threats arise from **misconfigurations, weak access controls, and unprotected workloads**. Attackers exploit these vulnerabilities to **escalate privileges, move laterally, and compromise clusters**.

This section explores **common Kubernetes attack vectors**, including:

- **[Compromised API Server](/docs/attack_vectors/compromised_api_server)**: Exploiting exposed API endpoints.
- **[Exposed Dashboard](/docs/attack_vectors/exposed_dashboard)**: Unauthorized access to Kubernetes dashboards.
- **[Insecure Secrets Management](/docs/attack_vectors/insecure_secrets_management)**: Leaking secrets due to weak storage and access controls.
- **[Lack of Network Policies](/docs/attack_vectors/lack_of_network_policies)**: Allowing lateral movement within the cluster.
- **[Privileged Container Escape](/docs/attack_vectors/privileged_container_escape)**: Exploiting vulnerabilities to break out of a container and gain host access.
- **[Insecure RBAC Permissions](/docs/attack_vectors/insecure_rbac_permissions)**: Misconfigured Role-Based Access Control (RBAC) settings leading to unauthorized access.
- **[Exposed Kubelet API](/docs/attack_vectors/exposed_kubelet_api)**: Unauthorized access to Kubelet APIs allowing attackers to control nodes or pods.
- **[Supply Chain Attacks](/docs/attack_vectors/supply_chain_attacks)**: Injecting malicious code into container images or dependencies.
- **[Supply Chain Attacks - Compromised Helm Charts](/docs/attack_vectors/supply_chain_attacks)**: Deploying insecure or tampered Helm charts that introduce vulnerabilities.
- **[Unrestricted etcd Access](/docs/attack_vectors/unrestricted_etcd_access)**: Accessing etcd storage to retrieve secrets and cluster configurations.
- **[Cluster Takeover via Misconfigured Admission Controllers and Malicious Webhooks](/docs/attack_vectors/misconfigured_admission_controllers)**: Exploiting improperly secured admission controllers and webhooks to run unauthorized workloads.
- **[Denial of Service (DoS) Attacks](/docs/attack_vectors/ddos_attacks)**: Exploiting Kubernetes resource limits to exhaust cluster resources.
- **[Unrestricted HostPath Mounts](/docs/attack_vectors/unrestricted_hostpath_mounts)**: Allowing pods to mount the host filesystem, leading to potential system compromise.
<!-- - **[Ingress/Egress Traffic Hijacking](/docs/attack_vectors/traffic_hijacking)**: Manipulating misconfigured network policies to intercept or reroute cluster traffic. -->
- **[Exploiting Insecure CSI Drivers](/docs/attack_vectors/insecure_csi_drivers)**: Attacking Kubernetes Container Storage Interface (CSI) drivers to gain unauthorized access to persistent storage.
<!-- - **[Overly Privileged Service Accounts](/docs/attack_vectors/privileged_service_accounts)**: Granting excessive permissions to service accounts, leading to privilege escalation. -->
- **[Compromised Sidecars](/docs/attack_vectors/compromised_sidecars)**: Exploiting sidecar containers to attack the main application.

Each article provides **examples, real-world risks, and mitigation strategies** to help secure Kubernetes clusters against these threats.

---

## **Warning: Security Risk**

The information and the scripts included in this section are intended for **educational and security research purposes only**. They demonstrate how attackers exploit misconfigurations and vulnerabilities in Kubernetes clusters. Running these scripts on a production system or in an unauthorized environment can lead to **severe security breaches, data loss, and system compromise**.

Use this content only in a **controlled, isolated testing environment** where you have explicit permission. Misuse of this information may violate company policies or legal regulations.

**You are responsible for how you use this information. Proceed with caution.**
