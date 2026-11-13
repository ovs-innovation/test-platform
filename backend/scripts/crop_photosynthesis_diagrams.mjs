import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794469735201_9c3369d5.pdf';
const OUT_DIR = './backend/scripts/photosynthesis_diagrams';

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function renderAndCrop() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data, useSystemFonts: true }).promise;

  // 1. Page 5: Q13
  const p5 = await doc.getPage(5);
  const vp5 = p5.getViewport({ scale: 2.0 });
  const c5 = createCanvas(vp5.width, vp5.height);
  await p5.render({ canvasContext: c5.getContext('2d'), viewport: vp5 }).promise;
  const p5Buf = c5.toBuffer('image/png');
  fs.writeFileSync(path.join(OUT_DIR, 'page_5.png'), p5Buf);
  await sharp(p5Buf)
    .extract({ left: 65, top: 255, width: 360, height: 360 })
    .toFile(path.join(OUT_DIR, 'q_13.png'));
  console.log('Cropped Q13 diagram to ./backend/scripts/photosynthesis_diagrams/q_13.png');

  // 2. Page 14: Q56
  const p14 = await doc.getPage(14);
  const vp14 = p14.getViewport({ scale: 2.0 });
  const c14 = createCanvas(vp14.width, vp14.height);
  await p14.render({ canvasContext: c14.getContext('2d'), viewport: vp14 }).promise;
  const p14Buf = c14.toBuffer('image/png');
  fs.writeFileSync(path.join(OUT_DIR, 'page_14.png'), p14Buf);
  await sharp(p14Buf)
    .extract({ left: 65, top: 225, width: 340, height: 360 })
    .toFile(path.join(OUT_DIR, 'q_56.png'));
  console.log('Cropped Q56 diagram to ./backend/scripts/photosynthesis_diagrams/q_56.png');
}

renderAndCrop().catch(console.error);

