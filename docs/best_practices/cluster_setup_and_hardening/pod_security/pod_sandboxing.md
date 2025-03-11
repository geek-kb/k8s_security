---
title: "Pod Sandboxing"
sidebar_position: 4
description: "Learn how pod sandboxing enhances security by isolating workloads in Kubernetes."
---

# Pod Sandboxing in Kubernetes

**Required knowledge for the CKS certification.**

## What is Pod Sandboxing?

**Pod sandboxing** is a security technique that enhances **isolation** between workloads running in Kubernetes. It reduces the risk of **container breakout attacks**, ensures **stronger multi-tenancy**, and limits the impact of **compromised pods**.

In a standard Kubernetes environment, pods share the **underlying kernel** of the host system. Pod sandboxing introduces **additional layers of isolation**, preventing malicious workloads from impacting the host or other workloads.

---

## Why Use Pod Sandboxing?

Pod sandboxing is particularly useful in the following scenarios:

- **Multi-Tenancy:** Running workloads from different users or teams on shared clusters.
- **High-Security Workloads:** Protecting sensitive applications from compromise.
- **Zero Trust Architectures:** Restricting access between workloads and enforcing strict security policies.

By using pod sandboxing, organizations can **prevent privilege escalation**, **reduce attack surfaces**, and **improve workload security**.

---

## Approaches to Pod Sandboxing

### 1. Kata Containers

[Kata Containers](https://katacontainers.io/) provide **hardware-virtualized isolation** by running each pod inside a lightweight virtual machine (VM). This creates an extra security boundary between the workload and the host.

#### Example: Deploying a Pod with Kata Containers

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: kata-pod
  annotations:
    io.kubernetes.cri.untrusted-workload: "true"
spec:
  runtimeClassName: kata-containers
  containers:
    - name: app-container
      image: nginx
```

**Benefits:**

- Provides **VM-level isolation** while maintaining Kubernetes compatibility.
- Ideal for running **untrusted workloads** in **multi-tenant environments**.

---

### 2. gVisor

[gVisor](https://gvisor.dev/) is a **user-space kernel** designed to sandbox workloads by intercepting and handling syscalls in a controlled environment.

#### Example: Deploying a Pod with gVisor

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: gvisor-pod
spec:
  runtimeClassName: gvisor
  containers:
    - name: app-container
      image: nginx
```

**Benefits:**

- Runs applications in a **highly restricted user-space kernel**.
- Limits the **attack surface** by preventing direct host kernel access.
- Ideal for **lightweight sandboxing** with minimal performance impact.

---

### 3. Firecracker

[Firecracker](https://firecracker-microvm.github.io/) is a lightweight **microVM** technology designed for **serverless computing** and **secure container execution**.

**Key Features:**

- Provides **strong isolation** using **KVM-based microVMs**.
- Used by services like **AWS Lambda** and **Fargate**.
- Optimized for **fast startup times** and **low resource overhead**.

Firecracker-based runtimes, such as **AWS Firecracker-containerd**, can be integrated into Kubernetes for **secure multi-tenant workloads**.

---

### 4. Using RuntimeClass for Sandboxing

Kubernetes allows selecting **different runtimes** for workloads using `RuntimeClass`.

```yaml
apiVersion: node.k8s.io/v1
kind: RuntimeClass
metadata:
  name: sandboxed
handler: kata-containers
```

By associating pods with a specific `RuntimeClass`, Kubernetes can enforce **sandboxed execution environments**.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: sandboxed-pod
spec:
  runtimeClassName: sandboxed
  containers:
    - name: secure-container
      image: alpine
```

This method ensures that workloads requiring **extra isolation** can run securely without affecting the host.

---

## Best Practices for Pod Sandboxing

- **Use Kata Containers or Firecracker** for workloads requiring **strong hardware isolation**.
- **Deploy gVisor for lightweight syscall filtering** and restricted execution.
- **Limit pod privileges** using **Pod Security Standards (PSS)**.
- **Combine pod sandboxing with seccomp and AppArmor** for defense-in-depth security.
- **Use `RuntimeClass` to enforce sandboxed execution** where necessary.

---

## Related Security Features

- **[Seccomp Profiles](/docs/best_practices/cluster_setup_and_hardening/pod_security/seccomp_in_pods)** restrict system calls to limit attack vectors.
- **[AppArmor Profiles](/docs/best_practices/cluster_setup_and_hardening/pod_security/app_armor_profiles)** define mandatory access control for pods.
- **[Pod Security Standards](/docs/best_practices/cluster_setup_and_hardening/pod_security/pod_security_standards)** enforce security policies at the namespace level.

---

## Conclusion

Pod sandboxing is an essential technique for securing **multi-tenant Kubernetes clusters** and **high-security workloads**. By leveraging technologies like **Kata Containers, gVisor, and Firecracker**, organizations can **reduce the risk of container breakouts**, \*\*limit exposure to host reso
