import React, {useState} from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import styles from "./practice.module.css";

interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  docLink?: string;
}

const questions: Question[] = [
  // Cluster Setup & Hardening
  {
    id: 1,
    category: "Cluster Setup & Hardening",
    question: "Which Kubernetes resource is used to restrict network traffic between pods?",
    options: [
      "SecurityContext",
      "NetworkPolicy",
      "PodSecurityPolicy",
      "ResourceQuota",
    ],
    correctAnswer: 1,
    explanation: "NetworkPolicy is a Kubernetes resource that specifies how groups of pods are allowed to communicate with each other and other network endpoints. It acts as a firewall for your cluster.",
    docLink: "/kubernetes-security/best-practices/cluster-setup-and-hardening/network-security/network-policies",
  },
  {
    id: 2,
    category: "Cluster Setup & Hardening",
    question: "What is the recommended way to check if your cluster follows CIS Kubernetes Benchmark guidelines?",
    options: [
      "kubectl audit",
      "kube-bench",
      "kubectl describe nodes",
      "kubeadm config",
    ],
    correctAnswer: 1,
    explanation: "kube-bench is a tool that checks whether Kubernetes is deployed according to the CIS Kubernetes Benchmark security recommendations. It runs automated checks against your cluster configuration.",
    docLink: "/kubernetes-security/best-practices/cluster-setup-and-hardening/intro",
  },
  {
    id: 3,
    category: "Cluster Setup & Hardening",
    question: "Which admission controller should be enabled to enforce Pod Security Standards?",
    options: [
      "NodeRestriction",
      "PodSecurityPolicy",
      "PodSecurity",
      "SecurityContextDeny",
    ],
    correctAnswer: 2,
    explanation: "PodSecurity is the built-in admission controller that enforces Pod Security Standards (PSS) at the namespace level. PodSecurityPolicy was deprecated in Kubernetes 1.21 and removed in 1.25.",
    docLink: "/kubernetes-security/best-practices/cluster-setup-and-hardening/pod-security/pod-security-admission",
  },
  {
    id: 4,
    category: "Cluster Setup & Hardening",
    question: "Which API server flag should be set to enable audit logging?",
    options: [
      "--audit-log-path",
      "--enable-audit",
      "--log-audit-events",
      "--audit-mode=enabled",
    ],
    correctAnswer: 0,
    explanation: "The --audit-log-path flag specifies the path where audit logs should be written. Additional flags like --audit-policy-file define what events to record.",
    docLink: "/kubernetes-security/best-practices/monitoring-logging-and-runtime-security/intro",
  },
  // System Hardening
  {
    id: 5,
    category: "System Hardening",
    question: "Which Linux kernel feature can restrict the system calls a container can make?",
    options: [
      "AppArmor",
      "SELinux",
      "Seccomp",
      "Capabilities",
    ],
    correctAnswer: 2,
    explanation: "Seccomp (Secure Computing Mode) is a Linux kernel feature that can restrict the system calls a process can make. Kubernetes allows you to apply seccomp profiles to pods.",
    docLink: "/kubernetes-security/best-practices/cluster-setup-and-hardening/pod-security/seccomp",
  },
  {
    id: 6,
    category: "System Hardening",
    question: "What is the principle that states users and processes should have only the minimum permissions necessary?",
    options: [
      "Defense in Depth",
      "Zero Trust",
      "Least Privilege",
      "Separation of Duties",
    ],
    correctAnswer: 2,
    explanation: "The Principle of Least Privilege states that every program and user should operate using the least amount of privilege necessary to complete the job. This reduces the potential damage from attacks.",
    docLink: "/kubernetes-security/fundamentals/intro",
  },
  // Minimize Microservice Vulnerabilities
  {
    id: 7,
    category: "Minimize Microservice Vulnerabilities",
    question: "Which Pod Security Standard level provides the most restrictive security profile?",
    options: [
      "Privileged",
      "Baseline",
      "Restricted",
      "Default",
    ],
    correctAnswer: 2,
    explanation: "The Restricted profile is the most restrictive PSS level, following current pod hardening best practices. It disallows privilege escalation, requires running as non-root, and enforces many other security controls.",
    docLink: "/kubernetes-security/best-practices/cluster-setup-and-hardening/pod-security/pod-security-standards",
  },
  {
    id: 8,
    category: "Minimize Microservice Vulnerabilities",
    question: "What field in a SecurityContext ensures a container runs as a non-root user?",
    options: [
      "privileged: false",
      "runAsNonRoot: true",
      "allowPrivilegeEscalation: false",
      "readOnlyRootFilesystem: true",
    ],
    correctAnswer: 1,
    explanation: "runAsNonRoot: true in a SecurityContext ensures the container must run as a non-root user. The kubelet will reject running the container if it would run as root (UID 0).",
    docLink: "/kubernetes-security/best-practices/cluster-setup-and-hardening/pod-security/security-context",
  },
  {
    id: 9,
    category: "Minimize Microservice Vulnerabilities",
    question: "Which Kubernetes resource type should NOT be used to store sensitive data in plain text?",
    options: [
      "Secret",
      "ConfigMap",
      "PersistentVolume",
      "Namespace",
    ],
    correctAnswer: 1,
    explanation: "ConfigMaps store data in plain text and are not designed for sensitive data. Secrets should be used instead, and ideally encrypted at rest. Never store passwords, tokens, or keys in ConfigMaps.",
    docLink: "/kubernetes-security/attack-vectors/insecure-secrets-management",
  },
  // Supply Chain Security
  {
    id: 10,
    category: "Supply Chain Security",
    question: "Which tool is commonly used to sign and verify container images?",
    options: [
      "Trivy",
      "Cosign",
      "Falco",
      "kube-bench",
    ],
    correctAnswer: 1,
    explanation: "Cosign is a tool for signing and verifying container images, enabling supply chain security. It supports keyless signing using OIDC identities and integrates with registries and Kubernetes admission controllers.",
    docLink: "/kubernetes-security/best-practices/supply-chain-security/cosign",
  },
  {
    id: 11,
    category: "Supply Chain Security",
    question: "What does SBOM stand for in the context of supply chain security?",
    options: [
      "Secure Build Operations Manager",
      "Software Bill of Materials",
      "System Backup and Operations Module",
      "Security Baseline Operational Model",
    ],
    correctAnswer: 1,
    explanation: "SBOM (Software Bill of Materials) is a formal record of the components and dependencies in software. It enables vulnerability tracking and supply chain transparency. Tools like Syft generate SBOMs.",
    docLink: "/kubernetes-security/best-practices/supply-chain-security/syft",
  },
  {
    id: 12,
    category: "Supply Chain Security",
    question: "Which tool scans container images for known vulnerabilities?",
    options: [
      "Kyverno",
      "OPA Gatekeeper",
      "Trivy",
      "Cilium",
    ],
    correctAnswer: 2,
    explanation: "Trivy is a comprehensive security scanner that detects vulnerabilities, misconfigurations, and secrets in container images, filesystems, and Kubernetes manifests.",
    docLink: "/kubernetes-security/best-practices/monitoring-logging-and-runtime-security/trivy",
  },
  // Monitoring, Logging & Runtime Security
  {
    id: 13,
    category: "Monitoring & Runtime Security",
    question: "Which tool detects abnormal behavior in containers at runtime using system call monitoring?",
    options: [
      "Trivy",
      "Falco",
      "kube-bench",
      "Polaris",
    ],
    correctAnswer: 1,
    explanation: "Falco is a cloud-native runtime security tool that detects abnormal behavior, security threats, and compliance violations using system call monitoring and custom rules.",
    docLink: "/kubernetes-security/best-practices/monitoring-logging-and-runtime-security/falco",
  },
  {
    id: 14,
    category: "Monitoring & Runtime Security",
    question: "What Kubernetes feature provides a chronological record of all API server requests?",
    options: [
      "Event logging",
      "Audit logging",
      "Container logging",
      "Node logging",
    ],
    correctAnswer: 1,
    explanation: "Audit logging records all requests to the Kubernetes API server, providing a chronological record of activities for security analysis, compliance, and incident investigation.",
    docLink: "/kubernetes-security/best-practices/monitoring-logging-and-runtime-security/intro",
  },
  // RBAC
  {
    id: 15,
    category: "Cluster Setup & Hardening",
    question: "Which RBAC resource grants permissions within a specific namespace?",
    options: [
      "ClusterRole",
      "ClusterRoleBinding",
      "Role",
      "ServiceAccount",
    ],
    correctAnswer: 2,
    explanation: "A Role grants permissions within a specific namespace. For cluster-wide permissions, you would use a ClusterRole. Roles are bound to subjects using RoleBindings.",
    docLink: "/kubernetes-security/fundamentals/authorization/rbac",
  },
  {
    id: 16,
    category: "Cluster Setup & Hardening",
    question: "What is the risk of using wildcard (*) verbs in an RBAC Role?",
    options: [
      "It improves performance",
      "It grants all permissions including delete and create",
      "It only affects GET requests",
      "It has no security impact",
    ],
    correctAnswer: 1,
    explanation: "Using wildcard (*) verbs grants all possible permissions including get, list, create, update, patch, delete, and watch. This violates the principle of least privilege and can lead to privilege escalation.",
    docLink: "/kubernetes-security/attack-vectors/insecure-rbac-permissions",
  },
];

export default function Practice(): JSX.Element {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(questions.map((q) => q.category)));

  const filteredQuestions = selectedCategory
    ? questions.filter((q) => q.category === selectedCategory)
    : questions;

  const question = filteredQuestions[currentQuestion];

  const handleAnswer = (answerIndex: number) => {
    if (showExplanation) return;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    if (answerIndex === question.correctAnswer && !answeredQuestions.has(question.id)) {
      setScore(score + 1);
      setAnsweredQuestions(new Set([...answeredQuestions, question.id]));
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setAnsweredQuestions(new Set());
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  // Quiz structured data for SEO
  const quizStructuredData = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: "CKS Practice Questions - Kubernetes Security Quiz",
    description: "Test your Kubernetes security knowledge with practice questions covering all CKS certification domains including cluster hardening, RBAC, network policies, and supply chain security.",
    url: "https://k8s-security.guru/practice/",
    educationalLevel: "Advanced",
    learningResourceType: "Quiz",
    assesses: [
      "Kubernetes Security",
      "CKS Certification",
      "Cluster Hardening",
      "RBAC",
      "Network Policies",
      "Pod Security Standards",
      "Supply Chain Security",
      "Runtime Security",
    ],
    numberOfQuestions: questions.length,
    educationalAlignment: {
      "@type": "AlignmentObject",
      alignmentType: "teaches",
      educationalFramework: "CKS Certification",
      targetName: "Certified Kubernetes Security Specialist",
    },
    provider: {
      "@type": "Organization",
      name: "K8s Security Guide",
      url: "https://k8s-security.guru",
    },
    isAccessibleForFree: true,
    inLanguage: "en-US",
  };

  // Breadcrumb structured data
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://k8s-security.guru/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Practice Questions",
        item: "https://k8s-security.guru/practice/",
      },
    ],
  };

  return (
    <Layout
      title="CKS Practice Questions | Kubernetes Security Quiz"
      description="Test your Kubernetes security knowledge with practice questions covering all CKS certification domains. Free quiz for CKS exam preparation."
    >
      <Head>
        <meta
          name="keywords"
          content="CKS practice questions, kubernetes security quiz, CKS exam prep, kubernetes security test, CKS study guide, kubernetes certification practice, CKS mock exam"
        />
        <link rel="canonical" href="https://k8s-security.guru/practice/" />
        <script type="application/ld+json">
          {JSON.stringify(quizStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <header className={styles.header}>
            <h1 className={styles.title}>CKS Practice Questions</h1>
            <p className={styles.subtitle}>
              Test your Kubernetes security knowledge with questions inspired by CKS exam domains.
            </p>
            <p className={styles.disclaimer}>
              These are educational practice questions to help you learn — not actual CKS exam questions.
            </p>
          </header>

          <div className={styles.filters}>
            <button
              className={`${styles.filterBtn} ${selectedCategory === null ? styles.filterActive : ""}`}
              onClick={() => handleCategoryChange(null)}
            >
              All ({questions.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${selectedCategory === cat ? styles.filterActive : ""}`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat} ({questions.filter((q) => q.category === cat).length})
              </button>
            ))}
          </div>

          <div className={styles.progress}>
            <span>Question {currentQuestion + 1} of {filteredQuestions.length}</span>
            <span className={styles.score}>Score: {score}/{answeredQuestions.size}</span>
          </div>

          <div className={styles.questionCard}>
            <div className={styles.category}>{question.category}</div>
            <h2 className={styles.question}>{question.question}</h2>
            
            <div className={styles.options}>
              {question.options.map((option, index) => {
                let optionClass = styles.option;
                if (showExplanation) {
                  if (index === question.correctAnswer) {
                    optionClass = `${styles.option} ${styles.correct}`;
                  } else if (index === selectedAnswer && index !== question.correctAnswer) {
                    optionClass = `${styles.option} ${styles.incorrect}`;
                  }
                } else if (index === selectedAnswer) {
                  optionClass = `${styles.option} ${styles.selected}`;
                }
                
                return (
                  <button
                    key={index}
                    className={optionClass}
                    onClick={() => handleAnswer(index)}
                    disabled={showExplanation}
                  >
                    <span className={styles.optionLetter}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <div className={styles.explanation}>
                <h3>Explanation</h3>
                <p>{question.explanation}</p>
                {question.docLink && (
                  <Link to={question.docLink} className={styles.learnMore}>
                    Learn more in the documentation →
                  </Link>
                )}
              </div>
            )}

            <div className={styles.navigation}>
              <button
                className={styles.navBtn}
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
              >
                ← Previous
              </button>
              <button className={styles.resetBtn} onClick={resetQuiz}>
                Reset Quiz
              </button>
              <button
                className={styles.navBtn}
                onClick={nextQuestion}
                disabled={currentQuestion === filteredQuestions.length - 1}
              >
                Next →
              </button>
            </div>
          </div>

          <div className={styles.cta}>
            <p>Want to dive deeper into these topics?</p>
            <Link to="/kubernetes-security/intro" className={styles.ctaButton}>
              Read the Full Documentation
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
