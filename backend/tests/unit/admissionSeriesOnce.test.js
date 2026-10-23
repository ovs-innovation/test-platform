import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../src/config/db.js', () => ({
  query: vi.fn(),
}));

import { query } from '../../src/config/db.js';
import { submitPublicAdmission } from '../../src/controllers/admissionController.js';

const invokeHandler = (handler, req) =>
  new Promise((resolve, reject) => {
    const res = {
      status: vi.fn((statusCode) => {
        res.statusCode = statusCode;
        return res;
      }),
    };
    res.json = vi.fn((data) => resolve({ statusCode: res.statusCode || 200, data }));
    handler(req, res, reject);
  });

const validRequest = (testSeriesId) => ({
  body: {
    applicationNo: `APP-${testSeriesId}`,
    testSeriesId,
    studentName: 'Student',
    contactNumber: '+91 98765 43210',
    email: ' Student@Example.com ',
    formData: {},
  },
});

describe('public admission test-series duplicate protection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('stores the selected series and normalized student mobile identity', async () => {
    query
      .mockResolvedValueOnce({ rowCount: 1, rows: [{ id: 12 }] })
      .mockResolvedValueOnce({ rowCount: 1, rows: [{ application_no: 'APP-12' }] });

    const result = await invokeHandler(submitPublicAdmission, validRequest(12));
    const [insertSql, insertParams] = query.mock.calls[1];

    expect(insertSql).toContain('test_series_id');
    expect(insertParams[8]).toBe(12);
    expect(insertParams[9]).toBe('series:12');
    expect(insertParams[10]).toBe('9876543210');
    expect(insertParams[11]).toBe('student@example.com');
    expect(result.statusCode).toBe(201);
  });

  it('returns a conflict when the student already applied for the same series', async () => {
    query
      .mockResolvedValueOnce({ rowCount: 1, rows: [{ id: 12 }] })
      .mockRejectedValueOnce({
        code: '23505',
        constraint: 'uq_admission_submissions_scope_student_phone',
      });

    await expect(invokeHandler(submitPublicAdmission, validRequest(12)))
      .rejects.toMatchObject({
        statusCode: 409,
        message: 'You have already submitted an admission form for this test series or course.',
      });
  });

  it('allows the same student identity to apply to a different series', async () => {
    query
      .mockResolvedValueOnce({ rowCount: 1, rows: [{ id: 13 }] })
      .mockResolvedValueOnce({ rowCount: 1, rows: [{ application_no: 'APP-13' }] });

    await invokeHandler(submitPublicAdmission, validRequest(13));

    expect(query.mock.calls[1][1][8]).toBe(13);
    expect(query.mock.calls[1][1][9]).toBe('series:13');
    expect(query.mock.calls[1][1][10]).toBe('9876543210');
  });

  it('uses the selected course as the duplicate scope when no series ID is provided', async () => {
    query.mockResolvedValueOnce({ rowCount: 1, rows: [{ application_no: 'APP-course' }] });

    await invokeHandler(submitPublicAdmission, {
      body: {
        applicationNo: 'APP-course',
        courseName: ' NEET   UG 2026–2027 Two-Year Comprehensive Batch ',
        contactNumber: '9876543210',
        formData: {},
      },
    });

    const [insertSql, insertParams] = query.mock.calls[0];
    expect(insertSql).toContain('admission_scope');
    expect(insertParams[9]).toBe('course:neet ug 2026–2027 two-year comprehensive batch');
    expect(insertParams[10]).toBe('9876543210');
  });

  it('rejects a repeated submission for the same course when the series ID is missing', async () => {
    query.mockRejectedValueOnce({
      code: '23505',
      constraint: 'uq_admission_submissions_scope_student_phone',
    });

    await expect(invokeHandler(submitPublicAdmission, {
      body: {
        applicationNo: 'APP-repeat',
        courseName: 'NEET UG 2026–2027 Two-Year Comprehensive Batch',
        contactNumber: '+91 98765 43210',
        formData: {},
      },
    })).rejects.toMatchObject({
      statusCode: 409,
      message: 'You have already submitted an admission form for this test series or course.',
    });
  });
});
