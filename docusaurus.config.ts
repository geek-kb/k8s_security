import type {Config} from "@docusaurus/types";
import {themes as prismThemes} from "prism-react-renderer";

const config: Config = {
  title: "K8s Security",
  tagline: "Mastering Kubernetes Security Best Practices",
  url: "https://k8s-security.guru",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "geek-kb", // GitHub username
  projectName: "k8s_security", // Repo name
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
            "/tags/**",
            "/blog/**",
            "/markdown-page",
            "/docs/tutorial**",
            "/docs/category/tutorial**",
          ],
          lastmod: "date",
          createSitemapItems: async (params: any) => {
            const {defaultCreateSitemapItems, ...rest} = params;
            const items = await defaultCreateSitemapItems(rest);

            // Boost priority for important pages
            return items.map((item: any) => {
              if (
                item.url.includes("/docs/intro") ||
                item.url.includes("/docs/attack_vectors/intro") ||
                item.url.includes("/docs/best_practices/intro") ||
                item.url.includes("/docs/fundamentals/intro")
              ) {
                return {...item, priority: 0.9, changefreq: "weekly"};
              }
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
        blog: false,
        //     {
        //          showReadingTime: false,
        //          onInlineAuthors: "ignore",
        //          routeBasePath: "blog",
        //          blogSidebarTitle: "Under Construction",
        //          blogSidebarCount: "ALL",
        //          postsPerPage: 1,
        //      },
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
        indexBlog: false,
        indexPages: false, // Homepage is just a redirect, no content to index
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
    {
      tagName: "meta",
      attributes: {
        name: "google-site-verification",
        content: "YOUR_VERIFICATION_CODE_HERE", // TODO: Replace with actual code from Google Search Console
      },
    },
    {
      tagName: "script",
      attributes: {
        type: "application/ld+json",
      },
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "K8s Security Guide",
        description:
          "Comprehensive Kubernetes security documentation and best practices for CKS certification",
        url: "https://k8s-security.guru",
        author: {
          "@type": "Organization",
          name: "geek-kb",
          url: "https://github.com/geek-kb",
        },
        keywords:
          "kubernetes security, CKS, container security, kubernetes hardening, pod security",
        inLanguage: "en-US",
      }),
    },
    {
      tagName: "script",
      attributes: {
        type: "application/ld+json",
      },
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "TechArticle",
        headline: "Kubernetes Security Best Practices",
        description:
          "Learn Kubernetes security from attack vectors to mitigation strategies, covering CKS exam topics",
        publisher: {
          "@type": "Organization",
          name: "geek-kb",
        },
        about: {
          "@type": "Thing",
          name: "Kubernetes Security",
        },
      }),
    },
    {
      tagName: "script",
      attributes: {
        async: "true", // must be a string
        src: "https://www.googletagmanager.com/gtag/js?id=G-QNPKC33Q9L",
      },
    },
    {
      tagName: "script",
      attributes: {}, // required even if empty
      innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-QNPKC33Q9L');
        `,
    },
  ],

  themeConfig: {
    image: "img/k8s-security-social-card.png", // Default social card image
    metadata: [
      {
        name: "keywords",
        content:
          "kubernetes security, k8s security, kubernetes best practices, CKS, certified kubernetes security, kubernetes hardening, container security, pod security, RBAC kubernetes, kubernetes vulnerabilities, kubernetes attack vectors, kubernetes security tools, kubernetes compliance, CIS kubernetes",
      },
      {
        name: "description",
        content:
          "Comprehensive guide to Kubernetes security best practices, attack vectors, and security tools. Master CKS certification topics including RBAC, network policies, pod security standards, runtime security, and kubernetes hardening techniques.",
      },
      {name: "author", content: "geek-kb"},
      {property: "og:type", content: "website"},
      {
        property: "og:image",
        content: "https://k8s-security.guru/img/k8s-security-social-card.png",
      },
      {property: "og:image:width", content: "1200"},
      {property: "og:image:height", content: "630"},
      {
        property: "og:image:alt",
        content:
          "Kubernetes Security Best Practices Guide - Master K8s Security",
      },
      {property: "og:site_name", content: "K8s Security Guide"},
      {name: "twitter:card", content: "summary_large_image"},
      {
        name: "twitter:image",
        content: "https://k8s-security.guru/img/k8s-security-social-card.png",
      },
      {
        name: "twitter:image:alt",
        content: "Kubernetes Security Best Practices Guide",
      },
      {
        name: "robots",
        content:
          "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      {name: "googlebot", content: "index, follow"},
    ],
    navbar: {
      title: "K8s Security",
      logo: {
        alt: "K8s Security Logo",
        src: "img/logo.svg",
        href: "/docs/intro/",
      },
      items: [
        {to: "/docs/intro", label: "Docs", position: "left"},
        // { to: '/guides/intro', label: 'Guides', position: 'left' },
        //{to: "/blog", label: "Blog", position: "left"},
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
          title: "Docs",
          items: [{label: "Introduction", to: "/docs/intro"}],
        },
        {
          title: "Community",
          items: [
            {label: "GitHub", href: "https://github.com/geek-kb/k8s_security"},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} K8s Security, Built with Docusaurus.`,
    },
  },
};

export default config;
