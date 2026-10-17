import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock DB query before importing controller
vi.mock('../../src/config/db.js', () => {
  return {
    query: vi.fn(),
  };
});

import { query } from '../../src/config/db.js';
import {
  startRecordingSession,
  uploadRecordingChunk,
  stopRecordingSession,
  getRecordingSessionStatus,
  uploadProctoringScreenshot,
  recordMissedScreenshot,
  getProctoringScreenshots,
  getProctoringScreenshotFile,
  getRecordingPlaybackManifest,
  listProctoringSessions,
} from '../../src/controllers/proctoringRecordingController.js';

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
        return wrappedRes;
      }),
    };
    const wrappedNext = vi.fn((err) => {
      next?.(err);
      resolve({ type: 'next', err });
    });
    handler(req, wrappedRes, wrappedNext);
  });

describe('proctoringRecordingController', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('startRecordingSession', () => {
    it('throws badRequest if session_id is missing', async () => {
      const req = {
        params: { id: '10' },
        body: {},
        user: { id: 101 },
      };
      const res = { json: vi.fn() };
      const next = vi.fn();

      await callHandler(startRecordingSession, req, res, next);
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'session_id is required', statusCode: 400 })
      );
    });

    it('rejects if attempt is not found', async () => {
      query.mockResolvedValueOnce({ rows: [] }); // attempt not found

      const req = {
        params: { id: '99' },
        body: { session_id: 'test-uuid-1' },
        user: { id: 101 },
      };
      const res = { json: vi.fn() };
      const next = vi.fn();

      await callHandler(startRecordingSession, req, res, next);
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Attempt not found', statusCode: 404 })
      );
    });

    it('rejects if attempt does not belong to candidate', async () => {
      query.mockResolvedValueOnce({
        rows: [{ id: 10, assessment_id: 5, candidate_id: 999, status: 'in_progress' }],
      });

      const req = {
        params: { id: '10' },
        body: { session_id: 'test-uuid-1' },
        user: { id: 101 },
      };
      const res = { json: vi.fn() };
      const next = vi.fn();

      await callHandler(startRecordingSession, req, res, next);
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Unauthorized access to attempt', statusCode: 403 })
      );
    });

    it('successfully starts a recording session for valid in-progress attempt', async () => {
      query
        .mockResolvedValueOnce({
          rows: [{ id: 10, assessment_id: 5, candidate_id: 101, status: 'in_progress' }],
        })
        .mockResolvedValueOnce({
          rows: [{ session_id: 'test-uuid-1', attempt_id: 10, candidate_id: 101, status: 'active' }],
        });

      const req = {
        params: { id: '10' },
        body: { session_id: 'test-uuid-1', mime_type: 'video/webm;codecs=vp9' },
        user: { id: 101 },
      };
      const res = { json: vi.fn() };
      const next = vi.fn();

      await callHandler(startRecordingSession, req, res, next);

      expect(query).toHaveBeenCalledTimes(3);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          session: expect.objectContaining({ session_id: 'test-uuid-1', status: 'active' }),
        })
      );
    });
  });

  describe('uploadRecordingChunk', () => {
    it('validates required fields (session_id, positive chunk_index, file buffer)', async () => {
      const req = {
        params: { id: '10' },
        body: { session_id: 'sess-1', chunk_index: '0' }, // invalid chunk_index < 1
        file: { buffer: Buffer.from('test') },
        user: { id: 101 },
      };
      const res = { json: vi.fn() };
      const next = vi.fn();

      await callHandler(uploadRecordingChunk, req, res, next);
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Valid positive integer chunk_index is required', statusCode: 400 })
      );
    });

    it('rejects if file data is missing', async () => {
      const req = {
        params: { id: '10' },
        body: { session_id: 'sess-1', chunk_index: '1' },
        file: null,
        user: { id: 101 },
      };
      const res = { json: vi.fn() };
      const next = vi.fn();

      await callHandler(uploadRecordingChunk, req, res, next);
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Recording chunk file data is required', statusCode: 400 })
      );
    });

    it('persists chunk file and upserts chunk record idempotently', async () => {
      query
        .mockResolvedValueOnce({
          rows: [{ id: 10, candidate_id: 101, status: 'in_progress' }],
        }) // attempt
        .mockResolvedValueOnce({
          rowCount: 1,
          rows: [{ id: 1, session_id: 'sess-1', status: 'active' }],
        }) // session
        .mockResolvedValueOnce({ rowCount: 1 }) // chunk upsert
        .mockResolvedValueOnce({ rowCount: 1 }); // aggregate update

      const req = {
        params: { id: '10' },
        body: { session_id: 'sess-1', chunk_index: '1', duration_ms: '5000' },
        file: {
          buffer: Buffer.from('mock-webm-video-bytes'),
          mimetype: 'video/webm',
        },
        user: { id: 101 },
      };
      const res = { json: vi.fn() };
      const next = vi.fn();

      await callHandler(uploadRecordingChunk, req, res, next);

      expect(query).toHaveBeenCalledTimes(4);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          session_id: 'sess-1',
          chunk_index: 1,
          bytes_received: Buffer.from('mock-webm-video-bytes').length,
          file_url: expect.stringContaining('/uploads/proctoring/recordings/10/sess-1/chunk_00001.webm'),
        })
      );
    });
  });

  describe('stopRecordingSession', () => {
    it('updates session status, stop reason, and records ended_at', async () => {
      query
        .mockResolvedValueOnce({
          rows: [{ id: 10, candidate_id: 101 }],
        }) // attempt
        .mockResolvedValueOnce({
          rowCount: 1,
          rows: [
            {
              session_id: 'sess-1',
              attempt_id: 10,
              status: 'completed',
              stop_reason: 'Candidate submitted exam',
            },
          ],
        }); // updated session

      const req = {
        params: { id: '10' },
        body: { session_id: 'sess-1', status: 'completed', reason: 'Candidate submitted exam' },
        user: { id: 101 },
      };
      const res = { json: vi.fn() };
      const next = vi.fn();

      await callHandler(stopRecordingSession, req, res, next);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          session: expect.objectContaining({
            status: 'completed',
            stop_reason: 'Candidate submitted exam',
          }),
        })
      );
    });
  });

  describe('getRecordingSessionStatus', () => {
    it('returns session and ordered chunk sequence', async () => {
      query
        .mockResolvedValueOnce({
          rows: [{ id: 10, candidate_id: 101 }],
        }) // attempt
        .mockResolvedValueOnce({
          rowCount: 1,
          rows: [{ session_id: 'sess-1', status: 'active', total_chunks: 2 }],
        }) // session
        .mockResolvedValueOnce({
          rows: [
            { chunk_index: 1, file_url: '/uploads/chunk_00001.webm', duration_ms: 5000 },
            { chunk_index: 2, file_url: '/uploads/chunk_00002.webm', duration_ms: 5000 },
          ],
        }); // chunks

      const req = {
        params: { id: '10' },
        query: { session_id: 'sess-1' },
        user: { id: 101, role: 'candidate' },
      };
      const res = { json: vi.fn() };
      const next = vi.fn();

      await callHandler(getRecordingSessionStatus, req, res, next);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          session: expect.objectContaining({ session_id: 'sess-1' }),
          chunks: expect.arrayContaining([
            expect.objectContaining({ chunk_index: 1 }),
            expect.objectContaining({ chunk_index: 2 }),
          ]),
        })
      );
    });
  });

  describe('uploadProctoringScreenshot', () => {
    it('validates sequence_number bounds (1 to 12)', async () => {
      const req = {
        params: { id: '10' },
        body: { session_id: 'sess-1', sequence_number: '13' },
        file: { buffer: Buffer.from('fake-jpeg-bytes'), mimetype: 'image/jpeg' },
        user: { id: 101 },
      };
      const res = { json: vi.fn() };
      const next = vi.fn();

      await callHandler(uploadProctoringScreenshot, req, res, next);
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'sequence_number must be an integer between 1 and 12', statusCode: 400 })
      );
    });

    it('rejects if screenshot file is missing', async () => {
      const req = {
        params: { id: '10' },
        body: { session_id: 'sess-1', sequence_number: '1' },
        file: null,
        user: { id: 101 },
      };
      const res = { json: vi.fn() };
      const next = vi.fn();

      await callHandler(uploadProctoringScreenshot, req, res, next);
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Screenshot file data is required', statusCode: 400 })
      );
    });

    it('rejects if attempt is already completed (no screenshots after submit)', async () => {
      query.mockResolvedValueOnce({
        rows: [{ id: 10, assessment_id: 1, candidate_id: 101, status: 'submitted' }],
      });

      const req = {
        params: { id: '10' },
        body: { session_id: 'sess-1', sequence_number: '1' },
        file: { buffer: Buffer.from('fake-jpeg-bytes'), mimetype: 'image/jpeg' },
        user: { id: 101 },
      };
      const res = { json: vi.fn() };
      const next = vi.fn();

      await callHandler(uploadProctoringScreenshot, req, res, next);
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Screenshots cannot be uploaded after attempt has ended', statusCode: 400 })
      );
    });

    it('successfully uploads and stores screenshot with sequence number and delay metadata', async () => {
      query
        .mockResolvedValueOnce({
          rows: [{ id: 10, assessment_id: 1, candidate_id: 101, status: 'in_progress' }],
        })
        .mockResolvedValueOnce({
          rows: [
            {
              id: 1,
              sequence_number: 1,
              scheduled_minute: 15,
              file_url: '/uploads/proctoring/screenshots/10/sess-1/screenshot_seq_01.jpg',
              status: 'captured',
            },
          ],
        });

      const req = {
        params: { id: '10' },
        body: {
          session_id: 'sess-1',
          sequence_number: '1',
          scheduled_minute: '15',
          is_delayed: 'false',
          delay_seconds: '0',
        },
        file: { buffer: Buffer.from('fake-jpeg-bytes'), mimetype: 'image/jpeg' },
        user: { id: 101 },
      };
      const res = { json: vi.fn() };
      const next = vi.fn();

      await callHandler(uploadProctoringScreenshot, req, res, next);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          screenshot: expect.objectContaining({
            sequence_number: 1,
            scheduled_minute: 15,
            status: 'captured',
          }),
        })
      );
    });
  });

  describe('recordMissedScreenshot', () => {
    it('records missed slot without requiring fake file upload', async () => {
      query
        .mockResolvedValueOnce({
          rows: [{ id: 10, assessment_id: 1, candidate_id: 101, status: 'in_progress' }],
        })
        .mockResolvedValueOnce({
          rows: [
            {
              id: 2,
              sequence_number: 3,
              scheduled_minute: 45,
              status: 'missed',
              notes: 'Missed due to tab sleep',
            },
          ],
        });

      const req = {
        params: { id: '10' },
        body: {
          session_id: 'sess-1',
          sequence_number: '3',
          scheduled_minute: '45',
          notes: 'Missed due to tab sleep',
        },
        user: { id: 101 },
      };
      const res = { json: vi.fn() };
      const next = vi.fn();

      await callHandler(recordMissedScreenshot, req, res, next);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          screenshot: expect.objectContaining({
            sequence_number: 3,
            status: 'missed',
          }),
        })
      );
    });
  });

  describe('getProctoringScreenshots', () => {
    it('returns sorted screenshots for an assessment attempt', async () => {
      query
        .mockResolvedValueOnce({
          rows: [{ id: 10, candidate_id: 101 }],
        })
        .mockResolvedValueOnce({
          rows: [
            { sequence_number: 1, scheduled_minute: 15, status: 'captured' },
            { sequence_number: 2, scheduled_minute: 30, status: 'captured' },
          ],
        });

      const req = {
        params: { id: '10' },
        user: { id: 1, role: 'admin' },
      };
      const res = { json: vi.fn() };
      const next = vi.fn();

      await callHandler(getProctoringScreenshots, req, res, next);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          screenshots: expect.arrayContaining([
            expect.objectContaining({ sequence_number: 1 }),
            expect.objectContaining({ sequence_number: 2 }),
          ]),
        })
      );
    });
  });

  describe('recordProctoringEvent', () => {
    it('validates event_type and logs stream_interrupted event', async () => {
      query
        .mockResolvedValueOnce({
          rows: [{ id: 10, assessment_id: 1, candidate_id: 101, status: 'in_progress' }],
        })
        .mockResolvedValueOnce({
          rows: [{ id: 1, event_type: 'stream_interrupted', session_id: 'sess-1' }],
        })
        .mockResolvedValueOnce({ rowCount: 1 }); // session status update

      const req = {
        params: { id: '10' },
        body: { session_id: 'sess-1', event_type: 'stream_interrupted', payload: { reason: 'user_stopped' } },
        user: { id: 101 },
      };
      const res = { json: vi.fn() };
      const next = vi.fn();

      const { recordProctoringEvent } = await import('../../src/controllers/proctoringRecordingController.js');
      await callHandler(recordProctoringEvent, req, res, next);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          event: expect.objectContaining({ event_type: 'stream_interrupted' }),
        })
      );
    });
  });

  describe('getRecordingPlaybackManifest', () => {
    it('generates playback manifest with ordered chunks and signed playback URLs', async () => {
      query
        .mockResolvedValueOnce({
          rows: [{ id: 10, candidate_id: 101 }],
        }) // attempt
        .mockResolvedValueOnce({
          rowCount: 1,
          rows: [{ id: 1, session_id: 'sess-1', attempt_id: 10, mime_type: 'video/webm', status: 'completed' }],
        }) // session
        .mockResolvedValueOnce({
          rows: [
            { id: 1, chunk_index: 1, file_path: '/fake/chunk_1.webm', file_size_bytes: 1000, duration_ms: 5000, mime_type: 'video/webm', is_purged: false },
            { id: 2, chunk_index: 2, file_path: '/fake/chunk_2.webm', file_size_bytes: 1200, duration_ms: 5000, mime_type: 'video/webm', is_purged: false },
          ],
        }) // chunks
        .mockResolvedValueOnce({
          rows: [
            { id: 1, sequence_number: 1, scheduled_minute: 15, file_path: '/fake/shot_1.jpg', file_size_bytes: 2000, mime_type: 'image/jpeg', is_delayed: false, delay_seconds: 0, status: 'captured', is_purged: false },
          ],
        }) // screenshots
        .mockResolvedValueOnce({
          rows: [
            { id: 1, event_type: 'stream_interrupted', payload: {}, occurred_at: new Date() },
          ],
        }); // events

      const req = {
        params: { id: '10' },
        query: { session_id: 'sess-1' },
        protocol: 'http',
        get: vi.fn().mockReturnValue('localhost:5000'),
        user: { id: 1, role: 'admin' },
      };
      const res = { json: vi.fn() };
      const next = vi.fn();

      const { getRecordingPlaybackManifest } = await import('../../src/controllers/proctoringRecordingController.js');
      await callHandler(getRecordingPlaybackManifest, req, res, next);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          session: expect.objectContaining({ session_id: 'sess-1' }),
          chunks: expect.arrayContaining([
            expect.objectContaining({
              chunk_index: 1,
              playback_url: expect.stringContaining('/api/attempts/10/proctoring/media?token='),
            }),
            expect.objectContaining({
              chunk_index: 2,
              playback_url: expect.stringContaining('/api/attempts/10/proctoring/media?token='),
            }),
          ]),
          screenshots: expect.arrayContaining([
            expect.objectContaining({
              sequence_number: 1,
              playback_url: expect.stringContaining('/api/attempts/10/proctoring/media?token='),
            }),
          ]),
          events: expect.arrayContaining([
            expect.objectContaining({ event_type: 'stream_interrupted' }),
          ]),
        })
      );
    });
  });

  describe('Signed Media Token Security', () => {
    it('generates and verifies valid token, rejects expired or tampered tokens', async () => {
      const { generateSignedMediaToken, verifySignedMediaToken } = await import(
        '../../src/services/proctoringStorageService.js'
      );

      const token = generateSignedMediaToken({
        type: 'chunk',
        attemptId: 10,
        sessionId: 'sess-1',
        filePath: '/uploads/chunk_01.webm',
        expiresInSeconds: 60,
      });

      expect(typeof token).toBe('string');
      expect(token).toContain('.');

      const verified = verifySignedMediaToken(token);
      expect(verified.attemptId).toBe(10);
      expect(verified.sessionId).toBe('sess-1');
      expect(verified.filePath).toBe('/uploads/chunk_01.webm');

      // Tampered signature
      expect(() => verifySignedMediaToken(token + 'tampered')).toThrow(/signature/i);

      // Expired token
      const expiredToken = generateSignedMediaToken({
        type: 'chunk',
        attemptId: 10,
        sessionId: 'sess-1',
        filePath: '/uploads/chunk_01.webm',
        expiresInSeconds: -10, // already expired
      });
      expect(() => verifySignedMediaToken(expiredToken)).toThrow(/expired/i);
    });
  });

  describe('listProctoringSessions', () => {
    it('rejects unauthorized candidate from listing sessions', async () => {
      const req = { user: { id: 101, role: 'candidate' }, query: {} };
      const res = { json: vi.fn() };
      const next = vi.fn();

      await callHandler(listProctoringSessions, req, res, next);
      expect(next).toHaveBeenCalledWith(expect.objectContaining({ statusCode: 403 }));
    });

    it('allows admin to list and filter proctoring sessions with pagination and computed states', async () => {
      query
        .mockResolvedValueOnce({ rows: [{ total: 2 }] }) // count query
        .mockResolvedValueOnce({
          rows: [
            {
              id: 1,
              session_id: 'sess-100',
              attempt_id: 10,
              candidate_id: 101,
              assessment_id: 'test-1',
              session_status: 'active',
              attempt_status: 'in_progress',
              candidate_name: 'John Doe',
              candidate_email: 'john@example.com',
              assessment_title: 'NEET Mock 1',
              chunk_count: 5,
              failed_chunk_count: 0,
              screenshot_count: 3,
              interruption_count: 0,
              started_at: '2026-10-16T10:00:00Z',
              ended_at: null,
            },
            {
              id: 2,
              session_id: 'sess-200',
              attempt_id: 11,
              candidate_id: 102,
              assessment_id: 'test-1',
              session_status: 'completed',
              attempt_status: 'completed',
              candidate_name: 'Jane Smith',
              candidate_email: 'jane@example.com',
              assessment_title: 'NEET Mock 1',
              is_finalized: true,
              chunk_count: 12,
              failed_chunk_count: 0,
              screenshot_count: 12,
              interruption_count: 1,
              started_at: '2026-10-16T08:00:00Z',
              ended_at: '2026-10-16T11:00:00Z',
            },
          ],
        }); // data query

      const req = {
        user: { id: 1, role: 'admin' },
        query: { assessment_id: 'test-1', page: '1', limit: '10' },
      };
      const res = { json: vi.fn() };
      const next = vi.fn();

      await callHandler(listProctoringSessions, req, res, next);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          sessions: expect.arrayContaining([
            expect.objectContaining({
              session_id: 'sess-100',
              computed_state: 'recording_in_progress',
            }),
            expect.objectContaining({
              session_id: 'sess-200',
              computed_state: 'finalized',
              duration_seconds: 10800,
            }),
          ]),
          pagination: {
            page: 1,
            limit: 10,
            total: 2,
            total_pages: 1,
          },
        })
      );
    });

    it('enforces tenant isolation for institution admin', async () => {
      query
        .mockResolvedValueOnce({ rows: [{ total: 0 }] })
        .mockResolvedValueOnce({ rows: [] });

      const req = {
        user: { id: 5, role: 'institution_admin', institution_id: 42 },
        query: { search: 'John' },
      };
      const res = { json: vi.fn() };
      const next = vi.fn();

      await callHandler(listProctoringSessions, req, res, next);

      // Verify that query called with institution parameter
      expect(query).toHaveBeenCalledWith(
        expect.stringContaining('u.institution_id = $1'),
        expect.arrayContaining([42])
      );
    });

    it('rejects cross-institution access when viewing playback manifest', async () => {
      query.mockResolvedValueOnce({
        rows: [
          {
            id: 25,
            candidate_id: 200,
            candidate_institution_id: 99, // different institution!
          },
        ],
      });

      const req = {
        params: { id: '25' },
        query: {},
        user: { id: 5, role: 'institution_admin', institution_id: 42 },
        protocol: 'http',
        get: vi.fn().mockReturnValue('localhost:5000'),
      };
      const res = { json: vi.fn() };
      const next = vi.fn();

      await callHandler(getRecordingPlaybackManifest, req, res, next);
      expect(next).toHaveBeenCalledWith(expect.objectContaining({ statusCode: 403 }));
    });
  });
});


