import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSecurity } from '../../features/security/useSecurity';
import SecurityOverview from '../../features/security/components/SecurityOverview';
import Guardrails from '../../features/security/components/Guardrails';
import OWASPTop10 from '../../features/security/components/OWASPTop10';
import RedTeaming from '../../features/security/components/RedTeaming';
import SecurityIncidents from '../../features/security/components/SecurityIncidents';
import GuardrailDetailWorkspace from '../../features/security/components/GuardrailDetailWorkspace';

export default function SecurityModule() {
  const { loading, overview, guardrails, guardrailsMetrics, guardrailsTraces, incidents, toggleGuardrail } = useSecurity();

  if (loading) return <div className="module-loading" role="status"><div><i/>Loading Security…</div></div>;

  return (
    <Routes>
      <Route path="/" element={<Navigate to="overview" replace />} />
      <Route path="overview" element={<SecurityOverview overview={overview} incidents={incidents} />} />
      <Route path="guardrails" element={<Guardrails guardrails={guardrails} metrics={guardrailsMetrics} traces={guardrailsTraces} onToggle={toggleGuardrail} />} />
      <Route path="guardrails/:id" element={<GuardrailDetailWorkspace metrics={guardrailsMetrics} traces={guardrailsTraces} />} />
      <Route path="owasp-top-10" element={<OWASPTop10 />} />
      <Route path="red-teaming" element={<RedTeaming />} />
      <Route path="incidents" element={<SecurityIncidents incidents={incidents} />} />
    </Routes>
  );
}
