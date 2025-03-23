---
sidebar_position: 3
title: "Compromised API Server"
description: "Exploiting Kubernetes API server vulnerabilities and how attackers gain unauthorized access."
---

# Compromised API Server

A compromised API server can provide attackers with unauthorized access to a Kubernetes cluster, allowing them to view, modify, or delete resources. This type of attack can lead to severe disruptions, including unauthorized data exposure, service downtime, and potential breaches of sensitive environments.

---

## Exploitation Steps: Exposed API Endpoints

An attacker identifies an exposed API server using a port scan:

```bash
nmap -p 6443 <cluster-ip>
```

### Access API Server Without Authentication

The attacker attempts to list all pods using a curl request:

```bash
curl -k https://<api-server-ip>:6443/api/v1/pods
```

If authentication is misconfigured or disabled, the API server may respond with a list of active pods in the cluster.

### Delete Critical Resources

The attacker attempts to delete a specific pod:

```bash
curl -k -X DELETE https://<api-server-ip>:6443/api/v1/namespaces/default/pods/victim-pod
```

If the API server does not enforce strict authentication and authorization policies, this request may succeed, resulting in service disruptions.

### Escalating Access

If the attacker is able to retrieve service account tokens, Kubernetes secrets, or privileged credentials, they may escalate their access and gain control over additional cluster resources. Exploiting weak RBAC policies or misconfigured admission controllers can allow unauthorized privilege escalation.

### Result

A compromised API server can be used to manipulate cluster resources, exfiltrate sensitive data, deploy malicious workloads, or escalate privileges to gain full control of the cluster. In extreme cases, attackers can use the API server as an entry point to compromise the underlying infrastructure.

---

To learn how to secure the API server and prevent such attacks, refer to the mitigation guide:

➡ [Securing the Kubernetes API Server](/docs/best_practices/cluster_setup_and_hardening/api_server_security/compromised_api_server_mitigation)
