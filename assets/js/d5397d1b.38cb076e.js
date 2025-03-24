"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[6918],{8315:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>a,contentTitle:()=>c,default:()=>u,frontMatter:()=>o,metadata:()=>i,toc:()=>d});const i=JSON.parse('{"id":"best_practices/cluster_setup_and_hardening/network_security/intro","title":"Section Introduction","description":"Overview of Kubernetes network security hardening best practices, covering ingress and egress control, traffic isolation, DNS protection, and common attack mitigation strategies.","source":"@site/docs/best_practices/cluster_setup_and_hardening/network_security/intro.md","sourceDirName":"best_practices/cluster_setup_and_hardening/network_security","slug":"/best_practices/cluster_setup_and_hardening/network_security/intro","permalink":"/k8s_security/docs/best_practices/cluster_setup_and_hardening/network_security/intro","draft":false,"unlisted":false,"editUrl":"https://github.com/geek-kb/k8s_security/edit/main/docs/best_practices/cluster_setup_and_hardening/network_security/intro.md","tags":[],"version":"current","lastUpdatedBy":"Itai Ganot","lastUpdatedAt":1742801266000,"sidebarPosition":1,"frontMatter":{"sidebar_position":1,"title":"Section Introduction","description":"Overview of Kubernetes network security hardening best practices, covering ingress and egress control, traffic isolation, DNS protection, and common attack mitigation strategies."},"sidebar":"default","previous":{"title":"Securing etcd in Kubernetes","permalink":"/k8s_security/docs/best_practices/cluster_setup_and_hardening/control_plane_security/etcd_security_mitigation"},"next":{"title":"DDoS Mitigation in Kubernetes","permalink":"/k8s_security/docs/best_practices/cluster_setup_and_hardening/network_security/ddos_mitigation"}}');var n=r(4848),s=r(8453);const o={sidebar_position:1,title:"Section Introduction",description:"Overview of Kubernetes network security hardening best practices, covering ingress and egress control, traffic isolation, DNS protection, and common attack mitigation strategies."},c="Network Security in Kubernetes",a={},d=[{value:"What You&#39;ll Learn",id:"what-youll-learn",level:2},{value:"Network Policies",id:"network-policies",level:3},{value:"Egress Control",id:"egress-control",level:3},{value:"Ingress Security",id:"ingress-security",level:3},{value:"Service Mesh Security",id:"service-mesh-security",level:3},{value:"DNS Security",id:"dns-security",level:3},{value:"Exposed Dashboard Mitigation",id:"exposed-dashboard-mitigation",level:3},{value:"DDoS Mitigation",id:"ddos-mitigation",level:3},{value:"Traffic Hijacking Mitigation",id:"traffic-hijacking-mitigation",level:3},{value:"Summary",id:"summary",level:2}];function l(e){const t={a:"a",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",p:"p",strong:"strong",...(0,s.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.header,{children:(0,n.jsx)(t.h1,{id:"network-security-in-kubernetes",children:"Network Security in Kubernetes"})}),"\n",(0,n.jsx)(t.p,{children:"Kubernetes networking is powerful but inherently open by default. Pods can typically communicate with each other freely across namespaces and nodes, and services may be unintentionally exposed to the public internet. Without proactive controls, this openness can be exploited by attackers to move laterally, exfiltrate data, or disrupt workloads."}),"\n",(0,n.jsxs)(t.p,{children:["This section focuses on securing the Kubernetes network layer through ",(0,n.jsx)(t.strong,{children:"network policies"}),", ",(0,n.jsx)(t.strong,{children:"DNS protections"}),", ",(0,n.jsx)(t.strong,{children:"ingress and egress control"}),", ",(0,n.jsx)(t.strong,{children:"service mesh security"}),", and defenses against ",(0,n.jsx)(t.strong,{children:"DDoS"}),", ",(0,n.jsx)(t.strong,{children:"traffic hijacking"}),", and ",(0,n.jsx)(t.strong,{children:"dashboard exposure"}),"."]}),"\n",(0,n.jsx)(t.hr,{}),"\n",(0,n.jsx)(t.h2,{id:"what-youll-learn",children:"What You'll Learn"}),"\n",(0,n.jsx)(t.h3,{id:"network-policies",children:(0,n.jsx)(t.a,{href:"/docs/best_practices/cluster_setup_and_hardening/network_security/network_policies",children:"Network Policies"})}),"\n",(0,n.jsx)(t.p,{children:"Learn how to use Kubernetes Network Policies to restrict pod-to-pod communication and enforce namespace boundaries, reducing lateral movement risk."}),"\n",(0,n.jsx)(t.hr,{}),"\n",(0,n.jsx)(t.h3,{id:"egress-control",children:(0,n.jsx)(t.a,{href:"/docs/best_practices/cluster_setup_and_hardening/network_security/egress_control",children:"Egress Control"})}),"\n",(0,n.jsx)(t.p,{children:"Prevent workloads from accessing external services unnecessarily. Egress control helps stop data exfiltration and restricts what services pods can reach outside the cluster."}),"\n",(0,n.jsx)(t.hr,{}),"\n",(0,n.jsx)(t.h3,{id:"ingress-security",children:(0,n.jsx)(t.a,{href:"/docs/best_practices/cluster_setup_and_hardening/network_security/ingress_security",children:"Ingress Security"})}),"\n",(0,n.jsx)(t.p,{children:"Harden ingress traffic with TLS, authentication, and hostname restrictions. Properly secure ingress controllers to avoid exposing internal services."}),"\n",(0,n.jsx)(t.hr,{}),"\n",(0,n.jsx)(t.h3,{id:"service-mesh-security",children:(0,n.jsx)(t.a,{href:"/docs/best_practices/cluster_setup_and_hardening/network_security/service_mesh_security",children:"Service Mesh Security"})}),"\n",(0,n.jsx)(t.p,{children:"Explore how service meshes like Istio or Linkerd improve security through mutual TLS (mTLS), traffic policies, and workload identity enforcement."}),"\n",(0,n.jsx)(t.hr,{}),"\n",(0,n.jsx)(t.h3,{id:"dns-security",children:(0,n.jsx)(t.a,{href:"/docs/best_practices/cluster_setup_and_hardening/network_security/dns_security",children:"DNS Security"})}),"\n",(0,n.jsx)(t.p,{children:"Protect cluster DNS to avoid poisoning, spoofing, or leaking service discovery data. Learn how to secure CoreDNS and monitor DNS queries."}),"\n",(0,n.jsx)(t.hr,{}),"\n",(0,n.jsx)(t.h3,{id:"exposed-dashboard-mitigation",children:(0,n.jsx)(t.a,{href:"/docs/best_practices/cluster_setup_and_hardening/network_security/exposed_dashboard_mitigation",children:"Exposed Dashboard Mitigation"})}),"\n",(0,n.jsx)(t.p,{children:"Understand how attackers abuse exposed Kubernetes Dashboards and how to restrict access, enforce authentication, and remove unnecessary exposure."}),"\n",(0,n.jsx)(t.hr,{}),"\n",(0,n.jsx)(t.h3,{id:"ddos-mitigation",children:(0,n.jsx)(t.a,{href:"/docs/best_practices/cluster_setup_and_hardening/network_security/ddos_mitigation",children:"DDoS Mitigation"})}),"\n",(0,n.jsx)(t.p,{children:"Learn techniques to protect your cluster from denial-of-service attacks targeting public services, ingress gateways, or load balancers."}),"\n",(0,n.jsx)(t.hr,{}),"\n",(0,n.jsx)(t.h3,{id:"traffic-hijacking-mitigation",children:(0,n.jsx)(t.a,{href:"/docs/best_practices/cluster_setup_and_hardening/network_security/traffic_hijacking_mitigation",children:"Traffic Hijacking Mitigation"})}),"\n",(0,n.jsx)(t.p,{children:"Prevent attackers from intercepting or redirecting traffic using misconfigured DNS, routing rules, or compromised services inside the cluster."}),"\n",(0,n.jsx)(t.hr,{}),"\n",(0,n.jsx)(t.h2,{id:"summary",children:"Summary"}),"\n",(0,n.jsx)(t.p,{children:"Kubernetes networking needs to be intentionally restricted and monitored. This section provides actionable guidance for securing how workloads communicate both internally and externally."}),"\n",(0,n.jsx)(t.p,{children:"By applying these practices, you'll reduce exposure, enforce traffic boundaries, and gain more control over how your applications interact with one another and the outside world."})]})}function u(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},8453:(e,t,r)=>{r.d(t,{R:()=>o,x:()=>c});var i=r(6540);const n={},s=i.createContext(n);function o(e){const t=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:o(e.components),i.createElement(s.Provider,{value:t},e.children)}}}]);