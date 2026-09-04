import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';

export const notFoundHandler = (req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, _req, res, _next) => {
  const statusCode = err?.statusCode || err?.status || (err instanceof ApiError ? err.statusCode : 500);

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
      err.code === '57P01' ||
      (err.message && (err.message.includes('getaddrinfo') || err.message.includes('connection terminated'))));

  if (isDbConnectionError) {
    return res.status(503).json({
      success: false,
      code: 'SERVICE_TEMPORARILY_UNAVAILABLE',
      message: 'The service is temporarily unavailable. Please try again.',
    });
  }

  if (statusCode < 500 || err instanceof ApiError) {
    const detailedMsg = Array.isArray(err.details) && err.details.length > 0
      ? err.details.map((d) => d.message).join(', ')
      : err.message;
    return res.status(statusCode).json({
      message: detailedMsg || 'Request failed',
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
