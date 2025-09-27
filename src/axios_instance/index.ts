import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1337/api",
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth tokens or other headers here
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Global error handling
    if (error.code === 'ECONNABORTED') {
      // Timeout error
      error.message = 'Request timeout. Please try again.';
    } else if (!error.response) {
      // Network error
      error.message = 'Network error. Please check your connection.';
    }

    // Log error for debugging (remove in production)
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });

    return Promise.reject(error);
  }
);

export default api;

export const userApi = axios.create({
  baseURL: "https://reqres.in/api/",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

