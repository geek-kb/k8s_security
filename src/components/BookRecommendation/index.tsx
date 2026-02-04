import React from "react";
import styles from "./styles.module.css";

const AMAZON_AFFILIATE_ID = "k8ssecurity-20";

interface BookRecommendationProps {
  /** Amazon ASIN for the book */
  asin: string;
  /** Book title */
  title: string;
  /** Book author */
  author: string;
  /** Why this book is relevant to the article */
  context: string;
}

export default function BookRecommendation({
  asin,
  title,
  author,
  context,
}: BookRecommendationProps): JSX.Element {
  const amazonUrl = `https://www.amazon.com/dp/${asin}?tag=${AMAZON_AFFILIATE_ID}`;
  const imageUrl = `https://images-na.ssl-images-amazon.com/images/P/${asin}.01._SCLZZZZZZZ_.jpg`;

  return (
    <div className={styles.container}>
      <div className={styles.header}>Recommended Reading</div>
      <a
        href={amazonUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.card}
      >
        <div className={styles.imageWrapper}>
          <img src={imageUrl} alt={title} className={styles.image} loading="lazy" />
        </div>
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          <div className={styles.author}>by {author}</div>
          <div className={styles.context}>{context}</div>
          <div className={styles.cta}>View on Amazon</div>
        </div>
      </a>
      <div className={styles.disclosure}>
        As an Amazon Associate, I earn from qualifying purchases.
      </div>
    </div>
  );
}
