"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[470],{6038:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>p,frontMatter:()=>a,metadata:()=>s,toc:()=>l});const s=JSON.parse('{"id":"k8s_security_basics/attack_vectors_examples/privileged_containers","title":"Privileged Containers","description":"Understanding the risks of privileged containers in Kubernetes and implementing best practices to secure workloads.","source":"@site/docs/k8s_security_basics/attack_vectors_examples/privileged_containers.md","sourceDirName":"k8s_security_basics/attack_vectors_examples","slug":"/k8s_security_basics/attack_vectors_examples/privileged_containers","permalink":"/k8s_security/docs/k8s_security_basics/attack_vectors_examples/privileged_containers","draft":false,"unlisted":false,"editUrl":"https://github.com/geek-kb/k8s_security/edit/main/docs/k8s_security_basics/attack_vectors_examples/privileged_containers.md","tags":[],"version":"current","sidebarPosition":3,"frontMatter":{"sidebar_position":3,"title":"Privileged Containers","description":"Understanding the risks of privileged containers in Kubernetes and implementing best practices to secure workloads."},"sidebar":"tutorialSidebar","previous":{"title":"Exposed Kubernetes Dashboard","permalink":"/k8s_security/docs/k8s_security_basics/attack_vectors_examples/exposed_dashboard"},"next":{"title":"Lack of Network Policies","permalink":"/k8s_security/docs/k8s_security_basics/attack_vectors_examples/lack_of_network_policies"}}');var t=i(4848),r=i(8453);const a={sidebar_position:3,title:"Privileged Containers",description:"Understanding the risks of privileged containers in Kubernetes and implementing best practices to secure workloads."},o="Privileged Containers",c={},l=[{value:"Exploitation Steps: Privileged Container",id:"exploitation-steps-privileged-container",level:2},{value:"1. Gain Host Access via Privileged Container",id:"1-gain-host-access-via-privileged-container",level:3},{value:"2. Mount the Host File System",id:"2-mount-the-host-file-system",level:3},{value:"3. Create a Backdoor",id:"3-create-a-backdoor",level:3},{value:"Result",id:"result",level:3},{value:"Mitigation Techniques and Fixes",id:"mitigation-techniques-and-fixes",level:2},{value:"1. Avoid Running Privileged Containers",id:"1-avoid-running-privileged-containers",level:3},{value:"Example Pod Configuration",id:"example-pod-configuration",level:4},{value:"2. Use Pod Security Standards (PSS)",id:"2-use-pod-security-standards-pss",level:3},{value:"Example of a Restricted Pod Security Policy",id:"example-of-a-restricted-pod-security-policy",level:4},{value:"3. Implement Admission Controllers",id:"3-implement-admission-controllers",level:3},{value:"Example Using OPA Gatekeeper Policy",id:"example-using-opa-gatekeeper-policy",level:4},{value:"Conclusion",id:"conclusion",level:2}];function d(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"privileged-containers",children:"Privileged Containers"})}),"\n",(0,t.jsx)(n.p,{children:"Privileged containers run with elevated permissions, granting them access to the host system's resources. This configuration can lead to severe security risks, including the ability to modify the host file system, access hardware devices, and escalate privileges to the host."}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"exploitation-steps-privileged-container",children:"Exploitation Steps: Privileged Container"}),"\n",(0,t.jsx)(n.p,{children:"An attacker identifies a privileged container in the Kubernetes cluster using kubectl:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"kubectl get pods -o json | jq '.items[] | select(.spec.containers[].securityContext.privileged == true) | .metadata.name'\n"})}),"\n",(0,t.jsx)(n.h3,{id:"1-gain-host-access-via-privileged-container",children:"1. Gain Host Access via Privileged Container"}),"\n",(0,t.jsx)(n.p,{children:"The attacker can execute commands as root on the host system:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"kubectl exec -it <privileged-pod> -- /bin/sh\n"})}),"\n",(0,t.jsx)(n.h3,{id:"2-mount-the-host-file-system",children:"2. Mount the Host File System"}),"\n",(0,t.jsx)(n.p,{children:"The attacker mounts the host's root file system to the privileged container:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"mkdir /mnt/host\nmount -o bind / /mnt/host\ncd /mnt/host\nls -al\n"})}),"\n",(0,t.jsx)(n.h3,{id:"3-create-a-backdoor",children:"3. Create a Backdoor"}),"\n",(0,t.jsx)(n.p,{children:"The attacker adds a malicious user to the host /etc/passwd file, creating a backdoor:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"echo 'malicious_user:x:0:0:root:/root:/bin/bash' >> /mnt/host/etc/passwd\n"})}),"\n",(0,t.jsx)(n.h3,{id:"result",children:"Result"}),"\n",(0,t.jsx)(n.p,{children:"The attacker gains persistent access to the host system, allowing them to execute commands as root, manipulate files, and bypass container isolation."}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"mitigation-techniques-and-fixes",children:"Mitigation Techniques and Fixes"}),"\n",(0,t.jsx)(n.h3,{id:"1-avoid-running-privileged-containers",children:"1. Avoid Running Privileged Containers"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Issue:"})," Privileged containers can bypass security boundaries and access the host.",(0,t.jsx)("br",{}),"\n",(0,t.jsx)(n.strong,{children:"Fix:"})," Set ",(0,t.jsx)(n.strong,{children:"privileged: false"})," in the ",(0,t.jsx)(n.strong,{children:"PodSecurityContext"}),"."]}),"\n",(0,t.jsx)(n.h4,{id:"example-pod-configuration",children:"Example Pod Configuration"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"apiVersion: v1\nkind: Pod\nmetadata:\n  name: non-privileged-pod\nspec:\n  containers:\n  - name: app-container\n    image: nginx\n    securityContext:\n      privileged: false\n"})}),"\n",(0,t.jsx)(n.h3,{id:"2-use-pod-security-standards-pss",children:"2. Use Pod Security Standards (PSS)"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Issue:"})," Lack of security policies allows privileged containers to run.",(0,t.jsx)("br",{}),"\n",(0,t.jsx)(n.strong,{children:"Fix:"})," Enforce ",(0,t.jsx)(n.strong,{children:"Pod Security Policies (PSP)"})," or ",(0,t.jsx)(n.strong,{children:"Pod Security Standards (PSS)"}),"."]}),"\n",(0,t.jsx)(n.h4,{id:"example-of-a-restricted-pod-security-policy",children:"Example of a Restricted Pod Security Policy"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"apiVersion: policy/v1beta1\nkind: PodSecurityPolicy\nmetadata:\n  name: restricted-psp\nspec:\n  privileged: false\n  runAsUser:\n    rule: MustRunAsNonRoot\n  allowPrivilegeEscalation: false\n  volumes:\n    - configMap\n    - emptyDir\n    - projected\n    - secret\n    - downwardAPI\n  seLinux:\n    rule: RunAsAny\n"})}),"\n",(0,t.jsx)(n.h3,{id:"3-implement-admission-controllers",children:"3. Implement Admission Controllers"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Issue:"})," Privileged containers can be created without restriction.",(0,t.jsx)("br",{}),"\n",(0,t.jsx)(n.strong,{children:"Fix:"})," Use ",(0,t.jsx)(n.strong,{children:"admission controllers"})," to ",(0,t.jsx)(n.strong,{children:"block privileged containers"}),"."]}),"\n",(0,t.jsx)(n.h4,{id:"example-using-opa-gatekeeper-policy",children:"Example Using OPA Gatekeeper Policy"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:'apiVersion: templates.gatekeeper.sh/v1beta1\nkind: ConstraintTemplate\nmetadata:\n  name: k8sprivilegedcontainer\nspec:\n  crd:\n    spec:\n      names:\n        kind: K8sPrivilegedContainer\n  targets:\n    - target: admission.k8s.gatekeeper.sh\n      rego: |\n        package k8sprivilegedcontainer\n\n        violation[{"msg": msg}] {\n          input.review.object.spec.containers[_].securityContext.privileged == true\n          msg := "Privileged containers are not allowed"\n        }\n---\napiVersion: constraints.gatekeeper.sh/v1beta1\nkind: K8sPrivilegedContainer\nmetadata:\n  name: deny-privileged-containers\nspec:\n  match:\n    kinds:\n      - apiGroups: [""]\n        kinds: ["Pod"]\n'})}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,t.jsx)(n.p,{children:"To mitigate risks associated with privileged containers:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Disable privileged mode by setting ",(0,t.jsx)(n.strong,{children:"privileged: false"})," in the ",(0,t.jsx)(n.strong,{children:"securityContext"}),"."]}),"\n",(0,t.jsxs)(n.li,{children:["Enforce ",(0,t.jsx)(n.strong,{children:"Pod Security Standards (PSS)"})," to restrict ",(0,t.jsx)(n.strong,{children:"risky configurations"}),"."]}),"\n",(0,t.jsxs)(n.li,{children:["Use ",(0,t.jsx)(n.strong,{children:"admission controllers"})," to ",(0,t.jsx)(n.strong,{children:"prevent privileged container deployments"}),"."]}),"\n"]})]})}function p(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>a,x:()=>o});var s=i(6540);const t={},r=s.createContext(t);function a(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);