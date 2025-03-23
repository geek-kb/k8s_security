"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[1488],{8453:(e,i,n)=>{n.d(i,{R:()=>a,x:()=>c});var r=n(6540);const s={},t=r.createContext(s);function a(e){const i=r.useContext(t);return r.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function c(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),r.createElement(t.Provider,{value:i},e.children)}},9957:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>o,contentTitle:()=>c,default:()=>u,frontMatter:()=>a,metadata:()=>r,toc:()=>l});const r=JSON.parse('{"id":"best_practices/cluster_setup_and_hardening/api_server_security/compromised_api_server_mitigation","title":"Securing the Kubernetes API Server","description":"Best practices for protecting the Kubernetes API server against unauthorized access and exploitation.","source":"@site/docs/best_practices/cluster_setup_and_hardening/api_server_security/compromised_api_server_mitigation.md","sourceDirName":"best_practices/cluster_setup_and_hardening/api_server_security","slug":"/best_practices/cluster_setup_and_hardening/api_server_security/compromised_api_server_mitigation","permalink":"/k8s_security/docs/best_practices/cluster_setup_and_hardening/api_server_security/compromised_api_server_mitigation","draft":false,"unlisted":false,"editUrl":"https://github.com/geek-kb/k8s_security/edit/main/docs/best_practices/cluster_setup_and_hardening/api_server_security/compromised_api_server_mitigation.md","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1,"title":"Securing the Kubernetes API Server","description":"Best practices for protecting the Kubernetes API server against unauthorized access and exploitation."},"sidebar":"default","previous":{"title":"Kube-Bench: Kubernetes CIS Benchmarking Tool","permalink":"/k8s_security/docs/best_practices/cluster_setup_and_hardening/cis_benchmark_kube_bench"},"next":{"title":"Securing Kubernetes Admission Controllers","permalink":"/k8s_security/docs/best_practices/cluster_setup_and_hardening/api_server_security/misconfigured_admission_controllers_mitigation"}}');var s=n(4848),t=n(8453);const a={sidebar_position:1,title:"Securing the Kubernetes API Server",description:"Best practices for protecting the Kubernetes API server against unauthorized access and exploitation."},c="Securing the Kubernetes API Server",o={},l=[{value:"Restrict API Access",id:"restrict-api-access",level:2},{value:"Firewall Rule Example",id:"firewall-rule-example",level:4},{value:"CiliumNetworkPolicy Configuration Example",id:"ciliumnetworkpolicy-configuration-example",level:4},{value:"Additional Best Practices",id:"additional-best-practices",level:3},{value:"Enforce Authentication and Authorization",id:"enforce-authentication-and-authorization",level:2},{value:"RBAC Configuration Example",id:"rbac-configuration-example",level:4},{value:"Additional Best Practices",id:"additional-best-practices-1",level:3},{value:"Secure API Server Communication",id:"secure-api-server-communication",level:2},{value:"Enable TLS in API Server Configuration",id:"enable-tls-in-api-server-configuration",level:4},{value:"Additional Best Practices",id:"additional-best-practices-2",level:3},{value:"Use Network Policies to Restrict API Server Access",id:"use-network-policies-to-restrict-api-server-access",level:2},{value:"Example Network Policy to Restrict API Server Access",id:"example-network-policy-to-restrict-api-server-access",level:4},{value:"Additional Best Practices",id:"additional-best-practices-3",level:3},{value:"Enable Audit Logging for API Server Requests",id:"enable-audit-logging-for-api-server-requests",level:2},{value:"Enable Logging in <code>kube-apiserver</code>",id:"enable-logging-in-kube-apiserver",level:4},{value:"Example Audit Policy",id:"example-audit-policy",level:4},{value:"Additional Best Practices",id:"additional-best-practices-4",level:3},{value:"Conclusion",id:"conclusion",level:2}];function d(e){const i={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(i.header,{children:(0,s.jsx)(i.h1,{id:"securing-the-kubernetes-api-server",children:"Securing the Kubernetes API Server"})}),"\n",(0,s.jsx)(i.p,{children:"A compromised Kubernetes API server can lead to unauthorized access, data breaches, and full cluster compromise. Attackers may exploit misconfigurations or exposed endpoints to manipulate workloads, disrupt services, or exfiltrate sensitive data."}),"\n",(0,s.jsx)(i.p,{children:"To secure the API server, implement the following best practices."}),"\n",(0,s.jsx)(i.hr,{}),"\n",(0,s.jsx)(i.h2,{id:"restrict-api-access",children:"Restrict API Access"}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.strong,{children:"Issue:"})," Publicly exposed API servers allow unauthorized access.",(0,s.jsx)("br",{}),"\n",(0,s.jsx)(i.strong,{children:"Fix:"})," Use firewalls, private networking or CiliumNetworkPolicy to limit access."]}),"\n",(0,s.jsx)(i.h4,{id:"firewall-rule-example",children:"Firewall Rule Example"}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-bash",children:"# Allow access to the API server only from a specific IP range\niptables -A INPUT -p tcp -s <trusted-ip-range> --dport 6443 -j ACCEPT\niptables -A INPUT -p tcp --dport 6443 -j DROP\n"})}),"\n",(0,s.jsx)(i.h4,{id:"ciliumnetworkpolicy-configuration-example",children:"CiliumNetworkPolicy Configuration Example"}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-yaml",children:'apiVersion: "cilium.io/v2"\nkind: CiliumNetworkPolicy\nmetadata:\n  name: allow-dev-to-apiserver\n  namespace: kube-system # API server runs in kube-system\nspec:\n  endpointSelector: {} # Applies to all endpoints in the cluster\n  egress:\n    - toEntities:\n        - kube-apiserver # Cilium entity representing the Kubernetes API server\n      fromEndpoints:\n        - matchLabels:\n            env: dev\n      toPorts:\n        - ports:\n            - port: "6443"\n              protocol: TCP\n'})}),"\n",(0,s.jsx)(i.h3,{id:"additional-best-practices",children:"Additional Best Practices"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"Ensure API requests are only allowed from internal or explicitly authorized networks."}),"\n",(0,s.jsx)(i.li,{children:"Use a private cluster with a VPN or bastion host for access."}),"\n"]}),"\n",(0,s.jsx)(i.hr,{}),"\n",(0,s.jsx)(i.h2,{id:"enforce-authentication-and-authorization",children:"Enforce Authentication and Authorization"}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.strong,{children:"Issue:"})," Lack of authentication enables any user to access the API server.",(0,s.jsx)("br",{}),"\n",(0,s.jsx)(i.strong,{children:"Fix:"})," Enable Role-Based Access Control (RBAC) and use secure authentication methods."]}),"\n",(0,s.jsx)(i.h4,{id:"rbac-configuration-example",children:"RBAC Configuration Example"}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-yaml",children:'apiVersion: rbac.authorization.k8s.io/v1\nkind: Role\nmetadata:\n  namespace: default\n  name: pod-reader\nrules:\n  - apiGroups: [""]\n    resources: ["pods"]\n    verbs: ["get", "list"]\n---\napiVersion: rbac.authorization.k8s.io/v1\nkind: RoleBinding\nmetadata:\n  name: read-pods\n  namespace: default\nsubjects:\n  - kind: User\n    name: "api-user"\n    apiGroup: rbac.authorization.k8s.io\nroleRef:\n  kind: Role\n  name: pod-reader\n  apiGroup: rbac.authorization.k8s.io\n'})}),"\n",(0,s.jsx)(i.h3,{id:"additional-best-practices-1",children:"Additional Best Practices"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"Use strong authentication (OIDC, service account tokens, or certificates)."}),"\n",(0,s.jsx)(i.li,{children:"Ensure API requests require proper identity verification before access."}),"\n"]}),"\n",(0,s.jsx)(i.hr,{}),"\n",(0,s.jsx)(i.h2,{id:"secure-api-server-communication",children:"Secure API Server Communication"}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.strong,{children:"Issue:"})," Unencrypted traffic to the API server allows interception of sensitive data.",(0,s.jsx)("br",{}),"\n",(0,s.jsx)(i.strong,{children:"Fixes:"})]}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"Enforce TLS encryption for all API server communications."}),"\n",(0,s.jsx)(i.li,{children:"Use certificates to authenticate API requests."}),"\n"]}),"\n",(0,s.jsx)(i.h4,{id:"enable-tls-in-api-server-configuration",children:"Enable TLS in API Server Configuration"}),"\n",(0,s.jsxs)(i.p,{children:["Modify ",(0,s.jsx)(i.code,{children:"kube-apiserver"})," startup parameters:"]}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-bash",children:"--tls-cert-file=/etc/kubernetes/pki/apiserver.crt\n--tls-private-key-file=/etc/kubernetes/pki/apiserver.key\n"})}),"\n",(0,s.jsx)(i.h3,{id:"additional-best-practices-2",children:"Additional Best Practices"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"Use a trusted CA to sign API server certificates."}),"\n",(0,s.jsx)(i.li,{children:"Rotate certificates periodically."}),"\n"]}),"\n",(0,s.jsx)(i.hr,{}),"\n",(0,s.jsx)(i.h2,{id:"use-network-policies-to-restrict-api-server-access",children:"Use Network Policies to Restrict API Server Access"}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.strong,{children:"Issue:"})," Unrestricted network access allows unauthorized users to reach the API server.",(0,s.jsx)("br",{}),"\n",(0,s.jsx)(i.strong,{children:"Fix:"})," Block external access using Kubernetes Network Policies."]}),"\n",(0,s.jsx)(i.h4,{id:"example-network-policy-to-restrict-api-server-access",children:"Example Network Policy to Restrict API Server Access"}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-yaml",children:"apiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: restrict-api-access\n  namespace: default\nspec:\n  podSelector:\n    matchLabels:\n      component: kube-apiserver\n  policyTypes:\n    - Ingress\n  ingress:\n    - from:\n        - podSelector:\n            matchLabels:\n              role: internal\n"})}),"\n",(0,s.jsx)(i.h3,{id:"additional-best-practices-3",children:"Additional Best Practices"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"Limit API access to trusted pods, services, and nodes."}),"\n",(0,s.jsx)(i.li,{children:"Use service meshes (e.g., Istio, Linkerd) for additional API request filtering."}),"\n"]}),"\n",(0,s.jsx)(i.hr,{}),"\n",(0,s.jsx)(i.h2,{id:"enable-audit-logging-for-api-server-requests",children:"Enable Audit Logging for API Server Requests"}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.strong,{children:"Issue:"})," Lack of logging prevents detection of unauthorized access.",(0,s.jsx)("br",{}),"\n",(0,s.jsx)(i.strong,{children:"Fix:"})," Enable audit logging to monitor API server activity."]}),"\n",(0,s.jsxs)(i.h4,{id:"enable-logging-in-kube-apiserver",children:["Enable Logging in ",(0,s.jsx)(i.code,{children:"kube-apiserver"})]}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-bash",children:"--audit-log-path=/var/log/kubernetes/audit.log\n--audit-policy-file=/etc/kubernetes/audit-policy.yaml\n"})}),"\n",(0,s.jsx)(i.h4,{id:"example-audit-policy",children:"Example Audit Policy"}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-yaml",children:'apiVersion: audit.k8s.io/v1\nkind: Policy\nrules:\n  - level: Metadata\n    resources:\n      - group: ""\n        resources: ["pods"]\n'})}),"\n",(0,s.jsx)(i.h3,{id:"additional-best-practices-4",children:"Additional Best Practices"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"Send audit logs to a centralized logging system (e.g., Elasticsearch, Loki)."}),"\n",(0,s.jsx)(i.li,{children:"Set up alerting for unusual API requests."}),"\n"]}),"\n",(0,s.jsx)(i.hr,{}),"\n",(0,s.jsx)(i.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,s.jsx)(i.p,{children:"Securing the Kubernetes API server is critical to preventing unauthorized access and protecting the cluster from external threats."}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"Restrict API access with firewalls and network policies."}),"\n",(0,s.jsx)(i.li,{children:"Use RBAC and strong authentication to enforce security."}),"\n",(0,s.jsx)(i.li,{children:"Encrypt API communications with TLS."}),"\n",(0,s.jsx)(i.li,{children:"Monitor API requests through audit logging."}),"\n"]}),"\n",(0,s.jsx)(i.p,{children:"By implementing these best practices, Kubernetes administrators can reduce the risk of API server compromise and unauthorized cluster access."})]})}function u(e={}){const{wrapper:i}={...(0,t.R)(),...e.components};return i?(0,s.jsx)(i,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}}}]);