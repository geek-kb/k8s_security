import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import {useThemeConfig} from "@docusaurus/theme-common";
import styles from "./styles.module.css";

export default function NotFoundContent(): JSX.Element {
  const {navbar} = useThemeConfig();

  return (
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
            <li>The resource was deleted</li>
            <li>The URL is incorrect</li>
            <li>You followed an outdated link</li>
          </ul>
        </div>

        <div className={styles.actions}>
          <Link className="button button--primary" to="/docs/intro">
            Go to Introduction
          </Link>

          <Link className="button button--secondary" to="/docs">
            Browse Documentation
          </Link>

          {navbar?.items?.some((item) => item.label === "Blog") && (
            <Link className="button button--secondary" to="/blog">
              Blog
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
