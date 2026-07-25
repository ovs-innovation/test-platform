import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({ baseURL });

const TOKEN_KEY = 'assesspro_token';

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

// Attach JWT to every request.
api.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Normalize error messages and handle global 401s.
let sessionRedirecting = false;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || '';
    const isAuthAttempt = /\/auth\/(login|student-login|register|otp|me)(\/|$)/.test(url);

    const rawData = error.response?.data;
    let message = 'Something went wrong. Please try again.';

    if (typeof rawData === 'string') {
      message = status >= 500
        ? 'A server error occurred. Please try again later or contact support.'
        : rawData;
    } else if (rawData && typeof rawData === 'object') {
      message = rawData.message || rawData.error || message;
    } else if (error.message) {
      if (error.message.includes('500') || error.message.includes('status code 500')) {
        message = 'A server error occurred. Please try again later or contact support.';
      } else {
        message = error.message;
      }
    }

    if (status === 401 && !isAuthAttempt) {
      tokenStore.clear();
      window.dispatchEvent(new CustomEvent('auth:session-expired'));

      const path = window.location.pathname;
      const onAuthPage = path.startsWith('/student-login')
        || path.startsWith('/admin-login')
        || path.startsWith('/signup')
        || path.startsWith('/invite/');

      // Only hard-redirect when a protected page was active (not during /auth/me bootstrap).
      if (!onAuthPage && !sessionRedirecting) {
        sessionRedirecting = true;
        window.location.replace(path.startsWith('/admin') ? '/admin-login' : '/student-login');
      }
    }

    return Promise.reject({ status, message, details: error.response?.data?.details });
  }
);

export default api;
