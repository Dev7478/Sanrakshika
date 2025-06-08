import React from 'react';
import { Box, Skeleton, Grid, styled } from '@mui/material';

const shimmerKeyframes = {
  '0%': {
    backgroundPosition: '-200% 0',
  },
  '100%': {
    backgroundPosition: '200% 0',
  },
};

const ShimmerBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 75%)',
  backgroundSize: '200% 100%',
  animation: 'shimmer 1.5s infinite',
  '@keyframes shimmer': shimmerKeyframes,
  borderRadius: theme.shape.borderRadius,
}));

export const PageShimmer = ({ type = 'default' }) => {
  const renderShimmer = () => {
    switch (type) {
      case 'dashboard':
        return (
          <Box sx={{ width: '100%', maxWidth: '1600px', mx: 'auto', p: 4 }}>
            <Box sx={{ mb: 6 }}>
              <ShimmerBox height={48} width="70%" sx={{ mb: 3 }} />
              <ShimmerBox height={32} width="50%" />
            </Box>
            <Grid container spacing={4}>
              {[1, 2, 3, 4].map((item) => (
                <Grid item xs={12} sm={6} md={3} key={item}>
                  <Box sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2, height: '100%' }}>
                    <ShimmerBox height={160} sx={{ mb: 3 }} />
                    <ShimmerBox height={32} width="80%" sx={{ mb: 2 }} />
                    <ShimmerBox height={24} width="60%" />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        );

      case 'profile':
        return (
          <Box sx={{ width: '100%', maxWidth: '1600px', mx: 'auto', p: 4 }}>
            <Box sx={{ display: 'flex', gap: 4, mb: 6 }}>
              <ShimmerBox height={160} width={160} sx={{ borderRadius: '50%' }} />
              <Box sx={{ flex: 1 }}>
                <ShimmerBox height={40} width="50%" sx={{ mb: 3 }} />
                <ShimmerBox height={32} width="70%" sx={{ mb: 2 }} />
                <ShimmerBox height={32} width="60%" />
              </Box>
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 4 }}>
              {[1, 2, 3].map((item) => (
                <Box key={item} sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
                  <ShimmerBox height={32} width="70%" sx={{ mb: 3 }} />
                  <ShimmerBox height={24} width="90%" sx={{ mb: 2 }} />
                  <ShimmerBox height={24} width="80%" />
                </Box>
              ))}
            </Box>
          </Box>
        );

      case 'monitoring':
        return (
          <Box sx={{ width: '100%', maxWidth: '1600px', mx: 'auto', p: 4 }}>
            <Box sx={{ mb: 6 }}>
              <ShimmerBox height={48} width="60%" sx={{ mb: 3 }} />
              <ShimmerBox height={32} width="40%" />
            </Box>
            <Grid container spacing={4} sx={{ mb: 6 }}>
              {[1, 2, 3, 4].map((item) => (
                <Grid item xs={12} sm={6} md={3} key={item}>
                  <Box sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2, height: '100%' }}>
                    <ShimmerBox height={140} sx={{ mb: 3 }} />
                    <ShimmerBox height={32} width="80%" sx={{ mb: 2 }} />
                    <ShimmerBox height={24} width="60%" />
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
              <ShimmerBox height={500} />
            </Box>
          </Box>
        );

      case 'emergency':
        return (
          <Box sx={{ width: '100%', maxWidth: '1600px', mx: 'auto', p: 4 }}>
            <Box sx={{ mb: 6 }}>
              <ShimmerBox height={48} width="50%" sx={{ mb: 3 }} />
              <ShimmerBox height={32} width="40%" />
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: 4 }}>
              {[1, 2].map((item) => (
                <Box key={item} sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
                  <ShimmerBox height={300} sx={{ mb: 3 }} />
                  <ShimmerBox height={32} width="70%" sx={{ mb: 2 }} />
                  <ShimmerBox height={24} width="90%" sx={{ mb: 2 }} />
                  <ShimmerBox height={24} width="80%" />
                </Box>
              ))}
            </Box>
          </Box>
        );

      case 'cryopreservation':
        return (
          <Box sx={{ width: '100%', maxWidth: '1600px', mx: 'auto', p: 4 }}>
            <Box sx={{ mb: 6 }}>
              <ShimmerBox height={48} width="55%" sx={{ mb: 3 }} />
              <ShimmerBox height={32} width="45%" />
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: 4 }}>
              {[1, 2, 3].map((item) => (
                <Box key={item} sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
                  <ShimmerBox height={200} sx={{ mb: 3 }} />
                  <ShimmerBox height={32} width="75%" sx={{ mb: 2 }} />
                  <ShimmerBox height={24} width="85%" sx={{ mb: 2 }} />
                  <ShimmerBox height={24} width="70%" />
                </Box>
              ))}
            </Box>
          </Box>
        );

      default:
        return (
          <Box sx={{ width: '100%', maxWidth: '1600px', mx: 'auto', p: 4 }}>
            <Box sx={{ mb: 6 }}>
              <ShimmerBox height={48} width="60%" sx={{ mb: 3 }} />
              <ShimmerBox height={32} width="50%" />
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: 4 }}>
              {[1, 2, 3].map((item) => (
                <Box key={item} sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
                  <ShimmerBox height={160} sx={{ mb: 3 }} />
                  <ShimmerBox height={32} width="80%" sx={{ mb: 2 }} />
                  <ShimmerBox height={24} width="90%" sx={{ mb: 2 }} />
                  <ShimmerBox height={24} width="70%" />
                </Box>
              ))}
            </Box>
          </Box>
        );
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a192f 0%, #112240 100%)',
        color: 'white',
      }}
    >
      {renderShimmer()}
    </Box>
  );
};

export default PageShimmer; 