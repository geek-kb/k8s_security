import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'K8s Security Basics',
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'intro',
          label: 'Introduction',
        },
        'k8s-security-basics/understanging_k8s_attack_surface',
        'k8s-security-basics/the_4_c_cloud_native_security',
      ],
    },
  ],
};

export default sidebars;

