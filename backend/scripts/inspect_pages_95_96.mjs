import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('backend/scripts/emi_jee_ocr_cache.json', 'utf8'));

console.log('--- Page 95 ---');
console.log(pages['95']);
console.log('--- Page 96 ---');
console.log(pages['96']);
