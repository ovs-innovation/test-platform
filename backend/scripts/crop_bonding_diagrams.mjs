import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAGES_DIR = path.resolve(__dirname, 'bonding_jee_pages');
const OUT_DIR = path.resolve(__dirname, 'bonding_diagrams');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Bounding box definitions relative to page dimensions (scale 2.0: w=1224, h=1584 approx)
const DIAGRAM_SPECS = [
  { id: 'q36_q_diagram', page: 7, l: 0.20, t: 0.015, w: 0.65, h: 0.11 },
  { id: 'q54_q_diagram', page: 11, l: 0.22, t: 0.46, w: 0.40, h: 0.17 },
  { id: 'q64_q_diagram', page: 14, l: 0.22, t: 0.38, w: 0.45, h: 0.20 },
  { id: 'q74_q_diagram', page: 18, l: 0.22, t: 0.29, w: 0.58, h: 0.08 },
  { id: 'q81_q_diagram', page: 21, l: 0.22, t: 0.00, w: 0.20, h: 0.035 },
  { id: 'q86_q_diagram', page: 22, l: 0.22, t: 0.575, w: 0.25, h: 0.045 },
  { id: 'q88_q_diagram', page: 23, l: 0.60, t: 0.20, w: 0.15, h: 0.10 },
  { id: 'q91_q_diagram', page: 25, l: 0.22, t: 0.02, w: 0.55, h: 0.32 },
  { id: 'q105_q_diagram', page: 33, l: 0.24, t: 0.36, w: 0.50, h: 0.15 },
  { id: 'q108_q_diagram', page: 34, l: 0.22, t: 0.04, w: 0.55, h: 0.28 },
  { id: 'q116_q_diagram', page: 36, l: 0.22, t: 0.18, w: 0.45, h: 0.10 },
  { id: 'q117_q_diagram', page: 36, l: 0.25, t: 0.51, w: 0.30, h: 0.17 },
  { id: 'q120_q_diagram', page: 37, l: 0.22, t: 0.30, w: 0.55, h: 0.25 },
  { id: 'q122_q_diagram', page: 38, l: 0.22, t: 0.33, w: 0.35, h: 0.13 },
  { id: 'q152_q_diagram', page: 48, l: 0.22, t: 0.48, w: 0.45, h: 0.10 },
  { id: 'q221_q_diagram', page: 81, l: 0.22, t: 0.19, w: 0.50, h: 0.15 },
  { id: 'q229_q_diagram', page: 84, l: 0.25, t: 0.06, w: 0.55, h: 0.19 },
  { id: 'q275_q_diagram', page: 101, l: 0.22, t: 0.24, w: 0.55, h: 0.58 },
  { id: 'q276_q_diagram', page: 102, l: 0.25, t: 0.02, w: 0.35, h: 0.09 },
  { id: 'q289_q_diagram', page: 106, l: 0.28, t: 0.24, w: 0.50, h: 0.17 },
  { id: 'q295_q_diagram', page: 109, l: 0.24, t: 0.04, w: 0.28, h: 0.11 },
  { id: 'q308_q_diagram', page: 116, l: 0.22, t: 0.04, w: 0.58, h: 0.32 },
];

async function cropAll() {
  console.log(`Cropping ${DIAGRAM_SPECS.length} diagrams...`);
  for (const spec of DIAGRAM_SPECS) {
    const pagePadded = String(spec.page).padStart(3, '0');
    const pagePath = path.join(PAGES_DIR, `page_${pagePadded}.png`);
    if (!fs.existsSync(pagePath)) {
      console.error(`Page not found: ${pagePath}`);
      continue;
    }

    const img = await loadImage(pagePath);
    const W = img.width;
    const H = img.height;

    const cropX = Math.round(spec.l * W);
    const cropY = Math.round(spec.t * H);
    const cropW = Math.round(spec.w * W);
    const cropH = Math.round(spec.h * H);

    const canvas = createCanvas(cropW, cropH);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

    const outPath = path.join(OUT_DIR, `${spec.id}.png`);
    fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
    console.log(`Cropped: ${spec.id} (${cropW}x${cropH})`);
  }
  console.log('All diagrams cropped successfully!');
}

cropAll().catch(console.error);
