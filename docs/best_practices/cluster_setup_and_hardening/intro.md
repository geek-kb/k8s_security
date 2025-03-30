---
sidebar_position: 1
title: "Introduction"
description: "Overview of cluster setup and hardening practices in Kubernetes, covering the critical domains necessary to build a secure and resilient environment."
sidebar_class_name: hidden
---

# Cluster Setup and Hardening

Securing a Kubernetes cluster begins with a hardened configuration across its core components. This section provides comprehensive best practices to secure the API server, control plane, network communication, nodes, pods, RBAC policies, secrets, and validates configurations. Each subsection maps to a common attack surface and includes mitigation guidance and practical tooling examples.

Following these practices reduces the risk of compromise, supports defense-in-depth, and helps meet compliance frameworks such as the CIS Kubernetes Benchmark.

---

## CIS Benchmarks

Use CIS Benchmarks to validate your cluster's security posture:

- [Understanding CIS Benchmarks](/docs/best_practices/cluster_setup_and_hardening/cis/understanding_cis_benchmarks)
- [CIS Benchmark for Kubernetes](/docs/best_practices/cluster_setup_and_hardening/cis/cis_benchmark_for_k8s)
- [CIS Benchmark with kube-bench](/docs/best_practices/cluster_setup_and_hardening/cis/cis_benchmark_kube_bench)

---

## API Server Security

Harden the Kubernetes API server to reduce exposure and control access:

- [Compromised API Server Mitigation](/docs/best_practices/cluster_setup_and_hardening/api_server_security/compromised_api_server_mitigation)
- [Misconfigured Admission Controllers Mitigation](/docs/best_practices/cluster_setup_and_hardening/api_server_security/misconfigured_admission_controllers_mitigation)
- [OPA/Gatekeeper](/docs/best_practices/cluster_setup_and_hardening/api_server_security/opa_gatekeeper)
- [Kyverno](/docs/best_practices/cluster_setup_and_hardening/api_server_security/kyverno)

---

## Control Plane Security

Protect the cluster's core components and maintain data integrity:

- [etcd Security Mitigation](/docs/best_practices/cluster_setup_and_hardening/control_plane_security/etcd_security_mitigation)

---

## Network Security

Control traffic flow, minimize exposure, and secure ingress/egress:

- [DDoS Mitigation](/docs/best_practices/cluster_setup_and_hardening/network_security/ddos_mitigation)
- [DNS Security](/docs/best_practices/cluster_setup_and_hardening/network_security/dns_security)
- [Egress Control](/docs/best_practices/cluster_setup_and_hardening/network_security/egress_control)
- [Exposed Dashboard Mitigation](/docs/best_practices/cluster_setup_and_hardening/network_security/exposed_dashboard_mitigation)
- [Ingress Security](/docs/best_practices/cluster_setup_and_hardening/network_security/ingress_security)
- [Network Policies](/docs/best_practices/cluster_setup_and_hardening/network_security/network_policies)
- [Service Mesh Security](/docs/best_practices/cluster_setup_and_hardening/network_security/service_mesh_security)
- [Traffic Hijacking Mitigation](/docs/best_practices/cluster_setup_and_hardening/network_security/traffic_hijacking_mitigation)
- [Kube-Hunter](/docs/best_practices/cluster_setup_and_hardening/network_security/kube_hunter)
- [Cilium](/docs/best_practices/cluster_setup_and_hardening/network_security/cilium)
- [Calico](/docs/best_practices/cluster_setup_and_hardening/network_security/calico)
- [Kong](/docs/best_practices/cluster_setup_and_hardening/network_security/kong)

---

## Node Security

Secure the infrastructure running your workloads:

- [Kubelet Security](/docs/best_practices/cluster_setup_and_hardening/node_security/kubelet_security)

---

## Pod Security

Enforce strict security boundaries within workloads:

- [AppArmor Profiles](/docs/best_practices/cluster_setup_and_hardening/pod_security/app_armor_profiles)
- [Compromised Sidecars Mitigation](/docs/best_practices/cluster_setup_and_hardening/pod_security/compromised_sidecars_mitigation)
- [Container Escape Mitigation](/docs/best_practices/cluster_setup_and_hardening/pod_security/container_escape_mitigation)
- [CSI Driver Mitigation](/docs/best_practices/cluster_setup_and_hardening/pod_security/csi_driver_mitigation)
- [Pod Sandboxing](/docs/best_practices/cluster_setup_and_hardening/pod_security/pod_sandboxing)
- [Pod Security Standards](/docs/best_practices/cluster_setup_and_hardening/pod_security/pod_security_standards)
- [Seccomp in Pods](/docs/best_practices/cluster_setup_and_hardening/pod_security/seccomp_in_pods)
- [Unrestricted hostPath Mitigation](/docs/best_practices/cluster_setup_and_hardening/pod_security/unrestricted_hostpath_mitigation)
- [KubeAudit](/docs/best_practices/cluster_setup_and_hardening/pod_security/kubeaudit)

---

## RBAC and Identity

Use identity-aware access controls to enforce least privilege:

- [Insecure RBAC Permissions Mitigation](/docs/best_practices/cluster_setup_and_hardening/rbac_and_identity/insecure_rbac_permissions_mitigation)
- [Service Account Mitigation](/docs/best_practices/cluster_setup_and_hardening/rbac_and_identity/service_account_mitigation)

---

## Secrets Management

Protect sensitive credentials and reduce the blast radius of compromise:

- [Insecure Secrets Management Mitigation](/docs/best_practices/cluster_setup_and_hardening/secrets_management/insecure_secrets_management_mitigation)
- [Mozilla SOPS](/docs/best_practices/cluster_setup_and_hardening/secrets_management/mozilla_sops)
- [Sealed Secrets](/docs/best_practices/cluster_setup_and_hardening/secrets_management/sealed_secrets)

---

## Configuration Validation

Validate YAML manifests and infrastructure code for misconfigurations before deployment:

- [Kube-Score](/docs/best_practices/cluster_setup_and_hardening/configuration_validation/kube_score)
- [Kubescape](/docs/best_practices/cluster_setup_and_hardening/configuration_validation/kubescape)
- [Polaris](/docs/best_practices/cluster_setup_and_hardening/configuration_validation/polaris)
- [Kube-Linter](/docs/best_practices/cluster_setup_and_hardening/configuration_validation/kube_linter)
- [Checkov](/docs/best_practices/cluster_setup_and_hardening/configuration_validation/checkov)
- [Conftest](/docs/best_practices/cluster_setup_and_hardening/configuration_validation/conftest)
- [Terrascan](/docs/best_practices/cluster_setup_and_hardening/configuration_validation/terrascan)

---

## Conclusion

Cluster setup and hardening is the foundation of Kubernetes security. Addressing the risks in each layer — from API access to pod isolation — allows you to build a resilient and secure infrastructure. The articles in this section provide actionable guidance to harden your cluster and protect against real-world threats.
