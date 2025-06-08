import React from 'react';
import { Box, CircularProgress, Typography, keyframes } from '@mui/material';
import { styled } from '@mui/material/styles';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 242, 255, 0.7);
  }
  
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(0, 242, 255, 0);
  }
  
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 242, 255, 0);
  }
`;

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #0a192f 0%, #112240 100%)',
  animation: `${fadeIn} 0.5s ease-in-out`,
}));

const LoadingSpinner = styled(CircularProgress)(({ theme }) => ({
  color: '#00f2ff',
  animation: `${pulse} 2s infinite`,
  '& .MuiCircularProgress-circle': {
    strokeLinecap: 'round',
  },
}));

const LoadingText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: '#8892b0',
  fontSize: '1.1rem',
  fontWeight: 500,
  textAlign: 'center',
  maxWidth: '300px',
}));

const PageLoader = ({ message = 'Loading...' }) => {
  return (
    <LoadingContainer>
      <LoadingSpinner size={60} thickness={4} />
      <LoadingText variant="body1">
        {message}
      </LoadingText>
    </LoadingContainer>
  );
};

export default PageLoader; 