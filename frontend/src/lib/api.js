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

// Normalize error messages and handle global 401s without crashing on server/network 503s
let sessionRedirecting = false;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || '';
    const isAuthAttempt = /\/auth\/(login|student-login|register|otp|me)(\/|$)/.test(url);

    const rawData = error.response?.data;
    let message = 'Something went wrong. Please try again.';

    const isInfrastructureError =
      !error.response ||
      status >= 500 ||
      status === 503 ||
      (error.message && (error.message.includes('getaddrinfo') || error.message.includes('Network Error')));

    if (isInfrastructureError) {
      message = 'The service is temporarily unavailable. Please try again.';
    } else if (typeof rawData === 'string') {
      message = rawData;
    } else if (rawData && typeof rawData === 'object') {
      message = rawData.message || rawData.error || message;
    } else if (error.message) {
      message = error.message;
    }

    // Never logout or redirect on 500/503/server or network errors!
    if (status === 401 && !isAuthAttempt) {
      const activeToken = tokenStore.get();
      if (activeToken && (activeToken.startsWith('mock_student_token_') || activeToken.startsWith('mock_token_'))) {
        return Promise.reject({ status, message, details: error.response?.data?.details });
      }

      tokenStore.clear();
      window.dispatchEvent(new CustomEvent('auth:session-expired'));

      const path = window.location.pathname;
      const onAuthPage =
        path.startsWith('/student-login') ||
        path.startsWith('/admin-login') ||
        path.startsWith('/institution-login') ||
        path.startsWith('/for-schools') ||
        path.startsWith('/for-institutions') ||
        path.startsWith('/signup') ||
        path.startsWith('/invite/');

      if (!onAuthPage && !sessionRedirecting) {
        sessionRedirecting = true;
        const targetLogin = path.startsWith('/admin')
          ? '/admin-login'
          : path.startsWith('/institution') || path.startsWith('/for-') || path.startsWith('/school')
          ? '/for-schools'
          : '/student-login';
        window.location.replace(targetLogin);
      }
    }

    return Promise.reject({ status: status || 503, message, details: error.response?.data?.details });
  }
);

export default api;
