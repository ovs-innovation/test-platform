import fs from 'fs';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794403811238_c2ef5fdf.pdf';

async function scanImages() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjs.getDocument({ data }).promise;

  for (let pageNum = 2; pageNum <= 34; pageNum++) {
    const page = await doc.getPage(pageNum);
    const ops = await page.getOperatorList();
    const imageOps = [];

    for (let i = 0; i < ops.fnArray.length; i++) {
      const fn = ops.fnArray[i];
      // paintImageXObject is 85 in pdfjs
      if (fn === pdfjs.OPS.paintImageXObject || fn === pdfjs.OPS.paintInlineImageXObject) {
        imageOps.push({
          index: i,
          name: ops.argsArray[i][0]
        });
      }
    }

    if (imageOps.length > 0) {
      console.log(`Page ${pageNum} has ${imageOps.length} images:`, imageOps.map(o => o.name));
    }
  }
}

scanImages().catch(err => {
  console.error(err);
  process.exit(1);
});

