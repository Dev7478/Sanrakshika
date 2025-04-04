import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Sanrakshika
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Protecting Earth's Biodiversity
        </Typography>
      </Box>
    </Container>
  );
};

export default Home; 