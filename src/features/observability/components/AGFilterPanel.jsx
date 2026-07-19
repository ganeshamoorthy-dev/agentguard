import React, { useState } from 'react';
import { Box, Typography, Button, IconButton, InputBase } from '@mui/material';
import { PanelLeftClose, Filter, RotateCcw, Search as SearchIcon, Server, Fingerprint, Box as BoxIcon, Activity, Clock, Shield, CheckCircle, Database } from 'lucide-react';
import AGFilterGroup from './AGFilterGroup';

const ENV_ITEMS = [
  { id: 'prod', label: 'Production', count: 42105 },
  { id: 'staging', label: 'Staging', count: 1205 },
  { id: 'dev', label: 'Development', count: 342 }
];

const MODEL_ITEMS = [
  { id: 'gpt4', label: 'gpt-4', count: 28400 },
  { id: 'claude3', label: 'claude-3-opus', count: 12500 },
  { id: 'gemini', label: 'gemini-1.5-pro', count: 8300 }
];

const STATUS_ITEMS = [
  { id: 'healthy', label: 'Healthy', count: 39000 },
  { id: 'warning', label: 'Warning', count: 2100 },
  { id: 'failed', label: 'Failed', count: 905 },
  { id: 'blocked', label: 'Blocked', count: 120 }
];

export default function AGFilterPanel({ width = 300, activeFilters = '', onClose, onApply }) {
  const [filterSearch, setFilterSearch] = useState('');
  
  // Parse activeFilters string into IDs to prepopulate
  const [selectedIds, setSelectedIds] = useState(() => {
    const ids = [];
    if (!activeFilters) return ids;
    const tokens = activeFilters.split(',');
    tokens.forEach(t => {
      if (['prod', 'errors', 'latency', 'violations'].includes(t)) ids.push(t);
      else if (t === 'Environment:Staging') ids.push('staging');
      else if (t === 'Environment:Production') ids.push('prod');
      else if (t === 'Model:gpt-4') ids.push('gpt4');
      else if (t === 'Status:Healthy') ids.push('healthy');
      else if (t.includes(':')) ids.push(`Metadata|${t}`);
    });
    return ids;
  });

  React.useEffect(() => {
    const ids = [];
    if (!activeFilters) {
      setSelectedIds(ids);
      return;
    }
    const tokens = activeFilters.split(',');
    tokens.forEach(t => {
      if (['prod', 'errors', 'latency', 'violations'].includes(t)) ids.push(t);
      else if (t === 'Environment:Staging') ids.push('staging');
      else if (t === 'Environment:Production') ids.push('prod');
      else if (t === 'Model:gpt-4') ids.push('gpt4');
      else if (t === 'Status:Healthy') ids.push('healthy');
      else if (t.includes(':')) ids.push(`Metadata|${t}`);
    });
    setSelectedIds(ids);
  }, [activeFilters]);

  const [customInputs, setCustomInputs] = useState({});
  const [pendingChanges, setPendingChanges] = useState(0);

  const handleCheckboxChange = (id, checked) => {
    setSelectedIds(prev => {
      const next = checked ? Array.from(new Set([...prev, id])) : prev.filter(i => i !== id);
      return next;
    });
    setPendingChanges(prev => prev + 1);
  };

  const handleApply = () => {
    if (!onApply) return;
    const outList = selectedIds.map(id => {
      if (id === 'prod') return 'Environment:Production';
      if (id === 'staging') return 'Environment:Staging';
      if (id === 'gpt4') return 'Model:gpt-4';
      if (id === 'healthy') return 'Status:Healthy';
      if (id.includes('|')) return id.substring(id.indexOf('|') + 1); 
      return id; 
    });

    Object.entries(customInputs).forEach(([title, input]) => {
      if (input.key && input.value) {
        outList.push(`${input.key}:${input.value}`);
      }
    });

    const out = outList.join(',');
    onApply(out !== '' ? out : null);
  };

  const groups = [
    { title: 'Environment', icon: Server, items: ENV_ITEMS, defaultExpanded: true },
    { title: 'Identity', icon: Fingerprint, type: 'key-value', items: [] },
    { title: 'Model', icon: BoxIcon, items: MODEL_ITEMS, defaultExpanded: false },
    { title: 'Performance (Latency)', icon: Clock, type: 'range', items: [] },
    { title: 'Performance (Tokens)', icon: Activity, type: 'range', items: [] },
    { title: 'Security', icon: Shield, items: STATUS_ITEMS, defaultExpanded: false },
    { title: 'Evaluation', icon: CheckCircle, items: [{id: 'annotated', label: 'Annotated'}, {id: 'pending', label: 'Pending'}] },
    { title: 'Metadata', icon: Database, type: 'key-value', items: [] },
  ];

  const filteredGroups = groups.map(g => {
    if (!filterSearch) return g;
    const groupMatches = g.title.toLowerCase().includes(filterSearch.toLowerCase());
    const itemsMatch = g.items.some(i => i.label.toLowerCase().includes(filterSearch.toLowerCase()));
    if (groupMatches || itemsMatch) {
      return { ...g, defaultExpanded: true, items: g.items.filter(i => groupMatches || i.label.toLowerCase().includes(filterSearch.toLowerCase())) };
    }
    return null;
  }).filter(Boolean);

  const hasPendingCustomInputs = Object.values(customInputs).some(input => input.key && input.value);
  const isApplyEnabled = pendingChanges > 0 || hasPendingCustomInputs;

  return (
    <Box 
      sx={{ 
        width: width, 
        flexShrink: 0, 
        borderRight: 1, 
        borderColor: 'divider', 
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden'
      }}
    >
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Filter size={16} color="#64748b" />
          <Typography variant="subtitle2" fontWeight={600}>Filters {selectedIds.length > 0 ? `(${selectedIds.length})` : ''}</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton size="small" onClick={() => {}} title="Reset Filters">
            <RotateCcw size={14} />
          </IconButton>
          {onClose && (
            <IconButton size="small" onClick={onClose} title="Collapse Panel">
              <PanelLeftClose size={14} />
            </IconButton>
          )}
        </Box>
      </Box>

      <Box sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: 'divider', bgcolor: 'background.default' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'background.paper', border: 1, borderColor: 'divider', borderRadius: 1, px: 1, py: 0.5 }}>
          <SearchIcon size={14} color="#94a3b8" style={{ marginRight: 8 }} />
          <InputBase 
            placeholder="Search filters..." 
            value={filterSearch} 
            onChange={(e) => setFilterSearch(e.target.value)} 
            sx={{ fontSize: '13px', flex: 1 }}
          />
          {filterSearch && (
            <IconButton size="small" onClick={() => setFilterSearch('')} sx={{ p: 0.25 }}>
              <Typography variant="caption" color="text.secondary">&times;</Typography>
            </IconButton>
          )}
        </Box>
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        {filteredGroups.length > 0 ? (
          filteredGroups.map(g => (
            <AGFilterGroup 
              key={g.title}
              title={g.title}
              icon={g.icon}
              items={g.items}
              type={g.type || 'checkbox'}
              defaultExpanded={g.defaultExpanded}
              selectedCount={
                g.type === 'key-value' 
                  ? selectedIds.filter(id => id.startsWith(`${g.title}|`)).length 
                  : (g.items ? g.items.filter(i => selectedIds.includes(i.id)).length : 0)
              }
              selectedItems={selectedIds}
              onChange={handleCheckboxChange}
              customKey={customInputs[g.title]?.key || ''}
              customValue={customInputs[g.title]?.value || ''}
              onCustomChange={(k, v) => setCustomInputs(prev => ({...prev, [g.title]: { key: k, value: v }}))}
            />
          ))
        ) : (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>No matching filters found.</Typography>
            <Button size="small" onClick={() => setFilterSearch('')}>Clear Search</Button>
          </Box>
        )}
      </Box>

      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5, alignItems: 'center' }}>
          <Typography variant="caption" color="text.secondary">Matching Results</Typography>
          <Typography variant="body2" fontWeight={600}>12,456 traces</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" color="inherit" fullWidth onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" fullWidth onClick={handleApply} disabled={!isApplyEnabled}>
            {pendingChanges > 0 || hasPendingCustomInputs ? `Apply (${pendingChanges + (hasPendingCustomInputs ? 1 : 0)})` : 'Apply'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
