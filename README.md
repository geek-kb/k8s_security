# K8s Security

![K8s Security](https://k8s-security.guru/img/logo.svg)

Comprehensive Kubernetes security documentation covering CKS certification topics, attack vectors, cluster hardening, and container security best practices.

**Live site:** [https://k8s-security.guru](https://k8s-security.guru/kubernetes-security/intro/)

---

## About

This project provides in-depth documentation on Kubernetes security for DevOps engineers, security professionals, and CKS certification candidates.

Topics covered:

- Cluster setup and hardening
- Pod and container security
- Network policies and segmentation
- Secrets management and encryption
- Runtime security monitoring with Falco, kube-bench, and kubescape
- Attack vectors and mitigations
- CKS exam preparation

---

## Project Structure

```
k8s_security/
├── .github/workflows/       # GitHub Actions for CI/CD deployment
├── blog/                    # Blog posts (Markdown)
├── docs/                    # Documentation articles (Markdown)
│   ├── attack-vectors/      # Security attack scenarios
│   ├── best-practices/      # Security mitigations and guidance
│   ├── fundamentals/        # Core security concepts
│   └── tools/               # Security tools documentation
├── scripts/                 # Utility scripts (doc counter)
├── src/
│   ├── components/          # Reusable React components
│   ├── css/                 # Global custom styles
│   ├── data/                # Generated data (doc count)
│   ├── pages/               # Static pages (about, books, glossary, practice)
│   └── theme/               # Docusaurus theme overrides
├── static/                  # Static assets (images, robots.txt, manifest)
├── docusaurus.config.ts     # Main Docusaurus configuration
├── sidebars.ts              # Documentation sidebar configuration
├── package.json             # Project dependencies and scripts
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

## URL Structure

Documentation is served at `/kubernetes-security/` with SEO-optimized hyphenated paths:

- `/kubernetes-security/intro/` - Introduction
- `/kubernetes-security/attack-vectors/` - Attack vector documentation
- `/kubernetes-security/best-practices/` - Security best practices
- `/kubernetes-security/fundamentals/` - Core security concepts
- `/kubernetes-security/tools/` - Security tools

301 redirects are configured for all legacy `/docs/` URLs.

---

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run start

# Build for production
npm run build

# Serve production build locally
npm run serve
```

---

## Contributing

Contributions are welcome. Please open an issue or submit a pull request.

---

## License

MIT License. See [LICENSE](LICENSE) for details.
