import React from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import styles from "./index.module.css";

const features = [
  {
    title: "Security Fundamentals",
    description:
      "Master Kubernetes authentication, authorization, RBAC, and the 4C's of cloud-native security.",
    link: "/docs/fundamentals/intro",
    icon: "🛡️",
  },
  {
    title: "Attack Vectors",
    description:
      "Understand real-world Kubernetes vulnerabilities, container escapes, and privilege escalation techniques.",
    link: "/docs/attack_vectors/intro",
    icon: "⚠️",
  },
  {
    title: "Best Practices",
    description:
      "Implement cluster hardening, network policies, Pod Security Standards, and supply chain security.",
    link: "/docs/best_practices/intro",
    icon: "✓",
  },
  {
    title: "Security Tools",
    description:
      "Discover tools for vulnerability scanning, runtime security, policy enforcement, and compliance.",
    link: "/docs/tools/intro",
    icon: "🔧",
  },
];

const stats = [
  {value: "1200+", label: "Documentation Pages"},
  {value: "4", label: "CKS Domains Covered"},
  {value: "50+", label: "Security Topics"},
];

function HeroSection() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Kubernetes Security Guide</h1>
        <p className={styles.heroSubtitle}>
          Comprehensive documentation for securing Kubernetes clusters, preparing for CKS certification, 
          and implementing production-grade container security.
        </p>
        <div className={styles.heroButtons}>
          <Link className={styles.primaryButton} to="/docs/intro">
            Get Started
          </Link>
          <Link className={styles.secondaryButton} to="/docs/best_practices/intro">
            Best Practices
          </Link>
        </div>
      </div>
    </header>
  );
}

function FeaturesSection() {
  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          Everything You Need for Kubernetes Security
        </h2>
        <div className={styles.featureGrid}>
          {features.map((feature, idx) => (
            <Link key={idx} to={feature.link} className={styles.featureCard}>
              <span className={styles.featureIcon}>{feature.icon}</span>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className={styles.stats}>
      <div className={styles.container}>
        {stats.map((stat, idx) => (
          <div key={idx} className={styles.statItem}>
            <span className={styles.statValue}>{stat.value}</span>
            <span className={styles.statLabel}>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function CKSSection() {
  return (
    <section className={styles.cks}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          Aligned with CKS Certification Domains
        </h2>
        <p className={styles.sectionDescription}>
          Content organized around the four domains of the Certified Kubernetes Security Specialist exam.
        </p>
        <div className={styles.cksDomains}>
          <div className={styles.cksDomain}>
            <h3>Cluster Setup & Hardening</h3>
            <p>Network policies, CIS benchmarks, ingress security, API server hardening</p>
          </div>
          <div className={styles.cksDomain}>
            <h3>System Hardening</h3>
            <p>Host OS security, IAM roles, kernel hardening, attack surface reduction</p>
          </div>
          <div className={styles.cksDomain}>
            <h3>Minimize Microservice Vulnerabilities</h3>
            <p>Pod Security Standards, secrets management, runtime sandboxing</p>
          </div>
          <div className={styles.cksDomain}>
            <h3>Supply Chain Security</h3>
            <p>Image scanning, admission controllers, artifact signing, SBOM</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <h2>Start Securing Your Kubernetes Clusters</h2>
        <p>
          From fundamentals to advanced hardening techniques — everything you need
          to build secure, production-ready Kubernetes environments.
        </p>
        <Link className={styles.primaryButton} to="/docs/intro">
          Read the Documentation
        </Link>
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Kubernetes Security Guide - K8s Security Best Practices",
    description:
      "Comprehensive guide to Kubernetes security best practices, attack vectors, and hardening techniques. Prepare for CKS certification with in-depth documentation.",
    url: "https://k8s-security.guru/",
    mainEntity: {
      "@type": "Article",
      headline: "Kubernetes Security Best Practices and CKS Certification Guide",
      description:
        "Learn Kubernetes security from fundamentals to advanced techniques. Covers RBAC, network policies, Pod Security Standards, and more.",
      author: {
        "@type": "Person",
        name: "Itai Ganot",
        url: "https://github.com/geek-kb",
      },
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://k8s-security.guru/",
        },
      ],
    },
  };

  return (
    <Layout
      title="Kubernetes Security Guide | K8s Security Best Practices"
      description="Comprehensive Kubernetes security documentation covering CKS certification topics, attack vectors, cluster hardening, RBAC, network policies, and container security best practices."
    >
      <Head>
        <meta
          name="keywords"
          content="kubernetes security, k8s security, CKS certification, kubernetes hardening, container security, RBAC kubernetes, network policies, pod security standards, kubernetes vulnerabilities, kubernetes best practices, CKS exam, certified kubernetes security specialist"
        />
        <link rel="canonical" href="https://k8s-security.guru/" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <CKSSection />
        <CTASection />
      </main>
    </Layout>
  );
}
