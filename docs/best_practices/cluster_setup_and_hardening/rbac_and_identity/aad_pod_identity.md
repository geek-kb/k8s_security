---
sidebar_position: 22
title: "aad-pod-identity"
description: "aad-pod-identity enables Kubernetes pods on Azure to use Azure Active Directory identities for accessing Azure resources without storing credentials."
keywords: [kubernetes security tool, aad-pod-identity, Azure AD, pod identity, kubernetes Azure integration, managed identity, credential management, cloud security, AKS]
tags: [tool, rbac, cloud-security, Azure]
related:
  - /docs/best_practices/cluster_setup_and_hardening/rbac_and_identity/kube2iam/
  - /docs/best_practices/cluster_setup_and_hardening/network_security/cloud_metadata_mitigation/
  - /docs/attack_vectors/cloud_metadata_service_abuse/
---

# aad-pod-identity

**aad-pod-identity** enables Kubernetes pods to use Azure Active Directory (Azure AD) managed identities for accessing Azure resources. Pods can authenticate to Azure services like Key Vault, Storage, and databases without storing credentials in secrets or configuration files.

This component is particularly useful for Azure Kubernetes Service (AKS) clusters but can also be deployed on self-managed Kubernetes clusters in Azure.

---

## How It Works

1. An AzureIdentity custom resource defines a managed identity.
2. An AzureIdentityBinding links the identity to pods with matching labels.
3. The Node Managed Identity (NMI) pods intercept Azure Instance Metadata Service (IMDS) requests.
4. The Managed Identity Controller (MIC) assigns identities to nodes as needed.
5. Pods receive Azure AD tokens for their assigned identity.

---

## Prerequisites

- Azure Kubernetes Service (AKS) or Kubernetes cluster running in Azure.
- User-assigned managed identities created in Azure.
- Azure RBAC permissions configured for managed identities.

---

## Installation

### Using Helm

```bash
helm repo add aad-pod-identity https://raw.githubusercontent.com/Azure/aad-pod-identity/master/charts
helm install aad-pod-identity aad-pod-identity/aad-pod-identity --namespace kube-system
```

### Using kubectl

```bash
kubectl apply -f https://raw.githubusercontent.com/Azure/aad-pod-identity/master/deploy/infra/deployment-rbac.yaml
```

---

## Create Azure Resources

### Create User-Assigned Managed Identity

```bash
# Create managed identity
az identity create \
  --name my-app-identity \
  --resource-group my-resource-group \
  --location eastus

# Get identity client ID and resource ID
CLIENT_ID=$(az identity show --name my-app-identity --resource-group my-resource-group --query clientId -o tsv)
RESOURCE_ID=$(az identity show --name my-app-identity --resource-group my-resource-group --query id -o tsv)
```

### Grant Azure RBAC Permissions

```bash
# Grant access to Key Vault
az keyvault set-policy \
  --name my-key-vault \
  --object-id $CLIENT_ID \
  --secret-permissions get list

# Grant access to Storage Account
az role assignment create \
  --role "Storage Blob Data Reader" \
  --assignee $CLIENT_ID \
  --scope /subscriptions/<subscription-id>/resourceGroups/my-resource-group/providers/Microsoft.Storage/storageAccounts/mystorageaccount
```

---

## Configure Kubernetes Resources

### Create AzureIdentity

```yaml
apiVersion: aadpodidentity.k8s.io/v1
kind: AzureIdentity
metadata:
  name: my-app-identity
  namespace: default
spec:
  type: 0
  resourceID: /subscriptions/<subscription-id>/resourcegroups/my-resource-group/providers/Microsoft.ManagedIdentity/userAssignedIdentities/my-app-identity
  clientID: <client-id-of-managed-identity>
```

### Create AzureIdentityBinding

```yaml
apiVersion: aadpodidentity.k8s.io/v1
kind: AzureIdentityBinding
metadata:
  name: my-app-identity-binding
  namespace: default
spec:
  azureIdentity: my-app-identity
  selector: my-app
```

### Deploy Pod with Identity

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-app
  labels:
    aadpodidbinding: my-app
spec:
  containers:
    - name: my-app
      image: my-app:latest
      env:
        - name: AZURE_CLIENT_ID
          value: "<client-id-of-managed-identity>"
```

---

## Usage in Applications

### Python Example

```python
from azure.identity import ManagedIdentityCredential
from azure.keyvault.secrets import SecretClient

# Uses pod identity automatically
credential = ManagedIdentityCredential()
client = SecretClient(
    vault_url="https://my-key-vault.vault.azure.net/",
    credential=credential
)

secret = client.get_secret("my-secret")
print(f"Secret value: {secret.value}")
```

### .NET Example

```csharp
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;

var credential = new ManagedIdentityCredential();
var client = new SecretClient(
    new Uri("https://my-key-vault.vault.azure.net/"),
    credential
);

KeyVaultSecret secret = await client.GetSecretAsync("my-secret");
Console.WriteLine($"Secret value: {secret.Value}");
```

---

## Security Best Practices

### Restrict Identity Assignment

Use AzureIdentityBinding with specific namespaces:

```yaml
apiVersion: aadpodidentity.k8s.io/v1
kind: AzureIdentityBinding
metadata:
  name: my-app-identity-binding
  namespace: production  # Only pods in this namespace can use this binding
spec:
  azureIdentity: my-app-identity
  selector: my-app
```

### Use Exception Lists

Prevent pods from using certain identities:

```yaml
apiVersion: aadpodidentity.k8s.io/v1
kind: AzurePodIdentityException
metadata:
  name: mic-exception
  namespace: kube-system
spec:
  podLabels:
    app: mic
    component: mic
```

### Monitor Identity Usage

Enable Azure Monitor logging:

```bash
az monitor diagnostic-settings create \
  --name pod-identity-logs \
  --resource $RESOURCE_ID \
  --logs '[{"category": "Audit", "enabled": true}]' \
  --workspace <log-analytics-workspace-id>
```

---

## Migration to Workload Identity

Microsoft recommends migrating to Azure AD Workload Identity, which is the successor to aad-pod-identity:

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-app
  annotations:
    azure.workload.identity/client-id: "<client-id>"
```

Workload Identity advantages:

- Uses OIDC federation instead of IMDS interception.
- No privileged pods required.
- Better security isolation.
- Native AKS integration.

---

## Troubleshooting

### Check MIC Logs

```bash
kubectl logs -n kube-system -l app.kubernetes.io/component=mic
```

### Check NMI Logs

```bash
kubectl logs -n kube-system -l app.kubernetes.io/component=nmi
```

### Verify Identity Assignment

```bash
kubectl describe azureidentity my-app-identity
kubectl describe azureidentitybinding my-app-identity-binding
```

---

## References

This article is based on information from the following official sources:

1. [aad-pod-identity GitHub Repository](https://github.com/Azure/aad-pod-identity) - Microsoft Azure
2. [Use Azure AD Pod Identity](https://learn.microsoft.com/en-us/azure/aks/use-azure-ad-pod-identity) - Microsoft Documentation
3. [Azure AD Workload Identity](https://azure.github.io/azure-workload-identity/) - Microsoft Documentation
