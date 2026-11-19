import { check } from 'k6';
import { BASE_URL, assessmentId } from './config.js';
import { ensureSession } from './auth.js';
import { idle, locateStudent, questionIdsFrom } from './helpers.js';
import { markStudentCompleted, send } from './metrics.js';

function callApi(session, method, url, body, api) {
  return send(method, url, body, {
    token: session.token,
    correlationId: session.correlationId,
    scenario: session.scenario,
    api: api,
  });
}

export function enterExam(session) {
  const testRes = callApi(
    session,
    'GET',
    BASE_URL + '/api/assessments/available/' + assessmentId(),
    null,
    'get_test'
  );
  check(testRes, {
    'get test 200': function (r) { return r.status === 200; },
  });

  const paperRes = callApi(
    session,
    'GET',
    BASE_URL + '/api/attempts/' + session.attemptId,
    null,
    'get_questions'
  );
  const loaded = check(paperRes, {
    'get questions 200': function (r) { return r.status === 200; },
  });
  return {
    ids: loaded ? questionIdsFrom(paperRes) : [],
    loaded: loaded,
  };
}

export function reloadPaper(session) {
  const paperRes = callApi(
    session,
    'GET',
    BASE_URL + '/api/attempts/' + session.attemptId,
    null,
    'get_questions'
  );
  const loaded = check(paperRes, {
    'reload questions 200': function (r) { return r.status === 200; },
  });
  if (!loaded) return null;
  return questionIdsFrom(paperRes);
}

export function saveAnswer(session, questionId) {
  const res = callApi(
    session,
    'PUT',
    BASE_URL + '/api/attempts/' + session.attemptId + '/answer',
    JSON.stringify({ question_id: questionId, selected_index: 0 }),
    'save_answer'
  );
  return check(res, {
    'save answer 200': function (r) { return r.status === 200; },
  });
}

export function markForReview(session, questionId) {
  const res = callApi(
    session,
    'PUT',
    BASE_URL + '/api/attempts/' + session.attemptId + '/review',
    JSON.stringify({ question_id: questionId, marked_for_review: true }),
    'mark_for_review'
  );
  return check(res, {
    'mark review 200': function (r) { return r.status === 200; },
  });
}

export function walkPaper(roster, plan, state, step) {
  const located = locateStudent(roster, plan);
  const session = ensureSession(state, located.student, located.scenarioKey);
  if (!state.entered) {
    const paper = enterExam(session);
    state.questions = paper.ids;
    state.loaded = paper.loaded;
    state.entered = true;
  }
  if (state.cursor >= state.questions.length) {
    if (state.loaded && !state.completed) {
      markStudentCompleted(located.scenarioKey);
      state.completed = true;
    }
    idle();
    return;
  }
  const questionId = state.questions[state.cursor];
  step(session, questionId, state.cursor, state);
  state.cursor += 1;
}
