"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[6351],{2039:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>o,contentTitle:()=>a,default:()=>p,frontMatter:()=>l,metadata:()=>t,toc:()=>c});const t=JSON.parse('{"id":"best_practices/cluster_setup_and_hardening/secrets_management/mozilla_sops","title":"Mozilla SOPS","description":"SOPS is a file encryption tool that helps secure secrets in GitOps and Kubernetes workflows by encrypting entire files or specific values.","source":"@site/docs/best_practices/cluster_setup_and_hardening/secrets_management/mozilla_sops.md","sourceDirName":"best_practices/cluster_setup_and_hardening/secrets_management","slug":"/best_practices/cluster_setup_and_hardening/secrets_management/mozilla_sops","permalink":"/docs/best_practices/cluster_setup_and_hardening/secrets_management/mozilla_sops","draft":false,"unlisted":false,"tags":[],"version":"current","lastUpdatedBy":"Itai Ganot","lastUpdatedAt":1742842158000,"sidebarPosition":3,"frontMatter":{"title":"Mozilla SOPS","description":"SOPS is a file encryption tool that helps secure secrets in GitOps and Kubernetes workflows by encrypting entire files or specific values.","sidebar_position":3},"sidebar":"default","previous":{"title":"Sealed Secrets","permalink":"/docs/best_practices/cluster_setup_and_hardening/secrets_management/sealed_secrets"},"next":{"title":"Configuration Validation","permalink":"/docs/category/configuration-validation"}}');var i=n(4848),r=n(8453);const l={title:"Mozilla SOPS",description:"SOPS is a file encryption tool that helps secure secrets in GitOps and Kubernetes workflows by encrypting entire files or specific values.",sidebar_position:3},a="Mozilla SOPS",o={},c=[{value:"Usage",id:"usage",level:2},{value:"1. Install SOPS",id:"1-install-sops",level:3},{value:"2. Encrypt a YAML File",id:"2-encrypt-a-yaml-file",level:3},{value:"3. Decrypt the File",id:"3-decrypt-the-file",level:3},{value:"4. Use with Kustomize or Helm",id:"4-use-with-kustomize-or-helm",level:3},{value:"Best Practices",id:"best-practices",level:2},{value:"Resources",id:"resources",level:2}];function d(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.header,{children:(0,i.jsx)(s.h1,{id:"mozilla-sops",children:"Mozilla SOPS"})}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"Mozilla SOPS (Secrets OPerationS)"})," is a ",(0,i.jsx)(s.strong,{children:"command-line tool"})," for encrypting and decrypting structured data files, including YAML, JSON, ENV, and INI formats. It is designed to secure ",(0,i.jsx)(s.strong,{children:"Kubernetes secrets, Terraform variables, or any configuration files"}),", allowing them to be stored safely in version control systems."]}),"\n",(0,i.jsxs)(s.p,{children:["SOPS integrates with ",(0,i.jsx)(s.strong,{children:"KMS providers"})," like AWS KMS, GCP KMS, Azure Key Vault, and PGP, making it suitable for teams working in GitOps, infrastructure-as-code, and CI/CD environments."]}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h2,{id:"usage",children:"Usage"}),"\n",(0,i.jsx)(s.h3,{id:"1-install-sops",children:"1. Install SOPS"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-bash",children:"brew install sops\n# or\nwget https://github.com/mozilla/sops/releases/download/v3.8.1/sops-v3.8.1.linux.amd64\nchmod +x sops-v3.8.1.linux.amd64\nsudo mv sops-v3.8.1.linux.amd64 /usr/local/bin/sops\n"})}),"\n",(0,i.jsx)(s.h3,{id:"2-encrypt-a-yaml-file",children:"2. Encrypt a YAML File"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-yaml",children:"# secret.yaml\napiVersion: v1\nkind: Secret\nmetadata:\n  name: my-secret\ntype: Opaque\ndata:\n  password: c3VwZXJzZWNyZXQ= # base64 encoded value\n"})}),"\n",(0,i.jsx)(s.p,{children:"Encrypt it with:"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-bash",children:"sops -e -i secret.yaml\n"})}),"\n",(0,i.jsxs)(s.p,{children:["SOPS will encrypt the ",(0,i.jsx)(s.code,{children:"data"})," section using your chosen KMS provider."]}),"\n",(0,i.jsx)(s.h3,{id:"3-decrypt-the-file",children:"3. Decrypt the File"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-bash",children:"sops -d secret.yaml\n"})}),"\n",(0,i.jsx)(s.p,{children:"Or use it as input in automation:"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-bash",children:"sops -d secret.yaml | kubectl apply -f -\n"})}),"\n",(0,i.jsx)(s.h3,{id:"4-use-with-kustomize-or-helm",children:"4. Use with Kustomize or Helm"}),"\n",(0,i.jsxs)(s.p,{children:["SOPS can be integrated into GitOps workflows by combining with tools like ",(0,i.jsx)(s.strong,{children:"Kustomize"})," or ",(0,i.jsx)(s.strong,{children:"Helm Secrets"})," plugins."]}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h2,{id:"best-practices",children:"Best Practices"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["Use ",(0,i.jsx)(s.strong,{children:"key scopes"})," to control access to individual files or directories."]}),"\n",(0,i.jsx)(s.li,{children:"Back up and version your encryption keys securely."}),"\n",(0,i.jsxs)(s.li,{children:["Use ",(0,i.jsx)(s.strong,{children:"AWS KMS / GCP KMS / PGP"})," consistently across your team."]}),"\n",(0,i.jsxs)(s.li,{children:["Store ",(0,i.jsx)(s.strong,{children:"encrypted files in Git"}),", not decrypted ones."]}),"\n",(0,i.jsxs)(s.li,{children:["Prefer ",(0,i.jsx)(s.strong,{children:"encrypted Secrets over plain Secrets"})," in Kubernetes CI/CD."]}),"\n",(0,i.jsx)(s.li,{children:"Integrate SOPS into GitHub Actions or ArgoCD for seamless automation."}),"\n"]}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h2,{id:"resources",children:"Resources"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Official Documentation:"})," ",(0,i.jsx)(s.a,{href:"https://github.com/mozilla/sops#readme",children:"https://github.com/mozilla/sops#readme"})]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"GitHub Repository:"})," ",(0,i.jsx)(s.a,{href:"https://github.com/mozilla/sops",children:"https://github.com/mozilla/sops"})]}),"\n"]})]})}function p(e={}){const{wrapper:s}={...(0,r.R)(),...e.components};return s?(0,i.jsx)(s,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},8453:(e,s,n)=>{n.d(s,{R:()=>l,x:()=>a});var t=n(6540);const i={},r=t.createContext(i);function l(e){const s=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function a(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),t.createElement(r.Provider,{value:s},e.children)}}}]);