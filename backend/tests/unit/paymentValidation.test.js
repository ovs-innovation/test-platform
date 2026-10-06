import { describe, expect, it } from 'vitest';
import { toPaise, requireDate, requireRequestKey } from '../../src/utils/paymentValidation.js';

describe('manual payment input validation', () => {
  it('converts rupees to integer paise without floating point rounding', () => {
    expect(toPaise('10000', 'fee')).toBe(1000000);
    expect(toPaise('4000.05', 'payment')).toBe(400005);
  });

  it('allows zero only when explicitly requested and rejects malformed or unsafe amounts', () => {
    expect(toPaise('0', 'payment', { allowZero: true })).toBe(0);
    expect(() => toPaise('0', 'payment')).toThrow(/greater than zero/);
    expect(() => toPaise('1.001', 'payment')).toThrow(/two decimal places/);
    expect(() => toPaise('-1', 'payment')).toThrow(/two decimal places/);
    expect(() => toPaise('90071992547410', 'payment')).toThrow(/maximum supported/);
  });

  it('validates real calendar dates and optional empty dates', () => {
    expect(requireDate('2024-02-29', 'payment date')).toBe('2024-02-29');
    expect(() => requireDate('2025-02-29', 'payment date')).toThrow(/valid date/);
    expect(requireDate('', 'next due date', { optional: true })).toBeNull();
  });

  it('requires a bounded idempotency key', () => {
    expect(requireRequestKey('request_123')).toBe('request_123');
    expect(() => requireRequestKey('short')).toThrow(/idempotency key/);
  });
});
