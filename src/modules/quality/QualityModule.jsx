import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useQuality } from '../../features/quality/useQuality';
import QualityOverview from '../../features/quality/components/QualityOverview';
import ScoresDashboard from '../../features/quality/components/ScoresDashboard';
import LLMJudge from '../../features/quality/components/LLMJudge';
import HumanReview from '../../features/quality/components/HumanReview';
import Datasets from '../../features/quality/components/Datasets';
import EvaluationRuns from '../../features/quality/components/EvaluationRuns';

export default function QualityModule() {
  const { loading, overview, scores, judges, humanReviews, datasets, evaluationRuns } = useQuality();

  if (loading) return <div className="module-loading" role="status"><div><i/>Loading AI Quality…</div></div>;

  return (
    <Routes>
      <Route path="/" element={<Navigate to="overview" replace />} />
      <Route path="overview" element={<QualityOverview overview={overview} />} />
      <Route path="scores" element={<ScoresDashboard scores={scores} />} />
      <Route path="llm-as-a-judge" element={<LLMJudge judges={judges} />} />
      <Route path="human-review" element={<HumanReview reviews={humanReviews} />} />
      <Route path="datasets" element={<Datasets datasets={datasets} />} />
      <Route path="evaluation-runs" element={<EvaluationRuns runs={evaluationRuns} />} />
    </Routes>
  );
}
