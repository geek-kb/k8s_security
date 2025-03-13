"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[5883],{362:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>h,frontMatter:()=>c,metadata:()=>r,toc:()=>a});const r=JSON.parse('{"id":"best_practices/cluster_setup_and_hardening/network_security/network_policies","title":"Network Policies","description":"Explore how Network Policies in Kubernetes control traffic flow and enhance security.","source":"@site/docs/best_practices/cluster_setup_and_hardening/network_security/network_policies.md","sourceDirName":"best_practices/cluster_setup_and_hardening/network_security","slug":"/best_practices/cluster_setup_and_hardening/network_security/network_policies","permalink":"/k8s_security/docs/best_practices/cluster_setup_and_hardening/network_security/network_policies","draft":false,"unlisted":false,"editUrl":"https://github.com/geek-kb/k8s_security/edit/main/docs/best_practices/cluster_setup_and_hardening/network_security/network_policies.md","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"sidebar_position":2,"title":"Network Policies","description":"Explore how Network Policies in Kubernetes control traffic flow and enhance security."},"sidebar":"guidesSidebar","previous":{"title":"DDoS Mitigation in Kubernetes","permalink":"/k8s_security/docs/best_practices/cluster_setup_and_hardening/network_security/ddos_mitigation"},"next":{"title":"Ingress Security","permalink":"/k8s_security/docs/best_practices/cluster_setup_and_hardening/network_security/ingress_security"}}');var t=s(4848),i=s(8453);const c={sidebar_position:2,title:"Network Policies",description:"Explore how Network Policies in Kubernetes control traffic flow and enhance security."},o="Network Policies",l={},a=[{value:"How Network Policies Work",id:"how-network-policies-work",level:2},{value:"1. Enforce Default Deny-All Policies",id:"1-enforce-default-deny-all-policies",level:2},{value:"Secure Default Deny Policy",id:"secure-default-deny-policy",level:3},{value:"Why It Matters",id:"why-it-matters",level:3},{value:"2. Restrict Ingress Traffic to Specific Pods",id:"2-restrict-ingress-traffic-to-specific-pods",level:2},{value:"Secure Ingress Policy Example",id:"secure-ingress-policy-example",level:3},{value:"Why It Matters",id:"why-it-matters-1",level:3},{value:"3. Restrict Egress Traffic to External Endpoints",id:"3-restrict-egress-traffic-to-external-endpoints",level:2},{value:"Secure Egress Policy Example",id:"secure-egress-policy-example",level:3},{value:"Why It Matters",id:"why-it-matters-2",level:3},{value:"4. Protect the Kubernetes API Server",id:"4-protect-the-kubernetes-api-server",level:2},{value:"Secure API Server Access Policy",id:"secure-api-server-access-policy",level:3},{value:"Why It Matters",id:"why-it-matters-3",level:3},{value:"5. Enforce Namespace Isolation",id:"5-enforce-namespace-isolation",level:2},{value:"Secure Namespace Isolation Policy",id:"secure-namespace-isolation-policy",level:3},{value:"Why It Matters",id:"why-it-matters-4",level:3},{value:"Conclusion",id:"conclusion",level:2}];function d(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"network-policies",children:"Network Policies"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Required knowledge for the CKS certification."})}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Network Policies"})," in ",(0,t.jsx)(n.strong,{children:"Kubernetes"})," are a fundamental security mechanism used to ",(0,t.jsx)(n.strong,{children:"control traffic flow"})," between ",(0,t.jsx)(n.strong,{children:"pods"})," and ",(0,t.jsx)(n.strong,{children:"external services"}),". They provide ",(0,t.jsx)(n.strong,{children:"network segmentation"})," and help enforce security policies within the ",(0,t.jsx)(n.strong,{children:"cluster"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"how-network-policies-work",children:"How Network Policies Work"}),"\n",(0,t.jsxs)(n.p,{children:["Network Policies use ",(0,t.jsx)(n.strong,{children:"selectors"})," and ",(0,t.jsx)(n.strong,{children:"rules"})," to define allowed traffic:"]}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Pod Selector:"})," Specifies the ",(0,t.jsx)(n.strong,{children:"pods"})," the policy applies to."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Ingress Rules:"})," Define allowed ",(0,t.jsx)(n.strong,{children:"incoming traffic"})," to selected pods."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Egress Rules:"})," Define allowed ",(0,t.jsx)(n.strong,{children:"outgoing traffic"})," from selected pods."]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["By default, Kubernetes allows ",(0,t.jsx)(n.strong,{children:"all traffic"})," between pods unless a ",(0,t.jsx)(n.strong,{children:"Network Policy"})," is defined to restrict it."]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"1-enforce-default-deny-all-policies",children:"1. Enforce Default Deny-All Policies"}),"\n",(0,t.jsxs)(n.p,{children:["To prevent unrestricted communication between pods, enforce a ",(0,t.jsx)(n.strong,{children:"deny-all"})," policy by default."]}),"\n",(0,t.jsx)(n.h3,{id:"secure-default-deny-policy",children:"Secure Default Deny Policy"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"apiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: default-deny\n  namespace: default\nspec:\n  podSelector: {}\n  policyTypes:\n    - Ingress\n    - Egress\n"})}),"\n",(0,t.jsx)(n.h3,{id:"why-it-matters",children:"Why It Matters"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Blocks"})," all traffic by default, enforcing a least-privilege model.",(0,t.jsx)("br",{})]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Requires"})," explicit allow rules for necessary communication."]}),"\n"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"2-restrict-ingress-traffic-to-specific-pods",children:"2. Restrict Ingress Traffic to Specific Pods"}),"\n",(0,t.jsx)(n.p,{children:"Allow ingress traffic only from trusted sources."}),"\n",(0,t.jsx)(n.h3,{id:"secure-ingress-policy-example",children:"Secure Ingress Policy Example"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"apiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: allow-frontend-to-backend\n  namespace: default\nspec:\n  podSelector:\n    matchLabels:\n      app: backend\n  policyTypes:\n    - Ingress\n  ingress:\n    - from:\n        - podSelector:\n            matchLabels:\n              app: frontend\n      ports:\n        - protocol: TCP\n          port: 80\n"})}),"\n",(0,t.jsx)(n.h3,{id:"why-it-matters-1",children:"Why It Matters"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Prevents"})," unauthorized pods from accessing sensitive services.",(0,t.jsx)("br",{})]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Allows"})," only traffic from the specified frontend application."]}),"\n"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"3-restrict-egress-traffic-to-external-endpoints",children:"3. Restrict Egress Traffic to External Endpoints"}),"\n",(0,t.jsx)(n.p,{children:"Limit pod communication with external networks to reduce attack exposure."}),"\n",(0,t.jsx)(n.h3,{id:"secure-egress-policy-example",children:"Secure Egress Policy Example"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"apiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: restrict-egress\n  namespace: default\nspec:\n  podSelector:\n    matchLabels:\n      app: backend\n  policyTypes:\n    - Egress\n  egress:\n    - to:\n        - ipBlock:\n            cidr: 192.168.1.0/24\n      ports:\n        - protocol: TCP\n          port: 443\n"})}),"\n",(0,t.jsx)(n.h3,{id:"why-it-matters-2",children:"Why It Matters"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Prevents"})," unauthorized outbound connections to untrusted networks.",(0,t.jsx)("br",{})]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Reduces"})," the risk of data exfiltration."]}),"\n"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"4-protect-the-kubernetes-api-server",children:"4. Protect the Kubernetes API Server"}),"\n",(0,t.jsx)(n.p,{children:"Restrict access to the Kubernetes API server to prevent unauthorized requests."}),"\n",(0,t.jsx)(n.h3,{id:"secure-api-server-access-policy",children:"Secure API Server Access Policy"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"apiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: restrict-api-access\n  namespace: kube-system\nspec:\n  podSelector:\n    matchLabels:\n      component: kube-apiserver\n  policyTypes:\n    - Ingress\n  ingress:\n    - from:\n        - ipBlock:\n            cidr: 10.0.0.0/16\n"})}),"\n",(0,t.jsx)(n.h3,{id:"why-it-matters-3",children:"Why It Matters"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Limits"})," API access to trusted networks.",(0,t.jsx)("br",{})]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Prevents"})," external reconnaissance and brute-force attacks."]}),"\n"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"5-enforce-namespace-isolation",children:"5. Enforce Namespace Isolation"}),"\n",(0,t.jsx)(n.p,{children:"Prevent pods in one namespace from communicating with pods in another namespace."}),"\n",(0,t.jsx)(n.h3,{id:"secure-namespace-isolation-policy",children:"Secure Namespace Isolation Policy"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"apiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: namespace-isolation\n  namespace: default\nspec:\n  podSelector: {}\n  policyTypes:\n    - Ingress\n  ingress: []\n"})}),"\n",(0,t.jsx)(n.h3,{id:"why-it-matters-4",children:"Why It Matters"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Prevents"})," cross-namespace attacks and lateral movement.",(0,t.jsx)("br",{})]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Ensures"})," workload segregation for multi-tenant clusters."]}),"\n"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Network Policies"})," provide critical security controls for ",(0,t.jsx)(n.strong,{children:"traffic segmentation, access control, and workload isolation"})," in Kubernetes. By ",(0,t.jsx)(n.strong,{children:"defaulting to deny-all, restricting ingress and egress, securing the API server, and enforcing namespace isolation"}),", administrators can prevent unauthorized access and ",(0,t.jsx)(n.strong,{children:"minimize the attack surface"}),"."]})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>c,x:()=>o});var r=s(6540);const t={},i=r.createContext(t);function c(e){const n=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:c(e.components),r.createElement(i.Provider,{value:n},e.children)}}}]);