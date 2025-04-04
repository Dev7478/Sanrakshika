import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Paper, Grid, Card, CardContent, CardHeader, IconButton } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RefreshIcon from '@mui/icons-material/Refresh';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

gsap.registerPlugin(ScrollTrigger);

const Dashboard = () => {
  const dashboardRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    // Animate dashboard container
    gsap.from(dashboardRef.current, {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: 'power3.out',
    });

    // Animate stats
    gsap.from(statsRef.current.children, {
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
      }}
    >
      <Container maxWidth="lg">
        <Box ref={dashboardRef}>
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
            Dashboard
          </Typography>
          
          <Grid container spacing={4} ref={statsRef}>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  background: 'rgba(17, 34, 64, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  height: '100%',
                }}
              >
                <CardHeader
                  title="Total Species"
                  action={
                    <IconButton aria-label="refresh">
                      <RefreshIcon sx={{ color: '#00f2ff' }} />
                    </IconButton>
                  }
                  titleTypographyProps={{ color: '#ffffff' }}
                />
                <CardContent>
                  <Typography variant="h3" sx={{ color: '#00f2ff', mb: 1 }}>
                    156
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TrendingUpIcon sx={{ color: '#4caf50', mr: 1 }} />
                    <Typography variant="body2" sx={{ color: '#8892b0' }}>
                      +12% from last month
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  background: 'rgba(17, 34, 64, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  height: '100%',
                }}
              >
                <CardHeader
                  title="Endangered"
                  action={
                    <IconButton aria-label="refresh">
                      <RefreshIcon sx={{ color: '#00f2ff' }} />
                    </IconButton>
                  }
                  titleTypographyProps={{ color: '#ffffff' }}
                />
                <CardContent>
                  <Typography variant="h3" sx={{ color: '#f44336', mb: 1 }}>
                    42
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <WarningIcon sx={{ color: '#f44336', mr: 1 }} />
                    <Typography variant="body2" sx={{ color: '#8892b0' }}>
                      Critical conservation needed
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  background: 'rgba(17, 34, 64, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  height: '100%',
                }}
              >
                <CardHeader
                  title="Protected"
                  action={
                    <IconButton aria-label="refresh">
                      <RefreshIcon sx={{ color: '#00f2ff' }} />
                    </IconButton>
                  }
                  titleTypographyProps={{ color: '#ffffff' }}
                />
                <CardContent>
                  <Typography variant="h3" sx={{ color: '#4caf50', mb: 1 }}>
                    89
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CheckCircleIcon sx={{ color: '#4caf50', mr: 1 }} />
                    <Typography variant="body2" sx={{ color: '#8892b0' }}>
                      Stable population
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  background: 'rgba(17, 34, 64, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  height: '100%',
                }}
              >
                <CardHeader
                  title="Alerts"
                  action={
                    <IconButton aria-label="refresh">
                      <RefreshIcon sx={{ color: '#00f2ff' }} />
                    </IconButton>
                  }
                  titleTypographyProps={{ color: '#ffffff' }}
                />
                <CardContent>
                  <Typography variant="h3" sx={{ color: '#ff9800', mb: 1 }}>
                    5
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ErrorIcon sx={{ color: '#ff9800', mr: 1 }} />
                    <Typography variant="body2" sx={{ color: '#8892b0' }}>
                      Requires attention
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} md={8}>
              <Paper
                sx={{
                  p: 3,
                  background: 'rgba(17, 34, 64, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  height: '400px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h6" sx={{ color: '#8892b0' }}>
                  Species Population Trends Chart
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 3,
                  background: 'rgba(17, 34, 64, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  height: '400px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h6" sx={{ color: '#8892b0' }}>
                  Recent Alerts
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard; 