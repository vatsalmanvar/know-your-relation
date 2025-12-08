import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      if (status === 401) {
        // Unauthorized - clear token and redirect to sign in
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/signin';
      }
      
      return Promise.reject({
        message: data?.error || data?.message || 'An error occurred',
        status,
        data,
      });
    } else if (error.request) {
      // Request made but no response received
      return Promise.reject({
        message: 'Network error. Please check your connection.',
        status: 0,
      });
    } else {
      // Something else happened
      return Promise.reject({
        message: error.message || 'An unexpected error occurred',
      });
    }
  }
);

// Auth API
export const authAPI = {
  register: async (email, password, cpassword) => {
    const response = await api.post('/register', { email, password, cpassword });
    return response.data;
  },

  signIn: async (email, password) => {
    const response = await api.post('/signin', { email, password });
    return response.data;
  },
};

// Family Tree API
export const familyTreeAPI = {
  saveFamilyTree: async (familyName, email, password, globalNodes, globalEdges) => {
    const response = await api.post('/saveFamilyTree', {
      familyName,
      email,
      password,
      globalNodes,
      globalEdges,
    });
    return response.data;
  },

  modifyTree: async (familyName, email, password, globalNodes, globalEdges) => {
    const response = await api.post('/modifyTree', {
      familyName,
      email,
      password,
      globalNodes,
      globalEdges,
    });
    return response.data;
  },

  viewFamilyTree: async (familyName) => {
    const response = await api.post('/viewFamilyTree', { familyName });
    return response.data;
  },

  getFamilyList: async (email, password) => {
    const response = await api.post('/getfamilylist', { email, password });
    return response.data;
  },
};

export default api;

