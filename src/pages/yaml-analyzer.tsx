import React, {useState, useCallback, useRef, useEffect} from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import * as jsYaml from "js-yaml";
import styles from "./yaml-analyzer.module.css";

type Severity = "critical" | "high" | "medium" | "low" | "info" | "pass";

interface Finding {
  severity: Severity;
  title: string;
  description: string;
  context?: string;
  docLink?: string;
}

interface ResourceReport {
  kind: string;
  name: string;
  namespace?: string;
  findings: Finding[];
  score: "secure" | "warnings" | "critical";
}

const DANGEROUS_CAPS = [
  "ALL",
  "SYS_ADMIN",
  "NET_ADMIN",
  "SYS_PTRACE",
  "SYS_MODULE",
  "SYS_RAWIO",
  "DAC_READ_SEARCH",
  "SETUID",
  "SETGID",
  "NET_RAW",
  "SYS_CHROOT",
  "AUDIT_WRITE",
  "KILL",
  "SYS_TIME",
  "FSETID",
];

function getImageTag(image: string): string | null {
  const parts = image.split(":");
  if (parts.length < 2) return null;
  const tag = parts[parts.length - 1];
  if (tag.includes("/")) return null;
  return tag;
}

function getPodSpec(resource: any): any | null {
  switch (resource.kind) {
    case "Pod":
      return resource.spec ?? null;
    case "Deployment":
    case "StatefulSet":
    case "DaemonSet":
    case "ReplicaSet":
      return resource.spec?.template?.spec ?? null;
    case "Job":
      return resource.spec?.template?.spec ?? null;
    case "CronJob":
      return resource.spec?.jobTemplate?.spec?.template?.spec ?? null;
    default:
      return null;
  }
}

function analyzeWorkload(resource: any, findings: Finding[]): void {
  const podSpec = getPodSpec(resource);
  if (!podSpec) return;

  if (podSpec.hostPID === true) {
    findings.push({
      severity: "critical",
      title: "hostPID enabled",
      description:
        "The pod shares the host's PID namespace. This allows containers to see all processes on the host and can be used for privilege escalation.",
      docLink:
        "/kubernetes-security/attack-vectors/privileged-container-escape/",
    });
  }

  if (podSpec.hostNetwork === true) {
    findings.push({
      severity: "high",
      title: "hostNetwork enabled",
      description:
        "The pod uses the host's network namespace, bypassing network isolation. This allows access to all network interfaces on the host.",
      docLink: "/kubernetes-security/best-practices/cluster-setup-and-hardening/network-security/network-policies/",
    });
  }

  if (podSpec.hostIPC === true) {
    findings.push({
      severity: "high",
      title: "hostIPC enabled",
      description:
        "The pod shares the host's IPC namespace, allowing access to shared memory and IPC objects on the host.",
      docLink:
        "/kubernetes-security/attack-vectors/privileged-container-escape/",
    });
  }

  if (podSpec.automountServiceAccountToken !== false) {
    findings.push({
      severity: "medium",
      title: "automountServiceAccountToken not disabled",
      description:
        "Service account tokens are automatically mounted by default. Set automountServiceAccountToken: false on the pod spec if the workload does not need API access.",
      docLink:
        "/kubernetes-security/attack-vectors/service-account-token-abuse/",
    });
  }

  const volumes: any[] = podSpec.volumes ?? [];
  for (const vol of volumes) {
    if (vol.hostPath) {
      findings.push({
        severity: "high",
        title: "hostPath volume mount",
        description: `Volume "${vol.name}" mounts a path from the host filesystem (${vol.hostPath.path ?? "unspecified"}). This can expose sensitive host data or enable container escape.`,
        context: `volume: ${vol.name}`,
        docLink:
          "/kubernetes-security/attack-vectors/unrestricted-hostpath-mounts/",
      });
    }
  }

  const podSeccomp = podSpec.securityContext?.seccompProfile;
  if (!podSeccomp) {
    findings.push({
      severity: "medium",
      title: "No seccomp profile defined",
      description:
        "No seccomp profile is set at the pod level. Seccomp restricts the system calls containers can make, reducing the attack surface significantly.",
      docLink:
        "/kubernetes-security/best-practices/cluster-setup-and-hardening/pod-security/seccomp-in-pods/",
    });
  }

  const allContainers: any[] = [
    ...(podSpec.containers ?? []),
    ...(podSpec.initContainers ?? []),
    ...(podSpec.ephemeralContainers ?? []),
  ];

  for (const container of allContainers) {
    const name: string = container.name ?? "(unnamed)";
    const ctx = `container: ${name}`;
    const sc = container.securityContext ?? {};

    if (sc.privileged === true) {
      findings.push({
        severity: "critical",
        title: "Privileged container",
        description:
          "Container is running in privileged mode. This grants full access to the host kernel and all host resources, effectively removing all container isolation.",
        context: ctx,
        docLink:
          "/kubernetes-security/attack-vectors/privileged-container-escape/",
      });
    }

    if (sc.allowPrivilegeEscalation !== false) {
      findings.push({
        severity: "high",
        title: "allowPrivilegeEscalation not set to false",
        description:
          "allowPrivilegeEscalation is not explicitly disabled. A process inside the container may gain more privileges than its parent process.",
        context: ctx,
        docLink:
          "/kubernetes-security/best-practices/cluster-setup-and-hardening/pod-security/pod-security-standards/",
      });
    }

    if (sc.runAsUser === 0) {
      findings.push({
        severity: "high",
        title: "Container runs as root (runAsUser: 0)",
        description:
          "The container is explicitly configured to run as root (UID 0). Running as root increases the blast radius of any container escape.",
        context: ctx,
        docLink:
          "/kubernetes-security/best-practices/cluster-setup-and-hardening/pod-security/pod-security-standards/",
      });
    } else if (sc.runAsNonRoot !== true) {
      findings.push({
        severity: "medium",
        title: "runAsNonRoot not enforced",
        description:
          "runAsNonRoot is not set to true. The container may run as root unless the image specifies a non-root USER. Explicitly set runAsNonRoot: true.",
        context: ctx,
        docLink:
          "/kubernetes-security/best-practices/cluster-setup-and-hardening/pod-security/pod-security-standards/",
      });
    }

    if (sc.readOnlyRootFilesystem !== true) {
      findings.push({
        severity: "medium",
        title: "readOnlyRootFilesystem not enabled",
        description:
          "The container's root filesystem is writable. Setting readOnlyRootFilesystem: true prevents attackers from writing malicious files to the container filesystem.",
        context: ctx,
        docLink:
          "/kubernetes-security/best-practices/cluster-setup-and-hardening/pod-security/pod-security-standards/",
      });
    }

    const caps = sc.capabilities ?? {};
    const dropList: string[] = (caps.drop ?? []).map((c: string) =>
      c.toUpperCase()
    );
    const addList: string[] = (caps.add ?? []).map((c: string) =>
      c.toUpperCase()
    );

    if (!dropList.includes("ALL")) {
      findings.push({
        severity: "medium",
        title: "Linux capabilities not dropped",
        description:
          'Capabilities are not explicitly dropped with drop: [ALL]. Follow least-privilege by dropping all capabilities and re-adding only what is strictly necessary.',
        context: ctx,
        docLink:
          "/kubernetes-security/best-practices/cluster-setup-and-hardening/pod-security/pod-security-standards/",
      });
    }

    const dangerousAdded = addList.filter((c) => DANGEROUS_CAPS.includes(c));
    if (dangerousAdded.length > 0) {
      findings.push({
        severity: dangerousAdded.includes("ALL") || dangerousAdded.includes("SYS_ADMIN") ? "critical" : "high",
        title: `Dangerous capabilities added: ${dangerousAdded.join(", ")}`,
        description:
          "The container is granted high-privilege Linux capabilities. These can allow privilege escalation, host network manipulation, or kernel module loading.",
        context: ctx,
        docLink:
          "/kubernetes-security/attack-vectors/privileged-container-escape/",
      });
    }

    const image: string = container.image ?? "";
    const tag = getImageTag(image);
    if (!tag || tag === "latest") {
      findings.push({
        severity: "medium",
        title: `Image uses 'latest' or unspecified tag`,
        description: `Image "${image || "(unspecified)"}" does not have a specific immutable tag. Using :latest or no tag means the image can change between deployments, breaking reproducibility and security guarantees.`,
        context: ctx,
        docLink:
          "/kubernetes-security/best-practices/supply-chain-security/supply-chain-best-practices/",
      });
    }

    const limits = container.resources?.limits ?? {};
    if (!limits.memory) {
      findings.push({
        severity: "medium",
        title: "No memory limit defined",
        description:
          "No memory limit is set. Without limits, a compromised or misbehaving container can exhaust node memory, causing a denial of service.",
        context: ctx,
      });
    }
    if (!limits.cpu) {
      findings.push({
        severity: "low",
        title: "No CPU limit defined",
        description:
          "No CPU limit is set. While less critical than memory, unbounded CPU usage can cause resource contention across workloads on the same node.",
        context: ctx,
      });
    }

    if (!container.livenessProbe) {
      findings.push({
        severity: "low",
        title: "No liveness probe defined",
        description:
          "Liveness probes allow Kubernetes to detect and restart containers that are in a broken state. Without one, crashed containers may silently fail.",
        context: ctx,
      });
    }

    if (!container.readinessProbe) {
      findings.push({
        severity: "low",
        title: "No readiness probe defined",
        description:
          "Readiness probes prevent traffic from being routed to containers that are not yet ready to serve requests.",
        context: ctx,
      });
    }
  }
}

function analyzeRbacRole(resource: any, findings: Finding[]): void {
  const rules: any[] = resource.rules ?? [];

  for (const rule of rules) {
    const verbs: string[] = rule.verbs ?? [];
    const resources: string[] = rule.resources ?? [];
    const apiGroups: string[] = rule.apiGroups ?? [];

    if (verbs.includes("*")) {
      findings.push({
        severity: "critical",
        title: "Wildcard verb (*) in RBAC rule",
        description:
          "A rule grants all verbs (*) on one or more resources. This allows any action (get, list, create, delete, escalate) on the matched resources.",
        context: `resources: ${resources.join(", ") || "*"}`,
        docLink:
          "/kubernetes-security/best-practices/cluster-setup-and-hardening/rbac-and-identity/insecure-rbac-permissions-mitigation/",
      });
    }

    if (resources.includes("*")) {
      findings.push({
        severity: "high",
        title: "Wildcard resource (*) in RBAC rule",
        description:
          "A rule grants access to all resources (*). This violates least privilege and provides broad access across all API groups.",
        context: `verbs: ${verbs.join(", ")}`,
        docLink:
          "/kubernetes-security/best-practices/cluster-setup-and-hardening/rbac-and-identity/insecure-rbac-permissions-mitigation/",
      });
    }

    const escalationVerbs = ["escalate", "bind", "impersonate"];
    const foundEscalation = verbs.filter((v) => escalationVerbs.includes(v));
    if (foundEscalation.length > 0) {
      findings.push({
        severity: "high",
        title: `Privilege escalation verbs: ${foundEscalation.join(", ")}`,
        description:
          "The role grants escalate, bind, or impersonate verbs. These allow a user to grant themselves or others higher privileges than they currently hold.",
        docLink:
          "/kubernetes-security/attack-vectors/insecure-rbac-permissions/",
      });
    }

    if (resources.includes("secrets") && (verbs.includes("get") || verbs.includes("list") || verbs.includes("watch") || verbs.includes("*"))) {
      findings.push({
        severity: "medium",
        title: "Role grants read access to Secrets",
        description:
          "The role allows reading Kubernetes Secrets. Secrets may contain credentials, certificates, or tokens. Ensure this access is strictly necessary.",
        docLink:
          "/kubernetes-security/attack-vectors/insecure-secrets-management/",
      });
    }

    if (
      (resources.includes("clusterrolebindings") || resources.includes("rolebindings")) &&
      (verbs.includes("create") || verbs.includes("patch") || verbs.includes("update") || verbs.includes("*"))
    ) {
      findings.push({
        severity: "high",
        title: "Role can modify (Cluster)RoleBindings",
        description:
          "The role allows creating or modifying RoleBindings or ClusterRoleBindings. An attacker with this permission can grant themselves cluster-admin.",
        docLink:
          "/kubernetes-security/attack-vectors/insecure-rbac-permissions/",
      });
    }

    if (
      resources.some((r) => ["pods/exec", "pods/attach"].includes(r)) &&
      (verbs.includes("create") || verbs.includes("*"))
    ) {
      findings.push({
        severity: "high",
        title: "Role grants exec/attach access to pods",
        description:
          "The role allows executing commands inside or attaching to running pods. This is equivalent to interactive shell access and is a significant lateral movement risk.",
        docLink:
          "/kubernetes-security/attack-vectors/exec-attach-credential-theft/",
      });
    }

    if (
      (apiGroups.includes("") || apiGroups.includes("*")) &&
      resources.includes("nodes") &&
      (verbs.includes("proxy") || verbs.includes("*"))
    ) {
      findings.push({
        severity: "high",
        title: "Role grants proxy access to nodes",
        description:
          "The role allows proxying to node APIs. This can expose the Kubelet API, which has broad capabilities on the node.",
        docLink:
          "/kubernetes-security/attack-vectors/exposed-kubelet-api/",
      });
    }
  }
}

function analyzeBinding(resource: any, findings: Finding[]): void {
  const roleRef = resource.roleRef ?? {};
  const subjects: any[] = resource.subjects ?? [];

  if (roleRef.name === "cluster-admin") {
    findings.push({
      severity: "critical",
      title: "Binding to cluster-admin role",
      description:
        "This binding grants unrestricted access to all resources in the cluster. cluster-admin should be reserved for break-glass accounts, not regular workloads or users.",
      docLink:
        "/kubernetes-security/attack-vectors/insecure-rbac-permissions/",
    });
  }

  for (const subject of subjects) {
    if (
      subject.name === "system:unauthenticated" ||
      subject.name === "system:anonymous"
    ) {
      findings.push({
        severity: "critical",
        title: `Binding grants access to unauthenticated/anonymous users`,
        description: `Subject "${subject.name}" is bound to a role. This grants permissions to anyone who can reach the API server without credentials.`,
        docLink:
          "/kubernetes-security/attack-vectors/insecure-rbac-permissions/",
      });
    }

    if (subject.name === "system:masters" || subject.group === "system:masters") {
      findings.push({
        severity: "critical",
        title: "Binding to system:masters group",
        description:
          "system:masters bypasses all RBAC authorization and cannot be restricted. This grants unconditional cluster-admin equivalent access.",
        docLink:
          "/kubernetes-security/attack-vectors/insecure-rbac-permissions/",
      });
    }
  }
}

function analyzeServiceAccount(resource: any, findings: Finding[]): void {
  if (resource.automountServiceAccountToken !== false) {
    findings.push({
      severity: "medium",
      title: "automountServiceAccountToken not disabled",
      description:
        "Service account tokens are auto-mounted into pods using this service account by default. Set automountServiceAccountToken: false unless the workload requires API access.",
      docLink:
        "/kubernetes-security/attack-vectors/service-account-token-abuse/",
    });
  }
}

function analyzeService(resource: any, findings: Finding[]): void {
  const svcType = resource.spec?.type;
  if (svcType === "NodePort") {
    findings.push({
      severity: "medium",
      title: "Service type is NodePort",
      description:
        "NodePort services expose the application on a port on every cluster node. Ensure this port is protected by firewall rules and is not unintentionally public.",
    });
  }
  if (svcType === "LoadBalancer") {
    findings.push({
      severity: "info",
      title: "Service type is LoadBalancer",
      description:
        "LoadBalancer services provision an external load balancer. Verify that the service should be externally accessible and that it is not exposing an internal API unintentionally.",
    });
  }
}

function analyzeIngress(resource: any, findings: Finding[]): void {
  const tls = resource.spec?.tls;
  if (!tls || tls.length === 0) {
    findings.push({
      severity: "medium",
      title: "Ingress has no TLS configuration",
      description:
        "No TLS is configured on this Ingress. Traffic between clients and the ingress controller will not be encrypted. Configure a TLS secret and HTTPS.",
    });
  }
}

function analyzeNetworkPolicy(resource: any, findings: Finding[]): void {
  const spec = resource.spec ?? {};
  const policyTypes: string[] = spec.policyTypes ?? [];

  if (policyTypes.length === 0) {
    findings.push({
      severity: "info",
      title: "policyTypes not explicitly set",
      description:
        "The NetworkPolicy does not explicitly declare policyTypes. Kubernetes infers the types based on the presence of ingress/egress rules. Be explicit to avoid ambiguity.",
    });
  }

  const podSelector = spec.podSelector;
  if (podSelector && Object.keys(podSelector).length === 0) {
    findings.push({
      severity: "info",
      title: "Empty podSelector — applies to all pods in namespace",
      description:
        "An empty podSelector matches all pods in the namespace. If this is a default-deny policy, this is correct. Verify the intent.",
    });
  }
}

function analyzeConfigMap(resource: any, findings: Finding[]): void {
  const data = resource.data ?? {};
  const sensitivePatterns = [
    /password/i,
    /secret/i,
    /token/i,
    /api[_-]?key/i,
    /private[_-]?key/i,
    /credential/i,
    /access[_-]?key/i,
  ];

  for (const key of Object.keys(data)) {
    if (sensitivePatterns.some((p) => p.test(key))) {
      findings.push({
        severity: "high",
        title: `Potentially sensitive key in ConfigMap: "${key}"`,
        description:
          "ConfigMap data appears to contain a sensitive key. ConfigMaps are not encrypted at rest or in transit. Use a Kubernetes Secret or an external secrets manager instead.",
        context: `key: ${key}`,
        docLink:
          "/kubernetes-security/attack-vectors/insecure-secrets-management/",
      });
    }
  }
}

function analyzeResource(resource: any): ResourceReport {
  const kind: string = resource.kind ?? "Unknown";
  const name: string =
    resource.metadata?.name ?? "(unnamed)";
  const namespace: string | undefined = resource.metadata?.namespace;
  const findings: Finding[] = [];

  const workloadKinds = [
    "Pod",
    "Deployment",
    "StatefulSet",
    "DaemonSet",
    "ReplicaSet",
    "Job",
    "CronJob",
  ];

  if (workloadKinds.includes(kind)) {
    analyzeWorkload(resource, findings);
  } else if (kind === "Role" || kind === "ClusterRole") {
    analyzeRbacRole(resource, findings);
  } else if (kind === "RoleBinding" || kind === "ClusterRoleBinding") {
    analyzeBinding(resource, findings);
  } else if (kind === "ServiceAccount") {
    analyzeServiceAccount(resource, findings);
  } else if (kind === "Service") {
    analyzeService(resource, findings);
  } else if (kind === "Ingress") {
    analyzeIngress(resource, findings);
  } else if (kind === "NetworkPolicy") {
    analyzeNetworkPolicy(resource, findings);
  } else if (kind === "ConfigMap") {
    analyzeConfigMap(resource, findings);
  } else {
    findings.push({
      severity: "info",
      title: `No specific checks for resource kind: ${kind}`,
      description: `The analyzer does not have dedicated checks for "${kind}" resources. Manual review is recommended.`,
    });
  }

  const hasCritical = findings.some((f) => f.severity === "critical");
  const hasHigh = findings.some((f) => f.severity === "high");
  const hasActionable = findings.some((f) =>
    ["critical", "high", "medium"].includes(f.severity)
  );

  let score: ResourceReport["score"];
  if (hasCritical || hasHigh) {
    score = "critical";
  } else if (hasActionable) {
    score = "warnings";
  } else {
    score = "secure";
  }

  return {kind, name, namespace, findings, score};
}

const SEVERITY_ORDER: Record<Severity, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
  info: 4,
  pass: 5,
};

const SEVERITY_LABELS: Record<Severity, string> = {
  critical: "CRITICAL",
  high: "HIGH",
  medium: "MEDIUM",
  low: "LOW",
  info: "INFO",
  pass: "PASS",
};

const EXAMPLE_YAML = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: insecure-app
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      app: insecure-app
  template:
    metadata:
      labels:
        app: insecure-app
    spec:
      containers:
        - name: app
          image: nginx:latest
          securityContext:
            privileged: true
            runAsUser: 0`;

function encodeYaml(content: string): string {
  return btoa(unescape(encodeURIComponent(content)));
}

function decodeYaml(encoded: string): string {
  return decodeURIComponent(escape(atob(encoded)));
}

export default function YamlAnalyzer(): React.ReactElement {
  const [yaml, setYaml] = useState<string>("");
  const [reports, setReports] = useState<ResourceReport[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get("yaml");
    if (!encoded) return;
    try {
      const decoded = decodeYaml(encoded);
      setYaml(decoded);
      // auto-run analysis when loaded from a shared URL
      try {
        const docs = jsYaml.loadAll(decoded) as any[];
        const validDocs = docs.filter(
          (d) => d && typeof d === "object" && d.kind
        );
        if (validDocs.length > 0) {
          setReports(validDocs.map(analyzeResource));
        }
      } catch {
        // parse error handled silently; user can still click Analyze
      }
    } catch {
      // ignore malformed base64 in URL
    }
  }, []);

  const handleShare = useCallback(() => {
    if (typeof window === "undefined" || !yaml.trim()) return;
    const encoded = encodeYaml(yaml);
    const url = `${window.location.origin}/yaml-analyzer/?yaml=${encoded}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 2000);
    });
  }, [yaml]);

  const analyze = useCallback(() => {
    setError(null);
    setReports(null);

    if (!yaml.trim()) {
      setError("Please paste a Kubernetes YAML manifest or upload a file.");
      return;
    }

    try {
      const docs = jsYaml.loadAll(yaml) as any[];
      const validDocs = docs.filter(
        (d) => d && typeof d === "object" && d.kind
      );

      if (validDocs.length === 0) {
        setError(
          "No valid Kubernetes resources found. Make sure the YAML includes a 'kind' field."
        );
        return;
      }

      setReports(validDocs.map(analyzeResource));
    } catch (e: any) {
      setError(`YAML parse error: ${e.message}`);
    }
  }, [yaml]);

  const handleFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setYaml((e.target?.result as string) ?? "");
      setReports(null);
      setError(null);
    };
    reader.readAsText(file);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const loadExample = () => {
    setYaml(EXAMPLE_YAML);
    setReports(null);
    setError(null);
  };

  const clearAll = () => {
    setYaml("");
    setReports(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const sortedFindings = (findings: Finding[]): Finding[] =>
    [...findings].sort(
      (a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity]
    );

  const totalCritical = reports?.reduce(
    (acc, r) => acc + r.findings.filter((f) => f.severity === "critical").length,
    0
  ) ?? 0;
  const totalHigh = reports?.reduce(
    (acc, r) => acc + r.findings.filter((f) => f.severity === "high").length,
    0
  ) ?? 0;
  const totalMedium = reports?.reduce(
    (acc, r) => acc + r.findings.filter((f) => f.severity === "medium").length,
    0
  ) ?? 0;

  return (
    <Layout
      title="Kubernetes YAML Security Analyzer"
      description="Paste a Kubernetes YAML manifest and instantly check it for security misconfigurations, missing hardening controls, and RBAC risks."
    >
      <Head>
        <meta
          name="keywords"
          content="kubernetes yaml security checker, kubernetes security analyzer, pod security, RBAC security, kubernetes misconfiguration, CKS, yaml linter"
        />
        <link rel="canonical" href="https://k8s-security.guru/yaml-analyzer/" />
      </Head>

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Kubernetes YAML Security Analyzer</h1>
            <p className={styles.subtitle}>
              Paste or upload a Kubernetes manifest to check for security
              misconfigurations, missing hardening controls, insecure RBAC, and
              more. Analysis runs entirely in your browser — no data is sent to
              any server.
            </p>
          </div>

          <div className={styles.inputSection}>
            <div className={styles.inputActions}>
              <button
                className={styles.btnSecondary}
                onClick={loadExample}
                type="button"
              >
                Load example
              </button>
              <button
                className={styles.btnSecondary}
                onClick={() => fileInputRef.current?.click()}
                type="button"
              >
                Upload file
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".yaml,.yml,.json"
                onChange={handleFileInput}
                className={styles.hiddenInput}
              />
              {yaml && (
                <button
                  className={styles.btnGhost}
                  onClick={clearAll}
                  type="button"
                >
                  Clear
                </button>
              )}
            </div>

            <div
              className={`${styles.dropZone} ${isDragging ? styles.dragging : ""}`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <textarea
                className={styles.textarea}
                value={yaml}
                onChange={(e) => {
                  setYaml(e.target.value);
                  setReports(null);
                  setError(null);
                }}
                placeholder={`Paste your Kubernetes YAML here, or drag and drop a file...\n\nSupports multi-document YAML (separated by ---)\nChecks: Pod Security, RBAC, Secrets, Network, Ingress, and more`}
                spellCheck={false}
              />
            </div>

            <div className={styles.analyzeRow}>
              <button
                className={styles.btnPrimary}
                onClick={analyze}
                type="button"
                disabled={!yaml.trim()}
              >
                Analyze
              </button>
              {yaml.trim() && (
                <button
                  className={styles.btnSecondary}
                  onClick={handleShare}
                  type="button"
                >
                  {copyState === "copied" ? "Link copied!" : "Copy share link"}
                </button>
              )}
              {yaml.trim() && (
                <span className={styles.charCount}>
                  {yaml.split("\n").length} lines
                </span>
              )}
            </div>
          </div>

          {error && (
            <div className={styles.errorBox}>
              <strong>Error:</strong> {error}
            </div>
          )}

          {reports && reports.length > 0 && (
            <div className={styles.results}>
              <div className={styles.summary}>
                <h2 className={styles.summaryTitle}>
                  Analysis Results
                  <span className={styles.resourceCount}>
                    {reports.length} resource{reports.length !== 1 ? "s" : ""}
                  </span>
                </h2>
                <div className={styles.summaryStats}>
                  {totalCritical > 0 && (
                    <span className={`${styles.stat} ${styles.statCritical}`}>
                      {totalCritical} critical
                    </span>
                  )}
                  {totalHigh > 0 && (
                    <span className={`${styles.stat} ${styles.statHigh}`}>
                      {totalHigh} high
                    </span>
                  )}
                  {totalMedium > 0 && (
                    <span className={`${styles.stat} ${styles.statMedium}`}>
                      {totalMedium} medium
                    </span>
                  )}
                  {totalCritical === 0 && totalHigh === 0 && totalMedium === 0 && (
                    <span className={`${styles.stat} ${styles.statPass}`}>
                      No critical issues
                    </span>
                  )}
                </div>
              </div>

              {reports.map((report, idx) => (
                <div key={idx} className={styles.resourceCard}>
                  <div className={styles.resourceHeader}>
                    <div className={styles.resourceMeta}>
                      <span className={styles.resourceKind}>{report.kind}</span>
                      <span className={styles.resourceName}>{report.name}</span>
                      {report.namespace && (
                        <span className={styles.resourceNamespace}>
                          ns: {report.namespace}
                        </span>
                      )}
                    </div>
                    <span
                      className={`${styles.scoreBadge} ${
                        report.score === "critical"
                          ? styles.scoreCritical
                          : report.score === "warnings"
                          ? styles.scoreWarnings
                          : styles.scoreSecure
                      }`}
                    >
                      {report.score === "critical"
                        ? "Issues Found"
                        : report.score === "warnings"
                        ? "Warnings"
                        : "Looks Good"}
                    </span>
                  </div>

                  {report.findings.length === 0 ? (
                    <div className={styles.noFindings}>
                      No issues detected for this resource.
                    </div>
                  ) : (
                    <div className={styles.findingsList}>
                      {sortedFindings(report.findings).map((finding, fIdx) => (
                        <div
                          key={fIdx}
                          className={`${styles.finding} ${styles[`finding_${finding.severity}`]}`}
                        >
                          <div className={styles.findingHeader}>
                            <span
                              className={`${styles.severityBadge} ${styles[`severity_${finding.severity}`]}`}
                            >
                              {SEVERITY_LABELS[finding.severity]}
                            </span>
                            <span className={styles.findingTitle}>
                              {finding.title}
                            </span>
                          </div>
                          {finding.context && (
                            <div className={styles.findingContext}>
                              {finding.context}
                            </div>
                          )}
                          <div className={styles.findingDescription}>
                            {finding.description}
                          </div>
                          {finding.docLink && (
                            <a
                              href={finding.docLink}
                              className={styles.findingLink}
                            >
                              Read more
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className={styles.checksInfo}>
            <h2 className={styles.checksTitle}>What this tool checks</h2>
            <div className={styles.checksGrid}>
              <div className={styles.checkCategory}>
                <h3>Workloads</h3>
                <ul>
                  <li>Privileged containers</li>
                  <li>hostPID / hostNetwork / hostIPC</li>
                  <li>allowPrivilegeEscalation</li>
                  <li>runAsNonRoot / runAsUser</li>
                  <li>readOnlyRootFilesystem</li>
                  <li>Linux capabilities (drop ALL)</li>
                  <li>Dangerous capabilities added</li>
                  <li>hostPath volume mounts</li>
                  <li>Image tag discipline (no :latest)</li>
                  <li>Resource limits (CPU / memory)</li>
                  <li>Liveness / readiness probes</li>
                  <li>Seccomp profile</li>
                  <li>automountServiceAccountToken</li>
                </ul>
              </div>
              <div className={styles.checkCategory}>
                <h3>RBAC</h3>
                <ul>
                  <li>Wildcard verbs (*)</li>
                  <li>Wildcard resources (*)</li>
                  <li>Privilege escalation verbs</li>
                  <li>Access to Secrets</li>
                  <li>RoleBinding modification rights</li>
                  <li>pods/exec and pods/attach access</li>
                  <li>cluster-admin bindings</li>
                  <li>Anonymous / unauthenticated subjects</li>
                  <li>system:masters group bindings</li>
                </ul>
              </div>
              <div className={styles.checkCategory}>
                <h3>Other Resources</h3>
                <ul>
                  <li>Ingress TLS configuration</li>
                  <li>Service type (NodePort / LoadBalancer)</li>
                  <li>NetworkPolicy pod selector scope</li>
                  <li>ConfigMap sensitive key detection</li>
                  <li>ServiceAccount token auto-mount</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
