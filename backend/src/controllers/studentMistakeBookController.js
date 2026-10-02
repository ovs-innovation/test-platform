import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import {
  getMistakesForStudent,
  syncAllAttemptsForStudent,
  recreateTestFromMistakes,
  updateMistakeStatus,
  deleteMistake,
} from '../services/mistakeBookService.js';

export const getMistakeBook = asyncHandler(async (req, res) => {
  const candidateId = Number(req.user?.id);
  if (!candidateId) throw ApiError.unauthorized('User not authenticated');

  const { subject, type, status, search, limit, offset, force_sync } = req.query;

  let result = await getMistakesForStudent(candidateId, { subject, type, status, search, limit, offset });

  // Only auto-sync on the very first time if candidate has 0 mistakes recorded ever
  if ((result.summary.total === 0 || force_sync === 'true') && force_sync !== 'false') {
    try {
      const syncRes = await syncAllAttemptsForStudent(candidateId);
      if (syncRes.processed_attempts > 0) {
        result = await getMistakesForStudent(candidateId, { subject, type, status, search, limit, offset });
      }
    } catch (_) {}
  }

  res.json(result);
});

export const syncMistakeBook = asyncHandler(async (req, res) => {
  const candidateId = Number(req.user?.id);
  if (!candidateId) throw ApiError.unauthorized('User not authenticated');

  const result = await syncAllAttemptsForStudent(candidateId);
  res.json({
    success: true,
    message: `Synchronized mistakes across ${result.processed_attempts} test attempts.`,
    ...result,
  });
});

export const recreateTest = asyncHandler(async (req, res) => {
  const candidateId = Number(req.user?.id);
  if (!candidateId) throw ApiError.unauthorized('User not authenticated');

  const { question_ids, title, duration_minutes } = req.body;
  const result = await recreateTestFromMistakes(candidateId, {
    question_ids,
    title,
    duration_minutes,
  });

  res.status(201).json(result);
});

export const updateStatus = asyncHandler(async (req, res) => {
  const candidateId = Number(req.user?.id);
  if (!candidateId) throw ApiError.unauthorized('User not authenticated');

  const { id } = req.params;
  const { status } = req.body;
  const result = await updateMistakeStatus(candidateId, Number(id), status);

  res.json({ success: true, mistake: result });
});

export const removeMistake = asyncHandler(async (req, res) => {
  const candidateId = Number(req.user?.id);
  if (!candidateId) throw ApiError.unauthorized('User not authenticated');

  const { id } = req.params;
  const result = await deleteMistake(candidateId, Number(id));

  res.json({ success: true, ...result });
});
