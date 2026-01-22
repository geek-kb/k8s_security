import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

const AMAZON_AFFILIATE_ID = "k8ssecurity-20";

interface BookBannerProps {
  /** Optional specific book ASIN to feature */
  asin?: string;
  /** Optional book title */
  title?: string;
}

const defaultBooks = [
  {asin: "1492081736", title: "Hacking Kubernetes"},
  {asin: "1098107101", title: "Kubernetes Security and Observability"},
  {asin: "1492056707", title: "Container Security"},
];

export default function BookBanner({asin, title}: BookBannerProps): JSX.Element {
  // If specific book provided, use it; otherwise pick a random default
  const book = asin
    ? {asin, title: title || "Recommended Reading"}
    : defaultBooks[Math.floor(Math.random() * defaultBooks.length)];

  const amazonUrl = `https://www.amazon.com/dp/${book.asin}?tag=${AMAZON_AFFILIATE_ID}`;

  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <span className={styles.label}>Want to learn more?</span>
        <span className={styles.text}>
          Check out our{" "}
          <Link to="/books" className={styles.link}>
            recommended books
          </Link>{" "}
          on Kubernetes security.
        </span>
      </div>
    </div>
  );
}
