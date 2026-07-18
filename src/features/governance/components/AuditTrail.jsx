import React from 'react';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import { History } from 'lucide-react';

export default function AuditTrail({ auditEvents }) {
  return (
    <Box sx={{ p: 4, maxWidth: 1400, margin: '0 auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Workspace / Governance / Audit Trail
          </Typography>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Audit Trail
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Immutable log of all governance actions and changes.
          </Typography>
        </Box>
        <Button variant="contained" color="primary" startIcon={<History size={16} />}>
          Download CSV
        </Button>
      </Box>
      <Paper variant="outlined">
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" fontWeight={600}>Activity Log</Typography>
          <Typography variant="body2" color="text.secondary">Recent events and modifications.</Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Resource</TableCell>
                <TableCell>Changes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {auditEvents.map(e => (
                <TableRow key={e.id} hover>
                  <TableCell>{e.id}</TableCell>
                  <TableCell>{e.timestamp}</TableCell>
                  <TableCell>{e.user}</TableCell>
                  <TableCell>
                    <Chip 
                      label={e.action} 
                      size="small" 
                      color={e.action === 'Create' ? 'info' : 'warning'} 
                      sx={{ textTransform: 'capitalize', fontWeight: 600 }}
                    />
                  </TableCell>
                  <TableCell><Typography fontWeight={600} variant="body2">{e.resource}</Typography></TableCell>
                  <TableCell>{e.pre} &rarr; {e.post}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
