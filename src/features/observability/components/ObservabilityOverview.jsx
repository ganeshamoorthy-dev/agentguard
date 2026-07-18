import React from 'react';
import { 
  Box, Typography, Button, Paper, Toolbar, IconButton, Stack,
  Chip, Skeleton, Breadcrumbs, Link
} from '@mui/material';
import { 
  Calendar, RefreshCw, Filter, Download, Activity, Timer, 
  Users, TerminalSquare, HeartPulse, DollarSign,
  Cpu, BookOpen, AlertCircle, History, AlertOctagon, TrendingUp
} from 'lucide-react';
import AGTimelineChart from '../../../components/ui/AGTimelineChart';
import AGRankedTable from '../../../components/ui/AGRankedTable';
import AGAlertCard from '../../../components/ui/AGAlertCard';
import AGRecommendationCard from '../../../components/ui/AGRecommendationCard';
import TraceTable from './TraceTable';

const SectionHeader = ({ icon: Icon, title }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
    <Box sx={{ 
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      border: '1px solid', borderColor: 'divider',
      borderRadius: 2, p: 1, mr: 2, color: 'text.secondary',
      bgcolor: 'background.paper'
    }}>
      <Icon size={18} />
    </Box>
    <Typography variant="h6" fontWeight={600} fontFamily="serif">
      {title}
    </Typography>
  </Box>
);

const EmptyState = ({ message }) => (
  <Box sx={{ 
    display: 'flex', flexDirection: 'column', alignItems: 'center', 
    justifyContent: 'center', height: '100%', p: 4, minHeight: 200,
    color: 'text.secondary'
  }}>
    <Typography variant="body2">{message}</Typography>
  </Box>
);

const StatCard = ({ title, value, subtext, color }) => (
  <Paper variant="outlined" sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
    <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 0.5, fontSize: '0.65rem' }}>
      {title}
    </Typography>
    <Typography variant="h5" fontWeight={600} sx={{ mt: 1, mb: 0.5 }}>
      {value}
    </Typography>
    <Typography variant="caption" color="text.secondary" sx={{ flexGrow: 1, fontSize: '0.65rem' }}>
      {subtext || '—'}
    </Typography>
    <Box sx={{ height: 2, bgcolor: color, mt: 2, borderRadius: 1, opacity: 0.8 }} />
  </Paper>
);

export default function ObservabilityOverview({ overview, onOpenExplorer, onSelectTrace, onBookmark }) {
  const navigateTo = (path) => {
    if (path === 'explorer') onOpenExplorer();
  };

  const appColumns = [
    { label: 'Application', key: 'name' },
    { label: 'Health', key: 'health', render: (val) => <span style={{ color: val > 95 ? '#139a76' : '#d68a11' }}>{val}%</span> },
    { label: 'Requests', key: 'requests', render: (val) => val.toLocaleString() },
    { label: 'Avg Latency', key: 'latency', render: (val) => `${val}s` },
    { label: 'Errors', key: 'errors' }
  ];

  const modelColumns = [
    { label: 'Model', key: 'name', render: (val, row) => <Box><strong>{val}</strong></Box> },
    { label: 'Requests', key: 'requests', render: (val) => val.toLocaleString() },
    { label: 'Tokens (M)', key: 'tokens' },
    { label: 'Cost', key: 'cost', render: (val) => `$${val.toFixed(2)}` }
  ];

  const promptColumns = [
    { label: 'Prompt', key: 'name' },
    { label: 'Requests', key: 'requests', render: (val) => val.toLocaleString() },
    { label: 'Failures', key: 'failures' }
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)', overflow: 'hidden', margin: '-30px -36px -40px' }}>
      
      {/* SubHeader (Fixed) */}
      <Toolbar 
        variant="dense" 
        sx={{ 
          px: 4.5, 
          py: 2, 
          borderBottom: 1, 
          borderColor: 'divider', 
          flexShrink: 0,
          display: 'flex',
          justifyContent: 'space-between',
          bgcolor: 'background.paper'
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ '& .MuiBreadcrumbs-separator': { mx: 0.5 } }}>
            <Link underline="hover" color="primary" sx={{ fontSize: '0.75rem', fontWeight: 500 }} href="#">
              Workspace
            </Link>
            <Link underline="hover" color="primary" sx={{ fontSize: '0.75rem', fontWeight: 500 }} href="#">
              Observability
            </Link>
            <Typography color="text.primary" sx={{ fontSize: '0.75rem', fontWeight: 600 }}>
              Overview
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" fontWeight={600} fontFamily="serif" sx={{ lineHeight: 1.2 }}>
            Observability Overview
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.2 }}>
            Real-time insights into your LLM application usage and performance.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Button variant="outlined" color="inherit" size="small" endIcon={<Calendar size={14} />}>
            Past 24 hours
          </Button>
          <IconButton size="small" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}><RefreshCw size={16} /></IconButton>
        </Stack>
      </Toolbar>

      {/* PageContent (Scrollable) */}
      <Box sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', px: 4.5, py: 3, bgcolor: '#f9fafb' }}>
        
        {!overview ? (
          <Box sx={{ maxWidth: 1600, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* KPI Skeletons */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' }, gap: 2 }}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Skeleton key={i} variant="rectangular" height={100} sx={{ borderRadius: 2 }} />
              ))}
            </Box>
            {/* Row 1 Skeletons */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '7fr 5fr' }, gap: 3 }}>
              <Skeleton variant="rectangular" height={360} sx={{ borderRadius: 2 }} />
              <Skeleton variant="rectangular" height={360} sx={{ borderRadius: 2 }} />
            </Box>
            {/* Row 2 Skeletons */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '7fr 5fr' }, gap: 3 }}>
              <Skeleton variant="rectangular" height={360} sx={{ borderRadius: 2 }} />
              <Skeleton variant="rectangular" height={360} sx={{ borderRadius: 2 }} />
            </Box>
          </Box>
        ) : (
          <Box sx={{ maxWidth: 1600, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 3 }}>
            
            {/* KPIs Grid */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' }, gap: 2 }}>
              <StatCard title="Total Traces" value={overview.totalTraces.toLocaleString()} color="#3b82f6" />
              <StatCard title="Total Sessions" value={overview.activeSessions.toLocaleString()} color="#a855f7" />
              <StatCard title="Active Users" value={overview.activeUsers.toLocaleString()} color="#22c55e" />
              <StatCard title="Total Prompts" value={overview.promptExecutions.toLocaleString()} color="#3b82f6" />
              <StatCard title="API Latency (P95)" value={`${overview.latencyP95}s`} color="#3b82f6" subtext="Across all requests" />
              <StatCard title="Error Rate" value={`${overview.health < 100 ? (100 - overview.health).toFixed(2) : 0}%`} color="#ef4444" />
              <StatCard title="Daily Cost" value={`$${overview.llmCost.toFixed(2)}`} color="#f59e0b" subtext={`${overview.costBudgetPct}% of budget`} />
              <StatCard title="Uptime" value="99.98%" color="#22c55e" subtext="Operational" />
            </Box>

            {/* Row 1: Traffic & Models */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '7fr 5fr' }, gap: 3 }}>
              <Paper variant="outlined" sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <SectionHeader icon={Activity} title="Traces by time" />
                <Box sx={{ mb: 2, display: 'flex', borderBottom: 1, borderColor: 'divider' }}>
                  <Typography variant="body2" fontWeight={600} color="primary" sx={{ borderBottom: 2, borderColor: 'primary.main', pb: 1, mr: 3 }}>Traces</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ pb: 1 }}>Observations by Level</Typography>
                </Box>
                <Box sx={{ height: 280, flexGrow: 1, width: '100%' }}>
                  {overview.trafficTimeline && overview.trafficTimeline.length > 0 ? (
                    <AGTimelineChart data={overview.trafficTimeline} height={280} />
                  ) : (
                    <EmptyState message="No data" />
                  )}
                </Box>
              </Paper>
              <Paper variant="outlined" sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <SectionHeader icon={Cpu} title="Top Models" />
                <Box sx={{ flexGrow: 1, overflowX: 'auto' }}>
                  {overview.topModels && overview.topModels.length > 0 ? (
                    <AGRankedTable columns={modelColumns} data={overview.topModels} />
                  ) : (
                    <EmptyState message="No model usage in this range" />
                  )}
                </Box>
              </Paper>
            </Box>

            {/* Row 2: Applications & Prompts */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '7fr 5fr' }, gap: 3 }}>
              <Paper variant="outlined" sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <SectionHeader icon={TerminalSquare} title="Top Applications" />
                <Box sx={{ flexGrow: 1, overflowX: 'auto' }}>
                  {overview.topApplications && overview.topApplications.length > 0 ? (
                    <AGRankedTable columns={appColumns} data={overview.topApplications} />
                  ) : (
                    <EmptyState message="No application usage in this range" />
                  )}
                </Box>
              </Paper>
              <Paper variant="outlined" sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <SectionHeader icon={BookOpen} title="Prompt Usage" />
                <Box sx={{ flexGrow: 1, overflowX: 'auto' }}>
                  {overview.promptAnalytics && overview.promptAnalytics.length > 0 ? (
                    <AGRankedTable columns={promptColumns} data={overview.promptAnalytics} />
                  ) : (
                    <EmptyState message="No prompts created in this range" />
                  )}
                </Box>
              </Paper>
            </Box>

            {/* Row 3: Recommendations & Alerts */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '7fr 5fr' }, gap: 3 }}>
              <Paper variant="outlined" sx={{ p: 3, height: '100%' }}>
                <SectionHeader icon={TrendingUp} title="AI Recommendations" />
                {overview.recommendations && overview.recommendations.length > 0 ? (
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                    {overview.recommendations.map(rec => (
                      <AGRecommendationCard priority={rec.priority} impact={rec.impact} description={rec.desc} actionLabel={rec.action} onAction={() => navigateTo('explorer')} key={rec.id} />
                    ))}
                  </Box>
                ) : (
                  <EmptyState message="No active recommendations." />
                )}
              </Paper>
              <Paper variant="outlined" sx={{ p: 3, height: '100%' }}>
                <SectionHeader icon={AlertCircle} title="Alerts" />
                {overview.alerts && overview.alerts.length > 0 ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    {overview.alerts.map(alert => (
                      <AGAlertCard key={alert.id} severity={alert.severity} title={alert.title} description={alert.desc} app={alert.app} time={alert.time} />
                    ))}
                  </Box>
                ) : (
                  <EmptyState message="No active alerts" />
                )}
              </Paper>
            </Box>

            {/* Row 4: Recent Activity */}
            <Paper variant="outlined" sx={{ p: 3, mb: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <SectionHeader icon={History} title="Recent Activity" />
                <Button size="small" onClick={() => navigateTo('explorer')}>View All Traces</Button>
              </Box>
              <Box sx={{ overflowX: 'auto' }}>
                {overview.recent && overview.recent.length > 0 ? (
                  <TraceTable traces={overview.recent} onSelect={onSelectTrace} onBookmark={onBookmark} />
                ) : (
                  <EmptyState message="No recent activity in this range." />
                )}
              </Box>
            </Paper>

          </Box>
        )}
      </Box>
    </Box>
  );
}
