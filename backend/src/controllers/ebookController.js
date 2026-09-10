import { query } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

export const listEbooks = asyncHandler(async (_req, res) => {
  const result = await query(
    `SELECT e.*, s.name AS subject_name, c.name AS chapter_name
     FROM ebooks e
     LEFT JOIN subjects s ON s.id = e.subject_id
     LEFT JOIN chapters c ON c.id = e.chapter_id
     ORDER BY e.created_at DESC`
  );
  res.json({ ebooks: result.rows });
});

import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';

export const createEbook = asyncHandler(async (req, res) => {
  let { title, author, description, pdf_url, subject_id, chapter_id } = req.body;
  if (!title || !pdf_url) throw ApiError.badRequest('Title and pdf_url are required');

  let sanitizedPdfUrl = pdf_url.trim();

  // If local file path or file:/// URL is provided
  if (sanitizedPdfUrl.startsWith('file:///') || sanitizedPdfUrl.startsWith('file://') || /^[a-zA-Z]:[\\/]/.test(sanitizedPdfUrl)) {
    const rawFilePath = sanitizedPdfUrl.replace(/^file:\/\/\//, '').replace(/^file:\/\//, '');
    const fileName = path.basename(rawFilePath);
    const destDir = path.resolve('public/ebooks');
    const destPath = path.join(destDir, fileName);

    if (fs.existsSync(rawFilePath)) {
      try {
        if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
        fs.copyFileSync(rawFilePath, destPath);
      } catch (err) {
        console.warn('[createEbook] Could not copy local file:', err.message);
      }
    }
    sanitizedPdfUrl = `/ebooks/${fileName}`;
  }

  let detectedPages = null;
  let detectedFileSize = null;

  const targetPath = sanitizedPdfUrl.startsWith('/ebooks/')
    ? path.resolve('public', sanitizedPdfUrl.substring(1))
    : null;

  if (targetPath && fs.existsSync(targetPath)) {
    try {
      const stats = fs.statSync(targetPath);
      const sizeMb = (stats.size / (1024 * 1024)).toFixed(1);
      detectedFileSize = `${sizeMb} MB`;

      const pdfBuffer = fs.readFileSync(targetPath);
      const pdfData = await pdfParse(pdfBuffer);
      detectedPages = pdfData.numpages || null;
    } catch (err) {
      console.warn('[createEbook] Could not parse PDF metadata:', err.message);
    }
  }

  const result = await query(
    `INSERT INTO ebooks (title, author, description, pdf_url, subject_id, chapter_id, pages, file_size)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [
      title,
      author || null,
      description || null,
      sanitizedPdfUrl,
      subject_id || null,
      chapter_id || null,
      detectedPages,
      detectedFileSize
    ]
  );
  res.status(201).json({ ebook: result.rows[0] });
});

export const deleteEbook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await query('UPDATE tests SET recommended_ebook_id = NULL WHERE recommended_ebook_id = $1', [id]).catch(() => {});
  await query('DELETE FROM ebook_assignments WHERE ebook_id = $1', [id]).catch(() => {});
  const result = await query('DELETE FROM ebooks WHERE id = $1 RETURNING id', [id]);
  if (result.rowCount === 0) throw ApiError.notFound('eBook not found');
  res.json({ message: 'eBook deleted successfully', id });
});

export const assignEbookToAudience = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { assigned_to_type, assigned_to_id } = req.body;

  if (!assigned_to_type || !['all', 'institution', 'batch', 'student', 'individual'].includes(assigned_to_type)) {
    throw ApiError.badRequest('assigned_to_type must be one of: all, institution, batch, student, individual');
  }

  const ebookId = Number(id);
  const targetId = assigned_to_type === 'all' ? 0 : (assigned_to_id ? Number(assigned_to_id) : 0);

  if (assigned_to_type !== 'all' && !targetId) {
    throw ApiError.badRequest('Target ID is required when assigning to specific institution, batch, or student.');
  }

  const checkEbook = await query('SELECT id, title FROM ebooks WHERE id = $1', [ebookId]);
  if (checkEbook.rowCount === 0) {
    throw ApiError.notFound('eBook not found');
  }
  const ebookTitle = checkEbook.rows[0].title || 'Study Material';

  await query(
    `DELETE FROM ebook_assignments 
     WHERE ebook_id = $1 AND assigned_to_type = $2 AND assigned_to_id = $3`,
    [ebookId, assigned_to_type, targetId]
  ).catch(() => {});

  const insertRes = await query(
    `INSERT INTO ebook_assignments (ebook_id, assigned_to_type, assigned_to_id)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [ebookId, assigned_to_type, targetId]
  );

  // Dispatch Notifications to Target Audience
  try {
    if (assigned_to_type === 'institution' && targetId) {
      await query(
        `INSERT INTO institution_notifications (institution_id, title, message, type, target_type, target_id, is_read, created_at)
         VALUES ($1, $2, $3, 'ebook_assigned', 'ebook', $4, FALSE, NOW())`,
        [
          targetId,
          'New Study Material / eBook Assigned',
          `Platform administrator assigned eBook "${ebookTitle}" to your institution. You can now access it and assign it to your student batches.`,
          ebookId
        ]
      ).catch((err) => console.error('Failed to create institution notification for ebook:', err));
    } else if (assigned_to_type === 'all') {
      const instRes = await query('SELECT id FROM institutions WHERE is_active = TRUE');
      for (const inst of instRes.rows) {
        await query(
          `INSERT INTO institution_notifications (institution_id, title, message, type, target_type, target_id, is_read, created_at)
           VALUES ($1, $2, $3, 'ebook_assigned', 'ebook', $4, FALSE, NOW())`,
          [
            inst.id,
            'New Study Material / eBook Assigned',
            `Platform administrator assigned eBook "${ebookTitle}" to all partner institutions.`,
            ebookId
          ]
        ).catch(() => {});
      }
    }

    // Deliver candidate/student notifications
    let targetStudentIds = [];
    if (['student', 'individual'].includes(assigned_to_type) && targetId) {
      targetStudentIds = [Number(targetId)];
    } else if (assigned_to_type === 'batch' && targetId) {
      const batchStudents = await query(
        'SELECT id FROM users WHERE batch_id = $1 AND role = $2',
        [targetId, 'candidate']
      );
      targetStudentIds = batchStudents.rows.map((s) => s.id);
    } else if (assigned_to_type === 'institution' && targetId) {
      const instStudents = await query(
        'SELECT id FROM users WHERE institution_id = $1 AND role = $2',
        [targetId, 'candidate']
      );
      targetStudentIds = instStudents.rows.map((s) => s.id);
    } else if (assigned_to_type === 'all') {
      const allStudents = await query(
        'SELECT id FROM users WHERE role = $1',
        ['candidate']
      );
      targetStudentIds = allStudents.rows.map((s) => s.id);
    }

    const uniqueIds = Array.from(new Set(targetStudentIds.filter((id) => id && !isNaN(Number(id)))));
    for (const sid of uniqueIds) {
      await query(
        `INSERT INTO notifications (user_id, title, body, type, created_at)
         VALUES ($1, $2, $3, 'ebook_assigned', NOW())`,
        [
          sid,
          `New eBook Assigned: ${ebookTitle}`,
          `Admin assigned eBook "${ebookTitle}" to your digital library. Open E-Books to read now!`
        ]
      ).catch(() => {});
    }
  } catch (notifErr) {
    console.error('[assignEbookToAudience] Error delivering notifications:', notifErr.message);
  }

  res.status(201).json({
    success: true,
    message: `eBook assigned to ${assigned_to_type} successfully`,
    assignment: insertRes.rows[0]
  });
});

export const getEbookAssignments = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const ebookId = Number(id);

  const result = await query(
    `SELECT ea.*,
            inst.name AS institution_name,
            b.name AS batch_name,
            u.name AS student_name,
            u.email AS student_email
     FROM ebook_assignments ea
     LEFT JOIN institutions inst ON ea.assigned_to_type = 'institution' AND ea.assigned_to_id = inst.id
     LEFT JOIN batches b ON ea.assigned_to_type = 'batch' AND ea.assigned_to_id = b.id
     LEFT JOIN users u ON (ea.assigned_to_type IN ('student', 'individual')) AND ea.assigned_to_id = u.id
     WHERE ea.ebook_id = $1
     ORDER BY ea.id DESC`,
    [ebookId]
  ).catch(() => ({ rows: [] }));

  res.json({ success: true, assignments: result.rows });
});

export const deleteEbookAssignment = asyncHandler(async (req, res) => {
  const { assignmentId } = req.params;
  await query('DELETE FROM ebook_assignments WHERE id = $1', [assignmentId]);
  res.json({ success: true, message: 'Assignment removed successfully' });
});

export const getMyAssignedEbooks = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const userRes = await query('SELECT batch_id, institution_id FROM users WHERE id = $1', [userId]);
  const student = userRes.rows[0] || {};
  const batchId = student.batch_id || null;
  const instId = student.institution_id || null;

  const result = await query(
    `
    SELECT DISTINCT e.id, e.title, e.author, e.description, e.subject, e.class_level, e.pdf_url, e.created_at
    FROM ebooks e
    JOIN ebook_assignments ea ON ea.ebook_id = e.id
    WHERE (
      (ea.assigned_to_type IN ('student', 'individual') AND ea.assigned_to_id = $1)
      OR (ea.assigned_to_type = 'batch' AND $2::int IS NOT NULL AND ea.assigned_to_id = $2)
      OR (ea.assigned_to_type = 'batch' AND $3::int IS NOT NULL AND ea.assigned_to_id IN (SELECT id FROM batches WHERE institution_id = $3))
      OR (ea.assigned_to_type = 'institution' AND $3::int IS NOT NULL AND ea.assigned_to_id = $3)
      OR ea.assigned_to_type = 'all'
    )

    UNION

    SELECT DISTINCT e.id, e.title, e.author, e.description, e.subject, e.class_level, e.pdf_url, e.created_at
    FROM ebooks e
    JOIN tests t ON t.recommended_ebook_id = e.id
    JOIN test_assignments tas ON tas.test_id = t.id
    WHERE (
      (tas.assigned_to_type IN ('student', 'individual') AND tas.assigned_to_id = $1)
      OR (tas.assigned_to_type = 'batch' AND $2::int IS NOT NULL AND tas.assigned_to_id = $2)
      OR (tas.assigned_to_type = 'batch' AND $3::int IS NOT NULL AND tas.assigned_to_id IN (SELECT id FROM batches WHERE institution_id = $3))
      OR (tas.assigned_to_type = 'institution' AND $3::int IS NOT NULL AND tas.assigned_to_id = $3)
      OR tas.assigned_to_type = 'all'
    )

    ORDER BY id DESC
    `,
    [userId, batchId, instId]
  );

  res.json({ success: true, ebooks: result.rows });
});
