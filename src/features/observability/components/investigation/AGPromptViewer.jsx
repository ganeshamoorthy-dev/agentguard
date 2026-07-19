import React from 'react';
import { Box, Typography } from '@mui/material';

export default function AGPromptViewer({ content }) {
  return (
    <Box sx={{ p: 2 }}>
      <Box component="pre" sx={{ 
        m: 0, 
        p: 2, 
        bgcolor: 'background.default',
        border: 1, borderColor: 'divider', borderRadius: 2, 
        fontSize: '13px', color: 'text.primary',
        whiteSpace: 'pre-wrap', fontFamily: 'monospace',
        overflowY: 'auto'
      }}>
        {typeof content === 'string' ? content : JSON.stringify(content, null, 2)}
      </Box>
    </Box>
  );
}
