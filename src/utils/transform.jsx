// Convert object to array
export const objectToArray = (obj) => {
  return Object.entries(obj).map(([key, value]) => ({
    id: key,
    ...value
  }));
};

// Convert array to object
export const arrayToObject = (arr, keyField = 'id') => {
  return arr.reduce((obj, item) => {
    obj[item[keyField]] = item;
    return obj;
  }, {});
};

// Group array by field
export const groupBy = (arr, key) => {
  return arr.reduce((groups, item) => {
    const group = item[key];
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {});
};

// Sort array by field
export const sortBy = (arr, key, order = 'asc') => {
  return [...arr].sort((a, b) => {
    if (order === 'asc') {
      return a[key] > b[key] ? 1 : -1;
    }
    return a[key] < b[key] ? 1 : -1;
  });
};

// Filter array by multiple criteria
export const filterBy = (arr, criteria) => {
  return arr.filter(item => {
    return Object.entries(criteria).every(([key, value]) => {
      if (Array.isArray(value)) {
        return value.includes(item[key]);
      }
      return item[key] === value;
    });
  });
};

// Map array with transformation
export const mapWith = (arr, transform) => {
  return arr.map(item => transform(item));
};

// Flatten nested array
export const flatten = (arr) => {
  return arr.reduce((flat, item) => {
    return flat.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
};

// Remove duplicates from array
export const unique = (arr, key = null) => {
  if (key) {
    return Array.from(new Map(arr.map(item => [item[key], item])).values());
  }
  return Array.from(new Set(arr));
};

// Chunk array into smaller arrays
export const chunk = (arr, size) => {
  return arr.reduce((chunks, item, index) => {
    const chunkIndex = Math.floor(index / size);
    if (!chunks[chunkIndex]) {
      chunks[chunkIndex] = [];
    }
    chunks[chunkIndex].push(item);
    return chunks;
  }, []);
};

// Merge objects deeply
export const deepMerge = (target, source) => {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
};

// Transform object keys
export const transformKeys = (obj, transform) => {
  return Object.keys(obj).reduce((result, key) => {
    const value = obj[key];
    const newKey = transform(key);
    result[newKey] = isObject(value) ? transformKeys(value, transform) : value;
    return result;
  }, {});
};

// Transform object values
export const transformValues = (obj, transform) => {
  return Object.keys(obj).reduce((result, key) => {
    const value = obj[key];
    result[key] = isObject(value) ? transformValues(value, transform) : transform(value);
    return result;
  }, {});
};

// Pick object properties
export const pick = (obj, keys) => {
  return keys.reduce((result, key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
    return result;
  }, {});
};

// Omit object properties
export const omit = (obj, keys) => {
  return Object.keys(obj).reduce((result, key) => {
    if (!keys.includes(key)) {
      result[key] = obj[key];
    }
    return result;
  }, {});
};

// Transform date strings to Date objects
export const transformDates = (obj) => {
  return transformValues(obj, value => {
    if (typeof value === 'string' && isValidDate(value)) {
      return new Date(value);
    }
    return value;
  });
};

// Transform numbers to strings
export const transformNumbers = (obj) => {
  return transformValues(obj, value => {
    if (typeof value === 'number') {
      return value.toString();
    }
    return value;
  });
};

// Helper function to check if value is an object
const isObject = (item) => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

// Helper function to check if value is a valid date
const isValidDate = (value) => {
  const date = new Date(value);
  return date instanceof Date && !isNaN(date);
}; 