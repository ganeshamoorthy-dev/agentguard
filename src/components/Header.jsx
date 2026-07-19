import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Typography, IconButton, Avatar, Chip, Stack, Menu, MenuItem } from '@mui/material';
import { Bell, Search as SearchIcon, ShieldCheck, Sun, Moon, ChevronDown } from 'lucide-react';

export default function Header({ theme, toggleTheme }) {
  const [orgAnchor, setOrgAnchor] = useState(null);
  const [projAnchor, setProjAnchor] = useState(null);

  const orgs = ['Acme Corp', 'Globex Inc', 'Soylent Corp'];
  const projects = ['Finance Copilot', 'Customer Concierge', 'Support Hub'];

  const [activeOrg, setActiveOrg] = useState(orgs[0]);
  const [activeProj, setActiveProj] = useState(projects[0]);

  return (
    <AppBar position="sticky" elevation={0} sx={{ 
      bgcolor: 'background.paper', 
      borderBottom: 1, 
      borderColor: 'divider',
      color: 'text.primary',
      zIndex: (theme) => theme.zIndex.drawer + 1
    }}>
      <Toolbar variant="dense" sx={{ minHeight: 64, px: 2, gap: 2 }}>
        
        {/* Brand */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mr: 2 }}>
          <Box sx={{ color: 'primary.main', display: 'flex' }}><ShieldCheck size={22} /></Box>
          <Typography variant="subtitle1" fontWeight={700} sx={{ letterSpacing: '-0.02em', color: 'text.primary' }}>AgentGuard</Typography>
          <Chip size="small" label="Enterprise" sx={{ height: 20, fontSize: '10px', fontWeight: 600, ml: 1, bgcolor: 'primary.main', color: 'primary.contrastText' }} />
        </Box>

        {/* Org & Project Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, borderLeft: 1, borderRight: 1, borderColor: 'divider', height: 24 }}>
          <Box onClick={(e) => setOrgAnchor(e.currentTarget)} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer', '&:hover': { opacity: 0.7 } }}>
            <Typography variant="body2" fontWeight={600} color="text.secondary">{activeOrg}</Typography>
            <ChevronDown size={14} style={{ opacity: 0.5, color: 'inherit' }} />
          </Box>
          <Menu anchorEl={orgAnchor} open={Boolean(orgAnchor)} onClose={() => setOrgAnchor(null)}>
            {orgs.map(o => (
              <MenuItem key={o} onClick={() => { setActiveOrg(o); setOrgAnchor(null); }} selected={o === activeOrg}>
                <Typography variant="body2">{o}</Typography>
              </MenuItem>
            ))}
          </Menu>

          <Typography variant="body2" color="divider" sx={{ mx: 0.5 }}>/</Typography>
          
          <Box onClick={(e) => setProjAnchor(e.currentTarget)} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer', '&:hover': { opacity: 0.7 } }}>
            <Typography variant="body2" fontWeight={600} color="text.primary">{activeProj}</Typography>
            <ChevronDown size={14} style={{ opacity: 0.5, color: 'inherit' }} />
          </Box>
          <Menu anchorEl={projAnchor} open={Boolean(projAnchor)} onClose={() => setProjAnchor(null)}>
            {projects.map(p => (
              <MenuItem key={p} onClick={() => { setActiveProj(p); setProjAnchor(null); }} selected={p === activeProj}>
                <Typography variant="body2">{p}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Search & Actions */}
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box sx={{ 
            display: 'flex', alignItems: 'center', gap: 1, 
            bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
            px: 1.5, py: 0.5, borderRadius: 2, 
            cursor: 'text', border: '1px solid', borderColor: 'divider',
            '&:hover': { borderColor: 'text.secondary' },
            mr: 1
          }}>
            <SearchIcon size={14} style={{ color: 'var(--mui-palette-text-secondary)', opacity: 0.7 }} />
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '13px', mr: 4 }}>Search traces or users...</Typography>
            <Box sx={{ bgcolor: 'background.paper', px: 0.5, borderRadius: 1, border: '1px solid', borderColor: 'divider', fontSize: '10px', color: 'text.secondary', fontWeight: 600 }}>⌘K</Box>
          </Box>

          <IconButton size="small" onClick={toggleTheme} sx={{ color: 'text.secondary' }}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </IconButton>
          
          <IconButton size="small" sx={{ color: 'text.secondary' }}>
            <Bell size={18} />
          </IconButton>

          {/* User Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: 1, pl: 2, borderLeft: 1, borderColor: 'divider', cursor: 'pointer', '&:hover': { opacity: 0.8 } }}>
            <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1.2, color: 'text.primary' }}>Liam Wong</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>liam.wong@acme.com</Typography>
            </Box>
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '14px', fontWeight: 600, color: 'primary.contrastText' }}>LW</Avatar>
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
