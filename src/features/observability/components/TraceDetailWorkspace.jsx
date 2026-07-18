import React from 'react';
import { Box, Typography, Button, Grid, Paper, IconButton, Divider } from '@mui/material';
import { ArrowLeft, Bookmark, Copy, ExternalLink, ShieldCheck, Sparkles, Circle } from 'lucide-react';
import { StatusPill } from './StatusPill';

export default function TraceDetailWorkspace({ trace, onBack, onBookmark }) {
  if (!trace) return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'text.secondary', p: 4 }}>
      <Typography>Select a trace from Trace Explorer to start an investigation.</Typography>
    </Box>
  );
  
  const formatLatency = `${(trace.latency / 1000).toFixed(2)} s`;
  
  return (
    <Box sx={{ p: 4, maxWidth: 1400, margin: '0 auto' }}>
      <Button 
        variant="text" 
        color="inherit" 
        startIcon={<ArrowLeft size={16} />} 
        onClick={onBack}
        sx={{ mb: 2, color: 'text.secondary' }}
      >
        Back to Trace Explorer
      </Button>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Observability / Trace Details / {trace.id}
          </Typography>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            {trace.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {trace.application} · {trace.user} · {trace.model}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <StatusPill value={trace.status} />
          <Button 
            variant="outlined" 
            color="secondary"
            onClick={() => onBookmark(trace.id)}
            startIcon={<Bookmark size={16} />}
          >
            {trace.bookmarked ? 'Bookmarked' : 'Bookmark'}
          </Button>
        </Box>
      </Box>

      <Paper variant="outlined" sx={{ display: 'flex', mb: 4, bgcolor: 'background.paper', p: 3, gap: 4 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" display="block">Latency</Typography>
          <Typography variant="h6" fontWeight={700}>{formatLatency}</Typography>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box>
          <Typography variant="caption" color="text.secondary" display="block">Tokens</Typography>
          <Typography variant="h6" fontWeight={700}>{trace.tokens.toLocaleString()}</Typography>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box>
          <Typography variant="caption" color="text.secondary" display="block">Cost</Typography>
          <Typography variant="h6" fontWeight={700}>${trace.cost.toFixed(3)}</Typography>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box>
          <Typography variant="caption" color="text.secondary" display="block">Quality score</Typography>
          <Typography variant="h6" fontWeight={700}>{trace.evaluation}%</Typography>
        </Box>
      </Paper>

      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Paper variant="outlined" sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>Prompt</Typography>
                  <Typography variant="caption" color="text.secondary">Input to the agent</Typography>
                </Box>
                <IconButton size="small"><Copy size={16} /></IconButton>
              </Box>
              <Box component="pre" sx={{ 
                p: 2, 
                bgcolor: document.body.classList.contains('dark') ? '#060b14' : '#f8fafc',
                border: 1,
                borderColor: 'divider',
                borderRadius: 2,
                fontSize: '13px',
                color: 'text.secondary',
                whiteSpace: 'pre-wrap',
                fontFamily: 'monospace'
              }}>
                {trace.prompt}
              </Box>
            </Paper>

            <Paper variant="outlined" sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>Response</Typography>
                  <Typography variant="caption" color="text.secondary">Agent output</Typography>
                </Box>
                <IconButton size="small"><ExternalLink size={16} /></IconButton>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                {trace.response}
              </Typography>
            </Paper>

            <Paper variant="outlined" sx={{ p: 3 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight={600}>Execution timeline</Typography>
                <Typography variant="caption" color="text.secondary">End-to-end trace duration</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Timeline title="Request received" value="0 ms" color="#14b8a6" />
                <Timeline title={`Retrieved ${trace.sources} knowledge sources`} value="224 ms" color="#3b82f6" />
                <Timeline title={`Generated with ${trace.model}`} value={formatLatency} color="#8b5cf6" />
                <Timeline title="Guardrails evaluated response" value={trace.status === 'Blocked' ? 'Blocked' : 'Passed'} color="#10b981" />
              </Box>
            </Paper>
          </Box>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Paper variant="outlined" sx={{ p: 3 }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>Safety assessment</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', gap: 2, p: 2, border: 1, borderColor: 'divider', borderRadius: 2 }}>
                  <ShieldCheck size={20} color={trace.status === 'Blocked' ? '#ef4444' : '#14b8a6'} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight={600}>Prompt injection</Typography>
                    <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                      {trace.status === 'Blocked' ? 'Blocked before model execution' : 'No threat detected'}
                    </Typography>
                    <StatusPill value={trace.status === 'Blocked' ? 'Blocked' : 'Passed'} />
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 2, p: 2, border: 1, borderColor: 'divider', borderRadius: 2 }}>
                  <Sparkles size={20} color="#8b5cf6" />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight={600}>Answer quality</Typography>
                    <Typography variant="caption" color="text.secondary" display="block">Automated evaluation</Typography>
                  </Box>
                  <Typography variant="subtitle2" fontWeight={700}>{trace.evaluation}%</Typography>
                </Box>
              </Box>
            </Paper>

            <Paper variant="outlined" sx={{ p: 3 }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>Trace metadata</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Trace ID</Typography>
                  <Typography variant="body2" fontWeight={500}>{trace.id}</Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Started</Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {new Date(trace.startedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Model</Typography>
                  <Typography variant="body2" fontWeight={500}>{trace.model}</Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">Risk level</Typography>
                  <StatusPill value={trace.risk} type="risk" />
                </Box>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

function Timeline({ title, value, color }) {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Circle size={12} fill={color} color={color} />
      <Box sx={{ flex: 1 }}>
        <Typography variant="body2" fontWeight={500}>{title}</Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" fontWeight={500}>{value}</Typography>
    </Box>
  );
}
