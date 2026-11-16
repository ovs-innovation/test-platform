import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../src/config/db.js', () => ({
  query: vi.fn(),
  withTransaction: vi.fn(async (cb) => {
    const mockClient = {
      query: vi.fn(),
    };
    return cb(mockClient);
  }),
}));

vi.mock('../../src/controllers/attemptController.js', () => ({
  finalizeAttempt: vi.fn().mockResolvedValue({ status: 'auto_submitted' }),
}));

import { withTransaction } from '../../src/config/db.js';
import { finalizeAttempt } from '../../src/controllers/attemptController.js';
import { logViolation } from '../../src/controllers/violationController.js';

const callHandler = (handler, req, res = {}, next = vi.fn()) =>
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
      next?.(err);
      resolve({ type: 'next', err });
    });
    handler(req, wrappedRes, wrappedNext);
  });

describe('Violation Controller & Auto-submission', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('increments violation count and returns autoSubmitted=false when limit is not reached', async () => {
    withTransaction.mockImplementationOnce(async (cb) => {
      const client = {
        query: vi.fn((sql) => {
          if (sql.includes('SELECT * FROM attempts WHERE id = $1 FOR UPDATE')) {
            return Promise.resolve({
              rows: [{ id: 50, candidate_id: 10, status: 'in_progress', violation_count: 0 }],
            });
          }
          if (sql.includes('INSERT INTO violations')) {
            return Promise.resolve({ rows: [] });
          }
          if (sql.includes('UPDATE attempts SET violation_count')) {
            return Promise.resolve({
              rows: [{ violation_count: 1, assessment_id: 268 }],
            });
          }
          if (sql.includes('SELECT max_violations FROM assessments')) {
            return Promise.resolve({
              rows: [{ max_violations: 2 }],
            });
          }
          return Promise.resolve({ rows: [] });
        }),
      };
      return cb(client);
    });

    const req = {
      params: { id: '50' },
      body: { violation_type: 'tab_switch' },
      user: { id: 10, role: 'candidate' },
    };

    const result = await callHandler(logViolation, req);
    expect(result.type).toBe('json');
    expect(result.data.violation_count).toBe(1);
    expect(result.data.max_violations).toBe(2);
    expect(result.data.autoSubmitted).toBe(false);
    expect(finalizeAttempt).not.toHaveBeenCalled();
  });

  it('auto-submits exam when violation limit configured by admin is reached or exceeded', async () => {
    withTransaction.mockImplementationOnce(async (cb) => {
      const client = {
        query: vi.fn((sql) => {
          if (sql.includes('SELECT * FROM attempts WHERE id = $1 FOR UPDATE')) {
            return Promise.resolve({
              rows: [{ id: 50, candidate_id: 10, status: 'in_progress', violation_count: 0 }],
            });
          }
          if (sql.includes('INSERT INTO violations')) {
            return Promise.resolve({ rows: [] });
          }
          if (sql.includes('UPDATE attempts SET violation_count')) {
            return Promise.resolve({
              rows: [{ violation_count: 1, assessment_id: 268 }],
            });
          }
          if (sql.includes('SELECT max_violations FROM assessments')) {
            return Promise.resolve({
              rows: [{ max_violations: 1 }], // Admin configured limit to 1
            });
          }
          return Promise.resolve({ rows: [] });
        }),
      };
      return cb(client);
    });

    const req = {
      params: { id: '50' },
      body: { violation_type: 'tab_switch' },
      user: { id: 10, role: 'candidate' },
    };

    const result = await callHandler(logViolation, req);
    expect(result.type).toBe('json');
    expect(result.data.violation_count).toBe(1);
    expect(result.data.max_violations).toBe(1);
    expect(result.data.autoSubmitted).toBe(true);
    expect(finalizeAttempt).toHaveBeenCalledWith('50', 'auto_submitted');
  });

  it('does not allow other users to record violations on someone elses attempt', async () => {
    withTransaction.mockImplementationOnce(async (cb) => {
      const client = {
        query: vi.fn((sql) => {
          if (sql.includes('SELECT * FROM attempts WHERE id = $1 FOR UPDATE')) {
            return Promise.resolve({
              rows: [{ id: 50, candidate_id: 10, status: 'in_progress', violation_count: 0 }],
            });
          }
          return Promise.resolve({ rows: [] });
        }),
      };
      return cb(client);
    });

    const req = {
      params: { id: '50' },
      body: { violation_type: 'tab_switch' },
      user: { id: 999, role: 'candidate' }, // Not the owner
    };

    const result = await callHandler(logViolation, req);
    expect(result.type).toBe('next');
    expect(result.err.statusCode).toBe(403);
    expect(finalizeAttempt).not.toHaveBeenCalled();
  });
});
