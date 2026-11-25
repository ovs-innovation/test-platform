import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('backend/scripts/gravitation_ocr_cache.json', 'utf8'));
console.log('=== PAGE 70 ===');
console.log(ocr['070']);
console.log('=== PAGE 71 ===');
console.log(ocr['071']);
console.log('=== PAGE 72 ===');
console.log(ocr['072']);
