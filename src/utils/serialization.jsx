// Serialize data to JSON
export const serializeToJSON = (data) => {
  try {
    return JSON.stringify(data);
  } catch (error) {
    console.error('Error serializing to JSON:', error);
    throw error;
  }
};

// Deserialize data from JSON
export const deserializeFromJSON = (json) => {
  try {
    return JSON.parse(json);
  } catch (error) {
    console.error('Error deserializing from JSON:', error);
    throw error;
  }
};

// Serialize data to base64
export const serializeToBase64 = (data) => {
  try {
    const json = serializeToJSON(data);
    return btoa(json);
  } catch (error) {
    console.error('Error serializing to base64:', error);
    throw error;
  }
};

// Deserialize data from base64
export const deserializeFromBase64 = (base64) => {
  try {
    const json = atob(base64);
    return deserializeFromJSON(json);
  } catch (error) {
    console.error('Error deserializing from base64:', error);
    throw error;
  }
};

// Serialize data to URL-safe string
export const serializeToURLSafe = (data) => {
  try {
    const json = serializeToJSON(data);
    return encodeURIComponent(json);
  } catch (error) {
    console.error('Error serializing to URL-safe string:', error);
    throw error;
  }
};

// Deserialize data from URL-safe string
export const deserializeFromURLSafe = (urlSafe) => {
  try {
    const json = decodeURIComponent(urlSafe);
    return deserializeFromJSON(json);
  } catch (error) {
    console.error('Error deserializing from URL-safe string:', error);
    throw error;
  }
};

// Serialize data to form data
export const serializeToFormData = (data) => {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else if (typeof value === 'object' && value !== null) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });
    return formData;
  } catch (error) {
    console.error('Error serializing to form data:', error);
    throw error;
  }
};

// Deserialize data from form data
export const deserializeFromFormData = (formData) => {
  try {
    const data = {};
    for (const [key, value] of formData.entries()) {
      try {
        data[key] = JSON.parse(value);
      } catch {
        data[key] = value;
      }
    }
    return data;
  } catch (error) {
    console.error('Error deserializing from form data:', error);
    throw error;
  }
};

// Serialize data to query string
export const serializeToQueryString = (data) => {
  try {
    return Object.entries(data)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return value
            .map(item => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`)
            .join('&');
        }
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      })
      .join('&');
  } catch (error) {
    console.error('Error serializing to query string:', error);
    throw error;
  }
};

// Deserialize data from query string
export const deserializeFromQueryString = (queryString) => {
  try {
    const data = {};
    const params = new URLSearchParams(queryString);
    
    for (const [key, value] of params.entries()) {
      if (key in data) {
        if (!Array.isArray(data[key])) {
          data[key] = [data[key]];
        }
        data[key].push(value);
      } else {
        data[key] = value;
      }
    }
    
    return data;
  } catch (error) {
    console.error('Error deserializing from query string:', error);
    throw error;
  }
};

// Serialize data to CSV
export const serializeToCSV = (data, headers = null) => {
  try {
    if (!Array.isArray(data)) {
      data = [data];
    }
    
    const csvRows = [];
    
    // Add headers
    if (headers) {
      csvRows.push(headers.join(','));
    } else if (data.length > 0) {
      csvRows.push(Object.keys(data[0]).join(','));
    }
    
    // Add data rows
    data.forEach(item => {
      const values = Object.values(item).map(value => {
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`;
        }
        return value;
      });
      csvRows.push(values.join(','));
    });
    
    return csvRows.join('\n');
  } catch (error) {
    console.error('Error serializing to CSV:', error);
    throw error;
  }
};

// Deserialize data from CSV
export const deserializeFromCSV = (csv, hasHeaders = true) => {
  try {
    const rows = csv.split('\n').map(row => row.split(','));
    
    if (rows.length === 0) {
      return [];
    }
    
    const headers = hasHeaders ? rows[0] : null;
    const data = [];
    
    for (let i = hasHeaders ? 1 : 0; i < rows.length; i++) {
      const row = rows[i];
      const item = {};
      
      row.forEach((value, index) => {
        const key = headers ? headers[index] : `column${index + 1}`;
        item[key] = value.replace(/^"(.*)"$/, '$1');
      });
      
      data.push(item);
    }
    
    return data;
  } catch (error) {
    console.error('Error deserializing from CSV:', error);
    throw error;
  }
}; 