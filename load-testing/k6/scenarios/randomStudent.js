import { markForReview, reloadPaper, saveAnswer, walkPaper } from '../exam.js';
import { think } from '../helpers.js';

const state = { entered: false, questions: [], cursor: 0, session: null };

export function randomStudent(roster, plan) {
  walkPaper(roster, plan, state, function (session, questionId, cursor, paper) {
    if (Math.random() < 0.1) {
      const reloaded = reloadPaper(session);
      if (reloaded) paper.questions = reloaded;
    }
    const roll = Math.random();
    if (roll < 0.5) {
      saveAnswer(session, questionId);
    } else if (roll >= 0.75) {
      if (saveAnswer(session, questionId)) markForReview(session, questionId);
    }
    think(5, 45);
  });
}
