import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { Database, Layers3, UsersRound } from 'lucide-react';

const icon = { Sessions: UsersRound, Applications: Layers3, Users: UsersRound, Models: Database, Analytics: Database };

export default function ObservabilityDirectory({ page }) {
  const Icon = icon[page] || Database;
  
  return (
    <Box sx={{ p: 4, maxWidth: 1400, margin: '0 auto' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          Observability / {page}
        </Typography>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          {page}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Explore operational signals and linked traces for this area.
        </Typography>
      </Box>

      <Paper 
        variant="outlined" 
        sx={{ 
          p: 6, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: 2,
          textAlign: 'center',
          bgcolor: 'background.paper'
        }}
      >
        <Icon size={34} style={{ color: '#8190a0' }} />
        <Box>
          <Typography variant="h6" fontWeight={600}>{page} workspace</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: 400 }}>
            This view is connected to the same Observability API layer and is ready for its dedicated data contract.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
