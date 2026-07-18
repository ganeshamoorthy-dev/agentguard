import React from 'react';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import { FileCode } from 'lucide-react';

export default function PolicyAsCode({ policies }) {
  return (
    <Box sx={{ p: 4, maxWidth: 1400, margin: '0 auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Workspace / Governance / Policy as Code
          </Typography>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Policy as Code
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create, version, and manage governance policies.
          </Typography>
        </Box>
        <Button variant="contained" color="primary" startIcon={<FileCode size={16} />}>
          New Policy
        </Button>
      </Box>
      <Paper variant="outlined">
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" fontWeight={600}>Policies</Typography>
          <Typography variant="body2" color="text.secondary">Active and drafted governance policies.</Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Version</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {policies.map(p => (
                <TableRow key={p.id} hover>
                  <TableCell>{p.id}</TableCell>
                  <TableCell><Typography fontWeight={600} variant="body2">{p.name}</Typography></TableCell>
                  <TableCell>
                    <Chip 
                      label={p.status} 
                      size="small" 
                      color={p.status === 'Active' ? 'info' : 'warning'} 
                      sx={{ textTransform: 'capitalize', fontWeight: 600 }}
                    />
                  </TableCell>
                  <TableCell>{p.version}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
