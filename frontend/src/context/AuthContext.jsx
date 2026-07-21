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
      if (!tokenStore.get()) {
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const { user: me } = await authService.me();
        setUser(me);
      } catch {
        tokenStore.clear();
        setUser(null);
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

  const verifyLoginOtp = useCallback(async (data) => {
    const { token, user: u } = await authService.verifyLoginOtp(data);
    tokenStore.set(token);
    setUser(u);
    return u;
  }, []);

  const logout = useCallback(() => {
    tokenStore.clear();
    setUser(null);
  }, []);

  const register = useCallback(async (data) => {
    const { token, user: u } = await authService.register(data);
    tokenStore.set(token);
    setUser(u);
    return u;
  }, []);

  const studentLogin = useCallback(async (credentials) => {
    const { token, user: u } = await authService.studentLogin(credentials);
    tokenStore.set(token);
    setUser(u);
    return u;
  }, []);

  const value = { user, loading, login, register, studentLogin, verifyOtp, sendLoginOtp, verifyLoginOtp, logout, isAuthenticated: !!user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
