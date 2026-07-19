import React from 'react';
import { Box, Typography, Card, Divider } from '@mui/material';

export default function AGSectionCard({ id, title, icon: Icon, badge, action, children }) {
  return (
    <Card id={id} variant="outlined" sx={{ borderRadius: 1, width: '100%', minWidth: { xs: '100%', sm: 420 }, mb: 0, height: '100%', minHeight: 250, display: 'flex', flexDirection: 'column', borderColor: 'divider', boxShadow: 'none' }}>
      <Box 
        sx={{ 
          p: 1.5, 
          px: 2,
          display: 'flex', 
          alignItems: 'center', 
          bgcolor: 'background.paper',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
          <Typography variant="subtitle2" fontWeight={600} color="text.primary">{title}</Typography>
          {badge && <Box sx={{ ml: 1 }}>{badge}</Box>}
        </Box>
        {action && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {action}
          </Box>
        )}
      </Box>
      
      <Divider />
      
      <Box sx={{ p: 0, flex: 1, display: 'flex', flexDirection: 'column', bgcolor: 'background.paper' }}>
        {children}
      </Box>
    </Card>
  );
}
