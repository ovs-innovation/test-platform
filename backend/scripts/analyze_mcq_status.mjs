import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const keys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_official_keys.json'), 'utf8'));
const diags = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_clean_diagram_urls.json'), 'utf8'));
const existing = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_jee_final_408.json'), 'utf8'));

// Check how many questions have acceptable options vs need real options
const mcqs = [];
const numericals = [];

for (let q = 1; q <= 408; q++) {
  const k = keys[q];
  const isNum = !['A', 'B', 'C', 'D'].includes(k);
  const qObj = existing.find(x => x.q_num === q);
  
  if (isNum) {
    numericals.push({
      q,
      key: k,
      textSnippet: qObj?.question_text?.slice(0, 80) || ''
    });
  } else {
    const opts = qObj?.options || [];
    const joined = opts.join(' | ');
    const isFallback = (
      joined === "100% | 200% | 300% | 50%" ||
      joined === "1 : 2 | 2 : 1 | 1 : 4 | 4 : 1" ||
      joined === "2 \\Omega | 4 \\Omega | 8 \\Omega | 1 \\Omega" ||
      joined === "1 A | 2 A | 0.5 A | 4 A" ||
      joined === "2 V | 4 V | 6 V | 12 V" ||
      joined === "50 W | 100 W | 200 W | 25 W" ||
      joined === "increases | decreases | remains unchanged | becomes zero" ||
      opts.some(o => /option [a-d]/i.test(o))
    );
    mcqs.push({
      q,
      key: k,
      isFallback,
      opts: opts,
      textSnippet: qObj?.question_text?.slice(0, 80) || ''
    });
  }
}

console.log('Numericals count:', numericals.length);
console.log('MCQs count:', mcqs.length);
const goodMCQs = mcqs.filter(m => !m.isFallback);
const badMCQs = mcqs.filter(m => m.isFallback);
console.log('MCQs with genuine options:', goodMCQs.length);
console.log('MCQs with fallback options to fix:', badMCQs.length);
console.log('List of MCQs with fallback options:', badMCQs.map(m => m.q).join(', '));
