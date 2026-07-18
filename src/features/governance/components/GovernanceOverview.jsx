import React from 'react';
import ModulePage from '../../../pages/ModulePage';

export default function GovernanceOverview({ overview }) {
  const stats = [
    { label: 'Compliance Score', value: overview?.score || '-', change: 'Target: 100%' },
    { label: 'Active Policies', value: overview?.activePolicies || 0, change: 'Approved' },
    { label: 'Violations', value: overview?.violations || 0, change: 'Requires attention' },
    { label: 'AI Assets', value: overview?.assets || 0, change: 'Tracked' }
  ];

  const signals = [
    { title: 'New policy draft', detail: 'Acceptable Use Policy v2.0 needs review.', time: '2h ago' },
    { title: 'Compliance violation', detail: 'SOC 2 logging requirement failed.', time: '5h ago' },
    { title: 'New asset added', detail: 'Data Eng registered a new dataset.', time: '1d ago' }
  ];

  return (
    <ModulePage 
      eyebrow="Governance" 
      activePage="Overview" 
      title="Governance Overview" 
      description="Gain visibility, enforce compliance, and maintain an immutable audit trail for all AI activities." 
      stats={stats} 
      signals={signals} 
    />
  );
}
