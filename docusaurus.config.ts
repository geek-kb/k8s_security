import type { Config } from '@docusaurus/types';

const config: Config = {
  title: 'K8s Security',
  tagline: 'Mastering Kubernetes Security Best Practices',
  url: 'https://geek-kb.github.io',
  baseUrl: '/k8s_security/',
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
        },
        blog: {
          showReadingTime: false,
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
  ],

  themeConfig: {
    navbar: {
      title: 'K8s Security',
      logo: {
        alt: 'K8s Security Logo',
        src: 'img/logo.svg',
      },
      items: [
        { to: '/docs/intro', label: 'Docs', position: 'left' },
        { to: '/guides/intro', label: 'Guides', position: 'left' },
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

