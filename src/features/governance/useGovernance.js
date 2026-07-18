import { useState, useEffect } from 'react';

export function useGovernance() {
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState(null);
  const [compliance, setCompliance] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [assets, setAssets] = useState([]);
  const [auditEvents, setAuditEvents] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setOverview({
        score: '84%',
        activePolicies: 24,
        violations: 2,
        assets: 18,
        pendingApprovals: 5,
        auditEvents: 1420
      });
      setCompliance([
        { id: 'ISO42001', name: 'ISO 42001', status: 'Compliant', violations: 0 },
        { id: 'SOC2', name: 'SOC 2', status: 'At Risk', violations: 2 },
        { id: 'GDPR', name: 'GDPR', status: 'Compliant', violations: 0 }
      ]);
      setPolicies([
        { id: 'POL-01', name: 'Data Minimization', status: 'Active', version: 'v1.4' },
        { id: 'POL-02', name: 'Acceptable Use', status: 'Draft', version: 'v2.0-draft' },
        { id: 'POL-03', name: 'LLM Vendor Security', status: 'Review', version: 'v1.0' }
      ]);
      setAssets([
        { id: 'MOD-GPT4', name: 'GPT-4 Turbo', type: 'Model', owner: 'AI Platform Team', version: '2024-04-09' },
        { id: 'DS-USER', name: 'User Profile Dataset', type: 'Dataset', owner: 'Data Eng', version: 'v4' },
        { id: 'PR-CHAT', name: 'Support Chat Template', type: 'Prompt', owner: 'Support Eng', version: 'v12' }
      ]);
      setAuditEvents([
        { id: 'EV-100', timestamp: '10 mins ago', user: 'alice@example.com', action: 'Update', resource: 'POL-01', pre: 'v1.3', post: 'v1.4' },
        { id: 'EV-101', timestamp: '2 hours ago', user: 'bob@example.com', action: 'Create', resource: 'DS-USER', pre: '-', post: 'v4' }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  return { loading, overview, compliance, policies, assets, auditEvents };
}
