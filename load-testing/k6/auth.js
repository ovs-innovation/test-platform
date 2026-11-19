import exec from 'k6/execution';
import { check } from 'k6';
import { BASE_URL, assertSafeBaseUrl, requireAssessmentId } from './config.js';
import { createCorrelationId, readJson } from './helpers.js';
import { send } from './metrics.js';

function stopTest(message) {
  exec.test.abort(message);
  throw new Error(message);
}

function loginStudent(student, correlationId, scenario) {
  const res = send(
    'POST',
    BASE_URL + '/api/auth/student-login',
    JSON.stringify({ email: student.email, password: student.password }),
    {
      correlationId: correlationId,
      scenario: scenario,
      api: 'student_login',
    }
  );
  if (res.status === 429) {
    stopTest(
      'Login for ' + student.email + ' returned 429. Stop. Use pre-generated access_token values, or raise the staging auth limit. This test does not wait or retry. correlation=' + correlationId
    );
  }
  const ok = check(res, {
    'login 200': function (r) { return r.status === 200; },
  });
  const body = readJson(res);
  const token = body && (body.accessToken || body.token);
  if (!ok || !token) {
    throw new Error('Login failed for ' + student.email + ' with status ' + res.status + '. correlation=' + correlationId);
  }
  return token;
}

function startAttempt(token, email, correlationId, scenario) {
  const res = send(
    'POST',
    BASE_URL + '/api/attempts/start',
    JSON.stringify({ assessment_id: requireAssessmentId() }),
    {
      token: token,
      correlationId: correlationId,
      scenario: scenario,
      api: 'start_attempt',
    }
  );
  if (res.status === 409) {
    stopTest('Start refused for ' + email + '. This student already submitted the assessment. correlation=' + correlationId);
  }
  const ok = check(res, {
    'start 200 or 201': function (r) { return r.status === 200 || r.status === 201; },
  });
  const body = readJson(res);
  const attempt = body && body.attempt;
  const attemptId = attempt && attempt.id;
  if (!ok || !attemptId) {
    throw new Error('Start failed for ' + email + ' with status ' + res.status + '. correlation=' + correlationId);
  }
  return attemptId;
}

export function ensureSession(state, student, scenarioKey) {
  if (state.session) return state.session;
  assertSafeBaseUrl(BASE_URL);
  requireAssessmentId();
  const correlationId = createCorrelationId();
  const scenario = scenarioKey + '_student';
  console.log('[correlation] ' + correlationId + ' email=' + student.email + ' scenario=' + scenario + ' phase=session');
  const token = student.access_token ? student.access_token : loginStudent(student, correlationId, scenario);
  const attemptId = startAttempt(token, student.email, correlationId, scenario);
  state.session = {
    email: student.email,
    token: token,
    attemptId: attemptId,
    correlationId: correlationId,
    scenario: scenario,
  };
  return state.session;
}
