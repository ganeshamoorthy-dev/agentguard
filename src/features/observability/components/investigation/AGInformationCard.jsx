import React from 'react';
import { Box, Typography } from '@mui/material';

export default function AGInformationCard({ input, output }) {
  const parsePayload = (payload) => {
    if (!payload) return 'No value';
    try {
      const parsed = typeof payload === 'string' ? JSON.parse(payload) : payload;
      return JSON.stringify(parsed, null, 2);
    } catch {
      return String(payload);
    }
  };

  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ letterSpacing: '0.05em' }} gutterBottom>INPUT</Typography>
        <Box sx={{ mt: 1, bgcolor: 'action.hover', p: 1, borderRadius: 1, border: 1, borderColor: 'divider' }}>
          <Typography variant="body2" component="pre" sx={{ m: 0, whiteSpace: 'pre-wrap', fontFamily: 'monospace', color: 'text.primary', fontSize: '0.75rem', lineHeight: 1.4 }}>
            {parsePayload(input)}
          </Typography>
        </Box>
      </Box>
      
      <Box>
        <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ letterSpacing: '0.05em' }} gutterBottom>OUTPUT</Typography>
        <Box sx={{ mt: 1, bgcolor: 'action.hover', p: 1, borderRadius: 1, border: 1, borderColor: 'divider' }}>
          <Typography variant="body2" component="pre" sx={{ m: 0, whiteSpace: 'pre-wrap', fontFamily: 'monospace', color: 'text.primary', fontSize: '0.75rem', lineHeight: 1.4 }}>
            {parsePayload(output)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
