import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rawTsvCache = JSON.parse(fs.readFileSync(path.join(__dirname, 'aldehydes_tsv_cache.json'), 'utf8'));

const processedTsvCache = {};

for (const [pageNumStr, rawTsv] of Object.entries(rawTsvCache)) {
  const pageNum = parseInt(pageNumStr);
  const lines = [];
  let curLineWords = [];
  let curLineBox = null;

  for (const raw of rawTsv.split('\n')) {
    if (!raw.trim()) continue;
    const parts = raw.split('\t');
    const level = parseInt(parts[0]);
    const left = parseInt(parts[6]);
    const top = parseInt(parts[7]);
    const width = parseInt(parts[8]);
    const height = parseInt(parts[9]);
    const text = parts[11];

    if (level === 4) {
      if (curLineWords.length > 0 && curLineBox) {
        lines.push({ text: curLineWords.join(' '), ...curLineBox });
        curLineWords = [];
      }
      curLineBox = { left, top, width, height };
    } else if (level === 5 && text && text.trim()) {
      curLineWords.push(text.trim());
    }
  }
  if (curLineWords.length > 0 && curLineBox) {
    lines.push({ text: curLineWords.join(' '), ...curLineBox });
  }

  processedTsvCache[pageNum] = {
    page: pageNum,
    lines: lines
  };
}

fs.writeFileSync(path.join(__dirname, 'aldehydes_lines_cache.json'), JSON.stringify(processedTsvCache, null, 2));
console.log(`Successfully generated aldehydes_lines_cache.json for ${Object.keys(processedTsvCache).length} pages.`);
