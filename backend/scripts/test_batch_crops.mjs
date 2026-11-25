import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUT_DIR = path.resolve(__dirname, 'emi_clean_diagrams');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

function trimAndSave(canvas, sx, sy, sw, sh, outPath) {
  const ctx = canvas.getContext('2d');
  const imgData = ctx.getImageData(sx, sy, sw, sh);
  const data = imgData.data;

  let minX = sw, minY = sh, maxX = 0, maxY = 0;
  for (let y = 0; y < sh; y++) {
    for (let x = 0; x < sw; x++) {
      const idx = (y * sw + x) * 4;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];
      // non-white and not watermark
      if (r < 220 || g < 220 || b < 220) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (minX >= maxX || minY >= maxY) {
    console.log(`No graphic found for ${path.basename(outPath)}`);
    return false;
  }

  const trimW = maxX - minX + 1;
  const trimH = maxY - minY + 1;
  if (trimW < 30 || trimH < 30) return false;

  const pad = 12;
  const cropX = Math.max(0, sx + minX - pad);
  const cropY = Math.max(0, sy + minY - pad);
  const finalW = Math.min(canvas.width - cropX, trimW + pad * 2);
  const finalH = Math.min(canvas.height - cropY, trimH + pad * 2);

  const outCanvas = createCanvas(finalW, finalH);
  const outCtx = outCanvas.getContext('2d');
  outCtx.fillStyle = '#ffffff';
  outCtx.fillRect(0, 0, finalW, finalH);
  outCtx.drawImage(canvas, cropX, cropY, finalW, finalH, 0, 0, finalW, finalH);

  fs.writeFileSync(outPath, outCanvas.toBuffer('image/png'));
  console.log(`Saved ${path.basename(outPath)} (${finalW}x${finalH})`);
  return true;
}

// Visual inspection ranges for first batch
const SPECS = [
  { q: 1, p: 1, sx: 400, sy: 220, sw: 500, sh: 300 }, // square loop entering magnetic field
  { q: 2, p: 1, sx: 600, sy: 750, sw: 500, sh: 320 }, // inductors A and D circuit
  { q: 8, p: 4, sx: 350, sy: 250, sw: 550, sh: 320 }, // U tubes sliding inside each other
  { q: 12, p: 5, sx: 600, sy: 420, sw: 500, sh: 250 }, // inductor resistor battery circuit
  { q: 15, p: 7, sx: 550, sy: 320, sw: 550, sh: 320 }, // LR circuit with switch
  { q: 16, p: 8, sx: 500, sy: 280, sw: 600, sh: 320 }, // sliding connector PQ
  { q: 17, p: 9, sx: 550, sy: 260, sw: 550, sh: 300 }, // key K circuit
  { q: 20, p: 10, sx: 550, sy: 280, sw: 550, sh: 320 }, // coil i vs t graph
  { q: 21, p: 11, sx: 500, sy: 280, sw: 600, sh: 320 }, // rail connector circuit
  { q: 27, p: 16, sx: 550, sy: 380, sw: 550, sh: 320 }, // point C connected to A and B
  { q: 29, p: 18, sx: 50, sy: 100, sw: 600, sh: 450 }, // circular field area with crosses
  { q: 30, p: 20, sx: 550, sy: 280, sw: 550, sh: 320 }, // square frame moving away from wire
  { q: 31, p: 22, sx: 550, sy: 280, sw: 550, sh: 350 }  // LR two keys circuit
];

async function main() {
  for (const s of SPECS) {
    const pPad = String(s.p).padStart(3, '0');
    const pPath = path.resolve(__dirname, `emi_jee_pages/page_${pPad}.png`);
    if (!fs.existsSync(pPath)) {
      console.log(`Page ${s.p} missing!`);
      continue;
    }
    const img = await loadImage(pPath);
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const outPath = path.join(OUT_DIR, `emi_q${s.q}_diagram.png`);
    trimAndSave(canvas, s.sx, s.sy, s.sw, s.sh, outPath);
  }
}

main().catch(console.error);
