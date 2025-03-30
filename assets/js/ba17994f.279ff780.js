"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[6944],{6461:(e,s,i)=>{i.r(s),i.d(s,{assets:()=>a,contentTitle:()=>l,default:()=>u,frontMatter:()=>t,metadata:()=>n,toc:()=>c});const n=JSON.parse('{"id":"best_practices/cluster_setup_and_hardening/api_server_security/misconfigured_admission_controllers_mitigation","title":"Securing Kubernetes Admission Controllers","description":"Best practices for securing Kubernetes Admission Controllers to prevent unauthorized workloads and enforce security policies.","source":"@site/docs/best_practices/cluster_setup_and_hardening/api_server_security/misconfigured_admission_controllers_mitigation.md","sourceDirName":"best_practices/cluster_setup_and_hardening/api_server_security","slug":"/best_practices/cluster_setup_and_hardening/api_server_security/misconfigured_admission_controllers_mitigation","permalink":"/docs/best_practices/cluster_setup_and_hardening/api_server_security/misconfigured_admission_controllers_mitigation","draft":false,"unlisted":false,"tags":[],"version":"current","lastUpdatedBy":"Itai Ganot","lastUpdatedAt":1742803022000,"sidebarPosition":2,"frontMatter":{"sidebar_position":2,"title":"Securing Kubernetes Admission Controllers","description":"Best practices for securing Kubernetes Admission Controllers to prevent unauthorized workloads and enforce security policies."},"sidebar":"default","previous":{"title":"Securing the Kubernetes API Server","permalink":"/docs/best_practices/cluster_setup_and_hardening/api_server_security/compromised_api_server_mitigation"},"next":{"title":"Open Policy Agent (OPA) / Gatekeeper","permalink":"/docs/best_practices/cluster_setup_and_hardening/api_server_security/opa_gatekeeper"}}');var r=i(4848),o=i(8453);const t={sidebar_position:2,title:"Securing Kubernetes Admission Controllers",description:"Best practices for securing Kubernetes Admission Controllers to prevent unauthorized workloads and enforce security policies."},l="Securing Kubernetes Admission Controllers",a={},c=[{value:"1. Use Validating and Mutating Admission Controllers Wisely",id:"1-use-validating-and-mutating-admission-controllers-wisely",level:2},{value:"Secure Webhook Admission Control",id:"secure-webhook-admission-control",level:3},{value:"Why It Matters",id:"why-it-matters",level:3},{value:"2. Restrict Admission Controller Webhook Access",id:"2-restrict-admission-controller-webhook-access",level:2},{value:"Secure Webhook RBAC Policy",id:"secure-webhook-rbac-policy",level:3},{value:"Why It Matters",id:"why-it-matters-1",level:3},{value:"3. Set FailurePolicy to &quot;Fail&quot; for Critical Webhooks",id:"3-set-failurepolicy-to-fail-for-critical-webhooks",level:2},{value:"Secure Webhook Failure Policy",id:"secure-webhook-failure-policy",level:3},{value:"Why It Matters",id:"why-it-matters-2",level:3},{value:"4. Monitor Admission Controller Logs and Audit Changes",id:"4-monitor-admission-controller-logs-and-audit-changes",level:2},{value:"Enable Audit Logs",id:"enable-audit-logs",level:3},{value:"Why It Matters",id:"why-it-matters-3",level:3},{value:"Conclusion",id:"conclusion",level:2}];function d(e){const s={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.header,{children:(0,r.jsx)(s.h1,{id:"securing-kubernetes-admission-controllers",children:"Securing Kubernetes Admission Controllers"})}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.strong,{children:"Required knowledge for the CKS certification."})}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"Admission controllers"})," in Kubernetes play a crucial role in ",(0,r.jsx)(s.strong,{children:"validating and mutating requests"})," before they are persisted in the cluster. ",(0,r.jsx)(s.strong,{children:"Misconfigurations"})," in admission controllers can allow attackers to bypass security policies, deploy unauthorized workloads, and escalate privileges."]}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h2,{id:"1-use-validating-and-mutating-admission-controllers-wisely",children:"1. Use Validating and Mutating Admission Controllers Wisely"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"Issue:"})," Some admission controllers allow automatic modifications that may introduce security risks.",(0,r.jsx)("br",{}),"\n",(0,r.jsx)(s.strong,{children:"Fix:"})," Only enable necessary ",(0,r.jsx)(s.strong,{children:"Validating and Mutating Webhooks"})," and audit their changes."]}),"\n",(0,r.jsx)(s.h3,{id:"secure-webhook-admission-control",children:"Secure Webhook Admission Control"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-yaml",children:'apiVersion: admissionregistration.k8s.io/v1\nkind: ValidatingWebhookConfiguration\nmetadata:\n  name: restrict-host-paths\nwebhooks:\n  - name: restrict-host-paths.k8s.io\n    rules:\n      - apiGroups: [""]\n        apiVersions: ["v1"]\n        resources: ["pods"]\n        operations: ["CREATE"]\n    clientConfig:\n      service:\n        name: admission-controller\n        namespace: kube-system\n        path: "/validate"\n    admissionReviewVersions: ["v1"]\n    failurePolicy: "Fail"\n'})}),"\n",(0,r.jsx)(s.h3,{id:"why-it-matters",children:"Why It Matters"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Ensures"})," that security policies are enforced before workloads are created.",(0,r.jsx)("br",{})]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Prevents"})," insecure configurations from being automatically modified."]}),"\n"]}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h2,{id:"2-restrict-admission-controller-webhook-access",children:"2. Restrict Admission Controller Webhook Access"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"Issue:"})," An attacker can modify admission controller webhooks to bypass security policies.",(0,r.jsx)("br",{}),"\n",(0,r.jsx)(s.strong,{children:"Fix:"})," Use ",(0,r.jsx)(s.strong,{children:"RBAC"})," to limit access to webhook configurations."]}),"\n",(0,r.jsx)(s.h3,{id:"secure-webhook-rbac-policy",children:"Secure Webhook RBAC Policy"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-yaml",children:'apiVersion: rbac.authorization.k8s.io/v1\nkind: Role\nmetadata:\n  namespace: kube-system\n  name: webhook-admin\nrules:\n  - apiGroups: ["admissionregistration.k8s.io"]\n    resources:\n      ["validatingwebhookconfigurations", "mutatingwebhookconfigurations"]\n    verbs: ["get", "list"]\n'})}),"\n",(0,r.jsx)(s.h3,{id:"why-it-matters-1",children:"Why It Matters"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Prevents"})," unauthorized modifications to security-critical components.",(0,r.jsx)("br",{})]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Limits"})," who can change admission controller behavior."]}),"\n"]}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h2,{id:"3-set-failurepolicy-to-fail-for-critical-webhooks",children:'3. Set FailurePolicy to "Fail" for Critical Webhooks'}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"Issue:"})," If a webhook fails to respond, Kubernetes may allow requests by default.",(0,r.jsx)("br",{}),"\n",(0,r.jsx)(s.strong,{children:"Fix:"})," Use ",(0,r.jsx)(s.code,{children:"failurePolicy: Fail"})," to block unauthorized actions when an admission controller is unavailable."]}),"\n",(0,r.jsx)(s.h3,{id:"secure-webhook-failure-policy",children:"Secure Webhook Failure Policy"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-yaml",children:'failurePolicy: "Fail"\n'})}),"\n",(0,r.jsx)(s.h3,{id:"why-it-matters-2",children:"Why It Matters"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Prevents"})," attackers from bypassing security checks by disrupting webhooks.",(0,r.jsx)("br",{})]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Ensures"})," workloads are properly validated before being deployed."]}),"\n"]}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h2,{id:"4-monitor-admission-controller-logs-and-audit-changes",children:"4. Monitor Admission Controller Logs and Audit Changes"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"Issue:"})," Unauthorized changes to admission controllers may go undetected.",(0,r.jsx)("br",{}),"\n",(0,r.jsx)(s.strong,{children:"Fix:"})," Enable ",(0,r.jsx)(s.strong,{children:"audit logging"})," for admission controller events."]}),"\n",(0,r.jsx)(s.h3,{id:"enable-audit-logs",children:"Enable Audit Logs"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-bash",children:"--audit-log-path=/var/log/kubernetes/audit.log\n--audit-policy-file=/etc/kubernetes/audit-policy.yaml\n"})}),"\n",(0,r.jsx)(s.h3,{id:"why-it-matters-3",children:"Why It Matters"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Detects"})," suspicious modifications to admission controller policies.",(0,r.jsx)("br",{})]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Provides"})," visibility into rejected or modified API requests."]}),"\n"]}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"Securing Kubernetes Admission Controllers"})," is critical for ",(0,r.jsx)(s.strong,{children:"enforcing security policies, preventing unauthorized workloads, and protecting cluster integrity"}),". By ",(0,r.jsx)(s.strong,{children:"restricting webhook access, enforcing failure policies, enabling audit logs, and carefully configuring admission controllers"}),", you can significantly ",(0,r.jsx)(s.strong,{children:"reduce attack surfaces"}),"."]})]})}function u(e={}){const{wrapper:s}={...(0,o.R)(),...e.components};return s?(0,r.jsx)(s,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},8453:(e,s,i)=>{i.d(s,{R:()=>t,x:()=>l});var n=i(6540);const r={},o=n.createContext(r);function t(e){const s=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function l(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:t(e.components),n.createElement(o.Provider,{value:s},e.children)}}}]);