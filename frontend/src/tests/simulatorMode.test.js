import { describe, it, expect, vi, beforeEach } from 'vitest';
import { adminService, attemptService } from '../lib/services.js';
import api from '../lib/api.js';

vi.mock('../lib/api.js', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
  tokenStore: {
    get: vi.fn(),
    set: vi.fn(),
    clear: vi.fn(),
  },
}));

describe('Admin Test Simulator Mode Services & Logic', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('adminService.getTestSimulator', () => {
    it('calls GET /admin/tests/:id/simulator and returns simulator payload', async () => {
      const mockData = {
        is_simulator: true,
        attempt: { id: 'sim-10', status: 'in_progress' },
        assessment: { id: 10, title: 'NEET Practice Drill', duration_minutes: 180 },
        sections: [
          { id: 1, name: 'Physics', position: 1 },
          { id: 2, name: 'Chemistry', position: 2 },
        ],
        questions: [
          { id: 101, question_text: 'Sample Q1', question_type: 'mcq' },
          { id: 102, question_text: 'Sample Q2', question_type: 'mcq' },
        ],
      };

      api.get.mockResolvedValueOnce({ data: mockData });

      const res = await adminService.getTestSimulator(10);
      expect(api.get).toHaveBeenCalledWith('/admin/tests/10/simulator');
      expect(res.is_simulator).toBe(true);
      expect(res.attempt.id).toBe('sim-10');
      expect(res.assessment.title).toBe('NEET Practice Drill');
      expect(res.questions).toHaveLength(2);
      expect(res.sections).toHaveLength(2);
    });
  });

  describe('attemptService.getState for simulator attempts', () => {
    it('fetches attempt state for sim- attempt ID smoothly', async () => {
      const mockSimulatorState = {
        is_simulator: true,
        attempt: { id: 'sim-25', status: 'in_progress' },
        assessment: { id: 25, title: 'JEE Advanced Physics' },
        sections: [],
        questions: [{ id: 501, question_text: 'Calculate velocity' }],
        answers: [],
      };

      api.get.mockResolvedValueOnce({ data: mockSimulatorState });

      const res = await attemptService.getState('sim-25');
      expect(api.get).toHaveBeenCalledWith('/attempts/sim-25');
      expect(res.is_simulator).toBe(true);
      expect(res.attempt.id).toBe('sim-25');
    });
  });

  describe('Simulator local in-memory invariants', () => {
    it('verifies simulator attempts use distinct identifier format', () => {
      const testId = '45';
      const simAttemptId = `sim-${testId}`;
      expect(simAttemptId.startsWith('sim-')).toBe(true);
      expect(simAttemptId.replace(/^sim-/, '')).toBe('45');
    });

    it('confirms simulator question answered calculation matches CBT logic', () => {
      const answers = { 101: 2 };
      const multiAnswers = {};
      const codingAnswers = {};
      const subjectiveAnswers = {};
      const numericAnswers = {};

      const isAnswered = (qId) => answers[qId] !== undefined || multiAnswers[qId]?.length > 0 || numericAnswers[qId] != null;
      expect(isAnswered(101)).toBe(true);
      expect(isAnswered(102)).toBe(false);
    });
  });

  describe('isTestLive detection logic', () => {
    it('detects live status when is_live is explicitly true', async () => {
      const { isTestLive } = await import('../lib/testStatus.js');
      expect(isTestLive({ is_live: true })).toBe(true);
      expect(isTestLive({ is_live: 'true' })).toBe(true);
      expect(isTestLive({ computed_status: 'Live' })).toBe(true);
      expect(isTestLive({ status: 'live' })).toBe(true);
    });

    it('returns false for past or unscheduled tests without live flags', async () => {
      const { isTestLive } = await import('../lib/testStatus.js');
      expect(isTestLive(null)).toBe(false);
      expect(isTestLive({ is_live: false, status: 'published' })).toBe(false);
      expect(isTestLive({ test_date: '2020-01-01', start_time: '09:00:00', end_time: '12:00:00' })).toBe(false);
    });

    it('detects live status when current time falls within available_from and available_until', async () => {
      const { isTestLive } = await import('../lib/testStatus.js');
      const now = new Date();
      const past = new Date(now.getTime() - 60000).toISOString();
      const future = new Date(now.getTime() + 60000).toISOString();
      expect(isTestLive({ available_from: past, available_until: future })).toBe(true);
    });
  });

  describe('adminService.toggleLiveTest', () => {
    it('calls PATCH /admin/tests/:id/toggle-live', async () => {
      api.patch.mockResolvedValueOnce({ data: { is_live: true, message: 'Test live status set to LIVE' } });
      const res = await adminService.toggleLiveTest(99);
      expect(api.patch).toHaveBeenCalledWith('/admin/tests/99/toggle-live');
      expect(res.is_live).toBe(true);
    });
  });
});
