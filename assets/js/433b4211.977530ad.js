"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[3195],{5649:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>o,contentTitle:()=>a,default:()=>u,frontMatter:()=>c,metadata:()=>r,toc:()=>d});const r=JSON.parse('{"id":"best_practices/cluster_setup_and_hardening/intro","title":"Introduction","description":"Overview of cluster setup and hardening practices in Kubernetes, covering the critical domains necessary to build a secure and resilient environment.","source":"@site/docs/best_practices/cluster_setup_and_hardening/intro.md","sourceDirName":"best_practices/cluster_setup_and_hardening","slug":"/best_practices/cluster_setup_and_hardening/intro","permalink":"/docs/best_practices/cluster_setup_and_hardening/intro","draft":false,"unlisted":false,"editUrl":"https://github.com/geek-kb/k8s_security/edit/main/docs/best_practices/cluster_setup_and_hardening/intro.md","tags":[],"version":"current","lastUpdatedBy":"Itai Ganot","lastUpdatedAt":1742826170000,"sidebarPosition":1,"frontMatter":{"sidebar_position":1,"title":"Introduction","description":"Overview of cluster setup and hardening practices in Kubernetes, covering the critical domains necessary to build a secure and resilient environment."},"sidebar":"default","previous":{"title":"Introduction","permalink":"/docs/best_practices/intro"},"next":{"title":"Understanding CIS Benchmarks","permalink":"/docs/best_practices/cluster_setup_and_hardening/cis/understanding_cis_benchmarks"}}');var i=s(4848),t=s(8453);const c={sidebar_position:1,title:"Introduction",description:"Overview of cluster setup and hardening practices in Kubernetes, covering the critical domains necessary to build a secure and resilient environment."},a="Cluster Setup and Hardening",o={},d=[{value:"CIS Benchmarks and Auditing",id:"cis-benchmarks-and-auditing",level:2},{value:"API Server Security",id:"api-server-security",level:2},{value:"Control Plane Security",id:"control-plane-security",level:2},{value:"Network Security",id:"network-security",level:2},{value:"Node Security",id:"node-security",level:2},{value:"Pod Security",id:"pod-security",level:2},{value:"RBAC and Identity",id:"rbac-and-identity",level:2},{value:"Secrets Management",id:"secrets-management",level:2},{value:"Configuration Validation",id:"configuration-validation",level:2},{value:"Conclusion",id:"conclusion",level:2}];function l(e){const n={a:"a",br:"br",code:"code",h1:"h1",h2:"h2",header:"header",hr:"hr",li:"li",p:"p",ul:"ul",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"cluster-setup-and-hardening",children:"Cluster Setup and Hardening"})}),"\n",(0,i.jsx)(n.p,{children:"Securing a Kubernetes cluster starts with configuring its components securely from the ground up. This section provides practical best practices for hardening the Kubernetes control plane, networking, pod specifications, access controls, and secrets management."}),"\n",(0,i.jsx)(n.p,{children:"Each article in this section helps you reduce the attack surface, implement defense-in-depth, and align with industry standards such as the CIS Kubernetes Benchmark."}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"cis-benchmarks-and-auditing",children:"CIS Benchmarks and Auditing"}),"\n",(0,i.jsxs)(n.p,{children:["Audit your cluster using the ",(0,i.jsx)(n.a,{href:"https://www.cisecurity.org/benchmark/kubernetes",children:"CIS Kubernetes Benchmark"})," to validate configuration and hardening."]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"/docs/best_practices/cluster_setup_and_hardening/cis/understanding_cis_benchmarks",children:"What Are CIS Benchmarks"}),(0,i.jsx)(n.br,{}),"\n","Understand the purpose and structure of the benchmark."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"/docs/best_practices/cluster_setup_and_hardening/cis/cis_benchmark_for_k8s",children:"CIS Benchmark for Kubernetes"}),(0,i.jsx)(n.br,{}),"\n","Manual overview of CIS controls and remediation strategies."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"/docs/best_practices/cluster_setup_and_hardening/cis/cis_benchmark_kube_bench",children:"CIS Benchmark with kube-bench"}),(0,i.jsx)(n.br,{}),"\n","Use ",(0,i.jsx)(n.code,{children:"kube-bench"})," to automate CIS compliance checks."]}),"\n"]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"api-server-security",children:"API Server Security"}),"\n",(0,i.jsx)(n.p,{children:"Harden the Kubernetes API server by limiting exposure, validating requests, and securing access."}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"/docs/best_practices/cluster_setup_and_hardening/api_server_security/compromised_api_server_mitigation",children:"API Server Security"}),(0,i.jsx)(n.br,{}),"\n","Understand the core threats to the API server and how to restrict its attack surface."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"/docs/best_practices/cluster_setup_and_hardening/api_server_security/misconfigured_admission_controllers_mitigation",children:"Mitigating Misconfigured Admission Controllers"}),(0,i.jsx)(n.br,{}),"\n","Prevent insecure resource admission through proper controller configuration."]}),"\n"]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"control-plane-security",children:"Control Plane Security"}),"\n",(0,i.jsx)(n.p,{children:"Protect critical components like etcd, which store and manage sensitive cluster state."}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"/docs/best_practices/cluster_setup_and_hardening/control_plane_security/etcd_security_mitigation",children:"etcd Security Mitigation"}),(0,i.jsx)(n.br,{}),"\n","Secure etcd access, enforce encryption, and limit access to only necessary components."]}),"\n"]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"network-security",children:"Network Security"}),"\n",(0,i.jsx)(n.p,{children:"Control inter-pod and external traffic, apply segmentation, and reduce exposure."}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"/docs/best_practices/cluster_setup_and_hardening/network_security/ddos_mitigation",children:"DDoS Mitigation"}),(0,i.jsx)(n.br,{}),"\n","Prevent abuse of exposed services through rate limiting and throttling."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"/docs/best_practices/cluster_setup_and_hardening/network_security/dns_security",children:"DNS Security"}),(0,i.jsx)(n.br,{}),"\n","Secure internal name resolution and prevent DNS poisoning."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"/docs/best_practices/cluster_setup_and_hardening/network_security/egress_control",children:"Egress Control"}),(0,i.jsx)(n.br,{}),"\n","Limit which external services workloads can access."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"/docs/best_practices/cluster_setup_and_hardening/network_security/exposed_dashboard_mitigation",children:"Exposed Dashboard Mitigation"}),(0,i.jsx)(n.br,{}),"\n","Prevent unauthorized access to the Kubernetes Dashboard."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"/docs/best_practices/cluster_setup_and_hardening/network_security/ingress_security",children:"Ingress Security"}),(0,i.jsx)(n.br,{}),"\n","Harden ingress controllers to enforce authentication and sanitize inputs."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"/docs/best_practices/cluster_setup_and_hardening/network_security/network_policies",children:"Network Policies"}),(0,i.jsx)(n.br,{}),"\n","Use Kubernetes Network Policies to isolate workloads."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"/docs/best_practices/cluster_setup_and_hardening/network_security/service_mesh_security",children:"Service Mesh Security"}),(0,i.jsx)(n.br,{}),"\n","Secure service-to-service communication using service mesh features."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"/docs/best_practices/cluster_setup_and_hardening/network_security/traffic_hijacking_mitigation",children:"Traffic Hijacking Mitigation"}),(0,i.jsx)(n.br,{}),"\n","Prevent interception or redirection of internal or external traffic."]}),"\n"]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"node-security",children:"Node Security"}),"\n",(0,i.jsx)(n.p,{children:"Harden Kubernetes nodes to reduce the risk of host compromise."}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"/docs/best_practices/cluster_setup_and_hardening/node_security/kubelet_security",children:"Kubelet Security"}),(0,i.jsx)(n.br,{}),"\n","Secure the Kubelet API and disable insecure ports."]}),"\n"]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"pod-security",children:"Pod Security"}),"\n",(0,i.jsx)(n.p,{children:"Restrict container capabilities and prevent lateral movement through unsafe pod configurations."}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"/docs/best_practices/cluster_setup_and_hardening/pod_security/app_armor_profiles",children:"AppArmor Profiles"}),(0,i.jsx)(n.br,{}),"\n","Apply AppArmor to restrict syscalls available to containers."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"/docs/best_practices/cluster_setup_and_hardening/pod_security/compromised_sidecars_mitigation",children:"Compromised Sidecars Mitigation"}),(0,i.jsx)(n.br,{}),"\n","Prevent sidecars from becoming privilege escalation vectors."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"/docs/best_practices/cluster_setup_and_hardening/pod_security/container_escape_mitigation",children:"Container Escape Mitigation"}),(0,i.jsx)(n.br,{}),"\n","Secure containers to prevent escapes into the host."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"/docs/best_practices/cluster_setup_and_hardening/pod_security/csi_driver_mitigation",children:"CSI Driver Mitigation"}),(0,i.jsx)(n.br,{}),"\n","Avoid misuse or over-privileging of custom CSI drivers."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"/docs/best_practices/cluster_setup_and_hardening/pod_security/pod_sandboxing",children:"Pod Sandboxing"}),(0,i.jsx)(n.br,{}),"\n","Isolate workloads using gVisor, Kata Containers, or Firecracker."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"/docs/best_practices/cluster_setup_and_hardening/pod_security/pod_security_standards",children:"Pod Security Standards"}),(0,i.jsx)(n.br,{}),"\n","Enforce Kubernetes Pod Security admission with baseline, restricted, or privileged profiles."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"/docs/best_practices/cluster_setup_and_hardening/pod_security/seccomp_in_pods",children:"Seccomp in Pods"}),(0,i.jsx)(n.br,{}),"\n","Limit syscalls through Seccomp profiles."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"/docs/best_practices/cluster_setup_and_hardening/pod_security/unrestricted_hostpath_mitigation",children:"Unrestricted hostPath Mitigation"}),(0,i.jsx)(n.br,{}),"\n","Prevent containers from mounting arbitrary host paths."]}),"\n"]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"rbac-and-identity",children:"RBAC and Identity"}),"\n",(0,i.jsx)(n.p,{children:"Apply least privilege and control access using Kubernetes-native identity and permission models."}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"/docs/best_practices/cluster_setup_and_hardening/rbac_and_identity/insecure_rbac_permissions_mitigation",children:"Insecure RBAC Permissions Mitigation"}),(0,i.jsx)(n.br,{}),"\n","Avoid over-permissioned roles that allow privilege escalation."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"/docs/best_practices/cluster_setup_and_hardening/rbac_and_identity/service_account_mitigation",children:"Service Account Mitigation"}),(0,i.jsx)(n.br,{}),"\n","Secure workload identity and token usage."]}),"\n"]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"secrets-management",children:"Secrets Management"}),"\n",(0,i.jsx)(n.p,{children:"Store and access secrets securely, both inside Kubernetes and via external tools."}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"/docs/best_practices/cluster_setup_and_hardening/secrets_management/insecure_secrets_management_mitigation",children:"Insecure Secrets Management Mitigation"}),(0,i.jsx)(n.br,{}),"\n","Enable encryption at rest, and integrate with external secret stores like Vault, AWS SSM, and Akeyless."]}),"\n"]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"configuration-validation",children:"Configuration Validation"}),"\n",(0,i.jsx)(n.p,{children:"Validate Kubernetes manifests to detect insecure configurations and enforce best practices before deployment."}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"/docs/best_practices/cluster_setup_and_hardening/configuration_validation/kube_score",children:"Kube-Score"}),(0,i.jsx)(n.br,{}),"\n","Analyze Kubernetes resource definitions for potential security risks, misconfigurations, and architectural issues."]}),"\n"]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,i.jsx)(n.p,{children:"Cluster setup and hardening is the foundation of Kubernetes security. Each component \u2014 from nodes to API access to pod policies \u2014 contributes to the overall security posture."}),"\n",(0,i.jsx)(n.p,{children:"Use this section as a hands-on guide to secure every layer of your Kubernetes control and data planes, following both community best practices and formal compliance frameworks."})]})}function u(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>c,x:()=>a});var r=s(6540);const i={},t=r.createContext(i);function c(e){const n=r.useContext(t);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:c(e.components),r.createElement(t.Provider,{value:n},e.children)}}}]);