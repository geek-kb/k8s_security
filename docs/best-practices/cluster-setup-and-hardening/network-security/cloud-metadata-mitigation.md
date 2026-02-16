---
sidebar_position: 16
title: "Cloud Metadata Service Mitigation"
description: "How to prevent pods from accessing cloud provider metadata services (IMDS) and stealing IAM credentials in Kubernetes."
keywords:
  - kubernetes cloud security
  - IMDS mitigation
  - block metadata service
  - AWS IMDSv2
  - GCP workload identity
  - Azure pod identity
  - network policy egress
  - cloud credential protection
  - kubernetes best practices
  - CKS
tags: [best-practice, mitigation, cloud-security, network, CKS]
related:
  - /kubernetes-security/attack-vectors/cloud-metadata-service-abuse/
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/network-security/network-policies/
  - /kubernetes-security/best-practices/cluster-setup-and-hardening/network-security/egress-control/
  - /kubernetes-security/fundamentals/the-4-c-cloud-native-security/
---

# Cloud Metadata Service Mitigation

**Required knowledge for the CKS certification.**

Cloud providers expose an Instance Metadata Service (IMDS) at `169.254.169.254` that allows workloads to retrieve temporary IAM credentials. In Kubernetes clusters running on cloud infrastructure, pods can access this service by default, creating a significant privilege escalation risk.

This guide covers techniques to block metadata service access and implement secure alternatives for cloud identity management.

---

## 1. Block Metadata Access with NetworkPolicies

The most direct mitigation is to block egress traffic to the metadata service IP address using Kubernetes NetworkPolicies.

**Issue:** By default, all pods can reach `169.254.169.254`.<br/>
**Fix:** Apply a cluster-wide NetworkPolicy to deny egress to the metadata service.

### Example: Deny Metadata Access (Default-Deny Egress)

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-metadata-access
  namespace: default
spec:
  podSelector: {}
  policyTypes:
    - Egress
  egress:
    - to:
        - ipBlock:
            cidr: 0.0.0.0/0
            except:
              - 169.254.169.254/32
```

Apply this policy to every namespace where workloads run:

```bash
for ns in $(kubectl get namespaces -o jsonpath='{.items[*].metadata.name}'); do
  kubectl apply -n $ns -f deny-metadata-policy.yaml
done
```

**Note:** This requires a CNI that supports NetworkPolicies (Calico, Cilium, Weave Net).

---

## 2. Use IMDSv2 on AWS (Require Session Tokens)

AWS Instance Metadata Service v2 (IMDSv2) requires a session token for all metadata requests, making SSRF-based attacks significantly harder.

**Issue:** IMDSv1 allows simple GET requests to retrieve credentials.<br/>
**Fix:** Enforce IMDSv2 at the instance level and set a low hop limit.

### Example: Enforce IMDSv2 on EKS Node Groups

When creating or updating EKS node groups, configure the metadata options:

```bash
aws ec2 modify-instance-metadata-options \
  --instance-id i-1234567890abcdef0 \
  --http-tokens required \
  --http-put-response-hop-limit 1 \
  --http-endpoint enabled
```

For EKS managed node groups via Terraform:

```hcl
resource "aws_eks_node_group" "workers" {
  # ... other configuration ...

  launch_template {
    id      = aws_launch_template.eks_nodes.id
    version = aws_launch_template.eks_nodes.latest_version
  }
}

resource "aws_launch_template" "eks_nodes" {
  name_prefix = "eks-node-"

  metadata_options {
    http_endpoint               = "enabled"
    http_tokens                 = "required"  # Enforce IMDSv2
    http_put_response_hop_limit = 1           # Block container access
    instance_metadata_tags      = "disabled"
  }
}
```

Setting `http_put_response_hop_limit = 1` prevents containers from reaching the metadata service because the request must traverse the container network namespace.

---

## 3. Use GCP Workload Identity

On GKE, Workload Identity allows pods to authenticate as Google Cloud service accounts without accessing the node's metadata service.

**Issue:** Pods inherit the node's GCE service account credentials via metadata.<br/>
**Fix:** Use Workload Identity to bind Kubernetes ServiceAccounts to GCP service accounts.

### Example: Enable Workload Identity on GKE

1. Enable Workload Identity on the cluster:

```bash
gcloud container clusters update CLUSTER_NAME \
  --workload-pool=PROJECT_ID.svc.id.goog
```

2. Create a Kubernetes ServiceAccount:

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-app-sa
  namespace: default
  annotations:
    iam.gke.io/gcp-service-account: my-gcp-sa@PROJECT_ID.iam.gserviceaccount.com
```

3. Bind the Kubernetes SA to the GCP service account:

```bash
gcloud iam service-accounts add-iam-policy-binding \
  my-gcp-sa@PROJECT_ID.iam.gserviceaccount.com \
  --role roles/iam.workloadIdentityUser \
  --member "serviceAccount:PROJECT_ID.svc.id.goog[default/my-app-sa]"
```

4. Use the ServiceAccount in your pod:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-app
spec:
  serviceAccountName: my-app-sa
  containers:
    - name: app
      image: my-app:latest
```

### Block Metadata Server on GKE

Additionally, block the metadata server at the node level:

```bash
gcloud container clusters update CLUSTER_NAME \
  --workload-metadata=GKE_METADATA
```

This prevents pods from querying `169.254.169.254` directly.

---

## 4. Use Azure Workload Identity

On AKS, Azure Workload Identity provides a secure way for pods to authenticate to Azure services without accessing the node's managed identity.

**Issue:** Pods can access the Azure IMDS to retrieve managed identity tokens.<br/>
**Fix:** Use Azure Workload Identity with federated credentials.

### Example: Configure Azure Workload Identity

1. Enable Workload Identity on AKS:

```bash
az aks update \
  --resource-group myResourceGroup \
  --name myAKSCluster \
  --enable-oidc-issuer \
  --enable-workload-identity
```

2. Create an Azure AD application and federated credential:

```bash
az identity create --name myIdentity --resource-group myResourceGroup

az identity federated-credential create \
  --name myFederatedCredential \
  --identity-name myIdentity \
  --resource-group myResourceGroup \
  --issuer "${AKS_OIDC_ISSUER}" \
  --subject system:serviceaccount:default:my-app-sa
```

3. Create a Kubernetes ServiceAccount with the identity annotation:

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-app-sa
  namespace: default
  annotations:
    azure.workload.identity/client-id: <MANAGED_IDENTITY_CLIENT_ID>
```

4. Deploy pods with the workload identity label:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-app
  labels:
    azure.workload.identity/use: "true"
spec:
  serviceAccountName: my-app-sa
  containers:
    - name: app
      image: my-app:latest
```

---

## 5. Use Pod Identity Alternatives (IRSA on EKS)

AWS IAM Roles for Service Accounts (IRSA) provides fine-grained IAM permissions to individual pods without using the node's IAM role.

**Issue:** All pods on a node share the node's IAM permissions.<br/>
**Fix:** Use IRSA to assign specific IAM roles to Kubernetes ServiceAccounts.

### Example: Configure IRSA on EKS

1. Create an IAM OIDC provider for your cluster:

```bash
eksctl utils associate-iam-oidc-provider \
  --cluster my-cluster \
  --approve
```

2. Create an IAM role with a trust policy for the ServiceAccount:

```bash
eksctl create iamserviceaccount \
  --name my-app-sa \
  --namespace default \
  --cluster my-cluster \
  --role-name my-app-role \
  --attach-policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess \
  --approve
```

3. Use the ServiceAccount in your pod:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-app
spec:
  serviceAccountName: my-app-sa
  containers:
    - name: app
      image: my-app:latest
```

The pod receives credentials via a projected token, not through the metadata service.

---

## 6. Monitor and Detect Metadata Access

Even with preventive controls, monitoring for metadata access attempts helps detect misconfigurations or attacks.

### Example: Falco Rule for Metadata Access

```yaml
- rule: Detect Metadata Service Access
  desc: Detect attempts to access cloud metadata service
  condition: >
    evt.type in (connect, sendto) and
    fd.sip = "169.254.169.254" and
    container and
    not k8s.ns.name in (kube-system)
  output: >
    Metadata service access detected
    (user=%user.name command=%proc.cmdline container=%container.name
    namespace=%k8s.ns.name pod=%k8s.pod.name)
  priority: WARNING
  tags: [network, mitre_credential_access, cloud]
```

### CloudTrail Monitoring (AWS)

Monitor for unusual credential usage patterns:

```bash
# Look for AssumeRole events in the past hour
aws cloudtrail lookup-events \
  --lookup-attributes AttributeKey=EventName,AttributeValue=AssumeRole \
  --start-time "$(date -u -v-1H +%Y-%m-%dT%H:%M:%SZ 2>/dev/null || date -u -d '1 hour ago' +%Y-%m-%dT%H:%M:%SZ)"
```

This command works on both macOS (`-v-1H`) and Linux (`-d '1 hour ago'`).

---

## Summary

To prevent cloud metadata service abuse in Kubernetes:

| Control | AWS | GCP | Azure |
|---------|-----|-----|-------|
| **Block via NetworkPolicy** | Yes | Yes | Yes |
| **Require token-based IMDS** | IMDSv2 with hop limit 1 | N/A | N/A |
| **Workload Identity** | IRSA | Workload Identity | Workload Identity |
| **Block at node level** | Hop limit | GKE_METADATA | N/A |
| **Monitoring** | CloudTrail | Cloud Audit Logs | Azure Monitor |

**Defense in depth approach:**

1. Apply NetworkPolicies to block egress to `169.254.169.254`
2. Use cloud-native workload identity (IRSA, GCP Workload Identity, Azure Workload Identity)
3. Configure IMDSv2 with hop limit 1 on AWS
4. Monitor for metadata access attempts with Falco and cloud audit logs
5. Apply least-privilege IAM policies to workload identities

---

## References

This article is based on information from the following official sources:

1. [Use IMDSv2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html) - AWS Documentation
2. [Workload Identity](https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity) - Google Cloud Documentation
3. [Azure Workload Identity](https://learn.microsoft.com/en-us/azure/aks/workload-identity-overview) - Microsoft Azure Documentation
4. [IAM Roles for Service Accounts](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html) - AWS EKS Documentation
5. [Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/) - Kubernetes Documentation
