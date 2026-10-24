import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';

export const notFoundHandler = (req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
};

export const errorHandler = (err, _req, res, _next) => {
  const is413 = err?.code === 'LIMIT_FILE_SIZE' || err?.type === 'entity.too.large' || err?.statusCode === 413 || err?.status === 413;
  const isMulterError = err?.name === 'MulterError';
  const statusCode = is413
    ? 413
    : isMulterError
    ? 400
    : err?.statusCode || err?.status || (err instanceof ApiError ? err.statusCode : 500);

  // Handle Multer and Body-Parser 413 / Payload Too Large errors
  if (is413) {
    return res.status(413).json({
      success: false,
      code: 'PAYLOAD_TOO_LARGE',
      message: `PDF exceeds the maximum allowed upload size (maximum ${env.maxPdfUploadMb || 100} MB).`,
    });
  }

  if (isMulterError) {
    return res.status(400).json({
      success: false,
      code: 'UPLOAD_ERROR',
      message: err.message,
    });
  }

  // Only log detailed stack traces for unexpected 5xx server exceptions
  if (statusCode >= 500 && !(err instanceof ApiError)) {
    console.error('[Internal Error Log]', {
      message: err?.message,
      name: err?.name,
      code: err?.code,
      stack: err?.stack,
    });
  }

  // Known PostgreSQL unique-violation -> 409
  if (err && err.code === '23505') {
    return res.status(409).json({ message: 'A record with these values already exists.' });
  }

  // Database Connection / Infrastructure Error -> 503 Service Unavailable
  const isDbConnectionError =
    err &&
    (err.code === 'ENOTFOUND' ||
      err.code === 'ETIMEDOUT' ||
      err.code === 'ECONNRESET' ||
      err.code === 'ECONNREFUSED' ||
      err.code === 'EHOSTUNREACH' ||
      err.code === 'ENETUNREACH' ||
      err.code === '57P01' ||
      err.code === '53300' ||
      err.code === '53000' ||
      err.code === '08006' ||
      err.code === '08003' ||
      err.code === '08001' ||
      err.code === '08004' ||
      (err.message && (
        err.message.includes('getaddrinfo') ||
        err.message.includes('connection terminated') ||
        err.message.includes('Connection terminated unexpectedly') ||
        err.message.includes('timeout') ||
        err.message.includes('Timeout') ||
        err.message.includes('SSL') ||
        err.message.includes('Client has encountered a connection error') ||
        err.message.includes('exceeded the quota')
      )));

  if (isDbConnectionError) {
    return res.status(503).json({
      success: false,
      code: 'SERVICE_TEMPORARILY_UNAVAILABLE',
      message: 'The database service is temporarily unavailable. Please try again in a moment.',
    });
  }

  if (statusCode < 500 || err instanceof ApiError || err?.code === 'PDF_VISION_EXTRACTION_FAILED' || err?.code === 'GEMINI_CREDITS_DEPLETED' || statusCode === 502 || statusCode === 503) {
    const detailedMsg = Array.isArray(err.details) && err.details.length > 0
      ? err.details.map((d) => d.message).join(', ')
      : err.message;
    return res.status(statusCode).json({
      message: detailedMsg || 'Request failed',
      ...(err.code ? { code: err.code } : {}),
      ...(err.details ? { details: err.details } : {}),
    });
  }

  // Hide stack trace and unhandled raw server details from users
  return res.status(500).json({
    success: false,
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Unable to process request right now. Please try again later.',
  });
};
