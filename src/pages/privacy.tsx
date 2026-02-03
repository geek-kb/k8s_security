import React from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import styles from "./about.module.css";

export default function Privacy(): JSX.Element {
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
        name: "Privacy Policy",
        item: "https://k8s-security.guru/privacy/",
      },
    ],
  };

  return (
    <Layout
      title="Privacy Policy | K8s Security Guide"
      description="Privacy Policy for K8s Security Guide - Information about data collection, cookies, and third-party services."
    >
      <Head>
        <link rel="canonical" href="https://k8s-security.guru/privacy/" />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.content}>
            <h1>Privacy Policy</h1>
            <p><strong>Last updated:</strong> January 27, 2026</p>

            <section className={styles.section}>
              <h2>Introduction</h2>
              <p>
                K8s Security Guide ("we", "our", or "us") operates the website 
                https://k8s-security.guru (the "Site"). This page informs you of our 
                policies regarding the collection, use, and disclosure of personal 
                information when you use our Site.
              </p>
              <p>
                By using the Site, you agree to the collection and use of information 
                in accordance with this policy.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Information Collection and Use</h2>
              <p>
                We collect several types of information for various purposes to 
                provide and improve our Site.
              </p>
              
              <h3>Types of Data Collected</h3>
              
              <h4>Usage Data</h4>
              <p>
                We may collect information about how the Site is accessed and used 
                ("Usage Data"). This Usage Data may include information such as your 
                computer's Internet Protocol address (IP address), browser type, 
                browser version, the pages of our Site that you visit, the time and 
                date of your visit, the time spent on those pages, and other 
                diagnostic data.
              </p>

              <h4>Cookies and Tracking Data</h4>
              <p>
                We use cookies and similar tracking technologies to track activity 
                on our Site and hold certain information. Cookies are files with a 
                small amount of data which may include an anonymous unique identifier.
              </p>
              <p>
                You can instruct your browser to refuse all cookies or to indicate 
                when a cookie is being sent. However, if you do not accept cookies, 
                you may not be able to use some portions of our Site.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Third-Party Services</h2>
              
              <h3>Google Analytics</h3>
              <p>
                We use Google Analytics to monitor and analyze the use of our Site. 
                Google Analytics is a web analytics service offered by Google that 
                tracks and reports website traffic. Google uses the data collected 
                to track and monitor the use of our Site. This data is shared with 
                other Google services.
              </p>
              <p>
                You can opt-out of having your activity on the Site made available 
                to Google Analytics by installing the Google Analytics opt-out 
                browser add-on. The add-on prevents Google Analytics JavaScript 
                (ga.js, analytics.js, and dc.js) from sharing information with 
                Google Analytics about visits activity.
              </p>
              <p>
                For more information on the privacy practices of Google, please 
                visit the Google Privacy &amp; Terms page:{" "}
                <a 
                  href="https://policies.google.com/privacy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  https://policies.google.com/privacy
                </a>
              </p>

              <h3>Google AdSense</h3>
              <p>
                We use Google AdSense to display advertisements on our Site. Google 
                AdSense uses cookies to serve ads based on your prior visits to our 
                Site or other websites. Google's use of advertising cookies enables 
                it and its partners to serve ads based on your visit to our Site 
                and/or other sites on the Internet.
              </p>
              <p>
                You may opt out of personalized advertising by visiting{" "}
                <a 
                  href="https://www.google.com/settings/ads" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Google Ads Settings
                </a>
                . Alternatively, you can opt out of a third-party vendor's use of 
                cookies for personalized advertising by visiting{" "}
                <a 
                  href="https://www.aboutads.info/choices/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  www.aboutads.info
                </a>
                .
              </p>

              <h3>Amazon Affiliate Program</h3>
              <p>
                K8s Security Guide is a participant in the Amazon Services LLC 
                Associates Program, an affiliate advertising program designed to 
                provide a means for sites to earn advertising fees by advertising 
                and linking to Amazon.com. When you click on Amazon links on our 
                Site and make a purchase, we may earn a small commission at no 
                additional cost to you.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Use of Data</h2>
              <p>K8s Security Guide uses the collected data for various purposes:</p>
              <ul className={styles.list}>
                <li>To provide and maintain our Site</li>
                <li>To notify you about changes to our Site</li>
                <li>To allow you to participate in interactive features of our Site when you choose to do so</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information so that we can improve our Site</li>
                <li>To monitor the usage of our Site</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>Data Security</h2>
              <p>
                The security of your data is important to us, but remember that no 
                method of transmission over the Internet or method of electronic 
                storage is 100% secure. While we strive to use commercially 
                acceptable means to protect your personal data, we cannot guarantee 
                its absolute security.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Links to Other Sites</h2>
              <p>
                Our Site may contain links to other sites that are not operated by 
                us. If you click on a third-party link, you will be directed to that 
                third party's site. We strongly advise you to review the Privacy 
                Policy of every site you visit.
              </p>
              <p>
                We have no control over and assume no responsibility for the content, 
                privacy policies, or practices of any third-party sites or services.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Children's Privacy</h2>
              <p>
                Our Site does not address anyone under the age of 13. We do not 
                knowingly collect personally identifiable information from anyone 
                under the age of 13. If you are a parent or guardian and you are 
                aware that your child has provided us with personal data, please 
                contact us.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify 
                you of any changes by posting the new Privacy Policy on this page 
                and updating the "Last updated" date at the top of this Privacy Policy.
              </p>
              <p>
                You are advised to review this Privacy Policy periodically for any 
                changes. Changes to this Privacy Policy are effective when they are 
                posted on this page.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact 
                us through our{" "}
                <a 
                  href="https://github.com/geek-kb/k8s_security/issues" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  GitHub repository
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
    </Layout>
  );
}
