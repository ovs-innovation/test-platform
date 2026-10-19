import { query } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { logger } from '../utils/logger.js';
import {
  INCIDENT_CATEGORIES,
  INCIDENT_STATUSES,
  ALLOWED_TRANSITIONS,
  ingestIncident,
  recordAuditTrail,
} from '../services/incidentService.js';

/**
 * Validates tenant access for institution_admin against incident or candidate institution.
 */
function checkTenantAccess(req, resourceInstitutionId) {
  if (req.user.role === 'admin') return; // Platform superadmin has full access

  if (req.user.role === 'institution_admin') {
    const userInstId = Number(req.user.institution_id || req.institution_id);
    const targetInstId = Number(resourceInstitutionId);

    if (!userInstId || !targetInstId || userInstId !== targetInstId) {
      throw ApiError.forbidden('You do not have permission to view or manage incidents for this institution');
    }
    return;
  }

  throw ApiError.forbidden('Unauthorized access to administrative incident resource');
}

/**
 * POST /api/attempts/:id/incidents
 * Candidate incident & client telemetry ingestion endpoint
 */
export const reportCandidateIncident = asyncHandler(async (req, res) => {
  const attemptId = Number(req.params.id);
  const candidateId = req.user.id;
  const { category, question_id, description, diagnostics } = req.body;

  const idempotencyKey =
    req.headers['x-idempotency-key'] ||
    req.headers['idempotency-key'] ||
    (diagnostics && diagnostics.idempotencyKey) ||
    null;

  const result = await ingestIncident({
    attemptId,
    candidateId,
    category,
    questionId: question_id || null,
    description,
    diagnostics: diagnostics || {},
    source:
      category === INCIDENT_CATEGORIES.STUDENT_REPORTED_ISSUE || diagnostics?.reportedByStudent
        ? 'student'
        : 'system',
    idempotencyKey,
  });

  if (result.isDuplicateEvent) {
    return res.status(200).json({
      success: true,
      deduplicated: true,
      isDuplicateEvent: true,
      incident_id: result.incidentId,
      status: result.status,
      severity: result.severity,
      occurrence_count: result.occurrenceCount,
    });
  }

  res.status(result.isNew ? 201 : 200).json({
    success: true,
    deduplicated: !result.isNew,
    incident: result.incident,
  });
});

/**
 * GET /api/attempts/:id/incidents/active
 * Candidate endpoint to check active incidents and guidance for their current attempt
 */
export const getActiveAttemptIncidents = asyncHandler(async (req, res) => {
  const attemptId = Number(req.params.id);

  const attemptRes = await query('SELECT id, candidate_id FROM attempts WHERE id = $1', [attemptId]);
  const attempt = attemptRes.rows[0];
  if (!attempt) throw ApiError.notFound('Attempt not found');
  if (attempt.candidate_id !== req.user.id && req.user.role !== 'admin') {
    throw ApiError.forbidden('Unauthorized access to attempt');
  }

  const incidentsRes = await query(
    `SELECT id, category, severity, status, title, question_id,
            last_student_message, first_seen_at, last_seen_at, occurrence_count
     FROM exam_technical_incidents
     WHERE attempt_id = $1
       AND status IN ('new', 'acknowledged', 'investigating', 'waiting_for_student')
     ORDER BY last_seen_at DESC`,
    [attemptId]
  );

  res.json({
    success: true,
    server_time: new Date().toISOString(),
    active_incidents: incidentsRes.rows,
  });
});

/**
 * GET /api/admin/incidents
 * Admin incident listing with multi-tenant scoping, filtering, and KPI summaries
 */
export const listAdminIncidents = asyncHandler(async (req, res) => {
  const {
    status = 'active',
    severity,
    category,
    assessment_id,
    attempt_id,
    institution_id,
    search,
    date,
    date_from,
    date_to,
    page = 1,
    limit = 20,
  } = req.query;

  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
  const offset = (pageNum - 1) * limitNum;

  const whereClauses = [];
  const params = [];

  // Tenant Scoping
  if (req.user.role === 'institution_admin') {
    params.push(req.user.institution_id || req.institution_id);
    whereClauses.push(`i.institution_id = $${params.length}`);
  } else if (institution_id) {
    params.push(Number(institution_id));
    whereClauses.push(`i.institution_id = $${params.length}`);
  }

  // Status Filter
  if (status === 'active') {
    whereClauses.push(`i.status IN ('new', 'acknowledged', 'investigating', 'waiting_for_student')`);
  } else if (status && status !== 'all') {
    params.push(status);
    whereClauses.push(`i.status = $${params.length}`);
  }

  // Severity Filter
  if (severity && severity !== 'all') {
    params.push(severity);
    whereClauses.push(`i.severity = $${params.length}`);
  }

  // Category Filter
  if (category && category !== 'all') {
    params.push(category);
    whereClauses.push(`i.category = $${params.length}`);
  }

  // Assessment Filter
  if (assessment_id) {
    params.push(Number(assessment_id));
    whereClauses.push(`i.assessment_id = $${params.length}`);
  }

  // Attempt Filter
  if (attempt_id) {
    params.push(Number(attempt_id));
    whereClauses.push(`i.attempt_id = $${params.length}`);
  }

  // Date Filter
  if (date === 'today') {
    whereClauses.push(`i.last_seen_at >= CURRENT_DATE`);
  } else if (date === '7d') {
    whereClauses.push(`i.last_seen_at >= CURRENT_DATE - INTERVAL '7 days'`);
  } else if (date === '30d') {
    whereClauses.push(`i.last_seen_at >= CURRENT_DATE - INTERVAL '30 days'`);
  } else {
    if (date_from) {
      params.push(date_from);
      whereClauses.push(`i.last_seen_at >= $${params.length}`);
    }
    if (date_to) {
      params.push(date_to);
      whereClauses.push(`i.last_seen_at <= $${params.length}`);
    }
  }

  // Search Filter: support candidate name, email, titles, incident ref (INC-142), and attempt ID
  if (search && String(search).trim()) {
    const rawSearch = String(search).trim();
    params.push(`%${rawSearch}%`);
    const pIdx = params.length;

    // Check if numeric digits exist (e.g. "INC-142" or "142")
    const digitsOnly = rawSearch.replace(/[^0-9]/g, '');
    let numClause = '';
    if (digitsOnly) {
      params.push(parseInt(digitsOnly, 10));
      const nIdx = params.length;
      numClause = ` OR i.id = $${nIdx} OR i.attempt_id = $${nIdx}`;
    }

    whereClauses.push(`(
      u.name ILIKE $${pIdx} OR 
      u.email ILIKE $${pIdx} OR 
      i.title ILIKE $${pIdx} OR 
      i.description ILIKE $${pIdx} OR 
      a.title ILIKE $${pIdx} OR
      i.incident_key ILIKE $${pIdx} OR
      i.id::text ILIKE $${pIdx} OR
      i.attempt_id::text ILIKE $${pIdx}${numClause}
    )`);
  }

  const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

  // 1. Fetch KPI Summary for current tenant filter
  const summaryParams = [];
  let summaryWhere = '';
  if (req.user.role === 'institution_admin') {
    summaryParams.push(req.user.institution_id || req.institution_id);
    summaryWhere = `WHERE institution_id = $1`;
  } else if (institution_id) {
    summaryParams.push(Number(institution_id));
    summaryWhere = `WHERE institution_id = $1`;
  }

  const summaryRes = await query(
    `SELECT
       COUNT(*) FILTER (WHERE status IN ('new', 'acknowledged', 'investigating', 'waiting_for_student'))::int AS active_total,
       COUNT(*) FILTER (WHERE status = 'new')::int AS new_count,
       COUNT(*) FILTER (WHERE severity = 'critical' AND status IN ('new', 'acknowledged', 'investigating', 'waiting_for_student'))::int AS critical_count,
       COUNT(*) FILTER (WHERE status = 'investigating')::int AS investigating_count,
       COUNT(*) FILTER (WHERE status = 'resolved')::int AS resolved_count,
       COUNT(*) FILTER (WHERE severity = 'high' AND status IN ('new', 'acknowledged', 'investigating', 'waiting_for_student'))::int AS high_count,
       COUNT(*) FILTER (WHERE assigned_to IS NULL AND status IN ('new', 'acknowledged', 'investigating', 'waiting_for_student'))::int AS unassigned_count
     FROM exam_technical_incidents
     ${summaryWhere}`,
    summaryParams
  );

  // 2. Count total matching rows
  const countRes = await query(
    `SELECT COUNT(*)::int AS total
     FROM exam_technical_incidents i
     JOIN users u ON u.id = i.candidate_id
     JOIN assessments a ON a.id = i.assessment_id
     ${whereSql}`,
    params
  );
  const total = countRes.rows[0]?.total || 0;

  // 3. Query paginated incident records
  const queryParams = [...params, limitNum, offset];
  const listRes = await query(
    `SELECT 
       i.id,
       i.incident_key,
       i.attempt_id,
       i.assessment_id,
       a.title AS assessment_title,
       i.candidate_id,
       u.name AS candidate_name,
       u.email AS candidate_email,
       i.institution_id,
       inst.name AS institution_name,
       i.question_id,
       i.category,
       i.severity,
       i.status,
       i.source,
       i.title,
       i.description,
       i.occurrence_count,
       i.assigned_to,
       admin_u.name AS assigned_admin_name,
       i.assigned_at,
       i.acknowledged_at,
       i.last_student_message,
       i.first_seen_at,
       i.last_seen_at,
       i.resolved_at,
       i.resolution_category,
       ps.status AS proctoring_status
     FROM exam_technical_incidents i
     JOIN users u ON u.id = i.candidate_id
     JOIN assessments a ON a.id = i.assessment_id
     LEFT JOIN institutions inst ON inst.id = i.institution_id
     LEFT JOIN users admin_u ON admin_u.id = i.assigned_to
     LEFT JOIN proctoring_sessions ps ON ps.attempt_id = i.attempt_id
     ${whereSql}
     ORDER BY 
       CASE i.severity
         WHEN 'critical' THEN 1
         WHEN 'high' THEN 2
         WHEN 'medium' THEN 3
         ELSE 4
       END ASC,
       i.last_seen_at DESC
     LIMIT $${queryParams.length - 1} OFFSET $${queryParams.length}`,
    queryParams
  );

  res.json({
    success: true,
    summary: summaryRes.rows[0] || {
      active_total: 0,
      new_count: 0,
      critical_count: 0,
      investigating_count: 0,
      resolved_count: 0,
      high_count: 0,
      unassigned_count: 0,
    },
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      total_pages: Math.ceil(total / limitNum) || 1,
    },
    incidents: listRes.rows,
  });
});

/**
 * GET /api/admin/incidents/:id
 * Retrieve full incident details, child event log, and audit trail
 */
export const getAdminIncidentDetails = asyncHandler(async (req, res) => {
  const incidentId = Number(req.params.incident_id || req.params.id);

  const incidentRes = await query(
    `SELECT 
       i.*,
       a.title AS assessment_title,
       u.name AS candidate_name,
       u.email AS candidate_email,
       inst.name AS institution_name,
       admin_u.name AS assigned_admin_name,
       res_u.name AS resolved_admin_name,
       ps.session_id AS proctoring_session_id,
       ps.status AS proctoring_status,
       ps.total_chunks AS proctoring_total_chunks,
       ps.started_at AS proctoring_started_at,
       ps.ended_at AS proctoring_ended_at,
       ps.stop_reason AS proctoring_stop_reason,
       (SELECT COUNT(*) FROM proctoring_screenshots pss WHERE pss.attempt_id = i.attempt_id)::int AS screenshots_count,
       (SELECT COUNT(*) FROM proctoring_screenshots pss WHERE pss.attempt_id = i.attempt_id AND pss.status = 'missed')::int AS missed_screenshots_count
     FROM exam_technical_incidents i
     JOIN users u ON u.id = i.candidate_id
     JOIN assessments a ON a.id = i.assessment_id
     LEFT JOIN institutions inst ON inst.id = i.institution_id
     LEFT JOIN users admin_u ON admin_u.id = i.assigned_to
     LEFT JOIN users res_u ON res_u.id = i.resolved_by
     LEFT JOIN proctoring_sessions ps ON ps.attempt_id = i.attempt_id
     WHERE i.id = $1`,
    [incidentId]
  );

  const incident = incidentRes.rows[0];
  if (!incident) throw ApiError.notFound('Technical incident not found');

  checkTenantAccess(req, incident.institution_id);

  // Fetch child events
  const eventsRes = await query(
    `SELECT id, idempotency_key, event_category, severity, raw_message, diagnostics, client_timestamp, created_at
     FROM exam_incident_events
     WHERE incident_id = $1
     ORDER BY created_at ASC`,
    [incidentId]
  );

  // Fetch audit trail
  const auditRes = await query(
    `SELECT a.id, a.actor_id, a.actor_role, a.action, a.from_status, a.to_status,
            a.notes, a.metadata, a.created_at, u.name AS actor_name
     FROM exam_incident_audit_trail a
     LEFT JOIN users u ON u.id = a.actor_id
     WHERE a.incident_id = $1
     ORDER BY a.created_at ASC`,
    [incidentId]
  );

  res.json({
    success: true,
    incident,
    events: eventsRes.rows,
    audit_trail: auditRes.rows,
  });
});

/**
 * POST /api/admin/incidents/:id/acknowledge
 * Acknowledges incident and assigns it to current admin
 */
export const acknowledgeIncident = asyncHandler(async (req, res) => {
  const incidentId = Number(req.params.incident_id || req.params.id);

  const incidentRes = await query('SELECT id, status, institution_id, assigned_to FROM exam_technical_incidents WHERE id = $1', [incidentId]);
  const incident = incidentRes.rows[0];
  if (!incident) throw ApiError.notFound('Incident not found');

  checkTenantAccess(req, incident.institution_id);

  const fromStatus = incident.status;
  const toStatus = 'acknowledged';

  if (!ALLOWED_TRANSITIONS[fromStatus] || !ALLOWED_TRANSITIONS[fromStatus].includes(toStatus)) {
    throw ApiError.badRequest(`Cannot acknowledge incident from '${fromStatus}' status`);
  }

  const updatedRes = await query(
    `UPDATE exam_technical_incidents
     SET status = $1::varchar,
         assigned_to = COALESCE(assigned_to, $2::integer),
         assigned_at = COALESCE(assigned_at, NOW()),
         acknowledged_at = NOW(),
         updated_at = NOW()
     WHERE id = $3
     RETURNING *`,
    [toStatus, req.user.id, incidentId]
  );

  await recordAuditTrail({
    incidentId,
    actorId: req.user.id,
    actorRole: req.user.role,
    action: 'acknowledged',
    fromStatus,
    toStatus,
    notes: `Incident acknowledged by ${req.user.name || 'Invigilator'}`,
  });

  res.json({
    success: true,
    incident: updatedRes.rows[0],
  });
});

/**
 * PATCH /api/admin/incidents/:id/assign
 * Assigns or reassigns an incident to an invigilator
 */
export const assignIncident = asyncHandler(async (req, res) => {
  const incidentId = Number(req.params.incident_id || req.params.id);
  const { assigned_to } = req.body;

  const incidentRes = await query('SELECT id, institution_id, assigned_to FROM exam_technical_incidents WHERE id = $1', [incidentId]);
  const incident = incidentRes.rows[0];
  if (!incident) throw ApiError.notFound('Incident not found');

  checkTenantAccess(req, incident.institution_id);

  const targetAdminId = assigned_to ? Number(assigned_to) : null;
  if (targetAdminId) {
    const adminCheck = await query('SELECT id, name, role FROM users WHERE id = $1', [targetAdminId]);
    if (adminCheck.rowCount === 0) throw ApiError.notFound('Assigned user not found');
  }

  const updatedRes = await query(
    `UPDATE exam_technical_incidents
     SET assigned_to = $1::integer,
         assigned_at = CASE WHEN $1::integer IS NOT NULL THEN NOW() ELSE NULL END,
         updated_at = NOW()
     WHERE id = $2
     RETURNING *`,
    [targetAdminId, incidentId]
  );

  await recordAuditTrail({
    incidentId,
    actorId: req.user.id,
    actorRole: req.user.role,
    action: incident.assigned_to ? 'reassigned' : 'assigned',
    notes: targetAdminId ? `Assigned to user #${targetAdminId}` : 'Incident unassigned',
    metadata: { previous_assigned_to: incident.assigned_to, new_assigned_to: targetAdminId },
  });

  res.json({
    success: true,
    incident: updatedRes.rows[0],
  });
});

/**
 * POST /api/admin/incidents/:id/notes
 * Appends internal investigation notes to the incident
 */
export const addInvestigationNotes = asyncHandler(async (req, res) => {
  const incidentId = Number(req.params.incident_id || req.params.id);
  const { notes, guidance_message } = req.body;

  const incidentRes = await query('SELECT id, institution_id, investigation_notes FROM exam_technical_incidents WHERE id = $1', [incidentId]);
  const incident = incidentRes.rows[0];
  if (!incident) throw ApiError.notFound('Incident not found');

  checkTenantAccess(req, incident.institution_id);

  const timestamp = new Date().toISOString();
  const newNoteEntry = `[${timestamp} - ${req.user.name || 'Admin'}]: ${notes.trim()}`;
  const combinedNotes = incident.investigation_notes
    ? `${incident.investigation_notes}\n\n${newNoteEntry}`
    : newNoteEntry;

  const updatedRes = await query(
    `UPDATE exam_technical_incidents
     SET investigation_notes = $1,
         last_student_message = COALESCE($2::text, last_student_message),
         status = CASE WHEN status = 'new' THEN 'investigating' ELSE status END,
         updated_at = NOW()
     WHERE id = $3
     RETURNING *`,
    [combinedNotes, guidance_message ? guidance_message.trim() : null, incidentId]
  );

  await recordAuditTrail({
    incidentId,
    actorId: req.user.id,
    actorRole: req.user.role,
    action: 'investigation_note_added',
    notes: notes.trim(),
    metadata: guidance_message ? { guidance_message: guidance_message.trim() } : {},
  });

  res.json({
    success: true,
    incident: updatedRes.rows[0],
  });
});

/**
 * PATCH /api/admin/incidents/:id/status
 * Manages FSM status transitions (new -> investigating -> waiting_for_student -> resolved -> closed)
 */
export const updateIncidentStatus = asyncHandler(async (req, res) => {
  const incidentId = Number(req.params.incident_id || req.params.id);
  const { status: toStatus, notes, guidance_message, resolution_category } = req.body;

  const incidentRes = await query('SELECT id, status, institution_id, assigned_to FROM exam_technical_incidents WHERE id = $1', [incidentId]);
  const incident = incidentRes.rows[0];
  if (!incident) throw ApiError.notFound('Incident not found');

  checkTenantAccess(req, incident.institution_id);

  const fromStatus = incident.status;

  if (fromStatus === toStatus && !guidance_message && !notes && !resolution_category) {
    return res.json({ success: true, incident });
  }

  const allowed = [...(ALLOWED_TRANSITIONS[fromStatus] || []), fromStatus];
  if (!allowed.includes(toStatus)) {
    throw ApiError.badRequest(
      `Invalid status transition from '${fromStatus}' to '${toStatus}'. Allowed transitions: ${(ALLOWED_TRANSITIONS[fromStatus] || []).join(', ') || 'none (terminal state)'}`
    );
  }

  let resolvedAt = null;
  let resolvedBy = null;
  let resolutionNotes = null;
  let resCategory = null;

  if (toStatus === 'resolved') {
    resolvedAt = new Date();
    resolvedBy = req.user.id;
    resolutionNotes = (notes || '').trim() || 'Issue resolved by invigilator';
    resCategory = resolution_category || 'other';
  }

  const updatedRes = await query(
    `UPDATE exam_technical_incidents
     SET status = $1::varchar,
         last_student_message = COALESCE($2::text, last_student_message),
         resolution_notes = COALESCE($3::text, resolution_notes),
         resolution_category = COALESCE($4::varchar, resolution_category),
         resolved_at = CASE WHEN $1::varchar = 'resolved'::varchar THEN NOW() ELSE resolved_at END,
         resolved_by = CASE WHEN $1::varchar = 'resolved'::varchar THEN $5::integer ELSE resolved_by END,
         assigned_to = COALESCE(assigned_to, $5::integer),
         updated_at = NOW()
     WHERE id = $6
     RETURNING *`,
    [
      toStatus,
      guidance_message ? guidance_message.trim() : null,
      resolutionNotes,
      resCategory,
      req.user.id,
      incidentId,
    ]
  );

  await recordAuditTrail({
    incidentId,
    actorId: req.user.id,
    actorRole: req.user.role,
    action: 'status_changed',
    fromStatus,
    toStatus,
    notes: notes || guidance_message || `Status updated to ${toStatus}`,
    metadata: { guidance_message, resolution_category },
  });

  res.json({
    success: true,
    incident: updatedRes.rows[0],
  });
});

/**
 * POST /api/admin/incidents/:id/resolve
 * Convenience endpoint for 1-click incident resolution
 */
export const resolveIncident = asyncHandler(async (req, res) => {
  const incidentId = Number(req.params.incident_id || req.params.id);
  const { resolution_notes, notes, resolution_category } = req.body;

  const incidentRes = await query('SELECT id, status, institution_id FROM exam_technical_incidents WHERE id = $1', [incidentId]);
  const incident = incidentRes.rows[0];
  if (!incident) throw ApiError.notFound('Incident not found');

  checkTenantAccess(req, incident.institution_id);

  const fromStatus = incident.status;
  const toStatus = 'resolved';

  const allowed = ALLOWED_TRANSITIONS[fromStatus] || [];
  if (!allowed.includes(toStatus)) {
    throw ApiError.badRequest(`Cannot resolve incident from '${fromStatus}' status. Allowed next states: ${allowed.join(', ')}`);
  }

  const cleanNotes = (resolution_notes || notes || 'Issue resolved by invigilator').trim();
  const cleanCategory = (resolution_category || 'other').trim();

  const updatedRes = await query(
    `UPDATE exam_technical_incidents
     SET status = 'resolved',
         resolution_notes = $1,
         resolution_category = $2,
         resolved_at = NOW(),
         resolved_by = $3::integer,
         assigned_to = COALESCE(assigned_to, $3::integer),
         updated_at = NOW()
     WHERE id = $4
     RETURNING *`,
    [cleanNotes, cleanCategory, req.user.id, incidentId]
  );

  await recordAuditTrail({
    incidentId,
    actorId: req.user.id,
    actorRole: req.user.role,
    action: 'resolved',
    fromStatus,
    toStatus,
    notes: cleanNotes,
    metadata: { resolution_category: cleanCategory },
  });

  res.json({
    success: true,
    incident: updatedRes.rows[0],
  });
});
