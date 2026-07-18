import React from 'react';
import { Chip } from '@mui/material';

export function StatusPill({ value, type = 'status' }) {
  const tone = value.toLowerCase();
  
  let color = 'default';
  if (tone === 'passed' || tone === 'low') color = 'success';
  if (tone === 'review' || tone === 'medium') color = 'warning';
  if (tone === 'blocked' || tone === 'high') color = 'error';

  return (
    <Chip 
      label={value} 
      size="small" 
      color={color}
      variant="outlined"
      sx={{ 
        height: 20, 
        fontSize: '10px', 
        fontWeight: 600,
        textTransform: 'uppercase',
        borderWidth: 1.5
      }} 
    />
  );
}
