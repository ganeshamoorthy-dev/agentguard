import React, { useState } from 'react';
import { 
  Box, Typography, Button, Paper, Toolbar, IconButton, Stack,
  Chip, Breadcrumbs, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress,
  Menu, MenuItem
} from '@mui/material';
import { Calendar, Filter, RefreshCw, Activity, ShieldAlert, FileText, AlertOctagon, TrendingUp, Info } from 'lucide-react';
import { LineChart } from '@mui/x-charts';
import PageHeader from '../../../components/PageHeader';

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

const ProgressBarMetric = ({ label, value, percentage, color, showPreview }) => (
  <Box sx={{ mb: 2 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
      <Typography variant="body2" fontWeight={500} sx={{ display: 'flex', alignItems: 'center' }}>
        {label} {showPreview && <PreviewTag />}
      </Typography>
      <Typography variant="body2" fontWeight={600}>{value} <Typography component="span" variant="caption" color="text.secondary">({percentage}%)</Typography></Typography>
    </Box>
    <LinearProgress variant="determinate" value={percentage} sx={{ height: 6, borderRadius: 1, bgcolor: 'action.hover', '& .MuiLinearProgress-bar': { bgcolor: color } }} />
  </Box>
);

const PreviewTag = () => (
  <Typography variant="caption" sx={{ 
    bgcolor: '#fef3c7', color: '#92400e', fontWeight: 600, 
    px: 0.75, py: 0.25, borderRadius: 1, fontSize: '0.6rem',
    ml: 1
  }}>
    PREVIEW
  </Typography>
);

const InfoIcon = () => (
  <Info size={14} style={{ color: 'var(--mui-palette-text-secondary)', marginLeft: '4px', verticalAlign: 'text-bottom' }} />
);

const KPICard = ({ title, value, trend, color, showPreview }) => {
  return (
    <Paper variant="outlined" sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 0.5, fontSize: '0.65rem' }}>
          {title}
        </Typography>
        {showPreview && <PreviewTag />}
        <InfoIcon />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
        <Typography variant="h4" fontWeight={700}>
          {value}
        </Typography>
      </Box>
      
      {trend && (
        <Typography variant="caption" sx={{ color: trend.startsWith('↑') || trend.startsWith('↓') && trend.includes('12%') ? '#10b981' : 'text.secondary', fontWeight: 500, mt: 1 }}>
          {trend}
        </Typography>
      )}
    </Paper>
  );
};

const CustomLegendItem = ({ color, label, value, percentage, showPreview }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, fontSize: '0.85rem' }}>
    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: color, mr: 1.5 }} />
    <Typography variant="body2" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
      {label} {showPreview && <PreviewTag />}
    </Typography>
    <Typography variant="body2" fontWeight={600} sx={{ width: 40, textAlign: 'right' }}>{value}</Typography>
    <Typography variant="body2" color="text.secondary" sx={{ width: 40, textAlign: 'right' }}>{percentage}</Typography>
  </Box>
);

export default function SecurityOverview({ overview, incidents }) {
  const [timeFilterAnchor, setTimeFilterAnchor] = useState(null);
  const [timeRange, setTimeRange] = useState('Past 1 day');

  if (!overview) return null;

  const handleTimeClick = (event) => setTimeFilterAnchor(event.currentTarget);
  const handleTimeClose = (range) => {
    setTimeFilterAnchor(null);
    if (typeof range === 'string') setTimeRange(range);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)', overflow: 'hidden', margin: '-30px -36px -40px' }}>
      <PageHeader 
        breadcrumbs={['Workspace', 'Security Overview']}
        title="Security Overview"
        description="Real-time summary of security posture and key risk indicators across your AI applications."
        actions={
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Button variant="outlined" color="inherit" size="small" onClick={handleTimeClick} startIcon={<Calendar size={14} />}>
              {timeRange}
            </Button>
            <Menu
              anchorEl={timeFilterAnchor}
              open={Boolean(timeFilterAnchor)}
              onClose={handleTimeClose}
            >
              <MenuItem onClick={() => handleTimeClose('Past 1 hour')}>Past 1 hour</MenuItem>
              <MenuItem onClick={() => handleTimeClose('Past 1 day')}>Past 1 day</MenuItem>
              <MenuItem onClick={() => handleTimeClose('Past 7 days')}>Past 7 days</MenuItem>
              <MenuItem onClick={() => handleTimeClose('Past 30 days')}>Past 30 days</MenuItem>
            </Menu>
            <Button variant="outlined" color="inherit" size="small" startIcon={<Filter size={14} />}>
              Filters
            </Button>
            <IconButton size="small" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}><RefreshCw size={16} /></IconButton>
          </Stack>
        }
      />

      {/* PageContent */}
      <Box sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', pl: 8, pr: 4.5, py: 3, bgcolor: 'background.default' }}>
        <Box sx={{ maxWidth: 1600, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 3 }}>
          
          {/* Row 1: KPIs */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)', lg: 'repeat(5, 1fr)' }, gap: 2 }}>
            <KPICard title="Overall Security Score" value={`${overview.score}%`} trend="↑ Opp vs last period" color="#22c55e" />
            <KPICard title="Total Security Events" value={overview.totalEvents} color="#3b82f6" />
            <KPICard title="Blocked Requests" value={overview.blockedRequests} color="#a855f7" />
            <KPICard title="Critical Incidents" value={overview.criticalIncidents} trend="↑ 2 vs last 7 days" color="#ef4444" showPreview />
            <KPICard title="Policy Violations" value={overview.policyViolations} trend="↓ 12% vs last 7 days" color="#f97316" showPreview />
          </Box>

          {/* Row 2: Over Time & Risks */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '7fr 5fr' }, gap: 3 }}>
            <Paper variant="outlined" sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <SectionHeader icon={Activity} title="Security Events Over Time" />
              <Box sx={{ flexGrow: 1, minHeight: 300, mt: -2 }}>
                <LineChart
                  dataset={overview.eventsOverTime}
                  xAxis={[{ scaleType: 'point', dataKey: 'day' }]}
                  series={[
                    { dataKey: 'Prompt Injection', label: 'Prompt Injection', color: '#ef4444', showMark: false },
                    { dataKey: 'PII Exposure', label: 'PII Exposure', color: '#f97316', showMark: false },
                    { dataKey: 'Toxic Content', label: 'Toxic Content', color: '#eab308', showMark: false }
                  ]}
                  margin={{ left: 30, right: 20, top: 40, bottom: 30 }}
                  slotProps={{ legend: { direction: 'row', position: { vertical: 'top', horizontal: 'left' } } }}
                />
              </Box>
            </Paper>

            <Paper variant="outlined" sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <SectionHeader icon={ShieldAlert} title="Top Security Risks" />
              <Box sx={{ display: 'flex', flexDirection: 'column', mt: 1, flexGrow: 1 }}>
                <ProgressBarMetric label="Secrets Exposure" value="156" percentage={44} color="#a855f7" showPreview />
                <ProgressBarMetric label="Insecure Output" value="110" percentage={31} color="#3b82f6" showPreview />
                <ProgressBarMetric label="Others" value="90" percentage={25} color="#94a3b8" showPreview />
                <ProgressBarMetric label="Prompt Injection" value="0" percentage={0} color="#ef4444" />
                <ProgressBarMetric label="PII Exposure" value="0" percentage={0} color="#f97316" />
                
                <Button variant="outlined" size="small" sx={{ mt: 'auto', alignSelf: 'flex-start', color: 'text.secondary', borderColor: 'divider' }}>
                  View all risks →
                </Button>
              </Box>
            </Paper>
          </Box>

          {/* Row 3: Categories & Severity */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '7fr 5fr' }, gap: 3 }}>
            <Paper variant="outlined" sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <SectionHeader icon={FileText} title="Security Events by Category" />
              <Box sx={{ display: 'flex', flexDirection: 'column', mt: 1, flexGrow: 1 }}>
                {overview.eventsByCategory.map(item => {
                  const total = overview.eventsByCategory.reduce((sum, curr) => sum + curr.value, 0) || 1;
                  const pct = Math.round((item.value / total) * 100);
                  return (
                    <ProgressBarMetric key={item.label} label={item.label} value={item.value} percentage={pct} color="#a855f7" />
                  );
                })}
              </Box>
            </Paper>

            <Paper variant="outlined" sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <SectionHeader icon={AlertOctagon} title="Incidents by Severity" />
              <Box sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ef4444', mr: 2 }} />
                  <Typography variant="body2" fontWeight={500} sx={{ flexGrow: 1 }}>Critical</Typography>
                  <Typography variant="body2" fontWeight={600}>12</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#f97316', mr: 2 }} />
                  <Typography variant="body2" fontWeight={500} sx={{ flexGrow: 1 }}>High</Typography>
                  <Typography variant="body2" fontWeight={600}>95</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#3b82f6', mr: 2 }} />
                  <Typography variant="body2" fontWeight={500} sx={{ flexGrow: 1 }}>Medium</Typography>
                  <Typography variant="body2" fontWeight={600}>352</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', py: 1.5 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#94a3b8', mr: 2 }} />
                  <Typography variant="body2" fontWeight={500} sx={{ flexGrow: 1 }}>Low / Info</Typography>
                  <Typography variant="body2" fontWeight={600}>788</Typography>
                </Box>
              </Box>
            </Paper>
          </Box>

          {/* Row 4: Recent Incidents */}
          <Paper variant="outlined" sx={{ p: 3, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <SectionHeader icon={ShieldAlert} title="Recent Security Incidents" />
            </Box>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Severity</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>App</TableCell>
                    <TableCell>Rule Triggered</TableCell>
                    <TableCell>Created Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {incidents && incidents.length > 0 ? (
                    incidents.map(inc => (
                      <TableRow key={inc.id} hover>
                        <TableCell><Typography fontWeight={600} variant="body2">{inc.id}</Typography></TableCell>
                        <TableCell>
                          <Chip 
                            label={inc.severity} 
                            size="small" 
                            color={inc.severity === 'critical' ? 'error' : inc.severity === 'high' ? 'warning' : 'default'} 
                            sx={{ textTransform: 'capitalize', fontWeight: 600, height: 20 }} 
                          />
                        </TableCell>
                        <TableCell>{inc.status}</TableCell>
                        <TableCell>{inc.app}</TableCell>
                        <TableCell>{inc.rule}</TableCell>
                        <TableCell>{inc.time}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center">No recent incidents</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

        </Box>
      </Box>
    </Box>
  );
}


