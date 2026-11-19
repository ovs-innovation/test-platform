import exec from 'k6/execution';
import { sleep } from 'k6';
import { scenarioKeyForIndex } from './config.js';

export function createCorrelationId() {
  const time = Date.now().toString(16);
  const rand = Math.random().toString(16).slice(2, 10);
  return 'lt-' + time + '-' + rand;
}

export function readJson(res) {
  try {
    return res.json();
  } catch (err) {
    return null;
  }
}

export function questionIdsFrom(res) {
  const body = readJson(res);
  const questions = body && body.questions;
  if (!questions || !questions.length) return [];
  const ids = [];
  for (let i = 0; i < questions.length; i++) {
    const id = Number(questions[i].id);
    if (id) ids.push(id);
  }
  return ids;
}

// One executor owns VU ids 1..N, so id N is CSV row N. The row's range picks the behaviour.
export function locateStudent(roster, plan) {
  const index = exec.vu.idInInstance - 1;
  if (index < 0 || index >= plan.total) {
    throw new Error('Virtual user ' + (index + 1) + ' is outside the roster of ' + plan.total);
  }
  const scenarioKey = scenarioKeyForIndex(plan, index);
  if (!scenarioKey) {
    throw new Error('Virtual user ' + (index + 1) + ' has no behaviour assignment');
  }
  return {
    index: index,
    scenarioKey: scenarioKey,
    student: roster[index],
  };
}

export function think(minSeconds, maxSeconds) {
  const span = Math.max(0, maxSeconds - minSeconds);
  sleep(minSeconds + (Math.random() * span));
}

export function idle() {
  sleep(5);
}
