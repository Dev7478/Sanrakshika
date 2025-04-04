import React, { useEffect, useRef } from 'react';
import { Container, Typography, Box, Grid, Button, Card, CardContent, CardMedia, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out',
  background: 'rgba(17, 34, 64, 0.8)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const Home = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    // Animate hero section
    gsap.from(heroRef.current, {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: 'power3.out',
    });

    // Animate features section
    gsap.from(featuresRef.current, {
      duration: 1,
      y: 30,
      opacity: 0,
      delay: 0.3,
      ease: 'power3.out',
    });

    // Animate video section
    gsap.from(videoRef.current, {
      duration: 1,
      x: 50,
      opacity: 0,
      delay: 0.6,
      ease: 'power3.out',
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const features = [
    {
      title: 'Wildlife Monitoring',
      description: 'Track and monitor wildlife populations in real-time',
      image: '/images/monitor.jpg',
      path: '/monitoring'
    },
    {
      title: 'Emergency Response',
      description: 'Quick response system for wildlife emergencies',
      image: '/images/emergency.jpg',
      path: '/emergency'
    },
    {
      title: 'Cryopreservation',
      description: 'Preserve genetic material for future conservation',
      image: '/images/cryo.jpg',
      path: '/cryopreservation'
    }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a192f 0%, #112240 100%)',
      }}
    >
      {/* Hero Section */}
      <Box
        ref={heroRef}
        sx={{
          pt: 8,
          pb: 6,
          position: 'relative',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                component="h1"
                variant="h2"
                sx={{
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #00f2ff, #0066ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2,
                }}
              >
                Welcome to Sanrakshika
              </Typography>
              <Typography variant="h5" sx={{ color: '#8892b0', mb: 4 }}>
                Protecting Earth's Biodiversity Through Advanced Technology and Conservation
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => navigate('/dashboard')}
                  sx={{ mr: 2 }}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  onClick={() => navigate('/about')}
                >
                  Learn More
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                ref={videoRef}
                sx={{
                  p: 2,
                  background: 'rgba(17, 34, 64, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  height: '400px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  src="/images/cryo.mp4"
                  title="Sanrakshika Introduction"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Typography
          component="h2"
          variant="h3"
          align="center"
          sx={{
            mb: 6,
            fontWeight: 700,
            background: 'linear-gradient(135deg, #00f2ff, #0066ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Our Features
        </Typography>
        <Grid container spacing={4} ref={featuresRef}>
          {features.map((feature, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <StyledCard>
                <CardMedia
                  component="img"
                  height="200"
                  image={feature.image}
                  alt={feature.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2" sx={{ color: '#00f2ff' }}>
                    {feature.title}
                  </Typography>
                  <Typography sx={{ color: '#8892b0' }}>
                    {feature.description}
                  </Typography>
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => navigate(feature.path)}
                    sx={{ mt: 2 }}
                  >
                    Learn More →
                  </Button>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Map Preview Section */}
      <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h3"
                sx={{
                  mb: 4,
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #00f2ff, #0066ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Track Wildlife Distribution
              </Typography>
              <Typography variant="body1" sx={{ color: '#8892b0', mb: 4 }}>
                Explore our interactive map to track wildlife populations and their movements across different regions. Get real-time updates and insights into species distribution patterns.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => navigate('/map')}
              >
                View Map
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 3,
                  height: '400px',
                  background: 'rgba(17, 34, 64, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                {/* Map Preview Component */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5995!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzE3LjgiTiA3N8KwMzUnNDAuNiJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Paper
            sx={{
              p: 6,
              textAlign: 'center',
              background: 'rgba(17, 34, 64, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Typography variant="h4" sx={{ color: '#00f2ff', mb: 2 }}>
              Ready to Make a Difference?
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#8892b0', mb: 4 }}>
              Join us in our mission to protect and preserve wildlife for future generations.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/signup')}
            >
              Join Now
            </Button>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 