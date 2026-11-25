import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const detected = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_detected_diagrams.json'), 'utf8'));
const ocrPages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_jee_ocr_cache.json'), 'utf8'));

console.log(`Analyzing ${detected.length} diagram pages...`);

const diagramSpecs = [];

for (const item of detected) {
  const p = item.page;
  const text = ocrPages[String(p)] || '';
  const lines = text.split('\n');

  // Find question numbers on this page
  // E.g. "12. A student...", "27. In the given figure..."
  const qMatches = [];
  lines.forEach((l, idx) => {
    const m = l.match(/(?:^|\s)(?:Q\.?\s*)?(\d{1,3})[\.\-\)]\s+([A-Z].*)/);
    if (m) {
      const qNum = parseInt(m[1], 10);
      if (qNum >= 1 && qNum <= 298) {
        qMatches.push({ qNum, text: m[2].slice(0, 50), lineIdx: idx });
      }
    }
  });

  // Find ANSWER line index
  let answerLineIdx = -1;
  lines.forEach((l, idx) => {
    if (/ANSWER\s*:/i.test(l)) {
      answerLineIdx = idx;
    }
  });

  // Also check if question stem explicitly mentions a diagram
  const mentionsDiag = /figure|shown in|diagram|graph|fig|following figure/i.test(text);

  console.log(`Page ${p}: Qs = [${qMatches.map(q => q.qNum).join(', ')}], mentionsDiag = ${mentionsDiag}, spans = ${item.spans.length}`);
}
