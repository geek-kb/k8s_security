"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[5218],{6089:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>o,contentTitle:()=>a,default:()=>u,frontMatter:()=>c,metadata:()=>t,toc:()=>l});const t=JSON.parse('{"id":"best_practices/cluster_setup_and_hardening/kubelet_security","title":"Kubelet Security","description":"Learn best practices for securing the Kubernetes Kubelet to maintain cluster integrity and prevent security risks.","source":"@site/docs/best_practices/cluster_setup_and_hardening/kubelet_security.md","sourceDirName":"best_practices/cluster_setup_and_hardening","slug":"/best_practices/cluster_setup_and_hardening/kubelet_security","permalink":"/k8s_security/docs/best_practices/cluster_setup_and_hardening/kubelet_security","draft":false,"unlisted":false,"editUrl":"https://github.com/geek-kb/k8s_security/edit/main/docs/best_practices/cluster_setup_and_hardening/kubelet_security.md","tags":[],"version":"current","sidebarPosition":5,"frontMatter":{"sidebar_position":5,"title":"Kubelet Security","description":"Learn best practices for securing the Kubernetes Kubelet to maintain cluster integrity and prevent security risks."},"sidebar":"guidesSidebar","previous":{"title":"Pod Sandboxing","permalink":"/k8s_security/docs/best_practices/cluster_setup_and_hardening/pod_security/pod_sandboxing"},"next":{"title":"Intro","permalink":"/k8s_security/docs/best_practices/cluster_setup_and_hardening/network_security/intro"}}');var r=n(4848),i=n(8453);const c={sidebar_position:5,title:"Kubelet Security",description:"Learn best practices for securing the Kubernetes Kubelet to maintain cluster integrity and prevent security risks."},a="Kubelet Security",o={},l=[{value:"Key Risks of an Insecure Kubelet",id:"key-risks-of-an-insecure-kubelet",level:2},{value:"Kubelet Security Best Practices",id:"kubelet-security-best-practices",level:2},{value:"1. Restrict Kubelet API Access",id:"1-restrict-kubelet-api-access",level:3},{value:"2. Enforce TLS Encryption",id:"2-enforce-tls-encryption",level:3},{value:"3. Enable Authentication and Authorization",id:"3-enable-authentication-and-authorization",level:3},{value:"4. Disable Anonymous Access",id:"4-disable-anonymous-access",level:3},{value:"5. Implement Pod Security Standards",id:"5-implement-pod-security-standards",level:3},{value:"6. Restrict Kubelet Permissions with RBAC",id:"6-restrict-kubelet-permissions-with-rbac",level:3},{value:"7. Enable Audit Logging for Kubelet Actions",id:"7-enable-audit-logging-for-kubelet-actions",level:3},{value:"8. Regularly Update and Patch the Kubelet",id:"8-regularly-update-and-patch-the-kubelet",level:3},{value:"9. Limit Resource Consumption",id:"9-limit-resource-consumption",level:3},{value:"Key Takeaways",id:"key-takeaways",level:2}];function d(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.header,{children:(0,r.jsx)(s.h1,{id:"kubelet-security",children:"Kubelet Security"})}),"\n",(0,r.jsxs)(s.p,{children:["The ",(0,r.jsx)(s.strong,{children:"Kubelet"})," is a critical component of a ",(0,r.jsx)(s.strong,{children:"Kubernetes node"}),", responsible for managing containers and ensuring that workloads are running as expected. Since it has direct control over the ",(0,r.jsx)(s.strong,{children:"node's container runtime and API interactions"}),", securing the ",(0,r.jsx)(s.strong,{children:"Kubelet"})," is essential to prevent unauthorized access and mitigate security risks."]}),"\n",(0,r.jsx)(s.h2,{id:"key-risks-of-an-insecure-kubelet",children:"Key Risks of an Insecure Kubelet"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Node Compromise:"})," If an attacker gains control over a Kubelet, they can access ",(0,r.jsx)(s.strong,{children:"running pods"}),", ",(0,r.jsx)(s.strong,{children:"host resources"}),", and ",(0,r.jsx)(s.strong,{children:"secrets"})," stored on the node."]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Cluster-wide Exposure:"})," Improperly secured Kubelets can be used to escalate privileges across the ",(0,r.jsx)(s.strong,{children:"Kubernetes cluster"}),"."]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"API Exploits:"})," The Kubelet exposes an API that, if not properly configured, could allow ",(0,r.jsx)(s.strong,{children:"unauthorized access"}),"."]}),"\n"]}),"\n",(0,r.jsx)(s.h2,{id:"kubelet-security-best-practices",children:"Kubelet Security Best Practices"}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.strong,{children:"Required knowledge for the CKS certification."})}),"\n",(0,r.jsx)(s.h3,{id:"1-restrict-kubelet-api-access",children:"1. Restrict Kubelet API Access"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"Issue:"})," The Kubelet API should not be accessible from untrusted networks.",(0,r.jsx)("br",{}),"\n",(0,r.jsx)(s.strong,{children:"Fix:"})," Bind the ",(0,r.jsx)(s.strong,{children:"Kubelet API"})," to localhost or a restricted network."]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-bash",children:"--address=127.0.0.1\n--read-only-port=0\n"})}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:["Setting ",(0,r.jsx)(s.code,{children:"--read-only-port=0"})," disables the unauthenticated read-only Kubelet API."]}),"\n",(0,r.jsxs)(s.li,{children:["Configuring ",(0,r.jsx)(s.code,{children:"--address=127.0.0.1"})," ensures that only local processes can access the Kubelet API."]}),"\n"]}),"\n",(0,r.jsxs)(s.p,{children:["For more information, refer to ",(0,r.jsx)(s.a,{href:"/docs/fundamentals/authentication/authentication_methods",children:"Kubernetes API Security"}),"."]}),"\n",(0,r.jsx)(s.h3,{id:"2-enforce-tls-encryption",children:"2. Enforce TLS Encryption"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"Issue:"})," Unencrypted communication with the Kubelet can expose sensitive data.",(0,r.jsx)("br",{}),"\n",(0,r.jsx)(s.strong,{children:"Fix:"})," Require TLS for all Kubelet API interactions."]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-yaml",children:"# Example Kubelet TLS Configuration\n--tls-cert-file=/var/lib/kubelet/pki/kubelet.crt\n--tls-private-key-file=/var/lib/kubelet/pki/kubelet.key\n--client-ca-file=/var/lib/kubernetes/pki/ca.crt\n"})}),"\n",(0,r.jsxs)(s.p,{children:["For more information on TLS and securing communication in Kubernetes, refer to ",(0,r.jsx)(s.a,{href:"/docs/fundamentals/authentication/certificates",children:"Certificates in Kubernetes"}),"."]}),"\n",(0,r.jsx)(s.h3,{id:"3-enable-authentication-and-authorization",children:"3. Enable Authentication and Authorization"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"Issue:"})," Open access to the Kubelet API can lead to unauthorized actions.",(0,r.jsx)("br",{}),"\n",(0,r.jsx)(s.strong,{children:"Fix:"})," Require client authentication and enforce RBAC authorization."]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-yaml",children:"# Enforce Webhook Authorization and Authentication\n--authorization-mode=Webhook\n--authentication-token-webhook=true\n--client-ca-file=/var/lib/kubernetes/pki/ca.crt\n"})}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.code,{children:"--authorization-mode=Webhook"})," enforces ",(0,r.jsx)(s.strong,{children:"Kubernetes RBAC policies"}),"."]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.code,{children:"--authentication-token-webhook=true"})," requires ",(0,r.jsx)(s.strong,{children:"API authentication tokens"}),"."]}),"\n"]}),"\n",(0,r.jsxs)(s.p,{children:["For more details, refer to ",(0,r.jsx)(s.a,{href:"/docs/fundamentals/authorization/rbac",children:"Role-Based Access Control (RBAC)"}),"."]}),"\n",(0,r.jsx)(s.h3,{id:"4-disable-anonymous-access",children:"4. Disable Anonymous Access"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"Issue:"})," By default, the Kubelet allows anonymous access, which can lead to ",(0,r.jsx)(s.strong,{children:"unauthorized API calls"}),".",(0,r.jsx)("br",{}),"\n",(0,r.jsx)(s.strong,{children:"Fix:"})," Explicitly disable anonymous authentication."]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-bash",children:"--anonymous-auth=false\n"})}),"\n",(0,r.jsx)(s.h3,{id:"5-implement-pod-security-standards",children:"5. Implement Pod Security Standards"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"Issue:"})," Pods with excessive privileges can exploit the Kubelet API.",(0,r.jsx)("br",{}),"\n",(0,r.jsx)(s.strong,{children:"Fix:"})," Use ",(0,r.jsx)(s.strong,{children:"Pod Security Admission (PSA)"})," to enforce security constraints."]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-yaml",children:'# Example PSA Configuration\napiVersion: v1\nkind: Namespace\nmetadata:\n  name: restricted\n  labels:\n    pod-security.kubernetes.io/enforce: "restricted"\n    pod-security.kubernetes.io/audit: "restricted"\n    pod-security.kubernetes.io/warn: "restricted"\n'})}),"\n",(0,r.jsxs)(s.p,{children:["For a detailed guide on ",(0,r.jsx)(s.strong,{children:"pod security measures"}),", see ",(0,r.jsx)(s.a,{href:"/docs/best_practices/cluster_setup_and_hardening/pod_security/pod_security_standards",children:"Pod Security Standards"}),"."]}),"\n",(0,r.jsx)(s.h3,{id:"6-restrict-kubelet-permissions-with-rbac",children:"6. Restrict Kubelet Permissions with RBAC"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"Issue:"})," If the Kubelet has excessive permissions, it could be used to manipulate the cluster.",(0,r.jsx)("br",{}),"\n",(0,r.jsx)(s.strong,{children:"Fix:"})," Use ",(0,r.jsx)(s.strong,{children:"RBAC policies"})," to control Kubelet access."]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-yaml",children:'# Example RBAC for Kubelet\nkind: ClusterRole\napiVersion: rbac.authorization.k8s.io/v1\nmetadata:\n  name: kubelet-restricted\nrules:\n  - apiGroups: [""]\n    resources: ["pods", "nodes"]\n    verbs: ["get", "list"]\n'})}),"\n",(0,r.jsxs)(s.p,{children:["For more details on ",(0,r.jsx)(s.strong,{children:"RBAC security"}),", refer to ",(0,r.jsx)(s.a,{href:"/docs/fundamentals/authorization/rbac",children:"Role-Based Access Control"}),"."]}),"\n",(0,r.jsx)(s.h3,{id:"7-enable-audit-logging-for-kubelet-actions",children:"7. Enable Audit Logging for Kubelet Actions"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"Issue:"})," Lack of monitoring makes it difficult to detect ",(0,r.jsx)(s.strong,{children:"malicious activity"}),".",(0,r.jsx)("br",{}),"\n",(0,r.jsx)(s.strong,{children:"Fix:"})," Enable ",(0,r.jsx)(s.strong,{children:"audit logs"})," to track API requests and access patterns."]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-bash",children:"--audit-log-path=/var/log/kubelet-audit.log\n--audit-policy-file=/etc/kubernetes/audit-policy.yaml\n"})}),"\n",(0,r.jsxs)(s.p,{children:["For a comprehensive approach to ",(0,r.jsx)(s.strong,{children:"monitoring and logging"}),", refer to ",(0,r.jsx)(s.a,{href:"/docs/best_practices/monitoring_logging_and_runtime_security/intro",children:"Monitoring, Logging, and Runtime Security"}),"."]}),"\n",(0,r.jsx)(s.h3,{id:"8-regularly-update-and-patch-the-kubelet",children:"8. Regularly Update and Patch the Kubelet"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"Issue:"})," Older versions of the Kubelet may have ",(0,r.jsx)(s.strong,{children:"known vulnerabilities"}),".",(0,r.jsx)("br",{}),"\n",(0,r.jsx)(s.strong,{children:"Fix:"})," Always use ",(0,r.jsx)(s.strong,{children:"the latest stable version"})," and apply security patches."]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-bash",children:"# Check the current Kubelet version\nkubelet --version\n"})}),"\n",(0,r.jsxs)(s.p,{children:["For more details on ",(0,r.jsx)(s.strong,{children:"patching and updates"}),", refer to ",(0,r.jsx)(s.a,{href:"/docs/best_practices/cluster_setup_and_hardening/what_are_cis_benchmarks",children:"Kubernetes Hardening Guide"}),"."]}),"\n",(0,r.jsx)(s.h3,{id:"9-limit-resource-consumption",children:"9. Limit Resource Consumption"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"Issue:"})," Unrestricted Kubelet resource usage can lead to ",(0,r.jsx)(s.strong,{children:"resource exhaustion attacks"}),".",(0,r.jsx)("br",{}),"\n",(0,r.jsx)(s.strong,{children:"Fix:"})," Set resource limits."]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-bash",children:"--kube-reserved=cpu=200m,memory=512Mi,ephemeral-storage=1Gi\n--system-reserved=cpu=100m,memory=256Mi,ephemeral-storage=1Gi\n"})}),"\n",(0,r.jsxs)(s.p,{children:["For more on securing workloads and limiting resource consumption, see ",(0,r.jsx)(s.a,{href:"/docs/best_practices/cluster_setup_and_hardening/intro",children:"Cluster Setup and Hardening"}),"."]}),"\n",(0,r.jsx)(s.h2,{id:"key-takeaways",children:"Key Takeaways"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:["The ",(0,r.jsx)(s.strong,{children:"Kubelet API"})," should always be ",(0,r.jsx)(s.strong,{children:"secured with authentication, authorization, and encryption"}),"."]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"RBAC policies"})," should be used to limit the Kubelet\u2019s access to cluster resources."]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Pod Security Admission (PSA)"})," helps enforce security standards at the ",(0,r.jsx)(s.strong,{children:"pod level"}),"."]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Regular updates"})," and ",(0,r.jsx)(s.strong,{children:"audit logging"})," are essential for detecting and mitigating security risks."]}),"\n"]}),"\n",(0,r.jsxs)(s.p,{children:["By following these best practices, you can significantly ",(0,r.jsx)(s.strong,{children:"reduce the attack surface"})," of your Kubernetes ",(0,r.jsx)(s.strong,{children:"nodes"})," and ",(0,r.jsx)(s.strong,{children:"ensure a secure cluster environment"}),"."]})]})}function u(e={}){const{wrapper:s}={...(0,i.R)(),...e.components};return s?(0,r.jsx)(s,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},8453:(e,s,n)=>{n.d(s,{R:()=>c,x:()=>a});var t=n(6540);const r={},i=t.createContext(r);function c(e){const s=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function a(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:c(e.components),t.createElement(i.Provider,{value:s},e.children)}}}]);