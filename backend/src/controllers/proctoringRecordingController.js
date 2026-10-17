import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { env } from '../config/env.js';
import { query } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import {
  proctoringDirs,
  generateSignedMediaToken,
  verifySignedMediaToken,
  buildSignedPlaybackUrl,
  finalizeRecordingSessionFiles,
  purgeExpiredProctoringMedia,
} from '../services/proctoringStorageService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer memory storage for video chunks (60MB max)
const chunkUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 60 * 1024 * 1024,
  },
});

export const recordingChunkUploadMiddleware = chunkUpload.single('chunk');

// Multer memory storage for screenshots (15MB max)
const screenshotUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024,
  },
});

export const screenshotUploadMiddleware = screenshotUpload.single('screenshot');

/**
 * POST /api/attempts/:id/proctoring/session/start
 * Initializes a new proctoring screen recording session with retention and storage keys.
 */
export const startRecordingSession = asyncHandler(async (req, res) => {
  const attemptId = Number(req.params.id);
  const { session_id, mime_type = 'video/webm' } = req.body;

  if (!session_id || typeof session_id !== 'string') {
    throw ApiError.badRequest('session_id is required');
  }

  const attemptRes = await query(
    'SELECT id, assessment_id, candidate_id, status FROM attempts WHERE id = $1',
    [attemptId]
  );
  const attempt = attemptRes.rows[0];
  if (!attempt) throw ApiError.notFound('Attempt not found');
  if (attempt.candidate_id !== req.user.id) throw ApiError.forbidden('Unauthorized access to attempt');
  if (attempt.status !== 'in_progress') {
    throw ApiError.badRequest('Screen recording can only be started for in-progress attempts');
  }

  const safeSessionId = session_id.replace(/[^a-zA-Z0-9_-]/g, '');
  const storageKey = `recordings/attempt_${attemptId}/${safeSessionId}`;
  const retentionDays = env.proctoring?.retentionDays || 30;

  const sessionRes = await query(
    `INSERT INTO proctoring_sessions
       (session_id, attempt_id, candidate_id, assessment_id, mime_type, status, storage_key, retention_until, started_at)
     VALUES ($1, $2, $3, $4, $5, 'active', $6, NOW() + ($7 || ' days')::INTERVAL, NOW())
     ON CONFLICT (session_id) DO UPDATE SET
       status = 'active',
       mime_type = EXCLUDED.mime_type,
       updated_at = NOW()
     RETURNING *`,
    [session_id, attemptId, req.user.id, attempt.assessment_id, mime_type, storageKey, retentionDays]
  );

  // Log session_started event
  try {
    await query(
      `INSERT INTO proctoring_events (session_id, attempt_id, candidate_id, assessment_id, event_type, payload, occurred_at)
       VALUES ($1, $2, $3, $4, 'session_started', $5, NOW())`,
      [session_id, attemptId, req.user.id, attempt.assessment_id, JSON.stringify({ mime_type, storageKey })]
    );
  } catch (_) {}

  res.json({
    success: true,
    session: sessionRes.rows[0],
  });
});

/**
 * POST /api/attempts/:id/proctoring/chunk
 * Ingests a single chunk of video recording with sequence index.
 * Idempotent: re-transmitting the same (session_id, chunk_index) overwrites safely.
 */
export const uploadRecordingChunk = asyncHandler(async (req, res) => {
  const attemptId = Number(req.params.id);
  const { session_id, duration_ms } = req.body;
  const chunkIndex = parseInt(req.body.chunk_index, 10);

  if (!session_id) throw ApiError.badRequest('session_id is required');
  if (!Number.isInteger(chunkIndex) || chunkIndex < 1) {
    throw ApiError.badRequest('Valid positive integer chunk_index is required');
  }
  if (!req.file || !req.file.buffer || req.file.buffer.length === 0) {
    throw ApiError.badRequest('Recording chunk file data is required');
  }

  // Validate video MIME type
  const allowedVideoMimes = ['video/webm', 'video/mp4', 'video/x-matroska', 'video/quicktime'];
  if (req.file.mimetype && !allowedVideoMimes.some((m) => req.file.mimetype.includes(m.split('/')[1]))) {
    throw ApiError.badRequest('Invalid video format. Only WebM and MP4 are permitted.');
  }

  const attemptRes = await query(
    'SELECT id, candidate_id, status FROM attempts WHERE id = $1',
    [attemptId]
  );
  const attempt = attemptRes.rows[0];
  if (!attempt) throw ApiError.notFound('Attempt not found');
  if (attempt.candidate_id !== req.user.id) throw ApiError.forbidden('Unauthorized access to attempt');
  if (attempt.status !== 'in_progress') {
    throw ApiError.badRequest('Chunks cannot be uploaded after attempt has ended');
  }

  // Verify or auto-create session for this verified in-progress attempt
  let sessionRes = await query(
    'SELECT id, status FROM proctoring_sessions WHERE session_id = $1 AND attempt_id = $2',
    [session_id, attemptId]
  );
  if (sessionRes.rowCount === 0) {
    await query(
      `INSERT INTO proctoring_sessions
         (session_id, attempt_id, candidate_id, assessment_id, mime_type, status, started_at)
       VALUES ($1, $2, $3, $4, $5, 'active', NOW())
       ON CONFLICT (session_id) DO NOTHING`,
      [session_id, attemptId, req.user.id, attempt.assessment_id, req.file.mimetype || 'video/webm']
    );
  }

  const safeSessionId = session_id.replace(/[^a-zA-Z0-9_-]/g, '');
  const sessionDir = path.join(proctoringDirs.recordings, String(attemptId), safeSessionId);
  if (!fs.existsSync(sessionDir)) {
    fs.mkdirSync(sessionDir, { recursive: true });
  }

  const ext = req.file.mimetype?.includes('mp4') ? 'mp4' : 'webm';
  const fileName = `chunk_${String(chunkIndex).padStart(5, '0')}.${ext}`;
  const filePath = path.join(sessionDir, fileName);

  await fs.promises.writeFile(filePath, req.file.buffer);

  const fileUrl = `/uploads/proctoring/recordings/${attemptId}/${safeSessionId}/${fileName}`;
  const storageKey = `recordings/attempt_${attemptId}/${safeSessionId}/${fileName}`;
  const fileSize = req.file.buffer.length;
  const duration = parseInt(duration_ms, 10) || 5000;
  const mimeType = req.file.mimetype || 'video/webm';

  // Upsert chunk metadata for idempotence
  await query(
    `INSERT INTO proctoring_recording_chunks
       (session_id, attempt_id, chunk_index, file_path, file_url, file_size_bytes, mime_type, duration_ms, storage_key, upload_status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'uploaded')
     ON CONFLICT (session_id, chunk_index) DO UPDATE SET
       file_path = EXCLUDED.file_path,
       file_url = EXCLUDED.file_url,
       file_size_bytes = EXCLUDED.file_size_bytes,
       mime_type = EXCLUDED.mime_type,
       duration_ms = EXCLUDED.duration_ms,
       storage_key = EXCLUDED.storage_key,
       upload_status = 'uploaded'`,
    [session_id, attemptId, chunkIndex, filePath, fileUrl, fileSize, mimeType, duration, storageKey]
  );

  // Update session aggregate totals
  await query(
    `UPDATE proctoring_sessions
     SET total_chunks = (SELECT COUNT(*)::int FROM proctoring_recording_chunks WHERE session_id = $1),
         total_bytes = (SELECT COALESCE(SUM(file_size_bytes), 0)::bigint FROM proctoring_recording_chunks WHERE session_id = $1),
         updated_at = NOW()
     WHERE session_id = $1`,
    [session_id]
  );

  res.json({
    success: true,
    session_id,
    chunk_index: chunkIndex,
    bytes_received: fileSize,
    file_url: fileUrl,
    storage_key: storageKey,
  });
});

/**
 * POST /api/attempts/:id/proctoring/screenshot
 * Ingests a scheduled 15-minute proctoring screenshot (1 to 12).
 */
export const uploadProctoringScreenshot = asyncHandler(async (req, res) => {
  const attemptId = Number(req.params.id);
  const {
    session_id,
    scheduled_minute,
    is_delayed = false,
    delay_seconds = 0,
    notes = null,
    captured_at,
  } = req.body;
  const sequenceNumber = parseInt(req.body.sequence_number, 10);

  if (!session_id) throw ApiError.badRequest('session_id is required');
  if (!Number.isInteger(sequenceNumber) || sequenceNumber < 1 || sequenceNumber > 12) {
    throw ApiError.badRequest('sequence_number must be an integer between 1 and 12');
  }
  if (!req.file || !req.file.buffer || req.file.buffer.length === 0) {
    throw ApiError.badRequest('Screenshot file data is required');
  }

  // Validate image MIME type
  const allowedImageMimes = ['image/jpeg', 'image/jpg', 'image/webp', 'image/png'];
  if (req.file.mimetype && !allowedImageMimes.some((m) => req.file.mimetype.includes(m.split('/')[1]))) {
    throw ApiError.badRequest('Invalid image format. Only JPEG, WebP, and PNG are permitted.');
  }

  const attemptRes = await query(
    'SELECT id, assessment_id, candidate_id, status FROM attempts WHERE id = $1',
    [attemptId]
  );
  const attempt = attemptRes.rows[0];
  if (!attempt) throw ApiError.notFound('Attempt not found');
  if (attempt.candidate_id !== req.user.id) throw ApiError.forbidden('Unauthorized access to attempt');
  if (attempt.status !== 'in_progress') {
    throw ApiError.badRequest('Screenshots cannot be uploaded after attempt has ended');
  }

  const safeSessionId = session_id.replace(/[^a-zA-Z0-9_-]/g, '');
  const targetDir = path.join(proctoringDirs.screenshots, String(attemptId), safeSessionId);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const ext = req.file.mimetype?.includes('webp') ? 'webp' : 'jpg';
  const fileName = `screenshot_seq_${String(sequenceNumber).padStart(2, '0')}.${ext}`;
  const filePath = path.join(targetDir, fileName);

  await fs.promises.writeFile(filePath, req.file.buffer);

  const fileUrl = `/uploads/proctoring/screenshots/${attemptId}/${safeSessionId}/${fileName}`;
  const storageKey = `screenshots/attempt_${attemptId}/${safeSessionId}/${fileName}`;
  const fileSize = req.file.buffer.length;
  const mimeType = req.file.mimetype || 'image/jpeg';
  const schedMin = parseInt(scheduled_minute, 10) || sequenceNumber * 15;
  const isDelayedBool = is_delayed === true || is_delayed === 'true';
  const delaySecs = parseInt(delay_seconds, 10) || 0;
  const captureTimestamp = captured_at ? new Date(captured_at) : new Date();

  const insertRes = await query(
    `INSERT INTO proctoring_screenshots
       (session_id, attempt_id, candidate_id, assessment_id, sequence_number, scheduled_minute, captured_at, file_path, file_url, file_size_bytes, mime_type, is_delayed, delay_seconds, status, storage_key, notes)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, 'captured', $14, $15)
     ON CONFLICT (attempt_id, sequence_number) DO UPDATE SET
       session_id = EXCLUDED.session_id,
       file_path = EXCLUDED.file_path,
       file_url = EXCLUDED.file_url,
       file_size_bytes = EXCLUDED.file_size_bytes,
       mime_type = EXCLUDED.mime_type,
       captured_at = EXCLUDED.captured_at,
       is_delayed = EXCLUDED.is_delayed,
       delay_seconds = EXCLUDED.delay_seconds,
       status = 'captured',
       storage_key = EXCLUDED.storage_key,
       notes = EXCLUDED.notes
     RETURNING *`,
    [
      session_id,
      attemptId,
      req.user.id,
      attempt.assessment_id,
      sequenceNumber,
      schedMin,
      captureTimestamp,
      filePath,
      fileUrl,
      fileSize,
      mimeType,
      isDelayedBool,
      delaySecs,
      storageKey,
      notes,
    ]
  );

  res.json({
    success: true,
    screenshot: insertRes.rows[0],
  });
});

/**
 * POST /api/attempts/:id/proctoring/screenshot/missed
 * Records that a scheduled screenshot was missed without generating fake files.
 */
export const recordMissedScreenshot = asyncHandler(async (req, res) => {
  const attemptId = Number(req.params.id);
  const { session_id, scheduled_minute, notes = 'Interval missed due to browser throttling or suspension' } = req.body;
  const sequenceNumber = parseInt(req.body.sequence_number, 10);

  if (!session_id) throw ApiError.badRequest('session_id is required');
  if (!Number.isInteger(sequenceNumber) || sequenceNumber < 1 || sequenceNumber > 12) {
    throw ApiError.badRequest('sequence_number must be an integer between 1 and 12');
  }

  const attemptRes = await query(
    'SELECT id, assessment_id, candidate_id, status FROM attempts WHERE id = $1',
    [attemptId]
  );
  const attempt = attemptRes.rows[0];
  if (!attempt) throw ApiError.notFound('Attempt not found');
  if (attempt.candidate_id !== req.user.id) throw ApiError.forbidden('Unauthorized access to attempt');

  const schedMin = parseInt(scheduled_minute, 10) || sequenceNumber * 15;

  const result = await query(
    `INSERT INTO proctoring_screenshots
       (session_id, attempt_id, candidate_id, assessment_id, sequence_number, scheduled_minute, captured_at, file_path, file_url, file_size_bytes, mime_type, status, notes)
     VALUES ($1, $2, $3, $4, $5, $6, NOW(), '', '', 0, 'none', 'missed', $7)
     ON CONFLICT (attempt_id, sequence_number) DO UPDATE SET
       status = CASE WHEN proctoring_screenshots.status = 'captured' THEN 'captured' ELSE 'missed' END,
       notes = EXCLUDED.notes
     RETURNING *`,
    [session_id, attemptId, req.user.id, attempt.assessment_id, sequenceNumber, schedMin, notes]
  );

  res.json({
    success: true,
    screenshot: result.rows[0],
  });
});

/**
 * POST /api/attempts/:id/proctoring/event
 * Ingests proctoring lifecycle, interruption, and anti-cheat telemetry.
 */
export const recordProctoringEvent = asyncHandler(async (req, res) => {
  const attemptId = Number(req.params.id);
  const { session_id, event_type, payload = {} } = req.body;

  if (!session_id) throw ApiError.badRequest('session_id is required');
  if (!event_type || typeof event_type !== 'string') {
    throw ApiError.badRequest('event_type is required');
  }

  const attemptRes = await query(
    'SELECT id, assessment_id, candidate_id, status FROM attempts WHERE id = $1',
    [attemptId]
  );
  const attempt = attemptRes.rows[0];
  if (!attempt) throw ApiError.notFound('Attempt not found');
  if (attempt.candidate_id !== req.user.id) throw ApiError.forbidden('Unauthorized access to attempt');

  const eventRes = await query(
    `INSERT INTO proctoring_events (session_id, attempt_id, candidate_id, assessment_id, event_type, payload, occurred_at)
     VALUES ($1, $2, $3, $4, $5, $6, NOW())
     RETURNING *`,
    [session_id, attemptId, req.user.id, attempt.assessment_id, event_type, JSON.stringify(payload)]
  );

  // Update session status if stream was interrupted or resumed
  if (event_type === 'stream_interrupted' || event_type === 'screen_share_stopped') {
    await query('UPDATE proctoring_sessions SET status = $1, updated_at = NOW() WHERE session_id = $2', [
      'interrupted',
      session_id,
    ]);
  } else if (event_type === 'stream_resumed' || event_type === 'screen_share_resumed') {
    await query('UPDATE proctoring_sessions SET status = $1, updated_at = NOW() WHERE session_id = $2', [
      'active',
      session_id,
    ]);
  }

  res.json({
    success: true,
    event: eventRes.rows[0],
  });
});

/**
 * POST /api/attempts/:id/proctoring/session/stop
 * Finalizes or stops the screen recording session and stitches chunks.
 */
export const stopRecordingSession = asyncHandler(async (req, res) => {
  const attemptId = Number(req.params.id);
  const { session_id, status = 'completed', reason = null } = req.body;

  if (!session_id) throw ApiError.badRequest('session_id is required');

  const attemptRes = await query('SELECT id, candidate_id FROM attempts WHERE id = $1', [attemptId]);
  const attempt = attemptRes.rows[0];
  if (!attempt) throw ApiError.notFound('Attempt not found');
  if (attempt.candidate_id !== req.user.id) throw ApiError.forbidden('Unauthorized access to attempt');

  const safeStatus = ['completed', 'stopped', 'interrupted', 'error'].includes(status) ? status : 'completed';

  const updated = await query(
    `UPDATE proctoring_sessions
     SET status = $1,
         stop_reason = $2,
         ended_at = NOW(),
         updated_at = NOW()
     WHERE session_id = $3 AND attempt_id = $4
     RETURNING *`,
    [safeStatus, reason, session_id, attemptId]
  );

  if (updated.rowCount === 0) {
    throw ApiError.notFound('Recording session not found');
  }

  // Finalize video files if session ended normally or was stopped
  try {
    await finalizeRecordingSessionFiles(attemptId, session_id);
  } catch (err) {
    console.warn('[Proctoring] File finalization note:', err.message);
  }

  res.json({
    success: true,
    session: updated.rows[0],
  });
});

/**
 * POST /api/attempts/:id/proctoring/session/finalize
 * Explicitly triggers chunk concatenation and final video packaging.
 */
export const finalizeRecordingSession = asyncHandler(async (req, res) => {
  const attemptId = Number(req.params.id);
  const { session_id } = req.body;

  if (!session_id) throw ApiError.badRequest('session_id is required');

  const attemptRes = await query('SELECT id, candidate_id FROM attempts WHERE id = $1', [attemptId]);
  const attempt = attemptRes.rows[0];
  if (!attempt) throw ApiError.notFound('Attempt not found');
  if (attempt.candidate_id !== req.user.id && req.user.role !== 'admin') {
    throw ApiError.forbidden('Unauthorized access to attempt');
  }

  const finalResult = await finalizeRecordingSessionFiles(attemptId, session_id);

  res.json({
    success: true,
    session_id,
    ...finalResult,
  });
});

/**
 * GET /api/attempts/:id/proctoring/session
 * Retrieves recording session state for resumption / validation.
 */
export const getRecordingSessionStatus = asyncHandler(async (req, res) => {
  const attemptId = Number(req.params.id);
  const { session_id } = req.query;

  const attemptRes = await query('SELECT id, candidate_id FROM attempts WHERE id = $1', [attemptId]);
  const attempt = attemptRes.rows[0];
  if (!attempt) throw ApiError.notFound('Attempt not found');
  if (attempt.candidate_id !== req.user.id && req.user.role !== 'admin') {
    throw ApiError.forbidden('Unauthorized access to attempt');
  }

  let sessionQuery = 'SELECT * FROM proctoring_sessions WHERE attempt_id = $1 ORDER BY started_at DESC LIMIT 1';
  let sessionParams = [attemptId];

  if (session_id) {
    sessionQuery = 'SELECT * FROM proctoring_sessions WHERE session_id = $1 AND attempt_id = $2';
    sessionParams = [session_id, attemptId];
  }

  const sessionRes = await query(sessionQuery, sessionParams);
  if (sessionRes.rowCount === 0) {
    return res.json({ session: null, chunks: [] });
  }

  const session = sessionRes.rows[0];
  const chunksRes = await query(
    `SELECT chunk_index, file_url, file_size_bytes, duration_ms, storage_key, upload_status, created_at
     FROM proctoring_recording_chunks
     WHERE session_id = $1
     ORDER BY chunk_index ASC`,
    [session.session_id]
  );

  res.json({
    session,
    chunks: chunksRes.rows,
  });
});

/**
 * GET /api/attempts/:id/proctoring/playback/manifest
 * Generates signed playback URLs and timeline manifest for authorized admin review.
 */
export const getRecordingPlaybackManifest = asyncHandler(async (req, res) => {
  const attemptId = Number(req.params.id);
  const { session_id } = req.query;

  const attemptRes = await query(`
    SELECT at.id, at.candidate_id, u.institution_id AS candidate_institution_id
    FROM attempts at
    JOIN users u ON u.id = at.candidate_id
    WHERE at.id = $1
  `, [attemptId]);
  const attempt = attemptRes.rows[0];
  if (!attempt) throw ApiError.notFound('Attempt not found');
  if (attempt.candidate_id !== req.user.id && req.user.role !== 'admin' && req.user.role !== 'institution_admin') {
    throw ApiError.forbidden('Unauthorized access to attempt');
  }
  if (req.user.institution_id && attempt.candidate_institution_id && attempt.candidate_institution_id !== req.user.institution_id) {
    throw ApiError.forbidden('Unauthorized cross-institution access to attempt');
  }

  let sessionQuery = 'SELECT * FROM proctoring_sessions WHERE attempt_id = $1 ORDER BY started_at DESC LIMIT 1';
  let sessionParams = [attemptId];
  if (session_id) {
    sessionQuery = 'SELECT * FROM proctoring_sessions WHERE session_id = $1 AND attempt_id = $2';
    sessionParams = [session_id, attemptId];
  }

  const sessionRes = await query(sessionQuery, sessionParams);
  if (sessionRes.rowCount === 0) {
    return res.json({ session: null, chunks: [], screenshots: [], events: [] });
  }

  const session = sessionRes.rows[0];
  // Empty baseUrl generates clean relative path '/api/attempts/:id/proctoring/media?token=...'
  // which works seamlessly across local dev proxies (localhost:5173 -> 5000) and production reverse proxies
  const baseUrl = '';

  // Fetch chunks
  const chunksRes = await query(
    `SELECT id, chunk_index, file_path, file_size_bytes, duration_ms, mime_type, storage_key, is_purged
     FROM proctoring_recording_chunks
     WHERE session_id = $1
     ORDER BY chunk_index ASC`,
    [session.session_id]
  );

  const chunksWithSignedUrls = chunksRes.rows.map((chunk) => {
    const signedUrl = chunk.is_purged
      ? null
      : buildSignedPlaybackUrl(baseUrl, {
          type: 'chunk',
          attemptId,
          sessionId: session.session_id,
          filePath: chunk.file_path,
        });
    return {
      chunk_index: chunk.chunk_index,
      duration_ms: chunk.duration_ms,
      file_size_bytes: chunk.file_size_bytes,
      mime_type: chunk.mime_type,
      storage_key: chunk.storage_key,
      is_purged: chunk.is_purged,
      playback_url: signedUrl,
    };
  });

  // Final video signed URL: auto-consolidate chunks if files exist on disk and final video is missing or out-of-date
  let finalVideoSignedUrl = null;
  if (chunksRes.rows && chunksRes.rows.length > 0 && !session.is_purged) {
    const hasValidFinalFile = session.final_video_path && fs.existsSync(session.final_video_path);
    const hasLatestChunks = session.total_chunks && Number(session.total_chunks) === chunksRes.rows.length;
    const hasRealChunkFiles = chunksRes.rows.some(
      (c) => c.file_path && typeof c.file_path === 'string' && fs.existsSync(c.file_path)
    );

    if (hasRealChunkFiles && (!hasValidFinalFile || !hasLatestChunks)) {
      try {
        const finalResult = await finalizeRecordingSessionFiles(attemptId, session.session_id);
        if (finalResult?.finalVideoPath && fs.existsSync(finalResult.finalVideoPath)) {
          session.final_video_path = finalResult.finalVideoPath;
        }
      } catch (err) {
        console.warn('[Proctoring] Manifest auto-consolidation error:', err.message);
      }
    }

    if (session.final_video_path && fs.existsSync(session.final_video_path)) {
      finalVideoSignedUrl = buildSignedPlaybackUrl(baseUrl, {
        type: 'final_video',
        attemptId,
        sessionId: session.session_id,
        filePath: session.final_video_path,
      });
    }
  }

  // Screenshots with signed URLs
  const screenshotsRes = await query(
    `SELECT id, sequence_number, scheduled_minute, captured_at, file_path, file_size_bytes, mime_type, is_delayed, delay_seconds, status, storage_key, notes, is_purged
     FROM proctoring_screenshots
     WHERE attempt_id = $1
     ORDER BY sequence_number ASC`,
    [attemptId]
  );

  const screenshotsWithSignedUrls = screenshotsRes.rows.map((shot) => {
    const signedUrl =
      shot.is_purged || shot.status === 'missed'
        ? null
        : buildSignedPlaybackUrl(baseUrl, {
            type: 'screenshot',
            attemptId,
            sessionId: session.session_id,
            filePath: shot.file_path,
          });
    return {
      id: shot.id,
      sequence_number: shot.sequence_number,
      scheduled_minute: shot.scheduled_minute,
      captured_at: shot.captured_at,
      is_delayed: shot.is_delayed,
      delay_seconds: shot.delay_seconds,
      status: shot.status,
      storage_key: shot.storage_key,
      notes: shot.notes,
      playback_url: signedUrl,
    };
  });

  // Events timeline
  const eventsRes = await query(
    `SELECT id, event_type, payload, occurred_at
     FROM proctoring_events
     WHERE session_id = $1
     ORDER BY occurred_at ASC`,
    [session.session_id]
  );

  res.json({
    session: {
      id: session.id,
      session_id: session.session_id,
      attempt_id: session.attempt_id,
      mime_type: session.mime_type,
      status: session.status,
      total_chunks: session.total_chunks,
      total_bytes: session.total_bytes,
      is_finalized: session.is_finalized,
      final_video_playback_url: finalVideoSignedUrl,
      started_at: session.started_at,
      ended_at: session.ended_at,
      retention_until: session.retention_until,
      is_purged: session.is_purged,
    },
    chunks: chunksWithSignedUrls,
    screenshots: screenshotsWithSignedUrls,
    events: eventsRes.rows,
    browser_playback_notes: {
      container: 'WebM / EBML Container',
      streaming_recommendation:
        'Use final_video_playback_url if available, or feed sequential chunks into MediaSource Extensions (MSE) with chunk 1 supplying EBML initialization headers.',
    },
  });
});

/**
 * GET /api/attempts/:id/proctoring/media
 * Secure streaming of proctoring media via signed tokens with HTTP 206 Partial Content support.
 */
export const streamProctoringMedia = asyncHandler(async (req, res) => {
  const attemptId = Number(req.params.id);
  const { token } = req.query;

  if (!token) throw ApiError.unauthorized('Signed playback token is required');

  const payload = verifySignedMediaToken(token);
  if (Number(payload.attemptId) !== attemptId) {
    throw ApiError.forbidden('Token does not match requested attempt');
  }

  const filePath = path.resolve(payload.filePath);
  if (!fs.existsSync(filePath)) {
    throw ApiError.notFound('Media file not found or has been purged');
  }

  const stat = await fs.promises.stat(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  let contentType = 'video/webm';
  if (filePath.endsWith('.mp4')) contentType = 'video/mp4';
  else if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) contentType = 'image/jpeg';
  else if (filePath.endsWith('.webp')) contentType = 'image/webp';
  else if (filePath.endsWith('.png')) contentType = 'image/png';

  // HTTP 206 Partial Content support for smooth seeking in video players
  if (range && !contentType.startsWith('image/')) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    if (start >= fileSize || end >= fileSize) {
      res.status(416).setHeader('Content-Range', `bytes */${fileSize}`);
      return res.end();
    }

    const chunksize = end - start + 1;
    const fileStream = fs.createReadStream(filePath, { start, end });

    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': contentType,
      'Cache-Control': 'private, max-age=300',
    });
    fileStream.pipe(res);
  } else {
    res.writeHead(200, {
      'Content-Length': fileSize,
      'Content-Type': contentType,
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'private, max-age=300',
    });
    fs.createReadStream(filePath).pipe(res);
  }
});

/**
 * GET /api/attempts/:id/proctoring/screenshots
 * Admin-only retrieval of captured screenshots for an assessment attempt.
 */
export const getProctoringScreenshots = asyncHandler(async (req, res) => {
  const attemptId = Number(req.params.id);

  const attemptRes = await query(`
    SELECT at.id, at.candidate_id, u.institution_id AS candidate_institution_id
    FROM attempts at
    JOIN users u ON u.id = at.candidate_id
    WHERE at.id = $1
  `, [attemptId]);
  const attempt = attemptRes.rows[0];
  if (!attempt) throw ApiError.notFound('Attempt not found');

  if (req.user.role !== 'admin' && req.user.role !== 'institution_admin') {
    throw ApiError.forbidden('Admin authorization required');
  }
  if (req.user.institution_id && attempt.candidate_institution_id && attempt.candidate_institution_id !== req.user.institution_id) {
    throw ApiError.forbidden('Unauthorized cross-institution access to attempt');
  }

  const rows = await query(
    `SELECT ps.id, ps.session_id, ps.attempt_id, ps.candidate_id, ps.assessment_id,
            ps.sequence_number, ps.scheduled_minute, ps.captured_at, ps.file_url,
            ps.file_size_bytes, ps.mime_type, ps.is_delayed, ps.delay_seconds, ps.status, ps.storage_key, ps.notes
     FROM proctoring_screenshots ps
     WHERE ps.attempt_id = $1
     ORDER BY ps.sequence_number ASC`,
    [attemptId]
  );

  res.json({
    success: true,
    screenshots: rows.rows,
  });
});

/**
 * GET /api/attempts/:id/proctoring/screenshots/:screenshotId/file
 * Secure admin file download/streaming for screenshot images.
 */
export const getProctoringScreenshotFile = asyncHandler(async (req, res) => {
  const attemptId = Number(req.params.id);
  const screenshotId = Number(req.params.screenshotId);

  const attemptRes = await query(`
    SELECT at.id, at.candidate_id, u.institution_id AS candidate_institution_id
    FROM attempts at
    JOIN users u ON u.id = at.candidate_id
    WHERE at.id = $1
  `, [attemptId]);
  const attempt = attemptRes.rows[0];
  if (!attempt) throw ApiError.notFound('Attempt not found');

  if (req.user.role !== 'admin' && req.user.role !== 'institution_admin') {
    throw ApiError.forbidden('Admin authorization required');
  }
  if (req.user.institution_id && attempt.candidate_institution_id && attempt.candidate_institution_id !== req.user.institution_id) {
    throw ApiError.forbidden('Unauthorized cross-institution access to attempt');
  }

  const recordRes = await query(
    'SELECT file_path, mime_type FROM proctoring_screenshots WHERE id = $1 AND attempt_id = $2',
    [screenshotId, attemptId]
  );
  const record = recordRes.rows[0];
  if (!record || !record.file_path || !fs.existsSync(record.file_path)) {
    throw ApiError.notFound('Screenshot file not found');
  }

  res.setHeader('Content-Type', record.mime_type || 'image/jpeg');
  res.sendFile(path.resolve(record.file_path));
});

/**
 * POST /api/admin/proctoring/purge
 * Admin-only retention purge of expired recordings and screenshots.
 */
export const purgeProctoringMediaController = asyncHandler(async (req, res) => {
  const retentionDays = parseInt(req.body.retention_days || req.query.retention_days, 10) || undefined;
  const result = await purgeExpiredProctoringMedia({ retentionDays });
  res.json({
    success: true,
    message: `Purged expired proctoring media for ${result.purgedSessionsCount} session(s)`,
    ...result,
  });
});

/**
 * GET /api/admin/proctoring/sessions
 * List and filter proctoring sessions for authorized admin review.
 * Supports filtering by assessment, candidate, attempt ID, date range, and proctoring state.
 * Implements pagination and tenant isolation.
 */
export const listProctoringSessions = asyncHandler(async (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'institution_admin') {
    throw ApiError.forbidden('Admin authorization required');
  }

  const {
    assessment_id,
    candidate_id,
    attempt_id,
    search,
    status,
    date_from,
    date_to,
    page = 1,
    limit = 10,
    sort_by = 'started_at',
    sort_order = 'DESC',
  } = req.query;

  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));
  const offset = (pageNum - 1) * limitNum;

  const whereClauses = [];
  const params = [];
  let paramIdx = 1;

  // Tenant / Institution Isolation
  if (req.user.institution_id) {
    whereClauses.push(`u.institution_id = $${paramIdx++}`);
    params.push(req.user.institution_id);
  }

  // Filter by assessment
  if (assessment_id) {
    whereClauses.push(`ps.assessment_id = $${paramIdx++}`);
    params.push(assessment_id);
  }

  // Filter by candidate
  if (candidate_id) {
    whereClauses.push(`ps.candidate_id = $${paramIdx++}`);
    params.push(Number(candidate_id));
  }

  // Filter by attempt
  if (attempt_id) {
    whereClauses.push(`ps.attempt_id = $${paramIdx++}`);
    params.push(Number(attempt_id));
  }

  // Search by candidate name, email, or assessment title
  if (search && search.trim()) {
    const q = `%${search.trim().toLowerCase()}%`;
    whereClauses.push(`(LOWER(u.name) LIKE $${paramIdx} OR LOWER(u.email) LIKE $${paramIdx} OR LOWER(a.title) LIKE $${paramIdx} OR CAST(ps.attempt_id AS TEXT) LIKE $${paramIdx})`);
    params.push(q);
    paramIdx++;
  }

  // Date filters
  if (date_from) {
    whereClauses.push(`ps.started_at >= $${paramIdx++}`);
    params.push(new Date(date_from).toISOString());
  }
  if (date_to) {
    whereClauses.push(`ps.started_at <= $${paramIdx++}`);
    params.push(new Date(date_to).toISOString());
  }

  // Specific state filtering
  if (status) {
    if (status === 'recording_in_progress') {
      whereClauses.push(`ps.status = 'active' AND at.status = 'in_progress'`);
    } else if (status === 'upload_pending') {
      whereClauses.push(`ps.status = 'active' AND at.status != 'in_progress'`);
    } else if (status === 'finalized') {
      whereClauses.push(`(ps.is_finalized = TRUE OR ps.status = 'completed')`);
    } else if (status === 'failed_upload') {
      whereClauses.push(`(COALESCE(c.failed_chunks, 0) > 0 OR ps.status = 'failed')`);
    } else if (status === 'incomplete') {
      whereClauses.push(`(ps.status = 'interrupted' OR ps.stop_reason IS NOT NULL OR ps.status = 'permission_revoked')`);
    } else if (status === 'purged') {
      whereClauses.push(`ps.is_purged = TRUE`);
    } else {
      whereClauses.push(`ps.status = $${paramIdx++}`);
      params.push(status);
    }
  }

  const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

  // Order validation
  const validSortCols = {
    started_at: 'ps.started_at',
    ended_at: 'ps.ended_at',
    created_at: 'ps.created_at',
    attempt_id: 'ps.attempt_id',
    candidate_name: 'u.name',
    assessment_title: 'a.title',
  };
  const sortCol = validSortCols[sort_by] || 'ps.started_at';
  const sortDir = String(sort_order).toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

  // Count query
  const countQuery = `
    SELECT COUNT(*)::int AS total
    FROM proctoring_sessions ps
    JOIN attempts at ON at.id = ps.attempt_id
    JOIN users u ON u.id = ps.candidate_id
    JOIN assessments a ON a.id = ps.assessment_id
    LEFT JOIN (
      SELECT session_id,
             COUNT(*) FILTER (WHERE upload_status = 'failed')::int AS failed_chunks
      FROM proctoring_recording_chunks
      GROUP BY session_id
    ) c ON c.session_id = ps.session_id
    ${whereSql}
  `;
  const countRes = await query(countQuery, params);
  const total = countRes.rows[0]?.total || 0;

  // Data query
  const dataQuery = `
    SELECT
      ps.id,
      ps.session_id,
      ps.attempt_id,
      ps.candidate_id,
      ps.assessment_id,
      ps.mime_type,
      ps.status AS session_status,
      ps.total_chunks,
      ps.total_bytes,
      ps.stop_reason,
      ps.started_at,
      ps.ended_at,
      ps.storage_key,
      ps.final_video_path,
      ps.final_video_url,
      ps.is_finalized,
      ps.retention_until,
      ps.is_purged,
      ps.purged_at,
      u.name AS candidate_name,
      u.email AS candidate_email,
      u.institution_id AS candidate_institution_id,
      a.title AS assessment_title,
      at.status AS attempt_status,
      at.started_at AS attempt_started_at,
      at.submitted_at AS attempt_submitted_at,
      at.duration_seconds AS attempt_duration_seconds,
      COALESCE(c.actual_chunks, 0)::int AS chunk_count,
      COALESCE(c.failed_chunks, 0)::int AS failed_chunk_count,
      COALESCE(s.screenshot_count, 0)::int AS screenshot_count,
      COALESCE(e.interruption_count, 0)::int AS interruption_count
    FROM proctoring_sessions ps
    JOIN attempts at ON at.id = ps.attempt_id
    JOIN users u ON u.id = ps.candidate_id
    JOIN assessments a ON a.id = ps.assessment_id
    LEFT JOIN (
      SELECT session_id,
             COUNT(*)::int AS actual_chunks,
             COUNT(*) FILTER (WHERE upload_status = 'failed')::int AS failed_chunks
      FROM proctoring_recording_chunks
      GROUP BY session_id
    ) c ON c.session_id = ps.session_id
    LEFT JOIN (
      SELECT attempt_id, COUNT(*)::int AS screenshot_count
      FROM proctoring_screenshots
      GROUP BY attempt_id
    ) s ON s.attempt_id = ps.attempt_id
    LEFT JOIN (
      SELECT session_id,
             COUNT(*)::int AS interruption_count
      FROM proctoring_events
      WHERE event_type IN ('stream_inactive', 'hidden_tab', 'permission_revoked', 'stream_ended_prematurely', 'upload_failed', 'chunk_upload_failed')
      GROUP BY session_id
    ) e ON e.session_id = ps.session_id
    ${whereSql}
    ORDER BY ${sortCol} ${sortDir}
    LIMIT $${paramIdx++} OFFSET $${paramIdx++}
  `;

  params.push(limitNum, offset);
  const dataRes = await query(dataQuery, params);

  // Compute calculated state and duration for each session
  const sessions = dataRes.rows.map((row) => {
    let computedState = 'stopped';
    if (row.is_purged) {
      computedState = 'purged';
    } else if (row.failed_chunk_count > 0) {
      computedState = 'failed_upload';
    } else if (row.session_status === 'active' && row.attempt_status === 'in_progress') {
      computedState = 'recording_in_progress';
    } else if (row.session_status === 'active' && row.attempt_status !== 'in_progress') {
      computedState = 'upload_pending';
    } else if (row.is_finalized || row.session_status === 'completed') {
      computedState = 'finalized';
    } else if (
      row.session_status === 'interrupted' ||
      row.interruption_count > 0 ||
      row.stop_reason ||
      row.session_status === 'permission_revoked'
    ) {
      computedState = 'incomplete';
    }

    const startMs = row.started_at ? new Date(row.started_at).getTime() : null;
    const endMs = row.ended_at ? new Date(row.ended_at).getTime() : null;
    const durationSeconds = startMs && endMs ? Math.max(0, Math.round((endMs - startMs) / 1000)) : null;

    return {
      ...row,
      computed_state: computedState,
      duration_seconds: durationSeconds ?? row.attempt_duration_seconds ?? 0,
    };
  });

  res.json({
    success: true,
    sessions,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      total_pages: Math.ceil(total / limitNum) || 1,
    },
  });
});
