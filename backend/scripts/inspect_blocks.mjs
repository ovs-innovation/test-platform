import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'pblock_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'pblock_official_keys.json'), 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'pblock_diagram_urls.json'), 'utf8'));
const pageMap = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'pblock_page_map.json'), 'utf8'));

// Build raw block per question using page map
const questionRawBlocks = {};

for (const entry of pageMap) {
  const pageNum = entry.page;
  const pad = String(pageNum).padStart(3, '0');
  const pageText = cache[pad] || '';
  const qList = entry.questions;

  // Let's print out each question text chunk
  console.log(`Page ${pageNum}: questions ${qList.join(', ')}`);
}
