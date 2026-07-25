import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';

export const notFoundHandler = (req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, _req, res, _next) => {
  // Known PostgreSQL unique-violation -> 409
  if (err && err.code === '23505') {
    return res.status(409).json({ message: 'A record with these values already exists.' });
  }

  const statusCode = err?.statusCode || err?.status || (err instanceof ApiError ? err.statusCode : 500);

  if (statusCode < 500 || err instanceof ApiError) {
    return res.status(statusCode).json({
      message: err.message || 'Request failed',
      ...(err.details ? { details: err.details } : {}),
    });
  }

  // eslint-disable-next-line no-console
  console.error('[Unhandled Server Error]', err);
  return res.status(500).json({
    message: err?.message || 'Internal server error',
    ...(env.isProd ? {} : { error: err?.stack || err?.message }),
  });
};
