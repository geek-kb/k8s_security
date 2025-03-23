"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[9396],{8453:(e,s,n)=>{n.d(s,{R:()=>i,x:()=>c});var t=n(6540);const r={},a=t.createContext(r);function i(e){const s=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function c(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),t.createElement(a.Provider,{value:s},e.children)}},9127:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>o,contentTitle:()=>c,default:()=>u,frontMatter:()=>i,metadata:()=>t,toc:()=>l});const t=JSON.parse('{"id":"best_practices/cluster_setup_and_hardening/secrets_management/insecure_secrets_management_mitigation","title":"Insecure Secrets Management Mitigation","description":"Best practices to prevent the exposure of sensitive data in Kubernetes through secure secrets management techniques and external secret stores.","source":"@site/docs/best_practices/cluster_setup_and_hardening/secrets_management/insecure_secrets_management_mitigation.md","sourceDirName":"best_practices/cluster_setup_and_hardening/secrets_management","slug":"/best_practices/cluster_setup_and_hardening/secrets_management/insecure_secrets_management_mitigation","permalink":"/k8s_security/docs/best_practices/cluster_setup_and_hardening/secrets_management/insecure_secrets_management_mitigation","draft":false,"unlisted":false,"editUrl":"https://github.com/geek-kb/k8s_security/edit/main/docs/best_practices/cluster_setup_and_hardening/secrets_management/insecure_secrets_management_mitigation.md","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1,"title":"Insecure Secrets Management Mitigation","description":"Best practices to prevent the exposure of sensitive data in Kubernetes through secure secrets management techniques and external secret stores."},"sidebar":"guidesSidebar","previous":{"title":"Securing Kubernetes Service Accounts","permalink":"/k8s_security/docs/best_practices/cluster_setup_and_hardening/rbac_and_identity/service_account_mitigation"}}');var r=n(4848),a=n(8453);const i={sidebar_position:1,title:"Insecure Secrets Management Mitigation",description:"Best practices to prevent the exposure of sensitive data in Kubernetes through secure secrets management techniques and external secret stores."},c="Insecure Secrets Management Mitigation",o={},l=[{value:"1. Encrypt Secrets at Rest in etcd",id:"1-encrypt-secrets-at-rest-in-etcd",level:2},{value:"Example: etcd Encryption Configuration",id:"example-etcd-encryption-configuration",level:3},{value:"2. Use External Secret Management Systems",id:"2-use-external-secret-management-systems",level:2},{value:"Recommended External Secret Managers",id:"recommended-external-secret-managers",level:3},{value:"AWS Systems Manager (SSM) Parameter Store",id:"aws-systems-manager-ssm-parameter-store",level:4},{value:"HashiCorp Vault",id:"hashicorp-vault",level:4},{value:"Akeyless Vault",id:"akeyless-vault",level:4},{value:"3. Use the External Secrets Operator (ESO)",id:"3-use-the-external-secrets-operator-eso",level:2},{value:"Example: ExternalSecret Using AWS Secrets Manager",id:"example-externalsecret-using-aws-secrets-manager",level:3},{value:"Example: SecretStore Definition for AWS",id:"example-secretstore-definition-for-aws",level:3},{value:"4. Restrict Access to Secrets Using RBAC",id:"4-restrict-access-to-secrets-using-rbac",level:2},{value:"Example: Read-Only Access Policy",id:"example-read-only-access-policy",level:3},{value:"Conclusion",id:"conclusion",level:2}];function d(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.header,{children:(0,r.jsx)(s.h1,{id:"insecure-secrets-management-mitigation",children:"Insecure Secrets Management Mitigation"})}),"\n",(0,r.jsx)(s.p,{children:"This guide outlines best practices to securely manage secrets in Kubernetes and prevent unauthorized access to sensitive data. Kubernetes Secrets, by default, are Base64-encoded and stored in etcd, making them vulnerable if not properly protected. To minimize risk, Kubernetes administrators should adopt encryption, access control, and external secret stores."}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h2,{id:"1-encrypt-secrets-at-rest-in-etcd",children:"1. Encrypt Secrets at Rest in etcd"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"Issue:"})," By default, secrets stored in etcd are not encrypted at rest.",(0,r.jsx)("br",{}),"\n",(0,r.jsx)(s.strong,{children:"Fix:"})," Enable encryption using a Kubernetes ",(0,r.jsx)(s.code,{children:"EncryptionConfiguration"}),"."]}),"\n",(0,r.jsx)(s.h3,{id:"example-etcd-encryption-configuration",children:"Example: etcd Encryption Configuration"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-yaml",children:"apiVersion: apiserver.config.k8s.io/v1\nkind: EncryptionConfiguration\nresources:\n  - resources:\n      - secrets\n    providers:\n      - aescbc:\n          keys:\n            - name: key1\n              secret: c2VjcmV0LWtleS1mb3ItZW5jcnlwdGlvbg==\n      - identity: {}\n"})}),"\n",(0,r.jsxs)(s.p,{children:["Apply this configuration by setting the ",(0,r.jsx)(s.code,{children:"--encryption-provider-config"})," flag on the kube-apiserver."]}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h2,{id:"2-use-external-secret-management-systems",children:"2. Use External Secret Management Systems"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"Issue:"})," Kubernetes Secrets lack fine-grained access control, audit logging, and secure dynamic secret delivery.",(0,r.jsx)("br",{}),"\n",(0,r.jsx)(s.strong,{children:"Fix:"})," Integrate Kubernetes with a secure external secret store."]}),"\n",(0,r.jsx)(s.h3,{id:"recommended-external-secret-managers",children:"Recommended External Secret Managers"}),"\n",(0,r.jsx)(s.h4,{id:"aws-systems-manager-ssm-parameter-store",children:"AWS Systems Manager (SSM) Parameter Store"}),"\n",(0,r.jsx)(s.p,{children:"SSM Parameter Store supports secure storage of secrets with IAM-based access control."}),"\n",(0,r.jsx)(s.p,{children:"Example integration using the Secrets Store CSI Driver:"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-yaml",children:'apiVersion: secrets-store.csi.x-k8s.io/v1\nkind: SecretProviderClass\nmetadata:\n  name: aws-ssm-secrets\nspec:\n  provider: aws\n  parameters:\n    objects: |\n      - objectName: "/app/db/password"\n        objectType: "ssmparameter"\n'})}),"\n",(0,r.jsx)(s.p,{children:"Ensure your pods are using an IAM role (via IRSA on EKS) with permission to read the secret."}),"\n",(0,r.jsx)(s.h4,{id:"hashicorp-vault",children:"HashiCorp Vault"}),"\n",(0,r.jsx)(s.p,{children:"Vault provides dynamic secrets, detailed audit logs, and strong access policies."}),"\n",(0,r.jsx)(s.p,{children:"Example integration using the CSI driver:"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-yaml",children:'apiVersion: secrets-store.csi.x-k8s.io/v1\nkind: SecretProviderClass\nmetadata:\n  name: vault-secrets\nspec:\n  provider: vault\n  parameters:\n    vaultAddress: "https://vault.example.com"\n    roleName: "k8s-role"\n    objects: |\n      array:\n        - objectName: "db-password"\n          secretPath: "secret/data/db"\n          secretKey: "password"\n'})}),"\n",(0,r.jsx)(s.p,{children:"Ensure Kubernetes authentication is configured in Vault to allow pods to authenticate using a ServiceAccount JWT."}),"\n",(0,r.jsx)(s.h4,{id:"akeyless-vault",children:"Akeyless Vault"}),"\n",(0,r.jsx)(s.p,{children:"Akeyless is a SaaS-based secrets management solution that integrates with Kubernetes using native identity-based access and encryption."}),"\n",(0,r.jsx)(s.p,{children:"Example usage via Akeyless Secrets Operator:"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-yaml",children:"apiVersion: akeyless.io/v1\nkind: ExternalSecret\nmetadata:\n  name: db-password\nspec:\n  secretStoreRef:\n    name: akeyless-store\n    kind: SecretStore\n  target:\n    name: db-password\n  data:\n    - secretKey: password\n      remoteRef:\n        key: /prod/db/password\n"})}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h2,{id:"3-use-the-external-secrets-operator-eso",children:"3. Use the External Secrets Operator (ESO)"}),"\n",(0,r.jsxs)(s.p,{children:["The ",(0,r.jsx)(s.a,{href:"https://external-secrets.io/",children:"External Secrets Operator (ESO)"})," is a Kubernetes controller that synchronizes secrets from external providers into native Kubernetes secrets."]}),"\n",(0,r.jsx)(s.p,{children:"It supports multiple backends including AWS SSM, AWS Secrets Manager, HashiCorp Vault, Akeyless, GCP Secret Manager, and Azure Key Vault."}),"\n",(0,r.jsx)(s.h3,{id:"example-externalsecret-using-aws-secrets-manager",children:"Example: ExternalSecret Using AWS Secrets Manager"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-yaml",children:"apiVersion: external-secrets.io/v1\nkind: ExternalSecret\nmetadata:\n  name: db-credentials\nspec:\n  refreshInterval: 1h\n  secretStoreRef:\n    name: aws-secrets\n    kind: SecretStore\n  target:\n    name: db-credentials\n  data:\n    - secretKey: password\n      remoteRef:\n        key: /prod/db/password\n"})}),"\n",(0,r.jsx)(s.h3,{id:"example-secretstore-definition-for-aws",children:"Example: SecretStore Definition for AWS"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-yaml",children:"apiVersion: external-secrets.io/v1beta1\nkind: SecretStore\nmetadata:\n  name: aws-secrets\nspec:\n  provider:\n    aws:\n      service: SecretsManager\n      region: eu-west-1\n      auth:\n        jwt:\n          serviceAccountRef:\n            name: external-secrets-sa\n"})}),"\n",(0,r.jsx)(s.p,{children:"ESO handles the retrieval, synchronization, and refreshing of secrets while maintaining them as native Kubernetes secrets, allowing seamless integration with existing workloads."}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h2,{id:"4-restrict-access-to-secrets-using-rbac",children:"4. Restrict Access to Secrets Using RBAC"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"Issue:"})," Without proper access control, any user or service account may read Kubernetes secrets.",(0,r.jsx)("br",{}),"\n",(0,r.jsx)(s.strong,{children:"Fix:"})," Implement fine-grained Role-Based Access Control (RBAC)."]}),"\n",(0,r.jsx)(s.h3,{id:"example-read-only-access-policy",children:"Example: Read-Only Access Policy"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-yaml",children:'apiVersion: rbac.authorization.k8s.io/v1\nkind: Role\nmetadata:\n  namespace: default\n  name: secret-reader\nrules:\n  - apiGroups: [""]\n    resources: ["secrets"]\n    verbs: ["get"]\n---\napiVersion: rbac.authorization.k8s.io/v1\nkind: RoleBinding\nmetadata:\n  name: read-secrets\n  namespace: default\nsubjects:\n  - kind: ServiceAccount\n    name: secret-reader-sa\nroleRef:\n  kind: Role\n  name: secret-reader\n  apiGroup: rbac.authorization.k8s.io\n'})}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,r.jsx)(s.p,{children:"To securely manage secrets in Kubernetes:"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:"Enable etcd encryption at rest to protect in-cluster stored secrets."}),"\n",(0,r.jsx)(s.li,{children:"Integrate with external secret management platforms such as AWS SSM, HashiCorp Vault, Akeyless, or use the External Secrets Operator for dynamic and declarative secret management."}),"\n",(0,r.jsx)(s.li,{children:"Apply strict RBAC to ensure only authorized components and users have access to secrets."}),"\n"]}),"\n",(0,r.jsx)(s.p,{children:"A layered approach that combines Kubernetes-native capabilities with purpose-built secret management tools is the most effective strategy to mitigate the risks associated with insecure secret handling."})]})}function u(e={}){const{wrapper:s}={...(0,a.R)(),...e.components};return s?(0,r.jsx)(s,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}}}]);