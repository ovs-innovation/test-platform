export function isMultiSelectQuestion(question) {
  if (!question) return false;
  const type = (question.question_type || '').toLowerCase();
  if (['multi_select', 'multiple_correct', 'multiple_select', 'multiple_choice', 'multiple'].includes(type)) return true;
  const idxs = Array.isArray(question.correct_indices) ? question.correct_indices : (typeof question.correct_indices === 'string' ? JSON.parse(question.correct_indices || '[]') : []);
  if (idxs.length > 1) return true;
  const text = question.question_text || '';
  return /one\s*or\s*more\s*options?|more\s*than\s*one\s*correct|multiple\s*correct|select\s*all\s*that\s*apply/i.test(text);
}

export function isQuestionAnswered(question, answers, multiAnswers, codingAnswers, subjectiveAnswers, numericAnswers = {}) {
  const type = question.question_type;
  if (isMultiSelectQuestion(question)) return (multiAnswers[question.id]?.length > 0) || (answers[question.id] != null);
  if (type === 'mcq' || type === 'single_choice' || type === 'assertion_reason') return answers[question.id] != null;
  if (type === 'integer' || type === 'numerical') return (numericAnswers[question.id] != null && numericAnswers[question.id] !== '');
  if (type === 'coding') return (codingAnswers[question.id]?.code || '').trim().length > 0;
  if (type === 'subjective') return (subjectiveAnswers[question.id] || '').trim().length > 0;
  return false;
}

export function getQuestionStatus(question, visited, reviewed, answered) {
  if (reviewed[question.id] && answered) return 'answered_review';
  if (reviewed[question.id]) return 'review';
  if (answered) return 'answered';
  if (!visited[question.id]) return 'not_visited';
  return 'unanswered';
}

export const PALETTE_LEGEND = [
  { key: 'not_visited', label: 'Not Visited', swatch: 'nta-swatch-nv' },
  { key: 'unanswered', label: 'Not Answered', swatch: 'nta-swatch-na' },
  { key: 'answered', label: 'Answered', swatch: 'nta-swatch-a' },
  { key: 'review', label: 'Marked for Review', swatch: 'nta-swatch-r' },
  { key: 'answered_review', label: 'Answered & Marked for Review', swatch: 'nta-swatch-ar' },
];

export function paletteCellClass(status, isCurrent) {
  const base = {
    not_visited: 'nta-palette-nv',
    unanswered: 'nta-palette-na',
    answered: 'nta-palette-a',
    review: 'nta-palette-r',
    answered_review: 'nta-palette-ar',
  }[status] || 'nta-palette-nv';
  return isCurrent ? `${base} nta-palette-current` : base;
}

export function timerClass(remainingSeconds) {
  if (remainingSeconds <= 300) return 'nta-timer-danger';
  if (remainingSeconds <= 600) return 'nta-timer-warn';
  return 'nta-timer-normal';
}
