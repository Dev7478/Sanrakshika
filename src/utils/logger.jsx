// Log levels
export const LogLevel = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error'
};

// Log colors for console
const LogColors = {
  debug: '#7f8c8d',
  info: '#3498db',
  warn: '#f1c40f',
  error: '#e74c3c'
};

// Format log message
const formatLogMessage = (level, message, data = null) => {
  const timestamp = new Date().toISOString();
  const formattedMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  return { message: formattedMessage, data };
};

// Log to console with styling
const logToConsole = (level, message, data = null) => {
  const { message: formattedMessage } = formatLogMessage(level, message, data);
  const style = `color: ${LogColors[level]}; font-weight: bold;`;
  
  switch (level) {
    case LogLevel.DEBUG:
      console.debug(`%c${formattedMessage}`, style, data || '');
      break;
    case LogLevel.INFO:
      console.info(`%c${formattedMessage}`, style, data || '');
      break;
    case LogLevel.WARN:
      console.warn(`%c${formattedMessage}`, style, data || '');
      break;
    case LogLevel.ERROR:
      console.error(`%c${formattedMessage}`, style, data || '');
      break;
  }
};

// Log to storage
const logToStorage = (level, message, data = null) => {
  try {
    const logs = JSON.parse(localStorage.getItem('app_logs') || '[]');
    const { message: formattedMessage } = formatLogMessage(level, message, data);
    
    logs.push({
      level,
      message: formattedMessage,
      data,
      timestamp: new Date().toISOString()
    });

    // Keep only last 1000 logs
    if (logs.length > 1000) {
      logs.shift();
    }

    localStorage.setItem('app_logs', JSON.stringify(logs));
  } catch (error) {
    console.error('Error logging to storage:', error);
  }
};

// Debug log
export const debug = (message, data = null) => {
  logToConsole(LogLevel.DEBUG, message, data);
  logToStorage(LogLevel.DEBUG, message, data);
};

// Info log
export const info = (message, data = null) => {
  logToConsole(LogLevel.INFO, message, data);
  logToStorage(LogLevel.INFO, message, data);
};

// Warning log
export const warn = (message, data = null) => {
  logToConsole(LogLevel.WARN, message, data);
  logToStorage(LogLevel.WARN, message, data);
};

// Error log
export const error = (message, data = null) => {
  logToConsole(LogLevel.ERROR, message, data);
  logToStorage(LogLevel.ERROR, message, data);
};

// Get all logs
export const getLogs = () => {
  try {
    return JSON.parse(localStorage.getItem('app_logs') || '[]');
  } catch (error) {
    console.error('Error getting logs:', error);
    return [];
  }
};

// Clear all logs
export const clearLogs = () => {
  try {
    localStorage.removeItem('app_logs');
    return true;
  } catch (error) {
    console.error('Error clearing logs:', error);
    return false;
  }
};

// Get logs by level
export const getLogsByLevel = (level) => {
  try {
    const logs = getLogs();
    return logs.filter(log => log.level === level);
  } catch (error) {
    console.error('Error getting logs by level:', error);
    return [];
  }
};

// Get logs by date range
export const getLogsByDateRange = (startDate, endDate) => {
  try {
    const logs = getLogs();
    return logs.filter(log => {
      const logDate = new Date(log.timestamp);
      return logDate >= startDate && logDate <= endDate;
    });
  } catch (error) {
    console.error('Error getting logs by date range:', error);
    return [];
  }
};

// Export logs to file
export const exportLogs = () => {
  try {
    const logs = getLogs();
    const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `logs_${new Date().toISOString()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error('Error exporting logs:', error);
    return false;
  }
};

// Log error with stack trace
export const logError = (error, context = '') => {
  const errorMessage = error.message || 'Unknown error';
  const stackTrace = error.stack || '';
  const errorData = {
    message: errorMessage,
    stack: stackTrace,
    context,
    timestamp: new Date().toISOString()
  };
  
  error(`${errorMessage}${context ? ` (${context})` : ''}`, errorData);
};

// Log API error
export const logApiError = (error, endpoint, method, requestData = null) => {
  const errorData = {
    endpoint,
    method,
    requestData,
    status: error.status,
    statusText: error.statusText,
    response: error.response,
    timestamp: new Date().toISOString()
  };
  
  error(`API Error: ${endpoint} (${method})`, errorData);
}; 