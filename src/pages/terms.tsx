import React from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import styles from "./about.module.css";

export default function Terms(): JSX.Element {
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
        name: "Terms of Service",
        item: "https://k8s-security.guru/terms/",
      },
    ],
  };

  return (
    <Layout
      title="Terms of Service | K8s Security Guide"
      description="Terms of Service for K8s Security Guide - Usage terms and conditions for the website."
    >
      <Head>
        <link rel="canonical" href="https://k8s-security.guru/terms/" />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.content}>
            <h1>Terms of Service</h1>
            <p><strong>Last updated:</strong> January 27, 2026</p>

            <section className={styles.section}>
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using K8s Security Guide (https://k8s-security.guru), 
                you accept and agree to be bound by the terms and provisions of this 
                agreement. If you do not agree to these terms, please do not use our 
                website.
              </p>
            </section>

            <section className={styles.section}>
              <h2>2. Description of Service</h2>
              <p>
                K8s Security Guide provides free educational content about Kubernetes 
                security, including documentation, tutorials, best practices, and 
                resources for the Certified Kubernetes Security Specialist (CKS) 
                certification. The content is provided for informational and 
                educational purposes only.
              </p>
            </section>

            <section className={styles.section}>
              <h2>3. Use of Content</h2>
              <p>
                The content on this website is provided free of charge for personal, 
                non-commercial educational use. You may:
              </p>
              <ul className={styles.list}>
                <li>Read and study the documentation for personal learning</li>
                <li>Share links to our content</li>
                <li>Reference our content with proper attribution</li>
              </ul>
              <p>You may not:</p>
              <ul className={styles.list}>
                <li>Copy, reproduce, or republish substantial portions of our content without permission</li>
                <li>Use our content for commercial purposes without authorization</li>
                <li>Remove or alter any copyright notices or attributions</li>
                <li>Misrepresent the source of the content</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>4. Disclaimer of Warranties</h2>
              <p>
                The information provided on this website is for general informational 
                purposes only. While we strive to provide accurate and up-to-date 
                information:
              </p>
              <ul className={styles.list}>
                <li>
                  <strong>No warranty:</strong> The content is provided "as is" without 
                  any warranties of any kind, either express or implied, including but 
                  not limited to warranties of accuracy, completeness, or fitness for 
                  a particular purpose.
                </li>
                <li>
                  <strong>Not professional advice:</strong> The content does not 
                  constitute professional security advice. Always consult with 
                  qualified professionals for your specific security needs.
                </li>
                <li>
                  <strong>No certification guarantee:</strong> Using this website 
                  does not guarantee passing the CKS examination or any other 
                  certification. Practice questions on this site are for learning 
                  purposes only and are not from actual certification exams.
                </li>
                <li>
                  <strong>Technology changes:</strong> Kubernetes and related 
                  technologies evolve rapidly. Information may become outdated. 
                  Always verify against official documentation.
                </li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>5. Limitation of Liability</h2>
              <p>
                In no event shall K8s Security Guide, its author, or contributors be 
                liable for any direct, indirect, incidental, special, consequential, 
                or punitive damages arising out of or related to your use of or 
                inability to use the website or its content.
              </p>
              <p>
                This includes, but is not limited to:
              </p>
              <ul className={styles.list}>
                <li>Security incidents resulting from following advice on this site</li>
                <li>Errors or omissions in the content</li>
                <li>Any loss or damage of any kind incurred as a result of the use of any content posted or made available via the website</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>6. External Links</h2>
              <p>
                This website contains links to external websites that are not 
                controlled by us. We are not responsible for the content, privacy 
                policies, or practices of any third-party websites. Links to external 
                sites do not imply endorsement of the linked site.
              </p>
            </section>

            <section className={styles.section}>
              <h2>7. Affiliate Disclosure</h2>
              <p>
                Some links on this website are affiliate links, meaning we may earn 
                a commission if you click through and make a purchase. This is at no 
                additional cost to you. We only recommend products we believe provide 
                value to our audience.
              </p>
              <p>
                K8s Security Guide is a participant in the Amazon Services LLC 
                Associates Program, an affiliate advertising program designed to 
                provide a means for sites to earn advertising fees by advertising 
                and linking to Amazon.com.
              </p>
            </section>

            <section className={styles.section}>
              <h2>8. Intellectual Property</h2>
              <p>
                The content, organization, and design of this website are protected 
                by copyright and other intellectual property laws. The K8s Security 
                Guide name, logo, and related marks are the property of the site owner.
              </p>
              <p>
                Kubernetes and related projects are trademarks of The Linux Foundation 
                and are used in accordance with The Linux Foundation's trademark usage 
                guidelines. The CKS certification is owned by the Cloud Native Computing 
                Foundation (CNCF).
              </p>
            </section>

            <section className={styles.section}>
              <h2>9. User Conduct</h2>
              <p>When using this website, you agree not to:</p>
              <ul className={styles.list}>
                <li>Use the site for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to any portion of the website</li>
                <li>Interfere with or disrupt the website or servers</li>
                <li>Use automated systems or software to extract data from the website</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>10. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will 
                be effective immediately upon posting to the website. Your continued 
                use of the website after changes are posted constitutes your acceptance 
                of the modified terms.
              </p>
            </section>

            <section className={styles.section}>
              <h2>11. Governing Law</h2>
              <p>
                These terms shall be governed by and construed in accordance with 
                applicable laws, without regard to conflict of law principles.
              </p>
            </section>

            <section className={styles.section}>
              <h2>12. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact 
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
