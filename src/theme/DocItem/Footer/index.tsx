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
  "/docs/fundamentals/": [
    {title: "Understanding Attack Surfaces", path: "/docs/fundamentals/understanding_k8s_attack_surface/"},
    {title: "The 4C's of Cloud Native Security", path: "/docs/fundamentals/the_4_c_cloud_native_security/"},
    {title: "RBAC Authorization", path: "/docs/fundamentals/authorization/rbac/"},
  ],
  "/docs/attack_vectors/": [
    {title: "Best Practices Overview", path: "/docs/best_practices/intro/"},
    {title: "Security Fundamentals", path: "/docs/fundamentals/intro/"},
    {title: "Security Tools", path: "/docs/tools/intro/"},
  ],
  "/docs/best_practices/": [
    {title: "Attack Vectors", path: "/docs/attack_vectors/intro/"},
    {title: "Security Fundamentals", path: "/docs/fundamentals/intro/"},
    {title: "Security Tools", path: "/docs/tools/intro/"},
  ],
  "/docs/tools/": [
    {title: "Best Practices", path: "/docs/best_practices/intro/"},
    {title: "Attack Vectors", path: "/docs/attack_vectors/intro/"},
  ],
};

// Title mappings for common paths (used when we only have paths from frontmatter)
const pathToTitle: Record<string, string> = {
  "/docs/attack_vectors/ddos_attacks/": "DoS Attacks",
  "/docs/attack_vectors/compromised_api_server/": "Compromised API Server",
  "/docs/attack_vectors/exposed_dashboard/": "Exposed Dashboard",
  "/docs/attack_vectors/insecure_secrets_management/": "Insecure Secrets Management",
  "/docs/attack_vectors/exposed_kubelet_api/": "Exposed Kubelet API",
  "/docs/attack_vectors/lack_of_network_policies/": "Lack of Network Policies",
  "/docs/attack_vectors/supply_chain_attacks/": "Supply Chain Attacks",
  "/docs/attack_vectors/unrestricted_etcd_access/": "Unrestricted etcd Access",
  "/docs/attack_vectors/insecure_rbac_permissions/": "Insecure RBAC Permissions",
  "/docs/attack_vectors/misconfigured_admission_controllers/": "Misconfigured Admission Controllers",
  "/docs/attack_vectors/privileged_container_escape/": "Container Escape",
  "/docs/attack_vectors/unrestricted_hostpath_mounts/": "Unrestricted HostPath",
  "/docs/attack_vectors/traffic_hijacking/": "Traffic Hijacking",
  "/docs/attack_vectors/insecure_csi_drivers/": "Insecure CSI Drivers",
  "/docs/attack_vectors/privileged_service_accounts/": "Privileged Service Accounts",
  "/docs/attack_vectors/compromised_sidecars/": "Compromised Sidecars",
  "/docs/attack_vectors/imagepullsecrets_theft/": "ImagePullSecrets Theft",
  "/docs/attack_vectors/service_account_token_abuse/": "SA Token Abuse",
  "/docs/attack_vectors/exec_attach_credential_theft/": "Exec/Attach Credential Theft",
  "/docs/attack_vectors/intro/": "Attack Vectors",
  "/docs/best_practices/intro/": "Best Practices",
  "/docs/fundamentals/intro/": "Security Fundamentals",
  "/docs/tools/intro/": "Security Tools",
  "/docs/best_practices/cluster_setup_and_hardening/network_security/ddos_mitigation/": "DDoS Mitigation",
  "/docs/best_practices/cluster_setup_and_hardening/network_security/network_policies/": "Network Policies",
  "/docs/best_practices/cluster_setup_and_hardening/network_security/calico/": "Calico CNI",
  "/docs/best_practices/cluster_setup_and_hardening/network_security/cilium/": "Cilium CNI",
  "/docs/best_practices/cluster_setup_and_hardening/network_security/ingress_security/": "Ingress Security",
  "/docs/best_practices/cluster_setup_and_hardening/network_security/traffic_hijacking_mitigation/": "Traffic Hijacking Mitigation",
  "/docs/best_practices/cluster_setup_and_hardening/network_security/service_mesh_security/": "Service Mesh Security",
  "/docs/best_practices/cluster_setup_and_hardening/api_server_security/compromised_api_server_mitigation/": "API Server Security",
  "/docs/best_practices/cluster_setup_and_hardening/api_server_security/opa_gatekeeper/": "OPA Gatekeeper",
  "/docs/best_practices/cluster_setup_and_hardening/api_server_security/kyverno/": "Kyverno",
  "/docs/best_practices/cluster_setup_and_hardening/api_server_security/misconfigured_admission_controllers_mitigation/": "Admission Controller Security",
  "/docs/best_practices/cluster_setup_and_hardening/pod_security/pod_security_standards/": "Pod Security Standards",
  "/docs/best_practices/cluster_setup_and_hardening/pod_security/seccomp_in_pods/": "Seccomp in Pods",
  "/docs/best_practices/cluster_setup_and_hardening/pod_security/app_armor_profiles/": "AppArmor Profiles",
  "/docs/best_practices/cluster_setup_and_hardening/pod_security/container_escape_mitigation/": "Container Escape Prevention",
  "/docs/best_practices/cluster_setup_and_hardening/pod_security/unrestricted_hostpath_mitigation/": "HostPath Restrictions",
  "/docs/best_practices/cluster_setup_and_hardening/pod_security/compromised_sidecars_mitigation/": "Sidecar Security",
  "/docs/best_practices/cluster_setup_and_hardening/pod_security/csi_driver_mitigation/": "CSI Driver Security",
  "/docs/best_practices/cluster_setup_and_hardening/secrets_management/insecure_secrets_management_mitigation/": "Secrets Management",
  "/docs/best_practices/cluster_setup_and_hardening/secrets_management/sealed_secrets/": "Sealed Secrets",
  "/docs/best_practices/cluster_setup_and_hardening/secrets_management/mozilla_sops/": "Mozilla SOPS",
  "/docs/best_practices/cluster_setup_and_hardening/secrets_management/imagepullsecrets_security/": "ImagePullSecrets Security",
  "/docs/best_practices/cluster_setup_and_hardening/rbac_and_identity/insecure_rbac_permissions_mitigation/": "RBAC Security",
  "/docs/best_practices/cluster_setup_and_hardening/rbac_and_identity/service_account_mitigation/": "Service Account Security",
  "/docs/best_practices/cluster_setup_and_hardening/rbac_and_identity/service_account_token_security/": "SA Token Security",
  "/docs/best_practices/cluster_setup_and_hardening/rbac_and_identity/exec_attach_security/": "Exec/Attach Security",
  "/docs/best_practices/cluster_setup_and_hardening/control_plane_security/etcd_security_mitigation/": "etcd Security",
  "/docs/best_practices/cluster_setup_and_hardening/node_security/kubelet_security/": "Kubelet Security",
  "/docs/best_practices/cluster_setup_and_hardening/cis/cis_benchmark_for_k8s/": "CIS Benchmarks",
  "/docs/best_practices/supply_chain_security/cosign/": "Cosign",
  "/docs/best_practices/supply_chain_security/syft/": "Syft",
  "/docs/best_practices/supply_chain_security/sbom/": "SBOM",
  "/docs/best_practices/supply_chain_security/notation/": "Notation",
  "/docs/best_practices/supply_chain_security/supply_chain_best_practices/": "Supply Chain Best Practices",
  "/docs/best_practices/monitoring_logging_and_runtime_security/falco/": "Falco",
  "/docs/best_practices/monitoring_logging_and_runtime_security/trivy/": "Trivy",
  "/docs/best_practices/monitoring_logging_and_runtime_security/grype/": "Grype",
  "/docs/best_practices/monitoring_logging_and_runtime_security/tetragon/": "Tetragon",
  "/docs/best_practices/monitoring_logging_and_runtime_security/tracee/": "Tracee",
  "/docs/best_practices/minimize_microservice_vulnerabilities/pod_level_resources/": "Pod Resources",
  "/docs/fundamentals/authentication/authentication_methods/": "Authentication Methods",
  "/docs/fundamentals/authentication/service_accounts/": "Service Accounts",
  "/docs/fundamentals/authorization/rbac/": "RBAC",
  "/docs/fundamentals/authorization/authorization_methods/": "Authorization Methods",
  "/docs/fundamentals/understanding_k8s_attack_surface/": "Attack Surface",
  "/docs/fundamentals/the_4_c_cloud_native_security/": "4C's of Security",
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

  return related.slice(0, 3);
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
