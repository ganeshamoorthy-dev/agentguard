import React from 'react';
import { Box, Typography, Button, IconButton, Divider } from '@mui/material';
import { PanelLeftClose, Filter, RotateCcw } from 'lucide-react';
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

export default function AGFilterPanel({ width = 300, onClose, onApply }) {
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
          <Typography variant="subtitle2" fontWeight={600}>Filters</Typography>
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

      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <AGFilterGroup title="Environment" items={ENV_ITEMS} defaultExpanded={true} />
        <AGFilterGroup title="Identity" type="key-value" />
        <AGFilterGroup title="Model" items={MODEL_ITEMS} defaultExpanded={true} />
        <AGFilterGroup title="Performance (Latency)" type="range" />
        <AGFilterGroup title="Performance (Tokens)" type="range" />
        <AGFilterGroup title="Security" items={STATUS_ITEMS} defaultExpanded={true} />
        <AGFilterGroup title="Evaluation" items={[{id: 'annotated', label: 'Annotated'}, {id: 'pending', label: 'Pending'}]} />
        <AGFilterGroup title="Metadata" type="key-value" />
      </Box>

      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
        <Button variant="contained" color="primary" fullWidth onClick={onApply}>
          Apply Filters
        </Button>
      </Box>
    </Box>
  );
}
