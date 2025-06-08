import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00f2ff',
    },
    secondary: {
      main: '#0066ff',
    },
    background: {
      default: '#0a192f',
      paper: '#112240',
    },
    text: {
      primary: '#ffffff',
      secondary: '#8892b0',
    },
  },
  typography: {
    fontFamily: '"Orbitron", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Audiowide", "Orbitron", sans-serif',
      fontWeight: 400,
      letterSpacing: '0.02em',
    },
    h2: {
      fontFamily: '"Audiowide", "Orbitron", sans-serif',
      fontWeight: 400,
      letterSpacing: '0.02em',
    },
    h3: {
      fontFamily: '"Audiowide", "Orbitron", sans-serif',
      fontWeight: 400,
      letterSpacing: '0.02em',
    },
    h4: {
      fontFamily: '"Audiowide", "Orbitron", sans-serif',
      fontWeight: 400,
      letterSpacing: '0.02em',
    },
    h5: {
      fontFamily: '"Audiowide", "Orbitron", sans-serif',
      fontWeight: 400,
      letterSpacing: '0.02em',
    },
    h6: {
      fontFamily: '"Audiowide", "Orbitron", sans-serif',
      fontWeight: 400,
      letterSpacing: '0.02em',
    },
    subtitle1: {
      letterSpacing: '0.02em',
    },
    subtitle2: {
      letterSpacing: '0.02em',
    },
    body1: {
      letterSpacing: '0.01em',
    },
    body2: {
      letterSpacing: '0.01em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      letterSpacing: '0.02em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          letterSpacing: '0.02em',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

export default theme; 