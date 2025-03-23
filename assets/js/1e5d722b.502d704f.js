"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[4605],{1562:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>a,contentTitle:()=>c,default:()=>h,frontMatter:()=>o,metadata:()=>r,toc:()=>l});const r=JSON.parse('{"id":"attack_vectors/intro","title":"Section Introduction","description":"An overview of common Kubernetes attack vectors and how attackers exploit misconfigurations.","source":"@site/docs/attack_vectors/intro.md","sourceDirName":"attack_vectors","slug":"/attack_vectors/intro","permalink":"/k8s_security/docs/attack_vectors/intro","draft":false,"unlisted":false,"editUrl":"https://github.com/geek-kb/k8s_security/edit/main/docs/attack_vectors/intro.md","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1,"title":"Section Introduction","description":"An overview of common Kubernetes attack vectors and how attackers exploit misconfigurations."},"sidebar":"guidesSidebar","previous":{"title":"Introduction to Kubernetes Security","permalink":"/k8s_security/docs/intro"},"next":{"title":"Compromised API Server","permalink":"/k8s_security/docs/attack_vectors/compromised_api_server"}}');var n=t(4848),i=t(8453);const o={sidebar_position:1,title:"Section Introduction",description:"An overview of common Kubernetes attack vectors and how attackers exploit misconfigurations."},c="Common Kubernetes Attack Vectors",a={},l=[{value:"<strong>Warning: Security Risk</strong>",id:"warning-security-risk",level:2}];function d(e){const s={a:"a",h1:"h1",h2:"h2",header:"header",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.header,{children:(0,n.jsx)(s.h1,{id:"common-kubernetes-attack-vectors",children:"Common Kubernetes Attack Vectors"})}),"\n",(0,n.jsxs)(s.p,{children:["Kubernetes security threats arise from ",(0,n.jsx)(s.strong,{children:"misconfigurations, weak access controls, and unprotected workloads"}),". Attackers exploit these vulnerabilities to ",(0,n.jsx)(s.strong,{children:"escalate privileges, move laterally, and compromise clusters"}),"."]}),"\n",(0,n.jsxs)(s.p,{children:["This section explores ",(0,n.jsx)(s.strong,{children:"common Kubernetes attack vectors"}),", including:"]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.a,{href:"/docs/attack_vectors/compromised_api_server",children:"Compromised API Server"})}),": Exploiting exposed API endpoints."]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.a,{href:"/docs/attack_vectors/exposed_dashboard",children:"Exposed Dashboard"})}),": Unauthorized access to Kubernetes dashboards."]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.a,{href:"/docs/attack_vectors/insecure_secrets_management",children:"Insecure Secrets Management"})}),": Leaking secrets due to weak storage and access controls."]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.a,{href:"/docs/attack_vectors/lack_of_network_policies",children:"Lack of Network Policies"})}),": Allowing lateral movement within the cluster."]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.a,{href:"/docs/attack_vectors/privileged_containers",children:"Privileged Containers"})}),": Using overprivileged containers to break out of the sandbox."]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.a,{href:"/docs/attack_vectors/container_escape",children:"Container Escape"})}),": Exploiting vulnerabilities to break out of a container and gain host access."]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.a,{href:"/docs/attack_vectors/insecure_rbac_permissions",children:"Insecure RBAC Permissions"})}),": Misconfigured Role-Based Access Control (RBAC) settings leading to unauthorized access."]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.a,{href:"/docs/attack_vectors/exposed_kubelet_api",children:"Exposed Kubelet API"})}),": Unauthorized access to Kubelet APIs allowing attackers to control nodes or pods."]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.a,{href:"/docs/attack_vectors/supply_chain_attacks",children:"Supply Chain Attacks"})}),": Injecting malicious code into container images or dependencies."]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.a,{href:"/docs/attack_vectors/supply_chain_attacks",children:"Supply Chain Attacks - Compromised Helm Charts"})}),": Deploying insecure or tampered Helm charts that introduce vulnerabilities."]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.a,{href:"/docs/attack_vectors/unrestricted_etcd_access",children:"Unrestricted etcd Access"})}),": Accessing etcd storage to retrieve secrets and cluster configurations."]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.a,{href:"/docs/attack_vectors/misconfigured_admission_controllers",children:"Cluster Takeover via Misconfigured Admission Controllers and Malicious Webhooks"})}),": Exploiting improperly secured admission controllers and webhooks to run unauthorized workloads."]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.a,{href:"/docs/attack_vectors/ddos_attacks",children:"Denial of Service (DoS) Attacks"})}),": Exploiting Kubernetes resource limits to exhaust cluster resources."]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.a,{href:"/docs/attack_vectors/unrestricted_hostpath_mounts",children:"Unrestricted HostPath Mounts"})}),": Allowing pods to mount the host filesystem, leading to potential system compromise."]}),"\n"]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.a,{href:"/docs/attack_vectors/insecure_csi_drivers",children:"Exploiting Insecure CSI Drivers"})}),": Attacking Kubernetes Container Storage Interface (CSI) drivers to gain unauthorized access to persistent storage."]}),"\n"]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.a,{href:"/docs/attack_vectors/compromised_sidecars",children:"Compromised Sidecars"})}),": Exploiting sidecar containers to attack the main application."]}),"\n"]}),"\n",(0,n.jsxs)(s.p,{children:["Each article provides ",(0,n.jsx)(s.strong,{children:"examples, real-world risks, and mitigation strategies"})," to help secure Kubernetes clusters against these threats."]}),"\n",(0,n.jsx)(s.hr,{}),"\n",(0,n.jsx)(s.h2,{id:"warning-security-risk",children:(0,n.jsx)(s.strong,{children:"Warning: Security Risk"})}),"\n",(0,n.jsxs)(s.p,{children:["The information and the scripts included in this section are intended for ",(0,n.jsx)(s.strong,{children:"educational and security research purposes only"}),". They demonstrate how attackers exploit misconfigurations and vulnerabilities in Kubernetes clusters. Running these scripts on a production system or in an unauthorized environment can lead to ",(0,n.jsx)(s.strong,{children:"severe security breaches, data loss, and system compromise"}),"."]}),"\n",(0,n.jsxs)(s.p,{children:["Use this content only in a ",(0,n.jsx)(s.strong,{children:"controlled, isolated testing environment"})," where you have explicit permission. Misuse of this information may violate company policies or legal regulations."]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:"You are responsible for how you use this information. Proceed with caution."})})]})}function h(e={}){const{wrapper:s}={...(0,i.R)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},8453:(e,s,t)=>{t.d(s,{R:()=>o,x:()=>c});var r=t(6540);const n={},i=r.createContext(n);function o(e){const s=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function c(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:o(e.components),r.createElement(i.Provider,{value:s},e.children)}}}]);