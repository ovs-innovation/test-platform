import { saveAnswer, walkPaper } from '../exam.js';
import { think } from '../helpers.js';

const state = { entered: false, questions: [], cursor: 0, session: null };

export function fastStudent(roster, plan) {
  walkPaper(roster, plan, state, function (session, questionId) {
    saveAnswer(session, questionId);
    think(2, 5);
  });
}
