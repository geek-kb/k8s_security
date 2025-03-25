"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[7868],{6120:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>l,default:()=>u,frontMatter:()=>a,metadata:()=>i,toc:()=>o});const i=JSON.parse('{"id":"best_practices/monitoring_logging_and_runtime_security/grype","title":"Grype","description":"Scan container images and filesystems for known vulnerabilities to secure Kubernetes workloads.","source":"@site/docs/best_practices/monitoring_logging_and_runtime_security/grype.md","sourceDirName":"best_practices/monitoring_logging_and_runtime_security","slug":"/best_practices/monitoring_logging_and_runtime_security/grype","permalink":"/docs/best_practices/monitoring_logging_and_runtime_security/grype","draft":false,"unlisted":false,"tags":[],"version":"current","lastUpdatedBy":"Itai Ganot","lastUpdatedAt":1742809605000,"sidebarPosition":3,"frontMatter":{"sidebar_position":3,"title":"Grype","description":"Scan container images and filesystems for known vulnerabilities to secure Kubernetes workloads."},"sidebar":"default","previous":{"title":"Trivy","permalink":"/docs/best_practices/monitoring_logging_and_runtime_security/trivy"},"next":{"title":"Falco","permalink":"/docs/best_practices/monitoring_logging_and_runtime_security/falco"}}');var r=s(4848),t=s(8453);const a={sidebar_position:3,title:"Grype",description:"Scan container images and filesystems for known vulnerabilities to secure Kubernetes workloads."},l="Grype",c={},o=[{value:"Key Features",id:"key-features",level:2},{value:"Installation",id:"installation",level:2},{value:"Usage Examples",id:"usage-examples",level:2},{value:"Scan a Container Image from Docker Hub",id:"scan-a-container-image-from-docker-hub",level:3},{value:"Scan a Local Filesystem Directory",id:"scan-a-local-filesystem-directory",level:3},{value:"Use a Syft-Generated SBOM as Input",id:"use-a-syft-generated-sbom-as-input",level:3},{value:"Output Results in JSON",id:"output-results-in-json",level:3},{value:"Best Practices",id:"best-practices",level:2},{value:"Resources",id:"resources",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"grype",children:"Grype"})}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Required knowledge for the CKS certification."})}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Grype"})," is a powerful CLI tool and Go library developed by Anchore to ",(0,r.jsx)(n.strong,{children:"scan container images and filesystems for known vulnerabilities"}),". It analyzes the contents of images using Software Bill of Materials (SBOMs) and reports vulnerabilities based on public and private databases, including NVD, GitHub Security Advisories, and distro-specific sources."]}),"\n",(0,r.jsxs)(n.p,{children:["Grype plays a crucial role in Kubernetes supply chain and runtime security by helping developers and operators ",(0,r.jsx)(n.strong,{children:"detect and fix vulnerabilities before deployment"}),"."]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"key-features",children:"Key Features"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Scans container images (local or remote), directories, and SBOMs"}),"\n",(0,r.jsx)(n.li,{children:"Supports vulnerability matching using multiple databases (NVD, GitHub, OS-specific)"}),"\n",(0,r.jsxs)(n.li,{children:["Integrates with ",(0,r.jsx)(n.strong,{children:"Syft"})," for SBOM-based scanning"]}),"\n",(0,r.jsx)(n.li,{children:"Multiple output formats (table, JSON, CycloneDX, etc.)"}),"\n",(0,r.jsx)(n.li,{children:"Useful in CI/CD pipelines for continuous scanning"}),"\n"]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,r.jsx)(n.p,{children:"Install via script:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"curl -sSfL https://raw.githubusercontent.com/anchore/grype/main/install.sh | sh -s -- -b /usr/local/bin\n"})}),"\n",(0,r.jsx)(n.p,{children:"Or via Docker:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"docker pull anchore/grype\n"})}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"usage-examples",children:"Usage Examples"}),"\n",(0,r.jsx)(n.h3,{id:"scan-a-container-image-from-docker-hub",children:"Scan a Container Image from Docker Hub"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"grype nginx:latest\n"})}),"\n",(0,r.jsx)(n.h3,{id:"scan-a-local-filesystem-directory",children:"Scan a Local Filesystem Directory"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"grype dir:/path/to/codebase\n"})}),"\n",(0,r.jsx)(n.h3,{id:"use-a-syft-generated-sbom-as-input",children:"Use a Syft-Generated SBOM as Input"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"syft nginx:latest -o cyclonedx > sbom.xml\ngrype sbom:sbom.xml\n"})}),"\n",(0,r.jsx)(n.h3,{id:"output-results-in-json",children:"Output Results in JSON"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"grype nginx:latest -o json > results.json\n"})}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"best-practices",children:"Best Practices"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Scan every image before deployment"})," to Kubernetes to reduce risk of known vulnerabilities."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Integrate Grype into CI/CD pipelines"})," to automate and enforce vulnerability checks."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Combine Grype with Syft"})," for SBOM-driven scanning and detailed dependency tracking."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Continuously update Grype and its vulnerability database"})," to ensure accurate results."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Act on high and critical findings promptly"}),", and document mitigations in code or deployment pipelines."]}),"\n"]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"resources",children:"Resources"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Official Documentation"}),": ",(0,r.jsx)(n.a,{href:"https://docs.anchore.com/current/docs/overview/what-is-grype/",children:"https://docs.anchore.com/current/docs/overview/what-is-grype/"})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"GitHub Repository"}),": ",(0,r.jsx)(n.a,{href:"https://github.com/anchore/grype",children:"https://github.com/anchore/grype"})]}),"\n"]})]})}function u(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>a,x:()=>l});var i=s(6540);const r={},t=i.createContext(r);function a(e){const n=i.useContext(t);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),i.createElement(t.Provider,{value:n},e.children)}}}]);