import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Typography, Box, Tooltip, Stack, TablePagination } from '@mui/material';
import { Trash2, Activity } from 'lucide-react';
import AGStatusBadge from './AGStatusBadge';

const formatLatency = (value) => `${(value / 1000).toFixed(2)} s`;

export default function TraceTable({ traces, onSelect, onBookmark, visibleColumns = ['time', 'application', 'name', 'model', 'latency', 'status'] }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleChangePage = (event, newPage) => setPage(newPage);
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Slice traces for pagination
  const paginatedTraces = traces.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <TableContainer sx={{ borderTop: 1, borderColor: 'divider', borderRadius: 0, boxShadow: 'none', bgcolor: 'transparent', flexGrow: 1, overflowY: 'auto' }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              {visibleColumns.includes('time') && <TableCell sx={{ textTransform: 'uppercase', fontSize: '10px', fontWeight: 600, color: 'text.secondary', borderColor: 'divider' }}>Timestamp</TableCell>}
              {visibleColumns.includes('application') && <TableCell sx={{ textTransform: 'uppercase', fontSize: '10px', fontWeight: 600, color: 'text.secondary', borderColor: 'divider' }}>Application</TableCell>}
              {visibleColumns.includes('name') && <TableCell sx={{ textTransform: 'uppercase', fontSize: '10px', fontWeight: 600, color: 'text.secondary', borderColor: 'divider' }}>Trace Name</TableCell>}
              {visibleColumns.includes('input') && <TableCell sx={{ textTransform: 'uppercase', fontSize: '10px', fontWeight: 600, color: 'text.secondary', borderColor: 'divider' }}>Input</TableCell>}
              {visibleColumns.includes('output') && <TableCell sx={{ textTransform: 'uppercase', fontSize: '10px', fontWeight: 600, color: 'text.secondary', borderColor: 'divider' }}>Output</TableCell>}
              {visibleColumns.includes('model') && <TableCell sx={{ textTransform: 'uppercase', fontSize: '10px', fontWeight: 600, color: 'text.secondary', borderColor: 'divider' }}>Model</TableCell>}
              {visibleColumns.includes('latency') && <TableCell sx={{ textTransform: 'uppercase', fontSize: '10px', fontWeight: 600, color: 'text.secondary', borderColor: 'divider' }}>Latency</TableCell>}
              {visibleColumns.includes('status') && <TableCell sx={{ textTransform: 'uppercase', fontSize: '10px', fontWeight: 600, color: 'text.secondary', borderColor: 'divider' }}>Status</TableCell>}
              {visibleColumns.includes('tokens') && <TableCell sx={{ textTransform: 'uppercase', fontSize: '10px', fontWeight: 600, color: 'text.secondary', borderColor: 'divider' }}>Tokens</TableCell>}
              {visibleColumns.includes('cost') && <TableCell sx={{ textTransform: 'uppercase', fontSize: '10px', fontWeight: 600, color: 'text.secondary', borderColor: 'divider' }}>Cost</TableCell>}
              {visibleColumns.includes('security') && <TableCell sx={{ textTransform: 'uppercase', fontSize: '10px', fontWeight: 600, color: 'text.secondary', borderColor: 'divider' }}>Security</TableCell>}
              {visibleColumns.includes('evaluation') && <TableCell sx={{ textTransform: 'uppercase', fontSize: '10px', fontWeight: 600, color: 'text.secondary', borderColor: 'divider' }}>Evaluation</TableCell>}
              {visibleColumns.includes('user') && <TableCell sx={{ textTransform: 'uppercase', fontSize: '10px', fontWeight: 600, color: 'text.secondary', borderColor: 'divider' }}>User</TableCell>}
              <TableCell sx={{ textTransform: 'uppercase', fontSize: '10px', fontWeight: 600, color: 'text.secondary', borderColor: 'divider', minWidth: 80 }} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTraces.map((trace) => (
              <TableRow 
                key={trace.id} 
                hover
                onClick={() => onSelect(trace.id)}
                sx={{ cursor: 'pointer', '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {visibleColumns.includes('time') && (
                  <TableCell sx={{ borderColor: 'divider', color: 'text.secondary', fontSize: '12px', whiteSpace: 'nowrap' }}>
                    {trace.time}
                  </TableCell>
                )}
                {visibleColumns.includes('application') && (
                  <TableCell sx={{ borderColor: 'divider', color: 'text.secondary', fontSize: '12px' }}>
                    <Typography variant="body2" fontWeight={500} color="text.primary">{trace.application}</Typography>
                  </TableCell>
                )}
                {visibleColumns.includes('name') && (
                  <TableCell sx={{ borderColor: 'divider', color: 'text.secondary', py: 1.5, minWidth: 150 }}>
                    <Typography variant="body2" fontWeight={600} color="text.primary">{trace.name}</Typography>
                  </TableCell>
                )}
                {visibleColumns.includes('input') && (
                  <TableCell sx={{ borderColor: 'divider', color: 'text.secondary', py: 1.5, minWidth: 150, maxWidth: 200 }}>
                    <Typography variant="body2" color="text.secondary" noWrap title={trace.input}>{trace.input}</Typography>
                  </TableCell>
                )}
                {visibleColumns.includes('output') && (
                  <TableCell sx={{ borderColor: 'divider', color: 'text.secondary', py: 1.5, minWidth: 150, maxWidth: 200 }}>
                    <Typography variant="body2" color="text.secondary" noWrap title={trace.output}>{trace.output}</Typography>
                  </TableCell>
                )}
                {visibleColumns.includes('model') && (
                  <TableCell sx={{ borderColor: 'divider', color: 'text.secondary', fontSize: '12px' }}>
                    <Typography variant="caption" sx={{ bgcolor: 'action.hover', px: 1, py: 0.5, borderRadius: 1 }}>{trace.model || 'gpt-4'}</Typography>
                  </TableCell>
                )}
                {visibleColumns.includes('latency') && (
                  <TableCell sx={{ borderColor: 'divider', color: 'text.secondary', fontSize: '12px' }}>
                    {formatLatency(trace.latency)}
                  </TableCell>
                )}
                {visibleColumns.includes('status') && (
                  <TableCell sx={{ borderColor: 'divider', color: 'text.secondary', fontSize: '12px' }}>
                    <AGStatusBadge status={trace.status} />
                  </TableCell>
                )}
                {visibleColumns.includes('tokens') && (
                  <TableCell sx={{ borderColor: 'divider', color: 'text.secondary', fontSize: '12px' }}>
                    {(trace.totalTokens || 1245).toLocaleString()}
                  </TableCell>
                )}
                {visibleColumns.includes('cost') && (
                  <TableCell sx={{ borderColor: 'divider', color: 'text.secondary', fontSize: '12px' }}>
                    ${(trace.cost || 0.0042).toFixed(4)}
                  </TableCell>
                )}
                {visibleColumns.includes('security') && (
                  <TableCell sx={{ borderColor: 'divider', color: 'text.secondary', fontSize: '12px' }}>
                    {trace.risk === 'High' ? 'Failed' : 'Passed'}
                  </TableCell>
                )}
                {visibleColumns.includes('evaluation') && (
                  <TableCell sx={{ borderColor: 'divider', color: 'text.secondary', fontSize: '12px' }}>
                    Pending
                  </TableCell>
                )}
                {visibleColumns.includes('user') && (
                  <TableCell sx={{ borderColor: 'divider', color: 'text.secondary', fontSize: '12px' }}>
                    {trace.user || 'usr_2910'}
                  </TableCell>
                )}
                <TableCell sx={{ borderColor: 'divider', color: 'text.secondary' }} align="right">
                  <Stack direction="row" spacing={0.25} justifyContent="flex-end">
                    <Tooltip title="Delete">
                      <IconButton size="small" onClick={(e) => { e.stopPropagation(); }} color="error" sx={{ p: 0.5 }}>
                        <Trash2 size={15} />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            {!traces.length && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                  <Activity size={48} opacity={0.2} style={{ marginBottom: 16 }} />
                  <Typography variant="body1" fontWeight={500} gutterBottom>No traces found</Typography>
                  <Typography variant="body2" color="text.secondary">Try adjusting your filters or expanding the date range.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[25, 50, 100, 250]}
        component="div"
        count={traces.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ borderTop: 1, borderColor: 'divider', bgcolor: 'background.paper' }}
      />
    </Box>
  );
}
