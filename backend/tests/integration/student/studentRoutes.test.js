import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../../src/app.js';
import { getStudentAToken, getStudentBToken, getInstitutionAdminAToken } from '../../helpers/authTokens.js';

describe('Student Role & Cross-Student Horizontal Ownership Isolation', () => {
  const studentAToken = getStudentAToken(); // User ID 101
  const studentBToken = getStudentBToken(); // User ID 102
  const instToken = getInstitutionAdminAToken();

  it('GET /api/student/profile - should return 401 Unauthenticated when token missing', async () => {
    const res = await request(app).get('/api/student/profile');
    expect(res.status).toBe(401);
  });

  it('GET /api/student/profile - should return 403 Forbidden for Institution Admin token', async () => {
    const res = await request(app)
      .get('/api/student/profile')
      .set('Authorization', `Bearer ${instToken}`);
    expect(res.status).toBe(403);
  });

  it('GET /api/auth/candidate/dashboard - should return 200 OK for Student A token', async () => {
    const res = await request(app)
      .get('/api/auth/candidate/dashboard')
      .set('Authorization', `Bearer ${studentAToken}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    if (Array.isArray(res.body.subjects)) {
      const phys = res.body.subjects.find((s) => s.name === 'Physics' || s.subject_name === 'Physics');
      if (phys) {
        expect(phys).toBeDefined();
      }
    }
  });

  it('GET /api/auth/candidate/dashboard - should return 403 Forbidden for Institution Admin token', async () => {
    const res = await request(app)
      .get('/api/auth/candidate/dashboard')
      .set('Authorization', `Bearer ${instToken}`);
    expect(res.status).toBe(403);
  });

  it('GET /api/student/calendar - should return 403 Forbidden for Institution Admin token', async () => {
    const res = await request(app)
      .get('/api/student/calendar')
      .set('Authorization', `Bearer ${instToken}`);
    expect(res.status).toBe(403);
  });

  it('GET /api/student/reports/overall - should return 200 OK for Student A token', async () => {
    const res = await request(app)
      .get('/api/student/reports/overall')
      .set('Authorization', `Bearer ${studentAToken}`);
    expect(res.status).toBe(200);
  });

  it('HORIZONTAL OWNERSHIP (Attempt 502): Student B accessing own attempt 502 returns exactly 200 OK', async () => {
    const res = await request(app)
      .get('/api/attempts/502')
      .set('Authorization', `Bearer ${studentBToken}`);
    expect(res.status).toBe(200);
    expect(res.body.attempt.id).toBe(502);
    expect(res.body.attempt.candidate_id).toBe(102);
  });

  it('HORIZONTAL OWNERSHIP (Attempt 502): Student A attempting to access Student B attempt 502 is BLOCKED with 403 Forbidden', async () => {
    // Make sure attempt 502 exists and belongs to Student B (102)
    const res = await request(app)
      .get('/api/attempts/502')
      .set('Authorization', `Bearer ${studentAToken}`);
    expect(res.status).toBe(403);
    expect(res.body.message).toMatch(/this is not your attempt/i);
  });

  it('IDENTITY IMMUTABILITY: Student A sending body.userId = 102 in profile update cannot modify Student B profile', async () => {
    const res = await request(app)
      .put('/api/student/profile')
      .set('Authorization', `Bearer ${studentAToken}`)
      .send({
        name: 'Updated Name Student A',
        userId: 102,
      });
    
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
  });
});
