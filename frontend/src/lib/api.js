import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || '/api';

// Create central Axios instance with credentialed cookies enabled
const api = axios.create({
  baseURL,
  withCredentials: true,
});

const LEGACY_TOKEN_KEYS = [
  'assesspro_token',
  'token',
  'institutionToken',
  'edvedum_institution_token',
  'edvedum_refresh_token',
];

// Clean up legacy localStorage tokens to ensure no credentials remain in browser storage
const scrubLegacyTokens = () => {
  if (typeof window === 'undefined') return;
  LEGACY_TOKEN_KEYS.forEach((key) => {
    try {
      localStorage.removeItem(key);
    } catch (_) {}
  });
};

scrubLegacyTokens();

export const tokenStore = {
  get: () => null,
  getRefreshToken: () => null,
  set: () => {
    // Tokens are securely held in HttpOnly cookies by the browser.
    scrubLegacyTokens();
  },
  clear: () => {
    scrubLegacyTokens();
    try { localStorage.removeItem('edvedum_active_student'); } catch (_) {}
    try { localStorage.removeItem('edvedum_active_institution'); } catch (_) {}
    try { localStorage.removeItem('edvedum_active_school'); } catch (_) {}
    delete api.defaults.headers.common['Authorization'];
  },
};

// Request interceptor: ensure withCredentials is always true for cookie transmission
api.interceptors.request.use((config) => {
  config.withCredentials = true;
  return config;
});

// Automatic Refresh Token Rotation (RTR) interceptor state
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Global response interceptor: Background Refresh Token Rotation (RTR) on 401s
let sessionRedirecting = false;

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const url = originalRequest?.url || '';
    const isAuthAttempt = /\/auth\/(login|student-login|register|otp|me|refresh)(\/|$)/.test(url) || url.includes('/institution/login');

    const rawData = error.response?.data;
    let message = 'Something went wrong. Please try again.';

    if (rawData && typeof rawData === 'object' && (rawData.message || rawData.error)) {
      message = rawData.message || rawData.error;
    } else if (typeof rawData === 'string' && rawData.trim()) {
      message = rawData;
    } else if (!error.response || status === 503 || (error.message && (error.message.includes('getaddrinfo') || error.message.includes('Network Error')))) {
      message = 'The service is temporarily unavailable. Please try again.';
    } else if (error.message) {
      message = error.message;
    }

    // Handle 401 Unauthorized with automatic HttpOnly Refresh Token Rotation (RTR)
    if (status === 401 && !isAuthAttempt && originalRequest && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Post to refresh endpoint with withCredentials: true so browser sends HttpOnly refresh_token cookie
        await axios.post(`${baseURL}/auth/refresh`, {}, { withCredentials: true });
        processQueue(null);
        isRefreshing = false;
        return api(originalRequest);
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        isRefreshing = false;
        tokenStore.clear();

        window.dispatchEvent(new CustomEvent('auth:session-expired'));

        const path = window.location.pathname;
        const onAuthPage =
          path.startsWith('/student-login') ||
          path.startsWith('/admin-login') ||
          path.startsWith('/institution-login') ||
          path.startsWith('/signup') ||
          path.startsWith('/invite/');

        if (!onAuthPage && !sessionRedirecting) {
          sessionRedirecting = true;
          const targetLogin = path.startsWith('/admin')
            ? '/admin-login'
            : path.startsWith('/institution') || path.startsWith('/school')
            ? '/institution-login'
            : '/student-login';
          window.location.replace(targetLogin);
        }
      }
    }

    return Promise.reject({ status: status || 503, message, details: error.response?.data?.details });
  }
);

export default api;
