import { useState, useEffect } from 'react';

export function useQuality() {
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState(null);
  const [scores, setScores] = useState([]);
  const [judges, setJudges] = useState([]);
  const [humanReviews, setHumanReviews] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [evaluationRuns, setEvaluationRuns] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setOverview({
        score: '91.4%',
        hallucinationRate: '1.2%',
        toxicityRate: '0.05%',
        biasScore: 'Low',
        userSatisfaction: '4.8/5',
        humanReviews: 12,
        failedEvaluations: 4
      });
      setScores([
        { app: 'Claims Desk', correctness: 94, relevance: 98, faithfulness: 92, toxicity: 0, safety: 100 },
        { app: 'Support Hub', correctness: 88, relevance: 92, faithfulness: 85, toxicity: 1, safety: 99 }
      ]);
      setJudges([
        { id: 'J-01', name: 'Strict Correctness Judge', model: 'GPT-4', threshold: 0.9, runs: 1240 },
        { id: 'J-02', name: 'Toxicity Filter', model: 'Llama-Guard', threshold: 0.99, runs: 4500 }
      ]);
      setHumanReviews([
        { traceId: 'tr_8fa31d', reviewer: 'Unassigned', priority: 'High', status: 'Pending', model: 'GPT-4' },
        { traceId: 'tr_2cb99e', reviewer: 'alice@example.com', priority: 'Medium', status: 'In Progress', model: 'Claude-3' }
      ]);
      setDatasets([
        { id: 'DS-01', name: 'Claims Edge Cases', version: 'v3', records: 450, source: 'Prod Logs' },
        { id: 'DS-02', name: 'Toxic Prompts Set', version: 'v1', records: 1200, source: 'Red Team' }
      ]);
      setEvaluationRuns([
        { runId: 'RUN-554', dataset: 'Claims Edge Cases', judge: 'Strict Correctness Judge', status: 'Completed', successRate: '94%' },
        { runId: 'RUN-553', dataset: 'Toxic Prompts Set', judge: 'Toxicity Filter', status: 'Failed', successRate: '88%' }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  return { loading, overview, scores, judges, humanReviews, datasets, evaluationRuns };
}
