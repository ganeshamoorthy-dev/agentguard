import React from 'react';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import { UserCheck } from 'lucide-react';

export default function HumanReview({ reviews }) {
  return (
    <Box sx={{ p: 4, maxWidth: 1400, margin: '0 auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Workspace / AI Quality / Human Review
          </Typography>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Human Review
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manual evaluation queue for critical and escalated traces.
          </Typography>
        </Box>
        <Button variant="outlined" color="secondary" startIcon={<UserCheck size={16} />}>
          Assign Reviews
        </Button>
      </Box>
      <Paper variant="outlined">
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" fontWeight={600}>Review Queue</Typography>
          <Typography variant="body2" color="text.secondary">Traces pending manual feedback.</Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Trace ID</TableCell>
                <TableCell>Reviewer</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Model</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reviews.map(r => (
                <TableRow key={r.traceId} hover>
                  <TableCell><Typography fontWeight={600} variant="body2">{r.traceId}</Typography></TableCell>
                  <TableCell>{r.reviewer}</TableCell>
                  <TableCell>
                    <Chip 
                      label={r.status} 
                      size="small" 
                      color={r.status === 'Pending' ? 'warning' : 'info'} 
                      sx={{ textTransform: 'capitalize', fontWeight: 600 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={r.priority} 
                      size="small" 
                      color={r.priority === 'High' ? 'error' : 'info'} 
                      sx={{ textTransform: 'capitalize', fontWeight: 600 }}
                    />
                  </TableCell>
                  <TableCell>{r.model}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
