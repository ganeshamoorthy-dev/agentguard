import React from 'react';
import { Box, Typography, Card } from '@mui/material';

export default function AGMetricCard({ title, value, subtitle, icon: Icon, color = 'primary.main', trend }) {
  return (
    <Card variant="outlined" sx={{ borderRadius: 2, p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'text.secondary' }}>
        {Icon && <Icon size={16} />}
        <Typography variant="caption" fontWeight={600} textTransform="uppercase" letterSpacing="0.05em">
          {title}
        </Typography>
      </Box>
      <Typography variant="h5" fontWeight={700} sx={{ color, mb: 0.5 }}>
        {value}
      </Typography>
      {(subtitle || trend) && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {trend && (
            <Typography variant="caption" sx={{ color: trend > 0 ? 'error.main' : 'success.main', fontWeight: 600 }}>
              {trend > 0 ? '+' : ''}{trend}%
            </Typography>
          )}
          {subtitle && (
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
      )}
    </Card>
  );
}
