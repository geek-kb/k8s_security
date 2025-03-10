import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  // Automatically generate sidebar from the Docs directory
  tutorialSidebar: [{ type: 'autogenerated', dirName: '.' }],

  // Automatically generate sidebar for the Guides directory
  guidesSidebar: [{ type: 'autogenerated', dirName: '../guides' }],
};

export default sidebars;
