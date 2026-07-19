import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography, Button, Paper, InputBase, Chip, IconButton, Breadcrumbs, Link, Stack, Skeleton, Drawer, Menu, MenuItem, Checkbox, FormControlLabel, Autocomplete, TextField } from '@mui/material';
import { Bookmark, Search, Columns, Download, Share2, TerminalSquare, AlertTriangle, Clock, ShieldAlert, Filter, ListFilter, User, Box as BoxIcon, History, Save } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import TraceTable from './TraceTable';
import AGFilterPanel from './AGFilterPanel';
import PageHeader from '../../../components/PageHeader';

const QUICK_FILTERS = [
  { id: 'prod', category: 'Environment', label: 'Production', icon: TerminalSquare },
  { id: 'errors', category: 'Status', label: 'Errors', icon: AlertTriangle },
  { id: 'latency', category: 'Performance', label: 'High Latency', icon: Clock },
  { id: 'violations', category: 'Security', label: 'Guardrail Violations', icon: ShieldAlert },
];

export const ALL_COLUMNS = [
  { id: 'time', label: 'Timestamp' },
  { id: 'application', label: 'Application' },
  { id: 'name', label: 'Trace Name' },
  { id: 'input', label: 'Input' },
  { id: 'output', label: 'Output' },
  { id: 'model', label: 'Model' },
  { id: 'latency', label: 'Latency' },
  { id: 'status', label: 'Status' },
  { id: 'tokens', label: 'Tokens' },
  { id: 'cost', label: 'Cost' },
  { id: 'security', label: 'Security' },
  { id: 'evaluation', label: 'Evaluation' },
  { id: 'user', label: 'User' }
];

const SUGGESTIONS = [];

export default function TraceExplorer({ traces, savedViews, onRefresh, onSelect, onBookmark }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Drawer state
  const [isLoading, setIsLoading] = useState(false);
  const [columnAnchorEl, setColumnAnchorEl] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  
  // Local state for columns
  const [visibleColumns, setVisibleColumns] = useState(['time', 'application', 'name', 'model', 'latency', 'status']);
  
  // URL State mappings
  const query = searchParams.get('q') || '';
  const activeFilter = searchParams.get('filter') || null;
  
  const updateUrlParams = useCallback((updates) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === '') next.delete(key);
        else next.set(key, value);
      });
      return next;
    });
  }, [setSearchParams]);

  // Sync internal search value with query param initially
  useEffect(() => { setSearchValue(query); }, [query]);

  const handleColumnToggle = (columnId) => {
    setVisibleColumns(prev => 
      prev.includes(columnId) 
        ? prev.filter(id => id !== columnId)
        : [...prev, columnId]
    );
  };

  // Simulate debounced search and independent loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      onRefresh({ query, filter: activeFilter });
      setIsLoading(false);
    }, 400); // Debounce delay + network mock
    return () => clearTimeout(timer);
  }, [query, activeFilter, onRefresh]);

  // Real-time mock frontend filtering
  const filteredTraces = React.useMemo(() => {
    let result = traces;
    if (query) {
      result = result.filter(t => t.name.toLowerCase().includes(query.toLowerCase()) || t.application.toLowerCase().includes(query.toLowerCase()));
    }
    if (activeFilter === 'prod') {
      result = result.filter(t => t.environment === 'Production' || true); // mock
    } else if (activeFilter === 'errors') {
      result = result.filter(t => t.status === 'Failed' || t.status === 'Blocked');
    } else if (activeFilter === 'latency') {
      result = result.filter(t => t.latency > 2000);
    } else if (activeFilter === 'violations') {
      result = result.filter(t => t.risk === 'High');
    }
    return result;
  }, [traces, query, activeFilter]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        document.getElementById('global-trace-search')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)', overflow: 'hidden', margin: '-30px -36px -40px' }}>
      
      <PageHeader
        breadcrumbs={['Observability', 'Trace Explorer']}
        title="Trace Explorer"
        titleAppend={<Chip size="small" label={`${filteredTraces.length.toLocaleString()} traces`} sx={{ height: 20, fontSize: '10px', bgcolor: 'action.hover' }} />}
        actions={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Button size="small" variant="outlined" color="inherit" startIcon={<Save size={14} />}>Save View</Button>
            <Button size="small" variant="outlined" color="inherit" startIcon={<Download size={14} />}>Export</Button>
            <Button size="small" variant="outlined" color="inherit" startIcon={<Share2 size={14} />}>Share</Button>
          </Box>
        }
      />

      {/* Main Workspace */}
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden', bgcolor: 'background.default' }}>
        
        {/* Table Area */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', p: 4.5 }}>
          
          <Paper variant="outlined" sx={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
            {/* Filter Controls (Row 1) */}
            <Box sx={{ px: 3, pt: 2, pb: (query || activeFilter) ? 1 : 2, display: 'flex', gap: 2, alignItems: 'center', flexShrink: 0, bgcolor: 'background.paper', borderBottom: (query || activeFilter) ? 0 : 1, borderColor: 'divider' }}>
              
              <Autocomplete
                id="global-trace-search"
                freeSolo
                options={searchValue ? [] : SUGGESTIONS}
                groupBy={(option) => option.group}
                getOptionLabel={(option) => typeof option === 'string' ? option : option.label}
                value={searchValue}
                onChange={(e, newValue) => {
                  if (typeof newValue === 'string') {
                    if (newValue.endsWith(':')) {
                      setSearchValue(newValue);
                    } else {
                      updateUrlParams({ q: newValue });
                      setSearchValue(''); // clear upon saving
                    }
                  } else if (newValue) {
                    setSearchValue(newValue.label);
                  } else {
                    updateUrlParams({ q: '' });
                    setSearchValue('');
                  }
                }}
                onInputChange={(e, newInputValue) => setSearchValue(newInputValue)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchValue) {
                    updateUrlParams({ q: searchValue });
                    setSearchValue(''); // Clear it to look like GCP
                    e.preventDefault();
                  }
                }}
                renderOption={(props, option) => {
                  const Icon = option.icon;
                  return (
                    <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, fontSize: '13px' }}>
                      <Icon size={14} color="currentColor" style={{ opacity: 0.6 }} />
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{option.label}</Typography>
                    </Box>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search traces, users, models..."
                    variant="outlined"
                    size="small"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <>
                          <Search size={16} style={{ opacity: 0.6, marginLeft: 4, marginRight: 4 }} />
                          {params.InputProps?.startAdornment}
                        </>
                      ),
                      endAdornment: (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {(query || activeFilter) && (
                             <Typography 
                               variant="caption" 
                               sx={{ cursor: 'pointer', color: 'text.secondary', fontWeight: 600, mr: 1, '&:hover': { color: 'primary.main' } }}
                               onClick={(e) => { 
                                 e.stopPropagation(); 
                                 updateUrlParams({ q: null, filter: null }); 
                                 setSearchValue(''); 
                               }}
                             >
                               Clear filters
                             </Typography>
                          )}
                          {params.InputProps?.endAdornment}
                        </Box>
                      ),  
                      sx: { 
                        ...params.InputProps?.sx,
                        fontSize: '13px', 
                        bgcolor: 'background.default',
                        height: 36,
                        p: '0 8px !important',
                        borderRadius: 2
                      }
                    }}
                    sx={{ 
                      flex: 1,
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'divider' },
                        '&:hover fieldset': { borderColor: 'text.disabled' },
                        '&.Mui-focused fieldset': { borderColor: 'primary.main' }
                      }
                    }}
                  />
                )}
                sx={{ flex: 1 }} // Take up remaining middle space
              />

              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', borderLeft: 1, borderColor: 'divider', pl: 2 }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, mr: 1 }}>
                  Quick Filters
                </Typography>
                {QUICK_FILTERS.map(qf => (
                  <Chip 
                    key={qf.id} 
                    label={qf.label} 
                    icon={<qf.icon size={12} />} 
                    variant={activeFilter === qf.id ? "filled" : "outlined"}
                    color={activeFilter === qf.id ? "primary" : "default"}
                    size="small" 
                    onClick={() => updateUrlParams({ filter: activeFilter === qf.id ? null : qf.id })}
                    sx={{ borderRadius: 1 }}
                  />
                ))}
              </Box>

              <Button 
                size="small" 
                variant="outlined"
                color="inherit"
                onClick={() => setIsFilterOpen(true)}
                startIcon={<ListFilter size={16} />}
                sx={{ borderRadius: 1, ml: 1, bgcolor: 'background.default' }}
              >
                Filters {activeFilter ? activeFilter.split(',').length : ''}
              </Button>

              <Button 
                size="small" 
                variant="outlined" 
                color="inherit" 
                sx={{ bgcolor: 'background.default', minWidth: 36, px: 0, borderRadius: 1 }}
                onClick={(e) => setColumnAnchorEl(e.currentTarget)}
              >
                <Columns size={16} />
              </Button>
            </Box>

            {/* Active Filters (Row 2 - Only renders if there's active state) */}
            {(query || activeFilter) && (
              <Box sx={{ px: 3, pb: 2, display: 'flex', gap: 1, alignItems: 'center', flexShrink: 0, borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
                {query && (
                  <Chip 
                    label={
                      query.includes(':') 
                        ? <span><b>{query.split(':')[0]}:</b> {query.split(':')[1]}</span>
                        : `Search: ${query}`
                    }
                    onDelete={() => updateUrlParams({ q: null })}
                    color="default"
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: 4, bgcolor: 'background.default' }}
                  />
                )}

                {activeFilter && activeFilter.split(',').map(filterToken => {
                  const qf = QUICK_FILTERS.find(q => q.id === filterToken);
                  
                  // Quick filters styling (solid tinted to differentiate from outline search)
                  if (qf) {
                    return (
                      <Chip 
                        key={filterToken}
                        icon={React.createElement(qf.icon, { size: 12 })}
                        label={<span><b>{qf.category}:</b> {qf.label}</span>} 
                        onDelete={() => {
                          const newFilters = activeFilter.split(',').filter(f => f !== filterToken).join(',') || null;
                          updateUrlParams({ filter: newFilters });
                        }}
                        color="primary"
                        size="small"
                        sx={{ borderRadius: 1, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(99, 102, 241, 0.15)' : '#e0e7ff', color: (theme) => theme.palette.mode === 'dark' ? '#818cf8' : '#3730a3', '& .MuiChip-deleteIcon': { color: (theme) => theme.palette.mode === 'dark' ? '#818cf8' : '#4f46e5' } }}
                      />
                    );
                  }

                  // Sidebar Custom Filters rendering (with blue tint and Filter icon)
                  if (filterToken.includes(':')) {
                    const colonIndex = filterToken.indexOf(':');
                    const k = filterToken.substring(0, colonIndex);
                    const v = filterToken.substring(colonIndex + 1);
                    return (
                      <Chip 
                        key={filterToken}
                        icon={<Filter size={12} />}
                        label={<span><b>{k}:</b> {v}</span>} 
                        onDelete={() => {
                          const newFilters = activeFilter.split(',').filter(f => f !== filterToken).join(',') || null;
                          updateUrlParams({ filter: newFilters });
                        }}
                        color="primary"
                        size="small"
                        sx={{ borderRadius: 1, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(99, 102, 241, 0.15)' : '#e0e7ff', color: (theme) => theme.palette.mode === 'dark' ? '#818cf8' : '#3730a3', '& .MuiChip-deleteIcon': { color: (theme) => theme.palette.mode === 'dark' ? '#818cf8' : '#4f46e5' } }}
                      />
                    );
                  }

                  return (
                      <Chip 
                        key={filterToken}
                        icon={<Filter size={12} />}
                        label={filterToken} 
                        onDelete={() => {
                          const newFilters = activeFilter.split(',').filter(f => f !== filterToken).join(',') || null;
                          updateUrlParams({ filter: newFilters });
                        }}
                        color="primary"
                        size="small"
                        sx={{ borderRadius: 1, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(99, 102, 241, 0.15)' : '#e0e7ff', color: (theme) => theme.palette.mode === 'dark' ? '#818cf8' : '#3730a3', '& .MuiChip-deleteIcon': { color: (theme) => theme.palette.mode === 'dark' ? '#818cf8' : '#4f46e5' } }}
                      />
                  );
                })}
                
                <Button size="small" color="primary" sx={{ fontSize: '13px', textTransform: 'none', fontWeight: 600, ml: 1 }} onClick={() => setIsFilterOpen(true)}>
                  + Add filter
                </Button>

                <Box sx={{ flexGrow: 1 }} />

                <Button size="small" color="secondary" sx={{ fontSize: '12px', textTransform: 'none' }} onClick={() => updateUrlParams({ q: null, filter: null })}>
                  Clear All
                </Button>
              </Box>
            )}

            {/* Menu lives outside the Flex rows but inside the component */}
            
            <Menu
              anchorEl={columnAnchorEl}
              open={Boolean(columnAnchorEl)}
              onClose={() => setColumnAnchorEl(null)}
              PaperProps={{ sx: { width: 220, maxHeight: 400 } }}
            >
              <Box sx={{ px: 2, py: 1, borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="caption" fontWeight={600} color="text.secondary">Visible Columns</Typography>
              </Box>
              {ALL_COLUMNS.map(col => (
                <MenuItem key={col.id} onClick={(e) => { e.preventDefault(); handleColumnToggle(col.id); }} sx={{ py: 0, px: 1 }}>
                  <FormControlLabel
                    control={<Checkbox size="small" checked={visibleColumns.includes(col.id)} />}
                    label={<Typography variant="body2">{col.label}</Typography>}
                    sx={{ width: '100%', m: 0 }}
                    onClick={(e) => e.preventDefault()}
                  />
                </MenuItem>
              ))}
            </Menu>

          {/* Table Container */}
          <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {isLoading ? (
              <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
                 <Skeleton variant="rectangular" height={40} sx={{ borderRadius: 1 }} />
                 <Skeleton variant="rectangular" height={40} sx={{ borderRadius: 1 }} />
                 <Skeleton variant="rectangular" height={40} sx={{ borderRadius: 1 }} />
                 <Skeleton variant="rectangular" height={40} sx={{ borderRadius: 1 }} />
                 <Skeleton variant="rectangular" height={40} sx={{ borderRadius: 1 }} />
              </Box>
            ) : (
              <TraceTable traces={filteredTraces} onSelect={onSelect} onBookmark={(id) => onBookmark(id, { query })} visibleColumns={visibleColumns} />
            )}
          </Box>
          </Paper>
        </Box>

        {/* Filter Drawer */}
        <Drawer
          anchor="right"
          open={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          PaperProps={{ sx: { width: 340, borderLeft: 1, borderColor: 'divider', boxShadow: '-8px 0 24px rgba(0,0,0,0.05)' } }}
        >
          <AGFilterPanel 
            width="100%" 
            activeFilters={activeFilter}
            onClose={() => setIsFilterOpen(false)} 
            onApply={(filterString) => {
              updateUrlParams({ filter: filterString !== undefined && filterString !== '' ? filterString : null });
              setIsFilterOpen(false);
            }} 
          />
        </Drawer>

      </Box>
    </Box>
  );
}
