import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const detected = JSON.parse(fs.readFileSync(path.join(__dirname, 'halo_detected_diagrams.json'), 'utf8'));
const urls = JSON.parse(fs.readFileSync(path.join(__dirname, 'halo_diagram_urls.json'), 'utf8'));
const linesCache = JSON.parse(fs.readFileSync(path.join(__dirname, 'halo_lines_cache.json'), 'utf8'));

// Find marks and answer top boundaries on each page
const pageBoundaries = {};

for (let p = 1; p <= 153; p++) {
  const lines = linesCache[p]?.lines || [];
  let marksTop = 99999;
  let ansTop = 99999;

  for (const l of lines) {
    if (/\[\s*4\s*marks/i.test(l.text)) {
      if (l.top < marksTop) marksTop = l.top;
    }
    if (/^ANSWER\s*:/i.test(l.text)) {
      if (l.top < ansTop) ansTop = l.top;
    }
  }

  pageBoundaries[p] = { marksTop, ansTop };
}

const detectedWithUrls = [];

for (const d of detected) {
  const key = d.fileName.replace('.png', '');
  const url = urls[key];
  if (!url) {
    console.warn(`URL not found for ${key}`);
    continue;
  }

  const pInfo = pageBoundaries[d.page];
  const midY = d.cropY + d.cropH / 2;
  const isQuestionDiag = midY < pInfo.marksTop;

  detectedWithUrls.push({
    ...d,
    url,
    isQuestionDiag
  });
}

console.log(`Associated ${detectedWithUrls.length} diagrams with URLs and Q/Sol boundaries.`);
const qDiags = detectedWithUrls.filter(d => d.isQuestionDiag);
const solDiags = detectedWithUrls.filter(d => !d.isQuestionDiag);
console.log(`Question diagrams: ${qDiags.length}, Solution diagrams: ${solDiags.length}`);

fs.writeFileSync(path.join(__dirname, 'halo_detected_with_urls.json'), JSON.stringify(detectedWithUrls, null, 2));
