import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { Clock, Cpu, Database, Shield, Zap, ArrowRight } from 'lucide-react';

const TypeIcon = ({ type }) => {
  switch (type) {
    case 'llm': return <Cpu size={14} />;
    case 'tool': return <Database size={14} />;
    case 'guardrail': return <Shield size={14} />;
    default: return <Zap size={14} />;
  }
}

export default function AGExecutionFlow({ spans }) {
  const flattenSpans = (spans, depth = 0) => {
    let flatList = [];
    spans.forEach(span => {
      flatList.push({ ...span, depth });
      if (span.children && span.children.length > 0) {
        flatList = flatList.concat(flattenSpans(span.children, depth + 1));
      }
    });
    return flatList;
  };

  const flatSpans = flattenSpans(spans || []);

  if (flatSpans.length === 0) return <Box p={2}><Typography variant="body2" color="text.secondary">No execution flow available.</Typography></Box>;

  return (
    <Box sx={{ p: 2, display: 'flex', overflowX: 'auto', alignItems: 'center', gap: 1 }}>
      {flatSpans.map((span, index) => (
        <React.Fragment key={span.id}>
          <Box sx={{ 
            display: 'flex', flexDirection: 'column', alignItems: 'center', 
            bgcolor: 'action.hover', border: 1, borderColor: 'divider', borderRadius: 2, p: 1.5,
            minWidth: 140
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: span.status === 'Failed' || span.status === 'Blocked' ? 'error.main' : 'text.primary' }}>
              <TypeIcon type={span.type} />
              <Typography variant="body2" fontWeight={600} noWrap sx={{ maxWidth: 120 }}>{span.name}</Typography>
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Clock size={12} /> {(span.latency / 1000).toFixed(2)}s
            </Typography>
          </Box>
          
          {index < flatSpans.length - 1 && (
            <ArrowRight size={20} style={{ color: 'var(--mui-palette-text-secondary)', flexShrink: 0 }} />
          )}
        </React.Fragment>
      ))}
    </Box>
  );
}
