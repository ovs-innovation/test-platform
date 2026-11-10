import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'fs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794310275209_120f888f.pdf';

async function check() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  for (let i = 1; i <= 18; i++) {
    const page = await doc.getPage(i);
    const ops = await page.getOperatorList();
    let imageCount = 0;
    for (let j = 0; j < ops.fnArray.length; j++) {
      if (ops.fnArray[j] === pdfjsLib.OPS.paintImageXObject || ops.fnArray[j] === pdfjsLib.OPS.paintInlineImageXObject) {
        imageCount++;
      }
    }
    // ExamGOAL pages typically have 1-2 standard logos / qr codes. If > 2, there is likely a diagram!
    console.log(`Page ${i}: ${imageCount} images, ${ops.fnArray.length} operations`);
  }
}

check().catch(console.error);

