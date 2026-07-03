export function isQuestionAnswered(question, answers, multiAnswers, codingAnswers, subjectiveAnswers) {
  if (question.question_type === 'mcq') return answers[question.id] != null;
  if (question.question_type === 'multi_select') return (multiAnswers[question.id]?.length > 0);
  if (question.question_type === 'coding') return (codingAnswers[question.id]?.code || '').trim().length > 0;
  if (question.question_type === 'subjective') return (subjectiveAnswers[question.id] || '').trim().length > 0;
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
  { key: 'not_visited', label: 'Not visited', swatch: 'nta-swatch-nv' },
  { key: 'unanswered', label: 'Not answered', swatch: 'nta-swatch-na' },
  { key: 'answered', label: 'Answered', swatch: 'nta-swatch-a' },
  { key: 'review', label: 'Marked for review', swatch: 'nta-swatch-r' },
  { key: 'answered_review', label: 'Answered & marked', swatch: 'nta-swatch-ar' },
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
