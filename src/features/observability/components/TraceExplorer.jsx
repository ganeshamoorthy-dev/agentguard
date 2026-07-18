import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography, Button, Paper, InputBase, Chip, IconButton, Breadcrumbs, Link, Stack, Skeleton, Drawer, Menu, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { Bookmark, Search, Columns, Download, Share2, TerminalSquare, AlertTriangle, Clock, ShieldAlert, Filter, ListFilter } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import TraceTable from './TraceTable';
import AGFilterPanel from './AGFilterPanel';

const QUICK_FILTERS = [
  { id: 'prod', label: 'Production', icon: TerminalSquare },
  { id: 'errors', label: 'Errors', icon: AlertTriangle },
  { id: 'latency', label: 'High Latency', icon: Clock },
  { id: 'violations', label: 'Guardrail Violations', icon: ShieldAlert },
];

export const ALL_COLUMNS = [
  { id: 'time', label: 'Timestamp' },
  { id: 'application', label: 'Application' },
  { id: 'name', label: 'Trace Name' },
  { id: 'model', label: 'Model' },
  { id: 'latency', label: 'Latency' },
  { id: 'status', label: 'Status' },
  { id: 'tokens', label: 'Tokens' },
  { id: 'cost', label: 'Cost' },
  { id: 'security', label: 'Security' },
  { id: 'evaluation', label: 'Evaluation' },
  { id: 'user', label: 'User' }
];

export default function TraceExplorer({ traces, savedViews, onRefresh, onSelect, onBookmark }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Drawer state
  const [isLoading, setIsLoading] = useState(false);
  const [columnAnchorEl, setColumnAnchorEl] = useState(null);
  
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

  const handleSearchChange = (e) => updateUrlParams({ q: e.target.value });

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
      
      {/* Header (Fixed) */}
      <Box sx={{ flexShrink: 0, borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper', px: 3, py: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 0.5, '& .MuiBreadcrumbs-separator': { mx: 0.5 } }}>
            <Link underline="hover" color="primary" sx={{ fontSize: '0.75rem', fontWeight: 500 }} href="#">Observability</Link>
            <Typography color="text.primary" sx={{ fontSize: '0.75rem', fontWeight: 600 }}>Trace Explorer</Typography>
          </Breadcrumbs>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6" fontWeight={600} fontFamily="serif" sx={{ lineHeight: 1.2 }}>Trace Explorer</Typography>
            <Chip size="small" label={`${filteredTraces.length.toLocaleString()} traces`} sx={{ height: 20, fontSize: '10px', bgcolor: 'action.hover' }} />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Paper variant="outlined" sx={{ display: 'flex', alignItems: 'center', px: 1, py: 0.5, width: 320, boxShadow: 'none', bgcolor: 'background.default' }}>
            <Search size={16} style={{ color: '#8190a0', marginRight: 8 }} />
            <InputBase 
              id="global-trace-search"
              value={query}
              onChange={handleSearchChange}
              placeholder="Search traces, users, tags (Ctrl+K)..." 
              sx={{ flex: 1, fontSize: '13px' }}
            />
          </Paper>
          <Button size="small" variant="outlined" color="inherit" startIcon={<Download size={14} />}>Export</Button>
          <Button size="small" variant="outlined" color="inherit" startIcon={<Share2 size={14} />}>Share</Button>
        </Box>
      </Box>

      {/* Main Workspace */}
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden', bgcolor: '#f9fafb' }}>
        
        {/* Table Area */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', p: 4.5 }}>
          
          <Paper variant="outlined" sx={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
            {/* Quick Filter Chips */}
            <Box sx={{ px: 3, py: 1.5, display: 'flex', gap: 1, alignItems: 'center', flexShrink: 0, borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
            <Button 
              size="small" 
              variant="contained"
              disableElevation
              color="primary"
              onClick={() => setIsFilterOpen(true)}
              startIcon={<ListFilter size={16} />}
              sx={{ mr: 2, borderRadius: 2 }}
            >
              Filters
            </Button>
            
            <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mr: 1, fontWeight: 600 }}>
              {activeFilter || query ? 'Applied Filters:' : 'Quick Filters:'}
            </Typography>
            
            {query && (
              <Chip 
                label={`Search: ${query}`} 
                onDelete={() => updateUrlParams({ q: null })}
                color="primary"
                size="small"
                sx={{ borderRadius: 1 }}
              />
            )}

            {QUICK_FILTERS.map(qf => {
              // If we are filtering, only show the active quick filter chip (as a removable chip)
              if (activeFilter && activeFilter !== qf.id) return null;
              
              return (
                <Chip 
                  key={qf.id} 
                  label={qf.label} 
                  icon={<qf.icon size={12} />} 
                  variant={activeFilter === qf.id ? "filled" : "outlined"}
                  color={activeFilter === qf.id ? "primary" : "default"}
                  size="small" 
                  onClick={!activeFilter ? () => updateUrlParams({ filter: qf.id }) : undefined}
                  onDelete={activeFilter === qf.id ? () => updateUrlParams({ filter: null }) : undefined}
                  sx={{ borderRadius: 1 }}
                />
              );
            })}

            <Box sx={{ flexGrow: 1 }} />

            {(query || activeFilter) && (
              <Button size="small" color="secondary" sx={{ fontSize: '11px', mr: 1 }} onClick={() => updateUrlParams({ q: null, filter: null })}>
                Clear All
              </Button>
            )}

            <Button 
              size="small" 
              variant="outlined" 
              color="inherit" 
              startIcon={<Columns size={14} />} 
              sx={{ bgcolor: 'background.default' }}
              onClick={(e) => setColumnAnchorEl(e.currentTarget)}
            >
              Columns
            </Button>
            
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
          </Box>

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
            onClose={() => setIsFilterOpen(false)} 
            onApply={() => {
              // Simulate applying a complex filter from the panel
              updateUrlParams({ filter: 'complex' });
              setIsFilterOpen(false);
            }} 
          />
        </Drawer>

      </Box>
    </Box>
  );
}
