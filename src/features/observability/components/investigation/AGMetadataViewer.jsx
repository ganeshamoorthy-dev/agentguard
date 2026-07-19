import React, { useState } from 'react';
import { Box, Typography, Collapse } from '@mui/material';
import { ChevronRight, ChevronDown } from 'lucide-react';

const JsonTreeNode = ({ nodeKey, value, depth = 0 }) => {
  const [expanded, setExpanded] = useState(false);
  const isObject = value !== null && typeof value === 'object';
  const itemCount = isObject ? Object.keys(value).length : 0;

  const renderValue = () => {
    if (isObject) {
      return <Typography sx={{ fontStyle: 'italic', color: 'text.secondary', fontSize: '13px' }}>{itemCount} {itemCount === 1 ? 'item' : 'items'}</Typography>;
    }
    if (typeof value === 'string') {
      return <Typography sx={{ color: '#2e7d32', fontSize: '13px', fontFamily: 'monospace' }}>"{value}"</Typography>;
    }
    if (typeof value === 'number') {
      return <Typography sx={{ color: '#1976d2', fontSize: '13px', fontFamily: 'monospace' }}>{value}</Typography>;
    }
    if (typeof value === 'boolean') {
      return <Typography sx={{ color: '#ed6c02', fontSize: '13px', fontFamily: 'monospace' }}>{value ? 'true' : 'false'}</Typography>;
    }
    return <Typography sx={{ color: 'text.secondary', fontSize: '13px', fontFamily: 'monospace' }}>{String(value)}</Typography>;
  };

  return (
    <>
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center',
          py: 1, 
          px: 2,
          borderBottom: 1, 
          borderColor: 'divider',
          bgcolor: expanded ? 'action.hover' : 'transparent',
          cursor: isObject ? 'pointer' : 'default',
          '&:hover': { bgcolor: isObject ? 'action.hover' : 'transparent' }
        }}
        onClick={() => isObject && setExpanded(!expanded)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', width: '50%', pl: depth * 2.5 }}>
          {isObject ? (
            expanded ? <ChevronDown size={14} style={{ marginRight: 8, color: '#888' }} /> : <ChevronRight size={14} style={{ marginRight: 8, color: '#888' }} />
          ) : (
            <Box sx={{ width: 22 }} />
          )}
          <Typography sx={{ fontSize: '13px', fontFamily: 'monospace', color: 'text.primary' }}>{nodeKey}</Typography>
        </Box>
        <Box sx={{ width: '50%' }}>
          {renderValue()}
        </Box>
      </Box>
      
      {isObject && (
        <Collapse in={expanded}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {Object.entries(value).map(([k, v]) => (
              <JsonTreeNode key={k} nodeKey={k} value={v} depth={depth + 1} />
            ))}
          </Box>
        </Collapse>
      )}
    </>
  );
};

export default function AGMetadataViewer({ metadata, isJson }) {
  if (!metadata) return null;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: 'background.paper' }}>
        {isJson ? (
          <Box sx={{ p: 2 }}>
            <Box component="pre" sx={{ fontSize: '13px', color: 'text.secondary', m: 0, whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
              {JSON.stringify(metadata, null, 2)}
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', py: 1.5, px: 2, bgcolor: 'background.default', borderBottom: 1, borderColor: 'divider' }}>
              <Typography sx={{ width: '50%', fontWeight: 600, color: 'text.secondary', fontSize: '14px' }}>Path</Typography>
              <Typography sx={{ width: '50%', fontWeight: 600, color: 'text.secondary', fontSize: '14px' }}>Value</Typography>
            </Box>
            {Object.entries(metadata).map(([key, value]) => (
              <JsonTreeNode key={key} nodeKey={key} value={value} depth={0} />
            ))}
          </Box>
        )}
    </Box>
  );
}
