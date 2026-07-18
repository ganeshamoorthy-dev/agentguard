import React from 'react';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Database } from 'lucide-react';

export default function Datasets({ datasets }) {
  return (
    <Box sx={{ p: 4, maxWidth: 1400, margin: '0 auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Workspace / AI Quality / Datasets
          </Typography>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Datasets
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage test datasets for automated evaluation runs.
          </Typography>
        </Box>
        <Button variant="contained" color="primary" startIcon={<Database size={16} />}>
          Upload Dataset
        </Button>
      </Box>
      <Paper variant="outlined">
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" fontWeight={600}>Evaluation Datasets</Typography>
          <Typography variant="body2" color="text.secondary">Curated prompts and expected responses.</Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Version</TableCell>
                <TableCell>Records</TableCell>
                <TableCell>Source</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datasets.map(d => (
                <TableRow key={d.id} hover>
                  <TableCell>{d.id}</TableCell>
                  <TableCell><Typography fontWeight={600} variant="body2">{d.name}</Typography></TableCell>
                  <TableCell>{d.version}</TableCell>
                  <TableCell>{d.records}</TableCell>
                  <TableCell>{d.source}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
