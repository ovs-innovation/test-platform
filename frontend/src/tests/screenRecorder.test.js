import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  ScreenRecordingManager,
  RECORDING_STATUS,
  getSupportedMimeType,
  generateSessionId,
} from '../lib/screenRecorder.js';

// Helper mock classes for MediaRecorder and MediaStream
class MockMediaStreamTrack {
  constructor(kind = 'video') {
    this.kind = kind;
    this.readyState = 'live';
    this.listeners = {};
  }

  addEventListener(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  }

  removeEventListener(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter((cb) => cb !== callback);
    }
  }

  dispatchEvent(event) {
    const cbs = this.listeners[event.type] || [];
    cbs.forEach((cb) => cb(event));
  }

  stop() {
    this.readyState = 'ended';
  }
}

class MockMediaStream {
  constructor() {
    this.tracks = [new MockMediaStreamTrack('video')];
  }

  getVideoTracks() {
    return this.tracks.filter((t) => t.kind === 'video');
  }

  getTracks() {
    return this.tracks;
  }
}

class MockMediaRecorder {
  constructor(stream, options = {}) {
    this.stream = stream;
    this.mimeType = options.mimeType || 'video/webm';
    this.state = 'inactive';
    this.listeners = {};
  }

  addEventListener(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  }

  removeEventListener(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter((cb) => cb !== callback);
    }
  }

  dispatchEvent(event) {
    const cbs = this.listeners[event.type] || [];
    cbs.forEach((cb) => cb(event));
  }

  start(intervalMs) {
    this.state = 'recording';
    this.intervalMs = intervalMs;
  }

  requestData() {
    if (this.state === 'recording') {
      this.dispatchEvent({
        type: 'dataavailable',
        data: { size: 1024, type: this.mimeType },
      });
    }
  }

  stop() {
    this.state = 'inactive';
    this.dispatchEvent({ type: 'stop' });
  }

  // Test helper to simulate periodic chunk arrival
  emitChunk(size = 2048) {
    this.dispatchEvent({
      type: 'dataavailable',
      data: { size, type: this.mimeType },
    });
  }
}

describe('ScreenRecordingManager', () => {
  let mockStream;
  let mockStartSession;
  let mockUploadChunk;
  let mockStopSession;
  let originalMediaRecorder;
  let originalNavigator;

  beforeEach(() => {
    mockStream = new MockMediaStream();
    mockStartSession = vi.fn().mockResolvedValue({ success: true });
    mockUploadChunk = vi.fn().mockResolvedValue({ success: true });
    mockStopSession = vi.fn().mockResolvedValue({ success: true });

    // Mock global MediaRecorder
    originalMediaRecorder = globalThis.MediaRecorder;
    globalThis.MediaRecorder = MockMediaRecorder;
    globalThis.MediaRecorder.isTypeSupported = vi.fn((type) => type.includes('webm'));

    // Mock global window & navigator.mediaDevices
    globalThis.window = globalThis;
    Object.defineProperty(globalThis, 'navigator', {
      value: {
        mediaDevices: {
          getDisplayMedia: vi.fn().mockResolvedValue(mockStream),
        },
      },
      configurable: true,
      writable: true,
    });
  });

  afterEach(() => {
    globalThis.MediaRecorder = originalMediaRecorder;
    vi.restoreAllMocks();
  });

  it('probes supported MIME types correctly', () => {
    const mime = getSupportedMimeType();
    expect(mime).toContain('webm');
  });

  it('generates a valid session ID', () => {
    const id = generateSessionId();
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(5);
  });

  it('case 1: permission granted -> starts recording and calls startSessionApi', async () => {
    const statusChanges = [];
    const manager = new ScreenRecordingManager({
      attemptId: 42,
      chunkIntervalMs: 5000,
      startSessionApi: mockStartSession,
      uploadChunkApi: mockUploadChunk,
      stopSessionApi: mockStopSession,
      onStatusChange: (status) => statusChanges.push(status),
    });

    const result = await manager.start();

    expect(result.success).toBe(true);
    expect(manager.sessionId).toBeDefined();
    expect(global.navigator.mediaDevices.getDisplayMedia).toHaveBeenCalledWith(
      expect.objectContaining({
        video: expect.objectContaining({ displaySurface: 'monitor' }),
        audio: false,
      })
    );
    expect(mockStartSession).toHaveBeenCalledWith(42, {
      session_id: manager.sessionId,
      mime_type: manager.mimeType,
    });
    expect(manager.mediaRecorder.state).toBe('recording');
    expect(statusChanges).toContain(RECORDING_STATUS.REQUESTING_PERMISSION);
    expect(statusChanges).toContain(RECORDING_STATUS.RECORDING);
    expect(manager.status).toBe(RECORDING_STATUS.RECORDING);
  });

  it('case 2: permission denied -> transitions to PERMISSION_DENIED and throws error', async () => {
    const deniedErr = new Error('Permission denied by user');
    deniedErr.name = 'NotAllowedError';
    global.navigator.mediaDevices.getDisplayMedia = vi.fn().mockRejectedValue(deniedErr);

    const statusChanges = [];
    const manager = new ScreenRecordingManager({
      attemptId: 42,
      startSessionApi: mockStartSession,
      uploadChunkApi: mockUploadChunk,
      stopSessionApi: mockStopSession,
      onStatusChange: (status) => statusChanges.push(status),
    });

    await expect(manager.start()).rejects.toThrow('Permission denied by user');
    expect(manager.status).toBe(RECORDING_STATUS.PERMISSION_DENIED);
    expect(statusChanges).toContain(RECORDING_STATUS.PERMISSION_DENIED);
    expect(mockStartSession).not.toHaveBeenCalled();
    expect(manager.mediaRecorder).toBeNull();
  });

  it('case 3: stopped sharing -> handles track ended event and never silently restarts', async () => {
    const onEnded = vi.fn();
    const manager = new ScreenRecordingManager({
      attemptId: 42,
      startSessionApi: mockStartSession,
      uploadChunkApi: mockUploadChunk,
      stopSessionApi: mockStopSession,
      onScreenShareEnded: onEnded,
    });

    await manager.start();
    expect(manager.status).toBe(RECORDING_STATUS.RECORDING);

    // Simulate candidate clicking "Stop sharing" on the browser native floating bar
    const videoTrack = mockStream.getVideoTracks()[0];
    videoTrack.dispatchEvent({ type: 'ended' });

    expect(manager.status).toBe(RECORDING_STATUS.SCREEN_SHARING_STOPPED);
    expect(onEnded).toHaveBeenCalled();
    expect(manager.mediaRecorder.state).toBe('inactive');
    expect(videoTrack.readyState).toBe('ended');
    // Ensure it didn't call getDisplayMedia again (no silent restart)
    expect(global.navigator.mediaDevices.getDisplayMedia).toHaveBeenCalledTimes(1);
  });

  it('case 4: early submission -> flushes chunks, finalizes session, and releases tracks', async () => {
    const manager = new ScreenRecordingManager({
      attemptId: 42,
      startSessionApi: mockStartSession,
      uploadChunkApi: mockUploadChunk,
      stopSessionApi: mockStopSession,
    });

    await manager.start();
    const sessionId = manager.sessionId;

    // Simulate chunk recorded before submit
    manager.mediaRecorder.emitChunk(4096);
    expect(manager.stats.chunksRecorded).toBe(1);

    // Candidate submits early
    await manager.stop({ status: 'completed', reason: 'Candidate finished early' });

    expect(manager.status).toBe(RECORDING_STATUS.COMPLETED);
    expect(mockStopSession).toHaveBeenCalledWith(42, {
      session_id: sessionId,
      status: 'completed',
      reason: 'Candidate finished early',
    });
    // Video track stopped
    expect(mockStream.getVideoTracks()[0].readyState).toBe('ended');
    expect(manager.stream).toBeNull();
  });

  it('case 5: upload failure and retry backoff', async () => {
    // Fail first 2 attempts, succeed on 3rd
    let attempt = 0;
    const failingUpload = vi.fn().mockImplementation(() => {
      attempt += 1;
      if (attempt < 3) return Promise.reject(new Error('Network gateway timeout'));
      return Promise.resolve({ success: true });
    });

    const onUploadError = vi.fn();
    const manager = new ScreenRecordingManager({
      attemptId: 42,
      maxRetries: 3,
      retryDelayBaseMs: 5,
      uploadChunkApi: failingUpload,
      onUploadError,
    });

    await manager.start();
    manager.mediaRecorder.emitChunk(1024);

    // Wait for fast retries to process
    await new Promise((resolve) => setTimeout(resolve, 80));

    expect(onUploadError).toHaveBeenCalled();
    expect(failingUpload).toHaveBeenCalled();
  });

  it('case 6: bounded upload queue prevents memory leak on prolonged disconnection', async () => {
    // API always rejects (offline)
    const failingUpload = vi.fn().mockRejectedValue(new Error('Device offline'));
    const onBackpressureWarning = vi.fn();

    const manager = new ScreenRecordingManager({
      attemptId: 42,
      maxQueueSize: 3, // Bounded queue limit of 3 chunks
      maxRetries: 0,
      uploadChunkApi: failingUpload,
      onBackpressureWarning,
    });

    await manager.start();

    // Emit 5 chunks while offline
    manager.mediaRecorder.emitChunk(1000);
    manager.mediaRecorder.emitChunk(2000);
    manager.mediaRecorder.emitChunk(3000);
    manager.mediaRecorder.emitChunk(4000);
    manager.mediaRecorder.emitChunk(5000);

    // Queue should NOT grow beyond maxQueueSize (3 items)
    expect(manager.uploadQueue.length).toBeLessThanOrEqual(3);
    expect(onBackpressureWarning).toHaveBeenCalled();
  });

  it('case 7: resource cleanup on destroy()', async () => {
    const manager = new ScreenRecordingManager({
      attemptId: 42,
      startSessionApi: mockStartSession,
      uploadChunkApi: mockUploadChunk,
      stopSessionApi: mockStopSession,
    });

    await manager.start();
    const track = mockStream.getVideoTracks()[0];

    manager.destroy();

    expect(manager.isStopped).toBe(true);
    expect(manager.stream).toBeNull();
    expect(track.readyState).toBe('ended');
    expect(manager.uploadQueue).toEqual([]);
  });
});
