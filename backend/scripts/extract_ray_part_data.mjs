import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const linearText = fs.readFileSync(path.resolve(__dirname, 'ray_jee_ocr_linear.txt'), 'utf8');
const keys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_jee_official_keys.json'), 'utf8'));
const diagUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_clean_diagram_urls.json'), 'utf8'));

// Assemble linear lines without page headers
const lines = linearText.split('\n').map(l => l.trim()).filter(l => l.length > 0 && !l.startsWith('=== PAGE'));

// Find question starts
// In AcadXL text, each question begins either with a number like "1.", "2.", "15.", etc.
// or immediately follows the previous question's solution/answer
console.log(`Processing ${lines.length} lines for 298 questions...`);

// Let's create an extractor that locates each question's text and options
function cleanKaTeX(text) {
  if (!text) return '';
  return text
    .replace(/\\sqrt\s*\{([^}]+)\}/g, '$\\sqrt{$1}$')
    .replace(/\\frac\s*\{([^}]+)\}\s*\{([^}]+)\}/g, '$\\frac{$1}{$2}$')
    .replace(/([0-9]+)\s*°/g, '$1^\\circ$')
    .replace(/(\b[A-Za-z]\b)\s*=\s*([0-9\.\-]+)/g, '$$1 = $2$')
    .replace(/\s+/g, ' ')
    .trim();
}

console.log('Extractor initialized.');
