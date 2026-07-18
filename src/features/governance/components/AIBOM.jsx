import React from 'react';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { PackageSearch } from 'lucide-react';

export default function AIBOM({ assets }) {
  return (
    <Box sx={{ p: 4, maxWidth: 1400, margin: '0 auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Workspace / Governance / AI BOM
          </Typography>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            AI Bill of Materials
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Track all models, datasets, and prompts used across your applications.
          </Typography>
        </Box>
        <Button variant="outlined" color="secondary" startIcon={<PackageSearch size={16} />}>
          Export SBOM
        </Button>
      </Box>
      <Paper variant="outlined">
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" fontWeight={600}>AI Assets</Typography>
          <Typography variant="body2" color="text.secondary">Inventory of dependencies and artifacts.</Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>Version</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assets.map(a => (
                <TableRow key={a.id} hover>
                  <TableCell>{a.id}</TableCell>
                  <TableCell><Typography fontWeight={600} variant="body2">{a.name}</Typography></TableCell>
                  <TableCell>{a.type}</TableCell>
                  <TableCell>{a.owner}</TableCell>
                  <TableCell>{a.version}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
