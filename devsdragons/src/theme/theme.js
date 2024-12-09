// src/theme/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#252241',  // Dark blue for primary
      contrastText: '#fff',  // White text on primary buttons
    },
    secondary: {
      main: '#ffd700',  // Gold for secondary
      contrastText: '#000',  // Black text on secondary buttons
    },
    error: {
      main: '#ff4500',  // Orange-red for error state
    },
    background: {
      default: '#1a1a2e',  // Dark blue as the default background color
    },
  },
  typography: {
    fontFamily: 'Cinzel, serif',  // Fantasy-themed font
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
          height: '100%',
        },
        body: {
          height: '100%',
          margin: 0,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#1a1a2e',  // Dark blue background
          color: '#ddcf8a',  // Gold color for text
          fontFamily: 'Cinzel, serif',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,  // Default border radius for buttons
          fontFamily: 'Cinzel, serif',  // Fantasy-themed font
        },
      },
    },
  },
});

export default theme;