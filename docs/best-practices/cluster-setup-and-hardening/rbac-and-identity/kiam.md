---
sidebar_position: 21
title: "kiam"
description: "kiam provides AWS IAM credentials to pods running on Kubernetes, using a client-server architecture for improved security over metadata interception."
keywords: [kubernetes security tool, kiam, AWS IAM, pod identity, kubernetes AWS integration, IAM roles for pods, credential management, cloud security, CKS]
tags: [tool, rbac, cloud-security, AWS]
related:
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/rbac-and-identity/kube2iam/
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/network-security/cloud-metadata-mitigation/
  - /kubernetes-security/attack-vectors/cloud-metadata-service-abuse/
---

# kiam

**kiam** provides AWS IAM credentials to Kubernetes pods using a client-server architecture. Unlike kube2iam, kiam separates the credential-serving component (server) from the metadata interception component (agent), improving security by reducing the attack surface on worker nodes.

The server component runs on master/dedicated nodes and handles IAM role assumption, while agents on worker nodes only intercept metadata requests.

---

## Architecture

kiam consists of two components:

### Agent (runs on all worker nodes)

- Intercepts requests to the EC2 metadata service (169.254.169.254).
- Forwards credential requests to the server.
- Does not assume IAM roles directly.
- Runs as a DaemonSet with minimal privileges.

### Server (runs on master or dedicated nodes)

- Assumes IAM roles on behalf of pods.
- Returns temporary credentials to agents.
- Requires IAM permissions to assume roles.
- Should run on nodes with restricted access.

---

## Prerequisites

- AWS IAM roles configured with appropriate trust policies.
- TLS certificates for secure agent-server communication.
- Network policies to restrict server access.

---

## Installation

### Generate TLS Certificates

```bash
# Create CA
openssl genrsa -out ca.key 2048
openssl req -x509 -new -nodes -key ca.key -days 365 -out ca.crt -subj "/CN=kiam-ca"

# Create server certificate
openssl genrsa -out server.key 2048
openssl req -new -key server.key -out server.csr -subj "/CN=kiam-server"
openssl x509 -req -in server.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out server.crt -days 365

# Create agent certificate
openssl genrsa -out agent.key 2048
openssl req -new -key agent.key -out agent.csr -subj "/CN=kiam-agent"
openssl x509 -req -in agent.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out agent.crt -days 365
```

### Create TLS Secrets

```bash
kubectl create secret generic kiam-server-tls -n kube-system \
  --from-file=ca.crt --from-file=server.crt --from-file=server.key

kubectl create secret generic kiam-agent-tls -n kube-system \
  --from-file=ca.crt --from-file=agent.crt --from-file=agent.key
```

### Deploy Server

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: kiam-server
  namespace: kube-system
spec:
  selector:
    matchLabels:
      app: kiam-server
  template:
    metadata:
      labels:
        app: kiam-server
    spec:
      nodeSelector:
        node-role.kubernetes.io/master: ""
      tolerations:
        - key: node-role.kubernetes.io/master
          effect: NoSchedule
      hostNetwork: true
      serviceAccountName: kiam-server
      containers:
        - name: kiam-server
          image: quay.io/uswitch/kiam:latest
          args:
            - server
            - --json-log
            - --level=info
            - --bind=0.0.0.0:443
            - --cert=/etc/kiam/tls/server.crt
            - --key=/etc/kiam/tls/server.key
            - --ca=/etc/kiam/tls/ca.crt
            - --role-base-arn-autodetect
            - --assume-role-arn=arn:aws:iam::123456789012:role/kiam-server
            - --session-duration=15m
          volumeMounts:
            - name: tls
              mountPath: /etc/kiam/tls
      volumes:
        - name: tls
          secret:
            secretName: kiam-server-tls
```

### Deploy Agent

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: kiam-agent
  namespace: kube-system
spec:
  selector:
    matchLabels:
      app: kiam-agent
  template:
    metadata:
      labels:
        app: kiam-agent
    spec:
      hostNetwork: true
      serviceAccountName: kiam-agent
      containers:
        - name: kiam-agent
          image: quay.io/uswitch/kiam:latest
          args:
            - agent
            - --iptables
            - --host-interface=eni+
            - --json-log
            - --level=info
            - --port=8181
            - --cert=/etc/kiam/tls/agent.crt
            - --key=/etc/kiam/tls/agent.key
            - --ca=/etc/kiam/tls/ca.crt
            - --server-address=kiam-server:443
            - --gateway-timeout-creation=1s
          volumeMounts:
            - name: tls
              mountPath: /etc/kiam/tls
          securityContext:
            privileged: true
      volumes:
        - name: tls
          secret:
            secretName: kiam-agent-tls
```

---

## AWS IAM Configuration

### Server Role

The kiam server role needs permission to assume other roles:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "sts:AssumeRole",
      "Resource": "arn:aws:iam::123456789012:role/k8s-*"
    }
  ]
}
```

### Pod Roles Trust Policy

Pod roles must trust the kiam server role:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::123456789012:role/kiam-server"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

---

## Usage

### Annotate Pods

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-app
  annotations:
    iam.amazonaws.com/role: k8s-my-app-role
spec:
  containers:
    - name: my-app
      image: my-app:latest
```

### Namespace Role Restrictions

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production
  annotations:
    iam.amazonaws.com/permitted: "k8s-production-.*"
```

---

## Security Advantages Over kube2iam

| Feature | kiam | kube2iam |
|---------|------|----------|
| Role assumption location | Dedicated server | Every worker node |
| TLS encryption | Required | Optional |
| Credential caching | Server-side | Per-node |
| Blast radius | Server nodes only | All worker nodes |

---

## Migration to IRSA

AWS recommends migrating to IAM Roles for Service Accounts (IRSA):

- Better security model using OIDC federation.
- No iptables or privileged containers required.
- Native EKS integration.
- Auditable credential binding.

---

## References

This article is based on information from the following official sources:

1. [kiam GitHub Repository](https://github.com/uswitch/kiam) - GitHub
2. [IAM Roles for Service Accounts](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html) - AWS Documentation
3. [kiam Architecture](https://github.com/uswitch/kiam/blob/master/docs/ARCHITECTURE.md) - kiam Documentation
