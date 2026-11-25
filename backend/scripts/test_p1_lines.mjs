import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));

// Test parsing Page 1
const text = cache['1'];
const lines = text.split('\n');

// Find where question starts on page 1
// Lines:
for (let i = 0; i < lines.length; i++) {
  console.log(`${i}: ${lines[i]}`);
}
