import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'wave_optics_ocr_cache.json'), 'utf8'));

// Candidate questions with estimated Y regions
// Page height is ~1684. Header is at y=0..120.
// Let's define the exact question on each page
const candidates = [
  { q: 19, p: 8, yMin: 220, yMax: 550 },
  { q: 21, p: 10, yMin: 250, yMax: 650 },
  { q: 22, p: 11, yMin: 250, yMax: 600 },
  { q: 29, p: 15, yMin: 250, yMax: 650 },
  { q: 31, p: 17, yMin: 250, yMax: 650 },
  { q: 36, p: 21, yMin: 250, yMax: 650 },
  { q: 38, p: 22, yMin: 900, yMax: 1300 },
  { q: 44, p: 28, yMin: 250, yMax: 650 },
  { q: 48, p: 30, yMin: 950, yMax: 1350 },
  { q: 51, p: 33, yMin: 250, yMax: 650 },
  { q: 54, p: 36, yMin: 250, yMax: 650 },
  { q: 58, p: 39, yMin: 250, yMax: 650 },
  { q: 74, p: 50, yMin: 250, yMax: 650 },
  { q: 111, p: 69, yMin: 250, yMax: 700 },
  { q: 112, p: 71, yMin: 250, yMax: 650 },
  { q: 114, p: 73, yMin: 250, yMax: 650 },
  { q: 119, p: 79, yMin: 250, yMax: 650 },
  { q: 129, p: 87, yMin: 250, yMax: 650 },
  { q: 135, p: 91, yMin: 900, yMax: 1350 },
  { q: 141, p: 94, yMin: 200, yMax: 550 },
  { q: 143, p: 94, yMin: 1000, yMax: 1400 },
  { q: 154, p: 100, yMin: 250, yMax: 650 },
  { q: 166, p: 106, yMin: 250, yMax: 650 },
  { q: 183, p: 119, yMin: 250, yMax: 700 },
  { q: 190, p: 126, yMin: 250, yMax: 700 }
];

const OUT_DIR = path.resolve(__dirname, 'test_crops');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function cropAll() {
  for (const c of candidates) {
    const pPad = String(c.p).padStart(3, '0');
    const imgPath = path.resolve(__dirname, `wave_optics_pages/page_${pPad}.png`);
    const img = await loadImage(imgPath);
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const cropH = c.yMax - c.yMin;
    const cropCanvas = createCanvas(img.width, cropH);
    const cropCtx = cropCanvas.getContext('2d');
    cropCtx.drawImage(canvas, 0, c.yMin, img.width, cropH, 0, 0, img.width, cropH);

    const outPath = path.join(OUT_DIR, `q${c.q}_page${c.p}.png`);
    fs.writeFileSync(outPath, cropCanvas.toBuffer('image/png'));
    console.log(`Saved crop for Q${c.q} (Page ${c.p}) -> ${outPath}`);
  }
}

cropAll().catch(console.error);
