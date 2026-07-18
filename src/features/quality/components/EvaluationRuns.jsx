import React from 'react';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import { Play } from 'lucide-react';

export default function EvaluationRuns({ runs }) {
  return (
    <Box sx={{ p: 4, maxWidth: 1400, margin: '0 auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Workspace / AI Quality / Evaluation Runs
          </Typography>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Evaluation Runs
          </Typography>
          <Typography variant="body2" color="text.secondary">
            History of automated batch evaluation runs.
          </Typography>
        </Box>
        <Button variant="contained" color="primary" startIcon={<Play size={16} />}>
          New Run
        </Button>
      </Box>
      <Paper variant="outlined">
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" fontWeight={600}>Run History</Typography>
          <Typography variant="body2" color="text.secondary">Recent evaluation results.</Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Run ID</TableCell>
                <TableCell>Dataset</TableCell>
                <TableCell>Judge</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Success Rate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {runs.map(r => (
                <TableRow key={r.runId} hover>
                  <TableCell><Typography fontWeight={600} variant="body2">{r.runId}</Typography></TableCell>
                  <TableCell>{r.dataset}</TableCell>
                  <TableCell>{r.judge}</TableCell>
                  <TableCell>
                    <Chip 
                      label={r.status} 
                      size="small" 
                      color={r.status === 'Completed' ? 'info' : 'error'} 
                      sx={{ textTransform: 'capitalize', fontWeight: 600 }}
                    />
                  </TableCell>
                  <TableCell>{r.successRate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
