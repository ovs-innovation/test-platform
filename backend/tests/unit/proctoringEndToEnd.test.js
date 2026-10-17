import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock database query
vi.mock('../../src/config/db.js', () => ({
  query: vi.fn(),
}));

// Mock filesystem
vi.mock('fs', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    default: {
      ...actual,
      existsSync: vi.fn().mockReturnValue(true),
      promises: {
        ...actual.promises,
        mkdir: vi.fn().mockResolvedValue(undefined),
        writeFile: vi.fn().mockResolvedValue(undefined),
        stat: vi.fn().mockResolvedValue({ size: 1024 * 1024 }),
        unlink: vi.fn().mockResolvedValue(undefined),
      },
      createReadStream: vi.fn().mockReturnValue({
        pipe: vi.fn((dest) => dest.end?.()),
      }),
    },
  };
});

import { query } from '../../src/config/db.js';
import {
  startRecordingSession,
  uploadRecordingChunk,
  uploadProctoringScreenshot,
  recordMissedScreenshot,
  recordProctoringEvent,
  stopRecordingSession,
  finalizeRecordingSession,
  getRecordingPlaybackManifest,
  streamProctoringMedia,
  listProctoringSessions,
  getProctoringScreenshots,
} from '../../src/controllers/proctoringRecordingController.js';
import {
  generateSignedMediaToken,
  verifySignedMediaToken,
  buildSignedPlaybackUrl,
  purgeExpiredProctoringMedia,
} from '../../src/services/proctoringStorageService.js';

const callHandler = (handler, req, res, next) =>
  new Promise((resolve) => {
    const wrappedRes = {
      ...res,
      json: vi.fn((data) => {
        res.json?.(data);
        resolve({ type: 'json', data });
      }),
      status: vi.fn((code) => {
        res.status?.(code);
        return {
          json: vi.fn((data) => {
            res.json?.(data);
            resolve({ type: 'status_json', code, data });
          }),
          end: vi.fn(() => resolve({ type: 'status_end', code })),
        };
      }),
      end: vi.fn(() => resolve({ type: 'end' })),
      writeHead: vi.fn((...args) => {
        res.writeHead?.(...args);
        resolve({ type: 'writeHead', args });
      }),
      setHeader: vi.fn((...args) => res.setHeader?.(...args)),
    };
    const wrappedNext = vi.fn((err) => {
      next?.(err);
      resolve({ type: 'next', err });
    });
    handler(req, wrappedRes, wrappedNext);
  });

describe('End-to-End Proctoring Verification: 180-Minute CBT Lifecycle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('1. Verifies recording starts only for authorized candidate with active in-progress attempt', async () => {
    // Attempt not found
    query.mockResolvedValueOnce({ rows: [] });
    const reqNotFound = {
      params: { id: '999' },
      body: { session_id: 'sess-test-1', mime_type: 'video/webm' },
      user: { id: 101, role: 'candidate' },
    };
    const res = { json: vi.fn() };
    const next1 = vi.fn();
    await callHandler(startRecordingSession, reqNotFound, res, next1);
    expect(next1).toHaveBeenCalledWith(expect.objectContaining({ statusCode: 404 }));

    // Unauthorized candidate (attempt belongs to candidate 202, caller is candidate 101)
    query.mockResolvedValueOnce({
      rows: [{ id: 50, candidate_id: 202, assessment_id: 'neet-1', status: 'in_progress' }],
    });
    const reqForbidden = {
      params: { id: '50' },
      body: { session_id: 'sess-test-1', mime_type: 'video/webm' },
      user: { id: 101, role: 'candidate' },
    };
    const next2 = vi.fn();
    await callHandler(startRecordingSession, reqForbidden, res, next2);
    expect(next2).toHaveBeenCalledWith(expect.objectContaining({ statusCode: 403 }));

    // Attempt already submitted (cannot start recording)
    query.mockResolvedValueOnce({
      rows: [{ id: 50, candidate_id: 101, assessment_id: 'neet-1', status: 'completed' }],
    });
    const next3 = vi.fn();
    await callHandler(startRecordingSession, { ...reqForbidden, user: { id: 101 } }, res, next3);
    expect(next3).toHaveBeenCalledWith(expect.objectContaining({ statusCode: 400 }));

    // Valid start
    query
      .mockResolvedValueOnce({
        rows: [{ id: 50, candidate_id: 101, assessment_id: 'neet-1', status: 'in_progress' }],
      })
      .mockResolvedValueOnce({
        rows: [{ id: 1, session_id: 'sess-test-1', status: 'active', attempt_id: 50 }],
      })
      .mockResolvedValueOnce({ rows: [] }); // insert event

    const next4 = vi.fn();
    await callHandler(
      startRecordingSession,
      { params: { id: '50' }, body: { session_id: 'sess-test-1', mime_type: 'video/webm' }, user: { id: 101 } },
      res,
      next4
    );
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        session: expect.objectContaining({ session_id: 'sess-test-1', status: 'active' }),
      })
    );
  });

  it('2. Verifies chunks are uploaded and deduplicated idempotently on retries', async () => {
    // Attempt lookup
    const attemptRow = { id: 50, candidate_id: 101, assessment_id: 'neet-1', status: 'in_progress' };

    // First upload of chunk 1
    query
      .mockResolvedValueOnce({ rows: [attemptRow] })
      .mockResolvedValueOnce({ rows: [{ id: 1, chunk_index: 1, session_id: 'sess-test-1', upload_status: 'uploaded' }] })
      .mockResolvedValueOnce({ rows: [] }); // update session totals

    const reqChunk1 = {
      params: { id: '50' },
      body: { session_id: 'sess-test-1', chunk_index: '1', duration_ms: '5000' },
      file: { buffer: Buffer.from('mock-webm-chunk-1'), originalname: 'chunk_1.webm', mimetype: 'video/webm' },
      user: { id: 101 },
    };
    const res = { json: vi.fn() };
    const next = vi.fn();

    await callHandler(uploadRecordingChunk, reqChunk1, res, next);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        chunk_index: 1,
        session_id: 'sess-test-1',
      })
    );

    // Network retry of the same chunk 1 (idempotency verification)
    query
      .mockResolvedValueOnce({ rows: [attemptRow] })
      .mockResolvedValueOnce({ rows: [{ id: 1, chunk_index: 1, session_id: 'sess-test-1', upload_status: 'uploaded' }] })
      .mockResolvedValueOnce({ rows: [] });

    await callHandler(uploadRecordingChunk, reqChunk1, res, next);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        chunk_index: 1,
      })
    );
    // Verified: query uses ON CONFLICT (session_id, chunk_index) DO UPDATE
    expect(query).toHaveBeenCalledWith(
      expect.stringContaining('ON CONFLICT (session_id, chunk_index) DO UPDATE'),
      expect.any(Array)
    );
  });

  it('3. Verifies full 180-minute 12-screenshot schedule captures without duplicates', async () => {
    const attemptRow = { id: 50, candidate_id: 101, assessment_id: 'neet-1', status: 'in_progress' };

    // Simulate all 12 scheduled captures (minutes 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180)
    for (let seq = 1; seq <= 12; seq++) {
      const scheduledMinute = seq * 15;
      query
        .mockResolvedValueOnce({ rows: [attemptRow] })
        .mockResolvedValueOnce({
          rows: [
            {
              id: seq,
              attempt_id: 50,
              sequence_number: seq,
              scheduled_minute: scheduledMinute,
              status: 'captured',
            },
          ],
        });

      const reqShot = {
        params: { id: '50' },
        body: {
          session_id: 'sess-test-1',
          sequence_number: String(seq),
          scheduled_minute: String(scheduledMinute),
          captured_at: new Date(Date.now() + scheduledMinute * 60000).toISOString(),
          is_delayed: 'false',
          delay_seconds: '0',
        },
        file: { buffer: Buffer.from('mock-jpeg-screenshot'), originalname: `shot_${seq}.jpg`, mimetype: 'image/jpeg' },
        user: { id: 101 },
      };
      const res = { json: vi.fn() };
      const next = vi.fn();

      await callHandler(uploadProctoringScreenshot, reqShot, res, next);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          screenshot: expect.objectContaining({
            sequence_number: seq,
            scheduled_minute: scheduledMinute,
          }),
        })
      );
    }

    // Sequence 13 (beyond 180 minutes) must be rejected
    const reqShot13 = {
      params: { id: '50' },
      body: { session_id: 'sess-test-1', sequence_number: '13', scheduled_minute: '195' },
      file: { buffer: Buffer.from('mock'), originalname: 'shot_13.jpg' },
      user: { id: 101 },
    };
    const res = { json: vi.fn() };
    const next13 = vi.fn();
    await callHandler(uploadProctoringScreenshot, reqShot13, res, next13);
    expect(next13).toHaveBeenCalledWith(expect.objectContaining({ statusCode: 400 }));
  });

  it('4. Verifies early test submission stops recording and finalizes session', async () => {
    // Student submits exam at minute 45
    query
      .mockResolvedValueOnce({
        rows: [{ id: 50, candidate_id: 101, assessment_id: 'neet-1', status: 'in_progress' }],
      })
      .mockResolvedValueOnce({
        rowCount: 1,
        rows: [
          {
            session_id: 'sess-test-1',
            attempt_id: 50,
            status: 'completed',
            stop_reason: 'Candidate early submission',
            ended_at: new Date().toISOString(),
          },
        ],
      });

    const reqStop = {
      params: { id: '50' },
      body: { session_id: 'sess-test-1', status: 'completed', reason: 'Candidate early submission' },
      user: { id: 101 },
    };
    const res = { json: vi.fn() };
    const next = vi.fn();

    await callHandler(stopRecordingSession, reqStop, res, next);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        session: expect.objectContaining({
          status: 'completed',
          stop_reason: 'Candidate early submission',
        }),
      })
    );

    // Any screenshot attempted after submission is rejected
    query.mockResolvedValueOnce({
      rows: [{ id: 50, candidate_id: 101, status: 'completed' }], // attempt completed
    });
    const reqAfterSubmit = {
      params: { id: '50' },
      body: { session_id: 'sess-test-1', sequence_number: '4', scheduled_minute: '60' },
      file: { buffer: Buffer.from('mock'), originalname: 'shot.jpg' },
      user: { id: 101 },
    };
    const nextAfter = vi.fn();
    await callHandler(uploadProctoringScreenshot, reqAfterSubmit, res, nextAfter);
    expect(nextAfter).toHaveBeenCalledWith(expect.objectContaining({ statusCode: 400 }));
  });

  it('5. Verifies screen-sharing interruption logs events and missed screenshot records', async () => {
    // Interruption event logged
    query
      .mockResolvedValueOnce({
        rows: [{ id: 50, candidate_id: 101 }],
      })
      .mockResolvedValueOnce({
        rows: [{ id: 99, event_type: 'stream_inactive' }],
      });

    const reqEvent = {
      params: { id: '50' },
      body: {
        session_id: 'sess-test-1',
        event_type: 'stream_inactive',
        payload: { reason: 'User revoked display media permission' },
      },
      user: { id: 101 },
    };
    const res = { json: vi.fn() };
    const next = vi.fn();
    await callHandler(recordProctoringEvent, reqEvent, res, next);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        event: expect.objectContaining({ event_type: 'stream_inactive' }),
      })
    );

    // Missed screenshot recorded without fake image
    query
      .mockResolvedValueOnce({
        rows: [{ id: 50, candidate_id: 101, assessment_id: 'neet-1', status: 'in_progress' }],
      })
      .mockResolvedValueOnce({
        rows: [
          {
            id: 10,
            attempt_id: 50,
            sequence_number: 4,
            status: 'missed',
            notes: 'Permission revoked by candidate',
          },
        ],
      });

    const reqMissed = {
      params: { id: '50' },
      body: {
        session_id: 'sess-test-1',
        sequence_number: 4,
        scheduled_minute: 60,
        reason: 'Permission revoked by candidate',
      },
      user: { id: 101 },
    };
    await callHandler(recordMissedScreenshot, reqMissed, res, next);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        screenshot: expect.objectContaining({
          status: 'missed',
        }),
      })
    );
  });

  it('6. Verifies browser refresh / incomplete sessions remain incomplete and not falsely finalized', async () => {
    // Session list computes 'upload_pending' or 'incomplete'
    query
      .mockResolvedValueOnce({ rows: [{ total: 1 }] })
      .mockResolvedValueOnce({
        rows: [
          {
            id: 1,
            session_id: 'sess-unfinalized',
            attempt_id: 50,
            candidate_id: 101,
            session_status: 'active',
            attempt_status: 'submitted', // student submitted but session wasn't finalized
            chunk_count: 8,
            failed_chunk_count: 0,
            is_finalized: false,
          },
        ],
      });

    const reqList = {
      user: { id: 1, role: 'admin' },
      query: { attempt_id: '50' },
    };
    const res = { json: vi.fn() };
    const next = vi.fn();

    await callHandler(listProctoringSessions, reqList, res, next);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        sessions: expect.arrayContaining([
          expect.objectContaining({
            session_id: 'sess-unfinalized',
            computed_state: 'upload_pending', // Not finalized!
            is_finalized: false,
          }),
        ]),
      })
    );
  });

  it('7. Verifies unauthorized access and cross-tenant isolation are rejected', async () => {
    // Candidate 102 tries to view Candidate 101's manifest
    query.mockResolvedValueOnce({
      rows: [{ id: 50, candidate_id: 101, candidate_institution_id: 10 }],
    });

    const reqManifestOther = {
      params: { id: '50' },
      query: {},
      user: { id: 102, role: 'candidate' },
    };
    const res = { json: vi.fn() };
    const next1 = vi.fn();
    await callHandler(getRecordingPlaybackManifest, reqManifestOther, res, next1);
    expect(next1).toHaveBeenCalledWith(expect.objectContaining({ statusCode: 403 }));

    // Institution Admin for Institution 99 tries to access Attempt of Institution 10
    query.mockResolvedValueOnce({
      rows: [{ id: 50, candidate_id: 101, candidate_institution_id: 10 }],
    });
    const reqInstAdmin = {
      params: { id: '50' },
      query: {},
      user: { id: 9, role: 'institution_admin', institution_id: 99 },
    };
    const next2 = vi.fn();
    await callHandler(getRecordingPlaybackManifest, reqInstAdmin, res, next2);
    expect(next2).toHaveBeenCalledWith(expect.objectContaining({ statusCode: 403 }));
  });

  it('8. Verifies signed media streaming, Range partial content (HTTP 206), and token security', async () => {
    const token = generateSignedMediaToken({
      type: 'chunk',
      attemptId: 50,
      sessionId: 'sess-test-1',
      filePath: 'uploads/proctoring/videos/attempt_50/chunk_00001.webm',
      expiresInSeconds: 60,
    });

    // Valid range streaming request
    const reqRange = {
      params: { id: '50' },
      query: { token },
      headers: { range: 'bytes=0-1023' },
    };
    const res = {
      writeHead: vi.fn(),
      setHeader: vi.fn(),
      end: vi.fn(),
    };
    const next = vi.fn();

    await callHandler(streamProctoringMedia, reqRange, res, next);
    expect(res.writeHead).toHaveBeenCalledWith(206, expect.objectContaining({
      'Content-Range': 'bytes 0-1023/1048576',
      'Accept-Ranges': 'bytes',
    }));

    // Tampered token rejected
    const reqTampered = {
      params: { id: '50' },
      query: { token: token + 'invalid' },
      headers: {},
    };
    const nextTampered = vi.fn();
    await callHandler(streamProctoringMedia, reqTampered, res, nextTampered);
    expect(nextTampered).toHaveBeenCalledWith(expect.objectContaining({ statusCode: 401 }));

    // Token for different attempt rejected
    const reqWrongAttempt = {
      params: { id: '99' }, // does not match attempt 50 in token
      query: { token },
      headers: {},
    };
    const nextWrong = vi.fn();
    await callHandler(streamProctoringMedia, reqWrongAttempt, res, nextWrong);
    expect(nextWrong).toHaveBeenCalledWith(expect.objectContaining({ statusCode: 403 }));
  });

  it('9. Verifies configurable retention policy and automated media purge', async () => {
    query
      .mockResolvedValueOnce({
        rows: [
          {
            session_id: 'sess-expired-1',
            attempt_id: 10,
          },
        ],
      }) // expired sessions
      .mockResolvedValueOnce({ rowCount: 1 }) // update chunks
      .mockResolvedValueOnce({ rowCount: 1 }) // update screenshots
      .mockResolvedValueOnce({ rowCount: 1 }); // update sessions

    const purgeResult = await purgeExpiredProctoringMedia({ retentionDays: 30 });
    expect(purgeResult.purgedSessionsCount).toBe(1);
    expect(purgeResult.retentionDays).toBe(30);
  });
});
