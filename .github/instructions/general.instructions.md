# GitHub Copilot Instructions — k8s-security

This repository contains the source for **k8s-security**, a technical knowledge base focused on Kubernetes security, attack vectors, and best practices.

Copilot must strictly follow the rules below when generating, editing, or suggesting content.

---

## 1. General Principles

- This is a **professional, technical security documentation site**
- **Clarity, accuracy, and correctness are mandatory**
- Do **not** use emojis, icons, or informal language
- Do **not** invent facts, tools, commands, CVEs, or Kubernetes behavior
- Prefer **official Kubernetes documentation** and widely accepted security practices

---

## 2. Writing Style and Tone

- Professional, neutral, and technical
- Clear explanations without marketing language
- Assume the reader is a **mid-to-senior Kubernetes / DevOps / Security engineer**
- Avoid storytelling or motivational language
- Avoid redundancy

---

## 3. Formatting Rules (Critical)

- Articles are written in **Markdown**
- When providing a full article rewrite, output **a single continuous Markdown document** surrounded by four backticks (````) at the start and end
- **Do not split content into multiple code blocks**
- Use standard Markdown headings only: # for H1, ## for H2, ### for H3
- **Do not use emojis or icons anywhere**
- Do not use HTML except where explicitly required
- When writing a full article in the chat, always surround it with four backticks (````) to avoid formatting issues
- Never change existing file names or paths
- Never change existing metadata (YAML front matter) unless explicitly instructed
- When listing items, use either:
  - Hyphens (`-`) for unordered lists
  - Numbers (`1.`, `2.`, etc.) for ordered lists
- Use **bold** for emphasis on important terms or concepts
- Use inline code formatting (`` `code` ``) for commands, file names, paths, code snippets, and technical terms
- Use code blocks (triple backticks and the relevant language identifier) for single/multi line code snippets, scripts, or configuration files
- Never change the appearance of the site's navigation structure or metadata, the sidebar structure, or any other non-article content
- Always follow existing formatting patterns in the repository unless explicitly instructed otherwise

### Line Break Rules

When listing multiple items inside explanatory sections such as **Why It Matters**, use:

```html
<br />
```

instead of bullet lists.

---

## 4. Directory and Content Structure

All documentation lives under the `docs/` directory.

### Top-level sections:

- `/docs/attack_vectors` - Security attack vectors and exploitation scenarios
- `/docs/best_practices` - Security best practices and mitigation strategies
- `/docs/fundamentals` - Core Kubernetes security concepts
- `/docs/tools` - Security tools and utilities

### Best Practices Subsections:

- `/docs/best_practices/cluster_setup_and_hardening/`
  - `api_server_security/`
  - `cis/`
  - `configuration_validation/`
  - `control_plane_security/`
  - `network_security/`
  - `node_security/`
  - `pod_security/`
  - `rbac_and_identity/`
  - `secrets_management/`
- `/docs/best_practices/minimize_microservice_vulnerabilities/`
- `/docs/best_practices/monitoring_logging_and_runtime_security/`
- `/docs/best_practices/supply_chain_security/`
- `/docs/best_practices/system_hardening/`

### Directory Contents:

Each major directory contains:

- `_category_.json` - Category metadata and ordering
- `intro.md` - Landing page content (not shown in sidebar)

### Internal Link Requirements:

- All internal links **must** use absolute paths starting with: `/docs/...`
- Do **not** use relative links (e.g., `../other-page`)
- Do **not** include trailing slashes in internal links (e.g., `/docs/path/` is wrong, use `/docs/path`)
- Example: `/docs/best_practices/cluster_setup_and_hardening/secrets_management/insecure_secrets_management_mitigation`

---

## 5. Article Discoverability and Index Pages (CRITICAL)

**IMPORTANT:** Creating a new article file is **not sufficient** for it to appear on the site. Every new article **must** be added to the appropriate index/intro page to be discoverable.

### Index Page Update Requirements:

When creating a **new attack vector article**:

1. Create the article file in `/docs/attack_vectors/`
2. **IMMEDIATELY** add an entry to `/docs/attack_vectors/intro.md` with:
   - A descriptive bullet point with the article title
   - An absolute link to the new article (e.g., `/docs/attack_vectors/imagepullsecrets_theft`)
   - A brief description of the attack (one line)
3. Verify the link appears in the correct alphabetical or logical position
4. **Never skip this step** - articles not listed in intro.md will not appear on the site

When creating a **new best practices/mitigation article**:

1. Create the article file in the appropriate subdirectory under `/docs/best_practices/`
2. Mitigation articles in subdirectories with `_category_.json` files are automatically discovered
3. **However**, if creating a complementary mitigation article for a new attack vector, ensure the attack vector article links to it correctly

### Verification Checklist (Run After Creating New Articles):

- [ ] Article file created with correct YAML front matter and `sidebar_position`
- [ ] `sidebar_position` is unique within the directory (check other files)
- [ ] For attack vectors: Entry added to `/docs/attack_vectors/intro.md`
- [ ] All internal links use absolute paths without trailing slashes
- [ ] All links to other articles verified to exist
- [ ] Build command runs successfully: `npm run build`
- [ ] No broken link errors in build output

### Common Mistakes to Avoid:

- ❌ Creating an attack vector article without updating `intro.md`
- ❌ Using relative links like `../rbac_and_identity/intro`
- ❌ Adding trailing slashes to internal links like `/docs/path/intro/`
- ❌ Linking to non-existent intro pages (verify directory structure first)
- ❌ Duplicate `sidebar_position` values in the same directory
- ❌ Forgetting to run `npm run build` to verify no broken links

---

## 6. Attack Vector Articles (Strict Structure)

All attack vector articles **must** follow this structure:

### Required Structure:

1. **YAML Front Matter** - `sidebar_position`, `title`, `description`, `keywords`
2. **Title (H1)** - Same as in front matter
3. **Introduction** - 1-2 paragraphs summarizing the attack and risk
4. **Horizontal Rule** (`---`)
5. **## Exploitation Steps** - Main heading for the attack scenario
   - Brief introduction to the exploitation
   - Numbered subsections (H3 level) for each step
   - Include realistic commands and code examples
   - Use `bash`, `yaml`, `sql`, etc. code blocks with language identifiers
6. **### Result** - Subsection describing the outcome of the attack
7. **Horizontal Rule** (`---`)
8. **## Mitigation** - Section with link to the corresponding best practices article

### YAML Front Matter Requirements:

```yaml
---
sidebar_position: 1
title: "Article Title"
description: "Brief description of the article"
keywords: [keyword1, keyword2, keyword3, keyword4, keyword5]
---
```

**Keywords Field (CRITICAL for SEO):**
- Include 5-10 relevant keywords optimized for Google search
- Use terms that users would search for (e.g., "kubernetes security", "container escape", "privilege escalation")
- Include both general terms and specific technical terms
- Mix common searches with niche technical terms
- Consider including:
  - The main attack/technique name
  - Related Kubernetes resources (pods, secrets, RBAC, etc.)
  - Security concepts (privilege escalation, lateral movement, container escape)
  - Related tools or CVEs if applicable
  - Common variations and synonyms
- Example: `keywords: [kubernetes security, privilege escalation, container escape, docker breakout, privileged containers, host access, pod security, CKS]`

### Formatting Requirements:

- Use numbered subsections for exploitation steps (`### 1.`, `### 2.`, etc.)
- Do **not** add extra sections beyond this structure
- Do **not** use emojis, icons, or decorative elements
- Include realistic, executable commands where applicable
- Always link to the mitigation article using absolute paths

### Reference Example:

https://k8s-security.geek-kb.com/docs/attack_vectors/insecure_secrets_management/

---

## 7. Best Practices Articles

Best practices articles provide mitigation strategies and security guidance. They are organized under `/docs/best_practices/` in topical subdirectories.

### Required Structure:

1. **YAML Front Matter** - `sidebar_position`, `title`, `description`, `keywords`
2. **Title (H1)** - Descriptive title of the practice/mitigation
3. **Introduction** - 1-3 paragraphs explaining the security concern and approach
4. **Horizontal Rule** (`---`)
5. **Numbered Sections** (`## 1.`, `## 2.`, etc.) - Each addressing a specific practice/technique
   - **Issue/Problem statement** - Use format: `**Issue:** description<br/>`
   - **Fix/Solution statement** - Use format: `**Fix:** description`
   - Configuration examples with proper YAML formatting
   - Step-by-step implementation guidance
   - Use subsections (H3 level) for specific tools or approaches
6. When adding a new article, verify that the sidebar_position is unique within its category

### YAML Front Matter Requirements:

```yaml
---
sidebar_position: 1
title: "Best Practice Title"
description: "Brief description of the mitigation strategy"
keywords: [keyword1, keyword2, keyword3, keyword4, keyword5]
---
```

**Keywords Field (CRITICAL for SEO):**
- Include 5-10 relevant keywords optimized for Google search
- Focus on solution-oriented terms (e.g., "kubernetes security best practices", "secure secrets management", "RBAC hardening")
- Include the security domain (secrets, RBAC, network policies, etc.)
- Add implementation terms (encryption, rotation, least privilege, etc.)
- Consider including:
  - The main security practice/mitigation
  - Related Kubernetes resources and APIs
  - Security standards (CIS benchmark, Pod Security Standards, etc.)
  - Tools mentioned in the article (Falco, OPA, Vault, etc.)
  - Common problem terms users search for
- Example: `keywords: [kubernetes secrets security, secrets encryption, etcd encryption, external secrets operator, secrets management, vault integration, CIS kubernetes, secrets rotation]`

### Content Requirements:

- Clear explanation of the security concern
- Practical Kubernetes-focused guidance
- Realistic configuration examples with proper indentation
- Explicit explanation of why the practice matters
- Links to official documentation for tools mentioned
- Do **not** include placement recommendations for tools

### "Why It Matters" or Issue/Fix Sections:

- Use `<br/>` for line separation between issue and fix statements
- Format: `**Issue:** description<br/>` followed by `**Fix:** description`
- Do **not** use bullet lists for these sections
- Keep explanations concise and technical

### Example Structure:

```markdown
## 1. Encrypt Secrets at Rest in etcd

**Issue:** By default, secrets stored in etcd are not encrypted at rest.<br/>
**Fix:** Enable encryption using a Kubernetes `EncryptionConfiguration`.

### Example: etcd Encryption Configuration

[... YAML configuration ...]
```

---

## 8. Tool Articles

Tool articles are typically located within relevant best practices sections (e.g., supply chain security, monitoring, configuration validation) rather than in a separate `/docs/tools/` directory.

### Required Content:

- **Title and Description** - YAML front matter with `title`, `description`, `sidebar_position`, `keywords`
- **Tool Name (H1)** - Clear heading matching the title
- **Overview** - 1-2 paragraphs describing what the tool does
- **## Usage** - Main section showing how to use the tool
  - Installation instructions
  - Common commands and examples
  - Realistic code blocks with proper language identifiers
- **Integration examples** - Show how the tool integrates with Kubernetes
- **Links to resources** - Official documentation and GitHub repository

### Keywords for Tool Articles:

- Include the tool name and common variations
- Add the security domain the tool addresses
- Include terms like "kubernetes security tool", "container security", etc.
- Add related concepts (scanning, monitoring, policy enforcement, etc.)
- Example: `keywords: [trivy, container vulnerability scanning, kubernetes security scanner, image scanning, CVE detection, security tool, docker scanning]`

### Formatting Requirements:

- Use numbered subsections for step-by-step usage (`### 1.`, `### 2.`, etc.)
- Include realistic, executable commands
- Use appropriate code block language identifiers (`bash`, `yaml`, etc.)
- Do **not** include recommendations on where the tool should be placed in the site structure
- Focus on practical, security-focused usage within Kubernetes environments

---

## 9. Kubernetes Accuracy Requirements

- Use correct Kubernetes API versions
- Use realistic and valid YAML examples
- Do not use deprecated APIs unless explicitly discussed
- Security recommendations must align with:
  - Kubernetes upstream best practices
  - CIS Kubernetes Benchmark
  - CKS-aligned principles

---

## 10. Code and Configuration Examples

- YAML must be valid and properly indented
- Commands must be realistic and executable
- Avoid placeholders like `foo`, `bar`, or `example123`
- Prefer minimal but complete examples

---

## 11. Editing Existing Files

When updating an existing file:

- Rewrite the entire file, not partial patches
- Preserve existing structure unless explicitly instructed otherwise
- Do not remove content unless it is incorrect or redundant
- Follow the same formatting and structure rules as new articles
- **ALWAYS update or add the `keywords` field** in YAML front matter with relevant SEO-optimized terms
- When updating content, review and refresh keywords to ensure they match current content
- If keywords are missing, add them based on the article's topic and content

---

## 12. What Not to Do

- Do not add emojis or icons
- Do not change directory structure unless instructed
- Do not introduce new categories without approval
- Do not invent tools, features, or Kubernetes behavior
- Do not reference external blogs as authoritative sources
- Do not create or update articles without including SEO-optimized keywords

---

## 13. Goal of This Repository

The goal of **k8s-security** is to be:

- Technically accurate
- Security-focused
- Practical and actionable
- Suitable for engineers preparing for CKS or working in real-world Kubernetes environments

All contributions should move the repository closer to that goal.
