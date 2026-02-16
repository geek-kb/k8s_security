import React from "react";
import Footer from "@theme-original/DocItem/Footer";
import type FooterType from "@theme/DocItem/Footer";
import type {WrapperProps} from "@docusaurus/types";
import {useDoc} from "@docusaurus/plugin-content-docs/client";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

type Props = WrapperProps<typeof FooterType>;

interface RelatedArticle {
  title: string;
  path: string;
}

// Helper to normalize paths for comparison (ensure trailing slash)
function normalizePath(path: string): string {
  return path.endsWith("/") ? path : path + "/";
}

// Fallback related articles by path prefix (used when frontmatter is missing)
const fallbackRelated: Record<string, RelatedArticle[]> = {
  "/kubernetes-security/fundamentals/": [
    {title: "Understanding Attack Surfaces", path: "/kubernetes-security/fundamentals/understanding-k8s-attack-surface/"},
    {title: "The 4C's of Cloud Native Security", path: "/kubernetes-security/fundamentals/the-4-c-cloud-native-security/"},
    {title: "RBAC Authorization", path: "/kubernetes-security/fundamentals/authorization/rbac/"},
  ],
  "/kubernetes-security/attack-vectors/": [
    {title: "Best Practices Overview", path: "/kubernetes-security/best-practices/intro/"},
    {title: "Security Fundamentals", path: "/kubernetes-security/fundamentals/intro/"},
    {title: "Security Tools", path: "/kubernetes-security/tools/intro/"},
  ],
  "/kubernetes-security/best-practices/": [
    {title: "Attack Vectors", path: "/kubernetes-security/attack-vectors/intro/"},
    {title: "Security Fundamentals", path: "/kubernetes-security/fundamentals/intro/"},
    {title: "Security Tools", path: "/kubernetes-security/tools/intro/"},
  ],
  "/kubernetes-security/tools/": [
    {title: "Best Practices", path: "/kubernetes-security/best-practices/intro/"},
    {title: "Attack Vectors", path: "/kubernetes-security/attack-vectors/intro/"},
  ],
};

// Title mappings for common paths (used when we only have paths from frontmatter)
const pathToTitle: Record<string, string> = {
  "/kubernetes-security/attack-vectors/ddos-attacks/": "DoS Attacks",
  "/kubernetes-security/attack-vectors/compromised-api-server/": "Compromised API Server",
  "/kubernetes-security/attack-vectors/exposed-dashboard/": "Exposed Dashboard",
  "/kubernetes-security/attack-vectors/insecure-secrets-management/": "Insecure Secrets Management",
  "/kubernetes-security/attack-vectors/exposed-kubelet-api/": "Exposed Kubelet API",
  "/kubernetes-security/attack-vectors/lack-of-network-policies/": "Lack of Network Policies",
  "/kubernetes-security/attack-vectors/supply-chain-attacks/": "Supply Chain Attacks",
  "/kubernetes-security/attack-vectors/unrestricted-etcd-access/": "Unrestricted etcd Access",
  "/kubernetes-security/attack-vectors/insecure-rbac-permissions/": "Insecure RBAC Permissions",
  "/kubernetes-security/attack-vectors/misconfigured-admission-controllers/": "Misconfigured Admission Controllers",
  "/kubernetes-security/attack-vectors/privileged-container-escape/": "Container Escape",
  "/kubernetes-security/attack-vectors/unrestricted-hostpath-mounts/": "Unrestricted HostPath",
  "/kubernetes-security/attack-vectors/traffic-hijacking/": "Traffic Hijacking",
  "/kubernetes-security/attack-vectors/insecure-csi-drivers/": "Insecure CSI Drivers",
  "/kubernetes-security/attack-vectors/privileged-service-accounts/": "Privileged Service Accounts",
  "/kubernetes-security/attack-vectors/compromised-sidecars/": "Compromised Sidecars",
  "/kubernetes-security/attack-vectors/imagepullsecrets-theft/": "ImagePullSecrets Theft",
  "/kubernetes-security/attack-vectors/service-account-token-abuse/": "SA Token Abuse",
  "/kubernetes-security/attack-vectors/exec-attach-credential-theft/": "Exec/Attach Credential Theft",
  "/kubernetes-security/attack-vectors/intro/": "Attack Vectors",
  "/kubernetes-security/best-practices/intro/": "Best Practices",
  "/kubernetes-security/fundamentals/intro/": "Security Fundamentals",
  "/kubernetes-security/tools/intro/": "Security Tools",
  "/kubernetes-security/best-practices/cluster-setup-and-hardening/network-security/ddos-mitigation/": "DDoS Mitigation",
  "/kubernetes-security/best-practices/cluster-setup-and-hardening/network-security/network-policies/": "Network Policies",
  "/kubernetes-security/best-practices/cluster-setup-and-hardening/network-security/calico/": "Calico CNI",
  "/kubernetes-security/best-practices/cluster-setup-and-hardening/network-security/cilium/": "Cilium CNI",
  "/kubernetes-security/best-practices/cluster-setup-and-hardening/network-security/ingress-security/": "Ingress Security",
  "/kubernetes-security/best-practices/cluster-setup-and-hardening/network-security/traffic-hijacking-mitigation/": "Traffic Hijacking Mitigation",
  "/kubernetes-security/best-practices/cluster-setup-and-hardening/network-security/service-mesh-security/": "Service Mesh Security",
  "/kubernetes-security/best-practices/cluster-setup-and-hardening/api-server-security/compromised-api-server-mitigation/": "API Server Security",
  "/kubernetes-security/best-practices/cluster-setup-and-hardening/api-server-security/opa-gatekeeper/": "OPA Gatekeeper",
  "/kubernetes-security/best-practices/cluster-setup-and-hardening/api-server-security/kyverno/": "Kyverno",
  "/kubernetes-security/best-practices/cluster-setup-and-hardening/api-server-security/misconfigured-admission-controllers-mitigation/": "Admission Controller Security",
  "/kubernetes-security/best-practices/cluster-setup-and-hardening/pod-security/pod-security-standards/": "Pod Security Standards",
  "/kubernetes-security/best-practices/cluster-setup-and-hardening/pod-security/seccomp-in-pods/": "Seccomp in Pods",
  "/kubernetes-security/best-practices/cluster-setup-and-hardening/pod-security/app-armor-profiles/": "AppArmor Profiles",
  "/kubernetes-security/best-practices/cluster-setup-and-hardening/pod-security/container-escape-mitigation/": "Container Escape Prevention",
  "/kubernetes-security/best-practices/cluster-setup-and-hardening/pod-security/unrestricted-hostpath-mitigation/": "HostPath Restrictions",
  "/kubernetes-security/best-practices/cluster-setup-and-hardening/pod-security/compromised-sidecars-mitigation/": "Sidecar Security",
  "/kubernetes-security/best-practices/cluster-setup-and-hardening/pod-security/csi-driver-mitigation/": "CSI Driver Security",
  "/kubernetes-security/best-practices/cluster-setup-and-hardening/secrets-management/insecure-secrets-management-mitigation/": "Secrets Management",
  "/kubernetes-security/best-practices/cluster-setup-and-hardening/secrets-management/sealed-secrets/": "Sealed Secrets",
  "/kubernetes-security/best-practices/cluster-setup-and-hardening/secrets-management/mozilla-sops/": "Mozilla SOPS",
  "/kubernetes-security/best-practices/cluster-setup-and-hardening/secrets-management/imagepullsecrets-security/": "ImagePullSecrets Security",
  "/kubernetes-security/best-practices/cluster-setup-and-hardening/rbac-and-identity/insecure-rbac-permissions-mitigation/": "RBAC Security",
  "/kubernetes-security/best-practices/cluster-setup-and-hardening/rbac-and-identity/service-account-mitigation/": "Service Account Security",
  "/kubernetes-security/best-practices/cluster-setup-and-hardening/rbac-and-identity/service-account-token-security/": "SA Token Security",
  "/kubernetes-security/best-practices/cluster-setup-and-hardening/rbac-and-identity/exec-attach-security/": "Exec/Attach Security",
  "/kubernetes-security/best-practices/cluster-setup-and-hardening/control-plane-security/etcd-security-mitigation/": "etcd Security",
  "/kubernetes-security/best-practices/cluster-setup-and-hardening/node-security/kubelet-security/": "Kubelet Security",
  "/kubernetes-security/best-practices/cluster-setup-and-hardening/cis/cis-benchmark-for-k8s/": "CIS Benchmarks",
  "/kubernetes-security/best-practices/supply-chain-security/cosign/": "Cosign",
  "/kubernetes-security/best-practices/supply-chain-security/syft/": "Syft",
  "/kubernetes-security/best-practices/supply-chain-security/sbom/": "SBOM",
  "/kubernetes-security/best-practices/supply-chain-security/notation/": "Notation",
  "/kubernetes-security/best-practices/supply-chain-security/supply-chain-best-practices/": "Supply Chain Best Practices",
  "/kubernetes-security/best-practices/monitoring-logging-and-runtime-security/falco/": "Falco",
  "/kubernetes-security/best-practices/monitoring-logging-and-runtime-security/trivy/": "Trivy",
  "/kubernetes-security/best-practices/monitoring-logging-and-runtime-security/grype/": "Grype",
  "/kubernetes-security/best-practices/monitoring-logging-and-runtime-security/tetragon/": "Tetragon",
  "/kubernetes-security/best-practices/monitoring-logging-and-runtime-security/tracee/": "Tracee",
  "/kubernetes-security/best-practices/minimize-microservice-vulnerabilities/pod-level-resources/": "Pod Resources",
  "/kubernetes-security/fundamentals/authentication/authentication-methods/": "Authentication Methods",
  "/kubernetes-security/fundamentals/authentication/service-accounts/": "Service Accounts",
  "/kubernetes-security/fundamentals/authorization/rbac/": "RBAC",
  "/kubernetes-security/fundamentals/authorization/authorization-methods/": "Authorization Methods",
  "/kubernetes-security/fundamentals/understanding-k8s-attack-surface/": "Attack Surface",
  "/kubernetes-security/fundamentals/the-4-c-cloud-native-security/": "4C's of Security",
};

function getRelatedArticles(
  permalink: string,
  frontmatter: Record<string, unknown>
): RelatedArticle[] {
  const related: RelatedArticle[] = [];
  const normalizedPermalink = normalizePath(permalink);

  // 1. First priority: Use frontmatter 'related' field if available
  if (frontmatter.related && Array.isArray(frontmatter.related)) {
    for (const path of frontmatter.related) {
      if (typeof path === "string" && normalizePath(path) !== normalizedPermalink) {
        const normalizedPath = normalizePath(path);
        const title = pathToTitle[normalizedPath] || pathToTitle[path] || path.split("/").slice(-2, -1)[0].replace(/_/g, " ");
        related.push({title, path: normalizedPath});
      }
    }
  }

  // 2. If we have enough from frontmatter, return those
  if (related.length >= 3) {
    return related.slice(0, 4);
  }

  // 3. Fall back to path-based matching if needed
  if (related.length < 3) {
    for (const [prefix, articles] of Object.entries(fallbackRelated)) {
      if (normalizedPermalink.startsWith(prefix) && !normalizedPermalink.endsWith("/intro/")) {
        for (const article of articles) {
          const normalizedArticlePath = normalizePath(article.path);
          if (normalizedArticlePath !== normalizedPermalink && !related.some((r) => normalizePath(r.path) === normalizedArticlePath)) {
            related.push(article);
            if (related.length >= 4) break;
          }
        }
        break;
      }
    }
  }

  // Final safety filter: ensure current page is never in the list
  return related
    .filter((article) => normalizePath(article.path) !== normalizedPermalink)
    .slice(0, 3);
}

export default function FooterWrapper(props: Props): JSX.Element {
  const {metadata, frontMatter} = useDoc();
  const related = getRelatedArticles(metadata.permalink, frontMatter as Record<string, unknown>);

  return (
    <>
      {related.length > 0 && (
        <div className={styles.relatedSection}>
          <h3 className={styles.relatedTitle}>Related Articles</h3>
          <div className={styles.relatedGrid}>
            {related.map((article) => (
              <Link key={article.path} to={article.path} className={styles.relatedCard}>
                <span className={styles.relatedCardTitle}>{article.title}</span>
                <span className={styles.relatedCardArrow}>→</span>
              </Link>
            ))}
          </div>
        </div>
      )}
      <Footer {...props} />
    </>
  );
}
