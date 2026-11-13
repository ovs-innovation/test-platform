import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'fs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794472024943_fa5f34f8.pdf';
const targetPages = [4, 11, 13, 22, 26, 28, 29, 31];

async function main() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  for (const pageNum of targetPages) {
    const page = await doc.getPage(pageNum);
    const ops = await page.getOperatorList();
    const viewport = page.getViewport({ scale: 2.0 });

    console.log(`\n=== PAGE ${pageNum} ===`);
    let currentTransform = null;

    for (let i = 0; i < ops.fnArray.length; i++) {
      const fn = ops.fnArray[i];
      const args = ops.argsArray[i];

      if (fn === pdfjsLib.OPS.transform) {
        currentTransform = args;
      } else if (
        fn === pdfjsLib.OPS.paintImageXObject ||
        fn === pdfjsLib.OPS.paintInlineImageXObject
      ) {
        const name = args[0];
        // Skip QR code (which is always at the top right: x > 450, y > 600 in PDF coords)
        const pdfX = currentTransform ? currentTransform[4] : 0;
        const pdfY = currentTransform ? currentTransform[5] : 0;
        const pdfW = currentTransform ? currentTransform[0] : 0;
        const pdfH = currentTransform ? currentTransform[3] : 0;

        // Convert to canvas pixel coords (scale = 2.0, y flipped from top)
        // In PDF coords, (0,0) is bottom-left. Canvas (0,0) is top-left.
        const canvasX = Math.round(pdfX * 2.0);
        const canvasY = Math.round((page.view[3] - (pdfY + pdfH)) * 2.0);
        const canvasW = Math.round(pdfW * 2.0);
        const canvasH = Math.round(pdfH * 2.0);

        console.log(`Image ${name}: PDF(x=${pdfX}, y=${pdfY}, w=${pdfW}, h=${pdfH}) -> Canvas(x=${canvasX}, y=${canvasY}, w=${canvasW}, h=${canvasH})`);
      }
    }
  }
}

main().catch(console.error);

