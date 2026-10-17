import { attemptService } from './services.js';

export const INCIDENT_CATEGORIES = {
  NETWORK_DISCONNECTED: 'NETWORK_DISCONNECTED',
  NETWORK_RESTORED: 'NETWORK_RESTORED',
  ANSWER_SAVE_FAILED: 'ANSWER_SAVE_FAILED',
  QUESTION_LOAD_FAILED: 'QUESTION_LOAD_FAILED',
  SUBMISSION_FAILED: 'SUBMISSION_FAILED',
  APPLICATION_ERROR: 'APPLICATION_ERROR',
  TIMER_MISMATCH: 'TIMER_MISMATCH',
  RECORDING_FAILED: 'RECORDING_FAILED',
  SCREENSHOT_FAILED: 'SCREENSHOT_FAILED',
  SCREEN_SHARING_STOPPED: 'SCREEN_SHARING_STOPPED',
  STUDENT_REPORTED_ISSUE: 'STUDENT_REPORTED_ISSUE',
};

export const LOCAL_EVENT_STATUS = {
  DETECTED_LOCALLY: 'detected_locally',
  PENDING_RETRY: 'pending_retry',
  QUEUED_OFFLINE: 'queued_offline',
  ACKNOWLEDGED_BY_SERVER: 'acknowledged_by_server',
  REPORT_FAILED: 'report_failed',
};

const MAX_OFFLINE_QUEUE_SIZE = 25;
const DEBOUNCE_WINDOW_MS = 5000;
const MAX_RETRIES = 2;

// Sensitive keys to strip from client diagnostics before transmission
const SENSITIVE_KEY_REGEX = /(password|token|access_token|authorization|cookie|secret|jwt|auth|hash)/i;
const PROHIBITED_ANSWER_REGEX = /(answer|selected_option|source_code|^code$|code_content|option_text|correct_index)/i;

/**
 * Sanitizes client diagnostic payloads, stripping credentials, tokens, and answer contents.
 */
export function sanitizeClientDiagnostics(raw = {}) {
  if (!raw || typeof raw !== 'object') return {};
  const clean = {};

  for (const [key, val] of Object.entries(raw)) {
    if (SENSITIVE_KEY_REGEX.test(key) || PROHIBITED_ANSWER_REGEX.test(key)) {
      clean[key] = '[REDACTED]';
      continue;
    }
    if (val === null || val === undefined) continue;

    if (typeof val === 'object' && !Array.isArray(val)) {
      clean[key] = sanitizeClientDiagnostics(val);
    } else if (Array.isArray(val)) {
      if (val.every((item) => typeof item === 'number' || typeof item === 'string')) {
        clean[key] = val.slice(0, 30).map((v) => (typeof v === 'string' ? v.slice(0, 100) : v));
      }
    } else if (typeof val === 'string') {
      clean[key] = val.slice(0, 500);
    } else if (typeof val === 'number' || typeof val === 'boolean') {
      clean[key] = val;
    }
  }

  // Inject standard safe environment telemetry
  try {
    clean.online = typeof navigator !== 'undefined' ? navigator.onLine : true;
    if (typeof navigator !== 'undefined' && navigator.connection) {
      clean.effectiveType = navigator.connection.effectiveType || 'unknown';
      clean.rtt = navigator.connection.rtt;
      clean.downlink = navigator.connection.downlink;
    }
    if (typeof window !== 'undefined') {
      clean.screenResolution = `${window.screen?.width || 0}x${window.screen?.height || 0}`;
      clean.viewportSize = `${window.innerWidth || 0}x${window.innerHeight || 0}`;
      clean.isFullscreen = Boolean(document.fullscreenElement);
    }
    if (typeof performance !== 'undefined' && performance.memory) {
      clean.memoryHeapUsedMB = Math.round(performance.memory.usedJSHeapSize / (1024 * 1024));
    }
  } catch (_) {
    // Non-critical telemetry collection failure safely ignored
  }

  return clean;
}

/**
 * Generates an RFC4122 compliant UUID or safe pseudo-random fallback.
 */
export function generateIdempotencyKey() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'idem_' + Date.now() + '_' + Math.random().toString(36).slice(2, 11);
}

/**
 * Technical Incident Reporter for Candidate Examination Screen.
 * Provides resilient, non-blocking, offline-queued telemetry dispatch.
 */
export class IncidentReporter {
  constructor(attemptId, options = {}) {
    this.attemptId = attemptId;
    this.options = {
      isSimulator: Boolean(options.isSimulator),
      onStatusChange: options.onStatusChange || null,
      ...options,
    };

    this.offlineQueue = [];
    this.debounceTimers = new Map();
    this.debounceCounts = new Map();
    this.activeEvents = new Map(); // Tracks locally detected vs acknowledged events
    this.isFlushing = false;
    this.destroyed = false;

    this._boundOnOnline = this._handleOnline.bind(this);
    this._boundOnOffline = this._handleOffline.bind(this);
    this._boundOnError = this._handleWindowError.bind(this);
    this._boundOnUnhandledRejection = this._handleUnhandledRejection.bind(this);

    this._initListeners();
    this._loadQueueFromStorage();
  }

  _initListeners() {
    if (typeof window === 'undefined') return;

    window.addEventListener('online', this._boundOnOnline);
    window.addEventListener('offline', this._boundOnOffline);
    window.addEventListener('error', this._boundOnError);
    window.addEventListener('unhandledrejection', this._boundOnUnhandledRejection);
  }

  destroy() {
    this.destroyed = true;

    if (typeof window !== 'undefined') {
      window.removeEventListener('online', this._boundOnOnline);
      window.removeEventListener('offline', this._boundOnOffline);
      window.removeEventListener('error', this._boundOnError);
      window.removeEventListener('unhandledrejection', this._boundOnUnhandledRejection);
    }

    for (const timer of this.debounceTimers.values()) {
      clearTimeout(timer);
    }
    this.debounceTimers.clear();
    this.debounceCounts.clear();
  }

  _storageKey() {
    return `cbt_incidents_pending_${this.attemptId}`;
  }

  _loadQueueFromStorage() {
    try {
      if (typeof sessionStorage !== 'undefined') {
        const raw = sessionStorage.getItem(this._storageKey());
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            this.offlineQueue = parsed.slice(-MAX_OFFLINE_QUEUE_SIZE);
          }
        }
      }
    } catch (_) {}
  }

  _persistQueueToStorage() {
    try {
      if (typeof sessionStorage !== 'undefined') {
        if (this.offlineQueue.length === 0) {
          sessionStorage.removeItem(this._storageKey());
        } else {
          sessionStorage.setItem(this._storageKey(), JSON.stringify(this.offlineQueue));
        }
      }
    } catch (_) {}
  }

  _notifyStatus(eventId, localStatus, serverData = null) {
    const record = {
      eventId,
      localStatus,
      serverData,
      updatedAt: Date.now(),
    };
    this.activeEvents.set(eventId, record);

    if (typeof this.options.onStatusChange === 'function') {
      try {
        this.options.onStatusChange(record);
      } catch (_) {}
    }
  }

  _handleOnline() {
    this.reportIncident({
      category: INCIDENT_CATEGORIES.NETWORK_RESTORED,
      description: 'Browser connectivity restored',
      diagnostics: { offlineDrainTriggered: true, queuedCount: this.offlineQueue.length },
    });
    this.flushQueue();
  }

  _handleOffline() {
    const eventId = generateIdempotencyKey();
    const payload = {
      category: INCIDENT_CATEGORIES.NETWORK_DISCONNECTED,
      question_id: null,
      description: 'Browser detected offline connection',
      diagnostics: { timestamp: Date.now() },
      client_timestamp: new Date().toISOString(),
    };
    this._enqueueOffline(payload, eventId);
    this._notifyStatus(eventId, LOCAL_EVENT_STATUS.QUEUED_OFFLINE);
  }

  _handleWindowError(event) {
    if (this.destroyed) return;
    const msg = event?.message || 'Script error';
    const filename = event?.filename || '';

    // Ignore noise from browser extensions
    if (filename.startsWith('chrome-extension://') || filename.startsWith('moz-extension://')) {
      return;
    }

    this.reportIncident({
      category: INCIDENT_CATEGORIES.APPLICATION_ERROR,
      description: `Uncaught window error: ${msg.slice(0, 200)}`,
      diagnostics: {
        filename: filename.slice(-100),
        lineno: event?.lineno,
        colno: event?.colno,
      },
    });
  }

  _handleUnhandledRejection(event) {
    if (this.destroyed) return;
    const reason = event?.reason;
    const msg = typeof reason === 'object' ? reason?.message || 'Unhandled Promise Rejection' : String(reason);

    this.reportIncident({
      category: INCIDENT_CATEGORIES.APPLICATION_ERROR,
      description: `Unhandled promise rejection: ${msg.slice(0, 200)}`,
      diagnostics: {
        stackSnippet: typeof reason?.stack === 'string' ? reason.stack.slice(0, 300) : null,
      },
    });
  }

  /**
   * Main non-blocking reporting entry point.
   */
  async reportIncident({
    category,
    questionId = null,
    description = '',
    diagnostics = {},
    endpoint = null,
  }) {
    if (!this.attemptId || this.destroyed) return;

    // In simulator mode, keep reporting completely in memory without hitting student attempts
    if (this.options.isSimulator || String(this.attemptId).startsWith('sim-')) {
      const simEventId = `sim_evt_${Date.now()}`;
      this._notifyStatus(simEventId, LOCAL_EVENT_STATUS.ACKNOWLEDGED_BY_SERVER, {
        simulated: true,
        category,
        questionId,
      });
      return { success: true, simulated: true, status: LOCAL_EVENT_STATUS.ACKNOWLEDGED_BY_SERVER };
    }

    const safeDiagnostics = sanitizeClientDiagnostics({
      ...diagnostics,
      endpoint,
      attemptId: this.attemptId,
      activeQuestionId: questionId,
    });

    const eventId = generateIdempotencyKey();
    const payload = {
      category,
      question_id: questionId ? Number(questionId) : null,
      description: (description || category).slice(0, 2000),
      diagnostics: safeDiagnostics,
      client_timestamp: new Date().toISOString(),
    };

    // Mark as locally detected
    this._notifyStatus(eventId, LOCAL_EVENT_STATUS.DETECTED_LOCALLY);

    // Debounce repeated identical events within DEBOUNCE_WINDOW_MS
    const debounceKey = `${category}_${questionId || 0}`;
    const occurrenceCount = (this.debounceCounts.get(debounceKey) || 0) + 1;
    this.debounceCounts.set(debounceKey, occurrenceCount);

    if (this.debounceTimers.has(debounceKey)) {
      clearTimeout(this.debounceTimers.get(debounceKey));
    }

    return new Promise((resolve) => {
      const timer = setTimeout(async () => {
        this.debounceTimers.delete(debounceKey);
        const count = this.debounceCounts.get(debounceKey) || 1;
        this.debounceCounts.delete(debounceKey);

        payload.diagnostics.occurrenceCount = count;

        const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
        if (!isOnline) {
          this._enqueueOffline(payload, eventId);
          this._notifyStatus(eventId, LOCAL_EVENT_STATUS.QUEUED_OFFLINE);
          resolve({ queuedOffline: true, eventId, status: LOCAL_EVENT_STATUS.QUEUED_OFFLINE });
          return;
        }

        try {
          const res = await this._sendWithRetry(payload, eventId);
          this._notifyStatus(eventId, LOCAL_EVENT_STATUS.ACKNOWLEDGED_BY_SERVER, res);
          resolve({ ...(res || {}), status: LOCAL_EVENT_STATUS.ACKNOWLEDGED_BY_SERVER });
        } catch (err) {
          // If network failed during send, buffer to offline queue
          this._enqueueOffline(payload, eventId);
          this._notifyStatus(eventId, LOCAL_EVENT_STATUS.QUEUED_OFFLINE);
          resolve({ queuedOffline: true, eventId, error: err.message, status: LOCAL_EVENT_STATUS.QUEUED_OFFLINE });
        }
      }, category === INCIDENT_CATEGORIES.ANSWER_SAVE_FAILED ? 500 : 100);

      this.debounceTimers.set(debounceKey, timer);
    });
  }

  async _dispatchReport(event) {
    const eventId = event.id || generateIdempotencyKey();
    const payload = {
      category: event.category,
      question_id: event.questionId ? Number(event.questionId) : null,
      description: event.description || event.category,
      diagnostics: sanitizeClientDiagnostics(event.diagnostics || {}),
      client_timestamp: new Date().toISOString(),
    };
    try {
      const res = await this._sendWithRetry(payload, eventId, 3);
      this._notifyStatus(eventId, LOCAL_EVENT_STATUS.ACKNOWLEDGED_BY_SERVER, res);
      return { ...(res || {}), status: LOCAL_EVENT_STATUS.ACKNOWLEDGED_BY_SERVER };
    } catch (err) {
      this._notifyStatus(eventId, LOCAL_EVENT_STATUS.PENDING_RETRY, { error: err.message });
      return { success: false, status: LOCAL_EVENT_STATUS.PENDING_RETRY, error: err.message };
    }
  }

  _enqueueOffline(payload, idempotencyKey) {
    if (this.offlineQueue.length >= MAX_OFFLINE_QUEUE_SIZE) {
      this.offlineQueue.shift(); // Drop oldest event if bounded queue fills
    }
    this.offlineQueue.push({ payload, idempotencyKey, timestamp: Date.now() });
    this._persistQueueToStorage();
  }

  async _sendWithRetry(payload, idempotencyKey, retries = MAX_RETRIES) {
    let lastErr = null;
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const res = await attemptService.reportIncident(this.attemptId, payload, { idempotencyKey });
        return res;
      } catch (err) {
        lastErr = err;
        if (err?.status >= 400 && err?.status < 500) {
          // Client error (e.g. 403 Forbidden or 409 Conflict): do not retry
          throw err;
        }
        if (attempt < retries) {
          await new Promise((r) => setTimeout(r, 600 * attempt));
        }
      }
    }
    throw lastErr;
  }

  /**
   * Flushes offline queued diagnostic events sequentially upon reconnection.
   */
  async flushQueue() {
    if (this.isFlushing || this.offlineQueue.length === 0 || this.destroyed) return;
    this.isFlushing = true;

    try {
      while (this.offlineQueue.length > 0 && (typeof navigator === 'undefined' || navigator.onLine)) {
        const item = this.offlineQueue[0];
        try {
          const res = await this._sendWithRetry(item.payload, item.idempotencyKey, 1);
          this._notifyStatus(item.idempotencyKey, LOCAL_EVENT_STATUS.ACKNOWLEDGED_BY_SERVER, res);
          this.offlineQueue.shift();
          this._persistQueueToStorage();
        } catch (err) {
          if (err?.status >= 400 && err?.status < 500) {
            this.offlineQueue.shift(); // Discard unretryable client-rejected item
            this._persistQueueToStorage();
          } else {
            break; // Stop draining on server/network failure
          }
        }
      }
    } finally {
      this.isFlushing = false;
    }
  }

  // Specialized convenience helpers
  reportSaveFailure(questionId, error) {
    return this.reportIncident({
      category: INCIDENT_CATEGORIES.ANSWER_SAVE_FAILED,
      questionId,
      description: `Autosave failed: ${error?.message || 'Network timeout or error'}`,
      endpoint: '/api/attempts/:id/answer',
      diagnostics: {
        httpStatus: error?.status,
        errorCode: error?.code,
      },
    });
  }

  reportQuestionLoadFailure(questionId, error) {
    return this.reportIncident({
      category: INCIDENT_CATEGORIES.QUESTION_LOAD_FAILED,
      questionId,
      description: `Question loading failed: ${error?.message || 'Load error'}`,
      endpoint: '/api/attempts/:id',
      diagnostics: { httpStatus: error?.status },
    });
  }

  reportSubmissionFailure(error) {
    return this.reportIncident({
      category: INCIDENT_CATEGORIES.SUBMISSION_FAILED,
      description: `Exam submission failed: ${error?.message || 'Submit error'}`,
      endpoint: '/api/attempts/:id/submit',
      diagnostics: { httpStatus: error?.status },
    });
  }

  reportTimerMismatch(driftSeconds, serverEndsAt, clientEndsAt) {
    return this.reportIncident({
      category: INCIDENT_CATEGORIES.TIMER_MISMATCH,
      description: `Timer discrepancy detected: clock drift ${Math.round(driftSeconds)}s`,
      diagnostics: {
        clockSkewSeconds: driftSeconds,
        serverEndsAt,
        clientEndsAt,
      },
    });
  }

  reportRecordingFailure(chunkIndex, error) {
    return this.reportIncident({
      category: INCIDENT_CATEGORIES.RECORDING_FAILED,
      description: `Recording chunk #${chunkIndex} upload failed: ${error?.message || 'Upload error'}`,
      endpoint: '/api/attempts/:id/proctoring/chunk',
      diagnostics: { chunkIndex, httpStatus: error?.status },
    });
  }

  reportScreenshotFailure(sequenceNumber, error) {
    return this.reportIncident({
      category: INCIDENT_CATEGORIES.SCREENSHOT_FAILED,
      description: `Screenshot #${sequenceNumber} capture/upload failed: ${error?.message || 'Capture error'}`,
      endpoint: '/api/attempts/:id/proctoring/screenshot',
      diagnostics: { sequenceNumber, httpStatus: error?.status },
    });
  }

  reportScreenShareStopped() {
    return this.reportIncident({
      category: INCIDENT_CATEGORIES.SCREEN_SHARING_STOPPED,
      description: 'Candidate screen-sharing stream was interrupted or closed',
      endpoint: '/api/attempts/:id/proctoring/event',
      diagnostics: { stoppedAt: Date.now() },
    });
  }

  reportResumeFailure(error) {
    return this.reportIncident({
      category: INCIDENT_CATEGORIES.APPLICATION_ERROR,
      description: `Failed to resume or refresh exam attempt: ${error?.message || 'Resume error'}`,
      endpoint: '/api/attempts/:id',
      diagnostics: { httpStatus: error?.status },
    });
  }
}

/**
 * React Hook helper for components.
 */
export function createIncidentReporter(attemptId, options = {}) {
  return new IncidentReporter(attemptId, options);
}
