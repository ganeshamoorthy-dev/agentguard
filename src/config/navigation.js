import { Activity, FileText, LayoutDashboard, ShieldCheck, Sparkles } from 'lucide-react';

export const workspaceNavigation = [
  { label: 'Overview', Icon: LayoutDashboard },
  { label: 'Observability', Icon: Activity },
  { label: 'Security', Icon: ShieldCheck, badge: { count: 3, severity: 'critical', label: '3 critical security alerts' } },
  { label: 'AI Quality', Icon: Sparkles, badge: { count: 2, severity: 'info', label: '2 new quality reports' } },
  { label: 'Governance', Icon: FileText }
];

export const contextNavigation = {
  Overview: [],
  Observability: ['Overview', 'Trace Explorer', 'Sessions', 'Applications', 'Users', 'Models', 'Analytics'],
  Security: ['Overview', 'Guardrails', 'OWASP Top 10', 'Red Teaming', 'Incidents'],
  'AI Quality': ['Overview', 'Scores', 'LLM as a Judge', 'Human Review', 'Datasets', 'Evaluation Runs'],
  Governance: ['Overview', 'Compliance', 'Policy as Code', 'AI BOM', 'Audit Trail'],
  Cost: ['Overview', 'Forecast', 'Optimization']
};
