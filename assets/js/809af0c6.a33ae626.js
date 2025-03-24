"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[2544],{8453:(e,t,r)=>{r.d(t,{R:()=>a,x:()=>c});var n=r(6540);const i={},s=n.createContext(i);function a(e){const t=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),n.createElement(s.Provider,{value:t},e.children)}},9004:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>o,contentTitle:()=>c,default:()=>l,frontMatter:()=>a,metadata:()=>n,toc:()=>u});const n=JSON.parse('{"id":"certificates/issue_certificate_for_k8s_user","title":"How to Issue a Certificate for a Kubernetes User","description":"Step-by-step guide on generating and issuing a certificate for a Kubernetes user, including creating roles and configuring kubeconfig.","source":"@site/guides/certificates/issue_certificate_for_k8s_user.md","sourceDirName":"certificates","slug":"/certificates/issue_certificate_for_k8s_user","permalink":"/guides/certificates/issue_certificate_for_k8s_user","draft":false,"unlisted":false,"editUrl":"https://github.com/geek-kb/k8s_security/edit/main/guides/certificates/issue_certificate_for_k8s_user.md","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1,"title":"How to Issue a Certificate for a Kubernetes User","description":"Step-by-step guide on generating and issuing a certificate for a Kubernetes user, including creating roles and configuring kubeconfig."},"sidebar":"guidesSidebar","previous":{"title":"Introduction","permalink":"/guides/intro"}}');var i=r(4848),s=r(8453);const a={sidebar_position:1,title:"How to Issue a Certificate for a Kubernetes User",description:"Step-by-step guide on generating and issuing a certificate for a Kubernetes user, including creating roles and configuring kubeconfig."},c="How to Issue a Certificate for a Kubernetes User",o={},u=[{value:"1. Create a Private Key",id:"1-create-a-private-key",level:2},{value:"2. Create a CertificateSigningRequest (CSR)",id:"2-create-a-certificatesigningrequest-csr",level:2},{value:"Important Points",id:"important-points",level:3},{value:"3. Approve the CertificateSigningRequest",id:"3-approve-the-certificatesigningrequest",level:2},{value:"4. Retrieve and Export the Certificate",id:"4-retrieve-and-export-the-certificate",level:2},{value:"5. Create Role and RoleBinding",id:"5-create-role-and-rolebinding",level:2},{value:"6. Add User to Kubeconfig",id:"6-add-user-to-kubeconfig",level:2},{value:"Key Takeaway",id:"key-takeaway",level:2}];function d(e){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.header,{children:(0,i.jsx)(t.h1,{id:"how-to-issue-a-certificate-for-a-kubernetes-user",children:"How to Issue a Certificate for a Kubernetes User"})}),"\n",(0,i.jsx)(t.p,{children:"A few steps are required in order to get a normal user to be able to authenticate and invoke an API. First, this user must have a certificate issued by the Kubernetes cluster, and then present that certificate to the Kubernetes API."}),"\n",(0,i.jsx)(t.hr,{}),"\n",(0,i.jsx)(t.h2,{id:"1-create-a-private-key",children:"1. Create a Private Key"}),"\n",(0,i.jsxs)(t.p,{children:["The following commands generate a PKI private key and a Certificate Signing Request (CSR). It is important to set the ",(0,i.jsx)(t.strong,{children:"CN"})," (Common Name) and ",(0,i.jsx)(t.strong,{children:"O"})," (Organization) attributes of the CSR. ",(0,i.jsx)(t.strong,{children:"CN"})," is the name of the user, and ",(0,i.jsx)(t.strong,{children:"O"})," is the group that this user will belong to."]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-bash",children:'openssl genrsa -out myuser.key 2048\nopenssl req -new -key myuser.key -out myuser.csr -subj "/CN=myuser"\n'})}),"\n",(0,i.jsx)(t.hr,{}),"\n",(0,i.jsx)(t.h2,{id:"2-create-a-certificatesigningrequest-csr",children:"2. Create a CertificateSigningRequest (CSR)"}),"\n",(0,i.jsxs)(t.p,{children:["Create a ",(0,i.jsx)(t.strong,{children:"CertificateSigningRequest"})," resource in Kubernetes and submit it using ",(0,i.jsx)(t.code,{children:"kubectl"}),"."]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-bash",children:'cat <<EOF | kubectl apply -f -\napiVersion: certificates.k8s.io/v1\nkind: CertificateSigningRequest\nmetadata:\n  name: myuser\nspec:\n  request: $(cat myuser.csr | base64 | tr -d "\\n")\n  signerName: kubernetes.io/kube-apiserver-client\n  expirationSeconds: 86400  # one day\n  usages:\n  - client auth\nEOF\n'})}),"\n",(0,i.jsx)(t.h3,{id:"important-points",children:"Important Points"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:"usages"})})," must be set to ",(0,i.jsx)(t.code,{children:"client auth"}),"."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:"expirationSeconds"})})," can be set to 3600 (1 hour) or 864000 (10 days)."]}),"\n",(0,i.jsxs)(t.li,{children:["The ",(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:"request"})})," field is the base64-encoded value of the CSR file content."]}),"\n"]}),"\n",(0,i.jsx)(t.hr,{}),"\n",(0,i.jsx)(t.h2,{id:"3-approve-the-certificatesigningrequest",children:"3. Approve the CertificateSigningRequest"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-bash",children:"# List all CSRs\nkubectl get csr\n\n# Approve the CSR\nkubectl certificate approve myuser\n"})}),"\n",(0,i.jsx)(t.hr,{}),"\n",(0,i.jsx)(t.h2,{id:"4-retrieve-and-export-the-certificate",children:"4. Retrieve and Export the Certificate"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-bash",children:"# Get the certificate in YAML format\nkubectl get csr/myuser -o yaml\n\n# Export the issued certificate to a file\nkubectl get csr myuser -o jsonpath='{.status.certificate}' | base64 -d > myuser.crt\n"})}),"\n",(0,i.jsx)(t.hr,{}),"\n",(0,i.jsx)(t.h2,{id:"5-create-role-and-rolebinding",children:"5. Create Role and RoleBinding"}),"\n",(0,i.jsxs)(t.p,{children:["With the certificate created, define the ",(0,i.jsx)(t.strong,{children:"Role"})," and ",(0,i.jsx)(t.strong,{children:"RoleBinding"})," to allow the user access to Kubernetes cluster resources."]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-bash",children:"# Create a Role with permissions to manage Pods\nkubectl create role developer --verb=create --verb=get --verb=list --verb=update --verb=delete --resource=pods\n\n# Create a RoleBinding to bind the role to the user\nkubectl create rolebinding developer-binding-myuser --role=developer --user=myuser\n"})}),"\n",(0,i.jsx)(t.hr,{}),"\n",(0,i.jsx)(t.h2,{id:"6-add-user-to-kubeconfig",children:"6. Add User to Kubeconfig"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-bash",children:"# Add new credentials to kubeconfig\nkubectl config set-credentials myuser --client-key=myuser.key --client-certificate=myuser.crt --embed-certs=true\n\n# Create a new context for the user\nkubectl config set-context myuser --cluster=kubernetes --user=myuser\n\n# Switch to the new context\nkubectl config use-context myuser\n"})}),"\n",(0,i.jsx)(t.hr,{}),"\n",(0,i.jsx)(t.h2,{id:"key-takeaway",children:"Key Takeaway"}),"\n",(0,i.jsx)(t.p,{children:"By following these steps, you can securely create a certificate for a Kubernetes user, assign appropriate roles, and configure kubeconfig to authenticate the user with the Kubernetes API server."})]})}function l(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}}}]);