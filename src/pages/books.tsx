import React from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import styles from "./books.module.css";

const AMAZON_AFFILIATE_ID = "k8ssecurity-20";

interface Book {
  title: string;
  author: string;
  asin: string;
  description: string;
  category: string;
}

const books: Book[] = [
  // Kubernetes Security
  {
    title: "Hacking Kubernetes",
    author: "Andrew Martin, Michael Hausenblas",
    asin: "1492081736",
    description:
      "Threat-driven analysis of Kubernetes security covering attack patterns, defensive strategies, and real-world scenarios for securing container orchestration.",
    category: "Kubernetes Security",
  },
  {
    title: "Kubernetes Security and Observability",
    author: "Brendan Creane, Amit Gupta",
    asin: "1098107101",
    description:
      "A holistic approach to Kubernetes security covering network policies, workload isolation, runtime protection, and observability best practices.",
    category: "Kubernetes Security",
  },
  {
    title: "Learning Kubernetes Security",
    author: "Raul Lapaz",
    asin: "1835886388",
    description:
      "Comprehensive guide to securing Kubernetes clusters from build to runtime, covering authentication, authorization, network policies, secrets management, and incident response with Falco and Cilium. Updated 2nd edition.",
    category: "Kubernetes Security",
  },
  {
    title: "Docker and Kubernetes Security",
    author: "Mohammad-Ali A'râbi",
    asin: "B0F17KHFTL",
    description:
      "Implementing supply chain security and runtime protection for containers. Covers SBOMs, image hardening, vulnerability scanning with Trivy and Snyk, and CI/CD pipeline security. DevOps Dozen 2025 finalist.",
    category: "Kubernetes Security",
  },
  // Kubernetes Fundamentals
  {
    title: "Kubernetes: Up and Running",
    author: "Brendan Burns, Joe Beda, Kelsey Hightower",
    asin: "109811020X",
    description:
      "The definitive guide to Kubernetes from its creators. Essential reading for understanding the platform before diving into security.",
    category: "Kubernetes Fundamentals",
  },
  {
    title: "The Kubernetes Book",
    author: "Nigel Poulton",
    asin: "1916585000",
    description:
      "The #1 best-selling Kubernetes book, updated for 2025. Covers architecture, Pods, Deployments, Services, networking, and security with hands-on exercises.",
    category: "Kubernetes Fundamentals",
  },
  {
    title: "Kubernetes Best Practices",
    author: "Brendan Burns, Eddie Villalba, Dave Strebel, Lachlan Evenson",
    asin: "1098142160",
    description:
      "Production-ready patterns and best practices for running Kubernetes at scale, including security considerations.",
    category: "Kubernetes Fundamentals",
  },
  {
    title: "Production Kubernetes",
    author: "Josh Rosso, Rich Lander, Alex Brand, John Harris",
    asin: "1492092304",
    description:
      "Building successful application platforms with Kubernetes, covering networking, storage, security, and multi-cluster deployments.",
    category: "Kubernetes Fundamentals",
  },
  // Container Security
  {
    title: "Container Security",
    author: "Liz Rice",
    asin: "B0F6T216R6",
    description:
      "Fundamental technology concepts that underpin container security, from Linux primitives to container runtimes and orchestration. Updated 2nd edition with new chapters on supply chain security and GitOps.",
    category: "Container Security",
  },
  // AI/ML Security
  {
    title: "The Developer's Playbook for Large Language Model Security",
    author: "Steve Wilson",
    asin: "109816220X",
    description:
      "Practical guide to LLM security from the creator of OWASP Top 10 for LLMs. Covers prompt injection, data exposure, trust boundaries, and building secure AI applications.",
    category: "AI/ML Security",
  },
  {
    title: "Machine Learning Security Principles",
    author: "John Paul Mueller, Rod Stephens",
    asin: "1804618853",
    description:
      "Comprehensive coverage of ML security including adversarial attacks, model integrity, deepfakes, fraud detection, and ethical considerations in machine learning systems.",
    category: "AI/ML Security",
  },
  // Cloud Security
  {
    title: "Practical Cloud Security",
    author: "Chris Dotson",
    asin: "1492037516",
    description:
      "A guide to securing cloud infrastructure with practical advice on identity, network security, and compliance across AWS, Azure, and GCP.",
    category: "Cloud Security",
  },
  // DevSecOps
  {
    title: "Security Chaos Engineering",
    author: "Kelly Shortridge, Aaron Rinehart",
    asin: "1098113829",
    description:
      "Building confidence in system security through controlled experiments and resilience engineering principles.",
    category: "DevSecOps",
  },
];

const categories = [...new Set(books.map((book) => book.category))];

function getAmazonLink(asin: string): string {
  return `https://www.amazon.com/dp/${asin}?tag=${AMAZON_AFFILIATE_ID}`;
}

export default function Books(): JSX.Element {
  // ItemList structured data for better SEO
  const itemListStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Recommended Kubernetes Security Books",
    description: "Curated list of recommended books for learning Kubernetes security, container security, and cloud-native security practices.",
    url: "https://k8s-security.guru/books/",
    numberOfItems: books.length,
    itemListElement: books.map((book, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Book",
        name: book.title,
        author: {
          "@type": "Person",
          name: book.author,
        },
        description: book.description,
        url: getAmazonLink(book.asin),
        genre: book.category,
      },
    })),
  };

  // Breadcrumb structured data
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
        name: "Recommended Books",
        item: "https://k8s-security.guru/books/",
      },
    ],
  };

  return (
    <Layout
      title="Recommended Books | Kubernetes Security Resources"
      description="Curated list of recommended books for learning Kubernetes security, container security, and cloud-native security practices."
    >
      <Head>
        <meta
          name="keywords"
          content="kubernetes security books, container security books, CKS study materials, kubernetes learning resources, cloud security books, AI security books, LLM security, machine learning security, DevSecOps books"
        />
        <link rel="canonical" href="https://k8s-security.guru/books/" />
        <script type="application/ld+json">
          {JSON.stringify(itemListStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Recommended Books</h1>
            <p className={styles.subtitle}>
              Curated resources to deepen your knowledge of Kubernetes security,
              container security, and cloud-native practices.
            </p>
            <p className={styles.disclosure}>
              As an Amazon Associate, I earn from qualifying purchases. This
              helps support the ongoing development of this free documentation.
            </p>
          </div>

          {categories.map((category) => (
            <section key={category} className={styles.category}>
              <h2 className={styles.categoryTitle}>{category}</h2>
              <div className={styles.bookGrid}>
                {books
                  .filter((book) => book.category === category)
                  .map((book) => (
                    <a
                      key={book.asin}
                      href={getAmazonLink(book.asin)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.bookCard}
                    >
                      <div className={styles.bookCover}>
                        <img
                          src={`https://images-na.ssl-images-amazon.com/images/P/${book.asin}.01._SCLZZZZZZZ_.jpg`}
                          alt={book.title}
                          loading="lazy"
                        />
                      </div>
                      <div className={styles.bookInfo}>
                        <h3 className={styles.bookTitle}>{book.title}</h3>
                        <p className={styles.bookAuthor}>{book.author}</p>
                        <p className={styles.bookDescription}>
                          {book.description}
                        </p>
                        <span className={styles.viewButton}>
                          View on Amazon
                        </span>
                      </div>
                    </a>
                  ))}
              </div>
            </section>
          ))}

          <section className={styles.cta}>
            <h2>Continue Learning</h2>
            <p>
              These books complement our documentation. For hands-on learning,
              explore:
            </p>
            <div className={styles.ctaLinks}>
              <Link to="/docs/intro" className={styles.ctaLink}>
                Documentation
              </Link>
              <Link to="/practice" className={styles.ctaLink}>
                Practice Questions
              </Link>
              <Link to="/glossary" className={styles.ctaLink}>
                Security Glossary
              </Link>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}
