import type {Config} from "@docusaurus/types";
import {themes as prismThemes} from "prism-react-renderer";

const config: Config = {
  title: "K8s Security Guide",
  tagline: "Comprehensive Kubernetes Security Best Practices & CKS Certification Guide",
  url: "https://k8s-security.guru",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "geek-kb",
  projectName: "k8s_security",
  deploymentBranch: "gh-pages",
  trailingSlash: true,

  presets: [
    [
      "classic",
      {
        sitemap: {
          changefreq: "weekly",
          priority: 0.7,
          filename: "sitemap.xml",
          ignorePatterns: ["/tags/**"],
          lastmod: "date",
          createSitemapItems: async (params: any) => {
            const {defaultCreateSitemapItems, ...rest} = params;
            const items = await defaultCreateSitemapItems(rest);

            return items.map((item: any) => {
              // Homepage gets highest priority
              if (item.url === "https://k8s-security.guru/" || item.url.endsWith("/docs/intro/")) {
                return {...item, priority: 1.0, changefreq: "daily"};
              }
              // Main category intros
              if (
                item.url.includes("/docs/attack_vectors/intro") ||
                item.url.includes("/docs/best_practices/intro") ||
                item.url.includes("/docs/fundamentals/intro") ||
                item.url.includes("/docs/tools/intro")
              ) {
                return {...item, priority: 0.9, changefreq: "weekly"};
              }
              // Best practices and attack vectors content
              if (
                item.url.includes("/docs/attack_vectors/") ||
                item.url.includes("/docs/best_practices/")
              ) {
                return {...item, priority: 0.8};
              }
              return item;
            });
          },
        },
        docs: {
          path: "docs",
          routeBasePath: "docs",
          sidebarPath: "./sidebars.ts",
          sidebarItemsGenerator: undefined,
          sidebarCollapsible: true,
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          editUrl: "https://github.com/geek-kb/k8s_security/edit/main/",
        },
        blog: {
          showReadingTime: false,
          onInlineAuthors: "ignore",
          routeBasePath: "blog",
          blogSidebarTitle: "Under Construction",
          blogSidebarCount: "ALL",
          postsPerPage: 1,
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      },
    ],
  ],

  plugins: [
    [
      require.resolve("@cmfcmf/docusaurus-search-local"),
      {
        indexDocs: true,
        indexBlog: true,
        indexPages: true,
        language: "en",
      },
    ],
    [
      "@docusaurus/plugin-google-gtag",
      {
        trackingID: "G-QNPKC33Q9L",
        anonymizeIP: true,
      },
    ],
  ],

  headTags: [
    // Google Search Console verification - UPDATE THIS with your actual verification code
    {
      tagName: "meta",
      attributes: {
        name: "google-site-verification",
        content: "yrB3LatWvI_jt5pwLIMIoYLq_VXr2CjHgpoZdWDjFw0",
      },
    },
    // Canonical URL for domain migration
    {
      tagName: "link",
      attributes: {
        rel: "canonical",
        href: "https://k8s-security.guru/",
      },
    },
    // WebSite structured data
    {
      tagName: "script",
      attributes: {
        type: "application/ld+json",
      },
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "K8s Security Guide",
        alternateName: ["Kubernetes Security Guide", "K8s Security", "Kubernetes Security Best Practices"],
        description:
          "Comprehensive Kubernetes security documentation covering CKS certification topics, attack vectors, cluster hardening, and container security best practices.",
        url: "https://k8s-security.guru",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://k8s-security.guru/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
        author: {
          "@type": "Person",
          name: "Itai Ganot",
          url: "https://github.com/geek-kb",
        },
        publisher: {
          "@type": "Organization",
          name: "K8s Security Guide",
          url: "https://k8s-security.guru",
        },
        inLanguage: "en-US",
        keywords: [
          "kubernetes security",
          "k8s security",
          "CKS certification",
          "CKS exam",
          "kubernetes hardening",
          "container security",
          "RBAC",
          "network policies",
          "pod security standards",
          "kubernetes vulnerabilities",
        ],
      }),
    },
    // Organization structured data
    {
      tagName: "script",
      attributes: {
        type: "application/ld+json",
      },
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "K8s Security Guide",
        url: "https://k8s-security.guru",
        logo: "https://k8s-security.guru/img/logo.svg",
        sameAs: ["https://github.com/geek-kb/k8s_security"],
      }),
    },
    // Educational resource structured data
    {
      tagName: "script",
      attributes: {
        type: "application/ld+json",
      },
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Course",
        name: "Kubernetes Security Best Practices",
        description:
          "Learn Kubernetes security from fundamentals to advanced techniques. Covers all CKS certification exam domains including cluster hardening, system security, and supply chain security.",
        provider: {
          "@type": "Organization",
          name: "K8s Security Guide",
          url: "https://k8s-security.guru",
        },
        educationalLevel: "Advanced",
        teaches: [
          "Kubernetes cluster hardening",
          "RBAC and authentication",
          "Network policies",
          "Pod Security Standards",
          "Container runtime security",
          "Supply chain security",
        ],
        audience: {
          "@type": "Audience",
          audienceType: "DevOps Engineers, Security Engineers, CKS Candidates",
        },
        isAccessibleForFree: true,
        inLanguage: "en-US",
      }),
    },
    // FAQ structured data for common questions
    {
      tagName: "script",
      attributes: {
        type: "application/ld+json",
      },
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is Kubernetes security?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Kubernetes security encompasses the practices, tools, and configurations used to protect Kubernetes clusters, workloads, and data. It includes authentication, authorization (RBAC), network policies, pod security standards, secrets management, and runtime security.",
            },
          },
          {
            "@type": "Question",
            name: "What is the CKS certification?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The Certified Kubernetes Security Specialist (CKS) is a CNCF certification that validates expertise in securing Kubernetes clusters. It covers cluster setup and hardening, system hardening, minimizing microservice vulnerabilities, and supply chain security.",
            },
          },
          {
            "@type": "Question",
            name: "What are Kubernetes network policies?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Network policies are Kubernetes resources that control pod-to-pod and pod-to-external traffic. They act as a firewall for your cluster, allowing you to specify which pods can communicate with each other based on labels, namespaces, and ports.",
            },
          },
          {
            "@type": "Question",
            name: "What are Pod Security Standards?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Pod Security Standards (PSS) are predefined security profiles that define different levels of pod security restrictions: Privileged (unrestricted), Baseline (minimally restrictive to prevent known privilege escalations), and Restricted (heavily restricted following security best practices).",
            },
          },
        ],
      }),
    },
    // Google Analytics
    {
      tagName: "script",
      attributes: {
        async: "true",
        src: "https://www.googletagmanager.com/gtag/js?id=G-QNPKC33Q9L",
      },
    },
    {
      tagName: "script",
      attributes: {},
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-QNPKC33Q9L');
      `,
    },
  ],

  themeConfig: {
    image: "img/k8s-security-social-card.png",
    metadata: [
      {
        name: "keywords",
        content:
          "kubernetes security, k8s security, kubernetes best practices, CKS, CKS certification, CKS exam, certified kubernetes security, certified kubernetes security specialist, kubernetes hardening, container security, pod security, pod security standards, RBAC kubernetes, kubernetes RBAC, network policies, kubernetes network policies, kubernetes vulnerabilities, kubernetes attack vectors, kubernetes security tools, kubernetes compliance, CIS kubernetes, kubernetes secrets, kubernetes authentication, kubernetes authorization, container runtime security, falco, trivy, kube-bench, admission controllers",
      },
      {
        name: "description",
        content:
          "Comprehensive Kubernetes security guide covering CKS certification topics, attack vectors, cluster hardening, RBAC, network policies, Pod Security Standards, and container security best practices. Free documentation for DevOps engineers and security professionals.",
      },
      {name: "author", content: "Itai Ganot"},
      {name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"},
      {name: "googlebot", content: "index, follow"},
      // Open Graph
      {property: "og:type", content: "website"},
      {property: "og:site_name", content: "K8s Security Guide"},
      {property: "og:title", content: "Kubernetes Security Guide | K8s Security Best Practices"},
      {property: "og:description", content: "Comprehensive Kubernetes security documentation covering CKS certification, attack vectors, cluster hardening, and container security best practices."},
      {property: "og:url", content: "https://k8s-security.guru/"},
      {property: "og:image", content: "https://k8s-security.guru/img/k8s-security-social-card.png"},
      {property: "og:image:width", content: "1200"},
      {property: "og:image:height", content: "630"},
      {property: "og:image:alt", content: "K8s Security Guide - Kubernetes Security Best Practices"},
      {property: "og:locale", content: "en_US"},
      // Twitter
      {name: "twitter:card", content: "summary_large_image"},
      {name: "twitter:title", content: "Kubernetes Security Guide | K8s Security Best Practices"},
      {name: "twitter:description", content: "Comprehensive Kubernetes security documentation covering CKS certification, attack vectors, and hardening best practices."},
      {name: "twitter:image", content: "https://k8s-security.guru/img/k8s-security-social-card.png"},
      {name: "twitter:image:alt", content: "K8s Security Guide"},
    ],
    navbar: {
      title: "K8s Security",
      logo: {
        alt: "K8s Security Logo - Kubernetes Security Guide",
        src: "img/logo.svg",
        href: "/",
      },
      items: [
        {to: "/docs/intro", label: "Docs", position: "left"},
        {to: "/blog", label: "Blog", position: "left"},
        {
          href: "https://github.com/geek-kb/k8s_security",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Documentation",
          items: [
            {label: "Introduction", to: "/docs/intro"},
            {label: "Fundamentals", to: "/docs/fundamentals/intro"},
            {label: "Attack Vectors", to: "/docs/attack_vectors/intro"},
            {label: "Best Practices", to: "/docs/best_practices/intro"},
            {label: "Security Tools", to: "/docs/tools/intro"},
          ],
        },
        {
          title: "CKS Exam Domains",
          items: [
            {label: "Cluster Setup & Hardening", to: "/docs/best_practices/cluster_setup_and_hardening/intro"},
            {label: "System Hardening", to: "/docs/best_practices/system_hardening/intro"},
            {label: "Microservice Security", to: "/docs/best_practices/minimize_microservice_vulnerabilities/intro"},
            {label: "Supply Chain Security", to: "/docs/best_practices/supply_chain_security/intro"},
          ],
        },
        {
          title: "Community",
          items: [
            {label: "GitHub", href: "https://github.com/geek-kb/k8s_security"},
            {label: "Contribute", href: "https://github.com/geek-kb/k8s_security/blob/main/CONTRIBUTING.md"},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} K8s Security Guide by Itai Ganot. Built with Docusaurus.`,
    },
    // Algolia would be ideal for larger sites, but local search works for now
    // Consider applying for Algolia DocSearch: https://docsearch.algolia.com/
  },
};

export default config;
