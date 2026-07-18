import React from 'react';
import ModulePage from '../../../pages/ModulePage';

export default function QualityOverview({ overview }) {
  const stats = [
    { label: 'Quality Score', value: overview?.score || '-', change: '↑ 2.7% this week' },
    { label: 'Hallucination Rate', value: overview?.hallucinationRate || '-', change: 'Below target' },
    { label: 'Human Reviews', value: overview?.humanReviews || 0, change: 'Pending' },
    { label: 'Failed Evals', value: overview?.failedEvaluations || 0, change: 'Requires attention' }
  ];

  const signals = [
    { title: 'Judge score increased', detail: 'Support Hub improved after latest prompt release.', time: '16m ago' },
    { title: 'Dataset ready', detail: 'Refund edge cases are ready for evaluation.', time: '48m ago' },
    { title: 'Feedback trend', detail: 'Users report more complete answers this week.', time: '3h ago' }
  ];

  return (
    <ModulePage 
      eyebrow="AI Quality" 
      activePage="Overview" 
      title="AI Quality Overview" 
      description="Evaluate reliability, ground responses in evidence, and improve agent behavior." 
      stats={stats} 
      signals={signals} 
    />
  );
}
