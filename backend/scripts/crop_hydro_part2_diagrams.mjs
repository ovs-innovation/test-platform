import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAGES_DIR = path.resolve(__dirname, 'hydro_jee_pages');
const OUT_DIR = path.resolve(__dirname, 'hydro_jee_diagrams');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Bounding box specs for Part 2 diagram questions
// Page dimensions: 1224 x 1584
const PART2_DIAGRAM_SPECS = [
  // Q61: Page 29
  { id: 'q61_diagram', page: 29, l: 0.15, t: 0.42, w: 0.65, h: 0.20 },
  // Q62: Page 30
  { id: 'q62_diagram', page: 30, l: 0.15, t: 0.04, w: 0.65, h: 0.20 },
  // Q63: Page 30
  { id: 'q63_diagram', page: 30, l: 0.15, t: 0.42, w: 0.65, h: 0.16 },
  // Q64: Page 31
  { id: 'q64_diagram', page: 31, l: 0.15, t: 0.08, w: 0.65, h: 0.18 },
  // Q65: Page 31
  { id: 'q65_diagram', page: 31, l: 0.15, t: 0.55, w: 0.45, h: 0.15 },
  // Q66: Page 32
  { id: 'q66_diagram', page: 32, l: 0.15, t: 0.03, w: 0.45, h: 0.05 },
  // Q67: Page 32
  { id: 'q67_diagram', page: 32, l: 0.15, t: 0.28, w: 0.65, h: 0.25 },
  // Q68: Page 33
  { id: 'q68_diagram', page: 33, l: 0.15, t: 0.02, w: 0.50, h: 0.07 },
  // Q69: Page 33
  { id: 'q69_diagram', page: 33, l: 0.15, t: 0.33, w: 0.65, h: 0.18 },
  // Q71: Page 34
  { id: 'q71_diagram', page: 34, l: 0.15, t: 0.16, w: 0.65, h: 0.24 },
  // Q72: Page 35
  { id: 'q72_diagram', page: 35, l: 0.15, t: 0.01, w: 0.65, h: 0.35 },
  // Q73: Page 35
  { id: 'q73_diagram', page: 35, l: 0.15, t: 0.61, w: 0.45, h: 0.05 },
  // Q74: Page 36
  { id: 'q74_diagram', page: 36, l: 0.15, t: 0.01, w: 0.65, h: 0.14 },
  // Q75: Page 36
  { id: 'q75_diagram', page: 36, l: 0.15, t: 0.32, w: 0.65, h: 0.26 },
  // Q78: Page 37
  { id: 'q78_diagram', page: 37, l: 0.15, t: 0.20, w: 0.65, h: 0.35 },
  // Q79: Page 38
  { id: 'q79_diagram', page: 38, l: 0.15, t: 0.01, w: 0.65, h: 0.26 },
  // Q80: Page 39
  { id: 'q80_diagram', page: 39, l: 0.15, t: 0.01, w: 0.65, h: 0.39 },
  // Q81: Page 40
  { id: 'q81_diagram', page: 40, l: 0.15, t: 0.01, w: 0.65, h: 0.30 },
  // Q82: Page 41
  { id: 'q82_diagram', page: 41, l: 0.15, t: 0.01, w: 0.65, h: 0.40 },
  // Q83: Page 42
  { id: 'q83_diagram', page: 42, l: 0.15, t: 0.01, w: 0.65, h: 0.18 },
  // Q84: Page 43
  { id: 'q84_diagram', page: 43, l: 0.15, t: 0.01, w: 0.65, h: 0.17 },
  // Q85: Page 43
  { id: 'q85_diagram', page: 43, l: 0.15, t: 0.58, w: 0.50, h: 0.14 },
  // Q87: Page 44
  { id: 'q87_diagram', page: 44, l: 0.15, t: 0.51, w: 0.45, h: 0.05 },
  // Q88: Page 45
  { id: 'q88_diagram', page: 45, l: 0.15, t: 0.01, w: 0.65, h: 0.27 },
  // Q89: Page 45
  { id: 'q89_diagram', page: 45, l: 0.15, t: 0.42, w: 0.65, h: 0.30 },
  // Q91: Page 46
  { id: 'q91_diagram', page: 46, l: 0.15, t: 0.43, w: 0.65, h: 0.16 },
  // Q92: Page 47
  { id: 'q92_diagram', page: 47, l: 0.15, t: 0.01, w: 0.65, h: 0.12 },
  // Q94: Page 48
  { id: 'q94_diagram', page: 48, l: 0.15, t: 0.01, w: 0.65, h: 0.30 },
  // Q97: Page 49
  { id: 'q97_diagram', page: 49, l: 0.15, t: 0.48, w: 0.65, h: 0.27 },
  // Q99: Page 50
  { id: 'q99_diagram', page: 50, l: 0.15, t: 0.28, w: 0.65, h: 0.12 },
  // Q100: Page 51
  { id: 'q100_diagram', page: 51, l: 0.15, t: 0.01, w: 0.65, h: 0.12 },
  // Q101: Page 51
  { id: 'q101_diagram', page: 51, l: 0.15, t: 0.46, w: 0.45, h: 0.09 },
  // Q102: Page 52
  { id: 'q102_diagram', page: 52, l: 0.15, t: 0.01, w: 0.65, h: 0.22 },
  // Q107: Page 54
  { id: 'q107_diagram', page: 54, l: 0.15, t: 0.01, w: 0.45, h: 0.08 },
  // Q109: Page 54
  { id: 'q109_diagram', page: 54, l: 0.15, t: 0.46, w: 0.50, h: 0.08 },
  // Q110: Page 55
  { id: 'q110_diagram', page: 55, l: 0.15, t: 0.01, w: 0.35, h: 0.08 },
  // Q111: Page 55
  { id: 'q111_diagram', page: 55, l: 0.15, t: 0.60, w: 0.65, h: 0.17 },
  // Q112: Page 56
  { id: 'q112_diagram', page: 56, l: 0.15, t: 0.01, w: 0.65, h: 0.26 },
  // Q113: Page 56
  { id: 'q113_diagram', page: 56, l: 0.15, t: 0.48, w: 0.65, h: 0.22 },
  // Q114: Page 57
  { id: 'q114_diagram', page: 57, l: 0.15, t: 0.01, w: 0.65, h: 0.27 },
  // Q116: Page 58
  { id: 'q116_diagram', page: 58, l: 0.15, t: 0.02, w: 0.65, h: 0.26 },
  // Q117: Page 58
  { id: 'q117_diagram', page: 58, l: 0.15, t: 0.46, w: 0.65, h: 0.18 },
  // Q120: Page 59
  { id: 'q120_diagram', page: 59, l: 0.15, t: 0.27, w: 0.50, h: 0.04 }
];

async function cropAll() {
  console.log(`Cropping ${PART2_DIAGRAM_SPECS.length} diagrams for Part 2...`);
  for (const spec of PART2_DIAGRAM_SPECS) {
    const pagePadded = String(spec.page).padStart(3, '0');
    const pagePath = path.join(PAGES_DIR, `page_${pagePadded}.png`);
    if (!fs.existsSync(pagePath)) {
      console.error(`Page not found: ${pagePath}`);
      continue;
    }

    const img = await loadImage(pagePath);
    const sx = Math.floor(spec.l * img.width);
    const sy = Math.floor(spec.t * img.height);
    const sw = Math.floor(spec.w * img.width);
    const sh = Math.floor(spec.h * img.height);

    const canvas = createCanvas(sw, sh);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);

    const outPath = path.join(OUT_DIR, `${spec.id}.png`);
    fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
    console.log(`Cropped ${spec.id} (${sw}x${sh}) from page ${spec.page}`);
  }
  console.log('Part 2 cropping complete!');
}

cropAll().catch(console.error);
