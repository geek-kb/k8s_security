"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[7947],{152:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>h,frontMatter:()=>o,metadata:()=>r,toc:()=>l});const r=JSON.parse('{"id":"cluster_setup_and_hardening/k8s_security_primitives/authorization/rbac","title":"Role-Based Access Control (RBAC)","description":"Learn how Role-Based Access Control (RBAC) in Kubernetes manages authorization and improves security.","source":"@site/docs/cluster_setup_and_hardening/k8s_security_primitives/authorization/rbac.md","sourceDirName":"cluster_setup_and_hardening/k8s_security_primitives/authorization","slug":"/cluster_setup_and_hardening/k8s_security_primitives/authorization/rbac","permalink":"/k8s_security/docs/cluster_setup_and_hardening/k8s_security_primitives/authorization/rbac","draft":false,"unlisted":false,"editUrl":"https://github.com/geek-kb/k8s_security/edit/main/docs/cluster_setup_and_hardening/k8s_security_primitives/authorization/rbac.md","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1,"title":"Role-Based Access Control (RBAC)","description":"Learn how Role-Based Access Control (RBAC) in Kubernetes manages authorization and improves security."},"sidebar":"tutorialSidebar","previous":{"title":"Authentication","permalink":"/k8s_security/docs/cluster_setup_and_hardening/k8s_security_primitives/authentication"},"next":{"title":"Attribute-Based Access Control (ABAC)","permalink":"/k8s_security/docs/cluster_setup_and_hardening/k8s_security_primitives/authorization/abac"}}');var i=s(4848),t=s(8453);const o={sidebar_position:1,title:"Role-Based Access Control (RBAC)",description:"Learn how Role-Based Access Control (RBAC) in Kubernetes manages authorization and improves security."},a="Role-Based Access Control (RBAC)",c={},l=[{value:"How RBAC Works",id:"how-rbac-works",level:2},{value:"Example: Create an RBAC Role and Binding",id:"example-create-an-rbac-role-and-binding",level:2},{value:"1. Define a Role",id:"1-define-a-role",level:3},{value:"2. Create a RoleBinding",id:"2-create-a-rolebinding",level:3},{value:"Key Takeaway",id:"key-takeaway",level:2},{value:"Conclusion: Enforcing Security with RBAC in Kubernetes",id:"conclusion-enforcing-security-with-rbac-in-kubernetes",level:2}];function d(e){const n={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"role-based-access-control-rbac",children:"Role-Based Access Control (RBAC)"})}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Role-Based Access Control (RBAC)"})," is a ",(0,i.jsx)(n.strong,{children:"Kubernetes security primitive"})," that manages ",(0,i.jsx)(n.strong,{children:"authorization"})," by defining ",(0,i.jsx)(n.strong,{children:"roles"})," and ",(0,i.jsx)(n.strong,{children:"permissions"})," for ",(0,i.jsx)(n.strong,{children:"users"}),", ",(0,i.jsx)(n.strong,{children:"groups"}),", and ",(0,i.jsx)(n.strong,{children:"service accounts"}),". It allows administrators to control ",(0,i.jsx)(n.strong,{children:"who can perform actions"})," on ",(0,i.jsx)(n.strong,{children:"specific resources"})," within the ",(0,i.jsx)(n.strong,{children:"cluster"}),"."]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"how-rbac-works",children:"How RBAC Works"}),"\n",(0,i.jsx)(n.p,{children:"RBAC is based on four key components:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Role:"})," Defines a set of ",(0,i.jsx)(n.strong,{children:"permissions"})," for ",(0,i.jsx)(n.strong,{children:"resources"}),".",(0,i.jsx)("br",{})]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"ClusterRole:"})," Similar to ",(0,i.jsx)(n.strong,{children:"Role"}),", but can be ",(0,i.jsx)(n.strong,{children:"applied across all namespaces"}),".",(0,i.jsx)("br",{})]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"RoleBinding:"})," Assigns a ",(0,i.jsx)(n.strong,{children:"Role"})," to ",(0,i.jsx)(n.strong,{children:"users"}),", ",(0,i.jsx)(n.strong,{children:"groups"}),", or ",(0,i.jsx)(n.strong,{children:"service accounts"})," within a ",(0,i.jsx)(n.strong,{children:"specific namespace"}),".",(0,i.jsx)("br",{})]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"ClusterRoleBinding:"})," Binds a ",(0,i.jsx)(n.strong,{children:"ClusterRole"})," to ",(0,i.jsx)(n.strong,{children:"users"}),", ",(0,i.jsx)(n.strong,{children:"groups"}),", or ",(0,i.jsx)(n.strong,{children:"service accounts"})," ",(0,i.jsx)(n.strong,{children:"cluster-wide"}),".",(0,i.jsx)("br",{})]}),"\n"]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"example-create-an-rbac-role-and-binding",children:"Example: Create an RBAC Role and Binding"}),"\n",(0,i.jsx)(n.h3,{id:"1-define-a-role",children:"1. Define a Role"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:'apiVersion: rbac.authorization.k8s.io/v1\nkind: Role\nmetadata:\n  namespace: default\n  name: pod-reader\nrules:\n- apiGroups: [""]\n  resources: ["pods"]\n  verbs: ["get", "list", "watch"]\n'})}),"\n",(0,i.jsx)(n.h3,{id:"2-create-a-rolebinding",children:"2. Create a RoleBinding"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:'apiVersion: rbac.authorization.k8s.io/v1\nkind: RoleBinding\nmetadata:\n  name: read-pods\n  namespace: default\nsubjects:\n- kind: User\n  name: "api-user"\n  apiGroup: rbac.authorization.k8s.io\nroleRef:\n  kind: Role\n  name: pod-reader\n  apiGroup: rbac.authorization.k8s.io\n'})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"key-takeaway",children:"Key Takeaway"}),"\n",(0,i.jsxs)(n.p,{children:["RBAC helps enforce the ",(0,i.jsx)(n.strong,{children:"principle of least privilege"})," by ensuring that ",(0,i.jsx)(n.strong,{children:"users"})," and ",(0,i.jsx)(n.strong,{children:"applications"})," have ",(0,i.jsx)(n.strong,{children:"only the permissions they need"}),"."]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"conclusion-enforcing-security-with-rbac-in-kubernetes",children:"Conclusion: Enforcing Security with RBAC in Kubernetes"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Role-Based Access Control (RBAC)"})," is an essential ",(0,i.jsx)(n.strong,{children:"security primitive"})," in Kubernetes, providing ",(0,i.jsx)(n.strong,{children:"fine-grained authorization"})," and enforcing the ",(0,i.jsx)(n.strong,{children:"principle of least privilege"}),". By correctly defining ",(0,i.jsx)(n.strong,{children:"roles"}),", ",(0,i.jsx)(n.strong,{children:"role bindings"}),", and ",(0,i.jsx)(n.strong,{children:"permissions"}),", you can significantly ",(0,i.jsx)(n.strong,{children:"reduce the attack surface"})," of your cluster and maintain ",(0,i.jsx)(n.strong,{children:"tight access controls"}),"."]}),"\n",(0,i.jsx)(n.blockquote,{children:"\n"})]})}function h(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>o,x:()=>a});var r=s(6540);const i={},t=r.createContext(i);function o(e){const n=r.useContext(t);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),r.createElement(t.Provider,{value:n},e.children)}}}]);