import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795242206418_33075747.pdf';

async function inspectPdf() {
  const dataBuffer = fs.readFileSync(PDF_PATH);
  console.log(`PDF file size: ${(dataBuffer.length / (1024 * 1024)).toFixed(2)} MB`);

  const data = await pdfParse(dataBuffer, { max: 149 });
  console.log(`Total pages: ${data.numpages}`);
  console.log(`Total text length: ${data.text.length}`);

  // Let's search for Answer Key in the text
  const answerKeyIdx = data.text.indexOf('Answer Key');
  if (answerKeyIdx !== -1) {
    console.log('Answer Key found at index:', answerKeyIdx);
    console.log('Sample text around Answer Key:\n', data.text.slice(answerKeyIdx, answerKeyIdx + 1500));
  } else {
    console.log('Answer Key string not found in global text.');
  }
}

inspectPdf().catch(console.error);
