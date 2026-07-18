import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useGovernance } from '../../features/governance/useGovernance';
import GovernanceOverview from '../../features/governance/components/GovernanceOverview';
import Compliance from '../../features/governance/components/Compliance';
import PolicyAsCode from '../../features/governance/components/PolicyAsCode';
import AIBOM from '../../features/governance/components/AIBOM';
import AuditTrail from '../../features/governance/components/AuditTrail';

export default function GovernanceModule() {
  const { loading, overview, compliance, policies, assets, auditEvents } = useGovernance();

  if (loading) return <div className="module-loading" role="status"><div><i/>Loading Governance…</div></div>;

  return (
    <Routes>
      <Route path="/" element={<Navigate to="overview" replace />} />
      <Route path="overview" element={<GovernanceOverview overview={overview} />} />
      <Route path="compliance" element={<Compliance compliance={compliance} />} />
      <Route path="policy-as-code" element={<PolicyAsCode policies={policies} />} />
      <Route path="ai-bom" element={<AIBOM assets={assets} />} />
      <Route path="audit-trail" element={<AuditTrail auditEvents={auditEvents} />} />
    </Routes>
  );
}
