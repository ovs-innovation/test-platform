import { useContext, useEffect, useState, useCallback } from 'react';
import { authService } from '../lib/services.js';
import { tokenStore } from '../lib/api.js';
import { AuthContext } from './authContext.js';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const onExpired = () => {
      setUser(null);
      setLoading(false);
    };
    window.addEventListener('auth:session-expired', onExpired);
    return () => window.removeEventListener('auth:session-expired', onExpired);
  }, []);

  useEffect(() => {
    const init = async () => {
      const token = tokenStore.get();
      if (!token) {
        tokenStore.clear();
        try { localStorage.removeItem('edvedum_active_student'); } catch (_) {}
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const { user: me } = await authService.me();
        setUser(me);
      } catch (err) {
        if (err?.status === 401) {
          tokenStore.clear();
          try { localStorage.removeItem('edvedum_active_student'); } catch (_) {}
          setUser(null);
        } else {
          const savedSt = localStorage.getItem('edvedum_active_student');
          if (savedSt) {
            try { setUser(JSON.parse(savedSt)); } catch (_) {}
          }
        }
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const login = useCallback(async (credentials) => {
    const { token, user: u } = await authService.login(credentials);
    tokenStore.set(token);
    setUser(u);
    return u;
  }, []);

  const verifyOtp = useCallback(async (data) => {
    const { token, user: u } = await authService.verifyOtp(data);
    tokenStore.set(token);
    setUser(u);
    return u;
  }, []);

  const sendLoginOtp = useCallback(async (data) => {
    return await authService.sendLoginOtp(data);
  }, []);

  const sendSignupOtp = useCallback(async (data) => {
    return await authService.sendSignupOtp(data);
  }, []);

  const verifyLoginOtp = useCallback(async (data) => {
    const { token, user: u } = await authService.verifyLoginOtp(data);
    tokenStore.set(token);
    setUser(u);
    return u;
  }, []);

  const firebaseLogin = useCallback(async (data) => {
    const { token, user: u } = await authService.firebaseLogin(data);
    tokenStore.set(token);
    setUser(u);
    return u;
  }, []);

  const logout = useCallback(() => {
    tokenStore.clear();
    try { localStorage.removeItem('edvedum_active_student'); } catch (_) {}
    setUser(null);
  }, []);

  const register = useCallback(async (data) => {
    const { token, user: u } = await authService.register(data);
    tokenStore.set(token);
    setUser(u);
    return u;
  }, []);

  const studentLogin = useCallback(async (credentials) => {
    const result = await authService.studentLogin(credentials);
    if (!result || !result.user) {
      throw new Error('Invalid login response from server');
    }
    if (result.token) {
      tokenStore.set(result.token);
    }
    const u = result.user;
    setUser(u);
    try { localStorage.setItem('edvedum_active_student', JSON.stringify(u)); } catch (_) {}
    return u;
  }, []);

  const getDashboardRoute = useCallback((role) => {
    if (!role) return '/dashboard';
    const r = String(role).toLowerCase();
    if (r === 'admin') return '/admin';
    if (r === 'institution' || r === 'school') return '/for-institutions';
    return '/dashboard';
  }, []);

  const value = {
    user,
    loading,
    login,
    register,
    studentLogin,
    verifyOtp,
    sendLoginOtp,
    sendSignupOtp,
    verifyLoginOtp,
    firebaseLogin,
    logout,
    getDashboardRoute,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
