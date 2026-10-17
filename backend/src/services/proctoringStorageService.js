import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { env } from '../config/env.js';
import { query } from '../config/db.js';
import { ApiError } from '../utils/ApiError.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseUploadsDir = path.resolve(__dirname, '../../uploads/proctoring');

export const proctoringDirs = {
  base: baseUploadsDir,
  recordings: path.join(baseUploadsDir, 'recordings'),
  screenshots: path.join(baseUploadsDir, 'screenshots'),
};

// Ensure private directories exist
Object.values(proctoringDirs).forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

/**
 * Base64URL encoder helper
 */
function base64UrlEncode(str) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Base64URL decoder helper
 */
function base64UrlDecode(str) {
  let b64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (b64.length % 4) b64 += '=';
  return Buffer.from(b64, 'base64').toString('utf8');
}

/**
 * Generates an HMAC-SHA256 signed playback token with short expiry.
 *
 * @param {Object} payload
 * @param {string} payload.type 'chunk' | 'screenshot' | 'final_video'
 * @param {number|string} payload.attemptId
 * @param {string} payload.sessionId
 * @param {string} payload.filePath Absolute or relative storage path
 * @param {number} [payload.expiresInSeconds=900] Default 15 minutes
 * @returns {string} Signed token
 */
export function generateSignedMediaToken(payload) {
  const secret = env.proctoring?.signedUrlSecret || env.jwtSecret || 'proctoring_secret_fallback';
  const expiresIn = (payload.expiresInSeconds || env.proctoring?.signedUrlExpiresSeconds || 900) * 1000;
  const exp = Date.now() + expiresIn;

  const data = JSON.stringify({
    type: payload.type,
    attemptId: Number(payload.attemptId),
    sessionId: payload.sessionId,
    filePath: payload.filePath,
    exp,
  });

  const encodedData = base64UrlEncode(data);
  const signature = crypto.createHmac('sha256', secret).update(encodedData).digest('base64url');

  return `${encodedData}.${signature}`;
}

/**
 * Validates HMAC-SHA256 signature and expiration of a signed media token.
 *
 * @param {string} token
 * @returns {Object} Decoded payload
 * @throws {ApiError} If tampered or expired
 */
export function verifySignedMediaToken(token) {
  if (!token || typeof token !== 'string') {
    throw ApiError.unauthorized('Missing signed media token');
  }

  const parts = token.split('.');
  if (parts.length !== 2) {
    throw ApiError.unauthorized('Malformed signed media token');
  }

  const [encodedData, signature] = parts;
  const secret = env.proctoring?.signedUrlSecret || env.jwtSecret || 'proctoring_secret_fallback';

  const expectedSignature = crypto.createHmac('sha256', secret).update(encodedData).digest('base64url');

  // Constant-time comparison
  const sigBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expectedSignature);
  if (sigBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(sigBuf, expectedBuf)) {
    throw ApiError.unauthorized('Invalid signed media token signature');
  }

  let payload;
  try {
    payload = JSON.parse(base64UrlDecode(encodedData));
  } catch (_) {
    throw ApiError.unauthorized('Failed to parse signed media token');
  }

  if (Date.now() > payload.exp) {
    throw ApiError.unauthorized('Signed media token has expired');
  }

  return payload;
}

/**
 * Builds a secure signed playback URL.
 */
export function buildSignedPlaybackUrl(baseUrl, payload) {
  const token = generateSignedMediaToken(payload);
  const cleanBase = baseUrl ? baseUrl.replace(/\/$/, '') : '';
  return `${cleanBase}/api/attempts/${payload.attemptId}/proctoring/media?token=${encodeURIComponent(token)}`;
}

/**
 * Concatenates individual chunks in chunk_index order into a single final recording file.
 * Handles single or multiple WebM/MP4 chunks.
 *
 * @param {Object} options
 * @param {number} options.attemptId
 * @param {string} options.sessionId
 * @returns {Promise<Object>} Final recording file metadata
 */
export async function finalizeRecordingSessionFiles(attemptIdOrOpts, possibleSessionId) {
  const attemptId = typeof attemptIdOrOpts === 'object' && attemptIdOrOpts !== null ? attemptIdOrOpts.attemptId : attemptIdOrOpts;
  const sessionId = typeof attemptIdOrOpts === 'object' && attemptIdOrOpts !== null ? attemptIdOrOpts.sessionId : possibleSessionId;

  if (!sessionId || !attemptId) {
    return {
      finalVideoPath: null,
      finalVideoUrl: null,
      totalChunks: 0,
      totalBytes: 0,
    };
  }

  const safeSessionId = String(sessionId).replace(/[^a-zA-Z0-9_-]/g, '');
  const sessionDir = path.join(proctoringDirs.recordings, String(attemptId), safeSessionId);

  const chunksRes = await query(
    `SELECT chunk_index, file_path, file_size_bytes, mime_type
     FROM proctoring_recording_chunks
     WHERE session_id = $1 AND attempt_id = $2
     ORDER BY chunk_index ASC`,
    [sessionId, attemptId]
  );

  const chunks = chunksRes?.rows || [];
  if (chunks.length === 0) {
    return {
      finalVideoPath: null,
      finalVideoUrl: null,
      totalChunks: 0,
      totalBytes: 0,
    };
  }

  const ext = chunks[0].mime_type?.includes('mp4') ? 'mp4' : 'webm';
  const finalFileName = `final_recording_${safeSessionId}.${ext}`;
  const finalFilePath = path.join(sessionDir, finalFileName);

  if (!fs.existsSync(sessionDir)) {
    fs.mkdirSync(sessionDir, { recursive: true });
  }

  // Stream concatenation into final video file
  const writeStream = fs.createWriteStream(finalFilePath, { flags: 'w' });

  for (const chunk of chunks) {
    if (chunk.file_path && fs.existsSync(chunk.file_path)) {
      await new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(chunk.file_path);
        readStream.pipe(writeStream, { end: false });
        readStream.on('end', resolve);
        readStream.on('error', reject);
      });
    }
  }

  await new Promise((resolve) => writeStream.end(resolve));

  const finalStats = await fs.promises.stat(finalFilePath);
  const finalFileUrl = `/uploads/proctoring/recordings/${attemptId}/${safeSessionId}/${finalFileName}`;

  // Update session record in DB - set is_finalized to true only if status is not 'active'
  await query(
    `UPDATE proctoring_sessions
     SET is_finalized = CASE WHEN status = 'active' THEN FALSE ELSE TRUE END,
         final_video_path = $1,
         final_video_url = $2,
         total_bytes = $3,
         total_chunks = $4,
         updated_at = NOW()
     WHERE session_id = $5 AND attempt_id = $6`,
    [finalFilePath, finalFileUrl, finalStats.size, chunks.length, sessionId, attemptId]
  );

  return {
    finalVideoPath: finalFilePath,
    finalVideoUrl: finalFileUrl,
    totalChunks: chunks.length,
    totalBytes: finalStats.size,
  };
}

/**
 * Purges expired media files based on retention policy.
 * Deletes files from disk and marks records purged while preserving audit metadata.
 *
 * @param {Object} [options]
 * @param {number} [options.retentionDays] Defaults to env configuration
 * @returns {Promise<Object>} Statistics on purged media
 */
export async function purgeExpiredProctoringMedia(options = {}) {
  const retentionDays = options.retentionDays || env.proctoring?.retentionDays || 30;

  // Find all unpurged sessions whose retention period has passed
  const expiredSessionsRes = await query(
    `SELECT session_id, attempt_id
     FROM proctoring_sessions
     WHERE (retention_until <= NOW() OR created_at < NOW() - ($1 || ' days')::INTERVAL)
       AND is_purged = FALSE`,
    [retentionDays]
  );

  let purgedSessionsCount = 0;
  let freedBytes = 0;

  for (const sess of expiredSessionsRes.rows) {
    const safeSessionId = sess.session_id.replace(/[^a-zA-Z0-9_-]/g, '');

    // 1. Delete recordings directory
    const recordingDir = path.join(proctoringDirs.recordings, String(sess.attempt_id), safeSessionId);
    if (fs.existsSync(recordingDir)) {
      try {
        const stats = await fs.promises.stat(recordingDir);
        freedBytes += stats.size || 0;
        await fs.promises.rm(recordingDir, { recursive: true, force: true });
      } catch (err) {
        console.warn(`[Purge] Failed to remove recording dir ${recordingDir}:`, err.message);
      }
    }

    // 2. Delete screenshots directory
    const screenshotDir = path.join(proctoringDirs.screenshots, String(sess.attempt_id), safeSessionId);
    if (fs.existsSync(screenshotDir)) {
      try {
        await fs.promises.rm(screenshotDir, { recursive: true, force: true });
      } catch (err) {
        console.warn(`[Purge] Failed to remove screenshot dir ${screenshotDir}:`, err.message);
      }
    }

    // 3. Mark database records as purged while preserving audit aggregates
    await query(
      `UPDATE proctoring_recording_chunks
       SET is_purged = TRUE, upload_status = 'purged'
       WHERE session_id = $1`,
      [sess.session_id]
    );

    await query(
      `UPDATE proctoring_screenshots
       SET is_purged = TRUE
       WHERE session_id = $1`,
      [sess.session_id]
    );

    await query(
      `UPDATE proctoring_sessions
       SET is_purged = TRUE,
           purged_at = NOW(),
           updated_at = NOW()
       WHERE session_id = $1`,
      [sess.session_id]
    );

    purgedSessionsCount += 1;
  }

  return {
    purgedSessionsCount,
    freedBytes,
    retentionDays,
  };
}
