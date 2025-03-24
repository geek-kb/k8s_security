import type { Config } from '@docusaurus/types';

const config: Config = {
  title: 'K8s Security',
  tagline: 'Mastering Kubernetes Security Best Practices',
  url: 'https://k8s-security.geek-kb.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'geek-kb', // GitHub username
  projectName: 'k8s_security',  // Repo name
  deploymentBranch: 'gh-pages',
  trailingSlash: true,

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/geek-kb/k8s_security/edit/main/',
          sidebarItemsGenerator: undefined,
          sidebarCollapsible: true,
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: false,
          onInlineAuthors: 'ignore',
          editUrl: 'https://github.com/geek-kb/k8s_security/edit/main/',
          routeBasePath: 'blog',
          blogSidebarTitle: 'Under Construction',
          blogSidebarCount: 'ALL',
          postsPerPage: 1,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'guides',
        path: 'guides',
        routeBasePath: 'guides',
        sidebarPath: require.resolve('./sidebarsGuides.js'),
        editUrl: 'https://github.com/geek-kb/k8s_security/edit/main/',
      },
    ],
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        indexPages: true,
        highlightSearchTermsOnTargetPage: true,
        searchBarShortcut: true,
        searchBarPosition: 'right',
      },
    ],
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-QNPKC33Q9L', // Your GA4 Measurement ID
        anonymizeIP: true, // Recommended for privacy
      },
    ],
  ],

    headTags: [
      {
        tagName: 'script',
        attributes: {
          async: 'true', // must be a string
          src: 'https://www.googletagmanager.com/gtag/js?id=G-QNPKC33Q9L',
        },
      },
      {
        tagName: 'script',
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
    navbar: {
      title: 'K8s Security',
      logo: {
        alt: 'K8s Security Logo',
        src: 'img/logo.svg',
        href: '/docs/intro/',
      },
      items: [
        { to: '/docs/intro', label: 'Docs', position: 'left' },
        // { to: '/guides/intro', label: 'Guides', position: 'left' },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/geek-kb/k8s_security',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [{ label: 'Introduction', to: '/docs/intro' }],
        },
        {
          title: 'Guides',
          items: [{ label: 'Guides Introduction', to: '/guides/intro' }],
        },
        {
          title: 'Community',
          items: [
            { label: 'GitHub', href: 'https://github.com/geek-kb/k8s_security' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} K8s Security, Built with Docusaurus.`,
    },
  },
};

export default config;