---
title: "Service Account Token Security"
sidebar_position: 11
description: "Best practices for securing Kubernetes service account tokens and preventing privilege escalation through token abuse."
keywords: [kubernetes security best practices, service account security, token security, bound tokens, token projection, RBAC security, least privilege, workload identity, service account best practices, kubernetes authentication]
---

# Service Account Token Security

**Required knowledge for the CKS certification.**

Service account tokens provide pods with authentication credentials for accessing the Kubernetes API server. Misconfigured tokens with excessive permissions, long expiration times, or automatic mounting create significant security risks including privilege escalation and lateral movement.

**Issue:** Service account tokens are automatically mounted into every pod by default, granting unnecessary API access that can be exploited if containers are compromised.<br/>
**Fix:** Disable automatic token mounting, use bound tokens with short expiration, and apply strict RBAC controls to limit service account permissions.

---

## 1. Disable Automatic Service Account Token Mounting

**Issue:** Every pod automatically mounts a service account token, even if it never needs to access the Kubernetes API.<br/>
**Fix:** Disable `automountServiceAccountToken` at both ServiceAccount and Pod levels.

### Disable at ServiceAccount Level

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: app-service-account
  namespace: production
automountServiceAccountToken: false
```

### Disable at Pod Level

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: frontend-app
  namespace: production
spec:
  serviceAccountName: app-service-account
  automountServiceAccountToken: false
  containers:
    - name: nginx
      image: nginx:1.21
```

### Set Default Deny Policy

Create a default service account that denies token mounting:

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: default
  namespace: production
automountServiceAccountToken: false
```

---

## 2. Use Bound Service Account Tokens

**Issue:** Legacy service account tokens are long-lived (non-expiring) and can be used from anywhere, even outside the cluster.<br/>
**Fix:** Use bound service account tokens introduced in Kubernetes 1.21+ with audience, expiration, and bound to pod lifetime.

### Configure Token Request Projection

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: api-client
  namespace: production
spec:
  serviceAccountName: api-service-account
  containers:
    - name: app
      image: myapp:1.0
      volumeMounts:
        - name: token
          mountPath: /var/run/secrets/tokens
          readOnly: true
  volumes:
    - name: token
      projected:
        sources:
          - serviceAccountToken:
              path: token
              expirationSeconds: 3600
              audience: api.company.com
```

### Verify Token is Bound

```bash
# Inside the pod, check token properties
TOKEN=$(cat /var/run/secrets/tokens/token)

# Decode JWT to verify expiration and audience
echo $TOKEN | cut -d '.' -f 2 | base64 -d | jq .
```

**Output shows:**

```json
{
  "aud": ["api.company.com"],
  "exp": 1702345600,
  "iat": 1702342000,
  "iss": "https://kubernetes.default.svc.cluster.local",
  "kubernetes.io": {
    "namespace": "production",
    "pod": {
      "name": "api-client",
      "uid": "abc-123"
    },
    "serviceaccount": {
      "name": "api-service-account",
      "uid": "def-456"
    }
  }
}
```

### Set Short Expiration Times

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: batch-job
  namespace: production
spec:
  serviceAccountName: batch-sa
  containers:
    - name: worker
      image: worker:1.0
      volumeMounts:
        - name: token
          mountPath: /var/run/secrets/tokens
  volumes:
    - name: token
      projected:
        sources:
          - serviceAccountToken:
              path: token
              expirationSeconds: 600 # 10 minutes
```

---

## 3. Apply Least Privilege RBAC

**Issue:** Service accounts often have overly broad permissions granting access to resources they don't need.<br/>
**Fix:** Apply principle of least privilege and grant only the minimum required permissions.

### Create Minimal Role

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: configmap-reader
  namespace: production
rules:
  - apiGroups: [""]
    resources: ["configmaps"]
    verbs: ["get", "list"]
    resourceNames: ["app-config"] # Restrict to specific ConfigMap
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: app-configmap-reader
  namespace: production
subjects:
  - kind: ServiceAccount
    name: app-service-account
    namespace: production
roleRef:
  kind: Role
  name: configmap-reader
  apiGroup: rbac.authorization.k8s.io
```

### Deny Dangerous Permissions

Never grant these permissions to application service accounts:

```yaml
# DANGEROUS - DO NOT USE
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: dangerous-role
  namespace: production
rules:
  # NEVER allow secrets access
  - apiGroups: [""]
    resources: ["secrets"]
    verbs: ["get", "list"]

  # NEVER allow pod creation
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["create"]

  # NEVER allow serviceaccounts/token
  - apiGroups: [""]
    resources: ["serviceaccounts/token"]
    verbs: ["create"]
```

### Audit Service Account Permissions

```bash
# List all service accounts with their roles
kubectl get rolebindings,clusterrolebindings -A -o json | \
  jq '.items[] | select(.subjects[]?.kind == "ServiceAccount")'

# Check specific service account permissions
kubectl auth can-i --list --as=system:serviceaccount:production:app-sa

# Find service accounts with secrets access
kubectl get roles,clusterroles -A -o json | \
  jq '.items[] | select(.rules[]? | select(.resources[]? == "secrets" and (.verbs[]? == "get" or .verbs[]? == "*")))'
```

---

## 4. Disable Legacy Service Account Token Secrets

**Issue:** Pre-1.24 clusters automatically create non-expiring token secrets for each service account.<br/>
**Fix:** Disable automatic token secret creation and clean up existing legacy tokens.

### Disable LegacyServiceAccountTokenNoAutoGeneration

```bash
# Add to kube-apiserver flags
kube-apiserver \
  --feature-gates=LegacyServiceAccountTokenNoAutoGeneration=true
```

### Delete Existing Legacy Tokens

```bash
# List all legacy token secrets
kubectl get secrets -A -o json | \
  jq -r '.items[] | select(.type=="kubernetes.io/service-account-token") | "\(.metadata.namespace) \(.metadata.name)"'

# Delete legacy tokens (be careful!)
kubectl delete secret -n production default-token-xxxxx
```

### Verify No Legacy Tokens Remain

```bash
# Check service accounts have no token secrets
kubectl get sa app-sa -n production -o jsonpath='{.secrets}'

# Should return empty: []
```

---

## 5. Implement Token Request API Controls

**Issue:** The TokenRequest API can be abused to generate tokens for any service account if permissions are too broad.<br/>
**Fix:** Restrict access to the serviceaccounts/token subresource.

### Deny TokenRequest Access by Default

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: no-token-request
rules:
  # Explicitly deny token creation
  - apiGroups: [""]
    resources: ["serviceaccounts/token"]
    verbs: [] # Empty verbs = no access
```

### Audit TokenRequest Usage

```yaml
apiVersion: audit.k8s.io/v1
kind: Policy
rules:
  - level: RequestResponse
    verbs: ["create"]
    resources:
      - group: ""
        resources: ["serviceaccounts/token"]
    omitStages:
      - RequestReceived
```

### Monitor Token Creation

Using Falco:

```yaml
- rule: Suspicious Token Request
  desc: Detect TokenRequest API abuse
  condition: >
    kevt and ka.verb = create and
    ka.target.resource = serviceaccounts/token and
    ka.target.subresource = token
  output: >
    TokenRequest API called (user=%ka.user.name
    target_sa=%ka.target.name ns=%ka.target.namespace)
  priority: WARNING
  tags: [k8s, token, privilege_escalation]
```

---

## 6. Use Workload Identity Federation

**Issue:** Service account tokens provide cluster API access when applications only need external service authentication.<br/>
**Fix:** Use workload identity to authenticate to external services without cluster API access.

### AWS EKS with IRSA

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: s3-access-sa
  namespace: production
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::123456789012:role/S3AccessRole
automountServiceAccountToken: false # No cluster API access needed
---
apiVersion: v1
kind: Pod
metadata:
  name: s3-app
  namespace: production
spec:
  serviceAccountName: s3-access-sa
  containers:
    - name: app
      image: myapp:1.0
      env:
        - name: AWS_ROLE_ARN
          value: arn:aws:iam::123456789012:role/S3AccessRole
        - name: AWS_WEB_IDENTITY_TOKEN_FILE
          value: /var/run/secrets/eks.amazonaws.com/serviceaccount/token
```

### GKE with Workload Identity

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: gcs-access-sa
  namespace: production
  annotations:
    iam.gke.io/gcp-service-account: gcs-accessor@project.iam.gserviceaccount.com
automountServiceAccountToken: false
---
apiVersion: v1
kind: Pod
metadata:
  name: gcs-app
  namespace: production
spec:
  serviceAccountName: gcs-access-sa
  containers:
    - name: app
      image: myapp:1.0
```

Bind the GCP service account:

```bash
gcloud iam service-accounts add-iam-policy-binding \
  gcs-accessor@project.iam.gserviceaccount.com \
  --role roles/iam.workloadIdentityUser \
  --member "serviceAccount:project.svc.id.goog[production/gcs-access-sa]"
```

### Azure AKS with Managed Identity

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: storage-access-sa
  namespace: production
  annotations:
    azure.workload.identity/client-id: "12345678-1234-1234-1234-123456789012"
automountServiceAccountToken: false
---
apiVersion: v1
kind: Pod
metadata:
  name: storage-app
  namespace: production
  labels:
    azure.workload.identity/use: "true"
spec:
  serviceAccountName: storage-access-sa
  containers:
    - name: app
      image: myapp:1.0
```

---

## 7. Implement Pod Security Admission

**Issue:** Pods can be created with service accounts that have excessive privileges without validation.<br/>
**Fix:** Use Pod Security Admission to enforce controls on service account usage.

### Enforce Restricted Profile

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/audit: restricted
    pod-security.kubernetes.io/warn: restricted
```

### Create Admission Policy for Service Accounts

```yaml
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicy
metadata:
  name: require-token-disabled
spec:
  failurePolicy: Fail
  matchConstraints:
    resourceRules:
      - apiGroups: [""]
        apiVersions: ["v1"]
        operations: ["CREATE", "UPDATE"]
        resources: ["pods"]
  validations:
    - expression: "object.spec.automountServiceAccountToken == false"
      message: "Pods must explicitly disable service account token mounting"
```

---

## 8. Monitor and Audit Token Usage

**Issue:** Service account token abuse goes undetected without proper monitoring.<br/>
**Fix:** Implement comprehensive audit logging and alerting for token-related activity.

### Enable API Server Audit Logging

```yaml
apiVersion: audit.k8s.io/v1
kind: Policy
rules:
  - level: RequestResponse
    verbs: ["create"]
    resources:
      - group: ""
        resources: ["serviceaccounts", "serviceaccounts/token"]
  - level: Metadata
    verbs: ["impersonate"]
    resources:
      - group: ""
        resources: ["serviceaccounts"]
```

### Create Alerts for Suspicious Activity

Using Prometheus + AlertManager:

```yaml
- alert: ServiceAccountTokenCreated
  expr: |
    increase(apiserver_audit_event_total{
      verb="create",
      objectRef_resource="serviceaccounts",
      objectRef_subresource="token"
    }[5m]) > 0
  labels:
    severity: warning
  annotations:
    summary: "Service account token created via API"
```

### Query Token Usage Patterns

```bash
# Find pods with mounted tokens
kubectl get pods -A -o json | \
  jq '.items[] | select(.spec.automountServiceAccountToken != false)'

# Check API audit logs for token usage
kubectl logs -n kube-system kube-apiserver-master | \
  grep "serviceaccounts/token"
```

---

## Security Checklist

- [ ] Disable `automountServiceAccountToken` by default for all service accounts
- [ ] Use bound service account tokens with short expiration (< 1 hour)
- [ ] Apply least privilege RBAC to all service accounts
- [ ] Remove permissions for secrets, pods, and serviceaccounts/token
- [ ] Disable legacy service account token secret creation
- [ ] Delete existing non-expiring token secrets
- [ ] Use workload identity federation for external service authentication
- [ ] Implement Pod Security Admission with restricted profile
- [ ] Enable comprehensive audit logging for token-related operations
- [ ] Monitor TokenRequest API usage with alerts
- [ ] Regularly audit service account permissions
- [ ] Document which service accounts require API access and why

---

## References

This article is based on information from the following official sources:

1. [Service Accounts](https://kubernetes.io/docs/concepts/security/service-accounts/) - Kubernetes Documentation
2. [Bound Service Account Tokens](https://kubernetes.io/docs/reference/access-authn-authz/service-accounts-admin/#bound-service-account-tokens) - Kubernetes Documentation
3. [Configure Service Accounts for Pods](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/) - Kubernetes Documentation
4. [Pod Security Admission](https://kubernetes.io/docs/concepts/security/pod-security-admission/) - Kubernetes Documentation
