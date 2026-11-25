import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'mag_jee_ocr_cache.json'), 'utf8'));

console.log('=== PAGE 9 ===\n', pages['9']);
console.log('=== PAGE 10 ===\n', pages['10']);
console.log('=== PAGE 11 ===\n', pages['11']);
