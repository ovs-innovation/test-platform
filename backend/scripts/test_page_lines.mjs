import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));

// Test parsing on pages 1 to 10
for (let p = 1; p <= 10; p++) {
  const text = cache[p] || '';
  console.log(`\n============================= PAGE ${p} =============================`);
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  
  // Look for question starts
  let inQ = false;
  let currentQ = '';
  for (const line of lines) {
    if (/^(?:AcadXL|PREVIOU|Current Electricity|Time|Max)/i.test(line)) continue;
    console.log('  ', line);
  }
}
