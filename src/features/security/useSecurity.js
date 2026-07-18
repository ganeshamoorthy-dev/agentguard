import { useState, useEffect } from 'react';

export function useSecurity() {
  const [loading, setLoading] = useState(true);
  const [guardrails, setGuardrails] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    // Mock API fetch
    setTimeout(() => {
      setOverview({
        score: 'A-',
        activePolicies: 12,
        openIncidents: 3,
        guardrailHits: 183,
        injectionAttempts: 45,
        jailbreakAttempts: 12
      });
      setGuardrails([
        { id: 1, name: 'Block Toxicity', severity: 'High', action: 'Block', scope: 'Global', version: 'v2' },
        { id: 2, name: 'Detect PII', severity: 'Medium', action: 'Warn', scope: 'App: Support', version: 'v1' },
      ]);
      setIncidents([
        { id: 'INC-001', severity: 'critical', status: 'Open', app: 'Claims Desk', rule: 'Prompt Injection', time: '10m ago' },
        { id: 'INC-002', severity: 'high', status: 'Investigating', app: 'Support Hub', rule: 'Toxicity', time: '1h ago' },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  return { loading, overview, guardrails, incidents };
}
