import React, { useEffect, useRef, useState } from 'react';
import { Container, Typography, Box, Grid, Button, Card, CardContent, CardMedia, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSpring, animated } from '@react-spring/web';
import CountUp from 'react-countup';
import PageLoader from '../components/loading/PageLoader';
import CircularProgress from '@mui/material/CircularProgress';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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

const LoadingContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #0a192f 0%, #112240 100%)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle, rgba(0,242,255,0.1) 0%, rgba(0,242,255,0) 70%)',
    animation: 'pulse 3s ease-in-out infinite',
  },
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(0.8)',
      opacity: 0.5,
    },
    '50%': {
      transform: 'scale(1.2)',
      opacity: 0.8,
    },
    '100%': {
      transform: 'scale(0.8)',
      opacity: 0.5,
    },
  },
}));

const LoadingText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: '#00f2ff',
  fontSize: '1.2rem',
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '2px',
  animation: 'fadeInOut 2s ease-in-out infinite',
  '@keyframes fadeInOut': {
    '0%': {
      opacity: 0.3,
    },
    '50%': {
      opacity: 1,
    },
    '100%': {
      opacity: 0.3,
    },
  },
}));

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  color: '#00f2ff',
  '& .MuiCircularProgress-circle': {
    strokeWidth: 3,
    strokeLinecap: 'round',
  },
  animation: 'rotate 2s linear infinite',
  '@keyframes rotate': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
}));

const StatsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  background: 'rgba(17, 34, 64, 0.8)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(0, 242, 255, 0.2)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    borderColor: 'rgba(0, 242, 255, 0.4)',
  },
}));

const Home = () => {
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('Loading');
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const videoRef = useRef(null);
  const [springProps, setSpringProps] = useSpring(() => ({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 300, friction: 20 }
  }));
  const statsRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
    // Simulate loading time with text changes
    const loadingTexts = ['Loading', 'Preparing', 'Almost Ready'];
    let currentIndex = 0;
    
    const textInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % loadingTexts.length;
      setLoadingText(loadingTexts[currentIndex]);
    }, 1000);

    const timer = setTimeout(() => {
      setIsLoading(false);
      clearInterval(textInterval);
    }, 3000);

    // Initialize ScrollTrigger for stats section
    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top center+=100',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    return () => {
      clearTimeout(timer);
      clearInterval(textInterval);
    };
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

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

  if (isLoading) {
    return (
      <LoadingContainer>
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <StyledCircularProgress size={80} thickness={4} />
          <LoadingText>{loadingText}</LoadingText>
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle, rgba(0,242,255,0.2) 0%, rgba(0,242,255,0) 70%)',
              filter: 'blur(20px)',
              animation: 'glow 2s ease-in-out infinite',
              '@keyframes glow': {
                '0%': {
                  opacity: 0.5,
                  transform: 'scale(0.8)',
                },
                '50%': {
                  opacity: 1,
                  transform: 'scale(1.2)',
                },
                '100%': {
                  opacity: 0.5,
                  transform: 'scale(0.8)',
                },
              },
            }}
          />
        </Box>
      </LoadingContainer>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a192f 0%, #112240 100%)',
        opacity: isMounted ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Hero Section */}
      <Box
        ref={heroRef}
        sx={{
          pt: 12,
          pb: 6,
          position: 'relative',
          opacity: 1,
          transform: 'translateY(0)'
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
                  sx={{
                    mr: 2,
                    background: 'linear-gradient(135deg, #00f2ff, #0066ff)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #00d8e6, #0052cc)',
                    }
                  }}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  onClick={() => navigate('/about')}
                  sx={{
                    borderColor: '#00f2ff',
                    color: '#00f2ff',
                    '&:hover': {
                      borderColor: '#00d8e6',
                      backgroundColor: 'rgba(0, 242, 255, 0.1)',
                    }
                  }}
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
                  opacity: 1
                }}
              >
                {!isVideoLoaded && <PageLoader message="Loading video..." />}
                <video
                  width="100%"
                  height="100%"
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{
                    objectFit: 'cover',
                    display: isVideoLoaded ? 'block' : 'none'
                  }}
                  onLoadedData={handleVideoLoad}
                >
                  <source src="/images/cryo.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
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
            opacity: 1
          }}
        >
          Our Features
        </Typography>
        <Grid 
          container 
          spacing={4} 
          ref={featuresRef}
          sx={{ 
            opacity: 1
          }}
        >
          {features.map((feature, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <StyledCard
                sx={{
                  opacity: 1,
                  animation: isMounted ? `fadeInUp 0.8s ease-out ${index * 0.2}s forwards` : 'none',
                  '@keyframes fadeInUp': {
                    '0%': {
                      opacity: 0,
                      transform: 'translateY(20px)'
                    },
                    '100%': {
                      opacity: 1,
                      transform: 'translateY(0)'
                    }
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={feature.image}
                  alt={feature.title}
                  loading="lazy"
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
                    sx={{
                      mt: 2,
                      color: '#00f2ff',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 242, 255, 0.1)',
                      }
                    }}
                  >
                    Learn More →
                  </Button>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Stats Section */}
      <Box sx={{ py: 8, bgcolor: 'rgba(17, 34, 64, 0.2)' }}>
        <Container maxWidth="lg">
          <Typography
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
            Our Impact
          </Typography>
          <Grid container spacing={4} ref={statsRef}>
            <Grid item xs={12} sm={6} md={3}>
              <StatsCard>
                <Typography variant="h3" sx={{ color: '#00f2ff', mb: 1 }}>
                  <CountUp
                    end={150}
                    duration={2.5}
                    suffix="+"
                    enableScrollSpy
                    scrollSpyOnce
                  />
                </Typography>
                <Typography variant="h6" sx={{ color: '#8892b0' }}>
                  Species Protected
                </Typography>
              </StatsCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatsCard>
                <Typography variant="h3" sx={{ color: '#00f2ff', mb: 1 }}>
                  <CountUp
                    end={50}
                    duration={2.5}
                    suffix="K+"
                    enableScrollSpy
                    scrollSpyOnce
                  />
                </Typography>
                <Typography variant="h6" sx={{ color: '#8892b0' }}>
                  Conservation Areas
                </Typography>
              </StatsCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatsCard>
                <Typography variant="h3" sx={{ color: '#00f2ff', mb: 1 }}>
                  <CountUp
                    end={200}
                    duration={2.5}
                    suffix="+"
                    enableScrollSpy
                    scrollSpyOnce
                  />
                </Typography>
                <Typography variant="h6" sx={{ color: '#8892b0' }}>
                  Research Projects
                </Typography>
              </StatsCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatsCard>
                <Typography variant="h3" sx={{ color: '#00f2ff', mb: 1 }}>
                  <CountUp
                    end={1000}
                    duration={2.5}
                    suffix="+"
                    enableScrollSpy
                    scrollSpyOnce
                  />
                </Typography>
                <Typography variant="h6" sx={{ color: '#8892b0' }}>
                  Emergency Response
                </Typography>
              </StatsCard>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Map Preview Section */}
      <Box sx={{ py: 8, bgcolor: 'rgba(17, 34, 64, 0.4)' }}>
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
                sx={{
                  background: 'linear-gradient(135deg, #00f2ff, #0066ff)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #00d8e6, #0052cc)',
                  }
                }}
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
                  border: '1px solid rgba(0, 242, 255, 0.2)',
                  boxShadow: '0 4px 30px rgba(0, 242, 255, 0.1)'
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

      {/* Try Us Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Paper
            sx={{
              p: 6,
              textAlign: 'center',
              background: 'rgba(17, 34, 64, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 242, 255, 0.2)',
              boxShadow: '0 4px 30px rgba(0, 242, 255, 0.1)'
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
              sx={{
                background: 'linear-gradient(135deg, #00f2ff, #0066ff)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #00d8e6, #0052cc)',
                }
              }}
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