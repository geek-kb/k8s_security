import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  // The 'Introduction' doc as a standalone menu item
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro', // The document ID matches the 'intro.md' file
      label: 'Introduction',
    },
    {
      type: 'category',
      label: 'K8s Security Basics',
      collapsible: true,
      collapsed: false,
      items: [
        'k8s-security-basics/understanging_k8s_attack_surface',
        'k8s-security-basics/the_4_c_cloud_native_security',
      ],
    },
  ],
};

export default sidebars;

