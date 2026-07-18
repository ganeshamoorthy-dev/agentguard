import React from 'react';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import { Target } from 'lucide-react';

export default function RedTeaming() {
  const history = [
    { id: 1, template: 'Prompt Injection', date: '2023-10-01', result: 'Passed', risk: 'Low' },
    { id: 2, template: 'Data Exfiltration', date: '2023-10-02', result: 'Failed', risk: 'High' }
  ];

  return (
    <Box sx={{ p: 4, maxWidth: 1400, margin: '0 auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Workspace / Security / Red Teaming
          </Typography>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Red Teaming
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Simulate attacks to validate your security posture.
          </Typography>
        </Box>
        <Button variant="contained" color="primary" startIcon={<Target size={16} />}>
          Run Simulation
        </Button>
      </Box>
      <Paper variant="outlined">
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" fontWeight={600}>Run History</Typography>
          <Typography variant="body2" color="text.secondary">Recent adversarial testing results.</Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Template</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Result</TableCell>
                <TableCell>Risk Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map(h => (
                <TableRow key={h.id} hover>
                  <TableCell><Typography fontWeight={600} variant="body2">{h.template}</Typography></TableCell>
                  <TableCell>{h.date}</TableCell>
                  <TableCell>{h.result}</TableCell>
                  <TableCell>
                    <Chip 
                      label={h.risk} 
                      size="small" 
                      color={h.risk === 'High' ? 'error' : 'info'} 
                      sx={{ textTransform: 'capitalize', fontWeight: 600 }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
