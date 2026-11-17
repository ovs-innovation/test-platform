import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../src/config/db.js', () => ({
  query: vi.fn(),
  withTransaction: vi.fn(async (cb) => cb({ query: vi.fn() })),
}));

import { query } from '../../src/config/db.js';
import { getLeaderboardAssessments, getLeaderboard } from '../../src/controllers/studentController.js';

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

describe('Student Leaderboard Assessments Scoping', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('only returns enrolled test-series assessments and battleground tests to the student', async () => {
    // 1. auto-sync query mock
    query.mockResolvedValueOnce({ rows: [] });

    // 2. leaderboard assessments query mock
    query.mockResolvedValueOnce({
      rows: [
        {
          id: 10,
          title: 'AIETS 2027: Unit Test 3',
          attempt_count: 1,
          is_booster: false,
          series_title: 'AIETS NEET-UG 2027 Program',
        },
        {
          id: 50,
          title: 'Botany Rapid Speed Drill',
          attempt_count: 5,
          is_booster: true,
          series_title: '',
        },
      ],
    });

    const req = {
      user: {
        id: 100,
        email: 'rohan@example.com',
        batch_id: 2,
        institution_id: null,
        role: 'candidate',
      },
    };

    const result = await callHandler(getLeaderboardAssessments, req);
    expect(result.type).toBe('json');
    expect(result.data.assessments).toHaveLength(2);
    expect(result.data.assessments[0].title).toBe('AIETS 2027: Unit Test 3');
    expect(result.data.assessments[0].series_title).toBe('AIETS NEET-UG 2027 Program');
    expect(result.data.assessments[1].is_booster).toBe(true);

    // Verify SQL query passed candidate id to check student_enrollments
    expect(query).toHaveBeenCalledWith(
      expect.stringContaining('student_enrollments'),
      expect.arrayContaining([100, 'rohan@example.com', 2, null])
    );
  });

  it('falls back to enrolled test-series assessment when no specific assessmentId is provided', async () => {
    // 1. recent attempt check (none)
    query.mockResolvedValueOnce({ rows: [] });

    // 2. enrolled test-series assessment query
    query.mockResolvedValueOnce({
      rows: [{ assessment_id: 10 }],
    });

    // 3. assessment details query
    query.mockResolvedValueOnce({
      rows: [{ id: 10, title: 'AIETS 2027: Unit Test 3', is_booster: false }],
    });

    // 4. student enrollment access verification
    query.mockResolvedValueOnce({ rowCount: 1 });

    // 5. leaderboard attempts list query
    query.mockResolvedValueOnce({
      rows: [
        {
          attempt_id: 501,
          candidate_id: 100,
          name: 'Rohan Sharma',
          marks_obtained: 12,
          total_marks: 12,
          percentage: 100,
          percentile: 100,
          rank: 1,
        },
      ],
    });

    // 6. attempt details query for stats
    query.mockResolvedValueOnce({
      rows: [{ attempt_id: 501, duration_seconds: 120, correct_count: 3, wrong_count: 0, accuracy: 100 }],
    });

    // 7. topper stats query
    query.mockResolvedValueOnce({
      rows: [{ attempt_id: 501, duration_seconds: 120, correct_count: 3, wrong_count: 0, accuracy: 100 }],
    });

    const req = {
      user: { id: 100, email: 'rohan@example.com', role: 'candidate' },
      query: { type: 'standard' },
    };

    const result = await callHandler(getLeaderboard, req);
    expect(result.type).toBe('json');
    expect(result.data.assessment_id).toBe(10);
    expect(result.data.leaderboard).toHaveLength(1);
    expect(result.data.leaderboard[0].is_you).toBe(true);
    expect(result.data.has_student_attempt).toBe(true);
  });

  it('blocks viewing leaderboard for an assessment belonging to an un-enrolled test series', async () => {
    // 1. assessment details query
    query.mockResolvedValueOnce({
      rows: [{ id: 99, title: 'AIETS 2028: Part Test 7', is_booster: false }],
    });

    // 2. student enrollment access verification (0 rows - not enrolled)
    query.mockResolvedValueOnce({ rowCount: 0 });

    // 3. direct access check (0 rows - not attempted or invited)
    query.mockResolvedValueOnce({ rowCount: 0 });

    const req = {
      user: { id: 100, email: 'rohan@example.com', role: 'candidate' },
      query: { assessment_id: 99, type: 'standard' },
    };

    const result = await callHandler(getLeaderboard, req);
    expect(result.type).toBe('json');
    expect(result.data.assessment_id).toBeNull();
    expect(result.data.leaderboard).toHaveLength(0);
  });
});
