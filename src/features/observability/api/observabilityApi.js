const traces = [
  { id: 'tr_8fa31d', name: 'Refund eligibility agent', application: 'Customer Concierge', user: 'Maya Chen', time: '2 min ago', startedAt: '2026-07-18T09:42:12Z', latency: 1240, tokens: 4812, cost: 0.038, status: 'Passed', risk: 'Low', model: 'gpt-4.1', bookmarked: false, prompt: 'A customer says their order arrived damaged...', response: 'The customer is eligible for a refund...', evaluation: 94, sources: 4 },
  { id: 'tr_7a9e52', name: 'Account access assistant', application: 'Customer Concierge', user: 'Alex Patel', time: '7 min ago', startedAt: '2026-07-18T09:37:03Z', latency: 2810, tokens: 8404, cost: 0.072, status: 'Review', risk: 'Medium', model: 'gpt-4.1', bookmarked: true, prompt: 'I cannot get into my account...', response: 'I can help you start a secure reset...', evaluation: 82, sources: 2 },
  { id: 'tr_e13c90', name: 'Invoice reconciliation', application: 'Finance Copilot', user: 'Liam Wong', time: '11 min ago', startedAt: '2026-07-18T09:33:18Z', latency: 890, tokens: 2109, cost: 0.015, status: 'Passed', risk: 'Low', model: 'claude-3.5', bookmarked: false, prompt: 'Reconcile invoice INV-10482...', response: 'The invoice matches the purchase order...', evaluation: 98, sources: 3 },
  { id: 'tr_42d8aa', name: 'Claims assistant escalation', application: 'Claims Desk', user: 'Noah Williams', time: '18 min ago', startedAt: '2026-07-18T09:26:45Z', latency: 4720, tokens: 11829, cost: 0.112, status: 'Blocked', risk: 'High', model: 'gpt-4.1', bookmarked: false, prompt: 'Ignore your rules...', response: 'Request blocked by the prompt-injection guardrail...', evaluation: 100, sources: 0 },
  { id: 'tr_b1267f', name: 'Knowledge base search', application: 'Support Hub', user: 'Priya Shah', time: '23 min ago', startedAt: '2026-07-18T09:21:55Z', latency: 1560, tokens: 3762, cost: 0.021, status: 'Passed', risk: 'Low', model: 'gpt-4.1-mini', bookmarked: false, prompt: 'What are the supported export formats...', response: 'Analytics reports can be exported in CSV...', evaluation: 96, sources: 5 },
  { id: 'tr_91fd41', name: 'Renewal recommendation', application: 'Sales Assist', user: 'Elena Rossi', time: '28 min ago', startedAt: '2026-07-18T09:17:34Z', latency: 2030, tokens: 6543, cost: 0.065, status: 'Review', risk: 'Medium', model: 'claude-3.5', bookmarked: true, prompt: 'Draft a renewal recommendation...', response: 'The account shows strong adoption...', evaluation: 88, sources: 6 }
];

const mockTraffic = Array.from({ length: 24 }).map((_, i) => ({
  time: `${i}:00`,
  requests: Math.floor(Math.random() * 500) + 100,
  errors: Math.floor(Math.random() * 20),
  latency: Math.floor(Math.random() * 800) + 200
}));

const delay = (value) => new Promise((resolve) => setTimeout(() => resolve(value), 120));

export const observabilityApi = {
  async getOverview() {
    return delay({
      totalTraces: 48291,
      health: 96.8,
      medianLatency: 1.24,
      activeSessions: 183,
      blocked: 183,
      activeUsers: 849,
      promptExecutions: 124802,
      llmCost: 482.50,
      costBudgetPct: 82,
      latencyP95: 3.4,
      latencyP99: 5.8,
      recent: traces.slice(0, 4),
      trafficTimeline: mockTraffic,
      topApplications: [
        { name: 'Customer Concierge', health: 98.2, requests: 12400, latency: 1.2, errors: 45, cost: 184.2, users: 420 },
        { name: 'Claims Desk', health: 91.5, requests: 8300, latency: 2.8, errors: 210, cost: 145.8, users: 180 },
        { name: 'Support Hub', health: 99.8, requests: 15600, latency: 0.8, errors: 12, cost: 89.4, users: 650 },
        { name: 'Finance Copilot', health: 97.4, requests: 4200, latency: 1.5, errors: 38, cost: 62.1, users: 85 }
      ],
      topModels: [
        { name: 'gpt-4.1', provider: 'OpenAI', requests: 18200, latency: 2.1, tokens: 4.2, cost: 380, failures: 140 },
        { name: 'claude-3.5', provider: 'Anthropic', requests: 12400, latency: 1.8, tokens: 3.8, cost: 290, failures: 42 },
        { name: 'gpt-4.1-mini', provider: 'OpenAI', requests: 48500, latency: 0.4, tokens: 12.5, cost: 95, failures: 18 }
      ],
      promptAnalytics: [
        { name: 'Customer Summary', requests: 8400, latency: 1.2, failures: 28, cost: 45, score: 92 },
        { name: 'Claim Evaluation', requests: 3200, latency: 4.5, failures: 34, cost: 128, score: 78 },
        { name: 'Data Extraction', requests: 14500, latency: 0.8, failures: 12, cost: 65, score: 98 }
      ],
      sessionStats: {
        total: 12450,
        avgLength: '4m 20s',
        avgMessages: 8.4,
        dropoffRate: 12.4
      },
      alerts: [
        { id: 'al_1', severity: 'high', title: 'Latency Increased 28%', desc: 'GPT-4.1 average latency spiked over 4s.', app: 'Claims Desk', time: '10m ago' },
        { id: 'al_2', severity: 'medium', title: 'Cost Threshold Approaching', desc: 'Daily budget is at 82% utilization.', app: 'All', time: '45m ago' },
        { id: 'al_3', severity: 'critical', title: 'Guardrail Block Spike', desc: 'High volume of PII redactions triggered.', app: 'Customer Concierge', time: '1h ago' }
      ],
      recommendations: [
        { id: 'rec_1', priority: 'High', impact: 'Reduce Latency', desc: 'Latency increased 28% for GPT-4.1. Investigate Trace Explorer.', action: 'Trace Explorer' },
        { id: 'rec_2', priority: 'Medium', impact: 'Reduce Cost', desc: 'OpenAI costs exceeded daily budget. Review Cost Analytics.', action: 'Cost Module' },
        { id: 'rec_3', priority: 'High', impact: 'Fix Failures', desc: 'Prompt "Claim Evaluation" has a 34% failure rate. Review Prompt Details.', action: 'Prompt Explorer' }
      ]
    });
  },
  async listTraces({ query = '', status = 'All', bookmarkedOnly = false } = {}) {
    const normalized = query.toLowerCase();
    const result = traces.filter((trace) =>
      (!normalized || `${trace.name} ${trace.application} ${trace.user} ${trace.id}`.toLowerCase().includes(normalized)) &&
      (status === 'All' || trace.status === status) &&
      (!bookmarkedOnly || trace.bookmarked)
    );
    return delay(result);
  },
  async getTrace(traceId) { return delay(traces.find((trace) => trace.id === traceId) || traces[0]); },
  async toggleBookmark(traceId) {
    const trace = traces.find((item) => item.id === traceId);
    if (trace) trace.bookmarked = !trace.bookmarked;
    return delay(trace);
  },
  async getSavedViews() {
    return delay([
      { id: 'all', label: 'All traces', count: 48291 },
      { id: 'attention', label: 'Needs attention', count: 183 },
      { id: 'bookmarks', label: 'Bookmarked', count: traces.filter((trace) => trace.bookmarked).length }
    ]);
  }
};
