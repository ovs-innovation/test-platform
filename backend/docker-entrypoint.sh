#!/bin/sh
set -e

echo "[entrypoint] Waiting for PostgreSQL (handled by compose healthcheck)..."
echo "[entrypoint] Running database migrations..."
node src/db/migrate.js

if [ "$RUN_SEED" = "true" ]; then
  echo "[entrypoint] Seeding database (RUN_SEED=true)..."
  node src/db/seed.js
fi

echo "[entrypoint] Starting API server on port ${PORT:-5000}..."
exec node src/server.js
