import fs from 'fs';
const ocr = JSON.parse(fs.readFileSync('backend/scripts/gravitation_ocr_cache.json', 'utf8'));
console.log('=== PAGE 130 ===');
console.log(ocr['130']);
console.log('=== PAGE 131 ===');
console.log(ocr['131']);
