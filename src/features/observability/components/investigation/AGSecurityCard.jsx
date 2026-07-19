import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { ShieldAlert, ShieldCheck, Shield } from 'lucide-react';

export default function AGSecurityCard({ events }) {
  if (!events || events.length === 0) {
    return (
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4, textAlign: 'center' }}>
        <Typography color="text.secondary" variant="body2">No guard rails configured.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 0 }}>
      {events.map((event, i) => (
        <Box key={i} sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, borderBottom: i < events.length - 1 ? 1 : 0, borderColor: 'divider' }}>
          {event.status === 'Blocked' ? (
            <ShieldAlert color="#ef4444" size={24} />
          ) : event.status === 'Redacted' ? (
            <Shield color="#f59e0b" size={24} />
          ) : (
            <ShieldCheck color="#22c55e" size={24} />
          )}
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" fontWeight={600}>{event.type}</Typography>
            <Typography variant="body2" color="text.secondary">{event.detail}</Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
             <Chip 
              label={event.status} 
              size="small" 
              color={event.status === 'Blocked' ? 'error' : event.status === 'Redacted' ? 'warning' : 'success'}
              sx={{ mb: 0.5, fontWeight: 600, fontSize: '0.7rem', height: 20 }}
            />
            <Typography variant="caption" display="block" color="text.secondary">+{event.latency}ms overhead</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
