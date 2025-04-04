import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Cryopreservation = () => {
  return (
    <Box sx={{ minHeight: '100vh', pt: 10, pb: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h2" sx={{ mb: 4 }}>
          Cryopreservation
        </Typography>
        <Typography variant="body1">
          Advanced techniques for preserving genetic material of endangered species.
        </Typography>
      </Container>
    </Box>
  );
};

export default Cryopreservation; 