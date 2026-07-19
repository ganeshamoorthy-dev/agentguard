import React from 'react';
import { Box, Typography } from '@mui/material';
import { CheckCircle2, AlertCircle, XCircle, ShieldAlert, Eye, FileSignature, Loader2 } from 'lucide-react';

const STATUS_CONFIG = {
  Healthy: { color: '#10b981', bgcolor: '#ecfdf5', icon: CheckCircle2 },
  Passed: { color: '#10b981', bgcolor: '#ecfdf5', icon: CheckCircle2 },
  Success: { color: '#10b981', bgcolor: '#ecfdf5', icon: CheckCircle2 },
  Warning: { color: '#f59e0b', bgcolor: '#fffbeb', icon: AlertCircle },
  Review: { color: '#f59e0b', bgcolor: '#fffbeb', icon: Eye },
  Failed: { color: '#ef4444', bgcolor: '#fef2f2', icon: XCircle },
  Blocked: { color: '#8b5cf6', bgcolor: '#f5f3ff', icon: ShieldAlert },
  Evaluated: { color: '#3b82f6', bgcolor: '#eff6ff', icon: CheckCircle2 },
  Reviewed: { color: '#6366f1', bgcolor: '#eef2ff', icon: Eye },
  Annotated: { color: '#14b8a6', bgcolor: '#f0fdfa', icon: FileSignature },
  Running: { color: '#64748b', bgcolor: '#f8fafc', icon: Loader2, spin: true }
};

export default function AGStatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || { color: '#64748b', bgcolor: '#f1f5f9', icon: AlertCircle };
  const Icon = config.icon;

  return (
    <Box 
      sx={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: 0.75, 
        px: 1, 
        py: 0.25, 
        borderRadius: 1, 
        bgcolor: 'transparent', 
        color: config.color,
        border: '1px solid',
        borderColor: config.color
      }}
    >
      <Icon size={12} className={config.spin ? 'spin-animation' : ''} />
      <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: 0.5 }}>
        {status}
      </Typography>
      {config.spin && (
        <style>
          {`
            @keyframes spin { 100% { transform: rotate(360deg); } }
            .spin-animation { animation: spin 2s linear infinite; }
          `}
        </style>
      )}
    </Box>
  );
}
