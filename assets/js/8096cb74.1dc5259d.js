"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[5444],{6446:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>i,metadata:()=>a,toc:()=>d});const a=JSON.parse('{"id":"attack_vectors/exposed_dashboard","title":"Exposed Kubernetes Dashboard","description":"How an exposed and over-privileged Kubernetes Dashboard can become an entry point for full cluster compromise.","source":"@site/docs/attack_vectors/exposed_dashboard.md","sourceDirName":"attack_vectors","slug":"/attack_vectors/exposed_dashboard","permalink":"/k8s_security/docs/attack_vectors/exposed_dashboard","draft":false,"unlisted":false,"editUrl":"https://github.com/geek-kb/k8s_security/edit/main/docs/attack_vectors/exposed_dashboard.md","tags":[],"version":"current","lastUpdatedBy":"Itai Ganot","lastUpdatedAt":1742801266000,"sidebarPosition":3,"frontMatter":{"sidebar_position":3,"title":"Exposed Kubernetes Dashboard","description":"How an exposed and over-privileged Kubernetes Dashboard can become an entry point for full cluster compromise."},"sidebar":"default","previous":{"title":"Compromised API Server","permalink":"/k8s_security/docs/attack_vectors/compromised_api_server"},"next":{"title":"Insecure Secrets Management","permalink":"/k8s_security/docs/attack_vectors/insecure_secrets_management"}}');var n=t(4848),r=t(8453);const i={sidebar_position:3,title:"Exposed Kubernetes Dashboard",description:"How an exposed and over-privileged Kubernetes Dashboard can become an entry point for full cluster compromise."},o="Exposed Kubernetes Dashboard",c={},d=[{value:"Exploitation Steps: Full Cluster Compromise via Dashboard",id:"exploitation-steps-full-cluster-compromise-via-dashboard",level:2},{value:"1. Discover the Exposed Dashboard",id:"1-discover-the-exposed-dashboard",level:3},{value:"2. Enumerate Available Capabilities",id:"2-enumerate-available-capabilities",level:3},{value:"3. Deploy a Privileged Pod",id:"3-deploy-a-privileged-pod",level:3},{value:"4. Escape the Container and Access the Host",id:"4-escape-the-container-and-access-the-host",level:3},{value:"Result",id:"result",level:3},{value:"Mitigation",id:"mitigation",level:2}];function l(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.header,{children:(0,n.jsx)(s.h1,{id:"exposed-kubernetes-dashboard",children:"Exposed Kubernetes Dashboard"})}),"\n",(0,n.jsx)(s.p,{children:"The Kubernetes Dashboard is a web-based interface for managing cluster resources and workloads. While helpful for development and debugging, an exposed and misconfigured Dashboard can allow attackers to gain administrative control over the entire cluster."}),"\n",(0,n.jsx)(s.p,{children:"This article explores how multiple misconfigurations can align to turn the Dashboard into a critical attack vector."}),"\n",(0,n.jsx)(s.hr,{}),"\n",(0,n.jsx)(s.h2,{id:"exploitation-steps-full-cluster-compromise-via-dashboard",children:"Exploitation Steps: Full Cluster Compromise via Dashboard"}),"\n",(0,n.jsx)(s.h3,{id:"1-discover-the-exposed-dashboard",children:"1. Discover the Exposed Dashboard"}),"\n",(0,n.jsx)(s.p,{children:"The attacker scans for publicly accessible services and identifies the Kubernetes Dashboard exposed over HTTP or via a misconfigured Ingress or LoadBalancer:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{children:"http://<public-ip>:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/\n"})}),"\n",(0,n.jsx)(s.p,{children:"If no authentication is required, the attacker gains direct access to the Dashboard UI."}),"\n",(0,n.jsx)(s.h3,{id:"2-enumerate-available-capabilities",children:"2. Enumerate Available Capabilities"}),"\n",(0,n.jsx)(s.p,{children:"Within the Dashboard, the attacker checks whether they can:"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"View secrets, namespaces, pods, and deployments"}),"\n",(0,n.jsx)(s.li,{children:"Create new pods or services"}),"\n",(0,n.jsx)(s.li,{children:"Execute commands in running containers"}),"\n"]}),"\n",(0,n.jsxs)(s.p,{children:["If the Dashboard is bound to a service account with ",(0,n.jsx)(s.code,{children:"cluster-admin"})," privileges, all of these actions will be permitted."]}),"\n",(0,n.jsx)(s.h3,{id:"3-deploy-a-privileged-pod",children:"3. Deploy a Privileged Pod"}),"\n",(0,n.jsx)(s.p,{children:"The attacker uses the Dashboard UI to create a pod with elevated access:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-yaml",children:'apiVersion: v1\nkind: Pod\nmetadata:\n  name: pwned\nspec:\n  containers:\n    - name: shell\n      image: alpine\n      command: ["/bin/sh"]\n      args: ["-c", "sleep infinity"]\n      securityContext:\n        privileged: true\n  hostPID: true\n  restartPolicy: Never\n'})}),"\n",(0,n.jsx)(s.p,{children:"This pod runs in privileged mode with access to the host\u2019s process namespace."}),"\n",(0,n.jsx)(s.h3,{id:"4-escape-the-container-and-access-the-host",children:"4. Escape the Container and Access the Host"}),"\n",(0,n.jsx)(s.p,{children:"Using the Dashboard\u2019s Exec feature, the attacker enters the container and runs:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-bash",children:"nsenter --target 1 --mount --uts --ipc --net --pid /bin/sh\n"})}),"\n",(0,n.jsx)(s.p,{children:"If successful, the attacker bypasses the container boundary and gains a shell on the underlying host node."}),"\n",(0,n.jsx)(s.hr,{}),"\n",(0,n.jsx)(s.h3,{id:"result",children:"Result"}),"\n",(0,n.jsx)(s.p,{children:"An attacker can:"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"Interact directly with all Kubernetes resources using the Dashboard"}),"\n",(0,n.jsx)(s.li,{children:"Deploy privileged containers to bypass isolation"}),"\n",(0,n.jsx)(s.li,{children:"Escalate privileges to the host"}),"\n",(0,n.jsx)(s.li,{children:"Exfiltrate data or disrupt workloads"}),"\n",(0,n.jsx)(s.li,{children:"Fully compromise the cluster"}),"\n"]}),"\n",(0,n.jsx)(s.p,{children:"This attack relies on a combination of insecure defaults, missing access controls, and excessive service account privileges."}),"\n",(0,n.jsx)(s.hr,{}),"\n",(0,n.jsx)(s.h2,{id:"mitigation",children:"Mitigation"}),"\n",(0,n.jsxs)(s.p,{children:["\u27a1 ",(0,n.jsx)(s.a,{href:"/docs/best_practices/cluster_setup_and_hardening/network_security/exposed_dashboard_mitigation",children:"Exposed Dashboard Mitigation"})]})]})}function h(e={}){const{wrapper:s}={...(0,r.R)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},8453:(e,s,t)=>{t.d(s,{R:()=>i,x:()=>o});var a=t(6540);const n={},r=a.createContext(n);function i(e){const s=a.useContext(r);return a.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function o(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:i(e.components),a.createElement(r.Provider,{value:s},e.children)}}}]);