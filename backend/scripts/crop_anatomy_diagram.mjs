import fs from 'fs';
import path from 'path';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794466116692_ebc1eb9d.pdf';
const outDir = './backend/scripts/anatomy_diagrams';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function main() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data, standardFontDataUrl: './node_modules/pdfjs-dist/standard_fonts/' }).promise;

  const page = await doc.getPage(3);
  const scale = 2.0;
  const viewport = page.getViewport({ scale });
  const canvas = createCanvas(viewport.width, viewport.height);
  const ctx = canvas.getContext('2d');

  await page.render({
    canvasContext: ctx,
    viewport: viewport
  }).promise;

  // Crop Q7 diagram: between y=820 and 1220, x=50 to 1100
  const sx = 50;
  const sy = 830;
  const sw = 1000;
  const sh = 390;

  const cropCanvas = createCanvas(sw, sh);
  const cropCtx = cropCanvas.getContext('2d');
  cropCtx.drawImage(canvas, sx, sy, sw, sh, 0, 0, sw, sh);

  const buffer = cropCanvas.toBuffer('image/png');
  fs.writeFileSync(path.join(outDir, 'q7_diag.png'), buffer);
  console.log(`Saved q7_diag.png (${sw}x${sh})`);
}

main().catch(console.error);
