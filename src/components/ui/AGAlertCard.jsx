import React from 'react';
import { Card, Box, Typography } from '@mui/material';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';

export default function AGAlertCard({ severity = 'info', title, description, app, time, onClick }) {
  const isDark = document.body.classList.contains('dark');
  
  const severities = {
    critical: { 
      icon: AlertCircle, 
      color: 'error.main', 
      bg: isDark ? '#3d1419' : 'error.light' 
    },
    high: { 
      icon: AlertTriangle, 
      color: 'warning.main', 
      bg: isDark ? '#3d220a' : 'warning.light' 
    },
    medium: { 
      icon: AlertTriangle, 
      color: '#eab308', 
      bg: isDark ? '#3d330a' : '#fffce8' 
    },
    info: { 
      icon: Info, 
      color: 'info.main', 
      bg: isDark ? '#0a1f3d' : 'info.light' 
    }
  };

  const config = severities[severity] || severities.info;
  const Icon = config.icon;

  return (
    <Card 
      onClick={onClick}
      sx={{
        p: 1.5,
        display: 'flex',
        gap: 1.5,
        border: 1,
        borderColor: 'divider',
        cursor: 'pointer',
        transition: 'border-color 0.15s',
        '&:hover': { borderColor: 'primary.main' }
      }}
    >
      <Box sx={{ 
        width: 32, 
        height: 32, 
        borderRadius: 2, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        flexShrink: 0,
        bgcolor: config.bg,
        color: config.color
      }}>
        <Icon size={18} />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="body2" fontWeight={600} color="text.primary">{title}</Typography>
          <Typography variant="caption" color="text.secondary">{time}</Typography>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
          {description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="caption" color="text.secondary">App: {app}</Typography>
          <Typography variant="caption" color="primary.main" fontWeight={600}>View Details →</Typography>
        </Box>
      </Box>
    </Card>
  );
}
