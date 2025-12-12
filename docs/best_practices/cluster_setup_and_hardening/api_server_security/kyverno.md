---
title: "Kyverno"
description: "Kyverno is a Kubernetes-native policy engine used to validate, mutate, and generate resources, enabling security, compliance, and best practice enforcement."
sidebar_position: 4
keywords: [kubernetes security tool, kyverno, kubernetes policy, policy engine, admission control, policy validation, policy mutation, resource generation, kubernetes governance, CKS]
---

# Kyverno

**Kyverno** is a **Kubernetes-native policy engine** designed specifically for Kubernetes clusters. It allows platform teams and security engineers to **define and enforce policies** using familiar Kubernetes manifests—**no need to learn a new language like Rego**.

With Kyverno, you can **validate incoming resources**, **mutate configurations automatically**, and **generate new resources** dynamically, all using Kubernetes-native CRDs.

---

## Usage

### 1. Install Kyverno in the Cluster

```bash
kubectl create -f https://raw.githubusercontent.com/kyverno/kyverno/main/config/release/install.yaml
```

Verify Kyverno is running:

```bash
kubectl get pods -n kyverno
```

---

### 2. Create a Validation Policy

Example: Require all Pods to have resource limits defined.

```yaml
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: require-resource-limits
spec:
  validationFailureAction: enforce
  rules:
    - name: check-resource-limits
      match:
        resources:
          kinds:
            - Pod
      validate:
        message: "Resource limits and requests are required for all containers."
        pattern:
          spec:
            containers:
              - resources:
                  requests:
                    memory: "?*"
                    cpu: "?*"
                  limits:
                    memory: "?*"
                    cpu: "?*"
```

Apply the policy:

```bash
kubectl apply -f require-resource-limits.yaml
```

---

### 3. Create a Mutation Policy

Automatically add a specific label to all new Pods:

```yaml
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: add-default-label
spec:
  rules:
    - name: add-label
      match:
        resources:
          kinds:
            - Pod
      mutate:
        patchStrategicMerge:
          metadata:
            labels:
              environment: "dev"
```

---

### 4. Generate Resources

You can also create policies that generate child resources. For example, create a NetworkPolicy for every new namespace:

```yaml
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: generate-network-policy
spec:
  rules:
    - name: generate-networkpolicy
      match:
        resources:
          kinds:
            - Namespace
      generate:
        kind: NetworkPolicy
        name: default-deny
        namespace: "{{request.object.metadata.name}}"
        data:
          spec:
            podSelector: {}
            policyTypes:
              - Ingress
              - Egress
```

---

## Best Practices

- Use `validationFailureAction: enforce` for production policies, and `audit` for testing.
- Leverage mutation policies to **standardize configurations** across teams.
- Store policies in **Git repositories** and apply them via GitOps pipelines.
- Use `kyverno-cli` for testing policies before deployment.
- Regularly scan your cluster with **Kyverno's policy reports** to identify drift or violations.

---

## Resources

- **Official Documentation:** [https://kyverno.io](https://kyverno.io)
- **Kyverno GitHub Repository:** [https://github.com/kyverno/kyverno](https://github.com/kyverno/kyverno)
- **Policy Library:** [https://kyverno.io/policies](https://kyverno.io/policies)
