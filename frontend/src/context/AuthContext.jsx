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
        const savedSt = localStorage.getItem('edvedum_active_student');
        if (savedSt) {
          try {
            setUser(JSON.parse(savedSt));
            setLoading(false);
            return;
          } catch (_) {}
        }
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const { user: me } = await authService.me();
        const savedSt = localStorage.getItem('edvedum_active_student');
        let enriched = me;
        if (savedSt) {
          try {
            const parsed = JSON.parse(savedSt);
            enriched = { ...parsed, ...me };
          } catch (_) {}
        }
        setUser(enriched);
      } catch {
        const savedSt = localStorage.getItem('edvedum_active_student');
        if (savedSt) {
          try {
            setUser(JSON.parse(savedSt));
          } catch (_) {
            tokenStore.clear();
            setUser(null);
          }
        } else {
          tokenStore.clear();
          setUser(null);
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
    let result;
    try {
      result = await authService.studentLogin(credentials);
      if (result.token) tokenStore.set(result.token);
    } catch (_) {
      const { findStudentByAccess } = await import('../lib/schoolStore.js');
      result = findStudentByAccess(credentials);
      tokenStore.set(`mock_student_token_${Date.now()}`);
    }

    let u = result.user;
    if (!u.institution) {
      const { findStudentByAccess } = await import('../lib/schoolStore.js');
      const resolved = findStudentByAccess(credentials);
      u = {
        ...resolved.user,
        ...u,
        institution: resolved.user.institution,
        batch: resolved.user.batch,
        assignedTestSeries: resolved.user.assignedTestSeries,
        assignedEbooks: resolved.user.assignedEbooks,
        enrollmentId: resolved.user.enrollmentId,
      };
    }

    setUser(u);
    try { localStorage.setItem('edvedum_active_student', JSON.stringify(u)); } catch (_) {}
    return u;
  }, []);

  const value = { user, loading, login, register, studentLogin, verifyOtp, sendLoginOtp, sendSignupOtp, verifyLoginOtp, firebaseLogin, logout, isAuthenticated: !!user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
