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

  const result = await query(
    `INSERT INTO ebooks (title, author, description, pdf_url, subject_id, chapter_id)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [title, author || null, description || null, sanitizedPdfUrl, subject_id || null, chapter_id || null]
  );
  res.status(201).json({ ebook: result.rows[0] });
});

export const deleteEbook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await query('DELETE FROM ebooks WHERE id = $1 RETURNING id', [id]);
  if (result.rowCount === 0) throw ApiError.notFound('eBook not found');
  res.json({ message: 'eBook deleted successfully', id });
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
