"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[1385],{4400:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>o,contentTitle:()=>a,default:()=>h,frontMatter:()=>c,metadata:()=>i,toc:()=>l});const i=JSON.parse('{"id":"best_practices/cluster_setup_and_hardening/pod_security/container_escape_mitigation","title":"Preventing Container Escape","description":"Best practices for securing Kubernetes containers to prevent escape attacks and host system compromise.","source":"@site/docs/best_practices/cluster_setup_and_hardening/pod_security/container_escape_mitigation.md","sourceDirName":"best_practices/cluster_setup_and_hardening/pod_security","slug":"/best_practices/cluster_setup_and_hardening/pod_security/container_escape_mitigation","permalink":"/k8s_security/docs/best_practices/cluster_setup_and_hardening/pod_security/container_escape_mitigation","draft":false,"unlisted":false,"editUrl":"https://github.com/geek-kb/k8s_security/edit/main/docs/best_practices/cluster_setup_and_hardening/pod_security/container_escape_mitigation.md","tags":[],"version":"current","lastUpdatedBy":"Itai Ganot","lastUpdatedAt":1742801266000,"sidebarPosition":3,"frontMatter":{"sidebar_position":3,"title":"Preventing Container Escape","description":"Best practices for securing Kubernetes containers to prevent escape attacks and host system compromise."},"sidebar":"default","previous":{"title":"Securing Kubernetes Sidecars","permalink":"/k8s_security/docs/best_practices/cluster_setup_and_hardening/pod_security/compromised_sidecars_mitigation"},"next":{"title":"Securing Kubernetes CSI Drivers","permalink":"/k8s_security/docs/best_practices/cluster_setup_and_hardening/pod_security/csi_driver_mitigation"}}');var t=n(4848),r=n(8453);const c={sidebar_position:3,title:"Preventing Container Escape",description:"Best practices for securing Kubernetes containers to prevent escape attacks and host system compromise."},a="Preventing Container Escape",o={},l=[{value:"1. Disable Privileged Containers",id:"1-disable-privileged-containers",level:2},{value:"Secure Configuration",id:"secure-configuration",level:3},{value:"Why It Matters",id:"why-it-matters",level:3},{value:"2. Disable Host Namespace Sharing",id:"2-disable-host-namespace-sharing",level:2},{value:"Secure Configuration",id:"secure-configuration-1",level:3},{value:"Why It Matters",id:"why-it-matters-1",level:3},{value:"3. Use Seccomp to Restrict Syscalls",id:"3-use-seccomp-to-restrict-syscalls",level:2},{value:"Secure Configuration with Seccomp",id:"secure-configuration-with-seccomp",level:3},{value:"Why It Matters",id:"why-it-matters-2",level:3},{value:"4. Drop Unnecessary Linux Capabilities",id:"4-drop-unnecessary-linux-capabilities",level:2},{value:"Secure Configuration",id:"secure-configuration-2",level:3},{value:"Why It Matters",id:"why-it-matters-3",level:3},{value:"5. Enforce Pod Security Standards",id:"5-enforce-pod-security-standards",level:2},{value:"Example: Enforcing a Restricted Security Policy",id:"example-enforcing-a-restricted-security-policy",level:3},{value:"Why It Matters",id:"why-it-matters-4",level:3},{value:"6. Restrict Host Filesystem Access",id:"6-restrict-host-filesystem-access",level:2},{value:"<strong>Key Directories That Must Be Protected</strong>",id:"key-directories-that-must-be-protected",level:3},{value:"<strong>Stronger Secure Pod Configuration</strong>",id:"stronger-secure-pod-configuration",level:3},{value:"Why It Matters",id:"why-it-matters-5",level:3},{value:"7. Implement Container Sandboxing",id:"7-implement-container-sandboxing",level:2},{value:"Example: Running a Pod with gVisor",id:"example-running-a-pod-with-gvisor",level:3},{value:"Why It Matters",id:"why-it-matters-6",level:3},{value:"Conclusion",id:"conclusion",level:2}];function d(e){const s={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s.header,{children:(0,t.jsx)(s.h1,{id:"preventing-container-escape",children:"Preventing Container Escape"})}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.strong,{children:"Container escape"})," occurs when an attacker exploits security flaws to break out of a container and gain access to the host system. This can lead to ",(0,t.jsx)(s.strong,{children:"privilege escalation, data theft, lateral movement, and full cluster compromise"}),"."]}),"\n",(0,t.jsxs)(s.p,{children:["To mitigate container escape risks, Kubernetes administrators should enforce ",(0,t.jsx)(s.strong,{children:"strict security controls"})," at the container and pod level."]}),"\n",(0,t.jsx)(s.hr,{}),"\n",(0,t.jsx)(s.h2,{id:"1-disable-privileged-containers",children:"1. Disable Privileged Containers"}),"\n",(0,t.jsxs)(s.p,{children:["Running a container with ",(0,t.jsx)(s.code,{children:"privileged: true"})," grants it full access to the host system, increasing the risk of escape. Attackers can leverage this setting to mount the host\u2019s filesystem, manipulate system processes, or escalate privileges."]}),"\n",(0,t.jsx)(s.h3,{id:"secure-configuration",children:"Secure Configuration"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-yaml",children:"apiVersion: v1\nkind: Pod\nmetadata:\n  name: secure-pod\nspec:\n  containers:\n    - name: app-container\n      image: secure-image\n      securityContext:\n        privileged: false\n"})}),"\n",(0,t.jsx)(s.h3,{id:"why-it-matters",children:"Why It Matters"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["Prevents access to kernel modules and sensitive host files.",(0,t.jsx)("br",{})]}),"\n",(0,t.jsx)(s.li,{children:"Restricts direct interaction with the host\u2019s networking and devices."}),"\n"]}),"\n",(0,t.jsx)(s.hr,{}),"\n",(0,t.jsx)(s.h2,{id:"2-disable-host-namespace-sharing",children:"2. Disable Host Namespace Sharing"}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.strong,{children:"Host namespaces"})," expose the container to the host\u2019s processes, network, and mount points, allowing attackers to manipulate system resources."]}),"\n",(0,t.jsx)(s.h3,{id:"secure-configuration-1",children:"Secure Configuration"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-yaml",children:"apiVersion: v1\nkind: Pod\nmetadata:\n  name: secure-pod\nspec:\n  hostPID: false\n  hostIPC: false\n  hostNetwork: false\n  containers:\n    - name: app-container\n      image: secure-image\n"})}),"\n",(0,t.jsx)(s.h3,{id:"why-it-matters-1",children:"Why It Matters"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["Prevents the container from accessing host processes and system files.",(0,t.jsx)("br",{})]}),"\n",(0,t.jsx)(s.li,{children:"Reduces the risk of privilege escalation through shared namespaces."}),"\n"]}),"\n",(0,t.jsx)(s.hr,{}),"\n",(0,t.jsx)(s.h2,{id:"3-use-seccomp-to-restrict-syscalls",children:"3. Use Seccomp to Restrict Syscalls"}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.strong,{children:"Seccomp (Secure Computing Mode)"})," filters system calls available to containers, reducing the attack surface."]}),"\n",(0,t.jsx)(s.h3,{id:"secure-configuration-with-seccomp",children:"Secure Configuration with Seccomp"}),"\n",(0,t.jsxs)(s.p,{children:["In Kubernetes ",(0,t.jsx)(s.strong,{children:"1.19 and later"}),", seccomp profiles can be configured via the ",(0,t.jsx)(s.code,{children:"seccompProfile"})," field in ",(0,t.jsx)(s.code,{children:"securityContext"}),"."]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-yaml",children:"apiVersion: v1\nkind: Pod\nmetadata:\n  name: seccomp-pod\nspec:\n  securityContext:\n    seccompProfile:\n      type: RuntimeDefault\n  containers:\n    - name: app-container\n      image: secure-image\n"})}),"\n",(0,t.jsx)(s.h3,{id:"why-it-matters-2",children:"Why It Matters"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["Blocks dangerous syscalls used for privilege escalation.",(0,t.jsx)("br",{})]}),"\n",(0,t.jsx)(s.li,{children:"Prevents exploitation of kernel vulnerabilities."}),"\n"]}),"\n",(0,t.jsx)(s.hr,{}),"\n",(0,t.jsx)(s.h2,{id:"4-drop-unnecessary-linux-capabilities",children:"4. Drop Unnecessary Linux Capabilities"}),"\n",(0,t.jsx)(s.p,{children:"By default, containers have a set of capabilities that allow interactions with system resources. Reducing these capabilities minimizes the potential attack surface."}),"\n",(0,t.jsx)(s.h3,{id:"secure-configuration-2",children:"Secure Configuration"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-yaml",children:"apiVersion: v1\nkind: Pod\nmetadata:\n  name: secure-pod\nspec:\n  containers:\n    - name: app-container\n      image: secure-image\n      securityContext:\n        capabilities:\n          drop:\n            - ALL\n"})}),"\n",(0,t.jsx)(s.h3,{id:"why-it-matters-3",children:"Why It Matters"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["Removes privileges that could be exploited for escape.",(0,t.jsx)("br",{})]}),"\n",(0,t.jsx)(s.li,{children:"Ensures the container operates with the minimum necessary privileges."}),"\n"]}),"\n",(0,t.jsx)(s.hr,{}),"\n",(0,t.jsx)(s.h2,{id:"5-enforce-pod-security-standards",children:"5. Enforce Pod Security Standards"}),"\n",(0,t.jsxs)(s.p,{children:["Use ",(0,t.jsx)(s.strong,{children:"Pod Security Admission (PSA)"})," or ",(0,t.jsx)(s.strong,{children:"PodSecurityPolicies (PSP) (deprecated in Kubernetes 1.21+)"})," to enforce security restrictions that block high-risk configurations."]}),"\n",(0,t.jsx)(s.h3,{id:"example-enforcing-a-restricted-security-policy",children:"Example: Enforcing a Restricted Security Policy"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-yaml",children:"apiVersion: policy/v1beta1\nkind: PodSecurityPolicy\nmetadata:\n  name: restricted-psp\nspec:\n  privileged: false\n  runAsUser:\n    rule: MustRunAsNonRoot\n  allowPrivilegeEscalation: false\n  seLinux:\n    rule: RunAsAny\n  fsGroup:\n    rule: MustRunAs\n  readOnlyRootFilesystem: true\n"})}),"\n",(0,t.jsxs)(s.p,{children:["For newer Kubernetes versions using ",(0,t.jsx)(s.strong,{children:"Pod Security Admission"}),", apply a restricted policy:"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-yaml",children:"apiVersion: v1\nkind: Namespace\nmetadata:\n  name: secure-namespace\n  labels:\n    pod-security.kubernetes.io/enforce: restricted\n"})}),"\n",(0,t.jsx)(s.h3,{id:"why-it-matters-4",children:"Why It Matters"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["Ensures that pods run with the least privilege.",(0,t.jsx)("br",{})]}),"\n",(0,t.jsx)(s.li,{children:"Blocks dangerous configurations like root access and writable root filesystems."}),"\n"]}),"\n",(0,t.jsx)(s.hr,{}),"\n",(0,t.jsx)(s.h2,{id:"6-restrict-host-filesystem-access",children:"6. Restrict Host Filesystem Access"}),"\n",(0,t.jsxs)(s.p,{children:["Containers should not have access to the host\u2019s filesystem, especially directories like ",(0,t.jsx)(s.code,{children:"/proc"}),", ",(0,t.jsx)(s.code,{children:"/sys"}),", and ",(0,t.jsx)(s.code,{children:"/var/run/docker.sock"}),"."]}),"\n",(0,t.jsx)(s.h3,{id:"key-directories-that-must-be-protected",children:(0,t.jsx)(s.strong,{children:"Key Directories That Must Be Protected"})}),"\n",(0,t.jsxs)(s.table,{children:[(0,t.jsx)(s.thead,{children:(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.th,{children:(0,t.jsx)(s.strong,{children:"Path"})}),(0,t.jsx)(s.th,{children:(0,t.jsx)(s.strong,{children:"Risk"})})]})}),(0,t.jsxs)(s.tbody,{children:[(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:(0,t.jsx)(s.code,{children:"/proc"})}),(0,t.jsxs)(s.td,{children:["Grants access to host processes, kernel settings, and system info. ",(0,t.jsx)(s.code,{children:"/proc/1/root"})," exposes the ",(0,t.jsx)(s.strong,{children:"host\u2019s root filesystem"}),"."]})]}),(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:(0,t.jsx)(s.code,{children:"/sys"})}),(0,t.jsx)(s.td,{children:"Allows modification of kernel parameters and hardware configurations."})]}),(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:(0,t.jsx)(s.code,{children:"/var/run/docker.sock"})}),(0,t.jsx)(s.td,{children:"Provides full control over Docker and allows spawning new privileged containers."})]}),(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:(0,t.jsx)(s.code,{children:"/dev"})}),(0,t.jsx)(s.td,{children:"Exposes host devices and can be abused to gain raw disk access."})]}),(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:(0,t.jsx)(s.code,{children:"/etc"})}),(0,t.jsx)(s.td,{children:"Contains system-wide configuration files, including sensitive credentials."})]}),(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:(0,t.jsx)(s.code,{children:"/root"})}),(0,t.jsx)(s.td,{children:"Contains the root user\u2019s home directory, which may include SSH keys and configuration files."})]})]})]}),"\n",(0,t.jsx)(s.h3,{id:"stronger-secure-pod-configuration",children:(0,t.jsx)(s.strong,{children:"Stronger Secure Pod Configuration"})}),"\n",(0,t.jsxs)(s.p,{children:["To truly ",(0,t.jsx)(s.strong,{children:"restrict host filesystem access"}),", use a combination of:"]}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:(0,t.jsx)(s.strong,{children:"Read-only root filesystem"})}),"\n",(0,t.jsx)(s.li,{children:(0,t.jsx)(s.strong,{children:"Explicitly disabling hostPath volumes"})}),"\n",(0,t.jsx)(s.li,{children:(0,t.jsx)(s.strong,{children:"Using AppArmor, Seccomp, and SELinux policies"})}),"\n",(0,t.jsx)(s.li,{children:(0,t.jsx)(s.strong,{children:"Denying all unnecessary mounts"})}),"\n"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-yaml",children:"apiVersion: v1\nkind: Pod\nmetadata:\n  name: secure-pod\nspec:\n  containers:\n    - name: app-container\n      image: secure-image\n      securityContext:\n        readOnlyRootFilesystem: true\n        allowPrivilegeEscalation: false\n        capabilities:\n          drop:\n            - ALL\n        seccompProfile:\n          type: RuntimeDefault\n        appArmorProfile: runtime/default\n        volumeMounts:\n          - name: tmp\n            mountPath: /tmp\n  volumes:\n    - name: tmp\n      emptyDir: {}\n"})}),"\n",(0,t.jsx)(s.h3,{id:"why-it-matters-5",children:"Why It Matters"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Prevents modifying critical system files"})," \u2192 ",(0,t.jsx)(s.code,{children:"readOnlyRootFilesystem: true"})]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Blocks privilege escalation techniques"})," \u2192 ",(0,t.jsx)(s.code,{children:"allowPrivilegeEscalation: false"})]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Reduces attack surface by dropping all capabilities"})," \u2192 ",(0,t.jsx)(s.code,{children:"capabilities.drop: ALL"})]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Restricts syscalls with Seccomp"})," \u2192 ",(0,t.jsx)(s.code,{children:"seccompProfile: RuntimeDefault"})]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Applies additional restrictions with AppArmor"})," \u2192 ",(0,t.jsx)(s.code,{children:"appArmorProfile: runtime/default"})]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Prevents unnecessary filesystem mounts"})," \u2192 No hostPath or sensitive volume mounts"]}),"\n"]}),"\n",(0,t.jsx)(s.hr,{}),"\n",(0,t.jsx)(s.h2,{id:"7-implement-container-sandboxing",children:"7. Implement Container Sandboxing"}),"\n",(0,t.jsxs)(s.p,{children:["Using ",(0,t.jsx)(s.strong,{children:"sandboxed runtimes"})," like Kata Containers, gVisor, or Firecracker adds additional isolation layers between the container and the host."]}),"\n",(0,t.jsx)(s.h3,{id:"example-running-a-pod-with-gvisor",children:"Example: Running a Pod with gVisor"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-yaml",children:"apiVersion: v1\nkind: Pod\nmetadata:\n  name: sandboxed-pod\nspec:\n  runtimeClassName: gvisor\n  containers:\n    - name: app-container\n      image: secure-image\n"})}),"\n",(0,t.jsx)(s.h3,{id:"why-it-matters-6",children:"Why It Matters"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["Prevents attackers from escaping the container to the host.",(0,t.jsx)("br",{})]}),"\n",(0,t.jsx)(s.li,{children:"Creates additional isolation layers for security."}),"\n"]}),"\n",(0,t.jsx)(s.hr,{}),"\n",(0,t.jsx)(s.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,t.jsxs)(s.p,{children:["Preventing container escape is essential for Kubernetes security. By ",(0,t.jsx)(s.strong,{children:"disabling privileged containers, enforcing security profiles, restricting filesystem access, and using sandboxed runtimes"}),", administrators can significantly reduce the risk of container breakout attacks."]})]})}function h(e={}){const{wrapper:s}={...(0,r.R)(),...e.components};return s?(0,t.jsx)(s,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},8453:(e,s,n)=>{n.d(s,{R:()=>c,x:()=>a});var i=n(6540);const t={},r=i.createContext(t);function c(e){const s=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function a(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:c(e.components),i.createElement(r.Provider,{value:s},e.children)}}}]);