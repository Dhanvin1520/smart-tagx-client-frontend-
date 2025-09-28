import axios from 'axios';

const AUTH_API_BASE_URL = import.meta.env.VITE_AUTH_API_URL || 'http://localhost:3001';

const authClient = axios.create({
  baseURL: AUTH_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
authClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
authClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await authClient.post('/api/auth/refresh', {
            refreshToken,
          });

          const { accessToken } = response.data.data;
          localStorage.setItem('accessToken', accessToken);

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return authClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// Auth API functions
export const authApi = {
  // Register user
  register: async (userData: { name: string; email: string; password: string }) => {
    const response = await authClient.post('/api/auth/register', userData);
    return response.data;
  },

  // Login user
  login: async (credentials: { email: string; password: string }) => {
    const response = await authClient.post('/api/auth/login', credentials);
    return response.data;
  },

  // Get current user
  getMe: async () => {
    const response = await authClient.get('/api/auth/me');
    return response.data;
  },

  // Logout user
  logout: async () => {
    const response = await authClient.post('/api/auth/logout');
    return response.data;
  },

  // Refresh token
  refreshToken: async (refreshToken: string) => {
    const response = await authClient.post('/api/auth/refresh', { refreshToken });
    return response.data;
  },
};

// Payment API functions
export const paymentApi = {
  // Create payment intent
  createPaymentIntent: async (data: { plan: string; amount: number }) => {
    const response = await authClient.post('/api/payments/create-payment-intent', data);
    return response.data;
  },

  // Create subscription
  createSubscription: async (data: { priceId: string; paymentMethodId: string }) => {
    const response = await authClient.post('/api/payments/create-subscription', data);
    return response.data;
  },

  // Cancel subscription
  cancelSubscription: async () => {
    const response = await authClient.post('/api/payments/cancel-subscription');
    return response.data;
  },

  // Get subscription
  getSubscription: async () => {
    const response = await authClient.get('/api/payments/subscription');
    return response.data;
  },
};

// Usage API functions
export const usageApi = {
  // Increment usage counter by 1 (one generation request)
  incrementUsage: async () => {
    const response = await authClient.post('/api/usage/increment');
    return response.data;
  }
};

// Admin API functions
export const adminApi = {
  listUsers: async () => {
    const res = await authClient.get('/api/admin/users');
    // Backend shape: { success, data: users[] }
    return res.data?.data || [];
  },
  updateUserPlan: async (id: string, plan: 'free' | 'plus' | 'pro') => {
    const res = await authClient.patch(`/api/admin/users/${id}/plan`, { plan });
    return res.data;
  },
  deleteUser: async (id: string) => {
    const res = await authClient.delete(`/api/admin/users/${id}`);
    return res.data;
  },
};

export default authClient;
