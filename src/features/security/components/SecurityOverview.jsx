import React from 'react';
import ModulePage from '../../../pages/ModulePage';

export default function SecurityOverview({ overview }) {
  const stats = [
    { label: 'Security Score', value: overview?.score || '-', change: 'Target: A' },
    { label: 'Active Policies', value: overview?.activePolicies || 0, change: 'Across all apps' },
    { label: 'Open Incidents', value: overview?.openIncidents || 0, change: 'Requires attention' },
    { label: 'Guardrail Hits', value: overview?.guardrailHits || 0, change: 'This week' }
  ];

  const signals = [
    { title: 'Prompt injection blocked', detail: 'Claims Desk request stopped.', time: '4m ago' },
    { title: 'Jailbreak attempt', detail: 'Detected in Support Hub.', time: '1h ago' },
    { title: 'New rule active', detail: 'Toxicity filter enabled globally.', time: '3h ago' }
  ];

  return (
    <ModulePage 
      eyebrow="Security" 
      activePage="Overview" 
      title="Security Overview" 
      description="Monitor the security posture of your AI applications and quickly act on open incidents." 
      stats={stats} 
      signals={signals} 
    />
  );
}
