import React from 'react';
import { Box, Container, Typography, Grid, Paper, Button } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SecurityIcon from '@mui/icons-material/Security';
import GroupsIcon from '@mui/icons-material/Groups';

const Emergency = () => {
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
            Emergency Response
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Medical Response Section */}
          <Grid item xs={12} md={6}>
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
                <LocalHospitalIcon sx={{ color: '#00f2ff', mr: 1 }} />
                <Typography variant="h5" sx={{ color: 'white' }}>
                  Medical Response
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 2 }}>
                Our veterinary teams are ready 24/7 to provide immediate medical attention to injured or sick animals.
              </Typography>
              <Button
                variant="contained"
                sx={{
                  background: 'linear-gradient(135deg, #00f2ff, #0066ff)',
                  color: '#ffffff',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #00d8e6, #0052cc)',
                  },
                }}
              >
                Report Medical Emergency
              </Button>
            </Paper>
          </Grid>

          {/* Security Response Section */}
          <Grid item xs={12} md={6}>
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
                <SecurityIcon sx={{ color: '#00f2ff', mr: 1 }} />
                <Typography variant="h5" sx={{ color: 'white' }}>
                  Security Response
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 2 }}>
                Rapid deployment of security teams to protect species from poaching and habitat destruction.
              </Typography>
              <Button
                variant="contained"
                sx={{
                  background: 'linear-gradient(135deg, #00f2ff, #0066ff)',
                  color: '#ffffff',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #00d8e6, #0052cc)',
                  },
                }}
              >
                Report Security Threat
              </Button>
            </Paper>
          </Grid>

          {/* Response Teams Section */}
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 3,
                background: 'rgba(17, 34, 64, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <GroupsIcon sx={{ color: '#00f2ff', mr: 1 }} />
                <Typography variant="h5" sx={{ color: 'white' }}>
                  Response Teams
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 2 }}>
                Our specialized response teams are trained to handle various emergency situations:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                    • Wildlife Rescue Team
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                    • Habitat Protection Unit
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                    • Emergency Medical Unit
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Emergency; 