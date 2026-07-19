import React, { useState } from 'react';
import { Box, Typography, Paper, Switch, Tabs, Tab, CircularProgress, Toolbar, Breadcrumbs, Link, LinearProgress, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const Icon = IconMap[guardrail.iconType] || ShieldAlert;

  const handleToggle = async (e) => {
    e.stopPropagation();
    setIsToggling(true);
    await onToggle(guardrail.id, !guardrail.active);
    setIsToggling(false);
  };

  return (
    <Paper 
      variant="outlined" 
      onClick={() => navigate(`/security/guardrails/${guardrail.id}`)}
      sx={{ 
        p: 3, display: 'flex', flexDirection: 'column', height: '100%', borderRadius: 2, 
        cursor: 'pointer', transition: 'all 0.2s', '&:hover': { borderColor: 'primary.main', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' } 
      }}
    >
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


export default function Guardrails({ guardrails, metrics, traces, onToggle }) {
  const activeCount = guardrails.filter(g => g.active).length;

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

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 3 }}>
        {guardrails.map(g => (
          <GuardrailCard key={g.id} guardrail={g} onToggle={onToggle} />
        ))}
      </Box>
        </Box>
      </Box>
    </Box>
  );
}


