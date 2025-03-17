"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[3614],{4711:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>o,contentTitle:()=>c,default:()=>p,frontMatter:()=>a,metadata:()=>r,toc:()=>d});const r=JSON.parse('{"id":"attack_vectors/compromised_api_server","title":"Compromised API Server","description":"Exploiting Kubernetes API server vulnerabilities and how attackers gain unauthorized access.","source":"@site/docs/attack_vectors/compromised_api_server.md","sourceDirName":"attack_vectors","slug":"/attack_vectors/compromised_api_server","permalink":"/k8s_security/docs/attack_vectors/compromised_api_server","draft":false,"unlisted":false,"editUrl":"https://github.com/geek-kb/k8s_security/edit/main/docs/attack_vectors/compromised_api_server.md","tags":[],"version":"current","sidebarPosition":3,"frontMatter":{"sidebar_position":3,"title":"Compromised API Server","description":"Exploiting Kubernetes API server vulnerabilities and how attackers gain unauthorized access."},"sidebar":"guidesSidebar","previous":{"title":"Section Introduction","permalink":"/k8s_security/docs/attack_vectors/intro"},"next":{"title":"Exposed Kubernetes Dashboard","permalink":"/k8s_security/docs/attack_vectors/exposed_dashboard"}}');var i=s(4848),n=s(8453);const a={sidebar_position:3,title:"Compromised API Server",description:"Exploiting Kubernetes API server vulnerabilities and how attackers gain unauthorized access."},c="Compromised API Server",o={},d=[{value:"Exploitation Steps: Exposed API Endpoints",id:"exploitation-steps-exposed-api-endpoints",level:2},{value:"Access API Server Without Authentication",id:"access-api-server-without-authentication",level:3},{value:"Delete Critical Resources",id:"delete-critical-resources",level:3},{value:"Escalating Access",id:"escalating-access",level:3},{value:"Result",id:"result",level:3}];function l(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",p:"p",pre:"pre",...(0,n.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.header,{children:(0,i.jsx)(t.h1,{id:"compromised-api-server",children:"Compromised API Server"})}),"\n",(0,i.jsx)(t.p,{children:"A compromised API server can provide attackers with unauthorized access to a Kubernetes cluster, allowing them to view, modify, or delete resources. This type of attack can lead to severe disruptions, including unauthorized data exposure, service downtime, and potential breaches of sensitive environments."}),"\n",(0,i.jsx)(t.hr,{}),"\n",(0,i.jsx)(t.h2,{id:"exploitation-steps-exposed-api-endpoints",children:"Exploitation Steps: Exposed API Endpoints"}),"\n",(0,i.jsx)(t.p,{children:"An attacker identifies an exposed API server using a port scan:"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-bash",children:"nmap -p 6443 <cluster-ip>\n"})}),"\n",(0,i.jsx)(t.h3,{id:"access-api-server-without-authentication",children:"Access API Server Without Authentication"}),"\n",(0,i.jsx)(t.p,{children:"The attacker attempts to list all pods using a curl request:"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-bash",children:"curl -k https://<api-server-ip>:6443/api/v1/pods\n"})}),"\n",(0,i.jsx)(t.p,{children:"If authentication is misconfigured or disabled, the API server may respond with a list of active pods in the cluster."}),"\n",(0,i.jsx)(t.h3,{id:"delete-critical-resources",children:"Delete Critical Resources"}),"\n",(0,i.jsx)(t.p,{children:"The attacker attempts to delete a specific pod:"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-bash",children:"curl -k -X DELETE https://<api-server-ip>:6443/api/v1/namespaces/default/pods/victim-pod\n"})}),"\n",(0,i.jsx)(t.p,{children:"If the API server does not enforce strict authentication and authorization policies, this request may succeed, resulting in service disruptions."}),"\n",(0,i.jsx)(t.h3,{id:"escalating-access",children:"Escalating Access"}),"\n",(0,i.jsx)(t.p,{children:"If the attacker is able to retrieve service account tokens, Kubernetes secrets, or privileged credentials, they may escalate their access and gain control over additional cluster resources. Exploiting weak RBAC policies or misconfigured admission controllers can allow unauthorized privilege escalation."}),"\n",(0,i.jsx)(t.h3,{id:"result",children:"Result"}),"\n",(0,i.jsx)(t.p,{children:"A compromised API server can be used to manipulate cluster resources, exfiltrate sensitive data, deploy malicious workloads, or escalate privileges to gain full control of the cluster. In extreme cases, attackers can use the API server as an entry point to compromise the underlying infrastructure."}),"\n",(0,i.jsx)(t.hr,{}),"\n",(0,i.jsx)(t.p,{children:"To learn how to secure the API server and prevent such attacks, refer to the mitigation guide:"}),"\n",(0,i.jsxs)(t.p,{children:["\u27a1 ",(0,i.jsx)(t.a,{href:"https://geek-kb.github.io/k8s_security/docs/best_practices/cluster_setup_and_hardening/api_server_security/",children:"Securing the Kubernetes API Server"})]})]})}function p(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},8453:(e,t,s)=>{s.d(t,{R:()=>a,x:()=>c});var r=s(6540);const i={},n=r.createContext(i);function a(e){const t=r.useContext(n);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),r.createElement(n.Provider,{value:t},e.children)}}}]);