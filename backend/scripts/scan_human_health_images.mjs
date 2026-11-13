import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pdfjsLib = await import('./../node_modules/pdfjs-dist/legacy/build/pdf.mjs');
const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794553863550_03b700d2.pdf';

async function main() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log(`Checking images across ${doc.numPages} pages...`);

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const ops = await page.getOperatorList();
    
    // Look for paintImageXObject or paintInlineImageXObject
    let imgCount = 0;
    for (let j = 0; j < ops.fnArray.length; j++) {
      const fn = ops.fnArray[j];
      if (fn === pdfjsLib.OPS.paintImageXObject || fn === pdfjsLib.OPS.paintInlineImageXObject) {
        imgCount++;
      }
    }
    if (imgCount > 0) {
      console.log(`Page ${i}: ${imgCount} images found`);
    }
  }
}

main().catch(console.error);
