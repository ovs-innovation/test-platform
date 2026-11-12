import fs from 'fs';
import path from 'path';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794466963044_625ccd96.pdf';
const outDir = './backend/scripts/cell_diagrams';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function renderPage(doc, pageNum) {
  const page = await doc.getPage(pageNum);
  const scale = 2.0;
  const viewport = page.getViewport({ scale });
  const canvas = createCanvas(viewport.width, viewport.height);
  const ctx = canvas.getContext('2d');
  await page.render({ canvasContext: ctx, viewport }).promise;
  return canvas;
}

function crop(pageCanvas, sx, sy, sw, sh, filename) {
  const cropCanvas = createCanvas(sw, sh);
  const ctx = cropCanvas.getContext('2d');
  ctx.drawImage(pageCanvas, sx, sy, sw, sh, 0, 0, sw, sh);
  fs.writeFileSync(path.join(outDir, filename), cropCanvas.toBuffer('image/png'));
  console.log(`Cropped ${filename} (${sw}x${sh})`);
}

async function main() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data, standardFontDataUrl: './node_modules/pdfjs-dist/standard_fonts/' }).promise;

  // Page 22: Q86
  const p22 = await renderPage(doc, 22);
  crop(p22, 60, 480, 600, 390, 'q86_diag.png');

  // Page 23: Q88
  const p23 = await renderPage(doc, 23);
  crop(p23, 60, 220, 600, 390, 'q88_diag.png');

  // Page 25: Q96
  const p25 = await renderPage(doc, 25);
  crop(p25, 60, 255, 700, 370, 'q96_diag.png');

  // Page 26: Q100
  const p26 = await renderPage(doc, 26);
  crop(p26, 60, 220, 380, 560, 'q100_diag.png');

  console.log('Done cropping cell diagrams.');
}

main().catch(console.error);
