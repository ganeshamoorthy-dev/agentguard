import React from 'react';
import { Box, Typography } from '@mui/material';

export default function AGUsageBreakdown({ tokens, cost, latency }) {
  if (!tokens) return <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4, textAlign: 'center' }}><Typography variant="body2" color="text.secondary">No usage information available.</Typography></Box>;

  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body2" fontWeight={600}>Total Tokens:</Typography>
        <Typography variant="body2">{(tokens.total || 0).toLocaleString()}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body2" fontWeight={600}>Prompt Tokens:</Typography>
        <Typography variant="body2">{(tokens.prompt || 0).toLocaleString()}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body2" fontWeight={600}>Completion Tokens:</Typography>
        <Typography variant="body2">{(tokens.completion || 0).toLocaleString()}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body2" fontWeight={600}>Total Cost:</Typography>
        <Typography variant="body2">${(cost || 0).toFixed(6)}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body2" fontWeight={600}>Latency:</Typography>
        <Typography variant="body2">{(latency / 1000).toFixed(2)}s</Typography>
      </Box>
    </Box>
  );
}
