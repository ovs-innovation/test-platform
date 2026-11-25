import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'atom_jee_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'atom_jee_official_keys.json'), 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'atom_jee_diagram_urls.json'), 'utf8'));

// Build linear text with page delimiters
let fullText = '';
for (let p = 1; p <= 151; p++) {
  fullText += `\n<<<PAGE_${p}>>>\n` + (cache[String(p)] || '');
}

fs.writeFileSync(path.resolve(__dirname, 'atom_full_linear_pages.txt'), fullText);
console.log('Saved atom_full_linear_pages.txt, length:', fullText.length);
