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

  for (const pageNum of [17, 19]) {
    const page = await doc.getPage(pageNum);
    const ops = await page.getOperatorList();
    const viewport = page.getViewport({ scale: 2.0 });
    console.log(`\n=== Page ${pageNum} (viewport: ${viewport.width}x${viewport.height}) ===`);

    let lastTransform = null;
    for (let i = 0; i < ops.fnArray.length; i++) {
      const fn = ops.fnArray[i];
      const args = ops.argsArray[i];

      if (fn === pdfjsLib.OPS.transform) {
        lastTransform = args;
      } else if (fn === pdfjsLib.OPS.paintImageXObject) {
        console.log(`Image object '${args[0]}' with transform:`, lastTransform);
        if (lastTransform) {
          // transform is [scaleX, skewY, skewX, scaleY, transX, transY]
          const scale = 2.0;
          const [sx, , , sy, tx, ty] = lastTransform;
          // In PDF coords (0,0 is bottom left):
          // x: tx to tx + sx
          // y: ty to ty + sy
          // In canvas coords (0,0 is top left, height = viewport.height):
          // canvasX = tx * scale
          // canvasY = (page.view[3] - (ty + sy)) * scale
          // canvasW = sx * scale
          // canvasH = sy * scale
          const pageH = page.view[3];
          const cX = tx * scale;
          const cY = (pageH - (ty + sy)) * scale;
          const cW = sx * scale;
          const cH = sy * scale;
          console.log(`-> Canvas bbox (scale 2): x=${cX.toFixed(1)}, y=${cY.toFixed(1)}, w=${cW.toFixed(1)}, h=${cH.toFixed(1)}`);
        }
      }
    }
  }
}

main().catch(console.error);

