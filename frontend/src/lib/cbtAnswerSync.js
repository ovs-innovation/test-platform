/**
 * CBT Answer Synchronization and Offline Recovery Manager
 * 
 * Guarantees:
 * 1. Offline answer safety (buffered in localStorage per attemptId)
 * 2. Automatic retries with exponential backoff on network reconnection
 * 3. Strict out-of-order & duplicate protection (monotonic versioning per question)
 * 4. Safe test submission retry without duplicate grading
 * 5. Server-authoritative timer reconciliation without local time extension
 * 6. Isolated failure domains (incident reporting errors never affect exam flow)
 */

import { attemptService } from './services.js';

export const SYNC_STATUS = {
  IDLE: 'idle',
  SAVING: 'saving',
  SAVED: 'saved',
  PENDING: 'pending',
  FAILED: 'failed',
  SUBMIT_FAILED: 'submit_failed',
};

const BASE_RETRY_DELAY_MS = 2000;
const MAX_RETRY_DELAY_MS = 15000;
const MAX_RETRIES = 5;

export class CbtAnswerSyncManager {
  constructor(attemptId, options = {}) {
    this.attemptId = attemptId;
    this.options = {
      isSimulator: Boolean(options.isSimulator),
      onStatusChange: options.onStatusChange || null,
      onIncident: options.onIncident || null,
      onTimerSync: options.onTimerSync || null,
      ...options,
    };

    this.queue = [];
    this.inFlight = new Map(); // questionId -> Promise
    this.latestQuestionVersion = new Map(); // questionId -> timestamp
    this.latestSavedVersion = new Map(); // questionId -> timestamp
    this.retryTimer = null;
    this.destroyed = false;
    this.status = SYNC_STATUS.IDLE;
    this.clockSkewMs = 0;
    this.authoritativeEndsAtMs = null;

    this._boundOnOnline = this._handleOnline.bind(this);
    if (typeof window !== 'undefined') {
      window.addEventListener('online', this._boundOnOnline);
    }

    this._loadQueueFromStorage();
  }

  destroy() {
    this.destroyed = true;
    if (typeof window !== 'undefined') {
      window.removeEventListener('online', this._boundOnOnline);
    }
    if (this.retryTimer) {
      clearTimeout(this.retryTimer);
      this.retryTimer = null;
    }
  }

  _storageKey() {
    return `cbt_offline_answers_${this.attemptId}`;
  }

  _loadQueueFromStorage() {
    if (typeof localStorage === 'undefined' || !this.attemptId) return;
    try {
      const raw = localStorage.getItem(this._storageKey());
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          this.queue = parsed;
          for (const item of parsed) {
            const cur = this.latestQuestionVersion.get(item.questionId) || 0;
            if (item.version > cur) {
              this.latestQuestionVersion.set(item.questionId, item.version);
            }
          }
          if (this.queue.length > 0) {
            this._notifyStatus(SYNC_STATUS.PENDING);
          }
        }
      }
    } catch (_) {}
  }

  _persistQueueToStorage() {
    if (typeof localStorage === 'undefined' || !this.attemptId) return;
    try {
      if (this.queue.length === 0) {
        localStorage.removeItem(this._storageKey());
      } else {
        localStorage.setItem(this._storageKey(), JSON.stringify(this.queue));
      }
    } catch (_) {}
  }

  getPendingCount() {
    return this.queue.length;
  }

  getFailedCount() {
    return this.queue.filter((q) => q.status === 'failed').length;
  }

  getPendingQuestionIds() {
    return new Set(this.queue.map((q) => q.questionId));
  }

  isQuestionPending(questionId) {
    return this.queue.some((q) => q.questionId === questionId);
  }

  getStoredAnswersMap() {
    const answers = {
      mcq: {},
      multi: {},
      numeric: {},
      coding: {},
      subjective: {},
      reviewed: {},
      cleared: {},
    };
    for (const item of this.queue) {
      if (item.type === 'mcq') answers.mcq[item.questionId] = item.payload.selected_index;
      else if (item.type === 'multi') answers.multi[item.questionId] = item.payload.selected_indices;
      else if (item.type === 'numeric') answers.numeric[item.questionId] = item.payload.numeric_answer;
      else if (item.type === 'coding') answers.coding[item.questionId] = { code: item.payload.source_code, lang: item.payload.language };
      else if (item.type === 'subjective') answers.subjective[item.questionId] = item.payload.answer_text;
      else if (item.type === 'review') answers.reviewed[item.questionId] = item.payload.marked_for_review;
      else if (item.type === 'clear') answers.cleared[item.questionId] = true;
    }
    return answers;
  }

  _notifyStatus(newStatus, extra = {}) {
    this.status = newStatus;
    if (typeof this.options.onStatusChange === 'function') {
      try {
        this.options.onStatusChange({
          status: this.status,
          pendingCount: this.getPendingCount(),
          failedCount: this.getFailedCount(),
          pendingQuestionIds: Array.from(this.getPendingQuestionIds()),
          ...extra,
        });
      } catch (_) {}
    }
  }

  _reportIncidentSafe(category, err, details = {}) {
    if (typeof this.options.onIncident === 'function') {
      try {
        this.options.onIncident(category, err, details);
      } catch (_) {}
    }
  }

  /**
   * Reconciles client clock against authoritative server time and deadline.
   * STRICT INVARIANT: Never pushes deadline forward automatically.
   */
  reconcileTimer(serverTimeStr, endsAtStr) {
    if (!serverTimeStr || !endsAtStr) return null;
    const serverNow = new Date(serverTimeStr).getTime();
    const clientNow = Date.now();
    this.clockSkewMs = clientNow - serverNow; // positive if client clock is ahead
    this.authoritativeEndsAtMs = new Date(endsAtStr).getTime();

    const authoritativeNow = clientNow - this.clockSkewMs;
    const remainingSeconds = Math.max(0, Math.round((this.authoritativeEndsAtMs - authoritativeNow) / 1000));

    if (typeof this.options.onTimerSync === 'function') {
      try {
        this.options.onTimerSync({
          remainingSeconds,
          clockSkewSeconds: this.clockSkewMs / 1000,
          authoritativeEndsAtMs: this.authoritativeEndsAtMs,
        });
      } catch (_) {}
    }

    return remainingSeconds;
  }

  getAuthoritativeRemainingSeconds() {
    if (!this.authoritativeEndsAtMs) return null;
    const authoritativeNow = Date.now() - this.clockSkewMs;
    return Math.max(0, Math.round((this.authoritativeEndsAtMs - authoritativeNow) / 1000));
  }

  /**
   * Save an answer with strict out-of-order deduplication and offline backup.
   * @param {string} type 'mcq' | 'multi' | 'numeric' | 'coding' | 'subjective' | 'review' | 'clear'
   * @param {number|string} questionId
   * @param {object} payload
   */
  async recordAnswer(type, questionId, payload) {
    const version = Date.now();
    this.latestQuestionVersion.set(questionId, version);

    // 1. Out-of-order deduplication: Replace any older pending item for this question in queue
    this.queue = this.queue.filter((item) => item.questionId !== questionId);

    const queueItem = {
      type,
      questionId,
      payload,
      version,
      retryCount: 0,
      status: 'pending',
      lastAttempt: null,
      attemptId: this.attemptId,
    };

    this.queue.push(queueItem);
    this._persistQueueToStorage();

    if (this.options.isSimulator) {
      this.queue = this.queue.filter((item) => item.version !== version);
      this._persistQueueToStorage();
      this._notifyStatus(SYNC_STATUS.SAVED, { questionId });
      return { saved: true, isSimulator: true };
    }

    // 2. Dispatch save to server
    return this._dispatchItem(queueItem);
  }

  async _dispatchItem(item) {
    if (this.destroyed) return;

    // Check if a newer version of this question has already been queued
    const currentLatest = this.latestQuestionVersion.get(item.questionId);
    if (currentLatest && currentLatest > item.version) {
      // Discard stale item
      this.queue = this.queue.filter((q) => q !== item);
      this._persistQueueToStorage();
      return;
    }

    this._notifyStatus(SYNC_STATUS.SAVING, { questionId: item.questionId });
    item.status = 'saving';
    item.lastAttempt = Date.now();

    try {
      let res = null;
      const { type, questionId, payload } = item;

      if (type === 'mcq') {
        res = await attemptService.saveAnswer(this.attemptId, questionId, payload.selected_index);
      } else if (type === 'multi') {
        res = await attemptService.saveAnswer(this.attemptId, questionId, undefined, payload.selected_indices);
      } else if (type === 'numeric') {
        res = await attemptService.saveAnswer(this.attemptId, questionId, { numeric_answer: payload.numeric_answer });
      } else if (type === 'coding') {
        res = await attemptService.saveCoding(this.attemptId, questionId, payload.source_code, payload.language);
      } else if (type === 'subjective') {
        res = await attemptService.saveSubjective(this.attemptId, questionId, payload.answer_text);
      } else if (type === 'review') {
        res = await attemptService.markReview(this.attemptId, questionId, payload.marked_for_review);
      } else if (type === 'clear') {
        res = await attemptService.clearAnswer(this.attemptId, questionId);
      }

      // If a newer update occurred while request was in-flight, ignore response
      const latestNow = this.latestQuestionVersion.get(item.questionId);
      if (latestNow && latestNow > item.version) {
        this.queue = this.queue.filter((q) => q !== item);
        this._persistQueueToStorage();
        return res;
      }

      // Reconcile server time if returned
      if (res?.server_time && this.authoritativeEndsAtMs) {
        this.reconcileTimer(res.server_time, new Date(this.authoritativeEndsAtMs).toISOString());
      }

      // Successfully saved!
      this.latestSavedVersion.set(item.questionId, item.version);
      this.queue = this.queue.filter((q) => q !== item);
      this._persistQueueToStorage();

      const remainingPending = this.getPendingCount();
      this._notifyStatus(remainingPending > 0 ? SYNC_STATUS.PENDING : SYNC_STATUS.SAVED, {
        questionId: item.questionId,
        serverTime: res?.server_time,
      });

      return res;
    } catch (err) {
      // 409 conflict: exam auto-submitted or time expired
      if (err?.status === 409 || err?.response?.status === 409) {
        this.queue = this.queue.filter((q) => q !== item);
        this._persistQueueToStorage();
        throw err;
      }

      // Network loss, timeout, or 5xx: Keep safe in offline queue and schedule retry
      item.status = 'failed';
      item.retryCount = (item.retryCount || 0) + 1;
      this._persistQueueToStorage();

      this._reportIncidentSafe('ANSWER_SAVE_FAILED', err, {
        questionId: item.questionId,
        retryCount: item.retryCount,
        offlineBuffered: true,
      });

      this._notifyStatus(SYNC_STATUS.FAILED, {
        questionId: item.questionId,
        error: err?.message || 'Answer save failed; preserved locally',
      });

      this._scheduleRetry();
      throw err;
    }
  }

  _scheduleRetry() {
    if (this.retryTimer || this.destroyed) return;
    const failedItems = this.queue.filter((q) => q.status === 'failed');
    if (failedItems.length === 0) return;

    const minRetryCount = Math.min(...failedItems.map((q) => q.retryCount || 1));
    const delay = Math.min(BASE_RETRY_DELAY_MS * Math.pow(1.5, minRetryCount - 1), MAX_RETRY_DELAY_MS);

    this.retryTimer = setTimeout(() => {
      this.retryTimer = null;
      this.syncPending();
    }, delay);
  }

  _handleOnline() {
    // Network restored: flush all pending queue items immediately
    if (this.retryTimer) {
      clearTimeout(this.retryTimer);
      this.retryTimer = null;
    }
    this.syncPending();
  }

  /**
   * Flushes all pending answers in order.
   */
  async syncPending() {
    if (this.destroyed || this.queue.length === 0) return;
    const itemsToSync = [...this.queue];

    for (const item of itemsToSync) {
      // Check if item is still in queue
      if (!this.queue.includes(item)) continue;
      try {
        await this._dispatchItem(item);
      } catch (_) {
        // Individual failure scheduled in _dispatchItem
      }
    }
  }

  /**
   * Pre-submission flush: Attempts to ensure all answers reach the server before submission.
   */
  async flushBeforeSubmit(timeoutMs = 4000) {
    if (this.queue.length === 0) return true;

    const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve(false), timeoutMs));
    const syncPromise = this.syncPending().then(() => this.queue.length === 0);

    return Promise.race([syncPromise, timeoutPromise]);
  }

  /**
   * Safely retries test submission without duplicate grading.
   * If offline or submission fails, keeps candidate in safe retry state.
   */
  async submitExamSafely(reason = 'manual') {
    if (this.options.isSimulator) {
      return { success: true, isSimulator: true };
    }

    // Attempt to flush pending answers first
    try {
      await this.flushBeforeSubmit(3000);
    } catch (_) {}

    try {
      const res = await attemptService.submit(this.attemptId, reason);
      // Clean up offline queue upon verified submission
      this.clearOfflineAnswers();
      return { success: true, result: res };
    } catch (err) {
      // Check if attempt was already finalized (idempotent success)
      const msg = (err?.message || err?.response?.data?.message || '').toLowerCase();
      if (err?.status === 409 || err?.response?.status === 409 || msg.includes('already') || msg.includes('submitted')) {
        this.clearOfflineAnswers();
        return { success: true, alreadySubmitted: true };
      }

      this._reportIncidentSafe('SUBMISSION_FAILED', err, {
        reason,
        pendingAnswersCount: this.getPendingCount(),
      });

      this._notifyStatus(SYNC_STATUS.SUBMIT_FAILED, {
        error: err?.message || 'Submission failed due to network error',
      });

      return {
        success: false,
        error: err,
        canRetry: true,
        pendingAnswersCount: this.getPendingCount(),
      };
    }
  }

  clearOfflineAnswers() {
    this.queue = [];
    if (typeof localStorage !== 'undefined' && this.attemptId) {
      try {
        localStorage.removeItem(this._storageKey());
      } catch (_) {}
    }
  }
}

/**
 * Factory function for creating or getting manager instance
 */
export function createAnswerSyncManager(attemptId, options = {}) {
  return new CbtAnswerSyncManager(attemptId, options);
}
