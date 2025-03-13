"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[7806],{8453:(e,n,s)=>{s.d(n,{R:()=>r,x:()=>o});var c=s(6540);const i={},t=c.createContext(i);function r(e){const n=c.useContext(t);return c.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),c.createElement(t.Provider,{value:n},e.children)}},9237:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>a,contentTitle:()=>o,default:()=>l,frontMatter:()=>r,metadata:()=>c,toc:()=>d});const c=JSON.parse('{"id":"fundamentals/authentication/service_accounts","title":"Service Accounts","description":"Learn how Kubernetes Service Accounts provide authentication for pods and how to securely configure them using RBAC.","source":"@site/docs/fundamentals/authentication/service_accounts.md","sourceDirName":"fundamentals/authentication","slug":"/fundamentals/authentication/service_accounts","permalink":"/k8s_security/docs/fundamentals/authentication/service_accounts","draft":false,"unlisted":false,"editUrl":"https://github.com/geek-kb/k8s_security/edit/main/docs/fundamentals/authentication/service_accounts.md","tags":[],"version":"current","sidebarPosition":4,"frontMatter":{"title":"Service Accounts","sidebar_position":4,"description":"Learn how Kubernetes Service Accounts provide authentication for pods and how to securely configure them using RBAC."},"sidebar":"guidesSidebar","previous":{"title":"Authentication Methods","permalink":"/k8s_security/docs/fundamentals/authentication/authentication_methods"},"next":{"title":"Certificates","permalink":"/k8s_security/docs/fundamentals/authentication/certificates"}}');var i=s(4848),t=s(8453);const r={title:"Service Accounts",sidebar_position:4,description:"Learn how Kubernetes Service Accounts provide authentication for pods and how to securely configure them using RBAC."},o="Service Accounts in Kubernetes",a={},d=[{value:"What is a Service Account?",id:"what-is-a-service-account",level:2},{value:"Types of Service Accounts",id:"types-of-service-accounts",level:2},{value:"1. Default Service Account",id:"1-default-service-account",level:3},{value:"2. Custom Service Accounts",id:"2-custom-service-accounts",level:3},{value:"Creating a Custom Service Account",id:"creating-a-custom-service-account",level:4},{value:"Using a Service Account in a Pod",id:"using-a-service-account-in-a-pod",level:2},{value:"Securing Service Accounts with RBAC",id:"securing-service-accounts-with-rbac",level:2},{value:"1. Restrict Service Account Permissions",id:"1-restrict-service-account-permissions",level:3},{value:"2. Bind the Service Account to the Role",id:"2-bind-the-service-account-to-the-role",level:3},{value:"Best Practices for Service Account Security",id:"best-practices-for-service-account-security",level:2},{value:"Key Takeaways",id:"key-takeaways",level:2}];function u(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"service-accounts-in-kubernetes",children:"Service Accounts in Kubernetes"})}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Required knowledge for the CKS certification."})}),"\n",(0,i.jsxs)(n.p,{children:["Kubernetes ",(0,i.jsx)(n.strong,{children:"Service Accounts"})," allow ",(0,i.jsx)(n.strong,{children:"pods"})," to authenticate with the ",(0,i.jsx)(n.strong,{children:"API server"}),". Unlike ",(0,i.jsx)(n.strong,{children:"user accounts"}),", which are meant for ",(0,i.jsx)(n.strong,{children:"human users"}),", service accounts are designed for ",(0,i.jsx)(n.strong,{children:"workloads running inside Kubernetes"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["For more details on Kubernetes authentication mechanisms, refer to ",(0,i.jsx)(n.a,{href:"/docs/fundamentals/authentication/authentication_methods",children:"Authentication in Kubernetes"}),"."]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"what-is-a-service-account",children:"What is a Service Account?"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["A ",(0,i.jsx)(n.strong,{children:"Service Account"})," is a ",(0,i.jsx)(n.strong,{children:"Kubernetes resource"})," that allows a ",(0,i.jsx)(n.strong,{children:"pod"})," to authenticate with the ",(0,i.jsx)(n.strong,{children:"Kubernetes API server"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["By default, every pod is ",(0,i.jsx)(n.strong,{children:"automatically assigned a service account"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Service accounts can be used with ",(0,i.jsx)(n.strong,{children:"Role-Based Access Control (RBAC)"})," to define what actions they can perform."]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["For an overview of Kubernetes security principles, see ",(0,i.jsx)(n.a,{href:"/docs/fundamentals/fundamentals_intro",children:"Kubernetes Security Fundamentals"}),"."]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"types-of-service-accounts",children:"Types of Service Accounts"}),"\n",(0,i.jsx)(n.h3,{id:"1-default-service-account",children:"1. Default Service Account"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Every ",(0,i.jsx)(n.strong,{children:"namespace"})," has a ",(0,i.jsx)(n.strong,{children:"default service account"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["If no service account is specified, pods automatically use the ",(0,i.jsx)(n.strong,{children:"default"})," service account."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Security risk:"})," Using the default service account can expose workloads to ",(0,i.jsx)(n.strong,{children:"unintended API permissions"}),"."]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"2-custom-service-accounts",children:"2. Custom Service Accounts"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Recommended for ",(0,i.jsx)(n.strong,{children:"production workloads"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Allows assigning ",(0,i.jsx)(n.strong,{children:"specific RBAC permissions"})," to different applications."]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"creating-a-custom-service-account",children:"Creating a Custom Service Account"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"apiVersion: v1\nkind: ServiceAccount\nmetadata:\n  name: custom-sa\n  namespace: default\n"})}),"\n",(0,i.jsx)(n.p,{children:"Apply the manifest:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"kubectl apply -f custom-sa.yaml\n"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"using-a-service-account-in-a-pod",children:"Using a Service Account in a Pod"}),"\n",(0,i.jsxs)(n.p,{children:["To use a specific ",(0,i.jsx)(n.strong,{children:"service account"}),", reference it in the pod definition:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"apiVersion: v1\nkind: Pod\nmetadata:\n  name: app-pod\nspec:\n  serviceAccountName: custom-sa\n  containers:\n    - name: app-container\n      image: nginx\n"})}),"\n",(0,i.jsxs)(n.p,{children:["For securing pod authentication, see ",(0,i.jsx)(n.a,{href:"/docs/fundamentals/authentication/certificates",children:"Certificates in Kubernetes"}),"."]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"securing-service-accounts-with-rbac",children:"Securing Service Accounts with RBAC"}),"\n",(0,i.jsxs)(n.p,{children:["By default, a service account has ",(0,i.jsx)(n.strong,{children:"minimal permissions"}),", but ",(0,i.jsx)(n.strong,{children:"improper RBAC configuration"})," can expose it to security risks."]}),"\n",(0,i.jsx)(n.h3,{id:"1-restrict-service-account-permissions",children:"1. Restrict Service Account Permissions"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:'apiVersion: rbac.authorization.k8s.io/v1\nkind: Role\nmetadata:\n  name: pod-reader\nrules:\n  - apiGroups: [""]\n    resources: ["pods"]\n    verbs: ["get", "list", "watch"]\n'})}),"\n",(0,i.jsx)(n.h3,{id:"2-bind-the-service-account-to-the-role",children:"2. Bind the Service Account to the Role"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"apiVersion: rbac.authorization.k8s.io/v1\nkind: RoleBinding\nmetadata:\n  name: read-pods\nsubjects:\n  - kind: ServiceAccount\n    name: custom-sa\nroleRef:\n  kind: Role\n  name: pod-reader\n  apiGroup: rbac.authorization.k8s.io\n"})}),"\n",(0,i.jsxs)(n.p,{children:["For more details on implementing fine-grained access controls, see ",(0,i.jsx)(n.a,{href:"/docs/fundamentals/authorization/rbac",children:"Role-Based Access Control (RBAC)"}),"."]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"best-practices-for-service-account-security",children:"Best Practices for Service Account Security"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Create dedicated service accounts"})," for different applications."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Restrict permissions"})," using ",(0,i.jsx)(n.strong,{children:"RBAC roles and role bindings"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Avoid using the default service account"})," in production workloads."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Rotate service account tokens"})," to prevent unauthorized access."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Use Kubernetes secrets or external secret managers"})," for authentication credentials."]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["For securing API access and authentication mechanisms, see ",(0,i.jsx)(n.a,{href:"/docs/fundamentals/authentication/authentication_methods",children:"Kubernetes API Security"}),"."]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"key-takeaways",children:"Key Takeaways"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Service Accounts"})," allow ",(0,i.jsx)(n.strong,{children:"pods"})," to interact with ",(0,i.jsx)(n.strong,{children:"Kubernetes API resources"})," securely."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Custom service accounts"})," provide ",(0,i.jsx)(n.strong,{children:"better access control"})," than the default service account."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"RBAC should always be used"})," to limit ",(0,i.jsx)(n.strong,{children:"service account permissions"})," to the least privilege."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Rotating tokens and auditing permissions"})," helps strengthen ",(0,i.jsx)(n.strong,{children:"service account security"}),"."]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["For a deeper understanding of securing workloads in Kubernetes, refer to ",(0,i.jsx)(n.a,{href:"/docs/best_practices/cluster_setup_and_hardening/pod_security/pod_security_standards",children:"Pod Security Standards"}),"."]})]})}function l(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(u,{...e})}):u(e)}}}]);