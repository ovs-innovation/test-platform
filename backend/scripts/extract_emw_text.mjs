import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794371885142_6a40b4fa.pdf';
const dataBuffer = fs.readFileSync(pdfPath);

pdf(dataBuffer).then(function(data) {
  console.log('Pages:', data.numpages);
  fs.writeFileSync('backend/scripts/emw_pdf_text.txt', data.text, 'utf8');
  console.log('Saved emw_pdf_text.txt, length:', data.text.length);
}).catch(console.error);

