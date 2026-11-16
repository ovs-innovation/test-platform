import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../src/config/db.js', () => ({
  query: vi.fn(),
  withTransaction: vi.fn(async (cb) => cb({ query: vi.fn() })),
}));

import { query } from '../../src/config/db.js';
import { listBoosterTests } from '../../src/controllers/assessmentController.js';

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

describe('Booster Tests API Controller', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('retrieves published booster tests and calculates student stats accurately', async () => {
    // 1. users query (batch_id, institution_id, exam_type)
    query.mockResolvedValueOnce({
      rows: [{ batch_id: 1, institution_id: 2, exam_type: 'NEET' }],
    });

    // 2. booster tests query
    query.mockResolvedValueOnce({
      rows: [
        {
          id: 101,
          title: 'Physics 60-Min Speed Booster: Optics',
          description: 'High-yield optics questions',
          duration_minutes: 60,
          test_type: 'EDVEDUM Booster Test',
          question_count: 45,
          total_marks: 180,
          subject: 'Physics',
          is_published: true,
          attempt_status: 'completed',
          marks_obtained: 160,
          percentage: 88.89,
          passed: true,
        },
        {
          id: 102,
          title: 'Chemistry 90-Min Booster: Organic Reagents',
          description: 'Rapid organic reactions practice',
          duration_minutes: 90,
          test_type: 'EDVEDUM Booster Test',
          question_count: 50,
          total_marks: 200,
          subject: 'Chemistry',
          is_published: true,
          attempt_status: 'not_started',
          marks_obtained: null,
          percentage: null,
          passed: null,
        },
      ],
    });

    const req = {
      user: { id: 10, email: 'student@example.com' },
    };

    const result = await callHandler(listBoosterTests, req);
    expect(result.type).toBe('json');
    expect(result.data.success).toBe(true);
    expect(result.data.booster_tests).toHaveLength(2);
    expect(result.data.stats.total).toBe(2);
    expect(result.data.stats.completed_count).toBe(1);
    expect(result.data.stats.available_count).toBe(1);
    expect(result.data.stats.avg_percentage).toBe(89);
  });

  it('handles empty booster tests list gracefully without throwing errors', async () => {
    query.mockResolvedValueOnce({ rows: [] });
    query.mockResolvedValueOnce({ rows: [] });

    const req = {
      user: { id: 11, email: 'newstudent@example.com' },
    };

    const result = await callHandler(listBoosterTests, req);
    expect(result.type).toBe('json');
    expect(result.data.success).toBe(true);
    expect(result.data.booster_tests).toHaveLength(0);
    expect(result.data.stats.total).toBe(0);
    expect(result.data.stats.available_count).toBe(0);
  });
});
