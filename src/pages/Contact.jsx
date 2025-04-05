import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  TextField, 
  Button, 
  Card, 
  CardContent, 
  Divider,
  Snackbar,
  Alert
} from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAlert } from '../contexts/AlertContext';
import emailjs from '@emailjs/browser';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize EmailJS with your public key
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showAlert } = useAlert();
  
  const formRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    // Form section animation
    gsap.from(formRef.current, {
      scrollTrigger: {
        trigger: formRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out'
    });

    // Info section animation
    gsap.from(infoRef.current, {
      scrollTrigger: {
        trigger: infoRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out'
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
      isValid = false;
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: 'Sanrakshika Team',
        };

        const response = await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          templateParams
        );

        if (response.status === 200) {
          showAlert('Your message has been sent successfully!', 'success');
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
          });
        } else {
          throw new Error('Failed to send email');
        }
      } catch (error) {
        console.error('Error sending email:', error);
        showAlert('Failed to send message. Please try again later.', 'error');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Box sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box
        sx={{
          height: '70vh',
          background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          mb: 8
        }}
      >
        <Container>
          <Typography variant="h2" component="h1" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: '800px', mx: 'auto' }}>
            Get in touch with our team for inquiries, partnerships, or to report wildlife emergencies
          </Typography>
        </Container>
      </Box>

      <Container>
        <Grid container spacing={6}>
          {/* Contact Form */}
          <Grid item xs={12} md={7} ref={formRef}>
            <Typography variant="h4" component="h2" gutterBottom>
              Send Us a Message
            </Typography>
            <Divider sx={{ width: '100px', mb: 4, borderColor: 'primary.main', borderWidth: 2 }} />
            
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={!!formErrors.name}
                    helperText={formErrors.name}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Your Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    error={!!formErrors.subject}
                    helperText={formErrors.subject}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    error={!!formErrors.message}
                    helperText={formErrors.message}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isSubmitting}
                    sx={{ 
                      py: 1.5,
                      px: 4,
                      background: 'linear-gradient(135deg, #00f2ff, #0066ff)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #00d8e6, #0052cc)',
                      }
                    }}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={5} ref={infoRef}>
            <Typography variant="h4" component="h2" gutterBottom>
              Contact Information
            </Typography>
            <Divider sx={{ width: '100px', mb: 4, borderColor: 'primary.main', borderWidth: 2 }} />
            
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Headquarters
                </Typography>
                <Typography variant="body1" paragraph>
                  123 Conservation Avenue<br />
                  New Delhi, India 110001
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Emergency Hotline
                </Typography>
                <Typography variant="body1" paragraph>
                  +91 1234567890 (24/7)
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Email
                </Typography>
                <Typography variant="body1">
                  info@sanrakshika.org
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Office Hours
                </Typography>
                <Typography variant="body1" paragraph>
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Social Media
                </Typography>
                <Typography variant="body1">
                  Follow us on Facebook, Twitter, Instagram, and LinkedIn for updates on our conservation efforts.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Map Section */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Find Us
          </Typography>
          <Divider sx={{ width: '100px', mb: 4, borderColor: 'primary.main', borderWidth: 2 }} />
          
          <Box
            sx={{
              height: 400,
              width: '100%',
              borderRadius: 1,
              overflow: 'hidden',
              boxShadow: 3,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448196.05353925847!2d76.76356707499828!3d28.643795883112987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347f62e7%3A0x37205b715389640!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact; 