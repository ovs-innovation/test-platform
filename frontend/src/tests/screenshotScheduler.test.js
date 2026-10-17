import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  ScreenshotScheduler,
  SCREENSHOT_INTERVAL_MS,
  MAX_SCHEDULED_SCREENSHOTS,
} from '../lib/screenshotScheduler.js';

class MockTrack {
  constructor(kind = 'video', readyState = 'live') {
    this.kind = kind;
    this.readyState = readyState;
  }
  stop() {
    this.readyState = 'ended';
  }
}

class MockStream {
  constructor(active = true) {
    this.tracks = [new MockTrack('video', active ? 'live' : 'ended')];
  }
  getVideoTracks() {
    return this.tracks.filter((t) => t.kind === 'video');
  }
}

describe('ScreenshotScheduler', () => {
  let mockUploadApi;
  let mockRecordMissedApi;
  let mockStream;
  let onCaptured;
  let onMissed;
  let onError;

  beforeEach(() => {
    vi.useFakeTimers();
    mockUploadApi = vi.fn().mockResolvedValue({ success: true });
    mockRecordMissedApi = vi.fn().mockResolvedValue({ success: true });
    mockStream = new MockStream(true);
    onCaptured = vi.fn();
    onMissed = vi.fn();
    onError = vi.fn();

    // Ensure FormData is available in Node/Vitest
    if (typeof globalThis.FormData === 'undefined') {
      globalThis.FormData = class {
        constructor() {
          this.data = {};
        }
        append(k, v) {
          this.data[k] = v;
        }
      };
    }

    globalThis.__TEST_SCREENSHOT_INTERVAL_MS = 15 * 60 * 1000;
  });

  afterEach(() => {
    delete globalThis.__TEST_SCREENSHOT_INTERVAL_MS;
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('case 1: 15-minute schedule fires at exact 15-minute intervals (15m, 30m)', async () => {
    const startTime = Date.now();
    const scheduler = new ScreenshotScheduler({
      attemptId: 101,
      sessionId: 'sess-abc',
      stream: mockStream,
      startTime,
      uploadScreenshotApi: mockUploadApi,
      recordMissedApi: mockRecordMissedApi,
      onScreenshotCaptured: onCaptured,
      onScreenshotMissed: onMissed,
      onError,
    });

    scheduler.start();

    // Advance 14 minutes -> no capture yet
    await vi.advanceTimersByTimeAsync(14 * 60 * 1000);
    expect(mockUploadApi).not.toHaveBeenCalled();
    expect(onCaptured).not.toHaveBeenCalled();

    // Advance to 15th minute (900,000 ms)
    await vi.advanceTimersByTimeAsync(1 * 60 * 1000);
    expect(mockUploadApi).toHaveBeenCalledTimes(1);
    expect(onCaptured).toHaveBeenCalledWith(
      expect.objectContaining({
        sequenceNumber: 1,
        scheduledMinute: 15,
        isDelayed: false,
      })
    );

    // Advance another 15 minutes to 30th minute
    await vi.advanceTimersByTimeAsync(15 * 60 * 1000);
    expect(mockUploadApi).toHaveBeenCalledTimes(2);
    expect(onCaptured).toHaveBeenCalledWith(
      expect.objectContaining({
        sequenceNumber: 2,
        scheduledMinute: 30,
        isDelayed: false,
      })
    );

    scheduler.destroy();
  });

  it('case 2: 3-hour boundary -> exactly 12 screenshots maximum, no capture after 180 minutes', async () => {
    const startTime = Date.now();
    const scheduler = new ScreenshotScheduler({
      attemptId: 101,
      sessionId: 'sess-abc',
      stream: mockStream,
      startTime,
      uploadScreenshotApi: mockUploadApi,
      recordMissedApi: mockRecordMissedApi,
      onScreenshotCaptured: onCaptured,
    });

    scheduler.start();

    // Fast-forward through the full 180 minutes in 15-minute increments
    for (let minute = 15; minute <= 180; minute += 15) {
      await vi.advanceTimersByTimeAsync(15 * 60 * 1000);
    }

    expect(mockUploadApi).toHaveBeenCalledTimes(12);
    expect(onCaptured).toHaveBeenCalledTimes(12);
    expect(scheduler.capturedCount).toBe(12);

    // Advance further to minute 195 (3h 15m) -> should NOT capture a 13th screenshot
    await vi.advanceTimersByTimeAsync(15 * 60 * 1000);
    expect(mockUploadApi).toHaveBeenCalledTimes(12);
    expect(scheduler.capturedCount).toBe(12);

    scheduler.destroy();
  });

  it('case 3: early submission -> stops schedule immediately, prevents any captures after submit', async () => {
    const startTime = Date.now();
    const scheduler = new ScreenshotScheduler({
      attemptId: 101,
      sessionId: 'sess-abc',
      stream: mockStream,
      startTime,
      uploadScreenshotApi: mockUploadApi,
      recordMissedApi: mockRecordMissedApi,
      onScreenshotCaptured: onCaptured,
    });

    scheduler.start();

    // Advance to 15m -> 1st screenshot captured
    await vi.advanceTimersByTimeAsync(15 * 60 * 1000);
    expect(mockUploadApi).toHaveBeenCalledTimes(1);

    // Candidate submits test early at minute 22
    await vi.advanceTimersByTimeAsync(7 * 60 * 1000);
    scheduler.stop(); // triggered on test submit

    // Advance past minute 30, 45, 60...
    await vi.advanceTimersByTimeAsync(60 * 60 * 1000);

    // No additional screenshots must ever be captured
    expect(mockUploadApi).toHaveBeenCalledTimes(1);
    expect(onCaptured).toHaveBeenCalledTimes(1);

    scheduler.destroy();
  });

  it('case 4: duplicate-timer prevention -> multiple start() calls do not spawn duplicate timers', async () => {
    const scheduler = new ScreenshotScheduler({
      attemptId: 101,
      sessionId: 'sess-abc',
      stream: mockStream,
      uploadScreenshotApi: mockUploadApi,
      onScreenshotCaptured: onCaptured,
    });

    // Call start 4 times consecutively
    scheduler.start();
    scheduler.start();
    scheduler.start();
    scheduler.start();

    // Advance to 15 minutes
    await vi.advanceTimersByTimeAsync(15 * 60 * 1000);

    // Exactly 1 upload should have occurred, not 4
    expect(mockUploadApi).toHaveBeenCalledTimes(1);
    expect(onCaptured).toHaveBeenCalledTimes(1);

    scheduler.destroy();
  });

  it('case 5: interrupted screen sharing -> does not capture blank images when stream stopped', async () => {
    // Inactive stream
    const inactiveStream = new MockStream(false);
    inactiveStream.tracks[0].stop();

    const scheduler = new ScreenshotScheduler({
      attemptId: 101,
      sessionId: 'sess-abc',
      stream: inactiveStream,
      uploadScreenshotApi: mockUploadApi,
      recordMissedApi: mockRecordMissedApi,
      onScreenshotCaptured: onCaptured,
      onScreenshotMissed: onMissed,
    });

    scheduler.start();

    // Advance to 15 minutes while screen share is stopped
    await vi.advanceTimersByTimeAsync(15 * 60 * 1000);

    // Must NOT upload a blank screenshot
    expect(mockUploadApi).not.toHaveBeenCalled();
    // Must record slot as missed
    expect(onMissed).toHaveBeenCalledWith(
      expect.objectContaining({
        sequenceNumber: 1,
        scheduledMinute: 15,
        reason: 'Stream inactive',
      })
    );
    expect(mockRecordMissedApi).toHaveBeenCalledWith(
      101,
      expect.objectContaining({
        session_id: 'sess-abc',
        sequence_number: 1,
        scheduled_minute: 15,
      })
    );

    scheduler.destroy();
  });

  it('case 6: background tab throttling & sleep recovery -> records missed slot without fake burst', async () => {
    const startTime = Date.now();
    const scheduler = new ScreenshotScheduler({
      attemptId: 101,
      sessionId: 'sess-abc',
      stream: mockStream,
      startTime,
      uploadScreenshotApi: mockUploadApi,
      recordMissedApi: mockRecordMissedApi,
      onScreenshotCaptured: onCaptured,
      onScreenshotMissed: onMissed,
    });

    scheduler.start();

    // Simulate system suspension / lid close: jump clock forward by 35 minutes
    vi.setSystemTime(startTime + 35 * 60 * 1000);
    // Heartbeat wakes up and checks schedule
    await scheduler._checkSchedule();

    // Slot 1 (minute 15) was completely missed during sleep
    expect(onMissed).toHaveBeenCalledWith(
      expect.objectContaining({
        sequenceNumber: 1,
        scheduledMinute: 15,
      })
    );
    expect(mockRecordMissedApi).toHaveBeenCalledWith(
      101,
      expect.objectContaining({
        sequence_number: 1,
        scheduled_minute: 15,
      })
    );

    // Slot 2 is captured right now at minute 35, flagged as delayed
    expect(mockUploadApi).toHaveBeenCalledTimes(1);
    expect(onCaptured).toHaveBeenCalledWith(
      expect.objectContaining({
        sequenceNumber: 2,
        scheduledMinute: 30,
        isDelayed: true,
      })
    );

    // Did NOT burst 2 screenshot uploads for the same moment
    expect(mockUploadApi).toHaveBeenCalledTimes(1);

    scheduler.destroy();
  });

  it('case 7: full resource cleanup on destroy()', () => {
    const scheduler = new ScreenshotScheduler({
      attemptId: 101,
      sessionId: 'sess-abc',
      stream: mockStream,
    });

    scheduler.start();
    expect(scheduler.isRunning).toBe(true);
    expect(scheduler.timerId).toBeDefined();

    scheduler.destroy();

    expect(scheduler.isRunning).toBe(false);
    expect(scheduler.timerId).toBeNull();
    expect(scheduler.heartbeatTimerId).toBeNull();
    expect(scheduler.stream).toBeNull();
  });
});
