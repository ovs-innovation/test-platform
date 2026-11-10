import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'fs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794310275209_120f888f.pdf';
const targetPages = [2, 3, 4, 5, 7, 9, 11, 14, 16];

async function findCoords() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  for (const pNum of targetPages) {
    const page = await doc.getPage(pNum);
    const viewport = page.getViewport({ scale: 2.0 });
    const ops = await page.getOperatorList();
    
    console.log(`\n=== Page ${pNum} (Viewport: ${viewport.width} x ${viewport.height}) ===`);
    let transformStack = [];
    let currentMatrix = [1, 0, 0, 1, 0, 0];

    for (let i = 0; i < ops.fnArray.length; i++) {
      const fn = ops.fnArray[i];
      const args = ops.argsArray[i];

      if (fn === pdfjsLib.OPS.save) {
        transformStack.push([...currentMatrix]);
      } else if (fn === pdfjsLib.OPS.restore) {
        if (transformStack.length > 0) {
          currentMatrix = transformStack.pop();
        }
      } else if (fn === pdfjsLib.OPS.transform) {
        // Multiply matrices
        const [a1, b1, c1, d1, e1, f1] = currentMatrix;
        const [a2, b2, c2, d2, e2, f2] = args;
        currentMatrix = [
          a1 * a2 + c1 * b2,
          b1 * a2 + d1 * b2,
          a1 * c2 + c1 * d2,
          b1 * c2 + d1 * d2,
          a1 * e2 + c1 * f2 + e1,
          b1 * e2 + d1 * f2 + f1
        ];
      } else if (fn === pdfjsLib.OPS.paintImageXObject) {
        const imgName = args[0];
        // Calculate bbox in PDF points, then convert to scale 2.0 canvas pixels
        // In PDF coordinates: [0, 0, 1, 1] transformed by currentMatrix
        // Canvas y = viewport.height - pdf_y * 2.0 (since PDF origin is bottom-left)
        const [a, b, c, d, e, f] = currentMatrix;
        // The image rect in PDF is from (e, f) to (e + a, f + d)
        // With scale 2.0:
        const x = e * 2.0;
        const width = a * 2.0;
        // PDF y goes up, canvas y goes down:
        const pdfYTop = f + d;
        const pdfYBottom = f;
        const canvasY = (viewport.height / 2.0 - pdfYTop) * 2.0;
        const height = d * 2.0;

        console.log(`Image ${imgName}: x=${x.toFixed(1)}, y=${canvasY.toFixed(1)}, w=${width.toFixed(1)}, h=${height.toFixed(1)}`);
      }
    }
  }
}

findCoords().catch(console.error);

