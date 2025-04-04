import React from 'react';
import { Box, Container, Typography, Grid, Paper, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const Monitoring = () => {
  return (
    <Box sx={{ minHeight: '100vh', pt: 10, pb: 6, background: 'linear-gradient(135deg, #0a192f 0%, #112240 100%)' }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              color: 'white',
              background: 'linear-gradient(135deg, #00f2ff, #0066ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Species Monitoring
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Real-time Location Tracking */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                height: '100%',
                background: 'rgba(17, 34, 64, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOnIcon sx={{ color: '#00f2ff', mr: 1 }} />
                <Typography variant="h5" sx={{ color: 'white' }}>
                  Location Tracking
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                Real-time tracking of endangered species movements and habitat usage patterns.
              </Typography>
            </Paper>
          </Grid>

          {/* Population Trends */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                height: '100%',
                background: 'rgba(17, 34, 64, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon sx={{ color: '#00f2ff', mr: 1 }} />
                <Typography variant="h5" sx={{ color: 'white' }}>
                  Population Trends
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                Monitoring population changes and analyzing trends to inform conservation strategies.
              </Typography>
            </Paper>
          </Grid>

          {/* Alert System */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                height: '100%',
                background: 'rgba(17, 34, 64, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <NotificationsActiveIcon sx={{ color: '#00f2ff', mr: 1 }} />
                <Typography variant="h5" sx={{ color: 'white' }}>
                  Alert System
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                Instant notifications for unusual behavior or potential threats to species.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Monitoring; 