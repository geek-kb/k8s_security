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
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/geek-kb/k8s_security/edit/main/',
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/geek-kb/k8s_security/edit/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
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

