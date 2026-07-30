import { query } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

export const listBatches = asyncHandler(async (_req, res) => {
  const result = await query('SELECT * FROM batches ORDER BY name ASC');
  res.json({ batches: result.rows });
});

export const createBatch = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  if (!name) throw ApiError.badRequest('Batch name is required');

  const existing = await query('SELECT id FROM batches WHERE name = $1', [name]);
  if (existing.rowCount) throw ApiError.conflict('Batch with this name already exists');

  const result = await query(
    `INSERT INTO batches (name, description) VALUES ($1, $2) RETURNING *`,
    [name, description || null]
  );
  res.status(201).json({ batch: result.rows[0] });
});

export const deleteBatch = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await query('DELETE FROM batches WHERE id = $1 RETURNING id', [id]);
  if (result.rowCount === 0) throw ApiError.notFound('Batch not found');
  res.json({ message: 'Batch deleted successfully', id });
});
