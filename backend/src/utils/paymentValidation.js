import { ApiError } from './ApiError.js';

export const toPaise = (value, label, { allowZero = false } = {}) => {
  const input = String(value ?? '').trim();
  if (!/^(?:0|[1-9]\d*)(?:\.\d{1,2})?$/.test(input)) {
    throw ApiError.badRequest(`${label} must be a valid amount with up to two decimal places`);
  }
  const [rupees, fraction = ''] = input.split('.');
  const paise = Number(rupees) * 100 + Number(fraction.padEnd(2, '0') || 0);
  if (!Number.isSafeInteger(paise)) {
    throw ApiError.badRequest(`${label} exceeds the maximum supported amount`);
  }
  if (paise < 0 || (!allowZero && paise === 0)) {
    throw ApiError.badRequest(`${label} must be ${allowZero ? 'zero or greater' : 'greater than zero'}`);
  }
  return paise;
};

export const requireDate = (value, label, { optional = false } = {}) => {
  if (optional && (value === undefined || value === null || value === '')) return null;
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw ApiError.badRequest(`${label} must be a valid date`);
  }
  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
    throw ApiError.badRequest(`${label} must be a valid date`);
  }
  return value;
};

export const requireRequestKey = (value) => {
  if (typeof value !== 'string' || !/^[A-Za-z0-9_-]{8,120}$/.test(value)) {
    throw ApiError.badRequest('A valid request idempotency key is required');
  }
  return value;
};
