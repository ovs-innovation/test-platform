import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock DB query & withTransaction before importing attempt controller
vi.mock('../../src/config/db.js', () => ({
  query: vi.fn(),
  withTransaction: vi.fn((callback) => {
    const mockClient = {
      query: vi.fn(),
    };
    return callback(mockClient);
  }),
  pool: {
    query: vi.fn(),
  },
}));

import { query, withTransaction } from '../../src/config/db.js';
import {
  saveAnswer,
  saveCodingAnswer,
  saveSubjectiveAnswer,
  markForReview,
  clearAnswer,
  submitAttempt,
} from '../../src/controllers/attemptController.js';
import {
  saveAnswerSchema,
  saveCodingSchema,
  saveSubjectiveSchema,
  markReviewSchema,
  clearAnswerSchema,
} from '../../src/validators/schemas.js';

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
      next(err);
      resolve({ type: 'next', err });
    });
    handler(req, wrappedRes, wrappedNext);
  });

describe('CBT Submission and Answer Recovery Reliability', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Schema Validation & Monotonic Timestamp Support', () => {
    it('Requirement 3: saveAnswerSchema allows client_timestamp for out-of-order deduplication', () => {
      const validPayload = {
        question_id: 101,
        selected_index: 2,
        client_timestamp: Date.now(),
      };
      const parsed = saveAnswerSchema.safeParse(validPayload);
      expect(parsed.success).toBe(true);
      expect(parsed.data.client_timestamp).toBe(validPayload.client_timestamp);
    });

    it('Requirement 3: saveCodingSchema and saveSubjectiveSchema allow client_timestamp', () => {
      const codingPayload = {
        question_id: 102,
        source_code: 'function test() {}',
        language: 'javascript',
        client_timestamp: '2026-10-17T11:00:00Z',
      };
      expect(saveCodingSchema.safeParse(codingPayload).success).toBe(true);

      const subjPayload = {
        question_id: 103,
        answer_text: 'Explanation here',
        client_timestamp: Date.now(),
      };
      expect(saveSubjectiveSchema.safeParse(subjPayload).success).toBe(true);
    });

    it('Requirement 3: markReviewSchema and clearAnswerSchema allow client_timestamp', () => {
      expect(markReviewSchema.safeParse({ question_id: 104, marked_for_review: true, client_timestamp: Date.now() }).success).toBe(true);
      expect(clearAnswerSchema.safeParse({ question_id: 105, client_timestamp: Date.now() }).success).toBe(true);
    });
  });

  describe('Authoritative Server Time Provision', () => {
    it('Requirement 5: saveAnswer returns server_time for client timer reconciliation', async () => {
      const futureDeadline = new Date(Date.now() + 3600000).toISOString();
      query.mockImplementation((sql) => {
        if (sql.includes('SELECT * FROM attempts')) {
          return Promise.resolve({
            rows: [{ id: 502, candidate_id: 1, status: 'in_progress', ends_at: futureDeadline }],
          });
        }
        if (sql.includes('SELECT id, question_type')) {
          return Promise.resolve({ rows: [{ id: 101, question_type: 'mcq' }] });
        }
        return Promise.resolve({ rows: [] });
      });

      const req = {
        params: { id: 502 },
        body: { question_id: 101, selected_index: 1 },
        user: { id: 1, role: 'candidate' },
      };

      const result = await callHandler(saveAnswer, req);
      expect(result.type).toBe('json');
      expect(result.data.saved).toBe(true);
      expect(result.data.server_time).toBeDefined();
      expect(new Date(result.data.server_time).getTime()).toBeGreaterThan(0);
    });

    it('Requirement 5: saveCodingAnswer and saveSubjectiveAnswer return server_time', async () => {
      const futureDeadline = new Date(Date.now() + 3600000).toISOString();
      query.mockResolvedValue({
        rows: [{ id: 502, candidate_id: 1, status: 'in_progress', ends_at: futureDeadline }],
      });

      const reqCoding = {
        params: { id: 502 },
        body: { question_id: 102, source_code: 'code', language: 'python' },
        user: { id: 1, role: 'candidate' },
      };
      const resCoding = await callHandler(saveCodingAnswer, reqCoding);
      expect(resCoding.data.saved).toBe(true);
      expect(resCoding.data.server_time).toBeDefined();

      const reqSubj = {
        params: { id: 502 },
        body: { question_id: 103, answer_text: 'my answer' },
        user: { id: 1, role: 'candidate' },
      };
      const resSubj = await callHandler(saveSubjectiveAnswer, reqSubj);
      expect(resSubj.data.saved).toBe(true);
      expect(resSubj.data.server_time).toBeDefined();
    });

    it('Requirement 5: markForReview and clearAnswer return server_time and correctly parse question_id', async () => {
      query.mockImplementation((sql, params) => {
        if (sql.includes('SELECT * FROM attempts')) {
          return Promise.resolve({
            rows: [{ id: 502, candidate_id: 1, status: 'in_progress', ends_at: new Date(Date.now() + 3600000).toISOString() }],
          });
        }
        return Promise.resolve({ rows: [] });
      });

      // Test markForReview
      const reqReview = {
        params: { id: 502 },
        body: { question_id: 104, marked_for_review: true },
        user: { id: 1, role: 'candidate' },
      };
      const resReview = await callHandler(markForReview, reqReview);
      expect(resReview.data.marked).toBe(true);
      expect(resReview.data.server_time).toBeDefined();

      // Test clearAnswer: Verifies it correctly reads question_id from req.body
      const reqClear = {
        params: { id: 502 },
        body: { question_id: 105 },
        user: { id: 1, role: 'candidate' },
      };
      const resClear = await callHandler(clearAnswer, reqClear);
      expect(resClear.data.cleared).toBe(true);
      expect(resClear.data.server_time).toBeDefined();

      // Ensure DELETE query targeted question_id 105
      const deleteCalls = query.mock.calls.filter(([sql]) => sql.includes('DELETE FROM answers'));
      expect(deleteCalls.length).toBeGreaterThan(0);
      expect(deleteCalls[0][1]).toEqual([502, 105]);
    });
  });

  describe('Submission Idempotency and Deduplication', () => {
    it('Requirement 4: submitAttempt safely retries without duplicate attempts or duplicate grading', async () => {
      let isFirstCall = true;
      const existingScore = {
        attempt_id: 502,
        marks_obtained: 180,
        total_marks: 300,
        percentage: 60,
      };

      // Mock transaction query for finalizeAttempt
      withTransaction.mockImplementation(async (callback) => {
        const client = {
          query: vi.fn((sql, params) => {
            if (sql.includes('SELECT * FROM attempts WHERE id = $1 FOR UPDATE')) {
              // First call: in_progress; Second call: already submitted
              const status = isFirstCall ? 'in_progress' : 'submitted';
              return Promise.resolve({
                rows: [{ id: 502, assessment_id: 10, candidate_id: 1, status, violation_count: 0 }],
              });
            }
            if (sql.includes('SELECT * FROM scores WHERE attempt_id = $1')) {
              return Promise.resolve({ rows: [existingScore] });
            }
            if (sql.includes('SELECT * FROM assessments')) {
              return Promise.resolve({ rows: [{ id: 10, title: 'Test 1', max_violations: 5 }] });
            }
            if (sql.includes('SELECT * FROM questions')) {
              return Promise.resolve({ rows: [] });
            }
            if (sql.includes('SELECT question_id')) {
              return Promise.resolve({ rows: [] });
            }
            if (sql.includes('INSERT INTO scores')) {
              return Promise.resolve({ rows: [existingScore] });
            }
            return Promise.resolve({ rows: [] });
          }),
        };
        return callback(client);
      });

      query.mockImplementation((sql, params) => {
        if (sql.includes('SELECT * FROM attempts WHERE id = $1')) {
          return Promise.resolve({
            rows: [{ id: 502, assessment_id: 10, candidate_id: 1, status: isFirstCall ? 'in_progress' : 'submitted' }],
          });
        }
        if (sql.includes('SELECT * FROM assessments WHERE id = $1')) {
          return Promise.resolve({
            rows: [{ id: 10, title: 'Test 1' }],
          });
        }
        return Promise.resolve({ rows: [] });
      });

      const req = {
        params: { id: 502 },
        body: { reason: 'manual' },
        user: { id: 1, role: 'candidate' },
      };

      // 1. Initial submission
      const firstResult = await callHandler(submitAttempt, req);
      expect(firstResult.type).toBe('json');
      expect(firstResult.data.score.marks_obtained).toBe(180);

      // 2. Client retry submission (e.g. timeout on client, but server succeeded)
      isFirstCall = false;
      const retryResult = await callHandler(submitAttempt, req);
      expect(retryResult.type).toBe('json');
      // Returns existing score without re-grading or error
      expect(retryResult.data.score.marks_obtained).toBe(180);
    });
  });
});
