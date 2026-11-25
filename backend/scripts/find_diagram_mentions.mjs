import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'wave_optics_ocr_cache.json'), 'utf8'));

const diagramPhrases = [
  /shown in (the )?figure/i,
  /given figure/i,
  /in the figure/i,
  /refer to the figure/i,
  /figure shows/i,
  /in the diagram/i,
  /shown below/i,
  /as per the figure/i
];

const matches = [];
for (let p = 1; p <= 128; p++) {
  const text = pages[p] || '';
  for (const phrase of diagramPhrases) {
    if (phrase.test(text)) {
      matches.push({ page: p, textSnippet: text.substring(0, 300) });
      break;
    }
  }
}

console.log(`Found ${matches.length} pages mentioning figure/diagram:`);
matches.forEach(m => console.log(`Page ${m.page}: ${m.textSnippet.replace(/\n+/g, ' ').substring(0, 100)}...`));
