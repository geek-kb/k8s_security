---
title: "Intro"
sidebar_position: 1
description: "Guidelines and best practices for securing Kubernetes clusters, covering CIS benchmarks, control plane and node hardening, network policies, RBAC, and secrets management."
---

# Cluster Setup and Hardening

A secure Kubernetes deployment starts with properly configuring and hardening all layers of the cluster. This includes the control plane, node infrastructure, networking, identity and access management, pod configuration, and secret storage.

This section offers structured guidance to help teams reduce the attack surface, enforce strong security controls, and align with industry standards such as the CIS Kubernetes Benchmark.

---

## Topics Covered

### Benchmarks and Compliance

- [Understanding CIS Benchmarks](/docs/best_practices/cluster_setup_and_hardening/what_are_cis_benchmarks)  
  Overview of CIS Benchmarks and how they apply to Kubernetes security.

- [CIS Benchmarks for Kubernetes](/docs/best_practices/cluster_setup_and_hardening/cis_benchmark_for_k8s)  
  A detailed look at the benchmark requirements and their implications.

- [Kube-Bench: Kubernetes CIS Benchmarking Tool](/docs/best_practices/cluster_setup_and_hardening/cis_benchmark_kube_bench)  
  How to use the kube-bench tool to automate CIS benchmark checks.

### API Server Security

- [API Server Security](/docs/best_practices/cluster_setup_and_hardening/api_server_security/compromised_api_server_mitigation)  
  Secure the Kubernetes API server by restricting access and configuring it securely.

- [Mitigating Misconfigured Admission Controllers](/docs/best_practices/cluster_setup_and_hardening/api_server_security/misconfigured_admission_controllers_mitigation)  
  Reduce risk by controlling which resources are allowed into the cluster.

### Control Plane Security

- [etcd Security Mitigation](/docs/best_practices/cluster_setup_and_hardening/control_plane_security/etcd_security_mitigation)  
  Protect etcd access, enable encryption, and secure communication with the control plane.

### Network Security

- [Intro to Network Security](/docs/best_practices/cluster_setup_and_hardening/network_security/intro)  
  Overview of network security strategies in Kubernetes.

- [Network Policies](/docs/best_practices/cluster_setup_and_hardening/network_security/network_policies)  
  Restrict traffic between pods to enforce network boundaries.

- [Egress Control](/docs/best_practices/cluster_setup_and_hardening/network_security/egress_control)  
  Limit outbound traffic from pods to prevent data exfiltration.

- [Ingress Security](/docs/best_practices/cluster_setup_and_hardening/network_security/ingress_security)  
  Secure public-facing services and protect ingress controllers.

- [Service Mesh Security](/docs/best_practices/cluster_setup_and_hardening/network_security/service_mesh_security)  
  Use service mesh features like mTLS and traffic control for internal security.

- [DNS Security](/docs/best_practices/cluster_setup_and_hardening/network_security/dns_security)  
  Secure CoreDNS and protect internal service discovery.

- [Exposed Dashboard Mitigation](/docs/best_practices/cluster_setup_and_hardening/network_security/exposed_dashboard_mitigation)  
  Prevent unauthorized access to the Kubernetes Dashboard.

- [DDoS Mitigation](/docs/best_practices/cluster_setup_and_hardening/network_security/ddos_mitigation)  
  Defend against denial-of-service attacks targeting services or ingress points.

- [Traffic Hijacking Mitigation](/docs/best_practices/cluster_setup_and_hardening/network_security/traffic_hijacking_mitigation)  
  Prevent malicious redirection or interception of cluster traffic.

### Node Security

- [Kubelet Security](/docs/best_practices/cluster_setup_and_hardening/node_security/kubelet_security)  
  Harden the Kubelet by disabling insecure ports and enforcing strong authorization.

### Pod Security

- [AppArmor Profiles](/docs/best_practices/cluster_setup_and_hardening/pod_security/app_armor_profiles)  
  Restrict container behavior at the syscall level using AppArmor.

- [Compromised Sidecars Mitigation](/docs/best_practices/cluster_setup_and_hardening/pod_security/compromised_sidecars_mitigation)  
  Prevent privilege escalation through untrusted or misbehaving sidecars.

- [Container Escape Mitigation](/docs/best_practices/cluster_setup_and_hardening/pod_security/container_escape_mitigation)  
  Protect against attacks that attempt to escape from containers to the host.

- [CSI Driver Mitigation](/docs/best_practices/cluster_setup_and_hardening/pod_security/csi_driver_mitigation)  
  Avoid misusing CSI drivers that may expose host-level access.

- [Pod Sandboxing](/docs/best_practices/cluster_setup_and_hardening/pod_security/pod_sandboxing)  
  Isolate workloads using technologies like gVisor or Kata Containers.

- [Pod Security Standards](/docs/best_practices/cluster_setup_and_hardening/pod_security/pod_security_standards)  
  Apply Kubernetes native pod security enforcement using built-in standards.

- [Seccomp in Pods](/docs/best_practices/cluster_setup_and_hardening/pod_security/seccomp_in_pods)  
  Use Seccomp to limit available syscalls to containers.

- [Unrestricted hostPath Mitigation](/docs/best_practices/cluster_setup_and_hardening/pod_security/unrestricted_hostpath_mitigation)  
  Prevent containers from mounting arbitrary host paths.

### RBAC and Identity

- [Insecure RBAC Permissions Mitigation](/docs/best_practices/cluster_setup_and_hardening/rbac_and_identity/insecure_rbac_permissions_mitigation)  
  Enforce least privilege and avoid wildcard permissions in roles and bindings.

- [Service Account Mitigation](/docs/best_practices/cluster_setup_and_hardening/rbac_and_identity/service_account_mitigation)  
  Secure workload identity by restricting token usage and permissions.

### Secrets Management

- [Insecure Secrets Management Mitigation](/docs/best_practices/cluster_setup_and_hardening/secrets_management/insecure_secrets_management_mitigation)  
  Enable encryption at rest, use RBAC for access control, and integrate with secure external secret stores.
