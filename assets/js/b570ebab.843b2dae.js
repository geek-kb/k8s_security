"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[3605],{5369:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>c,contentTitle:()=>o,default:()=>u,frontMatter:()=>a,metadata:()=>r,toc:()=>l});const r=JSON.parse('{"id":"best_practices/cluster_setup_and_hardening/pod_security/csi_driver_mitigation","title":"Securing Kubernetes CSI Drivers","description":"Best practices for securing Container Storage Interface (CSI) drivers to prevent unauthorized access, privilege escalation, and data breaches.","source":"@site/docs/best_practices/cluster_setup_and_hardening/pod_security/csi_driver_mitigation.md","sourceDirName":"best_practices/cluster_setup_and_hardening/pod_security","slug":"/best_practices/cluster_setup_and_hardening/pod_security/csi_driver_mitigation","permalink":"/docs/best_practices/cluster_setup_and_hardening/pod_security/csi_driver_mitigation","draft":false,"unlisted":false,"editUrl":"https://github.com/geek-kb/k8s_security/edit/main/docs/best_practices/cluster_setup_and_hardening/pod_security/csi_driver_mitigation.md","tags":[],"version":"current","lastUpdatedBy":"Itai Ganot","lastUpdatedAt":1742803022000,"sidebarPosition":4,"frontMatter":{"sidebar_position":4,"title":"Securing Kubernetes CSI Drivers","description":"Best practices for securing Container Storage Interface (CSI) drivers to prevent unauthorized access, privilege escalation, and data breaches."},"sidebar":"default","previous":{"title":"Preventing Container Escape","permalink":"/docs/best_practices/cluster_setup_and_hardening/pod_security/container_escape_mitigation"},"next":{"title":"Pod Sandboxing","permalink":"/docs/best_practices/cluster_setup_and_hardening/pod_security/pod_sandboxing"}}');var i=n(4848),t=n(8453);const a={sidebar_position:4,title:"Securing Kubernetes CSI Drivers",description:"Best practices for securing Container Storage Interface (CSI) drivers to prevent unauthorized access, privilege escalation, and data breaches."},o="Securing Kubernetes CSI Drivers",c={},l=[{value:"1. Restrict Persistent Volume Attachment to Authorized Pods",id:"1-restrict-persistent-volume-attachment-to-authorized-pods",level:2},{value:"Secure Storage Class Configuration",id:"secure-storage-class-configuration",level:3},{value:"Why It Matters",id:"why-it-matters",level:3},{value:"2. Enforce RBAC Controls on CSI Drivers",id:"2-enforce-rbac-controls-on-csi-drivers",level:2},{value:"Secure CSI Driver RBAC Policy",id:"secure-csi-driver-rbac-policy",level:3},{value:"Why It Matters",id:"why-it-matters-1",level:3},{value:"3. Disable Privileged CSI Drivers",id:"3-disable-privileged-csi-drivers",level:2},{value:"Secure CSI Driver Deployment",id:"secure-csi-driver-deployment",level:3},{value:"Why It Matters",id:"why-it-matters-2",level:3},{value:"4. Enforce Read-Only Volume Access for Sensitive Data",id:"4-enforce-read-only-volume-access-for-sensitive-data",level:2},{value:"Secure PVC Definition",id:"secure-pvc-definition",level:3},{value:"Why It Matters",id:"why-it-matters-3",level:3},{value:"5. Enable Encryption for Persistent Volumes",id:"5-enable-encryption-for-persistent-volumes",level:2},{value:"Secure Encrypted Storage (AWS EBS Example)",id:"secure-encrypted-storage-aws-ebs-example",level:3},{value:"Why It Matters",id:"why-it-matters-4",level:3},{value:"6. Monitor and Audit CSI Driver Activity",id:"6-monitor-and-audit-csi-driver-activity",level:2},{value:"Enable Kubernetes Audit Logging for Storage Events",id:"enable-kubernetes-audit-logging-for-storage-events",level:3},{value:"Why It Matters",id:"why-it-matters-5",level:3},{value:"Conclusion",id:"conclusion",level:2}];function d(e){const s={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.header,{children:(0,i.jsx)(s.h1,{id:"securing-kubernetes-csi-drivers",children:"Securing Kubernetes CSI Drivers"})}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"Container Storage Interface (CSI) drivers"})," enable Kubernetes to manage persistent storage across different backends. ",(0,i.jsx)(s.strong,{children:"Insecure CSI configurations"})," can expose ",(0,i.jsx)(s.strong,{children:"sensitive data, enable privilege escalation, or allow unauthorized volume modifications"}),". Implementing ",(0,i.jsx)(s.strong,{children:"strict access controls and security best practices"})," is essential to protect storage resources."]}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h2,{id:"1-restrict-persistent-volume-attachment-to-authorized-pods",children:"1. Restrict Persistent Volume Attachment to Authorized Pods"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"Issue:"})," If Persistent Volumes (PVs) and Persistent Volume Claims (PVCs) can be freely reattached, attackers may gain access to sensitive data.",(0,i.jsx)("br",{}),"\n",(0,i.jsx)(s.strong,{children:"Fix:"})," Restrict volume attachment to specific workloads."]}),"\n",(0,i.jsx)(s.h3,{id:"secure-storage-class-configuration",children:"Secure Storage Class Configuration"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-yaml",children:'apiVersion: storage.k8s.io/v1\nkind: StorageClass\nmetadata:\n  name: secure-storage\nprovisioner: kubernetes.io/aws-ebs\nvolumeBindingMode: WaitForFirstConsumer\nallowVolumeExpansion: false\nparameters:\n  encrypted: "true"\n  fsType: ext4\n'})}),"\n",(0,i.jsx)(s.h3,{id:"why-it-matters",children:"Why It Matters"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Prevents"})," unauthorized workloads from mounting sensitive volumes.",(0,i.jsx)("br",{})]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Ensures"})," that storage resources are only provisioned when needed."]}),"\n"]}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h2,{id:"2-enforce-rbac-controls-on-csi-drivers",children:"2. Enforce RBAC Controls on CSI Drivers"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"Issue:"})," If CSI drivers are not properly restricted, attackers can ",(0,i.jsx)(s.strong,{children:"list, delete, or modify storage resources"}),".",(0,i.jsx)("br",{}),"\n",(0,i.jsx)(s.strong,{children:"Fix:"})," Use ",(0,i.jsx)(s.strong,{children:"Role-Based Access Control (RBAC)"})," to limit access to CSI operations."]}),"\n",(0,i.jsx)(s.h3,{id:"secure-csi-driver-rbac-policy",children:"Secure CSI Driver RBAC Policy"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-yaml",children:'apiVersion: rbac.authorization.k8s.io/v1\nkind: Role\nmetadata:\n  namespace: kube-system\n  name: csi-driver-restrict\nrules:\n  - apiGroups: ["storage.k8s.io"]\n    resources:\n      [\n        "csidrivers",\n        "csinodeinfos",\n        "persistentvolumes",\n        "persistentvolumeclaims",\n      ]\n    verbs: ["get", "list"]\n---\napiVersion: rbac.authorization.k8s.io/v1\nkind: RoleBinding\nmetadata:\n  namespace: kube-system\n  name: restrict-csi-access\nsubjects:\n  - kind: ServiceAccount\n    name: csi-driver-sa\n    namespace: kube-system\nroleRef:\n  kind: Role\n  name: csi-driver-restrict\n  apiGroup: rbac.authorization.k8s.io\n'})}),"\n",(0,i.jsx)(s.h3,{id:"why-it-matters-1",children:"Why It Matters"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Prevents"})," unauthorized users from modifying CSI configurations.",(0,i.jsx)("br",{})]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Restricts"})," storage actions to necessary workloads only."]}),"\n"]}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h2,{id:"3-disable-privileged-csi-drivers",children:"3. Disable Privileged CSI Drivers"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"Issue:"})," Some CSI plugins run with ",(0,i.jsx)(s.strong,{children:"privileged access"}),", allowing potential container escapes.",(0,i.jsx)("br",{}),"\n",(0,i.jsx)(s.strong,{children:"Fix:"})," Disable privileged mode and enforce strict security contexts."]}),"\n",(0,i.jsx)(s.h3,{id:"secure-csi-driver-deployment",children:"Secure CSI Driver Deployment"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-yaml",children:'apiVersion: apps/v1\nkind: DaemonSet\nmetadata:\n  name: secure-csi-driver\n  namespace: kube-system\nspec:\n  template:\n    spec:\n      containers:\n        - name: csi-driver\n          securityContext:\n            privileged: false\n            allowPrivilegeEscalation: false\n            capabilities:\n              drop: ["ALL"]\n'})}),"\n",(0,i.jsx)(s.h3,{id:"why-it-matters-2",children:"Why It Matters"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Prevents"})," attackers from exploiting CSI plugins to escalate privileges.",(0,i.jsx)("br",{})]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Reduces"})," the risk of host filesystem access through storage operations."]}),"\n"]}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h2,{id:"4-enforce-read-only-volume-access-for-sensitive-data",children:"4. Enforce Read-Only Volume Access for Sensitive Data"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:"Required knowledge for the CKS certification."})}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"Issue:"})," If volumes containing sensitive data are mounted with ",(0,i.jsx)(s.code,{children:"ReadWriteMany (RWX)"}),", attackers can modify or inject malicious content.",(0,i.jsx)("br",{}),"\n",(0,i.jsx)(s.strong,{children:"Fix:"})," Use ",(0,i.jsx)(s.strong,{children:"ReadOnlyMany (ROX)"})," for sensitive workloads."]}),"\n",(0,i.jsx)(s.h3,{id:"secure-pvc-definition",children:"Secure PVC Definition"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-yaml",children:"apiVersion: v1\nkind: PersistentVolumeClaim\nmetadata:\n  name: secure-pvc\n  namespace: secure-app\nspec:\n  accessModes:\n    - ReadOnlyMany\n  resources:\n    requests:\n      storage: 10Gi\n"})}),"\n",(0,i.jsx)(s.h3,{id:"why-it-matters-3",children:"Why It Matters"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Prevents"})," unauthorized modification of stored data.",(0,i.jsx)("br",{})]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Ensures"})," critical storage remains immutable."]}),"\n"]}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h2,{id:"5-enable-encryption-for-persistent-volumes",children:"5. Enable Encryption for Persistent Volumes"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"Issue:"})," Unencrypted storage volumes expose sensitive data if accessed by unauthorized users.",(0,i.jsx)("br",{}),"\n",(0,i.jsx)(s.strong,{children:"Fix:"})," Use ",(0,i.jsx)(s.strong,{children:"encryption at rest"})," for all persistent volumes."]}),"\n",(0,i.jsx)(s.h3,{id:"secure-encrypted-storage-aws-ebs-example",children:"Secure Encrypted Storage (AWS EBS Example)"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-yaml",children:'apiVersion: storage.k8s.io/v1\nkind: StorageClass\nmetadata:\n  name: encrypted-storage\nprovisioner: kubernetes.io/aws-ebs\nparameters:\n  encrypted: "true"\n  kmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/my-key"\n'})}),"\n",(0,i.jsx)(s.h3,{id:"why-it-matters-4",children:"Why It Matters"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Protects"})," data even if storage is compromised.",(0,i.jsx)("br",{})]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Ensures"})," compliance with encryption standards."]}),"\n"]}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h2,{id:"6-monitor-and-audit-csi-driver-activity",children:"6. Monitor and Audit CSI Driver Activity"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"Issue:"})," Without monitoring, attacks on CSI drivers may go undetected.",(0,i.jsx)("br",{}),"\n",(0,i.jsx)(s.strong,{children:"Fix:"})," Enable ",(0,i.jsx)(s.strong,{children:"audit logging"})," and monitor storage access."]}),"\n",(0,i.jsx)(s.h3,{id:"enable-kubernetes-audit-logging-for-storage-events",children:"Enable Kubernetes Audit Logging for Storage Events"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-yaml",children:'apiVersion: audit.k8s.io/v1\nkind: Policy\nrules:\n  - level: Metadata\n    verbs: ["create", "delete", "patch", "update"]\n    resources:\n      - group: "storage.k8s.io"\n        resources: ["persistentvolumes", "persistentvolumeclaims", "csidrivers"]\n'})}),"\n",(0,i.jsx)(s.h3,{id:"why-it-matters-5",children:"Why It Matters"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Detects"})," unauthorized storage access or modifications.",(0,i.jsx)("br",{})]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Provides"})," visibility into CSI driver activity."]}),"\n"]}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,i.jsxs)(s.p,{children:["To secure Kubernetes CSI drivers, administrators should ",(0,i.jsx)(s.strong,{children:"enforce strict RBAC controls, disable privileged mode, restrict volume access, enable encryption, and monitor storage activity"}),". These best practices ensure ",(0,i.jsx)(s.strong,{children:"secure storage provisioning and prevent unauthorized data access"}),"."]})]})}function u(e={}){const{wrapper:s}={...(0,t.R)(),...e.components};return s?(0,i.jsx)(s,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},8453:(e,s,n)=>{n.d(s,{R:()=>a,x:()=>o});var r=n(6540);const i={},t=r.createContext(i);function a(e){const s=r.useContext(t);return r.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function o(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),r.createElement(t.Provider,{value:s},e.children)}}}]);