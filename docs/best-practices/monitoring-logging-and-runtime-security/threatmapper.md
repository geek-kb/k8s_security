---
sidebar_position: 9
title: "Deepfence ThreatMapper"
description: "Deepfence ThreatMapper is a runtime vulnerability scanner that discovers threats across Kubernetes clusters, VMs, containers, and serverless environments."
keywords: [kubernetes security tool, threatmapper, deepfence, runtime security, vulnerability scanning, threat detection, container security, cloud security, runtime protection, CKS]
tags: [tool, runtime-security, vulnerability-scanning, CKS]
related:
  - /kubernetes-security/best-practices/monitoring-logging-and-runtime-security/falco/
  - /kubernetes-security/best-practices/monitoring-logging-and-runtime-security/trivy/
  - /kubernetes-security/best-practices/supply-chain-security/supply-chain-best-practices/
---

# Deepfence ThreatMapper

**Deepfence ThreatMapper** is an open-source platform for runtime vulnerability management and threat detection across Kubernetes clusters, virtual machines, containers, and serverless environments. It provides continuous visibility into security posture by scanning running workloads for vulnerabilities, secrets, and misconfigurations.

ThreatMapper correlates findings across your infrastructure to prioritize the most critical threats based on runtime context and attack paths.

---

## Key Features

- **Vulnerability scanning** of running containers and hosts.
- **Secret scanning** to detect exposed credentials and API keys.
- **Compliance posture** assessment against CIS benchmarks.
- **Attack path visualization** showing how threats can propagate.
- **Multi-cloud support** for AWS, GCP, Azure, and on-premises.
- **Runtime threat detection** using eBPF-based sensors.

---

## Architecture

ThreatMapper consists of:

### Management Console

Web-based UI for visualization, configuration, and reporting.

### ThreatMapper Sensors

Lightweight agents deployed as DaemonSets on Kubernetes nodes that collect data and perform scans.

### Backend Services

Storage, correlation, and analysis engines (typically deployed via Docker Compose or Helm).

---

## Installation

### Deploy Management Console

```bash
# Clone the repository
git clone https://github.com/deepfence/ThreatMapper.git
cd ThreatMapper/deployment-scripts/docker-compose

# Start the console
docker-compose up -d
```

Access the console at `https://localhost:443`

### Deploy on Kubernetes (Helm)

```bash
helm repo add deepfence https://deepfence-helm-charts.s3.amazonaws.com/threatmapper
helm install threatmapper-console deepfence/deepfence-console --namespace deepfence --create-namespace
```

### Deploy Sensors on Kubernetes

```bash
helm install threatmapper-agent deepfence/deepfence-agent \
  --namespace deepfence \
  --set managementConsoleUrl=<console-ip> \
  --set deepfenceKey=<your-api-key>
```

### Deploy Sensors (kubectl)

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: deepfence-agent
  namespace: deepfence
spec:
  selector:
    matchLabels:
      app: deepfence-agent
  template:
    metadata:
      labels:
        app: deepfence-agent
    spec:
      hostPID: true
      hostNetwork: true
      containers:
        - name: deepfence-agent
          image: deepfenceio/deepfence_agent_ce:latest
          securityContext:
            privileged: true
          env:
            - name: MGMT_CONSOLE_URL
              value: "<console-ip>"
            - name: DEEPFENCE_KEY
              value: "<your-api-key>"
            - name: USER_DEFINED_TAGS
              value: "environment:production"
          volumeMounts:
            - name: docker-sock
              mountPath: /var/run/docker.sock
            - name: containerd-sock
              mountPath: /run/containerd/containerd.sock
      volumes:
        - name: docker-sock
          hostPath:
            path: /var/run/docker.sock
        - name: containerd-sock
          hostPath:
            path: /run/containerd/containerd.sock
```

---

## Vulnerability Scanning

### Start a Vulnerability Scan

1. Navigate to the ThreatMapper console.
2. Select **Topology** to view your infrastructure.
3. Select a container, image, or host.
4. Click **Start Vulnerability Scan**.

### CLI Scanning

```bash
# Scan a container image
docker run -it --rm \
  -v /var/run/docker.sock:/var/run/docker.sock \
  deepfenceio/deepfence_package_scanner_ce:latest \
  --image-name nginx:latest
```

### Scan Output

Results include:

| Field | Description |
|-------|-------------|
| CVE ID | Vulnerability identifier |
| Severity | Critical, High, Medium, Low |
| Package | Affected package name and version |
| Fix Version | Version with the fix (if available) |
| CVSS Score | Numerical severity score |

---

## Secret Scanning

ThreatMapper detects exposed secrets including:

- API keys and tokens
- AWS/GCP/Azure credentials
- SSH private keys
- Database passwords
- TLS certificates and keys

### Enable Secret Scanning

Secret scanning runs alongside vulnerability scans. Enable in the console under **Settings > Scan Options**.

---

## Compliance Scanning

### Available Compliance Frameworks

- CIS Kubernetes Benchmark
- CIS Docker Benchmark
- HIPAA
- PCI-DSS
- SOC 2
- GDPR
- NIST

### Run Compliance Check

1. Navigate to **Compliance** in the console.
2. Select the target (cluster, host, or container).
3. Choose the compliance framework.
4. Start the compliance scan.

---

## Attack Path Analysis

ThreatMapper correlates vulnerabilities and misconfigurations to visualize attack paths:

1. **Entry points:** Exposed services, vulnerable containers.
2. **Lateral movement:** Container-to-container communication.
3. **Targets:** Sensitive data, secrets, privileged workloads.

The attack path view helps prioritize remediation by showing which vulnerabilities pose the greatest risk.

---

## Integration

### CI/CD Pipeline Integration

```bash
# In your CI pipeline
docker run -it --rm \
  deepfenceio/deepfence_package_scanner_ce:latest \
  --image-name $IMAGE_NAME \
  --fail-on-count 1 \
  --fail-on-severity critical
```

### Webhook Notifications

Configure webhooks in the console to send alerts to:

- Slack
- PagerDuty
- Splunk
- Elasticsearch
- Custom HTTP endpoints

### API Access

```bash
# Get vulnerabilities via API
curl -X GET "https://<console>/deepfence/v1.5/vulnerabilities" \
  -H "Authorization: Bearer <api-key>" \
  -H "Content-Type: application/json"
```

---

## Best Practices

- **Deploy sensors cluster-wide:** Ensure all nodes have ThreatMapper sensors for complete visibility.
- **Schedule regular scans:** Configure automated scanning to detect new vulnerabilities.
- **Prioritize by attack path:** Focus on vulnerabilities that are reachable from external exposure.
- **Integrate with ticketing:** Connect to Jira or similar systems for vulnerability tracking.
- **Use tagging:** Tag workloads by environment and team for organized reporting.

---

## References

This article is based on information from the following official sources:

1. [Deepfence ThreatMapper GitHub Repository](https://github.com/deepfence/ThreatMapper) - Deepfence
2. [ThreatMapper Documentation](https://community.deepfence.io/docs/threatmapper/) - Deepfence
3. [CIS Kubernetes Benchmark](https://www.cisecurity.org/benchmark/kubernetes) - CIS
