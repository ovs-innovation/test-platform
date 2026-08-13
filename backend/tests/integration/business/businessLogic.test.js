import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../../src/app.js';
import { getStudentAToken, getInstitutionAdminAToken } from '../../helpers/authTokens.js';

describe('Business Logic & Defensive Control Testing', () => {
  it('should reject student attempting to submit answers for an attempt belonging to another student', async () => {
    const studentAToken = getStudentAToken(); // Student A attempting to write to Student B's attempt 502
    const res = await request(app)
      .put('/api/attempts/502/answer')
      .set('Authorization', `Bearer ${studentAToken}`)
      .send({
        question_id: 1,
        selected_index: 0,
        userId: 102,
      });
    
    expect(res.status).toBe(403);
    expect(res.body.message).toMatch(/this is not your attempt/i);
  });

  it('should reject student attempting to modify payment status via fake signature payload', async () => {
    const studentAToken = getStudentAToken();
    const res = await request(app)
      .post('/api/payments/verify')
      .set('Authorization', `Bearer ${studentAToken}`)
      .send({
        razorpay_order_id: 'ord_fake_123',
        razorpay_payment_id: 'pay_fake_123',
        razorpay_signature: 'fake_signature',
        status: 'PAID',
      });
    
    expect(res.status).toBe(400);
  });

  it('should reject non-admin from modifying global feature flags with 403 Forbidden', async () => {
    const instToken = getInstitutionAdminAToken();
    const res = await request(app)
      .put('/api/admin/feature-flags/cbt_mode')
      .set('Authorization', `Bearer ${instToken}`)
      .send({ enabled: true });
    
    expect(res.status).toBe(403);
  });
});
