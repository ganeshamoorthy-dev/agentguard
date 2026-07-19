import React, { useState, useMemo } from 'react';
import { Box, Typography, InputBase, IconButton, Collapse } from '@mui/material';
import { Search, ChevronRight, ChevronDown, CheckCircle2, AlertCircle, XCircle, Clock } from 'lucide-react';

const StatusIcon = ({ status }) => {
  switch (status) {
    case 'Passed':
    case 'Success':
      return <CheckCircle2 size={14} color="#10b981" />;
    case 'Review':
    case 'Warning':
      return <AlertCircle size={14} color="#f59e0b" />;
    case 'Blocked':
    case 'Failed':
      return <XCircle size={14} color="#ef4444" />;
    default:
      return <CheckCircle2 size={14} color="#10b981" />;
  }
};

const flattenSpans = (spans, depth = 0, parentId = null) => {
  let flatList = [];
  spans.forEach(span => {
    flatList.push({ ...span, depth, parentId });
    if (span.children && span.children.length > 0) {
      flatList = flatList.concat(flattenSpans(span.children, depth + 1, span.id));
    }
  });
  return flatList;
};

export default function TraceSpanTree({ spans, selectedSpanId, onSelectSpan }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expanded, setExpanded] = useState({});

  // Flatten the tree on mount/update
  const flatSpans = useMemo(() => flattenSpans(spans), [spans]);

  // Expand all by default or expand to selected
  useMemo(() => {
    const initialExpanded = {};
    flatSpans.forEach(span => {
      initialExpanded[span.id] = true;
    });
    setExpanded(initialExpanded);
  }, [flatSpans]);

  const toggleExpand = (id, e) => {
    e.stopPropagation();
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredSpans = useMemo(() => {
    if (!searchQuery) return flatSpans;
    return flatSpans.filter(span => span.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [flatSpans, searchQuery]);

  // To support proper tree rendering with collapse, we can render recursively
  // But flattened list is easier for search and virtualization.
  // We'll map the flattened list, but skip rendering if a parent is collapsed.
  const visibleSpans = [];
  let hideDepth = -1;

  filteredSpans.forEach(span => {
    if (hideDepth !== -1 && span.depth > hideDepth) {
      return; // Skip children of collapsed parent
    }
    if (hideDepth !== -1 && span.depth <= hideDepth) {
      hideDepth = -1; // Reset when we reach a sibling or higher level
    }

    visibleSpans.push(span);

    if (!expanded[span.id] && span.children && span.children.length > 0 && hideDepth === -1) {
      hideDepth = span.depth;
    }
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', borderRight: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'action.hover', borderRadius: 1, px: 1, py: 0.5 }}>
          <Search size={16} style={{ color: 'var(--mui-palette-text-secondary)', marginRight: 8 }} />
          <InputBase
            placeholder="Search spans..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ flex: 1, fontSize: '0.85rem' }}
          />
        </Box>
      </Box>
      
      <Box sx={{ flex: 1, overflowY: 'auto', p: 1 }}>
        {visibleSpans.map((span) => {
          const isSelected = selectedSpanId === span.id;
          const hasChildren = span.children && span.children.length > 0;
          
          return (
            <Box
              key={span.id}
              onClick={() => onSelectSpan(span)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                py: 0.75,
                pr: 1,
                pl: `${span.depth * 16 + 8}px`,
                cursor: 'pointer',
                borderRadius: 1,
                bgcolor: isSelected ? 'action.selected' : 'transparent',
                '&:hover': {
                  bgcolor: isSelected ? 'action.selected' : 'action.hover',
                }
              }}
            >
              <Box sx={{ width: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 0.5 }}>
                {hasChildren ? (
                  <IconButton size="small" onClick={(e) => toggleExpand(span.id, e)} sx={{ p: 0 }}>
                    {expanded[span.id] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </IconButton>
                ) : (
                  <Box sx={{ width: 14 }} />
                )}
              </Box>
              
              <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                <StatusIcon status={span.status} />
              </Box>
              
              <Typography 
                variant="body2" 
                sx={{ 
                  flex: 1, 
                  fontWeight: isSelected ? 600 : 400,
                  color: isSelected ? 'primary.main' : 'text.primary',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontSize: '0.8rem'
                }}
              >
                {span.name}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', gap: 0.5 }}>
                <Clock size={12} />
                <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                  {(span.latency / 1000).toFixed(2)}s
                </Typography>
              </Box>
            </Box>
          );
        })}
        {visibleSpans.length === 0 && (
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
            No spans found.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
