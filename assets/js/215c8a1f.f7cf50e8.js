"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[6656],{649:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>l,contentTitle:()=>c,default:()=>u,frontMatter:()=>a,metadata:()=>s,toc:()=>o});const s=JSON.parse('{"id":"best_practices/monitoring_logging_and_runtime_security/trivy","title":"Trivy","description":"Overview, usage, and best practices for using Trivy to scan container images, file systems, and Kubernetes resources for vulnerabilities.","source":"@site/docs/best_practices/monitoring_logging_and_runtime_security/trivy.md","sourceDirName":"best_practices/monitoring_logging_and_runtime_security","slug":"/best_practices/monitoring_logging_and_runtime_security/trivy","permalink":"/k8s_security/docs/best_practices/monitoring_logging_and_runtime_security/trivy","draft":false,"unlisted":false,"editUrl":"https://github.com/geek-kb/k8s_security/edit/main/docs/best_practices/monitoring_logging_and_runtime_security/trivy.md","tags":[],"version":"current","lastUpdatedBy":"Itai Ganot","lastUpdatedAt":1742809605000,"sidebarPosition":2,"frontMatter":{"sidebar_position":2,"title":"Trivy","description":"Overview, usage, and best practices for using Trivy to scan container images, file systems, and Kubernetes resources for vulnerabilities."},"sidebar":"default","previous":{"title":"Monitoring, Logging, and Runtime Security","permalink":"/k8s_security/docs/best_practices/monitoring_logging_and_runtime_security/intro"},"next":{"title":"Grype","permalink":"/k8s_security/docs/best_practices/monitoring_logging_and_runtime_security/grype"}}');var r=n(4848),t=n(8453);const a={sidebar_position:2,title:"Trivy",description:"Overview, usage, and best practices for using Trivy to scan container images, file systems, and Kubernetes resources for vulnerabilities."},c="Trivy",l={},o=[{value:"Why Use Trivy",id:"why-use-trivy",level:2},{value:"Basic Usage",id:"basic-usage",level:2},{value:"1. Scan a Docker Image",id:"1-scan-a-docker-image",level:3},{value:"2. Scan Kubernetes Cluster (Runtime)",id:"2-scan-kubernetes-cluster-runtime",level:3},{value:"3. Scan a Kubernetes YAML Manifest",id:"3-scan-a-kubernetes-yaml-manifest",level:3},{value:"4. Scan a Local Filesystem",id:"4-scan-a-local-filesystem",level:3},{value:"5. Generate SBOM (Software Bill of Materials)",id:"5-generate-sbom-software-bill-of-materials",level:3},{value:"Integrating Trivy into CI/CD",id:"integrating-trivy-into-cicd",level:2},{value:"Best Practices",id:"best-practices",level:2},{value:"Resources",id:"resources",level:2}];function d(e){const i={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.header,{children:(0,r.jsx)(i.h1,{id:"trivy",children:"Trivy"})}),"\n",(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:"Required knowledge for the CKS certification."})}),"\n",(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.strong,{children:"Trivy"})," is a comprehensive and easy-to-use ",(0,r.jsx)(i.strong,{children:"vulnerability scanner"})," for containers, Kubernetes, IaC (Infrastructure as Code), file systems, and Git repositories. It helps identify security risks across different stages of the development lifecycle and is widely adopted in Kubernetes environments."]}),"\n",(0,r.jsxs)(i.p,{children:["It is an ",(0,r.jsx)(i.strong,{children:"open-source tool"})," maintained by ",(0,r.jsx)(i.strong,{children:"Aqua Security"}),", with a strong community and extensive documentation."]}),"\n",(0,r.jsx)(i.p,{children:"Trivy supports scanning for:"}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:"OS packages and software dependencies"}),"\n",(0,r.jsx)(i.li,{children:"Misconfigurations in Dockerfiles, Kubernetes manifests, Terraform, and more"}),"\n",(0,r.jsx)(i.li,{children:"Sensitive information like secrets embedded in files"}),"\n",(0,r.jsx)(i.li,{children:"SBOM (Software Bill of Materials) generation"}),"\n",(0,r.jsx)(i.li,{children:"Kubernetes cluster scanning (runtime)"}),"\n"]}),"\n",(0,r.jsx)(i.hr,{}),"\n",(0,r.jsx)(i.h2,{id:"why-use-trivy",children:"Why Use Trivy"}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:"Lightweight and fast"}),"\n",(0,r.jsx)(i.li,{children:"Minimal configuration required"}),"\n",(0,r.jsx)(i.li,{children:"Integrates easily with CI/CD pipelines"}),"\n",(0,r.jsx)(i.li,{children:"Supports a wide range of scanning targets (images, filesystems, repos, K8s, etc.)"}),"\n",(0,r.jsx)(i.li,{children:"Actively maintained and community-supported"}),"\n"]}),"\n",(0,r.jsx)(i.hr,{}),"\n",(0,r.jsx)(i.h2,{id:"basic-usage",children:"Basic Usage"}),"\n",(0,r.jsx)(i.h3,{id:"1-scan-a-docker-image",children:"1. Scan a Docker Image"}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:"language-bash",children:"trivy image nginx:latest\n"})}),"\n",(0,r.jsx)(i.p,{children:"This command scans the image for vulnerabilities in installed packages and application dependencies."}),"\n",(0,r.jsx)(i.hr,{}),"\n",(0,r.jsx)(i.h3,{id:"2-scan-kubernetes-cluster-runtime",children:"2. Scan Kubernetes Cluster (Runtime)"}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:"language-bash",children:"trivy k8s cluster\n"})}),"\n",(0,r.jsx)(i.p,{children:"This scans running resources and their configurations in the cluster."}),"\n",(0,r.jsx)(i.hr,{}),"\n",(0,r.jsx)(i.h3,{id:"3-scan-a-kubernetes-yaml-manifest",children:"3. Scan a Kubernetes YAML Manifest"}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:"language-bash",children:"trivy config ./manifests/\n"})}),"\n",(0,r.jsx)(i.p,{children:"This helps detect misconfigurations in YAML files before deployment."}),"\n",(0,r.jsx)(i.hr,{}),"\n",(0,r.jsx)(i.h3,{id:"4-scan-a-local-filesystem",children:"4. Scan a Local Filesystem"}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:"language-bash",children:"trivy fs /path/to/code\n"})}),"\n",(0,r.jsx)(i.p,{children:"This scans source code and files for secrets or vulnerabilities."}),"\n",(0,r.jsx)(i.hr,{}),"\n",(0,r.jsx)(i.h3,{id:"5-generate-sbom-software-bill-of-materials",children:"5. Generate SBOM (Software Bill of Materials)"}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:"language-bash",children:"trivy sbom --format cyclonedx --output sbom.json my-app:1.0.0\n"})}),"\n",(0,r.jsx)(i.p,{children:"Use this to generate an SBOM in CycloneDX format for compliance or auditing."}),"\n",(0,r.jsx)(i.hr,{}),"\n",(0,r.jsx)(i.h2,{id:"integrating-trivy-into-cicd",children:"Integrating Trivy into CI/CD"}),"\n",(0,r.jsx)(i.p,{children:"Trivy can be embedded into CI pipelines to fail builds on vulnerability thresholds."}),"\n",(0,r.jsx)(i.p,{children:"Example with GitHub Actions:"}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:"language-yaml",children:'- name: Scan Docker image with Trivy\n  uses: aquasecurity/trivy-action@master\n  with:\n    image-ref: "nginx:latest"\n    format: "table"\n    exit-code: "1"\n    severity: "CRITICAL,HIGH"\n'})}),"\n",(0,r.jsx)(i.hr,{}),"\n",(0,r.jsx)(i.h2,{id:"best-practices",children:"Best Practices"}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:"Run Trivy scans at each stage of your CI/CD pipeline (code \u2192 image \u2192 deployment)."}),"\n",(0,r.jsxs)(i.li,{children:["Use severity filters (",(0,r.jsx)(i.code,{children:"--severity"}),") to control what triggers failures."]}),"\n",(0,r.jsxs)(i.li,{children:["Enable and regularly run ",(0,r.jsx)(i.strong,{children:"Kubernetes runtime scans"})," in production clusters."]}),"\n",(0,r.jsxs)(i.li,{children:["Use ",(0,r.jsx)(i.code,{children:"--ignore-unfixed"})," to reduce noise from known but unfixed issues."]}),"\n",(0,r.jsx)(i.li,{children:"Pair Trivy with tools like Kyverno or Gatekeeper to enforce policies based on scan results."}),"\n",(0,r.jsx)(i.li,{children:"Periodically update the vulnerability database with:"}),"\n"]}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:"language-bash",children:"trivy --download-db-only\n"})}),"\n",(0,r.jsx)(i.hr,{}),"\n",(0,r.jsx)(i.h2,{id:"resources",children:"Resources"}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.strong,{children:"Official Documentation"}),": ",(0,r.jsx)(i.a,{href:"https://aquasecurity.github.io/trivy",children:"https://aquasecurity.github.io/trivy"})]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.strong,{children:"GitHub Repository"}),": ",(0,r.jsx)(i.a,{href:"https://github.com/aquasecurity/trivy",children:"https://github.com/aquasecurity/trivy"})]}),"\n"]}),"\n",(0,r.jsx)(i.hr,{}),"\n",(0,r.jsx)(i.p,{children:"Trivy helps enforce runtime security posture and supports vulnerability management and visibility across Kubernetes environments."})]})}function u(e={}){const{wrapper:i}={...(0,t.R)(),...e.components};return i?(0,r.jsx)(i,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},8453:(e,i,n)=>{n.d(i,{R:()=>a,x:()=>c});var s=n(6540);const r={},t=s.createContext(r);function a(e){const i=s.useContext(t);return s.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function c(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),s.createElement(t.Provider,{value:i},e.children)}}}]);