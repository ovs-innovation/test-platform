import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { translateQuestion } from '../services/translationService.js';

export const handleTranslateQuestion = asyncHandler(async (req, res) => {
  const {
    question_id,
    question_text,
    assertion_text,
    reason_text,
    options,
    target_lang = 'hi',
  } = req.body;

  if (!question_text && !question_id) {
    throw ApiError.badRequest('question_text or question_id is required');
  }

  const result = await translateQuestion({
    question_id: question_id ? Number(question_id) : undefined,
    question_text,
    assertion_text,
    reason_text,
    options,
    target_lang,
  });

  res.json({
    success: true,
    ...result,
  });
});

export const handleTranslateBatch = asyncHandler(async (req, res) => {
  const { questions, target_lang = 'hi' } = req.body;

  if (!Array.isArray(questions) || questions.length === 0) {
    throw ApiError.badRequest('questions array is required');
  }

  // Cap batch size to 25 per request to maintain rapid responsiveness
  const batch = questions.slice(0, 25);
  const results = await Promise.all(
    batch.map((q) =>
      translateQuestion({
        question_id: q.id || q.question_id,
        question_text: q.question_text,
        assertion_text: q.assertion_text,
        reason_text: q.reason_text,
        options: q.options,
        target_lang,
      })
    )
  );

  res.json({
    success: true,
    translations: results,
  });
});
