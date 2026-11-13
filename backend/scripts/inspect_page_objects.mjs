import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'fs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794453004713_55a0550e.pdf';

async function main() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  const p2 = await doc.getPage(2);
  const ops = await p2.getOperatorList();
  console.log('Ops length on page 2:', ops.fnArray.length);

  const images = [];
  for (let i = 0; i < ops.fnArray.length; i++) {
    if (ops.fnArray[i] === pdfjsLib.OPS.paintImageXObject) {
      images.push(ops.argsArray[i][0]);
    }
  }
  console.log('Images on page 2:', images);
}

main().catch(console.error);

