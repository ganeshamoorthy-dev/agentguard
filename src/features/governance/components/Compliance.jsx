import React from 'react';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import { ClipboardCheck } from 'lucide-react';

export default function Compliance({ compliance }) {
  return (
    <Box sx={{ p: 4, maxWidth: 1400, margin: '0 auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Workspace / Governance / Compliance
          </Typography>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Compliance
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Track adherence to internal and external regulatory frameworks.
          </Typography>
        </Box>
        <Button variant="contained" color="primary" startIcon={<ClipboardCheck size={16} />}>
          Generate Report
        </Button>
      </Box>
      <Paper variant="outlined">
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" fontWeight={600}>Tracked Frameworks</Typography>
          <Typography variant="body2" color="text.secondary">Current compliance status across mapped regulations.</Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Framework</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Violations</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {compliance.map(c => (
                <TableRow key={c.id} hover>
                  <TableCell><Typography fontWeight={600} variant="body2">{c.name}</Typography></TableCell>
                  <TableCell>
                    <Chip 
                      label={c.status} 
                      size="small" 
                      color={c.status === 'Compliant' ? 'info' : 'error'} 
                      sx={{ textTransform: 'capitalize', fontWeight: 600 }}
                    />
                  </TableCell>
                  <TableCell>{c.violations}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
