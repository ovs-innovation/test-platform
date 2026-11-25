import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'goc_pages_text.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'goc_official_keys.json'), 'utf8'));

// Total questions: 337
// Pages with questions: 1 to 144 (1-based: page 2 to page 145)
const detectedMap = {};
const pageMap = [];

for (let p = 1; p < 145; p++) {
  const text = pages[p] || '';
  const lines = text.split('\n');
  const qMatches = [];

  for (let li = 0; li < lines.length; li++) {
    const l = lines[li].trim();
    // Pattern 1: Q1. JEE Main ... or Q1. or 1.
    const m = l.match(/^(?:Q\s*)?(\d{1,3})\s*[\.\)]\s*(.*)$/i);
    if (m) {
      const qNum = parseInt(m[1], 10);
      if (qNum >= 1 && qNum <= 337) {
        // Also check if line or next lines contain "JEE Main" or "AIEEE" or shift or exam
        const isExamHeader = /JEE Main|AIEEE|Shift|Slot|Morning|Evening|Online|Offline/i.test(l) ||
                             /JEE Main|AIEEE|Shift|Slot|Morning|Evening|Online|Offline/i.test(lines[li + 1] || '');
        qMatches.push({ qNum, lineIdx: li, raw: l, isExamHeader });
      }
    }
  }

  pageMap.push({ pageIndex: p, pageNumber: p + 1, qMatches });
}

for (const pm of pageMap) {
  for (const q of pm.qMatches) {
    if (!detectedMap[q.qNum]) {
      detectedMap[q.qNum] = [];
    }
    detectedMap[q.qNum].push({ page: pm.pageNumber, line: q.lineIdx, raw: q.raw, isHeader: q.isHeader });
  }
}

const missing = [];
for (let i = 1; i <= 337; i++) {
  if (!detectedMap[i]) missing.push(i);
}

console.log(`Total detected question starts: ${Object.keys(detectedMap).length}/337`);
console.log(`Missing question numbers: ${missing.length}`, missing);

// Check if any numbers have multiple detections
const multiple = Object.entries(detectedMap).filter(([k, v]) => v.length > 1);
console.log(`Questions detected on multiple pages/lines: ${multiple.length}`);
if (multiple.length > 0) {
  console.log('Sample multiple detections:', multiple.slice(0, 5));
}
