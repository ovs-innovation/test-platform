import fs from 'fs';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794403811238_c2ef5fdf.pdf';

async function checkImagePositions() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjs.getDocument({ data }).promise;

  for (const pageNum of [15, 28]) {
    const page = await doc.getPage(pageNum);
    const ops = await page.getOperatorList();
    let currentTransform = null;

    console.log(`--- Page ${pageNum} Image Transforms ---`);
    for (let i = 0; i < ops.fnArray.length; i++) {
      const fn = ops.fnArray[i];
      if (fn === pdfjs.OPS.transform) {
        currentTransform = ops.argsArray[i];
      }
      if (fn === pdfjs.OPS.paintImageXObject) {
        const name = ops.argsArray[i][0];
        if (name !== 'g_d0_img_p2_2') {
          console.log(`Image: ${name}`, 'Transform:', currentTransform);
          if (currentTransform) {
            const [scaleX, skewY, skewX, scaleY, tx, ty] = currentTransform;
            const canvasY = (page.view[3] - ty) * 2.0;
            const canvasX = tx * 2.0;
            const canvasW = scaleX * 2.0;
            const canvasH = Math.abs(scaleY) * 2.0;
            console.log(`  -> Canvas coords at 2.0x: x=${canvasX.toFixed(1)}, y=${canvasY.toFixed(1)}, w=${canvasW.toFixed(1)}, h=${canvasH.toFixed(1)}`);
          }
        }
      }
    }
  }
}

checkImagePositions().catch(err => {
  console.error(err);
  process.exit(1);
});

