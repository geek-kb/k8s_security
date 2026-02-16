---
sidebar_position: 8
title: "KBOM"
description: "KBOM (Kubernetes Bill of Materials) Toolkit generates comprehensive inventories of Kubernetes clusters, including components, images, and configurations."
keywords: [kubernetes security tool, KBOM, kubernetes bill of materials, inventory, cluster components, supply chain security, SBOM, asset management, CKS]
tags: [tool, supply-chain, inventory, CKS]
related:
  - /docs/best_practices/supply_chain_security/sbom/
  - /docs/best_practices/supply_chain_security/syft/
  - /docs/best_practices/supply_chain_security/supply_chain_best_practices/
---

# KBOM

**KBOM** (Kubernetes Bill of Materials) is a toolkit that generates comprehensive inventories of Kubernetes clusters. It produces a detailed manifest of all cluster components including control plane versions, container images, operators, and configurations. This inventory is essential for supply chain security, vulnerability management, and compliance.

KBOM helps answer questions like "What versions are running in my cluster?" and "Which images are deployed across all namespaces?"

---

## Use Cases

- Generate an inventory of all container images in a cluster.
- Track Kubernetes component versions for vulnerability management.
- Create compliance documentation for audits.
- Identify outdated or vulnerable components.
- Support incident response by providing a snapshot of cluster state.

---

## Installation

### Using kubectl krew

```bash
kubectl krew install kbom
```

### Using Go

```bash
go install github.com/ksoclabs/kbom@latest
```

### From GitHub Releases

```bash
curl -LO https://github.com/ksoclabs/kbom/releases/download/v0.3.0/kbom_linux_amd64.tar.gz
tar xzf kbom_linux_amd64.tar.gz
chmod +x kbom
sudo mv kbom /usr/local/bin/
```

---

## Usage Examples

### Generate Cluster KBOM

```bash
kubectl kbom generate
```

### Output as JSON

```bash
kubectl kbom generate -o json > kbom.json
```

### Output as YAML

```bash
kubectl kbom generate -o yaml > kbom.yaml
```

### Generate for Specific Namespace

```bash
kubectl kbom generate -n production
```

### Generate CycloneDX SBOM Format

```bash
kubectl kbom generate -o cyclonedx > cluster-sbom.json
```

### Generate SPDX Format

```bash
kubectl kbom generate -o spdx > cluster-sbom.spdx
```

---

## KBOM Components

### Cluster Information

```yaml
cluster:
  name: production-cluster
  version: v1.28.4
  platform: eks
  region: us-west-2
  nodes: 10
```

### Control Plane Components

```yaml
controlPlane:
  apiServer:
    version: v1.28.4
    image: registry.k8s.io/kube-apiserver:v1.28.4
  controllerManager:
    version: v1.28.4
    image: registry.k8s.io/kube-controller-manager:v1.28.4
  scheduler:
    version: v1.28.4
    image: registry.k8s.io/kube-scheduler:v1.28.4
  etcd:
    version: 3.5.9
```

### Node Components

```yaml
nodes:
  - name: node-1
    kubeletVersion: v1.28.4
    containerRuntime: containerd://1.7.2
    osImage: Amazon Linux 2
    kernelVersion: 5.10.192-183.736.amzn2.x86_64
```

### Workload Images

```yaml
images:
  - repository: nginx
    tag: 1.25.3
    digest: sha256:abc123...
    namespaces: [production, staging]
    pods: 15
  - repository: redis
    tag: 7.2.3
    digest: sha256:def456...
    namespaces: [production]
    pods: 3
```

---

## Example Output (JSON)

```json
{
  "metadata": {
    "generatedAt": "2024-01-15T10:30:00Z",
    "generator": "kbom",
    "version": "0.3.0"
  },
  "cluster": {
    "name": "production",
    "version": "v1.28.4",
    "nodeCount": 10
  },
  "components": [
    {
      "type": "container-image",
      "name": "nginx",
      "version": "1.25.3",
      "digest": "sha256:abc123def456...",
      "vulnerabilities": {
        "critical": 0,
        "high": 2,
        "medium": 5
      }
    }
  ],
  "addons": [
    {
      "name": "coredns",
      "version": "v1.10.1",
      "namespace": "kube-system"
    },
    {
      "name": "metrics-server",
      "version": "v0.6.4",
      "namespace": "kube-system"
    }
  ]
}
```

---

## Integration with Vulnerability Scanners

### Combine with Trivy

```bash
# Generate KBOM
kubectl kbom generate -o cyclonedx > kbom.json

# Scan KBOM with Trivy
trivy sbom kbom.json
```

### Combine with Grype

```bash
# Generate KBOM in CycloneDX format
kubectl kbom generate -o cyclonedx > kbom.json

# Scan with Grype
grype sbom:kbom.json
```

---

## CI/CD Integration

### GitHub Actions

```yaml
name: Cluster Inventory
on:
  schedule:
    - cron: '0 0 * * *'  # Daily

jobs:
  generate-kbom:
    runs-on: ubuntu-latest
    steps:
      - name: Configure kubeconfig
        run: |
          echo "${{ secrets.KUBECONFIG }}" > ~/.kube/config
          
      - name: Install KBOM
        run: |
          curl -LO https://github.com/ksoclabs/kbom/releases/latest/download/kbom_linux_amd64.tar.gz
          tar xzf kbom_linux_amd64.tar.gz
          chmod +x kbom
          
      - name: Generate KBOM
        run: ./kbom generate -o json > kbom.json
        
      - name: Upload KBOM
        uses: actions/upload-artifact@v3
        with:
          name: cluster-kbom
          path: kbom.json
```

---

## Best Practices

- **Generate regularly:** Create KBOMs on a schedule to track changes over time.
- **Store in version control:** Keep KBOM snapshots for historical reference and diff analysis.
- **Integrate with scanning:** Use KBOM output as input for vulnerability scanners.
- **Include in compliance reports:** KBOM provides evidence of component inventory for audits.
- **Compare across environments:** Diff KBOMs between staging and production to ensure consistency.

---

## Comparing KBOMs

Identify drift between environments or time periods:

```bash
# Generate KBOM at two points in time
kubectl kbom generate -o json > kbom-before.json
# ... make changes ...
kubectl kbom generate -o json > kbom-after.json

# Compare using jq
diff <(jq -S . kbom-before.json) <(jq -S . kbom-after.json)
```

---

## References

This article is based on information from the following official sources:

1. [KBOM GitHub Repository](https://github.com/ksoclabs/kbom) - KSOC Labs
2. [CycloneDX Specification](https://cyclonedx.org/specification/overview/) - OWASP
3. [SPDX Specification](https://spdx.dev/specifications/) - Linux Foundation
