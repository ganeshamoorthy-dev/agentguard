import React from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import { Activity, ArrowUpRight, CircleCheck, Clock3, Sparkles } from 'lucide-react';

export default function ModulePage({ eyebrow, title, description, stats, signals, activePage }) {
  return (
    <Box sx={{ p: 4, maxWidth: 1400, margin: '0 auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Workspace / {eyebrow} / {activePage}
          </Typography>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>
        <Button variant="contained" color="primary" startIcon={<Sparkles size={16} />}>
          Create {eyebrow === 'Overview' ? 'report' : 'workflow'}
        </Button>
      </Box>

      <Paper 
        sx={{ 
          p: 4, 
          mb: 4, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          borderRadius: 3
        }}
      >
        <Box>
          <Typography variant="caption" sx={{ opacity: 0.8, letterSpacing: 1, mb: 1, display: 'block' }}>
            {eyebrow.toUpperCase()}
          </Typography>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            {activePage}
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, mb: 2, maxWidth: 400 }}>
            Focused intelligence for confident decisions across your AI operations.
          </Typography>
          <Button 
            variant="text" 
            endIcon={<ArrowUpRight size={15} />}
            sx={{ color: 'inherit', p: 0, '&:hover': { bgcolor: 'transparent', opacity: 0.8 } }}
          >
            View detailed activity
          </Button>
        </Box>
        <Activity size={78} strokeWidth={1.1} style={{ opacity: 0.2 }} />
      </Paper>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {stats.map((stat, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Paper variant="outlined" sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Typography variant="caption" color="text.secondary" fontWeight={600} textTransform="uppercase">
                {stat.label}
              </Typography>
              <Typography variant="h4" fontWeight={700} sx={{ mt: 1, mb: 0.5 }}>
                {stat.value}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {stat.change}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper variant="outlined">
            <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>Latest signals</Typography>
                <Typography variant="caption" color="text.secondary">Priority activity in the selected workspace</Typography>
              </Box>
              <Button size="small">View all</Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {signals.map((signal, index) => (
                <Box 
                  key={index} 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2, 
                    p: 2, 
                    borderBottom: index < signals.length - 1 ? 1 : 0, 
                    borderColor: 'divider' 
                  }}
                >
                  <Box sx={{ color: 'primary.main', display: 'flex' }}>
                    <CircleCheck size={18} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight={600}>{signal.title}</Typography>
                    <Typography variant="caption" color="text.secondary">{signal.detail}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                    <Clock3 size={13} />
                    <Typography variant="caption">{signal.time}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper variant="outlined" sx={{ p: 3, height: '100%', bgcolor: 'background.default' }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Recommended next step
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Investigate the highest-impact signal, then use the relevant trace as evidence for your decision.
            </Typography>
            <Button variant="outlined" color="secondary" fullWidth endIcon={<ArrowUpRight size={15} />}>
              Open workspace
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
