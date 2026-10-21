import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../src/config/db.js', () => ({
  query: vi.fn(),
  pool: { query: vi.fn() },
  withTransaction: vi.fn((fn) => fn({ query: vi.fn() })),
}));

vi.mock('../../src/utils/email.js', () => ({
  sendInviteEmail: vi.fn().mockResolvedValue({ sent: true }),
}));

import { query } from '../../src/config/db.js';
import { sendInviteEmail } from '../../src/utils/email.js';
import { createInvite, grantRetake } from '../../src/controllers/inviteController.js';
import { resetAttempt } from '../../src/controllers/adminController.js';

const runHandler = (handler, req, res = {}, next = vi.fn()) =>
  new Promise((resolve) => {
    const wrappedRes = {
      ...res,
      json: vi.fn((data) => {
        res.json?.(data);
        resolve({ type: 'json', data });
      }),
      status: vi.fn((code) => {
        res.status?.(code);
        return wrappedRes;
      }),
    };
    const wrappedNext = vi.fn((err) => {
      next(err);
      resolve({ type: 'next', err });
    });
    handler(req, wrappedRes, wrappedNext);
  });

describe('Admin Test Retake & Attempt Reset Functionality', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createInvite with retake support', () => {
    it('blocks re-inviting an already completed candidate when allow_retake is false', async () => {
      query.mockImplementation((sql) => {
        if (sql.includes('SELECT id, title')) {
          return Promise.resolve({ rowCount: 1, rows: [{ id: 10, title: 'Physics Mock', duration_minutes: 60, is_published: true }] });
        }
        if (sql.includes('SELECT COUNT(*)::int AS c FROM questions')) {
          return Promise.resolve({ rowCount: 1, rows: [{ c: 15 }] });
        }
        if (sql.includes('SELECT id, status, token FROM candidate_invites')) {
          return Promise.resolve({ rowCount: 1, rows: [{ id: 101, status: 'completed', token: 'old-token' }] });
        }
        return Promise.resolve({ rowCount: 0, rows: [] });
      });

      const req = {
        body: { assessment_id: 10, candidate_name: 'Priya Sharma', candidate_email: 'priya@test.com', allow_retake: false },
        get: () => 'http://localhost:5173',
      };

      const result = await runHandler(createInvite, req);
      expect(result.type).toBe('next');
      expect(result.err.statusCode).toBe(409);
      expect(result.err.message).toContain('already completed');
      expect(result.err.message).toContain('Allow Retake');
    });

    it('resets attempts and re-invites candidate when allow_retake is true', async () => {
      const deletedQueries = [];
      query.mockImplementation((sql, params) => {
        if (sql.includes('SELECT id, title')) {
          return Promise.resolve({ rowCount: 1, rows: [{ id: 10, title: 'Physics Mock', duration_minutes: 60, is_published: true }] });
        }
        if (sql.includes('SELECT COUNT(*)::int AS c FROM questions')) {
          return Promise.resolve({ rowCount: 1, rows: [{ c: 15 }] });
        }
        if (sql.includes('SELECT id, status, token FROM candidate_invites')) {
          return Promise.resolve({ rowCount: 1, rows: [{ id: 101, status: 'completed', token: 'token-abc' }] });
        }
        if (sql.includes('SELECT id FROM users WHERE LOWER(email)')) {
          return Promise.resolve({ rowCount: 1, rows: [{ id: 501 }] });
        }
        if (sql.includes('DELETE FROM attempts')) {
          deletedQueries.push({ sql, params });
          return Promise.resolve({ rowCount: 1 });
        }
        if (sql.includes('DELETE FROM test_attempts')) {
          deletedQueries.push({ sql, params });
          return Promise.resolve({ rowCount: 0 });
        }
        if (sql.includes('UPDATE candidate_invites')) {
          return Promise.resolve({
            rowCount: 1,
            rows: [{ id: 101, candidate_name: 'Priya Sharma', candidate_email: 'priya@test.com', status: 'pending', token: 'token-abc' }],
          });
        }
        return Promise.resolve({ rowCount: 0, rows: [] });
      });

      const req = {
        body: { assessment_id: 10, candidate_name: 'Priya Sharma', candidate_email: 'priya@test.com', allow_retake: true },
        get: () => 'http://localhost:5173',
      };

      const result = await runHandler(createInvite, req);
      expect(result.type).toBe('json');
      expect(result.data.retake_granted).toBe(true);
      expect(result.data.invite.status).toBe('pending');
      expect(deletedQueries.some((q) => q.sql.includes('DELETE FROM attempts') && q.params[1] === 501)).toBe(true);
      expect(sendInviteEmail).toHaveBeenCalled();
    });
  });

  describe('grantRetake', () => {
    it('resets attempt and updates candidate_invites to pending', async () => {
      let attemptsDeleted = false;
      let invitesUpdated = false;

      query.mockImplementation((sql) => {
        if (sql.includes('SELECT ci.*')) {
          return Promise.resolve({
            rowCount: 1,
            rows: [{ id: 101, assessment_id: 10, candidate_name: 'Priya Sharma', candidate_email: 'priya@test.com', assessment_title: 'Physics Mock', duration_minutes: 60 }],
          });
        }
        if (sql.includes('SELECT id FROM users WHERE LOWER(email)')) {
          return Promise.resolve({ rowCount: 1, rows: [{ id: 501 }] });
        }
        if (sql.includes('DELETE FROM attempts')) {
          attemptsDeleted = true;
          return Promise.resolve({ rowCount: 1 });
        }
        if (sql.includes('DELETE FROM test_attempts')) {
          return Promise.resolve({ rowCount: 0 });
        }
        if (sql.includes('UPDATE candidate_invites')) {
          invitesUpdated = true;
          return Promise.resolve({
            rowCount: 1,
            rows: [{ id: 101, candidate_name: 'Priya Sharma', candidate_email: 'priya@test.com', status: 'pending', token: 'fresh-token' }],
          });
        }
        return Promise.resolve({ rowCount: 0, rows: [] });
      });

      const req = {
        params: { id: '101' },
        get: () => 'http://localhost:5173',
      };

      const result = await runHandler(grantRetake, req);
      expect(result.type).toBe('json');
      expect(result.data.message).toContain('Retake granted');
      expect(attemptsDeleted).toBe(true);
      expect(invitesUpdated).toBe(true);
      expect(sendInviteEmail).toHaveBeenCalled();
    });
  });

  describe('resetAttempt', () => {
    it('resets attempt by attemptId and restores invite status to pending', async () => {
      let attemptDeleted = false;
      let inviteReset = false;

      query.mockImplementation((sql, params) => {
        if (sql.includes('SELECT * FROM attempts WHERE id = $1')) {
          return Promise.resolve({
            rowCount: 1,
            rows: [{ id: 999, assessment_id: 10, candidate_id: 501, status: 'submitted' }],
          });
        }
        if (sql.includes('DELETE FROM attempts WHERE id = $1')) {
          attemptDeleted = true;
          return Promise.resolve({ rowCount: 1 });
        }
        if (sql.includes('SELECT email FROM users WHERE id = $1')) {
          return Promise.resolve({ rowCount: 1, rows: [{ email: 'priya@test.com' }] });
        }
        if (sql.includes('UPDATE candidate_invites')) {
          inviteReset = true;
          return Promise.resolve({ rowCount: 1 });
        }
        return Promise.resolve({ rowCount: 0, rows: [] });
      });

      const req = {
        params: { id: '999' },
      };

      const result = await runHandler(resetAttempt, req);
      expect(result.type).toBe('json');
      expect(result.data.success).toBe(true);
      expect(attemptDeleted).toBe(true);
      expect(inviteReset).toBe(true);
    });
  });
});
