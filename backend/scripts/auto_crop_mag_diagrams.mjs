import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUT_DIR = path.resolve(__dirname, 'mag_clean_diagrams');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const pagesDir = path.resolve(__dirname, 'mag_jee_pages');
const ocrPages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'mag_jee_ocr_cache.json'), 'utf8'));

// List of questions and pages known to have diagrams
// Let's map each page to its question number and approximate y region
export const MAG_DIAGRAM_DEFS = [
  { q: 23, p: 9, sy: 200, sh: 650 },
  { q: 24, p: 10, sy: 200, sh: 650 },
  { q: 27, p: 12, sy: 90, sh: 380 },
  { q: 29, p: 13, sy: 160, sh: 480 },
  { q: 32, p: 15, sy: 160, sh: 450 },
  { q: 40, p: 19, sy: 90, sh: 320 },
  { q: 42, p: 20, sy: 120, sh: 350 },
  { q: 44, p: 21, sy: 350, sh: 400 },
  { q: 45, p: 23, sy: 100, sh: 450 },
  { q: 49, p: 26, sy: 120, sh: 450 },
  { q: 51, p: 28, sy: 120, sh: 450 },
  { q: 52, p: 31, sy: 100, sh: 450 },
  { q: 56, p: 36, sy: 250, sh: 500 },
  { q: 63, p: 41, sy: 150, sh: 450 },
  { q: 64, p: 42, sy: 150, sh: 450 },
  { q: 67, p: 44, sy: 120, sh: 450 },
  { q: 75, p: 51, sy: 180, sh: 450 },
  { q: 78, p: 54, sy: 100, sh: 450 },
  { q: 79, p: 55, sy: 180, sh: 450 },
  { q: 81, p: 57, sy: 150, sh: 450 },
  { q: 84, p: 59, sy: 120, sh: 450 },
  { q: 88, p: 62, sy: 120, sh: 450 },
  { q: 89, p: 63, sy: 180, sh: 450 },
  { q: 92, p: 66, sy: 120, sh: 450 },
  { q: 94, p: 68, sy: 150, sh: 450 },
  { q: 100, p: 75, sy: 120, sh: 450 },
  { q: 105, p: 79, sy: 120, sh: 450 },
  { q: 117, p: 87, sy: 100, sh: 450 },
  { q: 119, p: 88, sy: 100, sh: 450 },
  { q: 123, p: 91, sy: 100, sh: 450 },
  { q: 133, p: 98, sy: 100, sh: 450 },
  { q: 143, p: 104, sy: 120, sh: 450 },
  { q: 156, p: 112, sy: 100, sh: 450 },
  { q: 158, p: 113, sy: 100, sh: 450 },
  { q: 161, p: 115, sy: 100, sh: 450 },
  { q: 173, p: 125, sy: 100, sh: 450 },
  { q: 174, p: 126, sy: 100, sh: 450 },
  { q: 178, p: 130, sy: 100, sh: 450 },
  { q: 182, p: 133, sy: 100, sh: 450 },
  { q: 184, p: 135, sy: 100, sh: 450 },
  { q: 186, p: 137, sy: 100, sh: 450 },
  { q: 193, p: 143, sy: 100, sh: 450 },
  { q: 196, p: 145, sy: 100, sh: 450 },
  { q: 198, p: 147, sy: 100, sh: 450 },
  { q: 200, p: 149, sy: 100, sh: 450 },
  { q: 204, p: 152, sy: 100, sh: 450 },
  { q: 208, p: 155, sy: 100, sh: 450 },
  { q: 219, p: 160, sy: 100, sh: 450 },
  { q: 230, p: 168, sy: 100, sh: 450 },
  { q: 236, p: 173, sy: 100, sh: 450 },
  { q: 238, p: 176, sy: 100, sh: 450 },
  { q: 248, p: 183, sy: 100, sh: 450 },
  { q: 250, p: 186, sy: 100, sh: 450 },
  { q: 257, p: 190, sy: 100, sh: 450 },
  { q: 260, p: 193, sy: 100, sh: 450 }
];

function trimAndSave(canvas, sx, sy, sw, sh, outPath) {
  const ctx = canvas.getContext('2d');
  sx = Math.max(0, Math.min(canvas.width - 1, sx));
  sy = Math.max(0, Math.min(canvas.height - 1, sy));
  sw = Math.min(canvas.width - sx, sw);
  sh = Math.min(canvas.height - sy, sh);

  const imgData = ctx.getImageData(sx, sy, sw, sh);
  const data = imgData.data;

  let minX = sw, minY = sh, maxX = 0, maxY = 0;
  for (let y = 0; y < sh; y++) {
    for (let x = 0; x < sw; x++) {
      const idx = (y * sw + x) * 4;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];
      if (r < 225 || g < 225 || b < 225) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (minX >= maxX || minY >= maxY) {
    console.log(`[WARN] No graphic pixels found for ${path.basename(outPath)}`);
    return false;
  }

  const trimW = maxX - minX + 1;
  const trimH = maxY - minY + 1;
  if (trimW < 25 || trimH < 25) {
    console.log(`[WARN] Diagram too small (${trimW}x${trimH}) for ${path.basename(outPath)}`);
    return false;
  }

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
  console.log(`[OK] Saved ${path.basename(outPath)} (${finalW}x${finalH})`);
  return true;
}

async function runCrop() {
  console.log(`Cropping ${MAG_DIAGRAM_DEFS.length} diagrams...`);
  let success = 0;
  for (const def of MAG_DIAGRAM_DEFS) {
    const pPad = String(def.p).padStart(3, '0');
    const pPath = path.join(pagesDir, `page_${pPad}.png`);
    if (!fs.existsSync(pPath)) continue;

    const img = await loadImage(pPath);
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const outPath = path.join(OUT_DIR, `mag_q${def.q}_diagram.png`);
    const ok = trimAndSave(canvas, 100, def.sy, img.width - 200, def.sh, outPath);
    if (ok) success++;
  }

  console.log(`Cropped ${success} / ${MAG_DIAGRAM_DEFS.length} diagrams successfully.`);
  fs.writeFileSync(path.resolve(__dirname, 'mag_diagram_specs.json'), JSON.stringify(MAG_DIAGRAM_DEFS, null, 2));
}

runCrop().catch(console.error);
