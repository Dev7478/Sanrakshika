// Set an item in cache
export const setCacheItem = (key, value, expiryMinutes = 60) => {
  try {
    const item = {
      value,
      timestamp: new Date().getTime(),
      expiry: new Date().getTime() + (expiryMinutes * 60 * 1000)
    };
    localStorage.setItem(key, JSON.stringify(item));
    return true;
  } catch (error) {
    console.error('Error setting cache item:', error);
    return false;
  }
};

// Get an item from cache
export const getCacheItem = (key) => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const { value, expiry } = JSON.parse(item);
    if (new Date().getTime() > expiry) {
      localStorage.removeItem(key);
      return null;
    }

    return value;
  } catch (error) {
    console.error('Error getting cache item:', error);
    return null;
  }
};

// Remove an item from cache
export const removeCacheItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing cache item:', error);
    return false;
  }
};

// Clear all cache
export const clearCache = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing cache:', error);
    return false;
  }
};

// Get cache size
export const getCacheSize = () => {
  try {
    let size = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        size += localStorage[key].length;
      }
    }
    return size;
  } catch (error) {
    console.error('Error getting cache size:', error);
    return 0;
  }
};

// Check if cache is full
export const isCacheFull = () => {
  try {
    const testKey = 'test';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return false;
  } catch (error) {
    return true;
  }
};

// Set multiple items in cache
export const setMultipleCacheItems = (items, expiryMinutes = 60) => {
  try {
    items.forEach(({ key, value }) => {
      setCacheItem(key, value, expiryMinutes);
    });
    return true;
  } catch (error) {
    console.error('Error setting multiple cache items:', error);
    return false;
  }
};

// Get multiple items from cache
export const getMultipleCacheItems = (keys) => {
  try {
    const items = {};
    keys.forEach(key => {
      items[key] = getCacheItem(key);
    });
    return items;
  } catch (error) {
    console.error('Error getting multiple cache items:', error);
    return {};
  }
};

// Remove multiple items from cache
export const removeMultipleCacheItems = (keys) => {
  try {
    keys.forEach(key => {
      removeCacheItem(key);
    });
    return true;
  } catch (error) {
    console.error('Error removing multiple cache items:', error);
    return false;
  }
};

// Get all cache keys
export const getCacheKeys = () => {
  try {
    return Object.keys(localStorage);
  } catch (error) {
    console.error('Error getting cache keys:', error);
    return [];
  }
};

// Check if cache item exists
export const hasCacheItem = (key) => {
  try {
    return localStorage.getItem(key) !== null;
  } catch (error) {
    console.error('Error checking cache item:', error);
    return false;
  }
};

// Get cache item expiry
export const getCacheItemExpiry = (key) => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const { expiry } = JSON.parse(item);
    return expiry;
  } catch (error) {
    console.error('Error getting cache item expiry:', error);
    return null;
  }
};

// Extend cache item expiry
export const extendCacheItemExpiry = (key, additionalMinutes) => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return false;

    const { value, timestamp } = JSON.parse(item);
    return setCacheItem(key, value, additionalMinutes);
  } catch (error) {
    console.error('Error extending cache item expiry:', error);
    return false;
  }
}; 