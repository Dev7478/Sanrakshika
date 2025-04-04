import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Paper, TextField, Button, Grid, Link, Checkbox, FormControlLabel } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link as RouterLink } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Login = () => {
  const loginRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    // Animate login container
    gsap.from(loginRef.current, {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: 'power3.out',
    });

    // Animate form elements
    gsap.from(formRef.current.children, {
      duration: 0.8,
      y: 30,
      opacity: 0,
      stagger: 0.1,
      ease: 'power3.out',
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        pt: 10,
        pb: 6,
        background: 'linear-gradient(135deg, #0a192f 0%, #112240 100%)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Box ref={loginRef}>
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              mb: 4,
              fontWeight: 700,
              background: 'linear-gradient(135deg, #00f2ff, #0066ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Login
          </Typography>
          
          <Paper
            ref={formRef}
            sx={{
              p: 4,
              background: 'rgba(17, 34, 64, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <form>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#ffffff',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.23)',
                    },
                    '&:hover fieldset': {
                      borderColor: '#00f2ff',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#00f2ff',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                    '&.Mui-focused': {
                      color: '#00f2ff',
                    },
                  },
                }}
              />
              
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#ffffff',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.23)',
                    },
                    '&:hover fieldset': {
                      borderColor: '#00f2ff',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#00f2ff',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                    '&.Mui-focused': {
                      color: '#00f2ff',
                    },
                  },
                }}
              />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        '&.Mui-checked': {
                          color: '#00f2ff',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Remember me
                    </Typography>
                  }
                />
                
                <Link
                  component={RouterLink}
                  to="/forgot-password"
                  sx={{
                    color: '#00f2ff',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  <Typography variant="body2">Forgot password?</Typography>
                </Link>
              </Box>
              
              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  mt: 3,
                  mb: 2,
                  background: 'linear-gradient(135deg, #00f2ff, #0066ff)',
                  color: '#ffffff',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #00d8e6, #0052cc)',
                  },
                }}
              >
                Sign In
              </Button>
              
              <Grid container justifyContent="center">
                <Grid item>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Don't have an account?{' '}
                    <Link
                      component={RouterLink}
                      to="/register"
                      sx={{
                        color: '#00f2ff',
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      Sign Up
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Login; 