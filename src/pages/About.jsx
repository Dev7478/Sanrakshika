import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Grid, Paper, Card, CardContent, Divider } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Nature as NatureIcon,
  Science as ScienceIcon,
  Security as SecurityIcon,
  People as PeopleIcon
} from '@mui/icons-material';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const heroRef = useRef(null);
  const missionRef = useRef(null);
  const teamRef = useRef(null);

  useEffect(() => {
    // Hero section animation
    gsap.from(heroRef.current, {
      duration: 1.5,
      y: 100,
      opacity: 0,
      ease: 'power4.out',
    });

    // Mission section animation
    gsap.from('.mission-content', {
      scrollTrigger: {
        trigger: missionRef.current,
        start: 'top center',
        toggleActions: 'play none none reverse',
      },
      duration: 1,
      x: -100,
      opacity: 0,
      stagger: 0.2,
      ease: 'power3.out',
    });

    // Team section animation
    gsap.from('.team-member', {
      scrollTrigger: {
        trigger: teamRef.current,
        start: 'top center',
        toggleActions: 'play none none reverse',
      },
      duration: 1,
      y: 50,
      opacity: 0,
      stagger: 0.2,
      ease: 'power3.out',
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const teamMembers = [
    {
      name: 'Debanshu chatterjee',
      role: 'Team Lead',
      image: '/images/debanshuchatterjee.jpeg',
      description: 'Backend Developer.',
    },
    {
      name: 'Anushka roy',
      role: 'Team Participant',
      image: '/images/anushkaroy.jpeg',
      description: 'Backend Developer.',
    },
    {
      name: 'Abhiraj Bose',
      role: 'Team Participant',
      image: '/images/abhirajbose.jpeg',
      description: 'Full Stack Developer.',
    },
    {
      name: 'Anjali Kumari Yadav',
      role: 'Team Participant',
      image: '/images/anjaliyadav.jpeg',
      description: 'Frontend Developer.',
    },
  ];

  const features = [
    {
      icon: <NatureIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Biodiversity Conservation',
      description: 'Dedicated to preserving endangered species and their habitats through innovative conservation strategies.'
    },
    {
      icon: <ScienceIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Research & Innovation',
      description: 'Conducting cutting-edge research in cryopreservation and species preservation techniques.'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Emergency Response',
      description: '24/7 emergency response system for wildlife protection and conservation emergencies.'
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Community Engagement',
      description: 'Working closely with local communities to promote sustainable conservation practices.'
    }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a192f 0%, #112240 100%)',
        color: '#ffffff',
        overflow: 'hidden',
      }}
    >
      {/* Hero Section */}
      <Box
        ref={heroRef}
        sx={{
          height: '60vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at center, rgba(0,242,255,0.1) 0%, transparent 70%)',
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '3rem', md: '4.5rem' },
              fontWeight: 800,
              background: 'linear-gradient(135deg, #00f2ff, #0066ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            About Sanrakshika
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: '#8892b0',
              maxWidth: '800px',
              lineHeight: 1.6,
            }}
          >
            We are dedicated to preserving Earth's biodiversity through advanced conservation techniques, research, and community engagement.
          </Typography>
        </Container>
      </Box>

      {/* Mission Section */}
      <Box
        ref={missionRef}
        sx={{
          py: 10,
          background: 'rgba(17, 34, 64, 0.5)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                className="mission-content"
                sx={{
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-20%',
                    left: '-20%',
                    width: '140%',
                    height: '140%',
                    background: 'radial-gradient(circle at center, rgba(0,242,255,0.1) 0%, transparent 70%)',
                    animation: 'pulse 4s ease-in-out infinite',
                  },
                  '@keyframes pulse': {
                    '0%': { transform: 'scale(1)', opacity: 0.5 },
                    '50%': { transform: 'scale(1.1)', opacity: 0.3 },
                    '100%': { transform: 'scale(1)', opacity: 0.5 },
                  },
                }}
              >
                <img
                  src="/images/lab.jpg"
                  alt="Our Mission"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '20px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className="mission-content">
                <Typography
                  variant="h2"
                  sx={{
                    mb: 4,
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #00f2ff, #0066ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Our Mission
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#8892b0',
                    mb: 3,
                    lineHeight: 1.8,
                    fontSize: '1.1rem',
                  }}
                >
                  At Sanrakshika, we believe in the power of science and technology to protect our planet's precious biodiversity. Our mission is to:
                </Typography>
                <Box
                  sx={{
                    display: 'grid',
                    gap: 2,
                  }}
                >
                  {[
                    'Preserve endangered species through advanced monitoring and protection techniques',
                    'Restore and protect natural habitats for wildlife conservation',
                    'Develop innovative solutions for biodiversity preservation',
                    'Engage communities in conservation efforts',
                  ].map((item, index) => (
                    <Paper
                      key={index}
                      sx={{
                        p: 2,
                        background: 'rgba(255,255,255,0.05)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '10px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#00f2ff',
                          fontSize: '1.5rem',
                        }}
                      >
                        {['🌍', '🌿', '🔬', '🤝'][index]}
                      </Typography>
                      <Typography
                        sx={{
                          color: '#8892b0',
                        }}
                      >
                        {item}
                      </Typography>
                    </Paper>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Team Section */}
      <Box
        ref={teamRef}
        sx={{
          py: 10,
          background: 'linear-gradient(135deg, #112240 0%, #0a192f 100%)',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            sx={{
              mb: 6,
              fontWeight: 700,
              background: 'linear-gradient(135deg, #00f2ff, #0066ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Our Team
          </Typography>
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  className="team-member"
                  sx={{
                    p: 3,
                    height: '100%',
                    background: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '20px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '200px',
                      mb: 2,
                      borderRadius: '15px',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1,
                      color: '#00f2ff',
                    }}
                  >
                    {member.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      mb: 2,
                      color: '#8892b0',
                    }}
                  >
                    {member.role}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#8892b0',
                    }}
                  >
                    {member.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              mb: 3,
              background: 'linear-gradient(135deg, #00f2ff, #0066ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold'
            }}
          >
            About Sanrakshika
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto' }}>
            Pioneering the future of biodiversity conservation through innovative technology and sustainable practices
          </Typography>
        </Box>

        <Paper
          elevation={3}
          sx={{
            p: 6,
            mb: 8,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <Typography variant="h5" sx={{ mb: 4, color: 'primary.main' }}>
            Our Mission
          </Typography>
          <Typography variant="body1" paragraph>
            At Sanrakshika, we are committed to preserving Earth's biodiversity through innovative conservation methods. 
            Our mission is to protect endangered species and their habitats while advancing scientific research in 
            cryopreservation and species preservation.
          </Typography>
          <Typography variant="body1">
            We combine cutting-edge technology with traditional conservation practices to create sustainable solutions 
            for protecting our planet's precious wildlife. Through collaboration with scientists, conservationists, 
            and local communities, we work towards a future where all species can thrive.
          </Typography>
        </Paper>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Paper
          elevation={3}
          sx={{
            p: 6,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <Typography variant="h5" sx={{ mb: 4, color: 'primary.main' }}>
            Our Impact
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Conservation Achievements
              </Typography>
              <Typography variant="body1" paragraph>
                • Successfully preserved genetic material of over 100 endangered species<br />
                • Established 5 conservation centers across India<br />
                • Trained 500+ local conservationists<br />
                • Responded to 200+ wildlife emergencies
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Future Goals
              </Typography>
              <Typography variant="body1" paragraph>
                • Expand cryopreservation facilities to cover more species<br />
                • Develop AI-powered monitoring systems<br />
                • Establish international conservation partnerships<br />
                • Create educational programs for youth
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default About; 