import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../../../src/app.js';
import { getStudentAToken, getInstitutionAdminAToken } from '../../helpers/authTokens.js';

describe('Institution Tenant Isolation & Role Matrix', () => {
  const studentToken = getStudentAToken();
  const instAdminAToken = getInstitutionAdminAToken(); // Institution ID 10

  let dispStudentId = null;

  beforeAll(async () => {
    // Create disposable student in Inst 10 for update/delete matrix tests
    const res = await request(app)
      .post('/api/institution/10/students')
      .set('Authorization', `Bearer ${instAdminAToken}`)
      .send({ name: 'Disp Student Inst Matrix', email: 'disp_student_inst_mat_44@test.com' });
    dispStudentId = res.body.student?.id || res.body.candidate?.id || res.body.user?.id || res.body.id;
  });

  const instEndpoints = [
    { method: 'get', subpath: '/profile', expectedStatus: 200 },
    { method: 'put', subpath: '/profile', body: { name: 'Updated Inst Name' }, expectedStatus: 200 },
    { method: 'get', subpath: '/students', expectedStatus: 200 },
    { method: 'post', subpath: '/students', body: { name: 'Disposable Student A', email: 'disp_student_inst10_matrix@test.com' }, expectedStatus: 201 },
    {
      method: 'put',
      subpath: '/students/101',
      getInstPath: () => `/api/institution/10/students/${dispStudentId}`,
      body: { name: 'Updated Student A' },
      expectedStatus: 200,
    },
    {
      method: 'delete',
      subpath: '/students/101',
      getInstPath: () => `/api/institution/10/students/${dispStudentId}`,
      expectedStatus: 200,
    },
    { method: 'get', subpath: '/batches', expectedStatus: 200 },
    { method: 'post', subpath: '/batches', body: { batch_name: 'Disposable Batch Matrix 2026' }, expectedStatus: 201 },
    { method: 'get', subpath: '/analytics', expectedStatus: 200 },
    { method: 'get', subpath: '/invoices', expectedStatus: 200 },
    { method: 'get', subpath: '/notifications', expectedStatus: 200 },
  ];

  instEndpoints.forEach(({ method, subpath, getInstPath, body, expectedStatus }) => {
    const pathInst10 = `/api/institution/10${subpath}`;
    const pathInst20 = `/api/institution/20${subpath}`;

    it(`[${method.toUpperCase()}] ${pathInst10} - should return 401 for unauthenticated request`, async () => {
      const req = request(app)[method](pathInst10);
      if (body) req.send(body);
      const res = await req;
      expect(res.status).toBe(401);
    });

    it(`[${method.toUpperCase()}] ${pathInst10} - should return 403 Forbidden for Student token`, async () => {
      const req = request(app)[method](pathInst10).set('Authorization', `Bearer ${studentToken}`);
      if (body) req.send(body);
      const res = await req;
      expect(res.status).toBe(403);
    });

    it(`ENFORCE TENANT ISOLATION: [${method.toUpperCase()}] Inst Admin A (Inst 10) calling Inst 20 endpoint ${pathInst20} should be BLOCKED with 403`, async () => {
      const req = request(app)[method](pathInst20).set('Authorization', `Bearer ${instAdminAToken}`);
      if (body) req.send(body);
      const res = await req;
      expect(res.status).toBe(403);
      expect(res.body.message || res.body.error).toMatch(/access to another institution’s data is prohibited/i);
    });

    it(`[${method.toUpperCase()}] Inst Admin A (Inst 10) calling own Inst 10 endpoint ${pathInst10} should return exact status ${expectedStatus}`, async () => {
      const targetPath = getInstPath ? getInstPath() : pathInst10;
      const req = request(app)[method](targetPath).set('Authorization', `Bearer ${instAdminAToken}`);
      if (body) req.send(body);
      const res = await req;
      expect(res.status).toBe(expectedStatus);
    });
  });
});
