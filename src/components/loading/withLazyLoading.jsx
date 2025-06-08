import React, { Suspense } from 'react';
import { Box } from '@mui/material';
import { ShimmerCard } from './ShimmerEffect';

const withLazyLoading = (WrappedComponent, LoadingComponent = null) => {
  const LazyLoadedComponent = (props) => {
    const DefaultLoadingComponent = () => (
      <Box sx={{ p: 2 }}>
        <ShimmerCard height={400} />
      </Box>
    );

    return (
      <Suspense fallback={LoadingComponent || <DefaultLoadingComponent />}>
        <WrappedComponent {...props} />
      </Suspense>
    );
  };

  return LazyLoadedComponent;
};

export default withLazyLoading; 