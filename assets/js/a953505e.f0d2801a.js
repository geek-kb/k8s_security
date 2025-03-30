"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[592],{8453:(e,n,s)=>{s.d(n,{R:()=>a,x:()=>c});var i=s(6540);const t={},r=i.createContext(t);function a(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),i.createElement(r.Provider,{value:n},e.children)}},9085:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>c,default:()=>h,frontMatter:()=>a,metadata:()=>i,toc:()=>o});const i=JSON.parse('{"id":"best_practices/supply_chain_security/snyk","title":"Snyk","description":"Snyk is a developer-first security tool that scans containers, Kubernetes manifests, and code for vulnerabilities, license issues, and misconfigurations.","source":"@site/docs/best_practices/supply_chain_security/snyk.md","sourceDirName":"best_practices/supply_chain_security","slug":"/best_practices/supply_chain_security/snyk","permalink":"/docs/best_practices/supply_chain_security/snyk","draft":false,"unlisted":false,"tags":[],"version":"current","lastUpdatedBy":"Itai Ganot","lastUpdatedAt":1742842158000,"sidebarPosition":6,"frontMatter":{"title":"Snyk","description":"Snyk is a developer-first security tool that scans containers, Kubernetes manifests, and code for vulnerabilities, license issues, and misconfigurations.","sidebar_position":6},"sidebar":"default","previous":{"title":"Notation","permalink":"/docs/best_practices/supply_chain_security/notation"},"next":{"title":"Understanding SBOM","permalink":"/docs/best_practices/supply_chain_security/sbom"}}');var t=s(4848),r=s(8453);const a={title:"Snyk",description:"Snyk is a developer-first security tool that scans containers, Kubernetes manifests, and code for vulnerabilities, license issues, and misconfigurations.",sidebar_position:6},c="Snyk",l={},o=[{value:"Usage",id:"usage",level:2},{value:"1. Install Snyk CLI",id:"1-install-snyk-cli",level:3},{value:"2. Scan Kubernetes Manifests and Helm Charts",id:"2-scan-kubernetes-manifests-and-helm-charts",level:3},{value:"3. Scan Container Images",id:"3-scan-container-images",level:3},{value:"4. Monitor for Fixable Issues",id:"4-monitor-for-fixable-issues",level:3},{value:"5. Integrate with CI/CD and Git Repositories",id:"5-integrate-with-cicd-and-git-repositories",level:3},{value:"Best Practices",id:"best-practices",level:2},{value:"Resources",id:"resources",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"snyk",children:"Snyk"})}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Snyk"})," is a comprehensive ",(0,t.jsx)(n.strong,{children:"developer-friendly security platform"})," that scans for ",(0,t.jsx)(n.strong,{children:"vulnerabilities, license issues, and misconfigurations"})," across code, open-source dependencies, containers, and Kubernetes configurations. It helps teams shift security left by integrating directly into CI/CD pipelines and development environments."]}),"\n",(0,t.jsxs)(n.p,{children:["In Kubernetes environments, Snyk plays a critical role in ",(0,t.jsx)(n.strong,{children:"securing container images and IaC (Infrastructure as Code)"}),", including ",(0,t.jsx)(n.strong,{children:"Kubernetes manifests"})," and ",(0,t.jsx)(n.strong,{children:"Helm charts"}),"."]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"usage",children:"Usage"}),"\n",(0,t.jsx)(n.h3,{id:"1-install-snyk-cli",children:"1. Install Snyk CLI"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"npm install -g snyk\n"})}),"\n",(0,t.jsx)(n.p,{children:"Authenticate your CLI with:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"snyk auth\n"})}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h3,{id:"2-scan-kubernetes-manifests-and-helm-charts",children:"2. Scan Kubernetes Manifests and Helm Charts"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"snyk iac test path/to/k8s/deployment.yaml\n"})}),"\n",(0,t.jsx)(n.p,{children:"Or for Helm:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"snyk iac test path/to/chart/\n"})}),"\n",(0,t.jsx)(n.p,{children:"Snyk identifies issues such as:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Containers running as root"}),"\n",(0,t.jsx)(n.li,{children:"Privileged mode enabled"}),"\n",(0,t.jsx)(n.li,{children:"Lack of resource limits"}),"\n",(0,t.jsx)(n.li,{children:"Insecure hostPath mounts"}),"\n"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h3,{id:"3-scan-container-images",children:"3. Scan Container Images"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"snyk container test <image-name>\n"})}),"\n",(0,t.jsx)(n.p,{children:"This checks for known vulnerabilities in OS packages and language dependencies (e.g., Alpine, Ubuntu, Python, Node.js, etc.)."}),"\n",(0,t.jsx)(n.p,{children:"Example:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"snyk container test nginx:latest\n"})}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h3,{id:"4-monitor-for-fixable-issues",children:"4. Monitor for Fixable Issues"}),"\n",(0,t.jsx)(n.p,{children:"You can monitor projects continuously:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"snyk monitor\n"})}),"\n",(0,t.jsx)(n.p,{children:"This sends results to the Snyk UI and alerts you when new vulnerabilities are discovered in used images or dependencies."}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h3,{id:"5-integrate-with-cicd-and-git-repositories",children:"5. Integrate with CI/CD and Git Repositories"}),"\n",(0,t.jsx)(n.p,{children:"Snyk integrates with:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"GitHub, GitLab, Bitbucket"}),"\n",(0,t.jsx)(n.li,{children:"Jenkins, GitHub Actions, CircleCI, Azure DevOps, and more"}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"Add a GitHub Action, for example:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"- name: Snyk Container Scan\n  uses: snyk/actions/docker@master\n  with:\n    image: my-app:latest\n    args: --file=Dockerfile\n  env:\n    SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}\n"})}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"best-practices",children:"Best Practices"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Include ",(0,t.jsx)(n.code,{children:"snyk iac test"})," in pull request workflows to catch misconfigurations early."]}),"\n",(0,t.jsxs)(n.li,{children:["Scan all ",(0,t.jsx)(n.strong,{children:"production images"})," before publishing to container registries."]}),"\n",(0,t.jsxs)(n.li,{children:["Set up ",(0,t.jsx)(n.strong,{children:"monitoring"})," on critical workloads for real-time vulnerability awareness."]}),"\n",(0,t.jsx)(n.li,{children:"Regularly review and patch fixable issues identified in Kubernetes resources and base images."}),"\n",(0,t.jsxs)(n.li,{children:["Combine with ",(0,t.jsx)(n.code,{children:"kubectl"})," plugins or GitOps workflows to embed scanning into cluster updates."]}),"\n"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"resources",children:"Resources"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"GitHub:"})," ",(0,t.jsx)(n.a,{href:"https://github.com/snyk",children:"https://github.com/snyk"})]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Official Documentation:"})," ",(0,t.jsx)(n.a,{href:"https://docs.snyk.io",children:"https://docs.snyk.io"})]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}}}]);