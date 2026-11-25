import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'mag_jee_ocr_cache.json'), 'utf8'));

console.log('=== PAGE 3 ===\n', pages['3']);
console.log('=== PAGE 4 ===\n', pages['4']);
console.log('=== PAGE 5 ===\n', pages['5']);
