import crypto from 'crypto';
import { query } from '../config/db.js';
import { ApiError } from '../utils/ApiError.js';
import { logger } from '../utils/logger.js';
import { sendIncidentAlertEmail } from '../utils/email.js';

// Approved Category Definitions
export const INCIDENT_CATEGORIES = {
  NETWORK_DISCONNECTED: 'NETWORK_DISCONNECTED',
  NETWORK_RESTORED: 'NETWORK_RESTORED',
  ANSWER_SAVE_FAILED: 'ANSWER_SAVE_FAILED',
  QUESTION_LOAD_FAILED: 'QUESTION_LOAD_FAILED',
  SUBMISSION_FAILED: 'SUBMISSION_FAILED',
  APPLICATION_ERROR: 'APPLICATION_ERROR',
  TIMER_MISMATCH: 'TIMER_MISMATCH',
  RECORDING_FAILED: 'RECORDING_FAILED',
  SCREENSHOT_FAILED: 'SCREENSHOT_FAILED',
  SCREEN_SHARING_STOPPED: 'SCREEN_SHARING_STOPPED',
  STUDENT_REPORTED_ISSUE: 'STUDENT_REPORTED_ISSUE',
};

// Approved Statuses
export const INCIDENT_STATUSES = {
  NEW: 'new',
  ACKNOWLEDGED: 'acknowledged',
  INVESTIGATING: 'investigating',
  WAITING_FOR_STUDENT: 'waiting_for_student',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
  DISMISSED: 'dismissed',
};

// Allowed Status Transition Graph
export const ALLOWED_TRANSITIONS = {
  new: ['acknowledged', 'investigating', 'dismissed'],
  acknowledged: ['investigating', 'waiting_for_student', 'resolved', 'dismissed'],
  investigating: ['waiting_for_student', 'resolved', 'closed', 'acknowledged'],
  waiting_for_student: ['investigating', 'resolved', 'closed'],
  resolved: ['closed', 'investigating'],
  closed: ['investigating'],
  dismissed: [], // terminal
};

// Prohibited / sensitive diagnostic keys
const SENSITIVE_KEY_PATTERN = /(password|token|access_token|authorization|cookie|secret|credential|auth|hash|jwt)/i;
const PROHIBITED_ANSWER_PATTERN = /(selected_option|answer_text|source_code|code|option_text|correct_index)/i;

/**
 * Recursively sanitizes diagnostic payloads to ensure no PII, credentials, or answer contents enter database logs.
 */
export function sanitizeDiagnostics(raw) {
  if (!raw || typeof raw !== 'object') return {};

  const clean = {};
  const entries = Array.isArray(raw) ? [] : Object.entries(raw);

  for (const [key, value] of entries) {
    if (SENSITIVE_KEY_PATTERN.test(key) || PROHIBITED_ANSWER_PATTERN.test(key)) {
      continue; // scrub sensitive keys
    }

    if (value === null || value === undefined) {
      continue;
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      clean[key] = sanitizeDiagnostics(value);
    } else if (Array.isArray(value)) {
      // If array contains numbers (e.g. uncommitted question IDs), preserve it
      if (value.every((v) => typeof v === 'number' || typeof v === 'string')) {
        clean[key] = value.slice(0, 50).map((v) => (typeof v === 'string' ? v.slice(0, 100) : v));
      }
    } else if (typeof value === 'string') {
      clean[key] = value.slice(0, 500); // cap string length
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      clean[key] = value;
    }
  }

  return clean;
}

/**
 * Calculates deterministic server-side severity based on category, recurrence, and data-loss risk.
 * Never trusts client-provided severity.
 */
export function calculateSeverity(category, occurrenceCount = 1, diagnostics = {}) {
  switch (category) {
    case INCIDENT_CATEGORIES.SUBMISSION_FAILED:
      return 'critical';

    case INCIDENT_CATEGORIES.ANSWER_SAVE_FAILED:
      if (occurrenceCount >= 3 || (diagnostics.uncommittedAnswerCount && diagnostics.uncommittedAnswerCount >= 3)) {
        return 'critical';
      }
      return 'high';

    case INCIDENT_CATEGORIES.QUESTION_LOAD_FAILED:
      if (occurrenceCount >= 4) return 'critical';
      return 'high';

    case INCIDENT_CATEGORIES.TIMER_MISMATCH:
      if (Math.abs(Number(diagnostics.clockSkewSeconds) || 0) > 120) {
        return 'critical';
      }
      return 'high';

    case INCIDENT_CATEGORIES.RECORDING_FAILED:
      if (occurrenceCount >= 3) return 'critical';
      return 'high';

    case INCIDENT_CATEGORIES.SCREEN_SHARING_STOPPED:
      if (occurrenceCount >= 3 || (diagnostics.stoppedDurationSeconds && diagnostics.stoppedDurationSeconds > 60)) {
        return 'critical';
      }
      return 'high';

    case INCIDENT_CATEGORIES.NETWORK_DISCONNECTED:
      if (Number(diagnostics.offlineDurationSeconds) > 60 || Number(diagnostics.remainingSeconds) < 300) {
        return 'high';
      }
      return 'medium';

    case INCIDENT_CATEGORIES.NETWORK_RESTORED:
      return 'low';

    case INCIDENT_CATEGORIES.SCREENSHOT_FAILED:
      if (occurrenceCount >= 2) return 'high';
      return 'medium';

    case INCIDENT_CATEGORIES.APPLICATION_ERROR:
      if (diagnostics.isFatal || occurrenceCount >= 3) return 'high';
      return 'medium';

    case INCIDENT_CATEGORIES.STUDENT_REPORTED_ISSUE:
      if (diagnostics.isBlocking) return 'high';
      return 'medium';

    default:
      return 'medium';
  }
}

/**
 * Generates human-friendly incident title based on category and question.
 */
export function generateIncidentTitle(category, questionId, source) {
  const prefix = source === 'student' ? 'Student Reported' : 'Technical Glitch';
  switch (category) {
    case INCIDENT_CATEGORIES.ANSWER_SAVE_FAILED:
      return questionId ? `Autosave Failed for Question #${questionId}` : 'Autosave Failed During Exam';
    case INCIDENT_CATEGORIES.SUBMISSION_FAILED:
      return 'Final Examination Submission Failed';
    case INCIDENT_CATEGORIES.QUESTION_LOAD_FAILED:
      return questionId ? `Failed to Load Question #${questionId}` : 'Question Content Load Failure';
    case INCIDENT_CATEGORIES.NETWORK_DISCONNECTED:
      return 'Candidate Network Connection Lost';
    case INCIDENT_CATEGORIES.NETWORK_RESTORED:
      return 'Candidate Network Connection Restored';
    case INCIDENT_CATEGORIES.TIMER_MISMATCH:
      return 'Exam Clock Skew / Timer Discrepancy';
    case INCIDENT_CATEGORIES.RECORDING_FAILED:
      return 'Proctoring Screen Recording Chunk Upload Failure';
    case INCIDENT_CATEGORIES.SCREEN_SHARING_STOPPED:
      return 'Proctoring Screen Sharing Was Interrupted';
    case INCIDENT_CATEGORIES.SCREENSHOT_FAILED:
      return 'Proctoring Automatic Screenshot Capture Failed';
    case INCIDENT_CATEGORIES.APPLICATION_ERROR:
      return 'CBT Interface Application Error / Crash';
    case INCIDENT_CATEGORIES.STUDENT_REPORTED_ISSUE:
      return questionId ? `Issue Reported on Question #${questionId}` : 'Student Reported Issue';
    default:
      return `${prefix}: ${category}`;
  }
}

/**
 * Computes deterministic deduplication fingerprint.
 */
export function computeIncidentKey(attemptId, category, questionId = null) {
  const raw = `${attemptId}:${category}:${questionId || 0}`;
  return crypto.createHash('md5').update(raw).digest('hex').slice(0, 32);
}

/**
 * Appends an entry to the immutable audit trail.
 */
export async function recordAuditTrail({
  incidentId,
  actorId = null,
  actorRole = 'system',
  action,
  fromStatus = null,
  toStatus = null,
  notes = null,
  metadata = {},
}) {
  try {
    const res = await query(
      `INSERT INTO exam_incident_audit_trail
         (incident_id, actor_id, actor_role, action, from_status, to_status, notes, metadata, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
       RETURNING *`,
      [
        incidentId,
        actorId,
        actorRole,
        action,
        fromStatus,
        toStatus,
        notes,
        JSON.stringify(metadata || {}),
      ]
    );
    return res.rows[0];
  } catch (err) {
    logger.error('[incidentService] Failed to record audit trail:', {
      incidentId,
      action,
      error: err.message,
    });
    return null;
  }
}

/**
 * Ingests a technical incident or student-reported event.
 * Handles deduplication, idempotency, server-side severity, and tenant derivation.
 */
export async function ingestIncident({
  attemptId,
  candidateId,
  category,
  questionId = null,
  description,
  diagnostics = {},
  source = 'system',
  idempotencyKey = null,
}) {
  // 1. Validate Attempt & Derive trusted tenant and assessment context
  const attemptRes = await query(
    `SELECT at.id, at.assessment_id, at.candidate_id, at.status, u.institution_id,
            u.name AS candidate_name, u.email AS candidate_email, u.roll_number,
            a.title AS assessment_title
     FROM attempts at
     JOIN users u ON u.id = at.candidate_id
     JOIN assessments a ON a.id = at.assessment_id
     WHERE at.id = $1`,
    [attemptId]
  );

  const attempt = attemptRes.rows[0];
  if (!attempt) {
    throw ApiError.notFound('Attempt not found');
  }

  // 2. Validate candidate ownership
  if (attempt.candidate_id !== candidateId) {
    throw ApiError.forbidden('Unauthorized access to attempt: candidate identity mismatch');
  }

  // 3. Reject incident reporting for already finalized or submitted attempts (except submission failure itself)
  if (attempt.status !== 'in_progress' && category !== INCIDENT_CATEGORIES.SUBMISSION_FAILED) {
    throw ApiError.conflict('Cannot report technical incidents on an attempt that is already completed or submitted');
  }

  // 4. Sanitize diagnostics and generate idempotency key
  const safeDiagnostics = sanitizeDiagnostics(diagnostics);
  const safeIdempotencyKey = idempotencyKey || (diagnostics.idempotencyKey ? String(diagnostics.idempotencyKey).trim() : null);

  // 5. Idempotency Check: if idempotency key provided and already processed, return existing
  if (safeIdempotencyKey) {
    const existingEventRes = await query(
      `SELECT e.id, e.incident_id, i.incident_key, i.status, i.severity, i.occurrence_count
       FROM exam_incident_events e
       JOIN exam_technical_incidents i ON i.id = e.incident_id
       WHERE e.idempotency_key = $1`,
      [safeIdempotencyKey]
    );

    if ((existingEventRes.rows && existingEventRes.rows.length > 0) || existingEventRes.rowCount > 0) {
      const match = existingEventRes.rows[0];
      return {
        isNew: false,
        isDuplicateEvent: true,
        incidentId: match.incident_id,
        status: match.status,
        severity: match.severity,
        occurrenceCount: match.occurrence_count,
      };
    }
  }

  // 6. Deduplication Check: Look for active incident with identical fingerprint
  const incidentKey = computeIncidentKey(attemptId, category, questionId);

  const activeIncidentRes = await query(
    `SELECT id, occurrence_count, severity, status
     FROM exam_technical_incidents
     WHERE incident_key = $1
       AND status IN ('new', 'acknowledged', 'investigating', 'waiting_for_student')
     LIMIT 1`,
    [incidentKey]
  );

  const cleanDescription = (description || '').slice(0, 3000);

  // === CASE A: Active parent incident exists -> Deduplicate & Append Child Event ===
  if ((activeIncidentRes.rows && activeIncidentRes.rows.length > 0) || activeIncidentRes.rowCount > 0) {
    const parent = activeIncidentRes.rows[0];
    const newCount = parent.occurrence_count + 1;
    const newSeverity = calculateSeverity(category, newCount, safeDiagnostics);

    // Update parent occurrence count, last seen, and student message if provided
    const updatedParentRes = await query(
      `UPDATE exam_technical_incidents
       SET occurrence_count = $1,
           severity = $2,
           last_seen_at = NOW(),
           last_diagnostics = $3,
           last_student_message = COALESCE($4, last_student_message),
           updated_at = NOW()
       WHERE id = $5
       RETURNING *`,
      [
        newCount,
        newSeverity,
        JSON.stringify(safeDiagnostics),
        cleanDescription || null,
        parent.id,
      ]
    );

    const updatedParent = updatedParentRes.rows[0];

    // Insert child event log
    await query(
      `INSERT INTO exam_incident_events
         (incident_id, idempotency_key, event_category, severity, raw_message, diagnostics, client_timestamp, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())`,
      [
        parent.id,
        safeIdempotencyKey,
        category,
        newSeverity,
        cleanDescription,
        JSON.stringify(safeDiagnostics),
      ]
    );

    // If severity escalated, log audit entry
    if (newSeverity !== parent.severity) {
      await recordAuditTrail({
        incidentId: parent.id,
        actorRole: 'system',
        action: 'escalated',
        fromStatus: parent.status,
        toStatus: parent.status,
        notes: `Severity automatically escalated from ${parent.severity} to ${newSeverity} after ${newCount} occurrences`,
        metadata: { previous_severity: parent.severity, new_severity: newSeverity, occurrence_count: newCount },
      });
    }

    // If student reported or escalated, dispatch notification email directly to support@edvedum.com (non-blocking)
    if (source === 'student' || safeDiagnostics?.reportedByStudent || newSeverity === 'critical' || newSeverity === 'high') {
      sendIncidentAlertEmail({
        incidentId: parent.id,
        incidentKey,
        candidateName: attempt.candidate_name,
        candidateEmail: attempt.candidate_email,
        rollNumber: attempt.roll_number,
        assessmentTitle: attempt.assessment_title,
        attemptId,
        category,
        categoryLabel: safeDiagnostics.categoryLabel,
        severity: newSeverity,
        questionNumber: safeDiagnostics.questionNumber,
        description: cleanDescription,
        isBlocking: Boolean(safeDiagnostics.isBlocking),
        clientTimestamp: safeDiagnostics.clientTimestamp,
      }).catch((emailErr) => {
        logger.warn('[incidentService] Non-blocking incident re-report alert email failed:', {
          error: emailErr.message,
          incidentId: parent.id,
        });
      });
    }

    return {
      isNew: false,
      isDuplicateEvent: false,
      incident: updatedParent,
    };
  }

  // === CASE B: No active parent incident -> Create New Incident ===
  const initialSeverity = calculateSeverity(category, 1, safeDiagnostics);
  const title = generateIncidentTitle(category, questionId, source);

  const insertParentRes = await query(
    `INSERT INTO exam_technical_incidents
       (incident_key, attempt_id, assessment_id, candidate_id, institution_id, question_id,
        category, severity, status, source, title, description, last_student_message, occurrence_count,
        first_seen_at, last_seen_at, last_diagnostics, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'new', $9, $10, $11, $12, 1, NOW(), NOW(), $13, NOW(), NOW())
     RETURNING *`,
    [
      incidentKey,
      attemptId,
      attempt.assessment_id,
      candidateId,
      attempt.institution_id || null,
      questionId,
      category,
      initialSeverity,
      source,
      title,
      cleanDescription,
      source === 'student' || safeDiagnostics.reportedByStudent ? cleanDescription : null,
      JSON.stringify(safeDiagnostics),
    ]
  );

  const newIncident = insertParentRes.rows[0];

  // Insert first child event
  await query(
    `INSERT INTO exam_incident_events
       (incident_id, idempotency_key, event_category, severity, raw_message, diagnostics, client_timestamp, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())`,
    [
      newIncident.id,
      safeIdempotencyKey,
      category,
      initialSeverity,
      cleanDescription,
      JSON.stringify(safeDiagnostics),
    ]
  );

  // Record audit log for incident creation
  await recordAuditTrail({
    incidentId: newIncident.id,
    actorId: candidateId,
    actorRole: source === 'student' ? 'candidate' : 'system',
    action: 'created',
    fromStatus: null,
    toStatus: 'new',
    notes: `Incident logged (${initialSeverity.toUpperCase()}) - ${title}`,
    metadata: { source, category, question_id: questionId },
  });

  // Dispatch background email alert directly to support@edvedum.com (non-blocking)
  sendIncidentAlertEmail({
    incidentId: newIncident.id,
    incidentKey: newIncident.incident_key,
    candidateName: attempt.candidate_name,
    candidateEmail: attempt.candidate_email,
    rollNumber: attempt.roll_number,
    assessmentTitle: attempt.assessment_title,
    attemptId,
    category,
    categoryLabel: safeDiagnostics.categoryLabel,
    severity: initialSeverity,
    questionNumber: safeDiagnostics.questionNumber,
    description: cleanDescription,
    isBlocking: Boolean(safeDiagnostics.isBlocking),
    clientTimestamp: safeDiagnostics.clientTimestamp,
  }).catch((emailErr) => {
    logger.warn('[incidentService] Non-blocking incident alert email delivery failed:', {
      error: emailErr.message,
      incidentId: newIncident.id,
    });
  });

  return {
    isNew: true,
    isDuplicateEvent: false,
    incident: newIncident,
  };
}
