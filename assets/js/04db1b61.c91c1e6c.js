"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[7323],{6417:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>l,contentTitle:()=>c,default:()=>u,frontMatter:()=>a,metadata:()=>t,toc:()=>o});const t=JSON.parse('{"id":"best_practices/supply_chain_security/syft","title":"Syft","description":"Generate Software Bill of Materials (SBOMs) to enhance Kubernetes supply chain security.","source":"@site/docs/best_practices/supply_chain_security/syft.md","sourceDirName":"best_practices/supply_chain_security","slug":"/best_practices/supply_chain_security/syft","permalink":"/docs/best_practices/supply_chain_security/syft","draft":false,"unlisted":false,"tags":[],"version":"current","lastUpdatedBy":"Itai Ganot","lastUpdatedAt":1742809605000,"sidebarPosition":3,"frontMatter":{"sidebar_position":3,"title":"Syft","description":"Generate Software Bill of Materials (SBOMs) to enhance Kubernetes supply chain security."},"sidebar":"default","previous":{"title":"Supply Chain Security Best Practices","permalink":"/docs/best_practices/supply_chain_security/supply_chain_best_practices"},"next":{"title":"Cosign","permalink":"/docs/best_practices/supply_chain_security/cosign"}}');var r=n(4848),i=n(8453);const a={sidebar_position:3,title:"Syft",description:"Generate Software Bill of Materials (SBOMs) to enhance Kubernetes supply chain security."},c="Syft",l={},o=[{value:"Key Features",id:"key-features",level:2},{value:"Installation",id:"installation",level:2},{value:"Usage Examples",id:"usage-examples",level:2},{value:"Generate an SBOM for a Docker Image",id:"generate-an-sbom-for-a-docker-image",level:3},{value:"Output SBOM in JSON Format",id:"output-sbom-in-json-format",level:3},{value:"Output in CycloneDX Format",id:"output-in-cyclonedx-format",level:3},{value:"Generate SBOM for a Local Directory",id:"generate-sbom-for-a-local-directory",level:3},{value:"Best Practices",id:"best-practices",level:2},{value:"Resources",id:"resources",level:2}];function d(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.header,{children:(0,r.jsx)(s.h1,{id:"syft",children:"Syft"})}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.strong,{children:"Required knowledge for the CKS certification."})}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"Syft"})," is a CLI tool and Go library developed by Anchore for generating ",(0,r.jsx)(s.strong,{children:"Software Bill of Materials (SBOMs)"})," for container images and filesystems. SBOMs provide detailed metadata about the components, libraries, and packages included in container images, which is essential for ",(0,r.jsx)(s.strong,{children:"vulnerability management, auditing, and supply chain security"}),"."]}),"\n",(0,r.jsx)(s.p,{children:"Syft supports various output formats (e.g., JSON, SPDX, CycloneDX) and integrates with other tools to scan and track open source software usage across your Kubernetes workloads."}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h2,{id:"key-features",children:"Key Features"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:"Generates SBOMs from container images, directories, and tarballs"}),"\n",(0,r.jsx)(s.li,{children:"Supports multiple output formats: JSON, SPDX, CycloneDX, and more"}),"\n",(0,r.jsx)(s.li,{children:"Detects packages from many ecosystems (Debian, Alpine, Go, npm, Python, etc.)"}),"\n",(0,r.jsxs)(s.li,{children:["Works well with ",(0,r.jsx)(s.strong,{children:"Grype"}),", a vulnerability scanner"]}),"\n",(0,r.jsx)(s.li,{children:"Can be used in CI/CD pipelines for compliance and auditing"}),"\n"]}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h2,{id:"installation",children:"Installation"}),"\n",(0,r.jsx)(s.p,{children:"You can install Syft using a simple script or package manager:"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-bash",children:"curl -sSfL https://raw.githubusercontent.com/anchore/syft/main/install.sh | sh -s -- -b /usr/local/bin\n"})}),"\n",(0,r.jsx)(s.p,{children:"Alternatively, via Docker:"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-bash",children:"docker pull anchore/syft\n"})}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h2,{id:"usage-examples",children:"Usage Examples"}),"\n",(0,r.jsx)(s.h3,{id:"generate-an-sbom-for-a-docker-image",children:"Generate an SBOM for a Docker Image"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-bash",children:"syft nginx:latest\n"})}),"\n",(0,r.jsx)(s.h3,{id:"output-sbom-in-json-format",children:"Output SBOM in JSON Format"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-bash",children:"syft nginx:latest -o json > sbom.json\n"})}),"\n",(0,r.jsx)(s.h3,{id:"output-in-cyclonedx-format",children:"Output in CycloneDX Format"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-bash",children:"syft nginx:latest -o cyclonedx > sbom.xml\n"})}),"\n",(0,r.jsx)(s.h3,{id:"generate-sbom-for-a-local-directory",children:"Generate SBOM for a Local Directory"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-bash",children:"syft dir:/usr/local/my-app\n"})}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h2,{id:"best-practices",children:"Best Practices"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Generate SBOMs for every container image"})," as part of the build pipeline to track dependencies and licenses."]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Store and version SBOMs"})," alongside the container images for future auditing."]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Integrate Syft with vulnerability scanners"})," like Grype to continuously assess component risks."]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Use standard formats"})," like SPDX or CycloneDX for interoperability with other tools and systems."]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Automate SBOM generation in CI/CD pipelines"})," to enforce secure software delivery practices."]}),"\n"]}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h2,{id:"resources",children:"Resources"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Official Documentation"}),": ",(0,r.jsx)(s.a,{href:"https://anchore.com/docs/syft",children:"https://anchore.com/docs/syft"})]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"GitHub Repository"}),": ",(0,r.jsx)(s.a,{href:"https://github.com/anchore/syft",children:"https://github.com/anchore/syft"})]}),"\n"]})]})}function u(e={}){const{wrapper:s}={...(0,i.R)(),...e.components};return s?(0,r.jsx)(s,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},8453:(e,s,n)=>{n.d(s,{R:()=>a,x:()=>c});var t=n(6540);const r={},i=t.createContext(r);function a(e){const s=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function c(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),t.createElement(i.Provider,{value:s},e.children)}}}]);