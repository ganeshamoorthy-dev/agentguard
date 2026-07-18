import React from 'react';
import { Card, Box, Typography } from '@mui/material';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

export default function AGMetricCard({ title, value, trend, trendLabel, icon: Icon, data, dataKey, color = '#14b8a6', onClick }) {
  const isPositive = trend > 0;
  
  return (
    <Card 
      onClick={onClick}
      sx={{
        p: 2, 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 0.5, 
        position: 'relative', 
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
        border: 1,
        borderColor: 'divider',
        transition: 'border-color 0.15s, transform 0.15s',
        '&:hover': onClick ? {
          borderColor: 'primary.main',
          transform: 'translateY(-2px)'
        } : {}
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'text.secondary' }}>
        <Typography variant="caption" fontWeight={600} textTransform="uppercase">{title}</Typography>
        {Icon && <Icon size={16} />}
      </Box>
      <Typography variant="h5" fontWeight={700} sx={{ mt: 0.5, letterSpacing: '-0.5px' }}>
        {value}
      </Typography>
      {trend !== undefined && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography variant="caption" fontWeight={600} color={isPositive ? 'success.main' : 'error.main'}>
            {isPositive ? '↑' : '↓'} {Math.abs(trend)}%
          </Typography>
          {trendLabel && <Typography variant="caption" color="text.secondary">{trendLabel}</Typography>}
        </Box>
      )}
      
      {data && data.length > 0 && (
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 45, opacity: 0.8 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id={`gradient-${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey={dataKey} stroke={color} fillOpacity={1} fill={`url(#gradient-${title.replace(/\s+/g, '')})`} strokeWidth={2} isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Card>
  );
}
