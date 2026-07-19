import React from 'react';
import { Box, Typography } from '@mui/material';

export default function AGLogViewer({ logs }) {
  if (!logs || logs.length === 0) return <Box p={3}><Typography variant="body2" color="text.secondary">No logs available.</Typography></Box>;

  return (
    <Box sx={{ p: 2 }}>
      {logs.map((log, i) => (
        <Box key={i} sx={{ display: 'flex', gap: 2, mb: 1, p: 1, borderRadius: 1, '&:hover': { bgcolor: 'action.hover' } }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', width: 140, flexShrink: 0, fontFamily: 'monospace' }}>
            {new Date(log.timestamp).toISOString().split('T')[1].replace('Z', '')}
          </Typography>
          <Typography variant="caption" sx={{ 
            fontWeight: 700, width: 50, textTransform: 'uppercase',
            color: log.level === 'error' ? 'error.main' : log.level === 'warn' ? 'warning.main' : 'info.main' 
          }}>
            {log.level}
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{log.message}</Typography>
        </Box>
      ))}
    </Box>
  );
}
