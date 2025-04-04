// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number
export const isValidPhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

// Validate password
export const isValidPassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChar
  );
};

// Validate name
export const isValidName = (name) => {
  const nameRegex = /^[a-zA-Z\s]{2,50}$/;
  return nameRegex.test(name);
};

// Validate URL
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Validate date
export const isValidDate = (date) => {
  return date instanceof Date && !isNaN(date);
};

// Validate age
export const isValidAge = (age) => {
  return Number.isInteger(age) && age >= 0 && age <= 150;
};

// Validate latitude
export const isValidLatitude = (lat) => {
  return Number.isFinite(lat) && lat >= -90 && lat <= 90;
};

// Validate longitude
export const isValidLongitude = (lng) => {
  return Number.isFinite(lng) && lng >= -180 && lng <= 180;
};

// Validate coordinates
export const isValidCoordinates = (lat, lng) => {
  return isValidLatitude(lat) && isValidLongitude(lng);
};

// Validate file size
export const isValidFileSize = (file, maxSize) => {
  return file.size <= maxSize;
};

// Validate file type
export const isValidFileType = (file, allowedTypes) => {
  return allowedTypes.includes(file.type);
};

// Validate required field
export const isRequired = (value) => {
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  if (typeof value === 'object') {
    return Object.keys(value).length > 0;
  }
  return value !== null && value !== undefined && value !== '';
};

// Validate number range
export const isInRange = (value, min, max) => {
  return Number.isFinite(value) && value >= min && value <= max;
};

// Validate string length
export const isValidLength = (str, min, max) => {
  return str.length >= min && str.length <= max;
};

// Validate array length
export const isValidArrayLength = (arr, min, max) => {
  return arr.length >= min && arr.length <= max;
};

// Validate object properties
export const hasRequiredProperties = (obj, requiredProps) => {
  return requiredProps.every(prop => prop in obj);
};

// Validate form
export const validateForm = (data, rules) => {
  const errors = {};
  
  for (const [field, fieldRules] of Object.entries(rules)) {
    const value = data[field];
    
    for (const rule of fieldRules) {
      let isValid = true;
      let errorMessage = '';
      
      switch (rule.type) {
        case 'required':
          isValid = isRequired(value);
          errorMessage = 'This field is required';
          break;
          
        case 'email':
          isValid = isValidEmail(value);
          errorMessage = 'Invalid email address';
          break;
          
        case 'phone':
          isValid = isValidPhone(value);
          errorMessage = 'Invalid phone number';
          break;
          
        case 'password':
          isValid = isValidPassword(value);
          errorMessage = 'Password must be at least 8 characters long and contain uppercase, lowercase, number and special character';
          break;
          
        case 'name':
          isValid = isValidName(value);
          errorMessage = 'Invalid name';
          break;
          
        case 'url':
          isValid = isValidUrl(value);
          errorMessage = 'Invalid URL';
          break;
          
        case 'date':
          isValid = isValidDate(value);
          errorMessage = 'Invalid date';
          break;
          
        case 'age':
          isValid = isValidAge(value);
          errorMessage = 'Invalid age';
          break;
          
        case 'coordinates':
          isValid = isValidCoordinates(value.lat, value.lng);
          errorMessage = 'Invalid coordinates';
          break;
          
        case 'fileSize':
          isValid = isValidFileSize(value, rule.maxSize);
          errorMessage = `File size must be less than ${rule.maxSize} bytes`;
          break;
          
        case 'fileType':
          isValid = isValidFileType(value, rule.allowedTypes);
          errorMessage = `File type must be one of: ${rule.allowedTypes.join(', ')}`;
          break;
          
        case 'range':
          isValid = isInRange(value, rule.min, rule.max);
          errorMessage = `Value must be between ${rule.min} and ${rule.max}`;
          break;
          
        case 'length':
          isValid = isValidLength(value, rule.min, rule.max);
          errorMessage = `Length must be between ${rule.min} and ${rule.max}`;
          break;
          
        case 'arrayLength':
          isValid = isValidArrayLength(value, rule.min, rule.max);
          errorMessage = `Array length must be between ${rule.min} and ${rule.max}`;
          break;
          
        case 'custom':
          isValid = rule.validate(value);
          errorMessage = rule.message;
          break;
      }
      
      if (!isValid) {
        errors[field] = errorMessage;
        break;
      }
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}; 