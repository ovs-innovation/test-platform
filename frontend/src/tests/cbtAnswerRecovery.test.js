import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { CbtAnswerSyncManager, SYNC_STATUS } from '../lib/cbtAnswerSync.js';
import { attemptService } from '../lib/services.js';

// Mock attemptService
vi.mock('../lib/services.js', () => ({
  attemptService: {
    saveAnswer: vi.fn(),
    saveCoding: vi.fn(),
    saveSubjective: vi.fn(),
    markReview: vi.fn(),
    clearAnswer: vi.fn(),
    submit: vi.fn(),
  },
}));

describe('CBT Answer Recovery and Autosave Reliability', () => {
  let localStorageMock = {};
  const ATTEMPT_ID = 502;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    localStorageMock = {};

    global.localStorage = {
      getItem: vi.fn((key) => localStorageMock[key] || null),
      setItem: vi.fn((key, val) => { localStorageMock[key] = String(val); }),
      removeItem: vi.fn((key) => { delete localStorageMock[key]; }),
      clear: vi.fn(() => { localStorageMock = {}; }),
    };

    attemptService.saveAnswer.mockResolvedValue({ saved: true, server_time: new Date().toISOString() });
    attemptService.saveCoding.mockResolvedValue({ saved: true, server_time: new Date().toISOString() });
    attemptService.saveSubjective.mockResolvedValue({ saved: true, server_time: new Date().toISOString() });
    attemptService.markReview.mockResolvedValue({ marked: true, server_time: new Date().toISOString() });
    attemptService.clearAnswer.mockResolvedValue({ cleared: true, server_time: new Date().toISOString() });
    attemptService.submit.mockResolvedValue({ status: 'submitted', score: { marks_obtained: 120 } });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('Requirement 1: Safely buffers answers in localStorage when network is offline', async () => {
    attemptService.saveAnswer.mockRejectedValue(new Error('Network disconnected (Offline)'));

    const sync = new CbtAnswerSyncManager(ATTEMPT_ID);
    expect(sync.getPendingCount()).toBe(0);

    // Candidate selects an answer while offline
    const promise = sync.recordAnswer('mcq', 101, { selected_index: 2 });
    await expect(promise).rejects.toThrow('Network disconnected');

    // Answer must be safely preserved in localStorage
    expect(sync.getPendingCount()).toBe(1);
    expect(sync.isQuestionPending(101)).toBe(true);

    const storedRaw = localStorageMock[`cbt_offline_answers_${ATTEMPT_ID}`];
    expect(storedRaw).toBeDefined();
    const stored = JSON.parse(storedRaw);
    expect(stored).toHaveLength(1);
    expect(stored[0].questionId).toBe(101);
    expect(stored[0].payload.selected_index).toBe(2);

    sync.destroy();
  });

  it('Requirement 1 & 10: Preserves and restores answers after browser refresh / crash', async () => {
    // Seed localStorage as if the candidate had unsynced answers before refresh
    const initialOfflineAnswers = [
      { type: 'mcq', questionId: 101, payload: { selected_index: 1 }, version: 1000, status: 'failed' },
      { type: 'multi', questionId: 102, payload: { selected_indices: [0, 2] }, version: 1001, status: 'failed' },
      { type: 'numeric', questionId: 103, payload: { numeric_answer: 42 }, version: 1002, status: 'failed' },
    ];
    localStorageMock[`cbt_offline_answers_${ATTEMPT_ID}`] = JSON.stringify(initialOfflineAnswers);

    // Simulate browser reload / page init
    const sync = new CbtAnswerSyncManager(ATTEMPT_ID);
    expect(sync.getPendingCount()).toBe(3);

    const answersMap = sync.getStoredAnswersMap();
    expect(answersMap.mcq[101]).toBe(1);
    expect(answersMap.multi[102]).toEqual([0, 2]);
    expect(answersMap.numeric[103]).toBe(42);

    sync.destroy();
  });

  it('Requirement 2: Visibly identifies failed answer saves and retries with backoff and online event', async () => {
    let statusEvents = [];
    attemptService.saveAnswer.mockRejectedValueOnce(new Error('504 Gateway Timeout'));

    const sync = new CbtAnswerSyncManager(ATTEMPT_ID, {
      onStatusChange: (statusInfo) => {
        statusEvents.push(statusInfo);
      },
    });

    // Attempt save which fails
    await expect(sync.recordAnswer('mcq', 201, { selected_index: 3 })).rejects.toThrow('504 Gateway Timeout');

    // Status must transition to SAVING then FAILED with 1 pending item
    expect(statusEvents.some((s) => s.status === SYNC_STATUS.SAVING)).toBe(true);
    expect(statusEvents.some((s) => s.status === SYNC_STATUS.FAILED)).toBe(true);
    expect(sync.getFailedCount()).toBe(1);

    // Mock successful response on retry
    attemptService.saveAnswer.mockResolvedValueOnce({ saved: true, server_time: new Date().toISOString() });

    // Advance fake timer to trigger automatic retry
    await vi.advanceTimersByTimeAsync(3000);

    expect(attemptService.saveAnswer).toHaveBeenCalledTimes(2);
    expect(sync.getPendingCount()).toBe(0);
    expect(statusEvents.some((s) => s.status === SYNC_STATUS.SAVED)).toBe(true);

    sync.destroy();
  });

  it('Requirement 3: Prevents out-of-order race conditions from overwriting newer answers', async () => {
    let resolveFirst;
    const slowFirstPromise = new Promise((resolve) => {
      resolveFirst = resolve;
    });

    attemptService.saveAnswer.mockImplementation((id, qid, index) => {
      if (index === 0) return slowFirstPromise; // Candidate selected Option A first
      return Promise.resolve({ saved: true, server_time: new Date().toISOString() }); // Candidate immediately switched to Option B
    });

    const sync = new CbtAnswerSyncManager(ATTEMPT_ID);

    // 1. Candidate clicks Option A (dispatch initiated)
    const firstDispatch = sync.recordAnswer('mcq', 301, { selected_index: 0 });

    // 2. Candidate immediately changes mind and selects Option B
    const secondDispatch = sync.recordAnswer('mcq', 301, { selected_index: 1 });
    await secondDispatch;

    // Now slow first request finally finishes late
    resolveFirst({ saved: true, server_time: new Date().toISOString() });
    await firstDispatch;

    // Verify: The saved version for Question 301 in storage or queue must NOT be Option A
    const stored = JSON.parse(localStorageMock[`cbt_offline_answers_${ATTEMPT_ID}`] || '[]');
    expect(stored.filter((s) => s.questionId === 301 && s.payload.selected_index === 0)).toHaveLength(0);

    sync.destroy();
  });

  it('Requirement 4: Retries pending test submission safely without duplicate attempts or duplicate grading', async () => {
    attemptService.submit.mockRejectedValueOnce(new Error('Network Connection Lost'));

    const sync = new CbtAnswerSyncManager(ATTEMPT_ID);

    // First submit fails due to network drop
    const outcome1 = await sync.submitExamSafely('manual');
    expect(outcome1.success).toBe(false);
    expect(outcome1.canRetry).toBe(true);

    // Second submit succeeds
    attemptService.submit.mockResolvedValueOnce({ status: 'submitted', score: { marks_obtained: 180 } });
    const outcome2 = await sync.submitExamSafely('manual');
    expect(outcome2.success).toBe(true);
    expect(outcome2.result.score.marks_obtained).toBe(180);

    // Verifies 409 already submitted is treated as idempotent success
    attemptService.submit.mockRejectedValueOnce({ status: 409, message: 'This attempt is already submitted' });
    const outcome3 = await sync.submitExamSafely('manual');
    expect(outcome3.success).toBe(true);
    expect(outcome3.alreadySubmitted).toBe(true);

    sync.destroy();
  });

  it('Requirement 5 & 9: Reconciles timer with server deadline and never extends test time locally', () => {
    let timerSyncData = null;
    const sync = new CbtAnswerSyncManager(ATTEMPT_ID, {
      onTimerSync: (data) => { timerSyncData = data; },
    });

    const now = Date.now();
    // Server says now is 5 seconds in past relative to client clock (clock drift = +5s)
    const serverTimeStr = new Date(now - 5000).toISOString();
    // Deadline is exactly 600 seconds from server now
    const endsAtStr = new Date(now - 5000 + 600000).toISOString();

    const remaining = sync.reconcileTimer(serverTimeStr, endsAtStr);
    expect(remaining).toBe(600);
    expect(timerSyncData.clockSkewSeconds).toBe(5);

    // Invariant 9: Reconcile does not extend client time
    const clientNowBefore = Date.now();
    sync.reconcileTimer(serverTimeStr, endsAtStr);
    const deadlineMs = sync.authoritativeEndsAtMs;
    expect(deadlineMs).toBe(new Date(endsAtStr).getTime());

    sync.destroy();
  });

  it('Requirement 6: Incident reporting errors never break answer saving or test submission', async () => {
    // Incident listener throws an unhandled error
    const sync = new CbtAnswerSyncManager(ATTEMPT_ID, {
      onIncident: () => {
        throw new Error('Telemetry service unavailable');
      },
    });

    attemptService.saveAnswer.mockResolvedValue({ saved: true, server_time: new Date().toISOString() });

    // Answer save must succeed without throwing telemetry errors
    await expect(sync.recordAnswer('mcq', 401, { selected_index: 2 })).resolves.toBeDefined();

    // Submit must also succeed without throwing telemetry errors
    await expect(sync.submitExamSafely('manual')).resolves.toMatchObject({ success: true });

    sync.destroy();
  });

  it('Requirement 7: Flushes pending answers on window online event', async () => {
    attemptService.saveAnswer.mockRejectedValueOnce(new Error('Offline'));

    const sync = new CbtAnswerSyncManager(ATTEMPT_ID);
    await expect(sync.recordAnswer('mcq', 501, { selected_index: 1 })).rejects.toThrow();
    expect(sync.getPendingCount()).toBe(1);

    attemptService.saveAnswer.mockResolvedValueOnce({ saved: true });

    // Trigger online event handler
    sync._handleOnline();
    await vi.waitFor(() => {
      expect(sync.getPendingCount()).toBe(0);
    });

    expect(attemptService.saveAnswer).toHaveBeenCalledTimes(2);
    sync.destroy();
  });
});
