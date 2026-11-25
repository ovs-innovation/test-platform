import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'mag_jee_ocr_cache.json'), 'utf8'));

const pageMap = [];

for (let p = 1; p <= 202; p++) {
  const text = pages[String(p)] || '';
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  
  // Look for any line that starts with digits followed by dot/space, or check first 3 lines
  const starts = [];
  lines.forEach((l, idx) => {
    const m = l.match(/^([0-9]{1,3})[\.\s\)]/);
    if (m && !l.includes('marks') && !l.includes('Weber') && !l.includes('Tesla')) {
      starts.push({ num: parseInt(m[1], 10), line: l.slice(0, 70), idx });
    }
  });

  const firstFew = lines.slice(0, 3).join(' | ').slice(0, 100);
  const hasAnswer = text.includes('ANSWER:') || text.includes('Answer:');
  pageMap.push({ page: p, starts, firstFew, hasAnswer });
}

console.log(`Page mapping summary (sample):`);
for (let p = 35; p <= 75; p++) {
  const pm = pageMap[p - 1];
  console.log(`P${p}: starts=[${pm.starts.map(s => s.num).join(', ')}] | ${pm.firstFew}`);
}
