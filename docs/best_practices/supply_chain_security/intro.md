---
title: "Supply Chain Security"
description: "Best practices for securing the Kubernetes software supply chain, including container image security, CI/CD pipeline protection, and artifact integrity."
sidebar_position: 4
---

# Supply Chain Security

Supply chain security in Kubernetes focuses on protecting the **software development lifecycle**, ensuring that code, dependencies, and artifacts remain secure from development to deployment. Attackers often exploit vulnerabilities in **third-party dependencies**, **insecure CI/CD pipelines**, and **unverified container images** to gain unauthorized access or inject malicious code.

This section provides best practices to secure the **entire Kubernetes software supply chain**.

## Topics Covered

### **Securing Container Images**

**Required knowledge for the CKS certification.**

- Use **minimal base images** to reduce attack surfaces.
- Regularly **scan images for vulnerabilities** using **Trivy**, **Grype**, or **Anchore**.
- Sign and verify images with **cosign** to prevent tampering.

### **Protecting CI/CD Pipelines**

- Implement **signed commits** and enforce **code reviews** to prevent unauthorized changes.
- Use **least privilege IAM roles** for build and deployment processes.
- Scan **Infrastructure as Code (IaC)** for misconfigurations with **Checkov** or **tfsec**.

### **Artifact and Dependency Security**

**Required knowledge for the CKS certification.**

- Use **Software Bill of Materials (SBOM)** to track dependencies and detect supply chain risks.
- Restrict untrusted registries by using **private container registries**.
- Enable **immutable tags** in container registries to prevent unauthorized modifications.

### **Secure Deployment Practices**

**Required knowledge for the CKS certification.**

- Enforce **Admission Controllers** (e.g., **OPA/Gatekeeper**) to verify security policies before deployment.
- Use **Pod Security Standards (PSS)** to restrict privileged container execution.
- Implement **multi-factor authentication (MFA)** for accessing deployment tools.

---

## Next Steps

Follow these best practices to **harden your Kubernetes supply chain**, ensuring the integrity and security of software from development to production.
