import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function AGRankedTable({ columns, data, onRowClick }) {
  return (
    <TableContainer sx={{ borderTop: 1, borderColor: 'divider', borderRadius: 0, boxShadow: 'none', bgcolor: 'transparent' }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns.map((col, idx) => (
              <TableCell 
                key={idx} 
                align={col.align || 'left'}
                sx={{ 
                  textTransform: 'uppercase', 
                  fontSize: '9px', 
                  fontWeight: 600, 
                  color: 'text.secondary',
                  borderColor: 'divider',
                  py: 1
                }}
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rIdx) => (
            <TableRow 
              key={rIdx} 
              hover={!!onRowClick}
              onClick={() => onRowClick && onRowClick(row)}
              sx={{ 
                cursor: onRowClick ? 'pointer' : 'default',
                '&:last-child td, &:last-child th': { border: 0 } 
              }}
            >
              {columns.map((col, cIdx) => (
                <TableCell 
                  key={cIdx} 
                  align={col.align || 'left'}
                  sx={{ 
                    color: 'text.secondary',
                    borderColor: 'divider',
                    py: 1.5,
                    fontSize: '11px'
                  }}
                >
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
