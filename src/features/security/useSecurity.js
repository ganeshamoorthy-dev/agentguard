import { useState, useEffect } from 'react';

export function useSecurity() {
  const [loading, setLoading] = useState(true);
  const [guardrails, setGuardrails] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [overview, setOverview] = useState(null);
  const [guardrailsMetrics, setGuardrailsMetrics] = useState(null);
  const [guardrailsTraces, setGuardrailsTraces] = useState([]);

  useEffect(() => {
    // Mock API fetch
    setTimeout(() => {
      // Generate some mock timeseries data for sparklines
      const mockSparklineData = Array.from({ length: 14 }).map(() => Math.floor(Math.random() * 20));
      const criticalSparkline = Array.from({ length: 14 }).map((_, i) => 2 + Math.floor(i * 0.5) + Math.floor(Math.random() * 4));
      const policySparkline = Array.from({ length: 14 }).map((_, i) => 90 - Math.floor(i * 1.5) + Math.floor(Math.random() * 10));

      const mockEventsOverTime = Array.from({ length: 7 }).map((_, i) => ({
        day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
        'Prompt Injection': Math.floor(Math.random() * 5),
        'PII Exposure': Math.floor(Math.random() * 3),
        'Toxic Content': Math.floor(Math.random() * 2)
      }));

      setOverview({
        score: 100,
        scoreStatus: 'Good',
        totalEvents: 0,
        totalEventsSparkline: Array(14).fill(0),
        blockedRequests: 0,
        blockedRequestsSparkline: Array(14).fill(0),
        criticalIncidents: 12,
        criticalIncidentsSparkline: criticalSparkline,
        policyViolations: 78,
        policyViolationsSparkline: policySparkline,
        
        eventsOverTime: mockEventsOverTime,
        
        topRisks: [
          { id: 0, value: 156, label: 'Secrets Exposure' },
          { id: 1, value: 110, label: 'Insecure Output' },
          { id: 2, value: 90, label: 'Others' },
          { id: 3, value: 0, label: 'Prompt Injection' },
          { id: 4, value: 0, label: 'PII Exposure' },
          { id: 5, value: 0, label: 'Toxic Content' },
        ],
        
        eventsByCategory: [
          { label: 'Prompt Injection', value: 0 },
          { label: 'PII Exposure', value: 0 },
          { label: 'Toxic Content', value: 0 },
          { label: 'Secrets & Tokens', value: 156 },
          { label: 'Insecure Output', value: 110 },
          { label: 'Others', value: 90 }
        ],

        incidentsBySeverity: [
          { id: 0, value: 12, label: 'Critical' },
          { id: 1, value: 95, label: 'High' },
          { id: 2, value: 352, label: 'Medium' },
          { id: 3, value: 520, label: 'Low' },
          { id: 4, value: 268, label: 'Info' }
        ]
      });

      setGuardrails([
        { id: 'g1', name: 'PII Redaction', provider: 'Microsoft Presidio', timeline: 'Jun 2026', scope: 'Input + Output', active: false, description: 'Detect and redact personal data (email, phone, SSN, cards) in inputs and outputs before they reach the model.', iconType: 'lock' },
        { id: 'g2', name: 'Prompt Injection Detection', provider: 'Llama Guard 3 / Rebuff', timeline: 'Jun 2026', scope: 'Input', active: false, description: 'Block jailbreaks, role-play attacks, and instruction-override attempts at the request boundary.', iconType: 'shield' },
        { id: 'g3', name: 'Toxic / Harmful Content', provider: 'Llama Guard 3', timeline: 'Jun-Jul', scope: 'Output', active: false, description: 'Classify and block toxic, hateful, or unsafe content in model outputs before they reach the user.', iconType: 'alert' },
        { id: 'g4', name: 'Secrets & Token Scanner', provider: 'AgentGuard + Trufflehog patterns', timeline: 'Jul-Sep', scope: 'Input + Output', active: false, description: 'Detect leaked API keys, credentials, and access tokens flowing through prompts or completions.', iconType: 'key' },
        { id: 'g5', name: 'Topic & Model Allowlist', provider: 'AgentGuard Policy Engine', timeline: 'Jul-Sep', scope: 'Input', active: false, description: 'Restrict which models, topics, and request types each team or tenant is permitted to use.', iconType: 'list' },
        { id: 'g6', name: 'Output Schema Enforcement', provider: 'Outlines / Instructor', timeline: 'Oct-Dec', scope: 'Output', active: false, description: 'Guarantee structured JSON output conforms to a defined schema; reject or repair malformed responses.', iconType: 'code' },
      ]);

      setGuardrailsMetrics({
        findings: 142,
        blockRate: 6,
        avgLatency: 38,
        piiRedactions: 112,
        timeline: Array.from({ length: 7 }).map((_, i) => ({
          day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
          blocked: Math.floor(Math.random() * 20),
          redacted: Math.floor(Math.random() * 40) + 10,
          flagged: Math.floor(Math.random() * 15)
        })),
        byGuardrail: [
          { label: 'pii-input', value: 112, color: '#10b981' },
          { label: 'output-safety', value: 17, color: '#d97706' },
          { label: 'prompt-injection', value: 13, color: '#ef4444' }
        ],
        topEntities: [
          { label: 'EMAIL_ADDRESS', value: 52 },
          { label: 'PHONE_NUMBER', value: 23 },
          { label: 'CREDIT_CARD', value: 9 },
          { label: 'IN_AADHAAR', value: 6 }
        ]
      });

      setIncidents([
        { id: 'INC-001', severity: 'critical', status: 'Open', app: 'Claims Desk', rule: 'Prompt Injection', time: '10m ago' },
        { id: 'INC-002', severity: 'high', status: 'Investigating', app: 'Support Hub', rule: 'Toxicity', time: '1h ago' },
      ]);
      
      const mockTraces = [
        { id: 't1', time: '06-13 09:14', guardrail: 'prompt-injection · LLM Guard', finding: 'Jailbreak attempt (instruction override)', decision: 'BLOCKED' },
        { id: 't2', time: '06-13 08:50', guardrail: 'pii-input · Presidio', finding: 'EMAIL_ADDRESS → j***@***.com', decision: 'REDACTED' },
        { id: 't3', time: '06-13 08:12', guardrail: 'pii-input · Presidio', finding: 'PHONE_NUMBER → ***-***-1234', decision: 'REDACTED' },
        { id: 't4', time: '06-13 07:55', guardrail: 'output-safety · LLM Guard', finding: 'Toxic content in output', decision: 'FLAGGED' },
        { id: 't5', time: '06-12 22:03', guardrail: 'output-safety · LLM Guard', finding: 'PII in output: EMAIL_ADDRESS', decision: 'FLAGGED' }
      ];
      setGuardrailsTraces(mockTraces);

      setLoading(false);
    }, 500);
  }, []);

  const toggleGuardrail = async (id, newState) => {
    // Fake API delay to simulate network latency
    await new Promise(resolve => setTimeout(resolve, 600));
    setGuardrails(prev => prev.map(g => g.id === id ? { ...g, active: newState } : g));
    return true;
  };

  return { loading, overview, guardrails, guardrailsMetrics, guardrailsTraces, incidents, toggleGuardrail };
}
