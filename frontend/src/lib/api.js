import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({ baseURL });

const TOKEN_KEYS = ['assesspro_token', 'token', 'institutionToken', 'edvedum_institution_token'];
const REFRESH_TOKEN_KEY = 'edvedum_refresh_token';

export const tokenStore = {
  get: () => {
    for (const key of TOKEN_KEYS) {
      const val = localStorage.getItem(key);
      if (val) return val;
    }
    try {
      const raw = localStorage.getItem('edvedum_active_institution') || localStorage.getItem('edvedum_active_school');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.token) return parsed.token;
      }
    } catch (_) {}
    return null;
  },
  getRefreshToken: () => {
    try {
      return localStorage.getItem(REFRESH_TOKEN_KEY) || null;
    } catch (_) {
      return null;
    }
  },
  set: (data) => {
    if (!data) return;
    const token = typeof data === 'object' ? (data.accessToken || data.token) : data;
    const refreshToken = typeof data === 'object' ? data.refreshToken : null;

    if (token) {
      localStorage.setItem('assesspro_token', token);
      localStorage.setItem('token', token);
      localStorage.setItem('institutionToken', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    if (refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
  },
  clear: () => {
    TOKEN_KEYS.forEach((key) => {
      try { localStorage.removeItem(key); } catch (_) {}
    });
    try { localStorage.removeItem(REFRESH_TOKEN_KEY); } catch (_) {}
    try { localStorage.removeItem('edvedum_active_institution'); } catch (_) {}
    try { localStorage.removeItem('edvedum_active_school'); } catch (_) {}
    delete api.defaults.headers.common['Authorization'];
  },
};

// Attach JWT access token to every request
api.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
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
    // If login or auth response returned refresh tokens, store them automatically
    if (response.data && typeof response.data === 'object' && (response.data.accessToken || response.data.refreshToken)) {
      tokenStore.set(response.data);
    }
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

    // Handle 401 Unauthorized with automatic Refresh Token Rotation (RTR)
    if (status === 401 && !isAuthAttempt && originalRequest && !originalRequest._retry) {
      const refreshToken = tokenStore.getRefreshToken();

      if (refreshToken) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((newToken) => {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return api(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const refreshRes = await axios.post(`${baseURL}/auth/refresh`, { refreshToken });
          const newAccessToken = refreshRes.data?.accessToken || refreshRes.data?.token;
          const newRefreshToken = refreshRes.data?.refreshToken;

          if (newAccessToken) {
            tokenStore.set({ accessToken: newAccessToken, refreshToken: newRefreshToken });
            processQueue(null, newAccessToken);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            isRefreshing = false;
            return api(originalRequest);
          }
        } catch (refreshErr) {
          processQueue(refreshErr, null);
          isRefreshing = false;
          tokenStore.clear();
        }
      }

      const activeToken = tokenStore.get();
      const isInstSession = activeToken && (
        activeToken.startsWith('mock_student_token_') ||
        activeToken.startsWith('mock_token_') ||
        activeToken.startsWith('token_inst_') ||
        activeToken.startsWith('token_') ||
        window.location.pathname.startsWith('/institution')
      );

      if (isInstSession) {
        return Promise.reject({ status, message, details: error.response?.data?.details });
      }

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

    return Promise.reject({ status: status || 503, message, details: error.response?.data?.details });
  }
);

export default api;

