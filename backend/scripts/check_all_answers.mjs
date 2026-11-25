import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('backend/scripts/emi_jee_ocr_cache.json', 'utf8'));

for (let p = 1; p <= 143; p++) {
  const text = pages[String(p)] || '';
  const lines = text.split('\n');
  const ansLines = lines.filter(l => l.trim().match(/^ANSWER\s*:/i));
  if (ansLines.length > 0) {
    console.log(`Page ${p} (${ansLines.length}): ${ansLines.map(l => l.trim()).join(' | ')}`);
  }
}
