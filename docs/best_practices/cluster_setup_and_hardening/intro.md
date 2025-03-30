---
sidebar_position: 1
title: "Introduction"
description: "Overview of cluster setup and hardening practices in Kubernetes, covering the critical domains necessary to build a secure and resilient environment."
sidebar_class_name: hidden
---

# Cluster Setup and Hardening

Securing a Kubernetes cluster begins with a hardened configuration across its core components. This section provides comprehensive best practices to secure the control plane, API server, network communication, nodes, pods, and access control mechanisms. Each subsection maps to a common attack surface and includes mitigation guidance and practical tooling examples.

Following these practices reduces the risk of compromise, supports defense-in-depth, and helps meet compliance frameworks such as the CIS Kubernetes Benchmark.

---

## API Server Security

Harden the Kubernetes API server to reduce exposure and control access:

- [Compromised API Server Mitigation](/docs/best_practices/cluster_setup_and_hardening/api_server_security/compromised_api_server_mitigation)  
  Identifies common API server attack paths and ways to protect the control plane interface.
- [Misconfigured Admission Controllers Mitigation](/docs/best_practices/cluster_setup_and_hardening/api_server_security/misconfigured_admission_controllers_mitigation)  
  Secures admission control plugins to prevent insecure resource creation.
- [OPA/Gatekeeper](/docs/best_practices/cluster_setup_and_hardening/api_server_security/opa_gatekeeper)  
  Defines and enforces custom policies at admission time.
- [Kyverno](/docs/best_practices/cluster_setup_and_hardening/api_server_security/kyverno)  
  A Kubernetes-native policy engine for validation, mutation, and generation.

---

## CIS

Use CIS Benchmarks to validate your cluster's security posture:

- [Understanding CIS Benchmarks](/docs/best_practices/cluster_setup_and_hardening/cis/understanding_cis_benchmarks)  
  Overview of the CIS framework, structure, and importance in Kubernetes.
- [CIS Benchmark for Kubernetes](/docs/best_practices/cluster_setup_and_hardening/cis/cis_benchmark_for_k8s)  
  Manual hardening guidance for API server, etcd, kubelet, and scheduler.
- [CIS Benchmark with kube-bench](/docs/best_practices/cluster_setup_and_hardening/cis/cis_benchmark_kube_bench)  
  Using `kube-bench` to run automated checks for CIS compliance.

---

## Configuration Validation

Validate YAML manifests and infrastructure code for misconfigurations before deployment:

- [Kube-Score](/docs/best_practices/cluster_setup_and_hardening/configuration_validation/kube_score)  
  Scores manifests based on configuration quality and best practices.
- [Kubescape](/docs/best_practices/cluster_setup_and_hardening/configuration_validation/kubescape)  
  Scans Kubernetes clusters for misconfigurations and compliance violations.
- [Polaris](/docs/best_practices/cluster_setup_and_hardening/configuration_validation/polaris)  
  Checks Kubernetes manifests and live clusters for reliability and security issues.
- [Kube-Linter](/docs/best_practices/cluster_setup_and_hardening/configuration_validation/kube_linter)  
  Identifies incorrect or insecure configurations in YAML files.
- [Checkov](/docs/best_practices/cluster_setup_and_hardening/configuration_validation/checkov)  
  Static analysis for Kubernetes and Terraform configuration files.
- [Conftest](/docs/best_practices/cluster_setup_and_hardening/configuration_validation/conftest)  
  Uses OPA to validate Kubernetes manifests as part of CI/CD workflows.
- [Terrascan](/docs/best_practices/cluster_setup_and_hardening/configuration_validation/terrascan)  
  Scans Terraform and Kubernetes configurations for security violations.

---

## Control Plane Security

Protect the cluster's core components and maintain data integrity:

- [etcd Security Mitigation](/docs/best_practices/cluster_setup_and_hardening/control_plane_security/etcd_security_mitigation)  
  Encrypt and restrict access to etcd, the Kubernetes key-value store.

---

## Network Security

Control traffic flow, minimize exposure, and secure ingress/egress:

- [DDoS Mitigation](/docs/best_practices/cluster_setup_and_hardening/network_security/ddos_mitigation)  
  Prevent denial-of-service attacks using rate limits and protection mechanisms.
- [DNS Security](/docs/best_practices/cluster_setup_and_hardening/network_security/dns_security)  
  Harden CoreDNS and internal name resolution.
- [Egress Control](/docs/best_practices/cluster_setup_and_hardening/network_security/egress_control)  
  Limit external access from workloads to reduce data exfiltration risk.
- [Exposed Dashboard Mitigation](/docs/best_practices/cluster_setup_and_hardening/network_security/exposed_dashboard_mitigation)  
  Restrict and secure access to the Kubernetes Dashboard.
- [Ingress Security](/docs/best_practices/cluster_setup_and_hardening/network_security/ingress_security)  
  Apply protections at the ingress layer for authentication and filtering.
- [Network Policies](/docs/best_practices/cluster_setup_and_hardening/network_security/network_policies)  
  Define pod-level traffic rules to isolate services.
- [Service Mesh Security](/docs/best_practices/cluster_setup_and_hardening/network_security/service_mesh_security)  
  Use service mesh controls for mutual TLS and policy enforcement.
- [Traffic Hijacking Mitigation](/docs/best_practices/cluster_setup_and_hardening/network_security/traffic_hijacking_mitigation)  
  Prevent redirection or injection attacks at the network level.
- [Kube-Hunter](/docs/best_practices/cluster_setup_and_hardening/network_security/kube_hunter)  
  Run penetration testing against your cluster to identify exposure.
- [Cilium](/docs/best_practices/cluster_setup_and_hardening/network_security/cilium)  
  eBPF-based networking with fine-grained visibility and policy enforcement.
- [Calico](/docs/best_practices/cluster_setup_and_hardening/network_security/calico)  
  Enforce ingress/egress network policies with minimal overhead.
- [Kong](/docs/best_practices/cluster_setup_and_hardening/network_security/kong)  
  Gateway and API management with advanced traffic controls.

---

## Node Security

Secure the infrastructure running your workloads:

- [Kubelet Security](/docs/best_practices/cluster_setup_and_hardening/node_security/kubelet_security)  
  Disable anonymous access and protect kubelet APIs.

---

## Pod Security

Enforce strict security boundaries within workloads:

- [AppArmor Profiles](/docs/best_practices/cluster_setup_and_hardening/pod_security/app_armor_profiles)  
  Apply syscall restrictions through AppArmor policies.
- [Compromised Sidecars Mitigation](/docs/best_practices/cluster_setup_and_hardening/pod_security/compromised_sidecars_mitigation)  
  Prevent lateral movement via insecure sidecars.
- [Container Escape Mitigation](/docs/best_practices/cluster_setup_and_hardening/pod_security/container_escape_mitigation)  
  Detect and block breakout attempts from containers to the host.
- [CSI Driver Mitigation](/docs/best_practices/cluster_setup_and_hardening/pod_security/csi_driver_mitigation)  
  Limit the capabilities of custom storage drivers.
- [Pod Sandboxing](/docs/best_practices/cluster_setup_and_hardening/pod_security/pod_sandboxing)  
  Isolate pods with technologies like gVisor or Kata Containers.
- [Pod Security Standards](/docs/best_practices/cluster_setup_and_hardening/pod_security/pod_security_standards)  
  Enforce Baseline and Restricted policies with Pod Security Admission.
- [Seccomp in Pods](/docs/best_practices/cluster_setup_and_hardening/pod_security/seccomp_in_pods)  
  Block dangerous syscalls using Seccomp profiles.
- [Unrestricted hostPath Mitigation](/docs/best_practices/cluster_setup_and_hardening/pod_security/unrestricted_hostpath_mitigation)  
  Prevent mounting arbitrary host directories.
- [KubeAudit](/docs/best_practices/cluster_setup_and_hardening/pod_security/kubeaudit)  
  Audit pods and controllers for misconfigured security contexts.

---

## RBAC and Identity

Use identity-aware access controls to enforce least privilege:

- [Insecure RBAC Permissions Mitigation](/docs/best_practices/cluster_setup_and_hardening/rbac_and_identity/insecure_rbac_permissions_mitigation)  
  Avoid privilege escalation via role misconfiguration.
- [Service Account Mitigation](/docs/best_practices/cluster_setup_and_hardening/rbac_and_identity/service_account_mitigation)  
  Secure service accounts and restrict token usage.

---

## Secrets Management

Protect sensitive credentials and reduce the blast radius of compromise:

- [Insecure Secrets Management Mitigation](/docs/best_practices/cluster_setup_and_hardening/secrets_management/insecure_secrets_management_mitigation)  
  Encrypt secrets and restrict access via RBAC.
- [Mozilla SOPS](/docs/best_practices/cluster_setup_and_hardening/secrets_management/mozilla_sops)  
  Encrypt secrets for GitOps workflows using KMS, PGP, or GCP/AWS integrations.
- [Sealed Secrets](/docs/best_practices/cluster_setup_and_hardening/secrets_management/sealed_secrets)  
  Use Bitnami’s controller to safely store secrets encrypted in Git.

---

## Conclusion

Cluster setup and hardening is the foundation of Kubernetes security. Addressing the risks in each layer — from API access to pod isolation — allows you to build a resilient and secure infrastructure. The articles in this section provide actionable guidance to harden your cluster and protect against real-world threats.
