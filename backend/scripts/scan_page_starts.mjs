import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));

const pageSummaries = [];

for (let p = 1; p <= 211; p++) {
  const text = cache[p] || '';
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  
  // Find lines starting with a number or letter followed by a dot
  const candidateStarts = [];
  for (const line of lines) {
    if (/^(?:AcadXL|PREVIOU|Current Electricity|Time|Max)/i.test(line)) continue;
    const m = line.match(/^([0-9A-Za-z]{1,4})\s*[\.\)]\s*(.*)/);
    if (m) {
      candidateStarts.push({ token: m[1], preview: m[2].slice(0, 40) });
    }
  }
  pageSummaries.push({ page: p, candidates: candidateStarts });
}

console.log('Page summaries count:', pageSummaries.length);
// Print sample summaries
for (let p = 1; p <= 30; p++) {
  const c = pageSummaries[p - 1].candidates;
  console.log(`Page ${p}:`, c.map(x => `${x.token}: ${x.preview}`).join(' | '));
}
