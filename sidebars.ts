import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  default: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introduction to Kubernetes Security',
    },
    {
      type: 'category',
      label: 'Fundamentals',
      link: { type: 'doc', id: 'fundamentals/intro' },
      items: [
        'fundamentals/understanding_k8s_attack_surface',
        'fundamentals/the_4_c_cloud_native_security',
        {
          type: 'category',
          label: 'Authentication',
          items: [
            'fundamentals/authentication/authentication_methods',
            'fundamentals/authentication/certificates',
            'fundamentals/authentication/service_accounts',
          ],
        },
        {
          type: 'category',
          label: 'Authorization',
          items: [
            'fundamentals/authorization/authorization_methods',
            'fundamentals/authorization/abac',
            'fundamentals/authorization/node_authorization',
            'fundamentals/authorization/rbac',
            'fundamentals/authorization/webhook_authorization',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Attack Vectors',
      link: { type: 'doc', id: 'attack_vectors/intro' },
      items: [
        'attack_vectors/compromised_api_server',
        'attack_vectors/exposed_dashboard',
        'attack_vectors/insecure_secrets_management',
        'attack_vectors/exposed_kubelet_api',
        'attack_vectors/lack_of_network_policies',
        'attack_vectors/supply_chain_attacks',
        'attack_vectors/unrestricted_etcd_access',
        'attack_vectors/insecure_rbac_permissions',
        'attack_vectors/misconfigured_admission_controllers',
        'attack_vectors/privileged_container_escape',
        'attack_vectors/ddos_attacks',
        'attack_vectors/unrestricted_hostpath_mounts',
        'attack_vectors/traffic_hijacking',
        'attack_vectors/insecure_csi_drivers',
        'attack_vectors/privileged_service_accounts',
        'attack_vectors/compromised_sidecars',
      ],
    },
    {
      type: 'category',
      label: 'Best Practices',
      link: { type: 'doc', id: 'best_practices/intro' },
      items: [
        {
          type: 'category',
          label: 'Cluster Setup and Hardening',
          link: { type: 'doc', id: 'best_practices/cluster_setup_and_hardening/intro' },
          items: [
            {
              type: 'category',
              label: 'API Server Security',
              items: [
                'best_practices/cluster_setup_and_hardening/api_server_security/compromised_api_server_mitigation',
                'best_practices/cluster_setup_and_hardening/api_server_security/misconfigured_admission_controllers_mitigation',
              ],
            },
            {
              type: 'category',
              label: 'CIS',
              items: [
                'best_practices/cluster_setup_and_hardening/cis/understanding_cis_benchmarks',
                'best_practices/cluster_setup_and_hardening/cis/cis_benchmark_for_k8s',
                'best_practices/cluster_setup_and_hardening/cis/cis_benchmark_kube_bench',
              ],
            },
            {
              type: 'category',
              label: 'Configuration Validation',
              items: [
                'best_practices/cluster_setup_and_hardening/configuration_validation/kube_score',
                'best_practices/cluster_setup_and_hardening/configuration_validation/kubescape',
                'best_practices/cluster_setup_and_hardening/configuration_validation/polaris',
              ],
            },
            {
              type: 'category',
              label: 'Control Plane Security',
              items: ['best_practices/cluster_setup_and_hardening/control_plane_security/etcd_security_mitigation'],
            },
            {
              type: 'category',
              label: 'Network Security',
              link: { type: 'doc', id: 'best_practices/cluster_setup_and_hardening/network_security/intro' },
              items: [
                'best_practices/cluster_setup_and_hardening/network_security/ddos_mitigation',
                'best_practices/cluster_setup_and_hardening/network_security/dns_security',
                'best_practices/cluster_setup_and_hardening/network_security/egress_control',
                'best_practices/cluster_setup_and_hardening/network_security/exposed_dashboard_mitigation',
                'best_practices/cluster_setup_and_hardening/network_security/ingress_security',
                'best_practices/cluster_setup_and_hardening/network_security/network_policies',
                'best_practices/cluster_setup_and_hardening/network_security/service_mesh_security',
                'best_practices/cluster_setup_and_hardening/network_security/traffic_hijacking_mitigation',
              ],
            },
            {
              type: 'category',
              label: 'Node Security',
              items: ['best_practices/cluster_setup_and_hardening/node_security/kubelet_security'],
            },
            {
              type: 'category',
              label: 'Pod Security',
              items: [
                'best_practices/cluster_setup_and_hardening/pod_security/app_armor_profiles',
                'best_practices/cluster_setup_and_hardening/pod_security/compromised_sidecars_mitigation',
                'best_practices/cluster_setup_and_hardening/pod_security/container_escape_mitigation',
                'best_practices/cluster_setup_and_hardening/pod_security/csi_driver_mitigation',
                'best_practices/cluster_setup_and_hardening/pod_security/pod_sandboxing',
                'best_practices/cluster_setup_and_hardening/pod_security/pod_security_standards',
                'best_practices/cluster_setup_and_hardening/pod_security/seccomp_in_pods',
                'best_practices/cluster_setup_and_hardening/pod_security/unrestricted_hostpath_mitigation',
              ],
            },
            {
              type: 'category',
              label: 'RBAC and Identity',
              items: [
                'best_practices/cluster_setup_and_hardening/rbac_and_identity/insecure_rbac_permissions_mitigation',
                'best_practices/cluster_setup_and_hardening/rbac_and_identity/service_account_mitigation',
              ],
            },
            {
              type: 'category',
              label: 'Secrets Management',
              items: ['best_practices/cluster_setup_and_hardening/secrets_management/insecure_secrets_management_mitigation'],
            },
          ],
        },
        {
          type: 'category',
          label: 'System Hardening',
          link: { type: 'doc', id: 'best_practices/system_hardening/intro' },
          items: [],
        },
        {
          type: 'category',
          label: 'Minimizing Microservice Vulnerabilities',
          link: { type: 'doc', id: 'best_practices/minimize_microservice_vulnerabilities/intro' },
          items: [],
        },
        {
          type: 'category',
          label: 'Monitoring, Logging, and Runtime Security',
          link: { type: 'doc', id: 'best_practices/monitoring_logging_and_runtime_security/intro' },
          items: [
            'best_practices/monitoring_logging_and_runtime_security/trivy',
            'best_practices/monitoring_logging_and_runtime_security/grype',
            'best_practices/monitoring_logging_and_runtime_security/falco',
            'best_practices/monitoring_logging_and_runtime_security/tetragon',
          ],
        },
        {
          type: 'category',
          label: 'Securing the Kubernetes Supply Chain',
          link: { type: 'doc', id: 'best_practices/supply_chain_security/intro' },
          items: [
            'best_practices/supply_chain_security/syft',
            'best_practices/supply_chain_security/supply_chain_best_practices',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Tools',
      link: { type: 'doc', id: 'tools/intro' },
      items: [], // Can be populated similarly if needed
    },
  ],
};

export default sidebars;