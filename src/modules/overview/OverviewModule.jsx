import React from 'react';
import ModulePage from '../../pages/ModulePage';

export default function OverviewModule({ activePage }) {
  const stats = [
    { label: 'Total Traces', value: '1.2M', change: '↑ 8% this week' },
    { label: 'System Health', value: '99.9%', change: 'Across 14 applications' },
    { label: 'Active Incidents', value: '3', change: 'Requires attention' },
    { label: 'Average Latency', value: '840ms', change: '↓ 40ms today' }
  ];

  const signals = [
    { title: 'New app deployed', detail: 'Claims Desk v2 is now live.', time: '1h ago' },
    { title: 'Security policy updated', detail: 'PII redaction rules changed.', time: '3h ago' },
    { title: 'High latency detected', detail: 'Inference endpoint us-east-1 is slow.', time: '5h ago' }
  ];

  return (
    <ModulePage 
      eyebrow="Workspace" 
      activePage={activePage || 'Platform Overview'} 
      title="AI Platform Operations" 
      description="Centralized command center for observability, security, and governance." 
      stats={stats} 
      signals={signals} 
    />
  );
}
