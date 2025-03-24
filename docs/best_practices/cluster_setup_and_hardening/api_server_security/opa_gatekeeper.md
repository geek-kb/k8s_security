---
title: "Open Policy Agent (OPA) / Gatekeeper"
description: "OPA and Gatekeeper bring policy-based governance to Kubernetes, enabling fine-grained access control, resource validation, and compliance enforcement."
sidebar_position: 3
---

# Open Policy Agent (OPA) / Gatekeeper

**Required knowledge for the CKS certification.**

**Open Policy Agent (OPA)** is a **general-purpose policy engine** that uses a declarative language called **Rego** to define and enforce rules across systems. In Kubernetes, OPA integrates through **Gatekeeper**, a controller that acts as an **admission webhook**, intercepting API server requests and enforcing policies before resources are created or modified.

With OPA/Gatekeeper, teams can ensure **consistent security, compliance, and operational practices** by defining custom rules for how Kubernetes resources should behave.

---

## Usage

### 1. Install Gatekeeper in Your Cluster

```bash
kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper/release-3.14/deploy/gatekeeper.yaml
```

Verify installation:

```bash
kubectl get pods -n gatekeeper-system
```

---

### 2. Define a Constraint Template

```yaml
apiVersion: templates.gatekeeper.sh/v1beta1
kind: ConstraintTemplate
metadata:
  name: k8srequiredlabels
spec:
  crd:
    spec:
      names:
        kind: K8sRequiredLabels
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |
        package k8srequiredlabels

        violation[{"msg": msg}] {
          required := {"app"}
          provided := {label | input.review.object.metadata.labels[label]}
          missing := required - provided
          count(missing) > 0
          msg := sprintf("Missing required labels: %v", [missing])
        }
```

---

### 3. Apply a Constraint

```yaml
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sRequiredLabels
metadata:
  name: must-have-app-label
spec:
  match:
    kinds:
      - apiGroups: [""]
        kinds: ["Pod"]
```

This constraint ensures every Pod has an `app` label.

---

### 4. Test the Policy

Try creating a pod without the required label:

```bash
kubectl run test --image=nginx
```

Gatekeeper will deny the request with a message explaining the violation.

---

## Best Practices

- Use **Constraint Templates** to define reusable policy logic and **Constraints** to enforce them.
- Store policies in **version-controlled repositories** and apply them through GitOps pipelines.
- Regularly audit applied constraints using Gatekeeper’s **audit functionality**.
- Use **OPA outside of Kubernetes** to enforce policies in CI/CD pipelines, Terraform, APIs, and more.
- Validate configurations with **dry-run mode** before enforcing policies in production.

---

## Resources

- **OPA Website:** [https://www.openpolicyagent.org](https://www.openpolicyagent.org)
- **Gatekeeper Project:** [https://github.com/open-policy-agent/gatekeeper](https://github.com/open-policy-agent/gatekeeper)
- **OPA GitHub:** [https://github.com/open-policy-agent/opa](https://github.com/open-policy-agent/opa)
