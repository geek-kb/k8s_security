"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[8958],{1586:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>c,contentTitle:()=>l,default:()=>u,frontMatter:()=>o,metadata:()=>r,toc:()=>a});const r=JSON.parse('{"id":"cluster_setup_and_hardening/k8s_security_primitives/admission_controllers","title":"Admission Controllers","description":"Learn how Admission Controllers in Kubernetes enforce policies and enhance cluster security.","source":"@site/docs/cluster_setup_and_hardening/k8s_security_primitives/admission_controllers.md","sourceDirName":"cluster_setup_and_hardening/k8s_security_primitives","slug":"/cluster_setup_and_hardening/k8s_security_primitives/admission_controllers","permalink":"/k8s_security/docs/cluster_setup_and_hardening/k8s_security_primitives/admission_controllers","draft":false,"unlisted":false,"editUrl":"https://github.com/geek-kb/k8s_security/edit/main/docs/cluster_setup_and_hardening/k8s_security_primitives/admission_controllers.md","tags":[],"version":"current","sidebarPosition":8,"frontMatter":{"sidebar_position":8,"title":"Admission Controllers","description":"Learn how Admission Controllers in Kubernetes enforce policies and enhance cluster security."},"sidebar":"tutorialSidebar","previous":{"title":"Secrets Management","permalink":"/k8s_security/docs/cluster_setup_and_hardening/k8s_security_primitives/secrets_management"},"next":{"title":"Certificates in Kubernetes","permalink":"/k8s_security/docs/cluster_setup_and_hardening/k8s_security_primitives/certificates"}}');var i=n(4848),t=n(8453);const o={sidebar_position:8,title:"Admission Controllers",description:"Learn how Admission Controllers in Kubernetes enforce policies and enhance cluster security."},l="Admission Controllers",c={},a=[{value:"\ud83d\udea9 How Admission Controllers Work",id:"-how-admission-controllers-work",level:2},{value:"\ud83d\udee0\ufe0f Example: Enforcing Policies with OPA Gatekeeper",id:"\ufe0f-example-enforcing-policies-with-opa-gatekeeper",level:2},{value:"\u2705 Key Takeaway",id:"-key-takeaway",level:2}];function d(e){const s={code:"code",h1:"h1",h2:"h2",header:"header",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.header,{children:(0,i.jsx)(s.h1,{id:"admission-controllers",children:"Admission Controllers"})}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"Admission Controllers"})," in ",(0,i.jsx)(s.strong,{children:"Kubernetes"})," are ",(0,i.jsx)(s.strong,{children:"plugins"})," that ",(0,i.jsx)(s.strong,{children:"intercept API requests"})," before they are ",(0,i.jsx)(s.strong,{children:"persisted"})," in ",(0,i.jsx)(s.strong,{children:"etcd"}),". They can ",(0,i.jsx)(s.strong,{children:"validate requests"}),", ",(0,i.jsx)(s.strong,{children:"mutate objects"}),", and ",(0,i.jsx)(s.strong,{children:"enforce security policies"}),"."]}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h2,{id:"-how-admission-controllers-work",children:"\ud83d\udea9 How Admission Controllers Work"}),"\n",(0,i.jsx)(s.p,{children:"Admission Controllers are categorized into:"}),"\n",(0,i.jsxs)(s.ol,{children:["\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Validating Admission Controllers:"})," ",(0,i.jsx)(s.strong,{children:"Deny requests"})," that ",(0,i.jsx)(s.strong,{children:"violate policies"}),"."]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Mutating Admission Controllers:"})," ",(0,i.jsx)(s.strong,{children:"Modify requests"})," to ",(0,i.jsx)(s.strong,{children:"enforce defaults"})," or ",(0,i.jsx)(s.strong,{children:"standards"}),"."]}),"\n"]}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h2,{id:"\ufe0f-example-enforcing-policies-with-opa-gatekeeper",children:"\ud83d\udee0\ufe0f Example: Enforcing Policies with OPA Gatekeeper"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-yaml",children:'apiVersion: constraints.gatekeeper.sh/v1beta1\nkind: K8sPrivilegedContainer\nmetadata:\n  name: deny-privileged-containers\nspec:\n  match:\n    kinds:\n      - apiGroups: [""]\n        kinds: ["Pod"]\n  parameters:\n    privileged: false\n'})}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h2,{id:"-key-takeaway",children:"\u2705 Key Takeaway"}),"\n",(0,i.jsxs)(s.p,{children:["Use ",(0,i.jsx)(s.strong,{children:"Admission Controllers"})," to ",(0,i.jsx)(s.strong,{children:"enforce policies"}),", ",(0,i.jsx)(s.strong,{children:"ensure compliance"}),", and ",(0,i.jsx)(s.strong,{children:"prevent insecure configurations"})," in the ",(0,i.jsx)(s.strong,{children:"Kubernetes cluster"}),"."]})]})}function u(e={}){const{wrapper:s}={...(0,t.R)(),...e.components};return s?(0,i.jsx)(s,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},8453:(e,s,n)=>{n.d(s,{R:()=>o,x:()=>l});var r=n(6540);const i={},t=r.createContext(i);function o(e){const s=r.useContext(t);return r.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function l(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),r.createElement(t.Provider,{value:s},e.children)}}}]);