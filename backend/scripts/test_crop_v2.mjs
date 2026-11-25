import { createCanvas, loadImage } from '@napi-rs/canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUT_DIR = path.resolve(__dirname, 'electro_clean_diagrams_v2');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

function trimAndSave(canvas, outPath) {
  const ctx = canvas.getContext('2d');
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imgData.data;
  let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const idx = (y * canvas.width + x) * 4;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];
      // non-white pixel
      if (r < 235 || g < 235 || b < 235) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (minX >= maxX || minY >= maxY) return false;

  const pad = 12;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(canvas.width - 1, maxX + pad);
  maxY = Math.min(canvas.height - 1, maxY + pad);

  const trimW = maxX - minX + 1;
  const trimH = maxY - minY + 1;
  if (trimW < 30 || trimH < 30) return false;

  const outCanvas = createCanvas(trimW, trimH);
  const outCtx = outCanvas.getContext('2d');
  outCtx.fillStyle = '#ffffff';
  outCtx.fillRect(0, 0, trimW, trimH);
  outCtx.drawImage(canvas, minX, minY, trimW, trimH, 0, 0, trimW, trimH);

  fs.writeFileSync(outPath, outCanvas.toBuffer('image/png'));
  console.log(`Saved ${outPath} (${trimW}x${trimH})`);
  return true;
}

async function run() {
  // Q4: Page 2, between question text and options
  // Text starts at y ~ 50, options at y ~ 240
  const p2 = await loadImage(path.resolve(__dirname, 'electrostatics_pages/page_002.png'));
  const c4 = createCanvas(p2.width, 220);
  c4.getContext('2d').drawImage(p2, 0, 70, p2.width, 220, 0, 0, p2.width, 220);
  trimAndSave(c4, path.resolve(OUT_DIR, 'q4_question_diagram.png'));

  // Q13: Page 4, silk thread ball near sheet P
  // Let's locate y on page 4
  const p4 = await loadImage(path.resolve(__dirname, 'electrostatics_pages/page_004.png'));
  const c13 = createCanvas(p4.width, 280);
  // On page 4, Q13 is in the lower half
  c13.getContext('2d').drawImage(p4, 0, 1050, p4.width, 280, 0, 0, p4.width, 280);
  trimAndSave(c13, path.resolve(OUT_DIR, 'q13_question_diagram.png'));

  // Q16: Page 5, two insulating plates separated by 0.1 m
  // In middle of page 5
  const p5 = await loadImage(path.resolve(__dirname, 'electrostatics_pages/page_005.png'));
  const c16 = createCanvas(p5.width, 260);
  c16.getContext('2d').drawImage(p5, 0, 750, p5.width, 260, 0, 0, p5.width, 260);
  trimAndSave(c16, path.resolve(OUT_DIR, 'q16_question_diagram.png'));

  // Q19: Page 6, charges on square vertices
  const p6 = await loadImage(path.resolve(__dirname, 'electrostatics_pages/page_006.png'));
  const c19 = createCanvas(p6.width, 260);
  c19.getContext('2d').drawImage(p6, 0, 280, p6.width, 260, 0, 0, p6.width, 260);
  trimAndSave(c19, path.resolve(OUT_DIR, 'q19_question_diagram.png'));
}

run();
