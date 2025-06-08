import React, { useEffect, useRef } from 'react';
import { Box, Container, Grid, Typography, IconButton, Link, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

gsap.registerPlugin(ScrollTrigger);

const FooterContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0, 4),
  background: 'rgba(17, 34, 64, 0.95)',
  backdropFilter: 'blur(10px)',
  borderTop: '1px solid rgba(0, 242, 255, 0.1)',
  color: 'white',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(0, 242, 255, 0.5), transparent)',
  }
}));

const MinimalFooterContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 0),
  background: 'rgba(17, 34, 64, 0.95)',
  backdropFilter: 'blur(10px)',
  borderTop: '1px solid rgba(0, 242, 255, 0.1)',
  color: 'white',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(0, 242, 255, 0.5), transparent)',
  }
}));

const FooterTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Orbitron, sans-serif',
  fontSize: '1.2rem',
  marginBottom: theme.spacing(3),
  color: '#00f2ff',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -8,
    left: 0,
    width: '40px',
    height: '2px',
    background: 'linear-gradient(90deg, #00f2ff, transparent)',
  }
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.7)',
  textDecoration: 'none',
  display: 'block',
  marginBottom: theme.spacing(1.5),
  transition: 'all 0.3s ease',
  '&:hover': {
    color: '#00f2ff',
    transform: 'translateX(5px)',
  }
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.7)',
  marginRight: theme.spacing(1),
  transition: 'all 0.3s ease',
  '&:hover': {
    color: '#00f2ff',
    transform: 'translateY(-3px)',
  }
}));

const ContactItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  color: 'rgba(255, 255, 255, 0.7)',
  '& svg': {
    marginRight: theme.spacing(1),
    color: '#00f2ff',
  }
}));

const Footer = () => {
  const footerRef = useRef(null);
  const sectionsRef = useRef([]);
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || 
                    location.pathname === '/signup' || 
                    location.pathname === '/forgot-password';

  useEffect(() => {
    if (isAuthPage) return;

    const footer = footerRef.current;
    const sections = sectionsRef.current;

    // Initial animation
    gsap.from(footer, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out'
    });

    // Animate each section
    sections.forEach((section, index) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: index * 0.2,
        ease: 'power3.out'
      });
    });

    // Animate social icons
    gsap.from('.social-icons', {
      scrollTrigger: {
        trigger: '.social-icons',
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }, [isAuthPage]);

  if (isAuthPage) {
    return (
      <MinimalFooterContainer>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.5)' }}>
            <Typography variant="body2">
              © {new Date().getFullYear()} Sanrakshika. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </MinimalFooterContainer>
    );
  }

  return (
    <FooterContainer ref={footerRef}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4} ref={el => sectionsRef.current[0] = el}>
            <FooterTitle variant="h6">Sanrakshika</FooterTitle>
            <Typography variant="body2" sx={{ mb: 2, color: 'rgba(255, 255, 255, 0.7)' }}>
              Empowering communities through advanced safety monitoring and real-time alerts. 
              Join us in creating a safer environment for everyone.
            </Typography>
            <Box className="social-icons" sx={{ mt: 3 }}>
              <SocialIcon aria-label="facebook">
                <FacebookIcon />
              </SocialIcon>
              <SocialIcon aria-label="twitter">
                <TwitterIcon />
              </SocialIcon>
              <SocialIcon aria-label="instagram">
                <InstagramIcon />
              </SocialIcon>
              <SocialIcon aria-label="linkedin">
                <LinkedInIcon />
              </SocialIcon>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4} ref={el => sectionsRef.current[1] = el}>
            <FooterTitle variant="h6">Quick Links</FooterTitle>
            <FooterLink component={RouterLink} to="/">Home</FooterLink>
            <FooterLink component={RouterLink} to="/map">Map</FooterLink>
            <FooterLink component={RouterLink} to="/alerts">Alerts</FooterLink>
            <FooterLink component={RouterLink} to="/profile">Profile</FooterLink>
            <FooterLink component={RouterLink} to="/about">About Us</FooterLink>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4} ref={el => sectionsRef.current[2] = el}>
            <FooterTitle variant="h6">Contact Us</FooterTitle>
            <ContactItem>
              <LocationOnIcon />
              <Typography variant="body2">
                123 Safety Street, Security City, 123456
              </Typography>
            </ContactItem>
            <ContactItem>
              <PhoneIcon />
              <Typography variant="body2">
                +91 123 456 7890
              </Typography>
            </ContactItem>
            <ContactItem>
              <EmailIcon />
              <Typography variant="body2">
                contact@sanrakshika.com
              </Typography>
            </ContactItem>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Copyright */}
        <Box sx={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.5)' }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} Sanrakshika. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer; 