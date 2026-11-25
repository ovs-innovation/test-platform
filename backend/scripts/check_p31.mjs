import fs from 'fs';
const ocr = JSON.parse(fs.readFileSync('backend/scripts/gravitation_ocr_cache.json', 'utf8'));
console.log('=== PAGE 31 ===');
console.log(ocr['031']);
console.log('=== PAGE 32 ===');
console.log(ocr['032']);
