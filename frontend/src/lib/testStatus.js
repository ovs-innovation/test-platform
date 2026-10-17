/**
 * Helper to determine if a test or assessment is currently LIVE.
 * Checks explicit flags (is_live, computed_status), scheduled date/time windows,
 * and available_from/until timestamps.
 */
export function isTestLive(test) {
  if (!test) return false;

  // 1. Explicit admin/system live flag
  if (test.is_live === true || test.is_live === 'true' || test.is_live === 1) {
    return true;
  }

  // 2. Explicit computed_status or status
  const statusStr = String(test.computed_status || test.status || '').toLowerCase().trim();
  if (statusStr === 'live') {
    return true;
  }

  const now = new Date();

  // 3. Date & Time Window Matching
  if (test.test_date) {
    const rawDate = String(test.test_date);
    const dateStr = rawDate.includes('T') ? rawDate.split('T')[0] : rawDate.slice(0, 10);
    const startTimeStr = test.start_time ? String(test.start_time).slice(0, 8) : '00:00:00';
    const endTimeStr = test.end_time ? String(test.end_time).slice(0, 8) : '23:59:59';

    // Local timezone comparison
    const startDtLocal = new Date(`${dateStr}T${startTimeStr}`);
    const endDtLocal = new Date(`${dateStr}T${endTimeStr}`);
    if (!isNaN(startDtLocal.getTime()) && !isNaN(endDtLocal.getTime())) {
      if (now >= startDtLocal && now <= endDtLocal) {
        return true;
      }
    }

    // UTC timezone comparison
    const startDtUtc = new Date(`${dateStr}T${startTimeStr}Z`);
    const endDtUtc = new Date(`${dateStr}T${endTimeStr}Z`);
    if (!isNaN(startDtUtc.getTime()) && !isNaN(endDtUtc.getTime())) {
      if (now >= startDtUtc && now <= endDtUtc) {
        return true;
      }
    }
  }

  // 4. Timestamp Range (available_from & available_until)
  if (test.available_from) {
    const fromDt = new Date(test.available_from);
    const untilDt = test.available_until ? new Date(test.available_until) : null;
    if (!isNaN(fromDt.getTime())) {
      if (now >= fromDt && (!untilDt || (now <= untilDt))) {
        // If it's published and currently within window
        return true;
      }
    }
  }

  // 5. Active override window for missed test
  if (test.override_valid_from && test.override_valid_until) {
    const ovFrom = new Date(test.override_valid_from);
    const ovUntil = new Date(test.override_valid_until);
    if (!isNaN(ovFrom.getTime()) && !isNaN(ovUntil.getTime())) {
      if (now >= ovFrom && now <= ovUntil) {
        return true;
      }
    }
  }

  return false;
}
