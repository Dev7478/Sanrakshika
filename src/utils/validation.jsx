// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone number validation (Indian format)
export const isValidPhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

// Password validation
export const isValidPassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// Name validation
export const isValidName = (name) => {
  // 2-50 characters, letters and spaces only
  const nameRegex = /^[a-zA-Z\s]{2,50}$/;
  return nameRegex.test(name);
};

// URL validation
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Date validation
export const isValidDate = (date) => {
  const d = new Date(date);
  return d instanceof Date && !isNaN(d);
};

// Age validation
export const isValidAge = (age) => {
  return Number.isInteger(age) && age >= 0 && age <= 150;
};

// Latitude validation
export const isValidLatitude = (lat) => {
  return Number.isFinite(lat) && lat >= -90 && lat <= 90;
};

// Longitude validation
export const isValidLongitude = (lng) => {
  return Number.isFinite(lng) && lng >= -180 && lng <= 180;
};

// Coordinates validation
export const isValidCoordinates = (lat, lng) => {
  return isValidLatitude(lat) && isValidLongitude(lng);
};

// File size validation
export const isValidFileSize = (file, maxSize) => {
  return file.size <= maxSize;
};

// File type validation
export const isValidFileType = (file, allowedTypes) => {
  return allowedTypes.includes(file.type);
};

// Required field validation
export const isRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

// Number range validation
export const isInRange = (number, min, max) => {
  return Number.isFinite(number) && number >= min && number <= max;
};

// String length validation
export const isValidLength = (str, min, max) => {
  return str.length >= min && str.length <= max;
};

// Array length validation
export const isValidArrayLength = (arr, min, max) => {
  return Array.isArray(arr) && arr.length >= min && arr.length <= max;
};

// Object property validation
export const hasRequiredProperties = (obj, requiredProps) => {
  return requiredProps.every(prop => prop in obj);
};

// Form validation
export const validateForm = (values, rules) => {
  const errors = {};
  
  for (const [field, fieldRules] of Object.entries(rules)) {
    const value = values[field];
    
    for (const rule of fieldRules) {
      if (rule.required && !isRequired(value)) {
        errors[field] = `${field} is required`;
        break;
      }
      
      if (value) {
        switch (rule.type) {
          case 'email':
            if (!isValidEmail(value)) {
              errors[field] = 'Invalid email address';
            }
            break;
          case 'phone':
            if (!isValidPhone(value)) {
              errors[field] = 'Invalid phone number';
            }
            break;
          case 'password':
            if (!isValidPassword(value)) {
              errors[field] = 'Password must be at least 8 characters with 1 uppercase, 1 lowercase, 1 number, and 1 special character';
            }
            break;
          case 'name':
            if (!isValidName(value)) {
              errors[field] = 'Invalid name';
            }
            break;
          case 'url':
            if (!isValidUrl(value)) {
              errors[field] = 'Invalid URL';
            }
            break;
          case 'date':
            if (!isValidDate(value)) {
              errors[field] = 'Invalid date';
            }
            break;
          case 'number':
            if (!Number.isFinite(value)) {
              errors[field] = 'Invalid number';
            }
            break;
          case 'range':
            if (!isInRange(value, rule.min, rule.max)) {
              errors[field] = `Value must be between ${rule.min} and ${rule.max}`;
            }
            break;
          case 'length':
            if (!isValidLength(value, rule.min, rule.max)) {
              errors[field] = `Length must be between ${rule.min} and ${rule.max} characters`;
            }
            break;
          case 'array':
            if (!isValidArrayLength(value, rule.min, rule.max)) {
              errors[field] = `Must have between ${rule.min} and ${rule.max} items`;
            }
            break;
          case 'custom':
            if (!rule.validate(value)) {
              errors[field] = rule.message || 'Invalid value';
            }
            break;
        }
      }
    }
  }
  
  return errors;
}; 