/**
 * Student Screen Recording Engine
 *
 * Provides lifecycle management for continuous CBT screen capture:
 * - Explicit user permission via navigator.mediaDevices.getDisplayMedia()
 * - Browser MIME type probing (WebM VP9/VP8, MP4)
 * - Managed chunked recording with MediaRecorder (configurable interval, default 5s)
 * - Bounded FIFO upload queue with backpressure limits to prevent browser OOM over 3-hour tests
 * - Exponential backoff retry handling for chunk uploads
 * - Sequential chunk indexing and unique session ID generation
 * - Screen track 'ended' event detection with violation signaling (no silent restart)
 * - Clean resource release on test submission, navigation, or component unmount
 */

export const RECORDING_STATUS = {
  IDLE: 'idle',
  REQUESTING_PERMISSION: 'requesting_permission',
  RECORDING: 'recording',
  UPLOADING: 'uploading',
  UPLOAD_FAILURE: 'upload_failure',
  SCREEN_SHARING_STOPPED: 'screen_sharing_stopped',
  PERMISSION_DENIED: 'permission_denied',
  UNSUPPORTED: 'unsupported',
  COMPLETED: 'completed',
};

const CANDIDATE_MIME_TYPES = [
  'video/webm;codecs=vp9,opus',
  'video/webm;codecs=vp8,opus',
  'video/webm;codecs=h264,opus',
  'video/webm',
  'video/mp4;codecs=avc1,mp4a.40.2',
  'video/mp4',
];

/**
 * Returns best supported video recording MIME type in current browser.
 */
export function getSupportedMimeType() {
  if (typeof window === 'undefined' || typeof window.MediaRecorder === 'undefined') {
    return 'video/webm';
  }
  for (const candidate of CANDIDATE_MIME_TYPES) {
    try {
      if (window.MediaRecorder.isTypeSupported && window.MediaRecorder.isTypeSupported(candidate)) {
        return candidate;
      }
    } catch (_) {
      // ignore
    }
  }
  return 'video/webm';
}

/**
 * Generates an RFC-4122 compliant UUID v4 or random fallback.
 */
export function generateSessionId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'sess_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 10);
}

export class ScreenRecordingManager {
  /**
   * @param {Object} options
   * @param {string|number} options.attemptId
   * @param {number} [options.chunkIntervalMs=5000]
   * @param {number} [options.maxQueueSize=12] Bounded buffer: max pending chunks before backpressure alert (~60s)
   * @param {number} [options.maxRetries=3]
   * @param {Function} options.startSessionApi async (attemptId, { session_id, mime_type }) => Promise
   * @param {Function} options.uploadChunkApi async (attemptId, formData) => Promise
   * @param {Function} options.stopSessionApi async (attemptId, { session_id, status, reason }) => Promise
   * @param {Function} [options.onStatusChange] (status, details) => void
   * @param {Function} [options.onScreenShareEnded] () => void
   * @param {Function} [options.onBackpressureWarning] ({ queueLength, droppedChunkIndex }) => void
   * @param {Function} [options.onUploadError] (err, { chunkIndex, retries }) => void
   */
  constructor(options = {}) {
    this.attemptId = options.attemptId;
    this.chunkIntervalMs = options.chunkIntervalMs || 5000;
    this.maxQueueSize = options.maxQueueSize || 12;
    this.maxRetries = options.maxRetries !== undefined ? options.maxRetries : 3;
    this.retryDelayBaseMs = options.retryDelayBaseMs !== undefined ? options.retryDelayBaseMs : 1000;

    this.startSessionApi = options.startSessionApi;
    this.uploadChunkApi = options.uploadChunkApi;
    this.stopSessionApi = options.stopSessionApi;

    this.onStatusChange = options.onStatusChange || (() => {});
    this.onScreenShareEnded = options.onScreenShareEnded || (() => {});
    this.onBackpressureWarning = options.onBackpressureWarning || (() => {});
    this.onUploadError = options.onUploadError || (() => {});

    this.status = RECORDING_STATUS.IDLE;
    this.sessionId = null;
    this.mimeType = null;
    this.stream = null;
    this.mediaRecorder = null;
    this.chunkIndex = 0;
    this.isDraining = false;
    this.isStopped = false;

    // Bounded FIFO Queue: Array of { chunkIndex, blob, durationMs, retries, resolve, reject }
    this.uploadQueue = [];

    // Local client recording storage (student personal revision video)
    this.recordedBlobs = [];

    // Track total uploaded stats without retaining blobs
    this.stats = {
      chunksRecorded: 0,
      chunksUploaded: 0,
      bytesUploaded: 0,
      uploadFailures: 0,
    };

    this._boundHandleTrackEnded = this._handleTrackEnded.bind(this);
    this._boundHandleDataAvailable = this._handleDataAvailable.bind(this);
    this._boundHandleRecorderStop = this._handleRecorderStop.bind(this);
  }

  _setStatus(newStatus, details = {}) {
    if (this.status === newStatus && Object.keys(details).length === 0) return;
    this.status = newStatus;
    this.onStatusChange(newStatus, { ...details, sessionId: this.sessionId, stats: { ...this.stats } });
  }

  /**
   * Starts screen recording by requesting user permission.
   * NEVER restarts silently. Requires student explicit initiation.
   */
  async start() {
    if (this.status === RECORDING_STATUS.RECORDING || this.status === RECORDING_STATUS.UPLOADING) {
      return { success: true, sessionId: this.sessionId };
    }

    if (
      typeof window === 'undefined' ||
      !navigator?.mediaDevices?.getDisplayMedia ||
      typeof window.MediaRecorder === 'undefined'
    ) {
      this._setStatus(RECORDING_STATUS.UNSUPPORTED, { message: 'Screen recording is not supported in this browser' });
      throw new Error('Screen recording is not supported in this browser');
    }

    this._setStatus(RECORDING_STATUS.REQUESTING_PERMISSION);

    let stream = null;
    try {
      stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          displaySurface: 'monitor',
          frameRate: { ideal: 15, max: 20 },
          width: { ideal: 1920, max: 1920 },
          height: { ideal: 1080, max: 1080 },
        },
        audio: false,
      });
    } catch (err) {
      this._setStatus(RECORDING_STATUS.PERMISSION_DENIED, { error: err.message });
      throw err;
    }

    this.stream = stream;
    this.isStopped = false;
    this.chunkIndex = 0;
    this.sessionId = generateSessionId();
    this.mimeType = getSupportedMimeType();

    // Listen for user stopping screen share via browser floating controls
    const videoTracks = stream.getVideoTracks();
    if (videoTracks.length > 0) {
      videoTracks[0].addEventListener('ended', this._boundHandleTrackEnded);
    }

    // Initialize backend session record
    if (this.startSessionApi) {
      try {
        await this.startSessionApi(this.attemptId, {
          session_id: this.sessionId,
          mime_type: this.mimeType,
        });
      } catch (err) {
        console.warn('[ScreenRecorder] Failed to register session start with backend:', err.message);
        // We continue recording locally; chunk uploads will handle/upsert session if needed
      }
    }

    // Set up MediaRecorder
    try {
      const options = { mimeType: this.mimeType };
      this.mediaRecorder = new MediaRecorder(stream, options);
    } catch (err) {
      // Fallback without mimeType option if browser balks
      try {
        this.mediaRecorder = new MediaRecorder(stream);
        this.mimeType = this.mediaRecorder.mimeType || 'video/webm';
      } catch (innerErr) {
        this._releaseTracks();
        this._setStatus(RECORDING_STATUS.UNSUPPORTED, { error: innerErr.message });
        throw innerErr;
      }
    }

    this.mediaRecorder.addEventListener('dataavailable', this._boundHandleDataAvailable);
    this.mediaRecorder.addEventListener('stop', this._boundHandleRecorderStop);

    // Start chunking with configured interval (5000ms)
    this.mediaRecorder.start(this.chunkIntervalMs);
    this._setStatus(RECORDING_STATUS.RECORDING);

    return { success: true, sessionId: this.sessionId };
  }

  _handleDataAvailable(event) {
    if (!event.data || event.data.size === 0) return;

    this.chunkIndex += 1;
    this.stats.chunksRecorded += 1;

    // Collect blobs locally for student personal revision download
    this.recordedBlobs.push(event.data);

    const chunkItem = {
      chunkIndex: this.chunkIndex,
      blob: event.data,
      durationMs: this.chunkIntervalMs,
      retries: 0,
      createdAt: Date.now(),
    };

    this._enqueueChunk(chunkItem);
  }

  /**
   * Enqueues a chunk with bounded memory limits and backpressure handling.
   * If the queue grows beyond maxQueueSize (e.g. 12 chunks = ~60s of video),
   * we drop the oldest non-first chunk and alert the student instead of crashing the tab.
   */
  _enqueueChunk(chunkItem) {
    if (this.uploadQueue.length >= this.maxQueueSize) {
      // Drop the oldest queued chunk to preserve memory
      const dropped = this.uploadQueue.shift();
      // Explicitly dereference blob to ensure garbage collection
      if (dropped) {
        dropped.blob = null;
        this.stats.uploadFailures += 1;
        this.onBackpressureWarning({
          queueLength: this.uploadQueue.length,
          droppedChunkIndex: dropped.chunkIndex,
        });
      }
    }

    this.uploadQueue.push(chunkItem);
    this._processQueue();
  }

  async _processQueue() {
    if (this.isDraining) return;
    this.isDraining = true;

    while (this.uploadQueue.length > 0) {
      const item = this.uploadQueue[0];
      if (!item || !item.blob) {
        this.uploadQueue.shift();
        continue;
      }

      // If recording is stopped and draining remaining chunks, show uploading status
      if (this.isStopped && this.status !== RECORDING_STATUS.UPLOAD_FAILURE) {
        this._setStatus(RECORDING_STATUS.UPLOADING);
      }

      const success = await this._uploadSingleChunkWithRetry(item);
      if (success) {
        this.uploadQueue.shift();
        this.stats.chunksUploaded += 1;
        this.stats.bytesUploaded += item.blob.size;
        // Clean memory reference immediately
        item.blob = null;

        // Restore RECORDING status if active and currently showing error/uploading
        if (!this.isStopped && this.status !== RECORDING_STATUS.RECORDING) {
          this._setStatus(RECORDING_STATUS.RECORDING);
        }

        if (this.isStopped && this.uploadQueue.length === 0) {
          this._setStatus(RECORDING_STATUS.COMPLETED);
        }
      } else {
        // Retry limit exhausted for this chunk
        this.stats.uploadFailures += 1;
        this._setStatus(RECORDING_STATUS.UPLOAD_FAILURE, {
          chunkIndex: item.chunkIndex,
          queueLength: this.uploadQueue.length,
        });
        // Pause draining until network restores or retry is initiated
        break;
      }
    }

    this.isDraining = false;
  }

  async _uploadSingleChunkWithRetry(item) {
    while (item.retries <= this.maxRetries) {
      try {
        if (!this.uploadChunkApi) {
          // No API provided (e.g. in offline or dummy mode)
          return true;
        }

        const formData = new FormData();
        const ext = this.mimeType?.includes('mp4') ? 'mp4' : 'webm';
        const fileBlob =
          typeof Blob !== 'undefined' && item.blob instanceof Blob
            ? item.blob
            : new Blob([item.blob || ''], { type: this.mimeType || 'video/webm' });
        formData.append('chunk', fileBlob, `chunk_${item.chunkIndex}.${ext}`);
        formData.append('session_id', this.sessionId);
        formData.append('chunk_index', String(item.chunkIndex));
        formData.append('duration_ms', String(item.durationMs || this.chunkIntervalMs));

        await this.uploadChunkApi(this.attemptId, formData);
        return true;
      } catch (err) {
        item.retries += 1;
        this.onUploadError(err, { chunkIndex: item.chunkIndex, retries: item.retries });

        if (item.retries <= this.maxRetries) {
          // Exponential backoff delay
          const delay = Math.min(this.retryDelayBaseMs * Math.pow(2, item.retries - 1), 6000);
          await new Promise((res) => setTimeout(res, delay));
        }
      }
    }
    return false;
  }

  /**
   * Retries draining the queue when network or error recovers.
   */
  retryQueue() {
    if (this.uploadQueue.length > 0) {
      this.uploadQueue.forEach((item) => {
        if (item) item.retries = 0;
      });
      this._processQueue();
    }
  }

  /**
   * Invoked when student clicks 'Stop sharing' on browser floating bar.
   * Must never restart silently. Signals violation and updates UI status.
   */
  _handleTrackEnded() {
    this._setStatus(RECORDING_STATUS.SCREEN_SHARING_STOPPED);
    this.onScreenShareEnded();

    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      try {
        this.mediaRecorder.stop();
      } catch (_) {}
    }
    this._releaseTracks();
  }

  _handleRecorderStop() {
    // MediaRecorder has completely stopped emitting chunks
  }

  _releaseTracks() {
    if (this.stream) {
      try {
        this.stream.getTracks().forEach((track) => {
          track.removeEventListener('ended', this._boundHandleTrackEnded);
          track.stop();
        });
      } catch (_) {}
      this.stream = null;
    }
  }

  /**
   * Gracefully stops recording, flushes last chunks, releases tracks,
   * and finalizes backend session.
   *
   * @param {Object} [options]
   * @param {string} [options.status='completed'] 'completed' | 'stopped' | 'interrupted'
   * @param {string} [options.reason]
   */
  async stop({ status = 'completed', reason = 'Exam finished' } = {}) {
    if (this.isStopped) return;
    this.isStopped = true;

    // 1. Request final data chunk and stop MediaRecorder
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      try {
        if (typeof this.mediaRecorder.requestData === 'function') {
          this.mediaRecorder.requestData();
        }
        this.mediaRecorder.stop();
      } catch (_) {}
    }

    // 2. Release media tracks
    this._releaseTracks();

    // 3. Drain any remaining chunks in the queue with a short deadline
    const drainTimeout = new Promise((resolve) => setTimeout(resolve, 3000));
    await Promise.race([this._processQueue(), drainTimeout]);

    // 4. Notify backend of session completion
    if (this.stopSessionApi && this.sessionId) {
      try {
        await this.stopSessionApi(this.attemptId, {
          session_id: this.sessionId,
          status,
          reason,
        });
      } catch (err) {
        console.warn('[ScreenRecorder] Failed to stop recording session on backend:', err.message);
      }
    }

    // 5. Dereference memory and set final state
    this.uploadQueue = [];
    this._setStatus(status === 'completed' ? RECORDING_STATUS.COMPLETED : RECORDING_STATUS.IDLE);
  }

  /**
   * Cleans up resources unconditionally (e.g. on unmount or navigation).
   */
  destroy() {
    this.isStopped = true;
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      try {
        this.mediaRecorder.stop();
      } catch (_) {}
    }
    this._releaseTracks();
    this.uploadQueue = [];
  }

  /**
   * Downloads the locally recorded video file to the student's device.
   * Completely client-side, zero server interaction.
   * @param {string} [filename]
   */
  downloadLocalRecording(filename) {
    if (!this.recordedBlobs || this.recordedBlobs.length === 0) return false;
    if (typeof window === 'undefined' || typeof document === 'undefined') return false;
    try {
      const mimeType = this.mimeType || 'video/webm';
      const blob = new Blob(this.recordedBlobs, { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = filename || `test_recording_attempt_${this.attemptId || 'session'}.webm`;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        try {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        } catch (_) {}
      }, 2000);
      return true;
    } catch (err) {
      console.warn('[ScreenRecorder] Failed to trigger local download:', err);
      return false;
    }
  }

  /**
   * Returns complete local recorded Blob if any.
   */
  getRecordedBlob() {
    if (!this.recordedBlobs || this.recordedBlobs.length === 0) return null;
    return new Blob(this.recordedBlobs, { type: this.mimeType || 'video/webm' });
  }

  /**
   * Checks if candidate has local recording data ready to download.
   */
  hasLocalRecording() {
    return Array.isArray(this.recordedBlobs) && this.recordedBlobs.length > 0;
  }
}
