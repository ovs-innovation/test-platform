import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadImage, createCanvas } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAGES_DIR = path.resolve(__dirname, 'redox_pages');
const OUT_DIR = path.resolve(__dirname, 'redox_diagrams');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function cropAndSave(pagePad, x, y, w, h, filename) {
  const pageImgPath = path.join(PAGES_DIR, `page_${pagePad}.png`);
  const img = await loadImage(pageImgPath);
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, x, y, w, h, 0, 0, w, h);
  const outPath = path.join(OUT_DIR, filename);
  fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
  console.log(`Saved ${filename} (${w}x${h}) from page ${pagePad}`);
}

async function cropAll() {
  console.log('=== CROPPING REDOX DIAGRAMS ===');

  // Page 1: Q1 solution diagram (scale is 2.0, page width is ~1654, height is ~2338)
  // Let's crop Q1 solution box
  // x: 300, y: 550, w: 750, h: 140
  await cropAndSave('001', 310, 560, 720, 130, 'q1_sol_diagram.png');

  // Page 5: Q14 solution flowchart
  // x: 320, y: 360, w: 1040, h: 320
  await cropAndSave('005', 330, 370, 1030, 310, 'q14_sol_diagram.png');

  // Page 6: Q16 solution oxidation/reduction diagram
  // x: 340, y: 440, w: 680, h: 260
  await cropAndSave('006', 340, 440, 680, 260, 'q16_sol_diagram.png');

  // Page 16: Q52 solution electron transfer diagram
  // x: 340, y: 1680, w: 580, h: 240
  await cropAndSave('016', 340, 1670, 580, 240, 'q52_sol_diagram.png');

  console.log('All diagrams cropped.');
}

cropAll().catch(e => console.error(e));
