"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[4006],{1596:(e,s,r)=>{r.r(s),r.d(s,{assets:()=>a,contentTitle:()=>d,default:()=>u,frontMatter:()=>c,metadata:()=>n,toc:()=>o});const n=JSON.parse('{"id":"best_practices/cluster_setup_and_hardening/pod_security/pod_security_standards","title":"Pod Security Standards (PSS)","description":"Learn how Kubernetes Pod Security Standards (PSS) enforce security controls for workloads and replace the deprecated Pod Security Policies (PSP).","source":"@site/docs/best_practices/cluster_setup_and_hardening/pod_security/pod_security_standards.md","sourceDirName":"best_practices/cluster_setup_and_hardening/pod_security","slug":"/best_practices/cluster_setup_and_hardening/pod_security/pod_security_standards","permalink":"/k8s_security/docs/best_practices/cluster_setup_and_hardening/pod_security/pod_security_standards","draft":false,"unlisted":false,"editUrl":"https://github.com/geek-kb/k8s_security/edit/main/docs/best_practices/cluster_setup_and_hardening/pod_security/pod_security_standards.md","tags":[],"version":"current","sidebarPosition":7,"frontMatter":{"title":"Pod Security Standards (PSS)","sidebar_position":7,"description":"Learn how Kubernetes Pod Security Standards (PSS) enforce security controls for workloads and replace the deprecated Pod Security Policies (PSP)."},"sidebar":"guidesSidebar","previous":{"title":"Kube-Bench: Kubernetes CIS Benchmarking Tool","permalink":"/k8s_security/docs/best_practices/cluster_setup_and_hardening/cis_benchmark_kube_bench"},"next":{"title":"Kubelet Security","permalink":"/k8s_security/docs/best_practices/cluster_setup_and_hardening/kubelet_security"}}');var t=r(4848),i=r(8453);const c={title:"Pod Security Standards (PSS)",sidebar_position:7,description:"Learn how Kubernetes Pod Security Standards (PSS) enforce security controls for workloads and replace the deprecated Pod Security Policies (PSP)."},d="Pod Security Standards (PSS) in Kubernetes",a={},o=[{value:"Pod Security Standards Levels",id:"pod-security-standards-levels",level:2},{value:"1. Privileged",id:"1-privileged",level:3},{value:"2. Baseline",id:"2-baseline",level:3},{value:"3. Restricted",id:"3-restricted",level:3},{value:"Enforcing Pod Security Standards",id:"enforcing-pod-security-standards",level:2},{value:"Example: Apply a Restricted Policy to a Namespace",id:"example-apply-a-restricted-policy-to-a-namespace",level:3},{value:"Best Practices for Pod Security Standards",id:"best-practices-for-pod-security-standards",level:2},{value:"Key Takeaways",id:"key-takeaways",level:2}];function l(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s.header,{children:(0,t.jsx)(s.h1,{id:"pod-security-standards-pss-in-kubernetes",children:"Pod Security Standards (PSS) in Kubernetes"})}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.strong,{children:"Required knowledge for the CKS certification."})}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.strong,{children:"Pod Security Standards (PSS)"})," define ",(0,t.jsx)(s.strong,{children:"security guidelines"})," for ",(0,t.jsx)(s.strong,{children:"Kubernetes pods"})," based on their ",(0,t.jsx)(s.strong,{children:"security context"}),". PSS replaces the ",(0,t.jsx)(s.strong,{children:"deprecated Pod Security Policies (PSP)"})," and categorizes security into three levels: ",(0,t.jsx)(s.strong,{children:"Privileged, Baseline, and Restricted"}),"."]}),"\n",(0,t.jsxs)(s.p,{children:["For an overview of security best practices, refer to ",(0,t.jsx)(s.a,{href:"/docs/best_practices/cluster_setup_and_hardening/intro",children:"Cluster Setup and Hardening"}),"."]}),"\n",(0,t.jsx)(s.hr,{}),"\n",(0,t.jsx)(s.h2,{id:"pod-security-standards-levels",children:"Pod Security Standards Levels"}),"\n",(0,t.jsx)(s.h3,{id:"1-privileged",children:"1. Privileged"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Full administrative access"})," to the host."]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"No security restrictions"})," on pod execution."]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Use case:"})," Only for ",(0,t.jsx)(s.strong,{children:"trusted workloads"})," requiring deep ",(0,t.jsx)(s.strong,{children:"host access"}),"."]}),"\n"]}),"\n",(0,t.jsx)(s.h3,{id:"2-baseline",children:"2. Baseline"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["Implements ",(0,t.jsx)(s.strong,{children:"basic security best practices"}),"."]}),"\n",(0,t.jsxs)(s.li,{children:["Prevents ",(0,t.jsx)(s.strong,{children:"escalation of privileges"})," but allows ",(0,t.jsx)(s.strong,{children:"some host access"}),"."]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Use case:"})," Suitable for ",(0,t.jsx)(s.strong,{children:"development environments"})," and general workloads."]}),"\n"]}),"\n",(0,t.jsx)(s.h3,{id:"3-restricted",children:"3. Restricted"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["Enforces ",(0,t.jsx)(s.strong,{children:"strict security controls"})," and ",(0,t.jsx)(s.strong,{children:"prevents privileged actions"}),"."]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Disallows host namespaces, privileged containers, and hostPath volumes"}),"."]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Use case:"})," Recommended for ",(0,t.jsx)(s.strong,{children:"production"})," and ",(0,t.jsx)(s.strong,{children:"high-security environments"}),"."]}),"\n"]}),"\n",(0,t.jsxs)(s.p,{children:["For more details on restricting workloads, see ",(0,t.jsx)(s.a,{href:"/docs/best_practices/cluster_setup_and_hardening/pod_security/pod_security_standards",children:"Pod Security Standards Enforcement"}),"."]}),"\n",(0,t.jsx)(s.hr,{}),"\n",(0,t.jsx)(s.h2,{id:"enforcing-pod-security-standards",children:"Enforcing Pod Security Standards"}),"\n",(0,t.jsxs)(s.p,{children:["Pod Security Standards are enforced at the ",(0,t.jsx)(s.strong,{children:"namespace level"})," using Kubernetes labels."]}),"\n",(0,t.jsx)(s.h3,{id:"example-apply-a-restricted-policy-to-a-namespace",children:"Example: Apply a Restricted Policy to a Namespace"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-yaml",children:'apiVersion: v1\nkind: Namespace\nmetadata:\n  name: restricted-namespace\n  labels:\n    pod-security.kubernetes.io/enforce: "restricted"\n    pod-security.kubernetes.io/enforce-version: "v1.25"\n'})}),"\n",(0,t.jsxs)(s.p,{children:["For more details on enforcing security at the namespace level, see ",(0,t.jsx)(s.a,{href:"/docs/fundamentals/k8s_security_primitives/authorization/rbac",children:"Kubernetes Namespace Security"}),"."]}),"\n",(0,t.jsx)(s.hr,{}),"\n",(0,t.jsx)(s.h2,{id:"best-practices-for-pod-security-standards",children:"Best Practices for Pod Security Standards"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:'Use "restricted" policies'})," in ",(0,t.jsx)(s.strong,{children:"production namespaces"})," to enforce strong security."]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:'Apply "baseline" policies'})," for ",(0,t.jsx)(s.strong,{children:"development and testing"})," environments."]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:'Avoid the "privileged" level'})," unless absolutely necessary."]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Combine PSS with Role-Based Access Control (RBAC)"})," for ",(0,t.jsx)(s.strong,{children:"granular access control"}),"."]}),"\n"]}),"\n",(0,t.jsxs)(s.p,{children:["For securing authentication and authorization in Kubernetes, refer to ",(0,t.jsx)(s.a,{href:"/docs/fundamentals/k8s_security_primitives/authorization/rbac",children:"Role-Based Access Control (RBAC)"}),"."]}),"\n",(0,t.jsx)(s.hr,{}),"\n",(0,t.jsx)(s.h2,{id:"key-takeaways",children:"Key Takeaways"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Pod Security Standards (PSS)"})," enforce security at the ",(0,t.jsx)(s.strong,{children:"namespace level"}),"."]}),"\n",(0,t.jsxs)(s.li,{children:["The ",(0,t.jsx)(s.strong,{children:"restricted"})," level offers ",(0,t.jsx)(s.strong,{children:"maximum protection"})," against ",(0,t.jsx)(s.strong,{children:"privilege escalation"}),"."]}),"\n",(0,t.jsxs)(s.li,{children:["Kubernetes ",(0,t.jsx)(s.strong,{children:"deprecated Pod Security Policies (PSP)"})," in favor of ",(0,t.jsx)(s.strong,{children:"PSS enforcement"}),"."]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Applying the right PSS level"})," helps prevent ",(0,t.jsx)(s.strong,{children:"security misconfigurations"})," and ",(0,t.jsx)(s.strong,{children:"workload vulnerabilities"}),"."]}),"\n"]}),"\n",(0,t.jsxs)(s.p,{children:["For more on securing workloads in Kubernetes, refer to ",(0,t.jsx)(s.a,{href:"/docs/best_practices/cluster_setup_and_hardening/pod_security/pod_security_standards",children:"Pod Security Standards"}),"."]})]})}function u(e={}){const{wrapper:s}={...(0,i.R)(),...e.components};return s?(0,t.jsx)(s,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}},8453:(e,s,r)=>{r.d(s,{R:()=>c,x:()=>d});var n=r(6540);const t={},i=n.createContext(t);function c(e){const s=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function d(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:c(e.components),n.createElement(i.Provider,{value:s},e.children)}}}]);