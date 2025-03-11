"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[26],{7375:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>d,contentTitle:()=>i,default:()=>u,frontMatter:()=>c,metadata:()=>t,toc:()=>o});const t=JSON.parse('{"id":"best_practices/cluster_setup_and_hardening/secrets_management","title":"Secrets Management","description":"Securely manage sensitive data in Kubernetes using Secrets and best practices for data encryption.","source":"@site/docs/best_practices/cluster_setup_and_hardening/secrets_management.md","sourceDirName":"best_practices/cluster_setup_and_hardening","slug":"/best_practices/cluster_setup_and_hardening/secrets_management","permalink":"/k8s_security/docs/best_practices/cluster_setup_and_hardening/secrets_management","draft":false,"unlisted":false,"editUrl":"https://github.com/geek-kb/k8s_security/edit/main/docs/best_practices/cluster_setup_and_hardening/secrets_management.md","tags":[],"version":"current","sidebarPosition":7,"frontMatter":{"sidebar_position":7,"title":"Secrets Management","description":"Securely manage sensitive data in Kubernetes using Secrets and best practices for data encryption."},"sidebar":"guidesSidebar","previous":{"title":"Pod Security Standards (PSS)","permalink":"/k8s_security/docs/best_practices/cluster_setup_and_hardening/pod_security/pod_security_standards"},"next":{"title":"Cluster Setup and Hardening","permalink":"/k8s_security/docs/best_practices/cluster_setup_and_hardening/intro"}}');var r=s(4848),a=s(8453);const c={sidebar_position:7,title:"Secrets Management",description:"Securely manage sensitive data in Kubernetes using Secrets and best practices for data encryption."},i="Secrets Management",d={},o=[{value:"\ud83d\udea9 How Kubernetes Secrets Work",id:"-how-kubernetes-secrets-work",level:2},{value:"\ud83d\udee0\ufe0f Example: Create and Use a Secret",id:"\ufe0f-example-create-and-use-a-secret",level:2},{value:"1. Create a Secret",id:"1-create-a-secret",level:3},{value:"2. Use the Secret in a Pod",id:"2-use-the-secret-in-a-pod",level:3},{value:"\u2705 Key Takeaway",id:"-key-takeaway",level:2}];function l(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"secrets-management",children:"Secrets Management"})}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Kubernetes Secrets"})," enable ",(0,r.jsx)(n.strong,{children:"secure storage"})," of ",(0,r.jsx)(n.strong,{children:"sensitive information"}),", such as ",(0,r.jsx)(n.strong,{children:"passwords"}),", ",(0,r.jsx)(n.strong,{children:"API keys"}),", and ",(0,r.jsx)(n.strong,{children:"certificates"}),". They help ",(0,r.jsx)(n.strong,{children:"avoid hardcoding"})," sensitive data in ",(0,r.jsx)(n.strong,{children:"application code"})," or ",(0,r.jsx)(n.strong,{children:"configurations"}),"."]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"-how-kubernetes-secrets-work",children:"\ud83d\udea9 How Kubernetes Secrets Work"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Secrets are stored as Kubernetes objects"}),"."]}),"\n",(0,r.jsxs)(n.li,{children:["Data is ",(0,r.jsx)(n.strong,{children:"Base64-encoded"}),", not ",(0,r.jsx)(n.strong,{children:"encrypted by default"}),"."]}),"\n",(0,r.jsxs)(n.li,{children:["Can be ",(0,r.jsx)(n.strong,{children:"mounted as files"})," or ",(0,r.jsx)(n.strong,{children:"injected as environment variables"}),"."]}),"\n"]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"\ufe0f-example-create-and-use-a-secret",children:"\ud83d\udee0\ufe0f Example: Create and Use a Secret"}),"\n",(0,r.jsx)(n.h3,{id:"1-create-a-secret",children:"1. Create a Secret"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"kubectl create secret generic db-secret --from-literal=username=admin --from-literal=password=supersecret\n"})}),"\n",(0,r.jsx)(n.h3,{id:"2-use-the-secret-in-a-pod",children:"2. Use the Secret in a Pod"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",children:"apiVersion: v1\nkind: Pod\nmetadata:\n  name: secret-pod\nspec:\n  containers:\n  - name: app-container\n    image: nginx\n    env:\n    - name: DB_USERNAME\n      valueFrom:\n        secretKeyRef:\n          name: db-secret\n          key: username\n"})}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"-key-takeaway",children:"\u2705 Key Takeaway"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Secure Secrets"})," by enabling ",(0,r.jsx)(n.strong,{children:"encryption at rest"}),", using ",(0,r.jsx)(n.strong,{children:"RBAC to control access"}),", and ",(0,r.jsx)(n.strong,{children:"integrating external secret management tools"}),"."]})]})}function u(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>c,x:()=>i});var t=s(6540);const r={},a=t.createContext(r);function c(e){const n=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:c(e.components),t.createElement(a.Provider,{value:n},e.children)}}}]);