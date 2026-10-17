import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ScreenRecordingManager, RECORDING_STATUS } from '../lib/screenRecorder.js';
import { ScreenshotScheduler, SCREENSHOT_INTERVAL_MS, MAX_SCHEDULED_SCREENSHOTS } from '../lib/screenshotScheduler.js';

class MockMediaStreamTrack {
  constructor(kind = 'video', readyState = 'live') {
    this.kind = kind;
    this.readyState = readyState;
    this.onended = null;
  }
  stop() {
    this.readyState = 'ended';
    if (this.onended) this.onended();
  }
  addEventListener(event, handler) {
    if (event === 'ended') this.onended = handler;
  }
}

class MockMediaStream {
  constructor(active = true) {
    this.tracks = [new MockMediaStreamTrack('video', active ? 'live' : 'ended')];
  }
  getVideoTracks() {
    return this.tracks.filter((t) => t.kind === 'video');
  }
  getTracks() {
    return this.tracks;
  }
}

class MockMediaRecorder {
  static isTypeSupported = vi.fn().mockReturnValue(true);

  constructor(stream, options = {}) {
    this.stream = stream;
    this.options = options;
    this.state = 'inactive';
    this.ondataavailable = null;
    this.onstop = null;
    this.onerror = null;
  }

  addEventListener(event, handler) {
    if (event === 'dataavailable') this.ondataavailable = handler;
    if (event === 'stop') this.onstop = handler;
    if (event === 'error') this.onerror = handler;
  }

  removeEventListener() {}

  start(intervalMs) {
    this.state = 'recording';
    this.intervalMs = intervalMs;
  }

  stop() {
    this.state = 'inactive';
    if (this.onstop) this.onstop();
  }

  emitChunk() {
    if (this.ondataavailable) {
      const mockBlob = new Blob(['mock-webm-bytes'], { type: 'video/webm' });
      this.ondataavailable({ data: mockBlob });
    }
  }
}

describe('Frontend End-to-End Proctoring Verification: Simulated 180-Minute CBT Test', () => {
  let originalMediaRecorder;
  let originalMediaDevices;
  let mockStream;
  let uploadChunkApi;
  let startSessionApi;
  let stopSessionApi;
  let uploadScreenshotApi;
  let recordMissedApi;

  beforeEach(() => {
    vi.useFakeTimers();

    // Define window for node environment
    if (typeof global.window === 'undefined') {
      global.window = globalThis;
    }

    // Mock global MediaRecorder
    originalMediaRecorder = global.MediaRecorder;
    global.MediaRecorder = MockMediaRecorder;
    global.window.MediaRecorder = MockMediaRecorder;

    // Mock stream
    mockStream = new MockMediaStream(true);

    // Mock navigator.mediaDevices
    originalMediaDevices = global.navigator.mediaDevices;
    global.navigator.mediaDevices = {
      getDisplayMedia: vi.fn(),
    };

    // APIs
    startSessionApi = vi.fn().mockResolvedValue({
      success: true,
      session: { session_id: 'sim-sess-180', status: 'active' },
    });
    uploadChunkApi = vi.fn().mockResolvedValue({ success: true });
    stopSessionApi = vi.fn().mockResolvedValue({ success: true });
    uploadScreenshotApi = vi.fn().mockResolvedValue({ success: true });
    recordMissedApi = vi.fn().mockResolvedValue({ success: true });
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    global.MediaRecorder = originalMediaRecorder;
    global.navigator.mediaDevices = originalMediaDevices;
    if (global.window) {
      delete global.window.__TEST_SCREENSHOT_INTERVAL_MS;
    }
  });

  it('1. Recording does not start prior to explicit screen-sharing permission grant', async () => {
    const manager = new ScreenRecordingManager({
      attemptId: 100,
      startSessionApi,
      uploadChunkApi,
      stopSessionApi,
    });

    expect(manager.status).toBe(RECORDING_STATUS.IDLE);
    expect(manager.mediaRecorder).toBeNull();
    expect(startSessionApi).not.toHaveBeenCalled();

    // Candidate denies permission prompt
    global.navigator.mediaDevices.getDisplayMedia.mockRejectedValueOnce(
      new Error('Permission denied by candidate')
    );

    await expect(manager.start()).rejects.toThrow('Permission denied');
    expect(manager.status).toBe(RECORDING_STATUS.PERMISSION_DENIED);
    expect(startSessionApi).not.toHaveBeenCalled();
    expect(uploadChunkApi).not.toHaveBeenCalled();
  });

  it('2. Controllable clock: Full simulated 180-minute test captures exactly 12 screenshots at minutes 15..180', async () => {
    global.navigator.mediaDevices.getDisplayMedia.mockResolvedValueOnce(mockStream);

    const startTime = Date.now();
    const screenshotCaptures = [];

    const scheduler = new ScreenshotScheduler({
      attemptId: 100,
      sessionId: 'sim-sess-180',
      stream: mockStream,
      startTime,
      intervalMs: 15 * 60 * 1000, // 15 minutes = 900,000 ms
      maxScreenshots: 12,
      uploadScreenshotApi,
      recordMissedApi,
      onScreenshotCaptured: (data) => screenshotCaptures.push(data),
    });

    scheduler.start();
    expect(scheduler.isRunning).toBe(true);
    expect(screenshotCaptures).toHaveLength(0);

    // Fast-forward 14 minutes (840,000 ms) -> No captures yet
    await vi.advanceTimersByTimeAsync(14 * 60 * 1000);
    expect(screenshotCaptures).toHaveLength(0);

    // Fast-forward to Minute 15 (900,000 ms) -> Capture 1 triggers
    await vi.advanceTimersByTimeAsync(1 * 60 * 1000);
    expect(screenshotCaptures).toHaveLength(1);
    expect(screenshotCaptures[0]).toEqual(expect.objectContaining({ sequenceNumber: 1, scheduledMinute: 15 }));

    // Fast-forward to Minute 30 (1,800,000 ms) -> Capture 2 triggers
    await vi.advanceTimersByTimeAsync(15 * 60 * 1000);
    expect(screenshotCaptures).toHaveLength(2);
    expect(screenshotCaptures[1]).toEqual(expect.objectContaining({ sequenceNumber: 2, scheduledMinute: 30 }));

    // Fast-forward across Minutes 45, 60, 75, 90, 105, 120, 135, 150, 165
    for (let m = 3; m <= 11; m++) {
      await vi.advanceTimersByTimeAsync(15 * 60 * 1000);
      expect(screenshotCaptures).toHaveLength(m);
      expect(screenshotCaptures[m - 1]).toEqual(expect.objectContaining({ sequenceNumber: m, scheduledMinute: m * 15 }));
    }

    // Fast-forward to Minute 180 (Final boundary, 10,800,000 ms) -> Capture 12 triggers
    await vi.advanceTimersByTimeAsync(15 * 60 * 1000);
    expect(screenshotCaptures).toHaveLength(12);
    expect(screenshotCaptures[11]).toEqual(expect.objectContaining({ sequenceNumber: 12, scheduledMinute: 180 }));

    // Total scheduled screenshots reaches 12 and stops
    expect(scheduler.capturedCount).toBe(12);
    expect(scheduler.slots.size).toBe(12);

    // Any further time progression past 180 minutes does NOT trigger screenshot 13
    await vi.advanceTimersByTimeAsync(30 * 60 * 1000);
    expect(screenshotCaptures).toHaveLength(12);

    scheduler.destroy();
  });

  it('3. Early test submission at minute 42 immediately halts recording and screenshot scheduling', async () => {
    global.navigator.mediaDevices.getDisplayMedia.mockResolvedValueOnce(mockStream);

    const startTime = Date.now();
    const screenshotCaptures = [];

    const scheduler = new ScreenshotScheduler({
      attemptId: 100,
      sessionId: 'sim-sess-180',
      stream: mockStream,
      startTime,
      intervalMs: 15 * 60 * 1000,
      maxScreenshots: 12,
      uploadScreenshotApi,
      recordMissedApi,
      onScreenshotCaptured: (data) => screenshotCaptures.push(data),
    });

    scheduler.start();

    // Advance to Minute 15 and 30 -> 2 screenshots captured
    await vi.advanceTimersByTimeAsync(15 * 60 * 1000);
    await vi.advanceTimersByTimeAsync(15 * 60 * 1000);
    expect(screenshotCaptures).toHaveLength(2);

    // Candidate submits test at Minute 42 (prior to Minute 45 capture)
    await vi.advanceTimersByTimeAsync(12 * 60 * 1000); // 42 minutes elapsed
    scheduler.stop(); // CBT Exam submission triggers immediate stop

    expect(scheduler.isRunning).toBe(false);

    // Advance past Minute 45, 60, etc. -> No new screenshots captured
    await vi.advanceTimersByTimeAsync(30 * 60 * 1000);
    expect(screenshotCaptures).toHaveLength(2);
    expect(scheduler.slots.has(3)).toBe(false); // Minute 45 was not scheduled
  });

  it('4. Screen-sharing interruption transitions status to SCREEN_SHARING_STOPPED and records missed slots', async () => {
    global.navigator.mediaDevices.getDisplayMedia.mockResolvedValueOnce(mockStream);

    const onScreenShareEnded = vi.fn();
    const manager = new ScreenRecordingManager({
      attemptId: 100,
      chunkIntervalMs: 5000,
      startSessionApi,
      uploadChunkApi,
      stopSessionApi,
      onScreenShareEnded,
    });

    await manager.start();
    expect(manager.status).toBe(RECORDING_STATUS.RECORDING);

    const missedSlots = [];
    const scheduler = new ScreenshotScheduler({
      attemptId: 100,
      sessionId: 'sim-sess-180',
      stream: manager.stream,
      intervalMs: 15 * 60 * 1000,
      maxScreenshots: 12,
      uploadScreenshotApi,
      recordMissedApi: vi.fn().mockImplementation(async (id, payload) => {
        missedSlots.push(payload);
      }),
    });

    scheduler.start();

    // Candidate stops screen sharing at Minute 10 (browser stop sharing button)
    const videoTrack = manager.stream.getVideoTracks()[0];
    videoTrack.stop(); // Triggers onended

    expect(manager.status).toBe(RECORDING_STATUS.SCREEN_SHARING_STOPPED);
    expect(onScreenShareEnded).toHaveBeenCalled();

    // Detach inactive stream from scheduler
    scheduler.setStream(null);

    // Advance to Minute 15 capture slot
    await vi.advanceTimersByTimeAsync(15 * 60 * 1000);

    // Verifies missed slot was recorded via API without corrupt or fake image upload
    expect(uploadScreenshotApi).not.toHaveBeenCalled();
    expect(missedSlots).toHaveLength(1);
    expect(missedSlots[0]).toEqual(
      expect.objectContaining({
        sequence_number: 1,
        scheduled_minute: 15,
        notes: expect.stringContaining('Screen sharing was stopped'),
      })
    );

    manager.destroy();
    scheduler.destroy();
  });

  it('5. Upload backpressure & retry handling under network failures', async () => {
    global.navigator.mediaDevices.getDisplayMedia.mockResolvedValueOnce(mockStream);

    // uploadChunkApi fails twice with network timeout, then succeeds on 3rd retry
    let callCount = 0;
    const flakeyUploadApi = vi.fn().mockImplementation(async () => {
      callCount += 1;
      if (callCount < 3) {
        throw new Error('Network timeout (simulated)');
      }
      return { success: true };
    });

    const manager = new ScreenRecordingManager({
      attemptId: 100,
      chunkIntervalMs: 5000,
      maxRetries: 3,
      retryDelayBaseMs: 100, // fast retry for test
      startSessionApi,
      uploadChunkApi: flakeyUploadApi,
      stopSessionApi,
    });

    await manager.start();

    // Simulate 1 recorded chunk
    manager.mediaRecorder.emitChunk();
    expect(manager.uploadQueue.length).toBe(1);

    // First attempt fails, waits 100ms backoff
    await vi.advanceTimersByTimeAsync(150);
    // Second attempt fails, waits 200ms backoff
    await vi.advanceTimersByTimeAsync(250);
    // Third attempt succeeds
    await vi.advanceTimersByTimeAsync(150);

    expect(callCount).toBe(3);
    expect(manager.stats.chunksUploaded).toBe(1);
    expect(manager.uploadQueue.length).toBe(0);

    manager.destroy();
  });

  it('6. Development environment configuration: 30-second interval via window.__TEST_SCREENSHOT_INTERVAL_MS', async () => {
    global.window.__TEST_SCREENSHOT_INTERVAL_MS = 30000; // 30 seconds for rapid dev test

    const captures = [];
    const scheduler = new ScreenshotScheduler({
      attemptId: 100,
      sessionId: 'dev-sess',
      stream: mockStream,
      intervalMs: global.window.__TEST_SCREENSHOT_INTERVAL_MS,
      maxScreenshots: 4,
      uploadScreenshotApi,
      recordMissedApi,
      onScreenshotCaptured: (data) => captures.push(data.sequenceNumber),
    });

    scheduler.start();
    expect(scheduler.intervalMs).toBe(30000);

    // Fast-forward 30 seconds -> Capture 1 triggers
    await vi.advanceTimersByTimeAsync(30000);
    expect(captures).toHaveLength(1);
    expect(captures[0]).toBe(1);

    // Fast-forward 30 seconds -> Capture 2 triggers
    await vi.advanceTimersByTimeAsync(30000);
    expect(captures).toHaveLength(2);
    expect(captures[1]).toBe(2);

    scheduler.destroy();
  });
});
