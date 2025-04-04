import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable sending cookies
  timeout: 5000, // 5 second timeout
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout - Server might be down');
      throw new Error('Connection timeout. Please check if the server is running.');
    }
    
    if (!error.response) {
      console.error('Network error - No response from server');
      throw new Error('Cannot connect to the server. Please check your internet connection and ensure the server is running.');
    }

    if (error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
);

// Auth endpoints
export const authAPI = {
  verifyToken: async (token) => {
    try {
      const response = await api.post('/auth/verify-token', { token });
      localStorage.setItem('token', token);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

// Species endpoints
export const speciesAPI = {
  getAll: () => api.get('/species'),
  getById: (id) => api.get(`/species/${id}`),
  create: (data) => api.post('/species', data),
  update: (id, data) => api.put(`/species/${id}`, data),
  delete: (id) => api.delete(`/species/${id}`),
};

// Cryo monitoring endpoints
export const cryoAPI = {
  getStatus: () => api.get('/cryo/status'),
  updateStatus: (data) => api.post('/cryo/status', data),
  getAlerts: () => api.get('/cryo/alerts'),
};

// Monitoring API calls
export const monitoringAPI = {
  getSpeciesData: () => api.get('/monitoring/species'),
  getHabitatData: () => api.get('/monitoring/habitat'),
  getRealTimeData: () => api.get('/monitoring/realtime'),
};

// Cryopreservation API calls
export const cryopreservationAPI = {
  getSamples: () => api.get('/cryopreservation/samples'),
  addSample: (data) => api.post('/cryopreservation/samples', data),
  updateSample: (id, data) => api.put(`/cryopreservation/samples/${id}`, data),
};

// Emergency API calls
export const emergencyAPI = {
  reportEmergency: (data) => api.post('/emergency/report', data),
  getEmergencies: () => api.get('/emergency'),
  updateStatus: (id, status) => api.put(`/emergency/${id}/status`, { status }),
  getAlerts: () => api.get('/emergency/alerts'),
  createAlert: (data) => api.post('/emergency/alerts', data),
  updateAlert: (id, data) => api.put(`/emergency/alerts/${id}`, data),
  getResponseTeams: () => api.get('/emergency/teams'),
};

// Analytics API calls
export const analyticsAPI = {
  getStats: () => api.get('/analytics/stats'),
  getTrends: () => api.get('/analytics/trends'),
};

export default api; 