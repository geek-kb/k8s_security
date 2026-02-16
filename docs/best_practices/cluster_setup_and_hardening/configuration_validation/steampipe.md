---
sidebar_position: 11
title: "Steampipe for Kubernetes"
description: "Steampipe enables SQL-based querying of Kubernetes resources and compliance scanning using the steampipe-kubernetes plugin and compliance mod."
keywords: [kubernetes security tool, steampipe, SQL queries, kubernetes compliance, security assessment, CIS benchmark, NSA hardening, cloud security, configuration audit, CKS]
tags: [tool, configuration-validation, compliance, CKS]
related:
  - /docs/best_practices/cluster_setup_and_hardening/configuration_validation/kubescape/
  - /docs/best_practices/cluster_setup_and_hardening/cis/cis_benchmark_kube_bench/
  - /docs/best_practices/cluster_setup_and_hardening/cis/understanding_cis_benchmarks/
---

# Steampipe for Kubernetes

**Steampipe** is an open-source tool that enables SQL-based querying of cloud services and infrastructure. With the **steampipe-kubernetes** plugin, you can query Kubernetes resources using standard SQL. The **kubernetes-compliance** mod provides ready-to-use security benchmarks including CIS, NSA/CISA, and other compliance frameworks.

This combination allows security teams to run complex queries across Kubernetes clusters and generate compliance reports using familiar SQL syntax.

---

## Components

### Steampipe Core

The base engine that executes SQL queries against various plugins.

### steampipe-kubernetes Plugin

Exposes Kubernetes resources as SQL tables (pods, deployments, services, etc.).

### kubernetes-compliance Mod

Pre-built compliance checks for CIS Kubernetes Benchmark, NSA/CISA hardening guide, and more.

---

## Installation

### Install Steampipe

```bash
# macOS
brew install turbot/tap/steampipe

# Linux
sudo /bin/sh -c "$(curl -fsSL https://raw.githubusercontent.com/turbot/steampipe/main/install.sh)"
```

### Install Kubernetes Plugin

```bash
steampipe plugin install kubernetes
```

### Install Compliance Mod

```bash
git clone https://github.com/turbot/steampipe-mod-kubernetes-compliance.git
cd steampipe-mod-kubernetes-compliance
```

---

## Configuration

### Configure Kubernetes Connection

Create or edit `~/.steampipe/config/kubernetes.spc`:

```hcl
connection "kubernetes" {
  plugin = "kubernetes"
  
  # Use current kubeconfig context
  config_path = "~/.kube/config"
  
  # Or specify a specific context
  # config_context = "my-cluster"
}
```

### Multiple Clusters

```hcl
connection "prod" {
  plugin = "kubernetes"
  config_path = "~/.kube/config"
  config_context = "production-cluster"
}

connection "staging" {
  plugin = "kubernetes"
  config_path = "~/.kube/config"
  config_context = "staging-cluster"
}
```

---

## SQL Queries

### Start Interactive Query Mode

```bash
steampipe query
```

### List All Pods

```sql
SELECT 
  namespace,
  name,
  phase
FROM kubernetes_pod;
```

### Find Privileged Containers

```sql
SELECT 
  namespace,
  name,
  c ->> 'name' AS container_name
FROM 
  kubernetes_pod,
  jsonb_array_elements(containers) AS c
WHERE 
  c -> 'securityContext' ->> 'privileged' = 'true';
```

### Find Pods Without Resource Limits

```sql
SELECT 
  namespace,
  name,
  c ->> 'name' AS container_name
FROM 
  kubernetes_pod,
  jsonb_array_elements(containers) AS c
WHERE 
  c -> 'resources' -> 'limits' IS NULL;
```

### Find Pods Running as Root

```sql
SELECT 
  namespace,
  name
FROM kubernetes_pod
WHERE 
  security_context ->> 'runAsUser' = '0'
  OR security_context ->> 'runAsNonRoot' = 'false';
```

### List Services Exposed via LoadBalancer

```sql
SELECT 
  namespace,
  name,
  type,
  cluster_ip,
  external_ips
FROM kubernetes_service
WHERE type = 'LoadBalancer';
```

### Find Pods with Host Network Access

```sql
SELECT 
  namespace,
  name
FROM kubernetes_pod
WHERE host_network = true;
```

---

## Compliance Scanning

### Run All CIS Benchmarks

```bash
cd steampipe-mod-kubernetes-compliance
steampipe check benchmark.cis_v170
```

### Run NSA/CISA Hardening Checks

```bash
steampipe check benchmark.nsa_cisa_v1
```

### Run Specific Control

```bash
steampipe check control.pod_container_privilege_disabled
```

### Export Results as HTML

```bash
steampipe check benchmark.cis_v170 --export=report.html
```

### Export Results as JSON

```bash
steampipe check benchmark.cis_v170 --export=report.json
```

### Export Results as CSV

```bash
steampipe check benchmark.cis_v170 --export=report.csv
```

---

## Available Benchmarks

### CIS Kubernetes Benchmark v1.7.0

| Section | Description |
|---------|-------------|
| 1. Control Plane | API server, scheduler, controller manager |
| 2. etcd | etcd configuration |
| 3. Control Plane Configuration | Authentication, authorization |
| 4. Worker Nodes | kubelet, proxy configuration |
| 5. Policies | RBAC, network policies, secrets |

### NSA/CISA Kubernetes Hardening Guide

| Category | Controls |
|----------|----------|
| Pod Security | Privileged containers, capabilities, host namespaces |
| Network Hardening | Network policies, ingress security |
| Authentication & Authorization | RBAC, service accounts |
| Audit Logging | Audit policy configuration |
| Upgrades & Patching | Version currency |

---

## Custom Queries for Security

### RBAC Analysis

```sql
-- Find cluster-admin bindings
SELECT 
  name,
  role_name,
  subject_kind,
  subject_name
FROM kubernetes_cluster_role_binding
WHERE role_name = 'cluster-admin';

-- Find roles with wildcard permissions
SELECT 
  name,
  namespace,
  rules
FROM kubernetes_role
WHERE rules::text LIKE '%"*"%';
```

### Network Security

```sql
-- Namespaces without network policies
SELECT namespace
FROM kubernetes_namespace
WHERE namespace NOT IN (
  SELECT DISTINCT namespace 
  FROM kubernetes_network_policy
);
```

### Secret Security

```sql
-- Find secrets in default namespace
SELECT name, type
FROM kubernetes_secret
WHERE namespace = 'default';

-- Find pods mounting secrets
SELECT 
  namespace,
  name,
  v ->> 'name' AS volume_name
FROM 
  kubernetes_pod,
  jsonb_array_elements(volumes) AS v
WHERE v -> 'secret' IS NOT NULL;
```

---

## CI/CD Integration

### GitHub Actions

```yaml
name: Kubernetes Compliance
on: [push, pull_request]

jobs:
  compliance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Install Steampipe
        run: |
          sudo /bin/sh -c "$(curl -fsSL https://raw.githubusercontent.com/turbot/steampipe/main/install.sh)"
          steampipe plugin install kubernetes
          
      - name: Run compliance checks
        run: |
          git clone https://github.com/turbot/steampipe-mod-kubernetes-compliance.git
          cd steampipe-mod-kubernetes-compliance
          steampipe check benchmark.cis_v170 --export=results.json
          
      - name: Upload results
        uses: actions/upload-artifact@v3
        with:
          name: compliance-report
          path: steampipe-mod-kubernetes-compliance/results.json
```

---

## Best Practices

- **Schedule regular scans:** Run compliance checks on a schedule to detect drift.
- **Focus on failed controls:** Prioritize fixing failed checks, especially critical ones.
- **Use multiple benchmarks:** Combine CIS and NSA/CISA checks for comprehensive coverage.
- **Export and track:** Export results over time to measure security improvements.
- **Create custom queries:** Build organization-specific queries for unique security requirements.

---

## References

This article is based on information from the following official sources:

1. [Steampipe Documentation](https://steampipe.io/docs) - Turbot
2. [steampipe-kubernetes Plugin](https://hub.steampipe.io/plugins/turbot/kubernetes) - Steampipe Hub
3. [kubernetes-compliance Mod](https://hub.steampipe.io/mods/turbot/kubernetes_compliance) - Steampipe Hub
4. [CIS Kubernetes Benchmark](https://www.cisecurity.org/benchmark/kubernetes) - CIS
