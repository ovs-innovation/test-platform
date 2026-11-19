import { markForReview, saveAnswer, walkPaper } from '../exam.js';
import { think } from '../helpers.js';

const state = { entered: false, questions: [], cursor: 0, session: null };

export function reviewStudent(roster, plan) {
  walkPaper(roster, plan, state, function (session, questionId, cursor) {
    const saved = saveAnswer(session, questionId);
    if (saved && cursor % 5 !== 4) markForReview(session, questionId);
    think(10, 20);
  });
}
