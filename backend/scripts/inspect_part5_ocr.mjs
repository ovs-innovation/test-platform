import fs from 'fs';

const ocrCache = JSON.parse(fs.readFileSync('backend/scripts/periodicity_ocr_cache.json', 'utf8'));
const keys = JSON.parse(fs.readFileSync('backend/scripts/periodicity_official_keys.json', 'utf8'));

console.log('Keys 161 to 193:');
for (let i = 161; i <= 193; i++) {
  console.log(`Q${i}: ${keys[i]}`);
}

// Dump OCR text for pages 44 to 58
let out = '';
for (let p = 44; p <= 58; p++) {
  out += `\n\n=== PAGE ${p} ===\n\n` + (ocrCache[p] || '');
}
fs.writeFileSync('backend/scripts/periodicity_part5_raw_ocr.txt', out, 'utf8');
console.log('Written periodicity_part5_raw_ocr.txt, length:', out.length);
