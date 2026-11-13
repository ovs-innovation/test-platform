import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794494446199_528ce5b4.pdf';

async function findImageCoords() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  const page = await doc.getPage(24);
  const ops = await page.getOperatorList();
  
  // Trace transformation matrices
  let currentTransform = [1, 0, 0, 1, 0, 0];
  const transformStack = [];

  for (let i = 0; i < ops.fnArray.length; i++) {
    const fn = ops.fnArray[i];
    const args = ops.argsArray[i];

    if (fn === pdfjsLib.OPS.save) {
      transformStack.push([...currentTransform]);
    } else if (fn === pdfjsLib.OPS.restore) {
      currentTransform = transformStack.pop() || [1, 0, 0, 1, 0, 0];
    } else if (fn === pdfjsLib.OPS.transform) {
      // args is [a, b, c, d, e, f]
      // simplified matrix multiplication
      currentTransform = args; // or track affine
    } else if (fn === pdfjsLib.OPS.paintImageXObject) {
      console.log('paintImageXObject arg:', args, 'last transform:', currentTransform);
    }
  }
}

findImageCoords().catch(console.error);

