import { query } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

/**
 * GET /api/assessments/:assessmentId/sections
 */
export const listSections = asyncHandler(async (req, res) => {
  const { assessmentId } = req.params;
  const result = await query(
    'SELECT * FROM assessment_sections WHERE assessment_id = $1 ORDER BY position ASC, id ASC',
    [assessmentId]
  );
  res.json({ sections: result.rows });
});

/**
 * POST /api/assessments/:assessmentId/sections
 */
export const createSection = asyncHandler(async (req, res) => {
  const { assessmentId } = req.params;
  const { name, section_type, description, position } = req.body;

  const a = await query('SELECT id FROM assessments WHERE id = $1', [assessmentId]);
  if (a.rowCount === 0) throw ApiError.notFound('Assessment not found');

  let pos = position;
  if (pos === undefined) {
    const maxRes = await query(
      'SELECT COALESCE(MAX(position), 0) + 1 AS next FROM assessment_sections WHERE assessment_id = $1',
      [assessmentId]
    );
    pos = maxRes.rows[0].next;
  }

  const result = await query(
    `INSERT INTO assessment_sections (assessment_id, name, section_type, description, position)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [assessmentId, name, section_type, description || '', pos]
  );
  res.status(201).json({ section: result.rows[0] });
});

/**
 * PUT /api/sections/:id
 */
export const updateSection = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, section_type, description, position } = req.body;
  const result = await query(
    `UPDATE assessment_sections
     SET name = COALESCE($1, name), section_type = COALESCE($2, section_type),
         description = COALESCE($3, description), position = COALESCE($4, position)
     WHERE id = $5 RETURNING *`,
    [name, section_type, description, position, id]
  );
  if (result.rowCount === 0) throw ApiError.notFound('Section not found');
  res.json({ section: result.rows[0] });
});

/**
 * DELETE /api/sections/:id
 */
export const deleteSection = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await query('DELETE FROM assessment_sections WHERE id = $1 RETURNING id', [id]);
  if (result.rowCount === 0) throw ApiError.notFound('Section not found');
  res.json({ message: 'Section deleted', id: result.rows[0].id });
});
