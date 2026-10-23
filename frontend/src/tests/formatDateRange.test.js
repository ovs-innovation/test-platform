import { describe, expect, it } from 'vitest';
import {
  formatDateRange,
  getRepeaterDurationText,
  normalizeRepeaterDurationText,
} from '../lib/format.js';

describe('formatDateRange', () => {
  it('formats ISO timestamps as a readable month and year range', () => {
    expect(formatDateRange('2026-05-31T18:30:00.000Z', '2028-05-30T18:30:00.000Z'))
      .toBe('May 2026 – May 2028');
  });

  describe('repeater program duration text', () => {
    it('uses the selected exam name and target year for generated durations', () => {
      expect(getRepeaterDurationText('JEE Main', '2027'))
        .toBe('October 2026 – JEE 2027 (Exam Date to be updated after official announcement)');
    });

    it('corrects legacy NEET text for JEE repeater series', () => {
      expect(normalizeRepeaterDurationText(
        'October 2026 – NEET 2027 (Exam Date to be updated after official announcement)',
        'JEE Main'
      )).toBe('October 2026 – JEE 2027 (Exam Date to be updated after official announcement)');
    });
  });

  it('returns null when the range is incomplete or invalid', () => {
    expect(formatDateRange('2026-05-01T00:00:00.000Z', null)).toBeNull();
    expect(formatDateRange('not-a-date', '2028-05-01')).toBeNull();
  });
});
