---
title: "System Hardening"
description: "Best practices for securing the underlying infrastructure supporting Kubernetes, including OS security, node hardening, and kernel protections."
sidebar_position: 5
---

# System Hardening

System hardening is a critical aspect of Kubernetes security that focuses on **securing the underlying infrastructure**, including operating systems, nodes, and kernel configurations. A compromised host can lead to a full cluster compromise, making it essential to **lock down system-level vulnerabilities**.

This section provides best practices to **harden Kubernetes nodes, secure the OS, and reduce attack surfaces**.

## Topics Covered

### **Operating System Security**

- Use **minimal OS distributions** (e.g., **Flatcar, Bottlerocket, or Ubuntu Minimal**) for Kubernetes nodes.
- Disable **unnecessary services and ports** to reduce exposure.
- Regularly **apply OS security updates and patches**.

### **Node Hardening**

- Restrict SSH access to Kubernetes nodes and **enforce key-based authentication**.
- Use **hardened container runtimes** (e.g., **containerd**, **gVisor**, **Kata Containers**).
- Enable **AppArmor** or **SELinux** to restrict process execution.

### **Kernel Security Enhancements**

- Enable **seccomp profiles** to limit system call access for containers.
- Implement **eBPF-based security monitoring** with tools like **Falco**.
- Use **kernel live patching** to reduce downtime from critical updates.

### **Filesystem and Data Protection**

- Mount filesystems with **read-only restrictions** where possible.
- Use **tmpfs for ephemeral workloads** to prevent data persistence in compromised containers.
- Encrypt data at rest and in transit using **KMS-backed encryption keys**.

---

## Next Steps

Follow these best practices to **reduce the risk of node-level attacks**, **minimize kernel vulnerabilities**, and **strengthen Kubernetes infrastructure security**.
