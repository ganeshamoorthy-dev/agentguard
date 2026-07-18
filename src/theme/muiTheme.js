import { createTheme } from '@mui/material/styles';

const baseOptions = {
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    button: { textTransform: 'none' }
  },
  shape: { borderRadius: 12 },
};

export const getMuiTheme = (mode) => createTheme({
  ...baseOptions,
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: { main: '#14b8a6' },
          secondary: { main: '#1e3a5f' },
          background: { default: '#F8FAFC', paper: '#ffffff' },
          text: { primary: '#182433', secondary: '#728092' },
          divider: '#e8edf3'
        }
      : {
          primary: { main: '#14b8a6' },
          secondary: { main: '#4e6377' },
          background: { default: '#060B14', paper: '#0B1220' },
          text: { primary: '#f8fafc', secondary: '#8190a0' },
          divider: '#1e334f'
        }),
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: mode === 'light' ? '0 3px 9px rgba(20, 32, 51, 0.05)' : '0 4px 15px rgba(0, 0, 0, 0.4)',
          backgroundImage: 'none'
        }
      }
    }
  }
});
