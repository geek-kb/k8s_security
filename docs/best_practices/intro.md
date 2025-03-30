---
title: "Introduction"
description: "Explore best practices for securing Kubernetes environments across cluster setup, system hardening, microservice security, runtime monitoring, and supply chain protection."
sidebar_position: 1
unlisted: true
sidebar_class_name: hidden
---

**This category is still under development**

# Kubernetes Security Best Practices

Securing Kubernetes environments requires a defense-in-depth approach that spans the cluster lifecycle, from initial setup to daily operations and software supply chain hygiene. This section provides practical guidance organized by domain, helping you harden your infrastructure, reduce workload risks, and enforce security controls consistently.

---

## Cluster Setup and Hardening

Secure your Kubernetes control plane, nodes, network, and workload configurations using battle-tested best practices and compliance-focused frameworks.

- [Intro to Cluster Setup and Hardening](/docs/best_practices/cluster_setup_and_hardening/intro)
- [Understanding CIS Benchmarks](/docs/best_practices/cluster_setup_and_hardening/cis/understanding_cis_benchmarks)
- [CIS Benchmarks for Kubernetes](/docs/best_practices/cluster_setup_and_hardening/cis/cis_benchmark_for_k8s)
- [Kube-Bench: Kubernetes CIS Benchmarking Tool](/docs/best_practices/cluster_setup_and_hardening/cis/cis_benchmark_kube_bench)

Subcategories:

- [API Server Security](/docs/best_practices/cluster_setup_and_hardening/api_server_security/compromised_api_server_mitigation)
- [Control Plane Security](/docs/best_practices/cluster_setup_and_hardening/control_plane_security/etcd_security_mitigation)
- [Node Security](/docs/best_practices/cluster_setup_and_hardening/node_security/kubelet_security)
- [Network Security](/docs/best_practices/cluster_setup_and_hardening/network_security/intro)
- [Pod Security](/docs/best_practices/cluster_setup_and_hardening/pod_security/app_armor_profiles)
- [RBAC and Identity](/docs/best_practices/cluster_setup_and_hardening/rbac_and_identity/insecure_rbac_permissions_mitigation)
- [Secrets Management](/docs/best_practices/cluster_setup_and_hardening/secrets_management/insecure_secrets_management_mitigation)

---

## System Hardening

Apply OS-level and infrastructure-layer protections to secure the nodes running your Kubernetes workloads.

- [System Hardening Overview](/docs/best_practices/system_hardening/intro)

---

## Minimize Microservice Vulnerabilities

Reduce security risks introduced by applications and workloads inside your cluster.

- [Microservice Security Overview](/docs/best_practices/minimize_microservice_vulnerabilities/intro)

---

## Monitoring, Logging, and Runtime Security

Ensure continuous visibility and threat detection within your Kubernetes environment.

- [Monitoring and Runtime Security Overview](/docs/best_practices/monitoring_logging_and_runtime_security/intro)

---

## Securing the Kubernetes Supply Chain

Protect the integrity of the software your cluster builds and runs, from image creation to deployment.

- [Supply Chain Mitigation](/docs/best_practices/supply_chain_security/intro)

---

## Conclusion

The best practices in this section provide actionable guidance to help teams reduce risk across every layer of the Kubernetes stack. Use them to build secure-by-default clusters, defend against evolving threats, and align with modern cloud-native security principles.
