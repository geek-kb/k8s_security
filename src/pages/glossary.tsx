import React, {useState, useMemo} from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import styles from "./glossary.module.css";

interface GlossaryTerm {
  term: string;
  definition: string;
  link?: string;
  tags?: string[];
}

const glossaryTerms: GlossaryTerm[] = [
  // A
  {
    term: "Admission Controller",
    definition: "A piece of code that intercepts requests to the Kubernetes API server before persistence of the object, used to validate or mutate resources. Examples include PodSecurity, OPA Gatekeeper, and Kyverno.",
    link: "/docs/best_practices/cluster_setup_and_hardening/api_server_security/opa_gatekeeper",
    tags: ["CKS", "API"],
  },
  {
    term: "AppArmor",
    definition: "A Linux kernel security module that restricts programs' capabilities with per-program profiles. Can be applied to pods to limit container actions.",
    link: "/docs/best_practices/cluster_setup_and_hardening/pod_security/app_armor_profiles",
    tags: ["CKS", "Runtime"],
  },
  {
    term: "Audit Logging",
    definition: "Kubernetes feature that records all requests to the API server, providing a chronological record of activities for security analysis and compliance.",
    link: "/docs/best_practices/monitoring_logging_and_runtime_security/intro",
    tags: ["CKS", "Monitoring"],
  },
  {
    term: "Authentication",
    definition: "The process of verifying the identity of a user or service attempting to access the Kubernetes API. Methods include certificates, tokens, and OIDC.",
    link: "/docs/fundamentals/authentication/authentication_methods",
    tags: ["CKS", "Identity"],
  },
  {
    term: "Authorization",
    definition: "The process of determining whether an authenticated user has permission to perform a requested action. Kubernetes supports RBAC, ABAC, Node, and Webhook modes.",
    link: "/docs/fundamentals/authorization/authorization_methods",
    tags: ["CKS", "Identity"],
  },
  // B
  {
    term: "Base Image",
    definition: "The foundational container image from which other images are built. Securing base images is critical for supply chain security.",
    link: "/docs/best_practices/supply_chain_security/intro",
    tags: ["Supply Chain"],
  },
  // C
  {
    term: "Calico",
    definition: "A popular CNI plugin that provides networking and network policy enforcement for Kubernetes clusters.",
    link: "/docs/best_practices/cluster_setup_and_hardening/network_security/calico",
    tags: ["CKS", "Network"],
  },
  {
    term: "Certificate Authority (CA)",
    definition: "An entity that issues digital certificates used for authenticating components in a Kubernetes cluster, including the API server, kubelet, and users.",
    tags: ["CKS", "PKI"],
  },
  {
    term: "Cilium",
    definition: "An eBPF-based CNI plugin providing advanced networking, observability, and security features including L7 network policies.",
    link: "/docs/best_practices/cluster_setup_and_hardening/network_security/cilium",
    tags: ["CKS", "Network"],
  },
  {
    term: "CIS Benchmark",
    definition: "Security configuration guidelines published by the Center for Internet Security. The CIS Kubernetes Benchmark provides hardening recommendations for clusters.",
    link: "/docs/best_practices/cluster_setup_and_hardening/intro",
    tags: ["CKS", "Compliance"],
  },
  {
    term: "CKS",
    definition: "Certified Kubernetes Security Specialist — a CNCF certification validating expertise in securing Kubernetes clusters and cloud-native applications.",
    tags: ["Certification"],
  },
  {
    term: "CNI (Container Network Interface)",
    definition: "A specification and libraries for configuring network interfaces in Linux containers. CNI plugins like Calico and Cilium implement network policies.",
    link: "/docs/best_practices/cluster_setup_and_hardening/network_security/intro",
    tags: ["CKS", "Network"],
  },
  {
    term: "Container Escape",
    definition: "An attack where a process breaks out of container isolation to access the host system or other containers.",
    link: "/docs/attack_vectors/privileged_container_escape",
    tags: ["Attack"],
  },
  {
    term: "Container Runtime",
    definition: "Software responsible for running containers. Examples include containerd, CRI-O, and Docker. Security depends on proper runtime configuration.",
    tags: ["CKS", "Runtime"],
  },
  {
    term: "Cosign",
    definition: "A tool for signing and verifying container images and other artifacts, supporting keyless signing with OIDC identities.",
    link: "/docs/best_practices/supply_chain_security/cosign",
    tags: ["CKS", "Supply Chain"],
  },
  {
    term: "CSI (Container Storage Interface)",
    definition: "A standard for exposing storage systems to containerized workloads. CSI drivers can introduce security risks if misconfigured.",
    link: "/docs/attack_vectors/insecure_csi_drivers",
    tags: ["Storage"],
  },
  // D
  {
    term: "Defense in Depth",
    definition: "A security strategy employing multiple layers of security controls throughout a system, so if one layer fails, others continue to provide protection.",
    link: "/docs/fundamentals/intro",
    tags: ["Principle"],
  },
  // E
  {
    term: "eBPF",
    definition: "Extended Berkeley Packet Filter — a Linux kernel technology enabling programs to run in kernel space for networking, observability, and security without modifying kernel code.",
    tags: ["Runtime", "Network"],
  },
  {
    term: "Encryption at Rest",
    definition: "Encrypting data stored on disk, including Kubernetes Secrets stored in etcd. Configured via EncryptionConfiguration.",
    link: "/docs/best_practices/cluster_setup_and_hardening/secrets_management/sealed_secrets",
    tags: ["CKS", "Secrets"],
  },
  {
    term: "etcd",
    definition: "The distributed key-value store used by Kubernetes to store all cluster data, including Secrets. Securing etcd is critical for cluster security.",
    link: "/docs/attack_vectors/unrestricted_etcd_access",
    tags: ["CKS", "Storage"],
  },
  // F
  {
    term: "Falco",
    definition: "A cloud-native runtime security tool that detects abnormal behavior and security threats using system call monitoring and custom rules.",
    link: "/docs/best_practices/monitoring_logging_and_runtime_security/falco",
    tags: ["CKS", "Runtime"],
  },
  {
    term: "4C's of Cloud Native Security",
    definition: "A security model with four layers: Code, Container, Cluster, and Cloud. Each layer builds on the security of the layers beneath it.",
    link: "/docs/fundamentals/the_4_c_cloud_native_security",
    tags: ["Principle"],
  },
  // G
  {
    term: "Gatekeeper",
    definition: "A Kubernetes-native policy controller built on Open Policy Agent (OPA) that enforces policies via admission control.",
    link: "/docs/best_practices/cluster_setup_and_hardening/api_server_security/opa_gatekeeper",
    tags: ["CKS", "Policy"],
  },
  // H
  {
    term: "HostPath",
    definition: "A volume type that mounts a file or directory from the host node's filesystem into a pod. Can be exploited for container escape if unrestricted.",
    link: "/docs/attack_vectors/unrestricted_hostpath_mounts",
    tags: ["CKS", "Attack"],
  },
  // I
  {
    term: "Image Scanning",
    definition: "The process of analyzing container images for known vulnerabilities, misconfigurations, and malware before deployment.",
    link: "/docs/best_practices/monitoring_logging_and_runtime_security/trivy",
    tags: ["CKS", "Supply Chain"],
  },
  {
    term: "Immutable Infrastructure",
    definition: "A practice where deployed infrastructure is never modified; instead, changes are made by deploying new instances. Reduces configuration drift and attack surface.",
    tags: ["Principle"],
  },
  // K
  {
    term: "Kube-bench",
    definition: "A tool that checks whether Kubernetes is deployed according to CIS Kubernetes Benchmark security recommendations.",
    link: "/docs/best_practices/cluster_setup_and_hardening/intro",
    tags: ["CKS", "Compliance"],
  },
  {
    term: "Kubelet",
    definition: "The primary node agent that runs on each node, responsible for managing pods. The Kubelet API must be secured to prevent unauthorized access.",
    link: "/docs/attack_vectors/exposed_kubelet_api",
    tags: ["CKS", "Node"],
  },
  {
    term: "Kyverno",
    definition: "A Kubernetes-native policy engine that validates, mutates, and generates resources using YAML policies without requiring a new language.",
    link: "/docs/best_practices/cluster_setup_and_hardening/api_server_security/kyverno",
    tags: ["CKS", "Policy"],
  },
  // L
  {
    term: "Least Privilege",
    definition: "A security principle stating that users and processes should have only the minimum permissions necessary to perform their functions.",
    link: "/docs/fundamentals/intro",
    tags: ["CKS", "Principle"],
  },
  // M
  {
    term: "mTLS (Mutual TLS)",
    definition: "A security protocol where both client and server authenticate each other using certificates, commonly used for service-to-service communication.",
    tags: ["Network"],
  },
  // N
  {
    term: "Namespace",
    definition: "A Kubernetes mechanism for isolating groups of resources within a cluster. Namespaces provide a scope for names and can be used with RBAC and network policies for security isolation.",
    tags: ["CKS", "Isolation"],
  },
  {
    term: "Network Policy",
    definition: "A Kubernetes resource that specifies how pods are allowed to communicate with each other and external endpoints. Requires a CNI that supports network policies.",
    link: "/docs/best_practices/cluster_setup_and_hardening/network_security/network_policies",
    tags: ["CKS", "Network"],
  },
  {
    term: "Node Restriction",
    definition: "An admission controller that limits the Node and Pod objects a kubelet can modify, preventing compromised nodes from affecting other nodes.",
    tags: ["CKS", "Node"],
  },
  // O
  {
    term: "OPA (Open Policy Agent)",
    definition: "A general-purpose policy engine that enables unified policy enforcement across the stack. Used with Gatekeeper for Kubernetes admission control.",
    link: "/docs/best_practices/cluster_setup_and_hardening/api_server_security/opa_gatekeeper",
    tags: ["CKS", "Policy"],
  },
  // P
  {
    term: "Pod Security Admission (PSA)",
    definition: "Built-in Kubernetes admission controller that enforces Pod Security Standards at the namespace level. Replaced PodSecurityPolicy in Kubernetes 1.25+.",
    link: "/docs/best_practices/cluster_setup_and_hardening/pod_security/pod_security_standards",
    tags: ["CKS", "Pod"],
  },
  {
    term: "Pod Security Standards (PSS)",
    definition: "Three predefined security profiles — Privileged, Baseline, and Restricted — that define different levels of pod security restrictions.",
    link: "/docs/best_practices/cluster_setup_and_hardening/pod_security/pod_security_standards",
    tags: ["CKS", "Pod"],
  },
  {
    term: "Privileged Container",
    definition: "A container running with elevated privileges equivalent to root on the host. Should be avoided as it enables container escape attacks.",
    link: "/docs/attack_vectors/privileged_container_escape",
    tags: ["CKS", "Attack"],
  },
  // R
  {
    term: "RBAC (Role-Based Access Control)",
    definition: "Kubernetes authorization mechanism that regulates access based on the roles of individual users. Uses Role, ClusterRole, RoleBinding, and ClusterRoleBinding resources.",
    link: "/docs/fundamentals/authorization/rbac",
    tags: ["CKS", "Identity"],
  },
  {
    term: "Runtime Security",
    definition: "Security measures that detect and prevent threats during container execution, including syscall monitoring, behavioral analysis, and threat detection.",
    link: "/docs/best_practices/monitoring_logging_and_runtime_security/intro",
    tags: ["CKS", "Runtime"],
  },
  // S
  {
    term: "SBOM (Software Bill of Materials)",
    definition: "A formal record of components and dependencies in software, enabling vulnerability tracking and supply chain transparency.",
    link: "/docs/best_practices/supply_chain_security/syft",
    tags: ["CKS", "Supply Chain"],
  },
  {
    term: "Seccomp",
    definition: "Secure Computing Mode — a Linux kernel feature that restricts the system calls a process can make, reducing attack surface.",
    link: "/docs/best_practices/cluster_setup_and_hardening/pod_security/seccomp_in_pods",
    tags: ["CKS", "Runtime"],
  },
  {
    term: "Secret",
    definition: "A Kubernetes object that stores sensitive data like passwords, tokens, and keys. Secrets should be encrypted at rest and accessed via RBAC.",
    link: "/docs/attack_vectors/insecure_secrets_management",
    tags: ["CKS", "Secrets"],
  },
  {
    term: "Security Context",
    definition: "Pod and container settings that define privilege and access control, including runAsUser, runAsNonRoot, readOnlyRootFilesystem, and capabilities.",
    link: "/docs/best_practices/cluster_setup_and_hardening/pod_security/pod_security_standards",
    tags: ["CKS", "Pod"],
  },
  {
    term: "Service Account",
    definition: "An identity for processes running in pods to authenticate to the API server. Each namespace has a default service account.",
    link: "/docs/attack_vectors/service_account_token_abuse",
    tags: ["CKS", "Identity"],
  },
  {
    term: "Service Mesh",
    definition: "A dedicated infrastructure layer for handling service-to-service communication, providing mTLS, observability, and traffic management. Examples include Istio and Linkerd.",
    tags: ["Network"],
  },
  {
    term: "Supply Chain Security",
    definition: "Practices that protect software from tampering throughout the development, build, and deployment pipeline, including image signing and vulnerability scanning.",
    link: "/docs/best_practices/supply_chain_security/intro",
    tags: ["CKS", "Supply Chain"],
  },
  // T
  {
    term: "Trivy",
    definition: "A comprehensive security scanner for vulnerabilities, misconfigurations, secrets, and SBOM in container images, filesystems, and Kubernetes.",
    link: "/docs/best_practices/monitoring_logging_and_runtime_security/trivy",
    tags: ["CKS", "Scanning"],
  },
  // V
  {
    term: "Vulnerability",
    definition: "A weakness in software that can be exploited by attackers. Container images should be scanned for known vulnerabilities (CVEs) before deployment.",
    tags: ["Security"],
  },
  // Z
  {
    term: "Zero Trust",
    definition: "A security model that requires strict identity verification for every person and device trying to access resources, regardless of network location.",
    link: "/docs/fundamentals/intro",
    tags: ["Principle"],
  },
];

// Sort terms alphabetically
const sortedTerms = [...glossaryTerms].sort((a, b) =>
  a.term.localeCompare(b.term)
);

// Get unique first letters for navigation
const alphabet = Array.from(
  new Set(sortedTerms.map((t) => t.term[0].toUpperCase()))
).sort();

export default function Glossary(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    glossaryTerms.forEach((t) => t.tags?.forEach((tag) => tags.add(tag)));
    return Array.from(tags).sort();
  }, []);

  // Filter terms based on search and tag
  const filteredTerms = useMemo(() => {
    return sortedTerms.filter((term) => {
      const matchesSearch =
        searchQuery === "" ||
        term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag =
        selectedTag === null || term.tags?.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  // Group filtered terms by first letter
  const groupedTerms = useMemo(() => {
    const groups: Record<string, GlossaryTerm[]> = {};
    filteredTerms.forEach((term) => {
      const letter = term.term[0].toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(term);
    });
    return groups;
  }, [filteredTerms]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Kubernetes Security Glossary",
    description:
      "Comprehensive glossary of Kubernetes security terms, concepts, and tools for CKS certification and production security.",
    url: "https://k8s-security.guru/glossary/",
    hasDefinedTerm: glossaryTerms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.definition,
    })),
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://k8s-security.guru/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Glossary",
        item: "https://k8s-security.guru/glossary/",
      },
    ],
  };

  return (
    <Layout
      title="Kubernetes Security Glossary | K8s Security Terms"
      description="Comprehensive glossary of Kubernetes security terms, concepts, and tools. Learn RBAC, PSS, CNI, Seccomp, and 50+ security terms for CKS certification."
    >
      <Head>
        <meta
          name="keywords"
          content="kubernetes glossary, k8s security terms, RBAC definition, pod security standards, kubernetes terminology, CKS glossary, container security terms, kubernetes definitions"
        />
        <link rel="canonical" href="https://k8s-security.guru/glossary/" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <header className={styles.header}>
            <h1 className={styles.title}>Kubernetes Security Glossary</h1>
            <p className={styles.subtitle}>
              {glossaryTerms.length}+ terms covering Kubernetes security
              concepts, tools, and CKS certification topics.
            </p>
          </header>

          <div className={styles.controls}>
            <div className={styles.searchWrapper}>
              <input
                type="text"
                placeholder="Search terms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            <div className={styles.tags}>
              <button
                className={`${styles.tag} ${selectedTag === null ? styles.tagActive : ""}`}
                onClick={() => setSelectedTag(null)}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  className={`${styles.tag} ${selectedTag === tag ? styles.tagActive : ""}`}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <nav className={styles.alphabet}>
            {alphabet.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className={`${styles.alphabetLink} ${
                  !groupedTerms[letter] ? styles.alphabetLinkDisabled : ""
                }`}
              >
                {letter}
              </a>
            ))}
          </nav>

          <div className={styles.glossary}>
            {filteredTerms.length === 0 ? (
              <p className={styles.noResults}>
                No terms found matching your search.
              </p>
            ) : (
              Object.entries(groupedTerms).map(([letter, terms]) => (
                <section key={letter} id={`letter-${letter}`} className={styles.section}>
                  <h2 className={styles.letter}>{letter}</h2>
                  <div className={styles.terms}>
                    {terms.map((item) => (
                      <div key={item.term} className={styles.term}>
                        <h3 className={styles.termName}>
                          {item.link ? (
                            <Link to={item.link}>{item.term}</Link>
                          ) : (
                            item.term
                          )}
                        </h3>
                        <p className={styles.termDefinition}>{item.definition}</p>
                        {item.tags && (
                          <div className={styles.termTags}>
                            {item.tags.map((tag) => (
                              <span key={tag} className={styles.termTag}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              ))
            )}
          </div>

          <div className={styles.cta}>
            <p>Looking for more detail on a specific topic?</p>
            <Link to="/docs/intro" className={styles.ctaButton}>
              Browse Full Documentation
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
