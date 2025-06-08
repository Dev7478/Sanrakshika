import React from 'react';
import { Box, keyframes } from '@mui/material';
import { styled } from '@mui/material/styles';

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
}));

// Basic shimmer component
export const Shimmer = ({ width = '100%', height = '20px', borderRadius = '4px' }) => (
  <ShimmerBox
    sx={{
      width,
      height,
      borderRadius,
    }}
  />
);

// Card shimmer component
export const ShimmerCard = ({ height = 200, width = '100%' }) => (
  <Box sx={{ width }}>
    <ShimmerEffect height={height * 0.6} width="100%" />
    <Box sx={{ p: 2 }}>
      <ShimmerEffect height={24} width="60%" sx={{ mb: 1 }} />
      <ShimmerEffect height={16} width="80%" />
    </Box>
  </Box>
);

// Text shimmer component
export const ShimmerText = ({ lines = 3, width = '100%' }) => (
  <Box sx={{ width }}>
    {Array.from(new Array(lines)).map((_, index) => (
      <ShimmerEffect
        key={index}
        height={20}
        width={index === 0 ? '80%' : index === 1 ? '60%' : '40%'}
        sx={{ mb: index === lines - 1 ? 0 : 1 }}
      />
    ))}
  </Box>
);

// Avatar shimmer component
export const ShimmerAvatar = ({ size = 40 }) => (
  <ShimmerEffect
    height={size}
    width={size}
    sx={{ borderRadius: '50%' }}
  />
);

// Button shimmer component
export const ShimmerButton = ({ width = 120, height = 36 }) => (
  <ShimmerEffect
    height={height}
    width={width}
    sx={{ borderRadius: 1 }}
  />
);

// Content loader component
export const ContentLoader = ({ rows = 3, height = 20, spacing = 2 }) => (
  <Box sx={{ width: '100%', p: 2 }}>
    {Array.from(new Array(rows)).map((_, index) => (
      <ShimmerBox
        key={index}
        sx={{
          height: height,
          mb: index === rows - 1 ? 0 : spacing,
          width: index === 0 ? '80%' : index === 1 ? '60%' : '40%',
          opacity: 1 - (index * 0.1),
        }}
      />
    ))}
  </Box>
);

// Main shimmer effect component
const ShimmerEffect = ({
  width = '100%',
  height = '20px',
  sx = {},
}) => (
  <ShimmerBox
    sx={{
      width,
      height,
      ...sx,
    }}
  />
);

export default ShimmerEffect; 