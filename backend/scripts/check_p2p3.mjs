import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as pdfjsLib from '../node_modules/pdfjs-dist/legacy/build/pdf.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795242206418_33075747.pdf';

async function checkP2P3() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  for (let p of [2, 3]) {
    const page = await doc.getPage(p);
    const ops = await page.getOperatorList();
    let imgCount = 0;
    for (let j = 0; j < ops.fnArray.length; j++) {
      if (ops.fnArray[j] === pdfjsLib.OPS.paintImageXObject || ops.fnArray[j] === pdfjsLib.OPS.paintInlineImageXObject) {
        imgCount++;
      }
    }
    console.log(`Page ${p} images: ${imgCount}`);
  }
}
checkP2P3().catch(console.error);
