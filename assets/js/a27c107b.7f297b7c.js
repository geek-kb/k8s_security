"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[5220],{5430:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>a,metadata:()=>i,toc:()=>l});const i=JSON.parse('{"id":"best_practices/supply_chain_security/notation","title":"Notation","description":"Notation is a CLI tool for signing and verifying container images using the OCI standard for artifact signatures.","source":"@site/docs/best_practices/supply_chain_security/notation.md","sourceDirName":"best_practices/supply_chain_security","slug":"/best_practices/supply_chain_security/notation","permalink":"/docs/best_practices/supply_chain_security/notation","draft":false,"unlisted":false,"editUrl":"https://github.com/geek-kb/k8s_security/edit/main/docs/best_practices/supply_chain_security/notation.md","tags":[],"version":"current","lastUpdatedBy":"Itai Ganot","lastUpdatedAt":1742842158000,"sidebarPosition":5,"frontMatter":{"title":"Notation","description":"Notation is a CLI tool for signing and verifying container images using the OCI standard for artifact signatures.","sidebar_position":5}}');var s=t(4848),r=t(8453);const a={title:"Notation",description:"Notation is a CLI tool for signing and verifying container images using the OCI standard for artifact signatures.",sidebar_position:5},o="Notation",c={},l=[{value:"Usage",id:"usage",level:2},{value:"1. Install Notation",id:"1-install-notation",level:3},{value:"2. Generate a Signing Key and Certificate",id:"2-generate-a-signing-key-and-certificate",level:3},{value:"3. Sign an Image",id:"3-sign-an-image",level:3},{value:"4. Verify a Signed Image",id:"4-verify-a-signed-image",level:3},{value:"5. Use with Kubernetes",id:"5-use-with-kubernetes",level:3},{value:"Best Practices",id:"best-practices",level:2},{value:"Resources",id:"resources",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"notation",children:"Notation"})}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Notation"})," is a ",(0,s.jsx)(n.strong,{children:"command-line interface (CLI)"})," tool developed as part of the ",(0,s.jsx)(n.strong,{children:"Notary Project"}),", which defines a standard for ",(0,s.jsx)(n.strong,{children:"signing and verifying artifacts"})," in OCI-compliant registries. It enables ",(0,s.jsx)(n.strong,{children:"cryptographic signing of container images"})," and ensures only trusted content is deployed within a Kubernetes environment."]}),"\n",(0,s.jsxs)(n.p,{children:["By using Notation, organizations can ",(0,s.jsx)(n.strong,{children:"enforce artifact integrity"}),", trace the source of images, and integrate signature verification into CI/CD pipelines and policy engines."]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h2,{id:"usage",children:"Usage"}),"\n",(0,s.jsx)(n.h3,{id:"1-install-notation",children:"1. Install Notation"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"# On macOS\nbrew install notaryproject/tap/notation\n\n# Or download from GitHub\ncurl -Lo notation.tar.gz https://github.com/notaryproject/notation/releases/latest/download/notation-linux-amd64.tar.gz\ntar -xvzf notation.tar.gz\nchmod +x notation\nsudo mv notation /usr/local/bin/\n"})}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"2-generate-a-signing-key-and-certificate",children:"2. Generate a Signing Key and Certificate"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"notation cert generate-test --default my-cert\n"})}),"\n",(0,s.jsx)(n.p,{children:"This command generates a test certificate and sets it as the default signer."}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"3-sign-an-image",children:"3. Sign an Image"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"notation sign ghcr.io/myorg/myimage:1.0\n"})}),"\n",(0,s.jsx)(n.p,{children:"This creates and stores a signature in the OCI registry."}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"4-verify-a-signed-image",children:"4. Verify a Signed Image"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"notation verify ghcr.io/myorg/myimage:1.0\n"})}),"\n",(0,s.jsx)(n.p,{children:"The verification process ensures the signature matches the configured trusted certificate."}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"5-use-with-kubernetes",children:"5. Use with Kubernetes"}),"\n",(0,s.jsxs)(n.p,{children:["Notation can integrate with Kubernetes admission controllers or supply chain security frameworks to ensure that ",(0,s.jsx)(n.strong,{children:"only signed and verified images"})," are allowed into your cluster."]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h2,{id:"best-practices",children:"Best Practices"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Rotate keys"})," regularly and use short-lived certificates for signing."]}),"\n",(0,s.jsxs)(n.li,{children:["Use ",(0,s.jsx)(n.strong,{children:"trusted certificate authorities"})," or your internal PKI to sign images."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Restrict deployment"})," of unsigned images via admission policies (e.g., OPA Gatekeeper or Kyverno)."]}),"\n",(0,s.jsxs)(n.li,{children:["Incorporate ",(0,s.jsx)(n.strong,{children:"image signature verification"})," into CI/CD pipelines."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Audit signature verification logs"})," for security monitoring and compliance."]}),"\n"]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h2,{id:"resources",children:"Resources"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Official Documentation:"})," ",(0,s.jsx)(n.a,{href:"https://notaryproject.dev",children:"https://notaryproject.dev"})]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"GitHub Repository:"})," ",(0,s.jsx)(n.a,{href:"https://github.com/notaryproject/notation",children:"https://github.com/notaryproject/notation"})]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>o});var i=t(6540);const s={},r=i.createContext(s);function a(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);