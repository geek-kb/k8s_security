"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[685],{2986:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>g,frontMatter:()=>o,metadata:()=>r,toc:()=>l});const r=JSON.parse('{"id":"best_practices/cluster_setup_and_hardening/network_security/kong","title":"Kong","description":"Kong is an open-source API gateway and service mesh that helps manage, secure, and monitor traffic between services in Kubernetes environments.","source":"@site/docs/best_practices/cluster_setup_and_hardening/network_security/kong.md","sourceDirName":"best_practices/cluster_setup_and_hardening/network_security","slug":"/best_practices/cluster_setup_and_hardening/network_security/kong","permalink":"/docs/best_practices/cluster_setup_and_hardening/network_security/kong","draft":false,"unlisted":false,"tags":[],"version":"current","lastUpdatedBy":"Itai Ganot","lastUpdatedAt":1742842158000,"sidebarPosition":13,"frontMatter":{"title":"Kong","description":"Kong is an open-source API gateway and service mesh that helps manage, secure, and monitor traffic between services in Kubernetes environments.","sidebar_position":13}}');var i=s(4848),t=s(8453);const o={title:"Kong",description:"Kong is an open-source API gateway and service mesh that helps manage, secure, and monitor traffic between services in Kubernetes environments.",sidebar_position:13},a="Kong",c={},l=[{value:"Usage",id:"usage",level:2},{value:"1. Install Kong Ingress Controller on Kubernetes",id:"1-install-kong-ingress-controller-on-kubernetes",level:3},{value:"2. Define an Ingress Resource",id:"2-define-an-ingress-resource",level:3},{value:"3. Add Plugins to Secure Traffic",id:"3-add-plugins-to-secure-traffic",level:3},{value:"4. Monitor and Audit API Traffic",id:"4-monitor-and-audit-api-traffic",level:3},{value:"Best Practices",id:"best-practices",level:2},{value:"Resources",id:"resources",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"kong",children:"Kong"})}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Kong"})," is a ",(0,i.jsx)(n.strong,{children:"cloud-native API gateway"})," and ",(0,i.jsx)(n.strong,{children:"service mesh"})," that enables ",(0,i.jsx)(n.strong,{children:"secure, reliable, and observable"})," communication across microservices. It provides functionality such as ",(0,i.jsx)(n.strong,{children:"traffic routing, authentication, rate limiting, logging, mutual TLS, and plugin extensibility"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["In Kubernetes environments, Kong can be deployed as an ",(0,i.jsx)(n.strong,{children:"Ingress Controller"}),", handling external traffic into the cluster and enforcing security policies at the API layer."]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"usage",children:"Usage"}),"\n",(0,i.jsx)(n.h3,{id:"1-install-kong-ingress-controller-on-kubernetes",children:"1. Install Kong Ingress Controller on Kubernetes"}),"\n",(0,i.jsx)(n.p,{children:"You can install Kong via Helm:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"helm repo add kong https://charts.konghq.com\nhelm repo update\n\nhelm install kong kong/kong --namespace kong --create-namespace \\\n  --set ingressController.installCRDs=false\n"})}),"\n",(0,i.jsx)(n.p,{children:"To enable DB-less mode:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"helm install kong kong/kong \\\n  --set ingressController.installCRDs=true \\\n  --set env.database=off\n"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"2-define-an-ingress-resource",children:"2. Define an Ingress Resource"}),"\n",(0,i.jsxs)(n.p,{children:["After deploying Kong, you can expose services using Kubernetes ",(0,i.jsx)(n.code,{children:"Ingress"})," resources:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:'apiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: example\n  annotations:\n    konghq.com/strip-path: "true"\nspec:\n  ingressClassName: kong\n  rules:\n    - http:\n        paths:\n          - path: /api\n            pathType: Prefix\n            backend:\n              service:\n                name: my-service\n                port:\n                  number: 80\n'})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"3-add-plugins-to-secure-traffic",children:"3. Add Plugins to Secure Traffic"}),"\n",(0,i.jsxs)(n.p,{children:["Kong supports native and custom plugins. For example, enabling ",(0,i.jsx)(n.strong,{children:"rate limiting"}),":"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"apiVersion: configuration.konghq.com/v1\nkind: KongPlugin\nmetadata:\n  name: rate-limiting\nplugin: rate-limiting\nconfig:\n  minute: 5\n  policy: local\n"})}),"\n",(0,i.jsx)(n.p,{children:"Then attach it to a service or Ingress:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"metadata:\n  annotations:\n    konghq.com/plugins: rate-limiting\n"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"4-monitor-and-audit-api-traffic",children:"4. Monitor and Audit API Traffic"}),"\n",(0,i.jsx)(n.p,{children:"Kong supports:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Prometheus metrics"}),"\n",(0,i.jsx)(n.li,{children:"Logging via TCP, HTTP, or file"}),"\n",(0,i.jsx)(n.li,{children:"Integration with tracing tools like Jaeger and Zipkin"}),"\n"]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"best-practices",children:"Best Practices"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Use ",(0,i.jsx)(n.strong,{children:"mutual TLS"})," between services for strong service identity."]}),"\n",(0,i.jsxs)(n.li,{children:["Enable ",(0,i.jsx)(n.strong,{children:"rate limiting, authentication, and CORS"})," controls to protect APIs."]}),"\n",(0,i.jsxs)(n.li,{children:["Deploy ",(0,i.jsx)(n.strong,{children:"DB-less mode"})," in production to simplify scaling and resilience."]}),"\n",(0,i.jsxs)(n.li,{children:["Enable ",(0,i.jsx)(n.strong,{children:"audit logging"})," and monitoring for visibility into traffic patterns."]}),"\n",(0,i.jsxs)(n.li,{children:["Combine with ",(0,i.jsx)(n.strong,{children:"OPA/Gatekeeper"})," or ",(0,i.jsx)(n.strong,{children:"Kyverno"})," for policy enforcement at the API level."]}),"\n"]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"resources",children:"Resources"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"GitHub:"})," ",(0,i.jsx)(n.a,{href:"https://github.com/Kong/kong",children:"https://github.com/Kong/kong"})]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Official Docs:"})," ",(0,i.jsx)(n.a,{href:"https://docs.konghq.com/",children:"https://docs.konghq.com/"})]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Kong Ingress Controller:"})," ",(0,i.jsx)(n.a,{href:"https://docs.konghq.com/kubernetes-ingress-controller/",children:"https://docs.konghq.com/kubernetes-ingress-controller/"})]}),"\n"]})]})}function g(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>o,x:()=>a});var r=s(6540);const i={},t=r.createContext(i);function o(e){const n=r.useContext(t);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),r.createElement(t.Provider,{value:n},e.children)}}}]);