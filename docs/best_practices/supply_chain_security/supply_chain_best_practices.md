---
sidebar_position: 2
title: "Supply Chain Security Best Practices"
description: "Best practices for securing the Kubernetes software supply chain, including image signing, dependency verification, Helm security, and CI/CD hardening."
keywords: [kubernetes security best practices, supply chain security, software supply chain, container image security, SBOM, image signing, cosign, CI/CD security, helm security, dependency verification, CKS]
---

# Supply Chain Security Best Practices

**Supply chain attacks** target **container images, dependencies, CI/CD pipelines, and Helm charts** to inject malicious code into Kubernetes workloads. **Securing the Kubernetes supply chain** helps prevent **unauthorized code execution, privilege escalation, and data exfiltration**.

---

## 1. Use Trusted and Signed Container Images

Using unverified images increases the risk of **malware, backdoors, and privilege escalation**.

### Secure Image Policy with Sigstore Cosign

```bash
cosign sign --key cosign.key myregistry.com/my-app:latest
```

Enforce signed images in Kubernetes:

```yaml
apiVersion: policy.sigstore.dev/v1alpha1
kind: ClusterImagePolicy
metadata:
  name: enforce-signed-images
spec:
  images:
    - glob: "myregistry.com/*"
  authorities:
    - key:
        data: <public-key>
```

### Why It Matters

- **Prevents** running untrusted or tampered images.<br/>
- **Ensures** images are from verified sources.

---

## 2. Scan Images for Vulnerabilities

Before deployment, scan images for known **CVE vulnerabilities**.

### Example Using Trivy

```bash
trivy image myregistry.com/my-app:latest
```

### Why It Matters

- **Identifies** critical vulnerabilities before deployment.<br/>
- **Prevents** exploitation of outdated software packages.

---

## 3. Lock Dependencies to Verified Versions

Using unverified dependencies allows **supply chain poisoning** via compromised libraries.

### Secure Dependency Management

- Use **checksums** to validate dependencies:

  ```bash
  go mod verify
  ```

- Pin dependencies in package managers:

  ```json
  "dependencies": {
    "express": "4.17.1"
  }
  ```

### Why It Matters

- **Prevents** dependency hijacking.<br/>
- **Ensures** only verified versions are used.

---

## 4. Secure CI/CD Pipelines

Compromised CI/CD pipelines allow attackers to **modify deployments and inject malicious code**.

### Harden CI/CD Secrets

- Store secrets securely in **Vault** or **Kubernetes Secrets**.
- Use **short-lived, scoped credentials**.
- **Disable plaintext secret storage** in CI/CD logs.

### Restrict GitHub Actions Workflow Permissions

```yaml
permissions:
  contents: read
  id-token: write
```

### Why It Matters

- **Prevents** unauthorized CI/CD modifications.<br/>
- **Reduces** risk of secret leakage.

---

## 5. Secure Helm Chart Deployments

Helm charts can introduce **misconfigurations, backdoors, or excessive privileges** if not properly validated.

### 5.1 Verify Helm Chart Provenance

Ensure charts are **signed and verified** before deployment:

```bash
helm package my-chart --sign --key my-signing-key
helm verify my-chart-1.0.0.tgz
```

### 5.2 Restrict External Helm Repositories

Avoid untrusted Helm repositories by defining **allowed sources**:

```yaml
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sAllowedRepos
metadata:
  name: restrict-helm-registries
spec:
  match:
    kinds:
      - apiGroups: [""]
        kinds: ["Pod"]
  parameters:
    repos:
      - "oci://mytrustedhelmrepo.com"
```

### 5.3 Restrict Helm Values with Admission Controllers

Block privileged workloads using **Gatekeeper and OPA policies**:

```yaml
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sPSPRestricted
metadata:
  name: deny-privileged-pods
spec:
  parameters:
    privileged: false
```

### 5.4 Prevent Persistent Backdoors in Helm Hooks

Helm hooks can be exploited to maintain persistence even after uninstallation. Ensure **post-delete hooks** do not introduce unauthorized resources:

```yaml
hooks:
  post-delete:
    - exec:
        command:
          [
            "/bin/sh",
            "-c",
            "kubectl delete deployment --all -n malicious-namespace",
          ]
```

Use **Kubernetes Policy Controllers** to detect persistent workloads.

### Why It Matters

- **Prevents** unauthorized or tampered Helm charts from deploying.<br/>
- **Enforces** security best practices for Helm-based deployments.<br/>
- **Reduces** the risk of privilege escalation and persistent backdoors.

---

## 6. Enforce Kubernetes Admission Controls

Use **Admission Controllers** to block insecure deployments.

### Example: Restrict Untrusted Registries

```yaml
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sAllowedRepos
metadata:
  name: restrict-registries
spec:
  match:
    kinds:
      - apiGroups: [""]
        kinds: ["Pod"]
  parameters:
    repos:
      - "myregistry.com"
```

### Why It Matters

- **Blocks** untrusted images from running.<br/>
- **Enforces** security policies at deployment time.

---

## Conclusion

**Securing the Kubernetes supply chain** requires **signed images, dependency verification, Helm security enforcement, CI/CD hardening, and policy enforcement**. By following these best practices, organizations can **mitigate supply chain attacks and prevent unauthorized access**.
