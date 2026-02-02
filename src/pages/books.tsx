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
    author: "Kaizhe Huang, Pranjal Jumde",
    asin: "1839216506",
    description:
      "Comprehensive guide to securing Kubernetes clusters from build to runtime, covering authentication, authorization, network policies, and secrets management.",
    category: "Kubernetes Security",
  },
  // Kubernetes Core
  {
    title: "Kubernetes: Up and Running",
    author: "Brendan Burns, Joe Beda, Kelsey Hightower",
    asin: "109811020X",
    description:
      "The definitive guide to Kubernetes from its creators. Essential reading for understanding the platform before diving into security.",
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
  return (
    <Layout
      title="Recommended Books | Kubernetes Security Resources"
      description="Curated list of recommended books for learning Kubernetes security, container security, and cloud-native security practices."
    >
      <Head>
        <meta
          name="keywords"
          content="kubernetes security books, container security books, CKS study materials, kubernetes learning resources, cloud security books"
        />
        <link rel="canonical" href="https://k8s-security.guru/books/" />
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
