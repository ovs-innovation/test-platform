import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'fs';

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794469735201_9c3369d5.pdf';

async function getImageCoords() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data, useSystemFonts: true }).promise;

  for (const p of [5, 14]) {
    const page = await doc.getPage(p);
    const viewport = page.getViewport({ scale: 2.0 });
    const ops = await page.getOperatorList();
    
    console.log(`\n=== Page ${p} (Viewport: ${viewport.width} x ${viewport.height}) ===`);
    let currentTransform = [1, 0, 0, 1, 0, 0];
    const transformStack = [];

    for (let i = 0; i < ops.fnArray.length; i++) {
      const fn = ops.fnArray[i];
      const args = ops.argsArray[i];

      if (fn === pdfjsLib.OPS.save) {
        transformStack.push([...currentTransform]);
      } else if (fn === pdfjsLib.OPS.restore) {
        if (transformStack.length > 0) {
          currentTransform = transformStack.pop();
        }
      } else if (fn === pdfjsLib.OPS.transform) {
        const [a, b, c, d, e, f] = args;
        const [a0, b0, c0, d0, e0, f0] = currentTransform;
        currentTransform = [
          a0 * a + c0 * b,
          b0 * a + d0 * b,
          a0 * c + c0 * d,
          b0 * c + d0 * d,
          a0 * e + c0 * f + e0,
          b0 * e + d0 * f + f0
        ];
      } else if (
        fn === pdfjsLib.OPS.paintImageXObject ||
        fn === pdfjsLib.OPS.paintInlineImageXObject
      ) {
        const [scaleX, skewY, skewX, scaleY, transX, transY] = currentTransform;
        const imgWidth = Math.abs(scaleX) * 2.0;
        const imgHeight = Math.abs(scaleY) * 2.0;
        const imgLeft = transX * 2.0;
        const imgTop = viewport.height - (transY + Math.abs(scaleY)) * 2.0;

        console.log(`Image args: ${args[0]} at x=${imgLeft.toFixed(1)}, y=${imgTop.toFixed(1)}, width=${imgWidth.toFixed(1)}, height=${imgHeight.toFixed(1)}`);
      }
    }
  }
}

getImageCoords().catch(console.error);

