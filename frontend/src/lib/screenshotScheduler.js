/**
 * Automatic Proctoring Screenshot Scheduler
 *
 * Coordinates 15-minute periodic screen captures during an active CBT assessment:
 * - Reuses existing permitted screen MediaStream without prompting for second permission
 * - Offscreen video + canvas frame extraction encoded as JPEG/WebP
 * - Single managed timer mechanism preventing duplicate timers or overlapping uploads
 * - Elapsed-time based scheduling resilient to browser throttling and clock drift
 * - Strict recovery policy for tab suspension / sleep: records missed slots without backdating fake captures
 * - 180-minute boundary coordination: exactly up to 12 scheduled captures, conditional on active test & stream
 * - Immediate stop on early submission or unmount with full resource cleanup
 */

export const SCREENSHOT_INTERVAL_MS =
  (typeof globalThis !== 'undefined' && globalThis.__TEST_SCREENSHOT_INTERVAL_MS) ||
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SCREENSHOT_INTERVAL_MS
    ? parseInt(import.meta.env.VITE_SCREENSHOT_INTERVAL_MS, 10)
    : (typeof process !== 'undefined' && process.env?.VITE_SCREENSHOT_INTERVAL_MS
      ? parseInt(process.env.VITE_SCREENSHOT_INTERVAL_MS, 10)
      : 15 * 60 * 1000)); // Default 15 minutes = 900,000 ms
export const MAX_SCHEDULED_SCREENSHOTS = 12; // 12 intervals (e.g. 1m for testing, 15m for production)

export class ScreenshotScheduler {
  /**
   * @param {Object} options
   * @param {string|number} options.attemptId
   * @param {string} options.sessionId
   * @param {MediaStream} options.stream Reused screen stream from ScreenRecordingManager
   * @param {number} [options.startTime] Epoch ms when test/session started (defaults to Date.now())
   * @param {number} [options.intervalMs=900000] Interval in ms
   * @param {number} [options.maxScreenshots=12] Max screenshots
   * @param {Function} options.uploadScreenshotApi async (attemptId, formData) => Promise
   * @param {Function} [options.recordMissedApi] async (attemptId, payload) => Promise
   * @param {Function} [options.onScreenshotCaptured] (data) => void
   * @param {Function} [options.onScreenshotMissed] (data) => void
   * @param {Function} [options.onError] (err) => void
   */
  constructor(options = {}) {
    this.attemptId = options.attemptId;
    this.sessionId = options.sessionId;
    this.stream = options.stream || null;
    this.startTime = options.startTime || Date.now();
    this.intervalMs =
      options.intervalMs ||
      (typeof globalThis !== 'undefined' && globalThis.__TEST_SCREENSHOT_INTERVAL_MS) ||
      SCREENSHOT_INTERVAL_MS;
    this.maxScreenshots = options.maxScreenshots || MAX_SCHEDULED_SCREENSHOTS;

    this.uploadScreenshotApi = options.uploadScreenshotApi;
    this.recordMissedApi = options.recordMissedApi;
    this.onScreenshotCaptured = options.onScreenshotCaptured || (() => {});
    this.onScreenshotMissed = options.onScreenshotMissed || (() => {});
    this.onError = options.onError || (() => {});

    // State tracking
    this.isRunning = false;
    this.isCapturing = false;
    this.timerId = null;
    this.heartbeatTimerId = null;

    // Map of sequenceNumber (1..12) -> status: 'captured' | 'missed' | 'failed'
    this.slots = new Map();
    this.capturedCount = 0;

    this._boundTick = this._tick.bind(this);
    this._boundHeartbeat = this._checkSchedule.bind(this);
  }

  /**
   * Updates stream reference (e.g. after screen share re-established)
   */
  setStream(stream) {
    this.stream = stream;
  }

  /**
   * Updates session ID reference
   */
  setSessionId(sessionId) {
    this.sessionId = sessionId;
  }

  /**
   * Starts the screenshot scheduling engine.
   * Enforces single managed timer: duplicate calls are safely ignored.
   */
  start() {
    if (this.isRunning) return;
    this.isRunning = true;

    this._scheduleNext();

    // Heartbeat check every 15 seconds to recover from background tab throttling or OS sleep
    if (typeof window !== 'undefined') {
      this.heartbeatTimerId = setInterval(this._boundHeartbeat, 15000);
    }
  }

  /**
   * Evaluates elapsed session time and schedules the next due screenshot slot.
   */
  _scheduleNext() {
    if (!this.isRunning) return;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }

    const nextSlot = this._getNextPendingSlot();
    if (!nextSlot || nextSlot > this.maxScreenshots) {
      // All 12 screenshots completed or maximum boundary reached
      return;
    }

    const elapsed = Date.now() - this.startTime;
    const targetDueMs = nextSlot * this.intervalMs;
    const delay = Math.max(0, targetDueMs - elapsed);

    this.timerId = setTimeout(this._boundTick, delay);
  }

  /**
   * Finds lowest sequence number (1..12) that has not yet been processed.
   */
  _getNextPendingSlot() {
    for (let seq = 1; seq <= this.maxScreenshots; seq++) {
      if (!this.slots.has(seq)) {
        return seq;
      }
    }
    return null;
  }

  /**
   * Periodic heartbeat handler: detects if system woke from sleep
   * and a scheduled interval has elapsed while suspended.
   */
  async _checkSchedule() {
    if (!this.isRunning || this.isCapturing) return;

    const elapsed = Date.now() - this.startTime;
    const currentDueSlot = Math.floor(elapsed / this.intervalMs);

    if (currentDueSlot >= 1) {
      const nextPending = this._getNextPendingSlot();
      if (nextPending && nextPending <= currentDueSlot && nextPending <= this.maxScreenshots) {
        // A slot is due or overdue! Trigger capture or recovery
        await this._tick();
      }
    }
  }

  /**
   * Main execution tick for a scheduled screenshot slot.
   */
  async _tick() {
    if (!this.isRunning || this.isCapturing) return;

    const nextSlot = this._getNextPendingSlot();
    if (!nextSlot || nextSlot > this.maxScreenshots) return;

    const elapsed = Date.now() - this.startTime;
    const targetDueMs = nextSlot * this.intervalMs;
    const delaySeconds = Math.max(0, Math.round((elapsed - targetDueMs) / 1000));
    const isDelayed = delaySeconds > 60; // Flagged as delayed if more than 1 minute late (e.g. sleep/throttling)

    // Documented Recovery Policy for Throttling / Sleep:
    // If browser was suspended for an extended time and multiple slots were missed (e.g. woke at min 45):
    // 1. Any slot strictly before the latest due slot is marked as 'missed' to avoid fake/duplicate bursts.
    // 2. Only the current overdue slot is captured with is_delayed: true and the actual timestamp.
    const latestDueSlot = Math.min(this.maxScreenshots, Math.floor(elapsed / this.intervalMs));
    if (latestDueSlot > nextSlot) {
      // Mark earlier missed slots
      for (let s = nextSlot; s < latestDueSlot; s++) {
        if (!this.slots.has(s)) {
          this.slots.set(s, 'missed');
          if (this.recordMissedApi && this.sessionId) {
            this.recordMissedApi(this.attemptId, {
              session_id: this.sessionId,
              sequence_number: s,
              scheduled_minute: s * 15,
              notes: `Slot ${s} (minute ${s * 15}) missed due to system suspension / tab throttling`,
            }).catch(() => {});
          }
          this.onScreenshotMissed({ sequenceNumber: s, scheduledMinute: s * 15 });
        }
      }
    }

    const slotToCapture = latestDueSlot >= 1 ? Math.min(this.maxScreenshots, latestDueSlot) : nextSlot;
    if (this.slots.has(slotToCapture)) {
      this._scheduleNext();
      return;
    }

    const scheduledMinute = Math.max(1, Math.round((slotToCapture * this.intervalMs) / 60000));

    // Check if stream is still active and valid
    if (!this._isStreamActive()) {
      // Stream is stopped or unavailable. Do not capture blank frame.
      this.slots.set(slotToCapture, 'missed');
      if (this.recordMissedApi && this.sessionId) {
        this.recordMissedApi(this.attemptId, {
          session_id: this.sessionId,
          sequence_number: slotToCapture,
          scheduled_minute: scheduledMinute,
          notes: 'Screen sharing was stopped or unavailable during scheduled screenshot',
        }).catch(() => {});
      }
      this.onScreenshotMissed({
        sequenceNumber: slotToCapture,
        scheduledMinute,
        reason: 'Stream inactive',
      });
      this._scheduleNext();
      return;
    }

    // Capture and upload frame
    this.isCapturing = true;
    try {
      const blob = await this._captureFrame(this.stream);
      if (!blob || blob.size === 0) {
        throw new Error('Failed to extract valid frame from screen stream');
      }

      await this._uploadScreenshotWithRetry({
        blob,
        sequenceNumber: slotToCapture,
        scheduledMinute,
        isDelayed,
        delaySeconds,
        capturedAt: new Date().toISOString(),
      });

      this.slots.set(slotToCapture, 'captured');
      this.capturedCount += 1;
      this.onScreenshotCaptured({
        sequenceNumber: slotToCapture,
        scheduledMinute,
        isDelayed,
        delaySeconds,
      });
    } catch (err) {
      this.slots.set(slotToCapture, 'failed');
      this.onError(err);
    } finally {
      this.isCapturing = false;
      this._scheduleNext();
    }
  }

  /**
   * Validates whether stream has live video tracks
   */
  _isStreamActive() {
    if (!this.stream) return false;
    const tracks = this.stream.getVideoTracks ? this.stream.getVideoTracks() : [];
    if (tracks.length === 0) return false;
    return tracks.some((t) => t.readyState === 'live');
  }

  /**
   * Captures a single image frame from MediaStream via an offscreen video and canvas.
   * Fully cleans up video and canvas to avoid memory leaks.
   *
   * @param {MediaStream} stream
   * @returns {Promise<Blob>}
   */
  async _captureFrame(stream) {
    if (typeof document === 'undefined') {
      // Node/Testing fallback
      return new Blob(['mock-screenshot-data'], { type: 'image/jpeg' });
    }

    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.muted = true;
      video.playsInline = true;
      video.autoplay = true;
      video.srcObject = stream;

      const cleanup = () => {
        try {
          video.pause();
          video.srcObject = null;
          video.remove();
        } catch (_) {}
      };

      const timeoutId = setTimeout(() => {
        cleanup();
        reject(new Error('Timeout waiting for screen video frame'));
      }, 5000);

      const onCanPlay = () => {
        video.removeEventListener('loadedmetadata', onCanPlay);
        video.removeEventListener('playing', onCanPlay);
        clearTimeout(timeoutId);

        try {
          const width = video.videoWidth || 1920;
          const height = video.videoHeight || 1080;

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(video, 0, 0, width, height);

          // Encode as JPEG at quality 0.82 for optimal visual fidelity and low network payload
          canvas.toBlob(
            (blob) => {
              // Explicitly cleanup canvas memory
              ctx.clearRect(0, 0, width, height);
              canvas.width = 0;
              canvas.height = 0;
              cleanup();

              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('Canvas toBlob failed'));
              }
            },
            'image/jpeg',
            0.82
          );
        } catch (err) {
          cleanup();
          reject(err);
        }
      };

      video.addEventListener('loadedmetadata', onCanPlay);
      video.addEventListener('playing', onCanPlay);
      video.play().catch((err) => {
        clearTimeout(timeoutId);
        cleanup();
        reject(err);
      });
    });
  }

  /**
   * Uploads screenshot with retry logic
   */
  async _uploadScreenshotWithRetry({ blob, sequenceNumber, scheduledMinute, isDelayed, delaySeconds, capturedAt }) {
    if (!this.uploadScreenshotApi) return;

    let attempts = 0;
    const maxAttempts = 2;

    while (attempts < maxAttempts) {
      try {
        const formData = new FormData();
        const fileBlob = blob instanceof Blob ? blob : new Blob([blob], { type: 'image/jpeg' });
        formData.append('screenshot', fileBlob, `screenshot_seq_${sequenceNumber}.jpg`);
        formData.append('session_id', this.sessionId);
        formData.append('sequence_number', String(sequenceNumber));
        formData.append('scheduled_minute', String(scheduledMinute));
        formData.append('is_delayed', String(isDelayed));
        formData.append('delay_seconds', String(delaySeconds));
        formData.append('captured_at', capturedAt);

        await this.uploadScreenshotApi(this.attemptId, formData);
        return;
      } catch (err) {
        attempts += 1;
        if (attempts >= maxAttempts) throw err;
        await new Promise((res) => setTimeout(res, 1000));
      }
    }
  }

  /**
   * Immediately stops scheduling and clears all active timers.
   * Guaranteed to prevent any screenshots after early test submission.
   */
  stop() {
    this.isRunning = false;
    this.isCapturing = false;

    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.heartbeatTimerId) {
      clearInterval(this.heartbeatTimerId);
      this.heartbeatTimerId = null;
    }
  }

  /**
   * Releases all resources and references
   */
  destroy() {
    this.stop();
    this.stream = null;
    this.slots.clear();
  }
}
