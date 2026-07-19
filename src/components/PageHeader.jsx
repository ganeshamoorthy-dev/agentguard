import React from 'react';
import { Box, Typography, Toolbar, Breadcrumbs, Link } from '@mui/material';

const PageHeader = ({ breadcrumbs = [], title, titleAppend, description, actions }) => {
  return (
    <Box 
      sx={{ 
        pl: 8, pr: 4.5, py: 1,mt: 0.5, borderBottom: 1, borderColor: 'divider', 
        flexShrink: 0, display: 'flex', justifyContent: 'space-between',
        bgcolor: 'background.paper',
        alignItems: 'center'
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {breadcrumbs.length > 0 && (
          <Breadcrumbs aria-label="breadcrumb" sx={{ '& .MuiBreadcrumbs-separator': { mx: 0.5 } }}>
            {breadcrumbs.map((bc, index) => {
              const isLast = index === breadcrumbs.length - 1;
              const label = typeof bc === 'object' ? bc.label : bc;
              const onClick = typeof bc === 'object' ? bc.onClick : undefined;
              
              return isLast ? (
                <Typography key={index} color="text.primary" sx={{ fontSize: '0.75rem', fontWeight: 600 }}>
                  {label}
                </Typography>
              ) : (
                <Link 
                  key={index} 
                  underline="hover" 
                  color="primary" 
                  sx={{ fontSize: '0.75rem', fontWeight: 500, cursor: onClick ? 'pointer' : 'pointer' }} 
                  onClick={onClick}
                >
                  {label}
                </Link>
              );
            })}
          </Breadcrumbs>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6" fontWeight={600} fontFamily="serif" sx={{ lineHeight: 1.2 }}>
            {title}
          </Typography>
          {titleAppend}
        </Box>
        {description && (
          <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.2 }}>
            {description}
          </Typography>
        )}
      </Box>
      {actions && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {actions}
        </Box>
      )}
    </Box>
  );
};

export default PageHeader;
