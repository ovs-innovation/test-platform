import fs from 'fs';
const text = fs.readFileSync('backend/scripts/gravitation_ocr_linear.txt', 'utf8');
console.log(text.slice(82000, 84000));
