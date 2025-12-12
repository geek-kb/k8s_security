---
title: "Security Profiles Operator"
sidebar_position: 10
description: "Learn how to use the Security Profiles Operator to manage seccomp, AppArmor, and SELinux profiles at scale in Kubernetes."
keywords: [kubernetes security best practices, security profiles operator, seccomp, apparmor, selinux, profile management, security profiles, kubernetes security, pod security, CKS]
---

# Security Profiles Operator

**Required knowledge for the CKS certification.**

## What is the Security Profiles Operator?

The **Security Profiles Operator (SPO)** is a **Kubernetes-native tool** developed by the **Kubernetes Security Special Interest Group (SIG Security)** that manages **seccomp, AppArmor, and SELinux profiles** at scale. It provides a unified approach to defining, recording, and applying security profiles across Kubernetes clusters.

**Issue:** Managing security profiles manually across multiple nodes is error-prone, time-consuming, and difficult to maintain as workloads scale.<br/>
**Fix:** The Security Profiles Operator automates profile distribution, recording, and lifecycle management using Kubernetes Custom Resources.

By using the Security Profiles Operator, you can **enforce security policies consistently**, **reduce manual configuration errors**, and **record profiles from running workloads** for baseline policy creation.

---

## 1. Install the Security Profiles Operator

**Issue:** Deploying security profiles manually requires creating files on each node and managing synchronization.<br/>
**Fix:** Install the Security Profiles Operator to centrally manage profiles as Kubernetes resources.

### Install via Manifest

```bash
# Install cert-manager (required for webhook certificates)
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.17.2/cert-manager.yaml
kubectl --namespace cert-manager wait --for condition=ready pod -l app.kubernetes.io/instance=cert-manager

# Install the Security Profiles Operator
kubectl apply -f https://raw.githubusercontent.com/kubernetes-sigs/security-profiles-operator/main/deploy/operator.yaml

# Verify installation
kubectl -n security-profiles-operator get pods
```

### Install via Helm

```bash
# Create namespace
kubectl create ns security-profiles-operator

# Label namespace for pod security
kubectl label ns security-profiles-operator \
  pod-security.kubernetes.io/enforce=privileged \
  --overwrite=true

# Download and install the Helm chart
wget https://github.com/kubernetes-sigs/security-profiles-operator/releases/download/v0.10.0/security-profiles-operator-0.10.0.tgz
helm install security-profiles-operator \
  --namespace security-profiles-operator \
  ./security-profiles-operator-0.10.0.tgz
```

### Enable Log Enricher for Profile Recording

The **log enricher** enables recording profiles by analyzing audit logs.

```bash
kubectl -n security-profiles-operator patch spod spod --type=merge \
  -p '{"spec":{"enableLogEnricher":true}}'
```

### Enable eBPF Recorder for Advanced Recording

The **eBPF recorder** provides more efficient profile recording without requiring audit logs.

```bash
kubectl -n security-profiles-operator patch spod spod --type=merge \
  -p '{"spec":{"enableBpfRecorder":true}}'
```

---

## 2. Create and Apply Seccomp Profiles

**Issue:** Creating seccomp profiles requires understanding JSON syntax and manually distributing files to nodes.<br/>
**Fix:** Define seccomp profiles as Kubernetes Custom Resources that are automatically synchronized across nodes.

### Example: Create a Seccomp Profile

```yaml
apiVersion: security-profiles-operator.x-k8s.io/v1beta1
kind: SeccompProfile
metadata:
  name: restricted-workload
  namespace: production
spec:
  defaultAction: SCMP_ACT_ERRNO
  architectures:
    - SCMP_ARCH_X86_64
  syscalls:
    - action: SCMP_ACT_ALLOW
      names:
        - read
        - write
        - exit
        - exit_group
        - fstat
        - openat
        - close
        - mmap
        - mprotect
        - brk
```

Apply the profile:

```bash
kubectl apply -f restricted-workload-seccomp.yaml

# Verify profile status
kubectl get seccompprofile -n production
```

### Apply the Profile to a Pod

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure-app
  namespace: production
spec:
  securityContext:
    seccompProfile:
      type: Localhost
      localhostProfile: operator/production/restricted-workload.json
  containers:
    - name: app
      image: nginx:1.21
```

The operator automatically creates the profile at `/var/lib/kubelet/seccomp/operator/production/restricted-workload.json` on all nodes.

---

## 3. Record Seccomp Profiles from Running Workloads

**Issue:** Determining the exact syscalls required by an application is difficult without runtime analysis.<br/>
**Fix:** Use ProfileRecording to automatically capture syscalls from running containers.

### Enable Recording for a Namespace

```bash
kubectl label ns production spo.x-k8s.io/enable-recording=
```

### Create a ProfileRecording

```yaml
apiVersion: security-profiles-operator.x-k8s.io/v1alpha1
kind: ProfileRecording
metadata:
  name: record-nginx
  namespace: production
spec:
  kind: SeccompProfile
  recorder: logs
  podSelector:
    matchLabels:
      app: nginx
```

### Deploy the Workload to Record

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-test
  namespace: production
  labels:
    app: nginx
spec:
  containers:
    - name: nginx
      image: nginx:1.21
```

### Capture and Review the Profile

After running typical workload operations, delete the pod to finalize recording:

```bash
# Allow workload to run and exercise all code paths
kubectl exec -n production nginx-test -- curl http://localhost

# Delete pod to trigger profile creation
kubectl delete pod -n production nginx-test

# View recorded profile
kubectl get seccompprofile -n production
kubectl get seccompprofile record-nginx-nginx -n production -o yaml
```

The operator creates a profile named `record-nginx-nginx` containing all syscalls used during execution.

---

## 4. Manage AppArmor Profiles

**Issue:** AppArmor profiles require manual installation on each node and lack version control.<br/>
**Fix:** Define AppArmor profiles as Kubernetes resources managed by the operator.

### Enable AppArmor Support

```bash
kubectl -n security-profiles-operator patch spod spod --type=merge \
  -p '{"spec":{"enableAppArmor":true}}'
```

### Create an AppArmor Profile

```yaml
apiVersion: security-profiles-operator.x-k8s.io/v1alpha1
kind: ApparmorProfile
metadata:
  name: nginx-apparmor
  namespace: production
spec:
  profile: |
    profile nginx-apparmor flags=(attach_disconnected,mediate_deleted) {
      capability net_bind_service,
      capability setgid,
      capability setuid,
      
      network inet tcp,
      network inet udp,
      
      /usr/sbin/nginx mr,
      /var/log/nginx/** w,
      /var/cache/nginx/** rw,
      /etc/nginx/** r,
      
      deny /bin/bash rx,
      deny /usr/bin/curl rx,
      deny /usr/bin/wget rx,
    }
```

### Apply the Profile to a Pod

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-apparmor-pod
  namespace: production
spec:
  containers:
    - name: nginx
      image: nginx:1.21
      securityContext:
        appArmorProfile:
          type: Localhost
          localhostProfile: nginx-apparmor
```

---

## 5. Manage SELinux Profiles

**Issue:** SELinux policies are complex to write and difficult to test without production workloads.<br/>
**Fix:** Use the operator to define, record, and apply SELinux profiles declaratively.

### Enable SELinux Support

```bash
kubectl -n security-profiles-operator patch spod spod --type=merge \
  -p '{"spec":{"enableSelinux":true}}'
```

### Create a SELinux Profile

```yaml
apiVersion: security-profiles-operator.x-k8s.io/v1alpha2
kind: SelinuxProfile
metadata:
  name: nginx-selinux
  namespace: production
spec:
  allow:
    "@self":
      tcp_socket:
        - listen
        - accept
        - bind
    http_port_t:
      tcp_socket:
        - name_bind
    http_cache_port_t:
      tcp_socket:
        - name_bind
    node_t:
      tcp_socket:
        - node_bind
  inherit:
    - kind: System
      name: container
```

### Wait for Profile Installation

```bash
kubectl wait --for=condition=ready selinuxprofile nginx-selinux -n production
```

### Apply the Profile to a Pod

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-selinux-pod
  namespace: production
spec:
  containers:
    - name: nginx
      image: nginxinc/nginx-unprivileged:1.21
      securityContext:
        seLinuxOptions:
          type: nginx-selinux.process
```

The SELinux type follows the format `<ProfileName>.process`.

---

## 6. Use Base Profiles for Container Runtimes

**Issue:** Container runtimes require specific syscalls to function, but manually determining them is time-consuming.<br/>
**Fix:** Reference base profiles for common runtimes to ensure compatibility.

### Example: Extend the runc Base Profile

```yaml
apiVersion: security-profiles-operator.x-k8s.io/v1beta1
kind: SeccompProfile
metadata:
  name: app-with-network
  namespace: production
spec:
  defaultAction: SCMP_ACT_ERRNO
  baseProfileName: runc-v1.4.0
  syscalls:
    - action: SCMP_ACT_ALLOW
      names:
        - socket
        - connect
        - sendto
        - recvfrom
```

This profile inherits all syscalls from `runc-v1.4.0` and adds networking syscalls.

### Use OCI Artifacts for Base Profiles

```yaml
apiVersion: security-profiles-operator.x-k8s.io/v1beta1
kind: SeccompProfile
metadata:
  name: app-with-oci-base
  namespace: production
spec:
  defaultAction: SCMP_ACT_ERRNO
  baseProfileName: oci://ghcr.io/security-profiles/runc:v1.4.0
  syscalls:
    - action: SCMP_ACT_ALLOW
      names:
        - socket
```

The operator automatically pulls and verifies signed base profiles from OCI registries.

---

## 7. Bind Profiles to Workloads Automatically

**Issue:** Modifying existing workload manifests to add security profiles is disruptive.<br/>
**Fix:** Use ProfileBinding to automatically apply profiles based on image matching.

### Enable Profile Binding

```bash
kubectl label ns production spo.x-k8s.io/enable-binding=
```

### Create a ProfileBinding

```yaml
apiVersion: security-profiles-operator.x-k8s.io/v1alpha1
kind: ProfileBinding
metadata:
  name: nginx-binding
  namespace: production
spec:
  profileRef:
    kind: SeccompProfile
    name: restricted-workload
  image: nginx:1.21
```

All pods in the `production` namespace using the `nginx:1.21` image will automatically have the `restricted-workload` seccomp profile applied.

---

## 8. Monitor Profile Usage with Metrics

**Issue:** Without visibility into profile enforcement, detecting policy violations and tuning profiles is difficult.<br/>
**Fix:** Use the operator's Prometheus metrics to monitor profile operations.

### Available Metrics

The operator exposes metrics at `https://metrics.security-profiles-operator/metrics-spod`:

- `security_profiles_operator_seccomp_profile_total` - Total seccomp profile operations
- `security_profiles_operator_seccomp_profile_audit_total` - Seccomp audit events
- `security_profiles_operator_seccomp_profile_error_total` - Seccomp profile errors
- `security_profiles_operator_selinux_profile_total` - Total SELinux profile operations
- `security_profiles_operator_selinux_profile_audit_total` - SELinux audit events

### Query Metrics

```bash
# Create a pod to query metrics
kubectl run metrics-client --rm -i --restart=Never \
  --image=registry.fedoraproject.org/fedora-minimal:latest \
  -n security-profiles-operator -- bash -c \
  'curl -ks -H "Authorization: Bearer $(cat /var/run/secrets/kubernetes.io/serviceaccount/token)" \
   https://metrics.security-profiles-operator/metrics-spod | grep security_profiles_operator'
```

---

## 9. Security Best Practices

### Use Restrictive Default Actions

Always set `defaultAction: SCMP_ACT_ERRNO` for seccomp profiles to deny all syscalls by default:

```yaml
spec:
  defaultAction: SCMP_ACT_ERRNO
  syscalls:
    - action: SCMP_ACT_ALLOW
      names:
        - read
        - write
```

### Enable Profile Recording in Non-Production First

Record profiles in development or staging environments before applying them to production:

```bash
# Label development namespace for recording
kubectl label ns dev spo.x-k8s.io/enable-recording=

# Deploy ProfileRecording in dev
kubectl apply -f profile-recording.yaml -n dev
```

### Restrict Allowed Syscalls

Configure the operator to reject profiles containing dangerous syscalls:

```bash
kubectl -n security-profiles-operator patch spod spod --type merge \
  -p '{"spec":{"allowedSyscalls": ["read", "write", "exit", "exit_group", "fstat", "openat", "close"]}}'
```

### Use RBAC to Control Profile Management

Create roles that limit who can create or modify security profiles:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: seccomp-profile-editor
  namespace: production
rules:
  - apiGroups: ["security-profiles-operator.x-k8s.io"]
    resources: ["seccompprofiles"]
    verbs: ["get", "list", "watch", "create", "update", "patch"]
```

### Enable Memory Optimization for Large Clusters

In clusters with thousands of pods, enable memory optimization:

```bash
kubectl -n security-profiles-operator patch spod spod --type=merge \
  -p '{"spec":{"enableMemoryOptimization":true}}'
```

When enabled, only pods labeled with `spo.x-k8s.io/enable-recording=true` are tracked.

---

## Security Checklist

- [ ] Install the Security Profiles Operator using signed releases
- [ ] Enable log enricher or eBPF recorder for profile recording
- [ ] Record profiles from running workloads in non-production environments
- [ ] Use restrictive default actions in seccomp profiles
- [ ] Apply profiles to pods via ProfileBinding for automation
- [ ] Monitor profile metrics for audit events and errors
- [ ] Restrict allowed syscalls at the operator level for high-security clusters
- [ ] Use RBAC to control who can create and modify security profiles
- [ ] Test profiles thoroughly before applying to production workloads
- [ ] Use base profiles from trusted OCI registries

---

## Links

- [Security Profiles Operator GitHub](https://github.com/kubernetes-sigs/security-profiles-operator)
- [Kubernetes seccomp Documentation](https://kubernetes.io/docs/tutorials/security/seccomp/)
- [Seccomp in Pods](/docs/best_practices/cluster_setup_and_hardening/pod_security/seccomp_in_pods)
- [AppArmor Profiles](/docs/best_practices/cluster_setup_and_hardening/pod_security/app_armor_profiles)
