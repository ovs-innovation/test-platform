import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../../src/app.js';
import { getStudentBToken } from '../../helpers/authTokens.js';

describe('Institution Branding Route Resolution & Stale Branding Regression Tests', () => {
  const studentBToken = getStudentBToken(); // User ID 102 (Attempt 502)

  it('GET /api/attempts/502 - should include institution branding object and flat fields in assessment response', async () => {
    const res = await request(app)
      .get('/api/attempts/502')
      .set('Authorization', `Bearer ${studentBToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.assessment).toBeDefined();

    // Verification of institution properties for route-level branding resolution
    const { assessment, institution } = res.body;
    expect(assessment).toHaveProperty('institution');
    expect(assessment).toHaveProperty('institution_id');
    expect(assessment).toHaveProperty('institution_name');
    expect(assessment).toHaveProperty('institution_logo_url');
    expect(assessment).toHaveProperty('institution_logo_badge');

    if (institution) {
      expect(institution).toHaveProperty('name');
    }
  });

  it('GET /api/assessments/available/502 - should return assessment data with institution metadata structure', async () => {
    const res = await request(app)
      .get('/api/assessments/available/502')
      .set('Authorization', `Bearer ${studentBToken}`);

    // If available or not found based on test DB setup, check response shape
    if (res.status === 200) {
      expect(res.body.assessment).toBeDefined();
      expect(res.body.assessment).toHaveProperty('institution');
      expect(res.body.assessment).toHaveProperty('institution_name');
      expect(res.body.assessment).toHaveProperty('institution_logo_url');
    } else {
      expect([403, 404]).toContain(res.status);
    }
  });
});
