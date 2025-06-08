import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SearchProvider } from './contexts/SearchContext';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer';
import { PageShimmer } from './components/loading/PageShimmer';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { AlertProvider } from './contexts/AlertContext';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary.jsx';

// Lazy load pages with custom loading components
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/SignUp'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const Monitoring = lazy(() => import('./pages/Monitoring'));
const Map = lazy(() => import('./pages/Map'));
const Analytics = lazy(() => import('./pages/analytics'));
const Emergency = lazy(() => import('./pages/Emergency'));
const Cryopreservation = lazy(() => import('./pages/Cryopreservation'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));

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
  if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  return (
    <ErrorBoundary>
      <AlertProvider>
        <AuthProvider>
          <SearchProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '100vh',
                  background: 'linear-gradient(135deg, #0a192f 0%, #112240 100%)',
                  color: 'white'
                }}
              >
                <Navbar />
                <Box
                  component="main"
                  sx={{
                    flexGrow: 1,
                    py: 3,
                    px: { xs: 2, sm: 3 },
                    minHeight: 'calc(100vh - 64px - 48px)', // Subtract navbar and footer height
                    position: 'relative'
                  }}
                >
                  <Suspense fallback={<PageShimmer type="default" />}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route
                        path="/dashboard"
                        element={
                          <ProtectedRoute>
                            <Suspense fallback={<PageShimmer type="dashboard" />}>
                              <Dashboard />
                            </Suspense>
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/profile"
                        element={
                          <ProtectedRoute>
                            <Suspense fallback={<PageShimmer type="profile" />}>
                              <Profile />
                            </Suspense>
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/monitoring"
                        element={
                          <ProtectedRoute>
                            <Suspense fallback={<PageShimmer type="monitoring" />}>
                              <Monitoring />
                            </Suspense>
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/map"
                        element={
                          <ProtectedRoute>
                            <Suspense fallback={<PageShimmer type="monitoring" />}>
                              <Map />
                            </Suspense>
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/analytics"
                        element={
                          <ProtectedRoute>
                            <Suspense fallback={<PageShimmer type="monitoring" />}>
                              <Analytics />
                            </Suspense>
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/emergency"
                        element={
                          <ProtectedRoute>
                            <Suspense fallback={<PageShimmer type="emergency" />}>
                              <Emergency />
                            </Suspense>
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/cryopreservation"
                        element={
                          <ProtectedRoute>
                            <Suspense fallback={<PageShimmer type="cryopreservation" />}>
                              <Cryopreservation />
                            </Suspense>
                          </ProtectedRoute>
                        }
                      />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/reset-password" element={<ResetPassword />} />
                      <Route path="/forgot-password" element={
                        <Suspense fallback={<PageShimmer type="default" />}>
                          <ForgotPassword />
                        </Suspense>
                      } />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </Box>
                <Footer />
              </Box>
            </ThemeProvider>
          </SearchProvider>
        </AuthProvider>
      </AlertProvider>
    </ErrorBoundary>
  );
}

export default App;
