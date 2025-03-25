"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[3590],{6284:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>a,contentTitle:()=>l,default:()=>h,frontMatter:()=>o,metadata:()=>i,toc:()=>c});const i=JSON.parse('{"id":"best_practices/cluster_setup_and_hardening/network_security/ddos_mitigation","title":"DDoS Mitigation in Kubernetes","description":"Learn strategies to mitigate Distributed Denial-of-Service (DDoS) attacks in Kubernetes clusters.","source":"@site/docs/best_practices/cluster_setup_and_hardening/network_security/ddos_mitigation.md","sourceDirName":"best_practices/cluster_setup_and_hardening/network_security","slug":"/best_practices/cluster_setup_and_hardening/network_security/ddos_mitigation","permalink":"/docs/best_practices/cluster_setup_and_hardening/network_security/ddos_mitigation","draft":false,"unlisted":false,"tags":[],"version":"current","lastUpdatedBy":"Itai Ganot","lastUpdatedAt":1741718538000,"sidebarPosition":2,"frontMatter":{"sidebar_position":2,"title":"DDoS Mitigation in Kubernetes","description":"Learn strategies to mitigate Distributed Denial-of-Service (DDoS) attacks in Kubernetes clusters."},"sidebar":"default","previous":{"title":"Section Introduction","permalink":"/docs/best_practices/cluster_setup_and_hardening/network_security/intro"},"next":{"title":"DNS Security in Kubernetes","permalink":"/docs/best_practices/cluster_setup_and_hardening/network_security/dns_security"}}');var t=s(4848),r=s(8453);const o={sidebar_position:2,title:"DDoS Mitigation in Kubernetes",description:"Learn strategies to mitigate Distributed Denial-of-Service (DDoS) attacks in Kubernetes clusters."},l="DDoS Mitigation in Kubernetes",a={},c=[{value:"Understanding DDoS Attacks in Kubernetes",id:"understanding-ddos-attacks-in-kubernetes",level:2},{value:"Best Practices for DDoS Mitigation",id:"best-practices-for-ddos-mitigation",level:2},{value:"1. Use Cloud Provider DDoS Protection",id:"1-use-cloud-provider-ddos-protection",level:3},{value:"2. Implement Rate Limiting on Ingress Controllers",id:"2-implement-rate-limiting-on-ingress-controllers",level:3},{value:"Example: NGINX Rate Limiting",id:"example-nginx-rate-limiting",level:4},{value:"3. Enable Web Application Firewall (WAF)",id:"3-enable-web-application-firewall-waf",level:3},{value:"Options",id:"options",level:4},{value:"4. Use Kubernetes Network Policies",id:"4-use-kubernetes-network-policies",level:3},{value:"5. Configure API Server Rate Limits",id:"5-configure-api-server-rate-limits",level:3},{value:"6. Deploy an Anti-DDoS DaemonSet",id:"6-deploy-an-anti-ddos-daemonset",level:3},{value:"Key Takeaways",id:"key-takeaways",level:2}];function d(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"ddos-mitigation-in-kubernetes",children:"DDoS Mitigation in Kubernetes"})}),"\n",(0,t.jsxs)(n.p,{children:["Distributed Denial-of-Service (",(0,t.jsx)(n.strong,{children:"DDoS"}),") attacks are a common security threat where attackers attempt to overwhelm a system with excessive traffic, causing service disruptions. Kubernetes clusters, especially those exposed to the internet, are potential targets. Implementing DDoS mitigation strategies is crucial for maintaining cluster availability and resilience."]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"understanding-ddos-attacks-in-kubernetes",children:"Understanding DDoS Attacks in Kubernetes"}),"\n",(0,t.jsx)(n.p,{children:"DDoS attacks on Kubernetes clusters can target multiple layers:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Network Layer (L3/L4):"})," Large-scale traffic floods targeting Kubernetes ",(0,t.jsx)(n.strong,{children:"Ingress controllers"}),", ",(0,t.jsx)(n.strong,{children:"Load Balancers"}),", or ",(0,t.jsx)(n.strong,{children:"Node IPs"}),"."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Application Layer (L7):"})," Attacks aimed at overwhelming API endpoints, causing high CPU/memory consumption."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Resource Exhaustion Attacks:"})," Targeting ",(0,t.jsx)(n.strong,{children:"Kubernetes API Server"}),", ",(0,t.jsx)(n.strong,{children:"etcd"}),", or ",(0,t.jsx)(n.strong,{children:"specific workloads"})," by consuming cluster resources."]}),"\n"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"best-practices-for-ddos-mitigation",children:"Best Practices for DDoS Mitigation"}),"\n",(0,t.jsx)(n.h3,{id:"1-use-cloud-provider-ddos-protection",children:"1. Use Cloud Provider DDoS Protection"}),"\n",(0,t.jsxs)(n.p,{children:["Most major cloud providers offer ",(0,t.jsx)(n.strong,{children:"DDoS protection services"}),", such as:"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"AWS Shield"})," (AWS)"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Azure DDoS Protection"})," (Azure)"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Google Cloud Armor"})," (GCP)"]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["These services provide ",(0,t.jsx)(n.strong,{children:"automatic traffic filtering"})," and ",(0,t.jsx)(n.strong,{children:"rate-limiting"})," to mitigate large-scale attacks."]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h3,{id:"2-implement-rate-limiting-on-ingress-controllers",children:"2. Implement Rate Limiting on Ingress Controllers"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Issue:"})," Kubernetes Ingress controllers may be vulnerable to ",(0,t.jsx)(n.strong,{children:"HTTP flood"})," attacks.",(0,t.jsx)("br",{}),"\n",(0,t.jsx)(n.strong,{children:"Fix:"})," Use ",(0,t.jsx)(n.strong,{children:"rate limiting"})," in NGINX, Traefik, or other ingress controllers."]}),"\n",(0,t.jsx)(n.h4,{id:"example-nginx-rate-limiting",children:"Example: NGINX Rate Limiting"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:'apiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: example-ingress\n  annotations:\n    nginx.ingress.kubernetes.io/limit-rps: "10"\n    nginx.ingress.kubernetes.io/limit-burst: "20"\nspec:\n  rules:\n    - host: example.com\n      http:\n        paths:\n          - path: /\n            pathType: Prefix\n            backend:\n              service:\n                name: example-service\n                port:\n                  number: 80\n'})}),"\n",(0,t.jsxs)(n.p,{children:["This configuration ",(0,t.jsx)(n.strong,{children:"limits requests"})," to ",(0,t.jsx)(n.code,{children:"10"})," per second per client with a ",(0,t.jsx)(n.strong,{children:"burst allowance"})," of ",(0,t.jsx)(n.code,{children:"20"}),"."]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h3,{id:"3-enable-web-application-firewall-waf",children:"3. Enable Web Application Firewall (WAF)"}),"\n",(0,t.jsxs)(n.p,{children:["A ",(0,t.jsx)(n.strong,{children:"Web Application Firewall (WAF)"})," filters and blocks malicious traffic at ",(0,t.jsx)(n.strong,{children:"Layer 7 (Application Layer)"}),"."]}),"\n",(0,t.jsx)(n.h4,{id:"options",children:"Options"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"AWS WAF"})," (for ALB-based Ingress)"]}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.strong,{children:"Google Cloud Armor"})}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"ModSecurity WAF"})," (for NGINX Ingress)"]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["Example: Deploying ",(0,t.jsx)(n.strong,{children:"ModSecurity WAF"})," with NGINX Ingress:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:'apiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: modsecurity-config\ndata:\n  modsecurity.conf: |\n    SecRuleEngine On\n    SecRequestBodyAccess On\n    SecResponseBodyAccess Off\n    SecRule ARGS:cmd "(ls|cat|pwd|whoami)" "id:1,phase:2,deny,status:403"\n'})}),"\n",(0,t.jsxs)(n.p,{children:["This blocks ",(0,t.jsx)(n.strong,{children:"command injection attacks"})," in HTTP requests."]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h3,{id:"4-use-kubernetes-network-policies",children:"4. Use Kubernetes Network Policies"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Issue:"})," Open network policies allow attackers to flood services with traffic.",(0,t.jsx)("br",{}),"\n",(0,t.jsx)(n.strong,{children:"Fix:"})," Define ",(0,t.jsx)(n.strong,{children:"Kubernetes Network Policies"})," to restrict ingress/egress traffic."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"apiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: deny-all-external\n  namespace: default\nspec:\n  podSelector: {}\n  policyTypes:\n    - Ingress\n  ingress:\n    - from:\n        - podSelector: {}\n"})}),"\n",(0,t.jsxs)(n.p,{children:["This ",(0,t.jsx)(n.strong,{children:"restricts external ingress traffic"}),", only allowing internal pod-to-pod communication."]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h3,{id:"5-configure-api-server-rate-limits",children:"5. Configure API Server Rate Limits"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Issue:"})," Attackers may send excessive requests to the ",(0,t.jsx)(n.strong,{children:"Kubernetes API Server"}),", causing performance degradation.",(0,t.jsx)("br",{}),"\n",(0,t.jsx)(n.strong,{children:"Fix:"})," Limit API request rates using ",(0,t.jsx)(n.strong,{children:"API Server flags"}),"."]}),"\n",(0,t.jsx)(n.p,{children:"Example API Server configuration:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"kube-apiserver \\\n  --max-requests-inflight=300 \\\n  --max-mutating-requests-inflight=100\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"--max-requests-inflight=300"})}),": Limits non-mutating requests."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"--max-mutating-requests-inflight=100"})}),": Limits mutating API requests."]}),"\n"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h3,{id:"6-deploy-an-anti-ddos-daemonset",children:"6. Deploy an Anti-DDoS DaemonSet"}),"\n",(0,t.jsxs)(n.p,{children:["Using ",(0,t.jsx)(n.strong,{children:"eBPF-based"})," monitoring tools like ",(0,t.jsx)(n.strong,{children:"Cilium"})," or ",(0,t.jsx)(n.strong,{children:"Falco"}),", you can detect and mitigate ",(0,t.jsx)(n.strong,{children:"DDoS patterns"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["Example: Deploying ",(0,t.jsx)(n.strong,{children:"Cilium Hubble"})," to monitor ",(0,t.jsx)(n.strong,{children:"network traffic anomalies"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'helm install cilium cilium/cilium --namespace kube-system \\\n  --set hubble.enabled=true \\\n  --set hubble.metrics.enabled="{dns, drop, flow, http, icmp}"\n'})}),"\n",(0,t.jsxs)(n.p,{children:["This ",(0,t.jsx)(n.strong,{children:"monitors traffic patterns"})," to detect potential ",(0,t.jsx)(n.strong,{children:"DDoS activity"}),"."]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"key-takeaways",children:"Key Takeaways"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Use cloud provider DDoS protection"})," for automated mitigation."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Implement rate limiting"})," on ingress controllers."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Use a WAF"})," to filter Layer 7 attacks."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Restrict network traffic"})," with Kubernetes ",(0,t.jsx)(n.strong,{children:"Network Policies"}),"."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Limit API Server requests"})," to prevent exhaustion attacks."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Monitor network traffic"})," using ",(0,t.jsx)(n.strong,{children:"eBPF-based tools"})," like Cilium."]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["By ",(0,t.jsx)(n.strong,{children:"combining multiple security layers"}),", you can effectively ",(0,t.jsx)(n.strong,{children:"mitigate DDoS attacks"})," and ",(0,t.jsx)(n.strong,{children:"maintain cluster availability"}),"."]})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>o,x:()=>l});var i=s(6540);const t={},r=i.createContext(t);function o(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);