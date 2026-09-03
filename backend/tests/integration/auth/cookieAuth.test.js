import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../../src/app.js';
import { getStudentAToken, getExpiredToken, getWrongSignatureToken } from '../../helpers/authTokens.js';
import { signAccessToken, signRefreshToken } from '../../../src/utils/token.js';

describe('HttpOnly Cookie-Based Authentication & Session Security Tests', () => {
  const instAdminUser = {
    id: 201,
    name: 'Institution Admin Test',
    email: 'instadmin@assess.io',
    role: 'institution_admin',
    institution_id: 10,
  };

  const validAccessToken = signAccessToken(instAdminUser);
  const validRefreshToken = signRefreshToken(instAdminUser);

  it('should authenticate protected /api/auth/me using HttpOnly access_token cookie', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Cookie', [`access_token=${validAccessToken}`]);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user.role).toBe('institution_admin');
    expect(res.body.user.email).toBe('instadmin@assess.io');
  });

  it('should reject requests with invalid or tampered access_token cookie with 401', async () => {
    const invalidToken = getWrongSignatureToken();
    const res = await request(app)
      .get('/api/auth/me')
      .set('Cookie', [`access_token=${invalidToken}`]);

    expect(res.status).toBe(401);
    expect(res.body.message || res.body.error).toMatch(/invalid or expired token/i);
  });

  it('should reject requests with expired access_token cookie with 401', async () => {
    const expiredToken = getExpiredToken();
    const res = await request(app)
      .get('/api/auth/me')
      .set('Cookie', [`access_token=${expiredToken}`]);

    expect(res.status).toBe(401);
    expect(res.body.message || res.body.error).toMatch(/invalid or expired token/i);
  });

  it('should reject requests when no cookie or header is provided with 401', async () => {
    const res = await request(app).get('/api/auth/me');

    expect(res.status).toBe(401);
    expect(res.body.message || res.body.error).toMatch(/authentication token missing/i);
  });

  it('POST /api/auth/logout should return Set-Cookie headers clearing auth cookies', async () => {
    const res = await request(app)
      .post('/api/auth/logout')
      .set('Cookie', [`access_token=${validAccessToken}`, `refresh_token=${validRefreshToken}`]);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('success', true);

    const cookies = res.headers['set-cookie'];
    expect(cookies).toBeDefined();
    expect(Array.isArray(cookies)).toBe(true);

    // Verify clearCookie sets expiration in the past (Epoch 1970) or empty values
    const accessTokenClear = cookies.find((c) => c.startsWith('access_token='));
    expect(accessTokenClear).toBeDefined();
    expect(accessTokenClear).toMatch(/Expires=Thu, 01 Jan 1970|Max-Age=0|access_token=;/i);

    const refreshTokenClear = cookies.find((c) => c.startsWith('refresh_token='));
    expect(refreshTokenClear).toBeDefined();
  });
});
