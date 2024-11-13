// src/theme/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50',  // Green for primary
      contrastText: '#fff',  // White text on primary buttons
    },
    secondary: {
      main: '#ff9800',  // Orange for secondary
      contrastText: '#000',  // Black text on secondary buttons
    },
    error: {
      main: '#f44336',  // Red for error state
    },
    background: {
      default: '#836953',  // Set brown as the default background color
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',  // Default font
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    button: {
      textTransform: 'none',  // Disable uppercase on buttons
    },
  },
  shape: {
    borderRadius: 8,  // Default border radius for components
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: '100%',  // Set html height to 100%
        },
        body: {
          backgroundColor: '#836953', // Apply brown background color to the entire body
          margin: 0,  // Reset margin
          height: '100%',  // Set body height to 100%
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',  // Ensure minimum full-height background
        },
        '#root': {
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',  // Root div covers full view height
          flexGrow: 1,  // Allow content to grow dynamically
          backgroundColor: 'inherit',  // Inherit background color from the body
        },
      },
    },
  },
});

export default theme;