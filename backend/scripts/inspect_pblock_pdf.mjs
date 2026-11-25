import fs from 'fs';
import path from 'path';
import pdf from 'pdf-parse/lib/pdf-parse.js';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795150533468_d3012856.pdf';

async function inspectPdf() {
  const dataBuffer = fs.readFileSync(pdfPath);
  const data = await pdf(dataBuffer);
  console.log(`Total Pages: ${data.numpages}`);
  console.log('Sample text (first 500 chars):');
  console.log(data.text.slice(0, 500));
}

inspectPdf().catch(console.error);
