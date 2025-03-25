"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[2196],{4269:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>o,contentTitle:()=>c,default:()=>h,frontMatter:()=>i,metadata:()=>s,toc:()=>l});const s=JSON.parse('{"id":"best_practices/cluster_setup_and_hardening/configuration_validation/terrascan","title":"Terrascan","description":"Terrascan is a static code analyzer that detects compliance and security violations across Infrastructure as Code (IaC) configurations like Terraform, Kubernetes, and more.","source":"@site/docs/best_practices/cluster_setup_and_hardening/configuration_validation/terrascan.md","sourceDirName":"best_practices/cluster_setup_and_hardening/configuration_validation","slug":"/best_practices/cluster_setup_and_hardening/configuration_validation/terrascan","permalink":"/docs/best_practices/cluster_setup_and_hardening/configuration_validation/terrascan","draft":false,"unlisted":false,"tags":[],"version":"current","lastUpdatedBy":"Itai Ganot","lastUpdatedAt":1742842158000,"sidebarPosition":5,"frontMatter":{"title":"Terrascan","description":"Terrascan is a static code analyzer that detects compliance and security violations across Infrastructure as Code (IaC) configurations like Terraform, Kubernetes, and more.","sidebar_position":5}}');var a=r(4848),t=r(8453);const i={title:"Terrascan",description:"Terrascan is a static code analyzer that detects compliance and security violations across Infrastructure as Code (IaC) configurations like Terraform, Kubernetes, and more.",sidebar_position:5},c="Terrascan",o={},l=[{value:"Usage",id:"usage",level:2},{value:"1. Install Terrascan",id:"1-install-terrascan",level:3},{value:"2. Scan Terraform Code",id:"2-scan-terraform-code",level:3},{value:"3. Scan Kubernetes Manifests",id:"3-scan-kubernetes-manifests",level:3},{value:"4. Integrate with CI/CD Pipelines",id:"4-integrate-with-cicd-pipelines",level:3},{value:"Best Practices",id:"best-practices",level:2},{value:"Resources",id:"resources",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.header,{children:(0,a.jsx)(n.h1,{id:"terrascan",children:"Terrascan"})}),"\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.strong,{children:"Terrascan"})," is an open-source tool that performs ",(0,a.jsx)(n.strong,{children:"static analysis"})," of Infrastructure as Code (IaC) to detect ",(0,a.jsx)(n.strong,{children:"security and compliance violations"}),". It supports popular IaC frameworks including ",(0,a.jsx)(n.strong,{children:"Terraform"}),", ",(0,a.jsx)(n.strong,{children:"Kubernetes YAML"}),", ",(0,a.jsx)(n.strong,{children:"Helm"}),", ",(0,a.jsx)(n.strong,{children:"CloudFormation"}),", and ",(0,a.jsx)(n.strong,{children:"Dockerfiles"}),". Terrascan is useful for preventing insecure infrastructure configurations ",(0,a.jsx)(n.strong,{children:"before deployment"}),", ensuring cloud-native applications adhere to best practices and organizational policies."]}),"\n",(0,a.jsxs)(n.p,{children:["It comes with over ",(0,a.jsx)(n.strong,{children:"500 built-in policies"})," covering various compliance standards like ",(0,a.jsx)(n.strong,{children:"CIS"}),", ",(0,a.jsx)(n.strong,{children:"PCI DSS"}),", ",(0,a.jsx)(n.strong,{children:"SOC 2"}),", and ",(0,a.jsx)(n.strong,{children:"HIPAA"}),"."]}),"\n",(0,a.jsx)(n.hr,{}),"\n",(0,a.jsx)(n.h2,{id:"usage",children:"Usage"}),"\n",(0,a.jsx)(n.h3,{id:"1-install-terrascan",children:"1. Install Terrascan"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"brew install terrascan\n"})}),"\n",(0,a.jsx)(n.p,{children:"Or via curl:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"curl -L https://github.com/tenable/terrascan/releases/latest/download/terrascan_$(uname -s)_$(uname -m).tar.gz | tar -xz\nsudo mv terrascan /usr/local/bin/\n"})}),"\n",(0,a.jsx)(n.hr,{}),"\n",(0,a.jsx)(n.h3,{id:"2-scan-terraform-code",children:"2. Scan Terraform Code"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"terrascan scan -t terraform -d ./terraform/\n"})}),"\n",(0,a.jsx)(n.p,{children:"This will analyze the Terraform configuration in the directory and report violations like overly permissive security groups, unencrypted storage, and missing tags."}),"\n",(0,a.jsx)(n.hr,{}),"\n",(0,a.jsx)(n.h3,{id:"3-scan-kubernetes-manifests",children:"3. Scan Kubernetes Manifests"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"terrascan scan -t k8s -f ./deployment.yaml\n"})}),"\n",(0,a.jsx)(n.p,{children:"Terrascan will check for misconfigurations such as containers running as root, missing resource limits, and hostPath volumes."}),"\n",(0,a.jsx)(n.hr,{}),"\n",(0,a.jsx)(n.h3,{id:"4-integrate-with-cicd-pipelines",children:"4. Integrate with CI/CD Pipelines"}),"\n",(0,a.jsx)(n.p,{children:"Terrascan can be embedded into CI/CD systems like GitHub Actions, GitLab CI, Jenkins, or CircleCI."}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.strong,{children:"GitHub Actions example:"})}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-yaml",children:"- name: Terrascan Scan\n  uses: tenable/terrascan-action@v1\n"})}),"\n",(0,a.jsx)(n.hr,{}),"\n",(0,a.jsx)(n.h2,{id:"best-practices",children:"Best Practices"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Use Terrascan in local development and CI to shift security left."}),"\n",(0,a.jsx)(n.li,{children:"Update policies regularly to align with evolving compliance requirements."}),"\n",(0,a.jsxs)(n.li,{children:["Combine with other tools like ",(0,a.jsx)(n.strong,{children:"Trivy"})," or ",(0,a.jsx)(n.strong,{children:"OPA"})," for layered security."]}),"\n",(0,a.jsx)(n.li,{children:"Customize or create custom policies in Rego if needed for your organization."}),"\n",(0,a.jsx)(n.li,{children:"Fail builds when critical violations are detected to prevent misconfigurations from reaching production."}),"\n"]}),"\n",(0,a.jsx)(n.hr,{}),"\n",(0,a.jsx)(n.h2,{id:"resources",children:"Resources"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:"GitHub Repository:"})," ",(0,a.jsx)(n.a,{href:"https://github.com/tenable/terrascan",children:"https://github.com/tenable/terrascan"})]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:"Official Docs:"})," ",(0,a.jsx)(n.a,{href:"https://docs.tenable.com/terrascan",children:"https://docs.tenable.com/terrascan"})]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:"Policy Documentation:"})," ",(0,a.jsx)(n.a,{href:"https://docs.tenable.com/terrascan/policies",children:"https://docs.tenable.com/terrascan/policies"})]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},8453:(e,n,r)=>{r.d(n,{R:()=>i,x:()=>c});var s=r(6540);const a={},t=s.createContext(a);function i(e){const n=s.useContext(t);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),s.createElement(t.Provider,{value:n},e.children)}}}]);