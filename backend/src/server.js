import app from './app.js';
import { env } from './config/env.js';
import { pool } from './config/db.js';
import { verifySmtpConnection } from './utils/email.js';
import { initScheduler } from './jobs/scheduler.js';

const LISTEN_RETRIES = 15;
const LISTEN_RETRY_MS = 400;
const SHUTDOWN_FORCE_MS = 2500;

function listenWithRetry(port) {
  return new Promise((resolve, reject) => {
    const tryListen = (attempt) => {
      const server = app.listen(port, '0.0.0.0');

      server.once('listening', () => resolve(server));

      server.once('error', (err) => {
        if (err.code === 'EADDRINUSE' && attempt < LISTEN_RETRIES) {
          // eslint-disable-next-line no-console
          console.warn(
            `[server] Port ${port} busy (restart in progress?). Retry ${attempt + 1}/${LISTEN_RETRIES}...`
          );
          server.close(() => {
            setTimeout(() => tryListen(attempt + 1), LISTEN_RETRY_MS);
          });
          return;
        }
        reject(err);
      });
    };

    tryListen(0);
  });
}

function attachShutdown(server) {
  let shuttingDown = false;

  const shutdown = (signal) => {
    if (shuttingDown) return;
    shuttingDown = true;
    // eslint-disable-next-line no-console
    console.log(`\n[server] ${signal} received, shutting down...`);

    if (typeof server.closeAllConnections === 'function') {
      server.closeAllConnections();
    }

    const forceTimer = setTimeout(() => {
      // eslint-disable-next-line no-console
      console.warn('[server] Forced shutdown — port release');
      process.exit(0);
    }, SHUTDOWN_FORCE_MS);
    forceTimer.unref();

    server.close(async () => {
      clearTimeout(forceTimer);
      try {
        await pool.end();
      } catch {
        // pool may already be closed on rapid restart
      }
      process.exit(0);
    });
  };

  process.once('SIGINT', () => shutdown('SIGINT'));
  process.once('SIGTERM', () => shutdown('SIGTERM'));

  // node --watch on Windows may not deliver SIGTERM reliably
  if (process.platform === 'win32') {
    process.once('SIGHUP', () => shutdown('SIGHUP'));
  }
}

const start = async () => {
  let dbConnected = false;
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      await pool.query('SELECT 1');
      // eslint-disable-next-line no-console
      console.log('[db] Connected to PostgreSQL.');
      dbConnected = true;
      break;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn(`[db] PostgreSQL connection attempt ${attempt}/5 failed (${err.message}). Retrying in 1s...`);
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  if (!dbConnected) {
    // eslint-disable-next-line no-console
    console.warn('[db] Could not connect to PostgreSQL after 5 retries. Starting server in fallback mode...');
  } else {
    // Initialize background cron scheduler for AI booster tests
    initScheduler();
  }

  // Asynchronously verify SMTP connection without blocking server startup
  verifySmtpConnection().then((emailOk) => {
    if (!emailOk) {
      // eslint-disable-next-line no-console
      console.warn('[email] Email service initialized with warnings. Verify SMTP credentials if sending emails.');
    }
  }).catch((err) => {
    // eslint-disable-next-line no-console
    console.error('[email] Email initialization check error:', err.message);
  });

  try {
    const server = await listenWithRetry(env.port);
    attachShutdown(server);
    // eslint-disable-next-line no-console
    console.log(`[server] API running at http://localhost:${env.port} (${env.nodeEnv})`);
  } catch (err) {
    if (err.code === 'EADDRINUSE') {
      // eslint-disable-next-line no-console
      console.error(
        `[server] Port ${env.port} is still in use after ${LISTEN_RETRIES} retries.\n` +
        '  Stop other backend terminals (npm start / npm run dev) and run only one:\n' +
        '  npm run dev'
      );
    } else {
      // eslint-disable-next-line no-console
      console.error('[server] Failed to start:', err.message);
    }
    process.exit(1);
  }
};

start();
