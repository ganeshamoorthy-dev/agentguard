import React from 'react';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import { BookOpen } from 'lucide-react';

export default function OWASPTop10() {
  const categories = [
    { id: 'LLM01', name: 'Prompt Injection', risk: 'High', mapped: 4 },
    { id: 'LLM02', name: 'Insecure Output Handling', risk: 'High', mapped: 2 },
    { id: 'LLM03', name: 'Training Data Poisoning', risk: 'Medium', mapped: 0 },
    { id: 'LLM06', name: 'Sensitive Information Disclosure', risk: 'High', mapped: 5 }
  ];

  return (
    <Box sx={{ p: 4, maxWidth: 1400, margin: '0 auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Workspace / Security / OWASP Top 10
          </Typography>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            OWASP LLM Top 10
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Track your application's coverage against industry standard vulnerabilities.
          </Typography>
        </Box>
        <Button variant="outlined" color="secondary" startIcon={<BookOpen size={16} />}>
          View Docs
        </Button>
      </Box>
      <Paper variant="outlined">
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" fontWeight={600}>Coverage Summary</Typography>
          <Typography variant="body2" color="text.secondary">Mapped guardrails and detection logic.</Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Risk Score</TableCell>
                <TableCell>Mapped Guardrails</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map(c => (
                <TableRow key={c.id} hover>
                  <TableCell>{c.id}</TableCell>
                  <TableCell><Typography fontWeight={600} variant="body2">{c.name}</Typography></TableCell>
                  <TableCell>{c.risk}</TableCell>
                  <TableCell>{c.mapped} rules</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
