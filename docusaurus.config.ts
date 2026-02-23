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
          ignorePatterns: [
            // Exclude entire blog from sitemap (hidden from navigation)
            "/blog/**",
            // Exclude all tag pages
            "/tags/**",
            "/kubernetes-security/tags/**",
            // Exclude pagination and utility pages
            "/search/**",
            // Exclude category pages (auto-generated)
            "/kubernetes-security/category/**",
          ],
          lastmod: "date",
          createSitemapItems: async (params: any) => {
            const {defaultCreateSitemapItems, ...rest} = params;
            const items = await defaultCreateSitemapItems(rest);

            return items.map((item: any) => {
              // Homepage gets highest priority
              if (item.url === "https://k8s-security.guru/" || item.url.endsWith("/kubernetes-security/intro/")) {
                return {...item, priority: 1.0, changefreq: "daily"};
              }
              // Main category intros
              if (
                item.url.includes("/kubernetes-security/attack-vectors/intro") ||
                item.url.includes("/kubernetes-security/best-practices/intro") ||
                item.url.includes("/kubernetes-security/fundamentals/intro") ||
                item.url.includes("/kubernetes-security/tools/intro")
              ) {
                return {...item, priority: 0.9, changefreq: "weekly"};
              }
              // Best practices and attack vectors content
              if (
                item.url.includes("/kubernetes-security/attack-vectors/") ||
                item.url.includes("/kubernetes-security/best-practices/")
              ) {
                return {...item, priority: 0.8};
              }
              return item;
            });
          },
        },
        docs: {
          path: "docs",
          routeBasePath: "kubernetes-security",
          sidebarPath: "./sidebars.ts",
          sidebarItemsGenerator: undefined,
          sidebarCollapsible: true,
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          editUrl: "https://github.com/geek-kb/k8s_security/edit/main/",
        },
        blog: {
          showReadingTime: true,
          onInlineAuthors: "ignore",
          routeBasePath: "blog",
          blogSidebarTitle: "Recent Posts",
          blogSidebarCount: "ALL",
          postsPerPage: 10,
          feedOptions: {
            type: "all",
            title: "K8s Security Guide Blog",
            description: "Latest Kubernetes security articles, CKS updates, and best practices",
            copyright: `Copyright © ${new Date().getFullYear()} K8s Security Guide by Itai Ganot`,
            language: "en",
          },
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      },
    ],
  ],

  plugins: [
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          // Redirect old guides URLs to new structure
          {from: "/guides/intro", to: "/kubernetes-security/intro/"},
          {from: "/guides/certificates/issue_certificate_for_k8s_user", to: "/kubernetes-security/fundamentals/authentication/certificates/"},
          {from: "/guides/getting_started", to: "/kubernetes-security/intro/"},
          // Legacy /docs/ redirects to /kubernetes-security/
          {from: "/docs", to: "/kubernetes-security/intro/"},
          {from: "/docs/intro", to: "/kubernetes-security/intro/"},
          // Fundamentals
          {from: "/docs/fundamentals", to: "/kubernetes-security/fundamentals/intro/"},
          {from: "/docs/fundamentals/intro", to: "/kubernetes-security/fundamentals/intro/"},
          {from: "/docs/fundamentals/authentication/certificates", to: "/kubernetes-security/fundamentals/authentication/certificates/"},
          {from: "/docs/fundamentals/authentication/service_accounts", to: "/kubernetes-security/fundamentals/authentication/service-accounts/"},
          {from: "/docs/fundamentals/authentication/authentication_methods", to: "/kubernetes-security/fundamentals/authentication/authentication-methods/"},
          {from: "/docs/fundamentals/authentication/issue_user_certificate", to: "/kubernetes-security/fundamentals/authentication/issue-user-certificate/"},
          {from: "/docs/fundamentals/authorization/rbac", to: "/kubernetes-security/fundamentals/authorization/rbac/"},
          {from: "/docs/fundamentals/authorization/abac", to: "/kubernetes-security/fundamentals/authorization/abac/"},
          {from: "/docs/fundamentals/authorization/authorization_methods", to: "/kubernetes-security/fundamentals/authorization/authorization-methods/"},
          {from: "/docs/fundamentals/authorization/node_authorization", to: "/kubernetes-security/fundamentals/authorization/node-authorization/"},
          {from: "/docs/fundamentals/authorization/webhook_authorization", to: "/kubernetes-security/fundamentals/authorization/webhook-authorization/"},
          {from: "/docs/fundamentals/the_4_c_cloud_native_security", to: "/kubernetes-security/fundamentals/the-4-c-cloud-native-security/"},
          {from: "/docs/fundamentals/understanding_k8s_attack_surface", to: "/kubernetes-security/fundamentals/understanding-k8s-attack-surface/"},
          // Attack vectors
          {from: "/docs/attack_vectors", to: "/kubernetes-security/attack-vectors/intro/"},
          {from: "/docs/attack_vectors/intro", to: "/kubernetes-security/attack-vectors/intro/"},
          {from: "/docs/attack_vectors/exposed_dashboard", to: "/kubernetes-security/attack-vectors/exposed-dashboard/"},
          {from: "/docs/attack_vectors/exposed_kubelet_api", to: "/kubernetes-security/attack-vectors/exposed-kubelet-api/"},
          {from: "/docs/attack_vectors/privileged_container_escape", to: "/kubernetes-security/attack-vectors/privileged-container-escape/"},
          {from: "/docs/attack_vectors/unrestricted_etcd_access", to: "/kubernetes-security/attack-vectors/unrestricted-etcd-access/"},
          {from: "/docs/attack_vectors/unrestricted_hostpath_mounts", to: "/kubernetes-security/attack-vectors/unrestricted-hostpath-mounts/"},
          {from: "/docs/attack_vectors/insecure_rbac_permissions", to: "/kubernetes-security/attack-vectors/insecure-rbac-permissions/"},
          {from: "/docs/attack_vectors/insecure_secrets_management", to: "/kubernetes-security/attack-vectors/insecure-secrets-management/"},
          {from: "/docs/attack_vectors/lack_of_network_policies", to: "/kubernetes-security/attack-vectors/lack-of-network-policies/"},
          {from: "/docs/attack_vectors/misconfigured_admission_controllers", to: "/kubernetes-security/attack-vectors/misconfigured-admission-controllers/"},
          {from: "/docs/attack_vectors/supply_chain_attacks", to: "/kubernetes-security/attack-vectors/supply-chain-attacks/"},
          {from: "/docs/attack_vectors/ddos_attacks", to: "/kubernetes-security/attack-vectors/ddos-attacks/"},
          {from: "/docs/attack_vectors/traffic_hijacking", to: "/kubernetes-security/attack-vectors/traffic-hijacking/"},
          {from: "/docs/attack_vectors/compromised_api_server", to: "/kubernetes-security/attack-vectors/compromised-api-server/"},
          {from: "/docs/attack_vectors/compromised_sidecars", to: "/kubernetes-security/attack-vectors/compromised-sidecars/"},
          {from: "/docs/attack_vectors/insecure_csi_drivers", to: "/kubernetes-security/attack-vectors/insecure-csi-drivers/"},
          {from: "/docs/attack_vectors/privileged_service_accounts", to: "/kubernetes-security/attack-vectors/privileged-service-accounts/"},
          {from: "/docs/attack_vectors/service_account_token_abuse", to: "/kubernetes-security/attack-vectors/service-account-token-abuse/"},
          {from: "/docs/attack_vectors/imagepullsecrets_theft", to: "/kubernetes-security/attack-vectors/imagepullsecrets-theft/"},
          {from: "/docs/attack_vectors/exec_attach_credential_theft", to: "/kubernetes-security/attack-vectors/exec-attach-credential-theft/"},
          {from: "/docs/attack_vectors/cloud_metadata_service_abuse", to: "/kubernetes-security/attack-vectors/cloud-metadata-service-abuse/"},
          {from: "/docs/attack_vectors/kubelet_anonymous_auth", to: "/kubernetes-security/attack-vectors/kubelet-anonymous-auth/"},
          {from: "/docs/attack_vectors/ephemeral_container_abuse", to: "/kubernetes-security/attack-vectors/ephemeral-container-abuse/"},
          {from: "/docs/attack_vectors/persistent_volume_data_exposure", to: "/kubernetes-security/attack-vectors/persistent-volume-data-exposure/"},
          // Best practices
          {from: "/docs/best_practices", to: "/kubernetes-security/best-practices/intro/"},
          {from: "/docs/best_practices/intro", to: "/kubernetes-security/best-practices/intro/"},
          {from: "/docs/best_practices/cluster_setup_and_hardening", to: "/kubernetes-security/best-practices/cluster-setup-and-hardening/intro/"},
          {from: "/docs/best_practices/cluster_setup_and_hardening/intro", to: "/kubernetes-security/best-practices/cluster-setup-and-hardening/intro/"},
          {from: "/docs/best_practices/system_hardening", to: "/kubernetes-security/best-practices/system-hardening/intro/"},
          {from: "/docs/best_practices/system_hardening/intro", to: "/kubernetes-security/best-practices/system-hardening/intro/"},
          {from: "/docs/best_practices/minimize_microservice_vulnerabilities", to: "/kubernetes-security/best-practices/minimize-microservice-vulnerabilities/intro/"},
          {from: "/docs/best_practices/minimize_microservice_vulnerabilities/intro", to: "/kubernetes-security/best-practices/minimize-microservice-vulnerabilities/intro/"},
          {from: "/docs/best_practices/minimize_microservice_vulnerabilities/pod_level_resources", to: "/kubernetes-security/best-practices/minimize-microservice-vulnerabilities/pod-level-resources/"},
          {from: "/docs/best_practices/monitoring_logging_and_runtime_security", to: "/kubernetes-security/best-practices/monitoring-logging-and-runtime-security/intro/"},
          {from: "/docs/best_practices/monitoring_logging_and_runtime_security/intro", to: "/kubernetes-security/best-practices/monitoring-logging-and-runtime-security/intro/"},
          {from: "/docs/best_practices/monitoring_logging_and_runtime_security/falco", to: "/kubernetes-security/best-practices/monitoring-logging-and-runtime-security/falco/"},
          {from: "/docs/best_practices/monitoring_logging_and_runtime_security/tetragon", to: "/kubernetes-security/best-practices/monitoring-logging-and-runtime-security/tetragon/"},
          {from: "/docs/best_practices/monitoring_logging_and_runtime_security/trivy", to: "/kubernetes-security/best-practices/monitoring-logging-and-runtime-security/trivy/"},
          {from: "/docs/best_practices/supply_chain_security", to: "/kubernetes-security/best-practices/supply-chain-security/intro/"},
          {from: "/docs/best_practices/supply_chain_security/intro", to: "/kubernetes-security/best-practices/supply-chain-security/intro/"},
          {from: "/docs/best_practices/supply_chain_security/cosign", to: "/kubernetes-security/best-practices/supply-chain-security/cosign/"},
          {from: "/docs/best_practices/supply_chain_security/trivy_operator", to: "/kubernetes-security/best-practices/supply-chain-security/trivy-operator/"},
          // Key nested pages with actual files
          {from: "/docs/best_practices/cluster_setup_and_hardening/network_security/network_policies", to: "/kubernetes-security/best-practices/cluster-setup-and-hardening/network-security/network-policies/"},
          {from: "/docs/best_practices/cluster_setup_and_hardening/network_security/intro", to: "/kubernetes-security/best-practices/cluster-setup-and-hardening/network-security/intro/"},
          {from: "/docs/best_practices/cluster_setup_and_hardening/pod_security/pod_security_standards", to: "/kubernetes-security/best-practices/cluster-setup-and-hardening/pod-security/pod-security-standards/"},
          {from: "/docs/best_practices/cluster_setup_and_hardening/secrets_management/sealed_secrets", to: "/kubernetes-security/best-practices/cluster-setup-and-hardening/secrets-management/sealed-secrets/"},
          {from: "/docs/best_practices/cluster_setup_and_hardening/cis/cis_benchmark_for_k8s", to: "/kubernetes-security/best-practices/cluster-setup-and-hardening/cis/cis-benchmark-for-k8s/"},
          {from: "/docs/best_practices/cluster_setup_and_hardening/cis/cis_benchmark_kube_bench", to: "/kubernetes-security/best-practices/cluster-setup-and-hardening/cis/cis-benchmark-kube-bench/"},
          // Tools
          {from: "/docs/tools", to: "/kubernetes-security/tools/intro/"},
          {from: "/docs/tools/intro", to: "/kubernetes-security/tools/intro/"},
          {from: "/docs/tools/cdk", to: "/kubernetes-security/tools/cdk/"},
          {from: "/docs/tools/kdigger", to: "/kubernetes-security/tools/kdigger/"},
          {from: "/docs/tools/red_kube", to: "/kubernetes-security/tools/red-kube/"},
        ],
      },
    ],
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        indexDocs: true,
        indexBlog: true,
        indexPages: false,
        language: "en",
        hashed: true,
        docsRouteBasePath: "/kubernetes-security",
        blogRouteBasePath: "/blog",
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 8,
        searchResultContextMaxLength: 50,
      },
    ],
    [
      "@docusaurus/plugin-google-gtag",
      {
        trackingID: "G-QNPKC33Q9L",
        anonymizeIP: true,
      },
    ],
    [
      "@docusaurus/plugin-pwa",
      {
        debug: false,
        offlineModeActivationStrategies: ["appInstalled", "standalone", "queryString"],
        pwaHead: [
          {tagName: "link", rel: "icon", href: "/img/logo.svg"},
          {tagName: "link", rel: "manifest", href: "/manifest.json"},
          {tagName: "meta", name: "theme-color", content: "#22c55e"},
          {tagName: "meta", name: "apple-mobile-web-app-capable", content: "yes"},
          {tagName: "meta", name: "apple-mobile-web-app-status-bar-style", content: "#22c55e"},
          {tagName: "link", rel: "apple-touch-icon", href: "/img/logo.svg"},
        ],
      },
    ],
  ],

  headTags: [
    // Google Search Console verification
    {
      tagName: "meta",
      attributes: {
        name: "google-site-verification",
        content: "yrB3LatWvI_jt5pwLIMIoYLq_VXr2CjHgpoZdWDjFw0",
      },
    },
    // Google AdSense account verification
    {
      tagName: "meta",
      attributes: {
        name: "google-adsense-account",
        content: "ca-pub-8445622451057816",
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
          {
            "@type": "Question",
            name: "What is RBAC in Kubernetes?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Role-Based Access Control (RBAC) is a Kubernetes authorization mechanism that regulates access to resources based on user roles. It uses Role, ClusterRole, RoleBinding, and ClusterRoleBinding resources to define and assign permissions to users and service accounts.",
            },
          },
          {
            "@type": "Question",
            name: "How do I secure etcd in Kubernetes?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Secure etcd by enabling encryption at rest for secrets, using TLS for client-server communication, restricting access to etcd endpoints via firewall rules, enabling authentication, and running regular backups. etcd stores all cluster data including secrets.",
            },
          },
          {
            "@type": "Question",
            name: "What is a container escape attack?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A container escape attack occurs when a process breaks out of container isolation to access the host system or other containers. Common vectors include privileged containers, hostPath mounts, and kernel exploits. Mitigate with Pod Security Standards and seccomp profiles.",
            },
          },
          {
            "@type": "Question",
            name: "What tools are used for Kubernetes security scanning?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Popular Kubernetes security tools include Trivy (vulnerability scanning), Falco (runtime security), kube-bench (CIS benchmarks), OPA Gatekeeper and Kyverno (policy enforcement), Kubescape (security posture), and Cosign (image signing).",
            },
          },
        ],
      }),
    },
    // Preconnect hints for performance
    {
      tagName: "link",
      attributes: {
        rel: "preconnect",
        href: "https://www.googletagmanager.com",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "preconnect",
        href: "https://pagead2.googlesyndication.com",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "dns-prefetch",
        href: "https://images-na.ssl-images-amazon.com",
      },
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
    // Google AdSense
    {
      tagName: "script",
      attributes: {
        async: "true",
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8445622451057816",
        crossorigin: "anonymous",
      },
    },
  ],

  themeConfig: {
    // Announcement bar
    announcementBar: {
      id: "new_domain",
      content:
        'Welcome to our new domain! <a href="/kubernetes-security/intro">Start learning Kubernetes security</a> or try our <a href="/practice">CKS Practice Questions</a>',
      backgroundColor: "#22c55e",
      textColor: "#fff",
      isCloseable: true,
    },
    // Dark mode by default
    colorMode: {
      defaultMode: "dark",
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    // Code block features
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["bash", "yaml", "json", "docker", "nginx"],
    },
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
        {to: "/kubernetes-security/intro", label: "Docs", position: "left"},
        {to: "/glossary", label: "Glossary", position: "left"},
        {to: "/practice", label: "Practice", position: "left"},
        {to: "/yaml-analyzer", label: "YAML Analyzer", position: "left"},
        {to: "/books", label: "Books", position: "left"},
        // Blog hidden until more content is available
        // {to: "/blog", label: "Blog", position: "left"},
        {to: "/about", label: "About", position: "left"},
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
            {label: "Introduction", to: "/kubernetes-security/intro"},
            {label: "Fundamentals", to: "/kubernetes-security/fundamentals/intro"},
            {label: "Attack Vectors", to: "/kubernetes-security/attack-vectors/intro"},
            {label: "Best Practices", to: "/kubernetes-security/best-practices/intro"},
            {label: "Security Tools", to: "/kubernetes-security/tools/intro"},
            {label: "Glossary", to: "/glossary"},
            {label: "Practice Questions", to: "/practice"},
          ],
        },
        {
          title: "CKS Exam Domains",
          items: [
            {label: "Cluster Setup & Hardening", to: "/kubernetes-security/best-practices/cluster-setup-and-hardening/intro"},
            {label: "System Hardening", to: "/kubernetes-security/best-practices/system-hardening/intro"},
            {label: "Microservice Security", to: "/kubernetes-security/best-practices/minimize-microservice-vulnerabilities/intro"},
            {label: "Supply Chain Security", to: "/kubernetes-security/best-practices/supply-chain-security/intro"},
            {label: "Monitoring & Runtime Security", to: "/kubernetes-security/best-practices/monitoring-logging-and-runtime-security/intro"},
          ],
        },
        {
          title: "Community",
          items: [
            {label: "About the Author", to: "/about"},
            {label: "Recommended Books", to: "/books"},
            {label: "GitHub", href: "https://github.com/geek-kb/k8s_security"},
            {label: "Contribute", href: "https://github.com/geek-kb/k8s_security/blob/main/CONTRIBUTING.md"},
          ],
        },
        {
          title: "Legal",
          items: [
            {label: "Privacy Policy", to: "/privacy"},
            {label: "Terms of Service", to: "/terms"},
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
