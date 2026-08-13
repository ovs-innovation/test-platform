import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../../src/app.js';
import {
  getStudentAToken,
  getExpiredToken,
  getWrongSignatureToken,
  getBlockedStudentToken,
} from '../../helpers/authTokens.js';

describe('Explicit Authentication & Token Security Tests', () => {
  it('should allow access to public health check endpoint without token', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });

  it('should return 401 Unauthorized for protected route when Authorization header is missing', async () => {
    const res = await request(app).get('/api/auth/me');
    expect(res.status).toBe(401);
    expect(res.body.message || res.body.error).toMatch(/token missing/i);
  });

  it('should return 401 Unauthorized when Authorization header format is malformed', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', 'InvalidBearerTokenFormat');
    expect(res.status).toBe(401);
    expect(res.body.message || res.body.error).toMatch(/token missing/i);
  });

  it('should return 401 Unauthorized when JWT token has an invalid signature', async () => {
    const invalidToken = getWrongSignatureToken();
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${invalidToken}`);
    expect(res.status).toBe(401);
    expect(res.body.message || res.body.error).toMatch(/invalid or expired token/i);
  });

  it('should return 401 Unauthorized when JWT token is explicitly expired', async () => {
    const expiredToken = getExpiredToken();
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${expiredToken}`);
    expect(res.status).toBe(401);
    expect(res.body.message || res.body.error).toMatch(/invalid or expired token/i);
  });

  it('should return 403 Forbidden when user account is blocked in database', async () => {
    const blockedToken = getBlockedStudentToken();
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${blockedToken}`);
    
    expect(res.status).toBe(403);
    expect(res.body.message || res.body.error).toMatch(/blocked/i);
  });

  it('should attach user identity to req.user and return 200 OK for valid token of active user', async () => {
    const token = getStudentAToken();
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.status).toBe(200);
    expect(res.body.user.id).toBe(101);
  });
});
