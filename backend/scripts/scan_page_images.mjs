import fs from 'fs';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794417992433_bbb7f18e.pdf';

async function scanOps() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjs.getDocument({ data }).promise;

  for (let p = 2; p <= 18; p++) {
    const page = await doc.getPage(p);
    const opList = await page.getOperatorList();
    // Count image or path drawing ops
    let imgCount = 0;
    for (let i = 0; i < opList.fnArray.length; i++) {
      const fn = opList.fnArray[i];
      // OPS.paintImageXObject is 85, paintInlineImageXObject is 86
      if (fn === pdfjs.OPS.paintImageXObject || fn === pdfjs.OPS.paintInlineImageXObject) {
        imgCount++;
      }
    }
    console.log(`Page ${p}: ${imgCount} images, ${opList.fnArray.length} total ops`);
  }
}

scanOps().catch(console.error);

