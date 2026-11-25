import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const parsed = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_parsed_raw.json'), 'utf8'));

function parseOptionsExtended(rawText) {
  let text = ' ' + rawText.trim() + ' ';

  // Normalize markers to standard tokens
  // A: (A), A), (a), a)
  text = text.replace(/(?:\([aA]\)|(?<=\s)[aA]\)|(?<=\s)W(?=\s+[0-9a-zA-Z\$\\]))/g, ' <<<A>>> ');
  
  // B: (B), B), (b), b), ®), ®, 8), (8)
  text = text.replace(/(?:\([bB]\)|(?<=\s)[bB]\)|®\)?|\(8\)|\b8\))/g, ' <<<B>>> ');

  // C: (C), C), (c), c), ©), ©, (©)
  text = text.replace(/(?:\([cC]\)|(?<=\s)[cC]\)|©\)?|\(©\))/g, ' <<<C>>> ');

  // D: (D), D), (d), d), (0), 0)
  text = text.replace(/(?:\([dD]\)|(?<=\s)[dD]\)|\(0\)|\b0\))/g, ' <<<D>>> ');

  const aIdx = text.indexOf('<<<A>>>');
  const bIdx = text.indexOf('<<<B>>>', aIdx + 7);
  const cIdx = text.indexOf('<<<C>>>', bIdx + 7);
  const dIdx = text.indexOf('<<<D>>>', cIdx + 7);

  if (aIdx !== -1 && bIdx !== -1 && cIdx !== -1 && dIdx !== -1) {
    const qBody = text.slice(0, aIdx).trim();
    const optA = text.slice(aIdx + 7, bIdx).trim();
    const optB = text.slice(bIdx + 7, cIdx).trim();
    const optC = text.slice(cIdx + 7, dIdx).trim();
    // End of D is either [4 marks... or end of text
    let optD = text.slice(dIdx + 7).trim();
    const marksIdx = optD.search(/\[\d+\s*marks/i);
    if (marksIdx !== -1) {
      optD = optD.slice(0, marksIdx).trim();
    }
    return { qBody, options: [optA, optB, optC, optD], success: true };
  }

  return { qBody: rawText, options: [], success: false };
}

let success = 0;
let fail = 0;
const stillFailed = [];

for (let q = 1; q <= 217; q++) {
  const item = parsed[q];
  if (item.isNumeric) continue;
  const res = parseOptionsExtended(item.rawQuestion);
  if (res.success && res.options.every(o => o.length > 0)) {
    success++;
  } else {
    fail++;
    stillFailed.push(q);
  }
}

console.log(`Extended option parser: ${success} / 202 succeeded, ${fail} failed.`);
console.log('Still failed:', stillFailed);
