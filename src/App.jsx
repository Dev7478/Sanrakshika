import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Map from './pages/Map';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Contact from './pages/Contact';
import Monitoring from './pages/Monitoring';
import Emergency from './pages/Emergency';
import Cryopreservation from './pages/Cryopreservation';
import Analytics from './pages/analytics';

// Create theme
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
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: { xs: '56px', sm: '64px' },
            px: 2,
            bgcolor: 'background.default'
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/map" element={<Map />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/monitoring" element={<Monitoring />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/cryopreservation" element={<Cryopreservation />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
