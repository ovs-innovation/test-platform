import { logger } from '../utils/logger.js';

/**
 * Express Middleware: Structured request logging using Winston.
 * Logs User, IP, HTTP Method, Route, Status Code, and Duration (ms).
 */
export const requestLogger = (req, res, next) => {
  const startTime = process.hrtime();

  res.on('finish', () => {
    const diff = process.hrtime(startTime);
    const durationMs = Number((diff[0] * 1e3 + diff[1] * 1e-6).toFixed(2));

    // Get client IP address
    const ip = (
      req.headers['x-forwarded-for'] ||
      req.ip ||
      req.socket?.remoteAddress ||
      'unknown'
    )
      .toString()
      .split(',')[0]
      .trim();

    // User details (populated after authentication middleware runs)
    const user = req.user
      ? { id: req.user.id, role: req.user.role, email: req.user.email }
      : 'anonymous';

    const logMeta = {
      ip,
      user,
      method: req.method,
      route: req.originalUrl || req.url,
      status: res.statusCode,
      duration_ms: durationMs,
      user_agent: req.headers['user-agent'] || 'unknown',
    };

    const message = `${req.method} ${req.originalUrl || req.url} ${res.statusCode} - ${durationMs}ms [IP: ${ip}] [User: ${
      typeof user === 'object' ? user.email || user.id : user
    }]`;

    if (res.statusCode >= 500) {
      logger.error(message, logMeta);
    } else if (res.statusCode >= 400) {
      logger.warn(message, logMeta);
    } else {
      logger.info(message, logMeta);
    }
  });

  next();
};
