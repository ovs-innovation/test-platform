import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'fs';

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794467569071_9fda0808.pdf';

async function scanImages() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data, useSystemFonts: true }).promise;

  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const ops = await page.getOperatorList();
    let imgCount = 0;
    for (let i = 0; i < ops.fnArray.length; i++) {
      if (
        ops.fnArray[i] === pdfjsLib.OPS.paintImageXObject ||
        ops.fnArray[i] === pdfjsLib.OPS.paintInlineImageXObject ||
        ops.fnArray[i] === pdfjsLib.OPS.paintImageMaskXObject
      ) {
        imgCount++;
      }
    }
    if (imgCount > 1) { // Every page might have the ExamGOAL logo or icons, so let's see pages with extra images
      console.log(`Page ${p} has ${imgCount} image operators.`);
    }
  }
}

scanImages().catch(console.error);

