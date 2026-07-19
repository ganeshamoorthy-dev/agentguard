import React from 'react';
import { Box, Typography, Grid, LinearProgress } from '@mui/material';

const ScoreBar = ({ label, score }) => (
  <Box sx={{ mb: 2 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
      <Typography variant="body2" fontWeight={500}>{label}</Typography>
      <Typography variant="body2" fontWeight={600}>{(score * 100).toFixed(0)}%</Typography>
    </Box>
    <LinearProgress 
      variant="determinate" 
      value={score * 100} 
      sx={{ 
        height: 6, borderRadius: 3,
        bgcolor: 'action.hover',
        '& .MuiLinearProgress-bar': { bgcolor: score > 0.8 ? 'success.main' : score > 0.6 ? 'warning.main' : 'error.main', borderRadius: 3 }
      }} 
    />
  </Box>
);

export default function AGEvaluationCard({ evaluations }) {
  if (!evaluations) return <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4, textAlign: 'center' }}><Typography variant="body2" color="text.secondary">No evaluations found.</Typography></Box>;

  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', flex: 1 }}>
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 3, textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Judge Scores</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <ScoreBar label="Overall Score" score={evaluations.overall} />
        <ScoreBar label="Correctness" score={evaluations.correctness} />
        <ScoreBar label="Faithfulness" score={evaluations.faithfulness} />
        <ScoreBar label="Relevance" score={evaluations.relevance} />
        <ScoreBar label="Hallucination" score={1 - evaluations.hallucination} />
        <ScoreBar label="Toxicity Safety" score={1 - evaluations.toxicity} />
      </Box>
    </Box>
  );
}
