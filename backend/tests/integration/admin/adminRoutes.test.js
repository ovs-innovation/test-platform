import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../../../src/app.js';
import { getStudentAToken, getInstitutionAdminAToken, getPlatformAdminToken } from '../../helpers/authTokens.js';

describe('Admin Endpoints Comprehensive Authorization Matrix', () => {
  const studentToken = getStudentAToken();
  const instToken = getInstitutionAdminAToken();
  const adminToken = getPlatformAdminToken();

  let dispCandidateId = null;
  let dispTestId = null;
  let dispInstId = null;

  beforeAll(async () => {
    // Create disposable candidate for destructive admin test assertions
    const resC = await request(app)
      .post('/api/admin/candidates')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Disp Matrix Cand', email: 'disp_matrix_cand@test.com', password: 'Password123!' });
    dispCandidateId = resC.body.candidate?.id || resC.body.id;

    // Create disposable test
    const resT = await request(app)
      .post('/api/admin/tests')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        test_name: 'Disp Matrix Test',
        test_type: 'Full Mock',
        test_date: '2026-09-01',
        start_time: '10:00',
        end_time: '13:00',
        duration_minutes: 180,
        max_marks: 300,
      });
    dispTestId = resT.body.test?.id || resT.body.id;

    // Create disposable institution
    const resI = await request(app)
      .post('/api/admin/institutions')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Disp Matrix Inst',
        schoolId: 'DISP-MAT-88',
        email: 'disp_mat_inst@test.com',
        password: 'Password123!',
      });
    dispInstId = resI.body.id || resI.body.institution?.id;
  });

  const adminEndpoints = [
    { method: 'get', path: '/api/admin/stats', expectedStatus: 200 },
    { method: 'get', path: '/api/admin/analytics', expectedStatus: 200 },
    { method: 'get', path: '/api/admin/analytics/institution', expectedStatus: 200 },
    { method: 'get', path: '/api/admin/candidates', expectedStatus: 200 },
    {
      method: 'post',
      path: '/api/admin/candidates',
      body: { name: 'Disposable Candidate Matrix 88', email: 'disp_cand_matrix_88@test.com', password: 'Password123!' },
      expectedStatus: 201,
    },
    {
      method: 'patch',
      path: '/api/admin/candidates/101/block',
      getAdminPath: () => `/api/admin/candidates/${dispCandidateId}/block`,
      expectedStatus: 200,
    },
    {
      method: 'delete',
      path: '/api/admin/candidates/103',
      getAdminPath: () => `/api/admin/candidates/${dispCandidateId}`,
      expectedStatus: 200,
    },
    { method: 'get', path: '/api/admin/reports', expectedStatus: 200 },
    { method: 'get', path: '/api/admin/reports/export', expectedStatus: 200 },
    { method: 'get', path: '/api/admin/tests', expectedStatus: 200 },
    {
      method: 'post',
      path: '/api/admin/tests',
      body: {
        test_name: 'Disposable Admin Test Matrix 88',
        test_type: 'Full Mock',
        test_date: '2026-09-01',
        start_time: '10:00',
        end_time: '13:00',
        duration_minutes: 180,
        max_marks: 300,
      },
      expectedStatus: 201,
    },
    {
      method: 'patch',
      path: '/api/admin/tests/500/publish',
      getAdminPath: () => `/api/admin/tests/${dispTestId}/publish`,
      expectedStatus: 200,
    },
    {
      method: 'delete',
      path: '/api/admin/tests/500',
      getAdminPath: () => `/api/admin/tests/${dispTestId}`,
      expectedStatus: 200,
    },
    { method: 'get', path: '/api/admin/institutions', expectedStatus: 200 },
    {
      method: 'post',
      path: '/api/admin/institutions',
      body: {
        name: 'Disposable Institution Matrix 88',
        schoolId: 'DISP-88-SCH',
        email: 'disp_inst_matrix_88@test.com',
        password: 'Password123!',
      },
      expectedStatus: 201,
    },
    {
      method: 'delete',
      path: '/api/admin/institutions/20',
      getAdminPath: () => `/api/admin/institutions/${dispInstId}`,
      expectedStatus: 200,
    },
    { method: 'get', path: '/api/admin/b2b-enquiries', expectedStatus: 200 },
    { method: 'get', path: '/api/admin/coupons', expectedStatus: 200 },
    { method: 'get', path: '/api/admin/settings', expectedStatus: 200 },
    { method: 'put', path: '/api/admin/settings', body: { site_name: 'Updated Platform' }, expectedStatus: 200 },
    { method: 'get', path: '/api/admin/feature-flags', expectedStatus: 200 },
    { method: 'put', path: '/api/admin/feature-flags/cbt_mode', body: { enabled: true }, expectedStatus: 200 },
  ];

  adminEndpoints.forEach(({ method, path, getAdminPath, body, expectedStatus }) => {
    it(`[${method.toUpperCase()}] ${path} - should return 401 for unauthenticated request`, async () => {
      const req = request(app)[method](path);
      if (body) req.send(body);
      const res = await req;
      expect(res.status).toBe(401);
    });

    it(`[${method.toUpperCase()}] ${path} - should return 403 Forbidden for Student token`, async () => {
      const req = request(app)[method](path).set('Authorization', `Bearer ${studentToken}`);
      if (body) req.send(body);
      const res = await req;
      expect(res.status).toBe(403);
    });

    it(`[${method.toUpperCase()}] ${path} - should return 403 Forbidden for Institution Admin token`, async () => {
      const req = request(app)[method](path).set('Authorization', `Bearer ${instToken}`);
      if (body) req.send(body);
      const res = await req;
      expect(res.status).toBe(403);
    });

    it(`[${method.toUpperCase()}] ${path} - should pass authorization check for Platform Admin token with exact status ${expectedStatus}`, async () => {
      const targetPath = getAdminPath ? getAdminPath() : path;
      const req = request(app)[method](targetPath).set('Authorization', `Bearer ${adminToken}`);
      if (body) req.send(body);
      const res = await req;
      expect(res.status).toBe(expectedStatus);
    });
  });
});
