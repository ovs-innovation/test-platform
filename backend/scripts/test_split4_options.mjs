import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const chunks = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_monotonic_chunks.json'), 'utf8'));
const NUMERICAL_QUESTIONS = new Set([64, 71, 77, 78, 86, 96, 101, 103, 112, 117, 140, 190, 203, 207, 216]);

function split4Options(lines) {
  // If exactly 4 lines and each starts with A, B, C, D
  if (lines.length === 4) {
    const cleanLines = lines.map(l => l.replace(/^[\(\[]?[A-Da-d0-9®©][\)\.\:\s\]]\s*/, '').trim());
    if (cleanLines.every(l => l.length > 0)) {
      return cleanLines;
    }
  }

  // If 2 lines: line 0 has A & B, line 1 has C & D
  if (lines.length === 2) {
    const l0 = lines[0];
    const l1 = lines[1];
    const bMatch = l0.match(/(?:[\(\[]?[bB8®][\)\.\:\s\]]|®\)?)\s*/);
    const dMatch = l1.match(/(?:[\(\[]?[dD0][\)\.\:\s\]]|\(0\))\s*/);
    if (bMatch && dMatch) {
      const optA = l0.slice(0, bMatch.index).replace(/^[\(\[]?[Aa][\)\.\:\s\]]\s*/, '').trim();
      const optB = l0.slice(bMatch.index + bMatch[0].length).trim();
      const optC = l1.slice(0, dMatch.index).replace(/^[\(\[]?[Cc©][\)\.\:\s\]]\s*/, '').trim();
      const optD = l1.slice(dMatch.index + dMatch[0].length).trim();
      if (optA && optB && optC && optD) {
        return [optA, optB, optC, optD];
      }
    }
  }

  // Joined text matching
  let joined = lines.join(' ');
  // Normalize markers
  joined = joined.replace(/®\s*\)/g, '<<<B>>>');
  joined = joined.replace(/®/g, '<<<B>>>');
  joined = joined.replace(/©\s*\)/g, '<<<C>>>');
  joined = joined.replace(/©/g, '<<<C>>>');
  joined = joined.replace(/(?:^|\s)\(?[aA]\)\s*/g, ' <<<A>>> ');
  joined = joined.replace(/(?:^|\s)\(?[bB8]\)\s*/g, ' <<<B>>> ');
  joined = joined.replace(/(?:^|\s)\(?[cC]\)\s*/g, ' <<<C>>> ');
  joined = joined.replace(/(?:^|\s)\(?[dD0]\)\s*/g, ' <<<D>>> ');

  const aIdx = joined.indexOf('<<<A>>>');
  const bIdx = joined.indexOf('<<<B>>>', aIdx !== -1 ? aIdx + 7 : 0);
  const cIdx = joined.indexOf('<<<C>>>', bIdx !== -1 ? bIdx + 7 : 0);
  const dIdx = joined.indexOf('<<<D>>>', cIdx !== -1 ? cIdx + 7 : 0);

  if (aIdx !== -1 && bIdx !== -1 && cIdx !== -1 && dIdx !== -1) {
    const optA = joined.slice(aIdx + 7, bIdx).trim();
    const optB = joined.slice(bIdx + 7, cIdx).trim();
    const optC = joined.slice(cIdx + 7, dIdx).trim();
    const optD = joined.slice(dIdx + 7).trim();
    if (optA && optB && optC && optD) {
      return [optA, optB, optC, optD];
    }
  }

  return null;
}

let ok = 0;
let fail = 0;
const fails = [];

for (let q = 1; q <= 217; q++) {
  if (NUMERICAL_QUESTIONS.has(q)) continue;
  const c = chunks[q];
  const lines = c.lines;

  let mIdx = -1;
  for (let l = 0; l < lines.length; l++) {
    if (/\[\d+\s*marks/i.test(lines[l]) || /ANSWER\s*:\s*/i.test(lines[l])) {
      mIdx = l;
      break;
    }
  }

  const preLines = lines.slice(0, mIdx);
  const optLines = [];
  for (let l = preLines.length - 1; l >= 0; l--) {
    const line = preLines[l].trim();
    if (line.length === 0) continue;
    optLines.unshift(line);
    const joined = optLines.join(' ');
    const hasA = /[\(]?[Aa][\)\.\:\s]|<<<A>>>/i.test(joined);
    const hasB = /[\(]?[Bb8®][\)\.\:\s]|<<<B>>>/i.test(joined);
    const hasC = /[\(]?[Cc©][\)\.\:\s]|<<<C>>>/i.test(joined);
    const hasD = /[\(]?[Dd0][\)\.\:\s]|<<<D>>>/i.test(joined);
    if ((hasA && hasB && hasC) || (hasA && hasD) || optLines.length >= 4) {
      break;
    }
  }

  const opts = split4Options(optLines);
  if (opts && opts.length === 4 && opts.every(o => o.length > 0)) {
    ok++;
  } else {
    fail++;
    fails.push({ q, optLines });
  }
}

console.log(`4-Option split results: ${ok} / 202 succeeded, ${fail} failed.`);
if (fail > 0) {
  console.log(`Sample failure (Q${fails[0].q}):`, fails[0].optLines);
}
