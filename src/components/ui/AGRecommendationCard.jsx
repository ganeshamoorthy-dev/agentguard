import React from 'react';
import { Card, Box, Typography, Chip, Button } from '@mui/material';
import { Zap } from 'lucide-react';

export default function AGRecommendationCard({ priority, impact, description, actionLabel, onAction }) {
  const isHigh = priority.toLowerCase() === 'high';
  
  return (
    <Card sx={{ 
      p: 2, 
      display: 'flex', 
      flexDirection: 'column', 
      gap: 1.5,
      border: 1,
      borderColor: 'divider',
      borderTop: 3,
      borderTopColor: isHigh ? 'warning.main' : 'primary.main'
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip 
            label={`${priority} Priority`} 
            size="small" 
            sx={{ 
              height: 20, 
              fontSize: '10px', 
              fontWeight: 700, 
              textTransform: 'uppercase',
              bgcolor: isHigh ? 'warning.light' : 'primary.light',
              color: isHigh ? 'warning.dark' : 'primary.dark',
              ...(document.body.classList.contains('dark') && {
                bgcolor: isHigh ? '#3d220a' : '#0c2b29',
                color: isHigh ? '#f59e0b' : '#14b8a6'
              })
            }} 
          />
          <Chip label={impact} size="small" sx={{ height: 20, fontSize: '10px' }} />
        </Box>
        <Zap size={16} color="#f59e0b" style={{ opacity: 0.5 }} />
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
        {description}
      </Typography>
      <Button 
        variant="outlined" 
        size="small" 
        onClick={onAction}
        sx={{ alignSelf: 'flex-start', mt: 1, fontSize: '11px', fontWeight: 600 }}
      >
        {actionLabel} →
      </Button>
    </Card>
  );
}
