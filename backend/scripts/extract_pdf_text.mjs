import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793705195438_416f5048.pdf';
const dataBuffer = fs.readFileSync(pdfPath);

pdf(dataBuffer).then(function(data) {
  console.log('Total pages:', data.numpages);
  console.log('Text preview (first 1000 chars):');
  console.log(data.text.slice(0, 1000));
  fs.writeFileSync('backend/scripts/pdf_text_dump.txt', data.text);
  console.log('Wrote pdf_text_dump.txt, size:', data.text.length);
}).catch(err => {
  console.error('Error:', err);
});

