import http from 'k6/http';
import { Counter } from 'k6/metrics';

export const fastStudentsCompleted = new Counter('fast_students_completed');
export const slowStudentsCompleted = new Counter('slow_students_completed');
export const skipStudentsCompleted = new Counter('skip_students_completed');
export const reviewStudentsCompleted = new Counter('review_students_completed');
export const randomStudentsCompleted = new Counter('random_students_completed');

const completedByScenario = {
  fast: fastStudentsCompleted,
  slow: slowStudentsCompleted,
  skip: skipStudentsCompleted,
  review: reviewStudentsCompleted,
  random: randomStudentsCompleted,
};

export const httpErrors = new Counter('http_errors');

const STATUS_LABEL = {
  401: '401',
  403: '403',
  404: '404',
  409: '409',
  429: '429',
};

export function markStudentCompleted(scenarioKey) {
  const counter = completedByScenario[scenarioKey];
  if (!counter) return;
  counter.add(1, { scenario: scenarioKey + '_student' });
}

function statusLabel(status) {
  if (STATUS_LABEL[status]) return STATUS_LABEL[status];
  if (status >= 500 && status <= 599) return '500';
  return '';
}

export function recordStatus(res, tags, correlationId) {
  const label = statusLabel(res.status);
  if (!label) return;
  httpErrors.add(1, {
    status: label,
    name: tags.name,
    scenario: tags.scenario,
    api: tags.api,
    method: tags.method,
  });
  console.warn(
    '[correlation] ' + correlationId
    + ' status=' + res.status
    + ' class=' + label
    + ' api=' + tags.api
    + ' method=' + tags.method
    + ' scenario=' + tags.scenario
  );
}

export function send(method, url, body, meta) {
  const correlationId = meta.correlationId;
  const headers = {
    'Content-Type': 'application/json',
    'X-Request-Id': correlationId,
    'X-Correlation-Id': correlationId,
  };
  if (meta.token) headers.Authorization = 'Bearer ' + meta.token;

  const tags = {
    name: meta.api,
    scenario: meta.scenario,
    api: meta.api,
    method: method,
  };
  const params = { headers: headers, tags: tags };
  let res;
  if (method === 'GET') res = http.get(url, params);
  else if (method === 'POST') res = http.post(url, body, params);
  else if (method === 'PUT') res = http.put(url, body, params);
  else throw new Error('Unsupported method ' + method);

  recordStatus(res, tags, correlationId);
  return res;
}
