import { useCallback, useEffect, useState } from 'react';
import { observabilityApi } from './api/observabilityApi';

export function useObservability() {
  const [overview, setOverview] = useState(null); const [traces, setTraces] = useState([]); const [savedViews, setSavedViews] = useState([]); const [selectedTrace, setSelectedTrace] = useState(null); const [loading, setLoading] = useState(true);
  const refresh = useCallback(async (filters) => { setLoading(true); const [nextOverview, nextTraces, nextViews] = await Promise.all([observabilityApi.getOverview(), observabilityApi.listTraces(filters), observabilityApi.getSavedViews()]); setOverview(nextOverview); setTraces(nextTraces); setSavedViews(nextViews); setLoading(false); }, []);
  useEffect(() => { refresh(); }, [refresh]);
  const selectTrace = useCallback(async (traceId) => setSelectedTrace(await observabilityApi.getTrace(traceId)), []);
  const toggleBookmark = useCallback(async (traceId, filters) => { await observabilityApi.toggleBookmark(traceId); await refresh(filters); if (selectedTrace?.id === traceId) setSelectedTrace(await observabilityApi.getTrace(traceId)); }, [refresh, selectedTrace]);
  return { overview, traces, savedViews, selectedTrace, loading, refresh, selectTrace, setSelectedTrace, toggleBookmark };
}
