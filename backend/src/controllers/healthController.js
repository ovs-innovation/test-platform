import { query } from '../config/db.js';

/**
 * GET /api/health
 * Basic process liveness check
 */
export const checkHealth = (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
};

/**
 * GET /api/health/ready
 * Database readiness check (runs SELECT 1 query)
 */
export const checkReadiness = async (_req, res) => {
  try {
    await query('SELECT 1');
    res.json({ status: 'ok', db: 'connected', timestamp: new Date().toISOString() });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[Health Check Failure]', err?.message || err);
    res.status(503).json({
      status: 'degraded',
      db: 'unavailable',
      message: 'Database service unavailable',
    });
  }
};
