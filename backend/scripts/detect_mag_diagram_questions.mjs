import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'mag_jee_ocr_cache.json'), 'utf8'));

const figPages = [];
const FIG_KEYWORDS = [
  'figure', 'shown in figure', 'shown in the figure',
  'as shown', 'given in figure', 'diagram', 'graph',
  'circuit', 'loop', 'following figure', 'given figure'
];

for (let p = 1; p <= 202; p++) {
  const text = pages[String(p)] || '';
  const lines = text.split('\n');
  const found = [];
  for (const l of lines) {
    const lower = l.toLowerCase();
    for (const kw of FIG_KEYWORDS) {
      if (lower.includes(kw)) {
        found.push({ kw, line: l.trim().slice(0, 100) });
        break;
      }
    }
  }
  if (found.length > 0) {
    figPages.push({ page: p, found });
  }
}

console.log(`Found ${figPages.length} pages mentioning figure/diagram keywords.`);
for (const fp of figPages.slice(0, 30)) {
  console.log(`P${fp.page}: ${fp.found.map(f => f.kw).join(', ')} -> ${fp.found[0].line}`);
}
