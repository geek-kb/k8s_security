import React from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import styles from "./about.module.css";

export default function About(): JSX.Element {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: "Itai Ganot",
      jobTitle: "DevOps Tech Lead",
      worksFor: {
        "@type": "Organization",
        name: "Payoneer",
      },
      description: "DevOps Tech Lead with 22+ years of experience specializing in Kubernetes, platform engineering, and security automation",
      url: "https://k8s-security.guru/about/",
      sameAs: [
        "https://github.com/geek-kb",
        "https://linkedin.com/in/itaiganot",
        "https://serverfault.com/users/109833/itai-ganot",
        "https://stackoverflow.com/users/1702942/itai-ganot",
      ],
      knowsAbout: [
        "Kubernetes",
        "Container Security",
        "DevOps",
        "Cloud Infrastructure",
        "Platform Engineering",
        "GitOps",
        "Infrastructure Automation",
        "AWS",
        "Linux",
      ],
    },
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
        name: "About",
        item: "https://k8s-security.guru/about/",
      },
    ],
  };

  return (
    <Layout
      title="About the Author | Itai Ganot"
      description="Learn about Itai Ganot, the DevOps engineer behind K8s Security Guide — a comprehensive Kubernetes security documentation resource."
    >
      <Head>
        <meta name="keywords" content="Itai Ganot, k8s security author, kubernetes security expert, DevOps engineer, CKS certification" />
        <link rel="canonical" href="https://k8s-security.guru/about/" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.avatar}>IG</div>
            <div className={styles.headerText}>
              <h1 className={styles.name}>Itai Ganot</h1>
              <p className={styles.role}>DevOps Tech Lead @ Payoneer</p>
            </div>
          </div>

          <div className={styles.content}>
            <section className={styles.section}>
              <h2>About Me</h2>
              <p>
                I'm a DevOps Tech Lead with over 22 years of hands-on experience in 
                systems engineering and DevOps. Currently leading large-scale, cross-functional 
                DevOps initiatives at Payoneer, driving platform evolution, standardization, 
                and operational excellence across multiple engineering teams.
              </p>
              <p>
                My background spans the full spectrum of infrastructure and platform engineering — 
                from traditional Linux and Microsoft systems to modern cloud-native, Kubernetes-based 
                platforms. I focus on enabling engineering teams at scale through platform design, 
                infrastructure automation, GitOps, and self-service capabilities.
              </p>
              <p>
                I have deep expertise across Linux and cloud ecosystems, with a long-standing 
                passion for open-source technologies. Over the years, I've designed and implemented 
                large-scale monitoring and observability platforms (Grafana, Prometheus, Nagios), 
                backup and disaster-recovery solutions, and robust CI/CD pipelines — always with 
                automation as a core principle.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Technical Focus</h2>
              <ul className={styles.list}>
                <li>Designing and operating <strong>production-grade Kubernetes platforms</strong></li>
                <li>Driving <strong>infrastructure automation and GitOps workflows</strong></li>
                <li>Implementing declarative cloud resource management using <strong>Crossplane</strong></li>
                <li>Leading cross-team architectural initiatives and high-impact platform projects</li>
                <li>Building systems that are <strong>resilient, observable, and built to last</strong></li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>Why I Built This Site</h2>
              <p>
                In 2024, I took a career break to focus on professional development — 
                studying for the CKA and CKS certifications and diving deep into modern 
                technologies I previously didn't have time to explore. During this period, 
                I found the Kubernetes security learning resources scattered across dozens 
                of sources — official docs, blog posts, GitHub repos, and paid courses. 
                Much of it was either too surface-level or hidden behind paywalls.
              </p>
              <p>
                I wanted a single, comprehensive resource that covered both the 
                "how to attack" and "how to defend" sides of Kubernetes security. 
                This site is the result of consolidating my research, lab experiments, 
                and over two decades of production experience into one place.
              </p>
              <p>
                The goal is simple: provide free, in-depth Kubernetes security 
                documentation that's actually useful for practitioners — whether 
                you're preparing for CKS, hardening a production cluster, or 
                learning security fundamentals.
              </p>
            </section>

            <section className={styles.section}>
              <h2>What You'll Find Here</h2>
              <ul className={styles.list}>
                <li>
                  <strong>1200+ pages</strong> of documentation covering all CKS exam domains
                </li>
                <li>
                  <strong>Attack vectors</strong> with step-by-step exploitation examples
                </li>
                <li>
                  <strong>Best practices</strong> mapped to real-world threats
                </li>
                <li>
                  <strong>Tool guides</strong> for Trivy, Falco, OPA, Kyverno, and more
                </li>
                <li>
                  <strong>Code examples</strong> you can actually use in production
                </li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>Community Contributions</h2>
              <p>
                I'm an active contributor to the DevOps and systems engineering 
                community, with over 13 years on Stack Exchange:
              </p>
              <ul className={styles.list}>
                <li><strong>Server Fault</strong>: 11K+ reputation, 2.9M people reached, #187 overall</li>
                <li><strong>Stack Overflow</strong>: 6K+ reputation, 1.2M people reached</li>
                <li><strong>Top tags</strong>: Linux, Jenkins, AWS, Git, Bash, Puppet</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>Get in Touch</h2>
              <p>
                This project is open source. Contributions, corrections, and 
                suggestions are always welcome.
              </p>
              <div className={styles.links}>
                <a
                  href="https://linkedin.com/in/itaiganot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/geek-kb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  GitHub
                </a>
                <a
                  href="https://serverfault.com/users/109833/itai-ganot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  Server Fault
                </a>
                <a
                  href="https://stackoverflow.com/users/1702942/itai-ganot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  Stack Overflow
                </a>
                <a
                  href="https://github.com/geek-kb/k8s_security"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  Project Repository
                </a>
              </div>
            </section>

            <div className={styles.cta}>
              <Link to="/docs/intro" className={styles.ctaButton}>
                Start Reading the Documentation
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
