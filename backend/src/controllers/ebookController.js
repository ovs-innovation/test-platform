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

export const createEbook = asyncHandler(async (req, res) => {
  const { title, author, description, pdf_url, subject_id, chapter_id } = req.body;
  if (!title || !pdf_url) throw ApiError.badRequest('Title and pdf_url are required');

  const result = await query(
    `INSERT INTO ebooks (title, author, description, pdf_url, subject_id, chapter_id)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [title, author || null, description || null, pdf_url, subject_id || null, chapter_id || null]
  );
  res.status(201).json({ ebook: result.rows[0] });
});

export const deleteEbook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await query('DELETE FROM ebooks WHERE id = $1 RETURNING id', [id]);
  if (result.rowCount === 0) throw ApiError.notFound('eBook not found');
  res.json({ message: 'eBook deleted successfully', id });
});
