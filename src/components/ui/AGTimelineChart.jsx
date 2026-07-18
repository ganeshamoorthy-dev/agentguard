import React, { useState } from 'react';
import { Box, Button, ButtonGroup } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

export default function AGTimelineChart({ data, dataKey = 'requests', color = '#3b82f6', height = 300 }) {
  const [activeMetric, setActiveMetric] = useState(dataKey);

  const metrics = [
    { id: 'requests', label: 'Requests', color: '#3b82f6' },
    { id: 'latency', label: 'Latency (ms)', color: '#f59e0b' },
    { id: 'errors', label: 'Errors', color: '#ef4444' }
  ];

  const activeColor = metrics.find(m => m.id === activeMetric)?.color || color;
  const isDark = document.body.classList.contains('dark');

  const xData = data.map(d => d.time);
  const sData = data.map(d => d[activeMetric]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ pl: 2 }}>
        <ButtonGroup size="small" variant="outlined" sx={{ bgcolor: 'background.default' }}>
          {metrics.map(m => (
            <Button 
              key={m.id}
              onClick={() => setActiveMetric(m.id)}
              sx={{ 
                textTransform: 'none',
                color: activeMetric === m.id ? m.color : 'text.secondary',
                borderColor: activeMetric === m.id ? m.color : 'divider',
                bgcolor: activeMetric === m.id ? (isDark ? '#2a4365' : '#fff') : 'transparent',
                fontWeight: activeMetric === m.id ? 600 : 500,
                '&:hover': {
                  bgcolor: activeMetric === m.id ? (isDark ? '#2a4365' : '#fff') : 'action.hover'
                }
              }}
            >
              {m.label}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
      
      <Box sx={{ height: height, width: '100%' }}>
        <LineChart
          xAxis={[{ data: xData, scaleType: 'point' }]}
          series={[
            {
              data: sData,
              color: activeColor,
              area: true,
              showMark: false,
            },
          ]}
          margin={{ left: 40, right: 10, top: 10, bottom: 20 }}
          slotProps={{ legend: { hidden: true } }}
        />
      </Box>
    </Box>
  );
}
