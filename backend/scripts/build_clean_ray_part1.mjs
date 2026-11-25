import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const keys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_jee_official_keys.json'), 'utf8'));
const diagUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_clean_diagram_urls.json'), 'utf8'));
const ocrCache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_jee_ocr_cache.json'), 'utf8'));

// Assemble linear lines with page markers
const allLines = [];
for (let p = 1; p <= 65; p++) {
  const text = ocrCache[String(p)] || '';
  for (const l of text.split('\n')) {
    allLines.push({ page: p, text: l.trim() });
  }
}

// Helper to clean KaTeX math
function cleanMath(str) {
  if (!str) return '';
  let s = str
    .replace(/\\sqrt\s*\{([^}]+)\}/g, '$\\sqrt{$1}$')
    .replace(/\\frac\s*\{([^}]+)\}\s*\{([^}]+)\}/g, '$\\frac{$1}{$2}$')
    .replace(/([0-9]+)\s*°/g, '$1^\\circ$')
    .replace(/([0-9]+)\s*cm/g, '$1 cm')
    .replace(/([0-9]+)\s*mm/g, '$1 mm')
    .replace(/([0-9]+)\s*m\b/g, '$1 m')
    .replace(/\s+/g, ' ')
    .trim();
  return s;
}

console.log('Building Part 1 (Q1..Q75)...');
