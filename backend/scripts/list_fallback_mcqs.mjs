import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const keys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_official_keys.json'), 'utf8'));
const diags = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_clean_diagram_urls.json'), 'utf8'));
const existing = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_jee_final_408.json'), 'utf8'));

// Find all 229 questions that currently have fallback options
const fallbackQs = [];
for (let q = 1; q <= 408; q++) {
  const k = keys[q];
  if (['A', 'B', 'C', 'D'].includes(k)) {
    const qObj = existing.find(x => x.q_num === q);
    const opts = qObj?.options || [];
    const joined = opts.join(' | ');
    if (
      joined === "100% | 200% | 300% | 50%" ||
      joined === "1 : 2 | 2 : 1 | 1 : 4 | 4 : 1" ||
      joined === "2 \\Omega | 4 \\Omega | 8 \\Omega | 1 \\Omega" ||
      joined === "1 A | 2 A | 0.5 A | 4 A" ||
      joined === "2 V | 4 V | 6 V | 12 V" ||
      joined === "50 W | 100 W | 200 W | 25 W" ||
      joined === "increases | decreases | remains unchanged | becomes zero" ||
      opts.some(o => /option [a-d]/i.test(o))
    ) {
      fallbackQs.push({
        q,
        key: k,
        hasDiag: !!diags[`q${q}_question_diagram.png`],
        text: qObj?.question_text || ''
      });
    }
  }
}

console.log('Total fallback MCQs to solve:', fallbackQs.length);

// Group them by batch of 30
console.log('Batch 1 (first 25):');
fallbackQs.slice(0, 25).forEach(f => {
  console.log(`Q${f.q} [Ans: ${f.key}, Diag: ${f.hasDiag}]: ${f.text.slice(0, 85).replace(/\n/g, ' ')}`);
});
