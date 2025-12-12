---
title: "Securing ImagePullSecrets"
sidebar_position: 10
description: "Best practices for protecting container registry credentials and preventing ImagePullSecrets theft in Kubernetes."
---

# Securing ImagePullSecrets

**Required knowledge for the CKS certification.**

Container registry credentials stored as **ImagePullSecrets** are high-value targets for attackers. If compromised, these credentials enable unauthorized access to private registries, intellectual property theft, and supply chain attacks through malicious image injection.

**Issue:** ImagePullSecrets are stored as base64-encoded plaintext in Kubernetes secrets, making them vulnerable to extraction by anyone with secret read access.<br/>
**Fix:** Implement defense-in-depth strategies including RBAC restrictions, secret encryption, short-lived credentials, and registry security controls.

---

## 1. Restrict RBAC Access to Secrets

**Issue:** Overly permissive RBAC roles grant unnecessary access to secrets containing registry credentials.<br/>
**Fix:** Apply the principle of least privilege and deny direct secret access where possible.

### Deny Direct Secret Access

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: app-deployer
  namespace: production
rules:
  - apiGroups: [""]
    resources: ["pods", "services", "configmaps"]
    verbs: ["get", "list", "create", "update", "delete"]
  - apiGroups: ["apps"]
    resources: ["deployments", "statefulsets"]
    verbs: ["get", "list", "create", "update", "delete"]
  # Explicitly deny secrets access
  # Do not include secrets in the rules
```

### Create Service Account Without Secret Mounting

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: limited-sa
  namespace: production
automountServiceAccountToken: false
```

### Audit Secret Access

```bash
# Check who has secrets access in a namespace
kubectl auth can-i get secrets --as system:serviceaccount:production:default -n production

# List all roles with secret access
kubectl get roles,clusterroles -A -o json | \
  jq '.items[] | select(.rules[]? | select(.resources[]? == "secrets"))'
```

---

## 2. Use Encrypted Secrets at Rest

**Issue:** Secrets are stored unencrypted in etcd by default, allowing anyone with etcd access to read registry credentials.<br/>
**Fix:** Enable encryption at rest for Kubernetes secrets.

### Enable etcd Encryption

```yaml
apiVersion: apiserver.config.k8s.io/v1
kind: EncryptionConfiguration
resources:
  - resources:
      - secrets
    providers:
      - aescbc:
          keys:
            - name: key1
              secret: $(head -c 32 /dev/urandom | base64)
      - identity: {}
```

Apply the encryption configuration:

```bash
# Configure kube-apiserver with encryption config
kube-apiserver \
  --encryption-provider-config=/etc/kubernetes/encryption-config.yaml
```

Verify encryption:

```bash
# Check if a secret is encrypted in etcd
ETCDCTL_API=3 etcdctl get /registry/secrets/production/registry-credentials \
  --endpoints=https://127.0.0.1:2379 \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/server.crt \
  --key=/etc/kubernetes/pki/etcd/server.key
```

---

## 3. Use Short-Lived Registry Tokens

**Issue:** Long-lived static credentials in ImagePullSecrets remain valid indefinitely if compromised.<br/>
**Fix:** Implement token rotation and use registry-native short-lived access tokens.

### AWS ECR with IAM Roles (IRSA)

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: ecr-pull-sa
  namespace: production
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::123456789012:role/ECRPullRole
---
apiVersion: v1
kind: Pod
metadata:
  name: app-pod
  namespace: production
spec:
  serviceAccountName: ecr-pull-sa
  containers:
    - name: app
      image: 123456789012.dkr.ecr.us-west-2.amazonaws.com/myapp:latest
```

The pod uses IAM roles to obtain temporary ECR credentials automatically.

### Azure AKR with Managed Identity

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: app-pod
  namespace: production
spec:
  containers:
    - name: app
      image: myregistry.azurecr.io/myapp:latest
  nodeSelector:
    kubernetes.io/os: linux
```

Configure AKS cluster with managed identity for ACR access:

```bash
az aks update -n myAKSCluster -g myResourceGroup --attach-acr myregistry
```

### GCR with Workload Identity

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: gcr-pull-sa
  namespace: production
  annotations:
    iam.gke.io/gcp-service-account: gcr-puller@project.iam.gserviceaccount.com
---
apiVersion: v1
kind: Pod
metadata:
  name: app-pod
  namespace: production
spec:
  serviceAccountName: gcr-pull-sa
  containers:
    - name: app
      image: gcr.io/project/myapp:latest
```

---

## 4. Implement Secret Rotation

**Issue:** Static registry credentials are never rotated, increasing risk if compromised.<br/>
**Fix:** Automate secret rotation using external secret management tools.

### External Secrets Operator with HashiCorp Vault

```yaml
apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: vault-backend
  namespace: production
spec:
  provider:
    vault:
      server: "https://vault.company.com"
      path: "secret"
      version: "v2"
      auth:
        kubernetes:
          mountPath: "kubernetes"
          role: "production-role"
---
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: registry-credentials
  namespace: production
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: vault-backend
    kind: SecretStore
  target:
    name: registry-credentials
    creationPolicy: Owner
    template:
      type: kubernetes.io/dockerconfigjson
  data:
    - secretKey: .dockerconfigjson
      remoteRef:
        key: registry/credentials
        property: dockerconfig
```

---

## 5. Use Pod Security Standards

**Issue:** Pods can mount any secrets in their namespace, including ImagePullSecrets.<br/>
**Fix:** Apply Pod Security Standards to restrict secret access at the pod level.

### Apply Restricted Pod Security

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

### Use AdmissionPolicy to Restrict Secret Mounts

```yaml
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicy
metadata:
  name: restrict-secret-mounts
spec:
  failurePolicy: Fail
  matchConstraints:
    resourceRules:
      - apiGroups: [""]
        apiVersions: ["v1"]
        operations: ["CREATE", "UPDATE"]
        resources: ["pods"]
  validations:
    - expression: "!object.spec.volumes.exists(v, v.secret != null && v.secret.secretName.startsWith('registry-'))"
      message: "Direct mounting of registry secrets is not allowed"
```

---

## 6. Implement Registry Access Controls

**Issue:** Stolen credentials provide full registry access without additional controls.<br/>
**Fix:** Enable registry-side security features to limit credential misuse.

### Enable Registry IP Allowlisting

For Docker Registry:

```yaml
version: 0.1
http:
  addr: :5000
  secret: randomsecret
  headers:
    X-Content-Type-Options: [nosniff]
middleware:
  registry:
    - name: cloudfront
      options:
        privatekey: /path/to/pk.pem
        keypairid: APKAXXXXXXXXXXXXXXXX
        baseurl: https://registry.company.com
  storage:
    - name: s3
      options:
        accesskey: AKIAIOSFODNN7EXAMPLE
        secretkey: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
        region: us-west-2
        bucket: my-registry
        allowedips:
          - 10.0.0.0/8
          - 172.16.0.0/12
```

### Enable Registry Audit Logging

For Harbor Registry:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: harbor-config
  namespace: harbor
data:
  config.yaml: |
    harbor:
      admin_password: Harbor12345
      database:
        password: changeit
      jobservice:
        secret: changeit
      registry:
        secret: changeit
    audit:
      enabled: true
      log_level: info
      rotation:
        max_size: 100
        max_age: 30
```

### Use Registry Image Scanning

```bash
# Enable vulnerability scanning in Harbor
curl -X PUT "https://harbor.company.com/api/v2.0/projects/production" \
  -H "Authorization: Basic $(echo -n admin:Harbor12345 | base64)" \
  -H "Content-Type: application/json" \
  -d '{
    "metadata": {
      "auto_scan": "true",
      "prevent_vul": "true",
      "severity": "high"
    }
  }'
```

---

## 7. Monitor and Audit Secret Access

**Issue:** Secret theft goes undetected without proper monitoring and alerting.<br/>
**Fix:** Implement comprehensive audit logging and alerting for secret access.

### Enable Audit Logging for Secrets

```yaml
apiVersion: audit.k8s.io/v1
kind: Policy
rules:
  - level: RequestResponse
    verbs: ["get", "list", "watch"]
    resources:
      - group: ""
        resources: ["secrets"]
    omitStages:
      - RequestReceived
  - level: Metadata
    resources:
      - group: ""
        resources: ["secrets"]
    verbs: ["create", "update", "patch", "delete"]
```

### Create Alerts for Secret Access

Using Falco:

```yaml
- rule: Registry Secret Access
  desc: Detect access to ImagePullSecrets
  condition: >
    kevt and ka.verb in (get,list,watch) and
    ka.target.resource = "secrets" and
    ka.target.name contains "registry"
  output: >
    Registry secret accessed (user=%ka.user.name
    secret=%ka.target.name ns=%ka.target.namespace)
  priority: WARNING
  tags: [k8s, secrets, registry]
```

### Query Secret Access Logs

```bash
# Search audit logs for secret access
kubectl logs -n kube-system kube-apiserver-master -f | \
  grep -E "secrets.*registry.*GET|LIST"

# Check who accessed secrets recently
kubectl get events -A --field-selector reason=SecretAccessed
```

---

## 8. Use Image Pull Through Cache

**Issue:** Every pod pull requires registry credentials, increasing exposure of ImagePullSecrets.<br/>
**Fix:** Use registry pull-through cache to minimize credential usage.

### Deploy Registry Mirror

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: registry-mirror
  namespace: kube-system
spec:
  replicas: 2
  selector:
    matchLabels:
      app: registry-mirror
  template:
    metadata:
      labels:
        app: registry-mirror
    spec:
      containers:
        - name: registry
          image: registry:2
          env:
            - name: REGISTRY_PROXY_REMOTEURL
              value: https://registry.company.com
            - name: REGISTRY_PROXY_USERNAME
              valueFrom:
                secretKeyRef:
                  name: registry-proxy-secret
                  key: username
            - name: REGISTRY_PROXY_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: registry-proxy-secret
                  key: password
          volumeMounts:
            - name: cache
              mountPath: /var/lib/registry
      volumes:
        - name: cache
          emptyDir: {}
```

Configure containerd to use mirror:

```toml
[plugins."io.containerd.grpc.v1.cri".registry.mirrors]
  [plugins."io.containerd.grpc.v1.cri".registry.mirrors."registry.company.com"]
    endpoint = ["http://registry-mirror.kube-system.svc.cluster.local:5000"]
```

---

## Security Checklist

- [ ] Restrict RBAC access to secrets using principle of least privilege
- [ ] Enable encryption at rest for Kubernetes secrets in etcd
- [ ] Use cloud-native authentication (IRSA, Workload Identity, Managed Identity)
- [ ] Implement automatic secret rotation with External Secrets Operator
- [ ] Apply Pod Security Standards to restrict secret mounting
- [ ] Enable registry IP allowlisting and network controls
- [ ] Configure registry vulnerability scanning and prevention
- [ ] Enable comprehensive audit logging for secret access
- [ ] Set up alerts for suspicious secret access patterns
- [ ] Use registry pull-through cache to minimize credential exposure
- [ ] Regularly rotate registry credentials
- [ ] Implement registry access reviews and credential lifecycle management

---

## Links

- [Kubernetes Secrets Documentation](https://kubernetes.io/docs/concepts/configuration/secret/)
- [Encrypting Secret Data at Rest](https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/)
- [External Secrets Operator](https://external-secrets.io/)
- [Pod Security Standards](/docs/best_practices/cluster_setup_and_hardening/pod_security/pod_security_standards)
- [RBAC Security](/docs/best_practices/cluster_setup_and_hardening/rbac_and_identity/insecure_rbac_permissions_mitigation)
