import React from 'react';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Scale } from 'lucide-react';

export default function LLMJudge({ judges }) {
  return (
    <Box sx={{ p: 4, maxWidth: 1400, margin: '0 auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Workspace / AI Quality / LLM as a Judge
          </Typography>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            LLM as a Judge
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Configure automated evaluation judges to scale quality testing.
          </Typography>
        </Box>
        <Button variant="contained" color="primary" startIcon={<Scale size={16} />}>
          Create Judge
        </Button>
      </Box>
      <Paper variant="outlined">
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" fontWeight={600}>Active Judges</Typography>
          <Typography variant="body2" color="text.secondary">Automated scoring models currently in use.</Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Threshold</TableCell>
                <TableCell>Total Runs</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {judges.map(j => (
                <TableRow key={j.id} hover>
                  <TableCell>{j.id}</TableCell>
                  <TableCell><Typography fontWeight={600} variant="body2">{j.name}</Typography></TableCell>
                  <TableCell>{j.model}</TableCell>
                  <TableCell>{j.threshold}</TableCell>
                  <TableCell>{j.runs}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
