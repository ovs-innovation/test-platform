import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794494446199_528ce5b4.pdf';

async function scanImages() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const ops = await page.getOperatorList();
    let imgCount = 0;
    for (let j = 0; j < ops.fnArray.length; j++) {
      if (ops.fnArray[j] === pdfjsLib.OPS.paintImageXObject || ops.fnArray[j] === pdfjsLib.OPS.paintInlineImageXObject) {
        imgCount++;
      }
    }
    if (imgCount > 0) {
      console.log(`Page ${i} has ${imgCount} images.`);
    }
  }
}

scanImages().catch(console.error);
