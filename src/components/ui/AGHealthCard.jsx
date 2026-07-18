import React from 'react';
import { Card, Box, Typography } from '@mui/material';

export default function AGHealthCard({ title, value, status = 'success', description, onClick }) {
  const statusColors = {
    success: 'success.main',
    warning: 'warning.main',
    danger: 'error.main',
    info: 'info.main'
  };

  const borderColor = statusColors[status] || 'info.main';

  return (
    <Card 
      onClick={onClick}
      sx={{
        p: 1.5,
        display: 'flex',
        flexDirection: 'column',
        border: 1,
        borderColor: 'divider',
        borderLeft: 4,
        borderLeftColor: borderColor,
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': onClick ? { borderColor: 'primary.main' } : {}
      }}
    >
      <Typography variant="caption" color="text.secondary" fontWeight={500}>{title}</Typography>
      <Typography variant="h6" fontWeight={700} sx={{ mt: 0.5, lineHeight: 1.2 }}>{value}</Typography>
      {description && (
        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>{description}</Typography>
      )}
    </Card>
  );
}
