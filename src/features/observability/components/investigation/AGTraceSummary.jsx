import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

export default function AGTraceSummary({ trace }) {
  if (!trace) return null;

  const rootSpan = trace.spans?.[0] || {};
  const metadata = rootSpan.metadata || {};

  const MetricRow = ({ label, value, valueColor }) => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
      <Typography variant="body2" fontWeight={600} color={valueColor || 'text.primary'} sx={{ fontFamily: label === 'Trace ID' ? 'monospace' : 'inherit', textTransform: label === 'Environment' ? 'capitalize' : 'none', textAlign: 'right' }}>
        {value}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ p: 3, flex: 1 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <MetricRow label="Trace ID" value={trace.id} />
        <MetricRow label="Date" value={new Date(trace.startedAt).toLocaleString()} />
        <MetricRow 
          label="Environment" 
          value={metadata.env || 'production'} 
          valueColor="info.main" 
        />
        <MetricRow 
          label="Model" 
          value={metadata.model || trace.model || 'gpt-4'} 
          valueColor="secondary.main" 
        />
        <MetricRow 
          label="Status" 
          value={trace.status} 
          valueColor={trace.status === 'Success' || trace.status === 'Passed' ? 'success.main' : 'error.main'} 
        />
        <MetricRow 
          label="Latency" 
          value={`${(trace.latency / 1000).toFixed(2)}s`} 
          valueColor={trace.latency > 3000 ? 'error.main' : trace.latency > 1500 ? 'warning.main' : 'success.main'} 
        />
        <MetricRow 
          label="Tokens" 
          value={(trace.tokens?.total || trace.tokens || 0).toLocaleString()} 
          valueColor="primary.main" 
        />
        <MetricRow 
          label="Cost" 
          value={`$${(trace.cost || 0).toFixed(4)}`} 
          valueColor={trace.cost > 0.1 ? 'error.main' : trace.cost > 0.05 ? 'warning.main' : 'success.main'} 
        />
        <MetricRow 
          label="Security" 
          value={rootSpan.securityEvents?.some(e => e.status === 'Blocked') ? 'Blocked' : 'Passed'} 
          valueColor={rootSpan.securityEvents?.some(e => e.status === 'Blocked') ? 'error.main' : 'success.main'} 
        />
        <MetricRow 
          label="Evaluation" 
          value={rootSpan.evaluations ? `${(rootSpan.evaluations.overall * 100).toFixed(0)}/100` : 'N/A'} 
          valueColor={rootSpan.evaluations?.overall > 0.8 ? 'success.main' : 'warning.main'} 
        />
      </Box>
    </Box>
  );
}
