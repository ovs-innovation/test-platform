import { SharedArray } from 'k6/data';
import exec from 'k6/execution';
import { assertSafeBaseUrl, BASE_URL, planRun, scenarioKeyForIndex, scenarioOptions, studentsFile } from './config.js';
import { assertUniqueRoster, parseStudentCsv } from './csv.js';
import { fastStudent } from './scenarios/fastStudent.js';
import { slowStudent } from './scenarios/slowStudent.js';
import { skipStudent } from './scenarios/skipStudent.js';
import { reviewStudent } from './scenarios/reviewStudent.js';
import { randomStudent } from './scenarios/randomStudent.js';

assertSafeBaseUrl(BASE_URL);

const roster = new SharedArray('students', function () {
  return parseStudentCsv(open(studentsFile()));
});

const plan = planRun(roster.length);
assertUniqueRoster(roster, plan.total);

const runners = {
  fast: fastStudent,
  slow: slowStudent,
  skip: skipStudent,
  review: reviewStudent,
  random: randomStudent,
};

export const options = {
  // Keep the behaviour label on each request. k6 would otherwise replace it with this one executor's name.
  systemTags: ['proto', 'subproto', 'status', 'method', 'url', 'name', 'group', 'check', 'error', 'error_code', 'tls_version', 'service', 'expected_response'],
  scenarios: scenarioOptions(plan),
};

export function runStudent() {
  const index = exec.vu.idInInstance - 1;
  const key = scenarioKeyForIndex(plan, index);
  const run = runners[key];
  if (!run) {
    throw new Error('Virtual user ' + (index + 1) + ' has no behaviour assignment');
  }
  run(roster, plan);
}
