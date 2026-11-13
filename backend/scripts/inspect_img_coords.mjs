import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794403194026_17d7b922.pdf';

async function inspectImages() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  for (const pNum of [14, 20]) {
    const page = await doc.getPage(pNum);
    const viewport = page.getViewport({ scale: 2.0 });
    const ops = await page.getOperatorList();
    console.log(`\n--- Page ${pNum} images ---`);
    for (let i = 0; i < ops.fnArray.length; i++) {
      if (ops.fnArray[i] === pdfjsLib.OPS.paintImageXObject) {
        const imgName = ops.argsArray[i][0];
        console.log(`Image ${imgName} at op index ${i}`);
      }
    }
  }
}

inspectImages().catch(console.error);

