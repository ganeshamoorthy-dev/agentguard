import React from 'react';
import ModulePage from '../../pages/ModulePage';

export default function CostModule({ activePage }) {
  const stats = [
    { label: 'Total Spend', value: '$4,231.00', change: '↑ 12% this week' },
    { label: 'Cost per 1k Tokens', value: '$0.002', change: 'Average across models' },
    { label: 'Wasted Spend', value: '$124.50', change: 'From failed traces' },
    { label: 'Budget Utilization', value: '42%', change: 'On track' }
  ];

  const signals = [
    { title: 'GPT-4 usage spike', detail: 'Claims Desk app is using more expensive models.', time: '2h ago' },
    { title: 'Budget alert', detail: 'Customer Concierge is approaching daily limit.', time: '5h ago' },
    { title: 'Optimization opportunity', detail: 'Caching could save $45/day on Support Hub.', time: '1d ago' }
  ];

  return (
    <ModulePage 
      eyebrow="Cost Intelligence" 
      activePage={activePage || 'Cost Overview'} 
      title="Track and optimize AI spend" 
      description="Monitor token usage, analyze model costs, and enforce budget constraints." 
      stats={stats} 
      signals={signals} 
    />
  );
}
