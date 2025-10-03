import axios from 'axios';

const AUTH_API_BASE_URL = import.meta.env.VITE_AUTH_API_URL || 'http://localhost:3001';

// Public axios instance for login/register endpoints (no auth header)
const publicAuthClient = axios.create({
  baseURL: AUTH_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Authenticated axios instance for protected endpoints
const authClient = axios.create({
  baseURL: AUTH_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token for protected endpoints
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
          const response = await publicAuthClient.post('/api/auth/refresh', {
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
  // Register user (public endpoint)
  register: async (userData: { name: string; email: string; password: string }) => {
    const response = await publicAuthClient.post('/api/auth/register', userData);
    return response.data;
  },

  // Login user (public endpoint)
  login: async (credentials: { email: string; password: string }) => {
    const response = await publicAuthClient.post('/api/auth/login', credentials);
    return response.data;
  },

  // Get current user (protected endpoint)
  getMe: async () => {
    const response = await authClient.get('/api/auth/me');
    return response.data;
  },

  // Logout user (protected endpoint)
  logout: async () => {
    const response = await authClient.post('/api/auth/logout');
    return response.data;
  },

  // Refresh token (public endpoint)
  refreshToken: async (refreshToken: string) => {
    const response = await publicAuthClient.post('/api/auth/refresh', { refreshToken });
    return response.data;
  },

  // Verify email (public endpoint)
  verifyEmail: async (token: string) => {
    const response = await publicAuthClient.post('/api/auth/verify-email', { token });
    return response.data;
  },

  // Change password (protected endpoint)
  changePassword: async (currentPassword: string, newPassword: string) => {
    const response = await authClient.post('/api/auth/change-password', { currentPassword, newPassword });
    return response.data;
  },

  // Resend email verification (public endpoint)
  resendVerification: async (email: string) => {
    const response = await publicAuthClient.post('/api/auth/resend-verification', { email });
    return response.data;
  },

  // Reset password (public endpoint)
  resetPassword: async (token: string, password: string) => {
    const response = await publicAuthClient.post('/api/auth/reset-password', { token, password });
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
