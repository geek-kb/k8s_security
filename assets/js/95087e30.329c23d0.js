"use strict";(self.webpackChunkk_8_s_security=self.webpackChunkk_8_s_security||[]).push([[4952],{2021:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>a,contentTitle:()=>o,default:()=>h,frontMatter:()=>c,metadata:()=>r,toc:()=>l});const r=JSON.parse('{"id":"best_practices/cluster_setup_and_hardening/what_are_cis_benchmarks","title":"Understanding CIS Benchmarks","description":"Learn what CIS Benchmarks are and how they help enhance security best practices for systems, networks, and applications.","source":"@site/docs/best_practices/cluster_setup_and_hardening/what_are_cis_benchmarks.md","sourceDirName":"best_practices/cluster_setup_and_hardening","slug":"/best_practices/cluster_setup_and_hardening/what_are_cis_benchmarks","permalink":"/k8s_security/docs/best_practices/cluster_setup_and_hardening/what_are_cis_benchmarks","draft":false,"unlisted":false,"editUrl":"https://github.com/geek-kb/k8s_security/edit/main/docs/best_practices/cluster_setup_and_hardening/what_are_cis_benchmarks.md","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"sidebar_position":2,"title":"Understanding CIS Benchmarks","description":"Learn what CIS Benchmarks are and how they help enhance security best practices for systems, networks, and applications."},"sidebar":"guidesSidebar","previous":{"title":"Securing Kubernetes Admission Controllers","permalink":"/k8s_security/docs/best_practices/cluster_setup_and_hardening/api_server_security/misconfigured_admission_controllers_mitigation"},"next":{"title":"CIS Benchmarks for Kubernetes","permalink":"/k8s_security/docs/best_practices/cluster_setup_and_hardening/cis_benchmark_for_k8s"}}');var i=n(4848),t=n(8453);const c={sidebar_position:2,title:"Understanding CIS Benchmarks",description:"Learn what CIS Benchmarks are and how they help enhance security best practices for systems, networks, and applications."},o="Understanding CIS Benchmarks",a={},l=[{value:"What are CIS Benchmarks?",id:"what-are-cis-benchmarks",level:2},{value:"How CIS Benchmarks Work",id:"how-cis-benchmarks-work",level:2},{value:"Key Components of CIS Benchmarks",id:"key-components-of-cis-benchmarks",level:2},{value:"Why Use CIS Benchmarks?",id:"why-use-cis-benchmarks",level:2},{value:"Conclusion",id:"conclusion",level:2},{value:"Further Reading",id:"further-reading",level:2}];function d(e){const s={a:"a",h1:"h1",h2:"h2",header:"header",hr:"hr",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.header,{children:(0,i.jsx)(s.h1,{id:"understanding-cis-benchmarks",children:"Understanding CIS Benchmarks"})}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:"Required knowledge for the CKS certification."})}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"CIS Benchmarks"})," are a set of best practices and guidelines developed by the ",(0,i.jsx)(s.strong,{children:"Center for Internet Security (CIS)"})," to help organizations improve their ",(0,i.jsx)(s.strong,{children:"security posture"}),". These benchmarks provide ",(0,i.jsx)(s.strong,{children:"configuration baselines"})," and ",(0,i.jsx)(s.strong,{children:"security recommendations"})," for a wide range of ",(0,i.jsx)(s.strong,{children:"systems"}),", ",(0,i.jsx)(s.strong,{children:"networks"}),", and ",(0,i.jsx)(s.strong,{children:"applications"}),"."]}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h2,{id:"what-are-cis-benchmarks",children:"What are CIS Benchmarks?"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"CIS Benchmarks"})," are ",(0,i.jsx)(s.strong,{children:"community-driven"}),", created by ",(0,i.jsx)(s.strong,{children:"security professionals"}),", ",(0,i.jsx)(s.strong,{children:"vendors"}),", and ",(0,i.jsx)(s.strong,{children:"subject matter experts"}),"."]}),"\n",(0,i.jsxs)(s.li,{children:["Cover over ",(0,i.jsx)(s.strong,{children:"100+ technologies"}),", including ",(0,i.jsx)(s.strong,{children:"Operating Systems (OS)"}),", ",(0,i.jsx)(s.strong,{children:"Server Software"}),", ",(0,i.jsx)(s.strong,{children:"Cloud Providers"}),", ",(0,i.jsx)(s.strong,{children:"Network Devices"}),", and ",(0,i.jsx)(s.strong,{children:"Applications"}),"."]}),"\n",(0,i.jsxs)(s.li,{children:["Include ",(0,i.jsx)(s.strong,{children:"configuration recommendations"})," that enhance ",(0,i.jsx)(s.strong,{children:"security"})," and ",(0,i.jsx)(s.strong,{children:"reduce vulnerabilities"}),"."]}),"\n"]}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h2,{id:"how-cis-benchmarks-work",children:"How CIS Benchmarks Work"}),"\n",(0,i.jsxs)(s.ol,{children:["\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Configuration Guidelines:"})," Provide ",(0,i.jsx)(s.strong,{children:"step-by-step instructions"})," for configuring ",(0,i.jsx)(s.strong,{children:"systems securely"}),"."]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Scoring Systems:"})," Many benchmarks include ",(0,i.jsx)(s.strong,{children:"scoring systems"})," to measure ",(0,i.jsx)(s.strong,{children:"compliance"}),"."]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Auditing Tools:"})," CIS offers tools like ",(0,i.jsx)(s.strong,{children:"CIS-CAT Pro"})," to help organizations ",(0,i.jsx)(s.strong,{children:"automate assessments"}),"."]}),"\n"]}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h2,{id:"key-components-of-cis-benchmarks",children:"Key Components of CIS Benchmarks"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Profiles:"})," Provide different levels of ",(0,i.jsx)(s.strong,{children:"security baselines"}),":","\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Level 1:"})," Basic security for ",(0,i.jsx)(s.strong,{children:"general environments"}),"."]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Level 2:"})," More ",(0,i.jsx)(s.strong,{children:"stringent settings"})," for ",(0,i.jsx)(s.strong,{children:"high-security environments"}),"."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Scoring:"})," Recommendations are often categorized as:","\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Scored:"})," Impact ",(0,i.jsx)(s.strong,{children:"overall compliance score"}),"."]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Not Scored:"})," ",(0,i.jsx)(s.strong,{children:"Advisory"})," and do not affect ",(0,i.jsx)(s.strong,{children:"compliance scoring"}),"."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Automated Tools:"})," Tools like ",(0,i.jsx)(s.strong,{children:"CIS-CAT Pro"})," can ",(0,i.jsx)(s.strong,{children:"automate assessments"}),"."]}),"\n"]}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h2,{id:"why-use-cis-benchmarks",children:"Why Use CIS Benchmarks?"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Improve Security Posture:"})," Provides a ",(0,i.jsx)(s.strong,{children:"structured approach"})," to ",(0,i.jsx)(s.strong,{children:"secure systems"}),"."]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Compliance Requirements:"})," Many ",(0,i.jsx)(s.strong,{children:"regulations"})," and ",(0,i.jsx)(s.strong,{children:"standards"})," reference ",(0,i.jsx)(s.strong,{children:"CIS Benchmarks"})," as ",(0,i.jsx)(s.strong,{children:"best practices"}),"."]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Risk Management:"})," Helps ",(0,i.jsx)(s.strong,{children:"identify"})," and ",(0,i.jsx)(s.strong,{children:"mitigate risks"})," through ",(0,i.jsx)(s.strong,{children:"well-defined controls"}),"."]}),"\n"]}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,i.jsxs)(s.p,{children:["CIS Benchmarks offer a ",(0,i.jsx)(s.strong,{children:"valuable resource"})," for ",(0,i.jsx)(s.strong,{children:"organizations"})," aiming to ",(0,i.jsx)(s.strong,{children:"enhance security"}),", ",(0,i.jsx)(s.strong,{children:"maintain compliance"}),", and ",(0,i.jsx)(s.strong,{children:"reduce risks"}),". Regularly ",(0,i.jsx)(s.strong,{children:"assessing configurations"})," against ",(0,i.jsx)(s.strong,{children:"CIS guidelines"})," helps ensure ",(0,i.jsx)(s.strong,{children:"systems remain protected"})," against evolving ",(0,i.jsx)(s.strong,{children:"threat landscapes"}),"."]}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h2,{id:"further-reading",children:"Further Reading"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:(0,i.jsx)(s.a,{href:"https://www.cisecurity.org/cis-benchmarks",children:"CIS Benchmarks Official Site"})}),"\n",(0,i.jsx)(s.li,{children:(0,i.jsx)(s.a,{href:"https://www.cisecurity.org/controls/",children:"CIS Controls"})}),"\n",(0,i.jsx)(s.li,{children:(0,i.jsx)(s.a,{href:"https://www.cisecurity.org/cybersecurity-tools/cis-cat-pro",children:"How to Use CIS-CAT Pro"})}),"\n"]})]})}function h(e={}){const{wrapper:s}={...(0,t.R)(),...e.components};return s?(0,i.jsx)(s,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},8453:(e,s,n)=>{n.d(s,{R:()=>c,x:()=>o});var r=n(6540);const i={},t=r.createContext(i);function c(e){const s=r.useContext(t);return r.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function o(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:c(e.components),r.createElement(t.Provider,{value:s},e.children)}}}]);