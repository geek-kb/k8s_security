"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[8013],{8453:(e,s,i)=>{i.d(s,{R:()=>c,x:()=>a});var r=i(6540);const n={},t=r.createContext(n);function c(e){const s=r.useContext(t);return r.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function a(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:c(e.components),r.createElement(t.Provider,{value:s},e.children)}},8489:(e,s,i)=>{i.r(s),i.d(s,{assets:()=>l,contentTitle:()=>a,default:()=>u,frontMatter:()=>c,metadata:()=>r,toc:()=>o});const r=JSON.parse('{"id":"best_practices/cluster_setup_and_hardening/insecure_rbac_permissions_mitigation","title":"Securing RBAC Permissions","description":"Best practices for securing Kubernetes RBAC configurations to prevent privilege escalation and unauthorized access.","source":"@site/docs/best_practices/cluster_setup_and_hardening/insecure_rbac_permissions_mitigation.md","sourceDirName":"best_practices/cluster_setup_and_hardening","slug":"/best_practices/cluster_setup_and_hardening/insecure_rbac_permissions_mitigation","permalink":"/k8s_security/docs/best_practices/cluster_setup_and_hardening/insecure_rbac_permissions_mitigation","draft":false,"unlisted":false,"editUrl":"https://github.com/geek-kb/k8s_security/edit/main/docs/best_practices/cluster_setup_and_hardening/insecure_rbac_permissions_mitigation.md","tags":[],"version":"current","sidebarPosition":5,"frontMatter":{"sidebar_position":5,"title":"Securing RBAC Permissions","description":"Best practices for securing Kubernetes RBAC configurations to prevent privilege escalation and unauthorized access."},"sidebar":"guidesSidebar","previous":{"title":"Securing the Kubernetes API Server","permalink":"/k8s_security/docs/best_practices/cluster_setup_and_hardening/api_server_security"},"next":{"title":"Kubelet Security","permalink":"/k8s_security/docs/best_practices/cluster_setup_and_hardening/kubelet_security"}}');var n=i(4848),t=i(8453);const c={sidebar_position:5,title:"Securing RBAC Permissions",description:"Best practices for securing Kubernetes RBAC configurations to prevent privilege escalation and unauthorized access."},a="Securing RBAC Permissions",l={},o=[{value:"1. Enforce the Principle of Least Privilege",id:"1-enforce-the-principle-of-least-privilege",level:2},{value:"Secure Role Example",id:"secure-role-example",level:3},{value:"Why It Matters",id:"why-it-matters",level:3},{value:"2. Avoid Wildcard Permissions",id:"2-avoid-wildcard-permissions",level:2},{value:"Insecure Role (AVOID)",id:"insecure-role-avoid",level:3},{value:"Secure Alternative (Restrictive Scope)",id:"secure-alternative-restrictive-scope",level:3},{value:"Why It Matters",id:"why-it-matters-1",level:3},{value:"3. Restrict Cluster-Wide Privileges",id:"3-restrict-cluster-wide-privileges",level:2},{value:"Secure <code>ClusterRoleBinding</code>",id:"secure-clusterrolebinding",level:3},{value:"Why It Matters",id:"why-it-matters-2",level:3},{value:"4. Use RBAC Audit Logs to Detect Misuse",id:"4-use-rbac-audit-logs-to-detect-misuse",level:2},{value:"Enable API Server Auditing",id:"enable-api-server-auditing",level:3},{value:"Why It Matters",id:"why-it-matters-3",level:3},{value:"5. Use Service Accounts for Automated Workloads",id:"5-use-service-accounts-for-automated-workloads",level:2},{value:"Secure Service Account Usage",id:"secure-service-account-usage",level:3},{value:"Why It Matters",id:"why-it-matters-4",level:3},{value:"Conclusion",id:"conclusion",level:2}];function d(e){const s={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.header,{children:(0,n.jsx)(s.h1,{id:"securing-rbac-permissions",children:"Securing RBAC Permissions"})}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:"Role-Based Access Control (RBAC)"})," defines how users and workloads interact with Kubernetes resources. If ",(0,n.jsx)(s.strong,{children:"misconfigured"}),", attackers can ",(0,n.jsx)(s.strong,{children:"escalate privileges, access sensitive data, and take control of the cluster"}),". Proper RBAC security enforces the ",(0,n.jsx)(s.strong,{children:"principle of least privilege"})," and minimizes attack vectors."]}),"\n",(0,n.jsx)(s.hr,{}),"\n",(0,n.jsx)(s.h2,{id:"1-enforce-the-principle-of-least-privilege",children:"1. Enforce the Principle of Least Privilege"}),"\n",(0,n.jsxs)(s.p,{children:["RBAC should grant ",(0,n.jsx)(s.strong,{children:"only the necessary permissions"})," required for a user or workload."]}),"\n",(0,n.jsx)(s.h3,{id:"secure-role-example",children:"Secure Role Example"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-yaml",children:'apiVersion: rbac.authorization.k8s.io/v1\nkind: Role\nmetadata:\n  namespace: production\n  name: read-only-role\nrules:\n  - apiGroups: [""]\n    resources: ["pods", "services"]\n    verbs: ["get", "list"]\n'})}),"\n",(0,n.jsx)(s.h3,{id:"why-it-matters",children:"Why It Matters"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"Prevents"})," users from modifying critical resources.",(0,n.jsx)("br",{})]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"Reduces"})," potential damage from compromised credentials."]}),"\n"]}),"\n",(0,n.jsx)(s.hr,{}),"\n",(0,n.jsx)(s.h2,{id:"2-avoid-wildcard-permissions",children:"2. Avoid Wildcard Permissions"}),"\n",(0,n.jsxs)(s.p,{children:["Using ",(0,n.jsx)(s.code,{children:"'*'"})," for API groups, resources, or verbs grants ",(0,n.jsx)(s.strong,{children:"unrestricted access"}),", leading to security risks."]}),"\n",(0,n.jsx)(s.h3,{id:"insecure-role-avoid",children:"Insecure Role (AVOID)"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-yaml",children:'apiVersion: rbac.authorization.k8s.io/v1\nkind: Role\nmetadata:\n  namespace: default\n  name: insecure-role\nrules:\n  - apiGroups: ["*"]\n    resources: ["*"]\n    verbs: ["*"]\n'})}),"\n",(0,n.jsx)(s.h3,{id:"secure-alternative-restrictive-scope",children:"Secure Alternative (Restrictive Scope)"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-yaml",children:'apiVersion: rbac.authorization.k8s.io/v1\nkind: Role\nmetadata:\n  namespace: default\n  name: limited-role\nrules:\n  - apiGroups: [""]\n    resources: ["pods"]\n    verbs: ["get", "list"]\n'})}),"\n",(0,n.jsx)(s.h3,{id:"why-it-matters-1",children:"Why It Matters"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"Prevents"})," users from gaining excessive privileges.",(0,n.jsx)("br",{})]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"Limits"})," scope of permissions to only required actions."]}),"\n"]}),"\n",(0,n.jsx)(s.hr,{}),"\n",(0,n.jsx)(s.h2,{id:"3-restrict-cluster-wide-privileges",children:"3. Restrict Cluster-Wide Privileges"}),"\n",(0,n.jsxs)(s.p,{children:["Cluster-wide roles (",(0,n.jsx)(s.code,{children:"ClusterRole"}),") should be ",(0,n.jsx)(s.strong,{children:"limited"})," to essential users and services."]}),"\n",(0,n.jsxs)(s.h3,{id:"secure-clusterrolebinding",children:["Secure ",(0,n.jsx)(s.code,{children:"ClusterRoleBinding"})]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-yaml",children:"apiVersion: rbac.authorization.k8s.io/v1\nkind: ClusterRoleBinding\nmetadata:\n  name: read-only-binding\nsubjects:\n  - kind: User\n    name: readonly-user\n    apiGroup: rbac.authorization.k8s.io\nroleRef:\n  kind: ClusterRole\n  name: read-only-role\n  apiGroup: rbac.authorization.k8s.io\n"})}),"\n",(0,n.jsx)(s.h3,{id:"why-it-matters-2",children:"Why It Matters"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"Prevents"})," unnecessary global access.",(0,n.jsx)("br",{})]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"Ensures"})," users operate within appropriate namespaces."]}),"\n"]}),"\n",(0,n.jsx)(s.hr,{}),"\n",(0,n.jsx)(s.h2,{id:"4-use-rbac-audit-logs-to-detect-misuse",children:"4. Use RBAC Audit Logs to Detect Misuse"}),"\n",(0,n.jsxs)(s.p,{children:["Enable ",(0,n.jsx)(s.strong,{children:"audit logs"})," to monitor RBAC activity and detect unauthorized access."]}),"\n",(0,n.jsx)(s.h3,{id:"enable-api-server-auditing",children:"Enable API Server Auditing"}),"\n",(0,n.jsx)(s.p,{children:"Edit the Kubernetes API server configuration:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-yaml",children:'apiVersion: audit.k8s.io/v1\nkind: Policy\nrules:\n  - level: Metadata\n    users: ["system:anonymous"]\n    verbs: ["get", "list"]\n    resources: ["pods"]\n'})}),"\n",(0,n.jsx)(s.h3,{id:"why-it-matters-3",children:"Why It Matters"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"Detects"})," unauthorized access attempts.",(0,n.jsx)("br",{})]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"Provides"})," visibility into RBAC changes."]}),"\n"]}),"\n",(0,n.jsx)(s.hr,{}),"\n",(0,n.jsx)(s.h2,{id:"5-use-service-accounts-for-automated-workloads",children:"5. Use Service Accounts for Automated Workloads"}),"\n",(0,n.jsxs)(s.p,{children:["Workloads should use ",(0,n.jsx)(s.strong,{children:"dedicated service accounts"})," with restricted permissions."]}),"\n",(0,n.jsx)(s.h3,{id:"secure-service-account-usage",children:"Secure Service Account Usage"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-yaml",children:"apiVersion: v1\nkind: ServiceAccount\nmetadata:\n  name: limited-sa\n  namespace: default\n"})}),"\n",(0,n.jsx)(s.h3,{id:"why-it-matters-4",children:"Why It Matters"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"Prevents"})," workloads from running as ",(0,n.jsx)(s.code,{children:"default"})," service account.",(0,n.jsx)("br",{})]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"Minimizes"})," risk if a compromised pod attempts privilege escalation."]}),"\n"]}),"\n",(0,n.jsx)(s.hr,{}),"\n",(0,n.jsx)(s.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,n.jsxs)(s.p,{children:["RBAC misconfigurations ",(0,n.jsx)(s.strong,{children:"open doors for attackers"})," to escalate privileges and compromise Kubernetes clusters. Following best practices\u2014",(0,n.jsx)(s.strong,{children:"principle of least privilege, avoiding wildcards, restricting cluster-wide privileges, auditing access, and using service accounts"}),"\u2014ensures a secure RBAC model."]})]})}function u(e={}){const{wrapper:s}={...(0,t.R)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}}}]);