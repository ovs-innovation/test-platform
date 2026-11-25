import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ocrCache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_jee_ocr_cache.json'), 'utf8'));
const keys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_jee_official_keys.json'), 'utf8'));

// Build strict page to question mapping
// We know Q1 starts on page 1, Q298 ends on page 250
const pageMap = {};
let currentQ = 1;

for (let p = 1; p <= 250; p++) {
  const text = ocrCache[String(p)] || '';
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  // Check for marks tags or answer tags on this page
  // A question typically has an answer tag or marks tag
  const ansCount = (text.match(/\[?\s*A[HNW]SWER\s*:\s*[^\n\r]+/gi) || []).length;
  
  pageMap[p] = {
    startQ: currentQ,
    ansCount: ansCount,
    textPreview: lines.slice(0, 3).join(' | ')
  };

  currentQ += ansCount;
}

console.log(`Mapped pages 1..250. Final Q reached: ${currentQ - 1}`);
fs.writeFileSync(
  path.resolve(__dirname, 'ray_page_strict_mapping.json'),
  JSON.stringify(pageMap, null, 2)
);
