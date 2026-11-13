import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794468143327_57e3c8ba.pdf';
const OUT_DIR = './backend/scripts/respiration_diagrams';

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function renderAndCrop() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data, useSystemFonts: true }).promise;
  const page = await doc.getPage(8);
  const viewport = page.getViewport({ scale: 2.0 });
  const canvas = createCanvas(viewport.width, viewport.height);
  const ctx = canvas.getContext('2d');

  await page.render({ canvasContext: ctx, viewport }).promise;
  const pageBuf = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(OUT_DIR, 'page_8.png'), pageBuf);

  // Crop Q31 diagram: x=65, y=875, width=600, height=175
  const outPath = path.join(OUT_DIR, 'q_31.png');
  await sharp(pageBuf)
    .extract({ left: 65, top: 875, width: 600, height: 175 })
    .toFile(outPath);
  console.log(`Successfully cropped Q31 diagram to ${outPath}`);
}

renderAndCrop().catch(console.error);

