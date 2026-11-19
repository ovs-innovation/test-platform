import { saveAnswer, walkPaper } from '../exam.js';
import { think } from '../helpers.js';

const state = { entered: false, questions: [], cursor: 0, session: null };

export function skipStudent(roster, plan) {
  walkPaper(roster, plan, state, function (session, questionId, cursor) {
    if (cursor % 5 === 0) saveAnswer(session, questionId);
    think(5, 10);
  });
}
