import React, { useState } from 'react';
import { Box, Typography, Paper, Switch, Tabs, Tab, CircularProgress, Toolbar, Breadcrumbs, Link, LinearProgress, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Info, Lock, ShieldAlert, AlertTriangle, Key, List, Code, Search } from 'lucide-react';
import PageHeader from '../../../components/PageHeader';

const IconMap = {
  lock: Lock,
  shield: ShieldAlert,
  alert: AlertTriangle,
  key: Key,
  list: List,
  code: Code
};

const IconColorMap = {
  lock: '#6366f1',
  shield: '#10b981',
  alert: '#ef4444',
  key: '#f59e0b',
  list: '#8b5cf6',
  code: '#3b82f6'
};

const GuardrailCard = ({ guardrail, onToggle }) => {
  const [isToggling, setIsToggling] = useState(false);
  const Icon = IconMap[guardrail.iconType] || ShieldAlert;

  const handleToggle = async () => {
    setIsToggling(true);
    await onToggle(guardrail.id, !guardrail.active);
    setIsToggling(false);
  };

  return (
    <Paper variant="outlined" sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
        <Box sx={{ 
          width: 48, height: 48, borderRadius: 3, 
          bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
          border: '1px solid', borderColor: 'divider', 
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          mr: 2, flexShrink: 0
        }}>
          <Icon size={26} style={{ color: IconColorMap[guardrail.iconType] || '#3b82f6' }} />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1" fontWeight={700} sx={{ lineHeight: 1.3, color: 'text.primary', letterSpacing: '-0.01em' }}>
            {guardrail.name}
          </Typography>
          <Typography variant="caption" color="primary.main" fontWeight={600} sx={{ mt: 0.5, display: 'block' }}>
            {guardrail.provider}
          </Typography>
        </Box>
        <Box sx={{ bgcolor: 'action.hover', px: 1, py: 0.5, borderRadius: 1 }}>
          <Typography variant="caption" color="text.secondary" fontWeight={600}>{guardrail.timeline}</Typography>
        </Box>
      </Box>
      
      <Typography variant="body2" sx={{ color: (theme) => theme.palette.mode === 'dark' ? '#94a3b8' : '#64748b', mb: 3, flexGrow: 1, lineHeight: 1.5, fontSize: '0.85rem' }}>
        {guardrail.description}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
        <Box sx={{ bgcolor: (theme) => theme.palette.mode === 'dark' ? 'action.hover' : '#f8fafc', px: 1.5, py: 0.5, borderRadius: 1 }}>
          <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ color: (theme) => theme.palette.mode === 'dark' ? '#cbd5e1' : '#64748b' }}>
            {guardrail.scope}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isToggling && <CircularProgress size={16} sx={{ mr: 1 }} />}
          <Switch 
            checked={guardrail.active} 
            onChange={handleToggle} 
            disabled={isToggling}
            color="primary"
            size="small"
          />
        </Box>
      </Box>
    </Paper>
  );
};

const KPICard = ({ title, value, subtext, valueColor }) => (
  <Paper variant="outlined" sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%', borderRadius: 2 }}>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
      {title}
    </Typography>
    <Typography variant="h4" fontWeight={700} sx={{ color: valueColor || 'text.primary', mb: 1, fontFamily: 'serif' }}>
      {value}
    </Typography>
    <Typography variant="caption" color="text.secondary">
      {subtext}
    </Typography>
  </Paper>
);

const ProgressBarMetric = ({ label, value, color, max = 150 }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
      <Typography variant="body2" fontWeight={600}>{value}</Typography>
    </Box>
    <LinearProgress 
      variant="determinate" 
      value={max > 0 ? (value / max) * 100 : 0} 
      sx={{ 
        height: 8, 
        borderRadius: 4,
        bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
        '& .MuiLinearProgress-bar': { bgcolor: color, borderRadius: 4 }
      }} 
    />
  </Box>
);

export default function Guardrails({ guardrails, metrics, traces, onToggle }) {
  const [activeTab, setActiveTab] = useState(0);
  const activeCount = guardrails.filter(g => g.active).length;

  const totalBlocked = metrics ? metrics.timeline.reduce((acc, curr) => acc + curr.blocked, 0) : 0;
  const totalRedacted = metrics ? metrics.timeline.reduce((acc, curr) => acc + curr.redacted, 0) : 0;
  const totalFlagged = metrics ? metrics.timeline.reduce((acc, curr) => acc + curr.flagged, 0) : 0;
  const totalActions = totalBlocked + totalRedacted + totalFlagged || 1;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)', overflow: 'hidden', margin: '-30px -36px -40px' }}>
      
      <PageHeader 
        breadcrumbs={['Workspace', 'Guardrails']}
        title="Guardrails"
        description="Enable guardrails to activate them in the AgentGuard Gateway. Active guardrails run inline on every request."
      />

      {/* PageContent */}
      <Box sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', pl: 8, pr: 4.5, py: 3, bgcolor: 'background.default' }}>
        <Box sx={{ maxWidth: 1600, margin: '0 auto', display: 'flex', flexDirection: 'column' }}>

      <Box sx={{ 
        bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(59, 130, 246, 0.1)' : '#eff6ff', 
        border: '1px solid', borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(59, 130, 246, 0.2)' : '#bfdbfe',
        color: (theme) => theme.palette.mode === 'dark' ? '#60a5fa' : '#1e3a8a', 
        p: 2, borderRadius: 1, mb: 3, display: 'flex', alignItems: 'center' 
      }}>
        <Info size={18} style={{ marginRight: '12px', flexShrink: 0 }} />
        <Typography variant="body2">
          <strong>{activeCount} guardrails active</strong> in the gateway right now. Toggling a guardrail here applies the change to the running LiteLLM gateway within seconds — no redeploy needed.
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} sx={{ minHeight: 36, '& .MuiTab-root': { minHeight: 36, py: 1, px: 2, fontSize: '0.85rem', textTransform: 'none', fontWeight: 600 } }}>
          <Tab label="Catalog" />
          <Tab label="Traces" />
          <Tab label="Metrics" />
        </Tabs>
      </Box>

      {activeTab === 0 && (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 3 }}>
          {guardrails.map(g => (
            <GuardrailCard key={g.id} guardrail={g} onToggle={onToggle} />
          ))}
        </Box>
      )}

      {activeTab === 1 && traces && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ 
            bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(59, 130, 246, 0.1)' : '#eff6ff', 
            border: '1px solid', borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(59, 130, 246, 0.2)' : '#bfdbfe',
            color: (theme) => theme.palette.mode === 'dark' ? '#60a5fa' : '#1e3a8a', 
            p: 2, borderRadius: 1, display: 'flex', alignItems: 'center' 
          }}>
            <Search size={18} style={{ marginRight: '12px', flexShrink: 0 }} />
            <Typography variant="body2">
              Every finding is a <strong>GUARDRAIL observation on its trace</strong> — the same data the Trace Explorer shows, filtered to findings. Click a row to open the trace. (Raw values are never stored — masked previews only.)
            </Typography>
          </Box>
          <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} size="medium">
                <TableHead sx={{ bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : '#f8fafc' }}>
                  <TableRow>
                    <TableCell sx={{ py: 1.5, fontWeight: 700, color: 'text.secondary', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TIME</TableCell>
                    <TableCell sx={{ py: 1.5, fontWeight: 700, color: 'text.secondary', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>GUARDRAIL</TableCell>
                    <TableCell sx={{ py: 1.5, fontWeight: 700, color: 'text.secondary', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>FINDING</TableCell>
                    <TableCell sx={{ py: 1.5, fontWeight: 700, color: 'text.secondary', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>DECISION</TableCell>
                    <TableCell sx={{ py: 1.5 }} align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {traces.map((row) => (
                    <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: 'action.hover' } }}>
                      <TableCell sx={{ py: 1.5, color: 'text.secondary', fontSize: '0.85rem' }}>{row.time}</TableCell>
                      <TableCell sx={{ py: 1.5, color: 'text.secondary', fontSize: '0.85rem' }}>{row.guardrail}</TableCell>
                      <TableCell sx={{ py: 1.5, color: 'text.secondary', fontSize: '0.85rem' }}>{row.finding}</TableCell>
                      <TableCell sx={{ py: 1.5 }}>
                        <Box sx={{ 
                          display: 'inline-flex', px: 1, py: 0.25, borderRadius: 1, 
                          border: '1px solid',
                          borderColor: row.decision === 'BLOCKED' ? '#dc2626' : row.decision === 'REDACTED' ? '#16a34a' : '#ca8a04',
                          color: row.decision === 'BLOCKED' ? '#dc2626' : row.decision === 'REDACTED' ? '#16a34a' : '#ca8a04',
                          fontWeight: 700, fontSize: '0.65rem', letterSpacing: 0.5
                        }}>
                          {row.decision}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ py: 1.5 }} align="right">
                        <Button variant="outlined" size="small" color="inherit" sx={{ fontSize: '0.75rem', py: 0.25 }}>View trace</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      )}

      {activeTab === 2 && metrics && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Top KPIs */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' }, gap: 3 }}>
            <KPICard title="Findings (7d)" value={metrics.findings} subtext="across 3 active guardrails" />
            <KPICard title="Block rate" value={`${metrics.blockRate}%`} subtext="rest redacted / flagged" />
            <KPICard title="Avg added latency" value={`+${metrics.avgLatency}ms`} subtext="p95 gateway overhead" />
            <KPICard title="PII redactions" value={metrics.piiRedactions} subtext="caught at gateway" valueColor="#10b981" />
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr 1fr' }, gap: 3 }}>
            {/* Left: Action Breakdown */}
            <Paper variant="outlined" sx={{ p: 3, display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
              <Typography variant="subtitle1" fontWeight={700} fontFamily="serif" sx={{ mb: 3 }}>Action breakdown (7d)</Typography>
              
              <Box sx={{ display: 'flex', height: 12, borderRadius: 6, overflow: 'hidden', mb: 4, bgcolor: 'action.hover' }}>
                <Box sx={{ width: `${(totalBlocked / totalActions) * 100}%`, bgcolor: '#ef4444' }} />
                <Box sx={{ width: `${(totalRedacted / totalActions) * 100}%`, bgcolor: '#10b981' }} />
                <Box sx={{ width: `${(totalFlagged / totalActions) * 100}%`, bgcolor: '#f59e0b' }} />
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1, justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: 1, bgcolor: '#ef4444' }} />
                    <Typography variant="body2" color="text.secondary" fontWeight={500}>Blocked</Typography>
                  </Box>
                  <Typography variant="body2" fontWeight={700}>{totalBlocked}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: 1, bgcolor: '#10b981' }} />
                    <Typography variant="body2" color="text.secondary" fontWeight={500}>Redacted</Typography>
                  </Box>
                  <Typography variant="body2" fontWeight={700}>{totalRedacted}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: 1, bgcolor: '#f59e0b' }} />
                    <Typography variant="body2" color="text.secondary" fontWeight={500}>Flagged</Typography>
                  </Box>
                  <Typography variant="body2" fontWeight={700}>{totalFlagged}</Typography>
                </Box>
              </Box>
            </Paper>

            {/* Middle: Findings by Guardrail */}
            <Paper variant="outlined" sx={{ p: 3, display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
              <Typography variant="subtitle1" fontWeight={700} fontFamily="serif" sx={{ mb: 3 }}>Findings by guardrail</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, flexGrow: 1, justifyContent: 'center' }}>
                {metrics.byGuardrail.map(g => (
                  <ProgressBarMetric key={g.label} label={g.label} value={g.value} color={g.color} max={Math.max(...metrics.byGuardrail.map(m=>m.value))} />
                ))}
              </Box>
            </Paper>

            {/* Right: Top Entities */}
            <Paper variant="outlined" sx={{ p: 3, display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
              <Typography variant="subtitle1" fontWeight={700} fontFamily="serif" sx={{ mb: 3 }}>Top entity types (PII)</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, flexGrow: 1, justifyContent: 'center' }}>
                {metrics.topEntities.map(e => (
                  <ProgressBarMetric key={e.label} label={e.label} value={e.value} color="#3b82f6" max={Math.max(...metrics.topEntities.map(m=>m.value))} />
                ))}
              </Box>
            </Paper>
          </Box>

        </Box>
      )}
        </Box>
      </Box>
    </Box>
  );
}


