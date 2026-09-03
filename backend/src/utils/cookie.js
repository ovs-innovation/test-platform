import { env } from '../config/env.js';

export const getCookieOptions = (isRefresh = false) => {
  const isProd = env.isProd;
  
  if (isRefresh) {
    return {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'lax' : 'lax',
      path: '/api/auth',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    };
  }

  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'lax' : 'lax',
    path: '/',
    maxAge: 15 * 60 * 1000, // 15 minutes in ms
  };
};

/**
 * Sets secure HttpOnly cookies for access and refresh tokens.
 */
export const setAuthCookies = (res, { accessToken, refreshToken }) => {
  if (!res || typeof res.cookie !== 'function') return;

  if (accessToken) {
    res.cookie('access_token', accessToken, getCookieOptions(false));
  }

  if (refreshToken) {
    res.cookie('refresh_token', refreshToken, getCookieOptions(true));
  }
};

/**
 * Clears authentication cookies across root and auth paths.
 */
export const clearAuthCookies = (res) => {
  if (!res || typeof res.clearCookie !== 'function') return;

  const accessOpts = getCookieOptions(false);
  const refreshOpts = getCookieOptions(true);

  // Clear access token cookie at root path
  res.clearCookie('access_token', { ...accessOpts, maxAge: undefined });
  res.clearCookie('token', { ...accessOpts, maxAge: undefined });
  res.clearCookie('institutionToken', { ...accessOpts, maxAge: undefined });

  // Clear refresh token cookie at auth path and root path
  res.clearCookie('refresh_token', { ...refreshOpts, maxAge: undefined });
  res.clearCookie('refresh_token', { ...accessOpts, maxAge: undefined });
  res.clearCookie('edvedum_refresh_token', { ...refreshOpts, maxAge: undefined });
  res.clearCookie('edvedum_refresh_token', { ...accessOpts, maxAge: undefined });
};
