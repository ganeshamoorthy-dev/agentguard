import React, { useState } from 'react';
import { Box, Typography, Collapse, IconButton, Checkbox, FormControlLabel, Slider, TextField, Chip } from '@mui/material';
import { ChevronDown, ChevronRight, Search } from 'lucide-react';

export default function AGFilterGroup({ title, icon: Icon, items = [], type = 'checkbox', defaultExpanded = false, selectedCount = 0, selectedItems = [], onChange, customKey = '', customValue = '', onCustomChange }) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [search, setSearch] = useState('');

  const handleAddCustomFilter = () => {
    if (customKey && customValue && onChange) {
      onChange(`${title}|${customKey}:${customValue}`, true);
      if (onCustomChange) onCustomChange('', '');
    }
  };

  const filteredItems = items.filter(item => item.label.toLowerCase().includes(search.toLowerCase()));

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          py: 1.5, 
          px: 2, 
          cursor: 'pointer',
          '&:hover': { bgcolor: 'action.hover' }
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {Icon && <Icon size={14} color="#64748b" />}
          <Typography variant="body2" fontWeight={600} color="text.primary">
            {title}
          </Typography>
        </Box>
        <Box sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 1 }}>
          {!expanded && selectedCount > 0 && (
            <Typography variant="caption" color="primary" fontWeight={600}>{selectedCount} selected</Typography>
          )}
          {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </Box>
      </Box>
      
      <Collapse in={expanded}>
        <Box sx={{ px: 2, pb: 2 }}>
          {items.length > 5 && type === 'checkbox' && (
            <Box sx={{ mb: 1, position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', top: 8, left: 8, color: '#94a3b8' }} />
              <TextField 
                variant="outlined" 
                size="small" 
                fullWidth 
                placeholder="Search..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ 
                  '& .MuiInputBase-root': { height: 30, fontSize: '12px', pl: 3 },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' }
                }}
              />
            </Box>
          )}

          {type === 'checkbox' && (
            <Box sx={{ maxHeight: 200, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
              {filteredItems.map(item => (
                <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        size="small" 
                        sx={{ p: 0.5 }} 
                        checked={selectedItems.includes(item.id)}
                        onChange={(e) => onChange && onChange(item.id, e.target.checked)}
                      />
                    }
                    label={<Typography variant="body2" sx={{ fontSize: '12px' }}>{item.label}</Typography>}
                    sx={{ m: 0 }}
                  />
                  {item.count && (
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '10px' }}>
                      {item.count.toLocaleString()}
                    </Typography>
                  )}
                </Box>
              ))}
              {filteredItems.length === 0 && (
                <Typography variant="caption" color="text.secondary" sx={{ py: 1 }}>No matches</Typography>
              )}
            </Box>
          )}

          {type === 'range' && (
            <Box sx={{ px: 1, pt: 2 }}>
              <Slider 
                defaultValue={[0, 100]} 
                valueLabelDisplay="auto" 
                size="small" 
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <TextField size="small" placeholder="Min" sx={{ width: '45%', '& .MuiInputBase-root': { height: 28, fontSize: '11px' } }} />
                <TextField size="small" placeholder="Max" sx={{ width: '45%', '& .MuiInputBase-root': { height: 28, fontSize: '11px' } }} />
              </Box>
            </Box>
          )}

          {type === 'key-value' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {selectedItems.filter(id => id.startsWith(`${title}|`)).map(id => {
                const displayValue = id.replace(`${title}|`, '');
                return (
                  <Box key={id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'action.hover', px: 1, py: 0.5, borderRadius: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>{displayValue}</Typography>
                    <Typography variant="caption" color="error" sx={{cursor:'pointer'}} onClick={() => onChange(id, false)}>Remove</Typography>
                  </Box>
                );
              })}
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <TextField 
                  size="small" 
                  placeholder="Key" 
                  value={customKey} 
                  onChange={e => onCustomChange && onCustomChange(e.target.value, customValue)} 
                  onKeyDown={e => e.key === 'Enter' && handleAddCustomFilter()}
                  sx={{ flex: 1, '& .MuiInputBase-root': { height: 28, fontSize: '11px' } }} 
                />
                <TextField 
                  size="small" 
                  placeholder="Value" 
                  value={customValue} 
                  onChange={e => onCustomChange && onCustomChange(customKey, e.target.value)} 
                  onKeyDown={e => e.key === 'Enter' && handleAddCustomFilter()}
                  sx={{ flex: 1, '& .MuiInputBase-root': { height: 28, fontSize: '11px' } }} 
                />
              </Box>
              <Typography variant="caption" color="primary" sx={{ cursor: 'pointer', mt: 0.5, fontWeight: 600, display: 'inline-block' }} onClick={handleAddCustomFilter}>+ Add Filter</Typography>
            </Box>
          )}
        </Box>
      </Collapse>
    </Box>
  );
}
