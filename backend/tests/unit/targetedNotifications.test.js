import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../src/config/db.js', () => ({
  query: vi.fn(),
  withTransaction: vi.fn(),
}));

vi.mock('../../src/config/redis.js', () => ({
  delCache: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('../../src/services/examCacheService.js', () => ({
  invalidateExamPaperCache: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('../../src/utils/email.js', () => ({
  sendEmail: vi.fn().mockResolvedValue({ messageId: 'test-123' }),
}));

import { query } from '../../src/config/db.js';
import { sendEmail } from '../../src/utils/email.js';
import { notifyTestReminder, sendStudentAssignmentNotifications } from '../../src/controllers/testAdminController.js';

const invokeHandler = (handler, req) =>
  new Promise((resolve, reject) => {
    const res = {
      json: vi.fn((data) => resolve({ type: 'json', data })),
      status: vi.fn(() => res),
    };
    handler(req, res, (error) => reject(error));
  });

describe('Targeted Test Series Notifications & Emails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('sendStudentAssignmentNotifications sends in-app notice and email to enrolled test series students only', async () => {
    // 1. student_enrollments query
    query.mockResolvedValueOnce({
      rows: [
        { id: 43, email: 'student1@edvedum.com', name: 'Rohan Sharma' },
        { id: 44, email: 'student2@edvedum.com', name: 'Aarav Patel' }
      ]
    });
    // Fallback for notifications inserts & test details
    query.mockResolvedValue({
      rowCount: 1,
      rows: [{ test_name: 'NEET Unit Test 1', test_date: '2026-11-20', duration_minutes: 60, max_marks: 180 }]
    });

    await sendStudentAssignmentNotifications(101, 'NEET Unit Test 1', 'test_series', 21, {
      sendEmailNotification: true
    });

    // Check that query was called with test_series_id = 21
    const enrollmentCall = query.mock.calls[0];
    expect(enrollmentCall[0]).toMatch(/FROM student_enrollments/);
    expect(enrollmentCall[1]).toEqual([21]);

    // Check email dispatch
    expect(sendEmail).toHaveBeenCalledTimes(2);
    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'student1@edvedum.com',
        subject: expect.stringContaining('NEET Unit Test 1')
      })
    );
    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'student2@edvedum.com',
        subject: expect.stringContaining('NEET Unit Test 1')
      })
    );
  });

  it('notifyTestReminder targets specific test series students and sends email', async () => {
    // 1. test check
    query.mockResolvedValueOnce({
      rowCount: 1,
      rows: [{ id: 273, test_name: 'Short test', test_date: '2026-11-15', duration_minutes: 60 }]
    });
    // 2. test series title
    query.mockResolvedValueOnce({
      rows: [{ title: 'AIETS NEET-UG Two-Year Online CBT Program' }]
    });
    // 3. student_enrollments for test_series_id = 21
    query.mockResolvedValueOnce({
      rows: [
        { id: 43, email: 'student1@edvedum.com', name: 'Rohan Sharma' }
      ]
    });
    // notification insert mock
    query.mockResolvedValue({ rowCount: 1 });

    const result = await invokeHandler(notifyTestReminder, {
      params: { id: '273' },
      body: {
        custom_message: 'Your test is scheduled now.',
        target_type: 'test_series',
        test_series_id: 21,
        send_email: true
      }
    });

    expect(result.data.notified_count).toBe(1);
    expect(result.data.emails_sent).toBe(1);
    expect(result.data.target).toContain('AIETS NEET-UG Two-Year Online CBT Program');
    expect(sendEmail).toHaveBeenCalledTimes(1);
    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'student1@edvedum.com',
        subject: 'Reminder: Short test'
      })
    );
  });
});
