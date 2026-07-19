import React, { useState } from 'react';
import { Box, Typography, Button, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { Activity, Shield, Database, AlignLeft, Code, Coins, Share, Play, AlertCircle } from 'lucide-react';
import PageHeader from '../../../components/PageHeader';

import AGTraceSummary from './investigation/AGTraceSummary';
import AGExecutionFlow from './investigation/AGExecutionFlow';
import AGInformationCard from './investigation/AGInformationCard';
import AGSecurityCard from './investigation/AGSecurityCard';
import AGEvaluationCard from './investigation/AGEvaluationCard';
import AGUsageBreakdown from './investigation/AGUsageBreakdown';
import AGMetadataViewer from './investigation/AGMetadataViewer';
import AGPromptViewer from './investigation/AGPromptViewer';
import AGSectionCard from './investigation/AGSectionCard';

export default function TraceDetailWorkspace({ trace, onBack }) {
  const [isMetadataJson, setIsMetadataJson] = useState(false);

  if (!trace) return null;

  const rootSpan = trace.spans?.[0] || {};

  const headerActions = (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Button size="small" variant="outlined" color="inherit" onClick={onBack}>Back</Button>
      <Button size="small" variant="outlined" color="inherit" startIcon={<Play size={14} />}>Replay</Button>
      <Button size="small" variant="outlined" color="inherit" startIcon={<Share size={14} />}>Export</Button>
    </Box>
  );

  const metadataAction = (
    <ToggleButtonGroup
      size="small"
      value={isMetadataJson ? 'json' : 'formatted'}
      exclusive
      onChange={(e, newValue) => {
        if (newValue !== null) setIsMetadataJson(newValue === 'json');
      }}
      sx={{ height: 28 }}
    >
      <ToggleButton value="formatted" sx={{ px: 1.5, py: 0.5, fontSize: '0.75rem', textTransform: 'none', fontWeight: 600 }}>Formatted</ToggleButton>
      <ToggleButton value="json" sx={{ px: 1.5, py: 0.5, fontSize: '0.75rem', textTransform: 'none', fontWeight: 600 }}>JSON</ToggleButton>
    </ToggleButtonGroup>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)', overflowY: 'auto', margin: '-30px -36px -40px', bgcolor: 'background.default' }}>
      
      {/* Header */}
        <PageHeader 
          breadcrumbs={['Observability', { label: 'Trace Explorer', onClick: onBack }, trace.id]}
          title={trace.name}
          actions={headerActions}
        />
      <Box sx={{ p: 5 }}>
        
        {/* Execution Flow */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Execution Flow</Typography>
          <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, border: 1, borderColor: 'divider', overflow: 'hidden' }}>
            <AGExecutionFlow spans={trace.spans} />
          </Box>
        </Box>

        {/* 2-Column Flex Layout */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, alignItems: 'stretch' }}>
          
          {/* Row 1 */}
          <Box sx={{ flex: '1 1 420px', minWidth: 0 }}>
            <AGSectionCard id="summary" title="Trace Summary" icon={Activity} defaultExpanded={true}>
              <AGTraceSummary trace={trace} />
            </AGSectionCard>
          </Box>
          <Box sx={{ flex: '1 1 420px', minWidth: 0 }}>
            <AGSectionCard id="information" title="Information" icon={AlignLeft} defaultExpanded={true}>
              <AGInformationCard input={trace.input} output={trace.output} />
            </AGSectionCard>
          </Box>

          {/* Row 2 */}
          <Box sx={{ flex: '1 1 420px', minWidth: 0 }}>
            <AGSectionCard id="security" title="Security Analysis" icon={Shield} defaultExpanded={true}>
              <AGSecurityCard events={rootSpan.securityEvents} />
            </AGSectionCard>
          </Box>
          <Box sx={{ flex: '1 1 420px', minWidth: 0 }}>
            <AGSectionCard id="evaluation" title="Evaluations" icon={AlertCircle} defaultExpanded={true}>
              <AGEvaluationCard evaluations={rootSpan.evaluations} />
            </AGSectionCard>
          </Box>

          {/* Row 3 */}
          <Box sx={{ flex: '1 1 420px', minWidth: 0 }}>
            <AGSectionCard id="usage" title="Usage & Cost" icon={Coins} defaultExpanded={true}>
              <AGUsageBreakdown tokens={rootSpan.tokens} cost={trace.cost} latency={trace.latency} />
            </AGSectionCard>
          </Box>
          <Box sx={{ flex: '1 1 420px', minWidth: 0 }}>
            <AGSectionCard id="metadata" title="Metadata" icon={Database} action={metadataAction} defaultExpanded={true}>
              <AGMetadataViewer 
                metadata={{
                  ...rootSpan.metadata,
                  user_context: {
                    role: 'admin',
                    permissions: ['read', 'write', 'delete'],
                    settings: { theme: 'dark', timezone: 'UTC' }
                  },
                  system_info: {
                    node_version: 'v18.17.0',
                    platform: 'linux',
                    resources: { cpu: '45%', ram: '2.4GB' }
                  }
                }} 
                isJson={isMetadataJson} 
              />
            </AGSectionCard>
          </Box>

          {/* Row 4 */}
          <Box sx={{ flex: '1 1 420px', minWidth: 0 }}>
            <AGSectionCard id="json" title="Raw JSON" icon={Code} defaultExpanded={true}>
              <AGPromptViewer content={trace} />
            </AGSectionCard>
          </Box>
          
        </Box>
        
        <Box sx={{ height: 100 }} /> {/* Bottom padding */}
      </Box>
    </Box>
  );
}
