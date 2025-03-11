const sidebarsGuides = {
  guidesSidebar: [
    {
      type: 'doc',
      id: 'intro', // Ensures guides/intro.md appears first in the sidebar
      label: 'Introduction',
    },
    {
      type: 'category',
      label: 'Certificates',
      items: ['certificates/issue_certificate_for_k8s_user'], // Ensure this matches the file path
    },
  ],
};

module.exports = sidebarsGuides;

