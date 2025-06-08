import React, { useState, useEffect, useRef, Suspense } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Link,
  Divider,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { useAuth } from '../contexts/AuthContext';
import { useAlert } from '../contexts/AlertContext';
import { Shimmer } from '../components/loading/ShimmerEffect';

// Lazy load the background image
const BackgroundImage = React.lazy(() => import('../components/BackgroundImage'));

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  const { resetPassword } = useAuth();
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  
  const formRef = useRef(null);

  useEffect(() => {
    // Wait for the component to mount
    const timer = setTimeout(() => {
      if (formRef.current) {
        gsap.from(formRef.current, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power3.out'
        });
      }
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      await resetPassword(email);
      setSuccess(true);
      setNotification({
        open: true,
        message: 'Password reset email sent! Please check your inbox.',
        severity: 'success'
      });
    } catch (error) {
      console.error('Password reset error:', error);
      setError('Failed to send reset email. Please try again.');
      setNotification({
        open: true,
        message: 'Failed to send reset email. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        py: 8,
        position: 'relative'
      }}
    >
      {/* Success/Error Notification */}
      <Snackbar
        open={notification.open}
        autoHideDuration={2000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity}
          sx={{ 
            width: '100%',
            background: notification.severity === 'success' 
              ? 'linear-gradient(135deg, rgba(46,125,50,0.9) 0%, rgba(27,94,32,0.9) 100%)'
              : 'linear-gradient(135deg, rgba(211,47,47,0.9) 0%, rgba(198,40,40,0.9) 100%)',
            color: 'white',
            '& .MuiAlert-icon': {
              color: 'white'
            }
          }}
        >
          {notification.message}
        </Alert>
      </Snackbar>

      <Container maxWidth="xs">
        <Paper
          ref={formRef}
          elevation={3}
          sx={{
            p: 4,
            background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.5) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px'
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                color: 'primary.main',
                fontWeight: 600,
                mb: 1,
                background: 'linear-gradient(135deg, #00f2ff 0%, #0066ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Reset Password
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Enter your email address and we'll send you instructions to reset your password.
            </Typography>
          </Box>

          {loading ? (
            <Box sx={{ py: 3 }}>
              <Shimmer 
                width="100%" 
                height="56px" 
                sx={{ 
                  mb: 3,
                  background: 'linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.2) 100%)',
                  borderRadius: '4px'
                }} 
              />
              <Shimmer 
                width="100%" 
                height="48px" 
                sx={{ 
                  background: 'linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.2) 100%)',
                  borderRadius: '4px'
                }} 
              />
            </Box>
          ) : success ? (
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant="h6" color="success.main" gutterBottom>
                Email Sent!
              </Typography>
              <Typography variant="body1" paragraph>
                We've sent password reset instructions to your email address.
                Please check your inbox and follow the link to reset your password.
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/login')}
                sx={{ 
                  mt: 2,
                  py: 1.5,
                  background: 'linear-gradient(135deg, #00f2ff 0%, #0066ff 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #00d8e6 0%, #0052cc 100%)',
                  }
                }}
              >
                Return to Login
              </Button>
            </Box>
          ) : (
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                error={!!error}
                helperText={error}
                required
                disabled={loading}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': {
                      borderColor: 'rgba(255,255,255,0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255,255,255,0.7)',
                  },
                }}
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ 
                  mb: 3,
                  py: 1.5,
                  background: 'linear-gradient(135deg, #00f2ff 0%, #0066ff 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #00d8e6 0%, #0052cc 100%)',
                  }
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Send Reset Instructions'
                )}
              </Button>

              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Remember your password?{' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    sx={{
                      color: 'primary.main',
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Back to Login
                  </Link>
                </Typography>
              </Box>
            </form>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default ForgotPassword; 