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
  // Clamp boundaries
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
      // non-white and not light grey watermark
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

const SPECS = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'emi_diagram_specs.json'), 'utf8'));

async function main() {
  let successCount = 0;
  for (const s of SPECS) {
    const pPad = String(s.p).padStart(3, '0');
    const pPath = path.resolve(__dirname, `emi_jee_pages/page_${pPad}.png`);
    if (!fs.existsSync(pPath)) {
      console.log(`Missing page image: ${pPath}`);
      continue;
    }
    const img = await loadImage(pPath);
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const outPath = path.join(OUT_DIR, `emi_q${s.q}_diagram.png`);
    const ok = trimAndSave(canvas, s.sx, s.sy, s.sw, s.sh, outPath);
    if (ok) successCount++;
  }
  console.log(`\nSuccessfully cropped ${successCount} / ${SPECS.length} diagrams!`);
}

main().catch(console.error);
