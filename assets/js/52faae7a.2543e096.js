"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[5187],{808:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>o,contentTitle:()=>a,default:()=>u,frontMatter:()=>c,metadata:()=>i,toc:()=>l});const i=JSON.parse('{"id":"best_practices/cluster_setup_and_hardening/rbac_and_identity/service_account_mitigation","title":"Securing Kubernetes Service Accounts","description":"Best practices for securing Kubernetes Service Accounts to prevent unauthorized access, privilege escalation, and persistent attacks.","source":"@site/docs/best_practices/cluster_setup_and_hardening/rbac_and_identity/service_account_mitigation.md","sourceDirName":"best_practices/cluster_setup_and_hardening/rbac_and_identity","slug":"/best_practices/cluster_setup_and_hardening/rbac_and_identity/service_account_mitigation","permalink":"/k8s_security/docs/best_practices/cluster_setup_and_hardening/rbac_and_identity/service_account_mitigation","draft":false,"unlisted":false,"editUrl":"https://github.com/geek-kb/k8s_security/edit/main/docs/best_practices/cluster_setup_and_hardening/rbac_and_identity/service_account_mitigation.md","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"sidebar_position":2,"title":"Securing Kubernetes Service Accounts","description":"Best practices for securing Kubernetes Service Accounts to prevent unauthorized access, privilege escalation, and persistent attacks."},"sidebar":"guidesSidebar","previous":{"title":"Securing RBAC Permissions","permalink":"/k8s_security/docs/best_practices/cluster_setup_and_hardening/rbac_and_identity/insecure_rbac_permissions_mitigation"},"next":{"title":"Insecure Secrets Management Mitigation","permalink":"/k8s_security/docs/best_practices/cluster_setup_and_hardening/secrets_management/insecure_secrets_management_mitigation"}}');var t=s(4848),r=s(8453);const c={sidebar_position:2,title:"Securing Kubernetes Service Accounts",description:"Best practices for securing Kubernetes Service Accounts to prevent unauthorized access, privilege escalation, and persistent attacks."},a="Securing Kubernetes Service Accounts",o={},l=[{value:"1. Disable Automatic Service Account Token Mounting",id:"1-disable-automatic-service-account-token-mounting",level:2},{value:"Secure Pod Configuration",id:"secure-pod-configuration",level:3},{value:"Why It Matters",id:"why-it-matters",level:3},{value:"2. Enforce Least Privilege with RBAC",id:"2-enforce-least-privilege-with-rbac",level:2},{value:"Secure Service Account and Role Binding",id:"secure-service-account-and-role-binding",level:3},{value:"Why It Matters",id:"why-it-matters-1",level:3},{value:"3. Block Service Accounts from Assigning Privileged Roles",id:"3-block-service-accounts-from-assigning-privileged-roles",level:2},{value:"Secure Cluster Role Definition",id:"secure-cluster-role-definition",level:3},{value:"Why It Matters",id:"why-it-matters-2",level:3},{value:"4. Restrict Service Account Usage Per Namespace",id:"4-restrict-service-account-usage-per-namespace",level:2},{value:"Secure Role Binding to a Specific Namespace",id:"secure-role-binding-to-a-specific-namespace",level:3},{value:"Why It Matters",id:"why-it-matters-3",level:3},{value:"5. Rotate and Expire Service Account Tokens",id:"5-rotate-and-expire-service-account-tokens",level:2},{value:"Enable Token Request API",id:"enable-token-request-api",level:3},{value:"Why It Matters",id:"why-it-matters-4",level:3},{value:"6. Monitor and Audit Service Account Usage",id:"6-monitor-and-audit-service-account-usage",level:2},{value:"Enable Service Account Audit Logging",id:"enable-service-account-audit-logging",level:3},{value:"Why It Matters",id:"why-it-matters-5",level:3},{value:"Conclusion",id:"conclusion",level:2}];function d(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"securing-kubernetes-service-accounts",children:"Securing Kubernetes Service Accounts"})}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Service Accounts (SAs)"})," in Kubernetes allow pods to interact with the API server. If ",(0,t.jsx)(n.strong,{children:"overprivileged"}),", they can be exploited by attackers to ",(0,t.jsx)(n.strong,{children:"escalate privileges, access cluster-wide resources, or maintain persistence"}),". Enforcing strict access controls is essential to prevent these security risks."]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"1-disable-automatic-service-account-token-mounting",children:"1. Disable Automatic Service Account Token Mounting"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Issue:"})," By default, Kubernetes mounts Service Account tokens inside all pods, even if they do not require API access.",(0,t.jsx)("br",{}),"\n",(0,t.jsx)(n.strong,{children:"Fix:"})," Disable automatic token mounting for pods that do not interact with the Kubernetes API."]}),"\n",(0,t.jsx)(n.h3,{id:"secure-pod-configuration",children:"Secure Pod Configuration"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"apiVersion: v1\nkind: Pod\nmetadata:\n  name: secure-pod\nspec:\n  serviceAccountName: default\n  automountServiceAccountToken: false\n  containers:\n    - name: app-container\n      image: secure-image\n"})}),"\n",(0,t.jsx)(n.h3,{id:"why-it-matters",children:"Why It Matters"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Prevents"})," attackers from stealing API credentials from compromised pods.",(0,t.jsx)("br",{})]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Ensures"})," only necessary workloads have access to Service Account tokens."]}),"\n"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"2-enforce-least-privilege-with-rbac",children:"2. Enforce Least Privilege with RBAC"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Issue:"})," If a Service Account is assigned excessive permissions, an attacker can escalate privileges.",(0,t.jsx)("br",{}),"\n",(0,t.jsx)(n.strong,{children:"Fix:"})," Restrict Service Accounts using ",(0,t.jsx)(n.strong,{children:"Role-Based Access Control (RBAC)"}),"."]}),"\n",(0,t.jsx)(n.h3,{id:"secure-service-account-and-role-binding",children:"Secure Service Account and Role Binding"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:'apiVersion: v1\nkind: ServiceAccount\nmetadata:\n  name: limited-access\n  namespace: default\n---\napiVersion: rbac.authorization.k8s.io/v1\nkind: Role\nmetadata:\n  name: limited-role\n  namespace: default\nrules:\n  - apiGroups: [""]\n    resources: ["pods"]\n    verbs: ["get", "list"]\n---\napiVersion: rbac.authorization.k8s.io/v1\nkind: RoleBinding\nmetadata:\n  name: limit-access\n  namespace: default\nsubjects:\n  - kind: ServiceAccount\n    name: limited-access\n    namespace: default\nroleRef:\n  kind: Role\n  name: limited-role\n  apiGroup: rbac.authorization.k8s.io\n'})}),"\n",(0,t.jsx)(n.h3,{id:"why-it-matters-1",children:"Why It Matters"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Restricts"})," Service Accounts to specific namespaces and actions.",(0,t.jsx)("br",{})]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Reduces"})," the risk of privilege escalation via compromised pods."]}),"\n"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"3-block-service-accounts-from-assigning-privileged-roles",children:"3. Block Service Accounts from Assigning Privileged Roles"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Issue:"})," If a Service Account can modify ClusterRoleBindings, an attacker can escalate privileges.",(0,t.jsx)("br",{}),"\n",(0,t.jsx)(n.strong,{children:"Fix:"})," Restrict permissions to prevent SA privilege escalation."]}),"\n",(0,t.jsx)(n.h3,{id:"secure-cluster-role-definition",children:"Secure Cluster Role Definition"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:'apiVersion: rbac.authorization.k8s.io/v1\nkind: ClusterRole\nmetadata:\n  name: restricted-role\nrules:\n  - apiGroups: ["rbac.authorization.k8s.io"]\n    resources: ["rolebindings", "clusterrolebindings"]\n    verbs: []\n'})}),"\n",(0,t.jsx)(n.h3,{id:"why-it-matters-2",children:"Why It Matters"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Prevents"})," unauthorized privilege escalation.",(0,t.jsx)("br",{})]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Ensures"})," that only trusted admins can modify roles."]}),"\n"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"4-restrict-service-account-usage-per-namespace",children:"4. Restrict Service Account Usage Per Namespace"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Issue:"})," If a Service Account is not restricted to a specific namespace, attackers can use it across multiple namespaces.",(0,t.jsx)("br",{}),"\n",(0,t.jsx)(n.strong,{children:"Fix:"})," Limit Service Account scope using ",(0,t.jsx)(n.strong,{children:"RBAC policies"}),"."]}),"\n",(0,t.jsx)(n.h3,{id:"secure-role-binding-to-a-specific-namespace",children:"Secure Role Binding to a Specific Namespace"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"apiVersion: rbac.authorization.k8s.io/v1\nkind: RoleBinding\nmetadata:\n  name: restrict-service-account\n  namespace: secure-namespace\nsubjects:\n  - kind: ServiceAccount\n    name: limited-access\n    namespace: secure-namespace\nroleRef:\n  kind: Role\n  name: limited-role\n  apiGroup: rbac.authorization.k8s.io\n"})}),"\n",(0,t.jsx)(n.h3,{id:"why-it-matters-3",children:"Why It Matters"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Prevents"})," unauthorized Service Account use outside of its intended scope.",(0,t.jsx)("br",{})]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Limits"})," potential attack surface within the cluster."]}),"\n"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"5-rotate-and-expire-service-account-tokens",children:"5. Rotate and Expire Service Account Tokens"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Issue:"})," Long-lived Service Account tokens increase the risk of credential theft.",(0,t.jsx)("br",{}),"\n",(0,t.jsx)(n.strong,{children:"Fix:"})," Use ",(0,t.jsx)(n.strong,{children:"short-lived tokens"})," and enforce expiration policies."]}),"\n",(0,t.jsx)(n.h3,{id:"enable-token-request-api",children:"Enable Token Request API"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"apiVersion: v1\nkind: ServiceAccount\nmetadata:\n  name: secure-sa\n  namespace: default\nautomountServiceAccountToken: false\n"})}),"\n",(0,t.jsx)(n.p,{children:"Manually generate short-lived tokens:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"kubectl create token secure-sa --duration=10m\n"})}),"\n",(0,t.jsx)(n.h3,{id:"why-it-matters-4",children:"Why It Matters"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Minimizes"})," the risk of long-lived token exposure.",(0,t.jsx)("br",{})]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Reduces"})," the impact of token theft by enforcing expiration."]}),"\n"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"6-monitor-and-audit-service-account-usage",children:"6. Monitor and Audit Service Account Usage"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Issue:"})," Without auditing, Service Account abuse may go unnoticed.",(0,t.jsx)("br",{}),"\n",(0,t.jsx)(n.strong,{children:"Fix:"})," Enable ",(0,t.jsx)(n.strong,{children:"Kubernetes audit logs"})," to detect unauthorized access."]}),"\n",(0,t.jsx)(n.h3,{id:"enable-service-account-audit-logging",children:"Enable Service Account Audit Logging"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:'apiVersion: audit.k8s.io/v1\nkind: Policy\nrules:\n  - level: Metadata\n    verbs: ["create", "delete", "use"]\n    resources:\n      - group: ""\n        resources: ["serviceaccounts", "secrets"]\n'})}),"\n",(0,t.jsx)(n.p,{children:"Monitor logs for suspicious Service Account usage:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'kubectl logs -n kube-system | grep "serviceaccount"\n'})}),"\n",(0,t.jsx)(n.h3,{id:"why-it-matters-5",children:"Why It Matters"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Detects"})," unauthorized or unexpected Service Account activity.",(0,t.jsx)("br",{})]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Provides"})," visibility into potential privilege escalation attempts."]}),"\n"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,t.jsxs)(n.p,{children:["To protect Kubernetes from ",(0,t.jsx)(n.strong,{children:"Service Account abuse"}),", administrators should ",(0,t.jsx)(n.strong,{children:"disable automatic token mounting, enforce least privilege, restrict role bindings, limit Service Account scope, rotate tokens, and monitor SA usage"}),". These best practices ",(0,t.jsx)(n.strong,{children:"prevent privilege escalation and unauthorized access"}),"."]})]})}function u(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>c,x:()=>a});var i=s(6540);const t={},r=i.createContext(t);function c(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:c(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);