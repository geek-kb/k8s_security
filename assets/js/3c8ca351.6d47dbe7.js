"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[3044],{5817:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>h,frontMatter:()=>c,metadata:()=>r,toc:()=>d});const r=JSON.parse('{"id":"fundamentals/the_4_c_cloud_native_security","title":"The Four C\'s of Cloud Native Security","description":"Understand the Four C\'s of Cloud Native Security: Code, Container, Cluster, and Cloud, and learn best practices to secure Kubernetes environments.","source":"@site/docs/fundamentals/the_4_c_cloud_native_security.md","sourceDirName":"fundamentals","slug":"/fundamentals/the_4_c_cloud_native_security","permalink":"/k8s_security/docs/fundamentals/the_4_c_cloud_native_security","draft":false,"unlisted":false,"editUrl":"https://github.com/geek-kb/k8s_security/edit/main/docs/fundamentals/the_4_c_cloud_native_security.md","tags":[],"version":"current","lastUpdatedBy":"Itai Ganot","lastUpdatedAt":1742801266000,"sidebarPosition":3,"frontMatter":{"sidebar_position":3,"title":"The Four C\'s of Cloud Native Security","description":"Understand the Four C\'s of Cloud Native Security: Code, Container, Cluster, and Cloud, and learn best practices to secure Kubernetes environments."},"sidebar":"default","previous":{"title":"Understanding the Kubernetes Attack Surface","permalink":"/k8s_security/docs/fundamentals/understanding_k8s_attack_surface"},"next":{"title":"Authentication Methods","permalink":"/k8s_security/docs/fundamentals/authentication/authentication_methods"}}');var t=s(4848),i=s(8453);const c={sidebar_position:3,title:"The Four C's of Cloud Native Security",description:"Understand the Four C's of Cloud Native Security: Code, Container, Cluster, and Cloud, and learn best practices to secure Kubernetes environments."},o="The Four C's of Cloud Native Security",l={},d=[{value:"The Four C&#39;s of Cloud Native Security",id:"the-four-cs-of-cloud-native-security-1",level:2},{value:"1. Code Security",id:"1-code-security",level:2},{value:"Best Practices",id:"best-practices",level:3},{value:"2. Container Security",id:"2-container-security",level:2},{value:"Best Practices",id:"best-practices-1",level:3},{value:"3. Cluster Security",id:"3-cluster-security",level:2},{value:"Best Practices",id:"best-practices-2",level:3},{value:"4. Cloud Security",id:"4-cloud-security",level:2},{value:"Best Practices",id:"best-practices-3",level:3},{value:"Building a Defense-in-Depth Strategy",id:"building-a-defense-in-depth-strategy",level:2},{value:"Conclusion",id:"conclusion",level:2}];function a(e){const n={h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"the-four-cs-of-cloud-native-security",children:"The Four C's of Cloud Native Security"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Required knowledge for the CKS certification."})}),"\n",(0,t.jsxs)(n.p,{children:["Securing cloud-native applications requires a holistic approach that spans multiple layers of the technology stack. The ",(0,t.jsx)(n.strong,{children:"Four C's of Cloud Native Security"})," \u2014 ",(0,t.jsx)(n.strong,{children:"Code"}),", ",(0,t.jsx)(n.strong,{children:"Container"}),", ",(0,t.jsx)(n.strong,{children:"Cluster"}),", and ",(0,t.jsx)(n.strong,{children:"Cloud"})," \u2014 provide a framework to help organizations build robust and secure systems. By securing each of these layers, you create a ",(0,t.jsx)(n.strong,{children:"defense-in-depth strategy"})," that minimizes the ",(0,t.jsx)(n.strong,{children:"attack surface"})," of your ",(0,t.jsx)(n.strong,{children:"Kubernetes"})," and ",(0,t.jsx)(n.strong,{children:"cloud-native environments"}),"."]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"the-four-cs-of-cloud-native-security-1",children:"The Four C's of Cloud Native Security"}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.strong,{children:"Four C's"})," break down the ",(0,t.jsx)(n.strong,{children:"security model"})," into ",(0,t.jsx)(n.strong,{children:"manageable layers"}),", each with its own ",(0,t.jsx)(n.strong,{children:"best practices"}),":"]}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Code"}),": The security of the ",(0,t.jsx)(n.strong,{children:"application code"}),"."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Container"}),": The security of ",(0,t.jsx)(n.strong,{children:"container images"})," and ",(0,t.jsx)(n.strong,{children:"runtime"}),"."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Cluster"}),": The security of the ",(0,t.jsx)(n.strong,{children:"Kubernetes cluster"})," and its ",(0,t.jsx)(n.strong,{children:"components"}),"."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Cloud"}),": The security of the ",(0,t.jsx)(n.strong,{children:"infrastructure"})," and ",(0,t.jsx)(n.strong,{children:"cloud provider services"}),"."]}),"\n"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"1-code-security",children:"1. Code Security"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Code"})," is the ",(0,t.jsx)(n.strong,{children:"innermost layer"})," of cloud-native security. It focuses on ",(0,t.jsx)(n.strong,{children:"application-level security practices"}),", including:"]}),"\n",(0,t.jsx)(n.h3,{id:"best-practices",children:"Best Practices"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Static Application Security Testing (SAST)"}),": Use tools like ",(0,t.jsx)(n.strong,{children:"SonarQube"}),", ",(0,t.jsx)(n.strong,{children:"Checkmarx"}),", or ",(0,t.jsx)(n.strong,{children:"Snyk"})," to ",(0,t.jsx)(n.strong,{children:"scan code for vulnerabilities"}),"."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Dependency Management"}),": Regularly ",(0,t.jsx)(n.strong,{children:"update dependencies"})," and use tools like ",(0,t.jsx)(n.strong,{children:"npm audit"})," or ",(0,t.jsx)(n.strong,{children:"OWASP Dependency-Check"}),"."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Code Reviews"}),": Implement ",(0,t.jsx)(n.strong,{children:"peer reviews"})," and ",(0,t.jsx)(n.strong,{children:"automated checks"})," in ",(0,t.jsx)(n.strong,{children:"CI/CD pipelines"}),"."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Secrets Management"}),": Avoid ",(0,t.jsx)(n.strong,{children:"hardcoding secrets"}),". Use tools like ",(0,t.jsx)(n.strong,{children:"Vault"}),", ",(0,t.jsx)(n.strong,{children:"AWS Secrets Manager"}),", or ",(0,t.jsx)(n.strong,{children:"Kubernetes Secrets"}),"."]}),"\n"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"2-container-security",children:"2. Container Security"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Containers"})," package the ",(0,t.jsx)(n.strong,{children:"application code"})," and ",(0,t.jsx)(n.strong,{children:"dependencies"})," but can introduce security risks if not properly managed."]}),"\n",(0,t.jsx)(n.h3,{id:"best-practices-1",children:"Best Practices"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Image Scanning"}),": Scan container images for ",(0,t.jsx)(n.strong,{children:"vulnerabilities"})," using tools like ",(0,t.jsx)(n.strong,{children:"Trivy"}),", ",(0,t.jsx)(n.strong,{children:"Anchore"}),", or ",(0,t.jsx)(n.strong,{children:"Clair"}),"."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Minimal Base Images"}),": Use ",(0,t.jsx)(n.strong,{children:"distroless"})," or ",(0,t.jsx)(n.strong,{children:"scratch images"})," to reduce the ",(0,t.jsx)(n.strong,{children:"attack surface"}),"."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Immutable Images"}),": Avoid ",(0,t.jsx)(n.strong,{children:"updating images"})," in production. Instead, create ",(0,t.jsx)(n.strong,{children:"new images"})," and ",(0,t.jsx)(n.strong,{children:"redeploy"}),"."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Runtime Security"}),": Monitor containers with ",(0,t.jsx)(n.strong,{children:"Falco"}),", ",(0,t.jsx)(n.strong,{children:"Sysdig"}),", or ",(0,t.jsx)(n.strong,{children:"AppArmor"})," for ",(0,t.jsx)(n.strong,{children:"suspicious behavior"}),"."]}),"\n"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"3-cluster-security",children:"3. Cluster Security"}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.strong,{children:"Kubernetes cluster"})," forms the ",(0,t.jsx)(n.strong,{children:"third layer"})," of the security model, focusing on the ",(0,t.jsx)(n.strong,{children:"control plane"})," and ",(0,t.jsx)(n.strong,{children:"worker nodes"}),"."]}),"\n",(0,t.jsx)(n.h3,{id:"best-practices-2",children:"Best Practices"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"RBAC (Role-Based Access Control)"}),": Apply ",(0,t.jsx)(n.strong,{children:"least privilege"})," principles to ",(0,t.jsx)(n.strong,{children:"service accounts"}),", ",(0,t.jsx)(n.strong,{children:"users"}),", and ",(0,t.jsx)(n.strong,{children:"applications"}),"."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Network Policies"}),": Use ",(0,t.jsx)(n.strong,{children:"Calico"}),", ",(0,t.jsx)(n.strong,{children:"Cilium"}),", or ",(0,t.jsx)(n.strong,{children:"Kubernetes NetworkPolicies"})," to ",(0,t.jsx)(n.strong,{children:"control traffic flow"}),"."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Pod Security Policies"}),": Set restrictions on ",(0,t.jsx)(n.strong,{children:"pod capabilities"})," and ",(0,t.jsx)(n.strong,{children:"privileged containers"}),"."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Audit Logs"}),": Enable ",(0,t.jsx)(n.strong,{children:"audit logging"})," on the ",(0,t.jsx)(n.strong,{children:"API server"})," to monitor ",(0,t.jsx)(n.strong,{children:"suspicious activities"}),"."]}),"\n"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"4-cloud-security",children:"4. Cloud Security"}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.strong,{children:"cloud"})," layer involves securing the ",(0,t.jsx)(n.strong,{children:"underlying infrastructure"}),", including ",(0,t.jsx)(n.strong,{children:"networking"}),", ",(0,t.jsx)(n.strong,{children:"identity and access management (IAM)"}),", and ",(0,t.jsx)(n.strong,{children:"storage"}),"."]}),"\n",(0,t.jsx)(n.h3,{id:"best-practices-3",children:"Best Practices"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"IAM Policies"}),": Follow the ",(0,t.jsx)(n.strong,{children:"principle of least privilege"})," for ",(0,t.jsx)(n.strong,{children:"cloud resources"}),"."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Network Security"}),": Implement ",(0,t.jsx)(n.strong,{children:"firewalls"}),", ",(0,t.jsx)(n.strong,{children:"VPCs"}),", and ",(0,t.jsx)(n.strong,{children:"private networking"})," to ",(0,t.jsx)(n.strong,{children:"isolate resources"}),"."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Data Encryption"}),": Enable ",(0,t.jsx)(n.strong,{children:"encryption at rest"})," and ",(0,t.jsx)(n.strong,{children:"in transit"})," using ",(0,t.jsx)(n.strong,{children:"cloud-native tools"}),"."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Monitoring and Incident Response"}),": Use ",(0,t.jsx)(n.strong,{children:"cloud monitoring services"})," like ",(0,t.jsx)(n.strong,{children:"AWS CloudWatch"}),", ",(0,t.jsx)(n.strong,{children:"Azure Monitor"}),", or ",(0,t.jsx)(n.strong,{children:"Google Cloud Operations"}),"."]}),"\n"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"building-a-defense-in-depth-strategy",children:"Building a Defense-in-Depth Strategy"}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.strong,{children:"Four C's"})," provide a ",(0,t.jsx)(n.strong,{children:"layered approach"})," to security. Each ",(0,t.jsx)(n.strong,{children:"layer builds on the others"}),", ensuring that a ",(0,t.jsx)(n.strong,{children:"compromise in one layer"})," does not lead to a ",(0,t.jsx)(n.strong,{children:"complete system breach"}),":"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["If ",(0,t.jsx)(n.strong,{children:"code"})," is vulnerable but ",(0,t.jsx)(n.strong,{children:"container security"})," is strong, an attacker may not exploit it."]}),"\n",(0,t.jsxs)(n.li,{children:["If a ",(0,t.jsx)(n.strong,{children:"container is compromised"}),", ",(0,t.jsx)(n.strong,{children:"network policies"})," and ",(0,t.jsx)(n.strong,{children:"RBAC"})," might limit its ",(0,t.jsx)(n.strong,{children:"impact"}),"."]}),"\n",(0,t.jsxs)(n.li,{children:["If the ",(0,t.jsx)(n.strong,{children:"cluster is attacked"}),", ",(0,t.jsx)(n.strong,{children:"cloud IAM policies"})," could prevent ",(0,t.jsx)(n.strong,{children:"escalation"}),"."]}),"\n"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,t.jsxs)(n.p,{children:["By addressing each of the ",(0,t.jsx)(n.strong,{children:"Four C's of Cloud Native Security"}),", you can create a ",(0,t.jsx)(n.strong,{children:"robust security posture"})," for your ",(0,t.jsx)(n.strong,{children:"Kubernetes environments"}),". Combining ",(0,t.jsx)(n.strong,{children:"security best practices"})," across ",(0,t.jsx)(n.strong,{children:"Code"}),", ",(0,t.jsx)(n.strong,{children:"Container"}),", ",(0,t.jsx)(n.strong,{children:"Cluster"}),", and ",(0,t.jsx)(n.strong,{children:"Cloud"})," layers helps mitigate ",(0,t.jsx)(n.strong,{children:"risks"})," and ",(0,t.jsx)(n.strong,{children:"protect"})," your ",(0,t.jsx)(n.strong,{children:"applications"})," and ",(0,t.jsx)(n.strong,{children:"data"}),"."]})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(a,{...e})}):a(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>c,x:()=>o});var r=s(6540);const t={},i=r.createContext(t);function c(e){const n=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:c(e.components),r.createElement(i.Provider,{value:n},e.children)}}}]);