import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Switch, Slider, Chip, Divider, Dialog, DialogTitle, DialogContent, DialogActions, Grid, Alert, Tabs, Tab, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, Copy, ArrowRight, Settings2, Activity, Search } from 'lucide-react';
import PageHeader from '../../../components/PageHeader';

// Dummy entities
const ENTITY_CATEGORIES = {
  Personal: ['EMAIL_ADDRESS', 'PHONE_NUMBER', 'PERSON', 'LOCATION'],
  Financial: ['CREDIT_CARD', 'IBAN_CODE', 'CRYPTO'],
  Government: ['US_SSN', 'PASSPORT'],
  Network: ['IP_ADDRESS', 'MAC_ADDRESS']
};

const StatusChip = ({ active, label }) => (
  <Box sx={{ 
    display: 'inline-flex', alignItems: 'center', px: 1, py: 0.25, borderRadius: 1, 
    border: '1px solid',
    borderColor: active ? 'success.main' : 'error.main',
    color: active ? 'success.main' : 'error.main',
    bgcolor: 'transparent',
    fontWeight: 700, fontSize: '0.65rem', letterSpacing: 0.5, textTransform: 'uppercase'
  }}>
    {label || (active ? 'ON' : 'OFF')}
  </Box>
);

const MetricRow = ({ label, value, renderValue }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
    <Typography variant="body2" color="text.secondary">{label}</Typography>
    <Box sx={{ textAlign: 'right' }}>
      {renderValue ? renderValue() : <Typography variant="body2" fontWeight={600} color="text.primary">{value}</Typography>}
    </Box>
  </Box>
);

const KPICard = ({ title, value, subtext, valueColor }) => (
  <Paper variant="outlined" sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%', borderRadius: 2 }}>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{title}</Typography>
    <Typography variant="h4" fontWeight={700} sx={{ color: valueColor || 'text.primary', mb: 1, fontFamily: 'serif' }}>{value}</Typography>
    <Typography variant="caption" color="text.secondary">{subtext}</Typography>
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

export default function GuardrailDetailWorkspace({ metrics, traces }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isEditing, setIsEditing] = useState(false);
  const [active, setActive] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  const totalBlocked = metrics ? metrics.timeline.reduce((acc, curr) => acc + curr.blocked, 0) : 0;
  const totalRedacted = metrics ? metrics.timeline.reduce((acc, curr) => acc + curr.redacted, 0) : 0;
  const totalFlagged = metrics ? metrics.timeline.reduce((acc, curr) => acc + curr.flagged, 0) : 0;
  const totalActions = totalBlocked + totalRedacted + totalFlagged || 1;
  const [selectedEntities, setSelectedEntities] = useState(['EMAIL_ADDRESS', 'PHONE_NUMBER', 'CREDIT_CARD', 'US_SSN', 'PERSON', 'IP_ADDRESS']);
  const [action, setAction] = useState('Redact'); // Redact, Reject, Audit
  const [confidence, setConfidence] = useState(0.5);
  
  const [scopeInput, setScopeInput] = useState(true);
  const [scopeOutput, setScopeOutput] = useState(false);
  const [envProd, setEnvProd] = useState(false);
  const [envStg, setEnvStg] = useState(true);
  const [envDev, setEnvDev] = useState(true);

  const [testInput, setTestInput] = useState("Hi, I'm Rahul Menon. Reach me at rahul@xploro.io or +91-98765-43210. My card is 4111 1111 1111 1111.");

  const toggleEntity = (ent) => {
    setSelectedEntities(prev => prev.includes(ent) ? prev.filter(e => e !== ent) : [...prev, ent]);
  };

  const getProcessedPlayground = () => {
    let output = testInput;
    let findings = [];
    
    if (selectedEntities.includes('EMAIL_ADDRESS') && output.includes('rahul@xploro.io')) {
      findings.push({ text: 'rahul@xploro.io', type: 'EMAIL_ADDRESS' });
      output = output.replace('rahul@xploro.io', action === 'Redact' ? '<EMAIL_ADDRESS>' : 'rahul@xploro.io');
    }
    if (selectedEntities.includes('PHONE_NUMBER') && output.includes('+91-98765-43210')) {
      findings.push({ text: '+91-98765-43210', type: 'PHONE_NUMBER' });
      output = output.replace('+91-98765-43210', action === 'Redact' ? '<PHONE_NUMBER>' : '+91-98765-43210');
    }
    if (selectedEntities.includes('CREDIT_CARD') && output.includes('4111 1111 1111 1111')) {
      findings.push({ text: '4111 1111 1111 1111', type: 'CREDIT_CARD' });
      output = output.replace('4111 1111 1111 1111', action === 'Redact' ? '<CREDIT_CARD>' : '4111 1111 1111 1111');
    }
    if (selectedEntities.includes('PERSON') && output.includes('Rahul Menon')) {
      findings.push({ text: 'Rahul Menon', type: 'PERSON' });
      output = output.replace('Rahul Menon', action === 'Redact' ? '<PERSON>' : 'Rahul Menon');
    }

    if (action === 'Reject' && findings.length > 0) {
      output = "ERROR 400: Request blocked by PII Guardrail.";
    }

    return { output, findings };
  };

  const { output, findings } = getProcessedPlayground();
  const handleBack = () => navigate('/security/guardrails');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)', overflow: 'hidden', margin: '-30px -36px -40px' }}>
      
      <PageHeader 
        breadcrumbs={['Security', { label: 'Guardrails', onClick: handleBack }, 'PII Redaction']}
        title="PII Redaction"
        description="Microsoft Presidio · Runs inline in gateway"
        actions={
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="contained" color="primary" size="small" startIcon={<Settings2 size={14}/>} onClick={() => setIsEditing(true)}>
              Edit Configuration
            </Button>
          </Box>
        }
      />

      {/* Main View Area */}
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden', bgcolor: 'background.default', p: 4 }}>
        <Box sx={{ width: '100%', maxWidth: 1600, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 4, flex: 1, overflowY: 'auto', pr: 1, pb: 4 }}>
          
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 1, flexShrink: 0 }}>
            <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} sx={{ minHeight: 36, '& .MuiTab-root': { minHeight: 36, py: 1, px: 2, fontSize: '0.85rem', textTransform: 'none', fontWeight: 600 } }}>
              <Tab label="Configuration & Test" />
              <Tab label="Traces" />
              <Tab label="Metrics" />
            </Tabs>
          </Box>

          <Box sx={{ flex: 1, overflowY: 'auto', pr: 1, pb: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {activeTab === 0 && (
              <>
                {active && (
                  <Alert severity="success" sx={{ borderRadius: 2, flexShrink: 0 }}>
                    <Typography variant="body2" fontWeight={600}>Active in gateway.</Typography>
                    <Typography variant="body2">Every request through my-lite-llm is scanned for the selected entity types.</Typography>
                  </Alert>
                )}

            
            {/* Top Row: Summary Cards */}
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'stretch', flexDirection: { xs: 'column', md: 'row' }, flexShrink: 0 }}>
              
              {/* Summary Card */}
              <Paper variant="outlined" sx={{ flex: 1, p: 3, borderRadius: 2, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                  <Activity size={18} style={{ color: 'var(--mui-palette-text-secondary)' }} />
                  <Typography variant="subtitle1" fontWeight={700}>Guardrail Summary</Typography>
                </Box>

                <MetricRow label="Status" renderValue={() => <StatusChip active={active} label={active ? 'ACTIVE' : 'DISABLED'} />} />
                <MetricRow label="Provider" value="Microsoft Presidio" />
                <MetricRow label="Mode" value={action} />
                <MetricRow label="Confidence Threshold" value={`${(confidence * 100).toFixed(0)}%`} />
              </Paper>

              {/* Scope & Environments Card */}
              <Paper variant="outlined" sx={{ flex: 1, p: 3, borderRadius: 2, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                  <Settings2 size={18} style={{ color: 'var(--mui-palette-text-secondary)' }} />
                  <Typography variant="subtitle1" fontWeight={700}>Scope & Environments</Typography>
                </Box>

                <MetricRow label="Input Scope" renderValue={() => <StatusChip active={scopeInput} />} />
                <MetricRow label="Output Scope" renderValue={() => <StatusChip active={scopeOutput} />} />
                
                <Box sx={{ my: 2 }}><Divider /></Box>
                
                <MetricRow label="PROD Environment" renderValue={() => <StatusChip active={envProd} />} />
                <MetricRow label="STG Environment" renderValue={() => <StatusChip active={envStg} />} />
                <MetricRow label="DEV Environment" renderValue={() => <StatusChip active={envDev} />} />
              </Paper>

              {/* Supported Entities Card */}
              <Paper variant="outlined" sx={{ flex: 1, p: 3, borderRadius: 2, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                  <Copy size={18} style={{ color: 'var(--mui-palette-text-secondary)' }} />
                  <Typography variant="subtitle1" fontWeight={700}>Protected Entities</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Showing {selectedEntities.length} active out of {Object.values(ENTITY_CATEGORIES).flat().length} supported entities.
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                  {Object.entries(ENTITY_CATEGORIES).map(([cat, entities]) => (
                    <Box key={cat}>
                      <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ display: 'block', mb: 1, textTransform: 'uppercase', letterSpacing: 0.5 }}>{cat}</Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {entities.map(ent => {
                          const isSelected = selectedEntities.includes(ent);
                          return (
                            <Chip
                              key={ent}
                              label={ent}
                              size="small"
                              variant="outlined"
                              sx={{ 
                                borderRadius: 6, fontWeight: 600,
                                bgcolor: 'transparent',
                                color: isSelected ? 'primary.main' : 'text.disabled',
                                borderColor: isSelected ? 'primary.main' : 'divider',
                              }}
                            />
                          );
                        })}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Paper>

            </Box>

            {/* Bottom: Live Playground */}
          <Paper variant="outlined" sx={{ width: '100%', flexShrink: 0, borderRadius: 2, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider', bgcolor: (theme) => theme.palette.mode === 'dark' ? 'background.default' : '#f8fafc', borderTopLeftRadius: 8, borderTopRightRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>Live Playground</Typography>
                <Typography variant="body2" color="text.secondary">Test how this guardrail transforms prompts using the active configuration.</Typography>
              </Box>
              <Button 
                variant="contained" 
                color="primary" 
                endIcon={<ArrowRight size={16} strokeWidth={2.5} />}
                sx={{ 
                  borderRadius: 6, px: 3, py: 1, 
                  fontWeight: 700, letterSpacing: 0.5, 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)' 
                }}
              >
                SEND TO MODEL
              </Button>
            </Box>
            
            <Box sx={{ p: 4, flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
              
              {/* Input Section */}
              <Box>
                <Typography variant="overline" fontWeight={700} color="text.secondary" sx={{ display: 'block', mb: 1, letterSpacing: 1 }}>User Request</Typography>
                <Box 
                  component="textarea"
                  value={testInput}
                  onChange={(e) => setTestInput(e.target.value)}
                  sx={{ 
                    width: '100%', minHeight: 100, p: 2, borderRadius: 2, 
                    border: '1px solid', borderColor: 'divider', 
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.2)' : '#fff', 
                    color: 'text.primary', fontFamily: 'inherit', fontSize: '14px', resize: 'vertical',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                    '&:focus': { outline: 'none', borderColor: 'primary.main', border: '2px solid', p: '15px' }
                  }}
                />
              </Box>



              {/* Output Section */}
              <Box>
                <Typography variant="overline" fontWeight={700} color="text.secondary" sx={{ display: 'block', mb: 1, letterSpacing: 1 }}>Model Receives</Typography>
                <Box sx={{ 
                  width: '100%', minHeight: 100, p: 2, borderRadius: 2, 
                  border: '1px solid', borderColor: action === 'Reject' && findings.length > 0 ? 'error.main' : 'divider', 
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : '#f8fafc', 
                  color: 'text.primary', fontSize: '14px',
                  whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                }}>
                  {action === 'Redact' ? (
                    output.split(/(<[^>]+>)/).map((part, i) => {
                      if (part.startsWith('<') && part.endsWith('>')) {
                        return <Box component="span" key={i} sx={{ bgcolor: 'transparent', color: 'primary.main', border: '1px solid', borderColor: 'primary.main', px: 1, py: 0.25, borderRadius: 1, fontSize: '12px', fontWeight: 700, mx: 0.5 }}>{part.slice(1, -1)}</Box>;
                      }
                      return part;
                    })
                  ) : (
                    <Typography variant="body2" color={action === 'Reject' && findings.length > 0 ? 'error.main' : 'text.primary'} fontWeight={action === 'Reject' && findings.length > 0 ? 600 : 400}>{output}</Typography>
                  )}
                </Box>
              </Box>

              {/* Findings Section */}
              {findings.length > 0 && (
                <Box sx={{ mt: 1, pt: 3, borderTop: '1px dashed', borderColor: 'divider' }}>
                  <Typography variant="overline" fontWeight={700} color="text.secondary" sx={{ display: 'block', mb: 1.5, letterSpacing: 1 }}>Detection Log ({findings.length})</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    {findings.map((f, i) => (
                      <Paper key={i} variant="outlined" sx={{ 
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                        p: 1.5, borderRadius: 2, 
                        bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.2)' : '#fff',
                        transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }
                      }}>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 600 }}>{f.text}</Typography>
                        <Chip label={f.type} size="small" variant="outlined" sx={{ height: 24, fontSize: '11px', fontWeight: 700, color: 'primary.main', borderColor: 'primary.main' }} />
                      </Paper>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Paper>
              </>
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

      {/* Edit Configuration Dialog */}
      <Dialog open={isEditing} onClose={() => setIsEditing(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, borderBottom: 1, borderColor: 'divider', pb: 2, bgcolor: 'background.default' }}>Edit Configuration</DialogTitle>
        <DialogContent sx={{ p: 3, bgcolor: 'background.default' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {/* Status Card */}
            <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="subtitle2" fontWeight={700}>Enable Guardrail</Typography>
                <Typography variant="body2" color="text.secondary">Run this guardrail inline on all requests in the gateway.</Typography>
              </Box>
              <Switch checked={active} onChange={(e) => setActive(e.target.checked)} color="primary" />
            </Paper>

            {/* Row 1: Entity Types & Action */}
            <Box sx={{ display: 'flex', gap: 2.5, flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'stretch' }}>
              
              {/* Entity Types Card */}
              <Paper variant="outlined" sx={{ flex: 1, p: 2.5, borderRadius: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 0.5 }}>Entity types</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Select categories of personal data to detect.</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {Object.entries(ENTITY_CATEGORIES).map(([cat, entities]) => (
                    <Box key={cat}>
                      <Typography variant="caption" fontWeight={700} color="text.primary" sx={{ display: 'block', mb: 1, textTransform: 'uppercase', letterSpacing: 0.5 }}>{cat}</Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {entities.map(ent => (
                          <Chip
                            key={ent}
                            label={ent}
                            onClick={() => toggleEntity(ent)}
                            variant="outlined"
                            sx={{ 
                              borderRadius: 6, fontWeight: 600,
                              bgcolor: 'transparent',
                              color: selectedEntities.includes(ent) ? 'primary.main' : 'text.secondary',
                              borderColor: selectedEntities.includes(ent) ? 'primary.main' : 'divider',
                              '&:hover': { bgcolor: 'action.hover' }
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Paper>

              {/* Action Card */}
              <Paper variant="outlined" sx={{ flex: 1, p: 2.5, borderRadius: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 0.5 }}>Action on detection</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>What the gateway does when PII is found.</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, flex: 1, justifyContent: 'space-between' }}>
                  {[
                    { id: 'Redact', title: 'Redact', desc: 'Replace detected PII with a token.' },
                    { id: 'Reject', title: 'Reject', desc: 'Block the request entirely and return 400.' },
                    { id: 'Audit', title: 'Audit only', desc: 'Log detections but pass request through unchanged.' }
                  ].map(act => (
                    <Paper 
                      key={act.id}
                      variant="outlined"
                      onClick={() => setAction(act.id)}
                      sx={{ 
                        p: 1.5, display: 'flex', gap: 2, cursor: 'pointer', borderRadius: 2,
                        bgcolor: 'transparent',
                        borderColor: action === act.id ? 'primary.main' : 'divider',
                        color: action === act.id ? 'primary.main' : 'inherit',
                        '&:hover': { borderColor: action === act.id ? 'primary.main' : 'text.secondary' }
                      }}
                    >
                      <Box sx={{ pt: 0.25 }}>
                        <Box sx={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid', borderColor: action === act.id ? 'primary.main' : 'text.disabled', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {action === act.id && <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main' }} />}
                        </Box>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={700} color="inherit">{act.title}</Typography>
                        <Typography variant="body2" color={action === act.id ? 'inherit' : 'text.secondary'} sx={{ opacity: action === act.id ? 0.9 : 1 }}>{act.desc}</Typography>
                      </Box>
                    </Paper>
                  ))}
                </Box>
              </Paper>
            </Box>

            {/* Row 2: Confidence & Scope */}
            <Box sx={{ display: 'flex', gap: 2.5, flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'stretch' }}>
              
              {/* Confidence Card */}
              <Paper variant="outlined" sx={{ flex: 1, p: 2.5, borderRadius: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 0.5 }}>Confidence threshold</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Minimum confidence score (0-1) for a detection.</Typography>
                <Box sx={{ px: 2, flex: 1, display: 'flex', alignItems: 'center' }}>
                  <Slider 
                    value={confidence} 
                    onChange={(e, v) => setConfidence(v)} 
                    min={0} max={1} step={0.1}
                    marks={[
                      { value: 0.2, label: 'Aggressive' },
                      { value: 0.5, label: 'Balanced' },
                      { value: 0.9, label: 'Strict' }
                    ]}
                    sx={{ color: 'primary.main', '& .MuiSlider-markLabel': { fontSize: '11px', fontWeight: 600, mt: 1 } }}
                  />
                </Box>
              </Paper>

              {/* Scope Card */}
              <Paper variant="outlined" sx={{ flex: 1, p: 2.5, borderRadius: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 2 }}>Scope & Environments</Typography>
                <Box sx={{ display: 'flex', gap: 4, flex: 1 }}>
                  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5, justifyContent: 'center' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" fontWeight={600}>Input Scope</Typography>
                      <Switch size="small" checked={scopeInput} onChange={(e) => setScopeInput(e.target.checked)} color="primary" />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" fontWeight={600}>Output Scope</Typography>
                      <Switch size="small" checked={scopeOutput} onChange={(e) => setScopeOutput(e.target.checked)} color="primary" />
                    </Box>
                  </Box>
                  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5, justifyContent: 'center' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" fontWeight={600}>PROD</Typography>
                      <Switch size="small" checked={envProd} onChange={(e) => setEnvProd(e.target.checked)} color="primary" />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" fontWeight={600}>STG</Typography>
                      <Switch size="small" checked={envStg} onChange={(e) => setEnvStg(e.target.checked)} color="primary" />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" fontWeight={600}>DEV</Typography>
                      <Switch size="small" checked={envDev} onChange={(e) => setEnvDev(e.target.checked)} color="primary" />
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, borderTop: 1, borderColor: 'divider', bgcolor: 'background.default' }}>
          <Button onClick={() => setIsEditing(false)} color="inherit">Cancel</Button>
          <Button onClick={() => setIsEditing(false)} variant="contained" color="primary">Save Changes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
