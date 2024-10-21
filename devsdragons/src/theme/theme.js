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
      default: '#f5f5f5',  // Light gray background
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
        body: {
          backgroundColor: '#836953', // Set the background color here
          margin: 0,  // Reset margin
          minHeight: '100vh',  // Ensure full-height background
        },
      },
    },
  },
});

export default theme;
