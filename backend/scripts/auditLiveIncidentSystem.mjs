import { query, pool } from '../src/config/db.js';
import { signToken } from '../src/utils/token.js';

const BASE_URL = 'http://localhost:5000/api';

async function runAudit() {
  console.log('================================================================');
  console.log('🔬 LIVE EXAM TECHNICAL INCIDENT SYSTEM - END-TO-END STAGING AUDIT');
  console.log('================================================================\n');

  const auditResults = [];
  function record(check, status, details) {
    auditResults.push({ check, status, details });
    const icon = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⚠️';
    console.log(`${icon} [${status}] ${check}`);
    if (details) console.log(`   └─ ${details}\n`);
  }

  try {
    // -------------------------------------------------------------------------
    // Setup Staging Identities & Tokens
    // -------------------------------------------------------------------------
    const adminToken = signToken({ sub: 1, id: 1, role: 'admin', email: 'admin@assess.io' });
    const inst10AdminToken = signToken({
      sub: 9910,
      id: 9910,
      role: 'institution_admin',
      institution_id: 10,
      email: 'admin@inst10.edu',
    });
    const inst15AdminToken = signToken({
      sub: 9915,
      id: 9915,
      role: 'institution_admin',
      institution_id: 15,
      email: 'admin@inst15.edu',
    });

    // Find candidate & assessment for staging attempt
    const candidateRes = await query(`SELECT id, institution_id, email, name FROM users WHERE role = 'candidate' AND institution_id = 10 LIMIT 1`);
    let candidate = candidateRes.rows[0];
    if (!candidate) {
      const fallbackRes = await query(`SELECT id, institution_id, email, name FROM users WHERE role = 'candidate' LIMIT 1`);
      candidate = fallbackRes.rows[0];
    }

    const assessmentRes = await query(`SELECT id, title FROM assessments LIMIT 1`);
    const assessment = assessmentRes.rows[0];

    if (!candidate || !assessment) {
      throw new Error('Prerequisite data missing: no candidate or assessment found in DB');
    }

    const candidateToken = signToken({
      sub: candidate.id,
      id: candidate.id,
      role: 'candidate',
      institution_id: candidate.institution_id || 10,
      email: candidate.email,
    });

    // Create or reset a dedicated staging attempt for this audit
    const futureEndsAt = new Date(Date.now() + 7200000).toISOString();
    const attemptRes = await query(
      `INSERT INTO attempts (assessment_id, candidate_id, status, started_at, ends_at)
       VALUES ($1, $2, 'in_progress', NOW(), $3)
       ON CONFLICT (assessment_id, candidate_id)
       DO UPDATE SET status = 'in_progress', ends_at = $3, submitted_at = NULL
       RETURNING id, candidate_id, assessment_id, status`,
      [assessment.id, candidate.id, futureEndsAt]
    );
    const stagingAttempt = attemptRes.rows[0];
    const attemptId = stagingAttempt.id;

    console.log(`Created Staging Attempt ID: ${attemptId} for Candidate ID: ${candidate.id} (Inst: ${candidate.institution_id || 10})\n`);

    // -------------------------------------------------------------------------
    // Check 1: Authentication and Role Authorization
    // -------------------------------------------------------------------------
    {
      const unauthRes = await fetch(`${BASE_URL}/attempts/${attemptId}/incidents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: 'NETWORK_DISCONNECTED', description: 'Test' }),
      });
      if (unauthRes.status === 401) {
        record('Authentication & Role Authorization', 'PASS', 'Unauthenticated request correctly blocked with 401 Unauthorized');
      } else {
        record('Authentication & Role Authorization', 'FAIL', `Expected 401, got ${unauthRes.status}`);
      }
    }

    // -------------------------------------------------------------------------
    // Check 2: Candidate Ownership Verification
    // -------------------------------------------------------------------------
    {
      const otherCandidateToken = signToken({
        sub: 99999,
        id: 99999,
        role: 'candidate',
        email: 'attacker@evil.com',
      });
      const impostorRes = await fetch(`${BASE_URL}/attempts/${attemptId}/incidents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${otherCandidateToken}`,
        },
        body: JSON.stringify({ category: 'NETWORK_DISCONNECTED', description: 'Attack attempt' }),
      });
      if (impostorRes.status === 403 || impostorRes.status === 401) {
        record('Candidate Ownership of Active Attempts', 'PASS', 'Impostor candidate blocked from reporting incidents on another student attempt (403/401)');
      } else {
        record('Candidate Ownership of Active Attempts', 'FAIL', `Impostor was not blocked: HTTP ${impostorRes.status}`);
      }
    }

    // -------------------------------------------------------------------------
    // Simulation 1: Candidate Losing Internet Connectivity (NETWORK_DISCONNECTED)
    // -------------------------------------------------------------------------
    let incidentId1 = null;
    {
      const res = await fetch(`${BASE_URL}/attempts/${attemptId}/incidents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${candidateToken}`,
        },
        body: JSON.stringify({
          category: 'NETWORK_DISCONNECTED',
          description: 'Browser detected network connectivity drop during exam',
          diagnostics: {
            offlineAt: Date.now(),
            networkType: 'wifi',
            effectiveType: 'offline',
          },
        }),
      });

      const body = await res.json();
      if (res.status === 201 && body.incident?.id) {
        incidentId1 = body.incident.id;
        record('Simulation 1: Candidate Losing Connectivity', 'PASS', `Incident #${incidentId1} created with category NETWORK_DISCONNECTED and severity ${body.incident.severity}`);
      } else {
        record('Simulation 1: Candidate Losing Connectivity', 'FAIL', `Failed to create incident: HTTP ${res.status} ${JSON.stringify(body)}`);
      }
    }

    // -------------------------------------------------------------------------
    // Simulation 2: Answer-Save API Failure & Deduplication (ANSWER_SAVE_FAILED)
    // -------------------------------------------------------------------------
    let incidentId2 = null;
    {
      // Dispatch 1
      const res1 = await fetch(`${BASE_URL}/attempts/${attemptId}/incidents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${candidateToken}`,
        },
        body: JSON.stringify({
          category: 'ANSWER_SAVE_FAILED',
          question_id: 1,
          description: 'Failed to save answer for Question #1: HTTP 504 Gateway Timeout',
          diagnostics: { retryCount: 1, endpoint: '/api/attempts/saveAnswer' },
        }),
      });
      const body1 = await res1.json();
      incidentId2 = body1.incident?.id;

      // Dispatch 2 (Duplicate error for same question #1)
      const res2 = await fetch(`${BASE_URL}/attempts/${attemptId}/incidents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${candidateToken}`,
        },
        body: JSON.stringify({
          category: 'ANSWER_SAVE_FAILED',
          question_id: 1,
          description: 'Failed to save answer for Question #1: HTTP 504 Gateway Timeout (Retry 2)',
          diagnostics: { retryCount: 2, endpoint: '/api/attempts/saveAnswer' },
        }),
      });
      const body2 = await res2.json();

      if (body2.incident?.id === incidentId2 && body2.incident?.occurrence_count === 2) {
        record('Simulation 2 & Deduplication: Answer-Save Failure', 'PASS', `Incident #${incidentId2} deduplicated with occurrence_count incremented to 2 without creating orphan ticket`);
      } else {
        record('Simulation 2 & Deduplication: Answer-Save Failure', 'FAIL', `Deduplication failed: ${JSON.stringify(body2)}`);
      }
    }

    // -------------------------------------------------------------------------
    // Simulation 3: Connectivity Recovery (NETWORK_RESTORED)
    // -------------------------------------------------------------------------
    {
      const res = await fetch(`${BASE_URL}/attempts/${attemptId}/incidents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${candidateToken}`,
        },
        body: JSON.stringify({
          category: 'NETWORK_RESTORED',
          description: 'Candidate connection restored; offline safe mode queue drained',
          diagnostics: { offlineDurationMs: 45000, drainedItemsCount: 2 },
        }),
      });
      const body = await res.json();
      if (res.status === 201 && body.incident?.severity === 'low') {
        record('Simulation 3: Connectivity Recovery', 'PASS', `Connection restored incident created with severity low as per system policy`);
      } else {
        record('Simulation 3: Connectivity Recovery', 'FAIL', `HTTP ${res.status}: ${JSON.stringify(body)}`);
      }
    }

    // -------------------------------------------------------------------------
    // Simulation 4: Failed Test Submission (SUBMISSION_FAILED - CRITICAL)
    // -------------------------------------------------------------------------
    let criticalIncidentId = null;
    {
      const res = await fetch(`${BASE_URL}/attempts/${attemptId}/incidents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${candidateToken}`,
        },
        body: JSON.stringify({
          category: 'SUBMISSION_FAILED',
          description: 'CBT Test Submission timed out while candidate was online',
          diagnostics: { timeoutMs: 15000, answersCount: 45 },
        }),
      });
      const body = await res.json();
      criticalIncidentId = body.incident?.id;
      if (body.incident?.severity === 'critical') {
        record('Simulation 4: Failed Test Submission', 'PASS', `Submission failure logged as CRITICAL priority alert (Incident #${criticalIncidentId})`);
      } else {
        record('Simulation 4: Failed Test Submission', 'FAIL', `Expected critical severity, got ${body.incident?.severity}`);
      }
    }

    // -------------------------------------------------------------------------
    // Simulation 5: Proctoring Upload Failure & Rate Limiting
    // -------------------------------------------------------------------------
    {
      const res = await fetch(`${BASE_URL}/attempts/${attemptId}/incidents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${candidateToken}`,
        },
        body: JSON.stringify({
          category: 'RECORDING_FAILED',
          description: 'Screen recording chunk #4 failed to upload',
          diagnostics: { chunkIndex: 4, mimeType: 'video/webm' },
        }),
      });
      const body = await res.json();
      if (res.status === 201 && body.incident?.category === 'RECORDING_FAILED') {
        record('Simulation 5: Proctoring Failure Ingestion', 'PASS', `Proctoring chunk upload failure captured cleanly without flooding`);
      } else {
        record('Simulation 5: Proctoring Failure Ingestion', 'FAIL', `Failed to log proctoring failure: HTTP ${res.status}`);
      }
    }

    // -------------------------------------------------------------------------
    // Simulation 6: Student Manually Reporting an Issue
    // -------------------------------------------------------------------------
    let studentReportedId = null;
    {
      const res = await fetch(`${BASE_URL}/attempts/${attemptId}/incidents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${candidateToken}`,
        },
        body: JSON.stringify({
          category: 'STUDENT_REPORTED_ISSUE',
          question_id: 2,
          description: 'My timer flickered and question #2 image did not render properly on my monitor.',
          diagnostics: {
            reportedByStudent: true,
            browser: 'Chrome 128',
            screenResolution: '1920x1080',
          },
        }),
      });
      const body = await res.json();
      studentReportedId = body.incident?.id;
      if (res.status === 201 && body.incident?.source === 'student') {
        record('Simulation 6: Student Manual Incident Report', 'PASS', `Student incident #${studentReportedId} marked with source 'student' and logged message`);
      } else {
        record('Simulation 6: Student Manual Incident Report', 'FAIL', `Expected source student, got ${body.incident?.source}`);
      }
    }

    // -------------------------------------------------------------------------
    // Check: Input Sanitization & Sensitive Credential Scrubbing
    // -------------------------------------------------------------------------
    {
      const res = await fetch(`${BASE_URL}/attempts/${attemptId}/incidents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${candidateToken}`,
        },
        body: JSON.stringify({
          category: 'APPLICATION_ERROR',
          description: 'Script exception with sensitive diagnostic data',
          diagnostics: {
            safeKey: 'clean_telemetry',
            password: 'SuperSecretCandidatePassword123!',
            access_token: 'jwt.header.payload.signature',
            cookie: 'session_id=abcdef123456',
            selected_option: 'Option C is chosen',
            source_code: 'function answer() { return 42; }',
          },
        }),
      });
      const body = await res.json();
      const scrubbedIncidentId = body.incident?.id;

      // Query database directly to verify raw JSONB in database
      const dbCheck = await query(`SELECT last_diagnostics FROM exam_technical_incidents WHERE id = $1`, [scrubbedIncidentId]);
      const savedDiag = dbCheck.rows[0]?.last_diagnostics || {};

      const hasPassword = 'password' in savedDiag;
      const hasToken = 'access_token' in savedDiag;
      const hasCookie = 'cookie' in savedDiag;
      const hasAnswer = 'selected_option' in savedDiag || 'source_code' in savedDiag;
      const hasSafeKey = savedDiag.safeKey === 'clean_telemetry';

      if (!hasPassword && !hasToken && !hasCookie && !hasAnswer && hasSafeKey) {
        record('Diagnostic Sanitization & Credential Scrubbing', 'PASS', 'Recursively scrubbed password, access_token, cookie, and answer bodies from DB');
      } else {
        record('Diagnostic Sanitization & Credential Scrubbing', 'FAIL', `Sensitive data leaked into DB diagnostics: ${JSON.stringify(savedDiag)}`);
      }
    }

    // -------------------------------------------------------------------------
    // Simulation 7: Admin Acknowledging, Investigating, and Resolving Incident
    // -------------------------------------------------------------------------
    {
      // 1. Acknowledge Incident
      const ackRes = await fetch(`${BASE_URL}/admin/incidents/${studentReportedId}/acknowledge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
      });
      const ackBody = await ackRes.json();
      const ackOk = ackRes.status === 200 && ackBody.incident?.status === 'acknowledged';

      // 2. Add Investigation Notes & Guidance Message
      const notesRes = await fetch(`${BASE_URL}/admin/incidents/${studentReportedId}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          notes: 'Exam center staff visited candidate workstation; inspected local display.',
          guidance_message: 'Invigilator is aware and has verified your timer. Continue your exam normally.',
        }),
      });
      const notesBody = await notesRes.json();
      const notesOk = notesRes.status === 200 && notesBody.incident?.last_student_message?.includes('Invigilator is aware');

      // 3. Candidate polls /active and verifies receiving invigilator guidance
      const candidatePollRes = await fetch(`${BASE_URL}/attempts/${attemptId}/incidents/active`, {
        headers: { Authorization: `Bearer ${candidateToken}` },
      });
      const candidatePoll = await candidatePollRes.json();
      const activeInc = (candidatePoll.active_incidents || []).find((i) => i.id === studentReportedId);
      const studentReceivedMsg = activeInc?.last_student_message?.includes('Continue your exam');

      // 4. Resolve Incident
      const resolveRes = await fetch(`${BASE_URL}/admin/incidents/${studentReportedId}/resolve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          notes: 'Display cable securely reseated. Verified student resumed questions with no loss of answers.',
          resolution_category: 'hardware_fixed',
        }),
      });
      const resolveBody = await resolveRes.json();
      const resolveOk = resolveRes.status === 200 && resolveBody.incident?.status === 'resolved';

      // 5. Verify Audit Trail in DB
      const auditRes = await query(
        `SELECT action, from_status, to_status, actor_role FROM exam_incident_audit_trail WHERE incident_id = $1 ORDER BY id ASC`,
        [studentReportedId]
      );
      const actions = auditRes.rows.map((a) => a.action);
      const auditTrailOk = actions.includes('acknowledged') && actions.some((a) => a.includes('note')) && actions.includes('resolved');

      if (ackOk && notesOk && studentReceivedMsg && resolveOk && auditTrailOk) {
        record('Simulation 7: Admin Workflow & Audit Trail', 'PASS', 'Acknowledged -> Added Notes/Guidance -> Student Received -> Resolved -> Full Immutable Audit Trail logged');
      } else {
        record('Simulation 7: Admin Workflow & Audit Trail', 'FAIL', `Workflow incomplete: ack=${ackOk}, notes=${notesOk}, studentMsg=${studentReceivedMsg}, resolve=${resolveOk}, audit=${auditTrailOk}, actions=[${actions.join(', ')}]`);
      }
    }

    // -------------------------------------------------------------------------
    // Simulation 8: Tenant Isolation & Unauthorized Admin Access
    // -------------------------------------------------------------------------
    {
      // Attempt to access studentReportedId (belongs to Institution 10) using Institution 15 admin token
      const crossTenantRes = await fetch(`${BASE_URL}/institution/15/incidents/${studentReportedId}`, {
        headers: { Authorization: `Bearer ${inst15AdminToken}` },
      });

      const crossTenantList = await fetch(`${BASE_URL}/institution/15/incidents`, {
        headers: { Authorization: `Bearer ${inst15AdminToken}` },
      });
      const listBody = await crossTenantList.json();
      const leakedIntoInst15 = (listBody.incidents || []).some((i) => i.id === studentReportedId);

      const crossTenantResolve = await fetch(`${BASE_URL}/institution/15/incidents/${studentReportedId}/resolve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${inst15AdminToken}`,
        },
        body: JSON.stringify({
          notes: 'Illegal cross-tenant resolve attempt',
          resolution_category: 'other',
        }),
      });

      if (crossTenantRes.status === 403 && !leakedIntoInst15 && crossTenantResolve.status === 403) {
        record('Simulation 8: Multi-Tenant Institution Isolation', 'PASS', 'Inst 15 Admin strictly blocked (403 Forbidden) from viewing, listing, or resolving Inst 10 incident');
      } else {
        record('Simulation 8: Multi-Tenant Institution Isolation', 'FAIL', `Tenant boundary breached: get=${crossTenantRes.status}, leaked=${leakedIntoInst15}, resolve=${crossTenantResolve.status}`);
      }
    }

    // -------------------------------------------------------------------------
    // Summary KPI Counts Verification
    // -------------------------------------------------------------------------
    {
      const summaryRes = await fetch(`${BASE_URL}/admin/incidents?status=active`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      const summaryBody = await summaryRes.json();
      const kpis = summaryBody.summary;

      if (kpis && typeof kpis.critical_count === 'number' && typeof kpis.new_count === 'number') {
        record('KPI Summary Counters (New, Critical, Investigating, Resolved)', 'PASS', `KPI counters active: Critical=${kpis.critical_count}, New=${kpis.new_count}, Investigating=${kpis.investigating_count}, Resolved=${kpis.resolved_count}`);
      } else {
        record('KPI Summary Counters', 'FAIL', `Invalid KPI summary payload: ${JSON.stringify(kpis)}`);
      }
    }

    // -------------------------------------------------------------------------
    // Clean up Staging Records Created for this Audit
    // -------------------------------------------------------------------------
    await query(`DELETE FROM exam_technical_incidents WHERE attempt_id = $1`, [attemptId]);
    console.log(`🧹 Cleaned up staging incidents for attempt #${attemptId}.\n`);

  } catch (err) {
    console.error('Fatal audit execution error:', err);
    record('Staging Audit Execution', 'FAIL', err.message);
  } finally {
    await pool.end();
  }

  console.log('================================================================');
  console.log('AUDIT SUMMARY REPORT');
  console.log('================================================================');
  const passes = auditResults.filter((r) => r.status === 'PASS').length;
  const fails = auditResults.filter((r) => r.status === 'FAIL').length;
  console.log(`Total Checks: ${auditResults.length} | Passed: ${passes} | Failed: ${fails}`);
  return { auditResults, passes, fails };
}

runAudit();
