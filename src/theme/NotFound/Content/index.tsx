import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Head from "@docusaurus/Head";
import styles from "./styles.module.css";

const popularPages = [
  {title: "Network Policies", path: "/kubernetes-security/best-practices/cluster-setup-and-hardening/network-security/network-policies/"},
  {title: "Pod Security Standards", path: "/kubernetes-security/best-practices/cluster-setup-and-hardening/pod-security/pod-security-standards/"},
  {title: "RBAC Authorization", path: "/kubernetes-security/fundamentals/authorization/rbac/"},
  {title: "Container Escape Attacks", path: "/kubernetes-security/attack-vectors/privileged-container-escape/"},
  {title: "Falco Runtime Security", path: "/kubernetes-security/best-practices/monitoring-logging-and-runtime-security/falco/"},
  {title: "CKS Practice Questions", path: "/practice/"},
];

export default function NotFoundContent(): JSX.Element {
  return (
    <>
      <Head>
        <title>Page Not Found | K8s Security Guide</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className={clsx("container", styles.root)}>
        <div className={styles.content}>
          <div className={styles.code}>404</div>

          <h1 className={styles.title}>Resource Not Found</h1>

          <p className={styles.description}>
            The requested resource does not exist in this cluster.
          </p>

          <div className={styles.reasons}>
            <div>Possible causes:</div>
            <ul>
              <li>The resource was deleted or moved</li>
              <li>The URL is incorrect</li>
              <li>You followed an outdated link</li>
            </ul>
          </div>

          <div className={styles.actions}>
            <Link className="button button--primary" to="/kubernetes-security/intro">
              Start from Introduction
            </Link>

            <Link className="button button--secondary" to="/glossary">
              Search Glossary
            </Link>
          </div>

          <div className={styles.popularSection}>
            <h2 className={styles.popularTitle}>Popular Pages</h2>
            <div className={styles.popularGrid}>
              {popularPages.map((page) => (
                <Link key={page.path} to={page.path} className={styles.popularLink}>
                  {page.title}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.categoriesSection}>
            <h2 className={styles.categoriesTitle}>Browse by Category</h2>
            <div className={styles.categoriesGrid}>
              <Link to="/kubernetes-security/fundamentals/intro" className={styles.categoryLink}>
                Security Fundamentals
              </Link>
              <Link to="/kubernetes-security/attack-vectors/intro" className={styles.categoryLink}>
                Attack Vectors
              </Link>
              <Link to="/kubernetes-security/best-practices/intro" className={styles.categoryLink}>
                Best Practices
              </Link>
              <Link to="/kubernetes-security/tools/intro" className={styles.categoryLink}>
                Security Tools
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
