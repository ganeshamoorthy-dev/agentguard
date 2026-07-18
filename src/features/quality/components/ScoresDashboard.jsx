import React from 'react';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { BarChart3 } from 'lucide-react';

export default function ScoresDashboard({ scores }) {
  return (
    <Box sx={{ p: 4, maxWidth: 1400, margin: '0 auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Workspace / AI Quality / Scores
          </Typography>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Evaluation Scores
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Detailed performance metrics across all tracked applications.
          </Typography>
        </Box>
        <Button variant="contained" color="primary" startIcon={<BarChart3 size={16} />}>
          Compare Models
        </Button>
      </Box>
      <Paper variant="outlined">
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" fontWeight={600}>Application Metrics</Typography>
          <Typography variant="body2" color="text.secondary">Aggregated scores based on LLM Judges and Human Reviews.</Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Application</TableCell>
                <TableCell>Correctness</TableCell>
                <TableCell>Relevance</TableCell>
                <TableCell>Faithfulness</TableCell>
                <TableCell>Toxicity</TableCell>
                <TableCell>Safety</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scores.map(s => (
                <TableRow key={s.app} hover>
                  <TableCell><Typography fontWeight={600} variant="body2">{s.app}</Typography></TableCell>
                  <TableCell>{s.correctness}%</TableCell>
                  <TableCell>{s.relevance}%</TableCell>
                  <TableCell>{s.faithfulness}%</TableCell>
                  <TableCell>{s.toxicity}%</TableCell>
                  <TableCell>{s.safety}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
