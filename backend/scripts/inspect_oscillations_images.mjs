import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'fs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794312292089_4a659763.pdf';

async function check() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  for (let i = 1; i <= 28; i++) {
    const page = await doc.getPage(i);
    const ops = await page.getOperatorList();
    let imageCount = 0;
    for (let j = 0; j < ops.fnArray.length; j++) {
      if (ops.fnArray[j] === pdfjsLib.OPS.paintImageXObject || ops.fnArray[j] === pdfjsLib.OPS.paintInlineImageXObject) {
        imageCount++;
      }
    }
    console.log(`Page ${i}: ${imageCount} images, ${ops.fnArray.length} operations`);
  }
}

check().catch(console.error);

