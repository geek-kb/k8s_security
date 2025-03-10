import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  // Automatically generate sidebar from the filesystem
  tutorialSidebar: [{ type: 'autogenerated', dirName: '.' }],
};

export default sidebars;

