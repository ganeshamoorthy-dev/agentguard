import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Lightbulb, ShieldAlert, ArrowRight } from 'lucide-react';

export default function AGRelatedInsights({ insights }) {
  if (!insights || insights.length === 0) return <Box p={3}><Typography variant="body2" color="text.secondary">No recommendations available for this trace.</Typography></Box>;

  return (
    <Box sx={{ p: 2 }}>
      {insights.map((insight, i) => (
        <Box key={i} sx={{ display: 'flex', gap: 2, mb: 2, p: 2, bgcolor: 'action.hover', borderRadius: 2 }}>
          {insight.type === 'security' ? <ShieldAlert size={20} color="#f59e0b" /> : <Lightbulb size={20} color="#3b82f6" />}
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>{insight.title}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>{insight.description}</Typography>
            <Button size="small" variant="text" endIcon={<ArrowRight size={14} />} sx={{ p: 0, '&:hover': { bgcolor: 'transparent' } }}>Investigate</Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
