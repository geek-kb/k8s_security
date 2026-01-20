import React from "react";
import Footer from "@theme-original/DocItem/Footer";
import type FooterType from "@theme/DocItem/Footer";
import type {WrapperProps} from "@docusaurus/types";
import {useDoc} from "@docusaurus/plugin-content-docs/client";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

type Props = WrapperProps<typeof FooterType>;

// Define related articles mapping based on doc paths
const relatedArticles: Record<string, Array<{title: string; path: string}>> = {
  // Fundamentals
  "/docs/fundamentals/": [
    {title: "Understanding Attack Surfaces", path: "/docs/fundamentals/understanding_k8s_attack_surface"},
    {title: "The 4C's of Cloud Native Security", path: "/docs/fundamentals/the_4_c_cloud_native_security"},
    {title: "Authentication Methods", path: "/docs/fundamentals/authentication/authentication_methods"},
  ],
  "/docs/fundamentals/authentication/": [
    {title: "Authorization Methods", path: "/docs/fundamentals/authorization/authorization_methods"},
    {title: "RBAC Deep Dive", path: "/docs/fundamentals/authorization/rbac"},
  ],
  "/docs/fundamentals/authorization/": [
    {title: "Authentication Methods", path: "/docs/fundamentals/authentication/authentication_methods"},
    {title: "Insecure RBAC Permissions", path: "/docs/attack_vectors/insecure_rbac_permissions"},
  ],
  // Attack Vectors
  "/docs/attack_vectors/": [
    {title: "Best Practices Overview", path: "/docs/best_practices/intro"},
    {title: "Security Fundamentals", path: "/docs/fundamentals/intro"},
    {title: "Security Tools", path: "/docs/tools/intro"},
  ],
  // Best Practices
  "/docs/best_practices/cluster_setup_and_hardening/": [
    {title: "Network Policies", path: "/docs/best_practices/cluster_setup_and_hardening/network_security/network_policies"},
    {title: "Pod Security Standards", path: "/docs/best_practices/cluster_setup_and_hardening/pod_security/pod_security_standards"},
    {title: "API Server Security", path: "/docs/best_practices/cluster_setup_and_hardening/api_server_security/compromised_api_server_mitigation"},
  ],
  "/docs/best_practices/cluster_setup_and_hardening/network_security/": [
    {title: "Calico CNI", path: "/docs/best_practices/cluster_setup_and_hardening/network_security/calico"},
    {title: "Cilium CNI", path: "/docs/best_practices/cluster_setup_and_hardening/network_security/cilium"},
  ],
  "/docs/best_practices/cluster_setup_and_hardening/pod_security/": [
    {title: "Pod Security Standards", path: "/docs/best_practices/cluster_setup_and_hardening/pod_security/pod_security_standards"},
    {title: "Seccomp Profiles", path: "/docs/best_practices/cluster_setup_and_hardening/pod_security/seccomp_in_pods"},
    {title: "AppArmor Profiles", path: "/docs/best_practices/cluster_setup_and_hardening/pod_security/app_armor_profiles"},
  ],
  "/docs/best_practices/supply_chain_security/": [
    {title: "Image Signing with Cosign", path: "/docs/best_practices/supply_chain_security/cosign"},
    {title: "SBOM with Syft", path: "/docs/best_practices/supply_chain_security/syft"},
    {title: "Vulnerability Scanning with Trivy", path: "/docs/best_practices/monitoring_logging_and_runtime_security/trivy"},
  ],
  "/docs/best_practices/monitoring_logging_and_runtime_security/": [
    {title: "Falco Runtime Security", path: "/docs/best_practices/monitoring_logging_and_runtime_security/falco"},
    {title: "Trivy Scanner", path: "/docs/best_practices/monitoring_logging_and_runtime_security/trivy"},
  ],
  // Tools
  "/docs/tools/": [
    {title: "Best Practices", path: "/docs/best_practices/intro"},
    {title: "Attack Vectors", path: "/docs/attack_vectors/intro"},
  ],
};

function getRelatedArticles(path: string): Array<{title: string; path: string}> {
  // Find matching related articles based on path prefix
  for (const [prefix, articles] of Object.entries(relatedArticles)) {
    if (path.startsWith(prefix) && path !== prefix + "intro") {
      // Filter out the current page from related articles
      return articles.filter((a) => !path.startsWith(a.path));
    }
  }
  return [];
}

export default function FooterWrapper(props: Props): JSX.Element {
  const {metadata} = useDoc();
  const related = getRelatedArticles(metadata.permalink);

  return (
    <>
      {related.length > 0 && (
        <div className={styles.relatedSection}>
          <h3 className={styles.relatedTitle}>Related Articles</h3>
          <div className={styles.relatedGrid}>
            {related.slice(0, 3).map((article) => (
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
