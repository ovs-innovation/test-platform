import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'basic_chem_ocr_cache.json'), 'utf8'));

for (let p = 1; p <= 78; p++) {
  const pad = String(p).padStart(3, '0');
  const text = cache[pad] || '';
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  
  // Find lines starting with a number
  const qStarts = [];
  for (const l of lines) {
    const m = l.match(/^(\d{1,3})[\.:\)]\s+/);
    if (m) {
      qStarts.push(parseInt(m[1], 10));
    }
  }

  // Also check answer lines
  const ansMatches = [...text.matchAll(/(?:answer|answeR|Answer|Ans)\s*[:\.]\s*([A-D0-9]+)/gi)].map(m => m[1]);

  console.log(`Page ${String(p).padStart(2, '0')}: Q-starts: [${qStarts.join(', ')}] | Answers: [${ansMatches.join(', ')}] | First line: "${lines[0]?.slice(0, 50)}"`);
}
