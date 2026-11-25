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

// Bounding box specs for Part 1 diagram questions
// Page dimensions: 1224 x 1584
// (l, t, w, h are fractions of 1224x1584)
const PART1_DIAGRAM_SPECS = [
  // Q5: Page 2, reaction scheme + options (A, B, C, D)
  { id: 'q5_diagram', page: 2, l: 0.15, t: 0.005, w: 0.65, h: 0.19 },
  // Q10: Page 3, sigma complexes (A, B, C, D)
  { id: 'q10_diagram', page: 3, l: 0.15, t: 0.55, w: 0.65, h: 0.28 },
  // Q21: Page 7, Borsch reagent reaction options
  { id: 'q21_diagram', page: 7, l: 0.15, t: 0.31, w: 0.65, h: 0.18 },
  // Q26: Page 9, scheme + options
  { id: 'q26_diagram', page: 9, l: 0.15, t: 0.01, w: 0.65, h: 0.24 },
  // Q30: Page 11, scheme + options
  { id: 'q30_diagram', page: 11, l: 0.15, t: 0.015, w: 0.65, h: 0.37 },
  // Q31: Page 12, nitration options
  { id: 'q31_diagram', page: 12, l: 0.15, t: 0.02, w: 0.65, h: 0.23 },
  // Q32: Page 12, Friedel Crafts options
  { id: 'q32_diagram', page: 12, l: 0.15, t: 0.60, w: 0.65, h: 0.18 },
  // Q33: Page 13, scheme + options
  { id: 'q33_diagram', page: 13, l: 0.15, t: 0.01, w: 0.65, h: 0.21 },
  // Q35: Page 13, nitration compounds (a, b, c, d)
  { id: 'q35_diagram', page: 13, l: 0.15, t: 0.54, w: 0.65, h: 0.12 },
  // Q36: Page 14, dehydrohalogenation options
  { id: 'q36_diagram', page: 14, l: 0.15, t: 0.01, w: 0.65, h: 0.15 },
  // Q37: Page 14, nitration compounds (A, B, C, D)
  { id: 'q37_diagram', page: 14, l: 0.15, t: 0.24, w: 0.65, h: 0.08 },
  // Q38: Page 15, scheme + options
  { id: 'q38_diagram', page: 15, l: 0.15, t: 0.01, w: 0.65, h: 0.30 },
  // Q39: Page 16, scheme + options
  { id: 'q39_diagram', page: 16, l: 0.15, t: 0.01, w: 0.65, h: 0.34 },
  // Q41: Page 17, scheme + options
  { id: 'q41_diagram', page: 17, l: 0.15, t: 0.01, w: 0.65, h: 0.19 },
  // Q43: Page 18, scheme + options
  { id: 'q43_diagram', page: 18, l: 0.15, t: 0.01, w: 0.65, h: 0.25 },
  // Q45: Page 19, scheme + options
  { id: 'q45_diagram', page: 19, l: 0.15, t: 0.01, w: 0.65, h: 0.26 },
  // Q46: Page 19, compounds options (A, B, C, D)
  { id: 'q46_diagram', page: 19, l: 0.15, t: 0.46, w: 0.65, h: 0.15 },
  // Q47: Page 20, options (A, B, C, D)
  { id: 'q47_diagram', page: 20, l: 0.15, t: 0.02, w: 0.65, h: 0.20 },
  // Q48: Page 21, scheme + options
  { id: 'q48_diagram', page: 21, l: 0.15, t: 0.01, w: 0.65, h: 0.37 },
  // Q49: Page 22, scheme + options
  { id: 'q49_diagram', page: 22, l: 0.15, t: 0.01, w: 0.65, h: 0.36 },
  // Q50: Page 22, scheme + options
  { id: 'q50_diagram', page: 22, l: 0.15, t: 0.56, w: 0.65, h: 0.20 },
  // Q51: Page 23, scheme + options
  { id: 'q51_diagram', page: 23, l: 0.15, t: 0.01, w: 0.65, h: 0.29 },
  // Q52: Page 24, scheme + options
  { id: 'q52_diagram', page: 24, l: 0.15, t: 0.01, w: 0.65, h: 0.30 },
  // Q55: Page 26, scheme + options
  { id: 'q55_diagram', page: 26, l: 0.15, t: 0.01, w: 0.65, h: 0.38 },
  // Q57: Page 27, compounds (I, II, III)
  { id: 'q57_diagram', page: 27, l: 0.15, t: 0.39, w: 0.55, h: 0.11 },
  // Q58: Page 28, scheme + options
  { id: 'q58_diagram', page: 28, l: 0.15, t: 0.01, w: 0.65, h: 0.25 },
  // Q60: Page 29, scheme + options
  { id: 'q60_diagram', page: 29, l: 0.15, t: 0.005, w: 0.65, h: 0.17 },
];

async function cropAll() {
  console.log(`Cropping ${PART1_DIAGRAM_SPECS.length} diagrams for Part 1...`);
  for (const spec of PART1_DIAGRAM_SPECS) {
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
  console.log('Part 1 cropping complete!');
}

cropAll().catch(console.error);
