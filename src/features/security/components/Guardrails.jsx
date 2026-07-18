import React from 'react';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import { ShieldAlert } from 'lucide-react';

export default function Guardrails({ guardrails }) {
  return (
    <Box sx={{ p: 4, maxWidth: 1400, margin: '0 auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Workspace / Security / Guardrails
          </Typography>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Guardrails
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage protection rules and policies for your AI applications.
          </Typography>
        </Box>
        <Button variant="contained" color="primary" startIcon={<ShieldAlert size={16} />}>
          Create Rule
        </Button>
      </Box>
      <Paper variant="outlined">
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" fontWeight={600}>Active Guardrails</Typography>
          <Typography variant="body2" color="text.secondary">Rules currently monitoring your models.</Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Severity</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Scope</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {guardrails.map(g => (
                <TableRow key={g.id} hover>
                  <TableCell><Typography fontWeight={600} variant="body2">{g.name}</Typography></TableCell>
                  <TableCell>
                    <Chip 
                      label={g.severity} 
                      size="small" 
                      color={g.severity.toLowerCase() === 'high' ? 'error' : 'info'} 
                      sx={{ textTransform: 'capitalize', fontWeight: 600 }}
                    />
                  </TableCell>
                  <TableCell>{g.action}</TableCell>
                  <TableCell>{g.scope}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
