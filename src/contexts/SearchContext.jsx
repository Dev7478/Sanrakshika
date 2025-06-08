import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const SearchContext = createContext(null);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeSearch = async () => {
      try {
        // Initialize any search-related services or configurations here
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize search:', error);
        setSearchError('Failed to initialize search functionality');
      }
    };

    initializeSearch();
  }, []);

  const performSearch = useCallback(async (query) => {
    if (!isInitialized) {
      throw new Error('Search is not initialized');
    }

    try {
      setIsSearching(true);
      setSearchError(null);

      // Implement your search logic here
      // This is a placeholder implementation
      const results = await new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { id: 1, title: 'Result 1', description: 'Description 1' },
            { id: 2, title: 'Result 2', description: 'Description 2' },
          ]);
        }, 500);
      });

      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      setSearchError(error.message);
    } finally {
      setIsSearching(false);
    }
  }, [isInitialized]);

  const clearSearch = useCallback(() => {
    setSearchResults([]);
    setSearchError(null);
  }, []);

  const value = {
    searchResults,
    isSearching,
    searchError,
    performSearch,
    clearSearch,
    isInitialized
  };

  if (!isInitialized) {
    return null; // Don't render children until search is initialized
  }

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext; 