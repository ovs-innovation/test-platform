import { query } from '../config/db.js';
import { ApiError } from '../utils/ApiError.js';

/**
 * Controller to fetch all calendar tests assigned to the logged-in student
 * GET /api/student/calendar
 */
export const getStudentCalendar = async (req, res, next) => {
  try {
    const studentId = req.user?.id || req.user?.student_id;
    const batchId = req.user?.batch_id || req.user?.batchId || null;
    const institutionId = req.user?.institution_id || req.user?.institutionId || null;

    if (!studentId) {
      throw ApiError.unauthorized('User identity missing');
    }

    const sql = `
      SELECT DISTINCT ON (t.id)
        t.id,
        t.test_name,
        t.test_type,
        t.test_date,
        t.start_time,
        t.end_time,
        t.duration_minutes,
        t.syllabus,
        t.max_marks,
        t.is_published,
        t.result_publish_time,
        t.solution_pdf_url,
        t.question_paper_url,
        t.answer_key_url,
        t.recommended_ebook_id,
        t.available_from,
        t.available_until,
        t.created_at,
        ta.started_at,
        ta.submitted_at,
        mto.valid_from AS override_valid_from,
        mto.valid_until AS override_valid_until
      FROM tests t
      JOIN test_assignments a ON a.test_id = t.id
      LEFT JOIN test_attempts ta ON ta.test_id = t.id AND ta.student_id = $1
      LEFT JOIN missed_test_overrides mto ON mto.test_id = t.id AND mto.student_id = $1
      WHERE t.is_published = TRUE
        AND COALESCE(t.is_deleted, FALSE) = FALSE
        AND (
          (a.assigned_to_type = 'individual' AND a.assigned_to_id = $1)
          OR (a.assigned_to_type = 'batch' AND a.assigned_to_id = $2)
          OR (a.assigned_to_type = 'institution' AND a.assigned_to_id = $3)
          OR a.assigned_to_type = 'all'
        )
      ORDER BY t.id, t.test_date ASC, t.start_time ASC;
    `;

    const result = await query(sql, [studentId, batchId, institutionId]);
    const now = new Date();

    const formattedTests = result.rows.map((row) => {
      // Parse dates safely in UTC
      let dateStr = '';
      if (row.test_date instanceof Date) {
        dateStr = row.test_date.toISOString().split('T')[0];
      } else if (typeof row.test_date === 'string') {
        dateStr = row.test_date.split('T')[0];
      }

      const startTimeStr = row.start_time || '00:00:00';
      const endTimeStr = row.end_time || '23:59:59';

      const startDateTime = new Date(`${dateStr}T${startTimeStr}Z`);
      const endDateTime = new Date(`${dateStr}T${endTimeStr}Z`);
      const resultPublishTime = row.result_publish_time ? new Date(row.result_publish_time) : null;
      const submittedAt = row.submitted_at ? new Date(row.submitted_at) : null;

      // Missed test override active check
      const overrideValidFrom = row.override_valid_from ? new Date(row.override_valid_from) : null;
      const overrideValidUntil = row.override_valid_until ? new Date(row.override_valid_until) : null;
      const hasActiveOverride = Boolean(
        overrideValidFrom && overrideValidUntil && now >= overrideValidFrom && now <= overrideValidUntil
      );

      // 1. computed_status
      let computedStatus = 'Upcoming';

      if (submittedAt && resultPublishTime && now > resultPublishTime) {
        computedStatus = 'Result Published';
      } else if (submittedAt) {
        computedStatus = 'Attempted';
      } else if (hasActiveOverride || (now >= startDateTime && now <= endDateTime)) {
        computedStatus = 'Live';
      } else if (now > endDateTime && !submittedAt) {
        computedStatus = 'Missed';
      } else if (now < startDateTime) {
        computedStatus = 'Upcoming';
      } else {
        computedStatus = 'Expired';
      }

      // 2. attempt_status
      let attemptStatus = 'Not Attempted';
      if (submittedAt) {
        attemptStatus = 'Attempted';
      } else if (now > endDateTime) {
        attemptStatus = 'Missed';
      }

      // 3. result_status
      let resultStatus = 'Pending';
      if (resultPublishTime && now > resultPublishTime) {
        resultStatus = 'Published';
      }

      // 4. solution_available
      const solutionAvailable = Boolean(
        row.solution_pdf_url && resultPublishTime && now > resultPublishTime
      );

      return {
        id: row.id,
        test_name: row.test_name,
        test_type: row.test_type,
        test_date: dateStr,
        start_time: startTimeStr,
        end_time: endTimeStr,
        duration_minutes: row.duration_minutes,
        syllabus: row.syllabus,
        max_marks: row.max_marks,
        computed_status: computedStatus,
        attempt_status: attemptStatus,
        result_status: resultStatus,
        solution_available: solutionAvailable,
        recommended_ebook_id: row.recommended_ebook_id || null,
        started_at: row.started_at || null,
        submitted_at: row.submitted_at || null,
        result_publish_time: row.result_publish_time || null,
        solution_pdf_url: row.solution_pdf_url || null,
      };
    });

    // Sort formatted tests chronologically by test_date then start_time
    formattedTests.sort((a, b) => {
      const timeA = new Date(`${a.test_date}T${a.start_time}Z`).getTime();
      const timeB = new Date(`${b.test_date}T${b.start_time}Z`).getTime();
      return timeA - timeB;
    });

    res.json({ tests: formattedTests });
  } catch (err) {
    next(err);
  }
};
