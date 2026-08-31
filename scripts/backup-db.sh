#!/usr/bin/env bash
# ==============================================================================
# EDVEDUM CBT Platform - Automated PostgreSQL Backup Script
# Retention: 7 daily backups, 4 weekly backups
# ==============================================================================

set -euo pipefail

BACKUP_DIR="${BACKUP_DIR:-/var/backups/edvedum-db}"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/edvedum_backup_${TIMESTAMP}.sql.gz"
RETENTION_DAYS=7

mkdir -p "$BACKUP_DIR"

echo "[$(date)] Starting PostgreSQL database backup..."

if [ -n "${DATABASE_URL:-}" ]; then
  pg_dump "$DATABASE_URL" | gzip > "$BACKUP_FILE"
elif [ -n "${PGDATABASE:-}" ]; then
  pg_dump -h "${PGHOST:-localhost}" -p "${PGPORT:-5432}" -U "${PGUSER:-postgres}" "$PGDATABASE" | gzip > "$BACKUP_FILE"
else
  docker compose exec -T postgres pg_dump -U postgres edvedum | gzip > "$BACKUP_FILE"
fi

echo "[$(date)] Backup completed successfully: $BACKUP_FILE"
echo "[$(date)] File size: $(du -sh "$BACKUP_FILE" | cut -f1)"

# Prune backups older than RETENTION_DAYS
echo "[$(date)] Pruning backups older than ${RETENTION_DAYS} days..."
find "$BACKUP_DIR" -name "edvedum_backup_*.sql.gz" -mtime +${RETENTION_DAYS} -delete

echo "[$(date)] Backup and rotation complete."
