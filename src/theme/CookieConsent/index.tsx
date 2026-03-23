import React, {useState, useEffect} from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

const COOKIE_CONSENT_KEY = "k8s-security-cookie-consent";

type ConsentStatus = "accepted" | "declined" | null;

export default function CookieConsent(): JSX.Element | null {
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (savedConsent === "accepted" || savedConsent === "declined") {
      setConsentStatus(savedConsent as ConsentStatus);
    } else {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setConsentStatus("accepted");
    setIsVisible(false);
    // Google Analytics is already loaded, consent is noted
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setConsentStatus("declined");
    setIsVisible(false);
    // Optionally disable tracking here
  };

  // Don't render if user has already made a choice
  if (consentStatus !== null || !isVisible) {
    return null;
  }

  return (
    <div className={styles.cookieBanner} role="dialog" aria-label="Cookie consent">
      <div className={styles.content}>
        <div className={styles.text}>
          <p className={styles.title}>Cookie Notice</p>
          <p className={styles.description}>
            We use cookies to analyze traffic and improve your experience. By clicking "Accept", you
            consent to our use of cookies. Read our{" "}
            <Link to="/privacy/" className={styles.link}>
              Privacy Policy
            </Link>{" "}
            for more information.
          </p>
        </div>
        <div className={styles.buttons}>
          <button
            onClick={handleDecline}
            className={styles.declineButton}
            type="button"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className={styles.acceptButton}
            type="button"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
