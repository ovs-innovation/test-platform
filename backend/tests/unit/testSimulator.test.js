import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock DB query before importing controllers
vi.mock('../../src/config/db.js', () => {
  return {
    query: vi.fn(),
  };
});

import { query } from '../../src/config/db.js';
import { getTestSimulator } from '../../src/controllers/testAdminController.js';
import { getAttemptState } from '../../src/controllers/attemptController.js';

const callHandler = (handler, req, res, next) =>
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

describe('Admin Test Simulator Controller', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getTestSimulator', () => {
    it('returns 404 when assessment does not exist', async () => {
      query.mockResolvedValueOnce({ rows: [] }); // tests query
      query.mockResolvedValueOnce({ rows: [] }); // assessments query fallback

      const req = { params: { id: '999' }, user: { id: 1, role: 'superadmin' } };
      const res = { json: vi.fn() };
      const next = vi.fn();

      const result = await callHandler(getTestSimulator, req, res, next);
      expect(result.type).toBe('next');
      expect(result.err.statusCode).toBe(404);
    });

    it('returns formatted simulator payload with synthetic attempt when test exists', async () => {
      const mockAssessment = {
        id: 42,
        title: 'NEET 2026 Grand Test Mock',
        test_type: 'AIETS',
        duration_minutes: 180,
        max_marks: 720,
        is_published: true,
      };

      const mockQuestions = [
        {
          id: 101,
          question_text: 'What is the chemical formula of ozone?',
          question_type: 'mcq',
          options: ['O2', 'O3', 'O4', 'H2O'],
          correct_index: 1,
          marks: 4,
          negative_marks: 1,
          subject: 'Chemistry',
        },
      ];

      // 1st query: tests lookup
      query.mockResolvedValueOnce({ rows: [mockAssessment] });
      // 2nd query: sections lookup
      query.mockResolvedValueOnce({ rows: [] });
      // 3rd query: questions lookup
      query.mockResolvedValueOnce({ rows: mockQuestions });

      const req = { params: { id: '42' }, user: { id: 1, role: 'superadmin' } };
      const res = { json: vi.fn() };
      const next = vi.fn();

      const result = await callHandler(getTestSimulator, req, res, next);
      expect(result.type).toBe('json');
      expect(result.data.is_simulator).toBe(true);
      expect(result.data.attempt.id).toBe('sim-42');
      expect(result.data.assessment.title).toBe('NEET 2026 Grand Test Mock');
      expect(result.data.questions).toHaveLength(1);
      expect(result.data.questions[0].question_text).toBe('What is the chemical formula of ozone?');
      expect(result.data.sections).toBeDefined();
    });
  });

  describe('getAttemptState Simulator Delegation', () => {
    it('delegates sim- prefixed attempt IDs directly to getTestSimulator', async () => {
      const mockAssessment = {
        id: 77,
        title: 'JEE Main Physics Drill',
        duration_minutes: 90,
      };

      // Mock for getTestSimulator:
      query.mockResolvedValueOnce({ rows: [mockAssessment] });
      query.mockResolvedValueOnce({ rows: [] });
      query.mockResolvedValueOnce({ rows: [] });

      const req = { params: { id: 'sim-77' }, user: { id: 1, role: 'admin' } };
      const res = { json: vi.fn() };
      const next = vi.fn();

      const result = await callHandler(getAttemptState, req, res, next);
      expect(result.type).toBe('json');
      expect(result.data.is_simulator).toBe(true);
      expect(result.data.attempt.id).toBe('sim-77');
    });
  });
});
