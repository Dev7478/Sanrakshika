import { useState, useCallback } from 'react';

const useLoading = (initialState = false) => {
  const [loading, setLoading] = useState(initialState);

  const withLoading = useCallback(async (callback) => {
    try {
      setLoading(true);
      await callback();
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    setLoading,
    withLoading
  };
};

export default useLoading; 