---
sidebar_position: 1
title: "Compromised API Server"
description: "Exploiting Kubernetes API server vulnerabilities and best practices for securing API endpoints."
---

# Compromised API Server

A **compromised API server** can provide attackers with **unauthorized access** to your **Kubernetes cluster**, allowing them to **view**, **modify**, or **delete resources**. This type of attack can lead to severe disruptions, including unauthorized data exposure, service downtime, and potential breaches of sensitive environments.

---

## Exploitation Steps: Exposed API Endpoints

An attacker identifies an exposed API server using a port scan:

```bash
nmap -p 6443 <cluster-ip>
```

### Access API Server Without Authentication

The attacker tries to list all pods using a curl request:

```bash
curl -k https://<api-server-ip>:6443/api/v1/pods
```

### Delete Critical Resources

The attacker attempts to delete a specific pod:

```bash
curl -k -X DELETE https://<api-server-ip>:6443/api/v1/namespaces/default/pods/victim-pod
```

### Result

The attacker can delete pods, causing service disruptions and potentially leading to a Denial of Service (DoS).

---

## Mitigation Techniques and Fixes

### 1. Restrict API Access

- **Issue:** Publicly exposed API server allows unauthorized access.<br/>
- **Fix:** Use firewalls or private networking to limit access.

#### Firewall Rule Example

```bash
# Allow access to the API server only from a specific IP range
iptables -A INPUT -p tcp -s <trusted-ip-range> --dport 6443 -j ACCEPT
iptables -A INPUT -p tcp --dport 6443 -j DROP
```

### 2. Enable Authentication

- **Issue:** Lack of authentication enables any user to access the API server.<br/>
- **Fix:** Implement Role-Based Access Control (RBAC) and use API server tokens for secure access.

#### Enforcing Authentication via RBAC

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: default
  name: pod-reader
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "list"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
  namespace: default
subjects:
- kind: User
  name: "api-user"
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
```

### 3. Use Network Policies

- **Issue:** External access to the API server is not restricted.<br/>
- **Fix:** Block external access using Kubernetes Network Policies.

#### Example Network Policy to Restrict API Server Access

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: restrict-api-access
  namespace: default
spec:
  podSelector:
    matchLabels:
      component: kube-apiserver
  policyTypes:
    - Ingress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              role: internal
```

---

## Conclusion

Securing your Kubernetes API server is critical to maintaining the integrity and security of your cluster. Implement best practices by restricting API access, enabling authentication through Role-Based Access Control (RBAC), and applying network policies to prevent unauthorized access. Regularly monitor and audit API server logs to detect and respond to potential threats promptly.
