import React from 'react';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import { AlertOctagon } from 'lucide-react';

export default function SecurityIncidents({ incidents }) {
  return (
    <Box sx={{ p: 4, maxWidth: 1400, margin: '0 auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Workspace / Security / Incidents
          </Typography>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Security Incidents
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Investigate and resolve security violations.
          </Typography>
        </Box>
        <Button variant="contained" color="primary" startIcon={<AlertOctagon size={16} />}>
          Export Report
        </Button>
      </Box>
      <Paper variant="outlined">
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" fontWeight={600}>Incident Queue</Typography>
          <Typography variant="body2" color="text.secondary">Active and past incidents.</Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Severity</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>App</TableCell>
                <TableCell>Rule Triggered</TableCell>
                <TableCell>Created Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {incidents.map(inc => (
                <TableRow key={inc.id} hover>
                  <TableCell><Typography fontWeight={600} variant="body2">{inc.id}</Typography></TableCell>
                  <TableCell>
                    <Chip 
                      label={inc.severity} 
                      size="small" 
                      color={inc.severity === 'critical' ? 'error' : 'warning'} 
                      sx={{ textTransform: 'capitalize', fontWeight: 600 }}
                    />
                  </TableCell>
                  <TableCell>{inc.status}</TableCell>
                  <TableCell>{inc.app}</TableCell>
                  <TableCell>{inc.rule}</TableCell>
                  <TableCell>{inc.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
