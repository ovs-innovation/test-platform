import fs from 'fs';

const ocrRaw = fs.readFileSync('backend/scripts/binomial_theorem_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(ocrRaw);

const p169 = pages.find(p => p.page === 169);
fs.writeFileSync('backend/scripts/page169_text_raw.txt', p169.text, 'utf8');
console.log('Saved page169_text_raw.txt, length:', p169.text.length);

