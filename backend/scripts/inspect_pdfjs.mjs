import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793705195438_416f5048.pdf';
const data = new Uint8Array(fs.readFileSync(pdfPath));

const loadingTask = pdfjsLib.getDocument({ data });
const pdfDoc = await loadingTask.promise;
console.log('Pages:', pdfDoc.numPages);

for (let i = 1; i <= Math.min(3, pdfDoc.numPages); i++) {
  const page = await pdfDoc.getPage(i);
  const textContent = await page.getTextContent();
  console.log(`Page ${i} text items:`, textContent.items.length);
  if (textContent.items.length > 0) {
    console.log(textContent.items.map(it => it.str).join(' '));
  }
}

