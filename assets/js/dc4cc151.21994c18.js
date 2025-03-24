"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[3285],{6760:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>c,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>l});const s=JSON.parse('{"id":"fundamentals/authentication/authentication_methods","title":"Authentication Methods","description":"What is Authentication?","source":"@site/docs/fundamentals/authentication/authentication_methods.md","sourceDirName":"fundamentals/authentication","slug":"/fundamentals/authentication/authentication_methods","permalink":"/docs/fundamentals/authentication/authentication_methods","draft":false,"unlisted":false,"editUrl":"https://github.com/geek-kb/k8s_security/edit/main/docs/fundamentals/authentication/authentication_methods.md","tags":[],"version":"current","lastUpdatedBy":"Itai Ganot","lastUpdatedAt":1741863523000,"sidebarPosition":1,"frontMatter":{"title":"Authentication Methods","sidebar_position":1},"sidebar":"default","previous":{"title":"The Four C\'s of Cloud Native Security","permalink":"/docs/fundamentals/the_4_c_cloud_native_security"},"next":{"title":"Service Accounts","permalink":"/docs/fundamentals/authentication/service_accounts"}}');var i=t(4848),r=t(8453);const o={title:"Authentication Methods",sidebar_position:1},c="Authentication in Kubernetes",a={},l=[{value:"What is Authentication?",id:"what-is-authentication",level:2},{value:"Types of Authentication Methods in Kubernetes",id:"types-of-authentication-methods-in-kubernetes",level:2},{value:"1. X.509 Client Certificates",id:"1-x509-client-certificates",level:3},{value:"2. Static Token File Authentication",id:"2-static-token-file-authentication",level:3},{value:"3. Bootstrap Tokens",id:"3-bootstrap-tokens",level:3},{value:"4. Service Account Tokens",id:"4-service-account-tokens",level:3},{value:"5. OpenID Connect (OIDC) Authentication",id:"5-openid-connect-oidc-authentication",level:3},{value:"6. Webhook Token Authentication",id:"6-webhook-token-authentication",level:3},{value:"Best Practices for Authentication",id:"best-practices-for-authentication",level:2},{value:"Conclusion: Authentication as the First Line of Defense",id:"conclusion-authentication-as-the-first-line-of-defense",level:2}];function h(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"authentication-in-kubernetes",children:"Authentication in Kubernetes"})}),"\n",(0,i.jsx)(n.h2,{id:"what-is-authentication",children:"What is Authentication?"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Authentication"})," in Kubernetes is the process of verifying the identity of a ",(0,i.jsx)(n.strong,{children:"user"}),", ",(0,i.jsx)(n.strong,{children:"service account"}),", or ",(0,i.jsx)(n.strong,{children:"component"})," attempting to interact with the ",(0,i.jsx)(n.strong,{children:"Kubernetes API server"}),". It answers the question: ",(0,i.jsx)(n.strong,{children:'"Who are you?"'})," before allowing any actions within the cluster."]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"types-of-authentication-methods-in-kubernetes",children:"Types of Authentication Methods in Kubernetes"}),"\n",(0,i.jsx)(n.p,{children:"Kubernetes supports several authentication methods, each suitable for different use cases:"}),"\n",(0,i.jsx)(n.h3,{id:"1-x509-client-certificates",children:"1. X.509 Client Certificates"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Required knowledge for the CKS certification."})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Used for ",(0,i.jsx)(n.strong,{children:"user authentication"})," and ",(0,i.jsx)(n.strong,{children:"Kubelet authentication"}),".",(0,i.jsx)("br",{})]}),"\n",(0,i.jsxs)(n.li,{children:["Certificates are generated by a ",(0,i.jsx)(n.strong,{children:"Certificate Authority (CA)"})," and signed by the ",(0,i.jsx)(n.strong,{children:"Kubernetes API server"}),"."]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'# Generate a private key\nopenssl genrsa -out user.key 2048\n\n# Generate a CSR (Certificate Signing Request)\nopenssl req -new -key user.key -out user.csr -subj "/CN=example-user"\n\n# Sign the certificate with Kubernetes CA\nopenssl x509 -req -in user.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out user.crt -days 365\n'})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"2-static-token-file-authentication",children:"2. Static Token File Authentication"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Uses a ",(0,i.jsx)(n.strong,{children:"pre-generated token"})," stored in a ",(0,i.jsx)(n.strong,{children:"CSV file"})," on the ",(0,i.jsx)(n.strong,{children:"API server"}),".",(0,i.jsx)("br",{})]}),"\n",(0,i.jsxs)(n.li,{children:["Suitable for ",(0,i.jsx)(n.strong,{children:"development environments"})," but not recommended for ",(0,i.jsx)(n.strong,{children:"production"}),"."]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:'# Example tokens.csv format\ntoken1234,example-user,uid1234,"system:masters"\n'})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Configure the ",(0,i.jsx)(n.strong,{children:"API server"})," to use the token file:"]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"kube-apiserver --token-auth-file=tokens.csv\n"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"3-bootstrap-tokens",children:"3. Bootstrap Tokens"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Required knowledge for the CKS certification."})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Used primarily by ",(0,i.jsx)(n.strong,{children:"kubeadm"})," during ",(0,i.jsx)(n.strong,{children:"cluster bootstrapping"}),".",(0,i.jsx)("br",{})]}),"\n",(0,i.jsxs)(n.li,{children:["Tokens are stored as ",(0,i.jsx)(n.strong,{children:"Secrets"})," in the ",(0,i.jsx)(n.strong,{children:"kube-system"})," namespace."]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"# Create a new bootstrap token\nkubeadm token create --print-join-command\n"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"4-service-account-tokens",children:"4. Service Account Tokens"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Required knowledge for the CKS certification."})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Service Accounts"})," are used by ",(0,i.jsx)(n.strong,{children:"Pods"})," to ",(0,i.jsx)(n.strong,{children:"authenticate"})," with the ",(0,i.jsx)(n.strong,{children:"API server"}),".",(0,i.jsx)("br",{})]}),"\n",(0,i.jsxs)(n.li,{children:["A ",(0,i.jsx)(n.strong,{children:"JWT token"})," is automatically created and mounted inside the Pod."]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"# Example: Using a Service Account in a Pod\napiVersion: v1\nkind: ServiceAccount\nmetadata:\n  name: example-sa\n\n---\napiVersion: v1\nkind: Pod\nmetadata:\n  name: example-pod\nspec:\n  serviceAccountName: example-sa\n  containers:\n    - name: example-container\n      image: nginx\n"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"5-openid-connect-oidc-authentication",children:"5. OpenID Connect (OIDC) Authentication"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Integrates with ",(0,i.jsx)(n.strong,{children:"external identity providers"})," (e.g., ",(0,i.jsx)(n.strong,{children:"Google"}),", ",(0,i.jsx)(n.strong,{children:"Okta"}),", ",(0,i.jsx)(n.strong,{children:"Azure AD"}),").",(0,i.jsx)("br",{})]}),"\n",(0,i.jsxs)(n.li,{children:["Ideal for ",(0,i.jsx)(n.strong,{children:"enterprise environments"})," using ",(0,i.jsx)(n.strong,{children:"SSO (Single Sign-On)"}),"."]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"# API server configuration for OIDC\nkube-apiserver \\\n  --oidc-issuer-url=https://accounts.google.com \\\n  --oidc-client-id=k8s-app \\\n  --oidc-username-claim=email \\\n  --oidc-groups-claim=groups\n"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"6-webhook-token-authentication",children:"6. Webhook Token Authentication"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Required knowledge for the CKS certification."})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Delegates ",(0,i.jsx)(n.strong,{children:"authentication decisions"})," to an ",(0,i.jsx)(n.strong,{children:"external API"}),".",(0,i.jsx)("br",{})]}),"\n",(0,i.jsxs)(n.li,{children:["Useful for ",(0,i.jsx)(n.strong,{children:"custom authentication"})," scenarios."]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"# Example webhook configuration\napiVersion: v1\nkind: Config\nclusters:\n  - name: webhook\n    cluster:\n      server: https://auth.example.com/authenticate\nusers:\n  - name: webhook\ncontexts:\n  - name: webhook\n    context:\n      cluster: webhook\n      user: webhook\ncurrent-context: webhook\n"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"best-practices-for-authentication",children:"Best Practices for Authentication"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Use Strong Authentication Methods:"}),(0,i.jsx)("br",{}),"\nPrefer ",(0,i.jsx)(n.strong,{children:"OIDC"})," or ",(0,i.jsx)(n.strong,{children:"Client Certificates"})," over ",(0,i.jsx)(n.strong,{children:"static tokens"}),"."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Service Account Management:"}),(0,i.jsx)("br",{})]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Avoid using the ",(0,i.jsx)(n.strong,{children:"default service account"}),".",(0,i.jsx)("br",{})]}),"\n",(0,i.jsxs)(n.li,{children:["Create ",(0,i.jsx)(n.strong,{children:"namespace-specific service accounts"})," with ",(0,i.jsx)(n.strong,{children:"least privilege"}),"."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Rotate and Revoke Credentials:"}),(0,i.jsx)("br",{})]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Regularly ",(0,i.jsx)(n.strong,{children:"rotate certificates"})," and ",(0,i.jsx)(n.strong,{children:"tokens"}),".",(0,i.jsx)("br",{})]}),"\n",(0,i.jsxs)(n.li,{children:["Revoke ",(0,i.jsx)(n.strong,{children:"access tokens"})," when ",(0,i.jsx)(n.strong,{children:"users leave"})," or ",(0,i.jsx)(n.strong,{children:"roles change"}),"."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Secure API Server Authentication Mechanisms:"}),(0,i.jsx)("br",{})]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Disable ",(0,i.jsx)(n.strong,{children:"anonymous authentication"})," (",(0,i.jsx)(n.code,{children:"--anonymous-auth=false"}),").",(0,i.jsx)("br",{})]}),"\n",(0,i.jsxs)(n.li,{children:["Enable ",(0,i.jsx)(n.strong,{children:"webhook authentication"})," for ",(0,i.jsx)(n.strong,{children:"external identity validation"}),"."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"# Example: Securing the API server\nkube-apiserver --anonymous-auth=false --client-ca-file=/etc/kubernetes/pki/ca.crt\n"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"conclusion-authentication-as-the-first-line-of-defense",children:"Conclusion: Authentication as the First Line of Defense"}),"\n",(0,i.jsxs)(n.p,{children:["Authentication is the ",(0,i.jsx)(n.strong,{children:"first step"})," in ",(0,i.jsx)(n.strong,{children:"securing Kubernetes clusters"}),". Properly managing authentication methods helps to ensure that only ",(0,i.jsx)(n.strong,{children:"authorized users"})," and ",(0,i.jsx)(n.strong,{children:"services"})," interact with ",(0,i.jsx)(n.strong,{children:"cluster resources"}),", providing a strong foundation for further ",(0,i.jsx)(n.strong,{children:"authorization"})," and ",(0,i.jsx)(n.strong,{children:"security policies"}),"."]})]})}function d(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>c});var s=t(6540);const i={},r=s.createContext(i);function o(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);