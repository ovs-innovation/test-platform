import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794314927151_0fe43097.pdf';

async function findImages() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const ops = await page.getOperatorList();
    const imgOps = [];
    for (let i = 0; i < ops.fnArray.length; i++) {
      const fn = ops.fnArray[i];
      if (
        fn === pdfjsLib.OPS.paintImageXObject ||
        fn === pdfjsLib.OPS.paintInlineImageXObject ||
        fn === pdfjsLib.OPS.paintImageXObjectRepeat
      ) {
        imgOps.push({ idx: i, fn, arg: ops.argsArray[i][0] });
      }
    }
    if (imgOps.length > 0) {
      console.log(`Page ${p} has ${imgOps.length} images:`, imgOps.map(o => o.arg));
    }
  }
}

findImages().catch(console.error);
