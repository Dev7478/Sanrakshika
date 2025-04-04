// Parse JSON string
export const parseJSON = (str) => {
  try {
    return JSON.parse(str);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return null;
  }
};

// Parse query string
export const parseQueryString = (queryString) => {
  try {
    const params = new URLSearchParams(queryString);
    const result = {};
    
    for (const [key, value] of params.entries()) {
      if (key in result) {
        if (!Array.isArray(result[key])) {
          result[key] = [result[key]];
        }
        result[key].push(value);
      } else {
        result[key] = value;
      }
    }
    
    return result;
  } catch (error) {
    console.error('Error parsing query string:', error);
    return {};
  }
};

// Parse form data
export const parseFormData = (formData) => {
  try {
    const result = {};
    for (const [key, value] of formData.entries()) {
      try {
        result[key] = JSON.parse(value);
      } catch {
        result[key] = value;
      }
    }
    return result;
  } catch (error) {
    console.error('Error parsing form data:', error);
    return {};
  }
};

// Parse CSV string
export const parseCSV = (csv, hasHeaders = true) => {
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
    console.error('Error parsing CSV:', error);
    return [];
  }
};

// Parse date string
export const parseDate = (dateStr, format = 'DD/MM/YYYY') => {
  try {
    const parts = dateStr.split(/[/-]/);
    const formatParts = format.split(/[/-]/);
    
    const dateObj = {};
    formatParts.forEach((part, index) => {
      dateObj[part] = parseInt(parts[index]);
    });
    
    return new Date(dateObj.YYYY, dateObj.MM - 1, dateObj.DD);
  } catch (error) {
    console.error('Error parsing date:', error);
    return null;
  }
};

// Parse time string
export const parseTime = (timeStr, format = 'HH:mm') => {
  try {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes);
    return date;
  } catch (error) {
    console.error('Error parsing time:', error);
    return null;
  }
};

// Parse duration string
export const parseDuration = (durationStr) => {
  try {
    const matches = durationStr.match(/(\d+)([dhms])/g);
    if (!matches) return 0;
    
    let milliseconds = 0;
    matches.forEach(match => {
      const value = parseInt(match.slice(0, -1));
      const unit = match.slice(-1);
      
      switch (unit) {
        case 'd':
          milliseconds += value * 24 * 60 * 60 * 1000;
          break;
        case 'h':
          milliseconds += value * 60 * 60 * 1000;
          break;
        case 'm':
          milliseconds += value * 60 * 1000;
          break;
        case 's':
          milliseconds += value * 1000;
          break;
      }
    });
    
    return milliseconds;
  } catch (error) {
    console.error('Error parsing duration:', error);
    return 0;
  }
};

// Parse file size string
export const parseFileSize = (sizeStr) => {
  try {
    const matches = sizeStr.match(/^(\d+(?:\.\d+)?)\s*([KMGT]?B)$/i);
    if (!matches) return 0;
    
    const value = parseFloat(matches[1]);
    const unit = matches[2].toUpperCase();
    
    switch (unit) {
      case 'KB':
        return value * 1024;
      case 'MB':
        return value * 1024 * 1024;
      case 'GB':
        return value * 1024 * 1024 * 1024;
      case 'TB':
        return value * 1024 * 1024 * 1024 * 1024;
      default:
        return value;
    }
  } catch (error) {
    console.error('Error parsing file size:', error);
    return 0;
  }
};

// Parse coordinates string
export const parseCoordinates = (coordStr) => {
  try {
    const [lat, lng] = coordStr.split(',').map(coord => parseFloat(coord.trim()));
    return { lat, lng };
  } catch (error) {
    console.error('Error parsing coordinates:', error);
    return null;
  }
};

// Parse phone number string
export const parsePhoneNumber = (phoneStr) => {
  try {
    return phoneStr.replace(/\D/g, '');
  } catch (error) {
    console.error('Error parsing phone number:', error);
    return '';
  }
};

// Parse email string
export const parseEmail = (emailStr) => {
  try {
    return emailStr.toLowerCase().trim();
  } catch (error) {
    console.error('Error parsing email:', error);
    return '';
  }
};

// Parse URL string
export const parseUrl = (urlStr) => {
  try {
    if (!urlStr.startsWith('http://') && !urlStr.startsWith('https://')) {
      return `https://${urlStr}`;
    }
    return urlStr;
  } catch (error) {
    console.error('Error parsing URL:', error);
    return '';
  }
};

// Parse social media handle
export const parseSocialHandle = (handleStr, platform) => {
  try {
    const cleanHandle = handleStr.replace(/^@/, '');
    switch (platform.toLowerCase()) {
      case 'twitter':
        return `@${cleanHandle}`;
      case 'instagram':
        return `@${cleanHandle}`;
      case 'linkedin':
        return cleanHandle;
      default:
        return handleStr;
    }
  } catch (error) {
    console.error('Error parsing social media handle:', error);
    return handleStr;
  }
}; 