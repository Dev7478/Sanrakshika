import React from 'react';
import { Box, Container, Typography } from '@mui/material';
const Analytics = () => {
  return (
    <Box sx={{ minHeight: '100vh', pt: 10, pb: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h2" sx={{ mb: 4 }}>
          Analytics
        </Typography>
        <Typography variant="body1">
          Advanced data analytics to track conservation efforts and measure success.
        </Typography>
      </Container>
    </Box>
  );
};

export default Analytics; 