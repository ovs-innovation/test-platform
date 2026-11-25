import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pageRanges = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'hydro_page_ranges.json'), 'utf8'));
const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'hydro_jee_ocr_cache.json'), 'utf8'));

console.log('=== SURVEYING ALL 241 QUESTIONS FOR DIAGRAM REQUIREMENTS ===');

// Let's inspect each question's text from OCR across all pages
const diagramQuestions = [];

for (const entry of pageRanges) {
  const p = entry.p;
  const ocrText = cache[p] || '';

  // In each page, check which questions have diagrams:
  // Usually questions with:
  // - "following reaction", "major product", "given sequence", "compound X", "structure of"
  // - Or pages where options have drawn rings/structures
  // Let's log for each page
  for (const qNum of entry.qs) {
    // Check if the question text or options in OCR indicate reaction scheme or drawing
    // e.g. arrows, [Intermediate], or missing option text in OCR because options are images
  }
}

console.log('Done.');
