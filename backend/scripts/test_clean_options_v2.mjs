import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const chunks = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_monotonic_chunks.json'), 'utf8'));
const NUMERICAL_QUESTIONS = new Set([64, 71, 77, 78, 86, 96, 101, 103, 112, 117, 140, 190, 203, 207, 216]);

function parse2LineOptions(l0, l1) {
  // Line 0: split into A and B
  let a = '', b = '', c = '', d = '';

  const bMatch = l0.match(/(?:[\(\[]?[bB8®][\)\.\:\s\]]|®\)?)\s*/);
  if (bMatch) {
    a = l0.slice(0, bMatch.index).replace(/^[\(\[]?[aAWw][\)\.\:\s\]]\s*/, '').trim();
    b = l0.slice(bMatch.index + bMatch[0].length).trim();
  }

  // Line 1: split into C and D
  const dMatch = l1.match(/(?:[\(\[]?[dD0][\)\.\:\s\]]|\(0\))\s*/);
  if (dMatch) {
    c = l1.slice(0, dMatch.index).replace(/^[\(\[]?[cC©][\)\.\:\s\]]\s*/, '').trim();
    d = l1.slice(dMatch.index + dMatch[0].length).trim();
  } else {
    // If no D marker, check if C marker is at start
    const cMatch = l1.match(/^[\(\[]?[cC©][\)\.\:\s\]]\s*/);
    if (cMatch) {
      const rest = l1.slice(cMatch[0].length).trim();
      // Look for space-separated two items, e.g. "2:1 1:4"
      const parts = rest.split(/\s{2,}|\t/);
      if (parts.length >= 2) {
        c = parts[0].trim();
        d = parts.slice(1).join(' ').trim();
      } else {
        const words = rest.split(/\s+/);
        if (words.length === 2) {
          c = words[0];
          d = words[1];
        } else if (words.length > 2) {
          const mid = Math.floor(words.length / 2);
          c = words.slice(0, mid).join(' ');
          d = words.slice(mid).join(' ');
        }
      }
    }
  }

  if (a && b && c && d) {
    return [a, b, c, d];
  }
  return null;
}

function extractQuestionAndOptions(lines) {
  const ansIdx = lines.findIndex(l => /ANSWER\s*:\s*/i.test(l));
  let preAns = lines.slice(0, ansIdx);

  if (preAns.length > 0 && /marks/i.test(preAns[preAns.length - 1])) {
    preAns = preAns.slice(0, preAns.length - 1);
  }

  // Look for option block
  let optStartIdx = -1;
  for (let l = 0; l < preAns.length; l++) {
    const line = preAns[l];
    if (/(?:^|\s)\(?[aA]\)\s*/.test(line) || /®/.test(line) || /©/.test(line) || /^\s*W\s+/.test(line)) {
      optStartIdx = l;
      break;
    }
  }

  if (optStartIdx === -1) {
    optStartIdx = Math.max(0, preAns.length - 2);
  }

  const qLines = preAns.slice(0, optStartIdx);
  const optLines = preAns.slice(optStartIdx);

  let qText = qLines.join(' ').replace(/^(\bQ\.?\s*)?\d+[\.:\)]\s*/i, '').trim();
  qText = qText.replace(/^(8\.|TM\.|S51|M0\.|MM\.|M3\.|LUE|M7\.|M[89]\.|13|15|189\.|82\.|Ho:|i308|bi|ea)\s*/i, '');

  if (optLines.length === 2) {
    const res2 = parse2LineOptions(optLines[0], optLines[1]);
    if (res2) {
      return { qText, options: res2, success: true };
    }
  }

  if (optLines.length === 4) {
    const cleanLines = optLines.map(l => l.replace(/^[\(\[]?[A-Da-d0-9®©][\)\.\:\s\]]\s*/, '').trim());
    if (cleanLines.every(l => l.length > 0)) {
      return { qText, options: cleanLines, success: true };
    }
  }

  // Joined matching fallback
  let optBlock = optLines.join(' ');
  optBlock = optBlock.replace(/®\s*\)/g, '<<<B>>>');
  optBlock = optBlock.replace(/®/g, '<<<B>>>');
  optBlock = optBlock.replace(/©\s*\)/g, '<<<C>>>');
  optBlock = optBlock.replace(/©/g, '<<<C>>>');
  optBlock = optBlock.replace(/\bW\s*([0-9a-zA-Z\$\\])/g, '<<<A>>> $1');
  optBlock = optBlock.replace(/(?:^|\s)\(?[aA]\)\s*/g, ' <<<A>>> ');
  optBlock = optBlock.replace(/(?:^|\s)\(?[bB8]\)\s*/g, ' <<<B>>> ');
  optBlock = optBlock.replace(/(?:^|\s)\(?[cC]\)\s*/g, ' <<<C>>> ');
  optBlock = optBlock.replace(/(?:^|\s)\(?[dD0]\)\s*/g, ' <<<D>>> ');

  const aIdx = optBlock.indexOf('<<<A>>>');
  const bIdx = optBlock.indexOf('<<<B>>>', aIdx !== -1 ? aIdx + 7 : 0);
  const cIdx = optBlock.indexOf('<<<C>>>', bIdx !== -1 ? bIdx + 7 : 0);
  const dIdx = optBlock.indexOf('<<<D>>>', cIdx !== -1 ? cIdx + 7 : 0);

  if (aIdx !== -1 && bIdx !== -1 && cIdx !== -1 && dIdx !== -1) {
    const extraQ = optBlock.slice(0, aIdx).trim();
    if (extraQ) qText += ' ' + extraQ;
    const optA = optBlock.slice(aIdx + 7, bIdx).trim();
    const optB = optBlock.slice(bIdx + 7, cIdx).trim();
    const optC = optBlock.slice(cIdx + 7, dIdx).trim();
    const optD = optBlock.slice(dIdx + 7).trim();
    return { qText, options: [optA, optB, optC, optD], success: true };
  }

  return { qText, options: optLines, success: false };
}

let okCount = 0;
let failCount = 0;
const failures = [];

for (let q = 1; q <= 217; q++) {
  if (NUMERICAL_QUESTIONS.has(q)) continue;
  const c = chunks[q];
  const res = extractQuestionAndOptions(c.lines);
  if (res.success && res.options.every(o => o.length > 0)) {
    okCount++;
  } else {
    failCount++;
    failures.push({ q, res });
  }
}

console.log(`Extract results: ${okCount} / 202 succeeded, ${failCount} failed.`);
if (failures.length > 0) {
  console.log('Sample failure:', failures[0].q, failures[0].res);
}
