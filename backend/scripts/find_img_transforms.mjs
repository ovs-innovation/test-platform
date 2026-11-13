import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794403194026_17d7b922.pdf';

async function findTransforms() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  for (const pNum of [14, 20]) {
    const page = await doc.getPage(pNum);
    const viewport = page.getViewport({ scale: 2.0 });
    const ops = await page.getOperatorList();
    console.log(`\n=== Page ${pNum} ===`);

    for (let i = 0; i < ops.fnArray.length; i++) {
      if (ops.fnArray[i] === pdfjsLib.OPS.paintImageXObject) {
        const name = ops.argsArray[i][0];
        // find preceding transform
        for (let j = i - 1; j >= Math.max(0, i - 10); j--) {
          if (ops.fnArray[j] === pdfjsLib.OPS.transform) {
            const m = ops.argsArray[j];
            // Viewport transformed coordinates
            const p1 = viewport.convertToViewportPoint(m[4], m[5]);
            const p2 = viewport.convertToViewportPoint(m[4] + m[0], m[5] + m[3]);
            console.log(`Image ${name} (op ${i}): transform matrix =`, m);
            console.log(`  Viewport: x1=${Math.min(p1[0], p2[0])}, y1=${Math.min(p1[1], p2[1])}, w=${Math.abs(p2[0]-p1[0])}, h=${Math.abs(p2[1]-p1[1])}`);
            break;
          }
        }
      }
    }
  }
}

findTransforms().catch(console.error);

