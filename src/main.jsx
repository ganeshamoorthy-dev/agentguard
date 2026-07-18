import React, { Suspense, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { getMuiTheme } from './theme/muiTheme';
import { Bell, Command, ShieldCheck } from 'lucide-react';
import './styles.css';
import './navigation-theme.css';
import './context-navigation.css';
import './single-navigation.css';
import './compact-layout.css';
import './navigation-refinement.css';
import './navigation-component.css';
import './navigation-heading.css';
import './modules/module-loading.css';
import SidebarNavigation from './components/SidebarNavigation';
import { contextNavigation, workspaceNavigation } from './config/navigation';

const OverviewModule = React.lazy(() => import('./modules/overview/OverviewModule'));
const ObservabilityModule = React.lazy(() => import('./modules/observability/ObservabilityModule'));
const SecurityModule = React.lazy(() => import('./modules/security/SecurityModule'));
const QualityModule = React.lazy(() => import('./modules/quality/QualityModule'));
const GovernanceModule = React.lazy(() => import('./modules/governance/GovernanceModule'));
const CostModule = React.lazy(() => import('./modules/cost/CostModule'));


import Header from './components/Header';

// Wrapper to support legacy modules that expect activePage prop based on the URL
function SimpleModuleWrapper({ Module, defaultPage = 'Overview' }) {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);
  const subPageSlug = pathParts[1];
  
  let activePage = defaultPage;
  if (subPageSlug) {
    activePage = subPageSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }
  
  return <Module activePage={activePage} />;
}

function App() {
  const [themeMode, setThemeMode] = React.useState(() => localStorage.getItem('agentguard-theme') || 'light');

  const muiTheme = useMemo(() => getMuiTheme(themeMode), [themeMode]);

  React.useEffect(() => {
    if (themeMode === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('agentguard-theme', themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Header theme={themeMode} toggleTheme={toggleTheme} />
        <div className="app-shell">
          <SidebarNavigation items={workspaceNavigation} contextNavigation={contextNavigation} />
          <main>
            <Suspense fallback={<div className="module-loading" role="status"><div><i/>Loading…</div></div>}>
              <Routes>
                <Route path="/" element={<Navigate to="/overview" replace />} />
                <Route path="/overview/*" element={<SimpleModuleWrapper Module={OverviewModule} />} />
                <Route path="/observability/*" element={<ObservabilityModule />} />
                <Route path="/security/*" element={<SecurityModule />} />
                <Route path="/ai-quality/*" element={<QualityModule />} />
                <Route path="/governance/*" element={<SimpleModuleWrapper Module={GovernanceModule} />} />
                <Route path="/cost/*" element={<SimpleModuleWrapper Module={CostModule} />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

createRoot(document.getElementById('root')).render(<App/>);
