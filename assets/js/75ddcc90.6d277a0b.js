"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[5226],{4048:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>a,contentTitle:()=>c,default:()=>p,frontMatter:()=>t,metadata:()=>s,toc:()=>l});const s=JSON.parse('{"id":"best_practices/cluster_setup_and_hardening/pod_security/app_armor_profiles","title":"AppArmor Profiles","description":"Learn how to use AppArmor profiles to enforce mandatory access control (MAC) on Kubernetes pods.","source":"@site/docs/best_practices/cluster_setup_and_hardening/pod_security/app_armor_profiles.md","sourceDirName":"best_practices/cluster_setup_and_hardening/pod_security","slug":"/best_practices/cluster_setup_and_hardening/pod_security/app_armor_profiles","permalink":"/k8s_security/docs/best_practices/cluster_setup_and_hardening/pod_security/app_armor_profiles","draft":false,"unlisted":false,"editUrl":"https://github.com/geek-kb/k8s_security/edit/main/docs/best_practices/cluster_setup_and_hardening/pod_security/app_armor_profiles.md","tags":[],"version":"current","lastUpdatedBy":"Itai Ganot","lastUpdatedAt":1742746202000,"sidebarPosition":1,"frontMatter":{"title":"AppArmor Profiles","sidebar_position":1,"description":"Learn how to use AppArmor profiles to enforce mandatory access control (MAC) on Kubernetes pods."},"sidebar":"default","previous":{"title":"Kubelet Security","permalink":"/k8s_security/docs/best_practices/cluster_setup_and_hardening/node_security/kubelet_security"},"next":{"title":"Securing Kubernetes Sidecars","permalink":"/k8s_security/docs/best_practices/cluster_setup_and_hardening/pod_security/compromised_sidecars_mitigation"}}');var i=n(4848),o=n(8453);const t={title:"AppArmor Profiles",sidebar_position:1,description:"Learn how to use AppArmor profiles to enforce mandatory access control (MAC) on Kubernetes pods."},c="AppArmor Profiles in Kubernetes",a={},l=[{value:"What is AppArmor?",id:"what-is-apparmor",level:2},{value:"AppArmor Profiles in Kubernetes",id:"apparmor-profiles-in-kubernetes-1",level:2},{value:"Enabling AppArmor for a Pod",id:"enabling-apparmor-for-a-pod",level:2},{value:"1. Use the Runtime Default AppArmor Profile",id:"1-use-the-runtime-default-apparmor-profile",level:3},{value:"2. Use a Custom AppArmor Profile",id:"2-use-a-custom-apparmor-profile",level:3},{value:"Example: <code>custom-apparmor-profile</code>",id:"example-custom-apparmor-profile",level:4},{value:"Apply the Profile to a Pod",id:"apply-the-profile-to-a-pod",level:4},{value:"Best Practices for Using AppArmor in Kubernetes",id:"best-practices-for-using-apparmor-in-kubernetes",level:2},{value:"Related Security Features",id:"related-security-features",level:2},{value:"Conclusion",id:"conclusion",level:2}];function d(e){const r={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(r.header,{children:(0,i.jsx)(r.h1,{id:"apparmor-profiles-in-kubernetes",children:"AppArmor Profiles in Kubernetes"})}),"\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.strong,{children:"Required knowledge for the CKS certification."})}),"\n",(0,i.jsx)(r.h2,{id:"what-is-apparmor",children:"What is AppArmor?"}),"\n",(0,i.jsxs)(r.p,{children:[(0,i.jsx)(r.strong,{children:"AppArmor (Application Armor)"})," is a ",(0,i.jsx)(r.strong,{children:"Linux security module (LSM)"})," that provides ",(0,i.jsx)(r.strong,{children:"mandatory access control (MAC)"})," to restrict what processes can do on a system. It allows defining ",(0,i.jsx)(r.strong,{children:"security profiles"})," that control access to ",(0,i.jsx)(r.strong,{children:"files, capabilities, and network resources"}),", helping mitigate security risks in Kubernetes environments."]}),"\n",(0,i.jsxs)(r.p,{children:["By using ",(0,i.jsx)(r.strong,{children:"AppArmor profiles"}),", you can limit ",(0,i.jsx)(r.strong,{children:"container privileges"}),", prevent ",(0,i.jsx)(r.strong,{children:"unauthorized file access"}),", and enforce ",(0,i.jsx)(r.strong,{children:"application security constraints"}),"."]}),"\n",(0,i.jsx)(r.hr,{}),"\n",(0,i.jsx)(r.h2,{id:"apparmor-profiles-in-kubernetes-1",children:"AppArmor Profiles in Kubernetes"}),"\n",(0,i.jsxs)(r.p,{children:["Kubernetes supports ",(0,i.jsx)(r.strong,{children:"AppArmor profiles"})," for workloads running on nodes with ",(0,i.jsx)(r.strong,{children:"AppArmor-enabled kernels"}),". The available modes are:"]}),"\n",(0,i.jsxs)(r.ol,{children:["\n",(0,i.jsxs)(r.li,{children:["\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.strong,{children:"Unconfined (Default)"})}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:"No restrictions; the container has unrestricted access."}),"\n",(0,i.jsxs)(r.li,{children:[(0,i.jsx)(r.strong,{children:"Not recommended"})," for security-sensitive workloads."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(r.li,{children:["\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.strong,{children:"Runtime Default"})}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsxs)(r.li,{children:["Uses the ",(0,i.jsx)(r.strong,{children:"default AppArmor profile"})," provided by the container runtime."]}),"\n",(0,i.jsxs)(r.li,{children:["Offers ",(0,i.jsx)(r.strong,{children:"basic protection"})," without custom rules."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(r.li,{children:["\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.strong,{children:"Custom AppArmor Profiles"})}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsxs)(r.li,{children:["A user-defined profile that specifies ",(0,i.jsx)(r.strong,{children:"allowed and restricted actions"}),"."]}),"\n",(0,i.jsxs)(r.li,{children:[(0,i.jsx)(r.strong,{children:"Recommended for strict workload security"}),"."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(r.hr,{}),"\n",(0,i.jsx)(r.h2,{id:"enabling-apparmor-for-a-pod",children:"Enabling AppArmor for a Pod"}),"\n",(0,i.jsxs)(r.p,{children:["AppArmor profiles are applied via ",(0,i.jsx)(r.strong,{children:"annotations"})," in the pod specification."]}),"\n",(0,i.jsx)(r.h3,{id:"1-use-the-runtime-default-apparmor-profile",children:"1. Use the Runtime Default AppArmor Profile"}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-yaml",children:"apiVersion: v1\nkind: Pod\nmetadata:\n  name: apparmor-default-pod\n  annotations:\n    container.apparmor.security.beta.kubernetes.io/app-container: runtime/default\nspec:\n  containers:\n    - name: app-container\n      image: nginx\n"})}),"\n",(0,i.jsxs)(r.p,{children:["This applies the ",(0,i.jsx)(r.strong,{children:"default AppArmor profile"})," to the container."]}),"\n",(0,i.jsx)(r.hr,{}),"\n",(0,i.jsx)(r.h3,{id:"2-use-a-custom-apparmor-profile",children:"2. Use a Custom AppArmor Profile"}),"\n",(0,i.jsxs)(r.p,{children:["Custom AppArmor profiles are stored under ",(0,i.jsx)(r.code,{children:"/etc/apparmor.d/"})," on the node."]}),"\n",(0,i.jsxs)(r.h4,{id:"example-custom-apparmor-profile",children:["Example: ",(0,i.jsx)(r.code,{children:"custom-apparmor-profile"})]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-plaintext",children:"profile custom-apparmor-profile flags=(attach_disconnected,mediate_deleted) {\n  capability,\n  network,\n  file,\n  deny /bin/sh rm,\n  deny /usr/bin/wget,\n}\n"})}),"\n",(0,i.jsx)(r.p,{children:"This profile:"}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsxs)(r.li,{children:[(0,i.jsx)(r.strong,{children:"Allows"})," necessary ",(0,i.jsx)(r.strong,{children:"capabilities, file, and network access"}),"."]}),"\n",(0,i.jsxs)(r.li,{children:[(0,i.jsx)(r.strong,{children:"Denies execution"})," of ",(0,i.jsx)(r.code,{children:"/bin/sh rm"})," and ",(0,i.jsx)(r.code,{children:"/usr/bin/wget"})," to prevent ",(0,i.jsx)(r.strong,{children:"command injection"})," attacks."]}),"\n"]}),"\n",(0,i.jsx)(r.h4,{id:"apply-the-profile-to-a-pod",children:"Apply the Profile to a Pod"}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-yaml",children:"apiVersion: v1\nkind: Pod\nmetadata:\n  name: custom-apparmor-pod\n  annotations:\n    container.apparmor.security.beta.kubernetes.io/app-container: localhost/custom-apparmor-profile\nspec:\n  containers:\n    - name: app-container\n      image: nginx\n"})}),"\n",(0,i.jsxs)(r.p,{children:["This ensures that the container follows the ",(0,i.jsx)(r.strong,{children:"custom AppArmor profile restrictions"}),"."]}),"\n",(0,i.jsx)(r.hr,{}),"\n",(0,i.jsx)(r.h2,{id:"best-practices-for-using-apparmor-in-kubernetes",children:"Best Practices for Using AppArmor in Kubernetes"}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsxs)(r.li,{children:[(0,i.jsx)(r.strong,{children:"Use the RuntimeDefault profile"})," for general security."]}),"\n",(0,i.jsxs)(r.li,{children:[(0,i.jsx)(r.strong,{children:"Create custom profiles"})," for workloads that require ",(0,i.jsx)(r.strong,{children:"strict access control"}),"."]}),"\n",(0,i.jsxs)(r.li,{children:[(0,i.jsx)(r.strong,{children:"Test AppArmor profiles"})," before applying them to production workloads."]}),"\n",(0,i.jsxs)(r.li,{children:[(0,i.jsx)(r.strong,{children:"Deny execution"})," of unwanted binaries (",(0,i.jsx)(r.code,{children:"wget"}),", ",(0,i.jsx)(r.code,{children:"curl"}),", ",(0,i.jsx)(r.code,{children:"rm"}),", etc.) to ",(0,i.jsx)(r.strong,{children:"reduce attack surfaces"}),"."]}),"\n",(0,i.jsxs)(r.li,{children:[(0,i.jsx)(r.strong,{children:"Combine AppArmor with seccomp"})," for ",(0,i.jsx)(r.strong,{children:"stronger workload isolation"}),"."]}),"\n"]}),"\n",(0,i.jsx)(r.hr,{}),"\n",(0,i.jsx)(r.h2,{id:"related-security-features",children:"Related Security Features"}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsxs)(r.li,{children:[(0,i.jsx)(r.strong,{children:(0,i.jsx)(r.a,{href:"/docs/best_practices/cluster_setup_and_hardening/pod_security/seccomp_in_pods",children:"Seccomp Profiles"})})," limit system calls at the kernel level."]}),"\n",(0,i.jsxs)(r.li,{children:[(0,i.jsx)(r.strong,{children:(0,i.jsx)(r.a,{href:"/docs/best_practices/cluster_setup_and_hardening/pod_security/pod_security_standards",children:"Pod Security Standards"})})," enforce security policies for workloads."]}),"\n",(0,i.jsxs)(r.li,{children:[(0,i.jsx)(r.strong,{children:(0,i.jsx)(r.a,{href:"/docs/fundamentals/authorization/rbac",children:"RBAC and Least Privilege"})})," ensure that workloads only have necessary permissions."]}),"\n"]}),"\n",(0,i.jsx)(r.hr,{}),"\n",(0,i.jsx)(r.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,i.jsxs)(r.p,{children:[(0,i.jsx)(r.strong,{children:"AppArmor profiles"})," provide a ",(0,i.jsx)(r.strong,{children:"powerful way"})," to ",(0,i.jsx)(r.strong,{children:"restrict container behavior"})," and ",(0,i.jsx)(r.strong,{children:"enforce security policies"})," in Kubernetes. By using ",(0,i.jsx)(r.strong,{children:"default or custom profiles"}),", you can ",(0,i.jsx)(r.strong,{children:"reduce the attack surface"}),", ",(0,i.jsx)(r.strong,{children:"prevent privilege escalation"}),", and ",(0,i.jsx)(r.strong,{children:"improve container security"}),"."]}),"\n",(0,i.jsxs)(r.p,{children:["For maximum protection, ",(0,i.jsx)(r.strong,{children:"combine AppArmor with seccomp and Pod Security Standards"})," to create ",(0,i.jsx)(r.strong,{children:"a defense-in-depth security strategy"})," for Kubernetes workloads."]})]})}function p(e={}){const{wrapper:r}={...(0,o.R)(),...e.components};return r?(0,i.jsx)(r,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},8453:(e,r,n)=>{n.d(r,{R:()=>t,x:()=>c});var s=n(6540);const i={},o=s.createContext(i);function t(e){const r=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function c(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:t(e.components),s.createElement(o.Provider,{value:r},e.children)}}}]);