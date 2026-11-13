import fs from 'fs';

const urls = JSON.parse(fs.readFileSync('c:/Users/rs004/OneDrive/Desktop/test-platform/backend/scripts/semi_diagram_urls.json', 'utf8'));
console.log('Keys in urls:', Object.keys(urls).slice(0, 30));

const ocr = JSON.parse(fs.readFileSync('c:/Users/rs004/OneDrive/Desktop/test-platform/backend/scripts/semi_ocr.json', 'utf8'));
console.log('Keys in ocr:', Object.keys(ocr).slice(0, 30));
console.log('Sample ocr q_46:', JSON.stringify(ocr['q_46'] || ocr['46']));

