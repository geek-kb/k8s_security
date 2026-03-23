---
sidebar_position: 13
title: "Controlling Supplemental Group IDs with SupplementalGroupsPolicy"
description: "How to use supplementalGroupsPolicy: Strict to prevent container images from injecting unauthorized supplemental group IDs into Kubernetes pod processes."
keywords: [kubernetes supplementalGroupsPolicy, supplemental groups, container security, pod security context, privilege escalation, CKS, group id injection]
tags: [best-practice, pod-security, container-escape, privilege-escalation, CKS]
related:
  - /kubernetes-security/attack-vectors/supplemental-group-injection/
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/pod-security/pod-security-standards/
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/pod-security/container-escape-mitigation/
---

# Controlling Supplemental Group IDs with SupplementalGroupsPolicy

**Required knowledge for the CKS certification.**

By default, Kubernetes merges the group memberships defined in `/etc/group` inside the container image with the group IDs specified in the pod's security context (`fsGroup`, `supplementalGroups`, `runAsGroup`). This implicit merge can introduce additional group IDs into the container's process identity beyond what cluster operators and policy engines can observe from the pod manifest alone. Malicious or misconfigured container images can exploit this behavior to gain access to files and resources protected by group-based permissions.

The `supplementalGroupsPolicy` field, generally available since Kubernetes 1.35, gives cluster operators explicit control over whether image-defined groups are merged into pod process identities.

---

## 1. The Problem: Implicit Group Injection from Container Images

When a pod runs, the container runtime resolves the supplemental groups for the container process. Without `supplementalGroupsPolicy: Strict`, any group memberships listed for the container's primary user in the image's `/etc/group` are silently added to the process identity.

**Issue:** Group memberships from `/etc/group` in the container image are added to the running process even when not declared in the pod manifest. Policy engines that validate manifests have no visibility into these implicit groups, and file permission checks use the full merged group list.<br/>
**Fix:** Set `supplementalGroupsPolicy: Strict` in the pod security context so that only group IDs explicitly declared in `fsGroup`, `supplementalGroups`, or `runAsGroup` are applied.

---

## 2. Configuring SupplementalGroupsPolicy

The field `.spec.securityContext.supplementalGroupsPolicy` accepts two values:

- `Merge` (default): The group memberships defined in `/etc/group` for the container's primary user are merged with explicitly specified groups. This is the backward-compatible behavior.
- `Strict`: Only the group IDs specified in `fsGroup`, `supplementalGroups`, or `runAsGroup` are attached to the container process. Group memberships from `/etc/group` in the image are ignored.

### 2.1 Example: Enforcing Strict Group Control

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: payment-processor
  namespace: finance
spec:
  securityContext:
    runAsUser: 1000
    runAsGroup: 3000
    supplementalGroups: [4000]
    supplementalGroupsPolicy: Strict
  containers:
  - name: processor
    image: registry.example.com/payment-processor:v2.1.0
    securityContext:
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
```

With `supplementalGroupsPolicy: Strict`, the process identity inside the container will be:

```
uid=1000 gid=3000 groups=3000,4000
```

Any additional groups that the image's `/etc/group` associates with uid 1000 are excluded.

### 2.2 Verifying Effective Groups

The actual groups applied to the container process are reflected in the pod status under `.status.containerStatuses[].user.linux`:

```yaml
status:
  containerStatuses:
  - name: processor
    user:
      linux:
        uid: 1000
        gid: 3000
        supplementalGroups:
        - 3000
        - 4000
```

---

## 3. Node and Runtime Requirements

`supplementalGroupsPolicy: Strict` requires support from both the node's kubelet and the container runtime interface (CRI) implementation.

### 3.1 Supported CRI Runtimes

- containerd version 2.0 or later
- CRI-O version 1.31 or later

### 3.2 Verifying Node Support

Check whether a node reports support for this feature in its status:

```bash
kubectl get node <node-name> -o jsonpath='{.status.features.supplementalGroupsPolicy}'
```

A result of `true` confirms the node supports `supplementalGroupsPolicy: Strict`.

### 3.3 Behavior on Unsupported Nodes

Since Kubernetes 1.33 (beta graduation), if a pod specifies `supplementalGroupsPolicy: Strict` and is scheduled to a node that does not support the feature, the kubelet will reject the pod at admission. This prevents silent fallback to `Merge` behavior.

---

## 4. Enforcing Strict Policy at the Cluster Level

Use an admission controller such as Kyverno or OPA/Gatekeeper to require `supplementalGroupsPolicy: Strict` for sensitive namespaces:

```yaml
# Kyverno ClusterPolicy — require Strict supplementalGroupsPolicy
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: require-strict-supplemental-groups-policy
spec:
  validationFailureAction: Enforce
  rules:
  - name: check-supplementalGroupsPolicy
    match:
      any:
      - resources:
          kinds: [Pod]
          namespaces: [finance, payments, auth]
    validate:
      message: "supplementalGroupsPolicy must be set to Strict in sensitive namespaces."
      pattern:
        spec:
          securityContext:
            supplementalGroupsPolicy: Strict
```

---

## References

This article is based on information from the following official sources:

1. [Fine-grained SupplementalGroups control for Pods (GA)](https://kubernetes.io/blog/2025/12/23/kubernetes-v1-35-fine-grained-supplementalgroups-control-ga/) - Kubernetes Blog
2. [Fine-grained SupplementalGroups control for Pods (Beta)](https://kubernetes.io/blog/2025/05/06/kubernetes-v1-33-fine-grained-supplementalgroups-control-beta/) - Kubernetes Blog
3. [Configure a Security Context for a Pod or Container](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/) - Kubernetes Documentation
