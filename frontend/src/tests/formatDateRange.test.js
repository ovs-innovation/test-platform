import { describe, expect, it } from 'vitest';
import { formatDateRange } from '../lib/format.js';

describe('formatDateRange', () => {
  it('formats ISO timestamps as a readable month and year range', () => {
    expect(formatDateRange('2026-05-31T18:30:00.000Z', '2028-05-30T18:30:00.000Z'))
      .toBe('May 2026 – May 2028');
  });

  it('returns null when the range is incomplete or invalid', () => {
    expect(formatDateRange('2026-05-01T00:00:00.000Z', null)).toBeNull();
    expect(formatDateRange('not-a-date', '2028-05-01')).toBeNull();
  });
});
