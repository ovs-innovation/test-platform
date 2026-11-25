import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const questions = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_jee_final_408.json'), 'utf8'));

console.log('Total questions in current_electricity_jee_final_408.json:', questions.length);

const fallbackOptionsPatterns = [
  /^(?:100%|200%|300%|50%)$/,
  /^(?:1 : 2|2 : 1|1 : 4|4 : 1)$/,
  /^(?:2 \\Omega|4 \\Omega|8 \\Omega|1 \\Omega)$/,
  /^(?:1 A|2 A|0\.5 A|4 A)$/,
  /^(?:2 V|4 V|6 V|12 V)$/,
  /^(?:50 W|100 W|200 W|25 W)$/,
  /^(?:increases|decreases|remains unchanged|becomes zero)$/
];

const fallbackQs = [];
const dummyQs = [];
const garbledWords = [
  /\bcreat\b/i, /\bdiagean\b/i, /\bsesigance\b/i, /\bredstance\b/i, /\bvanmotes\b/i,
  /\bvilseter\b/i, /\bAnuneter\b/i, /\bklanticel\b/i, /\bcals\b/i, /\brceaased\b/i,
  /\bdismalricy\b/i, /\boppouste\b/i, /\bconnecrad\b/i, /\bfiament\b/i, /\bvahameter\b/i,
  /\bcurren\b/i, /\bcurram\b/i, /\bvaskan\b/i, /\bgahvanometer\b/i, /\bvoltmater\b/i,
  /\bammener\b/i, /\bparaiiet\b/i, /\brawstance\b/i, /\bdisrbad\b/i, /\bshawn\b/i,
  /\bperakel\b/i, /\bintermal\b/i, /\bcircl\b/i, /\bAcharged\b/i, /\bAchenged\b/i
];

const garbledQs = [];

questions.forEach(q => {
  if (q.question_type === 'mcq') {
    const opts = q.options || [];
    if (opts.length < 4) dummyQs.push({ q: q.q_num, reason: 'less than 4 options' });
    if (opts.some(o => /option [a-d]|^\(?[a-d]\)?$/i.test(o.trim()))) {
      dummyQs.push({ q: q.q_num, reason: 'dummy option letter' });
    }
    // Check if options match the fallback signature
    const joined = opts.join(' | ');
    if (
      joined === "100% | 200% | 300% | 50%" ||
      joined === "1 : 2 | 2 : 1 | 1 : 4 | 4 : 1" ||
      joined === "2 \\Omega | 4 \\Omega | 8 \\Omega | 1 \\Omega" ||
      joined === "1 A | 2 A | 0.5 A | 4 A" ||
      joined === "2 V | 4 V | 6 V | 12 V" ||
      joined === "50 W | 100 W | 200 W | 25 W" ||
      joined === "increases | decreases | remains unchanged | becomes zero"
    ) {
      fallbackQs.push(q.q_num);
    }
  }

  // Check garbled text
  const text = q.question_text || '';
  for (const pattern of garbledWords) {
    if (pattern.test(text)) {
      garbledQs.push({ q: q.q_num, match: text.match(pattern)[0] });
      break;
    }
  }
});

console.log('Dummy option questions:', dummyQs.length);
console.log('Fallback option questions:', fallbackQs.length, fallbackQs.slice(0, 30));
console.log('Garbled text questions:', garbledQs.length, garbledQs.slice(0, 20));
