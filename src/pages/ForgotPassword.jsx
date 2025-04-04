import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Link,
  Divider,
  CircularProgress
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { useAuth } from '../contexts/AuthContext';
import { useAlert } from '../contexts/AlertContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const { resetPassword } = useAuth();
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  
  const formRef = useRef(null);

  useEffect(() => {
    // Form animation
    gsap.from(formRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out'
    });
  }, []);

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
      showAlert('Password reset email sent! Please check your inbox.', 'success');
    } catch (error) {
      console.error('Password reset error:', error);
      setError(
        error.code === 'auth/user-not-found'
          ? 'No account found with this email address'
          : 'Failed to send reset email. Please try again.'
      );
      showAlert('Failed to send reset email. Please try again.', 'error');
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
        py: 8,
        background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Container maxWidth="sm">
        <Paper 
          ref={formRef}
          elevation={6} 
          sx={{ 
            p: 4, 
            borderRadius: 2,
            background: 'rgba(255, 255, 255, 0.95)'
          }}
        >
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Reset Password
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" paragraph>
            Enter your email address and we'll send you instructions to reset your password.
          </Typography>
          
          <Divider sx={{ my: 3 }} />
          
          {success ? (
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
                  background: 'linear-gradient(135deg, #00f2ff, #0066ff)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #00d8e6, #0052cc)',
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
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ 
                  mt: 3,
                  py: 1.5,
                  background: 'linear-gradient(135deg, #00f2ff, #0066ff)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #00d8e6, #0052cc)',
                  }
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Send Reset Instructions'
                )}
              </Button>
            </form>
          )}
          
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Remember your password?{' '}
              <Link 
                component={RouterLink} 
                to="/login" 
                sx={{ 
                  color: 'primary.main',
                  fontWeight: 'bold',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Sign In
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ForgotPassword; 