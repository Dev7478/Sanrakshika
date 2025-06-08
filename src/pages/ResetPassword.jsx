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
  Alert
} from '@mui/material';
import { Link as RouterLink, useNavigate, useSearchParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { useAuth } from '../contexts/AuthContext';
import { useAlert } from '../contexts/AlertContext';
import { Shimmer } from '../components/loading/ShimmerEffect';

// Lazy load the background image
const BackgroundImage = React.lazy(() => import('../components/BackgroundImage'));

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  
  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get('oobCode');
  
  const { verifyResetCode, confirmResetPassword } = useAuth();
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

    // Verify reset code
    const verifyCode = async () => {
      if (!oobCode) {
        setError('Invalid or expired reset link');
        setVerifying(false);
        return;
      }

      try {
        const email = await verifyResetCode(oobCode);
        setEmail(email);
        setVerifying(false);
      } catch (error) {
        setError('Invalid or expired reset link');
        setVerifying(false);
      }
    };

    verifyCode();
  }, [oobCode, verifyResetCode]);

  const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!password.trim() || !confirmPassword.trim()) {
      setError('All fields are required');
      return;
    }
    
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long and contain uppercase, lowercase, and numbers');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      await confirmResetPassword(oobCode, password);
      setSuccess(true);
      showAlert('Password has been reset successfully!', 'success');
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Password reset error:', error);
      setError('Failed to reset password. Please try again.');
      showAlert('Failed to reset password. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <Box 
        sx={{ 
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 8,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Suspense fallback={<Shimmer width="100%" height="100vh" />}>
          <BackgroundImage />
        </Suspense>
        
        <Container maxWidth="sm">
          <Paper 
            elevation={6} 
            sx={{ 
              p: 4, 
              borderRadius: 2,
              background: 'rgba(255, 255, 255, 0.95)',
              position: 'relative',
              zIndex: 1,
              textAlign: 'center'
            }}
          >
            <CircularProgress size={40} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Verifying reset link...
            </Typography>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        py: 8,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Suspense fallback={<Shimmer width="100%" height="100vh" />}>
        <BackgroundImage />
      </Suspense>
      
      <Container maxWidth="sm">
        <Paper 
          ref={formRef}
          elevation={6} 
          sx={{ 
            p: 4, 
            borderRadius: 2,
            background: 'rgba(255, 255, 255, 0.95)',
            position: 'relative',
            zIndex: 1
          }}
        >
          {loading ? (
            <Box sx={{ py: 3 }}>
              <Shimmer width="60%" height="40px" sx={{ mb: 2 }} />
              <Shimmer width="100%" height="20px" sx={{ mb: 1 }} />
              <Shimmer width="80%" height="20px" sx={{ mb: 3 }} />
              <Divider sx={{ my: 3 }} />
              <Shimmer width="100%" height="56px" sx={{ mb: 2 }} />
              <Shimmer width="100%" height="48px" />
            </Box>
          ) : (
            <>
              <Typography variant="h4" component="h1" align="center" gutterBottom>
                Reset Password
              </Typography>
              <Typography variant="body1" align="center" color="text.secondary" paragraph>
                Enter your new password for {email}
              </Typography>
              
              <Divider sx={{ my: 3 }} />
              
              {success ? (
                <Box sx={{ textAlign: 'center', py: 3 }}>
                  <Typography variant="h6" color="success.main" gutterBottom>
                    Password Reset Successful!
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Your password has been reset successfully. You will be redirected to the login page.
                  </Typography>
                  <CircularProgress size={24} sx={{ mt: 2 }} />
                </Box>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                      {error}
                    </Alert>
                  )}
                  
                  <TextField
                    fullWidth
                    label="New Password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    required
                    disabled={loading}
                    sx={{ mb: 2 }}
                  />
                  
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setError('');
                    }}
                    required
                    disabled={loading}
                    sx={{ mb: 3 }}
                  />
                  
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{ 
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
                      'Reset Password'
                    )}
                  </Button>
                </form>
              )}
            </>
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
                Back to Login
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ResetPassword; 