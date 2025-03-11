"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[3614],{4711:(e,s,i)=>{i.r(s),i.d(s,{assets:()=>o,contentTitle:()=>c,default:()=>p,frontMatter:()=>a,metadata:()=>n,toc:()=>l});const n=JSON.parse('{"id":"attack_vectors/compromised_api_server","title":"Compromised API Server","description":"Exploiting Kubernetes API server vulnerabilities and best practices for securing API endpoints.","source":"@site/docs/attack_vectors/compromised_api_server.md","sourceDirName":"attack_vectors","slug":"/attack_vectors/compromised_api_server","permalink":"/k8s_security/docs/attack_vectors/compromised_api_server","draft":false,"unlisted":false,"editUrl":"https://github.com/geek-kb/k8s_security/edit/main/docs/attack_vectors/compromised_api_server.md","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1,"title":"Compromised API Server","description":"Exploiting Kubernetes API server vulnerabilities and best practices for securing API endpoints."},"sidebar":"guidesSidebar","previous":{"title":"Common Attack Vectors Examples","permalink":"/k8s_security/docs/category/common-attack-vectors-examples-1"},"next":{"title":"Section Intro","permalink":"/k8s_security/docs/attack_vectors/intro"}}');var t=i(4848),r=i(8453);const a={sidebar_position:1,title:"Compromised API Server",description:"Exploiting Kubernetes API server vulnerabilities and best practices for securing API endpoints."},c="Compromised API Server",o={},l=[{value:"Exploitation Steps: Exposed API Endpoints",id:"exploitation-steps-exposed-api-endpoints",level:2},{value:"Access API Server Without Authentication",id:"access-api-server-without-authentication",level:3},{value:"Delete Critical Resources",id:"delete-critical-resources",level:3},{value:"Result",id:"result",level:3},{value:"Mitigation Techniques and Fixes",id:"mitigation-techniques-and-fixes",level:2},{value:"1. Restrict API Access",id:"1-restrict-api-access",level:3},{value:"Firewall Rule Example",id:"firewall-rule-example",level:4},{value:"2. Enable Authentication",id:"2-enable-authentication",level:3},{value:"Enforcing Authentication via RBAC",id:"enforcing-authentication-via-rbac",level:4},{value:"3. Use Network Policies",id:"3-use-network-policies",level:3},{value:"Example Network Policy to Restrict API Server Access",id:"example-network-policy-to-restrict-api-server-access",level:4},{value:"Conclusion",id:"conclusion",level:2}];function d(e){const s={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s.header,{children:(0,t.jsx)(s.h1,{id:"compromised-api-server",children:"Compromised API Server"})}),"\n",(0,t.jsxs)(s.p,{children:["A ",(0,t.jsx)(s.strong,{children:"compromised API server"})," can provide attackers with ",(0,t.jsx)(s.strong,{children:"unauthorized access"})," to your ",(0,t.jsx)(s.strong,{children:"Kubernetes cluster"}),", allowing them to ",(0,t.jsx)(s.strong,{children:"view"}),", ",(0,t.jsx)(s.strong,{children:"modify"}),", or ",(0,t.jsx)(s.strong,{children:"delete resources"}),". This type of attack can lead to severe disruptions, including unauthorized data exposure, service downtime, and potential breaches of sensitive environments."]}),"\n",(0,t.jsx)(s.hr,{}),"\n",(0,t.jsx)(s.h2,{id:"exploitation-steps-exposed-api-endpoints",children:"Exploitation Steps: Exposed API Endpoints"}),"\n",(0,t.jsx)(s.p,{children:"An attacker identifies an exposed API server using a port scan:"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-bash",children:"nmap -p 6443 <cluster-ip>\n"})}),"\n",(0,t.jsx)(s.h3,{id:"access-api-server-without-authentication",children:"Access API Server Without Authentication"}),"\n",(0,t.jsx)(s.p,{children:"The attacker tries to list all pods using a curl request:"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-bash",children:"curl -k https://<api-server-ip>:6443/api/v1/pods\n"})}),"\n",(0,t.jsx)(s.h3,{id:"delete-critical-resources",children:"Delete Critical Resources"}),"\n",(0,t.jsx)(s.p,{children:"The attacker attempts to delete a specific pod:"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-bash",children:"curl -k -X DELETE https://<api-server-ip>:6443/api/v1/namespaces/default/pods/victim-pod\n"})}),"\n",(0,t.jsx)(s.h3,{id:"result",children:"Result"}),"\n",(0,t.jsx)(s.p,{children:"The attacker can delete pods, causing service disruptions and potentially leading to a Denial of Service (DoS)."}),"\n",(0,t.jsx)(s.hr,{}),"\n",(0,t.jsx)(s.h2,{id:"mitigation-techniques-and-fixes",children:"Mitigation Techniques and Fixes"}),"\n",(0,t.jsx)(s.h3,{id:"1-restrict-api-access",children:"1. Restrict API Access"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Issue:"})," Publicly exposed API server allows unauthorized access.",(0,t.jsx)("br",{})]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Fix:"})," Use firewalls or private networking to limit access."]}),"\n"]}),"\n",(0,t.jsx)(s.h4,{id:"firewall-rule-example",children:"Firewall Rule Example"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-bash",children:"# Allow access to the API server only from a specific IP range\niptables -A INPUT -p tcp -s <trusted-ip-range> --dport 6443 -j ACCEPT\niptables -A INPUT -p tcp --dport 6443 -j DROP\n"})}),"\n",(0,t.jsx)(s.h3,{id:"2-enable-authentication",children:"2. Enable Authentication"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Issue:"})," Lack of authentication enables any user to access the API server.",(0,t.jsx)("br",{})]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Fix:"})," Implement Role-Based Access Control (RBAC) and use API server tokens for secure access."]}),"\n"]}),"\n",(0,t.jsx)(s.h4,{id:"enforcing-authentication-via-rbac",children:"Enforcing Authentication via RBAC"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-yaml",children:'apiVersion: rbac.authorization.k8s.io/v1\nkind: Role\nmetadata:\n  namespace: default\n  name: pod-reader\nrules:\n- apiGroups: [""]\n  resources: ["pods"]\n  verbs: ["get", "list"]\n---\napiVersion: rbac.authorization.k8s.io/v1\nkind: RoleBinding\nmetadata:\n  name: read-pods\n  namespace: default\nsubjects:\n- kind: User\n  name: "api-user"\n  apiGroup: rbac.authorization.k8s.io\nroleRef:\n  kind: Role\n  name: pod-reader\n  apiGroup: rbac.authorization.k8s.io\n'})}),"\n",(0,t.jsx)(s.h3,{id:"3-use-network-policies",children:"3. Use Network Policies"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Issue:"})," External access to the API server is not restricted.",(0,t.jsx)("br",{})]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Fix:"})," Block external access using Kubernetes Network Policies."]}),"\n"]}),"\n",(0,t.jsx)(s.h4,{id:"example-network-policy-to-restrict-api-server-access",children:"Example Network Policy to Restrict API Server Access"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-yaml",children:"apiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: restrict-api-access\n  namespace: default\nspec:\n  podSelector:\n    matchLabels:\n      component: kube-apiserver\n  policyTypes:\n    - Ingress\n  ingress:\n    - from:\n        - podSelector:\n            matchLabels:\n              role: internal\n"})}),"\n",(0,t.jsx)(s.hr,{}),"\n",(0,t.jsx)(s.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,t.jsx)(s.p,{children:"Securing your Kubernetes API server is critical to maintaining the integrity and security of your cluster. Implement best practices by restricting API access, enabling authentication through Role-Based Access Control (RBAC), and applying network policies to prevent unauthorized access. Regularly monitor and audit API server logs to detect and respond to potential threats promptly."})]})}function p(e={}){const{wrapper:s}={...(0,r.R)(),...e.components};return s?(0,t.jsx)(s,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},8453:(e,s,i)=>{i.d(s,{R:()=>a,x:()=>c});var n=i(6540);const t={},r=n.createContext(t);function a(e){const s=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function c(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),n.createElement(r.Provider,{value:s},e.children)}}}]);