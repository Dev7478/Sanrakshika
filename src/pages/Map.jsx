import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Paper, Grid } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Map = () => {
  const mapRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Animate map container
    gsap.from(mapRef.current, {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: 'power3.out',
    });

    // Animate content
    gsap.from(contentRef.current, {
      duration: 1,
      y: 30,
      opacity: 0,
      delay: 0.3,
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
        <Grid container spacing={4}>
          <Grid item xs={12}>
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
              Species Distribution Map
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Paper
              ref={mapRef}
              sx={{
                p: 3,
                height: '600px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(17, 34, 64, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Typography variant="h6" sx={{ color: '#8892b0' }}>
                Map Component Will Be Integrated Here
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box ref={contentRef}>
              <Paper
                sx={{
                  p: 3,
                  mb: 3,
                  background: 'rgba(17, 34, 64, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Typography variant="h6" sx={{ color: '#00f2ff', mb: 2 }}>
                  Map Controls
                </Typography>
                <Typography variant="body1" sx={{ color: '#8892b0', mb: 2 }}>
                  Use these controls to filter and view different species distributions across the region.
                </Typography>
                {/* Add map controls here */}
              </Paper>

              <Paper
                sx={{
                  p: 3,
                  background: 'rgba(17, 34, 64, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Typography variant="h6" sx={{ color: '#00f2ff', mb: 2 }}>
                  Legend
                </Typography>
                <Typography variant="body1" sx={{ color: '#8892b0' }}>
                  View the distribution of different species and their conservation status.
                </Typography>
                {/* Add legend here */}
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Map; 