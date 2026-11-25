import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ocrCache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'fluids_ocr_cache.json'), 'utf8'));

console.log('=== PAGE 2 OCR ===');
console.log(ocrCache['2']?.text || ocrCache[2]?.text);

console.log('=== PAGE 3 OCR ===');
console.log(ocrCache['3']?.text || ocrCache[3]?.text);

console.log('=== PAGE 40 OCR ===');
console.log(ocrCache['40']?.text || ocrCache[40]?.text);
