import { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useObservability } from '../../features/observability/useObservability';
import ObservabilityOverview from '../../features/observability/components/ObservabilityOverview';
import TraceExplorer from '../../features/observability/components/TraceExplorer';
import TraceDetailWorkspace from '../../features/observability/components/TraceDetailWorkspace';
import ObservabilityDirectory from '../../features/observability/components/ObservabilityDirectory';


import { useParams } from 'react-router-dom';

function TraceDetailWrapper({ selectTrace, selectedTrace, onBack, onBookmark }) {
  const { traceId } = useParams();

  useEffect(() => {
    if (traceId && (!selectedTrace || selectedTrace.id !== traceId)) {
      selectTrace(traceId);
    }
  }, [traceId, selectTrace, selectedTrace]);

  if (!selectedTrace || selectedTrace.id !== traceId) {
    return <div className="module-loading" role="status"><div><i/>Loading Trace {traceId}…</div></div>;
  }

  return <TraceDetailWorkspace trace={selectedTrace} onBack={onBack} onBookmark={onBookmark} />;
}

export default function ObservabilityModule() {
  const navigate = useNavigate();
  const observability = useObservability();
  const { overview, traces, savedViews, selectedTrace, loading, refresh, selectTrace, setSelectedTrace, toggleBookmark } = observability;

  if (loading && !overview) return <div className="module-loading" role="status"><div><i/>Loading Observability…</div></div>;

  const openTrace = async (traceId) => { 
    navigate(`/observability/trace-details/${traceId}`); 
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="overview" replace />} />
      <Route path="overview" element={<ObservabilityOverview overview={overview} onOpenExplorer={() => navigate('/observability/trace-explorer')} onSelectTrace={openTrace} onBookmark={toggleBookmark}/>} />
      <Route path="trace-explorer" element={<TraceExplorer traces={traces} savedViews={savedViews} onRefresh={refresh} onSelect={openTrace} onBookmark={toggleBookmark}/>} />
      <Route path="trace-details/:traceId" element={<TraceDetailWrapper selectTrace={selectTrace} selectedTrace={selectedTrace} onBack={() => navigate('/observability/trace-explorer')} onBookmark={toggleBookmark}/>} />
      <Route path="trace-details" element={<TraceDetailWorkspace trace={null} onBack={() => navigate('/observability/trace-explorer')} onBookmark={toggleBookmark}/>} />
      <Route path="sessions" element={<ObservabilityDirectory page="Sessions"/>} />
      <Route path="applications" element={<ObservabilityDirectory page="Applications"/>} />
      <Route path="users" element={<ObservabilityDirectory page="Users"/>} />
      <Route path="models" element={<ObservabilityDirectory page="Models"/>} />
      <Route path="analytics" element={<ObservabilityDirectory page="Analytics"/>} />
    </Routes>
  );
}
