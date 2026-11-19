// Init-time settings for the staging/local exam scenarios.
// STUDENTS_FILE defaults to the example roster. Point it at data/students.csv for a real staging roster.

const LOCAL_HOSTS = {
  localhost: true,
  '127.0.0.1': true,
  '::1': true,
};

const PRODUCTION_HOSTS = {
  'edvedum.com': true,
  'www.edvedum.com': true,
  'cbt.prosperrainfra.com': true,
};

const SCENARIO_ORDER = ['fast', 'slow', 'skip', 'review', 'random'];

const DEFAULT_PERCENT = {
  fast: 40,
  slow: 20,
  skip: 15,
  review: 15,
  random: 10,
};

export const BASE_URL = String(__ENV.BASE_URL || 'http://localhost:5000').replace(/\/$/, '');
export const EXAM_WINDOW = __ENV.EXAM_WINDOW || '30s';

export function studentsFile() {
  return __ENV.STUDENTS_FILE || 'data/students.example.csv';
}

export function assessmentId() {
  return Number(__ENV.ASSESSMENT_ID || '0');
}

export function requireAssessmentId() {
  const id = assessmentId();
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error('Set ASSESSMENT_ID to the disposable staging assessment before running');
  }
  return id;
}

function hostOf(baseUrl) {
  const match = String(baseUrl || '').match(/^[a-z][a-z0-9+.-]*:\/\/([^/?#]+)/i);
  if (!match) {
    throw new Error('BASE_URL must be an absolute http(s) URL');
  }
  let hostPort = match[1];
  const at = hostPort.lastIndexOf('@');
  if (at !== -1) hostPort = hostPort.slice(at + 1);
  if (hostPort.charAt(0) === '[') {
    const end = hostPort.indexOf(']');
    if (end === -1) throw new Error('BASE_URL has a broken IPv6 host');
    return hostPort.slice(1, end).toLowerCase();
  }
  return hostPort.split(':')[0].toLowerCase();
}

function allowedHostSet() {
  const set = {};
  const raw = __ENV.ALLOWED_HOSTS || '';
  const parts = raw.split(',');
  for (let i = 0; i < parts.length; i++) {
    const host = parts[i].trim().toLowerCase();
    if (host) set[host] = true;
  }
  return set;
}

export function assertSafeBaseUrl(baseUrl) {
  const host = hostOf(baseUrl);
  if (PRODUCTION_HOSTS[host]) {
    throw new Error('Refusing ' + host + '. This load test runs only on localhost or a staging host listed in ALLOWED_HOSTS.');
  }
  const allowed = allowedHostSet();
  if (LOCAL_HOSTS[host] || allowed[host]) return host;
  throw new Error('Refusing ' + host + '. Use localhost or add the staging host to ALLOWED_HOSTS.');
}

function readPercent(name, fallback) {
  const raw = __ENV[name];
  if (raw === undefined || raw === '') return fallback;
  const value = Number(raw);
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(name + ' must be a non-negative number');
  }
  return value;
}

export function percentages() {
  const weights = {
    fast: readPercent('PCT_FAST', DEFAULT_PERCENT.fast),
    slow: readPercent('PCT_SLOW', DEFAULT_PERCENT.slow),
    skip: readPercent('PCT_SKIP', DEFAULT_PERCENT.skip),
    review: readPercent('PCT_REVIEW', DEFAULT_PERCENT.review),
    random: readPercent('PCT_RANDOM', DEFAULT_PERCENT.random),
  };
  let sum = 0;
  for (let i = 0; i < SCENARIO_ORDER.length; i++) {
    sum += weights[SCENARIO_ORDER[i]];
  }
  if (Math.abs(sum - 100) > 0.001) {
    throw new Error('Scenario percentages must add up to 100. Current sum is ' + sum + '.');
  }
  return weights;
}

export function readTotalVus(rosterLength) {
  const raw = __ENV.TOTAL_VUS;
  if (raw === undefined || raw === '') return rosterLength;
  const total = Number(raw);
  if (!Number.isInteger(total) || total <= 0) {
    throw new Error('TOTAL_VUS must be a positive integer');
  }
  if (total > rosterLength) {
    throw new Error('TOTAL_VUS ' + total + ' is larger than the CSV roster (' + rosterLength + ')');
  }
  return total;
}

export function planRun(rosterLength) {
  const total = readTotalVus(rosterLength);
  const weights = percentages();
  const counts = {};
  let used = 0;
  for (let i = 0; i < SCENARIO_ORDER.length; i++) {
    const key = SCENARIO_ORDER[i];
    counts[key] = Math.floor((total * weights[key]) / 100);
    used += counts[key];
  }
  counts.random += total - used;

  const ranges = {};
  let cursor = 0;
  for (let i = 0; i < SCENARIO_ORDER.length; i++) {
    const key = SCENARIO_ORDER[i];
    ranges[key] = { start: cursor, end: cursor + counts[key] };
    cursor = ranges[key].end;
  }

  return {
    total: total,
    counts: counts,
    ranges: ranges,
    duration: EXAM_WINDOW,
  };
}

export function scenarioKeyForIndex(plan, index) {
  for (let i = 0; i < SCENARIO_ORDER.length; i++) {
    const key = SCENARIO_ORDER[i];
    const range = plan.ranges[key];
    if (range && index >= range.start && index < range.end) return key;
  }
  return '';
}

export function scenarioOptions(plan) {
  return {
    students: {
      executor: 'constant-vus',
      vus: plan.total,
      duration: plan.duration,
      exec: 'runStudent',
      gracefulStop: '10s',
    },
  };
}
