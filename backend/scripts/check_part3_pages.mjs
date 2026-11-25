import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('backend/scripts/hydro_jee_ocr_cache.json', 'utf8'));

for (let p = 60; p <= 94; p++) {
  const text = ocr[String(p)] || '';
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const qMatches = lines.filter(l => /^\s*(\d{2,3})\s*[\.:\)]/i.test(l) || /Question\s*#?\s*(\d{2,3})/i.test(l));
  const answers = lines.filter(l => /^Answer\s*:\s*/i.test(l));
  console.log(`Page ${p}: Qs -> [${qMatches.join('; ')}] | Answers -> [${answers.join('; ')}]`);
}
