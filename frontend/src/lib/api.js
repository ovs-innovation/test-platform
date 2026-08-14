import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({ baseURL });

const TOKEN_KEYS = ['assesspro_token', 'token', 'institutionToken', 'edvedum_institution_token'];

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
  set: (token) => {
    if (!token) return;
    localStorage.setItem('assesspro_token', token);
    localStorage.setItem('token', token);
    localStorage.setItem('institutionToken', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },
  clear: () => {
    TOKEN_KEYS.forEach((key) => {
      try { localStorage.removeItem(key); } catch (_) {}
    });
    try { localStorage.removeItem('edvedum_active_institution'); } catch (_) {}
    try { localStorage.removeItem('edvedum_active_school'); } catch (_) {}
    delete api.defaults.headers.common['Authorization'];
  },
};

// Attach JWT to every request
api.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global response interceptor: Normalize errors & handle genuine 401s without crashing on server/network 503s
let sessionRedirecting = false;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || '';
    const isAuthAttempt = /\/auth\/(login|student-login|register|otp|me)(\/|$)/.test(url) || url.includes('/institution/login');

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

    // ONLY logout or redirect on genuine HTTP 401 (Unauthorized), NEVER on 500/503 or network errors!
    if (status === 401 && !isAuthAttempt) {
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
