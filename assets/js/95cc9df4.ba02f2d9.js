"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[2314],{8453:(e,s,n)=>{n.d(s,{R:()=>t,x:()=>o});var r=n(6540);const c={},i=r.createContext(c);function t(e){const s=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function o(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(c):e.components||c:t(e.components),r.createElement(i.Provider,{value:s},e.children)}},9243:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>l,contentTitle:()=>o,default:()=>p,frontMatter:()=>t,metadata:()=>r,toc:()=>d});const r=JSON.parse('{"id":"best_practices/cluster_setup_and_hardening/pod_security/seccomp_in_pods","title":"Seccomp in Pods","description":"Learn how to use seccomp to restrict system calls in Kubernetes pods and enhance container security.","source":"@site/docs/best_practices/cluster_setup_and_hardening/pod_security/seccomp_in_pods.md","sourceDirName":"best_practices/cluster_setup_and_hardening/pod_security","slug":"/best_practices/cluster_setup_and_hardening/pod_security/seccomp_in_pods","permalink":"/k8s_security/docs/best_practices/cluster_setup_and_hardening/pod_security/seccomp_in_pods","draft":false,"unlisted":false,"editUrl":"https://github.com/geek-kb/k8s_security/edit/main/docs/best_practices/cluster_setup_and_hardening/pod_security/seccomp_in_pods.md","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"title":"Seccomp in Pods","sidebar_position":2,"description":"Learn how to use seccomp to restrict system calls in Kubernetes pods and enhance container security."},"sidebar":"guidesSidebar","previous":{"title":"Pod Security Standards (PSS)","permalink":"/k8s_security/docs/best_practices/cluster_setup_and_hardening/pod_security/pod_security_standards"},"next":{"title":"AppArmor Profiles","permalink":"/k8s_security/docs/best_practices/cluster_setup_and_hardening/pod_security/app_armor_profiles"}}');var c=n(4848),i=n(8453);const t={title:"Seccomp in Pods",sidebar_position:2,description:"Learn how to use seccomp to restrict system calls in Kubernetes pods and enhance container security."},o="Seccomp in Pods",l={},d=[{value:"What is Seccomp?",id:"what-is-seccomp",level:2},{value:"Seccomp Modes in Kubernetes",id:"seccomp-modes-in-kubernetes",level:2},{value:"Enabling Seccomp for a Pod",id:"enabling-seccomp-for-a-pod",level:2},{value:"1. Use Runtime Default Seccomp Profile",id:"1-use-runtime-default-seccomp-profile",level:3},{value:"2. Use a Custom Seccomp Profile",id:"2-use-a-custom-seccomp-profile",level:3},{value:"Example: <code>restricted-seccomp.json</code>",id:"example-restricted-seccompjson",level:4},{value:"Apply the Profile to a Pod",id:"apply-the-profile-to-a-pod",level:4},{value:"Best Practices for Seccomp in Kubernetes",id:"best-practices-for-seccomp-in-kubernetes",level:2},{value:"Related Security Features",id:"related-security-features",level:2},{value:"Conclusion",id:"conclusion",level:2}];function a(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(s.header,{children:(0,c.jsx)(s.h1,{id:"seccomp-in-pods",children:"Seccomp in Pods"})}),"\n",(0,c.jsx)(s.p,{children:(0,c.jsx)(s.strong,{children:"Required knowledge for the CKS certification."})}),"\n",(0,c.jsx)(s.h2,{id:"what-is-seccomp",children:"What is Seccomp?"}),"\n",(0,c.jsxs)(s.p,{children:[(0,c.jsx)(s.strong,{children:"Seccomp (Secure Computing Mode)"})," is a ",(0,c.jsx)(s.strong,{children:"Linux kernel feature"})," that allows restricting the system calls a process can make. It is used in ",(0,c.jsx)(s.strong,{children:"Kubernetes"})," to limit a container's ability to execute potentially dangerous system calls, reducing the attack surface of the node."]}),"\n",(0,c.jsxs)(s.p,{children:["By enforcing ",(0,c.jsx)(s.strong,{children:"seccomp profiles"}),", you can ",(0,c.jsx)(s.strong,{children:"prevent privilege escalation"}),", ",(0,c.jsx)(s.strong,{children:"mitigate container escape vulnerabilities"}),", and ",(0,c.jsx)(s.strong,{children:"enhance pod security"}),"."]}),"\n",(0,c.jsx)(s.hr,{}),"\n",(0,c.jsx)(s.h2,{id:"seccomp-modes-in-kubernetes",children:"Seccomp Modes in Kubernetes"}),"\n",(0,c.jsxs)(s.p,{children:["Kubernetes supports ",(0,c.jsx)(s.strong,{children:"three seccomp modes"}),":"]}),"\n",(0,c.jsxs)(s.ol,{children:["\n",(0,c.jsxs)(s.li,{children:["\n",(0,c.jsx)(s.p,{children:(0,c.jsx)(s.strong,{children:"Unconfined (Default)"})}),"\n",(0,c.jsxs)(s.ul,{children:["\n",(0,c.jsx)(s.li,{children:"No restrictions; the container can call any system calls allowed by the container runtime."}),"\n",(0,c.jsxs)(s.li,{children:[(0,c.jsx)(s.strong,{children:"Not recommended"})," for security-sensitive workloads."]}),"\n"]}),"\n"]}),"\n",(0,c.jsxs)(s.li,{children:["\n",(0,c.jsx)(s.p,{children:(0,c.jsx)(s.strong,{children:"Runtime Default"})}),"\n",(0,c.jsxs)(s.ul,{children:["\n",(0,c.jsxs)(s.li,{children:["Uses the ",(0,c.jsx)(s.strong,{children:"default seccomp profile"})," provided by the container runtime (e.g., CRI-O or containerd)."]}),"\n",(0,c.jsx)(s.li,{children:"Blocks known dangerous system calls."}),"\n",(0,c.jsxs)(s.li,{children:[(0,c.jsx)(s.strong,{children:"Recommended for most workloads"}),"."]}),"\n"]}),"\n"]}),"\n",(0,c.jsxs)(s.li,{children:["\n",(0,c.jsx)(s.p,{children:(0,c.jsx)(s.strong,{children:"Custom Seccomp Profiles"})}),"\n",(0,c.jsxs)(s.ul,{children:["\n",(0,c.jsxs)(s.li,{children:["A user-defined seccomp profile specifying ",(0,c.jsx)(s.strong,{children:"allowed and denied system calls"}),"."]}),"\n",(0,c.jsxs)(s.li,{children:[(0,c.jsx)(s.strong,{children:"Ideal for high-security environments"}),"."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,c.jsx)(s.hr,{}),"\n",(0,c.jsx)(s.h2,{id:"enabling-seccomp-for-a-pod",children:"Enabling Seccomp for a Pod"}),"\n",(0,c.jsxs)(s.p,{children:["Seccomp can be applied using ",(0,c.jsx)(s.strong,{children:"pod security profiles"})," (PSS), ",(0,c.jsx)(s.strong,{children:"annotations"})," (deprecated), or the ",(0,c.jsx)(s.strong,{children:"securityContext"})," field."]}),"\n",(0,c.jsx)(s.h3,{id:"1-use-runtime-default-seccomp-profile",children:"1. Use Runtime Default Seccomp Profile"}),"\n",(0,c.jsx)(s.pre,{children:(0,c.jsx)(s.code,{className:"language-yaml",children:"apiVersion: v1\nkind: Pod\nmetadata:\n  name: secure-pod\nspec:\n  securityContext:\n    seccompProfile:\n      type: RuntimeDefault\n  containers:\n    - name: app-container\n      image: nginx\n"})}),"\n",(0,c.jsxs)(s.p,{children:["This enables the ",(0,c.jsx)(s.strong,{children:"container runtime\u2019s default seccomp profile"}),", blocking risky system calls."]}),"\n",(0,c.jsx)(s.hr,{}),"\n",(0,c.jsx)(s.h3,{id:"2-use-a-custom-seccomp-profile",children:"2. Use a Custom Seccomp Profile"}),"\n",(0,c.jsxs)(s.p,{children:["You can define a ",(0,c.jsx)(s.strong,{children:"custom seccomp profile"})," in ",(0,c.jsx)(s.code,{children:"/var/lib/kubelet/seccomp/profiles"}),"."]}),"\n",(0,c.jsxs)(s.h4,{id:"example-restricted-seccompjson",children:["Example: ",(0,c.jsx)(s.code,{children:"restricted-seccomp.json"})]}),"\n",(0,c.jsx)(s.pre,{children:(0,c.jsx)(s.code,{className:"language-json",children:'{\n  "defaultAction": "SCMP_ACT_ERRNO",\n  "architectures": ["SCMP_ARCH_X86_64"],\n  "syscalls": [\n    {\n      "names": ["read", "write", "exit", "fstat"],\n      "action": "SCMP_ACT_ALLOW"\n    }\n  ]\n}\n'})}),"\n",(0,c.jsx)(s.p,{children:"This profile:"}),"\n",(0,c.jsxs)(s.ul,{children:["\n",(0,c.jsxs)(s.li,{children:[(0,c.jsx)(s.strong,{children:"Blocks all system calls by default"})," (",(0,c.jsx)(s.code,{children:"SCMP_ACT_ERRNO"}),")."]}),"\n",(0,c.jsxs)(s.li,{children:[(0,c.jsx)(s.strong,{children:"Allows only safe calls"})," (",(0,c.jsx)(s.code,{children:"read"}),", ",(0,c.jsx)(s.code,{children:"write"}),", ",(0,c.jsx)(s.code,{children:"exit"}),", ",(0,c.jsx)(s.code,{children:"fstat"}),")."]}),"\n"]}),"\n",(0,c.jsx)(s.h4,{id:"apply-the-profile-to-a-pod",children:"Apply the Profile to a Pod"}),"\n",(0,c.jsx)(s.pre,{children:(0,c.jsx)(s.code,{className:"language-yaml",children:"apiVersion: v1\nkind: Pod\nmetadata:\n  name: custom-seccomp-pod\nspec:\n  securityContext:\n    seccompProfile:\n      type: Localhost\n      localhostProfile: restricted-seccomp.json\n  containers:\n    - name: app-container\n      image: nginx\n"})}),"\n",(0,c.jsxs)(s.p,{children:["This ensures that only ",(0,c.jsx)(s.strong,{children:"explicitly allowed system calls"})," are executed."]}),"\n",(0,c.jsx)(s.hr,{}),"\n",(0,c.jsx)(s.h2,{id:"best-practices-for-seccomp-in-kubernetes",children:"Best Practices for Seccomp in Kubernetes"}),"\n",(0,c.jsxs)(s.ul,{children:["\n",(0,c.jsxs)(s.li,{children:[(0,c.jsxs)(s.strong,{children:["Use ",(0,c.jsx)(s.code,{children:"RuntimeDefault"})]})," seccomp profiles for all workloads unless custom restrictions are needed."]}),"\n",(0,c.jsxs)(s.li,{children:[(0,c.jsx)(s.strong,{children:"Apply seccomp profiles"})," at the ",(0,c.jsx)(s.strong,{children:"pod level"})," (instead of container level) for uniform enforcement."]}),"\n",(0,c.jsxs)(s.li,{children:[(0,c.jsx)(s.strong,{children:"Test seccomp profiles"})," before applying them in production to avoid breaking applications."]}),"\n",(0,c.jsxs)(s.li,{children:[(0,c.jsxs)(s.strong,{children:["Avoid ",(0,c.jsx)(s.code,{children:"Unconfined"})," mode"]}),", as it leaves containers unprotected."]}),"\n"]}),"\n",(0,c.jsx)(s.hr,{}),"\n",(0,c.jsx)(s.h2,{id:"related-security-features",children:"Related Security Features"}),"\n",(0,c.jsxs)(s.ul,{children:["\n",(0,c.jsxs)(s.li,{children:[(0,c.jsx)(s.strong,{children:(0,c.jsx)(s.a,{href:"/docs/best_practices/cluster_setup_and_hardening/pod_security/pod_security_standards",children:"Pod Security Standards (PSS)"})})," ensure that seccomp is enabled by default."]}),"\n",(0,c.jsxs)(s.li,{children:[(0,c.jsx)(s.strong,{children:(0,c.jsx)(s.a,{href:"/docs/best_practices/cluster_setup_and_hardening/pod_security/app_armor_profiles",children:"AppArmor Profiles"})})," provide additional security layers for containers."]}),"\n",(0,c.jsxs)(s.li,{children:[(0,c.jsx)(s.strong,{children:(0,c.jsx)(s.a,{href:"/docs/best_practices/system_hardening/intro",children:"Kernel Hardening"})})," helps restrict system-level attack surfaces."]}),"\n"]}),"\n",(0,c.jsx)(s.hr,{}),"\n",(0,c.jsx)(s.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,c.jsxs)(s.p,{children:["Using ",(0,c.jsx)(s.strong,{children:"seccomp"})," in Kubernetes enhances ",(0,c.jsx)(s.strong,{children:"container security"})," by restricting ",(0,c.jsx)(s.strong,{children:"unnecessary system calls"}),". By enforcing ",(0,c.jsx)(s.strong,{children:"the RuntimeDefault profile"})," or ",(0,c.jsx)(s.strong,{children:"custom security policies"}),", you can ",(0,c.jsx)(s.strong,{children:"minimize risks"}),", ",(0,c.jsx)(s.strong,{children:"prevent privilege escalation"}),", and ",(0,c.jsx)(s.strong,{children:"ensure secure workloads"}),"."]}),"\n",(0,c.jsxs)(s.p,{children:["For high-security environments, ",(0,c.jsx)(s.strong,{children:"combine seccomp with AppArmor and Pod Security Standards"})," to achieve ",(0,c.jsx)(s.strong,{children:"comprehensive container security"}),"."]})]})}function p(e={}){const{wrapper:s}={...(0,i.R)(),...e.components};return s?(0,c.jsx)(s,{...e,children:(0,c.jsx)(a,{...e})}):a(e)}}}]);