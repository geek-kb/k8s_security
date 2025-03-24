"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[4805],{855:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>h,contentTitle:()=>a,default:()=>d,frontMatter:()=>r,metadata:()=>i,toc:()=>l});const i=JSON.parse('{"id":"fundamentals/authorization/webhook_authorization","title":"Webhook Authorization","description":"Required knowledge for the CKS certification.","source":"@site/docs/fundamentals/authorization/webhook_authorization.md","sourceDirName":"fundamentals/authorization","slug":"/fundamentals/authorization/webhook_authorization","permalink":"/docs/fundamentals/authorization/webhook_authorization","draft":false,"unlisted":false,"editUrl":"https://github.com/geek-kb/k8s_security/edit/main/docs/fundamentals/authorization/webhook_authorization.md","tags":[],"version":"current","lastUpdatedBy":"Itai Ganot","lastUpdatedAt":1742803022000,"sidebarPosition":4,"frontMatter":{"title":"Webhook Authorization","sidebar_position":4},"sidebar":"default","previous":{"title":"Role-Based Access Control (RBAC)","permalink":"/docs/fundamentals/authorization/rbac"},"next":{"title":"Section Introduction","permalink":"/docs/attack_vectors/intro/"}}');var t=o(4848),s=o(8453);const r={title:"Webhook Authorization",sidebar_position:4},a="Webhook Authorization in Kubernetes",h={},l=[{value:"What is Webhook Authorization?",id:"what-is-webhook-authorization",level:2},{value:"How Does Webhook Authorization Work?",id:"how-does-webhook-authorization-work",level:2},{value:"Enabling Webhook Authorization",id:"enabling-webhook-authorization",level:2},{value:"Example Webhook Configuration",id:"example-webhook-configuration",level:3},{value:"Webhook Authorization Request and Response",id:"webhook-authorization-request-and-response",level:2},{value:"Request Example",id:"request-example",level:3},{value:"Response Example",id:"response-example",level:3},{value:"Best Practices for Webhook Authorization",id:"best-practices-for-webhook-authorization",level:2},{value:"When to Use Webhook Authorization",id:"when-to-use-webhook-authorization",level:2},{value:"Conclusion: Flexibility and Control with Webhook Authorization",id:"conclusion-flexibility-and-control-with-webhook-authorization",level:2}];function c(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"webhook-authorization-in-kubernetes",children:"Webhook Authorization in Kubernetes"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Required knowledge for the CKS certification."})}),"\n",(0,t.jsx)(n.h2,{id:"what-is-webhook-authorization",children:"What is Webhook Authorization?"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Webhook Authorization"})," allows Kubernetes to ",(0,t.jsx)(n.strong,{children:"delegate authorization decisions"})," to an ",(0,t.jsx)(n.strong,{children:"external service"})," via a ",(0,t.jsx)(n.strong,{children:"webhook"}),". It is ideal for ",(0,t.jsx)(n.strong,{children:"custom authorization scenarios"})," that go beyond the capabilities of ",(0,t.jsx)(n.strong,{children:"RBAC"})," and ",(0,t.jsx)(n.strong,{children:"Node Authorization"}),"."]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"how-does-webhook-authorization-work",children:"How Does Webhook Authorization Work?"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Request Handling:"})," When a ",(0,t.jsx)(n.strong,{children:"request"})," is made to the ",(0,t.jsx)(n.strong,{children:"API server"}),", it is sent to the ",(0,t.jsx)(n.strong,{children:"Webhook service"}),"."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Decision Making:"})," The ",(0,t.jsx)(n.strong,{children:"Webhook service"})," evaluates the request against ",(0,t.jsx)(n.strong,{children:"custom policies"}),"."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Response:"})," The service returns an ",(0,t.jsx)(n.strong,{children:"ALLOW"})," or ",(0,t.jsx)(n.strong,{children:"DENY"})," decision to the ",(0,t.jsx)(n.strong,{children:"API server"}),"."]}),"\n"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"enabling-webhook-authorization",children:"Enabling Webhook Authorization"}),"\n",(0,t.jsxs)(n.p,{children:["To enable ",(0,t.jsx)(n.strong,{children:"Webhook Authorization"}),", configure the ",(0,t.jsx)(n.strong,{children:"API server"})," with the appropriate ",(0,t.jsx)(n.strong,{children:"flags"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"kube-apiserver \\\n  --authorization-mode=Webhook,RBAC \\\n  --authorization-webhook-config-file=/etc/kubernetes/webhook-config.yaml\n"})}),"\n",(0,t.jsx)(n.h3,{id:"example-webhook-configuration",children:"Example Webhook Configuration"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"apiVersion: v1\nkind: Config\nclusters:\n  - name: webhook-authz\n    cluster:\n      server: https://authz.example.com/authorize\n      certificate-authority: /path/to/ca.crt\nusers:\n  - name: webhook-authz\ncontexts:\n  - name: webhook-authz\n    context:\n      cluster: webhook-authz\n      user: webhook-authz\ncurrent-context: webhook-authz\n"})}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"webhook-authorization-request-and-response",children:"Webhook Authorization Request and Response"}),"\n",(0,t.jsx)(n.h3,{id:"request-example",children:"Request Example"}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.strong,{children:"API server"})," sends a ",(0,t.jsx)(n.strong,{children:"JSON request"})," to the ",(0,t.jsx)(n.strong,{children:"webhook"})," service:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",children:'{\n  "apiVersion": "authorization.k8s.io/v1",\n  "kind": "SubjectAccessReview",\n  "spec": {\n    "user": "jane.doe",\n    "groups": ["dev-team"],\n    "resourceAttributes": {\n      "namespace": "default",\n      "verb": "get",\n      "resource": "pods"\n    }\n  }\n}\n'})}),"\n",(0,t.jsx)(n.h3,{id:"response-example",children:"Response Example"}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.strong,{children:"webhook service"})," returns ",(0,t.jsx)(n.strong,{children:"ALLOW"})," or ",(0,t.jsx)(n.strong,{children:"DENY"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",children:'{\n  "apiVersion": "authorization.k8s.io/v1",\n  "kind": "SubjectAccessReview",\n  "status": {\n    "allowed": true,\n    "reason": "User is authorized to get pods in the default namespace"\n  }\n}\n'})}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"best-practices-for-webhook-authorization",children:"Best Practices for Webhook Authorization"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Secure Webhook Communication:"}),"\nUse ",(0,t.jsx)(n.strong,{children:"HTTPS"})," with ",(0,t.jsx)(n.strong,{children:"mutual TLS"})," to secure communications between the ",(0,t.jsx)(n.strong,{children:"API server"})," and the ",(0,t.jsx)(n.strong,{children:"Webhook service"}),".",(0,t.jsx)("br",{})]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Implement High Availability:"}),"\nEnsure the ",(0,t.jsx)(n.strong,{children:"Webhook service"})," is ",(0,t.jsx)(n.strong,{children:"highly available"})," to avoid ",(0,t.jsx)(n.strong,{children:"authorization disruptions"}),".",(0,t.jsx)("br",{})]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Timeouts and Failures:"}),"\nConfigure ",(0,t.jsx)(n.strong,{children:"timeouts"})," and ",(0,t.jsx)(n.strong,{children:"failure policies"})," to handle ",(0,t.jsx)(n.strong,{children:"webhook unavailability"})," gracefully.",(0,t.jsx)("br",{})]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"failurePolicy: Ignore\ntimeoutSeconds: 5\n"})}),"\n",(0,t.jsxs)(n.ol,{start:"4",children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Logging and Auditing:"}),"\nEnable ",(0,t.jsx)(n.strong,{children:"logging"})," on the ",(0,t.jsx)(n.strong,{children:"Webhook service"})," to ",(0,t.jsx)(n.strong,{children:"audit authorization decisions"}),".",(0,t.jsx)("br",{})]}),"\n"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"when-to-use-webhook-authorization",children:"When to Use Webhook Authorization"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["When ",(0,t.jsx)(n.strong,{children:"RBAC"})," and ",(0,t.jsx)(n.strong,{children:"ABAC"})," do not meet specific ",(0,t.jsx)(n.strong,{children:"authorization requirements"}),".",(0,t.jsx)("br",{})]}),"\n",(0,t.jsxs)(n.li,{children:["To ",(0,t.jsx)(n.strong,{children:"integrate external systems"})," with ",(0,t.jsx)(n.strong,{children:"custom business logic"}),".",(0,t.jsx)("br",{})]}),"\n",(0,t.jsxs)(n.li,{children:["When using ",(0,t.jsx)(n.strong,{children:"dynamic policies"})," that need to be ",(0,t.jsx)(n.strong,{children:"centrally managed"}),".",(0,t.jsx)("br",{})]}),"\n"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"conclusion-flexibility-and-control-with-webhook-authorization",children:"Conclusion: Flexibility and Control with Webhook Authorization"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Webhook Authorization"})," offers ",(0,t.jsx)(n.strong,{children:"flexibility"})," by allowing ",(0,t.jsx)(n.strong,{children:"custom authorization logic"})," via ",(0,t.jsx)(n.strong,{children:"external services"}),". It is particularly useful in ",(0,t.jsx)(n.strong,{children:"enterprise environments"})," with ",(0,t.jsx)(n.strong,{children:"complex authorization requirements"})," that need to integrate with ",(0,t.jsx)(n.strong,{children:"external identity or policy services"}),"."]})]})}function d(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},8453:(e,n,o)=>{o.d(n,{R:()=>r,x:()=>a});var i=o(6540);const t={},s=i.createContext(t);function r(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),i.createElement(s.Provider,{value:n},e.children)}}}]);