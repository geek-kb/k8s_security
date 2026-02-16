---
sidebar_position: 20
title: "kube2iam"
description: "kube2iam enables Kubernetes pods to assume AWS IAM roles, providing fine-grained AWS credential management without exposing long-lived credentials."
keywords: [kubernetes security tool, kube2iam, AWS IAM, pod identity, kubernetes AWS integration, IAM roles for pods, credential management, cloud security, CKS]
tags: [tool, rbac, cloud-security, AWS]
related:
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/rbac-and-identity/kiam/
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/network-security/cloud-metadata-mitigation/
  - /kubernetes-security/attack-vectors/cloud-metadata-service-abuse/
---

# kube2iam

**kube2iam** provides AWS IAM credential isolation for Kubernetes pods. It intercepts calls to the AWS EC2 metadata service and returns temporary credentials for pod-specific IAM roles, allowing different pods to assume different AWS roles without sharing node-level credentials.

This approach follows the principle of least privilege by ensuring each workload has only the AWS permissions it needs.

---

## How It Works

1. kube2iam runs as a DaemonSet on each node.
2. Pods are annotated with the IAM role they should assume.
3. When a pod requests credentials from the metadata service (169.254.169.254), kube2iam intercepts the request.
4. kube2iam assumes the specified IAM role and returns temporary credentials to the pod.
5. The pod uses these credentials for AWS API calls.

---

## Prerequisites

- AWS IAM roles configured with trust policies allowing the Kubernetes nodes to assume them.
- iptables rules to redirect metadata service traffic to kube2iam.
- Node IAM role with permission to assume the target pod roles.

---

## Installation

### Deploy kube2iam DaemonSet

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: kube2iam
  namespace: kube-system
spec:
  selector:
    matchLabels:
      name: kube2iam
  template:
    metadata:
      labels:
        name: kube2iam
    spec:
      hostNetwork: true
      serviceAccountName: kube2iam
      containers:
        - name: kube2iam
          image: jtblin/kube2iam:latest
          args:
            - "--base-role-arn=arn:aws:iam::123456789012:role/"
            - "--iptables=true"
            - "--host-ip=$(HOST_IP)"
            - "--host-interface=eni+"
            - "--verbose"
          env:
            - name: HOST_IP
              valueFrom:
                fieldRef:
                  fieldPath: status.podIP
          ports:
            - containerPort: 8181
          securityContext:
            privileged: true
```

### Create Service Account and RBAC

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: kube2iam
  namespace: kube-system
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: kube2iam
rules:
  - apiGroups: [""]
    resources: ["namespaces", "pods"]
    verbs: ["get", "watch", "list"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: kube2iam
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: kube2iam
subjects:
  - kind: ServiceAccount
    name: kube2iam
    namespace: kube-system
```

---

## AWS IAM Configuration

### Node Role Trust Policy

The node IAM role must be able to assume the pod roles:

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

### Pod Role Trust Policy

Each pod role must trust the node role:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::123456789012:role/kubernetes-node-role"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

---

## Usage

### Annotate Pods with IAM Role

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

### Annotate Deployments

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  template:
    metadata:
      annotations:
        iam.amazonaws.com/role: k8s-my-app-role
    spec:
      containers:
        - name: my-app
          image: my-app:latest
```

### Restrict Roles by Namespace

Use namespace annotations to restrict which roles can be assumed:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production
  annotations:
    iam.amazonaws.com/allowed-roles: '["k8s-production-*"]'
```

---

## Security Considerations

### Limitations

- Uses iptables rules which can be bypassed by privileged containers.
- Relies on the EC2 metadata service endpoint.
- Single point of failure if kube2iam pods crash.

### Recommendations

- **Restrict namespace roles:** Use allowed-roles annotations to limit role assumption per namespace.
- **Use network policies:** Prevent pods from bypassing kube2iam.
- **Monitor assume role events:** Track role assumption in AWS CloudTrail.
- **Consider alternatives:** AWS now offers IAM Roles for Service Accounts (IRSA) which is more secure.

---

## Migration to IRSA

AWS recommends migrating to IAM Roles for Service Accounts (IRSA) for better security:

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-app
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::123456789012:role/my-app-role
```

IRSA advantages over kube2iam:

- Does not require privileged containers.
- Uses OIDC federation instead of metadata service.
- No iptables manipulation required.
- Better credential isolation.

---

## References

This article is based on information from the following official sources:

1. [kube2iam GitHub Repository](https://github.com/jtblin/kube2iam) - GitHub
2. [IAM Roles for Service Accounts](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html) - AWS Documentation
3. [Instance Metadata and User Data](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html) - AWS Documentation
