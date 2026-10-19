import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock DB query before importing controller and service
vi.mock('../../src/config/db.js', () => ({
  query: vi.fn(),
}));

import { query } from '../../src/config/db.js';
import {
  reportCandidateIncident,
  getActiveAttemptIncidents,
  listAdminIncidents,
  getAdminIncidentDetails,
  acknowledgeIncident,
  assignIncident,
  addInvestigationNotes,
  updateIncidentStatus,
  resolveIncident,
} from '../../src/controllers/incidentController.js';
import {
  sanitizeDiagnostics,
  calculateSeverity,
  computeIncidentKey,
  ingestIncident,
  INCIDENT_CATEGORIES,
} from '../../src/services/incidentService.js';
import { reportIncidentSchema, updateIncidentStatusSchema } from '../../src/validators/schemas.js';
import { incidentAlertEmailTemplate } from '../../src/utils/emailTemplates.js';
import { sendIncidentAlertEmail } from '../../src/utils/email.js';

const callHandler = (handler, req, res, next) =>
  new Promise((resolve) => {
    const wrappedRes = {
      ...res,
      json: vi.fn((data) => {
        res.json?.(data);
        resolve({ type: 'json', data });
      }),
      status: vi.fn((code) => {
        res.status?.(code);
        return wrappedRes;
      }),
    };
    const wrappedNext = vi.fn((err) => {
      next?.(err);
      resolve({ type: 'next', err });
    });
    handler(req, wrappedRes, wrappedNext);
  });

describe('Live Exam Technical Incident Reporting System', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // =========================================================================
  // 1. Payload Validation & Sanitization Tests
  // =========================================================================
  describe('Schema Validation & Diagnostic Sanitization', () => {
    it('validates all 11 approved categories successfully', () => {
      const categories = [
        'NETWORK_DISCONNECTED',
        'NETWORK_RESTORED',
        'ANSWER_SAVE_FAILED',
        'QUESTION_LOAD_FAILED',
        'SUBMISSION_FAILED',
        'APPLICATION_ERROR',
        'TIMER_MISMATCH',
        'RECORDING_FAILED',
        'SCREENSHOT_FAILED',
        'SCREEN_SHARING_STOPPED',
        'STUDENT_REPORTED_ISSUE',
      ];

      for (const cat of categories) {
        const parsed = reportIncidentSchema.safeParse({
          category: cat,
          description: 'Valid issue description',
        });
        expect(parsed.success).toBe(true);
      }
    });

    it('rejects unapproved incident categories', () => {
      const parsed = reportIncidentSchema.safeParse({
        category: 'CUSTOM_FAKE_CATEGORY',
        description: 'Some error',
      });
      expect(parsed.success).toBe(false);
      expect(parsed.error.issues[0].message).toContain('Invalid incident category');
    });

    it('rejects missing description', () => {
      const parsed = reportIncidentSchema.safeParse({
        category: 'NETWORK_DISCONNECTED',
      });
      expect(parsed.success).toBe(false);
    });

    it('sanitizes diagnostics by stripping passwords, tokens, auth headers, and answer contents', () => {
      const rawDiagnostics = {
        online: true,
        effectiveType: '4g',
        rtt: 120,
        uncommittedAnswerCount: 2,
        uncommittedQuestionIds: [10, 11],
        // SENSITIVE CREDENTIAL FIELDS (MUST BE STRIPPED)
        password: 'student_secret_password',
        access_token: 'Bearer eyJhbGciOiJIUzI1Ni...',
        Authorization: 'Bearer secret_token',
        cookie: 'sessionId=abc12345',
        jwt: 'header.payload.signature',
        // PROHIBITED ANSWER PAYLOADS (MUST BE STRIPPED)
        selected_option: 'B',
        answer_text: 'Student full answer text',
        source_code: 'function cheat() { return 42; }',
        code: 'console.log("secret");',
        correct_index: 2,
      };

      const sanitized = sanitizeDiagnostics(rawDiagnostics);

      // Safe metadata preserved
      expect(sanitized.online).toBe(true);
      expect(sanitized.effectiveType).toBe('4g');
      expect(sanitized.rtt).toBe(120);
      expect(sanitized.uncommittedAnswerCount).toBe(2);
      expect(sanitized.uncommittedQuestionIds).toEqual([10, 11]);

      // All sensitive keys scrubbed completely
      expect(sanitized.password).toBeUndefined();
      expect(sanitized.access_token).toBeUndefined();
      expect(sanitized.Authorization).toBeUndefined();
      expect(sanitized.cookie).toBeUndefined();
      expect(sanitized.jwt).toBeUndefined();
      expect(sanitized.selected_option).toBeUndefined();
      expect(sanitized.answer_text).toBeUndefined();
      expect(sanitized.source_code).toBeUndefined();
      expect(sanitized.code).toBeUndefined();
      expect(sanitized.correct_index).toBeUndefined();
    });
  });

  // =========================================================================
  // 2. Dynamic Server-Side Severity Calculation Tests
  // =========================================================================
  describe('Dynamic Severity Calculation', () => {
    it('always assigns critical severity to SUBMISSION_FAILED', () => {
      expect(calculateSeverity(INCIDENT_CATEGORIES.SUBMISSION_FAILED, 1)).toBe('critical');
    });

    it('assigns high severity to ANSWER_SAVE_FAILED initially, escalating to critical after 3 occurrences', () => {
      expect(calculateSeverity(INCIDENT_CATEGORIES.ANSWER_SAVE_FAILED, 1)).toBe('high');
      expect(calculateSeverity(INCIDENT_CATEGORIES.ANSWER_SAVE_FAILED, 2)).toBe('high');
      expect(calculateSeverity(INCIDENT_CATEGORIES.ANSWER_SAVE_FAILED, 3)).toBe('critical');
    });

    it('assigns critical severity to TIMER_MISMATCH when clock skew exceeds 120 seconds', () => {
      expect(calculateSeverity(INCIDENT_CATEGORIES.TIMER_MISMATCH, 1, { clockSkewSeconds: 30 })).toBe('high');
      expect(calculateSeverity(INCIDENT_CATEGORIES.TIMER_MISMATCH, 1, { clockSkewSeconds: 150 })).toBe('critical');
    });

    it('assigns low severity to NETWORK_RESTORED', () => {
      expect(calculateSeverity(INCIDENT_CATEGORIES.NETWORK_RESTORED, 1)).toBe('low');
    });
  });

  // =========================================================================
  // 3. Authorization & Candidate Ownership Validation Tests
  // =========================================================================
  describe('Candidate Identity & Ownership Validation', () => {
    it('rejects reporting if attempt does not exist', async () => {
      query.mockResolvedValueOnce({ rows: [] }); // attempt not found

      const req = {
        params: { id: '999' },
        user: { id: 50 },
        body: {
          category: 'ANSWER_SAVE_FAILED',
          description: 'Save failed',
        },
        headers: {},
      };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
      const next = vi.fn();

      await callHandler(reportCandidateIncident, req, res, next);
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Attempt not found', statusCode: 404 })
      );
    });

    it('rejects reporting if attempt belongs to a different candidate', async () => {
      query.mockResolvedValueOnce({
        rows: [{ id: 10, assessment_id: 2, candidate_id: 999, status: 'in_progress', institution_id: 1 }],
      });

      const req = {
        params: { id: '10' },
        user: { id: 50 }, // authenticated user is 50, but attempt candidate is 999
        body: {
          category: 'ANSWER_SAVE_FAILED',
          description: 'Save failed',
        },
        headers: {},
      };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
      const next = vi.fn();

      await callHandler(reportCandidateIncident, req, res, next);
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Unauthorized access to attempt: candidate identity mismatch',
          statusCode: 403,
        })
      );
    });

    it('rejects incident reporting if attempt is already completed or submitted', async () => {
      query.mockResolvedValueOnce({
        rows: [{ id: 10, assessment_id: 2, candidate_id: 50, status: 'submitted', institution_id: 1 }],
      });

      const req = {
        params: { id: '10' },
        user: { id: 50 },
        body: {
          category: 'ANSWER_SAVE_FAILED',
          description: 'Late report after exam submitted',
        },
        headers: {},
      };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
      const next = vi.fn();

      await callHandler(reportCandidateIncident, req, res, next);
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          message: expect.stringContaining('Cannot report technical incidents on an attempt that is already completed'),
          statusCode: 409,
        })
      );
    });
  });

  // =========================================================================
  // 4. Ingestion, Deduplication & Idempotency Tests
  // =========================================================================
  describe('Automatic Event Deduplication & Idempotency', () => {
    it('creates a new parent incident with server-derived tenant ID when no active incident exists', async () => {
      // 1. Attempt lookup
      query.mockResolvedValueOnce({
        rows: [
          {
            id: 25,
            assessment_id: 4,
            candidate_id: 50,
            status: 'in_progress',
            institution_id: 7, // Trusted server-derived institution ID
            candidate_name: 'Aarav Sharma',
            assessment_title: 'JEE Full Mock #1',
          },
        ],
      });
      // 2. Active incident lookup -> none
      query.mockResolvedValueOnce({ rows: [] });
      // 3. Insert parent incident
      query.mockResolvedValueOnce({
        rows: [
          {
            id: 101,
            attempt_id: 25,
            assessment_id: 4,
            candidate_id: 50,
            institution_id: 7,
            category: 'ANSWER_SAVE_FAILED',
            severity: 'high',
            status: 'new',
            occurrence_count: 1,
            title: 'Autosave Failed for Question #12',
          },
        ],
      });
      // 4. Insert child event
      query.mockResolvedValueOnce({ rows: [{ id: 1 }] });
      // 5. Insert audit log
      query.mockResolvedValueOnce({ rows: [{ id: 1 }] });

      const req = {
        params: { id: '25' },
        user: { id: 50 },
        body: {
          category: 'ANSWER_SAVE_FAILED',
          question_id: 12,
          description: 'PUT /api/attempts/25/answer returned 504 Gateway Timeout',
          diagnostics: { online: true, rtt: 350 },
        },
        headers: {},
      };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
      const next = vi.fn();

      const result = await callHandler(reportCandidateIncident, req, res, next);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(result.data.success).toBe(true);
      expect(result.data.deduplicated).toBe(false);
      expect(result.data.incident.id).toBe(101);
      expect(result.data.incident.institution_id).toBe(7);
      expect(result.data.incident.severity).toBe('high');
    });

    it('deduplicates repeated events into existing active incident and increments occurrence count', async () => {
      // 1. Attempt lookup
      query.mockResolvedValueOnce({
        rows: [{ id: 25, assessment_id: 4, candidate_id: 50, status: 'in_progress', institution_id: 7 }],
      });
      // 2. Active incident lookup -> existing parent found with count = 1
      query.mockResolvedValueOnce({
        rows: [{ id: 101, occurrence_count: 1, severity: 'high', status: 'new' }],
      });
      // 3. Update parent incident
      query.mockResolvedValueOnce({
        rows: [
          {
            id: 101,
            occurrence_count: 2,
            severity: 'high',
            status: 'new',
            title: 'Autosave Failed for Question #12',
          },
        ],
      });
      // 4. Insert child event
      query.mockResolvedValueOnce({ rows: [{ id: 2 }] });

      const req = {
        params: { id: '25' },
        user: { id: 50 },
        body: {
          category: 'ANSWER_SAVE_FAILED',
          question_id: 12,
          description: 'Second save retry failure',
          diagnostics: { online: true, rtt: 400 },
        },
        headers: {},
      };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
      const next = vi.fn();

      const result = await callHandler(reportCandidateIncident, req, res, next);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(result.data.success).toBe(true);
      expect(result.data.deduplicated).toBe(true);
      expect(result.data.incident.occurrence_count).toBe(2);
    });

    it('automatically escalates severity to critical on third occurrence', async () => {
      // 1. Attempt lookup
      query.mockResolvedValueOnce({
        rows: [{ id: 25, assessment_id: 4, candidate_id: 50, status: 'in_progress', institution_id: 7 }],
      });
      // 2. Active parent lookup -> count = 2
      query.mockResolvedValueOnce({
        rows: [{ id: 101, occurrence_count: 2, severity: 'high', status: 'new' }],
      });
      // 3. Update parent incident (severity moves to critical)
      query.mockResolvedValueOnce({
        rows: [
          {
            id: 101,
            occurrence_count: 3,
            severity: 'critical',
            status: 'new',
            title: 'Autosave Failed for Question #12',
          },
        ],
      });
      // 4. Insert child event
      query.mockResolvedValueOnce({ rows: [{ id: 3 }] });
      // 5. Insert audit log for escalation
      query.mockResolvedValueOnce({ rows: [{ id: 1 }] });

      const req = {
        params: { id: '25' },
        user: { id: 50 },
        body: {
          category: 'ANSWER_SAVE_FAILED',
          question_id: 12,
          description: 'Third retry failure (persistent)',
        },
        headers: {},
      };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
      const next = vi.fn();

      const result = await callHandler(reportCandidateIncident, req, res, next);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(result.data.incident.severity).toBe('critical');
      expect(result.data.incident.occurrence_count).toBe(3);
    });

    it('handles HTTP retries idempotently when X-Idempotency-Key is repeated', async () => {
      // 1. Attempt lookup
      query.mockResolvedValueOnce({
        rows: [{ id: 25, assessment_id: 4, candidate_id: 50, status: 'in_progress', institution_id: 7 }],
      });
      // 2. Idempotency lookup -> match found in exam_incident_events!
      query.mockResolvedValueOnce({
        rowCount: 1,
        rows: [{ id: 5, incident_id: 101, incident_key: 'inc_key', status: 'new', severity: 'high', occurrence_count: 1 }],
      });

      const req = {
        params: { id: '25' },
        user: { id: 50 },
        body: {
          category: 'ANSWER_SAVE_FAILED',
          description: 'Network retry',
        },
        headers: { 'x-idempotency-key': 'uuid-client-retry-12345' },
      };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
      const next = vi.fn();

      const result = await callHandler(reportCandidateIncident, req, res, next);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(result.data.isDuplicateEvent).toBe(true);
      expect(result.data.incident_id).toBe(101);
    });
  });

  // =========================================================================
  // 5. Tenant-Level Authorization & Isolation Tests
  // =========================================================================
  describe('Tenant-Level Authorization & Isolation', () => {
    it('restricts institution_admin from viewing incident belonging to a different institution', async () => {
      query.mockResolvedValueOnce({
        rows: [
          {
            id: 105,
            institution_id: 99, // Incident belongs to institution 99
            candidate_id: 400,
            category: 'APPLICATION_ERROR',
          },
        ],
      });

      const req = {
        params: { id: '105' },
        user: { id: 10, role: 'institution_admin', institution_id: 1 }, // Admin belongs to institution 1
      };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
      const next = vi.fn();

      await callHandler(getAdminIncidentDetails, req, res, next);
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'You do not have permission to view or manage incidents for this institution',
          statusCode: 403,
        })
      );
    });

    it('allows institution_admin to view incident for their own institution', async () => {
      query.mockResolvedValueOnce({
        rows: [
          {
            id: 105,
            institution_id: 1, // Incident belongs to institution 1
            candidate_id: 400,
            category: 'APPLICATION_ERROR',
            candidate_name: 'Student 1',
            assessment_title: 'Mock Test',
          },
        ],
      });
      query.mockResolvedValueOnce({ rows: [] }); // child events
      query.mockResolvedValueOnce({ rows: [] }); // audit trail

      const req = {
        params: { id: '105' },
        user: { id: 10, role: 'institution_admin', institution_id: 1 },
      };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
      const next = vi.fn();

      const result = await callHandler(getAdminIncidentDetails, req, res, next);
      expect(result.data.success).toBe(true);
      expect(result.data.incident.id).toBe(105);
    });

    it('grants platform superadmin full access across any institution', async () => {
      query.mockResolvedValueOnce({
        rows: [
          {
            id: 105,
            institution_id: 99, // Any institution
            candidate_id: 400,
            category: 'APPLICATION_ERROR',
            candidate_name: 'Student 1',
            assessment_title: 'Mock Test',
          },
        ],
      });
      query.mockResolvedValueOnce({ rows: [] }); // child events
      query.mockResolvedValueOnce({ rows: [] }); // audit trail

      const req = {
        params: { id: '105' },
        user: { id: 1, role: 'admin' }, // Platform superadmin
      };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
      const next = vi.fn();

      const result = await callHandler(getAdminIncidentDetails, req, res, next);
      expect(result.data.success).toBe(true);
      expect(result.data.incident.id).toBe(105);
    });
  });

  // =========================================================================
  // 6. Admin Assignment & Finite State Machine Status Transition Tests
  // =========================================================================
  describe('Admin Actions & FSM Status Transitions', () => {
    it('acknowledges incident and assigns it to current admin', async () => {
      query.mockResolvedValueOnce({
        rows: [{ id: 50, status: 'new', institution_id: null, assigned_to: null }],
      });
      query.mockResolvedValueOnce({
        rows: [{ id: 50, status: 'acknowledged', assigned_to: 1 }],
      });
      query.mockResolvedValueOnce({ rows: [{ id: 1 }] }); // audit log

      const req = {
        params: { id: '50' },
        user: { id: 1, role: 'admin', name: 'Chief Invigilator' },
      };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
      const next = vi.fn();

      const result = await callHandler(acknowledgeIncident, req, res, next);
      expect(result.data.success).toBe(true);
      expect(result.data.incident.status).toBe('acknowledged');
    });

    it('rejects invalid status transitions in the FSM', async () => {
      // Attempting to move directly from 'new' to 'closed' is disallowed by FSM
      query.mockResolvedValueOnce({
        rows: [{ id: 50, status: 'new', institution_id: null }],
      });

      const req = {
        params: { id: '50' },
        user: { id: 1, role: 'admin' },
        body: { status: 'closed', notes: 'Trying to skip steps' },
      };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
      const next = vi.fn();

      await callHandler(updateIncidentStatus, req, res, next);
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          message: expect.stringContaining("Invalid status transition from 'new' to 'closed'"),
          statusCode: 400,
        })
      );
    });

    it('successfully transitions from investigating to waiting_for_student with guidance message', async () => {
      query.mockResolvedValueOnce({
        rows: [{ id: 50, status: 'investigating', institution_id: null, assigned_to: 1 }],
      });
      query.mockResolvedValueOnce({
        rows: [
          {
            id: 50,
            status: 'waiting_for_student',
            last_student_message: 'Please re-grant screen share permission',
            assigned_to: 1,
          },
        ],
      });
      query.mockResolvedValueOnce({ rows: [{ id: 1 }] }); // audit log

      const req = {
        params: { id: '50' },
        user: { id: 1, role: 'admin' },
        body: {
          status: 'waiting_for_student',
          guidance_message: 'Please re-grant screen share permission',
        },
      };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
      const next = vi.fn();

      const result = await callHandler(updateIncidentStatus, req, res, next);
      expect(result.data.success).toBe(true);
      expect(result.data.incident.status).toBe('waiting_for_student');
      expect(result.data.incident.last_student_message).toBe('Please re-grant screen share permission');
    });

    it('resolves an incident with resolution notes and resolution category', async () => {
      query.mockResolvedValueOnce({
        rows: [{ id: 50, status: 'investigating', institution_id: null }],
      });
      query.mockResolvedValueOnce({
        rows: [
          {
            id: 50,
            status: 'resolved',
            resolution_notes: 'Verified answer synced in DB after network drain',
            resolution_category: 'answers_synced',
            resolved_by: 1,
          },
        ],
      });
      query.mockResolvedValueOnce({ rows: [{ id: 1 }] }); // audit log

      const req = {
        params: { id: '50' },
        user: { id: 1, role: 'admin' },
        body: {
          resolution_notes: 'Verified answer synced in DB after network drain',
          resolution_category: 'answers_synced',
        },
      };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
      const next = vi.fn();

      const result = await callHandler(resolveIncident, req, res, next);
      expect(result.data.success).toBe(true);
      expect(result.data.incident.status).toBe('resolved');
      expect(result.data.incident.resolution_category).toBe('answers_synced');
    });
  });

  // =========================================================================
  // 6. Direct Admin Notification Email (support@edvedum.com)
  // =========================================================================
  describe('Direct Admin Notification Email (support@edvedum.com)', () => {
    it('generates an email template targeting support with full incident and student context', () => {
      const email = incidentAlertEmailTemplate({
        incidentId: 999,
        incidentKey: 'inc_key_123',
        candidateName: 'Saurabh Sharma',
        candidateEmail: 'saurabh@edvedum.com',
        rollNumber: 'DRON-2026-001',
        assessmentTitle: 'NEET Full Mock 2026',
        attemptId: 42,
        category: 'NETWORK_DISCONNECTED',
        categoryLabel: 'Internet / Connectivity',
        severity: 'high',
        questionNumber: 15,
        description: 'Screen froze while clicking Save & Next',
        isBlocking: true,
        clientTimestamp: '2026-10-19T10:30:00Z',
        adminUrl: 'https://edvedum.com/admin/incidents?search=INC-999',
      });

      // Subject line
      expect(email.subject).toContain('[HIGH INCIDENT]');
      expect(email.subject).toContain('Internet / Connectivity');
      expect(email.subject).toContain('Saurabh Sharma');
      expect(email.subject).toContain('NEET Full Mock 2026');

      // HTML body details
      expect(email.html).toContain('INC-999');
      expect(email.html).toContain('HIGH SEVERITY');
      expect(email.html).toContain('Saurabh Sharma');
      expect(email.html).toContain('DRON-2026-001');
      expect(email.html).toContain('saurabh@edvedum.com');
      expect(email.html).toContain('NEET Full Mock 2026');
      expect(email.html).toContain('Question #15');
      expect(email.html).toContain('Screen froze while clicking Save & Next');
      expect(email.html).toContain('YES — Candidate is blocked from answering');
      expect(email.html).toContain('https://edvedum.com/admin/incidents?search=INC-999');
      expect(email.html).toContain('Open Admin Panel &amp; Resolve Issue');

      // Text fallback
      expect(email.text).toContain('[HIGH INCIDENT]');
      expect(email.text).toContain('Candidate: Saurabh Sharma');
      expect(email.text).toContain('Roll: DRON-2026-001');
      expect(email.text).toContain('https://edvedum.com/admin/incidents?search=INC-999');
    });

    it('handles optional fields gracefully without undefined or null tokens', () => {
      const email = incidentAlertEmailTemplate({
        incidentId: 1001,
        category: 'QUESTION_LOAD_FAILED',
      });

      expect(email.subject).toContain('[MEDIUM INCIDENT]');
      expect(email.subject).toContain('QUESTION LOAD FAILED');
      expect(email.subject).toContain('Candidate');
      expect(email.html).toContain('INC-1001');
      expect(email.html).toContain('No (Non-blocking)');
      expect(email.html).not.toContain('undefined');
      expect(email.html).not.toContain('null');
    });
  });
});
