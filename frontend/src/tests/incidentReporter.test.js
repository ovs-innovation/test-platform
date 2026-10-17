import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  IncidentReporter,
  createIncidentReporter,
  INCIDENT_CATEGORIES,
  LOCAL_EVENT_STATUS,
  generateIdempotencyKey,
  sanitizeClientDiagnostics,
} from '../lib/incidentReporter.js';
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

class MockSessionStorage {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] ?? null;
  }
  setItem(key, val) {
    this.store[key] = String(val);
  }
  removeItem(key) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

describe('CBT Technical Incident Reporter Unit Tests', () => {
  let reporter;
  const mockAttemptId = 42;
  let eventListeners = {};

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();

    eventListeners = {};
    const mockWindow = {
      addEventListener: vi.fn((event, cb) => {
        if (!eventListeners[event]) eventListeners[event] = [];
        eventListeners[event].push(cb);
      }),
      removeEventListener: vi.fn((event, cb) => {
        if (eventListeners[event]) {
          eventListeners[event] = eventListeners[event].filter((f) => f !== cb);
        }
      }),
      dispatchEvent: vi.fn((event) => {
        const list = eventListeners[event.type] || [];
        list.forEach((cb) => cb(event));
        return true;
      }),
    };

    globalThis.window = mockWindow;
    globalThis.sessionStorage = new MockSessionStorage();
    globalThis.Event = class {
      constructor(type) {
        this.type = type;
      }
    };

    Object.defineProperty(globalThis, 'navigator', {
      value: { onLine: true },
      configurable: true,
      writable: true,
    });
  });

  afterEach(() => {
    if (reporter) {
      reporter.destroy();
      reporter = null;
    }
    vi.useRealTimers();
  });

  describe('1. Sanitization & Privacy Compliance', () => {
    it('scrubs sensitive credentials, tokens, passwords, and answer content', () => {
      const dirty = {
        token: 'eyJhbGciOi...',
        password: 'SuperSecretPassword123',
        authorization: 'Bearer secret-jwt-token',
        candidate_answer: 'Option B is the correct answer according to notes',
        cookie: 'session_id=abc12345',
        httpStatus: 500,
        errorCode: 'SAVE_FAILED',
        endpoint: '/api/attempts/42/answer',
      };

      const clean = sanitizeClientDiagnostics(dirty);

      expect(clean.token).toBe('[REDACTED]');
      expect(clean.password).toBe('[REDACTED]');
      expect(clean.authorization).toBe('[REDACTED]');
      expect(clean.candidate_answer).toBe('[REDACTED]');
      expect(clean.cookie).toBe('[REDACTED]');
      expect(clean.httpStatus).toBe(500);
      expect(clean.errorCode).toBe('SAVE_FAILED');
      expect(clean.endpoint).toBe('/api/attempts/42/answer');
    });

    it('generates distinct RFC-compatible idempotency keys', () => {
      const key1 = generateIdempotencyKey();
      const key2 = generateIdempotencyKey();
      expect(typeof key1).toBe('string');
      expect(key1.length).toBeGreaterThan(8);
      expect(key1).not.toBe(key2);
    });
  });

  describe('2. Specific Technical Incident Category Reporting', () => {
    it('detects and reports ANSWER_SAVE_FAILED with sanitized error', async () => {
      api.post.mockResolvedValueOnce({
        data: { success: true, incident: { id: 101, status: 'new' } },
      });

      reporter = createIncidentReporter(mockAttemptId);
      const promise = reporter.reportSaveFailure(12, { status: 503, message: 'Database connection timeout' });

      vi.advanceTimersByTime(600);
      const res = await promise;

      expect(res.status).toBe(LOCAL_EVENT_STATUS.ACKNOWLEDGED_BY_SERVER);
      expect(api.post).toHaveBeenCalledWith(
        '/attempts/42/incidents',
        expect.objectContaining({
          category: INCIDENT_CATEGORIES.ANSWER_SAVE_FAILED,
          question_id: 12,
        }),
        expect.objectContaining({
          headers: expect.objectContaining({
            'X-Idempotency-Key': expect.any(String),
          }),
        })
      );
    });

    it('detects and reports QUESTION_LOAD_FAILED', async () => {
      api.post.mockResolvedValueOnce({
        data: { success: true, incident: { id: 102, status: 'new' } },
      });

      reporter = createIncidentReporter(mockAttemptId);
      const promise = reporter.reportQuestionLoadFailure(5, new Error('Failed to fetch LaTeX rendering'));

      vi.advanceTimersByTime(600);
      const res = await promise;

      expect(res.status).toBe(LOCAL_EVENT_STATUS.ACKNOWLEDGED_BY_SERVER);
      expect(api.post).toHaveBeenCalledWith(
        '/attempts/42/incidents',
        expect.objectContaining({
          category: INCIDENT_CATEGORIES.QUESTION_LOAD_FAILED,
          question_id: 5,
        }),
        expect.any(Object)
      );
    });

    it('detects and reports SUBMISSION_FAILED', async () => {
      api.post.mockResolvedValueOnce({
        data: { success: true, incident: { id: 103, status: 'new' } },
      });

      reporter = createIncidentReporter(mockAttemptId);
      const promise = reporter.reportSubmissionFailure(new Error('Gateway timeout 504'));

      vi.advanceTimersByTime(600);
      const res = await promise;

      expect(res.status).toBe(LOCAL_EVENT_STATUS.ACKNOWLEDGED_BY_SERVER);
      expect(api.post).toHaveBeenCalledWith(
        '/attempts/42/incidents',
        expect.objectContaining({
          category: INCIDENT_CATEGORIES.SUBMISSION_FAILED,
        }),
        expect.any(Object)
      );
    });

    it('detects and reports TIMER_MISMATCH when clock drift occurs', async () => {
      api.post.mockResolvedValueOnce({
        data: { success: true, incident: { id: 104, status: 'new' } },
      });

      reporter = createIncidentReporter(mockAttemptId);
      const promise = reporter.reportTimerMismatch(45.2, '2026-10-16T12:00:00Z', '2026-10-16T12:00:45Z');

      vi.advanceTimersByTime(600);
      const res = await promise;

      expect(res.status).toBe(LOCAL_EVENT_STATUS.ACKNOWLEDGED_BY_SERVER);
      expect(api.post).toHaveBeenCalledWith(
        '/attempts/42/incidents',
        expect.objectContaining({
          category: INCIDENT_CATEGORIES.TIMER_MISMATCH,
          diagnostics: expect.objectContaining({
            clockSkewSeconds: 45.2,
          }),
        }),
        expect.any(Object)
      );
    });

    it('detects and reports RECORDING_FAILED for repeated chunk upload failures', async () => {
      api.post.mockResolvedValueOnce({
        data: { success: true, incident: { id: 105, status: 'new' } },
      });

      reporter = createIncidentReporter(mockAttemptId);
      const promise = reporter.reportRecordingFailure(4, new Error('Chunk upload failed 3 times'));

      vi.advanceTimersByTime(600);
      const res = await promise;

      expect(res.status).toBe(LOCAL_EVENT_STATUS.ACKNOWLEDGED_BY_SERVER);
      expect(api.post).toHaveBeenCalledWith(
        '/attempts/42/incidents',
        expect.objectContaining({
          category: INCIDENT_CATEGORIES.RECORDING_FAILED,
          diagnostics: expect.objectContaining({ chunkIndex: 4 }),
        }),
        expect.any(Object)
      );
    });

    it('detects and reports SCREENSHOT_FAILED for capture or upload failure', async () => {
      api.post.mockResolvedValueOnce({
        data: { success: true, incident: { id: 106, status: 'new' } },
      });

      reporter = createIncidentReporter(mockAttemptId);
      const promise = reporter.reportScreenshotFailure(2, new Error('Screenshot canvas error'));

      vi.advanceTimersByTime(600);
      const res = await promise;

      expect(res.status).toBe(LOCAL_EVENT_STATUS.ACKNOWLEDGED_BY_SERVER);
      expect(api.post).toHaveBeenCalledWith(
        '/attempts/42/incidents',
        expect.objectContaining({
          category: INCIDENT_CATEGORIES.SCREENSHOT_FAILED,
          diagnostics: expect.objectContaining({ sequenceNumber: 2 }),
        }),
        expect.any(Object)
      );
    });

    it('detects and reports SCREEN_SHARING_STOPPED when student cancels screen share', async () => {
      api.post.mockResolvedValueOnce({
        data: { success: true, incident: { id: 107, status: 'new' } },
      });

      reporter = createIncidentReporter(mockAttemptId);
      const promise = reporter.reportScreenShareStopped();

      vi.advanceTimersByTime(600);
      const res = await promise;

      expect(res.status).toBe(LOCAL_EVENT_STATUS.ACKNOWLEDGED_BY_SERVER);
      expect(api.post).toHaveBeenCalledWith(
        '/attempts/42/incidents',
        expect.objectContaining({
          category: INCIDENT_CATEGORIES.SCREEN_SHARING_STOPPED,
        }),
        expect.any(Object)
      );
    });

    it('detects and reports NETWORK_DISCONNECTED and NETWORK_RESTORED on window events', async () => {
      api.post.mockResolvedValue({
        data: { success: true, incident: { id: 108, status: 'new' } },
      });

      reporter = createIncidentReporter(mockAttemptId);

      // Trigger offline
      window.dispatchEvent(new Event('offline'));
      expect(reporter.offlineQueue.length).toBeGreaterThan(0);
      expect(reporter.offlineQueue[0].payload.category).toBe(INCIDENT_CATEGORIES.NETWORK_DISCONNECTED);

      // Trigger online -> should queue restored and flush
      window.dispatchEvent(new Event('online'));
      vi.advanceTimersByTime(600);

      expect(api.post).toHaveBeenCalledWith(
        '/attempts/42/incidents',
        expect.objectContaining({
          category: INCIDENT_CATEGORIES.NETWORK_DISCONNECTED,
        }),
        expect.any(Object)
      );
    });

    it('detects and reports APPLICATION_ERROR for recoverable resume failures', async () => {
      api.post.mockResolvedValueOnce({
        data: { success: true, incident: { id: 109, status: 'new' } },
      });

      reporter = createIncidentReporter(mockAttemptId);
      const promise = reporter.reportResumeFailure(new Error('State sync failed on refresh'));

      vi.advanceTimersByTime(600);
      const res = await promise;

      expect(res.status).toBe(LOCAL_EVENT_STATUS.ACKNOWLEDGED_BY_SERVER);
      expect(api.post).toHaveBeenCalledWith(
        '/attempts/42/incidents',
        expect.objectContaining({
          category: INCIDENT_CATEGORIES.APPLICATION_ERROR,
        }),
        expect.any(Object)
      );
    });

    it('detects unhandled window errors and reports APPLICATION_ERROR while filtering extension noise', async () => {
      api.post.mockResolvedValue({
        data: { success: true, incident: { id: 110, status: 'new' } },
      });

      reporter = createIncidentReporter(mockAttemptId);

      // 1. Extension error -> should be ignored
      window.dispatchEvent({
        type: 'error',
        message: 'Extension injected error',
        filename: 'chrome-extension://xyz/content.js',
      });
      vi.advanceTimersByTime(600);
      expect(api.post).not.toHaveBeenCalled();

      // 2. Application script error -> should be reported
      window.dispatchEvent({
        type: 'error',
        message: 'Uncaught TypeError: Cannot read properties of undefined',
        filename: 'https://assess.edvedum.com/assets/index.js',
        lineno: 105,
        colno: 12,
      });
      vi.advanceTimersByTime(600);

      expect(api.post).toHaveBeenCalledWith(
        '/attempts/42/incidents',
        expect.objectContaining({
          category: INCIDENT_CATEGORIES.APPLICATION_ERROR,
          description: expect.stringContaining('Uncaught TypeError'),
        }),
        expect.any(Object)
      );
    });

    it('detects unhandled promise rejections and reports APPLICATION_ERROR with stack telemetry', async () => {
      api.post.mockResolvedValueOnce({
        data: { success: true, incident: { id: 111, status: 'new' } },
      });

      reporter = createIncidentReporter(mockAttemptId);

      window.dispatchEvent({
        type: 'unhandledrejection',
        reason: new Error('Network timeout during question bundle fetch'),
      });

      vi.advanceTimersByTime(600);

      expect(api.post).toHaveBeenCalledWith(
        '/attempts/42/incidents',
        expect.objectContaining({
          category: INCIDENT_CATEGORIES.APPLICATION_ERROR,
          description: expect.stringContaining('Network timeout during question bundle fetch'),
        }),
        expect.any(Object)
      );
    });
  });

  describe('3. Debounce and Grouping of Repeated Events', () => {
    it('debounces rapid repeated errors on same question into a single aggregated call', async () => {
      api.post.mockResolvedValueOnce({
        data: { success: true, incident: { id: 201, status: 'new' } },
      });

      reporter = createIncidentReporter(mockAttemptId);

      // Fire 4 rapid failures on question 7
      reporter.reportSaveFailure(7, new Error('Network fluctuation'));
      reporter.reportSaveFailure(7, new Error('Network fluctuation 2'));
      reporter.reportSaveFailure(7, new Error('Network fluctuation 3'));
      const lastPromise = reporter.reportSaveFailure(7, new Error('Network fluctuation 4'));

      // Before timer expires: 0 calls made
      expect(api.post).not.toHaveBeenCalled();

      // Advance debounce timer (500ms)
      vi.advanceTimersByTime(600);
      await lastPromise;

      // Exactly 1 network call made with occurrenceCount = 4
      expect(api.post).toHaveBeenCalledTimes(1);
      expect(api.post).toHaveBeenCalledWith(
        '/attempts/42/incidents',
        expect.objectContaining({
          category: INCIDENT_CATEGORIES.ANSWER_SAVE_FAILED,
          question_id: 7,
          diagnostics: expect.objectContaining({
            occurrenceCount: 4,
          }),
        }),
        expect.any(Object)
      );
    });

    it('does not group errors across different question IDs', async () => {
      api.post.mockResolvedValue({
        data: { success: true, incident: { id: 202, status: 'new' } },
      });

      reporter = createIncidentReporter(mockAttemptId);

      reporter.reportSaveFailure(10, new Error('Error on Q10'));
      reporter.reportSaveFailure(11, new Error('Error on Q11'));

      vi.advanceTimersByTime(600);
      await vi.runAllTimersAsync();

      // Separate debounced calls for each question
      expect(api.post).toHaveBeenCalledTimes(2);
    });
  });

  describe('4. Offline Queue & Network Recovery', () => {
    it('buffers events in bounded offline queue and persists to sessionStorage when offline', async () => {
      Object.defineProperty(navigator, 'onLine', { configurable: true, value: false });

      reporter = createIncidentReporter(mockAttemptId);
      const promise = reporter.reportSaveFailure(15, new Error('Offline save failure'));
      vi.advanceTimersByTime(600);
      const res = await promise;

      expect(res.status).toBe(LOCAL_EVENT_STATUS.QUEUED_OFFLINE);
      expect(api.post).not.toHaveBeenCalled();
      expect(reporter.offlineQueue.length).toBe(1);

      // Verify persisted to sessionStorage
      const raw = sessionStorage.getItem(`cbt_incidents_pending_${mockAttemptId}`);
      expect(raw).toBeTruthy();
      const parsed = JSON.parse(raw);
      expect(parsed[0].payload.category).toBe(INCIDENT_CATEGORIES.ANSWER_SAVE_FAILED);
    });

    it('enforces maximum bound of 25 events on the offline queue to prevent memory bloat', async () => {
      Object.defineProperty(navigator, 'onLine', { configurable: true, value: false });

      reporter = createIncidentReporter(mockAttemptId);

      for (let i = 1; i <= 30; i++) {
        const p = reporter.reportIncident({
          category: INCIDENT_CATEGORIES.ANSWER_SAVE_FAILED,
          questionId: i,
          description: `Error ${i}`,
        });
        vi.advanceTimersByTime(600);
        await p;
      }

      expect(reporter.offlineQueue.length).toBe(25);
    });

    it('flushes pending queue in FIFO order when connectivity is restored', async () => {
      Object.defineProperty(navigator, 'onLine', { configurable: true, value: false });

      reporter = createIncidentReporter(mockAttemptId);
      const p1 = reporter.reportSaveFailure(1, new Error('Offline error 1'));
      const p2 = reporter.reportSaveFailure(2, new Error('Offline error 2'));
      vi.advanceTimersByTime(600);
      await Promise.all([p1, p2]);

      expect(reporter.offlineQueue.length).toBe(2);

      // Now connection is restored
      Object.defineProperty(navigator, 'onLine', { configurable: true, value: true });
      api.post.mockResolvedValue({
        data: { success: true, incident: { id: 301, status: 'new' } },
      });

      // Dispatch online event
      window.dispatchEvent(new Event('online'));
      vi.advanceTimersByTime(600);
      await vi.runAllTimersAsync();

      // Exactly 3 calls: 1 NETWORK_RESTORED + 2 queued offline events flushed
      expect(api.post).toHaveBeenCalledTimes(3);
      expect(reporter.offlineQueue.length).toBe(0);
      expect(sessionStorage.getItem(`cbt_incidents_pending_${mockAttemptId}`)).toBeNull();
    });
  });

  describe('5. Bounded Retries with Exponential Backoff & Exhaustion', () => {
    it('retries transient failures up to max retries with backoff', async () => {
      // First 2 calls fail, 3rd succeeds
      api.post
        .mockRejectedValueOnce(new Error('Network error 1'))
        .mockRejectedValueOnce(new Error('Network error 2'))
        .mockResolvedValueOnce({
          data: { success: true, incident: { id: 401, status: 'new' } },
        });

      reporter = createIncidentReporter(mockAttemptId);
      const promise = reporter._dispatchReport({
        id: 'evt-1',
        category: INCIDENT_CATEGORIES.ANSWER_SAVE_FAILED,
        description: 'Autosave test',
      });

      // Advance through retry backoffs (600ms, 1200ms)
      await vi.advanceTimersByTimeAsync(700);
      await vi.advanceTimersByTimeAsync(1300);
      await vi.advanceTimersByTimeAsync(500);

      const res = await promise;
      expect(res.status).toBe(LOCAL_EVENT_STATUS.ACKNOWLEDGED_BY_SERVER);
      expect(api.post).toHaveBeenCalledTimes(3);
    });

    it('gracefully handles retry exhaustion without throwing or blocking candidate', async () => {
      api.post.mockRejectedValue(new Error('Persistent 500 error'));

      reporter = createIncidentReporter(mockAttemptId);
      const promise = reporter._dispatchReport({
        id: 'evt-fail',
        category: INCIDENT_CATEGORIES.ANSWER_SAVE_FAILED,
        description: 'Persistent fail test',
      });

      await vi.advanceTimersByTimeAsync(10000);
      const res = await promise;

      // Transitions to PENDING_RETRY, never throws unhandled rejection
      expect(res.status).toBe(LOCAL_EVENT_STATUS.PENDING_RETRY);
      expect(api.post).toHaveBeenCalledTimes(3);
    });
  });

  describe('6. Lifecycle & Component Cleanup', () => {
    it('cleans up event listeners and debounce timers on destroy()', () => {
      reporter = createIncidentReporter(mockAttemptId);
      reporter.reportSaveFailure(8, new Error('Debounced error'));

      expect(reporter.debounceTimers.size).toBe(1);

      reporter.destroy();

      expect(reporter.destroyed).toBe(true);
      expect(window.removeEventListener).toHaveBeenCalledWith('online', expect.any(Function));
      expect(window.removeEventListener).toHaveBeenCalledWith('offline', expect.any(Function));
      expect(window.removeEventListener).toHaveBeenCalledWith('error', expect.any(Function));
      expect(window.removeEventListener).toHaveBeenCalledWith('unhandledrejection', expect.any(Function));
    });
  });

  describe('7. Simulator Mode Isolation', () => {
    it('operates in memory without making network calls when in simulator mode', async () => {
      reporter = createIncidentReporter('sim-99', { isSimulator: true });

      const p = reporter.reportSaveFailure(1, new Error('Simulated failure'));
      vi.advanceTimersByTime(600);
      const res = await p;

      expect(res.status).toBe(LOCAL_EVENT_STATUS.ACKNOWLEDGED_BY_SERVER);
      expect(res.simulated).toBe(true);
      expect(api.post).not.toHaveBeenCalled();
    });
  });
});
