"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[7570],{8453:(e,s,n)=>{n.d(s,{R:()=>o,x:()=>c});var r=n(6540);const i={},t=r.createContext(i);function o(e){const s=r.useContext(t);return r.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function c(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),r.createElement(t.Provider,{value:s},e.children)}},9224:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>l,contentTitle:()=>c,default:()=>h,frontMatter:()=>o,metadata:()=>r,toc:()=>d});const r=JSON.parse('{"id":"fundamentals/k8s_security_primitives/authorization/abac","title":"Attribute-Based Access Control (ABAC)","description":"What is ABAC?","source":"@site/docs/fundamentals/k8s_security_primitives/authorization/abac.md","sourceDirName":"fundamentals/k8s_security_primitives/authorization","slug":"/fundamentals/k8s_security_primitives/authorization/abac","permalink":"/k8s_security/docs/fundamentals/k8s_security_primitives/authorization/abac","draft":false,"unlisted":false,"editUrl":"https://github.com/geek-kb/k8s_security/edit/main/docs/fundamentals/k8s_security_primitives/authorization/abac.md","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"title":"Attribute-Based Access Control (ABAC)","sidebar_position":2},"sidebar":"guidesSidebar","previous":{"title":"Role-Based Access Control (RBAC)","permalink":"/k8s_security/docs/fundamentals/k8s_security_primitives/authorization/rbac"},"next":{"title":"Node Authorization","permalink":"/k8s_security/docs/fundamentals/k8s_security_primitives/authorization/node_authorization"}}');var i=n(4848),t=n(8453);const o={title:"Attribute-Based Access Control (ABAC)",sidebar_position:2},c="Attribute-Based Access Control (ABAC) in Kubernetes",l={},d=[{value:"What is ABAC?",id:"what-is-abac",level:2},{value:"How Does ABAC Work?",id:"how-does-abac-work",level:2},{value:"Example of an ABAC Policy",id:"example-of-an-abac-policy",level:2},{value:"What This Policy Does",id:"what-this-policy-does",level:3},{value:"Enabling ABAC in Kubernetes",id:"enabling-abac-in-kubernetes",level:2},{value:"Tip: You can combine <strong>ABAC</strong> with other authorization modes",id:"tip-you-can-combine-abac-with-other-authorization-modes",level:3},{value:"Best Practices for Using ABAC",id:"best-practices-for-using-abac",level:2},{value:"When to Use ABAC vs. RBAC",id:"when-to-use-abac-vs-rbac",level:2},{value:"Limitations of ABAC",id:"limitations-of-abac",level:2},{value:"Migrating from ABAC to RBAC",id:"migrating-from-abac-to-rbac",level:2},{value:"Conclusion: Is ABAC Right for You?",id:"conclusion-is-abac-right-for-you",level:2}];function a(e){const s={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.header,{children:(0,i.jsx)(s.h1,{id:"attribute-based-access-control-abac-in-kubernetes",children:"Attribute-Based Access Control (ABAC) in Kubernetes"})}),"\n",(0,i.jsx)(s.h2,{id:"what-is-abac",children:"What is ABAC?"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"Attribute-Based Access Control (ABAC)"})," is an ",(0,i.jsx)(s.strong,{children:"authorization strategy"})," in Kubernetes that evaluates ",(0,i.jsx)(s.strong,{children:"attributes"})," of the ",(0,i.jsx)(s.strong,{children:"requester"}),", the ",(0,i.jsx)(s.strong,{children:"requested resource"}),", and the ",(0,i.jsx)(s.strong,{children:"current environment"})," to determine whether access should be granted. Unlike ",(0,i.jsx)(s.strong,{children:"RBAC (Role-Based Access Control)"}),", ABAC uses ",(0,i.jsx)(s.strong,{children:"policies"})," defined in ",(0,i.jsx)(s.strong,{children:"JSONL (JSON Lines) files"})," to provide ",(0,i.jsx)(s.strong,{children:"fine-grained control"})," over ",(0,i.jsx)(s.strong,{children:"API access"}),"."]}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h2,{id:"how-does-abac-work",children:"How Does ABAC Work?"}),"\n",(0,i.jsxs)(s.ol,{children:["\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Request Evaluation:"})," When a user or service makes a request, the ",(0,i.jsx)(s.strong,{children:"API server"})," evaluates it against a set of ",(0,i.jsx)(s.strong,{children:"policies"}),"."]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Policy Matching:"})," Policies are stored in a ",(0,i.jsx)(s.strong,{children:"JSON Lines file"})," that defines ",(0,i.jsx)(s.strong,{children:"allowed actions"})," based on specific ",(0,i.jsx)(s.strong,{children:"attributes"}),"."]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Decision Making:"})," If the ",(0,i.jsx)(s.strong,{children:"request attributes"})," match a ",(0,i.jsx)(s.strong,{children:"policy"}),", access is ",(0,i.jsx)(s.strong,{children:"granted"}),"; otherwise, access is ",(0,i.jsx)(s.strong,{children:"denied"}),"."]}),"\n"]}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h2,{id:"example-of-an-abac-policy",children:"Example of an ABAC Policy"}),"\n",(0,i.jsxs)(s.p,{children:["An ABAC policy file (",(0,i.jsx)(s.code,{children:"policy.jsonl"}),") is a ",(0,i.jsx)(s.strong,{children:"JSON Lines file"})," where each line is a ",(0,i.jsx)(s.strong,{children:"JSON object"})," representing a ",(0,i.jsx)(s.strong,{children:"policy rule"}),":"]}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-json",children:'{\n  "apiVersion": "abac.authorization.kubernetes.io/v1beta1",\n  "kind": "Policy",\n  "spec": {\n    "user": "john.doe",\n    "namespace": "production",\n    "resource": "pods",\n    "readonly": true\n  }\n}\n'})}),"\n",(0,i.jsx)(s.h3,{id:"what-this-policy-does",children:"What This Policy Does"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["Allows the user ",(0,i.jsx)(s.strong,{children:"john.doe"})," to ",(0,i.jsx)(s.strong,{children:"read-only access"})," (",(0,i.jsx)(s.code,{children:"GET"}),", ",(0,i.jsx)(s.code,{children:"LIST"}),", ",(0,i.jsx)(s.code,{children:"WATCH"}),") ",(0,i.jsx)(s.strong,{children:"pods"})," in the ",(0,i.jsx)(s.strong,{children:"production"})," namespace.",(0,i.jsx)("br",{})]}),"\n",(0,i.jsxs)(s.li,{children:["Prevents ",(0,i.jsx)(s.strong,{children:"write operations"})," (",(0,i.jsx)(s.code,{children:"CREATE"}),", ",(0,i.jsx)(s.code,{children:"UPDATE"}),", ",(0,i.jsx)(s.code,{children:"DELETE"}),")."]}),"\n"]}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h2,{id:"enabling-abac-in-kubernetes",children:"Enabling ABAC in Kubernetes"}),"\n",(0,i.jsxs)(s.p,{children:["To enable ABAC, set the ",(0,i.jsx)(s.strong,{children:"authorization mode"})," to ",(0,i.jsx)(s.strong,{children:"ABAC"})," and provide the ",(0,i.jsx)(s.strong,{children:"policy file"})," to the ",(0,i.jsx)(s.strong,{children:"API server"}),":"]}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-bash",children:"kube-apiserver \\\n  --authorization-mode=ABAC \\\n  --authorization-policy-file=/path/to/policy.jsonl\n"})}),"\n",(0,i.jsxs)(s.h3,{id:"tip-you-can-combine-abac-with-other-authorization-modes",children:["Tip: You can combine ",(0,i.jsx)(s.strong,{children:"ABAC"})," with other authorization modes"]}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-bash",children:"--authorization-mode=Node,RBAC,ABAC\n"})}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Node:"})," For ",(0,i.jsx)(s.strong,{children:"Kubelet authorization"}),".",(0,i.jsx)("br",{})]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"RBAC:"})," For ",(0,i.jsx)(s.strong,{children:"role-based access control"}),".",(0,i.jsx)("br",{})]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"ABAC:"})," For ",(0,i.jsx)(s.strong,{children:"attribute-based policies"}),"."]}),"\n"]}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h2,{id:"best-practices-for-using-abac",children:"Best Practices for Using ABAC"}),"\n",(0,i.jsxs)(s.ol,{children:["\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"Limit ABAC Use:"}),(0,i.jsx)("br",{}),"Prefer ",(0,i.jsx)(s.strong,{children:"RBAC"})," for most scenarios as it offers ",(0,i.jsx)(s.strong,{children:"dynamic policy management"}),"."]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"Avoid Broad Permissions:"}),(0,i.jsx)("br",{}),"Be ",(0,i.jsx)(s.strong,{children:"specific"})," in ",(0,i.jsx)(s.strong,{children:"ABAC policies"})," to avoid ",(0,i.jsx)(s.strong,{children:"over-permissioning"}),"."]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"Test Policies Thoroughly:"}),(0,i.jsx)("br",{}),"Use tools like ",(0,i.jsx)(s.strong,{children:"kubectl auth can-i"})," to validate ",(0,i.jsx)(s.strong,{children:"permissions"}),":"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-bash",children:"kubectl auth can-i list pods --as=john.doe --namespace=production\n"})}),"\n",(0,i.jsxs)(s.ol,{start:"4",children:["\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Combine with Other Modes:"}),(0,i.jsx)("br",{}),"Use ",(0,i.jsx)(s.strong,{children:"ABAC"})," only where ",(0,i.jsx)(s.strong,{children:"RBAC"})," or ",(0,i.jsx)(s.strong,{children:"Webhook Authorization"})," cannot meet specific ",(0,i.jsx)(s.strong,{children:"attribute-based needs"}),"."]}),"\n"]}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h2,{id:"when-to-use-abac-vs-rbac",children:"When to Use ABAC vs. RBAC"}),"\n",(0,i.jsxs)(s.table,{children:[(0,i.jsx)(s.thead,{children:(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.th,{children:"Feature"}),(0,i.jsx)(s.th,{children:(0,i.jsx)(s.strong,{children:"ABAC"})}),(0,i.jsx)(s.th,{children:(0,i.jsx)(s.strong,{children:"RBAC"})})]})}),(0,i.jsxs)(s.tbody,{children:[(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:(0,i.jsx)(s.strong,{children:"Policy Format"})}),(0,i.jsxs)(s.td,{children:[(0,i.jsx)(s.strong,{children:"JSONL"})," files"]}),(0,i.jsx)(s.td,{children:(0,i.jsx)(s.strong,{children:"Kubernetes API resources"})})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:(0,i.jsx)(s.strong,{children:"Management"})}),(0,i.jsxs)(s.td,{children:["Requires ",(0,i.jsx)(s.strong,{children:"file updates"})," and ",(0,i.jsx)(s.strong,{children:"restarts"})]}),(0,i.jsxs)(s.td,{children:["Dynamic updates via ",(0,i.jsx)(s.strong,{children:"kubectl"})]})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:(0,i.jsx)(s.strong,{children:"Use Case"})}),(0,i.jsxs)(s.td,{children:["Complex, ",(0,i.jsx)(s.strong,{children:"attribute-based rules"})]}),(0,i.jsxs)(s.td,{children:[(0,i.jsx)(s.strong,{children:"Standard role-based"})," access control"]})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:(0,i.jsx)(s.strong,{children:"Flexibility"})}),(0,i.jsxs)(s.td,{children:["High, but ",(0,i.jsx)(s.strong,{children:"harder to manage"})]}),(0,i.jsxs)(s.td,{children:["Easier to ",(0,i.jsx)(s.strong,{children:"audit and manage"})]})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:(0,i.jsx)(s.strong,{children:"Preferred For"})}),(0,i.jsxs)(s.td,{children:["Legacy systems, ",(0,i.jsx)(s.strong,{children:"custom conditions"})]}),(0,i.jsxs)(s.td,{children:["Most ",(0,i.jsx)(s.strong,{children:"modern Kubernetes deployments"})]})]})]})]}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h2,{id:"limitations-of-abac",children:"Limitations of ABAC"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Static Nature:"})," Changes to policies require ",(0,i.jsx)(s.strong,{children:"restarting"})," the ",(0,i.jsx)(s.strong,{children:"API server"}),".",(0,i.jsx)("br",{})]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"No API Integration:"})," Policies are not stored in the Kubernetes ",(0,i.jsx)(s.strong,{children:"API server"}),"; they are ",(0,i.jsx)(s.strong,{children:"external files"}),".",(0,i.jsx)("br",{})]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Difficult to Audit:"})," There are no ",(0,i.jsx)(s.strong,{children:"native tools"})," to ",(0,i.jsx)(s.strong,{children:"list ABAC policies"})," or ",(0,i.jsx)(s.strong,{children:"monitor changes"}),"."]}),"\n"]}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h2,{id:"migrating-from-abac-to-rbac",children:"Migrating from ABAC to RBAC"}),"\n",(0,i.jsxs)(s.p,{children:["If you are using ",(0,i.jsx)(s.strong,{children:"ABAC"})," and want to migrate to ",(0,i.jsx)(s.strong,{children:"RBAC"}),", follow these steps:"]}),"\n",(0,i.jsxs)(s.ol,{children:["\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Convert ABAC policies"})," to ",(0,i.jsx)(s.strong,{children:"RBAC roles and role bindings"}),".",(0,i.jsx)("br",{})]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Test"})," with the ",(0,i.jsx)(s.strong,{children:"RBAC authorizer"})," enabled alongside ",(0,i.jsx)(s.strong,{children:"ABAC"}),".",(0,i.jsx)("br",{})]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Remove ABAC policies"})," and set the ",(0,i.jsx)(s.strong,{children:"authorization mode"})," to ",(0,i.jsx)(s.strong,{children:"RBAC"}),"."]}),"\n"]}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-bash",children:'kube-apiserver \\\n  --authorization-mode=RBAC,Node \\\n  --authorization-policy-file=""\n'})}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h2,{id:"conclusion-is-abac-right-for-you",children:"Conclusion: Is ABAC Right for You?"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"ABAC"})," offers ",(0,i.jsx)(s.strong,{children:"flexibility"})," and ",(0,i.jsx)(s.strong,{children:"fine-grained control"})," for specific scenarios, but its ",(0,i.jsx)(s.strong,{children:"static nature"})," and ",(0,i.jsx)(s.strong,{children:"management complexity"})," make it less suited for ",(0,i.jsx)(s.strong,{children:"dynamic environments"}),". Whenever possible, prefer ",(0,i.jsx)(s.strong,{children:"RBAC"})," for ",(0,i.jsx)(s.strong,{children:"modern Kubernetes clusters"})," due to its ",(0,i.jsx)(s.strong,{children:"ease of use"}),", ",(0,i.jsx)(s.strong,{children:"auditability"}),", and ",(0,i.jsx)(s.strong,{children:"integration with the Kubernetes API"}),"."]})]})}function h(e={}){const{wrapper:s}={...(0,t.R)(),...e.components};return s?(0,i.jsx)(s,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}}}]);